/* =====================================================================
   La Senda al Valhalla · Motor
   Estado y protagonista, texto según género, tiempo y señales del
   Ragnarok, Gloria y rangos, juramentos, favores, combate con runas y
   Furor, tiradas con hilos de las Nornas, tiendas, forja, caldero,
   taller de runas, acertijos, duelos de injurias, saga, guardado
   y validador de la historia.
   ===================================================================== */
const $=s=>document.querySelector(s),R=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),app=$('#app');
const KEY='senda-valhalla-v1',INICIO='c1_inicio';
const SC={},CAPS=[],GEN={},ACERT={},SENNA={},MISIONES=[],SENALES=[];
let S=null,UI={},mem=null;

/* ---------- Registro de contenido (lo usan los archivos de capítulo) ---------- */
function registrarCapitulo(c){CAPS.push(c);Object.assign(SC,c.escenas)}
const registrarAcertijos=o=>Object.assign(ACERT,o);
const registrarSenna=o=>Object.assign(SENNA,o);
const registrarMision=f=>MISIONES.push(f);
/* Señales del Ragnarok por día; cond(S) limita en qué capítulo se muestran */
const registrarSenales=(o,cond)=>SENALES.push({o,cond:cond||(()=>true)});

/* ---------- Texto según protagonista ----------
   {N} → nombre · {palabra|palabra} → versión masculina|femenina */
function gx(h){const m=S&&S.g=='m';
  return String(h).replace(/\{N\}/g,S?S.nom:'').replace(/\{([^{}|<>]*)\|([^{}|<>]*)\}/g,(x,a,b)=>m?b:a)}
const pinta=h=>{app.innerHTML=gx(h)};

/* ---------- Estado ---------- */
const nuevo=g=>({sc:INICIO,g,nom:PROTAS[g].nom,hp:100,mhp:100,fu:0,gl:0,rg:0,plata:10,dia:1,hora:22,
  st:{...PROTAS[g].st},hilos:3,inv:{},eq:{arma:null,esc:null,arm:null},mej:{},ru:[],rue:[],rn:{},
  fl:{},jur:[],fav:{},saga:[],fin:[],nid:0,grab:{},f:null,cb:null,cp:null});
function save(){const s=JSON.stringify(S);try{localStorage.setItem(KEY,s)}catch(e){mem=s}}
function load(){let s=null;try{s=localStorage.getItem(KEY)}catch(e){}s=s||mem;try{return s?JSON.parse(s):null}catch(e){return null}}
function snap(){const c=S.cp;S.cp=null;const s=JSON.stringify(S);S.cp=c;return s}
const has=k=>S.inv[k]||0;
const add=(k,n)=>{S.inv[k]=has(k)+n;if(S.inv[k]<=0)delete S.inv[k]};
const items=x=>typeof x=='string'?{[x]:1}:x;
const nm=k=>{const o=OBJ[k];return o.rar?`<span style="color:var(--rar-${o.rar})">${o.n}</span>`:o.n};
const hs=s=>[...s].reduce((a,c)=>(a*31+c.charCodeAt(0))>>>0,7);
const shuf=(a,seed)=>{a=[...a];let x=seed>>>0||1;for(let i=a.length-1;i>0;i--){x=(x*1664525+1013904223)>>>0;const j=x%(i+1);[a[i],a[j]]=[a[j],a[i]]}return a};
const nota=t=>{UI.nota=(UI.nota?UI.nota+'<br>':'')+t};
function cur(){const s=SC[S.sc];return s.gen?{...s,...GEN[s.gen]()}:s}

/* ---------- Requisitos ---------- */
function ok(r){if(!r)return true;
  if(r.item&&Object.entries(items(r.item)).some(([k,n])=>has(k)<n))return false;
  if(r.fl&&[].concat(r.fl).some(f=>!S.fl[f]))return false;
  if(r.no&&[].concat(r.no).some(f=>S.fl[f]))return false;
  if(r.st&&S.st[r.st[0]]<r.st[1])return false;
  if(r.plata&&S.plata<r.plata)return false;
  if(r.dia&&S.dia<r.dia)return false;
  if(r.gl&&S.gl<r.gl)return false;
  if(r.hilos&&S.hilos<r.hilos)return false;
  if(r.min&&Object.entries(r.min).some(([k,n])=>(S.fl[k]||0)<n))return false;
  if(r.max&&Object.entries(r.max).some(([k,n])=>(S.fl[k]||0)>n))return false;
  if(r.rg&&S.rg<r.rg)return false;
  if(r.runa&&!S.ru.includes(r.runa))return false;
  if(r.hmax!=null&&S.hora>r.hmax)return false;
  if(r.hmin!=null&&S.hora<r.hmin)return false;
  return true}

/* ---------- Tiempo, Gloria y juramentos ---------- */
function avanza(h){S.hora+=h;
  while(S.hora>=24){S.hora-=24;S.dia++;S.hp=Math.min(S.mhp,S.hp+25);
    nota(`Amanece el día ${S.dia}. Recuperas 25 de Vida.`);
    for(const x of SENALES)if(x.o[S.dia]&&x.cond(S))nota(x.o[S.dia]);revisaJur()}}
function ganaGloria(n){S.gl=Math.max(0,S.gl+n);
  while(S.rg<RANGOS.length-1&&S.gl>=RANGOS[S.rg+1].gl){S.rg++;S.mhp+=25;S.hp=S.mhp;
    nota(`Las valquirias te miran: ahora eres <b>${RANGOS[S.rg].n}</b>. Tu Vida máxima sube a ${S.mhp}.`)}}
function revisaJur(){for(const j of S.jur)if(j.est=='activo'&&S.dia>j.hasta){
  j.est='roto';S.nid++;const p=Math.round(j.gl/2);S.gl=Math.max(0,S.gl-p);
  nota(`<span class=warn>Has roto tu juramento: «${j.txt}». Pierdes ${p} de Gloria y tu nombre se mancha.</span>`)}}
