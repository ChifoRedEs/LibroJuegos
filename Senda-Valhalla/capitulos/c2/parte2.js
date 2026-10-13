/* =====================================================================
   Capítulo 2 · Bajo las Raíces
   Parte 2 · «La forja de los hermanos»
   Nidavellir: la casa de Hreidmar, la forja de Brok y Eitri (forja y
   grabado de runas), el Salón de los Gremios, el maestro rúnico Dvalin
   (Jera y Eihwaz), las minas profundas, la taberna (Alvis y Perthro)
   y la Gran Forja con la mosca. Termina con la apuesta de Lopt.
   Sustituye la escena provisional c2_p2 de la Parte 1.
   Escena de enlace provisional: c2_p3 (la sustituirá la Parte 3)
   ===================================================================== */
(()=>{
const pelea=(e,win,flee,t)=>({t:[t],f:{e,win,lose:'muerte',flee}});

/* ---------- Datos nuevos ---------- */
Object.assign(OBJ,{
  hacha_escama:{n:'Hacha de escama negra',tipo:'arma',atq:16,crit:12,pr:900,d:'Filo de escama de Nidhogg sobre acero enano. Corta el aire con un silbido.'},
  escudo_asta:{n:'Escudo del ciervo',tipo:'escudo',def:14,arm:5,pr:600,d:'Tilo enano reforzado con el asta de Dain. Ligero y casi irrompible.'},
  cota_enana:{n:'Cota enana',tipo:'armadura',def:15,arm:7,vel:-1,pr:800,d:'Anillas tan finas que parece tela. Brok la llama «una chapucilla».'},
  hongo_lava:{n:'Hongo de lava',tipo:'material',pr:15,d:'Crece junto a los ríos de fuego. Los cerveceros enanos lo pagan bien.'},
  hidromiel_enana:{n:'Hidromiel enana',tipo:'consumible',ef:{fu:60,hp:15},pr:40,d:'Fuego líquido. +60 Furor y 15 de Vida.'},
  sello_gremio:{n:'Sello de gremio',tipo:'clave',d:'Una moneda de bronce con un martillo. Prueba de trabajo bien hecho.'}
});
Object.assign(ENEMIGOS,{
  gusano_roca:{n:'Gusano de roca',cat:'Bestia de las minas',hp:82,a:14,gl:14,o:0,l:{hierro_pantano:.7,hongo_lava:.3}},
  gusano_pozo:{n:'El gusano del pozo siete',cat:'Bestia de las minas',hp:150,a:17,gl:40,o:0,l:{hierro_pantano:3}},
  draug_enano:{n:'Rey enano sin descanso',cat:'Draug',hp:135,a:17,gl:40,o:50,l:{brazalete_draug:1}}
});
FORJA.push(
  {r:'hacha_escama',mat:{escama_nidhogg:2,hierro_pantano:4},plata:200},
  {r:'escudo_asta',mat:{asta_dain:1,hierro_pantano:3},plata:150},
  {r:'cota_enana',mat:{hierro_pantano:6,hongo_lava:2},plata:250}
);
TIENDAS.mercado_enano={n:'Mercado de las Mil Chispas · «Aquí todo se forja, hasta los precios.»',
  stock:['pan_enano','hidromiel','hidromiel_enana','unguento','pocion_serbal','hierro_pantano','savia_raiz','escudo_hierro','cota_anillas']};

/* ---------- Duelo de acertijos con Alvis ---------- */
registrarSenna({
  alvis:{rival:'Alvis el Sabelotodo',min:3,
    rondas:[
      {i:'Tengo raíces que nadie ve, soy más alta que los árboles, subo y subo y nunca crezco. ¿Qué soy?',
       o:['Una montaña','Yggdrasil','El humo'],k:0,
       bien:'Alvis frunce el ceño. «Fácil. Era fácil. Para calentar.»',mal:'«¡Ja! ¿Yggdrasil? Yggdrasil crece, ignorante.» Alvis se frota las manos.'},
      {i:'Sin alas vuelo, sin ojos lloro. ¿Qué soy?',
       o:['Un cuervo ciego','El viento','Una nube'],k:2,
       bien:'Kraka se pavonea en tu hombro, aunque no ha hecho nada. Alvis tamborilea los dedos.',mal:'Kraka se ofende profundamente por lo del cuervo ciego. Alvis se ríe.'},
      {i:'Cuanto más tienes de mí, menos ves. ¿Qué soy?',
       o:['El oro','La oscuridad','La niebla'],k:1,
       bien:'«Hmm», dice Alvis. Solo «hmm». Los enanos de la taberna empiezan a apostar por ti.',mal:'«El oro ciega, sí, pero no es la respuesta», dice Alvis con suficiencia. «Poesía barata.»'},
      {i:'Basta con decir mi nombre para romperme. ¿Qué soy?',
       o:['Un juramento','El hielo','El silencio'],k:2,
       bien:'Alvis abre la boca para protestar y la cierra. Romperías el silencio. Lo entiende tarde.',mal:'«Un juramento se rompe con hechos, no con nombres», dice Alvis. «Aficionad{o|a}.»'},
      {i:'Y la última, la que ni los dioses resuelven: ¿qué le susurró Odín al oído a su hijo Baldr, muerto, sobre la pira?',
       o:['Que volvería después del Ragnarok','Solo Odín lo sabe','Una runa secreta'],k:1,
       bien:'La taberna entera estalla en aplausos. Es la única respuesta honrada, y Alvis lo sabe. Se pone rojo hasta las orejas.',mal:'«¡Nadie lo sabe! ¡Nadie salvo Odín!», chilla Alvis, triunfal. «Esa era la trampa.»'}],
    fx:{fl:{alvis_vencido:1},gl:20,saga:'Venció en un duelo de acertijos a Alvis el Sabelotodo, el enano más pedante de Nidavellir.'},
    fxko:{fl:{alvis_gana:1},plata:-20},
    ok:'Alvis se levanta de golpe, tira la silla y se queda mirándote, temblando de rabia y de algo parecido a la admiración. «Nadie… nadie me había ganado en doscientos años.»',
    ko:'Alvis recoge tus 20 de plata con una sonrisa insoportable. «Vuelve cuando hayas leído algo más que las runas de los retretes.»'}
});

registrarSenales({
  14:'Hasta en Nidavellir se nota: las forjas tardan más en calentarse. Los enanos dicen que el frío de arriba baja por las raíces.',
  16:'Una noticia corre por las forjas: allá arriba, el lobo Hati ha mordido la luna.'
});

registrarMision(S=>{
  if(!S.fl.c2p1fin)return null;
  if(!S.fl.c2p2ini)return 'Explora Nidavellir.';
  if(!S.fl.brok_intro)return S.fl.regin?'Preséntate en la forja de Brok y Eitri.':'Brok no recibe a nadie desde que secuestraron a su aprendiz. Rescata a Regin en las cuevas de los hongos, bajo las raíces.';
  if(!S.fl.forja_grande)return 'Reúne los materiales que pide Brok para la Gran Forja: 4 de hierro de pantano y una escama de Nidhogg o un asta de Dain. En las minas profundas hay hierro.';
  if(!S.fl.c2p2fin)return 'Termina la Gran Forja.';
  return null;
});

/* ---------- Enlaces con la Parte 1 ---------- */
SC.c2_cruce.c.push({x:'Volver a Nidavellir · 4 h',to:'c2_ciudad',k:'main',oc:1,req:{fl:'c2p2ini'},fx:{t:4}});

/* ---------- Textos variables ---------- */
GEN.c2_llegada=()=>({t:S.fl.regin?[
  'Regin te guía por las calles de Nidavellir como si fueran suyas, y en cierto modo lo son: todo el mundo le saluda, le abraza o le grita por haberse dejado secuestrar. Los otros tres herreros rescatados se despiden con reverencias y prometen invitarte a cerveza «durante un siglo, por lo menos».',
  'La casa de su familia está en el tercer anillo de la ciudad, junto a un río de lava que la calienta. Su padre, Hreidmar, un enano viejo de barba gris y ojos tristes, os recibe en la puerta. Cuando ve a Regin, se le doblan las rodillas.',
  '«Mi hijo», dice, abrazándolo. Luego te mira a ti por encima del hombro de Regin. «Esta casa es tu casa, {N}. Para siempre.»']
 :[
  'Recorres las calles de Nidavellir con la boca abierta. Los enanos te miran de reojo: un humano aquí abajo es una rareza, y en estos tiempos, una rareza sospechosa.',
  'En una plaza, un pregonero lee una lista de nombres: herreros desaparecidos, secuestrados por los elfos oscuros. El último de la lista es Regin, aprendiz del gran Brok. «Brok ha cerrado su forja», dice el pregonero. «No recibe a nadie, ni siquiera al rey, hasta que le devuelvan a su aprendiz.»',
  'Kraka te mira. «Las cuevas de los hongos», dice. «Estaba en las cuevas de los hongos. ¿Te acuerdas? Esas que no exploramos.»']});

GEN.c2_tesoros=()=>{const n=S.fl.mosca_ok||0;return {t:[
  n>=3?'Los dos tesoros salen perfectos del fuego. El jabalí de oro, Gullinbursti el Joven, sacude las cerdas y la forja se ilumina como si hubiera salido el sol. El anillo, gemelo de Draupnir, gotea ocho anillos idénticos cada nueve noches. Brok y Eitri se abrazan llorando.'
  :n==2?'Los tesoros salen del fuego casi perfectos. El jabalí de oro brilla como un sol pequeño, aunque tiene la cola un poco corta. El anillo gotea sus ocho anillos, aunque uno siempre sale algo torcido. «Suficiente», gruñe Brok. «Suficiente para Odín.»'
  :'Los tesoros salen del fuego con defectos que hasta tú ves. El jabalí brilla a ratos, como una vela con corriente. El anillo gotea anillos, pero no siempre ocho, y no siempre redondos. Brok se sienta en el suelo y se tapa la cara con las manos.',
  'Entonces, en el silencio de la forja, se oye una risa. Sobre el yunque, donde un momento antes había una mosca, ahora está sentado un hombre delgado, con el pelo rojo como una llama y una sonrisa demasiado ancha.']};};

GEN.c2_hreidmar_casa=()=>({t:[
  'La casa de Hreidmar es cálida, desordenada y huele a pan de piedra. Hay martillos colgados en todas las paredes, y sobre la chimenea, dos retratos tallados en madera: un enano joven y fuerte de mirada dura, y otro más pequeño con cara de alegría y un pez en la mano.',
  S.fl.hreidmar_charla?'Hreidmar remienda una bota junto al fuego. Regin duerme en un rincón, roncando como un fuelle.':'Hreidmar sigue tu mirada hasta los retratos, y se le ensombrece la cara.']});

registrarCapitulo({capitulo:2,parte:2,titulo:'La forja de los hermanos',escenas:{

/* ---------- Llegada ---------- */
c2_p2:{h:'La ciudad bajo la montaña',cp:1,gen:'c2_llegada',t:[],
  fx:{fl:{c2p2ini:1}},
  c:[{x:'Recorrer Nidavellir',to:'c2_ciudad',k:'main'}]},

/* ---------- Nidavellir: centro de la Parte 2 ---------- */
c2_ciudad:{h:'Nidavellir',cp:1,mision:1,sort:1,t:[
  'Nidavellir se abre en anillos que suben por las paredes de una caverna inmensa. En el anillo más bajo está el Mercado de las Mil Chispas; en el segundo, el Salón de los Gremios y la taberna del Yunque Sediento; en el tercero, las casas; y en lo más alto, colgada sobre el gran río de lava, la forja de Brok y Eitri, que echa humo de nueve colores.',
  'El ruido de los martillos no para nunca. Al principio te volvía loc{o|a}. Ahora casi te parece una canción.'],
  c:[{x:'Subir a la forja de Brok y Eitri',to:'c2_brok',k:'main',oc:1,req:{no:'brok_intro'}},
     {x:'La forja de Brok y Eitri',to:'c2_forja_brok',k:'main',oc:1,req:{fl:'brok_intro'}},
     {x:'El Salón de las Runas de Dvalin',to:'c2_dvalin',k:'main'},
     {x:'El Salón de los Gremios',to:'c2_gremios',k:'side'},
     {x:'El Mercado de las Mil Chispas',to:'c2_mercado',k:'shop'},
     {x:'Las minas profundas · 1 h',to:'c2_minas',k:'hunt',fx:{t:1}},
     {x:'La taberna del Yunque Sediento',to:'c2_taberna',k:'social'},
     {x:'La casa de Hreidmar',to:'c2_hreidmar',k:'side',oc:1,req:{fl:'regin'}},
     {x:'La posada del Martillo Roto · 10 de plata',to:'c2_posada',k:'side',oc:1,req:{no:'regin'}},
     {x:'Volver a las raíces de Yggdrasil · 4 h',to:'c2_cruce',k:'hunt',fx:{t:4}}]},

c2_posada:{h:'La posada del Martillo Roto',t:[
  'Una posada pequeña y ruidosa, con camas cortas pensadas para enanos. Tus pies cuelgan por fuera, pero al menos está caliente.'],
  c:[{x:'Dormir (recuperación total)',to:'c2_ciudad',k:'side',req:{plata:10},fx:{plata:-10,t:8,dormir:1}}],
  back:'c2_ciudad'},

/* ---------- La casa de Hreidmar: Fafnir y Otr ---------- */
c2_hreidmar:{h:'La casa de Hreidmar',gen:'c2_hreidmar_casa',t:[],
  c:[{x:'Preguntarle por los retratos',to:'c2_hreidmar_charla',k:'social',oc:1,req:{no:'hreidmar_charla'}},
     {x:'Dormir junto al fuego (recuperación total)',to:'c2_ciudad',k:'side',fx:{t:8,dormir:1}}],
  back:'c2_ciudad'},

c2_hreidmar_charla:{h:'Fafnir y Otr',t:[
  '«Mis otros hijos», dice Hreidmar en voz baja. «Otr era el pequeño. Le gustaba transformarse en nutria y pescar en el río. Un día, hace muchos años, un viajero lo mató de una pedrada para quedarse con su pez. Un viajero pelirrojo, muy simpático.»',
  'Kraka se queda helado. Hreidmar no lo nota. «Le exigí un rescate: oro suficiente para cubrir la piel de mi hijo. Lo trajo. Oro robado al enano Andvari, maldito por él. Y ese oro… ese oro envenenó a Fafnir, mi hijo mayor. Lo quiso todo para él. Me lo robó y se lo llevó a lo más hondo de las minas, a la veta de oro, y no volvió.»',
  '«Dicen que allí abajo ya no es un enano», añade, mirando el fuego. «Dicen que es un gusano. Un dragón. Que duerme sobre el oro y no deja de crecer.» Regin, en su rincón, aprieta los puños sin decir nada.'],
  fx:{fl:{hreidmar_charla:1},saga:'Escuchó de boca de Hreidmar la historia de sus hijos Otr y Fafnir, y del oro maldito de Andvari.'},
  back:'c2_hreidmar'},

/* ---------- Brok y Eitri ---------- */
c2_brok:{h:'La forja de Brok y Eitri',t:[
  'La forja de los hermanos es una cueva abierta sobre el río de lava, tan caliente que el aire tiembla. Dos enanos discuten a gritos junto a un yunque del tamaño de una mesa. Uno es ancho, calvo y tiene una barba negra chamuscada: Brok. El otro es delgado, de barba blanca impecable y manos finas: Eitri.',
  '«¡Dorado!», grita Brok. «¡Dorado rojizo!», grita Eitri. «¡Nadie quiere un jabalí rojizo!» «¡Nadie quiere un jabalí que parezca una moneda!» Ratatosk tenía razón: discuten por el color.',
  'Al verte, se callan los dos a la vez. Brok entorna los ojos. «La forja está cerrada», gruñe. «Para todo el mundo. Hasta que me devuelvan a mi aprendiz.»'],
  c:[{x:'Dejar que Regin se adelante',to:'c2_brok_regin',k:'main',oc:1,req:{fl:'regin'}},
     {x:'Marcharte',to:'c2_ciudad'}]},

c2_brok_regin:{t:[
  'Regin se adelanta, con la barbilla temblando. Brok deja caer el martillo. Eitri deja caer las tenazas. Durante un momento nadie dice nada, y luego Brok coge a Regin en brazos como si fuera un niño y lo zarandea, entre gruñidos y lágrimas que se evaporan antes de llegar a la barba.',
  'Cuando se calma, se vuelve hacia ti. «Me han dicho lo que hiciste», dice. «Kol el Pálido. Nadie había conseguido acercarse a ese gusano blanco.» Te mira la mano marcada, luego Muerdetumbas, luego otra vez la mano. «Skuld. Claro. Siempre es Skuld.»',
  'Eitri te explica la situación mientras su hermano se suena la nariz con un trapo de forja. «Hace un mes vino un viajero pelirrojo. Lopt, se llamaba. Nos apostó que no seríamos capaces de forjar tres tesoros para los dioses antes del fin del mundo. Brok, que es un cabezota, aceptó. Y se apostó la cabeza.»',
  '«¡Una apuesta es una apuesta!», ruge Brok. «Y la vamos a ganar. Pero para la Gran Forja necesito materiales que no tengo y un par de brazos que no se cansen en el fuelle. Tráeme cuatro medidas de hierro de pantano y algo duro de verdad: una escama de Nidhogg o un asta de ciervo de Yggdrasil. A cambio, te forjaré lo que quieras y te enseñaré a grabar runas en tu arma.»'],
  fx:{fl:{brok_intro:1,grabado_gratis:1},gl:10},
  c:[{x:'«Trato hecho»',to:'c2_forja_brok',k:'main'}]},

c2_forja_brok:{h:'La forja de Brok y Eitri',t:[
  'Brok martillea, Eitri afina, Regin corre de un lado a otro con carbón y tenazas. Aquí se forjan cosas que no existen en ningún otro lugar de los nueve mundos.'],
  c:[{x:'Empezar la Gran Forja',to:'c2_forja_grande',k:'main',oc:1,req:{no:'forja_grande',item:{hierro_pantano:4,escama_nidhogg:1}},fx:{quita:{hierro_pantano:4,escama_nidhogg:1}}},
     {x:'Empezar la Gran Forja',to:'c2_forja_grande',k:'main',oc:1,req:{no:'forja_grande',item:{hierro_pantano:4,asta_dain:1}},fx:{quita:{hierro_pantano:4,asta_dain:1}}},
     {x:'Pedirle a Brok que te forje algo',to:'c2_forjar',k:'shop'},
     {x:'Grabar una runa en tu arma',to:'c2_grabado',k:'shop'}],
  back:'c2_ciudad'},

c2_forjar:{h:'Forjar con Brok',t:[
  '«¿Qué quieres?», gruñe Brok, sin dejar de martillear. «Y no me pidas nada bonito. Yo hago cosas que funcionan. Lo bonito es cosa de mi hermano.»'],
  forja:1,back:'c2_forja_brok'},

c2_grabado:{h:'El grabado de runas',t:[
  'Eitri te enseña cómo se hace. Primero se calienta la hoja hasta que brilla como un atardecer. Luego se pinta la runa con savia de Yggdrasil mezclada con tu sangre, y se templa en agua del manantial helado. La runa queda dentro del metal para siempre, o hasta que alguien grabe otra encima.',
  '«Una runa en el arma no se gasta», dice Eitri. «No necesita Furor. Funciona siempre, golpe a golpe. Elige bien.»'],
  grabado:1,back:'c2_forja_brok'},

/* ---------- Dvalin: Jera y Eihwaz ---------- */
c2_dvalin:{h:'El Salón de las Runas',t:[
  'El Salón de las Runas es una cueva redonda y silenciosa, el único lugar callado de Nidavellir. Las paredes están cubiertas de runas talladas, miles de ellas, algunas tan antiguas que la piedra ha empezado a borrarlas.',
  'En el centro, sentado en un taburete, hay un enano tan viejo que su barba se extiende por el suelo como un río blanco. Es Dvalin, el que enseñó las runas a los enanos al principio de los tiempos. Dicen que fue el propio Odín quien se las enseñó a él.',
  '«Gente de arriba», dice sin abrir los ojos. «Con la marca de una Norna. Siéntate. No tengo prisa. Llevo sin tenerla desde antes de que existiera el sol.»'],
  c:[{x:'Pedirle que te enseñe una runa',to:'c2_dvalin_jera',k:'main',oc:1,req:{no:'jera',min:{contratos:3}}},
     {x:'Pedirle que te enseñe una runa',to:'c2_dvalin_espera',k:'main',oc:1,req:{no:'jera',max:{contratos:2}}},
     {x:'Pedirle la runa de la muerte y la vida',to:'c2_eihwaz_encargo',k:'main',oc:1,req:{fl:'jera',no:'eihwaz_enc'}},
     {x:'Entregarle la corona del rey enano',to:'c2_eihwaz',k:'main',oc:1,req:{fl:'rey_enano',no:'eihwaz_fin'}}],
  back:'c2_ciudad'},

c2_dvalin_espera:{t:[
  'Dvalin abre un ojo. «Las runas se ganan, no se piden. La que quiero enseñarte es <b>Jera</b>, la cosecha, la runa del ciclo: sembrar, trabajar, recoger. No se aprende con un golpe de suerte, sino con trabajo.»',
  '«Ve al Salón de los Gremios. Cumple tres encargos para mi pueblo. Trabaja para otros como si fuera para ti. Luego vuelve.» Y cierra el ojo otra vez.'],
  back:'c2_dvalin'},

c2_dvalin_jera:{t:[
  'Dvalin sonríe por primera vez. Tiene tres dientes, y los tres son de oro. «Has trabajado para los mineros, los cerveceros o los joyeros, y no te has quejado. Bueno, Kraka sí, pero los cuervos no cuentan.»',
  'Te coge la mano marcada con sus dedos secos como raíces y traza una runa que parecen dos manos que se buscan: <b>Jera</b>, la cosecha. «Lo que siembras en combate, lo recoges después», dice. «Jera cura despacio, pero cura siempre.»'],
  fx:{fl:{jera:1},runa:'jera',gl:15,saga:'Dvalin, el más antiguo de los enanos, le enseñó la runa Jera.'},
  back:'c2_dvalin'},

c2_eihwaz_encargo:{t:[
  '«<b>Eihwaz</b>», dice Dvalin. «El tejo. El árbol que vive mil años y cuyas hojas son veneno. La runa de lo que muere y no muere.» Se queda callado tanto rato que crees que se ha dormido.',
  '«Bajo esta sala están las tumbas de los primeros enanos. Hace un mes, el más antiguo de nuestros reyes, Durin el Primero, se levantó de su sepulcro. El Gran Invierno despierta a los muertos, incluso aquí. Nadie se atreve a bajar.» Abre los ojos. «Tú ya has bajado a una tumba. Tráeme su corona y dale descanso, y Eihwaz será tuya.»'],
  fx:{fl:{eihwaz_enc:1}},
  c:[{x:'Bajar a las tumbas de los primeros enanos',to:'c2_tumbas',k:'hunt'},
     {x:'Volver más tarde',to:'c2_dvalin'}]},

c2_tumbas:{h:'Las tumbas de los primeros enanos',t:[
  'Una escalera de caracol baja hasta unas criptas donde el aire huele a piedra y a siglos. Los enanos entierran a sus reyes de pie, dentro de la roca, con los ojos abiertos y el martillo en la mano.',
  'Uno de los nichos está vacío. En el centro de la cripta, sentado en un trono de granito, un enano muerto con una corona de hierro te espera. Sus ojos brillan con la misma luz azul que los del rey Rolf.',
  '«Otro ladrón», dice con una voz como de rocas que se parten. «Todos vienen a por mi corona.»'],
  c:[{x:'Alzar el arma',to:'c2_f_rey_enano',k:'hunt'},
     {x:'Volver arriba',to:'c2_dvalin'}]},

c2_f_rey_enano:pelea('draug_enano','c2_rey_enano_cae','c2_dvalin','Durin el Primero se levanta del trono. Es bajo, pero su martillo es más grande que tu cabeza.'),

c2_rey_enano_cae:{t:[
  'El rey enano cae de rodillas. La luz azul de sus ojos parpadea. «El frío», dice. «El frío de arriba nos despierta. Diles a mis hijos… que lo sentimos.» Luego se queda quieto, y esta vez para siempre.',
  'Recoges la corona de hierro. Es pesada, sencilla, sin una sola joya. Dentro, grabado, se lee: «El rey sirve a la piedra».'],
  fx:{fl:{rey_enano:1},saga:'Dio descanso a Durin el Primero, el rey enano que se levantó de su tumba.'},
  c:[{x:'Llevarle la corona a Dvalin',to:'c2_eihwaz',k:'main'}]},

c2_eihwaz:{t:[
  'Dvalin coge la corona con mucho cuidado y se la pone en el regazo. «Durin era mi amigo», dice. «Hace mucho. Gracias por dejarlo dormir.»',
  'Traza en tu palma una runa como un árbol con raíces arriba y abajo: <b>Eihwaz</b>, el tejo, el puente entre la vida y la muerte. «Te protegerá cuando las cosas se pongan feas», dice. «Y se van a poner muy feas.»'],
  fx:{fl:{eihwaz_fin:1},runa:'eihwaz',plata:50,gl:15},
  back:'c2_dvalin'},

/* ---------- El Salón de los Gremios ---------- */
c2_gremios:{h:'El Salón de los Gremios',t:[
  'Una sala larga con mesas de piedra, donde los gremios de Nidavellir cuelgan sus encargos en tablillas de bronce. Cada gremio tiene su escudo: el pico de los mineros, la jarra de los cerveceros, la gema de los joyeros, el yunque de los herreros.',
  'Un enano con gafas de cristal de roca toma nota de todo en un libro enorme. «Encargos cumplidos, sellos entregados», dice sin levantar la vista. «Así funciona Nidavellir.»'],
  c:[{x:'Mineros: el gusano del pozo siete',to:'c2_g_mineros',k:'hunt',oc:1,req:{no:'g_min'}},
     {x:'Cerveceros: tres hongos de lava para la hidromiel',to:'c2_g_cerveceros',k:'side',oc:1,req:{no:'g_cer'}},
     {x:'Joyeros: escoltar a una joyera por el puente de lava',to:'c2_g_joyeros',k:'side',oc:1,req:{no:'g_joy'}},
     {x:'Herreros: se busca escama de Nidhogg',to:'c2_g_herreros',k:'shop',oc:1,req:{no:'g_her'}}],
  back:'c2_ciudad'},

c2_g_mineros:{h:'El gusano del pozo siete',t:[
  'El jefe del gremio de mineros es una enana con un pico al hombro y cara de no haber dormido en una semana. «El pozo siete es el más rico en hierro de la montaña», dice. «Y desde hace tres semanas, un gusano de roca del tamaño de un barco se come a todo el que baja. Mátalo y te pago en hierro.»'],
  c:[{x:'Bajar al pozo siete · 1 h',to:'c2_f_gusano_pozo',k:'hunt',fx:{t:1}}],
  back:'c2_gremios'},

c2_f_gusano_pozo:pelea('gusano_pozo','c2_g_mineros_fin','c2_gremios','El pozo siete huele a roca rota. El suelo tiembla, y de la pared sale una boca circular llena de dientes como picos de minero.'),

c2_g_mineros_fin:{t:[
  'El gusano queda atravesado en la galería como un tronco caído. Los mineros bajan con antorchas y lo miran con respeto. Luego empiezan a descuartizarlo, porque los enanos no desperdician nada.',
  'La jefa del gremio te pone en la mano una bolsa de hierro de pantano y un sello de bronce. «El pozo siete vuelve a ser nuestro», dice. «Gracias, gente de arriba.»'],
  fx:{fl:{g_min:1},suma:{contratos:1},item:{hierro_pantano:4,sello_gremio:1},plata:30,gl:10},
  c:[{x:'Volver al Salón de los Gremios',to:'c2_gremios'}]},

c2_g_cerveceros:{h:'La hidromiel de los enanos',t:[
  'El gremio de cerveceros huele a miel fermentada y a pies. El maestro cervecero, un enano con una nariz roja como una brasa, te explica el problema entre hipos. «La hidromiel enana necesita hongos de lava, que solo crecen junto a los ríos de fuego de las minas. Mis aprendices tienen miedo de bajar. Tráeme tres y te pago en especie.»'],
  c:[{x:'Entregarle tres hongos de lava',to:'c2_g_cerveceros_fin',k:'side',req:{item:{hongo_lava:3}},fx:{quita:{hongo_lava:3}}}],
  back:'c2_gremios'},

c2_g_cerveceros_fin:{t:[
  'El maestro cervecero acaricia los hongos como si fueran cachorros. Te da tres botellas de hidromiel enana y un sello de bronce, y te invita a probar la última hornada. Lo que pasa después no lo recuerdas del todo, pero Kraka asegura que cantaste.'],
  fx:{fl:{g_cer:1},suma:{contratos:1},item:{hidromiel_enana:3,sello_gremio:1},gl:8},
  c:[{x:'Volver al Salón de los Gremios',to:'c2_gremios'}]},

c2_g_joyeros:{h:'El puente de lava',t:[
  'La joyera Sindri es una enana diminuta con los ojos de un halcón y una caja cerrada con tres candados. Tiene que llevar unas gemas al otro lado de la ciudad por el puente de lava, el único camino, y los elfos oscuros que huyeron de las cuevas acechan allí.',
  'El puente es una cinta de piedra sin barandilla sobre un río de fuego. Al otro lado se ven sombras grises entre las columnas.'],
  c:[{x:'Cruzar deprisa, cubriendo a Sindri con tu cuerpo',to:'c2_joyeros_ok',k:'main',chk:{s:'ast',dc:9,ok:'c2_joyeros_ok',ko:'c2_joyeros_ko'}},
     {x:'Proteger el puente con un escudo rúnico (Algiz)',to:'c2_joyeros_ok',k:'main',oc:1,req:{runa:'algiz'}}],
  back:'c2_gremios'},

c2_joyeros_ok:{t:[
  'Las flechas negras rebotan contra tu escudo o se pierden en la lava. Cruzas el puente con Sindri pegada a tu espalda, y los elfos, al ver que no pueden con vosotros, desaparecen entre las columnas.',
  'Al otro lado, Sindri abre uno de los candados y saca una piedra pequeña y roja como una gota de sangre. «Para ti», dice. «Una gema de fuego. Dicen que da suerte a quien no la vende.» Te da también un sello de bronce.'],
  fx:{fl:{g_joy:1},suma:{contratos:1},item:{sello_gremio:1},plata:60,st:{sue:1},gl:10,saga:'Escoltó a la joyera Sindri por el puente de lava de Nidavellir.'},
  c:[{x:'Volver al Salón de los Gremios',to:'c2_gremios'}]},

c2_joyeros_ko:{t:[
  'Una flecha te alcanza en el hombro y casi pierdes el equilibrio. Durante un instante horrible, Sindri y tú os tambaleáis al borde de la lava. Luego recuperas el paso y llegáis al otro lado, sangrando y sin aliento.',
  'Sindri te mira la herida y chasquea la lengua. «Gente de arriba», dice. Pero te paga, y te da un sello de bronce.'],
  fx:{fl:{g_joy:1},suma:{contratos:1},item:{sello_gremio:1},plata:30,hp:-25},
  c:[{x:'Volver al Salón de los Gremios',to:'c2_gremios'}]},

c2_g_herreros:{h:'Escama de Nidhogg',t:[
  'El gremio de herreros paga una fortuna por cualquier escama de Nidhogg. «Para las armas de los einherjar», explica el maestro herrero. «Odín ha encargado mil espadas para el fin del mundo. Mil. Y sin escama no hay filo que aguante contra un gigante.»'],
  c:[{x:'Venderle una escama de Nidhogg al gremio',to:'c2_g_herreros_fin',k:'shop',req:{item:'escama_nidhogg'},fx:{quita:{escama_nidhogg:1}}}],
  back:'c2_gremios'},

c2_g_herreros_fin:{t:[
  'El maestro herrero sostiene la escama a la luz de la forja y suspira como un enamorado. Te paga en plata, mucha plata, y te da un sello de bronce. «Si traes más, el gremio pagará lo mismo», dice. «Y te deberá un favor.»'],
  fx:{fl:{g_her:1},suma:{contratos:1},item:{sello_gremio:1},plata:250,gl:8},
  c:[{x:'Volver al Salón de los Gremios',to:'c2_gremios'}]},

/* ---------- Las minas profundas ---------- */
c2_minas:{h:'Las minas profundas',sort:1,t:[
  'Las minas de Nidavellir bajan en galerías que se cruzan como las raíces de un árbol. En las paredes brilla el hierro, la plata y, a veces, algo más. Más abajo corren ríos de lava, y a su orilla crecen hongos que parecen brasas.',
  'Al fondo de la galería principal, una reja de hierro cierra el paso hacia lo más hondo. Un cartel tallado en la roca dice: «La veta de oro. No pasar. Por orden del rey».'],
  c:[{x:'Picar hierro de pantano · 2 h',to:'c2_minas',k:'side',fx:{item:{hierro_pantano:1},t:2}},
     {x:'Buscar hongos de lava junto al río de fuego · 2 h',to:'c2_minas_hongos',k:'side',fx:{t:2}},
     {x:'Cazar gusanos de roca',to:'c2_f_gusano',k:'hunt'},
     {x:'Asomarte a la reja de la veta de oro',to:'c2_veta',k:'main',oc:1,req:{no:'veta_vista'}},
     {x:'Volver a la ciudad · 1 h',to:'c2_ciudad',fx:{t:1}}]},

c2_minas_hongos:{t:[
  'El calor del río de lava te seca los ojos. Los hongos crecen en las grietas de la orilla, rojos y brillantes. Hay que cogerlos con cuidado: si los aplastas, explotan.'],
  c:[{x:'Recoger los hongos con cuidado',to:'c2_minas',k:'side',chk:{s:'ast',dc:7,ok:'c2_minas',ko:'c2_minas',fxok:{item:{hongo_lava:2}},fxko:{item:{hongo_lava:1},hp:-10}}}],
  back:'c2_minas'},

c2_f_gusano:pelea('gusano_roca','c2_minas','c2_minas','La roca se abre a tu lado y un gusano gris, grueso como un tonel, se lanza hacia ti con la boca abierta.'),

c2_veta:{h:'La reja de la veta de oro',t:[
  'Te acercas a la reja. Detrás, el túnel baja hacia una oscuridad que no es del todo oscura: brilla con un resplandor dorado y rojizo, como si allá abajo ardiera un sol enterrado.',
  'Y se oye algo. Un ruido lento, pesado, como el de una cadena enorme que se arrastra sobre monedas. Luego, una respiración. Kraka se esconde dentro de tu manto.',
  '«Mío», susurra una voz desde las profundidades, tan baja que no sabes si la has oído o la has imaginado. «Todo mío. Mío. Mío.»'],
  fx:{fl:{veta_vista:1}},
  c:[{x:'Apartarte de la reja',to:'c2_minas',k:'main'}]},

/* ---------- Mercado y taberna ---------- */
c2_mercado:{h:'El Mercado de las Mil Chispas',t:[
  'Puestos de piedra bajo toldos de cuero, cada uno con su pequeña forja, su yunque y un enano gritando precios. Aquí se vende de todo: pan de piedra, hidromiel, cotas, escudos, savia de Yggdrasil y piedras que brillan.'],
  shop:'mercado_enano',back:'c2_ciudad'},

c2_taberna:{h:'El Yunque Sediento',t:[
  'La taberna del Yunque Sediento está excavada en una antigua mina de sal. Las mesas son bloques de piedra, las jarras son de hierro y la cerveza sabe a carbón y a alegría. Los enanos cantan canciones muy largas sobre minerales.',
  'En una mesa del fondo, un enano delgado y pálido, de barba en punta y nariz arrogante, lee un libro de runas en voz alta para que todos sepan que sabe leer.'],
  c:[{x:'Acercarte al enano del libro',to:'c2_alvis',k:'social',oc:1,req:{no:'sn_alvis'}},
     {x:'Aceptar un concurso de hidromiel con los mineros',to:'c2_bebida',k:'social',oc:1,req:{no:'bebida'}},
     {x:'Invitar a Kraka a unos ojos de bacalao para hacer las paces',to:'c2_kraka_perdon',k:'social',oc:1,req:{fl:'kraka_ofendido',no:'kraka_perdona'}}],
  back:'c2_ciudad'},

c2_kraka_perdon:{t:[
  'Pides un plato de ojos de bacalao, el manjar favorito de cualquier cuervo que se respete, y se lo pones delante a Kraka. Kraka mira los ojos. Te mira a ti. Mira los ojos otra vez.',
  '«No creas que esto lo arregla todo», dice con la boca llena. «Le contaste mi secreto a una ardilla. A una ARDILLA. Ahora lo sabe todo Yggdrasil.» Se come otro ojo. «Pero están muy buenos. Te perdono un poco. Un poco bastante.»'],
  fx:{fl:{kraka_perdona:1},plata:-5},
  back:'c2_taberna'},

c2_bebida:{h:'Concurso de hidromiel',t:[
  'Seis mineros enanos se sientan frente a ti, cada uno con una jarra de hidromiel enana del tamaño de un cubo. Las reglas son sencillas: gana el último que siga sentado.',
  '«Los de arriba nunca pasan de la tercera», dice uno, y todos se ríen.'],
  c:[{x:'Beber hasta el final',to:'c2_bebida_ok',k:'social',chk:{s:'fue',dc:9,ok:'c2_bebida_ok',ko:'c2_bebida_ko'}}],
  back:'c2_taberna'},

c2_bebida_ok:{t:[
  'A la quinta jarra caen dos mineros. A la séptima, otros tres. A la novena, el último te mira con ojos vidriosos, levanta la jarra, dice «los de arriba…» y se desploma sobre la mesa.',
  'La taberna estalla en vítores. Te regalan tres botellas de hidromiel enana y una canción que se compone en tu honor en ese mismo instante. Rima fatal, pero es tuya.'],
  fx:{fl:{bebida:1},item:{hidromiel_enana:2},gl:10,t:2,saga:'Ganó un concurso de hidromiel a seis mineros enanos en la taberna del Yunque Sediento.'},
  back:'c2_taberna'},

c2_bebida_ko:{t:[
  'A la cuarta jarra la taberna empieza a girar. A la quinta, el suelo se acerca muy deprisa.',
  'Te despiertas horas después, sobre un montón de sacos, con un dolor de cabeza enorme y la bolsa algo más ligera. Kraka te mira desde una viga. «Los de arriba nunca pasan de la tercera», dice. «Tú llegaste a la quinta. Es un récord. Un récord triste, pero un récord.»'],
  fx:{fl:{bebida:1},plata:-15,t:6},
  back:'c2_taberna'},

c2_alvis:{h:'Alvis el Sabelotodo',t:[
  'El enano del libro levanta la vista con evidente fastidio. «Alvis», se presenta, «el que todo lo sabe. Lo pone en mi nombre. Y tú debes de ser {el humano|la humana} que todos comentan. ¿Sabes leer, al menos?»',
  '«Te propongo un duelo de acertijos», dice, sin esperar respuesta. «Cinco preguntas. Si aciertas tres, te enseñaré algo que no sabes. Si pierdes, me das veinte de plata y te vas a leer runas de retrete.»',
  'Kraka te susurra: «Alvis lleva doscientos años sin perder. Bueno, nadie juega con él desde hace doscientos años, pero eso no lo dice».'],
  c:[{x:'Aceptar el duelo de acertijos',to:'c2_alvis_duelo',k:'social'}],
  back:'c2_taberna'},

c2_alvis_duelo:{h:'Duelo de acertijos',t:[
  'Los enanos de la taberna rodean vuestra mesa. Alguien empieza a apostar. Alvis se ajusta las mangas, cierra el libro y te mira con desprecio.'],
  senna:'alvis',back:'c2_alvis_tras'},

c2_alvis_tras:{t:[
  'La taberna vuelve poco a poco al ruido de siempre. Alvis sigue sentado frente a ti, tamborileando con los dedos.'],
  c:[{x:'Pedirle lo que te prometió',to:'c2_alvis_perthro',k:'main',oc:1,req:{fl:'alvis_vencido',no:'alvis_fin'}},
     {x:'Entretenerlo con preguntas hasta que salga el sol por el Pozo del Alba',to:'c2_alvis_piedra',k:'n',oc:1,req:{fl:'alvis_vencido',no:'alvis_fin'},chk:{s:'ast',dc:10,ok:'c2_alvis_piedra',ko:'c2_alvis_escapa'}},
     {x:'Volver a la taberna',to:'c2_taberna'}]},

c2_alvis_perthro:{t:[
  'Alvis traga saliva y abre su libro por una página marcada. «<b>Perthro</b>», dice a regañadientes. «El cubilete de dados. La runa del azar y del destino. La de las Nornas, para que lo sepas.»',
  'Te enseña el trazo con un dedo manchado de tinta. Es como una copa volcada. «Lo que sale del cubilete nadie lo sabe. Ni siquiera yo.» Le cuesta mucho decir eso último.'],
  fx:{fl:{alvis_fin:1},runa:'perthro',plata:30,gl:5},
  back:'c2_taberna'},

c2_alvis_piedra:{h:'El Pozo del Alba',t:[
  'Kraka te ha contado la historia: hace mucho, Thor entretuvo a un enano con preguntas hasta que salió el sol, y el enano se convirtió en piedra. En Nidavellir solo hay un sitio donde llega la luz del sol: el Pozo del Alba, una chimenea natural que sube hasta la superficie y que, una vez al día, se llena de luz durante unos instantes.',
  'Con una sonrisa inocente, le propones a Alvis seguir el duelo en un sitio más tranquilo. Le haces preguntas sobre el nombre de la luna entre los gigantes, sobre el nombre del fuego entre los elfos, sobre el nombre de la cerveza entre los dioses. Alvis contesta a todo, encantado, sin darse cuenta de dónde está.',
  'Entonces un rayo de sol baja por el Pozo del Alba. Alvis abre la boca para responder la última pregunta, y ya no la cierra. Es de piedra gris, con el dedo levantado y cara de sabelotodo. Los enanos lo ponen en la plaza al día siguiente. Le llaman «el Monumento al Silencio».'],
  fx:{fl:{alvis_fin:1,alvis_piedra:1},plata:150,gl:15,saga:'Entretuvo a Alvis el Sabelotodo con preguntas hasta que la luz del sol lo convirtió en piedra, como hizo Thor en los viejos tiempos.'},
  c:[{x:'Volver a la ciudad',to:'c2_ciudad',k:'main'}]},

c2_alvis_escapa:{t:[
  'A mitad de camino hacia el Pozo del Alba, Alvis se detiene en seco. «Un momento», dice. «Conozco esa historia. Thor. El sol. La piedra.» Te mira con los ojos entornados. «Muy list{o|a}. Pero no lo bastante.»',
  'Se marcha muy digno, sin enseñarte nada. Kraka suspira. «Para una vez que un enano sabe historia…»'],
  fx:{fl:{alvis_fin:1}},
  c:[{x:'Volver a la ciudad',to:'c2_ciudad',k:'main'}]},

/* ---------- La Gran Forja y la mosca ---------- */
c2_forja_grande:{h:'La Gran Forja',cp:1,t:[
  'Brok y Eitri trabajan como un solo enano. Eitri echa en el fuego una piel de cerdo y una barra de oro; Brok te pone en las manos las asas del fuelle, dos palancas de madera negra tan grandes como remos.',
  '«Escucha bien», dice Eitri. «Mientras el fuego trabaja, el fuelle no puede parar ni un instante. Ni uno. Si paras, el tesoro sale mal. Si paras mucho, no sale.» Brok gruñe. «Si paras, te tiro a la lava.»',
  'Empiezas a bombear. El fuego ruge. Y entonces, por encima del estruendo, oyes un zumbido. Una mosca. Una mosca grande, negra, de ojos rojos, que da vueltas a tu alrededor.'],
  fx:{fl:{forja_grande:1}},
  c:[{x:'Seguir bombeando',to:'c2_mosca1',k:'main'}]},

c2_mosca1:{h:'La primera picadura',t:[
  'La mosca se posa en tu mano y pica. Duele como un hierro al rojo. Las manos te tiemblan sobre el fuelle. El jabalí de oro está tomando forma en el fuego.'],
  c:[{x:'Aguantar el dolor sin soltar el fuelle',to:'c2_mosca1_ok',k:'main',chk:{s:'esp',dc:9,ok:'c2_mosca1_ok',ko:'c2_mosca1_ko'}},
     {x:'Congelar la mosca con la runa Isa sin soltar el fuelle',to:'c2_mosca1_ok',k:'main',oc:1,req:{runa:'isa'}}]},

c2_mosca1_ok:{t:['Aprietas los dientes y no paras. La mosca se aparta, zumbando con fastidio. En el fuego, el jabalí sacude unas cerdas de oro.'],
  fx:{suma:{mosca_ok:1},gl:5},
  c:[{x:'Seguir bombeando',to:'c2_mosca2',k:'main'}]},
c2_mosca1_ko:{t:['Sueltas el fuelle un instante para espantarla. Solo un instante. Brok maldice. En el fuego, el jabalí pierde un poco de brillo.'],
  fx:{hp:-10},
  c:[{x:'Seguir bombeando',to:'c2_mosca2',k:'main'}]},

c2_mosca2:{h:'La segunda picadura',t:[
  'Eitri saca el jabalí y mete en el fuego un anillo de oro. La mosca vuelve. Esta vez se posa en tu cuello y pica dos veces, tan fuerte que ves estrellas.'],
  c:[{x:'Aguantar el dolor sin soltar el fuelle',to:'c2_mosca2_ok',k:'main',chk:{s:'fue',dc:10,ok:'c2_mosca2_ok',ko:'c2_mosca2_ko'}},
     {x:'Pedirle a Kraka que se encargue de la mosca',to:'c2_kraka_mosca',k:'social',oc:1,req:{no:'kraka_ofendido'}},
     {x:'Pedirle a Kraka que se encargue de la mosca',to:'c2_kraka_mosca',k:'social',oc:1,req:{fl:['kraka_ofendido','kraka_perdona']}},
     {x:'Pedirle ayuda a Kraka',to:'c2_kraka_no',k:'social',oc:1,req:{fl:'kraka_ofendido',no:'kraka_perdona'}}]},

c2_mosca2_ok:{t:['Te sangra el cuello, pero el fuelle no se detiene. La mosca se aleja con un zumbido furioso. En el fuego, el anillo empieza a gotear anillos.'],
  fx:{suma:{mosca_ok:1},gl:5},
  c:[{x:'Seguir bombeando',to:'c2_mosca3',k:'main'}]},
c2_mosca2_ko:{t:['El dolor te nubla la vista y el fuelle se detiene un instante. Eitri grita. El anillo se tuerce en el fuego.'],
  fx:{hp:-15},
  c:[{x:'Seguir bombeando',to:'c2_mosca3',k:'main'}]},

c2_kraka_mosca:{h:'Kraka contra la mosca',t:[
  'Kraka se lanza desde tu hombro como una flecha negra, abre el pico y se traga la mosca de un bocado. Durante un instante, todo es perfecto.',
  'Luego Kraka pone una cara muy rara. Tose. Se le hinchan las plumas. Escupe la mosca, que sale volando, mareada y empapada, y oyes con toda claridad una voz diminuta que dice: «¡Eso ha sido asqueroso!».',
  '«Sabía a manzana asada», dice Kraka, horrorizado. «Las moscas no saben a manzana asada.» Pero el fuelle no se ha detenido, y el anillo sale perfecto.'],
  fx:{suma:{mosca_ok:1},gl:8},
  c:[{x:'Seguir bombeando',to:'c2_mosca3',k:'main'}]},

c2_kraka_no:{t:[
  'Kraka mira hacia otro lado con la cabeza muy alta. «Ah, ¿ahora necesitas ayuda? Pues pídesela a tu amiga la ardilla.»',
  'La mosca aprovecha para picarte otra vez. No tienes más remedio que aguantar.'],
  c:[{x:'Aguantar el dolor sin soltar el fuelle',to:'c2_mosca2_ok',k:'main',chk:{s:'fue',dc:10,ok:'c2_mosca2_ok',ko:'c2_mosca2_ko'}}]},

c2_mosca3:{h:'La tercera picadura',t:[
  'Brok mete en el fuego una barra de hierro negro: es el molde del tercer tesoro, el más importante. La mosca vuelve por última vez. Se posa en tu párpado y pica, y la sangre te ciega un ojo.'],
  c:[{x:'Aguantar el dolor sin soltar el fuelle',to:'c2_mosca3_ok',k:'main',chk:{s:'esp',dc:10,ok:'c2_mosca3_ok',ko:'c2_mosca3_ko'}},
     {x:'Golpear la mosca con la runa Ansuz sin soltar el fuelle',to:'c2_mosca3_ok',k:'main',oc:1,req:{runa:'ansuz'},chk:{s:'esp',dc:8,ok:'c2_mosca3_ok',ko:'c2_mosca3_ko'}}]},

c2_mosca3_ok:{t:['No ves nada por un ojo, pero no sueltas el fuelle. Brok saca el molde del fuego, lo mira y asiente despacio. «Bien», dice. Para Brok, eso es casi un abrazo.'],
  fx:{suma:{mosca_ok:1},gl:5},
  c:[{x:'Soltar por fin el fuelle',to:'c2_tesoros',k:'main'}]},
c2_mosca3_ko:{t:['Te llevas la mano al ojo sin querer, y el fuelle se detiene. Brok saca el molde del fuego, maldiciendo. Le falta un trozo. «Servirá», gruñe. «Tendrá que servir.»'],
  fx:{hp:-15},
  c:[{x:'Soltar por fin el fuelle',to:'c2_tesoros',k:'main'}]},

c2_tesoros:{h:'Los tesoros',gen:'c2_tesoros',t:[],
  c:[{x:'Enfrentarte al pelirrojo',to:'c2_lopt',k:'main'}]},

c2_lopt:{h:'La apuesta de Lopt',t:[
  '«Bravo, bravo», dice Lopt, aplaudiendo despacio. Tiene en el párpado la misma marca roja que la mosca que te picaba. No se molesta en disimular. «Dos tesoros. Muy bonitos. Pero la apuesta era de tres, Brok. Y el tercero necesita oro. Oro de verdad. No hay otro en toda la montaña.»',
  'Brok se pone pálido. Eitri cierra los ojos. «La veta», susurra Regin.',
  '«La veta», asiente Lopt, encantado. «Donde duerme Fafnir sobre el oro de Andvari. El oro que yo mismo traje a esta casa hace tantos años. Qué casualidad, ¿no?» Se baja del yunque de un salto. «Tenéis cuatro días. Al quinto vendré a por la cabeza de Brok. Me hará una copa preciosa.»',
  'Se vuelve hacia ti al pasar, y te guiña un ojo. «Y tú, {N}… Saluda a Skuld de mi parte. Dile que su hilo está muy bonito. Sería una pena que alguien tirara de él.» Luego chasquea los dedos y ya no está. Solo queda en el aire un olor a manzanas asadas.'],
  fx:{fl:{lopt_apuesta:1},saga:'Ayudó a Brok y Eitri en la Gran Forja, a pesar de que Lopt, convertido en mosca, intentó impedirlo.'},
  c:[{x:'«Yo traeré ese oro»: jurarlo ante Brok (cuatro días)',to:'c2_brok_gracias',k:'main',fx:{fl:{jur_fafnir:1},jura:{id:'fafnir',txt:'Traer el oro de la veta para el tercer tesoro de Brok antes de que venza la apuesta de Lopt',dias:4,gl:80}}},
     {x:'Prometerle a Brok que lo intentarás, sin jurar',to:'c2_brok_gracias',k:'n'}]},

c2_brok_gracias:{h:'Antes de la veta',cp:1,t:[
  'Brok te mira largo rato. Luego coge de la pared algo envuelto en un trapo y te lo pone en las manos sin decir nada. Es una cota de anillas tan finas que parece tela. «Una chapucilla», gruñe. «La tenía por ahí.» Eitri pone los ojos en blanco: lleva tres meses trabajando en ella.',
  'Regin se acerca, muy serio. «Voy contigo. Fafnir es mi hermano. Si alguien tiene que mirarlo a los ojos, soy yo.» Hreidmar, en la puerta de la forja, no dice nada, pero tampoco se lo impide.',
  'Kraka suspira en tu hombro. «Un dragón», dice. «Claro. ¿Por qué no? Ya puestos.»'],
  fx:{fl:{c2p2fin:1},item:'cota_enana',gl:15},
  c:[{x:'Prepararte para bajar a la veta de oro',to:'c2_p3',k:'main'}]},

/* Escena de enlace provisional: la sustituirá la Parte 3 */
c2_p3:{h:'Continuará',t:[
  'En lo más hondo de la montaña, algo enorme se remueve sobre un lecho de oro.',
  '<span class=tag>Aquí termina la Parte 2 del Capítulo 2. La historia continúa en la Parte 3: «El gusano de la veta de oro».</span>'],
  c:[{x:'Volver a Nidavellir',to:'c2_ciudad'}]}

}});
})();
