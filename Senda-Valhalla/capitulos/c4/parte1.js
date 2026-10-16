/* =====================================================================
   Capítulo 4 · El Camino de Hel
   Parte 1 · «El muérdago»
   Heimdal y la prueba de la verdad. Asgard: Baldr, Frigg, Höd, Thor,
   Idunn, Eir y las puertas del Valhalla. La anciana que pregunta por el
   muérdago, el juego de las armas y la muerte de Baldr. El funeral en
   Hringhorni y la partida hacia Hel.
   Convierte c3_fin en enlace hacia c4_inicio.
   Continúa en parte2.js (c4_p2)
   ===================================================================== */
(()=>{
const pelea=(e,win,flee,t)=>({t:[t],f:{e,win,lose:'muerte',flee}});

/* ---------- Datos nuevos ---------- */
Object.assign(OBJ,{
  pluma_aguila:{n:'Pluma del águila de escarcha',tipo:'material',pr:100,d:'Larga como un brazo, blanca y fría. Los herreros de Asgard la usan para templar el acero.'},
  cota_einherjar:{n:'Cota de los einherjar',tipo:'armadura',def:20,arm:9,pr:2000,d:'La misma que llevan los guerreros del Valhalla. Ha muerto y resucitado mil veces.'},
  ramita_muerdago:{n:'Ramita de muérdago',tipo:'clave',d:'Una ramita joven, verde y blanda. Demasiado joven para jurar nada.'}
});
Object.assign(ENEMIGOS,{
  aguila_escarcha:{n:'Águila de escarcha',cat:'Bestia de Jotunheim',hp:205,a:28,gl:40,o:0,l:{pluma_aguila:1}},
  einherjar:{n:'Einherjar',cat:'Guerrero del Valhalla',hp:210,a:28,gl:22,o:0}
});
FORJA.push({r:'cota_einherjar',mat:{pluma_aguila:1,hierro_pantano:6},plata:400});
TIENDAS.eir={n:'Eir, la sanadora de los dioses · «Lo que cura no se regala, pero tampoco se roba.»',
  stock:['pocion_abedul','unguento','carne_gigante','pan_enano','hidromiel_enana','hidromiel_poesia','savia_raiz','hierro_pantano']};

registrarSenales({
  37:'En Asgard tampoco sale el sol. Los dioses fingen no darse cuenta.',
  39:'Esta mañana, en el prado de Idavoll, la hierba amanece cubierta de escarcha negra.'
},S=>S.fl.c4&&!S.fl.c5);

registrarMision(S=>{
  if(!S.fl.c4)return null;
  if(!S.fl.asgard)return 'Cruza el Bifrost.';
  if(!S.fl.baldr_muerto){
    const p=[];
    if(!S.fl.baldr)p.push('Baldr, en su salón de Breidablik');
    if(!S.fl.frigg)p.push('Frigg, en Fensalir');
    if(!S.fl.hod)p.push('Höd, el dios ciego');
    if(p.length)return 'Conoce a los dioses de Asgard: '+p.join(', ').replace(/, ([^,]*)$/,' y $1')+'.';
    return 'Acude al juego de las armas en el prado de Idavoll.'+(S.fl.anciana_vista&&!S.fl.muerdago_visto?' Una anciana desconocida ronda Fensalir al anochecer.':'');
  }
  if(!S.fl.c4p1fin)return 'Despide a Baldr.';
  return null;
});

/* ---------- Enlace desde el Capítulo 3 ---------- */
Object.assign(SC.c3_fin,{end:null,saga:null,
  fx:{fl:{c3fin:1},fin:'Capítulo 3 completado',saga:'Cabalgó en Sleipnir hacia el puente del arco iris, camino de Asgard.'},
  c:[{x:'Continuar con el Capítulo 4: El Camino de Hel',to:'c4_inicio',k:'main'}]});
SC.c3_fin.t=SC.c3_fin.t.map(p=>p.replace('<span class=tag>Has completado el Capítulo 3: El Invierno sin Fin. La senda continúa en el Capítulo 4: El Crepúsculo.</span>','<span class=tag>Has completado el Capítulo 3: El Invierno sin Fin.</span>'));

/* ---------- Textos variables: la prueba de Heimdal ---------- */
const peor=()=>S.fl.dain_muerto?'dain':S.fl.aldea_destruida?'aldea':(S.fl.anillo_tuyo||S.fl.maldito)?'oro':S.fl.saqueo?'saqueo':S.fl.thrym_tentado?'thrym':S.fl.arbol_bajado?'arbol':'miedo';
const PREG={
  dain:['«Mataste a Dain, el ciervo más viejo del Árbol. ¿Por qué?»','«Porque tenía hambre de gloria y me equivoqué.»','«Ya estaba muriéndose. Le hice un favor.»'],
  aldea:['«Llamaste a Thor contra una aldea de gigantes que no quería pelear. ¿Lo sabías?»','«Lo supe tarde. Y me pesa cada día.»','«Thor actuó solo. Yo no tuve nada que ver.»'],
  oro:['«Llevas encima oro maldito. ¿Por qué lo cogiste?»','«Porque brillaba, y quise tenerlo.»','«No sabía que estaba maldito.»'],
  saqueo:['«Saqueaste la tumba de un rey muerto. ¿Por qué?»','«Por codicia. Simple y vulgar codicia.»','«Los muertos no necesitan plata.»'],
  thrym:['«Le preguntaste a Thrym qué ganarías si te unías a los gigantes. ¿Lo pensaste en serio?»','«Un instante. Solo un instante. Pero lo pensé.»','«Era una pregunta para engañarle.»'],
  arbol:['«Pediste que te bajaran del Árbol antes de tiempo. ¿Por qué?»','«Porque tuve miedo. Mucho miedo.»','«Porque Odín me lo pidió.»'],
  miedo:['«Has hecho muchas cosas. ¿De cuál de ellas te avergüenzas?»','«De haber tenido miedo de morir en la cama. De haber aceptado un trato por miedo.»','«De ninguna.»']
};
GEN.c4_h2=()=>({t:[
  'Heimdal te mira sin parpadear. Sus dientes son de oro, y brillan cuando habla. «Segunda pregunta.»',
  PREG[peor()][0]]});
GEN.c4_heimdal_fin=()=>{const v=S.fl.verdad_h||0;return {t:[
  S.fl.pacto_loki
    ?'Heimdal no se aparta de inmediato. Te mira la mano, la que lleva la marca, y su cara se endurece. «Esa marca era de Skuld», dice. «Ahora es roja. Huele a manzana asada.» Se queda callado tanto rato que oyes cómo cae la nieve. «Pasa. Odín te ha mandado, y no contradigo a Odín. Pero te estaré mirando. Siempre.»'
    :(v>=3?'Heimdal se aparta del puente. Por primera vez, sonríe, y sus dientes de oro brillan como un amanecer. «Tres verdades», dice. «Hacía siglos que nadie me decía tres verdades seguidas. Ni siquiera los dioses.» Te pone una mano en el hombro. «Pasa, {N} de Vindvik. Y cuando suene mi cuerno, búscame.»'
      :'Heimdal se aparta del puente. «Has mentido», dice, sin enfado. «Todos mienten. Yo lo oigo todo, hasta la hierba que crece y la lana que engorda en las ovejas. Las mentiras hacen un ruido muy feo.» Se encoge de hombros. «Pasa. Odín te ha mandado.»'),
  'Detrás de él, al final del puente, se alza Asgard: murallas de oro y piedra blanca, techos de escudos, y en el centro, más alto que todo, el salón del Valhalla con sus quinientas cuarenta puertas cerradas.']};};

GEN.c4_dardo=()=>({t:[
  'Höd está solo al borde del prado, como siempre. Ciego, no puede jugar a lanzar cosas a su hermano. Ves cómo la anciana encorvada se le acerca, le pone algo en la mano y le habla al oído. Höd sonríe, agradecido, y levanta el brazo.',
  'En su mano hay una ramita verde, afilada como un dardo. Muérdago.',
  S.fl.muerdago_visto?'Lo sabías. Lo sabías desde anoche. Tienes un instante, solo uno, antes de que Höd lance.':'Algo dentro de ti grita. No sabes por qué, pero grita. Tienes un instante, solo uno.']});

GEN.c4_funeral=()=>({t:[
  'Los dioses llevan el cuerpo de Baldr hasta la orilla del mar, donde espera su barco, Hringhorni, el más grande que se ha construido nunca. Lo cargan con sus armas, su caballo y sus tesoros. Nanna, su esposa, mira el barco, se lleva una mano al pecho y se desploma. El corazón se le ha roto de pena. La tienden junto a él.',
  'Odín sube al barco. Se inclina sobre su hijo muerto y le susurra algo al oído. Nadie oye qué. '+(S.fl.sn_alvis?'Te acuerdas de la última pregunta de Alvis, en la taberna del Yunque Sediento, y sientes un escalofrío: «Solo Odín lo sabe».':'Kraka te dice en voz baja que es la pregunta que nadie ha sabido responder nunca.'),
  (S.fl.mosca_ok||0)>=2
    ?'Luego Odín deja sobre el pecho de Baldr un anillo de oro. Lo reconoces: es el gemelo de Draupnir, el que forjaste con Brok y Eitri en Nidavellir sin dejar de manejar el fuelle mientras la mosca te picaba. Sientes algo raro en la garganta.'
    :'Luego Odín deja sobre el pecho de Baldr un anillo de oro, el gemelo de Draupnir que se forjó en Nidavellir. Uno de sus anillos sale algo torcido, como siempre. A Odín no parece importarle.']});

GEN.c4_hermod=()=>({t:[
  'Los dioses te miran. Un mortal. Un mortal vivo, que ya estuvo a punto de bajar a Hel por el camino de los muertos de paja. Alguien se ríe, pero se calla enseguida.',
  'Frigg te mira largo rato. Luego asiente. Odín se adelanta y te pone en las manos las riendas de Sleipnir. «El caballo conoce el camino», dice. «Lo ha hecho otras veces. Son nueve noches hacia el norte y hacia abajo, por valles tan oscuros que no verás nada. No te apartes del camino. Y no mires atrás.»',
  S.fl.hod_salvado
    ?'Cuando estás a punto de montar, alguien te tira de la manga. Es Höd. Te pone en la mano el caballo de madera de ocho patas que estaba tallando, ya terminado. «Para que no te pierdas», dice. «Y dile a mi hermano… dile que lo siento. Aunque no fuera culpa mía.»'
    :(S.fl.hod_muerto?'Antes de montar, pasas junto a la fuente helada. En el banco de piedra sigue el caballo de madera de ocho patas, a medio tallar. Lo coges. Nadie más lo va a querer.':'Kraka se te sube al hombro sin decir nada.'),
  '<span class=tag>Al montar, aceptas el encargo de Frigg: pedirle a Hel que devuelva a Baldr.</span>']});

registrarCapitulo({capitulo:4,parte:1,titulo:'El muérdago',escenas:{

/* ---------- Heimdal ---------- */
c4_inicio:{h:'Capítulo 4 · El Camino de Hel',cp:1,t:[
  'Sleipnir se posa al pie del Bifrost con la suavidad de una pluma. De cerca, el puente del arco iris no parece un puente: parece fuego que alguien ha convencido de quedarse quieto. Tiembla bajo tus pies como un ser vivo.',
  'En el comienzo del puente hay un hombre de pie. Es alto, muy alto, con una armadura blanca y un cuerno enorme colgado a la espalda. Tiene los ojos claros como el hielo y no parpadea. Lleva horas mirándote llegar.',
  '«Soy Heimdal», dice. «Guardo el puente. Veo de noche como de día, a cien leguas. Oigo crecer la hierba.» Te mira de arriba abajo. «Y oigo las mentiras. Te haré tres preguntas, mortal. Contesta como quieras. Yo sabré la verdad igualmente.»'],
  fx:{fl:{c4:1},hp:999},
  c:[{x:'«Pregunta»',to:'c4_h1',k:'main'}]},

c4_h1:{h:'La primera pregunta',t:[
  '«Primera pregunta», dice Heimdal. «¿Por qué quieres entrar en Asgard?»'],
  c:[{x:'«Porque quiero un sitio en el Valhalla. Por miedo a Hel.»',to:'c4_h1_v',k:'main',fx:{suma:{verdad_h:1}}},
     {x:'«Porque quiero luchar por los dioses.»',to:'c4_h1_m',k:'n'}]},

c4_h1_v:{t:['Heimdal asiente despacio. «Es verdad», dice. «Y es la verdad menos bonita que podías elegir. Por eso la creo.»'],
  fx:{gl:10},c:[{x:'Esperar la segunda pregunta',to:'c4_h2',k:'main'}]},
c4_h1_m:{t:['Heimdal ladea la cabeza, como un perro que oye algo lejos. «Eso suena bien», dice. «Pero no es verdad. O no del todo. Lo noto en cómo te late el corazón.»'],
  fx:{gl:-5},c:[{x:'Esperar la segunda pregunta',to:'c4_h2',k:'main'}]},

c4_h2:{h:'La segunda pregunta',gen:'c4_h2',t:[],
  c:[{x:'Decir la verdad',to:'c4_h2_v',k:'main',fx:{suma:{verdad_h:1}}},
     {x:'Mentir',to:'c4_h2_m',k:'n'}]},

c4_h2_v:{t:[
  'Lo dices en voz alta. Te cuesta más de lo que esperabas: hay cosas que uno no quiere oírse decir. Heimdal escucha sin juzgar, sin moverse.',
  '«Gracias», dice al final. «Pocos dicen eso en voz alta. Menos aún delante de un dios.»'],
  fx:{gl:15},c:[{x:'Esperar la tercera pregunta',to:'c4_h3',k:'main'}]},
c4_h2_m:{t:['Heimdal cierra los ojos un instante, como si le doliera la cabeza. «Ese ruido», murmura. «El ruido de una mentira. Es como una uña sobre una piedra.»'],
  fx:{gl:-10},c:[{x:'Esperar la tercera pregunta',to:'c4_h3',k:'main'}]},

c4_h3:{h:'La tercera pregunta',t:[
  'Heimdal se inclina hacia ti. Por primera vez parece realmente interesado. «Última pregunta. En la isla de Lyngvi, Loki te hizo una oferta. ¿Qué le respondiste?»'],
  c:[{x:'«Que sí.» (decir la verdad)',to:'c4_h3_pacto',k:'main',oc:1,req:{fl:'pacto_loki'},fx:{suma:{verdad_h:1}}},
     {x:'«Que no.» (mentir)',to:'c4_h3_m',k:'n',oc:1,req:{fl:'pacto_loki'}},
     {x:'«Que no.»',to:'c4_h3_v',k:'main',oc:1,req:{no:'pacto_loki'},fx:{suma:{verdad_h:1}}},
     {x:'«Que me lo pensaría.» (mentir)',to:'c4_h3_m',k:'n',oc:1,req:{no:'pacto_loki'}}]},

c4_h3_v:{t:['Heimdal suelta el aire despacio. «Es verdad», dice. «Lo sabía, pero quería oírtelo.» Mira hacia el norte, hacia Jotunheim. «Loki es mi enemigo desde antes de que existieran los hombres. Cuando llegue el final, él y yo nos mataremos el uno al otro. Lo he visto.»'],
  fx:{gl:15},c:[{x:'Esperar su veredicto',to:'c4_heimdal_fin',k:'main'}]},
c4_h3_pacto:{t:['Heimdal no se mueve. «Es verdad», dice, muy despacio. «Y has tenido el valor de decírmelo a la cara. Eso no lo esperaba.» Mira tu mano marcada. «Loki es mi enemigo desde antes de que existieran los hombres. Recuérdalo.»'],
  fx:{gl:10},c:[{x:'Esperar su veredicto',to:'c4_heimdal_fin',k:'main'}]},
c4_h3_m:{t:['Heimdal entorna los ojos. «Mentira», dice. Solo eso. Es la primera vez que suena peligroso.'],
  fx:{gl:-15,fl:{mintio_heimdal:1}},c:[{x:'Esperar su veredicto',to:'c4_heimdal_fin',k:'main'}]},

c4_heimdal_fin:{h:'El puente del arco iris',gen:'c4_heimdal_fin',t:[],
  c:[{x:'Cruzar el Bifrost',to:'c4_entrada',k:'main',oc:1,req:{min:{verdad_h:3},no:'pacto_loki'},fx:{favor:'heimdal',saga:'Respondió con la verdad a las tres preguntas de Heimdal en el puente del arco iris.'}},
     {x:'Cruzar el Bifrost',to:'c4_entrada',k:'main',oc:1,req:{max:{verdad_h:2}}},
     {x:'Cruzar el Bifrost',to:'c4_entrada',k:'main',oc:1,req:{min:{verdad_h:3},fl:'pacto_loki'},fx:{fl:{heimdal_vigila:1}}}]},

/* ---------- Asgard ---------- */
c4_entrada:{h:'Asgard',t:[
  'Asgard es todo lo que cantaban los escaldos y nada de lo que imaginabas. Las calles son de piedra blanca, los tejados de escudos dorados, y en cada esquina hay un salón más grande que el anterior. Pero hace frío, mucho frío, y los dioses que te cruzas tienen ojeras.',
  'Kraka se esconde dentro de tu capucha. «Huele igual que antes», susurra. «A hidromiel y a soberbia.»',
  'Un dios alto y rubio, con una sonrisa tan cálida que el frío parece retroceder a su alrededor, te ve desde lo alto de una escalera y baja corriendo a saludarte. «¡Un mortal! ¡Un mortal vivo, en Asgard! Padre me habló de ti.» Te estrecha las dos manos. «Soy Baldr.»'],
  fx:{fl:{asgard:1,baldr:1},t:1,saga:'Cruzó el Bifrost y entró en Asgard, la ciudad de los dioses.'},
  c:[{x:'Recorrer Asgard',to:'c4_asgard',k:'main'}]},

c4_asgard:{h:'Asgard',cp:1,mision:1,sort:1,t:[
  'Asgard está construida en terrazas alrededor del gran salón del Valhalla. Al este, Breidablik, el salón de Baldr, tan luminoso que no se puede mirar de frente. Al oeste, Fensalir, el salón de Frigg, junto a unos pantanos llenos de niebla. Al norte, Bilskirnir, el salón de Thor, con quinientas cuarenta habitaciones. En medio, el prado de Idavoll, donde los dioses se reúnen.',
  'Por todas partes hay preparativos para algo. Los dioses hablan de un juego.'],
  c:[{x:'El juego de las armas, en el prado de Idavoll (al mediodía)',to:'c4_juego',k:'main',oc:1,req:{fl:['baldr','frigg','hod'],no:'baldr_muerto'},fx:{hasta:12}},
     {x:'Breidablik, el salón de Baldr',to:'c4_breidablik',k:'main',oc:1,req:{no:'baldr_muerto'}},
     {x:'Fensalir, el salón de Frigg',to:'c4_fensalir',k:'main',oc:1,req:{no:'baldr_muerto'}},
     {x:'Un dios ciego, sentado solo junto a una fuente',to:'c4_hod',k:'main',oc:1,req:{no:'hod'}},
     {x:'Visitar a Höd',to:'c4_hod2',k:'social',oc:1,req:{fl:'hod',no:'baldr_muerto'}},
     {x:'Bilskirnir, el salón de Thor',to:'c4_thor',k:'social'},
     {x:'El huerto de Idunn',to:'c4_idunn',k:'side'},
     {x:'La casa de Eir, la sanadora',to:'c4_eir',k:'shop'},
     {x:'Las puertas del Valhalla',to:'c4_valhalla',k:'side'},
     {x:'La herrería de los einherjar',to:'c4_herreria',k:'shop'},
     {x:'Himinbjorg, la torre de Heimdal',to:'c4_heimdal_torre',k:'social',oc:1,req:{no:'heimdal_torre'}}]},

/* ---------- Baldr, Frigg y Höd ---------- */
c4_breidablik:{h:'Breidablik',t:[
  'El salón de Baldr no tiene sombras. La luz sale de las paredes, del suelo, del propio Baldr, y todo el que entra sonríe sin querer. Nanna, su esposa, teje junto al fuego.',
  'Baldr te sirve hidromiel él mismo y se sienta frente a ti. Su sonrisa se apaga un poco. «Tú casi moriste», dice. «En una cama. ¿Cómo es? Morir.»'],
  c:[{x:'Contarle la verdad: el frío, el miedo, la valquiria',to:'c4_baldr_suenos',k:'social',oc:1,req:{no:'baldr_suenos'}},
     {x:'Cambiar de tema',to:'c4_asgard',k:'n'}],
  back:'c4_asgard'},

c4_baldr_suenos:{t:[
  'Le cuentas lo del frío, el hogar que se encoge, la mujer de plata a los pies de la cama. Baldr escucha con los ojos muy abiertos, como un niño escuchando una historia de fantasmas.',
  '«Llevo semanas soñando con mi muerte», confiesa al final, en voz baja. «Cada noche. Veo un barco en llamas, y a mi madre llorando, y una sala oscura donde una mujer mitad muerta me sirve hidromiel.» Se ríe, nervioso. «Mi madre dice que no me preocupe. Ha hecho jurar a todas las cosas del mundo que no me harán daño. A todas. Al fuego, al agua, al hierro, a las piedras, a las enfermedades, a los animales…»',
  '«Mañana los dioses van a celebrarlo con un juego», añade, y vuelve a sonreír. «Me lanzarán de todo, y nada me hará daño. Ven a verlo.»'],
  fx:{fl:{baldr_suenos:1},gl:5},
  back:'c4_breidablik'},

c4_fensalir:{h:'Fensalir',t:[
  'Fensalir, el salón de Frigg, está rodeado de pantanos y niebla, y dentro huele a lana y a hierbas. Frigg, la esposa de Odín, es una diosa alta y cansada, con el pelo gris recogido y las manos siempre ocupadas en una rueca. Dicen que conoce el destino de todos, y que nunca lo cuenta.',
  '«La apuesta de Skuld», dice al verte, sin dejar de hilar. «Mi marido me ha hablado de ti. Siéntate.»'],
  c:[{x:'Preguntarle por los juramentos',to:'c4_frigg',k:'main',oc:1,req:{no:'frigg'}},
     {x:'Regresar al anochecer, cuando la niebla es más espesa',to:'c4_anciana',k:'main',oc:1,req:{fl:'frigg',no:'anciana_vista',hmin:18}},
     {x:'Regresar al anochecer (ahora es de día)',to:'c4_fensalir',k:'n',oc:1,req:{fl:'frigg',no:'anciana_vista',hmax:17}}],
  back:'c4_asgard'},

c4_frigg:{t:[
  '«Recorrí los nueve mundos», dice Frigg, y sus dedos no dejan de moverse. «Uno por uno. Hice jurar al fuego y al agua, al hierro y a todos los metales, a las piedras, a la tierra, a los árboles, a las enfermedades, a los venenos, a las bestias, a los pájaros y a las serpientes. Todos juraron no hacerle daño a mi hijo.»',
  'Te mira. Tiene los ojos de alguien que lleva mucho tiempo sin dormir. «Todos», repite. Pero sus dedos se detienen un instante sobre la rueca, solo un instante, antes de volver a hilar.',
  'Kraka, en tu hombro, también lo ha notado. Cuando salís, te lo dice al oído: «Ha dudado. Una diosa que lo sabe todo ha dudado».'],
  fx:{fl:{frigg:1}},
  back:'c4_fensalir'},

c4_anciana:{h:'La anciana de la niebla',t:[
  'Vuelves a Fensalir al anochecer. La niebla del pantano es tan espesa que apenas ves tus propias manos. Al llegar a la puerta del salón, oyes voces. Una es la de Frigg. La otra es de una mujer vieja, con una voz cascada y dulce.',
  '«¿Y a todas las cosas, señora? ¿A todas, todas?», pregunta la anciana. «A todas», responde Frigg, cansada. «Menos a una ramita de muérdago que crece al oeste del Valhalla. Era tan joven que me pareció absurdo pedirle un juramento.»',
  'La puerta se abre. Sale una anciana encorvada, envuelta en un chal gris. Pasa junto a ti sin mirarte y se pierde en la niebla. Huele a algo dulce. A manzanas asadas.'],
  fx:{fl:{anciana_vista:1}},
  c:[{x:'Seguirla en la niebla',to:'c4_seguir_ok',k:'main',chk:{s:'ast',dc:11,ok:'c4_seguir_ok',ko:'c4_seguir_ko'}},
     {x:'Seguirla: ya has visto a través de ilusiones antes',to:'c4_seguir_ok',k:'main',oc:1,req:{fl:'desenmascarado'}},
     {x:'Avisar a Frigg',to:'c4_avisar_frigg',k:'social'}]},

c4_seguir_ok:{h:'El muérdago',t:[
  'Sigues a la anciana a través de la niebla, de piedra en piedra, sin hacer ruido. Al oeste del Valhalla, junto a un roble viejo, se detiene. En una rama baja crece una mata pequeña de muérdago, verde y blanda.',
  'La anciana corta una ramita, la pela con los dedos y la afila con los dientes hasta dejarla como un dardo. Luego se endereza. Ya no está encorvada. Ya no es una anciana. Es un hombre delgado de pelo rojo, que se guarda el dardo en la manga, silba una canción y se aleja.',
  'Cuando se ha ido, cortas tú también una ramita, con cuidado. Es lo único en todo el mundo que puede matar a Baldr. Y ahora lo sabes.'],
  fx:{fl:{muerdago_visto:1},item:'ramita_muerdago',gl:15},
  c:[{x:'Volver a Asgard',to:'c4_asgard',k:'main'}]},

c4_seguir_ko:{t:[
  'La niebla te engaña. Sigues una sombra que resulta ser un árbol, luego otra que resulta ser una piedra. Cuando por fin sales del pantano, no hay rastro de la anciana.',
  'Pero te queda el olor. Manzanas asadas. Kraka está temblando. «Ya sabes quién huele así», susurra. «Ya lo sabes.»'],
  fx:{fl:{loki_sospecha:1}},
  c:[{x:'Volver a Asgard',to:'c4_asgard',k:'main'}]},

c4_avisar_frigg:{t:[
  'Entras en Fensalir y le cuentas a Frigg lo del olor a manzanas, lo de la anciana. La diosa deja de hilar. Por primera vez desde que la conoces, sus manos tiemblan.',
  '«Loki», dice. Luego sacude la cabeza, como para quitarse un mal pensamiento. «No. No puede ser. Es solo una ramita. Una ramita de muérdago no puede hacer daño a nadie.» Vuelve a hilar, más deprisa que antes. «Vete, mortal. Mañana es el juego. Mañana todo saldrá bien.»'],
  fx:{fl:{frigg_avisada:1},gl:5},
  c:[{x:'Volver a Asgard',to:'c4_asgard',k:'main'}]},

c4_hod:{h:'Höd',t:[
  'Junto a una fuente helada, sentado en un banco de piedra, hay un dios grande y fuerte, de barba castaña, con los ojos blancos como la leche. Está tallando un trozo de madera a ciegas, con mucho cuidado. Es un pájaro, y es precioso.',
  '«¿Quién anda ahí?», pregunta sin levantar la cabeza. «No eres un dios. Pisas demasiado fuerte.» Cuando le dices quién eres, sonríe. «Soy Höd. El hermano de Baldr. El que no ve.» Te ofrece el pájaro de madera. «Toma. Nadie viene nunca a hablar conmigo.»'],
  fx:{fl:{hod:1}},
  c:[{x:'Sentarte a su lado',to:'c4_hod_charla',k:'social'}]},

c4_hod_charla:{t:[
  'Höd te habla de su hermano: de cuando eran niños y Baldr le describía los colores, de lo mucho que lo quiere todo el mundo, de lo poco que le quieren a él. No lo dice con rencor. Lo dice como quien habla del tiempo.',
  '«Mañana todos le lanzarán cosas a Baldr», dice. «Es un juego. Yo no puedo jugar. No veo dónde está.» Se ríe un poco. «Me gustaría, ¿sabes? Solo una vez. Hacer algo con todos los demás.»'],
  fx:{fl:{hod_amigo:1},gl:5,saga:'Se sentó a hablar con Höd, el dios ciego, al que nadie visitaba nunca.'},
  c:[{x:'Volver a Asgard',to:'c4_asgard',k:'main'}]},

c4_hod2:{t:['Höd sigue tallando junto a la fuente. Ahora es un caballo de ocho patas. «Sleipnir», dice, orgulloso. «Lo he tocado. Me dejó.»'],back:'c4_asgard'},

/* ---------- Thor, Idunn, Eir, el Valhalla y Heimdal ---------- */
c4_thor:{h:'Bilskirnir',t:[
  'Bilskirnir es el salón más grande de Asgard y, sin duda, el más ruidoso. Thor te recibe con un abrazo que te levanta del suelo y un grito de «¡EL DE LA CABRA!» dirigido a Kraka, que se esconde. Sif, su esposa, tiene un pelo de oro que brilla como el trigo, y unos hijos, Modi y Magni, que te piden que les enseñes a pelear.',
  '«Quédate a dormir», ruge Thor. «Aquí hay quinientas cuarenta habitaciones. Alguna estará libre.»'],
  c:[{x:'Dormir en Bilskirnir (recuperación total)',to:'c4_asgard',k:'side',fx:{t:8,dormir:1}},
     {x:'Entrenar con Modi y Magni',to:'c4_modi',k:'social',oc:1,req:{no:'modi'}}],
  back:'c4_asgard'},

c4_modi:{t:[
  'Modi y Magni tienen la edad de Siri, más o menos, pero ya son más grandes que tú. Te pasas la tarde enseñándoles a esquivar, a usar el escudo, a no cargar siempre de frente como su padre. Thor lo observa todo desde la puerta con los brazos cruzados.',
  'Al final, Magni, el pequeño, te da un abrazo. «Cuando sea mayor», dice, «levantaré el martillo de mi padre.» Thor se ríe. Tú no, porque sabes que las profecías dicen exactamente eso.'],
  fx:{fl:{modi:1},gl:8},
  back:'c4_thor'},

c4_idunn:{h:'El huerto de Idunn',t:[
  'En el huerto de Idunn crecen los manzanos de oro, cuyas manzanas mantienen jóvenes a los dioses. O crecían: con el Gran Invierno, la mitad de los árboles han perdido las hojas, y las manzanas que quedan tienen manchas de escarcha.',
  'Idunn, una diosa joven de pelo castaño y ojos tristes, cuida los árboles uno por uno. «Un águila de escarcha viene cada noche y se come las manzanas que quedan», dice. «Una vez, hace mucho, un gigante disfrazado de águila me raptó a mí. Desde entonces, las águilas me dan miedo.»'],
  c:[{x:'Esperar al águila esta noche',to:'c4_f_aguila',k:'hunt',oc:1,req:{no:'aguila'}}],
  back:'c4_asgard'},

c4_f_aguila:pelea('aguila_escarcha','c4_idunn_fin','c4_asgard','A medianoche, una sombra blanca tapa las estrellas. Un águila enorme, con plumas de hielo, se lanza en picado sobre los manzanos.'),

c4_idunn_fin:{t:[
  'El águila de escarcha cae entre los manzanos y se deshace en nieve. Solo queda una pluma larga y blanca.',
  'Idunn sale de detrás de un árbol con una manzana de oro en la mano. «Para ti», dice. «Una sola. No te hará inmortal, pero te hará un poco más fuerte, para siempre.» La muerdes. Sabe a verano. A un verano de verdad, de los de antes.'],
  fx:{fl:{aguila:1},mhp:20,gl:15,saga:'Defendió el huerto de Idunn y comió una de sus manzanas de oro.'},
  back:'c4_idunn'},

c4_eir:{h:'La casa de Eir',t:[
  'Eir es la mejor sanadora de los nueve mundos. Su casa está llena de frascos, hierbas colgadas y einherjar con vendas que esperan su turno. Te mira la cara, te toca el pulso y chasquea la lengua. «Gente de arriba», dice. «Siempre tan rotos.»'],
  shop:'eir',
  c:[{x:'Usar el caldero de Eir',to:'c4_caldero',k:'shop'},
     {x:'Pedirle que fortalezca tus runas',to:'c4_taller',k:'shop'}],
  back:'c4_asgard'},
c4_caldero:{h:'El caldero de Eir',t:['El caldero de Eir es pequeño y de plata. Todo lo que sale de él huele a menta.'],caldero:1,back:'c4_eir'},
c4_taller:{h:'Las runas de Eir',t:['«Las runas también se curan», dice Eir. «Y también se refuerzan.»'],taller:1,back:'c4_eir'},

c4_valhalla:{h:'Las puertas del Valhalla',t:[
  'El Valhalla es tan grande que no ves dónde termina. Sus paredes son de lanzas, su techo de escudos, y tiene quinientas cuarenta puertas, cada una tan ancha que podrían pasar ochocientos guerreros a la vez. Todas están cerradas.',
  'Dentro se oye un estruendo: gritos, choques de acero, carcajadas. Los einherjar luchan todo el día, mueren, y por la noche resucitan para el banquete. Así esperan el último día.',
  'Junto a una de las puertas, una valquiria de armadura dorada te mira con curiosidad. «Skuld no está aquí», dice, antes de que preguntes. «Está en otro sitio. Más abajo. Ya la verás.» Sonríe. «Todavía no te toca entrar, mortal. Pero te toca pronto.»'],
  back:'c4_asgard'},

c4_herreria:{h:'La herrería de los einherjar',t:[
  'Junto a las puertas del Valhalla hay una herrería enorme donde se reparan las armas que los einherjar rompen cada día. El herrero, un einherjar con una cicatriz que le cruza la cara, te mira el arma con respeto. «Trabajo enano», dice. «Bueno. Aquí también sabemos hacer cosas.»'],
  c:[{x:'Forjar o mejorar equipo',to:'c4_forjar',k:'shop'},
     {x:'Grabar una runa en tu arma',to:'c4_grabado',k:'shop'},
     {x:'Entrenar contra un einherjar',to:'c4_f_einherjar',k:'hunt'}],
  back:'c4_asgard'},
c4_forjar:{h:'La forja de los einherjar',t:['El fuego de esta forja no se apaga nunca. Lleva encendido desde el principio de los tiempos.'],forja:1,back:'c4_herreria'},
c4_grabado:{h:'El grabado de los einherjar',t:['El herrero graba runas como quien escribe una carta a un amigo.'],grabado:1,back:'c4_herreria'},
c4_f_einherjar:pelea('einherjar','c4_herreria','c4_herreria','Un einherjar de barba roja se planta delante de ti con una sonrisa enorme. «¡Un vivo! ¡Hace siglos que no peleo con un vivo!»'),

c4_heimdal_torre:{h:'Himinbjorg',t:[
  'Heimdal vive en una torre junto al puente, desde donde lo ve todo. Te recibe en lo alto, mirando el horizonte.',
  '«Oigo cosas raras», dice sin volverse. «Pasos ligeros en los pantanos de Fensalir. Una voz de anciana que no es de anciana. Y una ramita que se rompe.» Te mira. «Ten los ojos abiertos mañana, mortal. Yo los tendré.»'],
  fx:{fl:{heimdal_torre:1}},
  back:'c4_asgard'},

/* ---------- El juego de las armas ---------- */
c4_juego:{h:'El juego de las armas',cp:1,t:[
  'El prado de Idavoll está lleno de dioses. Baldr, en el centro, se ríe con los brazos abiertos mientras los demás le lanzan cosas: piedras, flechas, lanzas, hachas. Todo rebota contra él sin tocarle, como si chocara contra el aire. Cada vez que algo rebota, los dioses estallan en aplausos.',
  'Thor le lanza a Mjolnir, y el martillo se detiene a un palmo de la cara de Baldr, da media vuelta y regresa a la mano de su dueño, que se ríe tanto que tiene que sentarse. Kraka, animado por el ambiente, le tira una piedrecita con el pico. Rebota. Kraka se pavonea como si hubiera matado a un gigante.',
  'Es una fiesta. Es la primera fiesta de verdad que ves desde que empezó el Gran Invierno. Y entonces ves a la anciana encorvada, al borde del prado, acercándose despacio a donde está Höd.'],
  fx:{fl:{juego:1}},
  c:[{x:'Seguir mirando',to:'c4_dardo',k:'main'}]},

c4_dardo:{h:'El dardo',gen:'c4_dardo',t:[],
  c:[{x:'Gritar: «¡Es Loki! ¡Es muérdago!»',to:'c4_grito',k:'main',oc:1,req:{fl:'muerdago_visto'}},
     {x:'Gritar: «¡Höd, no!»',to:'c4_grito',k:'main',oc:1,req:{no:'muerdago_visto'},chk:{s:'esp',dc:10,ok:'c4_grito',ko:'c4_baldr_cae'}},
     {x:'Callar: Loki es ahora tu aliado',to:'c4_complice',k:'n',oc:1,req:{fl:'pacto_loki'}}]},

c4_grito:{t:[
  'Gritas. El prado entero se vuelve hacia ti. La anciana se gira, y por un instante su cara ondula: debajo hay otra cara, delgada, de pelo rojo, sonriente. Heimdal, desde el borde del prado, ruge un nombre: «¡LOKI!»',
  'Pero es tarde. Höd ya ha lanzado. Y aunque la anciana ya no está para guiarle la mano, la ramita vuela recta, demasiado recta, como si algo la empujara. Atraviesa el aire, atraviesa la luz de Baldr, y se le clava en el pecho.',
  'Todo el mundo ha visto a Loki. Todo el mundo sabe que Höd no tenía ni idea de lo que lanzaba.'],
  fx:{fl:{loki_descubierto:1,hod_inocente:1},gl:25,saga:'En el prado de Idavoll, desenmascaró a Loki delante de todos los dioses en el momento de la muerte de Baldr.'},
  c:[{x:'Correr hacia Baldr',to:'c4_baldr_cae',k:'main'}]},

c4_complice:{t:[
  'No dices nada. La marca roja de tu mano arde, y no sabes si es de culpa o de alegría ajena.',
  'Höd lanza. La ramita vuela recta, demasiado recta, y se clava en el pecho de Baldr. Al borde del prado, la anciana se da la vuelta y, al pasar a tu lado, te guiña un ojo. Kraka no te mira. No te volverá a mirar en mucho rato.'],
  fx:{fl:{complice_baldr:1},gl:-50},
  c:[{x:'Ver lo que pasa',to:'c4_baldr_cae',k:'main'}]},

c4_baldr_cae:{h:'La muerte de Baldr',t:[
  'Baldr se queda muy quieto. Se mira el pecho, donde una ramita verde asoma entre las costillas. Mira a su alrededor, a los dioses, a su madre, como si no entendiera el chiste. Luego cae.',
  'La luz se apaga. No solo la de Baldr: la de todo Asgard. Durante un instante enorme nadie se mueve, nadie respira, nadie habla. Luego Frigg grita, y es el sonido más terrible que has oído nunca.',
  'Höd, al borde del prado, todavía con el brazo levantado, pregunta en voz baja: «¿Qué ha pasado? ¿Por qué no aplaude nadie?».'],
  fx:{fl:{baldr_muerto:1},saga:'Vio morir a Baldr, el más amado de los dioses, atravesado por una ramita de muérdago.'},
  c:[{x:'Acercarte a Höd',to:'c4_culpa',k:'main'}]},

c4_culpa:{h:'El culpable',t:[
  'Los dioses rodean a Höd. Alguien le arranca el brazo de un tirón. Alguien grita «¡asesino!». Höd no entiende nada: gira la cabeza a un lado y a otro, con los ojos blancos llenos de lágrimas, preguntando qué ha hecho.',
  'Odín llega al prado. Mira a su hijo muerto, mira a su hijo ciego, y en su único ojo hay algo que no te atreves a nombrar. Junto a él, una giganta lleva en brazos a un recién nacido: Vali, el hijo que, según la profecía, vengará a Baldr en un solo día.'],
  c:[{x:'Esperar: los dioses ya saben quién ha sido',to:'c4_hod_salvo',k:'main',oc:1,req:{fl:'loki_descubierto'}},
     {x:'Ponerte delante de Höd: «¡Fue Loki! ¡Yo lo vi!»',to:'c4_defender_ok',k:'main',oc:1,req:{no:'loki_descubierto'},chk:{s:'esp',dc:10,ok:'c4_defender_ok',ko:'c4_defender_ko'}},
     {x:'Pedir a Heimdal que diga si mientes',to:'c4_defender_ok',k:'main',oc:1,req:{no:'loki_descubierto',fav:'heimdal'}},
     {x:'No meterte',to:'c4_defender_ko',k:'n',oc:1,req:{no:'loki_descubierto'}}]},

c4_hod_salvo:{t:[
  'Nadie toca a Höd. Todos han visto a Loki. Odín se arrodilla junto a su hijo ciego y le pone una mano en la cabeza, como quien bendice a un niño. «No fue culpa tuya», le dice. Höd llora como si se le hubiera roto algo por dentro.',
  'La giganta que lleva a Vali se da la vuelta y se va. Hoy no habrá venganza. Hoy no. Kraka suspira en tu hombro. «Bien hecho», susurra. «Muy bien hecho.»'],
  fx:{fl:{hod_salvado:1},gl:30,saga:'Gracias a su testimonio, nadie culpó al ciego Höd de la muerte de Baldr.'},
  c:[{x:'Esperar al funeral',to:'c4_funeral',k:'main'}]},

c4_defender_ok:{t:[
  'Te pones delante de Höd con los brazos abiertos. Los dioses se detienen. «¡Fue Loki!», gritas. «¡Disfrazado de anciana! Le sonsacó a Frigg lo del muérdago y le puso la ramita en la mano. ¡Höd no sabía lo que lanzaba!»',
  'Heimdal se adelanta. «Dice la verdad», declara. «Lo oigo.» Odín se queda mirando a Höd un largo rato. Luego se arrodilla a su lado y le pone una mano en la cabeza. «No fue culpa tuya», le dice. La giganta que lleva a Vali se da la vuelta y se va.'],
  fx:{fl:{hod_salvado:1},gl:40,saga:'Se interpuso entre los dioses y el ciego Höd, y lo salvó de una venganza injusta.'},
  c:[{x:'Esperar al funeral',to:'c4_funeral',k:'main'}]},

c4_defender_ko:{t:[
  'No consigues hacerte oír entre los gritos. O no lo intentas. Los dioses se llevan a Höd a rastras, y él no se resiste: no entiende nada, y lo que no se entiende no se puede pelear.',
  'Más tarde te enterarás de lo que pasó. Vali, el recién nacido, creció en un solo día hasta ser un hombre, como decía la profecía, y esa misma noche mató a Höd sin lavarse las manos ni peinarse. Nadie se lo impidió. Junto a la fuente helada, en un banco de piedra, queda un caballo de madera de ocho patas, a medio tallar.'],
  fx:{fl:{hod_muerto:1}},
  c:[{x:'Esperar al funeral',to:'c4_funeral',k:'main'}]},

/* ---------- El funeral ---------- */
c4_funeral:{h:'Hringhorni',gen:'c4_funeral',t:[],
  c:[{x:'Ayudar a botar el barco',to:'c4_hyrrokkin',k:'main'}]},

c4_hyrrokkin:{h:'La giganta del lobo',t:[
  'Hringhorni es tan pesado que los dioses no consiguen moverlo. Thor empuja hasta que se le hinchan las venas del cuello. Nada. Al final, Odín manda llamar a una giganta de Jotunheim que tiene fama de fuerte: Hyrrokkin.',
  'Llega montada en un lobo gigante, con unas víboras por riendas. Se baja, se escupe en las manos, pone un hombro contra la proa y empuja. El barco sale disparado hacia el agua con tanta fuerza que saltan chispas de los rodillos y tiembla la tierra entera.',
  'Thor, furioso porque una giganta ha hecho lo que él no ha podido, levanta el martillo contra ella. Los demás dioses tienen que sujetarlo entre cuatro. Kraka se tapa la cara con un ala. «Thor», susurra. «Siempre Thor.»'],
  c:[{x:'Mirar cómo arde el barco',to:'c4_pira',k:'main'}]},

c4_pira:{h:'La pira',t:[
  'Thor bendice la pira con Mjolnir, y el fuego prende. Hringhorni se aleja mar adentro envuelto en llamas, con Baldr y Nanna dentro, con su caballo, sus armas y sus tesoros. Los dioses lo miran irse en silencio. Hasta los gigantes que han venido al funeral, que son muchos, bajan la cabeza.',
  'Cuando el barco ya es solo un punto rojo en el horizonte gris, Frigg se vuelve hacia los dioses. Tiene los ojos secos, como si ya hubiera llorado todo lo que tenía que llorar.',
  '«Quien quiera ganarse mi amor y mi gratitud para siempre», dice, «que cabalgue hasta el reino de Hel y le pregunte qué rescate quiere por devolver a Baldr a Asgard.»'],
  fx:{saga:'Vio arder el barco funerario de Baldr, Hringhorni, en el mar gris.'},
  c:[{x:'Dar un paso al frente: «Iré yo»',to:'c4_hermod',k:'main'}]},

c4_hermod:{h:'El jinete',cp:1,gen:'c4_hermod',t:[],
  fx:{fl:{hermod:1},gl:30,saga:'Se ofreció a cabalgar hasta el reino de Hel para rescatar a Baldr.'},
  c:[{x:'Montar en Sleipnir',to:'c4_partida',k:'main'}]},

c4_partida:{h:'Hacia el norte',t:[
  'Sleipnir arranca. Asgard queda atrás: el Valhalla, el prado de Idavoll, el humo del funeral. El Bifrost brilla un momento bajo tus pies y luego desaparece, y delante solo hay oscuridad, un camino que baja y baja y un frío que no es el frío del invierno, sino otro más antiguo.',
  'Kraka se aprieta contra tu cuello. «Ya estuviste a punto de ir por este camino una vez», dice. «En tu cama. ¿Te acuerdas?» Te acuerdas. «Pues esta vez vas a caballo», dice Kraka. «Y conmigo. Es una mejora.»'],
  fx:{fl:{c4p1fin:1},t:4},
  c:[{x:'Cabalgar hacia la oscuridad',to:'c4_p2',k:'main'}]}

}});
})();
