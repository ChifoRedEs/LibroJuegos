/* =====================================================================
   Capítulo 5 · El Crepúsculo
   Parte 2 · «La víspera»
   Los últimos días antes del fin: despedidas de Thor y de Tyr, la prueba
   de Freya en Folkvang, el trono de Odín (Hlidskjalf), el juramento de
   la víspera, la llamada a los aliados (Kraka hace tres viajes), Siri en
   el bosque de Mímir, la última noche con Kraka, Loki libre (y su
   llamada si se conservó el pacto), el gallo rojo de Hel, el Gjallarhorn
   y la runa secreta de Skuld.
   Sustituye la escena provisional c5_p2 de la Parte 1.
   Escena de enlace provisional: c5_p3 (la sustituirá la Parte 3)
   ===================================================================== */
(()=>{
const pelea=(e,win,flee,t)=>({t:[t],f:{e,win,lose:'muerte',flee}});

/* ---------- La runa secreta de Skuld ---------- */
Object.assign(RUNAS,{
  skuld:{n:'Runa de Skuld',sym:'ᛥ',a:3,c:40,dmg:[70,90],s:'esp',crit:1,aturde:1,d:'La runa de lo que ha de ser. Corta el hilo del enemigo.'}
});
Object.assign(GRABADO,{
  skuld:{atq:10,crit:10,aturde:10,d:'+10 de ataque, +10 % de crítico y 10 % de aturdir.'}
});

/* ---------- Datos nuevos ---------- */
Object.assign(OBJ,{
  lagrima_freya:{n:'Lágrima de oro de Freya',tipo:'clave',d:'Freya llora oro por su marido perdido. Esta lágrima te la dio a ti.'},
  cinturon_thor:{n:'Hebilla de Megingjord',tipo:'clave',d:'Una hebilla del cinturón de fuerza de Thor. «Para que te acuerdes de quién te enseñó a no apartarte.»'}
});

registrarSenales({
  58:'El sol no sale. La luna no sale. Las estrellas empiezan a caer del cielo, una a una, como chispas de una forja.',
  60:'La tierra tiembla sin parar. En las profundidades, algo se ha soltado.'
},S=>S.fl.c5p1fin&&!S.fl.c5p2fin);

registrarMision(S=>{
  if(!S.fl.c5p1fin)return null;
  if(!S.fl.vispera)return 'Amanece la víspera del fin.';
  if(!S.fl.gallo_rojo){
    const p=[];
    if(!S.fl.thor_adios)p.push('Thor');
    if(!S.fl.tyr_adios)p.push('Tyr');
    if(!S.fl.folkvang)p.push('Freya');
    if(!S.fl.jur_vispera)p.push('el juramento del Valhalla');
    if(!S.fl.aliados_fin)p.push('llamar a tus aliados desde la torre de Heimdal');
    return 'Despídete y prepárate para el último día.'+(p.length?' Pendiente: '+p.join(', ').replace(/, ([^,]*)$/,' y $1')+'.':' Cuando estés listo, espera el canto del gallo rojo.');
  }
  if(!S.fl.c5p2fin)return 'Responde a la llamada del Gjallarhorn.';
  return null;
});

/* ---------- Textos variables ---------- */
GEN.c5_hlidskjalf=()=>({t:[
  'Odín te deja sentarte en Hlidskjalf, su trono, desde el que se ven los nueve mundos. Nadie más que él y Frigg se ha sentado nunca ahí. Kraka se acurruca en el brazo del trono, sin atreverse a respirar.',
  S.fl.siri_bosque
    ?'Ves el bosque de Mímir, verde en medio del invierno. Entre los árboles, junto a una hoguera pequeña, Siri enseña runas a dos jóvenes que la escuchan con mucha atención. Está a salvo.'
    :'Ves Vindvik. En la cabaña de Groa, Siri prepara ungüentos a la luz de una vela, mientras Groa duerme. De vez en cuando levanta la vista hacia el cielo negro, como si supiera que la estás mirando.',
  S.fl.aldea_destruida?'Ves las ruinas de la aldea de Bergelmir, donde los gigantes de escarcha afilan sus hachas en silencio.':'Ves la aldea de Bergelmir junto al lago. Ymma patina sobre el hielo con Copito, como si no pasara nada.',
  'Ves Nidavellir, donde todas las forjas trabajan a la vez. Ves Jotunheim, lleno de hogueras: el ejército de Thrym, cada vez más grande. Ves el Bosque de Hierro, de donde sale un lobo enorme'+(S.fl.fenrir_herido?' que cojea de una pata':'')+'. Y ves, en la orilla negra del reino de Hel, un barco gigantesco hecho de uñas de muertos, casi terminado.',
  'Odín te pone una mano en el hombro. «Esto es lo que yo veo cada noche», dice. «Ahora sabes por qué duermo tan poco.»']});

GEN.c5_loki_libre=()=>({t:[
  'La tierra se abre. No es una forma de hablar: en el patio de Asgard aparece una grieta de lado a lado, y de las profundidades sube un grito que no es humano ni divino. Es de alegría.',
  S.fl.loki_ayudado?'Loki se ha soltado. Se soltó antes de lo que nadie esperaba, porque una de sus ataduras estaba floja. Lo sabes. Lo sabes porque la aflojaste tú.':'Loki se ha soltado. Las ataduras han aguantado todo lo que tenían que aguantar, y ni un día más.',
  'Heimdal llega corriendo desde su torre. «Ya está en camino», dice. «Hacia el reino de su hija. Va a por el barco.»',
  S.fl.hel_conmovida?'Luego añade, más bajo: «Pero algo raro pasa en Hel. Hel no ha salido a recibirlo. Dicen que está sentada en su trono, mirando una lágrima que no se seca».':'']});

registrarCapitulo({capitulo:5,parte:2,titulo:'La víspera',escenas:{

/* ---------- La víspera ---------- */
c5_p2:{h:'La víspera',cp:1,t:[
  'A la mañana siguiente, si es que se puede llamar mañana a algo sin sol, Asgard está en silencio. No es el silencio de la paz: es el de una casa donde alguien está a punto de morir y todos lo saben.',
  'Los dioses se mueven despacio por las calles de piedra blanca. Thor afila a Mjolnir aunque no lo necesita. Tyr pasea solo, con la mano buena en el muñón. Freya no sale de su salón. Odín ha desaparecido. Y en el Valhalla, los einherjar beben como si no hubiera un mañana, porque no lo hay.',
  'Kraka te mira desde tu hombro. «Pocos días», dice. «Skuld dijo pocos días.» Se queda callado. «¿Qué hacemos con ellos?»'],
  fx:{fl:{vispera:1},hasta:9},
  c:[{x:'Recorrer Asgard',to:'c5_vispera',k:'main'}]},

c5_vispera:{h:'Asgard en la víspera',cp:1,mision:1,sort:1,t:[
  'Asgard está en silencio. Cada salón guarda a alguien de quien despedirse.'],
  c:[{x:'Esperar el canto del gallo rojo',to:'c5_loki_libre',k:'main',oc:1,req:{no:'gallo_rojo'}},
     {x:'Bilskirnir: despedirte de Thor',to:'c5_thor',k:'main',oc:1,req:{no:'thor_adios'}},
     {x:'Tyr, que pasea solo por las murallas',to:'c5_tyr',k:'main',oc:1,req:{no:'tyr_adios'}},
     {x:'Folkvang, el salón de Freya',to:'c5_folkvang',k:'main',oc:1,req:{no:'folkvang'}},
     {x:'El brindis de la víspera, en el Valhalla',to:'c5_brindis_vispera',k:'main',oc:1,req:{no:'jur_vispera'}},
     {x:'Himinbjorg: llamar a tus aliados',to:'c5_himinbjorg',k:'main',oc:1,req:{no:'aliados_fin'}},
     {x:'Hlidskjalf, el trono de Odín',to:'c5_hlidskjalf',k:'side',oc:1,req:{no:'hlidskjalf'}},
     {x:'Ir a buscar a Siri a Vindvik',to:'c5_siri',k:'social',oc:1,req:{no:'siri_vista'}},
     {x:'La casa de Eir',to:'c5_eir',k:'shop'},
     {x:'La herrería de los einherjar',to:'c5_herreria',k:'shop'},
     {x:'Pasar la noche con Kraka en las murallas',to:'c5_kraka',k:'social',oc:1,req:{no:'kraka_noche5'}},
     {x:'Dormir en Bilskirnir',to:'c5_vispera',k:'side',fx:{t:8,dormir:1}}]},

/* ---------- Thor ---------- */
c5_thor:{h:'Thor',t:[
  'Thor está sentado en la puerta de Bilskirnir, afilando a Mjolnir con una piedra. No levanta la vista cuando llegas. Modi y Magni juegan a pelear en el patio.',
  '«La serpiente», dice al fin. «Jormungandr. Ya sabes cómo acaba. La mataré, y daré nueve pasos, y su veneno me matará a mí.» Se encoge de hombros. «Nueve pasos. Siempre me he preguntado qué haré con ellos.»',
  'Te mira. «¿Sabes qué? Me alegro de haberte conocido. Y a ese cuervo. Sobre todo a ese cuervo.» Kraka se pone tan rígido que parece de madera. Thor se ríe, por primera vez en días.'],
  c:[{x:'«Daré esos nueve pasos contigo»',to:'c5_thor_adios',k:'main'},
     {x:'Darle un abrazo',to:'c5_thor_adios',k:'social'}]},

c5_thor_adios:{t:[
  'Thor te abraza tan fuerte que te crujen las costillas. Luego se quita algo del cinturón: una hebilla de hierro, gruesa, con runas de tormenta. «De Megingjord, mi cinturón de fuerza», dice. «Se soltó hace años. Para que te acuerdes de quién te enseñó a no apartarte cuando te lanzan un martillo a la cara.»',
  'Magni, el pequeño, se acerca corriendo. «Cuando sea mayor», te dice muy serio, «levantaré el martillo de mi padre.» Thor le revuelve el pelo. Esta vez no se ríe.'],
  fx:{fl:{thor_adios:1},item:'cinturon_thor',st:{fue:1},gl:15,saga:'Se despidió de Thor en la víspera del fin. Thor le dio una hebilla de su cinturón de fuerza.'},
  back:'c5_vispera'},

/* ---------- Tyr ---------- */
c5_tyr:{h:'Tyr',t:[
  'Tyr camina por las murallas de Asgard, mirando hacia el sur, hacia el reino de Hel. Te ve llegar y se detiene.',
  '«Garm», dice, antes de que preguntes. «El perro de la puerta de Hel. Él y yo nos mataremos el uno al otro. Lo sé desde que el lobo me arrancó la mano.»'],
  c:[{x:'Contarle cómo calmaste a Garm con pan',to:'c5_tyr_garm',k:'social',oc:1,req:{fl:'garm_amigo'}},
     {x:'Contarle que venciste a Garm',to:'c5_tyr_garm',k:'social',oc:1,req:{fl:'garm_vencido'}},
     {x:'Pedirle su favor: «Todavía puedo pagar»',to:'c5_tyr_prueba',k:'main',oc:1,req:{nofav:'tyr'}},
     {x:'Quedarte a su lado, mirando al sur',to:'c5_tyr_adios',k:'main'}]},

c5_tyr_garm:{t:[
  'Tyr te escucha con atención. Cuando terminas, sonríe con media boca. «Así que el perro tiene un punto débil», dice. «El pan. O el miedo.» Se queda pensando. «Me lo guardo. Quizá, el último día, me sirva de algo.»'],
  fx:{fl:{tyr_sabe_garm:1}},
  c:[{x:'Quedarte a su lado, mirando al sur',to:'c5_tyr_adios',k:'main'}]},

c5_tyr_prueba:{h:'El precio de Tyr',t:[
  'Tyr te mira largo rato. «En el túmulo del rey Rolf no quisiste pagar», dice. «Ahora sí. ¿Por qué?»',
  '«Porque ahora sé lo que vale», le dices. Tyr asiente, despacio. «Entonces dame algo que te duela perder.»'],
  c:[{x:'Ofrecerle uno de tus hilos del destino',to:'c5_tyr_adios',k:'main',req:{hilos:1},fx:{hilo:-1,favor:'tyr',gl:15}},
     {x:'Ofrecerle parte de tu fuerza vital (−20 de Vida máxima)',to:'c5_tyr_adios',k:'main',fx:{mhp:-20,favor:'tyr',gl:15}},
     {x:'Pensarlo mejor',to:'c5_tyr_adios',k:'n'}]},

c5_tyr_adios:{t:[
  'Os quedáis un rato en la muralla, sin hablar, mirando al sur. Al final, Tyr te pone la mano buena en el hombro.',
  '«Lo justo cuesta», dice. «Siempre. Pero vale lo que cuesta.» Y se va, sin despedirse, porque los dioses de la guerra no saben despedirse.'],
  fx:{fl:{tyr_adios:1},gl:10},
  back:'c5_vispera'},

/* ---------- Freya ---------- */
c5_folkvang:{h:'Folkvang',t:[
  'Folkvang es el salón de Freya, y no se parece a ningún otro de Asgard. Hay flores, en pleno Gran Invierno. Hay gatos enormes durmiendo junto al fuego: los que tiran de su carro. Y hay guerreros, muchos, sentados a las mesas: la mitad de los caídos en batalla no van al Valhalla, sino aquí.',
  'Freya está sentada junto a una ventana. Es la mujer más hermosa que has visto nunca, y la más triste. Lleva al cuello un collar de oro, Brisingamen, que brilla como un fuego tranquilo. Llora, y sus lágrimas caen al suelo convertidas en gotas de oro. Llora por su marido, Od, que se fue de viaje hace mucho y no volvió.',
  '«Antes que Odín, elijo yo», dice, sin dejar de llorar. «Siempre ha sido así. La mitad de los caídos son míos.» Te mira. «Tú también podrías ser mí{o|a}, si quisieras. Pero antes tengo que ver qué hay dentro de ti.»'],
  c:[{x:'Dejar que Freya te lleve al trance del seid',to:'c5_seid_ok',k:'main',chk:{s:'esp',dc:11,ok:'c5_seid_ok',ko:'c5_seid_ko'}},
     {x:'«Ya tengo un camino. No necesito otro.»',to:'c5_folkvang_no',k:'n'}]},

c5_seid_ok:{h:'El seid',t:[
  'Freya canta. Es una canción sin palabras, que no se oye con los oídos sino con el pecho. El salón desaparece. Te encuentras en una llanura verde, bajo un sol de verdad, un sol que no has visto desde antes de la fiebre.',
  'En la llanura hay tres caminos. Uno sube hacia un salón de escudos dorados. Otro va hacia un campo de flores donde te espera alguien a quien quieres. El tercero baja hacia el mar, donde amanece. No sabes cuál vas a tomar. Pero ya no tienes miedo de elegir.',
  'Cuando abres los ojos, Freya te mira con una sonrisa triste. Te pone en la mano una de sus lágrimas de oro. «Ya sé lo que hay dentro de ti», dice. «Si el último día quieres venir a Folkvang, la puerta estará abierta.»'],
  fx:{fl:{folkvang:1,folkvang_oferta:1},favor:'freya',item:'lagrima_freya',gl:20,saga:'Freya le mostró sus tres caminos en el trance del seid y le ofreció un lugar en Folkvang.'},
  back:'c5_vispera'},

c5_seid_ko:{h:'El seid',t:[
  'Freya canta, y tú intentas seguirla, pero algo te ancla al suelo: el miedo, la duda, el ruido de tu propia cabeza. Ves fragmentos: un salón dorado, un campo de flores, el mar. Nada más.',
  'Freya deja de cantar. No parece decepcionada. «No pasa nada», dice. «Muchos no pueden. Pero la puerta de Folkvang no se cierra por eso.» Te da una lágrima de oro. «Por si acaso.»'],
  fx:{fl:{folkvang:1,folkvang_oferta:1},item:'lagrima_freya',gl:5},
  back:'c5_vispera'},

c5_folkvang_no:{t:[
  'Freya asiente, sin ofenderse. «Lo sé», dice. «Lo veo. Pero si cambias de idea, aquí estaré. Siempre estoy aquí. Esperando.» Vuelve a mirar por la ventana, y sus lágrimas de oro siguen cayendo.'],
  fx:{fl:{folkvang:1,folkvang_rechazado:1}},
  back:'c5_vispera'},

/* ---------- Hlidskjalf ---------- */
c5_hlidskjalf:{h:'Hlidskjalf',gen:'c5_hlidskjalf',t:[],
  fx:{fl:{hlidskjalf:1},gl:5},
  back:'c5_vispera'},

/* ---------- El juramento de la víspera ---------- */
c5_brindis_vispera:{h:'El último brindis',t:[
  'En el Valhalla, la noche de la víspera, los einherjar celebran el último brindis de los juramentos. Uno tras otro, los guerreros se ponen en pie y juran lo que harán el último día: a quién protegerán, a quién matarán, en qué lugar de la batalla caerán.',
  'Sigrun te pasa el cuerno. Todo el Valhalla se calla. Starkad te guiña un ojo. Hervor alza su copa.',
  '<span class=tag>Este juramento se cumplirá, o se romperá, en la llanura de Vigrid.</span>'],
  c:[{x:'«Juro que estaré junto a Thor cuando dé sus nueve pasos»',to:'c5_vispera',k:'main',fx:{fl:{jur_vispera:'thor'},jura:{id:'ultimo',txt:'Estar junto a Thor en su combate contra la Serpiente del Mundo',dias:5,gl:100},gl:10}},
     {x:'«Juro que defenderé a Tyr contra el perro de Hel»',to:'c5_vispera',k:'main',fx:{fl:{jur_vispera:'tyr'},jura:{id:'ultimo',txt:'Defender a Tyr en su combate contra Garm',dias:5,gl:100},gl:10}},
     {x:'«Juro que no dejaré solo a Odín ante el lobo»',to:'c5_vispera',k:'main',fx:{fl:{jur_vispera:'odin'},jura:{id:'ultimo',txt:'Estar junto a Odín en su combate contra Fenrir',dias:5,gl:100},gl:10}},
     {x:'«Juro que ayudaré a Heimdal a detener a Loki»',to:'c5_vispera',k:'main',fx:{fl:{jur_vispera:'heimdal'},jura:{id:'ultimo',txt:'Ayudar a Heimdal en su combate contra Loki',dias:5,gl:100},gl:10}}],
  back:'c5_vispera'},

/* ---------- Los aliados: Kraka hace tres viajes ---------- */
c5_himinbjorg:{h:'Himinbjorg',t:[
  'Desde lo alto de la torre de Heimdal se ve hasta el último rincón de los nueve mundos. Heimdal te deja subir sin preguntar. Hugin y Munin están posados en la almena, esperando órdenes de Odín.',
  'Kraka se adelanta. «Puedo llevar mensajes», dice. «A quien tú quieras. Pero estoy cansado, y el mundo es grande, y no queda tiempo.» Se esponja las plumas. «Tres viajes. Puedo hacer tres viajes antes del fin. Elige bien.»',
  '<span class=tag>Puedes llamar a tres aliados para el último día. Solo responderán los que te deban algo.</span>'],
  c:[{x:'Los gigantes de escarcha de Bergelmir',to:'c5_himinbjorg',k:'main',oc:1,req:{no:['aliado_gigantes','aldea_destruida'],max:{llamadas:2}},fx:{fl:{aliado_gigantes:1},suma:{llamadas:1},t:4}},
     {x:'Los enanos de Nidavellir',to:'c5_himinbjorg',k:'main',oc:1,req:{no:'aliado_enanos',max:{llamadas:2}},fx:{fl:{aliado_enanos:1},suma:{llamadas:1},t:4}},
     {x:'Skadi, la cazadora',to:'c5_himinbjorg',k:'main',oc:1,req:{fav:'skadi',no:'aliado_skadi',max:{llamadas:2}},fx:{fl:{aliado_skadi:1},suma:{llamadas:1},t:4}},
     {x:'Hrimfaxi, el caballo de la Noche',to:'c5_himinbjorg',k:'main',oc:1,req:{fl:'ehwaz',no:'aliado_hrimfaxi',max:{llamadas:2}},fx:{fl:{aliado_hrimfaxi:1},suma:{llamadas:1},t:4}},
     {x:'El Lobo Ceniza, en el Bosque Gris',to:'c5_himinbjorg',k:'main',oc:1,req:{fl:'lobo_libre',no:'aliado_lobo',max:{llamadas:2}},fx:{fl:{aliado_lobo:1},suma:{llamadas:1},t:4}},
     {x:'Utgarda-Loki, el señor de las ilusiones',to:'c5_himinbjorg',k:'main',oc:1,req:{fl:'desenmascarado',no:'aliado_ul',max:{llamadas:2}},fx:{fl:{aliado_ul:1},suma:{llamadas:1},t:4}},
     {x:'Ya está: dejar descansar a Kraka',to:'c5_aliados_fin',k:'n'}]},

c5_aliados_fin:{h:'Los mensajes',gen:'c5_aliados',t:[],
  fx:{fl:{aliados_fin:1}},
  back:'c5_vispera'},

/* ---------- Siri y el bosque de Mímir ---------- */
c5_siri:{h:'Siri',t:[
  'Sleipnir te lleva a Vindvik en una noche. Siri está en la cabaña de Groa, preparando ungüentos para una batalla en la que no va a estar. Al verte, deja caer el mortero.',
  '«Es ya, ¿verdad?», dice. No es una pregunta. «Groa lo ha visto en sueños. Dice que el mundo va a arder.»',
  'Odín te habló de un bosque, el de Mímir, donde dos humanos se esconderán durante el fin y saldrán después, cuando el mundo vuelva a salir del mar. Un bosque que el fuego no tocará.'],
  fx:{fl:{siri_vista:1},t:12},
  c:[{x:'Llevarla al bosque de Mímir, donde estará a salvo',to:'c5_bosque',k:'main'},
     {x:'Dejarla con Groa, en Vindvik',to:'c5_siri_queda',k:'n'}]},

c5_bosque:{h:'El bosque de Mímir',t:[
  'El bosque de Mímir, Hoddmimis holt, está escondido entre dos montañas, en un valle donde el Gran Invierno no ha llegado. Los árboles están verdes. Hay pájaros. Siri lo mira todo con la boca abierta.',
  'Junto a un arroyo, dos jóvenes os miran llegar con desconfianza: un muchacho y una muchacha, poco mayores que Siri. Se llaman Lif y Lifthrasir. «Nos dijo un anciano tuerto que viniéramos aquí y esperáramos», explica la muchacha. «No sabemos a qué.»',
  'Siri se vuelve hacia ti. Ya lo ha entendido. «No vas a quedarte», dice. Te abraza. No llora. «Volverás», dice, igual que la última vez. Y tú, esta vez, no le dices que no.'],
  fx:{fl:{siri_bosque:1},gl:20,t:12,saga:'En la víspera del fin, llevó a su sobrina Siri al bosque de Mímir, donde el fuego no llegaría.'},
  c:[{x:'Volver a Asgard',to:'c5_vispera',k:'main'}]},

c5_siri_queda:{t:[
  'Siri se queda mirándote un largo rato. «Me quedo con Groa», dice al fin. «Alguien tiene que cuidar de Vindvik. Alguien tiene que hacer los ungüentos para los que vuelvan.»',
  'Te abraza. «Volverás», dice. Y se mete en la cabaña antes de que puedas contestar.'],
  fx:{t:12},
  c:[{x:'Volver a Asgard',to:'c5_vispera',k:'main'}]},

/* ---------- Comercio ---------- */
c5_eir:{h:'La casa de Eir',t:['La casa de Eir está llena de vendas preparadas para mañana. Muchas vendas.'],shop:'eir',
  c:[{x:'Usar el caldero de Eir',to:'c5_caldero',k:'shop'},{x:'Fortalecer tus runas',to:'c5_taller',k:'shop'}],back:'c5_vispera'},
c5_caldero:{h:'El caldero de Eir',t:['El caldero de Eir hierve sin parar desde hace días.'],caldero:1,back:'c5_eir'},
c5_taller:{h:'Las runas',t:['Eir repasa tus runas una a una. «Que duren hasta el final», dice.'],taller:1,back:'c5_eir'},
c5_herreria:{h:'La herrería de los einherjar',t:['Todos los yunques del Valhalla suenan a la vez. Mañana nadie querrá un arma mellada.'],
  c:[{x:'Forjar o mejorar equipo',to:'c5_forjar',k:'shop'},{x:'Grabar una runa en tu arma',to:'c5_grabado',k:'shop'}],back:'c5_vispera'},
c5_forjar:{h:'La forja',t:['El herrero de la cicatriz ni siquiera levanta la vista. «Rápido», dice. «Hay cola.»'],forja:1,back:'c5_herreria'},
c5_grabado:{h:'El grabado',t:['Puede que sea la última runa que grabe nadie en esta forja.'],grabado:1,back:'c5_herreria'},

/* ---------- La última noche con Kraka ---------- */
c5_kraka:{h:'Las murallas',t:[
  'Pasas la noche en las murallas de Asgard, con Kraka en el hombro, mirando el cielo sin estrellas. Durante mucho rato no decís nada.',
  '«¿Te acuerdas del primer día?», dice Kraka al fin. «En el alero de tu casa, con la nieve. Te dije que llevaba toda la noche esperando.» Se ríe un poco. «Mentí. Llevaba tres noches. No me atrevía a bajar. Pensaba que me ibas a tirar una piedra.»',
  '«Mañana…» Se le quiebra la voz. «Mañana no te separes de mí, ¿vale? O yo no me separaré de ti. Lo que sea. Lo que sea más fácil.»'],
  c:[{x:'«No me separaré de ti»',to:'c5_vispera',k:'social',fx:{fl:{kraka_noche5:1},gl:10,saga:'La noche antes del fin, prometió a Kraka que no se separaría de él.'}},
     {x:'Acariciarle las plumas sin decir nada',to:'c5_vispera',k:'n',fx:{fl:{kraka_noche5:1}}}]},

/* ---------- Loki libre y el gallo rojo ---------- */
c5_loki_libre:{h:'Loki libre',cp:1,gen:'c5_loki_libre',t:[],
  fx:{fl:{loki_libre:1}},
  c:[{x:'Esperar',to:'c5_loki_llama',k:'main',oc:1,req:{fl:'pacto_firme'}},
     {x:'Esperar',to:'c5_gallo',k:'main',oc:1,req:{no:'pacto_firme'}}]},

c5_loki_llama:{h:'La llamada',t:[
  'Esa noche, en tu cuarto de Bilskirnir, el hilo rojo de tu muñeca empieza a tirar. Suavemente. Hacia el sur. Y en tu cabeza, una voz alegre, demasiado simpática: «{Sobrino|Sobrina}. Naglfar zarpa al amanecer. Hay sitio a bordo. Ven».',
  'Kraka está despierto, mirándote. Lo sabe. Por supuesto que lo sabe.',
  '<span class=tag>Esta es la última vez que puedes elegir bando.</span>'],
  c:[{x:'Seguir el hilo rojo hacia el sur, hacia Naglfar',to:'c5_naglfar',k:'n'},
     {x:'Arrancarte el hilo de la muñeca, por fin',to:'c5_pacto_ultimo',k:'main'}]},

c5_naglfar:{h:'Hacia el sur',t:[
  'Sales de Asgard de madrugada, sin despedirte de nadie. Heimdal te ve pasar por el puente del arco iris y no te detiene. Solo te mira, con esos ojos que lo oyen todo, y tú sabes que esa mirada te la llevarás hasta el final.',
  'Kraka va en tu hombro. No ha dicho nada. Cuando llegáis a la orilla del mar del sur, donde espera un barco gigantesco hecho de uñas de muertos, habla por fin. «Voy contigo», dice. «No porque esté de acuerdo. Porque te lo prometí.»'],
  fx:{fl:{bando_loki:1,gallo_rojo:1},gl:-100,saga:'La víspera del fin, siguió el hilo rojo de Loki hasta el barco Naglfar.'},
  c:[{x:'Subir a Naglfar',to:'c5_gjallarhorn',k:'n'}]},

c5_pacto_ultimo:{h:'El hilo',t:[
  'Te arrancas el hilo rojo. Duele como si te arrancaras una vena, y por un instante oyes, muy lejos, una carcajada que se convierte en un grito de rabia.',
  'La marca de tu mano se enfría. No vuelve a ser plateada del todo, pero se enfría. Kraka suelta el aire que llevaba conteniendo desde la isla de Lyngvi. «Por fin», susurra. «Por todos los dioses, por fin.»'],
  fx:{fl:{pacto_roto:1},gl:50,saga:'En la víspera del fin, se arrancó el hilo rojo de Loki.'},
  c:[{x:'Esperar el amanecer',to:'c5_gallo',k:'main'}]},

c5_gallo:{h:'El gallo rojo',t:[
  'Al alba, que ya no es alba, lo oyes. Viene de abajo, de muy abajo, del reino de Hel: un canto ronco, oscuro, del color del hollín y de la sangre seca. Es el tercer gallo. El gallo rojo de Hel.',
  'Fialar cantó en Jotunheim cuando estabas en Nidavellir. Gullinkambi cantó en Asgard cuando bajaste del Árbol. Y ahora este. Kraka se ha quedado completamente quieto en tu hombro. «Los tres», susurra. «Ya han cantado los tres.»'],
  fx:{fl:{gallo_rojo:1}},
  c:[{x:'Mirar hacia el puente del arco iris',to:'c5_gjallarhorn',k:'main'}]},

c5_gjallarhorn:{h:'Gjallarhorn',t:[
  'Heimdal está de pie en el puente del arco iris. Se descuelga el cuerno de la espalda, el Gjallarhorn, que lleva colgado desde el principio de los tiempos esperando este momento. Se lo lleva a los labios. Y sopla.',
  'El sonido llega a los nueve mundos a la vez. Lo oyen los gigantes de Jotunheim, que se ponen en marcha. Lo oyen los enanos bajo la montaña. Lo oyen los muertos de Hel, que suben a Naglfar. Lo oyen los einherjar, que salen por las quinientas cuarenta puertas del Valhalla, ochocientos por cada una.',
  'Y lo oye Odín, que monta en Sleipnir y cabalga hacia el pozo de Mímir para hacerle a la cabeza del sabio la última pregunta.'],
  fx:{saga:'Oyó sonar el Gjallarhorn, el cuerno de Heimdal, el día del fin.'},
  c:[{x:'Prepararte',to:'c5_runa_skuld',k:'main',oc:1,req:{no:'bando_loki'}},
     {x:'Prepararte',to:'c5_p2_fin',k:'n',oc:1,req:{fl:'bando_loki'}}]},

c5_runa_skuld:{h:'La runa de Skuld',t:[
  'Mientras te pones la cota y te ajustas el arma, sientes una mano fría en la muñeca. Skuld. No hace ruido. Nunca lo hace.',
  'Te coge la mano marcada y traza en ella, sobre todas las demás runas, una que no has visto nunca: un trazo que parece un hilo que sube, se cruza consigo mismo y se corta. «Esta no está en el Futhark», dice. «No la conoce ni Odín. Es mía. Es la runa de lo que ha de ser.»',
  '«Úsala bien», añade. «Corta hilos.» Luego te mira a los ojos, y por primera vez ves en los suyos algo parecido al miedo. «Nos vemos en Vigrid, {N}.»'],
  fx:{runa:'skuld',fl:{runa_skuld:1},saga:'Skuld le enseñó su runa secreta, la de lo que ha de ser, el día del fin.'},
  c:[{x:'Salir con los einherjar',to:'c5_p2_fin',k:'main'}]},

c5_p2_fin:{h:'Hacia Vigrid',cp:1,gen:'c5_p2_fin',t:[],
  fx:{fl:{c5p2fin:1},hp:999,fu:100},
  c:[{x:'Marchar hacia Vigrid',to:'c5_p3',k:'main'}]},

/* Escena de enlace provisional: la sustituirá la Parte 3 */
c5_p3:{h:'Continuará',t:[
  'El cielo se abre de lado a lado. Empieza el Ragnarok.',
  '<span class=tag>Aquí termina la Parte 2 del Capítulo 5. La historia continúa en la Parte 3: «Ragnarok».</span>'],
  c:[{x:'Volver a Asgard',to:'c5_vispera'}]}

}});

GEN.c5_p2_fin=()=>({t:S.fl.bando_loki?[
  'Naglfar navega por un mar que hierve. A bordo, miles de muertos de Hel miran al frente con los ojos vacíos. En la proa, Loki ríe con los brazos abiertos, con el pelo rojo al viento como una llama.',
  'Al otro lado del mar se extiende la llanura de Vigrid, cien leguas por cada lado. Al norte, el ejército de los gigantes de escarcha; al sur, el fuego de Surt; y delante, saliendo de Asgard como un río de acero, el ejército de los dioses y los einherjar. Entre ellos, en algún sitio, Thor. Tyr. Heimdal. Sigrun. Hervor. Tu abuelo.',
  'Kraka se agarra a tu hombro con todas sus garras. No dice nada. No le hace falta.']
 :[
  'La llanura de Vigrid mide cien leguas por cada lado. Desde el puente del arco iris se ve entera: al norte, el ejército de los gigantes de escarcha; al sur, un resplandor rojo que se acerca, el fuego de Surt y sus gigantes de Muspel; al este, en el mar, la sombra enorme de un barco hecho de uñas.',
  'Y entre todos ellos, el ejército de los dioses y los einherjar, que sale de Asgard como un río de acero.',
  'Kraka se agarra a tu hombro con todas sus garras. «Bueno», dice, con la voz temblando. «Ya está. Ya estamos aquí.» Respira hondo. «¿Sabes qué? Me alegro de que fuera contigo.»']});
GEN.c5_aliados=()=>{const A=[['aliado_gigantes','los gigantes de Bergelmir, que bajarán de las montañas con Ymma a hombros de su abuelo'],['aliado_enanos','los enanos de Nidavellir, con Brok, Eitri y Regin al frente'+(S.fl.enanos_libres?', y los veinte herreros que liberaste de Thrym':'')],['aliado_skadi','Skadi, con su arco y sus esquís'],['aliado_hrimfaxi','Hrimfaxi, el caballo de la Noche'],['aliado_lobo','el Lobo Ceniza, que aullará desde el Bosque Gris'],['aliado_ul','Utgarda-Loki, que ha prometido no luchar al lado de Thrym']].filter(x=>S.fl[x[0]]).map(x=>x[1]);
  return {t:[
  A.length?'Kraka vuelve de su último viaje al anochecer, tan cansado que se cae del cielo y aterriza en tus manos. «Vendrán», jadea. «Todos los que has llamado. '+(x=>x.charAt(0).toUpperCase()+x.slice(1))(A.join('; '))+'.» Se queda dormido en tus manos antes de terminar la frase.'
   :'Kraka te mira, aliviado de no tener que volar. «Nadie, ¿eh?», dice. «Bueno. Tú y yo. Como siempre.»',
  'Heimdal, junto a la almena, asiente despacio. «Lo he oído todo», dice. «Los he oído responder. No estarás sol{o|a}.»']};};
})();
