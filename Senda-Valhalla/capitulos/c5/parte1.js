/* =====================================================================
   Capítulo 5 · El Crepúsculo
   Parte 1 · «Las puertas del Valhalla»
   La valquiria Sigrun abre una puerta. Un día entre los einherjar:
   tres duelos (Starkad, Hervor, Sigmund) en los que nadie muere de
   verdad, el banquete con Saehrimnir y Heidrun, el abuelo del
   protagonista, Bragi, las bandrunas de Odín, el juicio de las
   valquirias y la revelación de Skuld: lo que de verdad está tejiendo.
   Convierte c4_fin en enlace hacia c5_inicio.
   Continúa en parte2.js (c5_p2)
   ===================================================================== */
(()=>{
/* ---------- Bandrunas: combinaciones de dos runas (ætt nuevo) ---------- */
AETT.push('Bandrunas');
Object.assign(RUNAS,{
  rayo_helado:{n:'Rayo helado',sym:'ᚦᛁ',a:3,c:22,dmg:[30,42],s:'fue',aturde:1,d:'Thurisaz e Isa: un rayo que congela al enemigo.'},
  escudo_herencia:{n:'Escudo de la herencia',sym:'ᛉᛟ',a:3,c:26,esc:4,cura:[30,40],d:'Algiz y Othala: los antepasados te protegen y te curan.'},
  granizo_alba:{n:'Granizo del amanecer',sym:'ᚺᛞ',a:3,c:34,dmg:[55,70],s:'fue',d:'Hagalaz y Dagaz: la tormenta del último día.'},
  sol_abedul:{n:'Sol del abedul',sym:'ᛒᛊ',a:3,c:24,cura:[45,60],regen:[12,16],d:'Berkano y Sowilo: la vida que vuelve a crecer.'},
  lanza_manco:{n:'Lanza del manco',sym:'ᛏᚾ',a:3,c:26,dmg:[40,52],s:'fue',crit:1,desesp:1,d:'Tiwaz y Nauthiz: el sacrificio que golpea más fuerte cuanto más duele.'}
});
Object.assign(GRABADO,{
  rayo_helado:{atq:6,aturde:15,d:'+6 de ataque y 15 % de congelar al golpear.'},
  escudo_herencia:{def:8,arm:3,curaV:15,d:'+8 % de defensa, +3 de armadura y 15 de Vida al vencer.'},
  granizo_alba:{atq:14,d:'+14 de ataque.'},
  sol_abedul:{roba:15,curaV:20,d:'Roba un 15 % de vida y recuperas 20 al vencer.'},
  lanza_manco:{atq:8,crit:10,d:'+8 de ataque y +10 % de crítico.'}
});

/* ---------- Datos nuevos ---------- */
Object.assign(OBJ,{
  carne_saehrimnir:{n:'Carne de Saehrimnir',tipo:'consumible',ef:{hp:150},pr:80,d:'Del jabalí que se cocina cada noche y renace cada mañana. Recupera 150 de Vida.'},
  hidromiel_heidrun:{n:'Hidromiel de Heidrun',tipo:'consumible',ef:{hp:60,fu:100},pr:120,d:'De la cabra que pasta en el tejado del Valhalla. +60 de Vida y Furor al máximo.'}
});
Object.assign(ENEMIGOS,{
  starkad:{n:'Starkad el Viejo',cat:'Einherjar · el guerrero de las tres vidas',hp:300,a:32,gl:60,o:0},
  hervor:{n:'Hervor',cat:'Einherjar · la doncella escudera',hp:280,a:33,gl:60,o:0},
  sigmund:{n:'Sigmund el Volsungo',cat:'Einherjar · el padre de héroes',hp:340,a:34,gl:70,o:0}
});

registrarSenales({
  56:'En el Valhalla no amanece: la luz entra por los escudos del techo cuando Odín decide que es de día.'
},S=>S.fl.c5&&!S.fl.c5p1fin);

registrarMision(S=>{
  if(!S.fl.c5)return null;
  if(!S.fl.dia_valhalla)return 'Entra en el Valhalla.';
  if(!S.fl.duelos_fin)return 'Sobrevive a un día entre los einherjar: tres duelos en el campo del Valhalla.';
  if(!S.fl.juicio)return 'Acude al banquete de los einherjar.';
  if(!S.fl.skuld_revela)return 'Antes de dormir, alguien te espera en la puerta del Valhalla.';
  if(!S.fl.c5p1fin)return 'Escucha a Skuld.';
  return null;
});

/* ---------- Enlace desde el Capítulo 4 y marcas que faltaban ---------- */
Object.assign(SC.c4_fin,{end:null,saga:null,
  fx:{fin:'Capítulo 4 completado',saga:'Pasó el tercer invierno sin verano en Asgard, esperando el fin.'},
  c:[{x:'Continuar con el Capítulo 5: El Crepúsculo',to:'c5_inicio',k:'main'}]});
SC.c4_fin.t=SC.c4_fin.t.map(p=>p.replace('<span class=tag>Has completado el Capítulo 4: El Camino de Hel. La senda continúa en el Capítulo 5: El Crepúsculo.</span>','<span class=tag>Has completado el Capítulo 4: El Camino de Hel.</span>'));
SC.c4_sombras_paz.fx=Object.assign({},SC.c4_sombras_paz.fx,{fl:{nombres:1}});

/* ---------- Textos variables ---------- */
GEN.c5_inicio=()=>{
  if(!S.fl.nombres&&S.saga.some(x=>x.includes('nombres de los guerreros olvidados')))S.fl.nombres=1;
  return {t:[
  'Una noche, la voz que dice tu nombre detrás de las puertas del Valhalla deja de susurrar. Habla claro, alto, con impaciencia, como quien llama a alguien que llega tarde.',
  'Te acercas a la puerta más cercana. Es tan ancha que podrían pasar ochocientos guerreros a la vez, y está hecha de escudos clavados unos sobre otros. Kraka, en tu hombro, se ha despertado de golpe. «Esa voz», susurra. «Esa voz la conozco.»',
  'La puerta se abre. Solo un poco, lo justo para que pase una persona. Al otro lado hay una mujer con armadura dorada y el pelo recogido en una trenza. No es Skuld. Te sonríe como quien sonríe a un recluta nuevo.']};};

GEN.c5_hervor=()=>({t:[
  'La segunda rival se abre paso entre los einherjar. Es una mujer alta, con el pelo rojo cortado a la altura de la mandíbula y una espada que brilla con un fuego frío. Hervor, la doncella escudera, la que bajó a la tumba de su padre para arrancarle la espada maldita Tyrfing.',
  S.g=='m'
    ?'Te mira de arriba abajo y sonríe. «Otra escudera», dice. «Hace siglos que no entra ninguna nueva. Los hombres de aquí se creen que el Valhalla es suyo.» Desenvaina. «Enséñales que no.»'
    :'Te mira de arriba abajo y resopla. «Otro hombre que viene a demostrar algo», dice. «Ya hay demasiados.» Desenvaina. «Demuéstramelo a mí.»',
  'Kraka te susurra: «Tyrfing. Esa espada no puede desenvainarse sin matar a alguien. Ten cuidado. Mucho cuidado».']});

GEN.c5_brindis=()=>{const w=S.fl.duelos_ganados||0;return {t:[
  'Cuando la carne y el hidromiel han hecho su trabajo, los einherjar empiezan a golpear las mesas con los cuernos. Es la hora de los brindis. Uno tras otro, los guerreros se ponen en pie y cuentan las hazañas del día.',
  w>=3?'Cuando le toca a Starkad, se levanta y te señala con su cuerno. «Hoy {un mortal|una mortal} nos ha ganado a los tres», ruge. «A mí, a Hervor y a Sigmund. ¡A los tres!» El salón entero se pone en pie y te aclama con un rugido que hace temblar los escudos del techo.'
   :(w>=1?'Cuando le toca a Starkad, se levanta y te señala con su cuerno. «Hoy {un mortal|una mortal} ha peleado con nosotros», dice. «Ha caído, se ha levantado y ha vuelto a pelear. Eso es lo que hacemos aquí.» Los einherjar golpean las mesas en señal de aprobación.'
   :'Cuando le toca a Starkad, se levanta y te mira. «Hoy {un mortal|una mortal} ha peleado con nosotros», dice. «Ha perdido tres veces.» Hace una pausa. «Y tres veces se ha levantado. Eso cuenta.» Algunos einherjar golpean las mesas.'),
  S.fl.nombres_dichos?'Luego Hervor se levanta. «Y esta mañana ha dicho en voz alta los nombres de los olvidados del camino de Hel», dice. «Ninguno de nosotros lo había hecho nunca.» Esta vez, el silencio vale más que cualquier rugido.':'']};};

GEN.c5_juicio=()=>{const el=S.rg>=5,pacto=S.fl.pacto_loki&&!S.fl.pacto_roto;return {t:[
  'Al final del banquete, las valquirias se levantan de su mesa, junto al trono de Odín. Son nueve, con armaduras de oro y plata y los ojos de quien ha visto morir a miles. El salón se queda en silencio.',
  'La mayor de ellas se acerca a ti con una balanza de oro. En un platillo pone una pluma de cuervo. En el otro, nada. Pero el platillo vacío empieza a bajar, despacio, cargado con algo que no se ve: tu Gloria. Cada hazaña, cada juramento cumplido, cada enemigo honrado.',
  pacto?'Pero la balanza se detiene a medio camino. La valquiria te coge la mano y mira la marca roja. «Este hilo no es de Skuld», dice, y su voz es fría. «Pertenece a otro. No podemos elegir lo que no es nuestro.»'
   :(el?(S.fl.pacto_roto?'La balanza baja hasta el fondo. La valquiria te mira la mano, la marca mitad roja y mitad plata, y frunce el ceño. Luego la suelta. «Rompiste con él», dice. «Eso también cuenta.» Se vuelve hacia Odín. «Es digno.»'
     :'La balanza baja hasta el fondo, y sigue bajando, y la mesa cruje bajo su peso. La valquiria sonríe por primera vez. Se vuelve hacia Odín. «Es digno», dice. Y el salón entero ruge.')
   :'La balanza baja, pero no lo suficiente. La valquiria la mira largo rato. «Casi», dice. «Casi.» Se vuelve hacia Odín. «Aún no.»')]};};

GEN.c5_skuld=()=>({t:[
  'A medianoche, cuando los einherjar duermen sobre las mesas y los lobos de Odín roen los huesos de Saehrimnir, alguien te toca el hombro. Es Skuld.',
  'Pero no es la Skuld de tu lecho de muerte, la de la cota de malla como agua helada. Lleva un vestido gris, sencillo, y en las manos sostiene el huso de siempre. El hilo que sale de él es largo, muy largo, y brilla con muchos colores: verde como las raíces, rojo como el oro de Fafnir, blanco como la nieve de Jotunheim, gris como el camino de Hel.',
  '«Ven», dice. «Es hora de que sepas qué eres.»']});

GEN.c5_verdad=()=>({t:[
  'Skuld te lleva a lo alto del Valhalla, a un rincón del tejado de escudos desde el que se ven los nueve mundos, cubiertos de nieve bajo un cielo sin sol.',
  '«No soy una valquiria», dice. «Bueno, también lo soy, a veces, cuando me apetece. Pero soy Skuld, la tercera de las Nornas. Mis hermanas tejen lo que fue y lo que es. Yo tejo lo que ha de ser.» Sonríe con tristeza. «Y lo que ha de ser es el Ragnarok. Lo he visto desde el principio del mundo. Los dioses morirán. Los gigantes morirán. El mundo arderá y se hundirá en el mar.»',
  '«Eso no se puede cambiar», añade. «Lo intenté. Durante siglos. Cada hilo que movía, el tejido lo devolvía a su sitio.» Se queda mirando el horizonte. «Pero después del fuego, el mundo vuelve a salir del mar, verde y nuevo. Y alguien tiene que estar allí para verlo. Baldr y Höd volverán de Hel. Los hijos de Thor y de Odín sobrevivirán. Y dos humanos escondidos en el bosque de Mímir. Eso también está tejido.»',
  'Te mira. «Lo que no está tejido», dice, «eres tú. Tu hilo era corto. Acababa en una cama de Vindvik, una noche de fiebre. Lo até al mío. Lo llevé por las raíces y por Jotunheim y por el camino de Hel, y en cada sitio se enredó con otros hilos: con el de Siri, con el de Kraka, con el de Fenrir, con el de Hel. Ahora tu hilo toca a medio mundo.» Baja la voz. «Un hilo así, en el último día, puede tirar de los demás. Puede decidir quién más llega a ver el amanecer.»']});

registrarCapitulo({capitulo:5,parte:1,titulo:'Las puertas del Valhalla',escenas:{

/* ---------- Las puertas ---------- */
c5_inicio:{h:'Capítulo 5 · El Crepúsculo',cp:1,gen:'c5_inicio',t:[],
  fx:{fl:{c5:1},hp:999},
  c:[{x:'Cruzar la puerta',to:'c5_sigrun',k:'main'}]},

c5_sigrun:{h:'Sigrun',t:[
  '«Me llamo Sigrun», dice la valquiria. «Llevo noches llamándote. Eres muy {sordo|sorda}, o muy {testarudo|testaruda}.» Se aparta para dejarte pasar. «Kraka, tú también. Te recuerdo de cuando eras un polluelo y robabas almendras de la mesa de Odín.»',
  'Kraka se esconde dentro de tu capucha. «Fue una vez», murmura. «Una.»',
  '«Para que las valquirias te elijan, necesitas Gloria, y de eso tienes», explica Sigrun. «Pero también necesitas que los einherjar te acepten. Y los einherjar solo aceptan a quien ha pasado un día con ellos.» Te da una palmada en la espalda. «Mañana peleas. Aquí nadie muere de verdad: el que cae por la mañana se levanta al atardecer. Pero duele igual. Bienvenid{o|a} al Valhalla.»'],
  fx:{fl:{dia_valhalla:1}},
  c:[{x:'Mirar a tu alrededor',to:'c5_dentro',k:'main'}]},

c5_dentro:{h:'El Valhalla',t:[
  'Por dentro, el Valhalla es todavía más grande de lo que parece por fuera. Las vigas son lanzas. El techo, escudos dorados. Los bancos están cubiertos de cotas de malla. Miles y miles de guerreros duermen, beben, ríen o se pelean en las mesas, y el ruido es como el de un mar en tormenta.',
  'Al fondo, en un trono alto, Odín bebe vino de una copa de oro. A sus pies, dos lobos grises, Geri y Freki, mordisquean huesos. Sobre sus hombros, Hugin y Munin. En el tejado, asomando por un agujero entre los escudos, una cabra pasta tranquilamente las hojas de un árbol enorme: es Heidrun, y de sus ubres no sale leche, sino hidromiel, suficiente para todos los einherjar.',
  'Sigrun te señala un rincón entre dos guerreros que roncan. «Duerme ahí», dice. «Mañana te despertarán. Créeme: te despertarán.»'],
  c:[{x:'Dormir entre los einherjar',to:'c5_amanecer',k:'main',fx:{hasta:6,dormir:1}}]},

/* ---------- El día de los einherjar ---------- */
c5_amanecer:{h:'El campo del Valhalla',cp:1,t:[
  'Te despierta un cuerno. Antes de que abras los ojos, ya hay mil guerreros corriendo hacia las puertas, armándose por el camino. Fuera, en la llanura que rodea el Valhalla, el aire huele a acero y a escarcha.',
  'Los einherjar se lanzan unos contra otros entre carcajadas y gritos. Pelean de verdad. Se hieren de verdad. Algunos caen y no se levantan. Nadie parece preocupado.',
  'Sigrun aparece a tu lado. «Tres duelos», dice. «Con los tres mejores que tenemos. Si caes, caes; al atardecer te levantarás como todos. Pero los einherjar recordarán cómo has peleado.»'],
  c:[{x:'Decir en voz alta los nombres de los guerreros olvidados del camino de Hel',to:'c5_nombres',k:'social',oc:1,req:{fl:'nombres',no:'nombres_dichos'}},
     {x:'Buscar al primer rival',to:'c5_starkad',k:'main'}]},

c5_nombres:{h:'Los nombres',t:[
  'Antes de que empiece tu primer duelo, te subes a una roca en medio del campo y gritas. No es un grito de guerra. Son nombres. Los nombres que te dieron las sombras del camino de Hel, los guerreros que murieron en batalla y no fueron elegidos. Uno por uno. Todos.',
  'El campo del Valhalla se detiene. Mil guerreros bajan las armas y te escuchan. Cuando terminas, se hace un silencio enorme. Luego alguien, al fondo, repite un nombre. Y otro. Y otro. Hasta que todo el campo está diciendo los nombres de los olvidados.',
  'Sigrun te mira con los ojos brillantes. «Nadie había hecho eso nunca», dice.'],
  fx:{fl:{nombres_dichos:1},gl:40,saga:'En el campo del Valhalla gritó los nombres de los guerreros olvidados del camino de Hel, y los einherjar los repitieron.'},
  c:[{x:'Buscar al primer rival',to:'c5_starkad',k:'main'}]},

c5_starkad:{h:'Starkad el Viejo',t:[
  'El primer rival es un anciano gigantesco, con la barba blanca trenzada hasta el cinturón y la cara cubierta de cicatrices. Starkad el Viejo, el guerrero al que los dioses concedieron tres vidas de hombre y una maldición en cada una.',
  '«He luchado en más batallas de las que tú has visto amaneceres», dice, haciendo girar una espada enorme. «He matado reyes. He matado gigantes. Me han matado tres veces.» Sonríe. «Vamos a ver qué tal te mueres tú.»'],
  c:[{x:'Luchar',to:'c5_f_starkad',k:'hunt'}]},

c5_f_starkad:{t:['Starkad levanta la espada con las dos manos. Para ser tan viejo, se mueve como un lobo.'],f:{e:'starkad',win:'c5_starkad_tras',lose:'c5_caes1'}},

c5_starkad_tras:{t:[
  'Starkad cae de rodillas y se echa a reír a carcajadas, escupiendo sangre. «¡Bien! ¡Muy bien! ¡Hacía siglos que no me tumbaba alguien tan pequeño!» Te da la mano para que le ayudes a levantarse, y casi te arranca el brazo. «Ve a por Hervor. Y ten cuidado con esa espada suya.»'],
  fx:{suma:{duelos_ganados:1},gl:20,saga:'Venció en duelo a Starkad el Viejo en el campo del Valhalla.'},
  c:[{x:'Buscar a la segunda rival',to:'c5_hervor',k:'main'}]},

c5_caes1:{h:'Caer en el Valhalla',t:[
  'La espada de Starkad te atraviesa y el mundo se vuelve negro.',
  'Cuando abres los ojos, estás tumbad{o|a} en la hierba helada del campo, y el sol, o lo que hace de sol en el Valhalla, ha avanzado un poco en el cielo. No te duele nada. Tienes la herida cerrada. Starkad está sentado a tu lado, comiendo una manzana. «Bienvenid{o|a} a la muerte», dice. «No es para tanto, ¿eh? Venga. Te espera Hervor.»'],
  fx:{hp:999,fu:-100},
  c:[{x:'Levantarte y buscar a la segunda rival',to:'c5_hervor',k:'main'}]},

c5_hervor:{h:'Hervor',gen:'c5_hervor',t:[],
  c:[{x:'Luchar',to:'c5_f_hervor',k:'hunt'}]},

c5_f_hervor:{t:['Hervor desenvaina Tyrfing. La espada sale de la vaina con un brillo como de fuego frío, y el aire a su alrededor tiembla.'],f:{e:'hervor',win:'c5_hervor_tras',lose:'c5_caes2'}},

c5_hervor_tras:{t:[
  'Hervor retrocede, sangrando, y baja la espada. Te mira con una sonrisa torcida. «Bien», dice. «Nada mal.» Envaina Tyrfing con cuidado. «Esta espada tiene que matar a alguien cada vez que sale. Hoy no ha matado a nadie. Es la primera vez en trescientos años.» Se encoge de hombros. «Supongo que eso es un cumplido.»'],
  fx:{suma:{duelos_ganados:1},gl:20,saga:'Venció en duelo a Hervor, la doncella escudera, en el campo del Valhalla.'},
  c:[{x:'Buscar al tercer rival',to:'c5_sigmund',k:'main'}]},

c5_caes2:{h:'Caer otra vez',t:[
  'Tyrfing te atraviesa sin esfuerzo, como si fueras de humo, y el mundo se vuelve negro otra vez.',
  'Cuando despiertas, Hervor está sentada a tu lado, limpiando la espada. «Lo siento», dice, y parece decirlo de verdad. «Tyrfing no perdona.» Te ayuda a levantarte. «Pero has aguantado más que muchos. Venga. Sigmund te espera, y odia esperar.»'],
  fx:{hp:999,fu:-100},
  c:[{x:'Levantarte y buscar al tercer rival',to:'c5_sigmund',k:'main'}]},

c5_sigmund:{h:'Sigmund el Volsungo',t:[
  'El tercer rival es un hombre de mediana edad, de pelo rubio y ojos grises, con una espada partida en dos que alguien ha vuelto a forjar. Sigmund el Volsungo, el que sacó la espada del tronco del árbol cuando nadie más pudo, el padre de héroes.',
  '«He oído que bajaste a la veta de oro», dice. «Que mataste a Fafnir.» Se le ensombrece la cara. «Mi hijo Sigurd debía hacer eso. Las canciones decían que sería él. Pero tú llegaste antes.» Te mira largo rato. «No te lo reprocho. Pero quiero saber si lo merecías.»'],
  c:[{x:'Luchar',to:'c5_f_sigmund',k:'hunt'}]},

c5_f_sigmund:{t:['Sigmund levanta la espada reforjada. En la hoja se ve todavía la línea de la vieja rotura, como una cicatriz.'],f:{e:'sigmund',win:'c5_sigmund_tras',lose:'c5_caes3'}},

c5_sigmund_tras:{t:[
  'Sigmund cae. Se queda tumbado en la hierba, mirando el cielo, y por un momento parece mucho más viejo. «Lo merecías», dice al fin. «Si mi hijo llega algún día aquí, le contaré que fue {un mortal|una mortal} de Vindvik. Y que no le importe.»'],
  fx:{suma:{duelos_ganados:1},gl:25,fl:{duelos_fin:1},saga:'Venció en duelo a Sigmund el Volsungo en el campo del Valhalla.'},
  c:[{x:'Esperar al atardecer',to:'c5_atardecer',k:'main'}]},

c5_caes3:{h:'Caer por tercera vez',t:[
  'La espada reforjada de Sigmund te alcanza en el pecho, y el mundo se vuelve negro por tercera vez en el día.',
  'Cuando despiertas, el cielo está rojo. Es el atardecer. A tu alrededor, por todo el campo, los guerreros caídos se levantan, se sacuden la escarcha, recogen sus armas y se dirigen hacia el Valhalla charlando, como trabajadores que vuelven del campo.'],
  fx:{hp:999,fu:-100,fl:{duelos_fin:1}},
  c:[{x:'Volver al Valhalla con los demás',to:'c5_atardecer',k:'main'}]},

c5_atardecer:{h:'El atardecer',t:[
  'Al caer el sol, los muertos del día se levantan. Los heridos se curan. Los que se odiaban a muerte por la mañana vuelven al Valhalla abrazados, contándose cómo se han matado. Es lo más extraño y lo más alegre que has visto nunca.',
  'Kraka, que se ha pasado el día en una viga, baja a tu hombro. «He contado las veces que te han matado», dice. «No te lo voy a decir. Pero he contado.»'],
  fx:{hp:999,fl:{duelos_fin:1},hasta:18},
  c:[{x:'Entrar al banquete',to:'c5_banquete',k:'main'}]},

/* ---------- El banquete ---------- */
c5_banquete:{h:'El banquete',cp:1,t:[
  'En el centro del salón, en un caldero tan grande como el barco de Baldr, se cuece Saehrimnir, el jabalí que se come cada noche y que cada mañana vuelve a estar entero. El cocinero, Andhrimnir, un gigante de brazos rojos, reparte la carne con un cucharón del tamaño de un remo.',
  'Del tejado baja el hidromiel de Heidrun por un canalón de oro hasta unos cuernos que nunca se vacían. Odín, en su trono, no come: le da su parte a los lobos y solo bebe vino. Su único ojo recorre el salón y se detiene en ti un instante.',
  'Esta noche, el Valhalla es tu casa. Mañana, quién sabe.'],
  c:[{x:'Unirte a los brindis',to:'c5_brindis',k:'main',oc:1,req:{no:'brindis'}},
     {x:'Recorrer el salón durante el banquete',to:'c5_salon',k:'side'}]},

c5_salon:{h:'El salón de los einherjar',sort:1,t:[
  'Entre las mesas del Valhalla hay de todo: guerreros que cantan, guerreros que pelean por el último trozo de jabalí, guerreros que duermen con la cara en el plato. El ruido es ensordecedor y maravilloso.'],
  c:[{x:'Un guerrero viejo que te mira como si te conociera',to:'c5_abuelo',k:'social',oc:1,req:{no:'abuelo'}},
     {x:'Bragi, el dios de los escaldos, con su arpa',to:'c5_bragi',k:'social',oc:1,req:{no:'bragi'}},
     {x:'Andhrimnir, el cocinero',to:'c5_cocina',k:'shop',oc:1,req:{no:'cocina'}},
     {x:'Subir al tejado, donde pasta Heidrun',to:'c5_heidrun',k:'side',oc:1,req:{no:'heidrun'}},
     {x:'Los lobos de Odín',to:'c5_lobos',k:'side',oc:1,req:{no:'lobos_odin'}},
     {x:'Hervor y Starkad, en una mesa del fondo',to:'c5_hervor_charla',k:'social',oc:1,req:{no:'hervor_charla'}}],
  back:'c5_banquete'},

c5_abuelo:{h:'Hjalmar',t:[
  'El viejo se levanta. Es alto, con la barba gris y una nariz que reconoces porque es la tuya. «Tú eres de Vindvik», dice. «Tienes la cara de mi hijo Bjorn.»',
  'Es Hjalmar, tu abuelo. Murió en una incursión a Northumbria antes de que tú nacieras, con un hacha en la mano y una flecha en el pecho. Las valquirias lo eligieron. Tu padre te hablaba de él cada invierno junto al fuego.',
  'Le cuentas que has visto a Bjorn, tu padre, en el reino de Hel. Hjalmar se queda callado mucho rato. «Murió en la cama», dice al fin. «Lo sé. Siempre tuve miedo de que pasara. Él también lo tenía.» Te pone una mano enorme en el hombro. «Tú no. Tú vas a morir como se debe. Lo veo en tus ojos.»'],
  fx:{fl:{abuelo:1},gl:10,saga:'En el banquete del Valhalla conoció a su abuelo Hjalmar, caído en Northumbria.'},
  back:'c5_salon'},

c5_bragi:{h:'Bragi',t:[
  'Bragi, el dios de la poesía, es un viejo de barba larguísima con runas tatuadas en la lengua, que se ve cada vez que canta. Te pide que le cuentes tu historia. Toda.',
  'Se la cuentas. Desde la fiebre hasta esta noche. Bragi escucha sin interrumpir, con los ojos cerrados. Cuando terminas, coge su arpa, toca tres notas y empieza a cantar tu saga delante de todo el Valhalla. No exagera. No hace falta.',
  'Cuando termina, hasta los lobos de Odín han dejado de roer.'],
  fx:{fl:{bragi:1},gl:20,saga:'Bragi, el dios de los escaldos, cantó su saga en el banquete del Valhalla.'},
  back:'c5_salon'},

c5_cocina:{h:'Andhrimnir',t:[
  'Andhrimnir te mira desde lo alto de su caldero. «¿Hambre?», pregunta, y sin esperar respuesta te llena los brazos con trozos de Saehrimnir envueltos en hojas. «Para el camino. Mañana el jabalí vuelve a estar entero. No se lo digas, pero a veces me da pena.»'],
  fx:{fl:{cocina:1},item:{carne_saehrimnir:3}},
  back:'c5_salon'},

c5_heidrun:{h:'Heidrun',t:[
  'Subes por una escalera de lanzas hasta el tejado. Allí, entre los escudos, la cabra Heidrun mordisquea las hojas del árbol Laerad, que crece sobre el Valhalla. Te mira con unos ojos amarillos, aburridos, y sigue masticando.',
  'Junto a ella hay un ciervo enorme, Eikthyrnir, de cuyas astas gotea agua que baja por las raíces del mundo hasta el manantial helado de Hvergelmir, donde viste a Nidhogg. Todo está conectado. Kraka lo mira con la boca abierta.',
  'Heidrun se deja ordeñar sin protestar. Llenas dos cuernos de hidromiel.'],
  fx:{fl:{heidrun:1},item:{hidromiel_heidrun:2}},
  back:'c5_salon'},

c5_lobos:{h:'Geri y Freki',t:[
  'Los lobos de Odín levantan la cabeza cuando te acercas. Son grises, enormes, con los ojos del mismo color que el único ojo de su amo. Te huelen.',
  'Por un momento piensas en Fenrir, en el Lobo Ceniza, en los lobos del Bosque de Hierro. Geri te lame la mano. Freki se tumba a tus pies. Odín, desde el trono, levanta una ceja.'],
  fx:{fl:{lobos_odin:1},gl:5},
  back:'c5_salon'},

c5_hervor_charla:{h:'Los einherjar',t:[
  'Hervor y Starkad te hacen sitio en su mesa. Starkad cuenta historias de sus tres vidas, cada una más increíble que la anterior; Hervor pone los ojos en blanco y le corrige los detalles.',
  '«Cuando llegue el último día», dice Hervor, más seria, «saldremos todos por esas quinientas cuarenta puertas a la vez. Ochocientos por cada puerta. Contra los gigantes, contra el fuego, contra los muertos de Hel.» Bebe. «Ninguno de nosotros va a volver. Lo sabemos. Por eso bebemos tanto.»'],
  fx:{fl:{hervor_charla:1},gl:5},
  back:'c5_salon'},

c5_brindis:{h:'Los brindis',gen:'c5_brindis',t:[],
  fx:{fl:{brindis:1}},
  c:[{x:'Esperar el juicio de las valquirias',to:'c5_juicio',k:'main'}]},

c5_juicio:{h:'El juicio',gen:'c5_juicio',t:[],
  fx:{fl:{juicio:1}},
  c:[{x:'Ponerte en pie',to:'c5_odin',k:'main',oc:1,req:{rg:5,no:'pacto_loki'},fx:{fl:{elegido:1},gl:30,saga:'Las valquirias pesaron su Gloria en el Valhalla y lo declararon digno.'}},
     {x:'Ponerte en pie',to:'c5_odin',k:'main',oc:1,req:{rg:5,fl:['pacto_loki','pacto_roto']},fx:{fl:{elegido:1},gl:30,saga:'Las valquirias pesaron su Gloria en el Valhalla y, a pesar de la marca, lo declararon digno.'}},
     {x:'Ponerte en pie',to:'c5_odin',k:'main',oc:1,req:{fl:'pacto_loki',no:'pacto_roto'},fx:{fl:{rechazado:1}}},
     {x:'Ponerte en pie',to:'c5_odin',k:'main',oc:1,req:{rgmax:4,no:'pacto_loki'},fx:{fl:{casi:1}}},
     {x:'Ponerte en pie',to:'c5_odin',k:'main',oc:1,req:{rgmax:4,fl:['pacto_loki','pacto_roto']},fx:{fl:{casi:1}}}]},

/* ---------- Odín y las bandrunas ---------- */
c5_odin:{h:'Las bandrunas',t:[
  'Cuando el salón vuelve al ruido de siempre, Odín te hace una seña desde el trono. Te acercas. Los lobos se apartan.',
  '«Conoces mis runas», dice. «Las veinticuatro. Pocos mortales las han conocido todas.» Coge tu mano marcada y la gira hacia la luz. «Pero las runas solas son palabras sueltas. Juntas son frases. Te enseñaré a atar dos runas en una sola: las bandrunas. Cuanto más sepas, más podré enseñarte.»',
  '<span class=tag>Cada bandruna necesita que conozcas sus dos runas. Las bandrunas se preparan como cualquier otra runa y también se pueden grabar en el arma.</span>'],
  c:[{x:'ᚦᛁ Rayo helado (Thurisaz e Isa)',to:'c5_odin',k:'main',oc:1,req:{runas:['thurisaz','isa'],noruna:'rayo_helado'},fx:{runa:'rayo_helado'}},
     {x:'ᛉᛟ Escudo de la herencia (Algiz y Othala)',to:'c5_odin',k:'main',oc:1,req:{runas:['algiz','othala'],noruna:'escudo_herencia'},fx:{runa:'escudo_herencia'}},
     {x:'ᚺᛞ Granizo del amanecer (Hagalaz y Dagaz)',to:'c5_odin',k:'main',oc:1,req:{runas:['hagalaz','dagaz'],noruna:'granizo_alba'},fx:{runa:'granizo_alba'}},
     {x:'ᛒᛊ Sol del abedul (Berkano y Sowilo)',to:'c5_odin',k:'main',oc:1,req:{runas:['berkano','sowilo'],noruna:'sol_abedul'},fx:{runa:'sol_abedul'}},
     {x:'ᛏᚾ Lanza del manco (Tiwaz y Nauthiz)',to:'c5_odin',k:'main',oc:1,req:{runas:['tiwaz','nauthiz'],noruna:'lanza_manco'},fx:{runa:'lanza_manco'}},
     {x:'Darle las gracias y retirarte',to:'c5_noche',k:'n'}]},

c5_noche:{h:'La noche del Valhalla',t:[
  'El banquete se apaga poco a poco. Los einherjar se duermen donde caen: sobre las mesas, bajo los bancos, abrazados a sus armas. Los lobos de Odín roen los últimos huesos de Saehrimnir.',
  'Buscas un rincón para dormir, pero algo te hace mirar hacia la puerta por la que entraste. Hay alguien allí, en la penumbra, esperando.'],
  c:[{x:'Acercarte a la puerta',to:'c5_skuld',k:'main'}]},

/* ---------- Skuld ---------- */
c5_skuld:{h:'Skuld',cp:1,gen:'c5_skuld',t:[],
  fx:{fl:{skuld_revela:1}},
  c:[{x:'Seguirla',to:'c5_verdad',k:'main'}]},

c5_verdad:{h:'Lo que ha de ser',gen:'c5_verdad',t:[],
  c:[{x:'«¿Y si tiro del hilo equivocado?»',to:'c5_skuld_pacto',k:'main',oc:1,req:{fl:'pacto_loki',no:'pacto_roto'}},
     {x:'«¿Qué tengo que hacer?»',to:'c5_deseo',k:'main',oc:1,req:{no:'pacto_loki'}},
     {x:'«¿Qué tengo que hacer?»',to:'c5_deseo',k:'main',oc:1,req:{fl:['pacto_loki','pacto_roto']}}]},

c5_skuld_pacto:{h:'El hilo rojo',t:[
  'Skuld te coge la mano y mira el hilo rojo que Loki te ató en Lyngvi. No se enfada. Parece cansada, como una madre que ve a su hijo hacer una tontería que ya había previsto.',
  '«Loki también teje», dice. «A su manera. Te ofreció un sitio en el mundo nuevo, y no te mintió: él también estará allí, de una forma o de otra.» Te mira. «Puedo cortarlo. Ahora. Te dolerá, y la marca no volverá a ser como antes. O puedes quedártelo y llegar a Vigrid en su barco. Las dos cosas están tejidas. Elige.»'],
  c:[{x:'«Córtalo.»',to:'c5_deseo',k:'main',fx:{fl:{pacto_roto:1,pacto_skuld:1},gl:60,saga:'En el tejado del Valhalla pidió a Skuld que cortara el hilo rojo de Loki.'}},
     {x:'«Déjalo.»',to:'c5_deseo',k:'n',fx:{fl:{pacto_firme:1},saga:'En el tejado del Valhalla eligió conservar el hilo rojo de Loki.'}}]},

c5_deseo:{h:'Lo que quieres',t:[
  'Skuld recoge el hilo en el huso, despacio. «No te voy a decir qué hacer», dice. «Si te lo dijera, sería mi hilo, no el tuyo. Pero te haré una pregunta, y quiero que me la contestes de verdad, como a Heimdal.»',
  '«Cuando llegue el último día y todo arda… ¿qué quieres tú?»'],
  c:[{x:'«Un sitio en el Valhalla. Para eso empecé.»',to:'c5_p1_fin',k:'main',fx:{fl:{deseo:'valhalla'}}},
     {x:'«Que Siri vea el amanecer del mundo nuevo.»',to:'c5_p1_fin',k:'social',fx:{fl:{deseo:'siri'}}},
     {x:'«Verlo yo. Ver el amanecer.»',to:'c5_p1_fin',k:'n',fx:{fl:{deseo:'amanecer'}}},
     {x:'«Que Kraka no se apague.»',to:'c5_p1_fin',k:'social',oc:1,req:{fl:'kraka_hel'},fx:{fl:{deseo:'kraka'}}}]},

c5_p1_fin:{h:'El último hilo',cp:1,t:[
  'Skuld te mira largo rato. Luego asiente, despacio, y no dice si tu respuesta le parece bien o mal. Se levanta y se sacude la nieve del vestido gris.',
  '«Mañana empieza la víspera», dice. «Te quedan pocos días. Visita a quien quieras visitar. Cumple lo que hayas jurado. Despídete.» Ya en el borde del tejado, se vuelve. «Y {N}… gracias. Por decir que sí aquella noche. Muchos dicen que no.»',
  'Cuando miras, ya no está. Kraka, que lo ha oído todo desde tu capucha, saca la cabeza. «Una Norna», dice. «Todo este tiempo, una Norna.» Se queda callado. «Me alegro de no haber cotilleado nunca sobre ella. Bueno, casi nunca.»'],
  fx:{fl:{c5p1fin:1},saga:'Skuld, la Norna de lo que ha de ser, le reveló en el tejado del Valhalla para qué había atado su hilo al suyo.'},
  c:[{x:'Bajar del tejado',to:'c5_p2',k:'main'}]}

}});
})();
