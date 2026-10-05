/* Motor: estado, tiempo, dados, combate por turnos, tiendas, forja, alquimia, guardado, validador */
const $=s=>document.querySelector(s),R=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),app=$('#app');
const SC={},CAPS=[];let S=null,UI={},mem=null;const KEY='qi-silente-v2';
function registrarCapitulo(c){CAPS.push(c);Object.assign(SC,c.escenas)}
const hs=s=>[...s].reduce((a,c)=>(a*31+c.charCodeAt(0))>>>0,7),
 shuf=(a,seed)=>{a=[...a];let x=seed>>>0||1;for(let i=a.length-1;i>0;i--){x=(x*1664525+1013904223)>>>0;const j=x%(i+1);[a[i],a[j]]=[a[j],a[i]]}return a};
const GEN={};function cur(){const s=SC[S.sc];return s.gen?{...s,...GEN[s.gen]()}:s}
const KIND={mercado:'shop',herreria:'shop',horno:'shop',herbolario:'shop',armeria:'shop',cazar:'hunt',jardines:'hunt',bosque:'hunt',socializar:'social',barracones:'social',tablon:'side',clase:'side',comedor:'side',dormitorio:'side',pei_leccion:'side',pabellon:'side',examen:'main',almacen:'main',wang_reto:'main',horno_queja:'main'};
const nuevo=()=>({sc:'inicio',hp:100,mhp:100,qi:30,mqi:30,xp:0,rn:0,rg:0,oro:50,dia:1,hora:8,st:{cu:3,es:3,me:3,su:3},inv:{},eq:{arma:null,arm:null},mej:{},tc:['golpe','palma'],fl:{},fin:[],f:null,cp:null});
function save(){const s=JSON.stringify(S);try{localStorage.setItem(KEY,s)}catch(e){mem=s}}
function load(){let s=null;try{s=localStorage.getItem(KEY)}catch(e){}s=s||mem;try{return s?JSON.parse(s):null}catch(e){return null}}
const has=k=>S.inv[k]||0,add=(k,n)=>{S.inv[k]=has(k)+n;if(S.inv[k]<=0)delete S.inv[k]};
const bonus=t=>{const k=S.eq[t=='arma'?'arma':'arm'];return k?(OBJ[k].atq||OBJ[k].def)+3*(S.mej[k]||0):0};
function snap(){const c=S.cp;S.cp=null;const s=JSON.stringify(S);S.cp=c;return s}
function items(x){return typeof x=='string'?{[x]:1}:x}
function ok(r){if(!r)return true;
 if(r.item&&Object.entries(items(r.item)).some(([k,n])=>has(k)<n))return false;
 if(r.fl&&!S.fl[r.fl])return false;if(r.no&&S.fl[r.no])return false;
 if(r.st&&S.st[r.st[0]]<r.st[1])return false;if(r.qi&&S.qi<r.qi)return false;
 if(r.oro&&S.oro<r.oro)return false;if(r.dia&&S.dia<r.dia)return false;
 if(r.rg&&S.rg<r.rg)return false;if(r.rn&&S.rn<r.rn)return false;return true}
function avanza(h){S.hora+=h;while(S.hora>=24){S.hora-=24;S.dia++;S.hp=Math.min(S.mhp,S.hp+30);UI.nota='Amanece. Recuperas 30 de Vida.'}}
function apply(f){if(!f)return;
 if(f.hp)S.hp=Math.max(0,Math.min(S.mhp,S.hp+f.hp));
 if(f.qi)S.qi=Math.max(0,Math.min(S.mqi,S.qi+f.qi));
 if(f.oro)S.oro=Math.max(0,S.oro+f.oro);
 if(f.item)for(const[k,n]of Object.entries(items(f.item)))add(k,n);
 if(f.quita)for(const[k,n]of Object.entries(items(f.quita)))add(k,-n);
 if(f.tc&&!S.tc.includes(f.tc))S.tc.push(f.tc);
 if(f.fl)Object.assign(S.fl,f.fl);
 if(f.st)for(const k in f.st)S.st[k]+=f.st[k];
 if(f.rango)S.rg=Math.max(S.rg,f.rango);
 if(f.t)avanza(f.t);
 if(f.dormir){S.hp=S.mhp;S.qi=S.mqi}
 if(f.mhp){S.mhp+=f.mhp;S.hp+=f.mhp}
 if(f.mqi){S.mqi+=f.mqi;S.qi+=f.mqi}
 if(f.xp){S.xp+=f.xp;while(S.rn<REINOS.length-1&&S.xp>=REINOS[S.rn+1].xp){S.rn++;S.mhp+=40;S.mqi+=20;S.hp=S.mhp;S.qi=S.mqi;UI.nota='Avanzas al reino «'+REINOS[S.rn].n+'».'}}}
