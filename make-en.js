/* Versión en inglés: toma las páginas en español ya generadas y arma /en/ con i18n/en.json.
   También agrega a las páginas en español el selector de idioma, los hreflang y la
   redirección automática para visitantes cuyo navegador no está en español.
   Lo corre build.js al final. Para traducir un texto nuevo: agregarlo a i18n/en.json. */
const fs = require('fs'), path = require('path');
const SITE = 'https://brancoblunda.com';
const DICT = JSON.parse(fs.readFileSync(path.join(__dirname, 'i18n', 'en.json'), 'utf8'));
const FILES = ['index.html', '404.html', 'gracias.html',
  ...fs.readdirSync(path.join(__dirname, 'proyectos')).filter(f => f.endsWith('.html')).map(f => 'proyectos/' + f)];

const ent = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const attr = s => ent(s).replace(/"/g, '&quot;');
const dec = s => s.replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const missing = new Set();
const tr = raw => {
  const t = raw.trim();
  if (!t || !/[A-Za-zÁÉÍÓÚáéíóúñÑ]/.test(t)) return null;
  if (Object.prototype.hasOwnProperty.call(DICT, t)) return DICT[t];
  if (!/^https?:|=|^index,/.test(t) && /\s|[áéíóúñ]|^[A-ZÁÉÍÓÚ][a-záéíóúñ]+$/.test(t) && !/^(GitHub|Twitter)$/.test(t)) missing.add(t); return null;
};
const urlOf = f => f === 'index.html' ? '/' : '/' + f;

/* separa scripts y estilos para no tocarlos */
const splitCode = s => s.split(/(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>)/);

const langSwitch = (to, href) =>
  `<a href="${href}" class="lang-switch" hreflang="${to}" lang="${to}" onclick="try{localStorage.setItem('lang','${to}')}catch(e){}" aria-label="${to === 'en' ? 'English version' : 'Versión en español'}">${to.toUpperCase()}</a>`;

const hreflang = f => `<link rel="alternate" hreflang="es" href="${SITE}${urlOf(f)}">
<link rel="alternate" hreflang="en" href="${SITE}/en${urlOf(f)}">
<link rel="alternate" hreflang="x-default" href="${SITE}${urlOf(f)}">`;

const redirect = f => `<script>(function(){try{if(/bot|crawl|spider|slurp|lighthouse|headless/i.test(navigator.userAgent))return;var p=localStorage.getItem('lang');if(p==='es')return;if(p==='en'||!/^es/i.test(navigator.language||'')){location.replace('/en${urlOf(f)}'+location.hash);}}catch(e){}})();</script>`;

for (const f of FILES) {
  let es = fs.readFileSync(f, 'utf8');
  /* limpiar inyecciones viejas por si el archivo ya pasó por acá */
  es = es.replace(/<!--i18n-->[\s\S]*?<!--\/i18n-->\n?/g, '').replace(/<!--sw-->[\s\S]*?<!--\/sw-->/g, '');

  /* ---------- versión en inglés ---------- */
  let en = es;
  const parts = splitCode(en);
  for (let i = 0; i < parts.length; i++) {
    let p = parts[i];
    if (i % 2 === 1) { /* código: solo traducir el JSON-LD */
      const m = p.match(/^<script type="application\/ld\+json">([\s\S]*)<\/script>$/);
      if (m) {
        try {
          const walk = o => {
            if (Array.isArray(o)) return o.map(walk);
            if (o && typeof o === 'object') {
              for (const k of Object.keys(o)) {
                if (['name', 'description', 'jobTitle', 'headline', 'about', 'alternativeHeadline'].includes(k) && typeof o[k] === 'string') { const t = tr(o[k]); if (t !== null) o[k] = t; }
                else if (k === 'inLanguage') o[k] = 'en';
                else o[k] = walk(o[k]);
              }
            }
            return o;
          };
          p = '<script type="application/ld+json">' + JSON.stringify(walk(JSON.parse(m[1]))) + '</script>';
        } catch (e) { }
      }
      parts[i] = p; continue;
    }
    /* textos entre etiquetas */
    p = p.replace(/>([^<>]+)</g, (all, txt) => {
      /* números sueltos (8.900+, 50.000): formato inglés */
      if (!/[A-Za-zÁÉÍÓÚáéíóúñÑ]/.test(txt) && /\d\.\d{3}/.test(txt)) return '>' + txt.replace(/(\d)\.(?=\d{3}\b)/g, '$1,') + '<';
      const t = tr(dec(txt)); if (t === null) return all;
      const lead = txt.match(/^\s*/)[0], trail = txt.match(/\s*$/)[0];
      return '>' + lead + ent(t) + trail + '<';
    });
    /* atributos de texto */
    p = p.replace(/\b(alt|title|aria-label|content|placeholder|value)="([^"]*)"/g, (all, a, v) => {
      const t = tr(dec(v)); return t === null ? all : `${a}="${attr(t)}"`;
    });
    /* rutas: /en/ está un nivel más abajo */
    p = p.replace(/\b(src|href)="([^"]*)"/g, (all, a, v) => {
      if (/^(https?:|\/\/|#|mailto:|tel:|data:|javascript:|\/)/.test(v) || /\.html(#.*)?$/.test(v)) return all;
      return `${a}="../${v}"`;
    });
    parts[i] = p;
  }
  en = parts.join('');
  en = en.replace('<html lang="es-AR"', '<html lang="en"')
    .replace('content="es_AR"', 'content="en_US"')
    .split(`${SITE}${urlOf(f)}"`).join(`${SITE}/en${urlOf(f)}"`)
    .replace(`value="${SITE}/gracias.html"`, `value="${SITE}/en/gracias.html"`)
    .replace('</head>', `<!--i18n-->${hreflang(f)}<!--/i18n-->\n</head>`)
    .replace('<button id="menu-toggle"', `<!--sw-->${langSwitch('es', urlOf(f))}<!--/sw--><button id="menu-toggle"`);
  const out = path.join('en', f);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, en);

  /* ---------- español: selector, hreflang y redirección ---------- */
  es = es.replace('<head>\n', `<head>\n<!--i18n-->${redirect(f)}<!--/i18n-->\n`)
    .replace('</head>', `<!--i18n-->${hreflang(f)}<!--/i18n-->\n</head>`)
    .replace('<button id="menu-toggle"', `<!--sw-->${langSwitch('en', '/en' + urlOf(f))}<!--/sw--><button id="menu-toggle"`);
  fs.writeFileSync(f, es);
}

/* sitemap con las dos versiones */
let sm = fs.readFileSync('sitemap.xml', 'utf8');
if (!sm.includes('/en/')) {
  const enUrls = [...sm.matchAll(/<url><loc>https:\/\/brancoblunda\.com(\/[^<]*)<\/loc>(.*?)<\/url>/g)]
    .map(m => `  <url><loc>${SITE}/en${m[1]}</loc>${m[2]}</url>`);
  sm = sm.replace('</urlset>', enUrls.join('\n') + '\n</urlset>');
  fs.writeFileSync('sitemap.xml', sm);
}

if (missing.size) {
  fs.writeFileSync(path.join(__dirname, 'i18n', 'faltan.json'), JSON.stringify([...missing], null, 1));
  console.log('  ! en: ' + missing.size + ' textos sin traducir (ver i18n/faltan.json)');
} else console.log('  + en/ (' + FILES.length + ' paginas en ingles)');
