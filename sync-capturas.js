/* Copia las capturas desde Trabajos\_Capturas hacia assets/proyectos.
   Uso:  node sync-capturas.js        */
const fs=require('fs'),path=require('path');
const ORIGEN='C:\\Users\\branc\\Escritorio\\Trabajos\\_Capturas';
const MAPA={
 'taxi-ai':'01-Taxi-AI','signfloow':'02-SignFloow','blc-one':'03-BLC-One',
 'infinity-book':'04-Infinity-Book','comanda-central':'09-Comanda-Central','vertical':'10-Vertical','deltan-scan':'12-Deltan-Scan-IA'};
let n=0,faltan=[];
for(const [slug,carpeta] of Object.entries(MAPA)){
  const src=path.join(ORIGEN,carpeta), dst=path.join('assets','proyectos',slug);
  if(!fs.existsSync(src)){faltan.push(carpeta);continue;}
  fs.mkdirSync(dst,{recursive:true});
  for(const f of fs.readdirSync(src)){
    if(!/\.(png|jpg|jpeg|webp)$/i.test(f))continue;
    fs.copyFileSync(path.join(src,f),path.join(dst,f)); n++;
    console.log('  '+carpeta+'/'+f+'  ->  '+slug);
  }
}
console.log('\n'+n+' capturas copiadas.');
if(faltan.length)console.log('Sin carpeta de origen: '+faltan.join(', '));
console.log('Ahora: git add -A && git commit -m "capturas" && git push');
