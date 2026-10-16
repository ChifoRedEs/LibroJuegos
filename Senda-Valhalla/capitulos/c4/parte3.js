/* =====================================================================
   Capítulo 4 · El Camino de Hel
   Parte 3 · «Todas las cosas lloran»
   Eljudnir: Baldr, Nanna (y Höd) y Hel. La condición: que todo llore.
   El viaje de las lágrimas por los nueve mundos (Vindvik, Nidavellir,
   las raíces, Jotunheim y el Bosque de Hierro), la giganta Thokk, la
   captura de Loki en la cascada de Franang y su castigo bajo la tierra.
   Final del capítulo: c4_fin.
   Lágrimas: contador «lagrimas» + marcas llora_* de la Parte 2 + 5 de los dioses.
   Sustituye la escena provisional c4_p3 de la Parte 2.
   ===================================================================== */
(()=>{
const pelea=(e,win,flee,t)=>({t:[t],f:{e,win,lose:'muerte',flee}});

/* ---------- Datos nuevos ---------- */
Object.assign(OBJ,{
  anillo_baldr:{n:'El anillo de Baldr',tipo:'clave',d:'El gemelo de Draupnir que ardió en la pira. Baldr te lo dio para que se lo devolvieras a Odín.'},
  lienzo_nanna:{n:'El lienzo de Nanna',tipo:'clave',d:'Un lienzo de lino tejido por Nanna en el reino de Hel, para Frigg.'}
});
Object.assign(ENEMIGOS,{
  lobo_hierro:{n:'Lobo del Bosque de Hierro',cat:'Bestia de Jarnvid',hp:235,a:31,gl:30,o:0,l:{colmillo_hierro:.5,piel_lobo:1}}
});

registrarSenales({
  50:'Dicen que en todos los rincones del mundo las piedras sudan, como si quisieran llorar y no supieran cómo.',
  53:'La tierra tiembla. Muy hondo, algo se retuerce.'
},S=>S.fl.c4p2fin&&!S.fl.c5);

const VIAJES=['v_vindvik','v_nidavellir','v_raices','v_jotunheim','v_hierro'];
const visitas=S=>VIAJES.filter(k=>S.fl[k]).length;
const lagrimas=S=>(S.fl.lagrimas||0)+['llora_padre','llora_einar','llora_fafnir','llora_durin','llora_hod','llora_hrungnir'].filter(k=>S.fl[k]).length+5;

registrarMision(S=>{
  if(!S.fl.c4p2fin)return null;
  if(!S.fl.condicion)return 'Entra en el salón de Eljudnir y habla con Hel.';
  if(!S.fl.thokk)return `Pide lágrimas por Baldr en los nueve mundos (${visitas(S)} de 5 lugares; ${lagrimas(S)} lágrimas).`+(visitas(S)>=4?' Hay una cueva en Jotunheim donde nadie ha preguntado todavía.':'');
  if(!S.fl.atadura)return 'Captura a Loki.';
  if(!S.fl.c4fin)return 'Vuelve a Asgard.';
  return S.fl.c5?null:'Capítulo 4 completado. La senda continúa en el Capítulo 5: El Crepúsculo.';
});

/* ---------- Textos variables ---------- */
GEN.c4_baldr_hel=()=>({t:[
  'En el sitial más alto del salón, junto a Hel, está sentado Baldr. Ya no brilla. Está pálido y tranquilo, con una copa de hidromiel delante que no ha tocado. Nanna, a su lado, le sujeta la mano.',
  'Al verte, Baldr se levanta, y por un instante su cara se ilumina como antes. «¡Has venido!», dice. «Has venido hasta aquí. Por mí.» Se ríe, incrédulo. «Ni siquiera mi padre ha venido.»',
  S.fl.hod_h?'Junto a él, en un banco bajo, está Höd, con el caballo de madera en las manos. Los dos hermanos están sentados hombro con hombro. Baldr te mira y asiente: ya se han dicho lo que tenían que decirse.'
   :(S.fl.hod_salvado?'Le das el mensaje de Höd: que lo siente, que no lo sabía. Baldr cierra los ojos. «Dile que lo sé», dice. «Dile que siempre lo supe. Y que le guardo un sitio aquí, a mi lado, para cuando le toque. Que no tenga prisa.»'
   :'Le preguntas por Höd. Baldr sonríe con tristeza. «Lo sé todo», dice. «Aquí abajo se sabe todo, tarde.»')]});

GEN.c4_hel=()=>({t:[
  'Hel se levanta de su trono, y por primera vez la ves entera. La mitad izquierda de su cuerpo es la de una mujer joven y hermosa, de piel clara y pelo negro, con los ojos amarillos de su madre Angrboda. La mitad derecha es un cadáver: piel azulada, carne muerta, un ojo blanco y sin vida.',
  'Te mira con los dos ojos a la vez. «Tú», dice, con dos voces que hablan al mismo tiempo, una cálida y otra helada. «Tú ibas a ser mí{o|a}. Una noche de fiebre, en una cama de Vindvik. Ya te tenía. Y vino Skuld y te llevó.»',
  S.fl.pacto_loki?'Se fija en tu mano. «Y ahora llevas el hilo de mi padre», dice, y su voz cálida sonríe mientras la helada no. «Qué familia tan curiosa estamos haciendo.»'
   :(S.fl.fenrir_amigo?'Se acerca un poco más y te huele, como hacía su hermano. «Hueles a mi madre», dice. «Y a mi hermano el lobo. Fuiste amable con él.» Se queda pensativa. «Nadie es amable con mi familia.»':'Kraka se esconde detrás de tu cabeza. Hel lo mira y sonríe con su media boca viva. «A los cuervos no los quiero», dice. «Están muy flacos.»')]});

GEN.c4_vindvik=()=>({t:[
  'Sleipnir te deja en la colina sobre Vindvik al atardecer. El salón del jarl está reconstruido, con vigas nuevas. Sale humo de las chimeneas. Los barcos siguen varados en el fiordo helado.',
  S.fl.sin_recuerdos
    ?'Una muchacha sale corriendo de la cabaña de la völva y se te echa encima gritando tu nombre. Es alta, con el pelo trenzado y los ojos enrojecidos. No sabes quién es. Lo intentas con todas tus fuerzas y no lo sabes. Ella lo ve en tu cara, y se queda muy quieta. «Soy Siri», dice al fin, en voz baja. «Tu sobrina.»'
    :'Una muchacha sale corriendo de la cabaña de la völva y se te echa encima gritando tu nombre. Es Siri. Ha crecido. Tiene la cara más delgada, las manos manchadas de hierbas y los ojos de su padre. Llora y se ríe a la vez.',
  'Toda Vindvik se reúne en el salón para escucharte: Hakon, Eyvind, Groa, Gunnar el herrero, la vieja Hild'+(S.fl.dar?', Gudrun y la pequeña Thora':'')+'. Les cuentas lo de Baldr, lo de Hel, lo de las lágrimas. Se hace un silencio enorme.',
  'Y luego Siri llora. No por Baldr, al que no conoce: por ti, por todo lo que te ha pasado. Y detrás de ella llora Groa, y Hakon, y Eyvind, y todo el salón. Kraka también. Kraka dice que no, pero también.']});

GEN.c4_nidavellir=()=>({t:[
  'En Nidavellir, las forjas se detienen cuando entras. Brok y Eitri dejan los martillos. Hreidmar sale de su casa. Te escuchan en silencio, rodeados de cientos de enanos.',
  S.fl.regin_anillo
    ?'Regin no ha venido. Está en su casa, encerrado, con el anillo de Andvari. Cuando vas a buscarlo, abre la puerta solo un palmo. Tiene los ojos de Fafnir. «¿Llorar?», dice. «¿Por un dios? Los dioses mataron a mi hermano Otr. Que lloren ellos.» Y cierra la puerta.'
    :'Regin se adelanta el primero, y llora sin vergüenza, con la barba empapada. Luego lloran Brok, Eitri, Hreidmar y toda la ciudad, y el ruido de los martillos se convierte en el ruido de miles de enanos sonándose la nariz.',
  'Brok te pone una mano en el hombro antes de que te vayas. «Lloramos por Baldr», gruñe. «Pero si algún día te toca a ti, lloraremos más.»']});

GEN.c4_raices=()=>({t:[
  'Ratatosk te recibe en el cruce de las raíces con un chillido de alegría. «¡Mi {mejor amigo|mejor amiga}! ¿Llorar por Baldr? ¡Claro! ¡Y se lo diré al águila, y el águila llorará, porque al águila le encanta llorar en público!» Se va trepando a toda velocidad.',
  S.fl.dain_salvado?'En el bosque de raíces, Dain, el ciervo al que curaste, levanta la cabeza al verte. De sus ojos negros caen dos lágrimas grandes como piedras. Los otros tres ciervos lloran con él.'
   :(S.fl.dain_muerto?'En el bosque de raíces, los tres ciervos que quedan te miran desde lejos. No se acercan. No lloran. Recuerdan a Dain.':'En el bosque de raíces, los cuatro ciervos del Árbol escuchan tu ruego en silencio. Luego bajan la cabeza y lloran, despacio, como llueve en primavera.'),
  'Más abajo, desde la cueva del manantial helado, llega la voz de Nidhogg, que lo ha oído todo gracias a la ardilla. «¿Llorar por Baldr?», se ríe el dragón. «Yo me como a los muertos. Lloraré cuando se me acaben.»']});

GEN.c4_jotunheim=()=>({t:[
  S.fl.aldea_destruida
    ?'La aldea de Bergelmir sigue en ruinas. Los gigantes han levantado chozas de piedra entre los escombros. Cuando te ven llegar, se quedan muy quietos. Bergelmir sale a recibirte, con los ojos fríos. «¿Llorar por un dios?», dice. «Un dios destruyó nuestras casas. No, pequeñ{o|a}. Hoy no lloraremos por ninguno.»'
    :'La aldea de Bergelmir'+(S.fl.aldea_huida?', reconstruida a la orilla del lago tras volver de los escondites de Skadi,':'')+' te recibe con gritos de alegría. Ymma, que ha crecido medio palmo de gigante, te coge en brazos como a un muñeco. Cuando les cuentas lo de Baldr, Bergelmir se queda pensativo. «Los dioses nos ahogaron una vez», dice. «Pero tú nos salvaste. Lloraremos por tu dios, pequeñ{o|a}. Por ti.» Y lloran, todos, con lágrimas del tamaño de manzanas.',
  'En Thrymheim, en lo alto de las montañas, Skadi te escucha con los brazos cruzados. «Los dioses mataron a mi padre», dice.']});

registrarCapitulo({capitulo:4,parte:3,titulo:'Todas las cosas lloran',escenas:{

/* ---------- Eljudnir ---------- */
c4_p3:{h:'Eljudnir',cp:1,t:[
  'El salón de Hel es enorme, húmedo y frío. Las paredes rezuman agua. En la mesa principal, los platos se llaman Hambre y los cuchillos se llaman Inanición, y lo sabes porque tienen los nombres grabados. Las cortinas, grises y pesadas, se llaman Desgracia Resplandeciente.',
  'Los muertos están sentados en bancos largos, comiendo despacio una comida que no alimenta. Nadie habla. Nadie llora. Aquí no pasa nada.',
  'Ganglati, el sirviente, termina por fin de girarse y te hace una reverencia que dura casi una hora. Kraka aprovecha para echarse una siesta.'],
  fx:{t:1},
  c:[{x:'Buscar a Baldr',to:'c4_baldr_hel',k:'main'}]},

c4_baldr_hel:{h:'Baldr',gen:'c4_baldr_hel',t:[],
  c:[{x:'Volverte hacia el trono',to:'c4_hel',k:'main'}]},

c4_hel:{h:'Hel',gen:'c4_hel',t:[],
  c:[{x:'Mirarla a la cara: a las dos mitades',to:'c4_hel_respeto',k:'main'},
     {x:'Mirar solo su mitad viva',to:'c4_hel_miedo',k:'n'},
     {x:'«Devuélveme a Baldr, cadáver.»',to:'c4_hel_insulto',k:'n'}]},

c4_hel_respeto:{t:[
  'La miras a la cara. A la mitad hermosa y a la mitad muerta, por igual, sin apartar la vista. Es difícil. Es lo más difícil que has hecho en todo el viaje, más que mirar a Nidhogg o a Fenrir.',
  'Hel se queda inmóvil. Luego, muy despacio, su media boca viva sonríe, y su media boca muerta también lo intenta. «Nadie me mira así», dice. «Ni los dioses, ni los muertos. Ni mi padre.» Se sienta en el trono. «Te escucho, mortal.»'],
  fx:{fl:{hel_respeto:1},gl:25,saga:'Miró a Hel a la cara, a su mitad viva y a su mitad muerta, sin apartar la vista.'},
  c:[{x:'Pedirle que devuelva a Baldr',to:'c4_condicion',k:'main'}]},

c4_hel_miedo:{t:[
  'Miras solo su mitad hermosa. Es inevitable. Hel lo nota, porque todo el mundo hace lo mismo. Su ojo vivo se entristece un poco; el muerto no cambia.',
  '«Como todos», dice. «Bueno. Habla.»'],
  fx:{fl:{hel_miedo:1}},
  c:[{x:'Pedirle que devuelva a Baldr',to:'c4_condicion',k:'main'}]},

c4_hel_insulto:{t:[
  'Hel no se enfada. Se ríe, con sus dos voces, y la risa hace temblar las paredes húmedas del salón. «Cadáver», repite. «Sí. La mitad. La otra mitad recordará que lo has dicho.»',
  'Kraka te pellizca la oreja con tanta fuerza que te hace sangre.'],
  fx:{fl:{hel_insulto:1},gl:-20},
  c:[{x:'Pedirle que devuelva a Baldr',to:'c4_condicion',k:'main'}]},

c4_condicion:{h:'La condición',t:[
  'Le cuentas a Hel todo: el muérdago, el juego, la pena de Frigg, el luto de Asgard. Le dices que todos los dioses lloran por Baldr, que el mundo entero está triste sin él.',
  'Hel escucha con la barbilla apoyada en la mano viva. «¿Todo el mundo?», pregunta al final. «¿De verdad? Me gustaría verlo.» Se endereza. «Muy bien. Si todas las cosas del mundo, vivas y muertas, lloran por Baldr, lo devolveré a Asgard. Pero si una sola cosa se niega, si una sola deja de llorar, Baldr se queda conmigo.»',
  'Mira a Baldr, a su lado. Algo en su cara cambia, muy poco. «Es buena compañía», añade, más bajo. «Aquí abajo no hay muchos que sonrían.»'],
  fx:{fl:{condicion:1}},
  c:[{x:'Despedirte de Baldr',to:'c4_regalos',k:'main'}]},

c4_regalos:{h:'Regalos para Asgard',t:[
  'Baldr te acompaña hasta la puerta del salón. Se quita del dedo el anillo de oro que ardió con él en la pira, el gemelo de Draupnir, y te lo pone en la mano. «Para mi padre», dice. «Que sepa que no lo olvido.»',
  'Nanna te da un lienzo de lino blanco, tejido aquí abajo con hilos grises. «Para Frigg», dice. «Dile que aquí también se teje.»',
  'Baldr te abraza. Está frío, muy frío, pero el abrazo es cálido. «Si no funciona», susurra, «no pasa nada. Después del fin volveré. Lo he visto en sueños: un mundo nuevo, verde, saliendo del mar. Allí nos veremos.»'],
  fx:{item:{anillo_baldr:1,lienzo_nanna:1},saga:'Baldr le entregó en el reino de Hel su anillo para Odín, y Nanna un lienzo para Frigg.'},
  c:[{x:'Salir del reino de Hel',to:'c4_salida',k:'main'}]},

c4_salida:{h:'La salida',t:[
  'Sleipnir salta de nuevo la reja de Helgrind, esta vez hacia fuera. Garm os ve pasar y no se mueve. Al otro lado del Gjoll, en la llanura de los que esperan, los muertos que conociste levantan la cabeza al verte.',
  'Cabalgas nueve noches hacia arriba. Cuando por fin ves el cielo gris del Gran Invierno, se te saltan las lágrimas. Kraka dice que es por el viento. Tú no dices nada.',
  'En Asgard, los dioses ya han enviado mensajeros a los nueve mundos para pedir que todas las cosas lloren por Baldr: el fuego, el hierro, las piedras, los árboles, las bestias. Pero hay sitios donde solo te escucharán a ti.'],
  fx:{t:72,hp:999},
  c:[{x:'Emprender el viaje de las lágrimas',to:'c4_lagrimas',k:'main'}]},

/* ---------- El viaje de las lágrimas: centro de la Parte 3 ---------- */
c4_lagrimas:{h:'El viaje de las lágrimas',cp:1,mision:1,sort:1,t:[
  'Sleipnir puede llevarte a cualquier rincón de los nueve mundos en un día. Por todas partes, las cosas lloran por Baldr: la escarcha de los árboles gotea, las piedras sudan, el hierro se empaña. Es extraño y hermoso, como si el mundo entero tuviera fiebre.',
  'Pero hay gente a la que solo tú puedes pedírselo. Gente que conociste en tu camino.'],
  c:[{x:'La cueva de la giganta Thokk, en Jotunheim',to:'c4_thokk',k:'main',oc:1,req:{min:{viajes:4},no:'thokk'}},
     {x:'Vindvik',to:'c4_vindvik',k:'main',oc:1,req:{no:'v_vindvik'},fx:{t:24}},
     {x:'Nidavellir, bajo la montaña',to:'c4_nidavellir',k:'main',oc:1,req:{no:'v_nidavellir'},fx:{t:24}},
     {x:'Las raíces de Yggdrasil',to:'c4_raices',k:'main',oc:1,req:{no:'v_raices'},fx:{t:24}},
     {x:'Jotunheim: la aldea de Bergelmir y Thrymheim',to:'c4_jotunheim',k:'main',oc:1,req:{no:'v_jotunheim'},fx:{t:24}},
     {x:'El Bosque de Hierro',to:'c4_hierro',k:'main',oc:1,req:{no:'v_hierro'},fx:{t:24}},
     {x:'Descansar en Bilskirnir, en Asgard',to:'c4_lagrimas',k:'side',fx:{t:8,dormir:1}}]},

c4_vindvik:{h:'Vindvik',gen:'c4_vindvik',t:[],
  c:[{x:'Abrazar a Siri',to:'c4_siri',k:'main',oc:1,req:{no:'sin_recuerdos'},fx:{fl:{v_vindvik:1},suma:{viajes:1,lagrimas:5}}},
     {x:'Abrazar a la muchacha que dice ser tu sobrina',to:'c4_siri',k:'main',oc:1,req:{fl:'sin_recuerdos'},fx:{fl:{v_vindvik:1},suma:{viajes:1,lagrimas:5}}}]},

c4_siri:{h:'Siri',t:[
  'Esa noche te quedas en tu vieja casa. Siri te prepara gachas, como antes, y se sienta frente a ti a verte comer, como si temiera que fueras a desaparecer.',
  'Le cuentas cosas: la forja de los enanos, los juegos de Utgard, el Árbol, el reino de Hel. Ella escucha con la misma cara seria con la que escuchaba de niña. Cuando le hablas de Einar, en la llanura de los muertos, se le llenan los ojos de lágrimas.',
  '«Volverás», dice al final. No es una pregunta. «Esta vez también.» Y por primera vez desde que la conoces, no sabes qué contestarle.'],
  fx:{t:8,dormir:1,saga:'Volvió a Vindvik a pedir lágrimas por Baldr, y todo el pueblo lloró.'},
  c:[{x:'Volver a montar en Sleipnir',to:'c4_lagrimas',k:'main'}]},

c4_nidavellir:{h:'Nidavellir',gen:'c4_nidavellir',t:[],
  c:[{x:'Despedirte de los enanos',to:'c4_lagrimas',k:'main',oc:1,req:{no:'regin_anillo'},fx:{fl:{v_nidavellir:1},suma:{viajes:1,lagrimas:4}}},
     {x:'Despedirte de los enanos',to:'c4_lagrimas',k:'main',oc:1,req:{fl:'regin_anillo'},fx:{fl:{v_nidavellir:1,niega_regin:1},suma:{viajes:1,lagrimas:3}}}]},

c4_raices:{h:'Las raíces de Yggdrasil',gen:'c4_raices',t:[],
  c:[{x:'Volver a montar en Sleipnir',to:'c4_lagrimas',k:'main',oc:1,req:{no:'dain_muerto'},fx:{fl:{v_raices:1,niega_nidhogg:1},suma:{viajes:1,lagrimas:3}}},
     {x:'Volver a montar en Sleipnir',to:'c4_lagrimas',k:'main',oc:1,req:{fl:'dain_muerto'},fx:{fl:{v_raices:1,niega_nidhogg:1,niega_ciervos:1},suma:{viajes:1,lagrimas:2}}}]},

c4_jotunheim:{h:'Jotunheim',gen:'c4_jotunheim',t:[],
  c:[{x:'Esperar la respuesta de Skadi',to:'c4_skadi',k:'main',oc:1,req:{no:'aldea_destruida'},fx:{fl:{v_jotunheim:1},suma:{viajes:1,lagrimas:3}}},
     {x:'Esperar la respuesta de Skadi',to:'c4_skadi',k:'main',oc:1,req:{fl:'aldea_destruida'},fx:{fl:{v_jotunheim:1,niega_gigantes:1},suma:{viajes:1}}}]},

c4_skadi:{h:'Skadi',t:[
  'Skadi se queda mirando las montañas un largo rato. El viento le revuelve las trenzas negras.'],
  c:[{x:'Esperar',to:'c4_skadi_llora',k:'main',oc:1,req:{fav:'skadi'}},
     {x:'Esperar',to:'c4_skadi_no',k:'main',oc:1,req:{nofav:'skadi'}}]},

c4_skadi_llora:{t:[
  '«Cazamos juntas», dice al fin. «Al Oso de Escarcha. Eso vale algo.» Una sola lágrima le corre por la mejilla y se congela antes de caer. «Una. No te acostumbres.»',
  'Antes de que te vayas, añade, sin mirarte: «Y si alguna vez encontráis al culpable de esto, avisadme. Tengo una serpiente en mi cueva que lleva tiempo sin nada que hacer».'],
  fx:{suma:{lagrimas:1},fl:{skadi_serpiente:1}},
  c:[{x:'Volver a montar en Sleipnir',to:'c4_hrimfaxi',k:'main',oc:1,req:{fl:'ehwaz'}},
     {x:'Volver a montar en Sleipnir',to:'c4_lagrimas',k:'main',oc:1,req:{no:'ehwaz'}}]},

c4_skadi_no:{t:[
  '«No», dice Skadi. «No te debo nada, y a ellos menos.» Se da la vuelta y se mete en su salón sin decir adiós.'],
  fx:{fl:{niega_skadi:1}},
  c:[{x:'Volver a montar en Sleipnir',to:'c4_hrimfaxi',k:'main',oc:1,req:{fl:'ehwaz'}},
     {x:'Volver a montar en Sleipnir',to:'c4_lagrimas',k:'main',oc:1,req:{no:'ehwaz'}}]},

c4_hrimfaxi:{h:'El rocío',t:[
  'Al bajar de las montañas, en el río helado donde lo encontraste, un caballo negro con la crin de escarcha te espera. Hrimfaxi. Te reconoce, se acerca y apoya su frente contra la tuya, como aquella noche.',
  'Le cuentas lo de Baldr. El caballo de la Noche cierra sus ojos de plata, y de su crin empieza a caer una espuma blanca y fina que cubre la hierba congelada. Kraka te lo explica en voz baja: «La espuma de Hrimfaxi es el rocío de la mañana. Cada amanecer del mundo, desde siempre». Esta noche, todo el rocío del mundo son lágrimas.'],
  fx:{suma:{lagrimas:2},gl:10,saga:'Hrimfaxi, el caballo de la Noche, convirtió todo el rocío del mundo en lágrimas por Baldr.'},
  c:[{x:'Volver a montar en Sleipnir',to:'c4_lagrimas',k:'main'}]},

c4_hierro:{h:'El Bosque de Hierro',t:[
  'El Bosque de Hierro está al este de Jotunheim: árboles negros con hojas de metal que tintinean con el viento, y lobos por todas partes. Aquí nacen los lobos que persiguen al sol y a la luna. Aquí nació Fenrir.',
  'Antes de llegar a la cabaña de Angrboda, una manada te corta el paso.'],
  c:[{x:'Abrirte paso',to:'c4_f_lobos_hierro',k:'hunt',oc:1,req:{no:'fenrir_amigo'}},
     {x:'Enseñarles el colmillo de Angrboda',to:'c4_angrboda',k:'main',oc:1,req:{item:'colmillo_hierro'}},
     {x:'Avanzar sin miedo: Fenrir te perdonó la vida',to:'c4_angrboda',k:'main',oc:1,req:{fl:'fenrir_amigo',no:'colmillo_hierro'}}]},

c4_f_lobos_hierro:pelea('lobo_hierro','c4_angrboda',null,'El lobo más grande de la manada, negro como el hierro, se lanza contra Sleipnir.'),

c4_angrboda:{h:'Angrboda',t:[
  'La cabaña de Angrboda está hecha de huesos de lobo y hojas de hierro. La vieja te recibe sentada junto al fuego, con sus ojos amarillos brillando en la penumbra.',
  '«Me pides que llore por el hijo de Odín», dice. «Odín me quitó a mis tres hijos. Encadenó a uno, tiró a otra al mar y mandó a la tercera a gobernar a los muertos. ¿Alguien lloró por ellos?»'],
  c:[{x:'Esperar su respuesta',to:'c4_angrboda_llora',k:'main',oc:1,req:{fl:['fenrir_amigo','hel_respeto']}},
     {x:'Esperar su respuesta',to:'c4_angrboda_no',k:'main',oc:1,req:{no:'fenrir_amigo'}},
     {x:'Esperar su respuesta',to:'c4_angrboda_no',k:'main',oc:1,req:{fl:'fenrir_amigo',no:'hel_respeto'}}]},

c4_angrboda_llora:{t:[
  'Angrboda se queda en silencio mucho rato. «Fuiste amable con mi lobo», dice al fin. «Y miraste a mi hija a la cara. Mi hija me lo ha contado: aquí abajo las noticias corren deprisa.»',
  '«Una lágrima», dice. «Una sola. No por el hijo de Odín. Por ti, que te has portado como una madre querría.» Y llora.'],
  fx:{fl:{v_hierro:1},suma:{viajes:1,lagrimas:1},gl:20},
  c:[{x:'Volver a montar en Sleipnir',to:'c4_lagrimas',k:'main'}]},

c4_angrboda_no:{t:[
  '«No», dice Angrboda. «No lloraré.» Se vuelve hacia el fuego. «Pero te diré algo, ya que has venido hasta aquí. Mi hija no es mala. Está sola. Si la vuelves a ver, trátala bien.»'],
  fx:{fl:{v_hierro:1,niega_angrboda:1},suma:{viajes:1}},
  c:[{x:'Volver a montar en Sleipnir',to:'c4_lagrimas',k:'main'}]},

/* ---------- Thokk ---------- */
c4_thokk:{h:'La cueva de Thokk',cp:1,t:[
  'En lo más hondo de Jotunheim, en una cueva donde no llegan los mensajeros de los dioses, vive una giganta vieja llamada Thokk. Eres la última persona que viene a preguntarle.',
  'Está sentada en la entrada de la cueva, envuelta en un chal gris, tallando un palo con un cuchillo. Cuando le pides que llore por Baldr, se ríe.',
  '«Thokk llorará lágrimas secas por la muerte de Baldr», dice, con voz cascada. «Ni vivo ni muerto me sirvió de nada el hijo del viejo. Que Hel se quede lo que tiene.» Y sigue tallando.',
  'El chal gris. La voz cascada y dulce. Y el olor. Manzanas asadas.'],
  fx:{fl:{thokk:1}},
  c:[{x:'«Te conozco, Loki.»',to:'c4_thokk_loki',k:'main'},
     {x:'Fingir que no lo has reconocido y alejarte para protegerlo',to:'c4_thokk_pacto',k:'n',oc:1,req:{fl:'pacto_loki'}}]},

c4_thokk_loki:{h:'Loki',t:[
  'La giganta deja de tallar. Levanta la cabeza. Durante un instante, la cara arrugada de Thokk ondula como el agua, y debajo aparece otra: delgada, pelirroja, sonriente.',
  '«Siempre tan list{o|a}», dice Loki. «Bueno. Sí, soy yo. Y no lloraré. Baldr se queda abajo.» Se encoge de hombros. «Tampoco es para tanto. Volverá después del fin. Todos volveremos, de una forma o de otra.»',
  'Y antes de que puedas moverte, salta por encima de tu cabeza, se convierte en un halcón y sale volando hacia el norte. Kraka grazna como un loco. «¡La cascada!», grita. «¡Tiene una casa junto a la cascada de Franang! ¡Lo sé! ¡Lo sabe todo el mundo!»'],
  fx:{fl:{loki_thokk:1},gl:15},
  c:[{x:'Soplar el cuerno de Thor',to:'c4_persecucion',k:'main',oc:1,req:{item:'cuerno_thor'},fx:{quita:{cuerno_thor:1}}},
     {x:'Galopar a Asgard a avisar a los dioses',to:'c4_persecucion',k:'main',oc:1,req:{no:'cuerno_thor'}}]},

c4_thokk_pacto:{t:[
  'Te alejas de la cueva sin decir nada. Detrás de ti oyes una risita. «Gracias, {sobrino|sobrina}», susurra la voz de Thokk. «La familia es la familia.»',
  'Pero no eres el único que ha venido hasta aquí. Al salir del valle te cruzas con Heimdal, que lo oye todo, y con Thor, que no oye nada pero tiene muy mal genio. Heimdal te mira la mano roja y luego la cueva. No necesita preguntarte nada.'],
  fx:{fl:{loki_protegido:1},gl:-30},
  c:[{x:'Seguirlos',to:'c4_persecucion',k:'main'}]},

c4_persecucion:{h:'La cascada de Franang',t:[
  'Los dioses llegan a la cascada de Franang casi a la vez que tú: Thor, Odín, Heimdal, Tyr y muchos más, con caras de pocos amigos. Junto a la cascada hay una casa con cuatro puertas, una a cada lado, para ver venir a cualquiera. Está vacía. En el hogar todavía arde un fuego.',
  'En las cenizas hay restos de algo que estaba tejiendo: una red de pescar. «La quemó al vernos llegar», dice Odín. «Pero el dibujo se ve en las cenizas.» Thor parpadea. «¿Una red? ¿Para qué quiere Loki una red?»',
  'Kraka lo entiende antes que nadie. «¡Porque está en el agua!», grazna. «¡Se ha convertido en salmón! ¡Se esconde en la cascada y pensaba en cómo lo pescaríais, y por eso hizo la red!»'],
  c:[{x:'Tejer una red como la de las cenizas y meterte en el río',to:'c4_franang',k:'main'}]},

c4_franang:{h:'El salmón',t:[
  'Los dioses tejen una red copiando el dibujo de las cenizas. Thor se mete en medio del río y los demás arrastran la red desde la orilla. Tú vas en el centro, con el agua helada hasta el pecho, buscando un reflejo plateado entre la espuma.',
  'Lo ves. Un salmón enorme, más listo que todos los salmones del mundo, que salta por encima de la red cada vez que se acerca. Dos veces. Tres. A la cuarta, saltará hacia el mar y no volveréis a verlo.'],
  c:[{x:'Lanzarte al agua y agarrarlo',to:'c4_franang_ok',k:'main',chk:{s:'ast',dc:12,ok:'c4_franang_ok',ko:'c4_franang_ko'}},
     {x:'Congelar el río con la runa Isa justo cuando salte',to:'c4_franang_ok',k:'main',oc:1,req:{runa:'isa'},chk:{s:'esp',dc:10,ok:'c4_franang_ok',ko:'c4_franang_ko'}},
     {x:'Dejar que salte: «Que se vaya»',to:'c4_franang_libre',k:'n',oc:1,req:{fl:'pacto_loki'}}]},

c4_franang_ok:{t:[
  'El salmón salta. Tú saltas a la vez. Lo agarras con las dos manos en el aire, y el pez se retuerce con una fuerza terrible, resbaladizo como el aceite. Se te escapa entre los dedos.',
  'Pero detrás de ti está Thor. Su mano enorme se cierra sobre la cola del salmón y aprieta. Y aprieta. Y aprieta. Desde entonces, dicen los escaldos, todos los salmones del mundo tienen la cola tan estrecha.',
  'El salmón se convierte en Loki, empapado, con la cola de Thor todavía apretándole el tobillo. «Bueno», dice, escupiendo agua. «Al menos lo has intentado tú primero. Eso tiene mérito.»'],
  fx:{fl:{loki_cazado:1},gl:30,saga:'Ayudó a Thor a capturar a Loki, convertido en salmón, en la cascada de Franang.'},
  c:[{x:'Llevarlo con los dioses',to:'c4_atadura',k:'main'}]},

c4_franang_ko:{t:[
  'Te lanzas, pero el salmón es más rápido. Te esquiva, te golpea la cara con la cola y salta hacia el mar.',
  'No llega. Thor, en mitad del río, alarga la mano y lo agarra por la cola en el aire. Y aprieta. Desde entonces, dicen los escaldos, todos los salmones del mundo tienen la cola tan estrecha. El salmón se convierte en Loki, empapado y furioso.'],
  fx:{fl:{loki_cazado:1},hp:-30},
  c:[{x:'Llevarlo con los dioses',to:'c4_atadura',k:'main'}]},

c4_franang_libre:{t:[
  'Te apartas un paso. Solo uno. Y el salmón pasa justo por el hueco que has dejado, hacia el mar.',
  'No llega. Thor, en mitad del río, alarga la mano y lo agarra por la cola en el aire. Desde entonces, dicen los escaldos, todos los salmones del mundo tienen la cola tan estrecha. El salmón se convierte en Loki, que te mira con algo parecido al cariño. «Lo has intentado», susurra. «Lo he visto.»',
  'Heimdal también lo ha visto. No dice nada. No hace falta.'],
  fx:{fl:{loki_cazado:1,loki_protegido:1},gl:-20},
  c:[{x:'Seguir a los dioses',to:'c4_atadura',k:'main'}]},

/* ---------- El castigo de Loki ---------- */
c4_atadura:{h:'La cueva de las tres piedras',cp:1,t:[
  'Los dioses llevan a Loki a una cueva muy profunda, bajo la tierra. Allí ponen tres piedras planas y lo atan sobre ellas con unas ligaduras que se vuelven de hierro en cuanto rodean su cuerpo. Prefieres no saber de qué están hechas. Kraka te tapa los ojos con un ala, y no se lo impides.',
  'Luego llega Skadi. Trae en los brazos una serpiente enorme, verde y negra, y la cuelga del techo de la cueva, justo encima de la cara de Loki. De sus colmillos empieza a gotear veneno.',
  'Loki grita cuando cae la primera gota. Es un grito que no olvidarás nunca. Pero entonces entra en la cueva una mujer menuda, con un cuenco de madera en las manos, y se sienta junto a la cabeza de Loki y sostiene el cuenco bajo los colmillos de la serpiente. Es Sigyn, su esposa. Se quedará allí hasta el fin del mundo.'],
  fx:{fl:{atadura:1}},
  c:[{x:'Quedarte a mirar, en silencio',to:'c4_terremoto',k:'main'},
     {x:'Aflojar en secreto una de las ligaduras mientras nadie mira',to:'c4_ayudar_loki',k:'n',oc:1,req:{fl:'pacto_loki'}},
     {x:'Arrancarte el hilo rojo de la muñeca y tirarlo a los pies de Loki',to:'c4_romper_pacto',k:'main',oc:1,req:{fl:'pacto_loki'}}]},

c4_ayudar_loki:{t:[
  'Mientras los dioses salen de la cueva, te agachas junto a Loki como si quisieras escupirle. En lugar de eso, metes los dedos bajo una de las ligaduras y tiras. No la rompes, pero la aflojas. Un poco. Lo suficiente.',
  'Loki te mira con los ojos llenos de lágrimas de veneno. «La familia es la familia», susurra. «Me acordaré.» Sigyn te mira también, sin decir nada, con el cuenco temblando en las manos.'],
  fx:{fl:{loki_ayudado:1},gl:-40,saga:'Aflojó en secreto las ataduras de Loki en la cueva de las tres piedras.'},
  c:[{x:'Salir de la cueva',to:'c4_terremoto',k:'main'}]},

c4_romper_pacto:{h:'El hilo rojo',t:[
  'Te arrancas de la muñeca el hilo rojo que Loki te ató en la isla de Lyngvi. Duele. Duele como si te arrancaras una vena. Lo tiras a los pies de Loki, sobre la piedra.',
  'Loki te mira con una expresión que no sabes leer. Luego se ríe, entre gota y gota de veneno. «Así que al final eres de Skuld», dice. «Ella siempre gana. Siempre.»',
  'La marca de tu mano deja de arder. No vuelve a ser plateada del todo: queda de un color extraño, mitad rojo y mitad plata, como una herida mal cerrada. Pero vuelve a estar fría. Y fría es como debe estar.'],
  fx:{fl:{pacto_roto:1},gl:80,saga:'Rompió el pacto con Loki y le devolvió su hilo rojo en la cueva de las tres piedras.'},
  c:[{x:'Salir de la cueva',to:'c4_terremoto',k:'main'}]},

c4_terremoto:{h:'Los temblores',t:[
  'Al salir de la cueva, la tierra tiembla bajo tus pies. Es Loki: cada vez que Sigyn aparta el cuenco para vaciarlo, una gota de veneno le cae en la cara y se retuerce con tanta fuerza que todo el mundo se estremece. Así nacen los terremotos, dicen los escaldos. Ahora sabes que es verdad.',
  'Odín se queda un momento en la entrada, mirando hacia dentro. Luego se vuelve hacia ti. «Lo que está atado», dice, «se suelta. Siempre. El día que Loki se libere, empezará el fin.» Tiene la cara muy cansada. «No falta mucho.»'],
  c:[{x:'Volver a Asgard',to:'c4_resultado',k:'main',fx:{t:24}}]},

/* ---------- Final del capítulo ---------- */
c4_resultado:{h:'Las lágrimas',cp:1,gen:'c4_resultado',t:[],
  c:[{x:'Entregar los regalos de Baldr y de Nanna',to:'c4_regreso',k:'main',fx:{quita:{anillo_baldr:1,lienzo_nanna:1}}}]},

c4_regreso:{h:'Los regalos',t:[
  'Le das a Odín el anillo de su hijo. El Padre de Todos lo sostiene en la palma un largo rato, sin decir nada. Luego se lo pone en el dedo, y no se lo volverá a quitar.',
  'A Frigg le das el lienzo de Nanna. La diosa lo despliega, lo mira, lo dobla con cuidado y se lo lleva al pecho. «Aquí también se teje», repite, con una sonrisa muy pequeña. Es la primera vez que la ves sonreír.',
  'Esa noche, en Asgard, nadie celebra nada. Pero en algún momento, mientras miras el cielo gris desde las murallas, sientes una mano fría en el hombro. No hay nadie. Solo una voz muy lejana, que conoces, como el ruido de un huso que gira: «Ya casi, {N}. Ya casi».'],
  fx:{fl:{c4fin:1},saga:'Devolvió a Odín el anillo de Baldr y a Frigg el lienzo de Nanna.'},
  c:[{x:'Esperar al amanecer que no llega',to:'c4_fin',k:'main'}]},

c4_fin:{h:'Fin del Capítulo 4',t:[
  'El tercer invierno sin verano cae sobre los nueve mundos. Los hermanos luchan contra los hermanos. Los juramentos se rompen. En el este, el lobo Skoll persigue al sol con los colmillos cada vez más cerca, y en las profundidades de la tierra, en una cueva sin luz, una mujer sostiene un cuenco que cada vez se llena más deprisa.',
  'En Asgard, las quinientas cuarenta puertas del Valhalla siguen cerradas. Pero desde hace unos días, por las noches, si pegas la oreja a una de ellas, oyes algo detrás: una voz que dice tu nombre.',
  'Kraka está dormido en tu hombro. Lo dejas dormir. Pronto no habrá tiempo para eso.',
  '<span class=tag>Has completado el Capítulo 4: El Camino de Hel. La senda continúa en el Capítulo 5: El Crepúsculo.</span>'],
  fx:{saga:'Pasó el tercer invierno sin verano en Asgard, esperando el fin.'},
  end:'Capítulo 4 completado',saga:1}

}});

GEN.c4_resultado=()=>{const n=lagrimas(S),neg=['niega_grim','niega_fafnir','niega_hrungnir','niega_regin','niega_ciervos','niega_nidhogg','niega_gigantes','niega_skadi','niega_angrboda'].filter(k=>S.fl[k]).length;
  const NOM={niega_grim:'Grim el Tuerto',niega_fafnir:'la sombra de Fafnir',niega_hrungnir:'Hrungnir',niega_regin:'Regin',niega_ciervos:'los ciervos del Árbol',niega_nidhogg:'Nidhogg',niega_gigantes:'los gigantes de Bergelmir',niega_skadi:'Skadi',niega_angrboda:'Angrboda'};
  const lista=Object.keys(NOM).filter(k=>S.fl[k]).map(k=>NOM[k]);
  const conm=S.fl.hel_respeto&&n>=18;
  if(conm)S.fl.hel_conmovida=1;
  return {t:[
    `Contando a los dioses, a los vivos y a los muertos que conociste, ${n} voces han llorado por Baldr. ${lista.length?'Pero no todos: '+lista.join(', ').replace(/, ([^,]*)$/,' y $1')+(lista.length>1?' se negaron':' se negó')+'. Y Thokk, por supuesto. Siempre Thokk.':'Todos aquellos a los que preguntaste lloraron. Todos menos Thokk. Siempre Thokk.'}`,
    'No ha bastado. Una sola negativa bastaba, y Loki se encargó de que la hubiera. Baldr se queda en el reino de Hel.',
    conm
      ?'Pero esa noche sueñas con Eljudnir. Hel está sentada en su trono, y en su mitad viva hay lágrimas. «Nunca había visto llorar a tanta gente por nadie», te dice. «Ni por mí.» Se queda callada. «Cuando llegue el último día, mortal, mis muertos marcharán con mi padre. Pero yo me acordaré de quién me miró a la cara.»'
      :(S.fl.hel_insulto?'Esa noche sueñas con Eljudnir. Hel está sentada en su trono, mirándote solo con su mitad muerta. «Cadáver», repite, y sonríe. «Nos veremos el último día, mortal.»'
        :'Esa noche sueñas con Eljudnir. Hel te mira desde su trono, con sus dos ojos. No dice nada. Baldr, a su lado, te saluda con la mano.')]};};
})();
