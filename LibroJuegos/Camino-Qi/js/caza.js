/* Caza: enemigos por categoría, 3 niveles de dificultad (por reino) y zonas */
const E_=(n,cat,hp,a,xp,o,l)=>({n,cat,hp,a,xp,o,l});
Object.assign(ENEMIGOS,{
 serpiente:E_('Serpiente de Jade','Bestia',45,8,18,8,{hierba_qi:1,hongo_niebla:.3}),
 jabali:E_('Jabalí de Colmillo Largo','Bestia',60,9,22,10,{cuero:1}),
 ladron:E_('Ladrón de Caminos','Villano',50,9,22,20,{mineral_hierro:.5}),
 espiritu_junco:E_('Espíritu de los Juncos','Espíritu',40,10,24,6,{polvo_jade:.4,musgo_trueno:.5}),
 oso:E_('Oso Piel de Piedra','Bestia',130,16,60,20,{raiz_dragon:.4,cuero:1,hacha_raro:.08}),
 renegado:E_('Cultivador Renegado','Villano',140,18,70,60,{jade_bruto:1,espada_raro:.08}),
 zorro:E_('Zorro Espectral','Espíritu',110,20,65,25,{flor_loto_lunar:.5,cinabrio:.5}),
 demonio:E_('Demonio de Fuego Menor','Espíritu',230,26,180,80,{jade_azul:1,lirio_fuego:2,martillo_epico:.06}),
 asesino:E_('Asesino de la Sombra','Villano',210,30,190,150,{lanza_epico:.06,pildora_nucleo:.1}),
 guardian:E_('Guardián de Jade','Espíritu',260,28,200,100,{jade_azul:1,raiz_dragon:1,escudo_epico:.06}),
 quimera:E_('Quimera de las Cumbres','Bestia',280,30,220,120,{ginseng_sangre:2,espada_epico:.05,espada_leg:.02})});
const CAT={maton:'Villano',bandido:'Villano',wang:'Rival',rata:'Bestia',mono:'Bestia',lobo:'Bestia'};for(const k in CAT)ENEMIGOS[k].cat=CAT[k];
const NIVELES=[{n:'Nivel 1 · Estribaciones',rn:0,r:'Condensación de Qi'},{n:'Nivel 2 · Tierras Altas',rn:1,r:'Espiritual de Qi'},{n:'Nivel 3 · Cumbres Prohibidas',rn:2,r:'Celestial de Qi'}];
const ZONAS=[
 {id:'jardin',n:'Jardines Exteriores',v:0,s:'cu',d:'Setos, estanques y plagas con aspiraciones.',pool:['rata','mono','serpiente']},
 {id:'bambusal',n:'Bambusal Sombrío',v:0,s:'es',d:'Cañas altas que crujen sin viento.',pool:['lobo','jabali','espiritu_junco']},
 {id:'peaje',n:'Camino del Peaje',v:0,s:'me',d:'Un sendero donde la cortesía cuesta dinero.',pool:['maton','ladron','bandido']},
 {id:'cascada',n:'Cascada de las Tres Gotas',v:1,s:'es',d:'El agua cae en tres golpes y algo observa desde la bruma.',pool:['zorro','oso','renegado']},
 {id:'ruinas',n:'Ruinas del Templo Roto',v:1,s:'me',d:'Estatuas sin cabeza y deudas sin pagar.',pool:['renegado','zorro','bandido']},
 {id:'volcan',n:'Boca del Volcán Dormido',v:2,s:'cu',d:'El suelo late. A veces ruge.',pool:['demonio','quimera','guardian']},
 {id:'cumbre',n:'Cumbre del Trueno',v:2,s:'es',d:'Aquí el cielo escribe con rayos y no admite correcciones.',pool:['asesino','guardian','demonio']}];
function setZona(id){S.zn=id}
function setPresa(){const z=ZONAS.find(z=>z.id==S.zn);S.fe=z.pool[R(0,z.pool.length-1)]}
GEN.cazar=()=>({h:'Zonas de caza y entrenamiento',t:['Cuanto más alto tu reino, más peligrosas las tierras que puedes pisar. Elige dónde cazar o entrenar.'],c:[
 ...ZONAS.map(z=>({x:`${NIVELES[z.v].n} · ${z.n}`+(S.rn<NIVELES[z.v].rn?` · requiere ${NIVELES[z.v].r}`:''),to:'zona',fn:['setZona',z.id],req:{rn:NIVELES[z.v].rn},k:'hunt'})),
 {x:'Jardines Exteriores (versión clásica)',to:'jardines',k:'hunt'},{x:'Bosque de Bambú (versión clásica)',to:'bosque',k:'hunt'},{x:'Volver al patio',to:'patio'}]});
GEN.zona=()=>{const z=ZONAS.find(z=>z.id==S.zn),v=z.v,k=`ent_${z.id}_${S.dia}`;return{h:z.n,t:[NIVELES[v].n,z.d],c:[
 {x:'Buscar presa · 2 h (bestias, villanos o espíritus)',to:'caza_combate',fn:['setPresa'],fx:{t:2},k:'hunt'},
 {x:`Entrenar aquí · 3 h (prueba de ${NM[z.s]}, una vez al día)`,chk:{s:z.s,dc:8+4*v,ok:'caza_ok',ko:'caza_ko',fxok:{xp:12+18*v},fxko:{hp:-4-4*v}},req:{no:k},oc:1,fx:{t:3,fl:{[k]:true}},k:'hunt'},
 {x:'Volver a las zonas',to:'cazar'}]}};
registrarCapitulo({temporada:0,n:0,parte:'caza',titulo:'Sistema de caza',escenas:{
 cazar:{gen:'cazar',gt:['zona','jardines','bosque','patio']},
 zona:{gen:'zona',gt:['caza_combate','caza_ok','caza_ko','cazar']},
 caza_combate:{t:['Entre la maleza, algo te ha olido antes de que tú lo vieras.'],f:{e:'_dyn',win:'caza_win',lose:'muerte',flee:'cazar'}},
 caza_win:{t:['La presa cae. Respiras hondo y recoges lo que puedas del botín.'],c:[{x:'Seguir cazando en esta zona',to:'zona',k:'hunt'},{x:'Cambiar de zona',to:'cazar',k:'hunt'},{x:'Volver al patio',to:'patio'}]},
 caza_ok:{t:['Sudas, resuellas y, al final, algo en ti se afila. Un buen entrenamiento.'],c:[{x:'Volver a la zona',to:'zona',k:'hunt'},{x:'Volver al patio',to:'patio'}]},
 caza_ko:{t:['Tu cuerpo protesta. El monte, también. Hoy no era tu día.'],c:[{x:'Volver a la zona',to:'zona',k:'hunt'},{x:'Volver al patio',to:'patio'}]}}});
