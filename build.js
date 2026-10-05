/* Generador estático del portafolio. Editar datos y correr: node build.js */
const fs = require('fs'), path = require('path'), crypto = require('crypto');
/* huella corta del archivo: al cambiar, el navegador deja de servir la version vieja */
const v=f=>{try{return crypto.createHash('md5').update(fs.readFileSync(f)).digest('hex').slice(0,8);}catch(e){return Date.now().toString(36);}};
const VCSS=v('css/styles.css'), VJS=v('js/main.js');
const SITE='https://brancoblunda.github.io';
const MAIL='brancoadrianblunda@gmail.com';
const LINKEDIN='https://linkedin.com/in/brancoblunda';
const GITHUB='https://github.com/BrancoBlunda';

const PROJECTS=[
{slug:'taxi-ai',title:'Taxi AI',cliente:'Taxi Call Group S.A.S.',pais:'Colombia',
 rol:'Diseño, construcción y operación',estado:'En producción · mantenimiento continuo',
 tag:'Agente de voz con IA · Telefonía',
 tipos:['IA de voz','App móvil','Producción'],
 desc:'Una empresa de taxis despachaba a mano decenas de miles de llamadas por mes. Construí la IA que atiende el teléfono, entiende la dirección hablada del pasajero y asigna el conductor sola, sin que intervenga una persona. También las dos apps móviles publicadas, la landing y el panel de operación.',
 antes:'Cada llamada la atendía una persona que escuchaba la dirección, la ubicaba y llamaba por radio a un conductor.',
 despues:'La llamada se atiende sola, entiende la dirección hablada y despacha. El operador solo mira.',
 problema:'La central recibía decenas de miles de llamadas por mes y cada una la atendía una persona que escuchaba la dirección, la ubicaba y llamaba por radio a un conductor. El cuello de botella era humano y no escalaba.',
 construido:['Endpoint en Node.js que recibe las llamadas y los audios desde Asterisk.',
 'Transcripción del audio con Whisper y extracción de la dirección con un modelo de lenguaje.',
 'Geocodificación con Google Maps y cerco geográfico sobre Manizales y Villamaría.',
 'Respuesta hablada generada con TTS y convertida a formato telefónico con FFMPEG.',
 'Dialplan propio en Asterisk para el enrutamiento, la consulta a conductores y la derivación directa.',
 'Asignación por radio variable de 500 a 1.900 metros según la franja horaria.',
 'Sensor de cuelgue que cancela el viaje en la base automáticamente.',
 'Alta automática del pasajero que llama por primera vez.',
 'Dos apps Android publicadas, una de pasajero con seguimiento en mapa, chat con el conductor y código de seguridad, y otra de conductor.'],
 stats:[['500+','conductores'],['50.000+','llamadas por mes'],['35.000+','reservas por mes'],['~70%','menos trabajo manual']],
 tech:'Node.js · Fastify · tRPC · PostgreSQL · Kysely · Asterisk / FreePBX · Docker · Traefik · Whisper · TTS · Google Maps · Twilio',
 links:[['Sitio','https://taxiai.com.co'],['App pasajero','https://play.google.com/store/apps/details?id=co.com.taxiai.pasajero'],['App conductor','https://play.google.com/store/apps/details?id=co.com.taxiai.conductor']],
 cover:'08-panel-despacho.webp',
 shots:[['08-panel-despacho.webp','Panel de despacho con las llamadas y los viajes del día, solicitudes activas, la flota en el mapa y el detalle del viaje en curso.'],['01-landing-hero.webp','La landing pública del servicio.'],['02-landing-tres-formas.webp','Los tres canales de pedido, por WhatsApp, por teléfono y desde la app.'],['06-app-seguimiento.webp','Seguimiento del viaje en tiempo real, con la ruta y el chat con el conductor.'],['05-app-solicitar.webp','Pedido desde la app. El círculo es el radio de búsqueda de conductores en hora pico.'],['07-app-historial.webp','Historial de viajes del pasajero, con el estado de cada uno.'],['03-play-pasajero.webp','La app de pasajero, publicada en Google Play.'],['04-play-conductor.webp','La app de conductor, publicada en Google Play.']],
 nota:'Las cifras de operación son datos informados por el cliente.'},

{slug:'signfloow',title:'SignFloow',cliente:'RotulMarket',pais:'España',
 rol:'Diseño y construcción desde cero',estado:'En producción con clientes',
 tag:'SaaS multi-tenant · React + NestJS + AWS',
 tipos:['SaaS multi-empresa','IA','AWS'],
 desc:'SaaS para empresas de rotulación. Reemplaza planillas y mensajes por un tablero de producción, un catálogo con recetas de fabricación, presupuestos calculados por fórmulas y un asistente de IA que consulta los datos reales del negocio.',
 antes:'Proyectos, materiales y presupuestos entre planillas, mensajes y memoria. Nadie sabía cuánto costaba un trabajo hasta terminarlo.',
 despues:'Un tablero con el estado real de cada proyecto y presupuestos calculados por fórmula antes de empezar.',
 problema:'Los talleres del rubro manejan proyectos, materiales y presupuestos entre planillas, mensajes y memoria. Nadie sabe con certeza cuánto cuesta un trabajo hasta que ya se hizo.',
 construido:['Tablero multi-empresa con cinco fases, subtableros por taller y descomposición automática del proyecto en tareas de producción.',
 'Motor de presupuestos con fórmulas, capítulos, tarifas de mano de obra y costes indirectos.',
 'Enlace público de aceptación que, al aceptarse, crea el proyecto en el tablero.',
 'Catálogo con lista de materiales por dimensión y 91 materiales preconfigurados del rubro.',
 'Asistente de IA con acceso a herramientas sobre los datos de cada empresa, con dos proveedores y conmutación automática.',
 'Control de acceso por rol y aislamiento total entre empresas.',
 'Infraestructura como código y despliegue automatizado sin credenciales estáticas.'],
 stats:[['1.551+','tests automatizados'],['~90%','de cobertura'],['~130','pull requests']],
 tech:'TypeScript · React 19 · Vite · Tailwind · NestJS 11 · PostgreSQL 16 · Prisma · Turborepo · AWS ECS Fargate y Aurora · Terraform · Vercel',
 links:[['Sitio','https://signfloow.com'],['Aplicación','https://app.signfloow.ai']],
 cover:'01-floow-kanban.webp',
 shots:[['01-floow-kanban.webp','El tablero de producción, con cinco fases, una tarjeta por proyecto y el avance de cada tarea.'],['02-panel.webp','El panel de inicio, con los proyectos por fase, las prioridades del día y los presupuestos pendientes de enviar.'],['03-quote-engine.webp','Detalle de un presupuesto, con sus líneas, los impuestos y el análisis interno de costes y margen.'],['08-detalle-proyecto.webp','Ficha de proyecto, con las tareas de producción, los archivos, las notas internas y un resumen generado por IA.'],['06-catalogo.webp','El catálogo, con familias, subfamilias y productos que heredan materiales y reglas. Cada producto puede ser de precio fijo o calculable.'],['04-crm-pipeline.webp','El embudo comercial, desde la consulta nueva hasta el cobro pendiente.'],['05-presupuestos-lista.webp','El listado de presupuestos, con el estado y el margen de cada uno.'],['07-floowy-chat.webp','Floowy, el asistente de IA, que propone acciones concretas sobre los datos del taller.']],
 nota:''},

{slug:'blc-one',title:'BLC One',cliente:'BLC Power Generation',pais:'Argentina y Colombia',
 rol:'Diseño y construcción desde cero',estado:'v0.3.4 entregada · aplicación interna',
 tag:'Python · Flet · MySQL · Escritorio',
 tipos:['App de escritorio','Sistema interno','2.709 tests'],
 desc:'Plataforma de gestión para el área de servicios de un grupo de energía renovable que opera remotamente cerca del 17% de la generación renovable del país. Centraliza plantas, contratos y compromisos regulatorios que vivían en planillas.',
 antes:'237 plantas y 2.555 compromisos regulatorios en Excel y scripts sueltos, sin trazabilidad ni control de accesos.',
 despues:'Todo en un sistema, con permisos por rol sobre quince pantallas y 2.709 tests que lo respaldan.',
 problema:'Clientes, plantas, cronogramas de reportes ante el organismo regulador y agendas se manejaban en Excel y scripts sueltos. No había trazabilidad ni control de quién podía ver o modificar qué.',
 construido:['Ingreso y control de acceso por rol, con tres roles sobre quince pantallas, permisos por ruta, modo de solo lectura y menú filtrado.',
 'Alta, baja y modificación de clientes, plantas con versionado histórico de configuraciones, y usuarios internos y externos.',
 'Gestor de reportes con cronograma anual, asignación de procesador y aprobador, seguimiento y matriz de servicios.',
 'Vista cruzada de plantas por tipo de reporte, con filtros por rango de fechas.',
 'Módulo de agenda con exportación a Excel en el formato exacto del cliente.',
 'Vista integrada de soporte sobre 216 agentes y pantalla de contratos.',
 'Ejecutable con asistente de primer arranque, datos de prueba y registro rotativo.'],
 stats:[['237','plantas'],['2.555','compromisos regulatorios'],['2.709','tests automatizados'],['82','decisiones de arquitectura documentadas']],
 tech:'Python 3.13 · Flet · SQLAlchemy 2 · MySQL 8 · PyInstaller · desarrollo dirigido por especificación',
 links:[],cover:'03-cronograma-anual.webp',
 shots:[['03-cronograma-anual.webp','El cronograma anual de compromisos regulatorios, con 2.555 filas filtrables por planta, tipo de reporte y estado.'],['10-roles-permisos.webp','El control de acceso, con el nivel de permiso de cada rol sobre cada pantalla, de lectura y escritura a sin visibilidad.'],['04-matriz-servicios.webp','La matriz de servicios, que muestra qué paquetes, módulos y submódulos aplican a cada planta.'],['01-planta-detalle.webp','La ficha de una planta, con su información contractual, de gestión de activos y de soporte.'],['09-usuarios-roles.webp','Usuarios internos con su rol y sus permisos de emisión y aprobación.']],
 nota:'Aplicación interna sobre red privada. Los datos de clientes, plantas y personas están difuminados en las capturas.'},

{slug:'infinity-book',title:'Infinity Book',cliente:'Elfinbook S.R.L.',pais:'Argentina',
 rol:'Desarrollo y publicación de la versión actual',estado:'En producción · mantenimiento mensual',
 tag:'Flutter · ASP.NET Core · OCR',
 tipos:['App publicada','OCR + IA','Rescate de producto'],
 desc:'App de escaneo de cuadernos reutilizables con OCR e IA. La heredé de otro proveedor —sin control de versiones, con credenciales expuestas y todo a nombre de terceros— y desarrollé y publiqué la versión que está hoy en las tiendas.',
 antes:'El backend, las cuentas de tienda y las integraciones estaban a nombre del proveedor anterior. El cliente no era dueño de su propio producto.',
 despues:'Todo migrado a cuentas del cliente, publicado en las dos tiendas, sin perder un solo registro de usuario.',
 problema:'El producto funcionaba pero no era del cliente. El backend, las cuentas de tienda y las integraciones estaban a nombre del proveedor anterior. La cámara de Android era inestable y había una fecha límite de Google para actualizar la app.',
 construido:['Refactor del pipeline de cámara en Android y corrección del procesamiento que truncaba las capturas.',
 'Migración completa del backend a infraestructura propia del cliente, con TLS.',
 'Migración de datos entre bases desacopladas sin modificar un solo registro de usuario real.',
 'Módulo de IA para edición libre del texto reconocido y funnel de registro con segmentación.',
 'Reconfiguración de las cinco integraciones en la nube bajo cuentas del cliente.',
 'Endurecimiento de seguridad, con cierre de endpoints, eliminación de credenciales expuestas, bloqueo de las cuentas del proveedor anterior, firewall y backups verificados.',
 'Publicación en Google Play y App Store bajo cuentas del cliente, incluida la transferencia de la ficha de iOS.'],
 stats:[['8.900+','usuarios registrados'],['177','países'],['0','registros perdidos en la migración']],
 tech:'Flutter / Dart · Kotlin con OpenCV y ML Kit · ASP.NET Core · SQL Server · Azure Document Intelligence · OpenAI · DigitalOcean · Docker · Codemagic',
 links:[['Sitio','https://myinfinitybook.com'],['Google Play','https://play.google.com/store/apps/details?id=com.infinitybook.infinitybook']],
 cover:'05-app-store.webp',
 shots:[['01-app-escaneo.webp','La cámara detectando la hoja del cuaderno para escanearla.'],['02-app-nuevo-escaneo.webp','El escaneo listo, con el módulo de IA que transcribe el documento, lo resume y resuelve la matemática.'],['03-cloud-destinos.webp','Las integraciones en la nube, con Google Drive, Dropbox, OneNote, OneDrive, correo y Trello.'],['04-cloud-configurado.webp','Cada uno de los seis íconos impresos en la hoja se asocia a un destino. El usuario marca el ícono y el escaneo se guarda solo donde corresponde.'],['05-app-store.webp','La app publicada en la App Store bajo la cuenta del cliente.']],
 nota:''},

{slug:'vertical',title:'Vertical',cliente:'Producto que creé',pais:'Argentina',
 rol:'Fundador · creé la plataforma completa',estado:'Activo, con 50+ inmobiliarias',
 tag:'SaaS que creé · Agentes de IA en WhatsApp',
 tipos:['SaaS propio','Agentes de IA','CRM'],
 desc:'Plataforma que creé y construí yo solo, con agentes conversacionales de IA y CRM para inmobiliarias, sobre la API oficial de WhatsApp. Califica leads, hace seguimiento y reactiva contactos las 24 horas. Verificada por Meta como proveedor de tecnología.',
 antes:'Las consultas entraban a toda hora y se respondían cuando se podía. El contacto que espera se enfría.',
 despues:'Atención en segundos las 24 horas, con el lead ya calificado y cargado en el CRM.',
 problema:'Una inmobiliaria recibe consultas a toda hora y responde cuando puede. El contacto que no recibe respuesta en minutos se enfría, y después nadie tiene tiempo de reactivarlo.',
 construido:['Agente conversacional que califica al contacto durante la charla, sobre la API oficial de WhatsApp.',
 'CRM propio de la plataforma, donde queda el historial y el estado de cada contacto.',
 'Seguimiento y reactivación automáticos.',
 'Configuración del comportamiento del agente por cliente.',
 'Infraestructura de la plataforma.'],
 stats:[['Meta','proveedor de tecnología verificado'],['24/7','atención']],
 tech:'Meta WhatsApp Cloud API · modelos de lenguaje con uso de herramientas · Python',
 links:[['Sitio','https://somosvertical.ar']],
 cover:'03-etapas-crm.webp',
 shots:[['02-bandeja-chat.webp','La bandeja, donde el agente conversa por WhatsApp y va dejando arriba lo que averiguó — intención, presupuesto, zona y, si se cae, el motivo.'],['03-etapas-crm.webp','El CRM por etapas, de lead frío a cerrado. Cada contacto se mueve solo según cómo va la conversación.'],['04-ficha-contacto.webp','La ficha del contacto, con lo que contó, cuántas veces se lo siguió, cómo terminó y la nota del vendedor.'],['05-seguimiento.webp','El seguimiento automático, a las 20 horas, al día 3 y al día 6, con plantillas aprobadas por WhatsApp. Si contesta, se corta solo.'],['06-reactivacion.webp','La reactivación de contactos viejos, con tope diario y baja automática. Si WhatsApp baja la calidad del número, se frena sola.'],['07-meta-verificado.webp','El estado en Meta, con el negocio verificado y la verificación de acceso como proveedor de tecnología (Tech Provider), que es lo que habilitaba a operar sobre las cuentas de WhatsApp de otras empresas.'],['01-web-home.webp','El sitio de Vertical.']],
 nota:''},

{slug:'deltan-scan',title:'Deltan Scan IA',cliente:'Clínica odontológica',pais:'Latinoamérica',
 rol:'Diseño y construcción',estado:'Entregado · código abierto',
 tag:'IA de visión por computadora · Salud',
 tipos:['IA de visión','Salud','Código abierto'],
 desc:'Una IA analiza la radiografía panorámica, detecta cada pieza dental y la mide en milímetros. Lo que a un odontólogo le lleva veinte minutos con regla, el modelo lo resuelve en segundos y sin variar entre profesionales.',
 antes:'Medir corona y raíz sobre una panorámica era manual, lento y distinto según el profesional.',
 despues:'Medición automática en milímetros, reproducible y exportable a CSV.',
 problema:'Medir corona y raíz sobre una radiografía panorámica es manual, lento y poco reproducible entre profesionales.',
 construido:['Detección automática de las piezas dentales sobre la radiografía panorámica.',
 'Medición de la longitud de cada pieza y de los reparos anatómicos, como la distancia entre cóndilos, la altura de cada rama mandibular y la longitud del cuerpo mandibular.',
 'Calibración de píxeles a milímetros, para que las medidas sean reales y comparables entre estudios.',
 'Flujo guiado en cuatro pasos, de la carga al procesamiento, el análisis y los resultados.',
 'Historial de análisis, con la posibilidad de volver a abrir o descargar cada estudio procesado.',
 'Exportación de las mediciones a CSV y descarga de la radiografía marcada.'],
 stats:[],
 tech:'Python · OpenCV · YOLOv8 · Streamlit',
 links:[['Código','https://github.com/BrancoBlunda/Deltan-Scan-AI']],
 cover:'03-resultados.webp',
 shots:[['03-resultados.webp','El resultado del análisis, con las piezas detectadas, los reparos anatómicos y las mediciones en milímetros sobre la propia radiografía.'],['02-analizar.webp','La radiografía cargada, lista para procesar. El flujo va guiado en cuatro pasos.'],['04-historial.webp','El historial de análisis, para volver a abrir o descargar cualquier estudio anterior.'],['01-inicio.webp','La pantalla de inicio. Se arrastra la radiografía y el análisis arranca solo.']],
 nota:''},

{slug:'comanda-central',title:'Comanda Central',cliente:'Producto propio',pais:'Argentina',
 rol:'Producto, arquitectura y operación',estado:'En producción en 8 negocios y 3 cadenas',
 tag:'SaaS gastronómico · Node.js + PostgreSQL',
 tipos:['SaaS propio','Punto de venta','BI'],
 desc:'Nació para resolver el problema de mi propia pizzería y terminó siendo un SaaS con gestión centralizada de sucursales, toma de comandas, inventario, análisis de ventas y costeo real por producto con recetas anidadas.',
 antes:'Sabían cuánto vendían, pero no cuánto ganaban. El costo real de un plato dependía de sub-recetas que cambiaban de precio.',
 despues:'Costeo automático con recetas anidadas y ganancia neta por producto, al día.',
 problema:'Un negocio gastronómico sabe cuánto vendió, pero casi nunca cuánto ganó. El costo real de un plato depende de sub-recetas cuyos insumos cambian de precio todo el tiempo.',
 construido:['Punto de venta de tres paneles, operable por completo con el teclado, con impresión de ticket.',
 'Costeo con consultas recursivas en PostgreSQL, que resuelve recetas dentro de recetas.',
 'Tablero de análisis con ventas, ticket promedio, ganancia bruta y neta, comparativas, horario pico y productos más vendidos.',
 'Inventario y compras. El stock se descuenta con la venta y el alta de una compra genera el gasto e impacta el inventario en una sola transacción.',
 'Editor de menú con categorías, adicionales y combos.',
 'Editor del sitio público de cada negocio, con vista previa en vivo.'],
 stats:[['8','negocios'],['3','cadenas'],['15','sucursales']],
 tech:'Node.js · Express · PostgreSQL · JavaScript · Chart.js · Cloudinary · Render · Vercel',
 links:[['Código','https://github.com/BrancoBlunda/Comanda-Central']],
 cover:'02-dashboard-bi.webp',
 shots:[['01-pos.webp','El punto de venta de tres paneles, con el menú, los datos del pedido y la comanda en curso. Se opera entero con el teclado.'],['02-dashboard-bi.webp','El tablero del negocio, con ventas por día, pedidos, alertas de stock bajo y actividad reciente. Los importes están difuminados.'],['08-sitio-publico.webp','El sitio público que la plataforma genera para cada negocio, con su menú y su marca. Cada local queda con su propia web sin tocar código.']],
 nota:''},

{slug:'lomas-del-pacifico',title:'Cobranza de lotes',cliente:'Lomas del Pacífico',pais:'México',
 rol:'Diseño y construcción desde cero',estado:'En uso · mantenimiento continuo',
 tag:'Laravel · MySQL · Cobranzas',
 tipos:['Sistema de cobranzas','Laravel','En uso'],
 desc:'Sistema de cobranza para la venta de lotes en cuotas. Reemplazó planillas de Excel dispersas por un solo lugar donde vive el cliente, su lote, su plan de pago, cada cobro con folio y la mora calculada sola.',
 antes:'La cobranza de lotes en cuotas vivía en planillas sueltas. Nadie sabía con certeza quién estaba al día.',
 despues:'Un solo sistema con el plan de pago, cada cobro con folio y la mora calculada sola.',
 problema:'La cobranza de lotes vendidos en cuotas se llevaba en planillas de Excel sueltas. Nadie sabía con certeza quién estaba al día, cuánto se debía ni desde cuándo, y cada recibo se armaba a mano.',
 construido:['Alta, baja y modificación de clientes, lotes y loteos, con el estado de cada lote, sea disponible, vendido o liquidado.',
 'Planes de pago que generan las cuotas solos, en frecuencia mensual, bimestral o trimestral.',
 'Registro de cobros con folio único, pagos parciales y validación de sobrepago.',
 'Recibos y estados de cuenta en PDF.',
 'Interés por mora con tasa y días de gracia configurables, y condonación.',
 'Reportes de ingresos y de morosidad, con filtros y exportación a PDF.',
 'Comando de migración desde las planillas de Excel existentes, transaccional y con registro de errores.',
 'Avisos automáticos por WhatsApp de vencimiento y de confirmación de pago, con su panel de configuración.'],
 stats:[['289','clientes'],['345','lotes'],['0','planillas de Excel']],
 tech:'PHP 8.1 · Laravel 11 · Blade · Alpine.js · Tailwind · MySQL 8 · dompdf · PhpSpreadsheet · Twilio · Chart.js',
 links:[],
 cover:'01-dashboard.webp',
 shots:[['01-dashboard.webp','El tablero del sistema, con clientes, lotes por estado, cuotas vencidas y accesos rápidos a las operaciones del día.'],['02-plan-de-pagos.webp','Un plan de pago con sus doce cuotas generadas automáticamente, cada una con su vencimiento, su interés y su aviso por WhatsApp.'],['03-recibo-pdf.webp','El recibo con folio único que emite el sistema, con el número de cuota sobre el total del plan.'],['05-lote-detalle.webp','La ficha de un lote, con el socio propietario, el estado, el cliente asignado y sus planes de pago debajo.']],
 nota:'Sistema privado del cliente. Las capturas se toman sobre datos de prueba.'},

{slug:'tu-proximo-horizonte',title:'Tu Próximo Horizonte',cliente:'Leo Cerdeira',pais:'Argentina',
 rol:'Diseño, construcción y entrega',estado:'Tres sistemas en producción · uso diario',
 tag:'Next.js · Supabase · Automatización',
 tipos:['3 sistemas','Automatización','Sin código para el cliente'],
 desc:'Tres sistemas para una agencia de viajes, que el cliente opera solo. La agenda de capacitaciones semanales, la automatización de leads de Facebook y un onboarding de afiliados editable sin tocar código.',
 antes:'Coordinaba capacitaciones a mano, perdía los leads de Facebook y mandaba siete PDFs sueltos a cada afiliado.',
 despues:'Tres sistemas que el cliente opera solo, sin depender del desarrollador para cambiar nada.',
 problema:'Coordinaba capacitaciones semanales a mano, perdía los leads que entraban por Facebook y mandaba siete PDFs sueltos a cada afiliado nuevo. Necesitaba poder cambiar todo él, sin depender del desarrollador.',
 construido:['Agenda con panel para cargar la semana completa, inscripción pública, manejo estricto de zonas horarias y backups diarios con alarma de fallo.',
 'Duplicado de semana con borrado definitivo para sesiones vacías y borrado lógico para las que ya tienen inscriptos.',
 'Seguridad a nivel de fila en la base y revocación del acceso anónimo a los enlaces y claves de reunión.',
 'Captura automática de leads de Facebook y secuencia de cuatro correos a las 0, 24, 48 y 72 horas, con dominio de envío propio autenticado.',
 'Onboarding público paso a paso, sin registro, que refleja al instante lo que el administrador cambia.',
 'Panel de administración con sesión firmada y escrituras por lote a prueba de pérdida de datos.',
 'Sitio mellizo de demostración en un esquema separado, con aislamiento verificado.'],
 stats:[['3','sistemas en producción'],['0','dependencia del dev para editar']],
 tech:'Next.js 15 · TypeScript · Supabase · Vercel · Make.com · Brevo · Facebook Lead Ads · GitHub Actions',
 links:[],
 cover:'01-onboarding-inicio.webp',
 shots:[['01-onboarding-inicio.webp','El onboarding de afiliados, con el plan de siete pasos, el paso en curso con su video y la agenda de capacitaciones al costado. Un solo link, sin registro.'],['02-onboarding-paso.webp','Un paso abierto, con video, PDFs descargables y enlaces a herramientas. El cliente edita todo esto desde su panel, sin tocar código.'],['06-agenda-publica.webp','La agenda semanal de capacitaciones, con inscripción abierta. El selector de zona horaria convierte los horarios al país de cada inscripto.'],['08-make-escenario.webp','La automatización que captura los leads de Facebook y dispara la secuencia de cuatro correos.']],
 nota:'El dominio del cliente ya no está activo, así que los tres sistemas no se pueden visitar en vivo. Las capturas son del sistema funcionando en producción.'}
];

