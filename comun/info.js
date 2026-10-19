/* =====================================================================
   AYUDAS «i» · LibroJuegos
   Icono amarillo «i» que abre una ventana con la explicación de una
   función del juego. Lo comparten todas las historias.

   Cómo se usa (en el <head> de la historia, DESPUÉS de este archivo van los textos):
     <script src="../comun/info.js"></script>
     <script src="../comun/info-textos.js"></script>

   En el motor de cada historia:
     LJInfo.libro = 'dao';              // o 'senda': elige las variantes de cada texto
     LJInfo.i('tiempo')                 // → HTML del icono, para ponerlo dentro de un texto
     LJInfo.fila('dormir')              // → icono alineado a la derecha del botón anterior

   Los textos viven en comun/info-textos.js (uno por función).
   Cada texto: LJInfo.registrar({ id:{ t:'Título', h:{ '*':'común', dao:'solo Dao', senda:'solo Senda' } } })
   ===================================================================== */
(function(){
'use strict';

var TEXTOS = {};
var dlg = null, origen = null;

function registrar(obj){ for(var k in obj) TEXTOS[k] = obj[k]; }

function cuerpo(e){
  var h = e.h;
  h = (typeof h === 'string') ? h : (h['*'] || '') + (h[LJInfo.libro] || '');
  if(e.ver && e.ver.length){
    var bs = e.ver.filter(function(v){ return TEXTOS[v]; }).map(function(v){
      return '<button type="button" data-ver="' + v + '">' + TEXTOS[v].t + '</button>';
    }).join('');
    if(bs) h += '<div class="ver"><h3>Ver también</h3>' + bs + '</div>';
  }
  return h;
}

/* Icono «i». Es un <button> aparte (nunca va dentro de otro botón). */
function icono(id){
  var e = TEXTOS[id];
  if(!e) return '';
  return '<button type="button" class="info" data-info="' + id + '" aria-label="Más información: ' + e.t + '" title="Más información">i</button>';
}
/* Icono en su propia fila, pegado a la derecha del botón que le precede (decisiones, menú) */
function fila(id){
  var i = icono(id);
  return i ? '<span class="i-row">' + i + '</span>' : '';
}

var CSS = [
'.lj-in{--in-fondo:var(--papel,#201d19);--in-texto:var(--tinta,#ebe1cb);--in-tenue:var(--tenue,#a59b86);',
'--in-linea:var(--linea,#4a4337);--in-acento:var(--acento,#c9a75b);--in-info:var(--info-bg,#f2c230);--in-info-tx:var(--info-tx,#1d1600);',
'padding:0;border:1px solid var(--in-linea);border-radius:10px;background:var(--in-fondo);color:var(--in-texto);',
'width:min(560px,calc(100vw - 24px));max-width:none;max-height:86vh;max-height:86dvh;',
'font:400 1rem/1.55 var(--f-texto,Georgia,serif);box-shadow:0 30px 80px -20px rgba(0,0,0,.65);overflow:hidden}',
'.lj-in[open]{display:flex;flex-direction:column;animation:lj-in-entra .25s cubic-bezier(.2,.7,.2,1)}',
'.lj-in::backdrop{background:rgba(8,7,5,.62)}',
'@keyframes lj-in-entra{from{opacity:0;transform:translateY(12px)}}',
'html.lj-in-bloqueo{overflow:hidden}',
'.lj-in *{box-sizing:border-box}',
'.lj-in__cab{display:flex;align-items:center;gap:12px;padding:14px 10px 12px 18px;border-bottom:1px solid var(--in-linea)}',
'.lj-in__ic{flex:none;display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:var(--in-info);color:var(--in-info-tx);',
'font:italic 700 1.1rem/1 Georgia,"Times New Roman",serif;box-shadow:0 0 0 1px rgba(0,0,0,.28)}',
'.lj-in__cab h2{flex:1;margin:0;font:600 1.2rem/1.25 var(--f-titulo,var(--f-texto,Georgia,serif));color:var(--in-acento);text-align:left}',
'.lj-in__x{flex:none;display:grid;place-items:center;width:44px;height:44px;margin:-6px 0;padding:0;border:0;border-radius:50%;background:none;color:var(--in-tenue);cursor:pointer}',
'.lj-in__x:hover{color:var(--in-acento)}.lj-in__x svg{width:20px;height:20px}',
'.lj-in__cuerpo{flex:1;min-height:0;overflow-y:auto;padding:16px 20px 6px;overscroll-behavior:contain;text-align:left}',
'.lj-in__cuerpo p{margin:0 0 .85em;text-indent:0;text-align:left;hyphens:manual}',
'.lj-in__cuerpo p::after{content:none}',
'.lj-in__cuerpo h3{margin:1.1em 0 .35em;font:700 .8rem/1.3 var(--f-ui,system-ui,sans-serif);letter-spacing:.09em;text-transform:uppercase;color:var(--in-acento);text-align:left}',
'.lj-in__cuerpo ol,.lj-in__cuerpo ul{margin:0 0 .9em;padding-left:1.35em}',
'.lj-in__cuerpo li{margin:0 0 .45em;padding-left:.2em}',
'.lj-in__cuerpo li::marker{color:var(--in-acento);font-weight:700}',
'.lj-in__cuerpo b{color:var(--in-texto)}',
'.lj-in__cuerpo .ej{margin:.2em 0 1em;padding:.7em .9em;border:1px solid var(--in-linea);border-left:3px solid var(--in-info);border-radius:4px;',
'background:color-mix(in srgb,var(--in-texto) 5%,transparent);font-size:.95em}',
'.lj-in__cuerpo .ej p{margin:0 0 .4em}.lj-in__cuerpo .ej p:last-child{margin:0}',
'.lj-in__cuerpo .tip{margin:.2em 0 1em;padding:.2em 0 .2em .9em;border-left:3px solid var(--in-acento);color:var(--in-tenue);font-size:.95em}',
'.lj-in__cuerpo .m{display:inline-block;min-width:1.2em;text-align:center;font-weight:700}',
'.lj-in__cuerpo .ver{margin-top:1.2em;padding-top:.2em;border-top:1px solid var(--in-linea)}',
'.lj-in__cuerpo .ver button{display:inline-flex;align-items:center;gap:.5em;width:auto;margin:0 .5em .5em 0;padding:.45em .85em .45em .55em;border:1px solid var(--in-linea);border-radius:999px;',
'background:none;color:var(--in-texto);font:600 .88rem/1.2 var(--f-ui,system-ui,sans-serif);cursor:pointer;text-align:left}',
'.lj-in__cuerpo .ver button::before{content:"i";display:grid;place-items:center;flex:none;width:1.25rem;height:1.25rem;border-radius:50%;background:var(--in-info);color:var(--in-info-tx);font:italic 700 .8rem/1 Georgia,serif}',
'.lj-in__cuerpo .ver button:hover{border-color:var(--in-info)}',
'.lj-in__pie{padding:10px 20px;padding-bottom:calc(14px + env(safe-area-inset-bottom,0px));border-top:1px solid var(--in-linea)}',
'.lj-in__ok{display:block;width:100%;margin:0;min-height:46px;padding:10px 16px;border:1px solid var(--in-info);border-radius:8px;background:var(--in-info);',
'color:var(--in-info-tx);font:700 1rem/1.2 var(--f-ui,system-ui,sans-serif);text-align:center;cursor:pointer}',
'.lj-in__ok:hover{filter:brightness(1.07)}',
'.lj-in button:focus-visible{outline:2px solid var(--in-acento);outline-offset:2px}',
'@media (max-width:560px){.lj-in{width:100%;margin:auto 0 0;border-radius:14px 14px 0 0;border-bottom:0;max-height:90vh;max-height:90dvh}',
'.lj-in__cuerpo{padding:14px 18px 4px}}',
'@media (prefers-reduced-motion:reduce){.lj-in[open]{animation:none}}'
].join('\n');

var ICONO_X = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';

function montar(){
  if(dlg) return;
  var st = document.createElement('style');
  st.id = 'lj-in-css'; st.textContent = CSS;
  document.head.appendChild(st);
  dlg = document.createElement('dialog');
  dlg.className = 'lj-in';
  dlg.setAttribute('aria-labelledby', 'lj-in-tit');
  dlg.innerHTML =
    '<div class="lj-in__cab"><span class="lj-in__ic" aria-hidden="true">i</span><h2 id="lj-in-tit"></h2>' +
      '<button type="button" class="lj-in__x" data-lj-in="cerrar" aria-label="Cerrar">' + ICONO_X + '</button></div>' +
    '<div class="lj-in__cuerpo" id="lj-in-cuerpo"></div>' +
    '<div class="lj-in__pie"><button type="button" class="lj-in__ok" data-lj-in="cerrar">Entendido</button></div>';
  document.body.appendChild(dlg);
  dlg.addEventListener('click', function(e){
    if(e.target === dlg){ cerrar(); return; }
    var v = e.target.closest && e.target.closest('[data-ver]');
    if(v){ abrir(v.getAttribute('data-ver')); return; }
    if(e.target.closest && e.target.closest('[data-lj-in]')) cerrar();
  });
  dlg.addEventListener('close', function(){
    document.documentElement.classList.remove('lj-in-bloqueo');
    if(origen && document.contains(origen) && origen.focus) origen.focus({ preventScroll:true });
    origen = null;
  });
}

function abrir(id, desde){
  var e = TEXTOS[id];
  if(!e) return;
  montar();
  dlg.querySelector('#lj-in-tit').textContent = e.t;
  var c = dlg.querySelector('#lj-in-cuerpo');
  c.innerHTML = cuerpo(e);
  c.scrollTop = 0;
  if(dlg.hasAttribute('open')) return;          /* ya abierta: solo cambia el contenido («Ver también») */
  origen = desde || document.activeElement;
  document.documentElement.classList.add('lj-in-bloqueo');
  if(typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open','');
  dlg.querySelector('.lj-in__ok').focus({ preventScroll:true });
}
function cerrar(){
  if(!dlg) return;
  if(typeof dlg.close === 'function') dlg.close(); else dlg.removeAttribute('open');
}

/* Fase de captura: así el clic en la «i» nunca llega a otros botones ni a las decisiones */
document.addEventListener('click', function(e){
  var b = e.target.closest && e.target.closest('[data-info]');
  if(!b) return;
  e.preventDefault(); e.stopPropagation();
  abrir(b.getAttribute('data-info'), b);
}, true);

window.LJInfo = { libro:'', registrar:registrar, i:icono, fila:fila, abrir:abrir, cerrar:cerrar, TEXTOS:TEXTOS };
})();