const bar=(v,m,c,l)=>`<div class=bw><span>${l} ${v}/${m}</span><div class=bar><i class=${c} style="width:${Math.max(0,v/m*100)}%"></i></div></div>`;
function hud(){const h=S.hora;return `<header class=hud><div class=rw><b class=rn>${REINOS[S.rn].n}</b><span>Día ${S.dia} · ${h<13?'Mañana':h<19?'Tarde':'Noche'} ${h}:00</span><span class=oro>🪙 ${S.oro}</span></div><div class=rw>${bar(S.hp,S.mhp,'hp','Vida')}${bar(S.qi,S.mqi,'qi','Qi')}</div><div class=rw><span>${RANGOS[S.rg]}</span><span><button class=sm onclick="stat()">Estado</button> <button class=sm onclick="menu()">Menú</button></span></div></header>`}

/* ---------- flujo ---------- */
function go(id){let sc=SC[id];if(!sc){app.innerHTML=`<p class=warn>Escena no encontrada: ${id}</p><button onclick="menu()">Menú</button>`;return}
 S.sc=id;UI.res=null;UI.tab='c';UI.stat=false;if(sc.gen)sc=cur();apply(sc.fx);
 if(sc.end&&!S.fin.includes(sc.end))S.fin.push(sc.end);
 if(sc.cp)S.cp=snap();
 const fe=sc.f&&(sc.f.e=='_dyn'?S.fe:sc.f.e);S.f=sc.f?{id:fe,hp:ENEMIGOS[fe].hp,g:0,it:rint(),lg:'Comienza el combate.'}:null;
 save();show()}
const rint=()=>Math.random()<.3?'carga':'atq';
function show(){UI.stat=false;const sc=cur();let h=hud()+misionBox()+'<div class=sc>';
 if(UI.nota){h+=`<p class=ok>${UI.nota}</p>`;UI.nota=null}
 if(sc.h)h+=`<h2>${sc.h}</h2>`;
 h+=sc.t.map(p=>`<p>${p}</p>`).join('');
 const back=sc.back?`<button onclick="go('${sc.back}')">Volver</button>`:'';
 if(UI.res)h+=UI.res;else if(S.f)h+=pFight();
 else if(sc.acertijo)h+=pRid(sc)+back;else if(sc.shop)h+=pShop(sc)+(sc.c?opts(sc):'')+back;else if(sc.forja)h+=pForja()+(sc.c?opts(sc):'')+back;else if(sc.alq)h+=pAlq()+(sc.c?opts(sc):'')+back;
 else if(sc.end)h+=`<p><span class=sello>Final: ${sc.end}</span></p>`+(sc.end.includes('Muerte')?`<button onclick="retry()">Volver al último punto de guardado</button>`:'')+`<button onclick="menu()">Menú principal</button>`;
 else h+=opts(sc);
 app.innerHTML=h+'</div>';window.scrollTo(0,0)}
function opts(sc){return sc.c.map((c,i)=>{const v=ok(c.req);return v||!c.oc?`<button class="k-${c.k||KIND[c.to]||'n'}" ${v?'':'disabled'} onclick="pick(${i})">${c.x}${v?'':' <span class=tag>(requisito no cumplido)</span>'}</button>`:''}).join('')}
function pick(i){const c=cur().c[i];if(!ok(c.req))return;apply(c.fx);if(c.fn)window[c.fn[0]](...c.fn.slice(1));
 if(c.chk){const k=c.chk,a=R(1,6),b=R(1,6),t=a+b+S.st[k.s],g=t>=k.dc;apply(g?k.fxok:k.fxko);
  if(S.hp<=0){save();return go('muerte')}
  UI.res=`<div class=dice>🎲 ${a} + ${b} + ${NM[k.s]} ${S.st[k.s]} = <b>${t}</b> contra ${k.dc}: <b class=${g?'ok':'warn'}>${g?'Éxito':'Fallo'}</b></div><button onclick="go('${g?k.ok:k.ko}')">Continuar</button>`;
  save();return show()}
 go(c.to)}
