/* Matriz de acertijos: cada día cada PNJ "mental" ofrece uno distinto (los ya resueltos no vuelven) */
const POOL=[];
function RQ(id,q,o,fx){registrarAcertijos({[id]:{q,o,k:0,fx,ok:'¡Correcto! Una sensación cálida te recorre el pecho.',ko:'Fallaste. El enigma se ríe de ti, con elegancia.'}});POOL.push(id)}
function pickRiddle(npc){const s=(S.dia*3+hs(npc))%POOL.length;for(let i=0;i<POOL.length;i++){const id=POOL[(s+i)%POOL.length];if(!S.fl['ac_'+id])return id}return null}
RQ('r01','«Tengo agujas pero no coso. Marco el tiempo sin decir palabra.»',['El reloj','El erizo','El pino'],{xp:15,oro:15});
RQ('r02','«Siempre está delante de ti, pero nunca puedes verlo.»',['El futuro','El horizonte','El viento'],{xp:15,item:'hierba_qi'});
RQ('r03','«Cuanto más me secas, más mojada estoy.»',['La toalla','La lluvia','La nube'],{oro:25,xp:10});
RQ('r04','«Vuelo sin alas y lloro sin ojos.»',['La nube','El humo','La sombra'],{xp:20,item:'musgo_trueno'});
RQ('r05','«Sin boca hablo y sin oídos oigo.»',['El eco','El viento','El río'],{xp:20,item:'hongo_niebla'});
RQ('r06','«Si me nombras, desaparezco.»',['El silencio','La sombra','El miedo'],{xp:25,st:{me:1}});
RQ('r07','«¿Qué cae, pero nunca se rompe? ¿Y qué se rompe, pero nunca cae?»',['La noche y el día','La lluvia y el vaso','La hoja y el hielo'],{xp:25,oro:30});
RQ('r08','«Tiene dientes pero no muerde, y sirve para ordenar el desorden.»',['El peine','La sierra','El rastrillo'],{xp:20,item:'cuero'});
RQ('r09','«Alto, delgado y con un solo ojo, cose sin ser sastre.»',['La aguja','El cuervo','El junco'],{xp:20,item:'polvo_jade'});
RQ('r10','«Me alimentas y vivo. Me das agua y muero.»',['El fuego','El hongo','La sombra'],{xp:25,item:'lirio_fuego'});
RQ('r11','«Es tuyo, pero los demás lo usan más que tú.»',['Tu nombre','Tu casa','Tu espada'],{xp:25,oro:40});
RQ('r12','«Sube cuando llueve y baja cuando escampa.»',['El paraguas','La niebla','El arroyo'],{xp:20,item:'pildora_qi'});
RQ('r13','«Cuanto más corres, más te sigo. Cuando paras, me detengo.»',['La sombra','El eco','El miedo'],{xp:30,st:{su:1}});
RQ('r14','«Tengo un cuello y ninguna cabeza; llevo agua y no bebo.»',['La botella','La jarra rota','El pozo'],{xp:30,tc:'corte'});
