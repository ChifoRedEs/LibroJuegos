/* Técnicas de lucha: rangos de rareza, pergaminos, niveles de mejora y técnicas equipadas (máx. 4) */
const TB={tigre:['Garra de Tigre',4,10,16,'cu'],escarcha:['Palma de Escarcha',6,13,19,'es'],viento:['Corte del Viento',7,15,22,'me'],trueno:['Patada del Trueno',8,17,25,'cu'],
 fuego:['Aliento Ígneo',9,19,28,'es'],roca:['Puño de Roca',5,12,18,'cu'],luna:['Tajo Lunar',10,22,31,'me'],lanzaqi:['Lanza de Qi',8,18,26,'es']};
['golpe','palma','vendaval'].forEach(k=>TECNICAS[k]&&(TECNICAS[k].r='comun'));['corte','aliento'].forEach(k=>TECNICAS[k]&&(TECNICAS[k].r='raro'));
for(const r of RAR)for(const b in TB){const[n,c,a,d,s]=TB[b],id=b+'_'+r.k;
 TECNICAS[id]={n:`${n} (${r.n})`,r:r.k,c:Math.round(c*(1+(r.m-1)*.5)),d:[Math.round(a*r.m),Math.round(d*r.m)],s};
 OBJ['perg_'+id]={n:'Pergamino: '+TECNICAS[id].n,tipo:'pergamino',rar:r.k,tec:id,pr:Math.round((a+d)*6*r.pr),d:`Enseña la técnica (${r.n}).`}}
TIENDAS.tecnicas={n:'Maestro Yun, archivero de técnicas · «Cada golpe tiene su precio.»',stock:Object.keys(OBJ).filter(k=>/^perg_.*_(comun|raro)$/.test(k))};
Object.assign(KIND,{salon_tecnicas:'shop'});
Object.assign(ENEMIGOS.oso.l,{perg_roca_raro:.12});Object.assign(ENEMIGOS.renegado.l,{perg_trueno_raro:.12});Object.assign(ENEMIGOS.zorro.l,{perg_escarcha_raro:.12});
Object.assign(ENEMIGOS.demonio.l,{perg_fuego_epico:.08,perg_fuego_leg:.02});Object.assign(ENEMIGOS.guardian.l,{perg_luna_epico:.08});
Object.assign(ENEMIGOS.asesino.l,{perg_viento_epico:.08});Object.assign(ENEMIGOS.quimera.l,{perg_tigre_leg:.03});
ACERT.r07.fx.item='perg_viento_raro';ACERT.r11.fx.item='perg_lanzaqi_raro';
const tl=k=>(S.tn&&S.tn[k])||0;
function eqT(){if(!S.eqt)S.eqt=S.tc.slice(0,4);S.eqt=S.eqt.filter(k=>S.tc.includes(k));if(!S.eqt.length)S.eqt=S.tc.slice(0,1);return S.eqt}
const tn=k=>{const t=TECNICAS[k],r=RAR.find(x=>x.k==t.r);return r?`<span style="color:${r.col}">${t.n}</span>`:t.n};
const tcosto=k=>Math.round(30*(tl(k)+1)*Math.sqrt((RAR.find(x=>x.k==TECNICAS[k].r)||RAR[0]).pr));
function aprende(k){const t=OBJ[k].tec;if(S.tc.includes(t))UI.tm='Ya conoces esa técnica.';else{S.tc.push(t);add(k,-1);if(eqT().length<4)S.eqt.push(t);UI.tm='Has aprendido '+TECNICAS[t].n+'.'}save();statR()}
function eqTec(k){const e=eqT();if(e.includes(k)){if(e.length>1)S.eqt=e.filter(x=>x!=k);else UI.tm='Debes llevar al menos una técnica.'}else S.eqt=[...e,k].slice(-4);save();statR()}
function mejTec(k){const c=tcosto(k);if(tl(k)>=5||S.oro<c)return;if(!S.tn)S.tn={};S.oro-=c;S.tn[k]=tl(k)+1;save();statR()}
function pTec(){const eq=eqT(),m=UI.tm?`<p class=ok>${UI.tm}</p>`:'';UI.tm=null;
 return `<p class=tag>Llevas ${eq.length}/4 técnicas equipadas en combate. Cada nivel de mejora suma un 12 % de daño.</p>${m}<div class=lst>`+S.tc.map(k=>{const t=TECNICAS[k],l=tl(k),e=eq.includes(k),c=tcosto(k);
 return `<div class=tec><div>${tn(k)}${l?' +'+l:''}${e?' <span class=ok>(equipada)</span>':''}<br><span class=tag>${t.c} Qi · ${Math.round(t.d[0]*(1+.12*l))}-${Math.round(t.d[1]*(1+.12*l))} · ${NM[t.s]}</span></div><div><button class=sm onclick="eqTec('${k}')">${e?'Quitar':'Equipar'}</button> <button class=sm ${l>=5||S.oro<c?'disabled':''} onclick="mejTec('${k}')">${l>=5?'Máx.':'Mejorar 🪙'+c}</button></div></div>`}).join('')+'</div>'}