function retry(){S=S.cp?JSON.parse(S.cp):nuevo();save();go(S.sc)}

/* ---------- combate por turnos ---------- */
function pFight(){const F=S.f,E=ENEMIGOS[F.id],L={atq:'se prepara para atacar',carga:'acumula fuerza: ataque doble'};
 return `<div class=fight><b>${E.n}</b> <span class=tag>${E.cat||''}</span>${bar(F.hp,E.hp,'hp','Vida')}<div class=log>${F.lg}</div><p class=tag>Intención: ${E.n} ${L[F.it]}.</p><div class=row>${S.tc.map(k=>{const t=TECNICAS[k];return `<button ${S.qi<t.c?'disabled':''} onclick="turno('${k}')">${t.n}<br><span class=tag>${t.c} Qi · ${t.d[0]}-${t.d[1]}</span></button>`}).join('')}
 <button onclick="turno('_g')">Guardia<br><span class=tag>Reduce el daño</span></button><button onclick="turno('_m')">Meditar<br><span class=tag>+8 Qi</span></button><button onclick="turno('_f')">Huir<br><span class=tag>2d6+Mente vs 9</span></button>
 ${Object.keys(S.inv).filter(k=>OBJ[k].tipo=='consumible'&&(OBJ[k].ef.hp||OBJ[k].ef.qi)).map(k=>`<button onclick="turno('${k}')">${OBJ[k].n} ×${has(k)}</button>`).join('')}</div></div>`}
function turno(a){const F=S.f,E=ENEMIGOS[F.id],fs=cur().f,T=ST();let lg='';const g0=F.g;F.g=0;
 if(TECNICAS[a]){const t=TECNICAS[a];S.qi-=t.c;let d=R(t.d[0],t.d[1])+S.st[t.s]*2+T.atq+S.rn*5+(t.c?T.qi*2:0);
  if(Math.random()<.08+S.st.su*.01){d=Math.round(d*(1.5+T.crit/100));lg+='¡Golpe crítico! '}F.hp-=d;lg+=`Usas ${t.n}: ${d} de daño. `}
 else if(a=='_g'){F.g=1;lg+='Te cubres con guardia. '}
 else if(a=='_m'){S.qi=Math.min(S.mqi,S.qi+8);lg+='Respiras y recuperas 8 Qi. '}
 else if(a=='_f'){const r=R(1,6)+R(1,6)+S.st.me+Math.floor(T.vel/5);if(r>=9){S.f=null;save();return go(fs.flee)}lg+=`Fallas al huir (${r}). `}
 else if(OBJ[a]){apply(OBJ[a].ef);add(a,-1);lg+=`Usas ${OBJ[a].n}. `}
 if(F.hp<=0){S.f=null;const l=Object.entries(E.l||{}).map(([k,n])=>[k,n<1?(Math.random()<n?1:0):n]).filter(x=>x[1]);l.forEach(([k,n])=>add(k,n));apply({xp:E.xp,oro:E.o});
  UI.nota=`Victoria: +${E.xp} XP, +${E.o} 🪙${l.length?', botín: '+l.map(([k,n])=>n+'× '+OBJ[k].n).join(', '):''}.`+(UI.nota?' '+UI.nota:'');save();return go(fs.win)}
 let d=R(Math.round(E.a*.8),Math.round(E.a*1.2));if(F.it=='carga')d*=2;
 if(Math.random()*100<Math.min(40,Math.max(0,T.vel)))lg+=`Esquivas el ataque de ${E.n}.`;
 else{if(g0)d=Math.ceil(d*.4);d=Math.max(1,Math.round(d*(1-Math.min(60,T.def)/100))-T.arm);S.hp=Math.max(0,S.hp-d);lg+=`${E.n} te hiere: ${d}.`}
 F.lg=lg;F.it=rint();
 if(S.hp<=0){S.f=null;save();return go(fs.lose)}save();show()}