function apply(f){if(!f)return;
  if(f.hp)S.hp=Math.max(0,Math.min(S.mhp,S.hp+f.hp));
  if(f.fu)S.fu=Math.max(0,Math.min(100,S.fu+f.fu));
  if(f.plata)S.plata=Math.max(0,S.plata+f.plata);
  if(f.item)for(const[k,n]of Object.entries(items(f.item)))add(k,n);
  if(f.quita)for(const[k,n]of Object.entries(items(f.quita)))add(k,-n);
  if(f.equipa)S.eq[SLOT[OBJ[f.equipa].tipo]]=f.equipa;
  if(f.runa)aprendeRuna(f.runa);
  if(f.fl)Object.assign(S.fl,f.fl);
  if(f.suma)for(const k in f.suma)S.fl[k]=(S.fl[k]||0)+f.suma[k];
  if(f.st)for(const k in f.st)S.st[k]+=f.st[k];
  if(f.mhp){S.mhp+=f.mhp;S.hp+=f.mhp}
  if(f.hilo)S.hilos+=f.hilo;
  if(f.favor&&!S.fav[f.favor]){S.fav[f.favor]=1;nota(`Obtienes el <b>${FAV[f.favor].n}</b>: ${FAV[f.favor].d}`)}
  if(f.jura&&!S.jur.some(j=>j.id==f.jura.id)){const j=f.jura;
    S.jur.push({id:j.id,txt:j.txt,hasta:S.dia+j.dias,gl:j.gl,est:'activo'});
    nota(`Has jurado: «${j.txt}». Tienes hasta el final del día ${S.dia+j.dias}.`)}
  if(f.cumple){const j=S.jur.find(x=>x.id==f.cumple&&x.est=='activo');
    if(j){j.est='cumplido';nota(`Juramento cumplido: «${j.txt}». +${j.gl} de Gloria.`);ganaGloria(j.gl);
      S.saga.push(`Cumplió su juramento: ${j.txt.charAt(0).toLowerCase()+j.txt.slice(1)}.`)}}
  if(f.saga)S.saga.push(f.saga);
  if(f.fin&&!S.fin.includes(f.fin))S.fin.push(f.fin);
  if(f.t)avanza(f.t);
  if(f.hasta!=null)avanza((f.hasta-S.hora+24)%24);
  if(f.hastaDia){const d=typeof f.hastaDia=='string'?S.fl[f.hastaDia]:f.hastaDia;if(d&&S.dia<d)avanza((d-S.dia)*24-S.hora+8)}
  if(f.dormir){S.hp=S.mhp;S.fu=0}
  if(f.gl){ganaGloria(f.gl);if(f.gl<0)nota(`<span class=warn>Las valquirias apartan la mirada: ${f.gl} de Gloria.</span>`)}}
function aprendeRuna(k){if(S.ru.includes(k))return;S.ru.push(k);if(S.rue.length<MAX_RUNAS)S.rue.push(k);
  nota(`Aprendes la runa <span class=runa>${RUNAS[k].sym}</span> <b>${RUNAS[k].n}</b>: ${RUNAS[k].d}`)}

/* ---------- Estadísticas de combate ---------- */
function ST(){const T={atq:S.st.fue*2+S.rg*3,def:0,arm:0,crit:5+S.st.sue,vel:S.st.ast,am:0};
  for(const s of ['arma','esc','arm']){const k=S.eq[s];if(!k)continue;const o=OBJ[k],m=S.mej[k]||0;
    for(const x of ['atq','def','arm','crit','vel','am'])T[x]+=o[x]||0;
    if(m){if(o.tipo=='arma')T.atq+=3*m;else{T.arm+=2*m;T.def+=m}}}
  const G=grabado();for(const x of ['atq','def','arm','crit','vel','am'])T[x]+=G[x]||0;
  for(const f in S.fav)for(const x of ['atq','crit','vel'])T[x]+=FAV[f][x]||0;
  return T}
function grabado(){const k=S.eq&&S.eq.arma,r=k&&S.grab&&S.grab[k];return r&&GRABADO[r]?GRABADO[r]:{}}

/* ---------- Cabecera ---------- */
const bar=(v,m,c,l)=>`<div class=bw><span>${l} ${v}/${m}</span><div class=bar><i class=${c} style="width:${Math.max(0,Math.min(100,v/m*100))}%"></i></div></div>`;
const franja=h=>h<6?'Madrugada':h<13?'Mañana':h<20?'Tarde':'Noche';
function hud(){return `<header class=hud><div class=rw><b class=rn>${RANGOS[S.rg].n}</b><span>Día ${S.dia} · ${franja(S.hora)} ${S.hora}:00</span><span class=oro>🪙 ${S.plata}</span></div>
<div class=rw>${bar(S.hp,S.mhp,'hp','Vida')}${bar(S.fu,100,'fu','Furor')}</div>
<div class=rw><span>Gloria ${S.gl} · Hilos ${S.hilos}</span><span><button class=sm onclick="stat()">Estado</button> <button class=sm onclick="menu()">Menú</button></span></div></header>`}
function mision(){for(const f of MISIONES){const r=f(S);if(r)return r}return 'Sigue tu senda.'}
function misionBox(sc){return sc.mision?`<div class=mision><b>★ Misión principal</b><br>${mision()}</div><p class=leyenda><span class=k-main>★ Historia</span><span class=k-side>Vida diaria</span><span class=k-hunt>Caza</span><span class=k-shop>Comercio</span><span class=k-social>Gente</span></p>`:''}

/* ---------- Flujo de escenas ---------- */
function go(id){if(!SC[id]){pinta(`<div class=sc><p class=warn>Escena no encontrada: ${id}</p><button onclick="menu()">Menú</button></div>`);return}
  S.sc=id;UI.res=null;UI.tab='c';UI.stat=false;UI.top=true;UI.sn=null;
  const sc=cur();apply(sc.fx);
  if(sc.end&&!S.fin.includes(sc.end))S.fin.push(sc.end);
  if(sc.cp)S.cp=snap();
  S.f=null;S.cb=null;if(sc.f)empiezaCombate(sc.f.e);
  save();show()}
function show(){UI.stat=false;if(!S.grab)S.grab={};const sc=cur();let h=hud()+misionBox(sc)+'<div class=sc>';
  if(UI.nota){h+=`<p class=ok>${UI.nota}</p>`;UI.nota=null}
  if(sc.h)h+=`<h2>${sc.h}</h2>`;
  h+=sc.t.map(p=>`<p>${p}</p>`).join('');
  const back=sc.back?`<button onclick="go('${sc.back}')">${sc.backx||'Volver'}</button>`:'';
  const mas=()=>(sc.c?opts(sc):'')+back;
  if(UI.res)h+=UI.res;
  else if(S.f)h+=pFight();
  else if(sc.acertijo)h+=pRid(sc)+back;
  else if(sc.senna)h+=pSenna(sc);
  else if(sc.shop)h+=pShop(sc)+mas();
  else if(sc.forja)h+=pForja()+mas();
  else if(sc.caldero)h+=pCaldero()+mas();
  else if(sc.taller)h+=pTaller()+mas();
  else if(sc.grabado)h+=pGrabado()+mas();
  else if(sc.end)h+=pFinal(sc);
  else h+=mas();
  const y=window.scrollY;pinta(h+'</div>');window.scrollTo(0,UI.top?0:y);UI.top=false}
