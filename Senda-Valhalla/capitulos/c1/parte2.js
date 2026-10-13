/* =====================================================================
   Capítulo 1 · La Muerte de Paja
   Parte 2 · «El salón del jarl»
   Vida diaria en Vindvik hasta el banquete de Yule (noche del día 5).
   Amplía escenas de la Parte 1 (c1_aldea, c1_casa, c1_groa2).
   Continúa en parte3.js (c1_p3)
   ===================================================================== */
(()=>{
const pelea=(e,win,flee,t)=>({t:[t],f:{e,win,lose:'muerte',flee}});

/* ---------- Datos nuevos ---------- */
Object.assign(OBJ,{
  piel_zorro:{n:'Piel de zorro',tipo:'material',pr:5,d:'Roja como una brasa. A Hild le encantan.'},
  ambar:{n:'Ámbar del fiordo',tipo:'material',pr:25,d:'Resina de árboles muy antiguos. Dentro hay un mosquito que te mira.'},
  red_ingrid:{n:'Red remendada',tipo:'clave',d:'Prueba de que sabes hacer algo más que partir cráneos.'}
});
Object.assign(ENEMIGOS,{
  zorro:{n:'Zorro ladrón',cat:'Bestia',hp:24,a:5,gl:4,o:0,l:{piel_zorro:1}},
  draug_mar:{n:'Draug ahogado',cat:'No muerto',hp:62,a:11,gl:22,o:18,l:{ambar:1,hierro_pantano:.5}}
});
TIENDAS.hild.stock.push('miel','serbal');

registrarSenales({
  6:'Esta mañana no ha cantado ningún gallo en Vindvik. Ni uno.'
});

registrarMision(S=>{
  if(!S.fl.salon_noche)return null;
  if(!S.fl.p2)return 'Descansa. Mañana será otro día.';
  if(!S.fl.yule)return S.dia<5
    ?`Prepárate para el banquete de Yule, la noche del día 5 (hoy es el día ${S.dia}). Groa tiene encargos para ti.`
    :'Esta noche se celebra el banquete de Yule en el salón del jarl. Acude al anochecer.';
  if(!S.fl.p2fin)return 'Escucha las noticias que trae el jinete.';
  return null;
});

/* ---------- Duelos de injurias ---------- */
registrarSenna({
  orm:{rival:'Orm el Arenque',min:2,
    rondas:[
      {i:'Dicen que te levantaste de la cama de los muertos. Lástima: olías mejor muert{o|a}.',
       o:['Y tú hueles a arenque desde que naciste, y nadie se ha molestado en enterrarte.','¡Retira eso o te parto la cara!','Yo no huelo a nada.'],k:0,
       bien:'Los pescadores estallan en carcajadas. Orm se huele la manga, preocupado.',mal:'Eso no es una réplica. Los pescadores abuchean.'},
      {i:'Tu hacha está tan mellada que solo sirve para peinar ovejas.',
       o:['Mi hacha está perfectamente afilada.','Pues acércate, que tienes más lana que ellas.','Las ovejas no se peinan.'],k:1,
       bien:'Orm se toca la barba enmarañada y alguien le lanza un balido.',mal:'Orm sonríe. Has defendido el hacha, no tu honor.'},
      {i:'He visto focas con más gracia en tierra que tú en un barco.',
       o:['Yo nunca me he caído de un barco.','Las focas son animales muy elegantes.','No me extraña que las hayas visto: vienen a tu casa por Yule.'],k:2,
       bien:'Hasta Orm se ríe. Te pasa su jarra.',mal:'Silencio incómodo. Alguien tose.'}],
    fx:{gl:8,plata:10,saga:'Venció a Orm el Arenque en un duelo de injurias en el muelle.'},
    fxko:{},
    ok:'Orm alza la jarra: «¡Lengua de escaldo! Eso vale una ronda.» Te paga lo apostado.',
    ko:'Orm se ríe con todos sus dientes, que son cuatro. «Vuelve cuando la lengua te corte tanto como el hacha.»'},
  torgil:{rival:'Torgil',min:3,
    rondas:[
      {i:'Nueve días en la cama y ahora te crees {un héroe|una heroína}. He visto gallinas más valientes.',
       o:['Y yo he visto a tu padre pagar plata para que te dejaran subir al barco.','¡Al menos yo no soy una gallina!','Las gallinas también tienen su valor.'],k:0,
       bien:'Un rugido de risas. El padre de Torgil se esconde tras su cuerno.',mal:'Torgil sonríe. Nadie se ha reído.'},
      {i:'Mataste un lobo flaco y ya te sientas junto al jarl. En mi casa eso lo hacen los perros.',
       o:['No era un lobo tan flaco.','Lo sé. Por eso en tu casa mandan los perros.','Tu casa huele a perro.'],k:1,
       bien:'Hasta los perros del salón parecen reírse.',mal:'Torgil se encoge de hombros: todas las casas huelen a perro.'},
      {i:'Cuando yo muera, las valquirias se pelearán por llevarme.',
       o:['Las valquirias no se pelean.','A mí ya ha venido a verme una.','Se pelearán, sí: por ver a cuál le toca cargar contigo.'],k:2,
       bien:'Eyvind el escaldo apunta la frase en una tablilla.',mal:'Algunos te miran raro. ¿Una valquiria? Torgil aprovecha para burlarse.'},
      {i:'Ese sitio en la mesa del jarl me pertenece.',
       o:['Siéntate en él cuando quieras. Debajo de la mesa, como siempre.','El jarl me lo dio a mí.','Hay sitio para los dos.'],k:0,
       bien:'El salón golpea las mesas. Torgil enrojece hasta las orejas.',mal:'Hakon carraspea. No ha sonado muy convincente.'}],
    fx:{fl:{torgil_vencido:1},cumple:'torgil',gl:20,saga:'Humilló a Torgil en un duelo de injurias durante el banquete de Yule.'},
    fxko:{fl:{torgil_gana:1},gl:-5},
    ok:'El salón entero golpea las mesas con los cuernos. Torgil se sienta sin decir nada, y Hakon te sirve él mismo la cerveza.',
    ko:'Torgil alza los brazos entre aplausos. Esta noche ha ganado él. Pero las noches de invierno son largas.'}
});

/* ---------- Ampliaciones de la Parte 1 ---------- */
SC.c1_aldea.c.push(
  {x:'Acudir al banquete de Yule',to:'c1_yule',k:'main',oc:1,req:{fl:'p2',no:'yule',dia:5,hmin:17}},
  {x:'Volver a casa a esperar el banquete',to:'c1_casa',k:'main',oc:1,req:{fl:'p2',no:'yule',dia:5,hmax:16}},
  {x:'Subir al salón del jarl',to:'c1_salon_dia',k:'main',oc:1,req:{fl:'p2',no:'yule'}},
  {x:'La herrería de Gunnar',to:'c1_herreria',k:'shop',oc:1,req:{fl:'p2'}},
  {x:'El puesto de la vieja Hild',to:'c1_hild',k:'shop',oc:1,req:{fl:'p2'}},
  {x:'Las turberas · 1 h',to:'c1_turberas',k:'hunt',oc:1,req:{fl:'p2'},fx:{t:1}},
  {x:'Los pastos altos · 2 h',to:'c1_pastos',k:'hunt',oc:1,req:{fl:'enc_raidho',no:'raidho'},fx:{t:2}},
  {x:'La cueva de las focas · 1 h',to:'c1_cueva',k:'hunt',oc:1,req:{fl:'enc_kenaz',no:'kenaz'},fx:{t:1}},
  {x:'Bajar al muelle',to:'c1_muelle',k:'social',oc:1,req:{fl:'p2'}},
  {x:'El tablón de peticiones junto al pozo',to:'c1_tablon',k:'side',oc:1,req:{fl:'p2'}}
);
SC.c1_casa.c.push(
  {x:'Hablar con Siri de su futuro',to:'c1_siri_pide',k:'social',oc:1,req:{fl:'p2',no:'siri_pide'}},
  {x:'Descansar hasta el anochecer',to:'c1_aldea',k:'side',oc:1,req:{fl:'p2',hmax:16},fx:{hasta:18,hp:30}}
);
SC.c1_groa2.c.push(
  {x:'Preguntarle qué puedes hacer por ella',to:'c1_encargos',k:'main',oc:1,req:{fl:'p2',no:'encargos'}},
  {x:'Aprender Uruz: la prueba del fiordo helado',to:'c1_uruz',k:'main',oc:1,req:{fl:'encargos',no:'uruz'}},
  {x:'Hablarle de Siri',to:'c1_siri_groa',k:'social',oc:1,req:{fl:'siri_pide',no:['siri_aprendiz','siri_no']}},
  {x:'Usar el caldero',to:'c1_caldero',k:'shop',oc:1,req:{fl:'p2'}},
  {x:'Pedirle que fortalezca tus runas',to:'c1_taller',k:'shop',oc:1,req:{fl:'p2'}}
);
SC.c1_groa2.sort=1;

registrarCapitulo({capitulo:1,parte:2,titulo:'El salón del jarl',escenas:{

/* ---------- Apertura ---------- */
c1_colinas:{h:'Luces en las colinas',t:[
  'Sales del salón con el cuerno todavía en la mano. Fuera, la nieve cae en silencio y las colinas de los túmulos brillan como brasas de hielo. Nadie más ha salido a mirar.',
  'Bueno, casi nadie. Eyvind el escaldo está apoyado en la pared, con la lira a la espalda. «El rey Rolf», dice sin mirarte. «Lo enterraron ahí arriba hace doscientos años, con su barco, su caballo y su espada, Muerdetumbas. Dicen que juró no descansar mientras Vindvik estuviera en peligro.» Se encoge de hombros. «Los reyes juran muchas cosas.»',
  'Kraka se esponja en tu hombro. «Los muertos que juran algo», murmura, «son los peores. No saben cuándo parar.»'],
  c:[{x:'Volver a casa a dormir',to:'c1_amanecer',k:'main',fx:{hasta:8,dormir:1}}]},

c1_amanecer:{h:'Tres días para Yule',cp:1,t:[
  'Te despierta el olor del pan de cebada. Siri lleva levantada desde antes del alba y ha ordenado la casa como si esperaran a un rey. Cuando le preguntas, se pone colorada.',
  '«Quería pedirte una cosa», dice al fin. «Pero luego. Primero come.»',
  'Por la ventana ves que Vindvik ha cambiado. La gente sigue mirándote, pero ya no con miedo: los niños te siguen a distancia, y un pescador que antes cruzaba la calle para no saludarte te ofrece un arenque ahumado. En la puerta del salón, un mozo clava en el poste un aviso: el banquete de Yule será la noche del quinto día.'],
  fx:{fl:{p2:1},saga:'Volvió a ser {bienvenido|bienvenida} en Vindvik.'},
  c:[{x:'Salir al pueblo',to:'c1_aldea',k:'main'}]},

/* ---------- Comercio ---------- */
c1_herreria:{h:'La herrería de Gunnar',t:[
  'La herrería de Gunnar es el único lugar caliente de Vindvik, y el herrero lo sabe: trabaja sin camisa, con los brazos como troncos de roble y una barba chamuscada en tres sitios distintos.',
  '«{N}», gruñe sin dejar de martillear. «Me alegro de que no te murieras. Me debías un hacha.» No es verdad, pero tampoco vas a discutir con un hombre que tiene un martillo en la mano. «Tráeme hierro de pantano y plata, y te forjo lo que haga falta.»'],
  forja:1,back:'c1_aldea'},

c1_hild:{h:'El puesto de la vieja Hild',t:[
  'La vieja Hild vende de todo bajo un toldo de piel remendada: ungüentos, carne seca, cuerdas, pieles, hidromiel y chismes, que regala con cada compra.',
  '«Así que no te moriste», dice al verte. «Lástima. Te había apartado unos calcetines de luto preciosos.»'],
  shop:'hild',back:'c1_aldea'},

c1_caldero:{h:'El caldero de Groa',t:[
  'Groa te deja usar su caldero a cambio de que no toques nada más. «Y si algo explota», añade, «la culpa es tuya.»'],
  caldero:1,back:'c1_groa2'},

c1_taller:{h:'Fortalecer las runas',t:[
  'Groa coge tu mano marcada y traza sobre ella los signos que ya conoces, más hondos esta vez. Duele un poco. «Una runa se gasta como un camino», dice. «Cuanto más la recorres, más fácil es llegar.» Luego extiende la otra mano. «La plata, por adelantado.»'],
  taller:1,back:'c1_groa2'},

/* ---------- Siri ---------- */
c1_siri_pide:{h:'Lo que quiere Siri',t:[
  'Siri espera a que termines el pan. Luego lo suelta de golpe, como quien salta al agua fría: «Quiero ser aprendiz de Groa. Quiero aprender las runas, y las hierbas, y a ver lo que va a pasar.»',
  '«Groa dice que no acepta aprendices desde hace veinte años. Pero a ti te escucha. Tú tienes la marca.» Te mira con los ojos de su padre. «Por favor.»'],
  fx:{fl:{siri_pide:1}},
  c:[{x:'Prometerle que hablarás con Groa',to:'c1_casa',k:'social'}]},

c1_siri_groa:{t:[
  'Cuando nombras a Siri, Groa deja de remover el caldero. «La niña», dice. «Viene cada día a mirar por la rendija de la puerta. Cree que no la oigo.»',
  '«Las runas no son un juego, {N}. Las völvas vemos cosas que nadie debería ver, y nadie se casa con una völva ni la invita a su mesa. ¿Respondes por ella? ¿De verdad quieres eso para la hija de tu hermano?»'],
  c:[{x:'Responder por ella: es su vida y su elección',to:'c1_groa2',k:'social',
      fx:{fl:{siri_aprendiz:1},gl:5,saga:'Respondió por su sobrina Siri para que fuera aprendiz de la völva Groa.'}},
     {x:'Decirle que Siri es demasiado joven',to:'c1_groa2',k:'social',fx:{fl:{siri_no:1}}}]},

/* ---------- Encargos de Groa: Uruz, Raidho y Kenaz ---------- */
c1_encargos:{h:'Los encargos de la völva',t:[
  '«¿Por mí?» Groa se ríe. «Nada. Pero hay mucho que puedes hacer por ti. Te quedan muchas runas por aprender, y las runas no se regalan: se ganan.»',
  '«La primera, <b>Uruz</b>, la del uro, es la runa de la fuerza que aguanta. Para eso basta con un baño.» Sonríe con todas sus arrugas. «En el fiordo.»',
  '«Para <b>Raidho</b>, la runa del camino, sube a los pastos altos y llévale este saquito de hierbas a la pastora Asa. Lleva días sin bajar, y eso no es normal. Y para <b>Kenaz</b>, la antorcha, necesito ámbar. Hay en la cueva de las focas, al otro lado del muelle. Lleva luz. Los pescadores dicen que de noche se oyen voces allí dentro.»'],
  fx:{fl:{encargos:1,enc_raidho:1,enc_kenaz:1}},
  back:'c1_groa2'},

c1_uruz:{h:'El fiordo helado',t:[
  'Groa te lleva hasta la orilla del fiordo, donde el hielo nuevo cruje contra las piedras. Siri os sigue a distancia, haciendo como que recoge leña.',
  '«Al agua», dice la völva. «Hasta el cuello. Y aguanta mientras cuento hasta cien. El uro no es el animal más fuerte del bosque, pero sí el que más aguanta. Eso es Uruz.»'],
  c:[{x:'Meterte en el agua helada',to:'c1_uruz_ok',k:'main',chk:{s:'esp',dc:8,ok:'c1_uruz_ok',ko:'c1_uruz_ko',fxko:{hp:-15,t:1}}}]},

c1_uruz_ok:{t:[
  'El frío es un puño que te aprieta el pecho. Cuentas con Groa: diez, veinte, cincuenta. A los setenta ya no sientes los pies. A los cien sales del agua tambaleándote, con la piel morada y la marca de la mano ardiendo como un hierro al rojo.',
  'Groa te envuelve en una piel de oso. «Bien», dice, y ese «bien» vale más que cien elogios de Eyvind. Te traza la runa en la frente con el dedo: <b>Uruz</b>.'],
  fx:{runa:'uruz',fl:{uruz:1},gl:8,t:1},
  c:[{x:'Volver a la cabaña de Groa',to:'c1_groa2'}]},

c1_uruz_ko:{t:[
  'A los cuarenta, el frío gana. Sales del agua a gatas, con los dientes castañeteando tan fuerte que no puedes ni maldecir.',
  '«Mañana más», dice Groa sin compasión. Siri te pone una manta por encima e intenta no reírse. Lo intenta mucho.'],
  c:[{x:'Volver a la cabaña de Groa',to:'c1_groa2'}]},

c1_pastos:{h:'Los pastos altos',t:[
  'Los pastos altos están enterrados bajo la nieve. La cabaña de la pastora Asa humea a lo lejos, pero el corral está vacío y la cerca destrozada. Hay sangre de oveja, y unas huellas enormes que no son de lobo.',
  '«Oso», dice Kraka. «Uno muy grande, y despierto en verano, porque este verano es invierno. Los osos odian que les cambien las estaciones.»',
  'Un rugido sale del bosquecillo de abedules. Junto a la cabaña, la puerta está atrancada desde dentro.'],
  c:[{x:'Interponerte entre el oso y la cabaña',to:'c1_f_oso',k:'hunt'},
     {x:'Volver a Vindvik · 2 h',to:'c1_aldea',fx:{t:2}}]},

c1_f_oso:pelea('oso','c1_pastos_tras','c1_aldea','El oso sale de entre los abedules, de pie sobre las patas traseras. Es más alto que la puerta del salón del jarl.'),

c1_pastos_tras:{t:[
  'El oso se derrumba sobre la nieve con un temblor que sientes en los pies. La puerta de la cabaña se abre y aparece Asa, una mujer de mejillas rojas y brazos de leñadora, con una horca en las manos y cara de no haber pegado ojo en tres días.',
  '«¡Por la barba de Thor!», exclama. «Llevo tres noches con ese bicho rascando la puerta.» Te da tanta carne seca y tantos panales de miel que casi no puedes cargarlos.',
  'De vuelta en Vindvik, Groa escucha la historia en silencio, coge tu mano y traza en ella una runa como un camino que sube: <b>Raidho</b>. «El camino que llevas», dice, «y el que te lleva a ti.»'],
  fx:{fl:{raidho:1},runa:'raidho',item:{miel:3,carne_seca:2},gl:8,t:2,saga:'Mató a un oso enorme en los pastos altos y salvó a la pastora Asa.'},
  c:[{x:'Volver a Vindvik',to:'c1_aldea'}]},

c1_cueva:{h:'La cueva de las focas',t:[
  'La cueva se abre bajo el acantilado, más allá del muelle, y solo se puede entrar con la marea baja. Dentro huele a sal, a algas podridas y a algo más viejo que no sabrías nombrar. Las focas que le dan nombre se han ido.',
  'Al fondo, entre las rocas, brilla el ámbar: gotas doradas como miel petrificada. Y junto al ámbar, sentado en el agua hasta la cintura, hay un hombre. No respira. Tiene algas en la barba y los ojos blancos como conchas.',
  'Se levanta. El agua le cae del cuerpo en cascada. «Kraka», susurras. «Sí», dice el cuervo, muy bajito. «Es un draug. Y se ha despertado al mismo tiempo que las colinas.»'],
  c:[{x:'Alzar el hacha',to:'c1_f_draug',k:'hunt'},
     {x:'Salir de la cueva antes de que suba la marea · 1 h',to:'c1_aldea',fx:{t:1}}]},

c1_f_draug:pelea('draug_mar','c1_cueva_tras','c1_aldea','El draug avanza sin prisa, arrastrando los pies por el agua. Cuando abre la boca, sale el ruido del mar en una noche de tormenta.'),

c1_cueva_tras:{t:[
  'El draug se deshace en el agua como un montón de algas. Solo quedan unos huesos verdosos y un brazalete de plata ennegrecida.',
  'Te llevas el ámbar y vuelves a Vindvik con un mal presentimiento. Groa lo nota en cuanto entras. «Un draug», dice antes de que hables. «Uno de los ahogados de la gran tormenta, hace diez años.» Calla. Tu hermano se ahogó en esa tormenta. Ninguna de las dos lo dice.',
  'La völva frota un trozo de ámbar entre las manos hasta que se calienta, y con él traza una runa en tu palma: una antorcha en la oscuridad. <b>Kenaz</b>. «Los muertos no soportan la luz», dice. «Vas a necesitarla.»'],
  fx:{fl:{kenaz:1,draug_visto:1},runa:'kenaz',gl:8,t:1,saga:'Destruyó al draug ahogado de la cueva de las focas.'},
  c:[{x:'Volver a Vindvik',to:'c1_aldea'}]},

/* ---------- Turberas, muelle y tablón ---------- */
c1_turberas:{h:'Las turberas',t:[
  'Al norte del pueblo se extienden las turberas: un mar de musgo pardo, charcas negras y niebla a ras de suelo. Bajo la turba se esconden vetas de mineral rojizo que los herreros llaman hierro de pantano.',
  'Cavar aquí es un trabajo duro, sucio y aburrido. Kraka se niega a ayudar porque «los cuervos no cavamos, supervisamos».'],
  c:[{x:'Cavar hierro de pantano · 2 h',to:'c1_turberas',k:'side',fx:{item:{hierro_pantano:1},t:2}},
     {x:'Volver a Vindvik · 1 h',to:'c1_aldea',fx:{t:1}}]},

c1_muelle:{h:'El muelle',t:[
  'El muelle de Vindvik es un pasillo de tablones cubiertos de escarcha. Los barcos de pesca siguen varados: nadie se atreve a salir con el fiordo medio helado en pleno verano.',
  'Los pescadores sin trabajo matan el tiempo bebiendo y discutiendo. El rey del muelle es Orm el Arenque, un viejo con cuatro dientes y la lengua más afilada del pueblo. «¡Mirad quién viene!», grita al verte. «¡{El muerto|La muerta} que anda! ¿Te atreves con un duelo de palabras, o también se te ha muerto la lengua?»'],
  c:[{x:'Aceptar el duelo de injurias',to:'c1_senna_orm',k:'social',oc:1,req:{no:'sn_orm'}},
     {x:'Vender pieles a los pescadores',to:'c1_muelle',k:'shop',oc:1,req:{item:'piel_lobo'},fx:{quita:{piel_lobo:1},plata:6}}],
  back:'c1_aldea'},

c1_senna_orm:{h:'Duelo de injurias',t:[
  'Los pescadores forman un corro y apuestan. Las reglas son sencillas: quien conteste con más ingenio, gana. Quien llegue a las manos, pierde y paga la ronda.'],
  senna:'orm',back:'c1_muelle'},

c1_tablon:{h:'El tablón de peticiones',t:[
  'Junto al pozo hay un poste de madera donde los vecinos dejan peticiones grabadas en tablillas: lo que necesitan y lo que pagarán. Casi nadie sabe leer runas, así que la mitad son dibujos.'],
  c:[{x:'Una red con un agujero enorme: la viuda Ingrid pide ayuda para remendarla · 2 h',to:'c1_red_ok',k:'side',oc:1,req:{no:'t_red'},
      chk:{s:'ast',dc:7,ok:'c1_red_ok',ko:'c1_red_ko'},fx:{t:2}},
     {x:'Una gallina y un zorro: Ulla quiere cazar al zorro que le roba las gallinas',to:'c1_f_zorro',k:'hunt',oc:1,req:{no:'t_zorro'}},
     {x:'Un martillo y tres piedras: el herrero Gunnar paga por hierro de pantano',to:'c1_hierro',k:'side',oc:1,req:{no:'t_hierro'}}],
  back:'c1_aldea'},

c1_red_ok:{t:[
  'La red de Ingrid tiene un agujero por el que cabría una ballena. Te pasas dos horas anudando cuerda mojada mientras la viuda te cuenta la vida de cada vecino de Vindvik, incluidas partes que no querías conocer.',
  'Al final la red queda como nueva. Ingrid te da unas monedas y un beso en la mejilla que pincha. Kraka no deja de reírse durante el resto del día.'],
  fx:{fl:{t_red:1},plata:15,gl:4,item:'red_ingrid'},
  c:[{x:'Volver al tablón',to:'c1_tablon'}]},

c1_red_ko:{t:[
  'Lo intentas, pero tus nudos se deshacen solos. Ingrid te mira con lástima, te quita la cuerda de las manos y lo termina ella en la mitad de tiempo.',
  '«Tú dedícate a las hachas», dice, no sin cariño.'],
  fx:{fl:{t_red:1}},
  c:[{x:'Volver al tablón',to:'c1_tablon'}]},

c1_f_zorro:pelea('zorro','c1_zorro_ok','c1_tablon','El zorro de Ulla es rojo, gordo y descarado. Te mira desde el gallinero con una gallina en la boca, como si te desafiara.'),

c1_zorro_ok:{t:[
  'El zorro ya no robará más gallinas. Ulla te da dos huevos, una moneda y la piel del zorro, «para que hagas algo bonito».',
  '«Una hazaña digna de las sagas», comenta Kraka. «Eyvind ya está componiendo: <i>Y {N} venció al terrible zorro, azote de gallinas…</i>»'],
  fx:{fl:{t_zorro:1},plata:5,gl:3},
  c:[{x:'Volver al tablón',to:'c1_tablon'}]},

c1_hierro:{t:[
  'La tablilla de Gunnar es sencilla: tres piedras rojizas y un martillo. Tres medidas de hierro de pantano, y el herrero pagará bien. Las turberas están al norte del pueblo.'],
  c:[{x:'Entregarle 3 de hierro de pantano a Gunnar',to:'c1_hierro_ok',k:'side',req:{item:{hierro_pantano:3}}}],
  back:'c1_tablon'},

c1_hierro_ok:{t:[
  'Gunnar sopesa el mineral con una mano y gruñe satisfecho. «Buen hierro. Mejor de lo que esperaba de ti.» Te paga, y por primera vez casi sonríe.',
  '«Si me traes más, te lo pagaré igual de bien. Y si algún día necesitas un hacha de verdad, ven a verme antes que a nadie.»'],
  fx:{fl:{t_hierro:1},quita:{hierro_pantano:3},plata:30,gl:4},
  c:[{x:'Volver al tablón',to:'c1_tablon'}]},

/* ---------- El salón de día ---------- */
c1_salon_dia:{h:'El salón de día',t:[
  'De día, el salón del jarl huele menos a cerveza y más a trabajo: criados que barren, guerreros que afilan armas y perros que dormitan junto al fuego. Se preparan barriles para el banquete de Yule.',
  'Hakon está ocupado con los pastores, que se quejan del invierno como si fuera culpa suya. En un rincón, Eyvind el escaldo repasa versos en voz baja. Junto al fuego, un joven con un manto rojo demasiado caro te observa con desprecio: Torgil, el hijo del granjero más rico de Vindvik.'],
  c:[{x:'Hablar con Eyvind el escaldo',to:'c1_eyvind',k:'social',oc:1,req:{no:'eyvind'}},
     {x:'Acercarte a Torgil',to:'c1_torgil',k:'social',oc:1,req:{no:'torgil'}}],
  back:'c1_aldea'},

c1_eyvind:{t:[
  '«El rey Rolf», dice Eyvind cuando le preguntas por las luces. «Fue el último rey de Vindvik, antes de que hubiera jarls. Murió en una batalla contra los gigantes del norte, o eso dice la canción, y lo enterraron en la colina más alta con su barco y su espada.»',
  '«Muerdetumbas», añade bajando la voz. «Una espada forjada por enanos que muerde la carne de los muertos. Dicen que Rolf juró defender Vindvik incluso después de muerto. Si eso es verdad…» Mira hacia las colinas. «Si eso es verdad, algo muy malo tiene que estar pasando para que se haya despertado.»'],
  fx:{fl:{eyvind:1,rolf_leyenda:1}},
  back:'c1_salon_dia'},

c1_torgil:{t:[
  'Torgil no se levanta. «Así que tú eres {el famoso|la famosa} {N}. {El que|La que} se murió y no se murió.» Se ríe, y sus amigos también. «Mi padre dice que fue la fiebre la que se cansó de ti.»',
  '«Ese sitio a la derecha del jarl era mío antes de que tú mataras un par de lobos. En el banquete de Yule veremos quién tiene la lengua más rápida.» Escupe en el fuego. «Si es que no se te muere también.»',
  'Kraka te pellizca la oreja. «Ese», susurra, «es de los que juran mucho y cumplen poco. Lo noto en las plumas.»'],
  fx:{fl:{torgil:1}},
  back:'c1_salon_dia'},

/* ---------- El banquete de Yule ---------- */
c1_yule:{h:'El banquete de Yule',cp:1,t:[
  'El salón de Hakon está irreconocible. Hay ramas de abeto en las vigas, cerdos asándose en dos hogueras y barriles de cerveza abiertos a lo largo de las paredes. Es pleno verano y fuera nieva, pero dentro todo es Yule: calor, humo y gritos.',
  'Siri se ha puesto su mejor vestido y no se separa de Groa. Eyvind toca la lira. Torgil está sentado frente a ti, sonriendo como un zorro en un gallinero.',
  'Cuando los cerdos están a medio comer, Hakon se pone en pie y alza un cuerno enorme, con el borde de plata. «¡El brindis de los juramentos!», ruge. «Que cada uno jure ante los dioses lo que hará este invierno. Y que los dioses le escupan si no lo cumple.» El cuerno empieza a pasar de mano en mano.'],
  fx:{fl:{yule:1}},
  c:[{x:'Esperar tu turno',to:'c1_brindis',k:'main'}]},

c1_brindis:{h:'El brindis de los juramentos',t:[
  'El cuerno llega a tus manos. Pesa. El salón entero se calla para escucharte. Kraka, posado en una viga, cruza las alas como si rezara.',
  '<span class=tag>Puedes hacer más de un juramento. Recuerda: un juramento cumplido da mucha Gloria; uno roto te mancha para siempre.</span>'],
  c:[{x:'«Juro que bajaré al túmulo del rey Rolf y traeré su espada antes de cuatro días»',to:'c1_brindis',k:'main',oc:1,req:{no:'jur_rolf'},
      fx:{fl:{jur_rolf:1},jura:{id:'rolf',txt:'Bajar al túmulo del rey Rolf y traer la espada Muerdetumbas',dias:4,gl:60}}},
     {x:'«Juro que esta misma noche haré callar a Torgil»',to:'c1_brindis',k:'main',oc:1,req:{no:'jur_torgil'},
      fx:{fl:{jur_torgil:1},jura:{id:'torgil',txt:'Hacer callar a Torgil durante el banquete de Yule',dias:0,gl:25}}},
     {x:'«Juro que protegeré a Siri mientras me quede aliento»',to:'c1_brindis',k:'social',oc:1,req:{no:'jur_siri'},
      fx:{fl:{jur_siri:1},gl:5,saga:'En el banquete de Yule juró proteger a su sobrina Siri mientras le quedara aliento.'}},
     {x:'Beber y pasar el cuerno',to:'c1_yule_torgil',k:'n'}]},

c1_yule_torgil:{t:[
  'El cuerno llega a Torgil. Se levanta despacio, se aparta el manto rojo y te mira directamente.',
  '«Yo juro», dice, «que antes de que acabe la noche todo Vindvik sabrá que el sitio de {N} junto al jarl es un error.» Sus amigos golpean las mesas. «¡Te reto a un duelo de injurias! Aquí, delante de todos.»',
  'Hakon sonríe por primera vez en toda la noche. Nada le gusta más a un jarl que un buen espectáculo que no le cuesta nada.'],
  c:[{x:'Aceptar el reto',to:'c1_yule_senna',k:'main'}]},

c1_yule_senna:{h:'Duelo de injurias',t:[
  'El salón se aparta para dejar un círculo junto al fuego. Eyvind afina la lira para marcar los asaltos. Siri te mira con los puños apretados.'],
  senna:'torgil',back:'c1_yule_tras'},

c1_yule_tras:{t:[
  'La fiesta sigue hasta muy tarde. Corre la cerveza, Eyvind canta la saga del Lobo Ceniza (con un oso y tres gigantes que tú no recuerdas) y Siri se queda dormida sobre el hombro de Groa.',
  'Cuando la luna ya está alta, sales a tomar el aire. La nieve ha dejado de caer. Las colinas de los túmulos siguen brillando, más que nunca. Y por el camino del norte se acerca un caballo al galope, con un jinete medio caído sobre el cuello.'],
  c:[{x:'Correr hacia el jinete',to:'c1_jinete',k:'main'}]},

c1_jinete:{h:'El jinete',cp:1,t:[
  'El jinete es Bersi, el hijo del granjero de la colina. Tiene la cara blanca y un tajo en el brazo que no sangra como sangran los tajos normales: sale una sangre oscura y fría.',
  '«Los muertos», jadea mientras lo bajas del caballo. «Salieron de las colinas. Los guerreros del rey Rolf, con sus armaduras viejas… Entraron en la granja. Mi padre…» No termina.',
  'El salón se vacía detrás de ti. Hakon llega con la espada desenvainada y la borrachera de golpe evaporada. Mira las colinas, te mira a ti, y no tiene que decir nada.',
  'Kraka se posa en tu hombro. Por una vez, no hace ningún chiste. «Mañana», dice. «Al túmulo. Y que Skuld nos ayude.»'],
  fx:{fl:{p2fin:1},saga:'La noche de Yule, los muertos del rey Rolf salieron de las colinas.'},
  c:[{x:'Prepararte para lo que viene',to:'c1_p3',k:'main',fx:{hasta:8,dormir:1}}]}

}});
})();