/* ---------- tienda, forja, alquimia ---------- */
function pShop(sc){const T=TIENDAS[sc.shop],v=UI.tab=='v',q=UI.qty||1;
 const L=v?Object.keys(S.inv).filter(k=>OBJ[k].tipo!='clave'):T.stock;
 return `<p class=tag>${T.n}</p>${cab()}<div class=row><button class="${v?'':'on'}" onclick="UI.tab='c';show()">Comprar</button><button class="${v?'on':''}" onclick="UI.tab='v';show()">Vender</button></div><div class=qty>Cantidad: ${[1,5,10,'max'].map(x=>`<button class="sm ${q==x?'on':''}" onclick="UI.qty=${x=='max'?"'max'":x};show()">${x=='max'?'Máx':'×'+x}</button>`).join(' ')}</div>`+
 (L.map(k=>{const o=OBJ[k],p=v?Math.floor(o.pr/2):o.pr,n=qn(k,v);return `<button ${n<1?'disabled':''} onclick="${v?'vender':'comprar'}('${k}')">${nm(k)}${v?' ×'+has(k):' <span class=tag>(tienes '+has(k)+')</span>'}<span class=pr>🪙 ${p*Math.max(n,1)}${n>1?' ('+n+')':''}</span><br><span class=tag>${o.d}${sl(o)}</span></button>`}).join('')||'<p class=tag>No llevas nada que vender.</p>')}
const qn=(k,v)=>{const p=v?Math.floor(OBJ[k].pr/2):OBJ[k].pr,mx=v?has(k):(p?Math.floor(S.oro/p):0),q=UI.qty||1;return q=='max'?mx:Math.min(q,mx)};
function comprar(k){const n=qn(k,0);if(n<1)return;S.oro-=n*OBJ[k].pr;add(k,n);save();show()}
function vender(k){const n=qn(k,1);if(n<1)return;S.oro+=n*Math.floor(OBJ[k].pr/2);add(k,-n);for(const s in S.eq)if(S.eq[s]==k&&!has(k))S.eq[s]=null;save();show()}
const rarTabs=()=>`<div class=qty>${[['todos','Todas'],...RAR.map(r=>[r.k,r.n])].map(([k,n])=>`<button class="sm ${(UI.fr||'todos')==k?'on':''}" onclick="UI.fr='${k}';show()">${n}</button>`).join(' ')}</div>`;
const rq=o=>Object.entries(o).map(([k,n])=>`<span class=${has(k)>=n?'ok':'warn'}>${n}× ${OBJ[k].n} (tienes ${has(k)})</span>`).join(', ');
const cab=()=>{const m=Object.keys(S.inv).filter(k=>OBJ[k].tipo=='material').map(k=>has(k)+'× '+OBJ[k].n).join(', ');return `<p class=tag>Tus monedas: <b class=oro>🪙 ${S.oro}</b><br>Tus materiales: ${m||'ninguno'}</p>`};
const co=c=>`<span class=pr><span class=${S.oro>=c?'oro':'warn'}>🪙 ${c}</span></span>`;
function pForja(){const eq=Object.keys(S.inv).filter(k=>EQT.includes(OBJ[k].tipo));
 return `<p class=tag>Herrero Tie · «Si se rompe, no fue mi martillo.»</p>${cab()}${rarTabs()}<b class=t>Forjar</b>`+FORJA.map((f,i)=>{if(UI.fr&&UI.fr!='todos'&&(OBJ[f.r].rar||'comun')!=UI.fr)return '';const y=S.oro>=f.oro&&Object.entries(f.mat).every(([k,n])=>has(k)>=n);return `<button ${y?'':'disabled'} onclick="forjar(${i})">${nm(f.r)}${co(f.oro)}<br><span class=tag>${sl(OBJ[f.r])}<br>${rq(f.mat)}</span></button>`}).join('')+
 `<b class=t>Mejorar</b>`+(eq.map(k=>{const n=S.mej[k]||0,c=40*(n+1),y=n<5&&S.oro>=c&&has('mineral_hierro')>=n+1;return `<button ${y?'':'disabled'} onclick="mejorar('${k}')">${nm(k)} +${n}${n<5?'':' (máx.)'}${co(c)}<br><span class=tag>${rq({mineral_hierro:n+1})} · ${OBJ[k].tipo=='arma'?'+3 ataque':'+2 armadura, +1 defensa'}</span></button>`}).join('')||'<p class=tag>No llevas armas ni armaduras.</p>')}
