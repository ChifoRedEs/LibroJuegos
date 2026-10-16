/* =====================================================================
   Capítulo 3 · El Invierno sin Fin
   Parte 3 · «El árbol del ahorcado»
   El Caminante (Odín), el campamento bajo la raíz de Yggdrasil, el pozo
   de Mímir (Othala, el precio de la sabiduría), la prueba de Odín:
   nueve noches colgado del Árbol (Tiwaz y Dagaz), el robo de Lopt,
   la liberación de Fenrir en la isla de Lyngvi, el pacto de Loki y el
   canto de Gullinkambi. Final del capítulo: c3_fin.
   Sustituye la escena provisional c3_p3 de la Parte 2.
   ===================================================================== */
(()=>{
const pelea=(e,win,flee,t)=>({t:[t],f:{e,win,lose:'muerte',flee}});

/* ---------- Datos nuevos ---------- */
Object.assign(OBJ,{
  hidromiel_poesia:{n:'Hidromiel de la poesía',tipo:'consumible',ef:{hp:120,fu:100},pr:300,d:'Un sorbo del hidromiel de Odín. Recupera 120 de Vida y llena el Furor.'},
  agua_mimir:{n:'Odre con agua del pozo de Mímir',tipo:'clave',d:'El agua de la memoria. Lopt la quería para que la cadena de Fenrir recordara que estaba hecha de nada.'}
});
Object.assign(ENEMIGOS,{
  hijo_skoll:{n:'Hijo de Skoll',cat:'Lobo del fin del mundo',hp:150,a:26,gl:30,o:0,l:{piel_lobo:1,colmillo:1}},
  sombra_loki:{n:'Sombra de Loki',cat:'Ilusión',hp:210,a:27,gl:50,o:0}
});
TIENDAS.nali.stock.push('carne_gigante','pocion_abedul','hidromiel_enana','piedra_othala');

registrarSenales({
  25:'Las raíces de Yggdrasil gimen toda la noche. El Caminante no duerme: escucha.',
  28:'Al amanecer no amanece. El cielo se queda gris, sin sol y sin luna, durante todo el día.'
},S=>S.fl.c3&&!S.fl.c4);

registrarMision(S=>{
  if(!S.fl.c3p2fin)return null;
  if(!S.fl.raiz)return 'Sigue al Caminante hacia el norte.';
  if(!S.fl.pozo_visto)return 'Visita el pozo de Mímir, bajo la raíz de Yggdrasil.';
  if(!S.fl.arbol_fin)return 'Cuando estés preparad{o|a}, supera la prueba de Odín: colgar nueve noches del Árbol del Mundo.';
  if(!S.fl.lyngvi)return 'Persigue a Lopt hasta la isla de Lyngvi, donde está encadenado Fenrir.';
  if(!S.fl.pacto_fin)return 'Enfréntate a Lopt.';
  if(!S.fl.c3fin)return 'Escucha el canto del gallo de Asgard.';
  return S.fl.c4?null:'Capítulo 3 completado. La senda continúa en Asgard.';
});

/* ---------- Textos variables: las visiones del árbol ---------- */
GEN.c3_vision1=()=>({t:[
  'La primera noche colgad{o|a} del Árbol, el hambre llega antes que el frío, y el frío antes que las visiones. Cuando por fin llegan, estás en Vindvik.',
  S.fl.siri_aprendiz
    ?'Ves a Siri en la cabaña de Groa, inclinada sobre un caldero, trazando runas en el aire con un dedo manchado de hollín. Ha crecido. Groa, ciega, la corrige sin mirarla. Siri levanta la vista de golpe, como si te hubiera oído, y dice tu nombre.'
    :'Ves a Siri en la puerta de tu casa, mirando hacia el Bosque Gris, como cada tarde desde que te fuiste. Lleva el pelo trenzado como su madre. No llora. Ha decidido que no va a llorar.',
  S.fl.salon_noche?'Ves el salón del jarl reconstruido, con vigas nuevas que todavía huelen a resina. Eyvind canta tu saga a los niños. Exagera muchísimo.':'Ves el fiordo, la nieve, los barcos varados. El hogar.',
  'Te despiertas colgad{o|a} del Árbol, con el viento en la cara. Te quedan ocho noches.']});

GEN.c3_vision2=()=>({t:[
  'A la cuarta noche ya no sientes las manos. Las visiones vienen ahora de más abajo, de donde viven los muertos.',
  S.fl.einar_paz?'Ves a Einar, tu hermano, sentado en una barca en un mar tranquilo. Tiene los ojos de antes, los de cuando robabais manzanas. Te saluda con la mano. No dice nada. No hace falta.'
    :(S.fl.einar_cae?'Ves a Einar, tu hermano, de pie en el fondo del mar, con algas en el pelo. Te mira. No sabes si te perdona. No sabes si te perdonarías tú.':'Ves el mar, y en el fondo del mar, a los ahogados de la gran tormenta. Uno de ellos tiene tu nariz.'),
  S.fl.rolf_paz?'Ves al rey Rolf en su barco enterrado, con la copa en las manos, dormido por fin.':'Ves al rey Rolf en su trono, con los ojos todavía encendidos. Todavía furioso.',
  S.fl.andvari_libre?'Ves a Fafnir, enano otra vez, sentado junto a un fuego con su padre y sus hermanos. Regin le está contando algo y Fafnir se ríe.':'Ves a Fafnir, dragón todavía, enroscado alrededor de un oro que ya no existe.',
  'Y entre todos ellos, de pie, ves a un hombre manco con un manto azul. Tyr. Te mira y se lleva el muñón al pecho, como un saludo.']});

GEN.c3_vision3=()=>({t:[
  'La séptima noche, el mundo desaparece. Ya no hay frío, ni hambre, ni dolor. Solo hilos. Miles, millones de hilos de todos los colores, que suben desde las raíces del Árbol hasta perderse en lo alto. Cada hilo es una vida.',
  'En el centro, sentada al pie del tronco, hay una mujer con un huso. Es Skuld. Pero no lleva cota de malla. Lleva un vestido gris, y a su lado hay otras dos mujeres: una vieja que enrolla hilos ya tejidos y otra joven que los hila. Las tres Nornas. Lo que fue, lo que es, lo que ha de ser.',
  'Skuld levanta la vista y te ve. Por primera vez desde que la conoces, parece sorprendida. Luego sonríe, y sigue tejiendo. Tu hilo pasa entre sus dedos. Es más largo de lo que creías.',
  'Y entonces, en el borde de la visión, ves algo más: una figura delgada, de pelo rojo, agachada junto al pozo de Mímir, llenando un odre de agua mientras todo el mundo mira hacia el Árbol.']});

GEN.c3_raiz=()=>({t:[
  'El campamento del Caminante está al pie de una raíz de Yggdrasil que sale de la tierra como una montaña dormida. Junto a la raíz hay un pozo de piedra antigua, cubierto de musgo, del que sube un vapor blanco: el pozo de Mímir. Un poco más allá, en una explanada nevada, se alza el tronco del Árbol, tan alto que su copa se pierde entre las nubes.',
  S.fl.arbol_fin?'De una rama baja todavía cuelga la cuerda de la que estuviste nueve noches. El viento la mece.':'De una rama baja cuelga una cuerda. Nadie la ha tocado. Te espera.',
  'Junto a la hoguera, el Caminante fuma una pipa larga y mira el fuego con su único ojo. Sus dos cuervos dormitan en sus hombros. Kraka finge no mirarlos.']});

GEN.c3_hugin=()=>({t:[
  'Hugin baja del hombro del Caminante y se posa en la nieve, delante de Kraka. Es el doble de grande y brilla como el aceite. Kraka se encoge, pero no se aparta.',
  '«Has aprendido», dice Hugin. «Te mandé con {este mortal|esta mortal} como castigo, y ha resultado no serlo. Odín te ofrece volver a su servicio. Volver a los hombros del Padre de Todos. A saberlo todo, a verlo todo.»',
  S.fl.kraka_perdona||!S.fl.kraka_ofendido
    ?'Kraka te mira. Te mira durante mucho rato. Luego mira a Hugin. «No», dice. Solo eso. Hugin parpadea. «No», repite Kraka, más alto. «Ya tengo a alguien a quien vigilar. Y {este|esta} se mete en muchos más líos que Odín.»'
    :'Kraka te mira. Te mira durante mucho rato, y tú recuerdas la ardilla, el chisme de la cabra, las dos horas que no te habló. Luego Kraka mira a Hugin. «No», dice. «Me enfadé mucho con {este|esta}. Mucho. Pero no la voy a dejar sola ahora.» Se corrige: «Sol{o|a}. Lo que sea.»']});

registrarCapitulo({capitulo:3,parte:3,titulo:'El árbol del ahorcado',escenas:{

/* ---------- El Caminante ---------- */
c3_p3:{h:'El Caminante',cp:1,t:[
  'Caminas detrás del anciano durante dos días por una llanura blanca y vacía. No habla mucho. Cuando lo hace, es para preguntarte cosas raras: cómo se llama el viento en Vindvik, qué soñabas de niñ{o|a}, qué le dirías a tu padre si volvieras a verlo.',
  'Kraka no se separa de tu cuello y no dice ni una palabra en todo el camino, cosa que no había pasado nunca. Al segundo día te lo susurra, muy bajito: «Tú sabes quién es, ¿verdad?».',
  'Lo sabes. Por el ojo que falta, por los dos cuervos, por la lanza en la que se apoya. Pero el anciano no lo ha dicho, y en las historias de los escaldos, cuando Odín camina disfrazado, nunca es buena idea decir su nombre antes que él.'],
  fx:{t:48},
  c:[{x:'Seguir caminando en silencio',to:'c3_odin',k:'main',fx:{gl:5}},
     {x:'«Sé quién eres»',to:'c3_odin',k:'n',fx:{fl:{odin_nombrado:1}}}]},

c3_odin:{h:'El Padre de Todos',t:[
  'Al tercer día llegáis a una raíz de Yggdrasil que sale de la tierra como una montaña. El anciano se detiene y se quita el sombrero.',
  '«Tengo muchos nombres», dice. «El Caminante, el Encapuchado, el Tuerto, el Padre de Todos, el Señor de la Horca. Los de tu pueblo me llaman Odín.» Te mira con su único ojo, y es como mirar el fondo de un pozo. «Y tú eres la apuesta de Skuld. Yo también tengo mis apuestas, {N} de Vindvik. Por eso estás aquí.»',
  '«Sé cómo acaba todo», añade, y por un instante parece muy cansado. «Lo vi hace mucho, en este mismo pozo. Sé quién me matará y cuándo. Lo que no sé es lo que vas a hacer tú. Eso no lo sabe nadie.» Se vuelve hacia el pozo. «Por eso me interesas.»'],
  fx:{fl:{raiz:1},saga:'Caminó tres días junto a Odín, el Padre de Todos, disfrazado de caminante.'},
  c:[{x:'Ir al campamento bajo la raíz',to:'c3_raiz',k:'main'}]},

/* ---------- El campamento bajo la raíz: centro de la Parte 3 ---------- */
c3_raiz:{h:'Bajo la raíz',cp:1,mision:1,sort:1,gen:'c3_raiz',t:[],
  c:[{x:'El pozo de Mímir',to:'c3_pozo',k:'main',oc:1,req:{no:'pozo_fin'}},
     {x:'El árbol: la prueba de Odín',to:'c3_arbol',k:'main',oc:1,req:{fl:'pozo_visto',no:'arbol_fin'}},
     {x:'Hablar con el Caminante junto al fuego',to:'c3_odin_charla',k:'social',oc:1,req:{no:'odin_charla'}},
     {x:'Pedirle al Caminante que fortalezca tus runas',to:'c3_taller_odin',k:'shop'},
     {x:'Hugin y Kraka',to:'c3_hugin',k:'social',oc:1,req:{no:'kraka_elige'}},
     {x:'El carro de Nali',to:'c3_nali',k:'shop',oc:1,req:{fl:'nali3'}},
     {x:'Un carro tirado por una cabra se acerca por la llanura',to:'c3_nali_llega',k:'shop',oc:1,req:{no:'nali3'}},
     {x:'Cazar en el bosque de la raíz',to:'c3_f_lobo',k:'hunt'},
     {x:'Recoger savia de la raíz · 1 h',to:'c3_raiz',k:'side',fx:{item:{savia_raiz:1},t:1}},
     {x:'Dormir junto al fuego del Caminante',to:'c3_raiz',k:'side',fx:{t:8,dormir:1}}]},

c3_f_lobo:pelea('hijo_skoll','c3_raiz','c3_raiz','Un lobo enorme, de pelo negro con reflejos rojos como el atardecer, sale de entre los árboles. Es uno de los hijos de Skoll, el lobo que persigue al sol.'),

c3_odin_charla:{t:[
  '«¿Por qué yo?», le preguntas al fin. Es la misma pregunta que le hiciste a Skuld en tu lecho de muerte. Odín sonríe con media boca.',
  '«Porque estabas a punto de morir de la forma más vulgar posible», dice. «Y alguien que va a morir así no tiene nada que perder. Esos son los más peligrosos.» Echa una bocanada de humo. «Y porque tu hilo pasa cerca del mío. Muy cerca. En Vigrid, el día del fin, estarás a mi lado o en mi contra. Aún no lo sé.»',
  '«Skuld tampoco lo sabe», añade, y te mira de reojo. «Aunque ella diga que sí.»'],
  fx:{fl:{odin_charla:1}},
  back:'c3_raiz'},

c3_taller_odin:{h:'El maestro de las runas',t:[
  'Odín coge tu mano marcada y repasa las runas una por una con su dedo nudoso. Al pasar por cada una, la runa arde un instante. «Yo las arranqué del fondo del mundo», dice. «Sé dónde aprietan.»'],
  taller:1,back:'c3_raiz'},

c3_hugin:{h:'Hugin y Kraka',gen:'c3_hugin',t:[],
  c:[{x:'Decirle a Kraka que es libre de irse',to:'c3_kraka_elige',k:'social'},
     {x:'No decir nada y esperar',to:'c3_kraka_elige',k:'n'}]},

c3_kraka_elige:{t:[
  'Hugin se queda mirando a Kraka un rato largo. Luego asiente, despacio, como un juez que acepta un veredicto inesperado. «Que así sea», dice, y vuelve al hombro de Odín.',
  'Kraka sube a tu hombro y se acurruca contra tu cuello. Le tiembla el pico. «Como se lo cuentes a alguien», susurra, «le cuento a Ratatosk lo de la seta dorada. Y lo de que me llamaste abuela catorce veces.»'],
  fx:{fl:{kraka_elige:1},gl:10,saga:'Su compañero Kraka rechazó volver al servicio de Odín para quedarse a su lado.'},
  back:'c3_raiz'},

c3_nali_llega:{h:'Un viejo conocido',t:[
  'Por la llanura blanca se acerca un carro tirado por una cabra con cara de pocos amigos. Lo conduce un enano viejo, ancho como un tonel, con la barba metida en el cinturón. Nali. Y Gruñona.',
  '«¡Clientes de arriba!», exclama al verte. «¡Mis favoritos!» Detiene el carro junto a la hoguera. «Donde hay fin del mundo, hay negocio. He traído de todo: carne de gigante, hidromiel, y hasta una piedra rúnica que encontré en un sitio que no te voy a decir.» Ve a Odín y se pone pálido. «Ah. Buenas. Señor. No le cobraré a usted, por supuesto.»'],
  fx:{fl:{nali3:1}},
  c:[{x:'Ver lo que vende',to:'c3_nali',k:'shop'}]},

c3_nali:{h:'El carro de Nali',t:['Gruñona, la cabra, te mira con el mismo desprecio de siempre. Te ha echado de menos, aunque no lo demuestre.'],
  shop:'nali',
  c:[{x:'Pedirle a Nali que grabe una runa en tu arma',to:'c3_grabado_nali',k:'shop'}],
  back:'c3_raiz'},
c3_grabado_nali:{h:'El grabado de Nali',t:['«No soy Eitri», advierte Nali, sacando un yunque portátil del carro. «Pero tampoco cobro como él.»'],grabado:1,back:'c3_nali'},

/* ---------- El pozo de Mímir: Othala ---------- */
c3_pozo:{h:'El pozo de Mímir',t:[
  'Te asomas al pozo. El agua es oscura y quieta, y en el fondo hay algo que brilla. Una cabeza. La cabeza de un hombre viejo, de barba blanca, con los ojos cerrados, flotando en el agua como si durmiera. Mímir, el más sabio de los Aesir, al que los Vanir cortaron la cabeza hace mucho. Odín la conservó con hierbas y runas, y desde entonces le pide consejo.',
  'La cabeza abre los ojos. «Otro que viene a beber», dice, con una voz que sube del agua como burbujas. «Todos vienen a beber. Nadie quiere pagar.»',
  'Odín, a tu lado, señala la cuenca vacía de su ojo. «Yo pagué esto», dice. «Un trago, un ojo. La sabiduría no se regala.»'],
  fx:{fl:{pozo_visto:1}},
  c:[{x:'Pagar con un ojo, como Odín',to:'c3_pozo_ojo',k:'main'},
     {x:'Pagar con tus recuerdos de Vindvik',to:'c3_pozo_recuerdos',k:'main'},
     {x:'No pagar: «La sabiduría que tengo me basta»',to:'c3_pozo_no',k:'n'}]},

c3_pozo_ojo:{h:'El precio',t:[
  'Odín te mira largo rato. Luego asiente, saca un cuchillo pequeño y curvo y te lo da. No te explica cómo hacerlo. No hace falta.',
  'El dolor es blanco y absoluto, y luego no es nada. Cuando abres el único ojo que te queda, Mímir te sonríe desde el agua. Bebes. El agua sabe a hierro y a eternidad, y de pronto entiendes cosas: cómo está hecha la cadena de Fenrir, de qué tiene miedo Lopt, por qué Skuld te eligió a ti. Lo entiendes todo durante un instante. Luego se te escapa, como un sueño al despertar, y solo te queda una runa en la palma: <b>Othala</b>, la herencia, lo que se recibe de los que vinieron antes.',
  'Kraka te mira el ojo vacío y no dice nada. Luego, con mucho cuidado, te limpia la sangre de la mejilla con el pico.'],
  fx:{fl:{pozo_fin:1,tuerto:1},runa:'othala',hilo:2,st:{esp:1,ast:-1},gl:40,saga:'Entregó un ojo en el pozo de Mímir, como Odín, a cambio de un trago de sabiduría.'},
  c:[{x:'Volver al campamento',to:'c3_raiz',k:'main'}]},

c3_pozo_recuerdos:{h:'El precio',t:[
  '«Los recuerdos», dice Mímir, y le brillan los ojos. «Eso sí que es un precio interesante.»',
  'Bebes. El agua sabe a hierro y a eternidad. Y mientras bebes, algo se va. El olor del pan de cebada de Siri. El ruido del viento en la puerta de tu casa. La cara de tu madre. No se va todo: sabes que existieron, como se sabe que existió un sueño. Pero ya no los ves.',
  'A cambio, por un instante, lo entiendes todo: cómo está hecha la cadena de Fenrir, por qué Skuld te eligió. Luego se te escapa, y solo te queda una runa en la palma: <b>Othala</b>, la herencia. Te parece una ironía terrible. Kraka no se separa de ti en toda la noche.'],
  fx:{fl:{pozo_fin:1,sin_recuerdos:1},runa:'othala',hilo:1,gl:25,saga:'Entregó sus recuerdos de Vindvik en el pozo de Mímir a cambio de un trago de sabiduría.'},
  c:[{x:'Volver al campamento',to:'c3_raiz',k:'main'}]},

c3_pozo_no:{t:[
  'Mímir cierra los ojos, decepcionado. «Prudente», murmura. «Los prudentes viven más. No sé si mejor.»',
  'Odín no dice nada, pero te pone una mano en el hombro. «A veces», dice al fin, «saber demasiado es peor que no saber. Pregúntamelo a mí.»',
  '<span class=tag>Puedes volver al pozo más adelante.</span>'],
  c:[{x:'Volver al campamento',to:'c3_raiz',k:'main'}]},

/* ---------- La prueba de Odín: nueve noches en el Árbol ---------- */
c3_arbol:{h:'El árbol del ahorcado',cp:1,t:[
  'Odín te lleva hasta el pie del Árbol. De una rama baja cuelga una cuerda gruesa, con un lazo en el extremo. No es un lazo para el cuello: es para atarte por un tobillo, cabeza abajo.',
  '«Hace mucho», dice Odín, «me colgué de este árbol nueve noches, atravesado por mi propia lanza, sin comida ni agua, para arrancarle sus secretos al abismo. Así nacieron las runas.» Te mira. «A ti no te atravesaré. Pero las nueve noches no te las puedo ahorrar. Los que piden que los bajen antes, bajan con las manos vacías.»',
  'Kraka se agarra a tu manto. «No hagas esto», susurra. Luego: «Bueno, hazlo. Pero no hagas esto».'],
  c:[{x:'Dejar que Odín te cuelgue del Árbol',to:'c3_noche1',k:'main'},
     {x:'Todavía no: volver al campamento',to:'c3_raiz'}]},

c3_noche1:{h:'Las tres primeras noches',gen:'c3_vision1',t:[],
  fx:{t:72,fu:-100},
  c:[{x:'Aguantar',to:'c3_noche1_ok',k:'main',chk:{s:'esp',dc:10,ok:'c3_noche1_ok',ko:'c3_noche1_ko'}},
     {x:'Pedir que te bajen',to:'c3_bajar',k:'n'}]},

c3_noche1_ok:{t:['Aguantas. El hambre se convierte en un zumbido lejano y el frío, en un vecino molesto. Respiras despacio, como te enseñó Groa en el fiordo helado. Tres noches. Faltan seis.'],
  fx:{hp:-30,gl:10},
  c:[{x:'Seguir colgad{o|a}',to:'c3_noche2',k:'main'}]},
c3_noche1_ko:{t:['El hambre te muerde por dentro como un lobo. Gritas hasta quedarte sin voz. Nadie viene. Al final, el grito se apaga solo. Tres noches. Faltan seis. No sabes cómo.'],
  fx:{hp:-50},
  c:[{x:'Seguir colgad{o|a}',to:'c3_noche2',k:'main'},
     {x:'Pedir que te bajen',to:'c3_bajar',k:'n'}]},

c3_noche2:{h:'Noches cuarta, quinta y sexta',gen:'c3_vision2',t:[],
  fx:{t:72},
  c:[{x:'Aguantar',to:'c3_noche2_ok',k:'main',chk:{s:'esp',dc:11,ok:'c3_noche2_ok',ko:'c3_noche2_ko'}},
     {x:'Pedir que te bajen',to:'c3_bajar',k:'n'}]},

c3_noche2_ok:{t:[
  'Tyr se acerca en la visión. Se arrodilla junto a ti, colgad{o|a} como estás, y apoya su única mano sobre tu pecho. «La justicia cuesta», dice. «Siempre. Yo pagué con una mano. Tú pagarás con otra cosa.» Donde te ha tocado arde una runa como una lanza que apunta al cielo: <b>Tiwaz</b>, la runa de Tyr.',
  'Seis noches. Faltan tres.'],
  fx:{hp:-30,runa:'tiwaz',gl:15},
  c:[{x:'Seguir colgad{o|a}',to:'c3_noche3',k:'main'}]},
c3_noche2_ko:{t:[
  'Los muertos te llaman. Quieren que bajes con ellos, que descanses, que dejes de luchar. Es tan fácil… Casi sueltas el hilo. Casi.',
  'Una mano te sujeta. Es Tyr, el manco. «Todavía no», dice. Te toca el pecho y arde una runa como una lanza que apunta al cielo: <b>Tiwaz</b>. Seis noches. Faltan tres.'],
  fx:{hp:-50,runa:'tiwaz'},
  c:[{x:'Seguir colgad{o|a}',to:'c3_noche3',k:'main'},
     {x:'Pedir que te bajen',to:'c3_bajar',k:'n'}]},

c3_noche3:{h:'Las tres últimas noches',gen:'c3_vision3',t:[],
  fx:{t:72},
  c:[{x:'Aguantar hasta el final',to:'c3_noche3_ok',k:'main',chk:{s:'esp',dc:12,ok:'c3_noche3_ok',ko:'c3_noche3_ko'}},
     {x:'Gritar para avisar del ladrón del pozo',to:'c3_noche3_ko',k:'n'}]},

c3_noche3_ok:{h:'El amanecer',t:[
  'Aguantas. Aguantas la séptima noche, y la octava, y la novena. Al final de la novena, cuando ya no sabes si estás vivo o muerto, el cielo gris se rasga por el este y por la grieta entra una luz.',
  'No es el sol. Es otra cosa: la luz que hay antes del sol, la que anuncia que algo va a empezar. Te entra por los ojos y por la boca y por la marca de la mano, y cuando sale, deja dentro una runa como dos triángulos que se tocan por la punta: <b>Dagaz</b>, el amanecer, el día nuevo, la runa del final y del principio.',
  'Sientes que te bajan del Árbol. Unos brazos viejos y fuertes te sujetan. Odín.'],
  fx:{hp:-20,runa:'dagaz',fl:{arbol_completo:1},favor:'odin',gl:60,saga:'Colgó nueve noches del Árbol del Mundo, como Odín, y bajó con las runas del amanecer.'},
  c:[{x:'Abrir los ojos',to:'c3_descenso',k:'main'}]},

c3_noche3_ko:{t:[
  'Gritas. Gritas que hay alguien en el pozo, que hay un ladrón, que es Lopt. Pero tu voz sale rota, sin fuerza, y el viento se la lleva. Abajo, nadie te oye.',
  'Al final de la novena noche, cuando ya no te quedan fuerzas ni para gritar, una luz rasga el cielo gris. Te entra por los ojos y deja dentro una runa como dos triángulos que se tocan: <b>Dagaz</b>, el amanecer. Unos brazos viejos te bajan del Árbol.'],
  fx:{hp:-40,runa:'dagaz',fl:{arbol_completo:1},favor:'odin',gl:40,saga:'Colgó nueve noches del Árbol del Mundo, como Odín, y bajó con las runas del amanecer.'},
  c:[{x:'Abrir los ojos',to:'c3_descenso',k:'main'}]},

c3_bajar:{h:'La cuerda',t:[
  'Pides que te bajen. Odín lo hace sin decir nada, sin reproche y sin consuelo. Te deja en la nieve, junto al fuego, y se aleja hacia el pozo.',
  'Kraka te cubre con su ala, como si pudiera abrigarte. «Nadie te lo va a echar en cara», dice. «Nadie. Ni siquiera yo. Bueno, yo un poco. Pero solo un poco.»'],
  fx:{fl:{arbol_bajado:1},gl:-10},
  c:[{x:'Recuperarte junto al fuego',to:'c3_descenso',k:'main',fx:{t:24}}]},

c3_descenso:{h:'El pozo profanado',cp:1,t:[
  'Cuando por fin puedes mantenerte en pie, Odín te espera junto al pozo de Mímir. No te felicita. Está mirando el agua.',
  'Hay huellas en la nieve alrededor del pozo. Pasos ligeros, de alguien que no pesa casi nada. Y en el borde de piedra, una mancha de algo pegajoso y dulce que huele a manzana asada.',
  '«Lopt», dice Odín. Es la primera vez que lo oyes enfadado. «Mientras todos mirábamos al Árbol, ha venido a llevarse agua del pozo. El agua de la memoria.» Mímir, desde el fondo, abre los ojos. «La cadena de Fenrir», dice la cabeza, «está hecha de cosas que no existen: el ruido de los pasos de un gato, la barba de una mujer, las raíces de una montaña. Si esa cadena recuerda de qué está hecha… se deshará.»'],
  fx:{fl:{arbol_fin:1},hp:60},
  c:[{x:'«Iré tras él»',to:'c3_sleipnir',k:'main'}]},

/* ---------- Lyngvi y Fenrir ---------- */
c3_sleipnir:{h:'Sleipnir',t:[
  'Odín silba. Del bosque sale un caballo gris, enorme, con ocho patas que se mueven como una tormenta. Sleipnir, el corcel del Padre de Todos, el más rápido de los nueve mundos.',
  '«Yo no puedo ir», dice Odín. «Está escrito que el lobo me matará. Si voy ahora, puede que sea hoy.» Te da las riendas. «Sleipnir te llevará a la isla de Lyngvi, en el lago negro, donde el lobo está atado. Corre.»',
  'Montas. Kraka se agarra a tu capucha. Sleipnir arranca y el mundo se convierte en una mancha blanca.'],
  fx:{t:6,item:{hidromiel_poesia:1}},
  c:[{x:'Galopar hacia Lyngvi',to:'c3_lyngvi',k:'main'}]},

c3_lyngvi:{h:'La isla de Lyngvi',t:[
  'La isla de Lyngvi es una roca negra en medio de un lago helado. En el centro hay una piedra enorme clavada en el suelo, y atado a ella con una cinta fina y brillante, suave como la seda, está el lobo.',
  'Fenrir es gigantesco. Más grande que Hrungnir, más grande que el Oso de Escarcha y Fafnir juntos. Tiene una espada clavada entre las mandíbulas, de punta contra el paladar, para que no pueda cerrar la boca, y la saliva le cae a chorros formando un río. Respira despacio. Te mira.',
  'Junto a la cinta, agachado, hay un hombre de pelo rojo con un odre en la mano. Está vertiendo agua sobre la cinta, gota a gota. Y la cinta, donde la toca el agua, empieza a desvanecerse.'],
  fx:{fl:{lyngvi:1}},
  c:[{x:'Abalanzarte sobre Lopt para quitarle el odre',to:'c3_odre_ok',k:'main',chk:{s:'ast',dc:11,ok:'c3_odre_ok',ko:'c3_odre_ko'}},
     {x:'Sabías que vendría: lo esperabas, y saltas antes de que te vea',to:'c3_odre_ok',k:'main',oc:1,req:{fl:'plan'},chk:{s:'ast',dc:8,ok:'c3_odre_ok',ko:'c3_odre_ko'}},
     {x:'Congelar el agua con la runa Isa',to:'c3_odre_ok',k:'main',oc:1,req:{runa:'isa'},chk:{s:'esp',dc:9,ok:'c3_odre_ok',ko:'c3_odre_ko'}}]},

c3_odre_ok:{t:[
  'Le quitas el odre de un manotazo. El agua cae sobre la roca y se evapora con un siseo. Lopt te mira con sorpresa, y luego con una especie de admiración.',
  'Pero es tarde. La cinta, Gleipnir, ya está medio deshecha, y Fenrir lo sabe. Tensa el cuello. Tensa las patas. La cinta resiste un instante, se estira, y se rompe con un ruido como de un arpa que se parte.',
  'Fenrir se levanta. Le cuesta: lleva atado más tiempo del que nadie recuerda, y la parte de la cadena que no se ha deshecho le ha dejado marcas profundas en las patas. Pero se levanta.'],
  fx:{fl:{fenrir_herido:1},item:'agua_mimir',gl:30,saga:'Le arrebató a Lopt el agua del pozo de Mímir. Fenrir se liberó, pero herido.'},
  c:[{x:'Enfrentarte al lobo',to:'c3_fenrir',k:'main'}]},

c3_odre_ko:{t:[
  'Saltas, pero Lopt es más rápido. Se aparta con una risa, como si bailara, y vacía el odre entero sobre la cinta. Gleipnir se desvanece como la niebla.',
  'Fenrir se levanta despacio, estira las patas, sacude la cabeza y escupe la espada que tenía clavada en la boca, que cae al lago y se hunde. Luego aúlla. Es un aullido que hace temblar las montañas, y muy lejos, en todos los rincones de los nueve mundos, todos los perros se esconden.'],
  fx:{fl:{fenrir_libre_entero:1}},
  c:[{x:'Enfrentarte al lobo',to:'c3_fenrir',k:'main'}]},

c3_fenrir:{h:'Fenrir',cp:1,t:[
  'Fenrir baja la cabeza hasta que su hocico queda a la altura de tu cara. Su aliento es caliente y huele a hierro. Sus ojos amarillos te miran sin odio, con una curiosidad terrible.',
  '«Un mortal», dice. Su voz no es una voz: es un gruñido que entiendes sin saber cómo. «Con la marca de una Norna. Huele a… cuervo. Y a enano. Y a hielo.» Olfatea otra vez, despacio. Lopt, a un lado, observa con los brazos cruzados y una sonrisa encantada.'],
  c:[{x:'Enseñarle el colmillo que te dio su madre, Angrboda',to:'c3_fenrir_madre',k:'main',oc:1,req:{item:'colmillo_hierro'}},
     {x:'Sostenerle la mirada sin moverte',to:'c3_fenrir_mira',k:'main',chk:{s:'esp',dc:12,ok:'c3_fenrir_mira',ko:'c3_fenrir_ataca'}},
     {x:'Echar a correr',to:'c3_fenrir_huida',k:'n',chk:{s:'ast',dc:10,ok:'c3_fenrir_huida',ko:'c3_fenrir_ataca'}}]},

c3_fenrir_madre:{h:'El hijo de Angrboda',t:[
  'Sacas el colmillo negro del Bosque de Hierro. Fenrir lo huele. Se queda muy quieto. Luego, increíblemente, baja las orejas, como un perro joven.',
  '«Madre», dice. Solo eso. Durante un instante enorme, el lobo que se tragará a Odín parece solo un cachorro que lleva siglos sin ver a su madre. «¿Está bien? ¿Todavía vende cosas en el mercado? ¿Todavía tiene esa manta negra?»',
  '«Dile que estoy libre», añade, y se le endurece la voz. «Dile que voy a correr. Que voy a correr tanto que nadie podrá volver a atarme. Y que, cuando llegue el día, buscaré al tuerto. Solo al tuerto.» Te mira. «A ti no. Tú le llevas sus cosas a mi madre.»'],
  fx:{fl:{fenrir_amigo:1},gl:30,saga:'Enseñó a Fenrir el colmillo de su madre, Angrboda, y el lobo le perdonó la vida.'},
  c:[{x:'Ver cómo se aleja',to:'c3_fenrir_marcha',k:'main'}]},

c3_fenrir_mira:{t:[
  'No te mueves. Fenrir te mira de cerca, tan de cerca que podrías tocarle los colmillos. Tienes miedo, un miedo que no habías sentido nunca, ni ante Fafnir ni ante Hrungnir. Pero no te mueves.',
  'Al final, el lobo aparta la cara. «Valiente», gruñe. «Como el manco. Él también me miró así cuando puso la mano en mi boca.» Se aparta. «Te recordaré, mortal. En Vigrid, si nos vemos, te mataré deprisa. Es lo más que puedo prometerte.»'],
  fx:{fl:{fenrir_respeto:1},gl:30,saga:'Sostuvo la mirada de Fenrir, recién liberado, sin retroceder.'},
  c:[{x:'Ver cómo se aleja',to:'c3_fenrir_marcha',k:'main'}]},

c3_fenrir_ataca:{t:[
  'Fenrir abre la boca. Ni siquiera es un ataque de verdad: es un mordisco perezoso, como el de un perro que juega con un ratón. Aun así, sientes los colmillos atravesar tu cota, tu carne, casi tus huesos.',
  'Kraka se lanza contra el ojo del lobo graznando como un loco. Fenrir parpadea, sorprendido, y te suelta. Caes sobre la roca, sangrando. El lobo mira al cuervo, te mira a ti y suelta algo parecido a una risa. «Pequeños», dice. «Qué valientes son los pequeños.»'],
  fx:{hp:-90,fl:{fenrir_mordisco:1}},
  c:[{x:'Ver cómo se aleja',to:'c3_fenrir_marcha',k:'main'}]},

c3_fenrir_huida:{t:[
  'Corres hacia el borde del lago. Detrás oyes una risa enorme, como un alud. Fenrir no te persigue: no merece la pena. Pero te da un zarpazo de pasada, casi por diversión, que te tira de cabeza sobre el hielo.',
  'Cuando te levantas, el lobo ya no te mira.'],
  fx:{hp:-40},
  c:[{x:'Ver cómo se aleja',to:'c3_fenrir_marcha',k:'main'}]},

c3_fenrir_marcha:{t:[
  'Fenrir se da la vuelta y echa a correr. Cruza el lago helado en tres saltos, y el hielo se raja a su paso como si fuera cristal. Luego desaparece hacia el este, hacia el Bosque de Hierro, y su aullido rueda por las montañas hasta mucho después de que lo hayas perdido de vista.',
  'En la isla solo quedáis Lopt, Kraka y tú. Lopt se sacude la nieve del manto, se acerca y se sienta en la piedra donde estaba atado el lobo. Sonríe. Ya no parece un viajero simpático. Parece exactamente lo que es.'],
  c:[{x:'Esperar a que hable',to:'c3_loki',k:'main'}]},

/* ---------- El pacto de Loki ---------- */
c3_loki:{h:'Loki',cp:1,t:[
  '«Ya lo sabes, ¿verdad?», dice. «No me llamo Lopt. Bueno, también. Pero mi nombre de verdad es Loki. Hijo de gigantes, hermano de sangre de Odín, padre de lobos y serpientes. El que hace que pasen las cosas.»',
  '«Te voy a hacer una oferta, {N}, y solo te la voy a hacer una vez.» Se inclina hacia ti. «Skuld te dio un invierno a cambio de pelear por Odín. Pero Odín va a morir. Lo sabe él, lo sé yo, lo sabe hasta ese cuervo. ¿Para qué quieres el Valhalla, si el Valhalla va a arder?»',
  '«Ven conmigo. Corto el hilo de Skuld aquí mismo y te tejo uno nuevo, mío. Sin plazos. Sin valquirias. Cuando el mundo viejo caiga, tendrás un sitio en el nuevo. Un salón, un reino, lo que quieras. Y vida. Mucha vida.» Saca de la manga unas tijeras pequeñas, de plata. «¿Qué me dices?»'],
  c:[{x:'Aceptar el pacto de Loki',to:'c3_pacto_si',k:'n'},
     {x:'Rechazarlo: «Mi hilo ya tiene dueña»',to:'c3_pacto_no',k:'main'},
     {x:'Atacarlo',to:'c3_f_loki',k:'hunt'}]},

c3_pacto_si:{h:'Las tijeras',t:[
  'Asientes. Loki sonríe de oreja a oreja, coge tu mano marcada y acerca las tijeras a algo que no ves pero sientes: un hilo que sale de tu palma y sube hacia el cielo.',
  'Clic.',
  'Durante un instante no sientes nada. Luego la marca de Skuld se vuelve roja, como una brasa, y el frío que siempre tenía se convierte en calor. Loki te ata algo nuevo a la muñeca: un hilo rojo, fino como un cabello. «Bienvenid{o|a} a la familia», dice.',
  'Kraka no dice nada. Se queda en tu hombro, temblando, sin mirarte. Cuando por fin habla, lo hace en voz muy baja. «Hugin dijo que acompañarte era un castigo. No dijo que tuviera que gustarme.»'],
  fx:{fl:{pacto_loki:1,pacto_fin:1},gl:-150,saga:'En la isla de Lyngvi, aceptó el pacto de Loki y dejó que cortara el hilo de Skuld.'},
  c:[{x:'Volver con el Caminante',to:'c3_gullinkambi',k:'main'}]},

c3_pacto_no:{t:[
  'Loki se encoge de hombros, como si le hubieras dicho que no te apetece cerveza. Guarda las tijeras. «Lástima», dice. «Me caías bien. Me sigues cayendo bien. Eso es lo peor.»',
  'Se levanta. «Nos veremos en Vigrid, {N}. Yo llegaré en un barco hecho de uñas de muertos, con todo el ejército de Hel. Tú llegarás con un cuervo y un hacha.» Te guiña un ojo. «Que gane el mejor. Aunque ya sabemos quién va a ganar.» Y desaparece, dejando en el aire olor a manzanas asadas.'],
  fx:{fl:{pacto_no:1,pacto_fin:1},gl:40,saga:'En la isla de Lyngvi, rechazó el pacto de Loki.'},
  c:[{x:'Volver con el Caminante',to:'c3_gullinkambi',k:'main'}]},

c3_f_loki:{t:['Te lanzas contra Loki. Él se ríe, chasquea los dedos y de su sombra sale otra figura idéntica a él, hecha de humo y de fuego frío.'],f:{e:'sombra_loki',win:'c3_loki_tras',lose:'muerte'}},

c3_loki_tras:{t:[
  'La sombra se deshace en humo. Loki aplaude desde el otro lado de la isla, sin un rasguño. «Muy bien», dice. «Eso es un no, ¿verdad? Siempre se me olvida que vosotros los de Midgard sois tan… directos.»',
  '«Nos veremos en Vigrid», añade. «Yo llegaré en Naglfar, con todo el ejército de Hel. Tú llegarás con un cuervo y un hacha. Que gane el mejor.» Y desaparece.'],
  fx:{fl:{pacto_no:1,pacto_fin:1},gl:50,saga:'En la isla de Lyngvi, respondió a la oferta de Loki con el arma en la mano.'},
  c:[{x:'Volver con el Caminante',to:'c3_gullinkambi',k:'main'}]},

/* ---------- Final del capítulo ---------- */
c3_gullinkambi:{h:'El gallo de oro',cp:1,t:[
  'Sleipnir te devuelve al campamento bajo la raíz en una noche. Odín te espera junto al pozo. Mira el cielo del este, donde un resplandor rojo marca el camino que ha tomado el lobo.',
  'Entonces, desde muy arriba, desde lo más alto del Árbol, llega un canto. Es un gallo, pero su voz es de oro: clara, brillante, terrible. Hace vibrar las raíces de Yggdrasil y la nieve de la llanura, y la marca de tu mano.',
  '«Gullinkambi», dice Odín. «El gallo de Asgard. Despierta a los guerreros del Valhalla. El segundo de los tres.» Se queda callado un momento. «Cuando cante el tercero, el rojo, el de Hel, sonará el cuerno de Heimdal. Y entonces empezará todo.»',
  'Se vuelve hacia ti. Por primera vez, su único ojo parece verte de verdad. «Es hora de que subas a Asgard, {N}. Las puertas del Valhalla están cerradas, pero no para siempre. Ve a llamar.»'],
  fx:{saga:'Escuchó cantar a Gullinkambi, el gallo de oro de Asgard, el segundo de los tres gallos del fin del mundo.'},
  c:[{x:'«¿Y tú?»',to:'c3_despedida_odin',k:'main'}]},

c3_despedida_odin:{h:'La despedida',t:[
  'Odín se pone el sombrero de ala ancha y recoge su lanza. «Yo tengo que ir a ver a una vidente muerta», dice. «Le preguntaré otra vez cómo acaba todo. Siempre me dice lo mismo, pero no pierdo la esperanza.»',
  'Te pone una mano en el hombro. «Sleipnir te llevará hasta el puente del arco iris. Al otro lado está Heimdal. No le mientas: lo oye todo, hasta crecer la hierba.» Luego, más bajo: «Y si ves a Skuld, dile que su apuesta me gusta. No se lo digas a Frigg».',
  'Kraka, en tu hombro, mira cómo se aleja el Padre de Todos por la llanura, con sus dos cuervos. Hugin vuelve la cabeza una vez. Kraka no.'],
  fx:{item:{carne_gigante:2,pocion_abedul:2}},
  c:[{x:'Subir a Sleipnir',to:'c3_fin',k:'main'}]},

c3_fin:{h:'Fin del Capítulo 3',t:[
  'Sleipnir galopa por el aire. Abajo, Jotunheim se aleja: las montañas, los bosques negros, el lago helado donde ya no está el lobo. Delante, en el horizonte, aparece una franja de colores imposibles que sube desde la tierra hasta el cielo: rojo, verde, azul, como fuego, hielo y agua trenzados. El Bifrost, el puente del arco iris.',
  'Al otro lado está Asgard. Al otro lado está el Valhalla. Y en algún lugar entre ambos, alguien muy alto y muy atento te está mirando acercarte desde hace horas.',
  'Kraka se agarra a tu capucha. «Asgard», dice. «Vuelvo a Asgard. Con {un humano|una humana}, a caballo, sin que me hayan invitado.» Suelta una risita nerviosa. «Thor se va a reír tanto…»',
  '<span class=tag>Has completado el Capítulo 3: El Invierno sin Fin. La senda continúa en el Capítulo 4: El Crepúsculo.</span>'],
  fx:{fl:{c3fin:1},saga:'Cabalgó en Sleipnir hacia el puente del arco iris, camino de Asgard.'},
  end:'Capítulo 3 completado',saga:1}

}});
})();
