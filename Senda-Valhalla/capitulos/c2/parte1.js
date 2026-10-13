/* =====================================================================
   Capítulo 2 · Bajo las Raíces
   Parte 1 · «El descenso»
   El pozo seco, Ratatosk, el cruce de las raíces y tres caminos:
   el manantial helado (Isa, Nidhogg), el ciervo herido (Algiz) y las
   cuevas de los elfos oscuros (rescate de Regin). Termina a las puertas
   de Nidavellir.
   Convierte c1_fin en enlace hacia c2_inicio.
   Escena de enlace provisional: c2_p2 (la sustituirá la Parte 2)
   ===================================================================== */
(()=>{
const pelea=(e,win,flee,t)=>({t:[t],f:{e,win,lose:'muerte',flee}});

/* ---------- Datos nuevos ---------- */
Object.assign(OBJ,{
  savia_raiz:{n:'Savia de Yggdrasil',tipo:'material',pr:12,d:'Dorada y tibia. Huele a bosque después de la lluvia.'},
  seta_luz:{n:'Seta de luz',tipo:'consumible',ef:{fu:40},pr:10,d:'Brilla en la oscuridad. Comerla enciende la sangre: +40 Furor.'},
  pan_enano:{n:'Pan de piedra enano',tipo:'consumible',ef:{hp:40},pr:18,d:'Duro como una roca y nutritivo como un banquete. Recupera 40 de Vida.'},
  escama_nidhogg:{n:'Escama de Nidhogg',tipo:'material',pr:150,d:'Negra, irisada y más dura que el acero. Los herreros enanos matarían por ella.'},
  asta_dain:{n:'Asta del ciervo Dain',tipo:'material',pr:80,d:'Un asta mudada, blanca como el hueso y tibia al tacto.'},
  carne_ciervo:{n:'Carne de ciervo sagrado',tipo:'consumible',ef:{hp:60},pr:30,d:'Recupera 60 de Vida. Sabe a culpa.'},
  daga_elfica:{n:'Daga de los elfos oscuros',tipo:'arma',atq:10,crit:18,vel:3,pr:260,d:'Hoja negra y ligera. Busca los huecos de la armadura.'},
  mapa_raices:{n:'Mapa de Ratatosk',tipo:'clave',d:'Un trozo de corteza con garabatos. Ratatosk jura que es un mapa.'}
});
Object.assign(ENEMIGOS,{
  rata_raiz:{n:'Rata de las raíces',cat:'Alimaña',hp:42,a:10,gl:6,o:0,l:{savia_raiz:.5}},
  elfo_oscuro:{n:'Elfo oscuro',cat:'Svartálfar',hp:72,a:14,gl:20,o:18,l:{seta_luz:.5,savia_raiz:.3}},
  kol:{n:'Kol el Pálido',cat:'Capitán de los elfos oscuros',hp:125,a:16,gl:45,o:60,l:{daga_elfica:1}},
  dain:{n:'Dain, el ciervo de Yggdrasil',cat:'Bestia sagrada',hp:90,a:12,gl:0,o:0,l:{carne_ciervo:2}}
});
TIENDAS.nali={n:'Nali, enano buhonero · «Precios de superficie, calidad de las profundidades.»',
  stock:['pan_enano','seta_luz','unguento','hidromiel','escudo_hierro','cota_anillas','piedra_eihwaz']};

registrarAcertijos({
  puerta_nidavellir:{q:'El guardián de la puerta: «Soy hijo del fuego y padre de la espada. El martillo me castiga y el agua me templa. ¿Quién soy?»',
    o:['El hierro','La forja','El carbón','El yunque'],k:0,
    ok:'El guardián gruñe, decepcionado. «Correcto. Hacía cuarenta años que nadie acertaba. Pasa, gente de arriba.»',
    ko:'«Error», dice el guardián con evidente satisfacción. «Vuelve mañana. O el año que viene. A mí me da igual.»',
    fx:{fl:{puerta_ok:1},gl:8}}
});

registrarSenales({
  10:'Un temblor recorre las raíces. Ratatosk dice que allá arriba el lobo Skoll ha mordido el sol, y que el sol sangra.',
  12:'Las raíces gimen como un barco en la tormenta. Ratatosk jura que Nidhogg roe más deprisa que nunca.'
});

registrarMision(S=>{
  if(!S.fl.c2)return null;
  if(!S.fl.mapa)return 'Desciende por las raíces de Yggdrasil.';
  if(!S.fl.nidavellir){
    const p=[];
    if(!S.fl.isa)p.push('el manantial helado');
    if(!S.fl.dain_fin)p.push('el bosque de los ciervos');
    if(!S.fl.regin)p.push('las cuevas de los elfos oscuros');
    return 'Encuentra el camino a Nidavellir, la ciudad de los enanos.'+(p.length?' Ratatosk habla de '+p.join(', ').replace(/, ([^,]*)$/,' y $1')+'.':' Ya conoces el camino: ve a la puerta.');
  }
  if(!S.fl.c2p1fin)return 'Entra en Nidavellir.';
  return null;
});

/* ---------- Enlace desde el Capítulo 1 ---------- */
Object.assign(SC.c1_fin,{end:null,saga:null,
  fx:{fl:{c1fin:1},fin:'Capítulo 1 completado',saga:'Partió de Vindvik hacia las raíces de Yggdrasil.'},
  c:[{x:'Continuar con el Capítulo 2: Bajo las Raíces',to:'c2_inicio',k:'main'}]});
SC.c1_fin.t=SC.c1_fin.t.map(p=>p.replace('<span class=tag>Has completado el Capítulo 1: La Muerte de Paja. La senda continúa en el Capítulo 2: Bajo las Raíces.</span>','<span class=tag>Has completado el Capítulo 1: La Muerte de Paja.</span>'));

/* ---------- Textos variables ---------- */
const CHISMES=[
  '«¿Sabes lo último?», dice Ratatosk, frotándose las patitas. «El águila de la copa dice que Nidhogg tiene mal aliento. Nidhogg dice que el águila tiene piojos. Los dos tienen razón, pero eso no se lo digas a nadie.»',
  '«Ha bajado un rumor de Asgard», susurra Ratatosk. «Thor ha perdido otra vez su martillo. Bueno, no lo ha perdido: se lo ha dejado en casa de una giganta. Bueno, no sé si giganta. Bueno, invento un poco.»',
  '«Los elfos oscuros llevan semanas robando enanos», dice Ratatosk, por una vez en serio. «Herreros, sobre todo. Alguien quiere armas. Muchas armas. Para algo muy grande.»',
  '«He oído a los enanos discutir», dice Ratatosk. «Brok y Eitri están forjando algo para el fin del mundo y no se ponen de acuerdo en el color. ¡El color! Los enanos son así.»',
  '«Un pelirrojo muy simpático me preguntó por ti el otro día», dice Ratatosk. «Muy simpático. Demasiado. Le conté todo, claro. ¿Hice mal?»'
];
GEN.c2_ratatosk_hub=()=>({t:[
  'Ratatosk baja por una raíz como una gota de cobre y se te sube al brazo antes de que puedas impedirlo. Kraka lo mira con odio profesional.',
  CHISMES[S.dia%CHISMES.length]]});

registrarCapitulo({capitulo:2,parte:1,titulo:'El descenso',escenas:{

/* ---------- El pozo seco ---------- */
c2_inicio:{h:'Capítulo 2 · Bajo las Raíces',cp:1,t:[
  'El pozo seco está en el corazón del Bosque Gris, en un claro donde no crece nada: un círculo de piedras cubiertas de musgo negro y, en medio, un agujero tan oscuro que parece pintado.',
  '«Nadie sabe quién lo cavó», dice Kraka. «Los enanos dicen que fueron los gigantes. Los gigantes dicen que fueron los enanos. Yo digo que me da igual, porque bajar, bajo yo volando y tú no.»',
  'Atas una cuerda a la piedra más grande y la dejas caer. No oyes cómo llega al fondo.'],
  fx:{fl:{c2:1},hp:100},
  c:[{x:'Bajar por la cuerda con cuidado',to:'c2_bajar_ok',k:'main',chk:{s:'fue',dc:7,ok:'c2_bajar_ok',ko:'c2_bajar_ko',fxko:{hp:-15}}},
     {x:'Saltar: la marca de Skuld te protegerá',to:'c2_bajar_ko',k:'n',fx:{hp:-25}}]},

c2_bajar_ok:{t:[
  'Bajas palmo a palmo durante lo que parece una eternidad. La luz del claro se convierte en una estrella pequeña sobre tu cabeza y luego desaparece. Cuando ya no sientes los brazos, tus pies tocan algo blando.',
  'Kraka aterriza a tu lado con elegancia. «Ochocientos treinta y dos palmos», anuncia. «Los he contado. No tenía otra cosa que hacer.»'],
  c:[{x:'Mirar a tu alrededor',to:'c2_raices',k:'main'}]},

c2_bajar_ko:{t:[
  'La cuerda se acaba antes que el pozo. O tus manos antes que la cuerda. En cualquier caso, caes durante un tiempo vergonzosamente largo y aterrizas de espaldas sobre algo que, por suerte, es blando: un colchón de hojas muertas tan antiguo como el mundo.',
  'Kraka aterriza a tu lado. «Impresionante», dice. «Los escaldos lo cantarán: <i>Y {N} bajó a las raíces del mundo… de culo.</i>»'],
  c:[{x:'Levantarte y mirar a tu alrededor',to:'c2_raices',k:'main'}]},

c2_raices:{h:'Las raíces del mundo',t:[
  'Estás en una caverna tan grande que no ves el techo. Lo que sí ves son las raíces: troncos más gruesos que torres que bajan desde la oscuridad, se retuercen y se hunden en el suelo como serpientes dormidas. Están cubiertas de un musgo que brilla con una luz verde y dorada, y gracias a ese musgo puedes ver.',
  'Es Yggdrasil, el Árbol del Mundo. Lo has oído nombrar desde niñ{o|a}, en las canciones de los escaldos. Nunca pensaste que lo tocarías.',
  'Apoyas la mano marcada en la raíz más cercana. Está tibia, y late, muy despacio, como un corazón enorme. Entonces algo te cae en la cabeza. Algo pequeño, peludo y muy, muy hablador.'],
  c:[{x:'Ver qué es',to:'c2_ratatosk',k:'main'}]},

c2_ratatosk:{h:'Ratatosk',t:[
  '«¡Hola, hola, hola! ¡Gente de arriba! ¡Hacía siglos que no bajaba gente de arriba!» Una ardilla roja del tamaño de un gato salta de tu cabeza a tu hombro, del hombro a la raíz y de la raíz otra vez a tu cabeza. «Soy Ratatosk. Llevo mensajes del águila de la copa a Nidhogg, el dragón del fondo. Arriba, abajo, arriba, abajo. Todo el día. Desde el principio del mundo.»',
  '«¿Y tú? ¿Y él? ¿Ese es un cuervo de Odín? ¡Un cuervo de Odín en las raíces!» Kraka hincha las plumas. «Exaprendiz», puntualiza.',
  'Ratatosk se sienta, se atusa los bigotes y te mira con ojos brillantes de pura codicia. «Os ayudaré, claro. Conozco cada raíz y cada túnel. Pero aquí abajo hay una sola moneda que vale algo, gente de arriba: los chismes. ¿Qué me cuentas?»'],
  c:[{x:'Contarle el chisme de Kraka, Thor y la cabra',to:'c2_chisme_thor',k:'social'},
     {x:'Contarle cómo Ketil robó la copa del rey Rolf',to:'c2_chisme_ketil',k:'social'},
     {x:'Inventarte un chisme sobre Odín',to:'c2_chisme_ok',k:'social',chk:{s:'ast',dc:9,ok:'c2_chisme_ok',ko:'c2_chisme_ko'}}]},

c2_chisme_thor:{t:[
  '«¡NO!», grazna Kraka. Demasiado tarde. Le cuentas a Ratatosk que Kraka fue expulsado del servicio de Odín por contar un chisme sobre Thor y una cabra, y Ratatosk se cae de la raíz de la risa.',
  '«¿Qué chisme? ¿Qué chisme exactamente?», chilla la ardilla. Kraka se niega a hablar. Se niega a hablar durante las dos horas siguientes. Ratatosk, en cambio, no se calla: está tan encantado que te dibuja un mapa en un trozo de corteza y jura que serás su {mejor amigo|mejor amiga} para siempre.',
  '<span class=tag>Kraka te lo hará pagar. Pero Ratatosk te adora.</span>'],
  fx:{fl:{mapa:1,ratatosk_amigo:1,kraka_ofendido:1},item:'mapa_raices'},
  c:[{x:'Seguir a Ratatosk hasta el cruce de las raíces',to:'c2_cruce',k:'main',fx:{t:1}}]},

c2_chisme_ketil:{t:[
  'Le cuentas la historia de Ketil, la copa y el rey Rolf. Ratatosk escucha con atención, asintiendo con la cabeza en los momentos adecuados.',
  '«Bueno, bueno», dice al final. «Un ladrón de tumbas. Está bien. Un siete sobre diez. Un muerto que se levanta siempre suma.» Te dibuja un mapa en un trozo de corteza, sin muchas ganas. «Ahí lo tienes. Y si algún día te enteras de algo mejor, ya sabes dónde estoy. En todas partes.»'],
  fx:{fl:{mapa:1},item:'mapa_raices'},
  c:[{x:'Seguir a Ratatosk hasta el cruce de las raíces',to:'c2_cruce',k:'main',fx:{t:1}}]},

c2_chisme_ok:{t:[
  'Le cuentas, con todo detalle y una seriedad admirable, que Odín se quitó el ojo no para ganar sabiduría, sino porque perdió una apuesta con su mujer Frigg sobre quién aguantaba más sin parpadear.',
  'Ratatosk se queda boquiabierto. Kraka se queda boquiabierto. «Eso… eso no lo sabía nadie», susurra la ardilla. «¡Eso no lo sabía NADIE!» Te dibuja un mapa a toda prisa y se va trepando a contárselo al águila. Kraka te mira con algo parecido al respeto. «Ojalá no te oiga nunca Frigg», dice.'],
  fx:{fl:{mapa:1,ratatosk_amigo:1},item:'mapa_raices',gl:5},
  c:[{x:'Esperar a Ratatosk y seguirlo hasta el cruce',to:'c2_cruce',k:'main',fx:{t:1}}]},

c2_chisme_ko:{t:[
  'Empiezas a contarle que Odín se quitó el ojo por una apuesta, pero a mitad de la historia te trabas y Ratatosk entorna los ojos. «Eso te lo estás inventando», dice. «Yo me invento cosas todo el día. Sé reconocer a un aficionado.»',
  'Ofendido, te da un mapa de muy mala gana. «Toma. Aunque no te lo mereces. Y para que lo sepas, la próxima vez cobro el doble.»'],
  fx:{fl:{mapa:1},item:'mapa_raices'},
  c:[{x:'Seguir a Ratatosk hasta el cruce de las raíces',to:'c2_cruce',k:'main',fx:{t:1}}]},

/* ---------- El cruce de las raíces: centro de la Parte 1 ---------- */
c2_cruce:{h:'El cruce de las raíces',cp:1,mision:1,sort:1,t:[
  'Tres raíces gigantescas se cruzan aquí formando una especie de plaza cubierta de musgo luminoso. Hay restos de hogueras antiguas, un poste con runas de aviso y, junto a la raíz del este, un carro tirado por una cabra con cara de pocos amigos.',
  'Según el mapa de Ratatosk, desde aquí parten tres caminos: hacia el norte, el manantial helado donde duerme Nidhogg; hacia el oeste, el bosque de raíces donde pastan los ciervos de Yggdrasil; hacia el sur, las cuevas de los hongos, territorio de los elfos oscuros. Y más allá de las cuevas, la puerta de Nidavellir.'],
  c:[{x:'Ir a la puerta de Nidavellir · 2 h',to:'c2_puerta',k:'main',oc:1,req:{fl:'mapa',no:'nidavellir'},fx:{t:2}},
     {x:'El manantial helado, al norte · 2 h',to:'c2_manantial_camino',k:'hunt',fx:{t:2}},
     {x:'El bosque de los ciervos, al oeste · 1 h',to:'c2_bosque_raices',k:'hunt',oc:1,req:{no:'dain_fin'},fx:{t:1}},
     {x:'Las cuevas de los hongos, al sur · 2 h',to:'c2_cuevas',k:'hunt',oc:1,req:{no:'regin'},fx:{t:2}},
     {x:'Cazar ratas de las raíces',to:'c2_f_rata',k:'hunt'},
     {x:'Recoger savia de las raíces · 1 h',to:'c2_cruce',k:'side',fx:{item:{savia_raiz:1},t:1}},
     {x:'El carro de Nali, el buhonero enano',to:'c2_nali',k:'shop'},
     {x:'Buscar a Ratatosk',to:'c2_ratatosk_hub',k:'social'},
     {x:'Acampar junto a las raíces',to:'c2_campamento',k:'side'}]},

c2_f_rata:pelea('rata_raiz','c2_cruce','c2_cruce','Algo se mueve entre las raíces: una rata del tamaño de un perro, con dientes amarillos y ojos que brillan en verde.'),

c2_nali:{h:'El carro de Nali',t:[
  'Nali es un enano viejo, ancho como un tonel, con una barba blanca que lleva metida en el cinturón para no pisársela. Su cabra se llama Gruñona, y hace honor a su nombre.',
  '«Gente de arriba», dice con desconfianza, y luego, al ver tu bolsa: «Clientes de arriba. Eso es otra cosa. Pasa, pasa.»'],
  shop:'nali',
  c:[{x:'Preguntarle por Nidavellir',to:'c2_nali_charla',k:'social',oc:1,req:{no:'nali_charla'}}],
  back:'c2_cruce'},

c2_nali_charla:{t:[
  '«¿Nidavellir?» Nali se rasca la barba. «La ciudad más bonita de los nueve mundos. Toda de piedra, toda de fuego, toda de martillos. Pero ahora no dejan entrar a nadie. Los elfos oscuros llevan semanas secuestrando herreros, y los guardias de la puerta ven espías hasta en la sopa.»',
  '«Si quieres entrar, o sabes la contraseña, o traes a alguien que responda por ti, o pagas lo que cueste. Y créeme, cuesta.» Te mira de arriba abajo. «Aunque si rescataras a algún herrero de las cuevas… eso sí que abriría puertas.»'],
  fx:{fl:{nali_charla:1}},
  back:'c2_nali'},

c2_ratatosk_hub:{h:'Ratatosk',gen:'c2_ratatosk_hub',t:[],
  c:[{x:'«¿Necesitas algo?»',to:'c2_ratatosk_encargo',k:'social',oc:1,req:{no:'insulto'}},
     {x:'Darle la respuesta de Nidhogg',to:'c2_ratatosk_premio',k:'social',oc:1,req:{fl:'insulto_entregado',no:'insulto_premio'}}],
  back:'c2_cruce'},

c2_ratatosk_encargo:{t:[
  'Ratatosk suspira con un dramatismo impropio de una ardilla. «Necesito vacaciones. Mil años subiendo y bajando. ¿Sabes lo que es eso?» Se te acerca, confidencial. «El águila me ha dado un insulto para Nidhogg. Uno muy bueno. Pero hoy no me apetece bajar al manantial. ¿Se lo llevarías tú?»',
  '«El insulto es este: <i>Gusano de las raíces, roe-cortezas, aliento de cadáver: el águila dice que tus escamas son de segunda mano.</i>» Sonríe. «Nidhogg siempre contesta. Y cuando se enfada, se le caen escamas. Muy valiosas, me han dicho.»',
  'Kraka te mira con incredulidad. «Te estás planteando insultar a un dragón que roe el Árbol del Mundo. Por encargo. De una ardilla.»'],
  fx:{fl:{insulto:1}},
  back:'c2_ratatosk_hub'},

c2_ratatosk_premio:{t:[
  'Le repites a Ratatosk lo que contestó Nidhogg. La ardilla se queda muy quieta, luego chilla de placer y da tres vueltas alrededor de la raíz. «¡Eso! ¡Eso es lo que quería oír! El águila se va a poner de un humor…»',
  'Rebusca en un agujero de la corteza y saca una piedra plana con una runa grabada. «Me la encontré hace un par de siglos. No sé leer, así que para mí no vale nada. Para ti, a lo mejor sí.»'],
  fx:{fl:{insulto_premio:1},item:'piedra_perthro',gl:5},
  back:'c2_ratatosk_hub'},

c2_campamento:{h:'Campamento',t:[
  'Enciendes un fuego con ramitas de raíz seca. Arde con una llama verdosa que no da casi humo. Kraka se acurruca cerca, con las plumas esponjadas. Aquí abajo no hay día ni noche: solo el latido lento del árbol.'],
  c:[{x:'Dormir junto al fuego (recuperación total)',to:'c2_cruce',k:'side',fx:{t:8,dormir:1}},
     {x:'Hablar con Kraka',to:'c2_kraka_noche',k:'social',oc:1,req:{no:'kraka_noche'}},
     {x:'Alguien se acerca al fuego',to:'c2_viajero',k:'social',oc:1,req:{fl:'kraka_noche',no:'viajero'}}],
  back:'c2_cruce'},

c2_kraka_noche:{t:[
  'Kraka está más callado que de costumbre. Al final habla, sin mirarte. «Hugin dijo que esto es un castigo. Acompañarte.» Picotea una brasa. «¿Sabes cuántos siglos llevaba intentando ser como él? Saberlo todo, verlo todo, no equivocarme nunca.»',
  '«Y ahora estoy en un agujero bajo el mundo, con {un humano|una humana} que salta a los pozos.» Se calla un buen rato. «No es tan mal castigo», dice al fin, muy bajito. «No se lo digas a nadie.»',
  'Te quedas despiert{o|a} un rato más, mirando las brasas. Cuando te duermes, Kraka está apoyado contra tu brazo.'],
  fx:{fl:{kraka_noche:1},gl:3},
  back:'c2_campamento'},

c2_viajero:{h:'El viajero pelirrojo',t:[
  'Un hombre sale de entre las raíces y se sienta junto a tu fuego sin pedir permiso. Es alto y delgado, con el pelo rojo como una llama y una sonrisa demasiado ancha. Lleva un manto verde y no tiene barro en las botas, lo cual, aquí abajo, es imposible.',
  '«Qué fuego tan agradable», dice. «Me llamo… Lopt. Soy viajero. ¿Y tú eres {el famoso|la famosa} {N}, la que lleva la marca de Skuld?» Te mira la mano como quien mira un dulce. «Las Nornas tejen, tejen… y a veces alguien tira de un hilo que no es suyo. ¿No te parece divertido?»',
  'Kraka está completamente erizado. Cuando miras a Kraka un instante y vuelves la vista, el viajero ya no está. Solo queda en el aire un olor a humo y a algo dulce, como manzanas asadas.',
  '«Ese», susurra Kraka, «no era un viajero. Y no se llama Lopt. Bueno, sí se llama Lopt. Es uno de sus nombres.» No dice más. No hace falta.'],
  fx:{fl:{viajero:1,loki_visto:1},saga:'En las raíces de Yggdrasil compartió fuego con un viajero pelirrojo que no dejaba huellas.'},
  back:'c2_campamento'},

/* ---------- El manantial helado: Isa y Nidhogg ---------- */
c2_manantial_camino:{h:'Hacia el manantial',t:[
  'El camino del norte baja y baja. El musgo luminoso escasea y el aire se vuelve tan frío que te duelen los dientes. Las raíces aquí están mordidas: hay marcas enormes en la corteza, como si algo gigantesco las hubiera roído durante siglos.',
  'Al fondo se oye agua. Mucha agua, corriendo bajo el hielo. Y algo más: un sonido lento y profundo, como el de un fuelle enorme. Una respiración.'],
  c:[{x:'Seguir bajando',to:'c2_manantial',k:'main'},
     {x:'Volver al cruce · 2 h',to:'c2_cruce',fx:{t:2}}]},

c2_manantial:{h:'El manantial helado',t:[
  'El manantial de Hvergelmir es un lago negro cubierto por una capa de hielo transparente. Bajo el hielo, el agua se mueve en remolinos, y de él nacen once ríos que se pierden en la oscuridad. Groa te habló de él: es el origen de todas las aguas frías del mundo.',
  'En la orilla, el hielo forma columnas con runas atrapadas dentro, como insectos en ámbar. Una de ellas brilla. Es una línea recta, sencilla, vertical: <b>Isa</b>, la runa del hielo.',
  'Al otro lado del lago, en una cueva tan grande como un fiordo, algo enorme y oscuro respira despacio. Nidhogg.'],
  c:[{x:'Apoyar la mano marcada en la columna de hielo',to:'c2_isa_ok',k:'main',oc:1,req:{no:'isa'},chk:{s:'esp',dc:9,ok:'c2_isa_ok',ko:'c2_isa_ko',fxko:{hp:-15}}},
     {x:'Acercarte a la cueva de Nidhogg',to:'c2_nidhogg',k:'hunt',oc:1,req:{no:'nidhogg_visto'}},
     {x:'Volver a la cueva de Nidhogg con el insulto del águila',to:'c2_insulto',k:'social',oc:1,req:{fl:['insulto','nidhogg_visto'],no:'insulto_entregado'}},
     {x:'Volver al cruce · 2 h',to:'c2_cruce',fx:{t:2}}]},

c2_isa_ok:{t:[
  'El frío te sube por el brazo como una serpiente. Por un momento crees que la mano se te va a quedar pegada para siempre. Luego la columna cruje, el hielo se raja y la runa sale de la piedra, se desliza por tus dedos y se queda grabada en tu palma, junto a la marca de Skuld.',
  '<b>Isa</b>. El hielo que detiene todo lo que se mueve. Kraka te mira la mano con respeto. «Groa tardó cuarenta años en aprender esa runa», dice. «Lo sé porque me lo contó un cuervo que conocía a otro cuervo.»'],
  fx:{fl:{isa:1},runa:'isa',gl:10,saga:'Arrancó la runa Isa del hielo del manantial de Hvergelmir.'},
  c:[{x:'Volver a la orilla',to:'c2_manantial',k:'main'}]},

c2_isa_ko:{t:[
  'El frío te muerde hasta el hueso y tienes que apartar la mano antes de que se te congele. La columna sigue intacta, y la runa brilla dentro, burlona.',
  '«Quizá más tarde», dice Kraka. «Cuando no tengas los dedos morados.»'],
  c:[{x:'Volver a la orilla',to:'c2_manantial',k:'main'}]},

c2_nidhogg:{h:'Nidhogg',t:[
  'Rodeas el lago por la orilla, pegad{o|a} a las raíces. La cueva es más grande de lo que parecía. Dentro, enroscado alrededor de la raíz más gruesa de Yggdrasil, duerme un dragón negro. O no duerme: roe. Sus mandíbulas se mueven despacio, sin parar, arrancando astillas del tamaño de barcos.',
  'Es tan grande que no ves dónde acaba. Sus escamas brillan con reflejos morados y verdes. Huele a tierra removida y a tumba abierta.',
  'Un ojo amarillo se abre. Te mira. «Un mortal», dice Nidhogg. Su voz no se oye: se siente en los huesos. «Un mortal con la marca de una Norna. Qué sabroso.»'],
  fx:{fl:{nidhogg_visto:1}},
  c:[{x:'Quedarte completamente quiet{o|a} y sostenerle la mirada',to:'c2_nidhogg_quieto',k:'main',chk:{s:'esp',dc:9,ok:'c2_nidhogg_quieto',ko:'c2_nidhogg_huida'}},
     {x:'Entregarle el insulto del águila',to:'c2_insulto',k:'social',oc:1,req:{fl:'insulto',no:'insulto_entregado'}},
     {x:'Huir a toda velocidad',to:'c2_nidhogg_huida',k:'n'}]},

c2_nidhogg_quieto:{t:[
  'No te mueves. No respiras. Le sostienes la mirada a algo que es más viejo que los dioses.',
  'Nidhogg te observa largo rato. Luego, increíblemente, se ríe: un temblor que hace caer carámbanos del techo. «Valor», dice. «O estupidez. Desde aquí abajo cuesta distinguirlas. Vete, mortal. Hoy no tengo hambre de ti. Pero cuando llegue el Ragnarok, volaré sobre el campo de batalla con los muertos entre las alas, y entonces te buscaré.»',
  'Cierra el ojo y sigue royendo. Al apartarte, ves en el suelo una escama negra que se le ha desprendido. Es casi tan grande como tu escudo.'],
  fx:{item:'escama_nidhogg',gl:20,saga:'Sostuvo la mirada de Nidhogg, el dragón que roe las raíces del mundo, y salió con vida.'},
  c:[{x:'Volver al manantial',to:'c2_manantial',k:'main'}]},

c2_nidhogg_huida:{t:[
  'Echas a correr. Nidhogg no se molesta en levantarse: le basta con soltar el aliento. Una nube de aire helado y podrido te alcanza por la espalda, te tira al suelo y te deja la piel en carne viva.',
  'Cuando por fin te alejas de la cueva, oyes su risa a tu espalda, lenta y cruel. Kraka aterriza a tu lado. «Bueno», jadea. «Al menos ahora sabemos que el aliento sí es tan malo como dice el águila.»'],
  fx:{hp:-30},
  c:[{x:'Volver al manantial',to:'c2_manantial',k:'main'}]},

c2_insulto:{h:'El insulto del águila',t:[
  'Te aclaras la garganta. «Nidhogg», dices, con toda la dignidad de la que eres capaz. «Te traigo un mensaje del águila.» Y se lo repites palabra por palabra: gusano de las raíces, roe-cortezas, aliento de cadáver, escamas de segunda mano.',
  'Silencio. Un silencio tan profundo que oyes correr los once ríos bajo el hielo. Luego Nidhogg se sacude de pura rabia, y una lluvia de escamas negras cae a tu alrededor como hojas en otoño.',
  '«Dile a esa gallina emplumada», ruge el dragón, «que cuando llegue el fin del mundo le arrancaré las plumas una a una y me haré un nido con ellas. Y dile a la ardilla que deje de mandarme mortales: se me indigestan.»'],
  fx:{fl:{insulto_entregado:1,nidhogg_visto:1},item:{escama_nidhogg:2},gl:15,saga:'Le llevó a Nidhogg un insulto del águila, y vivió para contarlo.'},
  c:[{x:'Recoger las escamas y largarte de allí',to:'c2_manantial',k:'main'}]},

/* ---------- El bosque de los ciervos: Algiz ---------- */
c2_bosque_raices:{h:'El bosque de los ciervos',t:[
  'Al oeste del cruce, las raíces se ramifican en miles de raicillas finas que cuelgan del techo como un bosque al revés. Entre ellas pastan cuatro ciervos enormes, blancos como la nieve, con astas que parecen ramas de árbol. Mordisquean la corteza de Yggdrasil con calma, como si tuvieran todo el tiempo del mundo. Lo tienen.',
  '«Los cuatro ciervos del Árbol», susurra Kraka. «Dain, Dvalin, Duneyr y Durathror. Comen de Yggdrasil desde el principio de los tiempos.»',
  'Tres de ellos se alejan al verte. El cuarto no puede: está tumbado en el suelo, con una flecha negra clavada en el costado. Respira con dificultad.'],
  c:[{x:'Acercarte despacio al ciervo herido',to:'c2_dain',k:'main'},
     {x:'Volver al cruce · 1 h',to:'c2_cruce',fx:{t:1}}]},

c2_dain:{h:'Dain',t:[
  'El ciervo te mira con unos ojos negros y profundos como pozos. No intenta huir. La flecha que tiene clavada es de los elfos oscuros: hoja negra, plumas de murciélago. La herida está hinchada y huele mal.',
  'Kraka baja la voz. «Es Dain. El más viejo de los cuatro.» Luego, con cuidado: «Su carne cura cualquier herida. Eso dicen. Y sus astas valen una fortuna en Nidavellir. Solo lo digo para que lo sepas. No para que lo hagas.»'],
  c:[{x:'Arrancarle la flecha y curarle la herida con un ungüento',to:'c2_dain_cura',k:'main',req:{item:'unguento'},fx:{quita:{unguento:1}}},
     {x:'Arrancarle la flecha y curarlo con la runa Uruz',to:'c2_dain_cura',k:'main',oc:1,req:{runa:'uruz'}},
     {x:'Cazarlo: está herido y su carne cura cualquier herida',to:'c2_f_dain',k:'hunt'}]},

c2_dain_cura:{t:[
  'Arrancas la flecha de un tirón. Dain no se queja. Le limpias la herida y la curas como puedes, y el ciervo se queda muy quieto, mirándote con esos ojos de pozo.',
  'Cuando terminas, se levanta despacio. Es mucho más alto que tú. Baja la cabeza hasta que sus astas te rodean como una corona de ramas, y sientes un calor que te recorre de los pies a la cabeza. En tu palma aparece una nueva runa, como un asta abierta hacia el cielo: <b>Algiz</b>, la runa de la protección.',
  'Luego Dain sacude la cabeza y una de sus astas, ya suelta, cae a tus pies. Se aleja entre las raíces sin mirar atrás.'],
  fx:{fl:{dain_fin:1,dain_salvado:1},runa:'algiz',item:'asta_dain',gl:20,saga:'Curó a Dain, el ciervo más viejo de Yggdrasil, y recibió de él la runa Algiz.'},
  c:[{x:'Volver al cruce · 1 h',to:'c2_cruce',k:'main',fx:{t:1}}]},

c2_f_dain:pelea('dain','c2_dain_muerto','c2_bosque_raices','Dain se levanta con un esfuerzo terrible. Herido y todo, sus astas son lanzas. No te ataca con rabia, sino con tristeza.'),

c2_dain_muerto:{t:[
  'Dain cae. Los otros tres ciervos, a lo lejos, levantan la cabeza a la vez y te miran. No huyen. Te miran, nada más, durante mucho rato.',
  'Sobre tu cabeza, las raíces de Yggdrasil crujen como si el árbol entero se hubiera estremecido. Kraka no dice nada. Ni una palabra durante todo el camino de vuelta.',
  '<span class=tag>Hay hazañas que las valquirias no quieren ver.</span>'],
  fx:{fl:{dain_fin:1,dain_muerto:1},item:{asta_dain:2},gl:-30,saga:'Mató a Dain, el ciervo sagrado de Yggdrasil.'},
  c:[{x:'Volver al cruce · 1 h',to:'c2_cruce',k:'main',fx:{t:1}}]},

/* ---------- Las cuevas de los hongos: los elfos oscuros y Regin ---------- */
c2_cuevas:{h:'Las cuevas de los hongos',t:[
  'Las cuevas del sur son un laberinto de túneles húmedos donde crecen hongos gigantes, algunos más altos que una casa, que brillan con luz azul, rosa y verde. Es hermoso de una forma enfermiza, como un sueño de fiebre.',
  'En el suelo hay huellas: botas pequeñas y finas, de elfo, y otras más anchas y pesadas, de enano, que arrastran los pies como si fueran encadenadas.',
  'Junto al camino crece un hongo pequeño que brilla con un dorado intenso. Kraka lo mira con desconfianza. «Ni se te ocurra», dice. Lo que, por supuesto, hace que se te ocurra.'],
  c:[{x:'Seguir las huellas',to:'c2_f_elfo',k:'main'},
     {x:'Comerte el hongo dorado',to:'c2_seta_ok',k:'n',oc:1,req:{no:'seta'},chk:{s:'sue',dc:8,ok:'c2_seta_ok',ko:'c2_seta_ko'}},
     {x:'Recoger setas de luz · 1 h',to:'c2_cuevas',k:'side',fx:{item:{seta_luz:1},t:1}},
     {x:'Volver al cruce · 2 h',to:'c2_cruce',fx:{t:2}}]},

c2_seta_ok:{t:[
  'Sabe a nuez y a tormenta. Durante un momento el mundo entero brilla y oyes, muy lejos, una canción que no entiendes. Luego pasa, y te sientes más fuerte que nunca.',
  '«¿Y bien?», pregunta Kraka. «¿Ves dragones? ¿Hablas con las setas?» No. Solo te sientes bien. Muy bien. Kraka parece casi decepcionado.'],
  fx:{fl:{seta:1},mhp:10,gl:3},
  c:[{x:'Seguir explorando',to:'c2_cuevas',k:'main'}]},

c2_seta_ko:{t:[
  'Durante la siguiente hora estás convencid{o|a} de que Kraka es tu abuela, de que las paredes te cantan canciones de cuna y de que tus pies son dos peces muy simpáticos.',
  'Cuando por fin se te pasa, estás tumbad{o|a} en el suelo, con un dolor de cabeza terrible y Kraka mirándote desde un hongo. «Me has llamado abuela catorce veces», dice. «Catorce. Lo he contado.»'],
  fx:{fl:{seta:1},hp:-20,t:1},
  c:[{x:'Levantarte con toda la dignidad que te queda',to:'c2_cuevas',k:'main'}]},

c2_f_elfo:pelea('elfo_oscuro','c2_elfos_campamento','c2_cuevas','De entre los hongos sale una figura delgada y gris, de piel pálida como la cera y ojos completamente negros. Un elfo oscuro. Desenvaina una espada curva sin decir palabra.'),

c2_elfos_campamento:{h:'El campamento de los elfos',t:[
  'Siguiendo las huellas llegas a una gruta grande, iluminada por hongos azules. Hay tiendas de seda negra, armas apiladas y, en el centro, una jaula de hierro con cuatro enanos encadenados dentro.',
  'Una docena de elfos oscuros duermen o vigilan. Su jefe, alto y pálido como un cadáver, con el pelo blanco hasta la cintura, interroga a uno de los enanos: un muchacho de barba corta y pelirroja que se niega a hablar. «Los secretos de la forja de Brok», dice el elfo con voz suave. «Solo eso. Y te dejaré vivir.»',
  'Kraka te habla al oído. «Ese es Kol el Pálido. He oído hablar de él. No es simpático.»'],
  c:[{x:'Esperar a que se duerman y colarte hasta la jaula',to:'c2_elfos_sigilo',k:'main',chk:{s:'ast',dc:10,ok:'c2_elfos_sigilo',ko:'c2_f_kol'}},
     {x:'Usar la runa Ansuz para paralizar a Kol y atacar por sorpresa',to:'c2_f_kol',k:'hunt',oc:1,req:{runa:'ansuz'},fx:{gl:5}},
     {x:'Desafiar a Kol a un combate a muerte, delante de todos',to:'c2_f_kol',k:'hunt',fx:{gl:10}}]},

c2_elfos_sigilo:{t:[
  'Esperas a que los hongos se apaguen un poco, que es lo más parecido a la noche que hay aquí abajo. Te arrastras entre las tiendas, pegad{o|a} al suelo. Kraka va delante, avisándote con un chasquido del pico cada vez que un guardia se gira.',
  'Llegas a la jaula. El joven enano te mira con los ojos como platos. Con Muerdetumbas, o con lo que tengas, haces palanca hasta que el cerrojo cede. Los cuatro enanos salen en silencio.',
  'Estáis casi fuera de la gruta cuando uno de los enanos, el más viejo, tropieza con una lanza. El ruido despierta a todo el campamento. Kol el Pálido se pone en pie, sonriendo. «Ah», dice. «Visita.»'],
  fx:{gl:10},
  c:[{x:'Cubrir la huida de los enanos',to:'c2_f_kol',k:'hunt'}]},

c2_f_kol:{t:['Kol el Pálido desenvaina una daga negra, fina como una aguja. «Gente de arriba», dice con desprecio. «Siempre tan ruidosa. Siempre tan breve.»'],f:{e:'kol',win:'c2_regin',lose:'muerte'}},

c2_regin:{h:'Regin',t:[
  'Kol el Pálido cae, y los elfos oscuros que quedan huyen por los túneles como murciélagos asustados. En el silencio que deja la pelea, el joven enano pelirrojo se acerca a ti, se frota las muñecas y te hace una reverencia tan profunda que casi se cae.',
  '«Me llamo Regin, hijo de Hreidmar, aprendiz del gran Brok de Nidavellir», dice con una solemnidad que no le pega nada a su barba de adolescente. «Tengo noventa y dos años. Soy muy joven. Y te debo la vida.»',
  'Los otros tres enanos, herreros todos, asienten con la cabeza. «Brok va a querer conocerte», dice Regin. «Y Brok no quiere conocer a nadie. Nunca.»'],
  fx:{fl:{regin:1},gl:15,saga:'Rescató a Regin, aprendiz del herrero Brok, y a tres herreros enanos de los elfos oscuros de Kol el Pálido.'},
  c:[{x:'Preguntarle por qué los elfos querían los secretos de la forja',to:'c2_regin_charla',k:'social'},
     {x:'Volver al cruce con los enanos · 2 h',to:'c2_cruce',k:'main',fx:{t:2}}]},

c2_regin_charla:{t:[
  'Regin se pone serio. «No lo sé del todo. Kol hablaba de un encargo. Alguien les paga por armas forjadas por enanos, muchas, y por los secretos para hacerlas ellos mismos.»',
  '«Kol mencionó a un hombre. Un pelirrojo, muy simpático. Dijo que quería las armas para el día en que los gigantes marchen contra Asgard.» Se estremece. «¿Sabes lo que significa eso? Alguien está armando a los gigantes para el Ragnarok.»',
  'Kraka y tú os miráis. Ninguno de los dos dice el nombre en voz alta.'],
  fx:{fl:{regin_charla:1}},
  c:[{x:'Volver al cruce con los enanos · 2 h',to:'c2_cruce',k:'main',fx:{t:2}}]},

/* ---------- La puerta de Nidavellir ---------- */
c2_puerta:{h:'La puerta de Nidavellir',t:[
  'El túnel se ensancha hasta convertirse en una avenida tallada en la roca, con estatuas de enanos barbudos a ambos lados, cada una de ellas sosteniendo un martillo. Al fondo, una puerta de bronce más alta que el salón de Hakon brilla con el reflejo de mil forjas.',
  'Delante de la puerta, un enano con armadura completa y una barba trenzada hasta las rodillas te corta el paso con una alabarda. «Alto. Nadie entra en Nidavellir sin la contraseña, sin aval o sin pagar el portazgo.» Te mira de arriba abajo. «Y los de arriba, menos.»'],
  c:[{x:'Presentarte con Regin y los herreros rescatados',to:'c2_puerta_regin',k:'main',oc:1,req:{fl:'regin'}},
     {x:'Pedir que te pongan a prueba con la contraseña',to:'c2_puerta_acertijo',k:'main',oc:1,req:{no:['regin','puerta_ok']}},
     {x:'Entrar: has acertado la contraseña',to:'c2_nidavellir',k:'main',oc:1,req:{fl:'puerta_ok',no:'regin'}},
     {x:'Pagar el portazgo: 150 de plata',to:'c2_nidavellir',k:'shop',oc:1,req:{no:['regin','puerta_ok'],plata:150},fx:{plata:-150}},
     {x:'Volver al cruce · 2 h',to:'c2_cruce',fx:{t:2}}]},

c2_puerta_acertijo:{h:'La contraseña',t:[
  'El guardián se aclara la garganta con una solemnidad que sugiere que lleva años esperando este momento. «La contraseña de Nidavellir no se dice: se adivina. Si eres digno, la sabrás.»'],
  acertijo:'puerta_nidavellir',back:'c2_puerta'},

c2_puerta_regin:{t:[
  'Regin se adelanta, con la barbilla muy alta. El guardián lo mira, abre mucho los ojos y deja caer la alabarda. «¿Regin? ¿El aprendiz de Brok? ¡Te dábamos por muerto!»',
  'Hay abrazos, gritos y mucho pelo de barba enredado. Cuando por fin se calman, Regin te señala. «{Este|Esta} es {N}, de Vindvik. Mató a Kol el Pálido y nos sacó de la jaula. Respondo por {él|ella} con mi barba.»',
  'El guardián te mira de nuevo. Esta vez se inclina, con una reverencia rígida pero sincera. «Bienvenid{o|a} a Nidavellir, amig{o|a} de los enanos.»'],
  fx:{fl:{amigo_enanos:1},gl:10},
  c:[{x:'Cruzar la puerta de bronce',to:'c2_nidavellir',k:'main'}]},

c2_nidavellir:{h:'Nidavellir',cp:1,t:[
  'La puerta de bronce se abre con un estruendo de cadenas, y el calor te golpea la cara como una mano.',
  'Nidavellir es una ciudad dentro de una montaña. Hay calles que suben en espiral por las paredes de una caverna inmensa, puentes de piedra que cruzan abismos de lava, chimeneas que escupen chispas hacia un techo que no se ve. Y por todas partes, el sonido: miles de martillos golpeando miles de yunques, un trueno continuo que no para nunca, como el latido de un dios.',
  'Kraka se te agarra al hombro con fuerza. «Bueno», dice, con la voz un poco temblorosa. «Al menos aquí no pasaremos frío.»'],
  fx:{fl:{nidavellir:1,c2p1fin:1},gl:10,saga:'Entró en Nidavellir, la ciudad de los enanos, bajo las raíces del mundo.'},
  c:[{x:'Adentrarte en la ciudad',to:'c2_p2',k:'main'}]},

/* Escena de enlace provisional: la sustituirá la Parte 2 */
c2_p2:{h:'Continuará',t:[
  'Las calles de Nidavellir se abren ante ti, llenas de fuego, humo y enanos que te miran con curiosidad y desconfianza a partes iguales.',
  '<span class=tag>Aquí termina la Parte 1 del Capítulo 2. La historia continúa en la Parte 2: «La forja de los hermanos».</span>'],
  c:[{x:'Volver a la puerta de la ciudad',to:'c2_nidavellir'}]}

}});
})();