const OTHERS=[
['Luseo','EE.UU. / Colombia','Colaboración dentro del equipo del cliente sobre módulos de gestión de proyectos en Angular.'],
['SatManager','España','Servicio técnico en campo, con avisos con mapa y ruteo, albaranes con firma y facturación. Ionic.'],
['Cortex','Producto propio','Asistente personal por WhatsApp con recordatorios, gastos y notas por audio. FastAPI.'],
['Academia Thales','Perú','Aula virtual en Moodle y reemplazo de un WordPress comprometido por un sitio estático. Astro.'],
['The Argentino y Mosto Wine Store','Canadá / EE.UU.','Dos tiendas de exportación de productos argentinos, creadas desde cero. Shopify.',[['theargentino.com','https://theargentino.com/'],['mostowinestore.com','https://mostowinestore.com/']]],
['Tymonyz','Producto propio','Pipeline autónomo que convierte noticias en video, del guion a la voz, la edición y la publicación. Python.'],
['Expert Advisor MetaTrader 5','Cliente vía Workana','Robot de trading construido según la especificación del cliente. MQL5.'],
['30+ trabajos con reseña pública','Varios países','Bots de WhatsApp, aulas virtuales, tiendas, tableros y frontends. Verificables en Workana.']];

const METHOD=[
['Primero el alcance','Antes de escribir código dejamos por escrito qué entra y qué no. Sin sorpresas después.'],
['Ves avances desde la semana 1','Entrego por hitos. No desaparezco dos meses para volver con algo que no era.'],
['Tests como condición de entrega','Un hito no está entregado si no está cubierto. Por eso los sistemas siguen andando años después.'],
['Todo queda a tu nombre','Código, cuentas, dominios e infraestructura. No quedás atado a mí.']];