const ORD=['main','shop','hunt','social','side','n'];
const GRP={main:'★ Historia',shop:'Comercio y forja',hunt:'Caza y combate',social:'Gente',side:'Vida diaria',n:'Otros'};
function opts(sc){let L=(sc.c||[]).map((c,i)=>({c,i,k:c.k||'n'})),last='',h='';
  if(sc.sort)L=L.sort((a,b)=>ORD.indexOf(a.k)-ORD.indexOf(b.k)||a.i-b.i);
  for(const{c,i,k}of L){const v=ok(c.req);if(!v&&c.oc)continue;
    if(sc.sort&&k!=last){last=k;h+=`<b class="t g-${k}">${GRP[k]}</b>`}
    h+=`<button class="k-${k}" ${v?'':'disabled'} onclick="pick(${i})">${c.x}${v?'':' <span class=tag>(requisito no cumplido)</span>'}</button>`}
  return h}
function pick(i){const c=cur().c[i];if(!ok(c.req))return;apply(c.fx);if(c.chk)return tirada(c.chk,false);go(c.to)}
function retry(){if(!S.cp){S=nuevo(S.g);return go(INICIO)}S=JSON.parse(S.cp);S.f=null;S.cb=null;save();UI.top=true;show()}

/* ---------- Tiradas de dados e hilos de las Nornas ---------- */
function tirada(k,re){const a=R(1,6),b=R(1,6),o=S.fav.odin?1:0,t=a+b+S.st[k.s]+o,g=t>=k.dc;UI.tk=k;
  let h=`<div class=dice>🎲 ${a} + ${b} + ${NM[k.s]} ${S.st[k.s]}${o?' + Odín 1':''} = <b>${t}</b> contra ${k.dc}: <b class=${g?'ok':'warn'}>${g?'Éxito':'Fallo'}</b>${re?'<br><span class=tag>Las Nornas han vuelto a tejer tu destino.</span>':''}</div>`;
  if(g)h+=`<button onclick="finTirada(1)">Continuar</button>`;
  else{if(S.hilos>0)h+=`<button onclick="hilo()">Tirar de un hilo de las Nornas y repetir (te quedan ${S.hilos})</button>`;
    h+=`<button onclick="finTirada(0)">Aceptar el destino</button>`}
  UI.res=h;save();show()}
function hilo(){if(S.hilos<1||!UI.tk)return;S.hilos--;tirada(UI.tk,true)}
function finTirada(g){const k=UI.tk;if(!k)return;UI.tk=null;apply(g?k.fxok:k.fxko);
  if(S.hp<=0){save();return go('muerte')}go(g?k.ok:k.ko)}

/* ---------- Combate: Furor, runas y furia berserker ---------- */
const intento=()=>Math.random()<.3?'carga':'atq';
const esMuerto=E=>/muert|draug/i.test(E.cat||'');
function empiezaCombate(e){const E=ENEMIGOS[e];
  S.f={id:e,hp:E.hp,mhp:E.hp,it:intento(),lg:'Comienza el combate.',at:0,qm:0};
  S.cb={esc:0,crit:0,esq:0,ber:0,regen:0,rgv:[0,0]};S.fu=Math.max(S.fu,20)}
const mult=k=>1+.12*(S.rn[k]||0);
function resumenRuna(k){const r=RUNAS[k],m=mult(k),f=x=>`${Math.round(x[0]*m)}-${Math.round(x[1]*m)}`,p=[];
  if(r.dmg)p.push('Daño '+f(r.dmg));if(r.cura)p.push('Cura '+f(r.cura));if(r.regen)p.push('Regenera '+f(r.regen));
  if(r.esc)p.push('Escudo ×'+r.esc);if(r.aturde)p.push('Aturde');if(r.critSig)p.push('Próximo crítico');if(r.crit)p.push('Crítico');
  if(r.esq)p.push('Esquiva ×'+r.esq);if(r.quema)p.push('Quema');if(r.roba)p.push('Roba vida');if(r.fu)p.push('+'+r.fu+' Furor');
  if(r.desesp)p.push('Más daño herid{o|a}');if(r.azar)p.push('Al azar');return p.join(' · ')}
