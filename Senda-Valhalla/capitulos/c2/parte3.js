/* =====================================================================
   Capítulo 2 · Bajo las Raíces
   Parte 3 · «El gusano de la veta de oro»
   Thor llega a Nidavellir (prueba de Thor, Hagalaz). Bajada a la veta
   con Regin: la codicia, los buscadores enloquecidos, el derrumbe
   (Nauthiz), Andvari en el lago, la piedra del sol (Sowilo) y Fafnir.
   El anillo maldito, el tercer tesoro, el arma definitiva y la boca
   cosida de Lopt. Final del capítulo: c2_fin.
   Sustituye la escena provisional c2_p3 de la Parte 2.
   ===================================================================== */
(()=>{
const pelea=(e,win,flee,t)=>({t:[t],f:{e,win,lose:'muerte',flee}});

/* ---------- Datos nuevos ---------- */
Object.assign(OBJ,{
  oro_veta:{n:'Oro de la veta',tipo:'clave',d:'Lingotes del tesoro de Fafnir. Pesan más de lo que deberían.'},
  anillo_andvari:{n:'Andvaranaut, el anillo de Andvari',tipo:'clave',d:'Un anillo de oro rojo que atrae el oro. Y la desgracia.'},
  hacha_dorada:{n:'Hacha de los hermanos',tipo:'arma',atq:22,crit:10,pr:2500,d:'Oro de Andvari templado en hierro enano. Su filo nunca se mella.'},
  espada_dorada:{n:'Espada de los hermanos',tipo:'arma',atq:18,crit:18,vel:2,pr:2500,d:'Ligera como una pluma, dura como una promesa enana.'},
  lanza_dorada:{n:'Lanza de los hermanos',tipo:'arma',atq:19,crit:12,vel:6,am:6,pr:2500,d:'Una hermana pequeña de Gungnir. Vuela recta y vuelve a la mano.'},
  muerdetumbas_renacida:{n:'Muerdetumbas renacida',tipo:'arma',atq:20,crit:12,am:16,pr:3000,d:'La espada del rey Rolf, reforjada con oro de Andvari. Los muertos la temen más que nunca.'}
});
Object.assign(ENEMIGOS,{
  buscador:{n:'Buscador de oro enloquecido',cat:'Enano maldito',hp:96,a:17,gl:22,o:35,l:{pan_enano:.4}},
  lombriz_fuego:{n:'Lombriz de fuego',cat:'Bestia de las minas',hp:104,a:18,gl:24,o:0,l:{hongo_lava:1}},
  fafnir:{n:'Fafnir',cat:'Dragón',hp:240,a:21,gl:120,o:0},
  fafnir_herido:{n:'Fafnir',cat:'Dragón · herido desde el foso',hp:145,a:19,gl:120,o:0},
  fafnir_hermano:{n:'Fafnir',cat:'Dragón · dudando',hp:185,a:18,gl:120,o:0}
});

registrarSenales({
  18:'Todo Nidavellir se detiene un instante: muy lejos, en Jotunheim, ha cantado un gallo. Los enanos viejos se tapan los oídos.'
},S=>S.fl.c2&&!S.fl.c3);

registrarMision(S=>{
  if(!S.fl.c2p2fin)return null;
  if(!S.fl.thor_fin)return 'Alguien ha llegado a la forja de Brok entre truenos.';
  if(!S.fl.fafnir_muerto)return `Baja a la veta de oro con Regin y enfréntate a Fafnir. La apuesta de Lopt vence al final del día ${S.fl.plazo}.`;
  if(!S.fl.tercer_tesoro)return 'Vuelve a la forja de Brok con el oro de la veta.';
  if(!S.fl.c2fin)return 'Despídete de Nidavellir.';
  return S.fl.c3?null:'Capítulo 2 completado. La senda continúa en Jotunheim, la tierra de los gigantes.';
});

/* ---------- Ampliaciones ---------- */
SC.c2_ciudad.c.push({x:'Bajar a la veta de oro con Regin',to:'c2_reja',k:'main',oc:1,req:{fl:'thor_fin',no:'fafnir_muerto'}});
SC.c2_forja_brok.c.push({x:'Hablar con Thor',to:'c2_thor_consejo',k:'social',oc:1,req:{fl:'thor_fin',no:['fafnir_muerto','thor_consejo']}});

/* ---------- Textos variables ---------- */
const tarde=()=>S.dia>S.fl.plazo;
GEN.c2_p3=()=>{if(!S.fl.plazo)S.fl.plazo=S.dia+4;return {t:[
  'Esa misma noche, mientras Brok y Eitri discuten cómo dar forma a un tesoro que aún no existe, toda la montaña tiembla. No es un terremoto: es un trueno. Un trueno dentro de una montaña, lo cual es imposible.',
  'Por el túnel principal de Nidavellir entra un carro tirado por dos machos cabríos enormes, uno negro y otro gris, que echan chispas por los cuernos. Los enanos se apartan, se inclinan, se esconden. Sobre el carro viene un hombre gigantesco, de barba roja, con un martillo corto colgado del cinto.',
  'Kraka se queda rígido en tu hombro. «No», susurra. «No, no, no, no. Es él.»']};};

GEN.c2_reja=()=>({t:[
  'La reja de la veta de oro tiene siete cerraduras. Regin las abre una a una con las llaves que le ha dado Brok. Le tiemblan las manos.',
  S.fl.hreidmar_charla
    ?'Hreidmar ha bajado hasta la reja para despediros. Abraza a Regin largo rato. Luego te coge la mano marcada con las dos suyas. «Fafnir era un buen chico», dice. «Antes del oro. Si queda algo de él ahí abajo… dile que su padre lo perdona.»'
    :'Detrás de vosotros, Brok y Eitri miran en silencio. Ninguno de los dos dice «buena suerte». Los enanos creen que da mala suerte.',
  'La última cerradura cede. Del túnel sube un aire tibio que huele a metal y a algo más, algo dulce y podrido, como fruta olvidada. Regin respira hondo. «Vamos», dice. «Antes de que me arrepienta.» Kraka murmura que él ya se ha arrepentido, pero baja igual.']});

GEN.c2_fafnir_muere=()=>({t:[
  'Fafnir se desploma sobre su tesoro, y las monedas saltan como el agua de un lago al que se tira una piedra. La sangre del dragón es negra y humea.',
  S.fl.nombre_oculto
    ?'Con su último aliento, Fafnir intenta maldecirte. «Que el oro te… que el oro…» Pero no sabe tu nombre, y una maldición sin nombre no tiene a quién agarrarse. Se deshace en el aire como el humo.'
    :`Con su último aliento, Fafnir te maldice por tu nombre. «{N}», sisea. «Que el oro te persiga. Que todo lo que ames se pierda por él.» Las palabras se te pegan a la piel como ceniza. Sientes que te pesan.`,
  'Regin se arrodilla junto a la enorme cabeza de su hermano. Los ojos del dragón, al cerrarse, por un instante parecen otros: más pequeños, más humanos. Ojos de enano.']});

GEN.c2_vuelta=()=>({t:[
  tarde()
    ?'Llegas a la forja con el oro a cuestas, sucio, cansado y tarde. Muy tarde. Lopt ya está allí, sentado sobre el yunque, afilando un cuchillo con cara de felicidad. Brok, delante de él, tiene la cabeza muy alta y la mandíbula muy apretada.'
    :'Llegas a la forja con el oro a cuestas, sucio y cansado, pero a tiempo. Brok deja caer el martillo. Eitri suelta una carcajada que no le habías oído nunca. Thor, sentado en un rincón con un barril de cerveza, levanta la jarra en tu honor.',
  S.fl.maldito&&!S.fl.andvari_libre
    ?'Eitri coge un lingote y frunce el ceño. «Este oro está maldito», dice. «Lo noto en los dedos.» Mira a Brok. «Da igual», gruñe Brok. «La maldición es para quien lo posee, no para quien lo forja. Al fuego.»'
    :'Eitri coge un lingote y lo sopesa. «Oro de Andvari», dice. «Limpio, por increíble que parezca.» Te mira con algo parecido al asombro.']});

GEN.c2_lopt_final=()=>{S.fl.brok_tarde=tarde()?1:0;return {t:tarde()?[
  '«Cuatro días», dice Lopt, sonriendo. «Y ya van cinco. La cabeza de Brok es mía.» Se levanta con el cuchillo en la mano.',
  'Brok no se mueve. «Mi cabeza, sí», dice muy despacio. «Pero en la apuesta no dijimos nada del cuello. Y el cuello es mío. Córtame la cabeza sin tocarme el cuello, Lopt, y es tuya.»',
  'Lopt abre la boca. La cierra. La vuelve a abrir. Thor se ríe tan fuerte que tiembla la montaña. Al final, Lopt guarda el cuchillo con un gesto de asco. «Tramposos», escupe. «Todos los enanos sois unos tramposos.» Y se va, entre carcajadas de toda la forja.']
 :[
  'Lopt aparece en la forja justo cuando el tercer tesoro sale del fuego. Ya no sonríe. Mira el nuevo mango de Mjolnir en las manos de Thor, mira a Brok, te mira a ti.',
  '«Bueno», dice. «Una apuesta es una apuesta. ¿Qué habíamos dicho que ganabas tú, Brok?» Brok sonríe por primera vez desde que lo conoces. Coge una lezna y un trozo de cordel. «Tu boca, Lopt. Dijimos que, si ganaba, te coserías esa boca de mentiroso.»',
  'Thor sujeta a Lopt con una sola mano mientras Brok le cose los labios con siete puntadas. Lopt no grita: no puede. Pero te mira, por encima del cordel, con unos ojos que no olvidarás nunca. Luego se arranca el hilo de un tirón, sangrando, se ríe sin boca y desaparece. Kraka tarda una hora en dejar de temblar.']};};

GEN.c2_despedida=()=>({t:[
  'Antes de partir, te despides de Nidavellir. Eitri te regala un frasco de savia de Yggdrasil «para las runas». Brok te da una palmada en la espalda que casi te tira al suelo, y no dice nada, que en Brok es lo más parecido a un discurso.',
  S.fl.regin_anillo
    ?'Regin no viene a despedirte. Te dicen que está en su casa, encerrado, mirando el anillo de Andvari. Hreidmar llora en la puerta de la forja. Sientes que has dejado algo sin resolver, algo que volverá.'
    :'Regin te abraza tan fuerte como Siri en Vindvik. «Si algún día necesitas un herrero», dice, «o un amigo con barba, ya sabes dónde estoy. Bajo el mundo, a la izquierda.» Hreidmar, detrás de él, te hace una reverencia.',
  'Thor espera junto a su carro, impaciente. Los dos machos cabríos, Rechinadientes y Crujedientes, te miran con cara de pocos amigos. Kraka los mira a ellos con cara de muchísimos menos.']});

registrarCapitulo({capitulo:2,parte:3,titulo:'El gusano de la veta de oro',escenas:{

/* ---------- Thor ---------- */
c2_p3:{h:'El trueno bajo la montaña',cp:1,gen:'c2_p3',t:[],
  c:[{x:'Seguir al carro hasta la forja de Brok',to:'c2_thor',k:'main'}]},

c2_thor:{h:'Thor',t:[
  'Thor baja del carro y la forja entera parece hacerse más pequeña. Es enorme, pelirrojo, con unos brazos como robles y una voz que hace vibrar el yunque. «¡Brok!», ruge. «¿Qué es eso de que has apostado tu cabeza con un pelirrojo? ¡Esa cabeza forja mis cosas!»',
  'Brok se lo explica todo: la apuesta, los tesoros, la mosca, el oro de la veta. Thor escucha, cada vez más rojo. «Lopt», gruñe al final. «Siempre Lopt.»',
  'Entonces se fija en ti. Y luego, en lo que llevas en el hombro. Entorna los ojos. «Un momento», dice despacio. «Yo conozco a ese cuervo.»'],
  c:[{x:'Mirar a Kraka',to:'c2_thor_cabra',k:'main'}]},

c2_thor_cabra:{h:'El asunto de la cabra',t:[
  '«¡TÚ!», ruge Thor, señalando a Kraka con un dedo como una salchicha. «¡El de la cabra! ¡El que fue contando por todo Asgard lo de la cabra!»',
  'Kraka se esconde detrás de tu cabeza. «Señor Thor», balbucea. «Fue un malentendido. Un pequeño malentendido. Yo solo dije que vuestra cabra Crujedientes tenía mejor juicio que vos para elegir posada. Y que por eso la posada se quemó. Bueno, y lo de la cerveza. Pero lo de la cerveza lo sabía todo el mundo.»',
  'Hay un silencio terrible. Luego, desde el carro, el macho cabrío gris bala con evidente satisfacción. Thor mira a la cabra, mira a Kraka y, contra todo pronóstico, se echa a reír tan fuerte que se le saltan las lágrimas. «¡Es verdad!», jadea. «¡Es verdad, maldita sea! Crujedientes tiene mejor juicio que yo.»',
  'Cuando por fin se calma, se seca los ojos y te mira de arriba abajo. «Así que tú eres {la mortal|el mortal} de Skuld. ¿Y vas a bajar a matar a un dragón?» Se cruje los nudillos. «Veamos de qué estás hech{o|a}.»'],
  fx:{fl:{thor_cabra:1}},
  c:[{x:'«Ponme a prueba»',to:'c2_thor_prueba',k:'main'}]},

c2_thor_prueba:{h:'La prueba de Thor',cp:1,t:[
  'Thor te lleva al borde del gran río de lava y te pone en medio de un puente de piedra. Él se coloca al otro lado. Descuelga el martillo del cinto.',
  '«La prueba es sencilla», dice. «Voy a lanzarte a Mjolnir. No para matarte: si quisiera matarte, ya estarías muert{o|a}. Pero pasará muy cerca. Los que retroceden, caen a la lava. Los que se quedan quietos, ganan mi favor.»',
  'Los enanos se agolpan en los anillos de la ciudad para mirar. Regin se tapa los ojos. Kraka, prudentemente, se ha ido volando a una viga.'],
  c:[{x:'Quedarte quiet{o|a}, sin pestañear',to:'c2_thor_ok',k:'main',chk:{s:'esp',dc:10,ok:'c2_thor_ok',ko:'c2_thor_ko'}},
     {x:'Alzar la runa Algiz y esperar el golpe',to:'c2_thor_ok',k:'main',oc:1,req:{runa:'algiz'},chk:{s:'esp',dc:8,ok:'c2_thor_ok',ko:'c2_thor_ko'}}]},

c2_thor_ok:{t:[
  'Mjolnir sale de la mano de Thor con un estampido y cruza el aire como un rayo. Lo ves venir directo a tu cara. No te mueves. El martillo pasa a un palmo de tu oreja, tan cerca que te chamusca el pelo, da media vuelta sobre la lava y vuelve a la mano de su dueño.',
  'Toda Nidavellir estalla en vítores. Thor cruza el puente en tres zancadas y te da un abrazo que te levanta del suelo. «¡Bien! ¡Muy bien! Tienes más agallas que la mitad de los einherjar de mi padre.»'],
  fx:{favor:'thor',gl:25,saga:'Aguantó sin moverse el martillo de Thor lanzado contra su cara, y ganó el favor del dios del trueno.'},
  c:[{x:'Recuperar el aliento',to:'c2_thor_hagalaz',k:'main'}]},

c2_thor_ko:{t:[
  'Mjolnir sale de la mano de Thor con un estampido, y tu cuerpo se mueve antes que tu voluntad: das un paso atrás. Solo uno. El talón te resbala en el borde del puente y sientes el calor de la lava en la espalda.',
  'Una mano enorme te agarra del cinturón y te devuelve al puente. Thor. Ni lo has visto cruzar. «Casi», dice, no sin amabilidad. «Casi. La próxima vez no te moverás.»'],
  fx:{hp:-20,gl:5},
  c:[{x:'Recuperar el aliento',to:'c2_thor_hagalaz',k:'main'}]},

c2_thor_hagalaz:{h:'El granizo',t:[
  'Thor se sienta en el borde del puente con las piernas colgando sobre la lava, como un niño en un muelle. «Te voy a enseñar algo», dice. «No soy un gran maestro de runas, eso es cosa de mi padre. Pero hay una que conozco bien, porque es la mía.»',
  'Con la punta de un dedo traza en tu palma una línea, otra y un trazo cruzado. Te escuece como si te hubiera caído granizo. «<b>Hagalaz</b>», dice. «La tormenta. El granizo que destroza las cosechas. No es una runa amable, pero cuando cae, todo lo demás se aparta.»'],
  fx:{fl:{thor_fin:1},runa:'hagalaz',gl:10},
  c:[{x:'Volver a la forja',to:'c2_thor_consejo',k:'main'}]},

c2_thor_consejo:{h:'El consejo de Thor',t:[
  '«Yo no puedo bajar a la veta», dice Thor, muy serio para ser él. «Ese oro está maldito. Si un dios lo toca, la maldición sube a Asgard. Mi padre me arrancaría la barba.»',
  '«Pero te diré lo que sé de dragones. Fafnir es grande, viejo y está acorazado de escamas por arriba. Por arriba, ¿entiendes? Por abajo, la panza la tiene blanda como la de un pez.» Te guiña un ojo. «Y los dragones, por muy dragones que sean, tienen que beber agua. Todos los días. Siempre por el mismo camino.»',
  'Regin, que escuchaba desde la puerta, se queda pensativo. «Un foso», murmura. «En el camino al agua.»'],
  fx:{fl:{thor_consejo:1,thor_fin:1}},
  c:[{x:'Volver a la ciudad para prepararte',to:'c2_ciudad',k:'main'},
     {x:'Bajar ahora mismo a la veta con Regin',to:'c2_reja',k:'main'}]},

/* ---------- La veta de oro ---------- */
c2_reja:{h:'La reja',cp:1,gen:'c2_reja',t:[],
  c:[{x:'Bajar a la veta',to:'c2_galerias',k:'main',fx:{t:1}},
     {x:'Volver a la ciudad',to:'c2_ciudad'}]},

c2_galerias:{h:'Las galerías doradas',t:[
  'Bajáis durante horas. Al principio solo hay roca. Luego, vetas de oro en las paredes, finas como cabellos. Luego, pepitas sueltas en el suelo. Y al final, monedas: miles de monedas de todos los reinos del mundo, esparcidas por el túnel como hojas en otoño, como si alguien hubiera vaciado un río de oro.',
  'Brillan. Brillan de una forma que no es normal, como si te llamaran. Notas que tu mano se mueve sola hacia ellas.',
  'Regin te agarra del brazo. «No», dice, con la voz ronca. «Así empezó Fafnir. Con una moneda.» Pero él también las está mirando.'],
  c:[{x:'Llenarte la bolsa: nadie las echará de menos',to:'c2_codicia',k:'shop'},
     {x:'Apartar la mirada y seguir adelante',to:'c2_buscadores',k:'main',fx:{gl:5}}]},

c2_codicia:{t:[
  'Coges un puñado. Y otro. Y otro. Es como beber agua cuando tienes sed: cuanto más coges, más quieres. Cuando por fin paras, tienes la bolsa llena y las manos temblando.',
  'Regin te mira con miedo. Kraka no dice nada. En tu palma, la marca de Skuld está fría como el hielo, y por primera vez desde que la tienes, te duele.'],
  fx:{plata:120,fl:{maldito:1},gl:-15},
  c:[{x:'Seguir adelante',to:'c2_buscadores',k:'main'}]},

c2_buscadores:{h:'Los buscadores',t:[
  'Más adelante, la galería se ensancha. Hay herramientas tiradas, antorchas apagadas y restos de campamentos. Y hay enanos: cinco o seis, flacos como esqueletos, con las barbas sucias y los ojos brillantes de fiebre. Cada uno abraza un montón de monedas como si fuera un niño.',
  '«Mineros que bajaron hace años», susurra Regin. «Los dábamos por muertos.» Uno de ellos levanta la cabeza y os ve. «¡Ladrones!», chilla. «¡Vienen a por nuestro oro!» Coge un pico.'],
  c:[{x:'Defenderte',to:'c2_f_buscador',k:'hunt'},
     {x:'Intentar razonar con ellos',to:'c2_buscadores_paz',k:'social',chk:{s:'esp',dc:10,ok:'c2_buscadores_paz',ko:'c2_f_buscador'}}]},

c2_f_buscador:pelea('buscador','c2_derrumbe',null,'El buscador se lanza contra ti con el pico en alto, gritando «¡mío, mío, mío!», con la misma voz que oíste tras la reja.'),

c2_buscadores_paz:{t:[
  'Les hablas despacio, con las manos abiertas. No queréis su oro. Solo queréis pasar. Les hablas de Nidavellir, de sus familias, de la luz de las forjas. Uno a uno, bajan los picos.',
  'El más viejo se echa a llorar. «¿Cuántos años han pasado?», pregunta. Regin se lo dice. El viejo mira su montón de monedas como si lo viera por primera vez. Luego lo deja en el suelo y echa a andar hacia arriba, hacia la ciudad. Dos más lo siguen. Los otros se quedan, abrazados al oro.'],
  fx:{gl:20,saga:'Convenció a unos mineros enloquecidos por el oro de Fafnir para que volvieran a casa.'},
  c:[{x:'Seguir bajando',to:'c2_derrumbe',k:'main'}]},

c2_derrumbe:{h:'El derrumbe',t:[
  'La galería baja en espiral, cada vez más estrecha. De pronto, el techo cruje. Regin grita algo. El mundo se llena de polvo, de ruido y de piedras que caen.',
  'Cuando el polvo se asienta, estás a oscuras. Completamente a oscuras. Oyes toser a Regin a tu lado y a Kraka maldecir en tres idiomas. Las antorchas se han apagado. La salida está bloqueada por toneladas de roca.',
  '«Necesitamos fuego», jadea Regin. «Sin fuego no encontraremos la grieta por donde pasa el aire. Sin aire…» No termina la frase.'],
  fx:{t:2},
  c:[{x:'Frotar dos trozos de madera hasta sacar fuego',to:'c2_nauthiz',k:'main',chk:{s:'fue',dc:10,ok:'c2_nauthiz',ko:'c2_nauthiz_ko'}},
     {x:'Encender una llama con la runa Kenaz',to:'c2_nauthiz',k:'main',oc:1,req:{runa:'kenaz'}}]},

c2_nauthiz_ko:{t:[
  'Frotas y frotas hasta que te sangran las manos. Nada. El aire se vuelve espeso. Regin respira cada vez más despacio.',
  'Entonces, en la oscuridad, la marca de Skuld empieza a brillar. Muy débil, como una brasa. A su luz ves los trozos de madera, y entiendes que no estabas frotando con fuerza: estabas frotando con miedo. Respiras hondo. Lo intentas otra vez, despacio, sin prisa, como si tuvieras todo el tiempo del mundo. Y salta la chispa.'],
  fx:{hp:-20},
  c:[{x:'Avivar la llama',to:'c2_nauthiz',k:'main'}]},

c2_nauthiz:{h:'El fuego de la necesidad',t:[
  'La llama prende. Es pequeña, temblorosa, pero es fuego. Regin suelta un sollozo de alivio. Kraka esponja las plumas.',
  'Mientras la miras crecer, la llama se tuerce y forma una figura: dos trazos cruzados, como un palo atravesado por otro. Groa te habló de ella una vez: el fuego de necesidad, el que los antiguos encendían frotando madera cuando todo lo demás fallaba. La marca de tu mano la absorbe como una esponja. <b>Nauthiz</b>, la necesidad. La runa que se hace más fuerte cuanto peor van las cosas.',
  'A la luz del fuego, Regin encuentra la grieta. Detrás se oye agua.'],
  fx:{runa:'nauthiz',fl:{nauthiz:1},gl:10,saga:'Atrapado en la oscuridad bajo la montaña, encendió el fuego de la necesidad y aprendió la runa Nauthiz.'},
  c:[{x:'Abrirte paso por la grieta',to:'c2_lago',k:'main',fx:{t:1}}]},

/* ---------- Andvari ---------- */
c2_lago:{h:'El lago negro',t:[
  'La grieta da a una caverna con un lago de agua negra y quieta. El techo está cubierto de cristales que reflejan la luz de tu fuego como un cielo estrellado. Es lo más bonito que has visto bajo tierra, y lo más triste.',
  'En la orilla hay huellas enormes: garras, una cola que arrastra, escamas sueltas. Es el camino por el que Fafnir baja a beber. Todos los días. Siempre por el mismo sitio.',
  'Algo se mueve en el agua. Un pez. Un lucio enorme, plateado, con ojos de anciano, asoma la cabeza y te mira. «Huéspedes», dice. «Hacía mucho que no tenía huéspedes vivos.»'],
  c:[{x:'Hablar con el pez',to:'c2_andvari',k:'social'}]},

c2_andvari:{h:'Andvari',t:[
  '«Me llamo Andvari», dice el lucio. «Era un enano. Vivía en esta cueva con mi oro, transformado en pez para que nadie me encontrara. Hasta que un pelirrojo me pescó con una red y me lo robó todo. Todo. Hasta mi anillo, Andvaranaut, que atrae el oro como la miel a las moscas.»',
  '«Así que maldije el oro. Que todo el que lo posea lo pierda todo. Y la maldición funcionó, vaya si funcionó. Se lo dieron a Hreidmar. Fafnir mató… no, Fafnir se lo robó a su padre. Y luego se convirtió en eso.» Señala con la aleta hacia el fondo de la cueva, de donde llega una respiración lenta y pesada.',
  '«Fafnir lleva mi anillo en una garra», dice Andvari. «Si me lo devuelves, retiraré la maldición del oro. Del que se lleve cualquiera.» Te mira con sus ojos viejos. «Pero si te lo quedas, nadie podrá impedírtelo. Y el anillo es muy, muy bonito.»'],
  c:[{x:'«Te lo devolveré»',to:'c2_lago_plan',k:'main',fx:{fl:{promesa_andvari:1},gl:5}},
     {x:'«Ya veremos»',to:'c2_lago_plan',k:'n'}]},

c2_lago_plan:{t:[
  'Andvari se hunde en el agua negra sin decir nada más. Regin mira las huellas del dragón en la orilla y luego a ti. «El consejo de Thor», dice. «Un foso, en el camino al agua. Cuando pase por encima, la panza…»',
  'Al otro lado del lago, una galería lateral brilla con una luz que no es de oro. Es una luz blanca y cálida, como la del sol en primavera. Aquí abajo. Imposible.'],
  c:[{x:'Investigar la luz blanca',to:'c2_sala_sol',k:'main',oc:1,req:{no:'sowilo_visto'}},
     {x:'Cavar un foso en el camino de Fafnir',to:'c2_foso',k:'main',oc:1,req:{fl:'thor_consejo'}},
     {x:'Ir directamente a la guarida de Fafnir',to:'c2_guarida',k:'hunt'}]},

/* ---------- La piedra del sol: Sowilo ---------- */
c2_sala_sol:{h:'La piedra del sol',t:[
  'En la galería lateral, sobre un pedestal de roca, hay una piedra del tamaño de un puño, transparente como el hielo. De ella sale la luz blanca. Las paredes de la galería están llenas de dibujos de barcos, soles y estrellas.',
  'Regin la reconoce enseguida. «Una piedra solar», susurra. «Los navegantes las usan para encontrar el sol cuando hay niebla. Esta debe de ser la primera, la que los enanos tallaron para Odín. Fafnir la robó también.»',
  'Te acercas. La luz te calienta la cara como una mañana de verano en Vindvik, como antes del Gran Invierno. Por un momento, se te llenan los ojos de lágrimas.'],
  fx:{fl:{sowilo_visto:1}},
  c:[{x:'Coger la piedra con la mano marcada',to:'c2_sowilo',k:'main',chk:{s:'esp',dc:9,ok:'c2_sowilo',ko:'c2_sowilo_ko'}}]},

c2_sowilo:{t:[
  'La piedra arde en tu mano sin quemarte. La luz te entra por la palma, te sube por el brazo y te llena entero, como si te hubieras bebido el sol. Cuando se apaga, en tu palma hay una runa nueva, como un rayo de luz quebrado: <b>Sowilo</b>, el sol, la victoria, la salud.',
  'La piedra se ha quedado oscura, gastada, como un carbón frío. Pero en tus manos aún brilla un poco de su luz. «Los muertos y los dragones odian el sol», dice Regin. «Ahora llevas un trozo dentro.»'],
  fx:{runa:'sowilo',fl:{sowilo:1},gl:15,saga:'Tocó la primera piedra solar de los enanos y aprendió la runa Sowilo bajo la montaña.'},
  c:[{x:'Volver al lago',to:'c2_lago_plan',k:'main'}]},

c2_sowilo_ko:{t:[
  'La luz es demasiado fuerte. Te ciega, te quema los ojos, y sueltas la piedra con un grito. Rueda por el suelo y se apaga, gastada, como un carbón frío.',
  'Durante un rato no ves nada. Cuando por fin recuperas la vista, solo queda una piedra gris en el suelo. Te has quedado sin el sol.'],
  fx:{hp:-15},
  c:[{x:'Volver al lago',to:'c2_lago_plan',k:'main'}]},

/* ---------- Fafnir ---------- */
c2_foso:{h:'El foso',t:[
  'Regin y tú cavais en el camino del dragón, junto a la orilla, con las manos, con el pico de Regin y con la punta de tu arma. Es una zanja estrecha y honda, lo justo para que quepa una persona agachada. Kraka vigila desde una estalactita.',
  '«Rápido», susurra. «Lo oigo moverse. Viene a beber.»'],
  c:[{x:'Terminar el foso a tiempo y esconderte dentro',to:'c2_foso_ok',k:'main',chk:{s:'fue',dc:9,ok:'c2_foso_ok',ko:'c2_foso_ko'}}]},

c2_foso_ok:{h:'Desde abajo',t:[
  'Te metes en el foso justo cuando el suelo empieza a temblar. Regin se esconde tras una roca. Por encima de ti pasa una sombra inmensa que tapa la luz de los cristales: escamas, garras, una cola que no se acaba nunca. Huele a oro y a podrido.',
  'Y luego, justo encima, la panza. Blanca, blanda, palpitante, como la de un pez. Es ahora o nunca.'],
  c:[{x:'Clavar el arma hacia arriba con todas tus fuerzas',to:'c2_f_fafnir_herido',k:'hunt',fx:{saga:'Esperó a Fafnir en un foso, como aconsejó Thor, y lo hirió desde abajo, donde las escamas no protegen.'}}]},

c2_foso_ko:{t:[
  'El foso no está terminado cuando el suelo empieza a temblar. Fafnir llega antes de tiempo, enorme y oscuro, y se detiene en seco al verte con el pico en la mano, de pie en una zanja a medio cavar.',
  '«Vaya», dice el dragón, y su voz suena como monedas que caen. «Un ladrón con pala. Qué original.»'],
  c:[{x:'Salir del foso y enfrentarte a él',to:'c2_fafnir_habla',k:'main'}]},

c2_guarida:{h:'La guarida de Fafnir',t:[
  'Al fondo de la cueva, sobre una montaña de oro tan alta como el salón de Hakon, duerme un dragón. Es largo como un barco de guerra, de escamas rojizas y opacas, con un yelmo de oro fundido sobre la cabeza y un anillo de oro rojo en una garra. Andvaranaut.',
  'Abre un ojo. Luego el otro. «Huelo a enano», dice. «Huelo a mi hermano.»'],
  c:[{x:'Enfrentarte a él',to:'c2_fafnir_habla',k:'main'}]},

c2_fafnir_habla:{h:'Fafnir',cp:1,t:[
  'Fafnir se yergue sobre su tesoro. El oro resbala de sus escamas como el agua. «¿Quién eres tú», pregunta, «que vienes a robarme? Dime tu nombre, para que sepa a quién maldecir cuando me muera. O a quién comerme cuando no.»',
  'Regin te susurra al oído: «No le digas tu nombre. En las canciones antiguas, un héroe le ocultó el suyo a un dragón para que su maldición no lo encontrara».'],
  c:[{x:'«Soy {N} de Vindvik», con la cabeza alta',to:'c2_nombre_real',k:'main'},
     {x:'«Soy la bestia noble, sin padre ni madre, que camina sola»',to:'c2_nombre_oculto',k:'main',chk:{s:'ast',dc:9,ok:'c2_nombre_oculto',ko:'c2_nombre_real'}}]},

c2_nombre_real:{t:[
  '«{N}», repite Fafnir, saboreando cada letra. «{N} de Vindvik. Lo recordaré.» Sus ojos brillan. «Lo recordaré siempre.»'],
  c:[{x:'Dejar que Regin le hable a su hermano',to:'c2_regin_hermano',k:'social'},
     {x:'Alzar el arma',to:'c2_f_fafnir',k:'hunt'}]},

c2_nombre_oculto:{t:[
  'Fafnir entorna los ojos. «¿La bestia noble?», repite. «Mientes. O hablas como los escaldos, que es peor.» Pero no insiste. Ya no tiene tu nombre, y eso, aunque él no lo sepa, lo cambia todo.'],
  fx:{fl:{nombre_oculto:1},gl:5},
  c:[{x:'Dejar que Regin le hable a su hermano',to:'c2_regin_hermano',k:'social'},
     {x:'Alzar el arma',to:'c2_f_fafnir',k:'hunt'}]},

c2_regin_hermano:{h:'Hermanos',t:[
  'Regin sale de detrás de ti. Es tan pequeño delante del dragón que parece un niño. «Fafnir», dice. «Soy yo. Regin.»',
  'El dragón se queda inmóvil. «Regin», repite, como quien intenta recordar una palabra en otro idioma. «Regin era… pequeño. Lloraba cuando se quemaba en la forja.»',
  '«Sigo llorando», dice Regin, y es verdad. «Padre te perdona, Fafnir. Me ha pedido que te lo diga. Suelta el oro. Vuelve a casa.»',
  'Por un momento, el dragón duda. Las escamas tiemblan. En sus ojos amarillos hay algo pequeño, asustado y enano que lucha por salir. Luego el oro brilla, y el dragón ruge.'],
  c:[{x:'Aprovechar su duda y atacar',to:'c2_f_fafnir_hermano',k:'hunt',chk:{s:'esp',dc:8,ok:'c2_f_fafnir_hermano',ko:'c2_f_fafnir'},fx:{saga:'Regin habló a su hermano Fafnir antes de la batalla, y el dragón dudó.'}}]},

c2_f_fafnir:{t:['Fafnir se lanza sobre ti con las fauces abiertas. Su aliento huele a oro fundido y a mil años de codicia.'],f:{e:'fafnir',win:'c2_fafnir_muere',lose:'muerte'}},
c2_f_fafnir_herido:{t:['Tu arma se hunde en la panza del dragón hasta la empuñadura. Fafnir ruge de dolor y se revuelve, buscándote con las garras.'],f:{e:'fafnir_herido',win:'c2_fafnir_muere',lose:'muerte'}},
c2_f_fafnir_hermano:{t:['El dragón lucha, pero algo dentro de él lucha también. Sus garras dudan. Sus golpes llegan tarde.'],f:{e:'fafnir_hermano',win:'c2_fafnir_muere',lose:'muerte'}},

c2_fafnir_muere:{h:'La muerte de Fafnir',gen:'c2_fafnir_muere',t:[],
  fx:{fl:{fafnir_muerto:1},saga:'Mató a Fafnir, el dragón de la veta de oro, en lo más hondo de Nidavellir.'},
  c:[{x:'Probar la sangre del dragón',to:'c2_sangre',k:'n',oc:1,req:{no:'sangre_fafnir'}},
     {x:'Mirar el anillo de la garra de Fafnir',to:'c2_anillo',k:'main'}]},

c2_sangre:{h:'La sangre del dragón',t:[
  'Las canciones dicen que quien prueba la sangre de un dragón entiende el lenguaje de los pájaros. Te mojas un dedo en la sangre negra y te lo llevas a la boca. Sabe a hierro y a tormenta.',
  'Durante un instante no pasa nada. Luego Kraka, en tu hombro, abre el pico para decir algo, y oyes dos cosas a la vez: lo que dice en voz alta («qué asco, por todos los dioses, qué asco») y lo que piensa.',
  'Y lo que piensa es: «Ojalá no le pase nada. Ojalá no le pase nada nunca. Es lo mejor que me ha pasado en mil años y no se lo pienso decir jamás».',
  'El efecto dura solo un momento. Kraka te mira con desconfianza. «¿Por qué sonríes así?», pregunta. «Me das miedo cuando sonríes así.»'],
  fx:{fl:{sangre_fafnir:1},mhp:15,gl:5},
  c:[{x:'Mirar el anillo de la garra de Fafnir',to:'c2_anillo',k:'main'}]},

/* ---------- El anillo maldito ---------- */
c2_anillo:{h:'Andvaranaut',t:[
  'El anillo sigue en la garra del dragón muerto, rojo y brillante, como un ojo abierto. Regin lo está mirando. Lleva mirándolo un buen rato. Tiene las manos apretadas y la mandíbula tensa, igual que su hermano cuando miraba el oro.',
  '«Es de mi familia», dice en voz baja. «Padre lo pagó con la vida de Otr. Fafnir lo pagó con su vida. Es nuestro. Es mío.» Da un paso hacia la garra.',
  'Kraka se te pega al cuello. «Cuidado», susurra. «Así empezó Fafnir.»'],
  c:[{x:'Coger el anillo antes que Regin y devolvérselo a Andvari',to:'c2_anillo_andvari',k:'main',chk:{s:'esp',dc:9,ok:'c2_anillo_andvari',ko:'c2_anillo_regin'}},
     {x:'Recordarle a Regin lo que le pasó a su hermano',to:'c2_anillo_andvari',k:'social',oc:1,req:{fl:'hreidmar_charla'},chk:{s:'esp',dc:7,ok:'c2_anillo_andvari',ko:'c2_anillo_regin'}},
     {x:'Dejar que Regin se lo quede: es de su familia',to:'c2_anillo_regin',k:'n'},
     {x:'Quedártelo tú',to:'c2_anillo_tuyo',k:'shop'}]},

c2_anillo_andvari:{t:[
  'Coges el anillo antes de que Regin lo alcance. Te quema la mano como si fuera de fuego. Regin te mira con rabia durante un largo instante… y luego parpadea, como si despertara, y se echa a llorar.',
  'Vas hasta el lago y lo tiras al agua negra. Una boca enorme y plateada sale de la superficie y lo atrapa al vuelo. «Gracias», dice la voz de Andvari, mientras el lucio se hunde para siempre. «La maldición se ha roto. El oro ya no es de nadie.»',
  'Detrás de ti, el cuerpo del dragón se encoge. Las escamas caen como hojas secas, y lo que queda en el suelo, sobre las monedas, es un enano viejo de barba gris, con cara de paz. Regin se arrodilla a su lado y le cierra los ojos.'],
  fx:{fl:{andvari_libre:1},hilo:1,gl:30,saga:'Devolvió el anillo maldito a Andvari y rompió la maldición del oro. Fafnir volvió a ser enano al morir.'},
  c:[{x:'Recoger el oro para el tercer tesoro',to:'c2_oro',k:'main'}]},

c2_anillo_regin:{t:[
  'Regin coge el anillo y se lo pone. Le queda grande, pero no se lo quita. Lo mira con una expresión que te pone los pelos de punta, la misma que tenía Fafnir.',
  '«Es mío», dice. Luego sonríe y vuelve a ser Regin, o casi. «Vamos. Brok nos espera.»',
  'Kraka no dice nada durante todo el camino de vuelta. Tú tampoco. En algún lugar del lago negro, un pez viejo llora.'],
  fx:{fl:{regin_anillo:1}},
  c:[{x:'Recoger el oro para el tercer tesoro',to:'c2_oro',k:'main'}]},

c2_anillo_tuyo:{t:[
  'Coges el anillo. Es tibio y pesa más de lo que debería. Te lo pones, y en ese momento todo el oro de la cueva parece brillar un poco más. Para ti. Solo para ti.',
  'Regin te mira con una mezcla de rabia y alivio. Kraka no te mira en absoluto. En algún lugar del lago negro, un pez viejo llora.'],
  fx:{fl:{anillo_tuyo:1,maldito:1},item:'anillo_andvari',plata:200,gl:-20},
  c:[{x:'Recoger el oro para el tercer tesoro',to:'c2_oro',k:'main'}]},

c2_oro:{t:[
  'Cargáis tanto oro como podéis llevar. No es mucho comparado con la montaña que dejáis atrás, pero es suficiente para el tercer tesoro. Y para algo más, dice Regin.',
  'El camino de vuelta es largo. Cuando por fin cruzáis la reja de las siete cerraduras, toda Nidavellir os está esperando.'],
  fx:{item:'oro_veta',t:6},
  c:[{x:'Subir a la forja de Brok',to:'c2_vuelta',k:'main'}]},

/* ---------- El tercer tesoro ---------- */
c2_vuelta:{h:'El oro',cp:1,gen:'c2_vuelta',t:[],
  fx:{cumple:'fafnir'},
  c:[{x:'Ver forjar el tercer tesoro',to:'c2_tercer_tesoro',k:'main'}]},

c2_tercer_tesoro:{h:'El tercer tesoro',t:[
  'Brok y Eitri trabajan toda la noche. Esta vez no hay mosca. Tú manejas el fuelle; Regin acarrea carbón; Kraka canta canciones de marineros desafinando a propósito para que nadie se duerma.',
  'Al amanecer, el tercer tesoro sale del fuego. Es un mango. Un mango largo, de hierro negro con vetas de oro, tallado con runas de tormenta. Thor lo mira y se le humedecen los ojos.',
  '«Mi martillo siempre tuvo el mango corto», explica, con la voz ronca. «Por culpa de una mosca, hace mucho. Una mosca pelirroja.» Encaja el mango nuevo en Mjolnir. Encaja perfectamente. «Ahora sí», dice. «Ahora sí que estoy listo para el fin del mundo.»'],
  fx:{fl:{tercer_tesoro:1},quita:{oro_veta:1},gl:25,saga:'Ayudó a forjar el nuevo mango de Mjolnir con el oro de Fafnir.'},
  c:[{x:'Escuchar lo que te propone Brok',to:'c2_arma_final',k:'main'}]},

c2_arma_final:{h:'Tu arma',t:[
  'Brok se limpia las manos en el delantal. «Ha sobrado oro», gruñe. «Suficiente para un arma. La mejor que hayas tenido. La mejor que tendrás.» Te mira. «Elige. Y elige bien, porque no te haré otra.»'],
  c:[{x:'Un hacha: «Golpes que parten escudos»',to:'c2_grabado_final',k:'shop',fx:{item:'hacha_dorada',equipa:'hacha_dorada',fl:{arma_final:'hacha'}}},
     {x:'Una espada: «Ligera y certera»',to:'c2_grabado_final',k:'shop',fx:{item:'espada_dorada',equipa:'espada_dorada',fl:{arma_final:'espada'}}},
     {x:'Una lanza: «Rápida, y vuelve a la mano»',to:'c2_grabado_final',k:'shop',fx:{item:'lanza_dorada',equipa:'lanza_dorada',fl:{arma_final:'lanza'}}},
     {x:'Reforjar Muerdetumbas con el oro',to:'c2_grabado_final',k:'shop',oc:1,req:{item:'muerdetumbas'},fx:{quita:{muerdetumbas:1},item:'muerdetumbas_renacida',equipa:'muerdetumbas_renacida',fl:{arma_final:'muerdetumbas'}}}]},

c2_grabado_final:{h:'La runa de tu arma',t:[
  'Eitri coge tu nueva arma con la reverencia con la que se coge a un recién nacido. «Falta lo más importante», dice. «Su runa. Esta te la regalo yo.»',
  '<span class=tag>La runa que grabes ahora definirá cómo luchas en los capítulos que vienen. Puedes cambiarla más adelante en cualquier forja con grabado, pagando su precio.</span>'],
  fx:{fl:{grabado_gratis:1,grabado_usado:0}},
  grabado:1,back:'c2_lopt_final',backx:'Continuar'},

c2_lopt_final:{h:'La boca de Lopt',gen:'c2_lopt_final',t:[],
  fx:{fl:{lopt_derrotado:1},gl:15},
  c:[{x:'Salir a tomar el aire',to:'c2_fialar',k:'main'}]},

/* ---------- Fin del capítulo ---------- */
c2_fialar:{h:'El canto del gallo',t:[
  'Sales al Pozo del Alba, el único lugar de Nidavellir donde a veces llega la luz. Kraka se posa a tu lado. Durante un rato no decís nada.',
  'Entonces lo oyes. Un canto lejano, muy lejano, que baja por la chimenea de roca desde algún lugar del mundo: el canto de un gallo. Pero no es un gallo normal. Su voz es roja como la sangre y fría como el hielo, y hace temblar la piedra bajo tus pies.',
  '«Fialar», susurra Kraka. «El gallo rojo de Jotunheim. Es el primero de los tres. Cuando canten los tres…» No termina. No hace falta.',
  'Thor aparece a tu espalda. Por una vez, no se ríe. «Yo también lo he oído», dice. «Mañana parto hacia Jotunheim. Los gigantes se mueven, y alguien les está dando armas.» Te mira. «Mi carro tiene sitio para {un guerrero|una guerrera} más. Y para un cuervo chismoso, si promete callarse.»'],
  fx:{saga:'Escuchó en Nidavellir el canto de Fialar, el primer gallo del fin del mundo.'},
  c:[{x:'Aceptar el viaje con Thor',to:'c2_despedida',k:'main'}]},

c2_despedida:{h:'La despedida',gen:'c2_despedida',t:[],
  fx:{item:{savia_raiz:3,pan_enano:3}},
  c:[{x:'Subir al carro de Thor',to:'c2_fin',k:'main'}]},

c2_fin:{h:'Fin del Capítulo 2',t:[
  'El carro de Thor sale de Nidavellir entre truenos. Los machos cabríos corren por túneles que no conocías, cada vez más deprisa, hasta que la roca se abre de golpe y salís a un cielo blanco y helado.',
  'Abajo se extiende Jotunheim, la tierra de los gigantes: montañas como dientes rotos, ríos congelados y bosques negros bajo una nieve que no ha dejado de caer desde que empezó el Gran Invierno. El viento huele a hierro y a lobo.',
  'Kraka, agarrado a tu manto con todas sus garras, tiene los ojos cerrados. «Avísame cuando lleguemos», dice. «O cuando nos estrellemos. Lo que pase antes.»',
  '<span class=tag>Has completado el Capítulo 2: Bajo las Raíces. La senda continúa en el Capítulo 3: El Invierno sin Fin.</span>'],
  fx:{fl:{c2fin:1},saga:'Partió hacia Jotunheim en el carro de Thor.'},
  end:'Capítulo 2 completado',saga:1}

}});
})();