function forjar(i){const f=FORJA[i];S.oro-=f.oro;for(const k in f.mat)add(k,-f.mat[k]);add(f.r,1);avanza(2);save();show()}
function mejorar(k){const n=S.mej[k]||0;S.oro-=40*(n+1);add('mineral_hierro',-(n+1));S.mej[k]=n+1;avanza(1);save();show()}
function pAlq(){let h=`<p class=tag>Horno de Alquimia · cada refinado cuesta 1 hora</p>${cab()}`,c='';
 ALQ.forEach((a,i)=>{if(a.c!=c){c=a.c;h+=`<b class=t>${c}</b>`}const y=Object.entries(a.ing).every(([k,n])=>has(k)>=n);h+=`<button ${y?'':'disabled'} onclick="refinar(${i})">${OBJ[a.r].n} <span class=tag>(tienes ${has(a.r)})</span><br><span class=tag>${rq(a.ing)} · ${OBJ[a.r].d}</span></button>`});return h}
const ACERT={};function registrarAcertijos(o){Object.assign(ACERT,o)}
function pRid(sc){const A=ACERT[sc.acertijo],id=sc.acertijo;
 if(S.fl['ac_'+id])return `<p class=ok>Ya resolviste este enigma.</p>`;
 if(S.fl['af_'+id]===S.dia)return `<p class=warn>Hoy ya has fallado. Vuelve otro día con la mente despejada.</p>`;
 return `<div class=dice><b>${A.q}</b></div>`+shuf(A.o.map((o,i)=>i),S.dia*131+hs(id)).map(i=>`<button onclick="resolver('${id}',${i})">${A.o[i]}</button>`).join('')+`<p class=tag>Una respuesta equivocada te cuesta 1 hora y no podrás reintentar hasta mañana.</p>`}
function resolver(id,i){const A=ACERT[id],b=cur().back;
 if(i==A.k){S.fl['ac_'+id]=true;apply(A.fx);UI.res=`<p class=ok>${A.ok}</p><button onclick="go('${b}')">Continuar</button>`}
 else{S.fl['af_'+id]=S.dia;avanza(1);UI.res=`<p class=warn>${A.ko}</p><button onclick="go('${b}')">Continuar</button>`}
 save();show()}
function refinar(i){const a=ALQ[i];for(const k in a.ing)add(k,-a.ing[k]);add(a.r,1);avanza(1);save();show()}

/* ---------- menú, estado, trampa, validador ---------- */
const slotOf=k=>({arma:'arma',escudo:'esc',armadura:'arm'})[OBJ[k].tipo];
function equipar(k){S.eq[slotOf(k)]=k;save();statR()}
function usar(k){apply(OBJ[k].ef);add(k,-1);save();statR()}
function trampa(){const s=S||load();if(!s)return;S=s;S.oro+=5000;save();document.querySelector('.hud')?statR():menu()}
function stat(){if(UI.stat){UI.stat=false;return show()}statR()}
function statR(){UI.stat=true;const T=ST(),inv=Object.keys(S.inv);
 app.innerHTML=hud()+`<div class=sc><h2>Estado</h2><p>${Object.keys(NM).map(k=>NM[k]+' '+S.st[k]).join(' · ')}<br>Experiencia ${S.xp}${S.rn<REINOS.length-1?' / '+REINOS[S.rn+1].xp:''}</p>
 <div class=stats>${[['Ataque',T.atq],['Defensa',T.def+'%'],['Armadura',T.arm],['Crítico',T.crit+'%'],['Poder Qi',T.qi],['Velocidad',T.vel]].map(([a,b])=>`<span><b>${b}</b>${a}</span>`).join('')}</div>
 <p class=tag>Técnicas: ${S.tc.map(k=>TECNICAS[k].n).join(', ')}</p>
 <p class=tag>Equipo: ${['arma','esc','arm'].map(s=>S.eq[s]?nm(S.eq[s])+(S.mej[S.eq[s]]?' +'+S.mej[S.eq[s]]:''):'—').join(' · ')}</p><b class=t>Bolsa</b>`+
 (inv.map(k=>{const o=OBJ[k],e=['arma','esc','arm'].some(s=>S.eq[s]==k);return `<div class=rw><span>${has(k)}× ${nm(k)}${S.mej[k]?' +'+S.mej[k]:''}${e?' <span class=ok>(equipado)</span>':''}<br><span class=tag>${o.d}${sl(o)}</span></span>${EQT.includes(o.tipo)&&!e?`<button class=sm onclick="equipar('${k}')">Equipar</button>`:''}${o.tipo=='consumible'?`<button class=sm onclick="usar('${k}')">Usar</button>`:''}</div>`}).join('')||'<p class=tag>Bolsa vacía.</p>')+
 `<p class=tag>Finales: ${S.fin.join(', ')||'ninguno aún'}</p><button onclick="trampa()">Trampa: +5000 monedas</button><p class=tag>Pulsa «Estado» otra vez para volver.</p></div>`}