const curar=n=>{const b=Math.round(n*(S.fav.freya?1.25:1)),c=Math.min(S.mhp-S.hp,b);S.hp+=c;return c};
function pFight(){const F=S.f,E=ENEMIGOS[F.id],C=S.cb,fs=cur().f,L={atq:'se prepara para atacar',carga:'carga un golpe brutal (daño doble)'};
  const est=[C.ber?`Furia berserker: ${C.ber} turnos`:'',C.esc?`Escudo rúnico ×${C.esc}`:'',C.esq?`Esquiva ×${C.esq}`:'',C.crit?'Próximo golpe crítico':'',
    C.regen?`Regeneración ×${C.regen}`:'',F.qm?`${E.n} arde (${F.qm})`:''].filter(Boolean).join(' · ');
  const rb=S.rue.map(k=>{const r=RUNAS[k];return `<button ${S.fu<r.c?'disabled':''} onclick="turno('${k}')"><span class=runa>${r.sym}</span> ${r.n}${S.rn[k]?' +'+S.rn[k]:''}<br><span class=tag>${r.c} Furor · ${resumenRuna(k)}</span></button>`}).join('');
  const cons=Object.keys(S.inv).filter(k=>OBJ[k].tipo=='consumible').map(k=>`<button onclick="turno('${k}')">${OBJ[k].n} ×${has(k)}<br><span class=tag>${OBJ[k].d}</span></button>`).join('');
  return `<div class=fight><b>${E.n}</b> <span class=tag>${E.cat||''}</span>${bar(F.hp,F.mhp,'hp','Vida')}<div class=log>${F.lg}</div>
<p class=tag>Intención: ${F.at?E.n+' está aturdido y no podrá atacar':E.n+' '+L[F.it]}.${est?'<br>'+est:''}</p>
<div class=row><button onclick="turno('_a')">Golpe<br><span class=tag>+8 Furor</span></button>${rb}
${S.fu>=100&&!C.ber?`<button class=ber onclick="turno('_b')">¡Furia berserker!<br><span class=tag>Daño doble 3 turnos · gasta todo el Furor</span></button>`:''}
<button ${C.ber?'disabled':''} onclick="turno('_g')">Guardia<br><span class=tag>Reduce el daño · +6 Furor</span></button>
${fs.flee?`<button ${C.ber?'disabled':''} onclick="turno('_h')">Huir<br><span class=tag>2d6 + Astucia contra 9</span></button>`:''}${cons}</div></div>`}
function usaRuna(k){const r=RUNAS[k],F=S.f,C=S.cb,E=ENEMIGOS[F.id],m=mult(k),v=x=>Math.round(R(x[0],x[1])*m);let lg=`<span class=runa>${r.sym}</span> ${r.n}: `;
  if(r.dmg){let d=v(r.dmg)+S.st[r.s||'fue']*2+S.rg*3+(esMuerto(E)&&r.s!='esp'?ST().am:0);
    if(r.desesp)d=Math.round(d*(2-S.hp/S.mhp));
    if(r.azar){const f=[.5,1,1,2][R(0,3)];d=Math.round(d*f);lg+=f>1?'¡la suerte sonríe! ':f<1?'la suerte te esquiva. ':''}
    if(r.crit||C.crit){d=Math.round(d*1.6);C.crit=0;lg+='¡Crítico! '}
    if(C.ber)d*=2;F.hp-=d;lg+=`${d} de daño. `;
    if(r.roba)lg+=`Recuperas ${curar(d)} de Vida. `}
  if(r.cura)lg+=`Recuperas ${curar(v(r.cura)+S.st.esp)} de Vida. `;
  if(r.regen){C.regen=3;C.rgv=r.regen.map(x=>Math.round(x*m));lg+='Tus heridas empiezan a cerrarse. '}
  if(r.esc){C.esc=r.esc;lg+=`Un escudo rúnico te cubre (${r.esc} golpes). `}
  if(r.esq){C.esq=r.esq;lg+='Tus pies se vuelven ligeros. '}
  if(r.critSig){C.crit=1;lg+='Tu próximo golpe será crítico. '}
  if(r.aturde){F.at=1;lg+=`${E.n} queda aturdido. `}
  if(r.quema){F.qm=3;lg+=`${E.n} empieza a arder. `}
  if(r.fu){S.fu=Math.min(100,S.fu+r.fu);lg+=`+${r.fu} Furor. `}
  return lg}
function turno(a){const F=S.f,E=ENEMIGOS[F.id],C=S.cb,fs=cur().f,T=ST();let lg='',g=false;
  if(a=='_b'){if(S.fu<100||C.ber)return;C.ber=3;S.fu=0;F.lg='¡La furia berserker te inunda! Durante tres turnos tus golpes harán el doble de daño.';save();return show()}
  if(a=='_a'){let d=R(4,8)+T.atq+(esMuerto(E)?T.am:0);if(T.am&&esMuerto(E))lg+='Tu arma muerde la carne muerta. ';if(C.crit||Math.random()*100<T.crit){d=Math.round(d*1.6);C.crit=0;lg+='¡Crítico! '}
    if(C.ber)d*=2;F.hp-=d;S.fu=Math.min(100,S.fu+8);lg+=`Golpeas: ${d} de daño. `;
    const G=grabado();if(G.fuG)S.fu=Math.min(100,S.fu+G.fuG);
    if(G.roba)lg+=`La runa de tu arma te devuelve ${curar(Math.max(1,Math.round(d*G.roba/100)))} de Vida. `;
    if(G.aturde&&F.hp>0&&Math.random()*100<G.aturde){F.at=1;lg+=`La runa de tu arma aturde a ${E.n}. `}
    if(G.quema&&F.hp>0&&!F.qm&&Math.random()*100<G.quema){F.qm=3;lg+=`La runa de tu arma prende fuego a ${E.n}. `}}
  else if(RUNAS[a]){if(S.fu<RUNAS[a].c)return;S.fu-=RUNAS[a].c;lg+=usaRuna(a)}
  else if(a=='_g'){if(C.ber)return;g=true;S.fu=Math.min(100,S.fu+6);lg+='Te cubres tras la guardia. '}
  else if(a=='_h'){if(C.ber||!fs.flee)return;const t=R(1,6)+R(1,6)+S.st.ast+Math.floor(T.vel/5);
    if(t>=9){S.f=null;S.cb=null;save();return go(fs.flee)}lg+=`Intentas huir y fallas (${t}). `}
  else if(OBJ[a]&&has(a)){apply(OBJ[a].ef);add(a,-1);lg+=`Usas ${OBJ[a].n}. `}
  else return;
  if(F.qm>0&&F.hp>0){const q=R(3,6);F.hp-=q;F.qm--;lg+=`${E.n} sufre ${q} por las llamas. `}
  if(C.regen>0){lg+=`Regeneras ${curar(R(C.rgv[0],C.rgv[1]))}. `;C.regen--}
  if(C.ber>0)C.ber--;
  if(F.hp<=0)return victoria();
  if(F.at){F.at=0;lg+=`${E.n} está aturdido y no ataca.`}
  else{let d=R(Math.round(E.a*.8),Math.round(E.a*1.2));if(F.it=='carga')d*=2;
    if(C.esq>0){C.esq--;lg+=`Esquivas el ataque de ${E.n}.`}
    else if(Math.random()*100<Math.min(35,T.vel)){lg+=`Esquivas por los pelos el ataque de ${E.n}.`}
    else{if(g)d=Math.ceil(d*.4);if(C.esc>0){d=Math.ceil(d*.4);C.esc--}
      d=Math.max(1,Math.round(d*(1-Math.min(60,T.def)/100))-T.arm);S.hp=Math.max(0,S.hp-d);S.fu=Math.min(100,S.fu+10);
      lg+=`${E.n} te hiere: ${d}.`}}
  F.lg=lg;F.it=intento();
  if(S.hp<=0){S.f=null;S.cb=null;save();return go(fs.lose||'muerte')}
  save();show()}
function victoria(){const F=S.f,E=ENEMIGOS[F.id],fs=cur().f;S.f=null;S.cb=null;
  const lt=Object.entries(E.l||{}).map(([k,n])=>[k,n<1?(Math.random()<n*(S.fav.skadi?2:1)?1:0):n]).filter(x=>x[1]);
  lt.forEach(([k,n])=>add(k,n));
  let gl=E.gl;if(S.fav.tyr)gl=Math.round(gl*1.25);if(S.fav.loki)gl=Math.round(gl*.8);
  S.plata+=E.o||0;
  nota(`Victoria sobre ${E.n}: +${gl} de Gloria${E.o?`, +${E.o} 🪙`:''}${lt.length?', botín: '+lt.map(([k,n])=>n+'× '+OBJ[k].n).join(', '):''}.`);
  const G=grabado();if(G.curaV){const c=curar(G.curaV);if(c)nota(`La runa de tu arma te devuelve ${c} de Vida.`)}
  ganaGloria(gl);save();go(fs.win)}

