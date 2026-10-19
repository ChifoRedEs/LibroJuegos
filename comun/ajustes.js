/* =====================================================================
   AJUSTES DE TEXTO · LibroJuegos
   Módulo compartido por la biblioteca y por todas las historias.

   Qué hace
   - Guarda la tipografía y el tamaño de texto elegidos en localStorage
     (clave "librojuegos-ajustes-v1"), así que valen para toda la sesión y
     para futuras visitas, en la biblioteca y en cada historia.
   - Los aplica en cuanto carga la página (antes del primer pintado),
     sobrescribiendo las variables --f-texto y --f-ui y el tamaño base
     (font-size de <html>, en %). Todo lo demás está en rem y escala solo.
   - Dibuja el panel de ajustes (un <dialog>) cuando se abre por primera vez.

   Cómo se usa
   - Cárgalo en el <head>:   <script src="../comun/ajustes.js"></script>
   - Cualquier elemento con el atributo  data-ajustes  abre el panel.
   - También: LJAjustes.abrir()  /  LJAjustes.cerrar()

   Cómo añadir una tipografía: añade un objeto a FUENTES (abajo).
   ===================================================================== */
(function(){
'use strict';

var CLAVE = 'librojuegos-ajustes-v1';
var GF = 'https://fonts.googleapis.com/css2?';

/* pila  → lo que se aplica al texto y a la interfaz (null = la de cada historia)
   muestra → cómo se dibuja su nombre en el panel
   gf    → familia en Google Fonts (se descarga solo si se elige o se abre el panel) */
var FUENTES = [
  { id:'clasica', nombre:'Clásica', nota:'Alegreya, la original de los libros',
    pila:null, muestra:'"Alegreya",Georgia,serif' },
  { id:'literata', nombre:'Literata', nota:'Serif pensada para lecturas largas',
    pila:'"Literata",Georgia,"Times New Roman",serif', muestra:'"Literata",Georgia,serif',
    gf:'Literata:ital,wght@0,400;0,500;0,700;1,400;1,500' },
  { id:'merriweather', nombre:'Merriweather', nota:'Serif amplia, muy nítida en el móvil',
    pila:'"Merriweather",Georgia,serif', muestra:'"Merriweather",Georgia,serif',
    gf:'Merriweather:ital,wght@0,400;0,700;1,400;1,700' },
  { id:'atkinson', nombre:'Atkinson Hyperlegible', nota:'Sans con letras muy distinguibles',
    pila:'"Atkinson Hyperlegible",system-ui,sans-serif', muestra:'"Atkinson Hyperlegible",system-ui,sans-serif',
    gf:'Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700' },
  { id:'lexend', nombre:'Lexend', nota:'Sans abierta, para leer con fluidez',
    pila:'"Lexend",system-ui,sans-serif', muestra:'"Lexend",system-ui,sans-serif',
    gf:'Lexend:wght@400;500;700' },
  { id:'sistema', nombre:'Del sistema', nota:'La de tu dispositivo; carga al instante',
    pila:'system-ui,-apple-system,"Segoe UI",Roboto,sans-serif',
    muestra:'system-ui,-apple-system,"Segoe UI",Roboto,sans-serif' }
];

var TAMANOS = [
  { id:0, nombre:'Pequeño',    pct:90  },
  { id:1, nombre:'Normal',     pct:100 },
  { id:2, nombre:'Grande',     pct:115 },
  { id:3, nombre:'Muy grande', pct:130 },
  { id:4, nombre:'Enorme',     pct:145 }
];

var POR_DEFECTO = { fuente:'clasica', tam:1 };

function fuente(id){
  for(var i=0;i<FUENTES.length;i++) if(FUENTES[i].id===id) return FUENTES[i];
  return null;
}

/* ---------- Persistencia ---------- */
function leer(){
  var a = { fuente:POR_DEFECTO.fuente, tam:POR_DEFECTO.tam };
  try{
    var j = JSON.parse(localStorage.getItem(CLAVE) || 'null');
    if(j){
      if(fuente(j.fuente)) a.fuente = j.fuente;
      if(typeof j.tam === 'number' && TAMANOS[j.tam]) a.tam = j.tam;
    }
  }catch(e){}
  return a;
}
function guardar(a){
  try{ localStorage.setItem(CLAVE, JSON.stringify(a)); return true; }
  catch(e){ return false; }
}
function olvidar(){
  try{ localStorage.removeItem(CLAVE); return true; }
  catch(e){ return false; }
}

/* ---------- Aplicación a la página ---------- */
function enlaceFuentes(id, familias){
  if(!familias.length || document.getElementById(id)) return;
  var l = document.createElement('link');
  l.id = id; l.rel = 'stylesheet';
  l.href = GF + familias.map(function(f){ return 'family=' + f; }).join('&') + '&display=swap';
  document.head.appendChild(l);
}

function aplicar(a){
  var r = document.documentElement, f = fuente(a.fuente), t = TAMANOS[a.tam];
  if(f.pila){
    r.style.setProperty('--f-texto', f.pila);
    r.style.setProperty('--f-ui', f.pila);
    if(f.gf) enlaceFuentes('lj-fuente-' + f.id, [f.gf]);
  }else{
    r.style.removeProperty('--f-texto');
    r.style.removeProperty('--f-ui');
  }
  if(t.pct === 100) r.style.removeProperty('font-size');
  else r.style.fontSize = t.pct + '%';
  r.setAttribute('data-fuente', f.id);
  r.setAttribute('data-tam', String(t.id));
}

var estado = leer();
aplicar(estado);   /* antes del primer pintado */

/* ---------- Panel ---------- */
var dlg = null, origen = null;

var CSS = [
'.lj-aj{--aj-fondo:var(--fondo2,var(--papel-2,#1b2340));--aj-texto:var(--texto,var(--tinta,#ece4d2));',
'--aj-tenue:var(--tenue,#9298ad);--aj-oro:var(--oro,var(--acento,#c9a75b));--aj-linea:var(--linea,#2c3558);',
'padding:0;border:1px solid var(--aj-linea);border-radius:14px;background:var(--aj-fondo);color:var(--aj-texto);',
'width:min(520px,calc(100vw - 24px));max-width:none;max-height:88vh;max-height:min(88dvh,780px);',
'font:400 16px/1.45 var(--f-ui,system-ui,sans-serif);box-shadow:0 30px 80px -20px rgba(0,0,0,.7);overflow:hidden}',
'.lj-aj[open]{display:flex;flex-direction:column;animation:lj-entra .28s cubic-bezier(.2,.7,.2,1)}',
'.lj-aj::backdrop{background:rgba(6,9,18,.62)}',
'@keyframes lj-entra{from{opacity:0;transform:translateY(12px)}}',
'html.lj-bloqueo{overflow:hidden}',
'.lj-aj *{box-sizing:border-box}',
'.lj-aj__cab{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 16px 12px 22px;border-bottom:1px solid var(--aj-linea)}',
'.lj-aj__cab h2{margin:0;font:600 24px/1.15 "Cormorant Garamond",Georgia,serif;color:var(--aj-texto)}',
'.lj-aj__x{display:grid;place-items:center;width:44px;height:44px;margin:-6px 0;padding:0;border:0;border-radius:50%;background:none;color:var(--aj-tenue);cursor:pointer}',
'.lj-aj__x:hover{color:var(--aj-oro)}',
'.lj-aj__x svg{width:20px;height:20px}',
'.lj-aj__cuerpo{flex:1;min-height:0;overflow-y:auto;padding:16px 22px 6px;overscroll-behavior:contain}',
'.lj-aj__muestra{flex:none;margin:14px 22px 0;padding:10px 16px;max-height:30vh;max-height:30dvh;overflow:auto;border:1px solid var(--aj-linea);border-radius:10px;',
'background:color-mix(in srgb,var(--aj-texto) 5%,transparent);font:400 calc(1.09rem) / 1.72 var(--f-texto,Georgia,serif);hyphens:auto}',
'.lj-aj fieldset{margin:0 0 20px;padding:0;border:0;min-width:0}',
'.lj-aj legend{display:flex;justify-content:space-between;align-items:baseline;gap:12px;width:100%;padding:0;margin-bottom:10px;',
'font:700 13px/1.3 var(--f-ui,system-ui,sans-serif);letter-spacing:.09em;text-transform:uppercase;color:var(--aj-oro)}',
'.lj-aj legend span{font-weight:500;letter-spacing:0;text-transform:none;color:var(--aj-tenue);font-size:14px}',
'.lj-aj input[type=radio]{position:absolute;opacity:0;width:1px;height:1px;margin:0}',
'.lj-f{display:block;position:relative;margin:0 0 7px;padding:8px 14px 8px 44px;border:1px solid var(--aj-linea);border-radius:10px;cursor:pointer}',
'.lj-f::before{content:"";position:absolute;left:15px;top:50%;width:16px;height:16px;margin-top:-8px;border:2px solid var(--aj-tenue);border-radius:50%}',
'.lj-f:hover{border-color:var(--aj-oro)}',
'.lj-f:has(input:checked){border-color:var(--aj-oro);background:color-mix(in srgb,var(--aj-oro) 10%,transparent)}',
'.lj-f:has(input:checked)::before{border-color:var(--aj-oro);background:radial-gradient(circle,var(--aj-oro) 0 38%,transparent 42%)}',
'.lj-f:has(input:focus-visible),.lj-t:has(input:focus-visible){outline:2px solid var(--aj-oro);outline-offset:2px}',
'.lj-f__n{display:block;font-size:18px;line-height:1.25;color:var(--aj-texto)}',
'.lj-f__d{display:block;margin-top:1px;font:400 13px/1.3 var(--f-ui,system-ui,sans-serif);color:var(--aj-tenue)}',
'.lj-aj__tams{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}',
'.lj-t{display:grid;place-items:end center;height:62px;padding-bottom:10px;border:1px solid var(--aj-linea);border-radius:10px;cursor:pointer;',
'font-family:var(--f-ui,system-ui,sans-serif);color:var(--aj-texto);line-height:1}',
'.lj-t:hover{border-color:var(--aj-oro)}',
'.lj-t:has(input:checked){border-color:var(--aj-oro);background:var(--aj-oro);color:var(--sobre-acento,#141a2e)}',
'.lj-aj__pie{display:flex;flex-wrap:wrap;align-items:center;gap:10px;padding:12px 22px;padding-bottom:calc(14px + env(safe-area-inset-bottom,0px));border-top:1px solid var(--aj-linea)}',
'.lj-aj__nota{flex:1 1 100%;margin:0 0 2px;font-size:13px;color:var(--aj-tenue)}',
'.lj-aj__pie button{flex:1;min-height:46px;padding:10px 16px;border-radius:10px;font:600 16px/1.2 var(--f-ui,system-ui,sans-serif);cursor:pointer;text-align:center;margin:0;width:auto}',
'.lj-aj__sec{background:none;border:1px solid var(--aj-linea);color:var(--aj-texto)}',
'.lj-aj__sec:hover{border-color:var(--aj-oro)}',
'.lj-aj__prim{background:var(--aj-oro);border:1px solid var(--aj-oro);color:var(--sobre-acento,#141a2e)}',
'.lj-aj button:focus-visible{outline:2px solid var(--aj-oro);outline-offset:2px}',
'@media (max-width:560px){',
'.lj-aj{width:100%;margin:auto 0 0;border-radius:16px 16px 0 0;border-bottom:0;max-height:92vh;max-height:92dvh}',
'.lj-aj__cuerpo{padding:14px 18px 4px}.lj-aj__muestra{margin:12px 18px 0}.lj-aj__pie{padding-left:18px;padding-right:18px}.lj-aj__cab{padding-left:18px}',
'}',
'@media (prefers-reduced-motion:reduce){.lj-aj[open]{animation:none}}'
].join('\n');

var ICONO_X = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';

function montar(){
  if(dlg) return;
  var st = document.createElement('style');
  st.id = 'lj-aj-css'; st.textContent = CSS;
  document.head.appendChild(st);

  var fuentesHtml = FUENTES.map(function(f){
    return '<label class="lj-f"><input type="radio" name="lj-fuente" value="' + f.id + '">' +
      '<span class="lj-f__n" style="font-family:' + f.muestra + '">' + f.nombre + '</span>' +
      '<span class="lj-f__d">' + f.nota + '</span></label>';
  }).join('');

  var tamsHtml = TAMANOS.map(function(t){
    return '<label class="lj-t" style="font-size:' + (14 + t.id * 4) + 'px">' +
      '<input type="radio" name="lj-tam" value="' + t.id + '" aria-label="' + t.nombre + ', ' + t.pct + ' %">' +
      '<span aria-hidden="true">A</span></label>';
  }).join('');

  dlg = document.createElement('dialog');
  dlg.className = 'lj-aj';
  dlg.setAttribute('aria-labelledby', 'lj-aj-tit');
  dlg.innerHTML =
    '<div class="lj-aj__cab"><h2 id="lj-aj-tit">Ajustes de Texto</h2>' +
      '<button type="button" class="lj-aj__x" data-lj="cerrar" aria-label="Cerrar">' + ICONO_X + '</button></div>' +
    '<p class="lj-aj__muestra" lang="es">La valquiria esperó tu respuesta <em>sin prisa</em>, ' +
      'y supiste que cada decisión dejaría su huella en el camino.</p>' +
    '<div class="lj-aj__cuerpo">' +
      '<fieldset><legend>Tamaño del texto <span id="lj-tam-txt" aria-live="polite"></span></legend>' +
        '<div class="lj-aj__tams">' + tamsHtml + '</div></fieldset>' +
      '<fieldset><legend>Tipografía</legend>' + fuentesHtml + '</fieldset>' +
    '</div>' +
    '<div class="lj-aj__pie"><p class="lj-aj__nota" id="lj-nota"></p>' +
      '<button type="button" class="lj-aj__sec" data-lj="reset">Restablecer</button>' +
      '<button type="button" class="lj-aj__prim" data-lj="cerrar">Listo</button></div>';
  document.body.appendChild(dlg);

  dlg.addEventListener('change', function(e){
    var n = e.target && e.target.name;
    if(n === 'lj-fuente') estado.fuente = e.target.value;
    else if(n === 'lj-tam') estado.tam = parseInt(e.target.value, 10);
    else return;
    aplicar(estado);
    pintarEstado(guardar(estado));
  });
  dlg.addEventListener('click', function(e){
    if(e.target === dlg){ cerrar(); return; }             /* clic en el fondo */
    var b = e.target.closest && e.target.closest('[data-lj]');
    if(!b) return;
    if(b.getAttribute('data-lj') === 'cerrar') cerrar();
    else if(b.getAttribute('data-lj') === 'reset'){
      estado = { fuente:POR_DEFECTO.fuente, tam:POR_DEFECTO.tam };
      aplicar(estado);
      pintarEstado(olvidar());
    }
  });
  dlg.addEventListener('close', function(){
    document.documentElement.classList.remove('lj-bloqueo');
    if(origen && origen.focus) origen.focus();
    origen = null;
  });
}

function pintarEstado(guardado){
  if(!dlg) return;
  var r;
  r = dlg.querySelector('input[name="lj-fuente"][value="' + estado.fuente + '"]'); if(r) r.checked = true;
  r = dlg.querySelector('input[name="lj-tam"][value="' + estado.tam + '"]');       if(r) r.checked = true;
  var t = TAMANOS[estado.tam];
  dlg.querySelector('#lj-tam-txt').textContent = t.nombre + ' · ' + t.pct + ' %';
  dlg.querySelector('#lj-nota').textContent = guardado === false
    ? 'No se ha podido guardar en este navegador; el cambio vale solo hasta que cierres la página.'
    : 'Se guarda solo en este navegador y vale para todas las historias.';
}

function abrir(desde){
  montar();
  /* Para ver cada tipografía en su propio estilo hay que tenerlas todas cargadas */
  enlaceFuentes('lj-fuentes-todas', FUENTES.filter(function(f){ return f.gf; }).map(function(f){ return f.gf; }));
  estado = leer();
  aplicar(estado);
  pintarEstado();
  origen = desde || document.activeElement;
  document.documentElement.classList.add('lj-bloqueo');
  if(typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open','');
  dlg.querySelector('.lj-aj__cuerpo').scrollTop = 0;
  var sel = dlg.querySelector('input[name="lj-tam"]:checked');
  if(sel) sel.focus({ preventScroll:true });
}
function cerrar(){
  if(!dlg) return;
  if(typeof dlg.close === 'function') dlg.close(); else dlg.removeAttribute('open');
}

/* Cualquier elemento con data-ajustes abre el panel (funciona aunque el script se cargue en el <head>) */
document.addEventListener('click', function(e){
  var b = e.target.closest && e.target.closest('[data-ajustes]');
  if(!b) return;
  e.preventDefault();
  abrir(b);
});

/* Si cambian en otra pestaña, o se vuelve con «Atrás» desde la caché, se resincroniza */
function resincronizar(){ estado = leer(); aplicar(estado); pintarEstado(); }
window.addEventListener('storage', function(e){ if(e.key === CLAVE || e.key === null) resincronizar(); });
window.addEventListener('pageshow', function(e){ if(e.persisted) resincronizar(); });

window.LJAjustes = { abrir:abrir, cerrar:cerrar, leer:leer, FUENTES:FUENTES, TAMANOS:TAMANOS };
})();