function mision(){if(S.fin.includes('Capítulo 1 completado'))return 'Capítulo 1 completado.';if(S.fl.investigas&&!S.fl.invFin)return 'Investiga las hierbas desaparecidas: visita el almacén.';if(S.dia<6)return `Prepárate para el Examen del Trimestre (desde el día 6; hoy es el día ${S.dia}).`;return 'Preséntate al Examen del Trimestre.'}
function misionBox(){return S.sc=='patio'?`<div class=mision><b>★ Misión principal</b><br>${mision()}</div><p class=leyenda><span class=k-main>★ Historia</span><span class=k-side>Secundaria</span><span class=k-hunt>Caza</span><span class=k-shop>Tienda</span><span class=k-social>Social</span></p>`:''}
function expo(){const s=load();app.innerHTML=`<h2>Exportar partida</h2><p class=tag>Copia este código y guárdalo.</p><textarea id=cod rows=8 style="width:100%">${s?btoa(unescape(encodeURIComponent(JSON.stringify(s)))):''}</textarea><button onclick="menu()">Volver</button>`}
function impo(){app.innerHTML=`<h2>Importar partida</h2><textarea id=cod rows=8 style="width:100%"></textarea><button onclick="aplicaImp()">Cargar</button><button onclick="menu()">Volver</button>`}
function aplicaImp(){try{S=JSON.parse(decodeURIComponent(escape(atob($('#cod').value.trim()))));save();show()}catch(e){alert('Código no válido')}}
function menu(){const sv=load();app.innerHTML=`<h1>El Camino del Qi Silente</h1><p class=sub>Temporada 1 · El Aspirante del Dragón Azur</p>
 <button onclick="S=nuevo();go('inicio')">Nueva partida</button><button ${sv?'':'disabled'} onclick="S=load();show()">Continuar</button>
 <button ${sv?'':'disabled'} onclick="trampa()">Trampa: +5000 monedas a la partida guardada</button><button onclick="valid()">Comprobar la historia</button><button onclick="expo()">Exportar partida</button><button onclick="impo()">Importar partida</button>
 <p class=tag>Capítulos cargados: ${CAPS.length} · Escenas: ${Object.keys(SC).length}</p>`}
function tg(s){const o=[];(s.c||[]).forEach(c=>{if(c.to)o.push(c.to);if(c.chk)o.push(c.chk.ok,c.chk.ko)});if(s.f)o.push(s.f.win,s.f.lose,s.f.flee);if(s.back)o.push(s.back);if(s.gt)o.push(...s.gt);return o}
function valid(){const bad=[],seen=new Set(['inicio']),q=['inicio'];
 for(const id in SC)tg(SC[id]).forEach(t=>{if(!SC[t])bad.push(`${id} → «${t}»`)});
 while(q.length)tg(SC[q.pop()]||{}).forEach(t=>{if(SC[t]&&!seen.has(t)){seen.add(t);q.push(t)}});
 const lost=Object.keys(SC).filter(i=>!seen.has(i)),dead=Object.keys(SC).filter(i=>{const s=SC[i];return !s.end&&!s.c&&!s.f&&!s.shop&&!s.forja&&!s.alq&&!s.acertijo&&!s.gen});
 app.innerHTML=`<h2>Comprobación</h2><p>${Object.keys(SC).length} escenas en ${CAPS.length} capítulo(s).</p><p class=${bad.length?'warn':'ok'}>Enlaces rotos: ${bad.join(', ')||'ninguno'}</p><p class=${lost.length?'warn':'ok'}>Inalcanzables: ${lost.join(', ')||'ninguna'}</p><p class=${dead.length?'warn':'ok'}>Sin salida: ${dead.join(', ')||'ninguna'}</p><button onclick="menu()">Volver</button>`}
window.addEventListener('load',menu);