/* ---------- Tienda ---------- */
const qtyRow=()=>{const q=UI.qty||1;return `<div class=qty>Cantidad: ${[1,5,10,'max'].map(x=>`<button class="sm ${q==x?'on':''}" onclick="UI.qty=${x=='max'?"'max'":x};show()">${x=='max'?'Máx':'×'+x}</button>`).join(' ')}</div>`};
const precio=(k,v)=>v?Math.floor(OBJ[k].pr/2):OBJ[k].pr;
const qn=(k,v)=>{const p=precio(k,v),mx=v?has(k):(p?Math.floor(S.plata/p):0),q=UI.qty||1;return q=='max'?mx:Math.min(q,mx)};
const bolsa=()=>{const m=Object.keys(S.inv).filter(k=>OBJ[k].tipo=='material').map(k=>has(k)+'× '+OBJ[k].n).join(', ');return `<p class=tag>Tu plata: <b class=oro>🪙 ${S.plata}</b><br>Tus materiales: ${m||'ninguno'}</p>`};
function pShop(sc){const T=TIENDAS[sc.shop],v=UI.tab=='v';const L=v?Object.keys(S.inv).filter(k=>OBJ[k].tipo!='clave'):T.stock;
  return `<p class=tag>${T.n}</p>${bolsa()}<div class=row><button class="${v?'':'on'}" onclick="UI.tab='c';show()">Comprar</button><button class="${v?'on':''}" onclick="UI.tab='v';show()">Vender</button></div>${qtyRow()}`+
  (L.map(k=>{const o=OBJ[k],p=precio(k,v),n=qn(k,v);return `<button ${n<1?'disabled':''} onclick="${v?'vender':'comprar'}('${k}')">${nm(k)}${v?' ×'+has(k):' <span class=tag>(tienes '+has(k)+')</span>'}<span class=pr>🪙 ${p*Math.max(n,1)}${n>1?' ('+n+')':''}</span><br><span class=tag>${o.d}${statsObj(o)}</span></button>`}).join('')||'<p class=tag>No llevas nada que vender.</p>')}
function comprar(k){const n=qn(k,0);if(n<1)return;S.plata-=n*precio(k,0);add(k,n);save();show()}
function vender(k){const n=qn(k,1);if(n<1)return;S.plata+=n*precio(k,1);add(k,-n);for(const s in S.eq)if(S.eq[s]==k&&!has(k))S.eq[s]=null;save();show()}
const statsObj=o=>{const p=[];if(o.atq)p.push('Ataque +'+o.atq);if(o.def)p.push('Defensa '+o.def+' %');if(o.arm)p.push('Armadura +'+o.arm);
  if(o.crit)p.push('Crítico +'+o.crit+' %');if(o.am)p.push('+'+o.am+' contra no muertos');if(o.vel)p.push('Velocidad '+(o.vel>0?'+':'')+o.vel);return p.length?'<br>'+p.join(' · '):''};
const reqs=o=>Object.entries(o).map(([k,n])=>`<span class=${has(k)>=n?'ok':'warn'}>${n}× ${OBJ[k].n} (tienes ${has(k)})</span>`).join(', ');
const coste=c=>`<span class=pr><span class=${S.plata>=c?'oro':'warn'}>🪙 ${c}</span></span>`;

/* ---------- Forja ---------- */
function pForja(){const ft=UI.ft||'f',eq=Object.keys(S.inv).filter(k=>EQT.includes(OBJ[k].tipo));
  let h=`${bolsa()}<div class=row><button class="${ft=='f'?'on':''}" onclick="UI.ft='f';show()">Forjar · 2 h</button><button class="${ft=='m'?'on':''}" onclick="UI.ft='m';show()">Mejorar · 1 h</button></div><div class=lst>`;
  if(ft=='f')h+=FORJA.map((f,i)=>{const y=S.plata>=f.plata&&Object.entries(f.mat).every(([k,n])=>has(k)>=n);
    return `<button ${y?'':'disabled'} onclick="forjar(${i})">${nm(f.r)}${coste(f.plata)}<br><span class=tag>${OBJ[f.r].d}${statsObj(OBJ[f.r])}<br>${reqs(f.mat)}</span></button>`}).join('');
  else h+=eq.map(k=>{const n=S.mej[k]||0,c=30*(n+1),y=n<5&&S.plata>=c&&has('hierro_pantano')>=n+1;
    return `<button ${y?'':'disabled'} onclick="mejorar('${k}')">${nm(k)} +${n}${n<5?'':' (máx.)'}${coste(c)}<br><span class=tag>${reqs({hierro_pantano:n+1})} · ${OBJ[k].tipo=='arma'?'+3 ataque':'+2 armadura, +1 defensa'}</span></button>`}).join('')||'<p class=tag>No llevas armas ni armaduras.</p>';
  return h+'</div>'}
function forjar(i){const f=FORJA[i];if(S.plata<f.plata)return;S.plata-=f.plata;for(const k in f.mat)add(k,-f.mat[k]);add(f.r,1);avanza(2);save();show()}
function mejorar(k){const n=S.mej[k]||0,c=30*(n+1);if(n>=5||S.plata<c||has('hierro_pantano')<n+1)return;S.plata-=c;add('hierro_pantano',-(n+1));S.mej[k]=n+1;avanza(1);save();show()}

/* ---------- Caldero de la völva ---------- */
const maxCal=a=>Math.min(...Object.entries(a.ing).map(([k,n])=>Math.floor(has(k)/n)));
function pCaldero(){let h=`<p class=tag>Cada preparación cuesta 1 hora.</p>${bolsa()}${qtyRow()}<div class=lst>`,c='';
  CALDERO.forEach((a,i)=>{if(a.c!=c){c=a.c;h+=`<b class=t>${c}</b>`}const mx=maxCal(a),q=UI.qty||1,n=q=='max'?mx:Math.min(q,mx);
    h+=`<button ${n<1?'disabled':''} onclick="cocinar(${i})">${nm(a.r)} <span class=tag>(tienes ${has(a.r)})</span>${n>1?`<span class=pr>×${n} · ${n} h</span>`:''}<br><span class=tag>${reqs(a.ing)} · ${OBJ[a.r].d}</span></button>`});
  return h+'</div>'}