const STACK=[
['Lenguajes','Python|TypeScript|SQL|Dart|C#'],
['Backend y frontend','Node.js|NestJS|FastAPI|ASP.NET Core|Laravel|React|Next.js|Angular|Flutter|Astro|Tailwind'],
['Datos e infraestructura','PostgreSQL|MySQL|SQL Server|Supabase|Prisma|AWS|Terraform|Docker|Vercel|CI/CD'],
['IA e integraciones','LLMs con herramientas|Agentes en producción|Whisper|TTS|OpenCV|WhatsApp Cloud API|Google Maps|Mercado Pago|Twilio|Asterisk|n8n']];


const WORKANA='https://www.workana.com/freelancer/a47899bad3b852d35ff4ca118b9b2d45';
const TESTIMONIOS=[
['Vargasmatos','Buen programador y buena persona, seguiré contratándolo para mis demás proyectos y mantenimientos mensuales. 10/10',5,'Plataforma de video bajo demanda'],
['larcam2018','Es un excelente profesional, me dio soluciones más allá de lo esperado. Es bueno trabajar con personas que le agregan un plus a tu proyecto. ¡Recomendado!',5,'Web app con Firebase'],
['Yenireth Salazar','Excelente profesional, buena comunicación, muy amable y empático, y brinda soluciones. Lo recomiendo al 100%.',5,'Sistema de inteligencia artificial'],
['Mario Antonio Muñoz','Excelente trabajo. Muy profesional, rápido y claro en todo el proceso. Configuró todo correctamente y explicó cada paso de forma sencilla.',5,'Web profesional con pagos'],
['María José Taboada','Es una persona muy profesional y cumple con lo pactado y con las fechas de entrega. Se adapta perfectamente a cualquier trabajo y lo desarrolla sin problemas.',5,'Sistema de gestión de alumnos'],
['Natalia Gómez','Se adaptó a mí desde el principio y fue profesional en todo momento, aportando ideas de valor para que mi web se viera acorde a mi esencia y con buen posicionamiento.',5,'Sitio web con SEO'],
['Jaime Santos de Araújo','Gostei muito de trabalhar com Branco, ele é um ótimo profissional, muito ágil nas entregas, além de ter uma boa e rápida comunicação.',5,'App web con JWT y CRUD · Brasil'],
['Jesús Rojas','Muy buen trabajo, todo quedó excelente tal como lo pedí. Si había un cambio que hacer, se hacía de inmediato. 100% recomendado.',5,'Tienda digital'],
['Alfredo Falcón','Good quality of work in developing deliverables. Communication was clear and all the milestones were met.',4,'Interfaces de plataforma web · Angular']];

