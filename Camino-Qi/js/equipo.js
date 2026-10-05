/* Equipo: armas, escudos y armaduras por rangos de rareza, con estadísticas */
const EQT=['arma','escudo','armadura'];
const RAR=[{k:'comun',n:'Común',m:1,col:'#a8b2ad',pre:'de Hierro',pr:1},{k:'raro',n:'Muy Raro',m:1.7,col:'#5aa9e6',pre:'de Acero Frío',pr:4},{k:'epico',n:'Épico',m:2.6,col:'#b57edc',pre:'de Jade Azul',pr:12},{k:'leg',n:'Legendario',m:4,col:'#e8a53a',pre:'Celestial',pr:40}];
/* [nombre, tipo, ataque, defensa%, crítico%, poder Qi, velocidad, armadura] */
const BASES={espada:['Espada','arma',8,0,15,3,2,0],hacha:['Hacha','arma',11,0,25,1,-2,0],martillo:['Martillo','arma',14,0,10,2,-4,0],lanza:['Lanza','arma',9,0,12,2,3,0],
 escudo:['Escudo','escudo',1,6,0,1,-3,3],tunica:['Túnica','armadura',0,6,0,1,6,2],coraza:['Coraza','armadura',0,10,0,0,-4,6]};
const MATF={comun:{mineral_hierro:3},raro:{mineral_hierro:5,cristal_frio:2},epico:{mineral_hierro:6,jade_azul:2,cinabrio:2},leg:{mineral_hierro:8,jade_azul:4,raiz_dragon:2,flor_loto_lunar:2}};
const ORO={comun:60,raro:200,epico:600,leg:2000};
for(const r of RAR)for(const b in BASES){const[n,t,a,d,c,q,v,ar]=BASES[b],s=x=>Math.round(x*r.m),id=b+'_'+r.k;
 OBJ[id]={n:`${n} ${r.pre}`,tipo:t,rar:r.k,atq:s(a),def:s(d),crit:s(c),qi:s(q),vel:Math.round(v*(1+(r.m-1)*.4)),arm:s(ar),pr:Math.round((s(a)+s(d)+s(ar)+s(q))*9*r.pr),d:'Rango '+r.n+'.'};
 FORJA.push({r:id,mat:MATF[r.k],oro:ORO[r.k]})}
Object.assign(OBJ.espada_madera,{rar:'comun',crit:5});Object.assign(OBJ.espada_acero,{rar:'raro',crit:10});
Object.assign(OBJ.tunica_cuero,{rar:'comun',def:5,arm:2,vel:4});Object.assign(OBJ.tunica_seda,{rar:'raro',def:10,arm:3,vel:8});
TIENDAS.armeria={n:'Armero Bao · «Si no corta, es decoración.»',stock:Object.keys(OBJ).filter(k=>/_(comun|raro)$/.test(k)&&BASES[k.split('_')[0]])};
const nm=k=>{const o=OBJ[k],r=RAR.find(x=>x.k==o.rar);return r?`<span style="color:${r.col}">${o.n}</span>`:o.n};
const sl=o=>{if(!EQT.includes(o.tipo))return '';return ' · '+[['atq','Atq'],['def','Def%'],['arm','Arm'],['crit','Crít%'],['qi','Qi'],['vel','Vel']].filter(([k])=>o[k]).map(([k,n])=>n+' '+o[k]).join(' · ')};
function ST(){const t={atq:0,def:0,crit:0,qi:0,vel:0,arm:0};for(const s of ['arma','esc','arm']){const k=S.eq[s];if(!k)continue;const o=OBJ[k],n=S.mej[k]||0;for(const x in t)t[x]+=o[x]||0;if(o.tipo=='arma')t.atq+=3*n;else{t.arm+=2*n;t.def+=n}}return t}