function cocinar(i){const a=CALDERO[i],mx=maxCal(a),q=UI.qty||1,n=q=='max'?mx:Math.min(q,mx);if(n<1)return;for(const k in a.ing)add(k,-a.ing[k]*n);add(a.r,n);avanza(n);save();show()}

/* ---------- Taller de runas (mejorar con la völva) ---------- */
const costeRuna=k=>20*((S.rn[k]||0)+1)*(RUNAS[k].a+1);
function pTaller(){if(!S.ru.length)return '<p class=tag>Aún no conoces ninguna runa.</p>';
  return `<p class=tag>Cada nivel aumenta un 12 % el efecto de la runa (máximo +5). Cuesta 1 hora.</p>${bolsa()}<div class=lst>`+S.ru.map(k=>{const r=RUNAS[k],l=S.rn[k]||0,c=costeRuna(k);
    return `<button ${l>=5||S.plata<c?'disabled':''} onclick="mejoraRuna('${k}')"><span class=runa>${r.sym}</span> ${r.n} +${l}${l<5?coste(c):' (máx.)'}<br><span class=tag>${resumenRuna(k)}</span></button>`}).join('')+'</div>'}
function mejoraRuna(k){const c=costeRuna(k);if((S.rn[k]||0)>=5||S.plata<c)return;S.plata-=c;S.rn[k]=(S.rn[k]||0)+1;avanza(1);save();show()}

/* ---------- Grabado de runas en el arma ---------- */
const COSTE_GRABADO={plata:80,mat:{savia_raiz:2}};
function pGrabado(){const k=S.eq.arma;if(!k)return '<p class=tag>Necesitas llevar un arma equipada.</p>';
  const gratis=S.fl.grabado_gratis&&!S.fl.grabado_usado,act=S.grab[k],C=COSTE_GRABADO;
  const puede=gratis||(S.plata>=C.plata&&Object.entries(C.mat).every(([m,n])=>has(m)>=n));
  let h=`<p class=tag>Arma: <b>${nm(k)}</b>. ${act?`Lleva grabada <span class=runa>${RUNAS[act].sym}</span> ${RUNAS[act].n}: ${GRABADO[act].d}`:'Aún no lleva ninguna runa.'}<br>Un arma solo admite una runa: grabar otra borra la anterior. Cuesta 2 horas.</p>`;
  h+=gratis?'<p class=ok>Brok te debe un grabado: este no te costará nada.</p>':`<p class=tag>Coste: ${coste(C.plata).replace('class=pr','')} y ${reqs(C.mat)}</p>`;
  return h+'<div class=lst>'+S.ru.map(r=>{const R0=RUNAS[r];return `<button ${!puede||act==r?'disabled':''} onclick="grabar('${r}')"><span class=runa>${R0.sym}</span> ${R0.n}${act==r?' (grabada)':''}<br><span class=tag>${GRABADO[r].d}</span></button>`}).join('')+'</div>'}
function grabar(r){const k=S.eq.arma;if(!k||S.grab[k]==r)return;const gratis=S.fl.grabado_gratis&&!S.fl.grabado_usado,C=COSTE_GRABADO;
  if(gratis)S.fl.grabado_usado=1;else{if(S.plata<C.plata||Object.entries(C.mat).some(([m,n])=>has(m)<n))return;S.plata-=C.plata;for(const m in C.mat)add(m,-C.mat[m])}
  S.grab[k]=r;nota(`Grabas <span class=runa>${RUNAS[r].sym}</span> ${RUNAS[r].n} en ${OBJ[k].n}: ${GRABADO[r].d}`);avanza(2);save();show()}

/* ---------- Acertijos ---------- */
function pRid(sc){const A=ACERT[sc.acertijo],id=sc.acertijo;
  if(S.fl['ac_'+id])return `<p class=ok>Ya resolviste este enigma.</p>`;
  if(S.fl['af_'+id]===S.dia)return `<p class=warn>Hoy ya has fallado. Vuelve otro día con la cabeza despejada.</p>`;
  return `<div class=dice><b>${A.q}</b></div>`+shuf(A.o.map((o,i)=>i),S.dia*131+hs(id)).map(i=>`<button onclick="resolver('${id}',${i})">${A.o[i]}</button>`).join('')+`<p class=tag>Una respuesta equivocada te cuesta 1 hora y no podrás reintentarlo hasta mañana.</p>`}
function resolver(id,i){const A=ACERT[id],b=cur().back;
  if(i==A.k){S.fl['ac_'+id]=true;apply(A.fx);UI.res=`<p class=ok>${A.ok}</p><button onclick="go('${b}')">Continuar</button>`}
  else{S.fl['af_'+id]=S.dia;avanza(1);UI.res=`<p class=warn>${A.ko}</p><button onclick="go('${b}')">Continuar</button>`}
  save();show()}

/* ---------- Duelo de injurias ----------
   SENNA[id]={rival, rondas:[{i:insulto, o:[respuestas], k:índice correcto, bien, mal}], min, fx, fxko, ok, ko} */
function pSenna(sc){const id=sc.senna,D=SENNA[id],sal=`<button onclick="go('${sc.back}')">Continuar</button>`;
  if(S.fl['sn_'+id])return `<p class=tag>Ya te has batido en palabras con ${D.rival}.</p>`+sal;
  if(!UI.sn||UI.sn.id!=id)UI.sn={id,r:0,p:0,lg:''};
  const U=UI.sn,ro=D.rondas[U.r];
  return `${U.lg?`<p class=tag>${U.lg}</p>`:''}<div class=dice><span class=tag>Asalto ${U.r+1} de ${D.rondas.length} · Aciertos: ${U.p}</span><br><b>${D.rival}:</b> «${ro.i}»</div>`+
    shuf(ro.o.map((o,i)=>i),hs(id)+U.r*7).map(i=>`<button onclick="replica(${i})">«${ro.o[i]}»</button>`).join('')}
function replica(i){const sc=cur(),id=sc.senna,D=SENNA[id],U=UI.sn;if(!U)return;const ro=D.rondas[U.r],b=i==ro.k;
  if(b)U.p++;U.lg=(b?'✔ ':'✘ ')+(b?ro.bien:ro.mal);U.r++;
  if(U.r>=D.rondas.length){const w=U.p>=(D.min||Math.floor(D.rondas.length/2)+1);S.fl['sn_'+id]=1;apply(w?D.fx:D.fxko);
    UI.res=`<p class=tag>${U.lg}</p><p class=${w?'ok':'warn'}>${w?D.ok:D.ko}</p><button onclick="go('${sc.back}')">Continuar</button>`;UI.sn=null;save()}
  show()}