const SHORT={
'taxi-ai':'Una IA atiende la llamada, entiende la dirección hablada y despacha el taxi. Sin operador humano.',
'tu-proximo-horizonte':'Tres sistemas en producción que el cliente opera solo. Agenda, captación de leads y onboarding.',
'infinity-book':'App de escaneo con OCR e IA en 177 países. Rescaté el producto y publiqué la versión que está hoy en las tiendas.',
'signfloow':'SaaS multi-empresa con asistente de IA que consulta los datos reales del taller. 1.551 tests, en AWS.',
'lomas-del-pacifico':'Sistema de cobranza de lotes en cuotas, con planes de pago, recibos con folio, mora y morosidad.',
'blc-one':'Centraliza 237 plantas de energía renovable y sus compromisos regulatorios.',
'comanda-central':'Punto de venta, inventario y costeo real de recetas anidadas para gastronomía.',
'vertical':'SaaS que creé. Agentes de IA que atienden WhatsApp las 24 horas, califican al contacto y lo cargan en el CRM.',
'deltan-scan':'Una IA detecta y mide cada pieza dental sobre la radiografía. Segundos en vez de veinte minutos.'};
const chips=p=>p.tech.split(' · ').slice(0,4);

/* ---------- helpers ---------- */
const TECHC=[
 [/openai|gpt|llm|agentes|whisper|tts|ffmpeg|opencv|yolo|whatsapp|twilio|asterisk|mercado pago|maps|make\.com|n8n|brevo|stripe|gemini|claude|lead ads|deepgram|elevenlabs|tesseract|ml kit|firebase cloud messaging/i,'c-ia'],
 [/postgres|mysql|sql server|supabase|prisma|redis|firebase|mongo|sqlite|drizzle|kysely|typeorm|sequelize/i,'c-data'],
 [/aws|terraform|docker|vercel|github actions|ci\/cd|turborepo|fargate|aurora|nginx|cloudflare|railway|render|s3|ecs|linux|traefik|kubernetes|pm2|hetzner|digitalocean/i,'c-infra'],
 [/react|next\.js|angular|vue|flutter|astro|tailwind|vite|ionic|expo|blazor|streamlit|shopify|moodle/i,'c-front'],
 [/node|nest|fastapi|asp\.net|laravel|express|django|\.net|graphql|trpc|fastify|rest|socket/i,'c-back'],
 [/typescript|javascript|python|dart|c#|\bsql\b|mql5|kotlin|swift|php|java\b/i,'c-lang']];
const CHIPC=[
 [/\bia\b|inteligencia|agentes|ocr|rag|llm|visi[oó]n/i,'t-ia'],
 [/app|m[oó]vil|escritorio|publicada|play|store/i,'t-app'],
 [/saas|plataforma|multi-empresa|crm|punto de venta|\bbi\b|sistema|automatiz|cobranzas|sin c[oó]digo/i,'t-sys'],
 [/producci[oó]n|en uso|tests|rescate|abierto|salud/i,'t-ok']];
const chipc=t=>{for(const g of CHIPC){if(g[0].test(t))return ' '+g[1];}return '';};
const tclass=t=>{for(const g of TECHC){if(g[0].test(t))return ' '+g[1];}return '';};

const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const YEAR=new Date().getFullYear();
const WA='https://wa.me/5493417824155';
const TEL='+54 9 3417 82-4155';

const head=(title,desc,canonical,depth,jsonld)=>{const r=depth?'../':'';const h=depth?'../index.html':'';return `<!DOCTYPE html>
<html lang="es-AR" class="scroll-smooth">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="author" content="Branco Blunda">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#111827">
<link rel="canonical" href="${canonical}">
<link rel="icon" type="image/svg+xml" href="${r}favicon.svg">
<link rel="icon" type="image/png" sizes="256x256" href="${r}favicon.png">
<link rel="apple-touch-icon" href="${r}apple-touch-icon.png">
<meta property="og:type" content="${depth?'article':'website'}">
<meta property="og:site_name" content="Branco Blunda">
<meta property="og:locale" content="es_AR">
<meta property="og:url" content="${canonical}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${SITE}/assets/images/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${SITE}/assets/images/og.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://cdn.jsdelivr.net">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${r}css/styles.css?v=${VCSS}">
<script type="application/ld+json">${JSON.stringify(jsonld)}</script>
</head>
<body class="bg-gray-900 text-gray-100 font-sans">

<a class="skip" href="#main">Ir al contenido</a>

<nav class="fixed top-0 w-full bg-gray-900 bg-opacity-95 backdrop-blur-md z-50 border-b border-gray-800">
  <div class="container mx-auto px-6 py-4">
    <div class="flex justify-between items-center">
      <a href="${r}index.html" class="brand" aria-label="Branco Blunda — inicio">
        <img src="${r}assets/images/logo-dark.svg" alt="Branco Blunda" class="brand-logo" width="178" height="225">
      </a>
      <div class="hidden md:flex space-x-8">
        <a href="${h}#portafolio" class="nav-link">Proyectos</a>
        <a href="${h}#servicios" class="nav-link">Qué hago</a>
        <a href="${h}#opiniones" class="nav-link">Opiniones</a>
        <a href="${h}#contacto" class="nav-link nav-cta">Contame tu proyecto</a>
      </div>
      <button id="menu-toggle" class="md:hidden text-2xl focus:outline-none" aria-label="Abrir menú" aria-expanded="false" aria-controls="mobile-menu"><i class="fas fa-bars"></i></button>
    </div>
    <div id="mobile-menu" class="hidden md:hidden mt-4 pb-4 space-y-4">
      <a href="${h}#portafolio" class="block nav-link-mobile">Proyectos</a>
      <a href="${h}#servicios" class="block nav-link-mobile">Qué hago</a>
      <a href="${h}#opiniones" class="block nav-link-mobile">Opiniones</a>
      <a href="${h}#contacto" class="block nav-link-mobile">Contame tu proyecto</a>
    </div>
  </div>
</nav>
<main id="main">`;};

/* dimensiones: dims.json para webp; lector propio para png/jpg */
const DIMS=(()=>{try{return JSON.parse(fs.readFileSync('assets/proyectos/dims.json','utf8'));}catch(e){return {};}})();
const imgSize=f=>{const k=f.replace(/\\/g,'/');if(DIMS[k])return DIMS[k];try{const b=fs.readFileSync(f);
 if(b[0]===0x89&&b[1]===0x50)return{w:b.readUInt32BE(16),h:b.readUInt32BE(20)};
 if(b[0]===0xFF&&b[1]===0xD8){let i=2;while(i<b.length-9){if(b[i]!==0xFF){i++;continue;}const m=b[i+1];
  if(m>=0xC0&&m<=0xCF&&m!==0xC4&&m!==0xC8&&m!==0xCC)return{h:b.readUInt16BE(i+5),w:b.readUInt16BE(i+7)};
  i+=2+b.readUInt16BE(i+2);}}}catch(e){}return null;};

/* imagen con placeholder si falta */
const shot=(slug,file,alt,depth,cls,zoom)=>{const r=depth?'../':'';
const rel='assets/proyectos/'+slug+'/'+file, d=imgSize(path.join('assets','proyectos',slug,file));
const dim=d?` width="${d.w}" height="${d.h}"`:'';
return `<img src="${r}${rel}" alt="${esc(alt)}" class="${cls}"${dim} loading="lazy" decoding="async"${zoom?' data-zoom="1"':''} data-file="${rel}" onerror="this.parentElement.classList.add('img-missing');this.parentElement.setAttribute('data-missing',this.dataset.file);this.remove()">`;};
const gitem=(slug,pair,depth)=>{const f=Array.isArray(pair)?pair[0]:pair, c=Array.isArray(pair)?pair[1]:'';
return `<figure class="gitem"><div class="gitem-img">${shot(slug,f,c||'Captura',depth,'',true)}</div>${c?`<figcaption>${esc(c)}</figcaption>`:''}</figure>`;};

const foot=depth=>{const r=depth?'../':'';return `
</main>
${depth?'<div class="read-progress" id="read-progress"></div>':''}
<footer class="py-12 px-6 bg-gray-800 bg-opacity-50 border-t border-gray-800">
  <div class="container mx-auto">
    <div class="flex flex-col md:flex-row justify-between items-center gap-6">
      <div class="text-center md:text-left">
        <div class="flex items-center justify-center md:justify-start gap-3 mb-2">
          <img src="${r}assets/images/logo-dark.svg" alt="" class="brand-logo" width="178" height="225">
          <span class="text-lg font-bold">Branco Blunda</span>
        </div>
        <p class="text-gray-500 text-sm">Software Engineer · Rosario, Argentina</p>
      </div>
      <div class="flex gap-6">
        <a href="${GITHUB}" target="_blank" rel="noopener noreferrer" class="social-icon-footer" aria-label="GitHub"><i class="fab fa-github text-xl"></i></a>
        <a href="${LINKEDIN}" target="_blank" rel="noopener noreferrer" class="social-icon-footer" aria-label="LinkedIn"><i class="fab fa-linkedin text-xl"></i></a>
        <a href="${WORKANA}" target="_blank" rel="noopener noreferrer" class="social-icon-footer" aria-label="Workana"><i class="fas fa-briefcase text-xl"></i></a>
        <a href="${WA}" target="_blank" rel="noopener noreferrer" class="social-icon-footer" aria-label="WhatsApp"><i class="fab fa-whatsapp text-xl"></i></a>
        <a href="mailto:${MAIL}" class="social-icon-footer" aria-label="Email"><i class="fas fa-envelope text-xl"></i></a>
      </div>
      <div class="text-center md:text-right">
        <p class="text-gray-500 text-sm">© <span id="current-year">${YEAR}</span> Branco Blunda</p>
        <p class="text-gray-600 text-xs mt-1">Hecho con <i class="fas fa-heart text-red-500"></i> y mucho código</p>
      </div>
    </div>
  </div>
</footer>
<a class="wa-float" href="${WA}?text=Hola%20Branco,%20te%20escribo%20por%20un%20proyecto" target="_blank" rel="noopener" aria-label="Escribime por WhatsApp">
  <i class="fab fa-whatsapp"></i><span>Escribime</span>
</a>
<button id="scroll-top" class="scroll-top-btn" aria-label="Volver arriba"><i class="fas fa-arrow-up"></i></button>
<script src="${r}js/main.js?v=${VJS}"></script>
</body>
</html>`;};


/* ---------- servicios ---------- */
const SERVICIOS=[
['fas fa-robot','from-green-400 to-cyan-500','Agentes de IA y automatización',
 'IA que atiende el teléfono y el WhatsApp, entiende lo que le piden y resuelve sola. Hoy son 50.000 llamadas por mes.',
 ['Agentes de voz sobre telefonía','Agentes de WhatsApp con API oficial','Sistemas RAG, donde la IA responde con tus documentos','LLMs con acceso a los datos del negocio']],
['fas fa-layer-group','from-blue-500 to-purple-600','SaaS y plataformas a medida',
 'Plataformas multi-empresa que aguantan clientes reales, con tests y despliegue automatizado.',
 ['Arquitectura multi-empresa','Paneles y motores de cálculo','AWS, Docker y CI/CD']],
['fas fa-mobile-screen','from-yellow-400 to-orange-500','Apps móviles y publicación',
 'Apps en Google Play y App Store, con 8.900+ usuarios en 177 países. Incluida la parte que nadie quiere hacer, las tiendas y las cuentas.',
 ['Flutter y Android nativo','Publicación en Google Play y App Store','Migración de apps heredadas']]];

/* ---------- index ---------- */
const LD_HOME={'@context':'https://schema.org','@graph':[
{'@type':'Person','@id':SITE+'/#branco','name':'Branco Blunda','jobTitle':'Software Engineer',
 'url':SITE+'/','image':SITE+'/assets/images/foto.webp','email':'mailto:'+MAIL,'telephone':'+5493417824155',
 'address':{'@type':'PostalAddress','addressLocality':'Rosario','addressRegion':'Santa Fe','addressCountry':'AR'},
 'sameAs':[GITHUB,LINKEDIN,WORKANA],
 'worksFor':{'@type':'Organization','name':'RedChat','url':'https://redchat.com.ar'},
 'knowsAbout':['Inteligencia artificial','Agentes conversacionales','WhatsApp Business API','SaaS multi-tenant','Node.js','Python','TypeScript','React','Next.js','NestJS','Flutter','PostgreSQL','AWS','Terraform'],
 'knowsLanguage':['es','en']},
{'@type':'WebSite','@id':SITE+'/#web','url':SITE+'/','name':'Branco Blunda — Software Engineer',
 'inLanguage':'es-AR','publisher':{'@id':SITE+'/#branco'}},
{'@type':'ProfessionalService','@id':SITE+'/#servicio','name':'Branco Blunda — Desarrollo de software a medida',
 'url':SITE+'/','image':SITE+'/assets/images/og.png','priceRange':'$$','telephone':'+5493417824155',
 'founder':{'@id':SITE+'/#branco'},
 'address':{'@type':'PostalAddress','addressLocality':'Rosario','addressCountry':'AR'},
 'areaServed':['AR','ES','MX','CO','US'],
 'description':'Desarrollo de software a medida, agentes de voz y de WhatsApp con IA, SaaS multi-empresa, apps móviles publicadas y automatización de procesos.',
 'hasOfferCatalog':{'@type':'OfferCatalog','name':'Servicios','itemListElement':SERVICIOS.map(x=>({'@type':'Offer','itemOffered':{'@type':'Service','name':x[2],'description':x[3]}}))}},
{'@type':'ItemList','name':'Proyectos','itemListElement':PROJECTS.map((pr,i)=>({'@type':'ListItem','position':i+1,'url':SITE+'/proyectos/'+pr.slug+'.html','name':pr.title}))}
]};

let idx=head('Branco Blunda | Software Engineer — Agentes de IA, SaaS y apps a medida',
 'Software Engineer en Rosario. Construyo agentes de voz y de WhatsApp con IA, SaaS multi-empresa y apps publicadas. 55+ proyectos entregados, 30+ reseñas de clientes.',
 SITE+'/',0,LD_HOME);

idx+=`
<section id="inicio" class="min-h-screen flex items-center justify-center pt-24 pb-16">
  <div class="container mx-auto px-6 md:px-12 lg:px-24">
    <div class="hero-grid">
      <div class="hero-txt">
        <div class="inline-block mb-4">
          <span class="px-4 py-2 bg-green-500 bg-opacity-10 border border-green-500 rounded-full text-green-400 text-sm font-mono">🚀 Disponible para proyectos</span>
        </div>
        <h1 class="text-5xl md:text-7xl font-bold mb-6 leading-tight"><span class="gradient-text">Branco </span>Blunda</h1>
        <h2 class="text-2xl md:text-3xl text-gray-300 mb-6 font-light">Software Engineer · Full Stack &amp; IA</h2>
        <p class="text-lg md:text-xl text-gray-400 mb-4 max-w-2xl">
          Construyo <span class="text-green-400 font-semibold">software a medida</span> para empresas y emprendedores que quieren
          bajar costos, automatizar procesos y meterle <span class="text-blue-400 font-semibold">IA</span> a lo que hoy hacen a mano.
        </p>
        <p class="text-gray-400 mb-4 max-w-2xl">Agentes de voz y de WhatsApp, SaaS multi-empresa y apps publicadas. Todo en producción, usado por gente real.</p>
        <p class="text-gray-500 mb-8 max-w-2xl">Hoy soy Software Engineer en RedChat, una plataforma de IA para ecommerce. Desarrollo software desde 2017 · Rosario, Argentina · Trabajo remoto.</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <a href="#portafolio" class="btn-primary"><i class="fas fa-folder-open mr-2"></i>Ver lo que construí</a>
          <a href="${WA}?text=Hola%20Branco,%20te%20escribo%20por%20un%20proyecto" target="_blank" rel="noopener" class="btn-secondary"><i class="fab fa-whatsapp mr-2"></i>Contame tu proyecto</a>
          <a href="assets/CV-Branco-Blunda.pdf" download class="btn-cv"><i class="fas fa-file-arrow-down mr-2"></i>Descargar CV</a>
        </div>
        <p class="trust-line"><i class="fas fa-star"></i> 30+ reseñas de clientes en Workana · #1 en Argentina</p>
        <div class="flex gap-6 mt-10 justify-center md:justify-start">
          <a href="${GITHUB}" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="GitHub"><i class="fab fa-github text-2xl"></i></a>
          <a href="${LINKEDIN}" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="LinkedIn"><i class="fab fa-linkedin text-2xl"></i></a>
          <a href="${WA}" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="WhatsApp"><i class="fab fa-whatsapp text-2xl"></i></a>
          <a href="mailto:${MAIL}" class="social-icon" aria-label="Email"><i class="fas fa-envelope text-2xl"></i></a>
        </div>
      </div>
      <div class="hero-foto">
        <div class="profile-container">
          <img src="assets/images/foto.webp" alt="Branco Blunda - Software Engineer" class="profile-image" loading="eager" width="800" height="800">
          <div class="profile-glow"></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="px-6 pb-8">
  <div class="container mx-auto">
    <div class="proof-bar">
      <div><strong>55+</strong><span>proyectos entregados como freelancer</span></div>
      <div><strong>4</strong><span>apps publicadas en Google&nbsp;Play y App&nbsp;Store</span></div>
      <div><strong>8.900+</strong><span>usuarios en 177 países en una sola app</span></div>
      <div><strong>50.000</strong><span>llamadas por mes atendidas por un sistema que construí</span></div>
      <div><strong>Meta</strong><span>verificó como proveedor de tecnología a Vertical, el SaaS que creé</span></div>
    </div>
    <p class="criterio">Lo difícil no es escribir el código. Es decidir <strong>qué se construye, qué se descarta</strong> y qué va a seguir funcionando dentro de dos años.</p>
  </div>
</section>

<section id="portafolio" class="py-20 px-6">
  <div class="container mx-auto">
    <div class="text-center mb-16">
      <h2 class="section-title">Trabajo</h2>
      <p class="text-gray-400 text-lg max-w-2xl mx-auto">Nueve de más de cincuenta. Todos en producción, con capturas del sistema real.</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
      ${PROJECTS.map(p=>`<div class="project-card">
        <a href="proyectos/${p.slug}.html" class="project-image-container">
          ${shot(p.slug,p.cover,p.title,0,'project-image')}
          <div class="project-overlay"><i class="fas fa-arrow-right text-3xl"></i></div>
        </a>
        <div class="p-6">
          <div class="text-xs font-mono text-gray-500 mb-2 uppercase tracking-wider">${esc(p.cliente)} · ${esc(p.pais)}</div>
          <h3 class="text-2xl font-bold mb-3">${esc(p.title)}</h3>
          <p class="text-gray-400 mb-4">${esc(SHORT[p.slug]||'')}</p>
          <div class="flex flex-wrap gap-2 mb-4">${p.tipos.map(c=>`<span class="tipo-tag${chipc(c)}">${esc(c)}</span>`).join('')}</div>
          <a href="proyectos/${p.slug}.html" class="text-blue-400 hover:text-blue-300 transition font-semibold"><i class="fas fa-arrow-right mr-1"></i> Ver el caso completo</a>
        </div>
      </div>`).join('')}
    </div>
    <div class="mt-12 text-center">
      <button class="btn-secondary" id="toggle-otros" aria-expanded="false" aria-controls="otros-list"><i class="fas fa-plus mr-2"></i>Ver otros trabajos</button>
      <div id="otros-list" hidden class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 text-left">
        ${OTHERS.map(o=>`<div class="glass-card p-6">
          <h4 class="text-lg font-bold mb-1">${esc(o[0])}</h4>
          <p class="text-xs font-mono text-gray-500 mb-3">${esc(o[1])}</p>
          <p class="text-gray-400 text-sm">${esc(o[2])}</p>${o[3]?`<p class="otros-links">${o[3].map(l=>`<a href="${l[1]}" target="_blank" rel="noopener"><i class="fas fa-external-link-alt"></i>${esc(l[0])}</a>`).join('')}</p>`:''}
        </div>`).join('')}
      </div>
    </div>
  </div>
</section>

<section id="servicios" class="py-20 px-6 bg-gray-800 bg-opacity-50">
  <div class="container mx-auto">
    <div class="text-center mb-16">
      <h2 class="section-title">En qué te puedo ayudar</h2>
      <p class="text-gray-400 text-lg max-w-2xl mx-auto">Tres cosas, y las tres las construí y están en producción para clientes que pagan.</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      ${SERVICIOS.map(s=>`<div class="service-card">
        <div class="service-icon bg-gradient-to-br ${s[1]}"><i class="${s[0]} text-3xl"></i></div>
        <h3 class="text-2xl font-bold mb-4">${esc(s[2])}</h3>
        <p class="text-gray-400 mb-6">${esc(s[3])}</p>
        <ul class="space-y-2 text-sm text-gray-500">${s[4].map(i=>`<li><i class="fas fa-check text-green-400 mr-2"></i>${esc(i)}</li>`).join('')}</ul>
      </div>`).join('')}
    </div>
  </div>
</section>


<section id="opiniones" class="py-20 px-6">
  <div class="container mx-auto max-w-5xl">
    <div class="text-center mb-12">
      <h2 class="section-title">30+ clientes, 4,9 de 5</h2>
      <p class="text-gray-400 text-lg max-w-2xl mx-auto">Reseñas públicas en Workana, con nombre y proyecto. Todas verificables.</p>
    </div>
    <div class="marquee" aria-label="Reseñas de clientes">
      <div class="marquee-track">
        ${[...TESTIMONIOS,...TESTIMONIOS].map((t,i)=>`<figure class="testi glass-card"${i>=TESTIMONIOS.length?' aria-hidden="true"':''}>
          <div class="stars">${'<i class="fas fa-star"></i>'.repeat(Math.round(t[2]))}</div>
          <blockquote>“${esc(t[1])}”</blockquote>
          <figcaption><b>${esc(t[0])}</b><span>${esc(t[3])}</span></figcaption>
        </figure>`).join('')}
      </div>
    </div>
    <div class="text-center mt-10">
      <a href="${WORKANA}" target="_blank" rel="noopener" class="btn-secondary"><i class="fas fa-external-link-alt mr-2"></i>Ver todas las reseñas en Workana</a>
    </div>
  </div>
</section>
`;

idx+=`
<section id="metodo" class="py-20 px-6 bg-gray-800 bg-opacity-50">
  <div class="container mx-auto">
    <div class="text-center mb-16">
      <h2 class="section-title">Cómo trabajo</h2>
      <p class="text-gray-400 text-lg max-w-2xl mx-auto">Lo que suele salir mal en un proyecto de software, y cómo lo evito.</p>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      ${METHOD.map((m,i)=>`<div class="glass-card p-6">
        <div class="text-3xl font-bold gradient-text mb-3">0${i+1}</div>
        <h3 class="text-lg font-bold mb-2">${esc(m[0])}</h3>
        <p class="text-gray-400 text-sm">${esc(m[1])}</p>
      </div>`).join('')}
    </div>
  </div>
</section>

<section id="tecnologias" class="py-16 px-6">
  <div class="container mx-auto max-w-5xl">
    <div class="text-center mb-10">
      <h2 class="section-title">Stack</h2>
      <p class="text-gray-400 max-w-2xl mx-auto">Elijo la herramienta según el problema, no al revés.</p>
    </div>
    <dl class="stack-rows">
      ${STACK.map(g=>`<div><dt>${esc(g[0])}</dt><dd>${g[1].split('|').map(x=>`<span class="${tclass(x).trim()}">${esc(x)}</span>`).join('')}</dd></div>`).join('')}
    </dl>
    <div class="marquee tech-marquee" aria-hidden="true">
      <div class="marquee-track">
        ${(()=>{const all=STACK.flatMap(g=>g[1].split('|'));return [...all,...all].map(x=>`<span class="tm${tclass(x)}">${esc(x)}</span>`).join('');})()}
      </div>
    </div>
  </div>
</section>

<section id="contacto" class="py-20 px-6 bg-gray-800 bg-opacity-50">
  <div class="container mx-auto max-w-4xl">
    <div class="text-center mb-16">
      <h2 class="section-title">Hablemos de tu proyecto</h2>
      <p class="text-gray-400 text-lg max-w-2xl mx-auto">Escribime por WhatsApp o por mail si querés algo rápido, o dejame el formulario y te contesto con una propuesta. En los tres casos respondo el mismo día.</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="contacto-col">
        <div class="glass-card p-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-green-500 bg-opacity-20 rounded-lg flex items-center justify-center"><i class="fas fa-envelope text-green-400 text-xl"></i></div>
            <div><p class="text-sm text-gray-500">Email</p>
              <a href="mailto:${MAIL}" class="text-base font-semibold hover:text-green-400 transition break-all">${MAIL}</a>
              <button class="copy-mail" data-copy="${MAIL}" type="button"><i class="far fa-copy"></i> Copiar</button></div>
          </div>
        </div>
        <div class="glass-card p-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center"><i class="fab fa-whatsapp text-blue-400 text-xl"></i></div>
            <div><p class="text-sm text-gray-500">WhatsApp</p>
              <a href="${WA}" target="_blank" rel="noopener" class="text-lg font-semibold hover:text-blue-400 transition">${TEL}</a></div>
          </div>
        </div>
        <div class="glass-card p-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-purple-500 bg-opacity-20 rounded-lg flex items-center justify-center"><i class="fab fa-linkedin text-purple-400 text-xl"></i></div>
            <div><p class="text-sm text-gray-500">LinkedIn</p>
              <a href="${LINKEDIN}" target="_blank" rel="noopener" class="text-lg font-semibold hover:text-purple-400 transition">linkedin.com/in/brancoblunda</a></div>
          </div>
        </div>
        <div class="glass-card p-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-cyan-500 bg-opacity-20 rounded-lg flex items-center justify-center"><i class="fas fa-briefcase text-cyan-400 text-xl"></i></div>
            <div><p class="text-sm text-gray-500">Workana</p>
              <a href="${WORKANA}" target="_blank" rel="noopener" class="text-lg font-semibold hover:text-cyan-400 transition">30+ reseñas públicas</a></div>
          </div>
        </div>
        <div class="dispo">
          <span class="dispo-dot"></span>
          <div>
            <p><strong>Disponible para proyectos nuevos</strong></p>
            <p>Rosario, Argentina (GMT-3) · Trabajo remoto · Respondo el mismo día</p>
            <a href="assets/CV-Branco-Blunda.pdf" download class="dispo-cv"><i class="fas fa-file-arrow-down"></i>Descargar mi CV en PDF</a>
          </div>
        </div>
      </div>
      <div class="glass-card p-8 form-card">
        <h3 class="text-2xl font-bold mb-2">Contame tu proyecto</h3>
        <p class="text-gray-400 mb-6 text-sm">Cuatro datos y listo. Te respondo el mismo día con una propuesta concreta, sin compromiso.</p>
        <form class="form-contacto" action="https://formsubmit.co/${MAIL}" method="POST">
          <input type="hidden" name="_subject" value="Nueva consulta desde brancoblunda.github.io">
          <input type="hidden" name="_captcha" value="false">
          <input type="hidden" name="_template" value="table">
          <input type="hidden" name="_next" value="${SITE}/gracias.html">
          <input type="text" name="_honey" style="display:none" tabindex="-1" autocomplete="off">
          <label>Nombre y empresa
            <input type="text" name="nombre" required autocomplete="name" placeholder="Juan Pérez, Inmobiliaria del Sur">
          </label>
          <div class="form-row">
            <label><span class="lbl">Email</span>
              <input type="email" name="email" required autocomplete="email" placeholder="juan@empresa.com">
            </label>
            <label><span class="lbl">WhatsApp <em>(opcional)</em></span>
              <input type="tel" name="whatsapp" autocomplete="tel" placeholder="+54 9 ...">
            </label>
          </div>
          <label>Qué necesitás
            <select name="tipo" required>
              <option value="">Elegí una opción</option>
              <option>Agente de IA (voz o WhatsApp)</option>
              <option>Sistema o SaaS a medida</option>
              <option>App móvil</option>
              <option>Automatizar un proceso</option>
              <option>Arreglar o retomar algo que ya existe</option>
              <option>Todavía no sé, lo charlamos</option>
            </select>
          </label>
          <label>Contame el problema
            <textarea name="mensaje" rows="4" required placeholder="En dos líneas, qué hacen hoy a mano o qué querés que el sistema resuelva. No hace falta que sepas cómo."></textarea>
          </label>
          <button type="submit" class="btn-primary w-full"><i class="fas fa-paper-plane mr-2"></i>Enviar</button>
          <p class="form-nota">Te respondo el mismo día. Tus datos no van a ningún lado más que a mi correo.</p>
        </form>
      </div>
      </div>
    </div>
  </div>
</section>`;

idx+=foot(0);
fs.writeFileSync('index.html',idx);

/* ---------- paginas de caso ---------- */
if(!fs.existsSync('proyectos'))fs.mkdirSync('proyectos');
PROJECTS.forEach(p=>{
const url=SITE+'/proyectos/'+p.slug+'.html';
const LD={'@context':'https://schema.org','@graph':[
{'@type':'CreativeWork','@id':url+'#caso','name':p.title,'url':url,'description':p.desc,
 'image':SITE+'/assets/proyectos/'+p.slug+'/'+p.cover,
 'creator':{'@type':'Person','name':'Branco Blunda','url':SITE+'/'},
 'about':p.tech.split(' · '),'inLanguage':'es-AR'},
{'@type':'BreadcrumbList','itemListElement':[
 {'@type':'ListItem','position':1,'name':'Inicio','item':SITE+'/'},
 {'@type':'ListItem','position':2,'name':'Proyectos','item':SITE+'/#portafolio'},
 {'@type':'ListItem','position':3,'name':p.title,'item':url}]}]};
let h=head(p.title+' — '+p.cliente+' | Branco Blunda',p.desc.slice(0,155),url,1,LD);
h+=`
<section class="case-hero px-6">
  <div class="container mx-auto max-w-5xl">
    <a href="../index.html#portafolio" class="volver"><i class="fas fa-arrow-left mr-2"></i>Todos los proyectos</a>
    <span class="case-tag">${esc(p.tag)}</span>
    <h1 class="case-title"><span class="gradient-text">${esc(p.title)}</span></h1>
    <p class="case-lede">${esc(p.desc)}</p>
    <ul class="case-meta">
      <li><span>Cliente</span><b>${esc(p.cliente)}</b></li>
      <li><span>País</span><b>${esc(p.pais)}</b></li>
      <li><span>Rol</span><b>${esc(p.rol)}</b></li>
      <li><span>Estado</span><b>${esc(p.estado)}</b></li>
    </ul>
    ${p.stats.length?`<ul class="case-kpis">${p.stats.map(st=>`<li><b>${esc(st[0])}</b><span>${esc(st[1])}</span></li>`).join('')}</ul>${p.nota?`<p class="case-nota">${esc(p.nota)}</p>`:''}`:''}
  </div>
</section>

<section class="px-6 pb-6">
  <div class="container mx-auto max-w-6xl">
    <div class="carousel" data-carousel aria-roledescription="carrusel" aria-label="Capturas de ${esc(p.title)}">
      <div class="carousel-stage">
        ${[[p.cover,(p.shots.find(x=>x[0]===p.cover)||['',''])[1]||p.title]].concat(p.shots.filter(x=>x[0]!==p.cover)).map((sh,i)=>`<figure class="carousel-slide${i===0?' is-active':''}" data-i="${i}">
          ${shot(p.slug,sh[0],sh[1]||p.title,1,'',true)}
        </figure>`).join('')}
        <button class="carousel-btn prev" type="button" aria-label="Anterior"><i class="fas fa-chevron-left"></i></button>
        <button class="carousel-btn next" type="button" aria-label="Siguiente"><i class="fas fa-chevron-right"></i></button>
        <span class="carousel-count"><b>1</b> / ${1+p.shots.filter(x=>x[0]!==p.cover).length}</span>
      </div>
      <div class="carousel-caption">
        ${[[p.cover,(p.shots.find(x=>x[0]===p.cover)||['',''])[1]||p.title]].concat(p.shots.filter(x=>x[0]!==p.cover)).map((sh,i)=>`<p class="carousel-cap${i===0?' is-active':''}" data-i="${i}">${esc(sh[1]||'')}</p>`).join('')}
      </div>
      <div class="carousel-dots" role="tablist"></div>
    </div>
    <p class="carousel-hint"><i class="fas fa-search-plus"></i> Tocá una captura para verla grande</p>
  </div>
</section>

<section class="py-12 px-6">
  <div class="container mx-auto max-w-5xl">
    <div class="case-split">
      <div>
        <h2 class="case-h2 text-green-400">El problema</h2>
        <p class="case-p">${esc(p.problema)}</p>
        <div class="ba">
          <div class="ba-antes"><span>Antes</span><p>${esc(p.antes)}</p></div>
          <div class="ba-flecha"><i class="fas fa-arrow-right"></i></div>
          <div class="ba-despues"><span>Después</span><p>${esc(p.despues)}</p></div>
        </div>
      </div>
      <div>
        <h2 class="case-h2 text-blue-400">Lo que construí</h2>
        <ul class="case-list one">${p.construido.map((c,i)=>`<li${i>=4?' class="more" hidden':''}>${esc(c)}</li>`).join('')}</ul>
        ${p.construido.length>4?`<button class="ver-mas" type="button" data-more>Ver los ${p.construido.length} puntos <i class="fas fa-chevron-down"></i></button>`:''}
      </div>
    </div>
  </div>
</section>

<section class="py-12 px-6 bg-gray-800 bg-opacity-50">
  <div class="container mx-auto max-w-5xl">
    <div class="case-tail${p.links.length?'':' solo'}">
      <div>
        <h2 class="case-h2 mb-5">Con qué está hecho</h2>
        <div class="flex flex-wrap gap-2">${p.tech.split(' · ').map(t=>`<span class="tech-badge sm${tclass(t)}">${esc(t)}</span>`).join('')}</div>
      </div>
      ${p.links.length?`<aside class="live-card">
        <h2 class="case-h2 mb-4">Verlo en vivo</h2>
        <div class="live-links">${p.links.map(l=>`<div class="live-par"><a href="${l[1]}" target="_blank" rel="noopener" class="live-btn"><i class="fas fa-external-link-alt"></i>${esc(l[0])}</a><a href="https://web.archive.org/web/2026/${l[1]}" target="_blank" rel="noopener" class="live-copia" title="Copia guardada en la Wayback Machine"><i class="fas fa-box-archive"></i>copia</a></div>`).join('')}</div>
        <p class="case-nota">Si un link deja de abrir, la copia archivada muestra cómo estaba el sistema.</p>
      </aside>`:''}
    </div>
  </div>
</section>

<section class="py-20 px-6 text-center">
  <div class="container mx-auto max-w-3xl">
    <h2 class="text-3xl font-bold mb-4">¿Tenés algo parecido entre manos?</h2>
    <p class="text-gray-400 mb-8">Contame el problema y lo charlamos.</p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="${WA}?text=Hola%20Branco,%20vi%20el%20caso%20de%20${encodeURIComponent(p.title)}" target="_blank" rel="noopener" class="btn-primary"><i class="fab fa-whatsapp mr-2"></i>Escribime</a>
      <a href="../index.html#portafolio" class="btn-secondary"><i class="fas fa-arrow-left mr-2"></i>Ver otros proyectos</a>
    </div>
  </div>
</section>`;
h+=foot(1);
fs.writeFileSync(path.join('proyectos',p.slug+'.html'),h);});

/* ---------- SEO: sitemap, robots, gracias y 404 ---------- */
const hoy=new Date().toISOString().slice(0,10);
const urls=[{u:SITE+'/',p:'1.0'}].concat(PROJECTS.map(p=>({u:SITE+'/proyectos/'+p.slug+'.html',p:'0.8'})));
fs.writeFileSync('sitemap.xml','<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+
 urls.map(x=>`  <url><loc>${x.u}</loc><lastmod>${hoy}</lastmod><changefreq>monthly</changefreq><priority>${x.p}</priority></url>`).join('\n')+'\n</urlset>\n');
fs.writeFileSync('robots.txt',`User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);

const simple=(titulo,cuerpo,file)=>{
 let g=head(titulo+' | Branco Blunda',titulo,SITE+'/'+file,0,{'@context':'https://schema.org','@type':'WebPage','name':titulo});
 g=g.replace('<meta name="robots" content="index, follow, max-image-preview:large">','<meta name="robots" content="noindex, follow">');
 g+=`<section class="pt-40 pb-32 px-6 text-center"><div class="container mx-auto max-w-2xl">${cuerpo}</div></section>`;
 g+=foot(0); fs.writeFileSync(file,g);};

simple('Mensaje enviado',`
 <div class="ok-icon"><i class="fas fa-check"></i></div>
 <h1 class="section-title" style="margin-bottom:1rem">Listo, me llegó</h1>
 <p class="text-gray-400 text-lg mb-8">Te respondo en menos de 24 horas. Si es urgente, escribime por WhatsApp y lo vemos ahora.</p>
 <div class="flex flex-col sm:flex-row gap-4 justify-center">
   <a href="${WA}" target="_blank" rel="noopener" class="btn-primary"><i class="fab fa-whatsapp mr-2"></i>Escribime por WhatsApp</a>
   <a href="index.html" class="btn-secondary"><i class="fas fa-arrow-left mr-2"></i>Volver al inicio</a>
 </div>`,'gracias.html');

simple('Página no encontrada',`
 <p class="mono" style="color:var(--primary-green);font-size:.8rem;letter-spacing:.15em">ERROR 404</p>
 <h1 class="section-title" style="margin:1rem 0">Esta página no existe</h1>
 <p class="text-gray-400 text-lg mb-8">Puede que el link esté viejo. Los proyectos están todos acá.</p>
 <div class="flex flex-col sm:flex-row gap-4 justify-center">
   <a href="index.html#portafolio" class="btn-primary"><i class="fas fa-folder-open mr-2"></i>Ver los proyectos</a>
   <a href="index.html" class="btn-secondary"><i class="fas fa-arrow-left mr-2"></i>Ir al inicio</a>
 </div>`,'404.html');
console.log('  + sitemap.xml, robots.txt, gracias.html, 404.html');

console.log('OK — index.html + '+PROJECTS.length+' paginas de caso');
