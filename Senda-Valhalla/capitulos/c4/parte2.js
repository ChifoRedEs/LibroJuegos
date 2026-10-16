/* =====================================================================
   Capítulo 4 · El Camino de Hel
   Parte 2 · «El camino de los muertos»
   Nueve noches en Sleipnir: el camino de los muertos de paja (y la
   sombra de quien rechazó el trato), la emboscada de las sombras, el
   puente de Gjallarbru y la giganta Modgud, el río Gjoll, la llanura de
   los que esperan (el padre, Einar, Fafnir, Durin, Höd, Grim, Hrungnir,
   Nastrond), los perros de Hel, Garm y el salto de Helgrind.
   Las marcas llora_* y niega_* se usan en la Parte 3 (las lágrimas).
   Sustituye la escena provisional c4_p2 de la Parte 1.
   Escena de enlace provisional: c4_p3 (la sustituirá la Parte 3)
   ===================================================================== */
(()=>{
const pelea=(e,win,flee,t)=>({t:[t],f:{e,win,lose:'muerte',flee}});

/* ---------- Datos nuevos ---------- */
Object.assign(OBJ,{
  pan_hel:{n:'Pan de los muertos',tipo:'consumible',ef:{hp:80},pr:40,d:'Gris y sin sabor, pero alimenta. Recupera 80 de Vida.'},
  hueso_garm:{n:'Colmillo de Garm',tipo:'material',pr:400,d:'Del perro que guarda la puerta de Hel. Todavía está tibio.'},
  canto_madre:{n:'La canción de tu madre',tipo:'clave',d:'Un recuerdo que tu padre te devolvió en el reino de los muertos.'}
});
Object.assign(ENEMIGOS,{
  sombra_guerrera:{n:'Sombra guerrera',cat:'Muerto de Hel',hp:220,a:29,gl:25,o:20,l:{pan_hel:.5}},
  perro_hel:{n:'Perro de Hel',cat:'Bestia de Hel',hp:205,a:30,gl:30,o:0,l:{pan_hel:.4}},
  garm:{n:'Garm',cat:'El perro de la puerta de Hel',hp:360,a:32,gl:100,o:0,l:{hueso_garm:1}}
});
TIENDAS.thorvald={n:'Thorvald el Mercader, muerto hace cien años · «Aquí abajo la plata no sirve de nada. Por eso la quiero.»',
  stock:['pan_hel','pocion_abedul','carne_gigante','hidromiel_enana','unguento','savia_raiz']};

registrarSenales({
  41:'En el camino de los muertos no hay días. Solo el ruido de los cascos de Sleipnir y, a veces, voces que no son de nadie.'
},S=>S.fl.c4p1fin&&!S.fl.c5);

registrarMision(S=>{
  if(!S.fl.c4p1fin)return null;
  if(!S.fl.gjoll)return 'Cabalga nueve noches hacia el norte y hacia abajo, hasta el reino de Hel.';
  if(!S.fl.garm_fin)return 'Cruza la llanura de los que esperan hasta la cueva de Garm y la reja de Helgrind. Algunos de los muertos que conociste te esperan aquí.';
  if(!S.fl.c4p2fin)return 'Cruza la reja de Helgrind.';
  return null;
});

/* ---------- Textos variables ---------- */
GEN.c4_padre=()=>({t:S.fl.sin_recuerdos?[
  'Un anciano se levanta de una piedra cuando te ve pasar. Es alto, ancho de hombros, con la barba gris trenzada y una cicatriz en la frente. Te mira como si hubiera visto un fantasma, lo cual, aquí abajo, tiene su gracia.',
  '«¿{Ulf|Astrid}?», dice. Su voz tiembla. «¿{Hijo|Hija}?»',
  'No lo reconoces. Lo intentas, con todas tus fuerzas, y no lo reconoces. Diste tus recuerdos de Vindvik en el pozo de Mímir, y con ellos se fue la cara de tu padre. Él lo ve en tus ojos, y algo se le rompe por dentro. Pero no se aparta.']
 :[
  'Un anciano se levanta de una piedra cuando te ve pasar. Es alto, ancho de hombros, con la barba gris trenzada y una cicatriz en la frente que se hizo en Sajonia, cuando tú tenías diez años. Lo reconocerías en cualquier parte.',
  'Tu padre. Bjorn de Vindvik. Murió hace seis inviernos, en su cama, de viejo, tosiendo, y tú le cogiste la mano y le prometiste que tú no morirías así. Te mira como si hubiera visto un fantasma, lo cual, aquí abajo, tiene su gracia.',
  '«{Hijo|Hija}», dice. Solo eso. Y abre los brazos.']});

GEN.c4_padre_charla=()=>({t:S.fl.sin_recuerdos?[
  'Tu padre se sienta a tu lado y te habla de Vindvik: de la casa, del fiordo, de tu madre, de tu hermano Einar, de ti de pequeñ{o|a}. Tú escuchas como quien escucha la historia de un desconocido. Te duele no sentir nada, y te duele más que a él le duela.',
  'Al final, tu padre se calla un rato largo. Luego empieza a cantar, muy bajito, una canción de cuna. La canción que cantaba tu madre. Y algo se abre dentro de ti, una puerta pequeña: ves la cara de tu madre, inclinada sobre tu cama, cantando. Solo eso. Pero es tuyo otra vez.',
  '«Algo es algo», dice tu padre, y sonríe. «Los muertos no tenemos mucho. Pero las canciones sí nos las dejan.»']
 :[
  'Tu padre se sienta a tu lado en la piedra y te pregunta por todo: por Vindvik, por Siri, por el salón del jarl, por tu hermano. Cuando le cuentas lo de Einar, se queda callado mucho rato.',
  '«Morí en la cama», dice al fin. «Como un viejo. Como una vaca. Y vine aquí, donde no pasa nada, donde la comida es hambre y la cama es enfermedad. Tenías razón en tener miedo.» Te coge la mano. «Pero ¿sabes qué? No está tan mal, cuando tienes a quién esperar. Yo te esperaba a ti. Aunque esperaba que tardaras más.»',
  '«Si de verdad vas a pedirle a Hel que suelte a ese dios», añade, «dile que el viejo Bjorn llora por él. No lo conocí, pero si tú vas a buscarlo es que merece la pena.»']});

GEN.c4_einar=()=>({t:S.fl.einar_paz?[
  'Junto a la orilla del río, sentado en una barca varada, hay un hombre con algas en la barba y los ojos tranquilos. Einar. Tu hermano. No está podrido ni lleno de agua: está como era antes de la tormenta, con su sonrisa torcida de siempre.',
  '«La niña me cantó», dice. «Siri. Me cantó y me dormí, y cuando desperté estaba aquí, y por primera vez en diez años no tenía frío.» Te mira. «Gracias por sujetarme. No te lo dije entonces. No podía.»',
  '«Dile a Siri…» Se queda pensando. «No, no le digas nada. Ella ya lo sabe.»']
 :(S.fl.einar_cae?[
  'Junto a la orilla del río, sentado en una barca varada, hay un hombre con algas en la barba. Einar. Tu hermano. No te mira cuando te acercas.',
  '«Me mataste», dice al fin, sin rabia, como quien habla del tiempo. «Bueno. Ya estaba muerto. Pero me mataste otra vez.» Se encoge de hombros. «Lo entiendo. Protegías a la niña. Yo habría hecho lo mismo.»',
  'Por fin te mira. Tiene los ojos de antes, los de cuando robabais manzanas al viejo Tore. «Estamos en paz, {hermano|hermana}», dice. «Más o menos.»']
 :[
  'Junto a la orilla del río, entre los ahogados, ves a un hombre con tu misma nariz. Einar, tu hermano. No te reconoce. Mira el agua del río, siempre el agua, como si buscara algo que se le cayó hace mucho.',
  'Le llamas. No contesta. Los ahogados no siempre recuerdan.'])});

GEN.c4_fafnir=()=>({t:S.fl.andvari_libre?[
  'En un rincón de la llanura, un enano viejo de barba gris está sentado en una piedra, tallando una figurita de madera. Es Fafnir. Pero no el dragón: el enano que fue antes del oro, con las manos de herrero y los ojos tranquilos.',
  '«El de la veta», dice al verte. «El que le devolvió el anillo al pez.» Sonríe. «Aquí abajo no hay oro. Es lo mejor que me ha pasado en cien años.»',
  '«Dile a mi padre que estoy bien», añade. «Y a Regin. Sobre todo a Regin.»']
 :[
  'En un rincón de la llanura hay algo enroscado sobre un montón de piedras grises que finge que son oro. Una sombra de dragón, pequeña y gastada, que abraza las piedras y susurra «mío, mío, mío» sin parar.',
  'Es lo que queda de Fafnir. Ni siquiera muerto ha soltado el oro.']});

GEN.c4_nastrond=()=>({t:[
  'Al borde de la llanura hay una playa de arena negra. Es Nastrond, la orilla de los cadáveres. Allí hay un salón hecho de serpientes trenzadas, con las cabezas hacia dentro, que escupen veneno sobre los que están dentro: los perjuros, los asesinos, los que rompieron juramentos.',
  'Sobre el salón, enroscado en una roca, Nidhogg mordisquea a los muertos con desgana. Te ve. Te reconoce. «La mortal de la ardilla», dice con su voz de huesos. «Aún no te toca.»',
  S.nid>0
    ?'Hay un sitio vacío en el salón de las serpientes. Un sitio pequeño, de tu tamaño. Tiene grabadas tus runas. Rompiste '+S.nid+' juramento'+(S.nid>1?'s':'')+', y las valquirias no olvidan. Kraka te tira de la oreja para que te alejes de allí.'
    :'Buscas en el salón de las serpientes un sitio con tu nombre. No lo hay. No has roto ni un solo juramento. Kraka suelta el aire que estaba conteniendo.']});

registrarCapitulo({capitulo:4,parte:2,titulo:'El camino de los muertos',escenas:{

/* ---------- Las primeras noches ---------- */
c4_p2:{h:'Las primeras noches',cp:1,t:[
  'Sleipnir galopa hacia el norte y hacia abajo. La oscuridad es tan completa que no ves ni las orejas del caballo. Solo oyes sus ocho cascos sobre una tierra que suena a hueco, y el viento, que aquí no huele a nada.',
  'La primera noche, Kraka habla sin parar para no tener miedo. La segunda, se calla. La tercera, empiezas a ver cosas en la oscuridad: figuras grises que caminan despacio en la misma dirección que tú, con la cabeza baja.',
  'Son muertos. Muertos de vejez, de fiebre, de parto, de frío. Los muertos de paja, los que no mueren en batalla. Van a Hel por el único camino que hay.'],
  fx:{t:72},
  c:[{x:'Fijarte en los que caminan',to:'c4_paja',k:'main'}]},

c4_paja:{h:'El camino de paja',t:[
  'Sleipnir aminora el paso para no atropellarlos. Entre los muertos ves a viejos que se apoyan en bastones, a niños de la mano de sus madres, a hombres que todavía tosen.',
  'Y entonces ves a alguien que conoces. Camina sol{o|a}, con una manta sobre los hombros, la cara gris de fiebre. Tiene tu cara. Tu edad. Tu cicatriz en el hombro. Es {un guerrero|una guerrera} de Vindvik que murió hace un mes en su cama, la noche en que una valquiria le ofreció un trato y dijo que no.',
  'Kraka se queda helado. «Eso no es posible», susurra. «Eso… eso eres tú. Lo que habrías sido.»'],
  c:[{x:'Bajarte del caballo y hablarle',to:'c4_sombra',k:'main'},
     {x:'Seguir cabalgando sin mirar atrás',to:'c4_noches',k:'n',fx:{gl:5}}]},

c4_sombra:{h:'La que dijo que no',t:[
  'Te pones a su lado. Tu sombra te mira sin sorpresa, como si te esperara. «Así que dijiste que sí», dice con tu voz. «Yo dije que no. Estaba cansad{o|a}. No quería deberle nada a nadie.»',
  '«¿Mereció la pena?», te pregunta. «El invierno, los lobos, los dragones, los dioses. ¿Mereció la pena?» Te mira la mano marcada. «Yo ya he llegado. Aquí no pasa nada, pero tampoco duele nada.»'],
  c:[{x:'«Sí. Mereció la pena.»',to:'c4_sombra_si',k:'main'},
     {x:'«No lo sé todavía.»',to:'c4_sombra_nose',k:'social'}]},

c4_sombra_si:{t:[
  'Tu sombra sonríe, despacio, con tu misma sonrisa torcida. «Me alegro», dice. «Alguien tenía que hacerlo.» Se aleja por el camino gris, hacia abajo, sin prisa.',
  'Cuando vuelves a montar, Kraka te mira de reojo. «Eso ha sido lo más raro que he visto nunca», dice. «Y he visto a Thor vestido de novia.»'],
  fx:{fl:{sombra:1},gl:15,saga:'En el camino de los muertos se encontró con la sombra de quien habría sido si hubiera rechazado el trato.'},
  c:[{x:'Seguir cabalgando',to:'c4_noches',k:'main'}]},

c4_sombra_nose:{t:[
  'Tu sombra asiente. «Es la respuesta honrada», dice. «Yo tampoco lo sabía cuando dije que no.» Se aleja por el camino gris, hacia abajo, sin prisa.',
  'Te quedas mirándola hasta que desaparece. Luego vuelves a montar en silencio. Kraka, por una vez, no dice nada.'],
  fx:{fl:{sombra:1},gl:10,hilo:1,saga:'En el camino de los muertos se encontró con la sombra de quien habría sido si hubiera rechazado el trato.'},
  c:[{x:'Seguir cabalgando',to:'c4_noches',k:'main'}]},

c4_noches:{h:'Noches cuarta, quinta y sexta',t:[
  'El camino se estrecha entre valles negros. Las paredes de roca están tan cerca que rozas la piedra con las rodillas. A la sexta noche, Sleipnir se detiene en seco y resopla.',
  'Delante, en el camino, hay figuras armadas. No caminan con la cabeza baja como los demás muertos: te esperan. Son sombras de guerreros con armaduras viejas, de los que murieron en batalla pero no fueron elegidos por las valquirias. Los que no fueron suficientemente buenos para el Valhalla ni suficientemente malos para Nastrond.',
  '«Un vivo», sisea el primero. «Un vivo con un caballo de Odín. Lo que nosotros nunca tuvimos.»'],
  fx:{t:72},
  c:[{x:'Abrirte paso',to:'c4_f_sombras',k:'hunt'},
     {x:'Hablarles: «Yo tampoco iba a ser elegid{o|a}»',to:'c4_sombras_paz',k:'social',chk:{s:'esp',dc:11,ok:'c4_sombras_paz',ko:'c4_f_sombras'}}]},

c4_f_sombras:pelea('sombra_guerrera','c4_noches2',null,'La sombra guerrera alza una espada oxidada. Detrás de ella, las demás esperan su turno.'),

c4_sombras_paz:{t:[
  'Les cuentas tu historia: la fiebre, la cama, el miedo, el trato. Les dices que tú también ibas a acabar aquí, en este camino, sin nadie que cantara tu nombre. Las sombras escuchan en silencio.',
  'Al final, la primera baja la espada. «Ve», dice. «Y si llegas a donde vas, si alguna vez te sientas en el salón de Odín, di nuestros nombres.» Te dicen sus nombres, uno por uno. Son muchos. Te los aprendes todos.'],
  fx:{gl:25,saga:'Se aprendió los nombres de los guerreros olvidados del camino de Hel, y prometió decirlos en voz alta.'},
  c:[{x:'Seguir cabalgando',to:'c4_noches2',k:'main'}]},

c4_noches2:{h:'Las tres últimas noches',t:[
  'Las tres últimas noches son las más largas. El frío se mete en los huesos, y no es el frío del invierno: es el frío de las cosas que ya no se mueven. Sleipnir galopa sin descanso. Tú te duermes a ratos sobre su cuello.',
  'Al final de la novena noche, el camino desemboca en un río. Sobre el río hay un puente cubierto de oro que brilla sin luz, como brilla el oro en los sueños. Al principio del puente hay una giganta pálida, sentada en una silla de piedra, que te mira llegar sin pestañear.'],
  fx:{t:72},
  c:[{x:'Acercarte al puente',to:'c4_gjallarbru',k:'main'}]},

/* ---------- Gjallarbru y Modgud ---------- */
c4_gjallarbru:{h:'Gjallarbru',cp:1,t:[
  'La giganta es Modgud, la guardiana del puente. Tiene la piel blanca como la cera y el pelo negro trenzado hasta el suelo. Cuando Sleipnir pisa el puente, el oro retumba como un tambor.',
  '«Ayer cruzaron este puente cinco ejércitos de muertos», dice Modgud, «y no hicieron tanto ruido como tú solo.» Te mira de arriba abajo. «Y no tienes color de muerto. ¿Quién eres, y qué buscas en el camino de Hel?»'],
  c:[{x:'«Busco a Baldr. Frigg me envía a rescatarlo.»',to:'c4_modgud_v',k:'main'},
     {x:'Enseñarle la marca roja de tu mano',to:'c4_modgud_pacto',k:'n',oc:1,req:{fl:'pacto_loki'}},
     {x:'Ofrecerle plata para que te deje pasar (100)',to:'c4_modgud_peaje',k:'shop',req:{plata:100},fx:{plata:-100}}]},

c4_modgud_v:{t:[
  'Modgud asiente despacio. «Baldr cruzó este puente hace dos días», dice. «Iba con su esposa, y brillaba tanto que hasta los muertos levantaron la cabeza para mirarlo.» Se aparta. «Su camino sigue hacia el norte y hacia abajo. El tuyo también. Pasa, mortal. Y no hagas tanto ruido al volver.»'],
  fx:{fl:{gjallarbru:1},gl:10},
  c:[{x:'Cruzar el puente',to:'c4_gjoll',k:'main'}]},

c4_modgud_pacto:{t:[
  'Modgud mira la marca roja y se le endurece la cara. «El padre de nuestra señora», dice. «Él te ha marcado.» Se aparta sin decir nada más. Cuando pasas a su lado, susurra: «Él también cruzó este puente una vez. Para traer a su hija. No volvió a ser el mismo».',
  'Kraka se estremece en tu hombro.'],
  fx:{fl:{gjallarbru:1}},
  c:[{x:'Cruzar el puente',to:'c4_gjoll',k:'main'}]},

c4_modgud_peaje:{t:[
  'Modgud mira las monedas sin cogerlas. «¿Plata?», dice. «Aquí abajo la plata no sirve de nada.» Pero las coge igual, y se las guarda en el pelo. «Pasa. Me gustan cómo suenan.»'],
  fx:{fl:{gjallarbru:1}},
  c:[{x:'Cruzar el puente',to:'c4_gjoll',k:'main'}]},

c4_gjoll:{h:'El río Gjoll',t:[
  'Al otro lado del puente, el camino baja hasta un río ancho y negro, el Gjoll, el último que separa el mundo de los vivos del de los muertos. El agua está helada y llena de cuchillos que flotan con la corriente, girando despacio, con el filo hacia arriba.',
  'No hay vado. Sleipnir tendrá que cruzar nadando, o saltando de roca en roca entre los filos.'],
  c:[{x:'Guiar a Sleipnir entre las cuchillas',to:'c4_gjoll_ok',k:'main',chk:{s:'ast',dc:11,ok:'c4_gjoll_ok',ko:'c4_gjoll_ko'}},
     {x:'Confiar en Sleipnir: avanzar juntos con la runa Ehwaz',to:'c4_gjoll_ok',k:'main',oc:1,req:{runa:'ehwaz'}},
     {x:'Helar el río con la runa Isa',to:'c4_gjoll_ok',k:'main',oc:1,req:{runa:'isa'},chk:{s:'esp',dc:9,ok:'c4_gjoll_ok',ko:'c4_gjoll_ko'}}]},

c4_gjoll_ok:{t:[
  'Sleipnir salta de roca en roca con sus ocho patas, como si bailara, y las cuchillas pasan por debajo sin tocaros. Al otro lado, el caballo se sacude el agua y relincha, muy orgulloso de sí mismo.',
  'Kraka suelta un graznido de alivio. «Este caballo», dice, «vale más que todo Asgard.»'],
  fx:{fl:{gjoll:1},gl:10},
  c:[{x:'Seguir adelante',to:'c4_llanura',k:'main'}]},

c4_gjoll_ko:{t:[
  'A mitad del río, Sleipnir resbala. Caéis los dos al agua helada, entre las cuchillas. Una te abre el brazo. Otra, la pierna. Cuando por fin salís a la otra orilla, estás temblando y sangrando, y el agua del Gjoll se te ha metido en los huesos.',
  'Sleipnir te mira con algo parecido a una disculpa.'],
  fx:{fl:{gjoll:1},hp:-60},
  c:[{x:'Seguir adelante',to:'c4_llanura',k:'main'}]},

/* ---------- La llanura de los que esperan: centro de la Parte 2 ---------- */
c4_llanura:{h:'La llanura de los que esperan',cp:1,mision:1,sort:1,t:[
  'Al otro lado del río se extiende una llanura gris bajo un cielo sin estrellas. Está llena de muertos: miles, decenas de miles, sentados en piedras, de pie, caminando en círculos. Esperan. No saben qué. Esperan.',
  'Al fondo de la llanura, muy lejos, se ve una muralla negra y una reja enorme: Helgrind, la puerta del reino de Hel. Y delante de la reja, una cueva de la que sale un aullido que hace temblar la tierra.',
  'Kraka se aprieta contra tu cuello. «Cuidado», susurra. «Aquí abajo hay gente que te conoce.»'],
  c:[{x:'Ir hacia la cueva de Garm y la reja de Helgrind',to:'c4_perros',k:'main',oc:1,req:{no:'garm_fin'}},
     {x:'Un anciano con una cicatriz en la frente',to:'c4_padre',k:'social',oc:1,req:{no:'padre'}},
     {x:'Junto a la orilla del río, entre los ahogados',to:'c4_einar',k:'social',oc:1,req:{no:'einar_h'}},
     {x:'Un rincón donde alguien susurra «mío»',to:'c4_fafnir',k:'social',oc:1,req:{fl:'fafnir_muerto',no:'fafnir_h'}},
     {x:'Un enano con corona de hierro',to:'c4_durin',k:'social',oc:1,req:{fl:'rey_enano',no:'durin_h'}},
     {x:'Un dios ciego que pregunta por su hermano',to:'c4_hod_h',k:'social',oc:1,req:{fl:'hod_muerto',no:'hod_h'}},
     {x:'Un hombre tuerto que te mira con rencor',to:'c4_grim',k:'social',oc:1,req:{no:'grim_h'}},
     {x:'Un gigante con la cabeza de piedra partida',to:'c4_hrungnir',k:'social',oc:1,req:{fl:'hrungnir_muerto',no:'hrungnir_h'}},
     {x:'Nastrond, la orilla de los cadáveres',to:'c4_nastrond',k:'side',oc:1,req:{no:'nastrond'}},
     {x:'Thorvald, el mercader muerto',to:'c4_mercader',k:'shop'},
     {x:'Hablar con Kraka',to:'c4_kraka_hel',k:'social',oc:1,req:{no:'kraka_hel'}},
     {x:'Descansar junto a Sleipnir',to:'c4_llanura',k:'side',fx:{t:8,dormir:1}}]},

c4_padre:{h:'Bjorn de Vindvik',gen:'c4_padre',t:[],
  fx:{fl:{padre:1}},
  c:[{x:'Sentarte con él',to:'c4_padre_charla',k:'social'}]},

c4_padre_charla:{h:'Tu padre',gen:'c4_padre_charla',t:[],
  c:[{x:'Abrazarlo antes de irte',to:'c4_llanura',k:'social',oc:1,req:{no:'sin_recuerdos'},fx:{fl:{llora_padre:1},gl:15,saga:'En la llanura de los muertos volvió a abrazar a su padre, Bjorn de Vindvik.'}},
     {x:'Abrazarlo antes de irte',to:'c4_llanura',k:'social',oc:1,req:{fl:'sin_recuerdos'},fx:{fl:{llora_padre:1,recuerdo_madre:1},item:'canto_madre',gl:15,saga:'En la llanura de los muertos, su padre le devolvió la canción de cuna de su madre.'}}]},

c4_einar:{h:'Einar',gen:'c4_einar',t:[],
  fx:{fl:{einar_h:1}},
  c:[{x:'Pedirle que llore por Baldr cuando llegue el momento',to:'c4_llanura',k:'social',oc:1,req:{fl:'einar_paz'},fx:{fl:{llora_einar:1},gl:10}},
     {x:'Pedirle que llore por Baldr cuando llegue el momento',to:'c4_llanura',k:'social',oc:1,req:{fl:'einar_cae'},fx:{fl:{llora_einar:1},gl:10}},
     {x:'Dejarlo con sus recuerdos',to:'c4_llanura',k:'n'}]},

c4_fafnir:{h:'Fafnir',gen:'c4_fafnir',t:[],
  fx:{fl:{fafnir_h:1}},
  c:[{x:'Despedirte',to:'c4_llanura',k:'social',oc:1,req:{fl:'andvari_libre'},fx:{fl:{llora_fafnir:1},gl:10}},
     {x:'Alejarte de la sombra',to:'c4_llanura',k:'n',oc:1,req:{no:'andvari_libre'},fx:{fl:{niega_fafnir:1}}}]},

c4_durin:{h:'Durin el Primero',t:[
  'El rey enano al que diste descanso en las tumbas de Nidavellir está sentado en una roca, sin corona, con las manos en las rodillas. Al verte, se levanta e inclina la cabeza.',
  '«Gracias», dice. «Dormía mal en aquella tumba. Aquí duermo bien.» Se queda pensativo. «Si necesitas algo de los muertos, pídemelo. Los enanos pagamos nuestras deudas, incluso aquí abajo.»'],
  fx:{fl:{durin_h:1,llora_durin:1},gl:10},
  back:'c4_llanura'},

c4_hod_h:{h:'Höd',t:[
  'Höd está sentado en una piedra, solo, como siempre, tallando a ciegas un trozo de madera gris. Cuando oye tus pasos, levanta la cabeza. «¿Eres tú?», pregunta. «¿{El mortal|La mortal} de la fuente?»',
  '«No sé qué pasó», dice. «Me pusieron algo en la mano. Lo lancé. Y luego me mataron.» Se le quiebra la voz. «¿Está aquí mi hermano? Quiero decirle que lo siento. Quiero decirle que no lo sabía.»',
  'Le dices que Baldr está en el salón de Hel, más adelante. Höd asiente despacio. «Llevaré mi caballo de madera», dice. «Le gustaban los caballos.»'],
  fx:{fl:{hod_h:1,llora_hod:1},gl:10},
  back:'c4_llanura'},

c4_grim:{h:'Grim el Tuerto',t:[
  'Es Grim el Tuerto, el jefe de saqueadores al que mataste en el barranco del norte, en tu primera semana de vida prestada. Tiene el mismo parche de cuero en el ojo y la misma cara de pocos amigos.',
  '«Tú», gruñe. «Tú me mataste.» Te mira de arriba abajo. «Has mejorado. Entonces eras {un pueblerino|una pueblerina} con un hacha mellada.» Escupe en el suelo. «¿Que llore por un dios? ¿Yo? Ni muerto. Bueno… ya estoy muerto. Ni así.»',
  'Se da la vuelta y se va. Kraka se ríe por lo bajo. «Hay gente que no cambia ni en Hel», dice.'],
  fx:{fl:{grim_h:1,niega_grim:1}},
  back:'c4_llanura'},

c4_hrungnir:{h:'Hrungnir',t:[
  'Hrungnir, el gigante de la cabeza de piedra, está sentado en el suelo con la cabeza partida en dos sobre las rodillas, intentando juntar los pedazos. Al verte, se ríe con un ruido de rocas que caen.',
  '«El pequeño», dice. «El que me tumbó.» Se queda mirándote. «¿Sabes qué? Aquí abajo me he dado cuenta de una cosa. Thrym me usaba. Lopt me usaba. Todos me usaban porque era grande y tonto.» Se encoge de hombros. «Tú por lo menos me miraste a la cara.»',
  '«¿Que llore por Baldr?», añade. «No lo conocí. Pero si me ganas a los dados, lloro por quien quieras.»'],
  fx:{fl:{hrungnir_h:1}},
  c:[{x:'Jugar a los dados con Hrungnir',to:'c4_hrungnir_dados',k:'social',chk:{s:'sue',dc:9,ok:'c4_hrungnir_dados',ko:'c4_hrungnir_pierde'}}],
  back:'c4_llanura'},

c4_hrungnir_dados:{t:['Ganas. Hrungnir se queda mirando los dados un buen rato y luego se echa a reír tan fuerte que se le vuelve a caer media cabeza. «Trato es trato», dice. «Lloraré. Aunque no me salga.»'],
  fx:{fl:{llora_hrungnir:1},gl:10},back:'c4_llanura'},
c4_hrungnir_pierde:{t:['Pierdes. Hrungnir se ríe tanto que se le cae media cabeza. «Otra vez será», dice. «Aquí abajo hay mucho tiempo.»'],
  fx:{fl:{niega_hrungnir:1}},back:'c4_llanura'},

c4_nastrond:{h:'Nastrond',gen:'c4_nastrond',t:[],
  fx:{fl:{nastrond:1}},
  back:'c4_llanura'},

c4_mercader:{h:'Thorvald el Mercader',t:[
  'Thorvald es un muerto gordo y risueño, con un carro lleno de cosas que nadie sabe de dónde saca. «Morí atragantado con un hueso de pollo hace cien años», te cuenta. «Muerte de paja. Así que aquí estoy, vendiendo. Es lo único que sé hacer.»'],
  shop:'thorvald',back:'c4_llanura'},

c4_kraka_hel:{h:'Kraka',t:[
  'Kraka está más callado de lo normal. Al final te habla, sin mirarte. «Los cuervos no venimos aquí cuando morimos», dice. «No sé adónde vamos. Hugin dice que a ninguna parte. Que los cuervos solo somos pensamiento, y el pensamiento se apaga y ya está.»',
  '«No me da miedo», añade, muy deprisa. «Bueno, un poco.» Se queda callado. «Si me muero antes que tú, ¿me dirás en voz alta, como a esos guerreros del camino? Mi nombre. Para que no se apague del todo.»'],
  c:[{x:'«Te lo prometo»',to:'c4_llanura',k:'social',fx:{fl:{kraka_hel:1},gl:5}}]},

/* ---------- Los perros de Hel y Garm ---------- */
c4_perros:{h:'Los perros de Hel',t:[
  'A medida que te acercas a la cueva, la llanura se vacía de muertos. Hasta ellos evitan este lugar. El suelo está lleno de huesos roídos, y el aire huele a sangre vieja.',
  'Delante de la cueva hay tres perros negros del tamaño de caballos, con los ojos rojos y babeando. Se levantan al verte. Son los cachorros de Garm.'],
  c:[{x:'Abrirte paso entre los perros',to:'c4_f_perros',k:'hunt'}]},

c4_f_perros:pelea('perro_hel','c4_garm','c4_llanura','El perro más grande se lanza contra Sleipnir. Los otros dos rodean al caballo.'),

c4_garm:{h:'Garm',cp:1,t:[
  'Los cachorros huyen aullando a la cueva. Y de la cueva sale su padre.',
  'Garm es el perro más grande que has visto nunca: más grande que el Oso de Escarcha, casi tan grande como Fenrir. Tiene el pecho manchado de sangre, como dicen los poemas, y los ojos como dos hogueras. Detrás de él, la reja de Helgrind se alza hasta el cielo negro.',
  'Garm te huele. Gruñe, y la tierra entera tiembla. Las profecías dicen que cuando se suelte, en el último día, matará a Tyr. Hoy está atado con una cadena gruesa a la entrada de su cueva. Pero la cadena es muy larga.'],
  c:[{x:'Ofrecerle pan: los que dieron pan en vida llevan pan para Garm',to:'c4_garm_pan',k:'main',oc:1,req:{fl:'dar'}},
     {x:'Congelarlo con la runa Isa y pasar',to:'c4_garm_isa',k:'main',oc:1,req:{runa:'isa'},chk:{s:'esp',dc:11,ok:'c4_garm_isa',ko:'c4_f_garm'}},
     {x:'Galopar a toda velocidad con Sleipnir hasta la reja',to:'c4_garm_carrera',k:'main',chk:{s:'ast',dc:12,ok:'c4_garm_carrera',ko:'c4_f_garm'}},
     {x:'Enfrentarte a Garm',to:'c4_f_garm',k:'hunt'}]},

c4_garm_pan:{t:[
  'Las viejas de Vindvik dicen que quien da pan a los pobres en vida, encuentra pan en el camino de Hel para calmar al perro. Te llevas la mano a la bolsa sin esperar nada… y encuentras dentro un pan que no estaba ahí. Pan de cebada, caliente, como el que hacía Siri.',
  'Lo recuerdas: la plata o la carne que le diste a Gudrun y a la pequeña Thora en la granja de Bersi. Le lanzas el pan a Garm. El perro lo atrapa al vuelo, lo mastica, se relame y se tumba en el suelo como un perro de granja, mirándote con algo parecido al cariño.',
  'Kraka está boquiabierto. «Así que era verdad», susurra. «Lo de las viejas. Era verdad.»'],
  fx:{fl:{garm_fin:1,garm_amigo:1},gl:30,saga:'Calmó a Garm, el perro de Hel, con el pan que ganó dando de comer a una viuda y a su hija.'},
  c:[{x:'Ir hacia la reja de Helgrind',to:'c4_helgrind',k:'main'}]},

c4_garm_isa:{t:[
  'Trazas Isa en el aire con todas tus fuerzas. La escarcha cubre a Garm desde las patas hasta el hocico, y el perro se queda inmóvil, con los ojos de fuego brillando dentro del hielo.',
  'No durará mucho. Pasas a su lado al galope, tan cerca que sientes su aliento a través del hielo. Detrás de ti oyes cómo empieza a crujir.'],
  fx:{fl:{garm_fin:1},gl:20},
  c:[{x:'Ir hacia la reja de Helgrind',to:'c4_helgrind',k:'main'}]},

c4_garm_carrera:{t:[
  'Sleipnir sale disparado. Garm salta tras vosotros, pero la cadena se tensa a un palmo de la cola del caballo y el perro cae de espaldas con un aullido de rabia.',
  'Kraka grita de alegría. Tú no, porque la reja de Helgrind está cada vez más cerca y no se abre.'],
  fx:{fl:{garm_fin:1},gl:15},
  c:[{x:'Ir hacia la reja de Helgrind',to:'c4_helgrind',k:'main'}]},

c4_f_garm:{t:['Garm se lanza contra ti con las fauces abiertas. Su cadena chirría como un barco en la tormenta.'],f:{e:'garm',win:'c4_garm_cae',lose:'muerte'}},

c4_garm_cae:{t:[
  'Garm cae de lado, jadeando. No está muerto: los perros de Hel no mueren así. Pero no se levanta. Te mira con sus ojos de hoguera, y en ellos ves algo que no esperabas: respeto.',
  'Las profecías dicen que en el último día Garm se soltará. Ahora sabes que, cuando lo haga, se acordará de ti.'],
  fx:{fl:{garm_fin:1,garm_vencido:1},gl:20,saga:'Venció a Garm, el perro de la puerta de Hel.'},
  c:[{x:'Ir hacia la reja de Helgrind',to:'c4_helgrind',k:'main'}]},

/* ---------- Helgrind ---------- */
c4_helgrind:{h:'Helgrind',t:[
  'La reja de Helgrind es tan alta que no ves dónde acaba. Sus barrotes son de hierro negro y están helados, y entre ellos se ve el reino de Hel: un valle gris, sin colores, y en el centro, un salón enorme de piedra húmeda.',
  'No hay cerradura. No hay guardián. La reja no se abre para los vivos. Los muertos la atraviesan como si no estuviera.',
  'Kraka mira a Sleipnir. Sleipnir te mira a ti. «En las canciones», dice Kraka, despacio, «Hermod saltó esta reja con Sleipnir. La saltó sin tocarla.» Mira hacia arriba. «Las canciones exageran mucho. Espero.»'],
  c:[{x:'Dar carrerilla y saltar',to:'c4_salto_ok',k:'main',chk:{s:'esp',dc:11,ok:'c4_salto_ok',ko:'c4_salto_ko'}},
     {x:'Saltar unid{o|a} a Sleipnir con la runa Ehwaz',to:'c4_salto_ok',k:'main',oc:1,req:{runa:'ehwaz'}}]},

c4_salto_ok:{h:'El salto',t:[
  'Sleipnir corre. Sus ocho patas golpean la tierra gris como un trueno. En el último instante, salta, y durante un momento que dura una eternidad volais por encima de la reja de Helgrind, tan alto que ves todo el reino de Hel bajo vosotros.',
  'Aterrizáis al otro lado sin tocar un barrote. Sleipnir relincha. Kraka grita de pura alegría. Y tú, con el corazón en la garganta, te das cuenta de que eres la segunda persona en toda la historia de los nueve mundos que ha entrado viva en el reino de Hel.'],
  fx:{fl:{helgrind:1},gl:30,saga:'Saltó la reja de Helgrind a lomos de Sleipnir, como Hermod en las canciones antiguas.'},
  c:[{x:'Mirar el reino de Hel',to:'c4_dentro',k:'main'}]},

c4_salto_ko:{h:'El salto',t:[
  'Sleipnir salta, pero tú no estás preparad{o|a}. Uno de sus cascos traseros roza el último barrote, y el hierro helado te araña la pierna al pasar. Durante un instante horrible crees que vais a caer.',
  'Caéis al otro lado, rodando por el suelo gris. Te duele todo. Pero estás dentro. Estás dentro del reino de Hel, y estás viv{o|a}.'],
  fx:{fl:{helgrind:1},hp:-40,gl:15},
  c:[{x:'Mirar el reino de Hel',to:'c4_dentro',k:'main'}]},

c4_dentro:{h:'El reino de Hel',cp:1,t:[
  'El reino de Hel no es como lo pintan los escaldos. No hay fuego, ni monstruos, ni gritos. Hay silencio. Un valle gris donde nada crece y nada se pudre, con un cielo bajo de nubes que no se mueven. Los muertos caminan despacio por senderos de piedra, sin prisa, porque aquí no hay nada por lo que tener prisa.',
  'En el centro del valle está el salón de Eljudnir. Sus muros son altos y húmedos, y sus puertas, enormes. En la entrada te esperan dos figuras: un criado y una criada tan lentos que tardan un día entero en dar un paso. Son Ganglati y Ganglot, los sirvientes de Hel. Te ven. Empiezan a girarse para saludarte.',
  'Kraka suspira. «A este paso», dice, «nos anunciarán para el Ragnarok.»'],
  fx:{fl:{c4p2fin:1},saga:'Llegó vivo al salón de Eljudnir, en el reino de Hel.'},
  c:[{x:'Caminar hacia el salón de Eljudnir',to:'c4_p3',k:'main'}]},

/* Escena de enlace provisional: la sustituirá la Parte 3 */
c4_p3:{h:'Continuará',t:[
  'Las puertas de Eljudnir se abren despacio, muy despacio, como todo en el reino de Hel.',
  '<span class=tag>Aquí termina la Parte 2 del Capítulo 4. La historia continúa en la Parte 3: «Todas las cosas lloran».</span>'],
  c:[{x:'Volver a la llanura de los que esperan',to:'c4_llanura'}]}

}});
})();