/* ---------- Finales y saga ---------- */
function pFinal(sc){const muerte=sc.end.includes('Muerte');
  return `<p><span class=sello>${/^Cap/.test(sc.end)?'':'Final: '}${sc.end}</span></p>${sc.saga?sagaHTML():''}`+
    (muerte?`<button onclick="retry()">Volver al último punto seguro</button>`:'')+`<button onclick="menu()">Menú principal</button>`}
const sagaHTML=()=>S.saga.length?`<b class=t>La saga de {N}</b>`+S.saga.map(x=>`<p class=tag>${x}</p>`).join(''):'<p class=tag>Ningún escaldo ha cantado aún tus hazañas.</p>';

/* ---------- Estado ---------- */
function equipar(k){S.eq[SLOT[OBJ[k].tipo]]=k;save();statR()}
function desequipar(s){S.eq[s]=null;save();statR()}
function usar(k){const o=OBJ[k];if(o.tipo=='piedra'){if(S.ru.includes(o.runa))UI.tm='Ya conoces esa runa.';else{aprendeRuna(o.runa);add(k,-1)}}
  else{apply(o.ef);add(k,-1)}save();statR()}
function eqRuna(k){const e=S.rue;if(e.includes(k)){if(e.length>1)S.rue=e.filter(x=>x!=k);else UI.tm='Debes llevar al menos una runa.'}
  else if(e.length>=MAX_RUNAS)UI.tm=`Solo puedes llevar ${MAX_RUNAS} runas. Quita una primero.`;else e.push(k);save();statR()}
function trampa(){if(!S)return;S.plata+=5000;save();statR()}
function stat(){if(UI.stat){UI.stat=false;UI.top=true;return show()}window.scrollTo(0,0);statR()}
function statR(){UI.stat=true;const T=ST(),sv=UI.sv||'b',inv=Object.keys(S.inv);
  const mini=`<div class="stats mini">${[['Atq',T.atq],['Def',T.def+'%'],['Arm',T.arm],['Crít',T.crit+'%'],['Vel',T.vel],['Runas',S.rue.length+'/'+MAX_RUNAS]].map(([a,b])=>`<span><b>${b}</b>${a}</span>`).join('')}</div>`;
  const msg=UI.tm||UI.nota?`<p class=ok>${[UI.nota,UI.tm].filter(Boolean).join('<br>')}</p>`:'';UI.tm=null;UI.nota=null;
  let body=msg;
  if(sv=='b'){
    body+=`<p>${Object.keys(NM).map(k=>NM[k]+' '+S.st[k]).join(' · ')}<br>Gloria ${S.gl}${S.rg<RANGOS.length-1?' / '+RANGOS[S.rg+1].gl+' para '+RANGOS[S.rg+1].n:''}</p>`;
    body+='<b class=t>Equipo</b><div class=lst>'+[['arma','Arma'],['esc','Escudo'],['arm','Armadura']].map(([s,l])=>{const k=S.eq[s];
      return `<div class=rw><span>${l}: ${k?nm(k)+(S.mej[k]?' +'+S.mej[k]:''):'—'}${k?`<br><span class=tag>${OBJ[k].d}${statsObj(OBJ[k])}${S.grab&&S.grab[k]?`<br>Runa grabada: <span class=runa>${RUNAS[S.grab[k]].sym}</span> ${RUNAS[S.grab[k]].n} · ${GRABADO[S.grab[k]].d}`:''}</span>`:''}</span>${k?`<button class=sm onclick="desequipar('${s}')">Quitar</button>`:''}</div>`}).join('')+'</div>';
    body+='<b class=t>Bolsa</b><div class=lst>'+(inv.map(k=>{const o=OBJ[k],e=Object.values(S.eq).includes(k);
      return `<div class=rw><span>${has(k)}× ${nm(k)}${S.mej[k]?' +'+S.mej[k]:''}${e?' <span class=ok>(equipado)</span>':''}<br><span class=tag>${o.d}${statsObj(o)}</span></span>${EQT.includes(o.tipo)&&!e?`<button class=sm onclick="equipar('${k}')">Equipar</button>`:''}${o.tipo=='consumible'?`<button class=sm onclick="usar('${k}')">Usar</button>`:''}${o.tipo=='piedra'?`<button class=sm onclick="usar('${k}')">Aprender</button>`:''}</div>`}).join('')||'<p class=tag>Bolsa vacía.</p>')+'</div>'}
  else if(sv=='r'){
    body+=`<p class=tag>Llevas ${S.rue.length}/${MAX_RUNAS} runas preparadas para el combate. Las runas gastan Furor: lo ganas golpeando (+8), cubriéndote (+6) y recibiendo heridas (+10). Con el Furor al máximo puedes desatar la furia berserker.</p>`;
    body+=S.ru.length?'<div class=lst>'+S.ru.map(k=>{const r=RUNAS[k],e=S.rue.includes(k);
      return `<div class=tec><div><span class=runa>${r.sym}</span> ${r.n}${S.rn[k]?' +'+S.rn[k]:''}${e?' <span class=ok>(preparada)</span>':''}<br><span class=tag>${AETT[r.a]} · ${r.c} Furor · ${resumenRuna(k)}<br>${r.d}</span></div><div><button class=sm onclick="eqRuna('${k}')">${e?'Quitar':'Preparar'}</button></div></div>`}).join('')+'</div>':'<p class=tag>Aún no conoces ninguna runa.</p>'}
  else if(sv=='j'){
    const EST={activo:'<span class=oro>en curso</span>',cumplido:'<span class=ok>cumplido</span>',roto:'<span class=warn>roto</span>'};
    body+='<b class=t>Juramentos</b>'+(S.jur.length?'<div class=lst>'+S.jur.map(j=>`<div class=rw><span>${j.txt}<br><span class=tag>${EST[j.est]}${j.est=='activo'?' · hasta el día '+j.hasta:''} · ${j.gl} de Gloria</span></span></div>`).join('')+'</div>':'<p class=tag>No has jurado nada todavía.</p>');
    body+='<b class=t>Favores de los dioses</b>'+(Object.keys(S.fav).length?'<div class=lst>'+Object.keys(S.fav).map(f=>`<div class=rw><span>${FAV[f].n}<br><span class=tag>${FAV[f].d}</span></span></div>`).join('')+'</div>':'<p class=tag>Ningún dios te ha favorecido aún.</p>');
    if(S.nid)body+=`<p class=warn>Juramentos rotos: ${S.nid}. Las valquirias no olvidan.</p>`;
    body+=`<p class=tag>Hilos de las Nornas: ${S.hilos}. Cada hilo permite repetir una tirada fallida.</p>`}
  else body+=sagaHTML()+`<p class=tag>Finales vistos: ${S.fin.join(', ')||'ninguno aún'}</p>`;
  const tab=(k,l)=>`<button class="${sv==k?'on':''}" onclick="UI.sv='${k}';statR()">${l}</button>`;
  pinta(`<div class=stk>${hud()}${mini}</div><div class=sc><div class=row>${tab('b','Equipo')}${tab('r','Runas')}${tab('j','Juramentos')}${tab('s','Saga')}</div>${body}<button onclick="trampa()">Trampa: +5000 de plata</button><p class=tag>Pulsa «Estado» otra vez para volver.</p></div>`)}

