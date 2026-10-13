/* =====================================================================
   Capítulo 1 · La Muerte de Paja
   Parte 3 · «El túmulo del rey draug»
   Días 6 a 9: la granja de Bersi, la copa robada, el túmulo del rey Rolf,
   la prueba de Tyr, la noche del salón en llamas y la despedida.
   Sustituye la escena provisional c1_p3 de la Parte 2.
   Final del capítulo: c1_fin (la Parte 1 del Capítulo 2 la convertirá en enlace)
   ===================================================================== */
(()=>{
const pelea=(e,win,flee,t)=>({t:[t],f:{e,win,lose:'muerte',flee}});

/* ---------- Datos nuevos ---------- */
Object.assign(OBJ,{
  muerdetumbas:{n:'Muerdetumbas',tipo:'arma',atq:12,crit:10,am:10,pr:900,d:'La espada del rey Rolf, forjada por enanos. Muerde la carne de los muertos.'},
  copa_rolf:{n:'Copa de plata del rey Rolf',tipo:'clave',d:'Una copa antigua con un lobo grabado. Robada de una tumba.'},
  brazalete_draug:{n:'Brazalete de plata ennegrecida',tipo:'material',pr:30,d:'Plata de túmulo. Nadie en Vindvik querrá comprarla.'}
});
Object.assign(ENEMIGOS,{
  draug_guerrero:{n:'Draug guerrero',cat:'No muerto',hp:64,a:12,gl:20,o:10,l:{hierro_pantano:.5}},
  draug_capitan:{n:'Capitán draug',cat:'No muerto',hp:84,a:13,gl:30,o:20,l:{brazalete_draug:1}},
  guardian:{n:'Guardián del túmulo',cat:'No muerto',hp:92,a:13,gl:32,o:0,l:{brazalete_draug:1,hierro_pantano:1}},
  rolf_honor:{n:'Rey Rolf',cat:'Rey draug · combate de honor',hp:110,a:14,gl:60,o:0},
  rolf:{n:'Rey Rolf',cat:'Rey draug',hp:130,a:15,gl:60,o:0},
  ahogado:{n:'Ahogado de la tormenta',cat:'No muerto',hp:60,a:12,gl:18,o:5,l:{ambar:.4}},
  einar:{n:'Einar el Ahogado',cat:'Draug',hp:118,a:15,gl:50,o:0}
});
FORJA.push({r:'escudo_hierro',mat:{hierro_pantano:2,brazalete_draug:1},plata:20});

registrarAcertijos({
  groa_ansuz:{q:'Groa: «Lo tienen todos los hombres y lo dieron los dioses. Se rompe sin que nadie lo toque y se cumple sin usar las manos. ¿Qué es?»',
    o:['Un juramento','El silencio','El corazón','El aliento'],k:0,
    ok:'«Un juramento», asiente Groa. «La palabra que ata. Eso es Ansuz: la palabra de Odín, que hace que el mundo obedezca.» Te traza la runa en los labios. Saben a ceniza.',
    ko:'Groa niega con la cabeza. «Piensa en lo que has hecho estos días, no en lo que has oído en las canciones. Vuelve mañana.»',
    fx:{runa:'ansuz',fl:{ansuz:1},gl:5}},
  puerta_rolf:{q:'Runas talladas en la piedra: «Me alimento y crezco; si me das de beber, muero. Dime mi nombre y pasa.»',
    o:['El fuego','La sed','El invierno','El hambre'],k:0,
    ok:'Pronuncias la palabra en voz alta. Las runas se iluminan una a una, y la losa se desliza hacia dentro con un gemido de piedra.',
    ko:'Nada. Las runas se oscurecen. La puerta no volverá a escucharte hoy.',
    fx:{fl:{puerta:1},gl:5}}
});

registrarSenales({
  7:'Los perros de Vindvik han aullado toda la noche mirando hacia las colinas.',
  8:'Al amanecer, el fiordo está helado de orilla a orilla. Los ancianos no recuerdan nada igual.',
  9:'Hoy el sol apenas ha salido. Un resplandor gris, y vuelta a la oscuridad.'
});

registrarMision(S=>{
  if(!S.fl.p2fin)return null;
  if(!S.fl.p3)return 'Amanece en Vindvik. Prepárate.';
  if(!S.fl.granja_fin)return 'Ve a la granja de Bersi, en las colinas, y salva a quien puedas.';
  const pl=S.fl.jur_rolf?' Tu juramento vence al final del día 9.':'';
  if(S.fl.ketil_pista&&!S.fl.copa&&!S.fl.rolf_fin)return 'Recupera la copa del rey Rolf de la granja de Ketil, o sube directamente al túmulo.'+pl;
  if(!S.fl.ketil_pista&&!S.fl.rolf_fin)return 'Averigua quién robó en el túmulo del rey Rolf (la vieja Hild conoce todos los chismes), o sube directamente a las colinas.'+pl;
  if(!S.fl.rolf_fin)return 'Entra en el túmulo del rey Rolf y trae Muerdetumbas.'+pl;
  if(!S.fl.regreso)return 'Vuelve a Vindvik y preséntate ante el jarl Hakon.';
  if(!S.fl.c1fin)return 'Esta noche, Vindvik celebra tu regreso.';
  return 'Capítulo 1 completado. La senda continúa bajo las raíces de Yggdrasil.';
});

/* ---------- Ampliaciones de escenas anteriores ---------- */
SC.c1_aldea.c.push(
  {x:'Ir a la granja de Bersi · 2 h',to:'c1_granja',k:'main',oc:1,req:{fl:'p3',no:'granja_fin'},fx:{t:2}},
  {x:'Visitar la granja de Ketil · 1 h',to:'c1_ketil',k:'main',oc:1,req:{fl:'ketil_pista',no:['copa','rolf_fin']},fx:{t:1}},
  {x:'Subir a las colinas de los túmulos · 2 h',to:'c1_colina',k:'main',oc:1,req:{fl:'granja_fin',no:'rolf_fin'},fx:{t:2}},
  {x:'Presentarte ante el jarl Hakon',to:'c1_regreso',k:'main',oc:1,req:{fl:'rolf_fin',no:'regreso'}},
  {x:'Acudir a la celebración en el salón',to:'c1_celebracion',k:'main',oc:1,req:{fl:'regreso',no:'c1fin'}}
);
SC.c1_hild.c=(SC.c1_hild.c||[]).concat([
  {x:'Preguntarle si alguien ha robado alguna vez en los túmulos',to:'c1_chisme',k:'social',oc:1,req:{fl:'draug_habla',no:'ketil_pista'}}
]);
SC.c1_groa2.c.push(
  {x:'Pedirle que te enseñe la runa Ansuz',to:'c1_ansuz',k:'main',oc:1,req:{fl:'p3',no:'ansuz'}},
  {x:'Pedirle que te enseñe la runa Gebo',to:'c1_gebo',k:'main',oc:1,req:{fl:'gebo_ok',no:'gebo'}}
);

/* ---------- Textos que cambian según lo que hizo el jugador ---------- */
GEN.c1_rey=()=>({t:S.fl.saqueo?[
  'Al fondo de la cámara, sobre un trono de piedra, está sentado el rey Rolf. Lleva una corona de hierro sobre un cráneo con la piel tirante y gris. Sobre las rodillas descansa una espada larga, de hoja oscura: Muerdetumbas.',
  'Sus ojos se encienden como dos brasas azules. Olfatea el aire. «Plata», dice con una voz que hace temblar el polvo. «Plata de mi barco en tus bolsillos. Otro ladrón. Siempre ladrones.» Se levanta. Es enorme.']
 :S.fl.copa?[
  'Al fondo de la cámara, sobre un trono de piedra, está sentado el rey Rolf. Lleva una corona de hierro sobre un cráneo con la piel tirante y gris. Sobre las rodillas descansa una espada larga, de hoja oscura: Muerdetumbas.',
  'Sus ojos se encienden como dos brasas azules y se clavan en la copa que llevas en la mano. Por primera vez en doscientos años, el rey muerto parece dudar.']
 :[
  'Al fondo de la cámara, sobre un trono de piedra, está sentado el rey Rolf. Lleva una corona de hierro sobre un cráneo con la piel tirante y gris. Sobre las rodillas descansa una espada larga, de hoja oscura: Muerdetumbas.',
  'Sus ojos se encienden como dos brasas azules. «Vindvik me robó», dice con una voz que hace temblar el polvo. «Juré proteger a mi pueblo y mi pueblo saqueó mi tumba. Ahora Vindvik pagará.» Se levanta. Es enorme.']});

GEN.c1_tyr_tras=()=>({t:S.fav.tyr?[
  'Tyr asiente una sola vez. «Así se paga lo que vale», dice. Cuando parpadeas, ya no está, pero sientes su mirada sobre ti, como una mano firme en el hombro.',
  'Kraka tarda un buen rato en volver a hablar. «Era Tyr», dice al fin. «Tyr en persona. Y a mí nadie me ha regalado nunca nada.»']
 :[
  'Tyr te mira largo rato. No hay desprecio en sus ojos, solo una especie de paciencia. «Otra vez será», dice, y desaparece en la oscuridad.',
  'Kraka suelta el aire. «Bueno», dice. «Nadie podrá decir que eres imprudente.» No suena como un elogio.']});

GEN.c1_wunjo=()=>({t:S.fl.siri_aprendiz?[
  'Siri te espera en la puerta de la cabaña de Groa, con las manos manchadas de tinta de corteza y los ojos brillando. «¡Me ha enseñado una runa! ¡Mi primera runa!» Groa, detrás, levanta los ojos al cielo.',
  '«Es <b>Wunjo</b>», dice Siri, muy seria, y te coge la mano marcada. «La runa del júbilo. Groa dice que sirve para no rendirse cuando todo va mal. Pensé que tenía que ser tuya.» Traza el signo con un dedo tembloroso. La marca de tu mano se calienta, y por un instante sientes algo que no sentías desde antes de la fiebre: alegría.']
 :[
  'Groa te espera en la puerta de la cabaña. «Siéntate», dice. «Has bajado a una tumba y has vuelto. Eso merece una runa que no sea de guerra.»',
  '«Es <b>Wunjo</b>, la runa del júbilo. Sirve para no rendirse cuando todo va mal.» Te traza el signo en la mano. Por un instante sientes algo que no sentías desde antes de la fiebre: alegría. «Siri la habría aprendido antes que tú», añade Groa. «Pero tú no quisiste.»']});

GEN.c1_salon_arde=()=>({t:[
  'El salón del jarl arde. Las llamas suben por las vigas de abeto que adornaron el banquete de Yule, y el humo es tan espeso que apenas ves tus propias manos.',
  S.fl.torgil_vencido
    ?'Entre el humo aparece Torgil, con el manto rojo chamuscado y un niño en cada brazo. Te mira un instante. «Esta vez gano yo», dice, y se mete otra vez en el fuego a buscar más. Más tarde, Eyvind le dedicará a Torgil su mejor verso.'
    :'Entre el humo ves a Torgil corriendo hacia el bosque, sin mirar atrás, con el manto rojo ondeando como una bandera de cobardía. Nadie lo detiene. Nadie lo olvidará.',
  'Entre todos sacáis a los ancianos, a los niños y a los perros. Hakon es el último en salir, con la barba humeando y la espada todavía en la mano. Cuando el techo se derrumba, el jarl se queda mirando las brasas en silencio. Luego se vuelve hacia ti. «Lo reconstruiremos», dice. «Pero tú no estarás aquí para verlo, ¿verdad?»']});

GEN.c1_despedida=()=>({t:[
  'Cuando vuelves a casa, Siri ya ha preparado tu hatillo: carne seca, un ungüento de Groa, tu manto remendado. No llora. Ha decidido que no va a llorar, y es tan cabezota como su padre.',
  S.fl.siri_aprendiz
    ?'«Me quedo con Groa», dice. «Aprenderé todas las runas. Y cuando vuelvas, te enseñaré las que tú no sepas.» Te abraza tan fuerte que te crujen las costillas.'
    :'«Groa dice que, si me lo pido a mí misma, quizá algún día me acepte», dice. «Me lo pediré todos los días hasta que vuelvas.» Te abraza tan fuerte que te crujen las costillas.',
  S.fl.einar_paz
    ?'«Papá estaba en paz al final», susurra. «Lo vi. Gracias por dejarme cantarle.»'
    :'«Lo que había en el puerto no era papá», susurra. «Groa dice que papá se fue hace diez años. Eso era solo el mar.»',
  'Groa aparece en la puerta, apoyada en su bastón. No dice nada. Te pone en la mano un saquito de cuero con algo que tintinea y te cierra los dedos sobre él. Luego se va. Las völvas no se despiden: ya saben si volverán a verte.']});

registrarCapitulo({capitulo:1,parte:3,titulo:'El túmulo del rey draug',escenas:{

/* ---------- Amanecer gris ---------- */
c1_p3:{h:'Amanecer gris',cp:1,t:[
  'Nadie en Vindvik ha dormido. Al alba, el salón del jarl se llena de gente que no quiere estar en su casa: mujeres con niños, viejos con hachas de leña, pescadores con arpones. Bersi duerme junto al fuego, con el brazo vendado y la frente ardiendo.',
  'Hakon reúne a los suyos. «La granja de Bersi está a dos horas de aquí», dice. «Su madre y su hermana pequeña siguen allí, si es que siguen. Necesito a alguien que vaya y vuelva.» Nadie se ofrece. Todos te miran a ti.',
  'Groa se acerca cojeando y te habla al oído. «Los draugs odian la luz y el hierro. Y odian todavía más que los olviden.» Te aprieta el brazo. «Pregúntate por qué se han despertado ahora, {N}. Los muertos no salen de sus tumbas porque sí.»'],
  fx:{fl:{p3:1}},
  c:[{x:'Salir hacia la granja de Bersi · 2 h',to:'c1_granja',k:'main',fx:{t:2}},
     {x:'Prepararte antes en el pueblo',to:'c1_aldea'}]},

/* ---------- La granja de Bersi ---------- */
c1_granja:{h:'La granja de Bersi',t:[
  'La granja de Bersi está en una ladera, a la sombra de las colinas de los túmulos. Desde lejos parece abandonada: no sale humo de la chimenea, el ganado se ha escapado y la puerta del establo golpea con el viento.',
  'Después ves las figuras. Tres, cuatro, quizá más, caminando despacio entre las dependencias. Llevan cascos antiguos de hierro, cotas de malla oxidadas y escudos pintados con un lobo negro: el emblema del rey Rolf. Y de la casa principal llega, muy débil, el llanto de una niña.',
  'Kraka baja la voz. «Puedes entrar con el hacha por delante y que te oiga todo el valle. O puedes rodear el establo y llegar a la casa sin que te vean. Tú decides. Yo, desde luego, voy a vigilar desde el tejado.»'],
  c:[{x:'Atacar al draug más cercano',to:'c1_f_granja',k:'hunt'},
     {x:'Rodear el establo y colarte en la casa sin que te vean',to:'c1_granja_casa',k:'main',chk:{s:'ast',dc:9,ok:'c1_granja_casa',ko:'c1_f_granja',fxko:{hp:-8}}}]},

c1_f_granja:pelea('draug_guerrero','c1_granja_casa',null,'Un draug se da la vuelta. Tiene la mitad de la cara podrida y la otra mitad sonriendo. Alza un hacha que lleva doscientos años esperando volver a cortar.'),

c1_granja_casa:{h:'La casa',t:[
  'Llegas a la casa principal. La puerta está atrancada desde dentro y tiene marcas de hacha por todas partes. Al oír tu voz, alguien retira la tranca.',
  'Gudrun, la madre de Bersi, te recibe con un cuchillo de cocina en la mano y la cara gris de miedo. Detrás de ella, escondida bajo la mesa, está la pequeña Thora, de cinco años, abrazada a un gato. «Mi marido salió a defender el establo», dice Gudrun. «No volvió.»',
  'Antes de que puedas responder, la puerta tiembla con un golpe. Y otro. Fuera, una voz que no es una voz dice tu nombre.'],
  c:[{x:'Salir a enfrentarte a lo que espera fuera',to:'c1_f_capitan',k:'main'}]},

c1_f_capitan:pelea('draug_capitan','c1_draug_habla',null,'Fuera te espera un draug más alto que los demás, con un casco coronado y una capa hecha jirones. Es el capitán de la guardia del rey. Te señala con una espada mellada.'),

c1_draug_habla:{h:'Las palabras del muerto',t:[
  'El capitán draug cae de rodillas. Antes de deshacerse, te agarra del brazo con una mano helada y habla con una voz como de piedras que se arrastran.',
  '«Vindvik… robó. La copa del rey. La plata de su barco.» Su mano se cierra con más fuerza. «El rey juró proteger a su pueblo… y su pueblo le robó. Mientras la copa no vuelva… el rey no descansará.»',
  'Luego no queda más que un montón de hierro oxidado y huesos. Los demás draugs se retiran hacia las colinas, despacio, como si alguien los llamara.'],
  fx:{fl:{draug_habla:1,granja_fin:1},saga:'Salvó a Gudrun y a la pequeña Thora de los draugs del rey Rolf.'},
  c:[{x:'Volver a la casa con Gudrun y Thora',to:'c1_granja_fin',k:'main'}]},

c1_granja_fin:{t:[
  'Gudrun no llora hasta que encuentra el cuerpo de su marido junto al establo. Entonces llora mucho. Thora no entiende nada y te pregunta si eres una valquiria. Le dices que no. Kraka le dice que tampoco es un cuervo normal. Thora se ríe, y eso ayuda un poco.',
  'Recogen lo poco que pueden llevar: dos mantas, un saco de grano, el gato. Sin hombre, sin ganado y sin cosecha, este invierno las matará de hambre.'],
  c:[{x:'Darle a Gudrun 30 de plata para que pase el invierno',to:'c1_granja_dar',k:'social',req:{plata:30},fx:{plata:-30}},
     {x:'Darle tu carne seca',to:'c1_granja_dar',k:'social',req:{item:{carne_seca:2}},fx:{quita:{carne_seca:2}}},
     {x:'Acompañarlas a Vindvik · 2 h',to:'c1_aldea',k:'main',fx:{t:2}}]},

c1_granja_dar:{t:[
  'Gudrun mira lo que le das y luego te mira a ti. No da las gracias; en Vindvik, un regalo así no se agradece, se devuelve algún día. «Te debo una», dice simplemente. «Mi familia te debe una.»',
  'Kraka, en tu hombro, ladea la cabeza. «Interesante», murmura. «A Groa le va a gustar esto.»'],
  fx:{fl:{gebo_ok:1,dar:1},gl:8,saga:'Dio lo que tenía a una viuda y a su hija, sin pedir nada a cambio.'},
  c:[{x:'Acompañarlas a Vindvik · 2 h',to:'c1_aldea',k:'main',fx:{t:2}}]},

/* ---------- La copa robada ---------- */
c1_chisme:{h:'Los chismes de Hild',t:[
  'La vieja Hild se inclina sobre el mostrador con los ojos brillantes. A Hild le gustan las preguntas más que el dinero, y eso ya es decir.',
  '«¿Robar en los túmulos? Nadie lo haría, querid{o|a}. Bueno…» Baja la voz. «Hace diez años, después de la gran tormenta, la familia de Ketil estaba arruinada. Y de repente, ¡zas!, Ketil compra tierras, vacas, un barco nuevo y un manto rojo para su hijo Torgil. Dijo que había encontrado plata en un naufragio.»',
  '«Mi difunto marido decía que Ketil había subido a las colinas con una pala una noche de luna nueva. Pero mi difunto marido decía muchas cosas.» Se encoge de hombros. «Aunque esa, la verdad, sí me la creí.»'],
  fx:{fl:{ketil_pista:1}},
  back:'c1_hild'},

c1_ketil:{h:'La granja de Ketil',t:[
  'La granja de Ketil es la más grande de Vindvik: tres casas largas, un establo de piedra y una cerca nueva pintada de rojo. Ketil sale a recibirte con cara de pocos amigos. Es un hombre grueso, con la barba trenzada en oro y los ojos de alguien que lleva diez años esperando esta visita.',
  '«{N}», dice, y no te invita a pasar. «He oído lo de la granja de Bersi. Mala cosa. ¿Qué te trae por aquí?»',
  'Cuando nombras la copa del rey, Ketil se pone blanco. Luego rojo. Luego grita a sus criados que te echen.'],
  c:[{x:'Agarrarlo del cuello y explicarle lo que pasará si los muertos llegan a Vindvik',to:'c1_ketil_ok',k:'main',chk:{s:'fue',dc:9,ok:'c1_ketil_ok',ko:'c1_ketil_ko'}},
     {x:'Convencerlo: si los muertos vienen, vendrán primero a por el ladrón',to:'c1_ketil_ok',k:'main',chk:{s:'ast',dc:9,ok:'c1_ketil_ok',ko:'c1_ketil_ko'}},
     {x:'Pedirle a Torgil que hable con su padre',to:'c1_ketil_torgil',k:'social',oc:1,req:{fl:'torgil_vencido'}}]},

c1_ketil_ok:{t:[
  'Ketil se viene abajo como un saco de grano mojado. «Diez años», balbucea. «Diez años con miedo a que alguien lo descubriera. Teníamos hambre, {N}. Mi hijo tenía hambre.»',
  'Entra en la casa y vuelve con un bulto envuelto en piel de foca. Dentro hay una copa de plata con un lobo grabado. Es lo único que no vendió. «No me atreví», dice. «Cada vez que la miraba, el lobo me miraba a mí.»'],
  fx:{fl:{copa:1},item:'copa_rolf',gl:8},
  c:[{x:'Volver a Vindvik · 1 h',to:'c1_aldea',fx:{t:1}}]},

c1_ketil_ko:{t:[
  'Ketil no cede. Sus criados, tres mozos grandes como bueyes, te rodean con horcas. No vas a matar a nadie de Vindvik por una copa, y Ketil lo sabe.',
  'Pero cuando te das la vuelta para irte, oyes pasos detrás de ti. Es la mujer de Ketil, Ragna, con un bulto envuelto en piel de foca. «Llévatela», susurra. «Llevo diez años sin dormir.» Dentro hay una copa de plata con un lobo grabado.'],
  fx:{fl:{copa:1},item:'copa_rolf',hp:-5},
  c:[{x:'Volver a Vindvik · 1 h',to:'c1_aldea',fx:{t:1}}]},

c1_ketil_torgil:{t:[
  'Torgil aparece detrás de su padre. Desde el banquete de Yule no ha vuelto a ser el mismo: ya no lleva el manto rojo, y cuando te ve no se burla.',
  '«Padre», dice en voz baja. «Dásela.» Ketil lo mira como si le hubiera clavado un cuchillo. «Todo Vindvik sabe ya de dónde salió nuestra plata. Lo único que nos queda es devolverla.»',
  'Ketil entra en la casa sin decir nada y vuelve con un bulto envuelto en piel de foca. Torgil te lo entrega él mismo. Dentro hay una copa de plata con un lobo grabado. «No lo hago por ti», dice. Pero no suena convencido.'],
  fx:{fl:{copa:1,torgil_ayuda:1},item:'copa_rolf',gl:10,saga:'Convenció a Torgil para que su padre devolviera la copa robada al rey Rolf.'},
  c:[{x:'Volver a Vindvik · 1 h',to:'c1_aldea',fx:{t:1}}]},

/* ---------- Runas de la Parte 3 ---------- */
c1_ansuz:{h:'La palabra de Odín',t:[
  'Groa te sienta frente a ella y te coge las dos manos. «<b>Ansuz</b> es la runa de la palabra», dice. «La de los escaldos, los sacerdotes y los que hacen juramentos. Con ella, una voz puede detener a un enemigo como si le hubieras golpeado.»',
  '«Pero la palabra hay que entenderla antes de usarla. Te haré una pregunta. Si aciertas, la runa es tuya.»'],
  acertijo:'groa_ansuz',back:'c1_groa2'},

c1_gebo:{h:'El regalo',t:[
  'Groa sonríe cuando entras. «Me han contado lo de Gudrun», dice. En Vindvik todo se sabe, y Groa lo sabe antes que nadie.',
  '«<b>Gebo</b> es la runa del regalo. Lo que das vuelve a ti, siempre, de una forma o de otra. Es la runa de los tratos, de los matrimonios y de los juramentos entre amigos.» Traza una cruz en tu palma. «En combate, lo que le quites a tu enemigo te sostendrá a ti. Úsala bien.»'],
  fx:{fl:{gebo:1},runa:'gebo',gl:5},
  back:'c1_groa2'},

/* ---------- El túmulo del rey Rolf ---------- */
c1_colina:{h:'Las colinas de los túmulos',cp:1,t:[
  'Las colinas de los túmulos son siete lomas redondas cubiertas de hierba amarillenta, ahora enterrada bajo la nieve. La más alta es la del rey Rolf. Su costado está abierto como una herida: las losas de la entrada están tiradas en la nieve, partidas desde dentro.',
  'Una luz azul y fría sale del agujero. Huele a tierra mojada, a hierro y a algo dulzón que prefieres no pensar qué es.',
  'Kraka se te pega al cuello. «Escucha, {N}. Si mueres ahí dentro, quiero que sepas que siempre me has caído… regular. Tirando a bien.» Se aclara la garganta. «Vamos. Antes de que me arrepienta.»'],
  c:[{x:'Entrar en el túmulo',to:'c1_tum_entrada',k:'main'},
     {x:'Volver a Vindvik · 2 h',to:'c1_aldea',fx:{t:2}}]},

c1_tum_entrada:{h:'El pasillo de las runas',t:[
  'Un pasillo largo y estrecho baja hacia el corazón de la colina. Las paredes son losas de piedra talladas con runas antiguas, tan gastadas que parecen arañazos. El suelo está cubierto de huesos de animales: ofrendas de hace doscientos años.',
  'A mitad del pasillo, la marca de tu mano empieza a doler. Las runas de esa parte de la pared son distintas: más profundas y más nuevas. Y el suelo, justo delante, está demasiado limpio.'],
  c:[{x:'Detenerte a leer las runas',to:'c1_tum_runas',k:'main',chk:{s:'esp',dc:8,ok:'c1_tum_runas',ko:'c1_tum_trampa'}},
     {x:'Seguir adelante con cuidado',to:'c1_tum_trampa',k:'n'}]},

c1_tum_runas:{t:[
  'Las runas forman una advertencia: «Quien pise sin pagar, pagará con sangre». Bajo ellas hay un pequeño cuenco de piedra, vacío.',
  'Dejas una moneda de plata en el cuenco. Algo hace clic dentro de la pared, y el suelo deja de parecer tan amenazador. Kraka suelta un silbido. «Hasta los muertos cobran peaje», dice. «Qué pueblo más avaricioso.»'],
  fx:{plata:-1,gl:3},
  c:[{x:'Seguir bajando',to:'c1_tum_sala',k:'main'}]},

c1_tum_trampa:{t:[
  'Das un paso y el suelo cede. Una losa se hunde bajo tu pie y, de la pared, salen disparadas tres lanzas oxidadas. Dos fallan. La tercera no.',
  'Te arrancas la punta del costado con un gruñido. Kraka, que ha salido volando hasta el techo, baja con cautela. «Las runas decían algo de pagar», comenta. «Lo he visto un poco tarde.»'],
  fx:{hp:-18},
  c:[{x:'Seguir bajando',to:'c1_tum_sala',k:'main'}]},

c1_tum_sala:{h:'La sala de la guardia',t:[
  'El pasillo se abre a una sala redonda con columnas de madera petrificada. En las paredes hay nichos, y en cada nicho, un guerrero muerto con su armadura, de pie, con la cabeza inclinada como si durmiera. Doce. Quizá más.',
  'En el centro de la sala, uno de ellos está despierto. Es más grande que los demás y sostiene un hacha de dos manos. Se vuelve hacia ti, despacio. Los otros siguen durmiendo, de momento.'],
  c:[{x:'Atacar al guardián antes de que despierte a los demás',to:'c1_f_guardian',k:'hunt'},
     {x:'Usar la luz de Kenaz para deslumbrarlo y pasar de largo',to:'c1_tum_sigilo',k:'main',req:{runa:'kenaz'},chk:{s:'esp',dc:9,ok:'c1_tum_sigilo',ko:'c1_f_guardian'}},
     {x:'Cruzar entre las sombras sin hacer ruido',to:'c1_tum_sigilo',k:'main',chk:{s:'ast',dc:10,ok:'c1_tum_sigilo',ko:'c1_f_guardian',fxko:{hp:-5}}}]},

c1_f_guardian:pelea('guardian','c1_tum_puerta',null,'El guardián del túmulo alza el hacha. En los nichos, algunos de los guerreros dormidos empiezan a mover los dedos.'),

c1_tum_sigilo:{t:[
  'Cruzas la sala pegad{o|a} a las columnas. El guardián gira la cabeza a un lado y a otro, olfateando, pero no te encuentra. Kraka va dentro de tu manto, quieto como una piedra por primera vez en su vida.',
  'Al otro lado de la sala hay una puerta de piedra cerrada. Cuando la alcanzas, oyes detrás de ti cómo el guardián vuelve a quedarse inmóvil.'],
  fx:{gl:10},
  c:[{x:'Examinar la puerta',to:'c1_tum_puerta',k:'main'}]},

c1_tum_puerta:{h:'La puerta del rey',t:[
  'La puerta de la cámara real es una sola losa de piedra negra, sin bisagras ni cerradura. En el centro hay un círculo de runas que brillan con la misma luz azul que las colinas.',
  'Debajo, la piedra está tallada con tanto cuidado que todavía se lee: una pregunta para quien quiera pasar.'],
  c:[{x:'Leer el acertijo de la puerta',to:'c1_tum_acertijo',k:'main',oc:1,req:{no:'ac_puerta_rolf'}},
     {x:'Cruzar la puerta abierta',to:'c1_tum_barco',k:'main',oc:1,req:{fl:'ac_puerta_rolf'}},
     {x:'Forzar la losa con el hombro',to:'c1_tum_barco',k:'hunt',oc:1,req:{no:'ac_puerta_rolf'},chk:{s:'fue',dc:10,ok:'c1_tum_barco',ko:'c1_tum_forzar_ko',fxok:{hp:-6},fxko:{hp:-12}}}]},

c1_tum_acertijo:{h:'El acertijo de la puerta',t:[
  'Kraka lee las runas por encima de tu hombro, moviendo el pico. «Una adivinanza», dice. «Los reyes antiguos estaban obsesionados con las adivinanzas. Ninguno sabía contar chistes.»'],
  acertijo:'puerta_rolf',back:'c1_tum_puerta'},

c1_tum_forzar_ko:{t:[
  'Empujas hasta que te crujen los hombros. La losa no se mueve ni un dedo. Te dejas caer contra la pared, sin aliento.',
  '«Ánimo», dice Kraka. «Solo es una piedra de doscientos años y unas cuantas toneladas. Seguro que a la próxima.»'],
  c:[{x:'Intentarlo otra vez',to:'c1_tum_barco',k:'hunt',chk:{s:'fue',dc:10,ok:'c1_tum_barco',ko:'c1_tum_forzar_ko',fxok:{hp:-6},fxko:{hp:-12}}}]},

c1_tum_barco:{h:'El barco del rey',t:[
  'La cámara real es enorme. En el centro, enterrado bajo la colina hace doscientos años, descansa un barco largo, de proa alta tallada como la cabeza de un lobo. A su alrededor hay huesos de caballo, de perro y de halcón: el rey se llevó a la otra vida todo lo que amaba.',
  'Sobre la cubierta brillan los restos del tesoro. Ketil, o quien fuera, se llevó casi todo, pero todavía quedan brazaletes de plata, broches y monedas extranjeras desperdigados por la madera.'],
  c:[{x:'Recuperar el aliento a la sombra del barco · 1 h',to:'c1_tum_barco',k:'side',oc:1,req:{no:'respiro'},fx:{fl:{respiro:1},hp:30,t:1}},
     {x:'Llenarte la bolsa de plata: los muertos no la necesitan',to:'c1_tum_saqueo',k:'shop'},
     {x:'No tocar nada y seguir hacia el trono',to:'c1_tum_rey',k:'main'}]},

c1_tum_saqueo:{t:[
  'Llenas la bolsa de plata hasta que pesa como una piedra. Kraka no dice nada, y eso es peor que cualquier comentario.',
  'Al fondo de la cámara, algo se mueve en un trono de piedra.'],
  fx:{plata:60,fl:{saqueo:1},gl:-15},
  c:[{x:'Acercarte al trono',to:'c1_tum_rey',k:'main'}]},

c1_tum_rey:{h:'El rey Rolf',gen:'c1_rey',t:[],
  c:[{x:'Ofrecerle la copa: «Vindvik te devuelve lo que te robó»',to:'c1_tum_copa',k:'main',oc:1,req:{item:'copa_rolf',no:'saqueo'}},
     {x:'Alzar el arma',to:'c1_f_rolf',k:'hunt'}]},

c1_tum_copa:{h:'La copa del rey',t:[
  'El rey Rolf coge la copa con dedos que son más hueso que carne. La gira despacio. El lobo grabado brilla con la luz azul.',
  '«Doscientos años», dice. «Doscientos años defendiendo a un pueblo que me robó. Y ahora mi pueblo me devuelve la copa.» Te mira, y en las brasas de sus ojos hay algo parecido al cansancio. «Pero tú vienes a por mi espada. Lo veo en tu marca.»',
  '«Sea. No me la quitarás como un ladrón: la ganarás como {un guerrero|una guerrera}. Un combate de honor, rey contra campeón, como en los viejos tiempos. Si vences, Muerdetumbas es tuya y yo descansaré.»'],
  fx:{quita:{copa_rolf:1},fl:{copa_dev:1,gebo_ok:1},gl:15,saga:'Devolvió al rey Rolf la copa que le robaron.'},
  c:[{x:'Aceptar el combate de honor',to:'c1_f_rolf_honor',k:'main'}]},

c1_f_rolf_honor:{t:['El rey Rolf se pone la corona de hierro y desenvaina Muerdetumbas. La hoja suena como un lobo que aúlla.'],f:{e:'rolf_honor',win:'c1_rolf_descansa',lose:'muerte'}},

c1_f_rolf:{t:['El rey Rolf alza Muerdetumbas y la cámara entera se llena de un aullido de lobo. En los nichos de la sala de la guardia, doce guerreros muertos abren los ojos.'],f:{e:'rolf',win:'c1_rolf_cae',lose:'muerte'}},

c1_rolf_descansa:{h:'El descanso del rey',t:[
  'El rey Rolf baja la espada. Se tambalea, apoya una rodilla en el suelo y, con mucho cuidado, te tiende Muerdetumbas por la empuñadura.',
  '«Bien luchado», dice. «Defiende Vindvik. Ese era mi juramento. Ahora es el tuyo.» Se sienta otra vez en su trono, con la copa entre las manos. La luz azul de sus ojos se apaga poco a poco, como una vela al amanecer.',
  'En el silencio que queda, oyes cómo toda la colina suspira.'],
  fx:{item:'muerdetumbas',fl:{rolf_fin:1,rolf_paz:1},cumple:'rolf',gl:20,saga:'Venció al rey Rolf en un combate de honor y recibió de sus manos la espada Muerdetumbas. El rey descansó al fin.'},
  c:[{x:'Empuñar Muerdetumbas',to:'c1_tyr',k:'main',fx:{equipa:'muerdetumbas'}},
     {x:'Guardar la espada y salir',to:'c1_tyr',k:'n'}]},

c1_rolf_cae:{h:'La caída del rey',t:[
  'El rey Rolf se desploma sobre su propio barco. Muerdetumbas cae de su mano y resbala por la cubierta hasta tus pies. La luz azul de sus ojos se apaga de golpe, como una antorcha arrojada al agua.',
  'Pero no hay paz en esa muerte. Notas cómo la colina entera se estremece, furiosa. «Lo has vencido», dice Kraka en voz baja, «pero no lo has calmado. Eso tendrá consecuencias, {N}. Siempre las tiene.»',
  'Coges la espada. Está fría, mucho más fría que el aire.'],
  fx:{item:'muerdetumbas',fl:{rolf_fin:1},cumple:'rolf',gl:10,saga:'Derrotó al rey draug Rolf en su túmulo y le arrebató la espada Muerdetumbas.'},
  c:[{x:'Empuñar Muerdetumbas',to:'c1_tyr',k:'main',fx:{equipa:'muerdetumbas'}},
     {x:'Guardar la espada y salir',to:'c1_tyr',k:'n'}]},

/* ---------- La prueba de Tyr ---------- */
c1_tyr:{h:'El dios manco',cp:1,t:[
  'Cuando vuelves a la sala de la guardia, alguien te espera en el centro. Es un hombre alto, de barba gris, con una cota de malla sencilla y un manto azul. Le falta la mano derecha. En su lugar, el muñón está envuelto en cuero viejo.',
  'Kraka se queda helado. «Tyr», susurra. «Es Tyr. El que puso la mano en la boca del lobo Fenrir para que los dioses pudieran encadenarlo. Sabía que el lobo se la arrancaría. La puso igual.»',
  '«Todo lo que vale, cuesta», dice el dios. Su voz es tranquila, como la de un juez. «Quieres el Valhalla. Bien. Demuéstrame que sabes pagar. Dame algo que te duela perder, y tendrás mi favor.»'],
  c:[{x:'Ofrecerle el amuleto de Siri',to:'c1_tyr_tras',k:'main',oc:1,req:{item:'amuleto_siri'},
      fx:{quita:{amuleto_siri:1},st:{sue:-1},favor:'tyr',gl:10,saga:'Entregó a Tyr el amuleto de su sobrina, lo que más quería, a cambio de su favor.'}},
     {x:'Ofrecerle uno de tus hilos del destino',to:'c1_tyr_tras',k:'main',req:{hilos:1},
      fx:{hilo:-1,favor:'tyr',gl:10,saga:'Entregó a Tyr un hilo de su propio destino a cambio de su favor.'}},
     {x:'Ofrecerle parte de tu fuerza vital (−15 de Vida máxima)',to:'c1_tyr_tras',k:'main',
      fx:{mhp:-15,favor:'tyr',gl:10,saga:'Entregó a Tyr parte de su fuerza vital a cambio de su favor.'}},
     {x:'No ofrecer nada',to:'c1_tyr_tras',k:'n'}]},

c1_tyr_tras:{gen:'c1_tyr_tras',t:[],
  c:[{x:'Salir del túmulo y volver a Vindvik · 2 h',to:'c1_aldea',k:'main',fx:{t:2}}]},

/* ---------- El regreso ---------- */
c1_regreso:{h:'Muerdetumbas',cp:1,t:[
  'Entras en el salón del jarl con Muerdetumbas en la mano. La hoja oscura parece beberse la luz del fuego. Se hace un silencio tan completo que se oye crepitar la leña.',
  'Hakon se levanta de su sitial, coge la espada con las dos manos, la mira largo rato y te la devuelve. «Es tuya», dice. «Nadie en Vindvik se atrevería a llevarla.» Después se vuelve hacia el salón. «¡Esta noche celebraremos que los muertos han vuelto a sus tumbas! ¡Y que {N} ha vuelto de la suya!»',
  'El salón ruge. Eyvind coge la lira. Kraka, en tu hombro, murmura: «Esta vez, la canción va a ser casi verdad».'],
  fx:{fl:{regreso:1},gl:10},
  c:[{x:'Ir a ver a Groa y a Siri antes de la celebración',to:'c1_wunjo',k:'main'}]},

c1_wunjo:{h:'Júbilo',gen:'c1_wunjo',t:[],
  fx:{runa:'wunjo',fl:{wunjo:1}},
  c:[{x:'Volver al pueblo',to:'c1_aldea',k:'main'}]},

/* ---------- La noche del salón en llamas ---------- */
c1_celebracion:{h:'La última celebración',cp:1,t:[
  'La celebración dura hasta que la luna está alta. Eyvind estrena la saga del rey Rolf, Gudrun y la pequeña Thora tienen sitio junto al fuego, y hasta Hild sirve cerveza gratis, cosa que no ocurría desde la boda de su hija.',
  'Entonces se oye la campana del muelle. Una, dos, tres veces, frenética. Luego, un grito. Luego, el silencio.',
  'Sales corriendo con Muerdetumbas en la mano. Por el fiordo helado, desde el mar, avanzan figuras: decenas de figuras que caminan sobre el hielo con algas en el pelo y agua chorreándoles de las barbas. Los ahogados de la gran tormenta. Han venido todos a la vez.'],
  fx:{hasta:23},
  c:[{x:'Correr al muelle a detenerlos',to:'c1_f_ahogados',k:'hunt',oc:1,req:{no:'lobo_libre'}},
     {x:'Correr al muelle a detenerlos',to:'c1_lobo_vuelve',k:'main',oc:1,req:{fl:'lobo_libre'}}]},

c1_f_ahogados:pelea('ahogado','c1_einar',null,'El primer ahogado sale del hielo justo delante de ti, con la boca abierta en un grito sin sonido. Detrás de él vienen muchos más.'),

c1_lobo_vuelve:{h:'El aullido',t:[
  'Antes de que llegues al muelle, un aullido rueda desde el Bosque Gris. Es tan largo y tan hondo que los ahogados se detienen sobre el hielo y vuelven la cabeza.',
  'El Lobo Ceniza sale de entre los árboles a la carrera, gris como el humo, enorme como un caballo. Pasa a tu lado sin mirarte y se lanza contra la primera fila de muertos como una ola contra las rocas.',
  'Kraka grazna de pura alegría. «¡Se acuerda! ¡Se acuerda de ti!» Durante unos minutos, el lobo y tú lucháis hombro con hombro sobre el hielo, y los ahogados retroceden.'],
  fx:{gl:15,saga:'La noche de los ahogados, el Lobo Ceniza al que liberó volvió para luchar a su lado.'},
  c:[{x:'Seguir avanzando hacia el muelle',to:'c1_einar',k:'main'}]},

c1_einar:{h:'Einar',t:[
  'Al pie del muelle, delante de todos los ahogados, hay un hombre que conoces. Tiene tu nariz y la barbilla de tu padre. Lleva diez años en el fondo del mar y la piel le cuelga como algas, pero lo reconocerías en cualquier parte.',
  'Einar. Tu hermano. El padre de Siri.',
  '«{Hermano|Hermana}», dice con una voz llena de agua. «Ven. El mar está frío, pero no tanto como esto. El invierno ha llegado y nos ha despertado a todos. Ven con nosotros. Trae a la niña.»',
  'Detrás de ti oyes pasos sobre la nieve. Es Siri, con los ojos muy abiertos. Ha venido corriendo detrás de ti.'],
  fx:{hp:20},
  c:[{x:'Pedirle a Siri que cante la runa del descanso mientras tú lo contienes',to:'c1_einar_paz',k:'main',oc:1,req:{fl:'siri_aprendiz'},
      chk:{s:'esp',dc:9,ok:'c1_einar_paz',ko:'c1_f_einar',fxko:{hp:-10}}},
     {x:'Ponerte entre Siri y su padre y alzar el arma',to:'c1_f_einar',k:'hunt'}]},

c1_f_einar:{t:['Einar alza los brazos y el hielo cruje bajo sus pies. «Entonces te llevaré yo», dice. Siri grita tu nombre.'],f:{e:'einar',win:'c1_einar_cae',lose:'muerte'}},

c1_einar_paz:{h:'La canción del descanso',t:[
  'Sujetas a Einar por los hombros mientras se revuelve. Es fuerte como el mar en una tormenta, y sus manos te queman de frío. Detrás de ti, con la voz temblando, Siri empieza a cantar.',
  'Es una canción antigua, de las que Groa canta junto a los muertos. Al principio la voz de Siri es débil. Luego se hace firme. Einar deja de forcejear. Te mira, y por un momento sus ojos no son blancos: son los ojos de tu hermano, los de cuando erais niños y robabais manzanas al viejo Tore.',
  '«Siri», dice. Solo eso. Luego se deshace entre tus manos como espuma de mar, y con él, uno tras otro, todos los ahogados del fiordo. Siri se queda de pie sobre el hielo, llorando y cantando a la vez, hasta que no queda ninguno.'],
  fx:{fl:{einar_paz:1},gl:40,saga:'Sostuvo a su hermano Einar, ahogado diez años atrás, mientras su sobrina Siri le cantaba el descanso. Einar se marchó en paz.'},
  c:[{x:'Abrazar a Siri',to:'c1_salon_arde',k:'main'}]},

c1_einar_cae:{h:'El mar se lo lleva',t:[
  'Einar cae de rodillas sobre el hielo. Por un instante, sus ojos dejan de ser blancos y te mira como te miraba cuando erais niños. Intenta decir algo, pero solo sale agua.',
  'Luego el hielo se abre bajo él y el mar se lo lleva, y con él a todos los ahogados del fiordo. Siri llega a tu lado y te coge de la mano. No dice nada. No hace falta.'],
  fx:{fl:{einar_cae:1},saga:'Derrotó a su propio hermano Einar, convertido en draug, para proteger a Vindvik.'},
  c:[{x:'Volver hacia el pueblo',to:'c1_salon_arde',k:'main'}]},

c1_salon_arde:{h:'El salón en llamas',gen:'c1_salon_arde',t:[],
  fx:{gl:10},
  c:[{x:'Mirar las brasas',to:'c1_cuervo',k:'main'}]},

/* ---------- El cuervo de Odín y Skuld ---------- */
c1_cuervo:{h:'El cuervo de Odín',t:[
  'Al amanecer, sobre las vigas carbonizadas del salón, se posa un cuervo. Es enorme, el doble que Kraka, con plumas que brillan como el aceite y unos ojos que parecen mirar dentro de las cosas.',
  'Kraka intenta esconderse detrás de tu cuello. «Es Hugin», susurra. «El pensamiento de Odín. Mi antiguo jefe.»',
  'Hugin no le hace caso. Te mira solo a ti. «Odín ha visto lo que has hecho, {N} de Vindvik», dice, con una voz que suena como un viento lejano. «El Gran Invierno avanza más deprisa de lo que nadie esperaba. Bajo las raíces de Yggdrasil, los enanos forjan armas para el fin del mundo. Ve allí.» Luego, sin volverse: «Y tú, Kraka. Sigue con {él|ella}. Es tu castigo.» Y se va.',
  'Kraka tarda un rato en recuperar la voz. «¿Castigo?», protesta al fin. «¿Castigo? Bueno… pues vale.»'],
  fx:{gl:10,hasta:7},
  c:[{x:'«¿Dónde están las raíces de Yggdrasil?»',to:'c1_skuld',k:'main'}]},

c1_skuld:{h:'El hilo',t:[
  'No la oyes llegar. De pronto, Skuld está sentada en un banco quemado, con el huso en el regazo, como si estuviera allí desde siempre. El hilo de su huso es ahora un poco más largo y un poco más brillante.',
  '«Lo has hecho bien», dice. No es un elogio: es una constatación, como quien dice que nieva. «Mejor de lo que esperaba. Peor de lo que necesitas.»',
  '«Las raíces del Árbol están bajo el pozo seco del Bosque Gris. Kraka conoce el camino. Allí abajo hay enanos, dragones y cosas peores. Allí abajo aprenderás runas que en Midgard no se pueden aprender.» Tira suavemente del hilo y lo enrolla en el huso. «Toma. Lo vas a necesitar.»',
  'Algo cálido te recorre la marca de la mano. Cuando levantas la vista, Skuld ya no está.'],
  fx:{hilo:1},
  c:[{x:'Ir a despedirte de Siri',to:'c1_despedida',k:'main'}]},

c1_despedida:{h:'La despedida',gen:'c1_despedida',t:[],
  fx:{plata:50,item:{unguento:2}},
  c:[{x:'Ponerte en camino hacia el Bosque Gris',to:'c1_fin',k:'main'}]},

/* ---------- Fin del capítulo ---------- */
c1_fin:{h:'Fin del Capítulo 1',t:[
  'Sales de Vindvik al amanecer, con Muerdetumbas al cinto, Kraka en el hombro y la marca de Skuld fría en la palma. Desde la colina te vuelves una vez: el humo del salón quemado, las casas de turba bajo la nieve y, en la puerta de la cabaña de Groa, una figura pequeña que te dice adiós con la mano.',
  'Más allá del Bosque Gris, el pozo seco te espera. Y debajo, las raíces del mundo.',
  '<span class=tag>Has completado el Capítulo 1: La Muerte de Paja. La senda continúa en el Capítulo 2: Bajo las Raíces.</span>'],
  fx:{fl:{c1fin:1},saga:'Partió de Vindvik hacia las raíces de Yggdrasil.'},
  end:'Capítulo 1 completado',saga:1}

}});
})();