/* ---------- Menú, protagonista, exportar e importar ---------- */
function menu(){window.scrollTo(0,0);const sv=load();
  pinta(`<a class=volver href="../index.html">Biblioteca de LibroJuegos</a><h1>La Senda al Valhalla</h1><p class=sub>Un invierno para ganarse la eternidad</p>
<button onclick="elegir()">Nueva partida</button><button ${sv?'':'disabled'} onclick="S=load();UI={};show()">Continuar${sv?` con ${sv.nom}, día ${sv.dia}`:''}</button>
<button onclick="valid()">Comprobar la historia</button><button onclick="expo()">Exportar partida</button><button onclick="impo()">Importar partida</button>
<p class=tag>Partes cargadas: ${CAPS.length} · Escenas: ${Object.keys(SC).length}</p>`)}
function elegir(){window.scrollTo(0,0);const sv=load();
  pinta(`<div class=sc><h2>¿De quién es esta saga?</h2><p>Elige a quién acompañarás en su último invierno. La historia es la misma; cambian la voz, algunos diálogos y sus fuerzas.</p>
${Object.entries(PROTAS).map(([g,p])=>`<button class="k-n prota" onclick="S=nuevo('${g}');UI={};go(INICIO)"><b>${p.nom}</b><br><span class=tag>${p.d}<br>${Object.keys(NM).map(k=>NM[k]+' '+p.st[k]).join(' · ')}</span></button>`).join('')}
${sv?'<p class=tag>Empezar una partida nueva sustituirá a la guardada.</p>':''}<button onclick="menu()">Volver</button></div>`)}
function expo(){const s=load();pinta(`<h2>Exportar partida</h2><p class=tag>Copia este código y guárdalo en un lugar seguro.</p><textarea id=cod rows=8>${s?btoa(unescape(encodeURIComponent(JSON.stringify(s)))):''}</textarea><button onclick="menu()">Volver</button>`)}
function impo(){pinta(`<h2>Importar partida</h2><p class=tag>Pega aquí el código de una partida exportada.</p><textarea id=cod rows=8></textarea><button onclick="aplicaImp()">Cargar</button><button onclick="menu()">Volver</button>`)}
function aplicaImp(){try{S=JSON.parse(decodeURIComponent(escape(atob($('#cod').value.trim()))));save();UI={};show()}catch(e){alert('El código no es válido.')}}

/* ---------- Validador de la historia ---------- */
function destinos(s){const o=[];(s.c||[]).forEach(c=>{if(c.to)o.push(c.to);if(c.chk)o.push(c.chk.ok,c.chk.ko)});
  if(s.f)o.push(s.f.win,s.f.lose,s.f.flee);if(s.back)o.push(s.back);if(s.gt)o.push(...s.gt);return o.filter(Boolean)}
function valid(){const bad=[],seen=new Set([INICIO]),q=[INICIO];
  for(const id in SC)destinos(SC[id]).forEach(t=>{if(!SC[t])bad.push(`${id} → «${t}»`)});
  while(q.length)destinos(SC[q.pop()]||{}).forEach(t=>{if(SC[t]&&!seen.has(t)){seen.add(t);q.push(t)}});
  const lost=Object.keys(SC).filter(i=>!seen.has(i)&&i!='muerte');
  const dead=Object.keys(SC).filter(i=>{const s=SC[i];return !s.end&&!s.c&&!s.f&&!s.back&&!s.gen});
  const mal=[];for(const id in SC){const s=SC[id];if(s.f&&!ENEMIGOS[s.f.e])mal.push(`${id}: enemigo «${s.f.e}»`);
    if(s.senna&&!SENNA[s.senna])mal.push(`${id}: duelo «${s.senna}»`);if(s.acertijo&&!ACERT[s.acertijo])mal.push(`${id}: acertijo «${s.acertijo}»`);
    if(s.shop&&!TIENDAS[s.shop])mal.push(`${id}: tienda «${s.shop}»`);
    const fxs=[s.fx,...(s.c||[]).flatMap(c=>[c.fx,c.chk&&c.chk.fxok,c.chk&&c.chk.fxko])].filter(Boolean);
    for(const f of fxs){for(const k of Object.keys(items(f.item||{})))if(!OBJ[k])mal.push(`${id}: objeto «${k}»`);if(f.runa&&!RUNAS[f.runa])mal.push(`${id}: runa «${f.runa}»`);if(f.favor&&!FAV[f.favor])mal.push(`${id}: favor «${f.favor}»`)}}
  pinta(`<h2>Comprobación</h2><p>${Object.keys(SC).length} escenas en ${CAPS.length} parte(s).</p><p class=${bad.length?'warn':'ok'}>Enlaces rotos: ${bad.join(', ')||'ninguno'}</p><p class=${lost.length?'warn':'ok'}>Inalcanzables: ${lost.join(', ')||'ninguna'}</p><p class=${dead.length?'warn':'ok'}>Sin salida: ${dead.join(', ')||'ninguna'}</p><p class=${mal.length?'warn':'ok'}>Datos que faltan: ${mal.join(', ')||'ninguno'}</p><button onclick="menu()">Volver</button>`)}

/* ---------- Escena común: muerte en combate ---------- */
SC.muerte={h:'Has caído',t:['La nieve se tiñe de rojo y el frío deja de doler. Por un instante oyes cascos de caballo en el cielo, muy arriba, entre las nubes. Pero no se detienen: aún no has hecho lo suficiente.','Muy lejos, alguien tira de un hilo.'],end:'Muerte en batalla'};

window.addEventListener('load',menu);
