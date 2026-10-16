/* =====================================================================
   Capítulo 5 · El Crepúsculo
   Parte 3 · «Ragnarok»
   La batalla de Vigrid. El primer choque (aliados, armas saboteadas,
   Hel, Utgarda-Loki). El duelo de los dioses que elige el protagonista:
   Thor contra Jormungandr, Tyr contra Garm, Odín contra Fenrir o
   Heimdal contra Loki (o, en el bando de Loki, contra Heimdal). Un solo
   tirón del hilo (la runa de Skuld o tres hilos de las Nornas) puede
   salvar a un dios. El fuego de Surt, el último hilo y los cinco finales:
   Valhalla, Folkvang, Hel, El hilo de Loki y El que vio el amanecer.
   Sustituye la escena provisional c5_p3 de la Parte 2.
   ===================================================================== */
(()=>{
/* ---------- Enemigos del último día ---------- */
Object.assign(ENEMIGOS,{
  gigante_escarcha:{n:'Gigante de la montaña',cat:'Ejército de Thrym',hp:260,a:34,gl:40,o:0},
  gigante_desarmado:{n:'Gigante de la montaña',cat:'Ejército de Thrym · arma partida',hp:200,a:27,gl:40,o:0},
  einherjar_final:{n:'Einherjar',cat:'Ejército de los dioses',hp:250,a:33,gl:20,o:0},
  jormungandr:{n:'Jormungandr',cat:'La Serpiente del Mundo',hp:460,a:38,gl:200,o:0},
  garm_final:{n:'Garm',cat:'El perro de Hel, libre',hp:420,a:38,gl:150,o:0},
  fenrir_final:{n:'Fenrir',cat:'El lobo del fin del mundo',hp:500,a:41,gl:200,o:0},
  fenrir_final_herido:{n:'Fenrir',cat:'El lobo del fin del mundo · herido',hp:400,a:37,gl:200,o:0},
  loki_final:{n:'Loki',cat:'El padre de lobos y serpientes',hp:450,a:38,gl:200,o:0},
  heimdal_final:{n:'Heimdal',cat:'El guardián del puente',hp:450,a:38,gl:0,o:0}
});

registrarMision(S=>{
  if(!S.fl.c5p2fin)return null;
  if(!S.fl.choque)return 'Empieza el Ragnarok.';
  if(!S.fl.duelo)return S.fl.bando_loki?'Sigue a Loki hasta el puente.':'Elige a quién ayudar en la llanura de Vigrid.'+(S.fl.jur_vispera?' Juraste estar junto a '+({thor:'Thor',tyr:'Tyr',odin:'Odín',heimdal:'Heimdal'})[S.fl.jur_vispera]+'.':'');
  if(!S.fl.surt)return 'Termina tu combate.';
  return 'El fuego de Surt avanza. Es la hora del último hilo.';
});

/* ---------- Ayudas ---------- */
const DIOS={thor:'Thor',tyr:'Tyr',odin:'Odín',heimdal:'Heimdal'};
const nAliados=()=>['aliado_gigantes','aliado_enanos','aliado_skadi','aliado_hrimfaxi','aliado_lobo','aliado_ul'].filter(k=>S.fl[k]).length;
/* Elegir un duelo: cumple el juramento de la víspera si coincide, lo rompe si no */
const ir=(dios,x,to)=>[
  {x,to,k:'main',oc:1,req:{eq:{jur_vispera:dios}},fx:{fl:{duelo:dios},cumple:'ultimo'}},
  {x,to,k:'main',oc:1,req:{ne:{jur_vispera:dios},fl:'jur_vispera'},fx:{fl:{duelo:dios,ultimo_roto:1}}},
  {x,to,k:'main',oc:1,req:{no:'jur_vispera'},fx:{fl:{duelo:dios}}}];
/* El tirón del hilo: runa de Skuld, tres hilos de las Nornas o nada */
const tiron=(salvado,muere,quien)=>[
  {x:`Trazar la runa de Skuld y cortar el hilo que lleva a ${quien} a la muerte`,to:salvado,k:'main',oc:1,req:{runa:'skuld',no:'skuld_usada'},fx:{fl:{skuld_usada:1}}},
  {x:`Tirar de tres hilos de las Nornas a la vez para salvar a ${quien}`,to:salvado,k:'main',oc:1,req:{hilos:3,no:'skuld_usada'},fx:{hilo:-3,fl:{skuld_usada:1,hilos_usados:1}}},
  {x:'Quedarte a su lado hasta el final',to:muere,k:'n'}];

/* ---------- Textos variables ---------- */
GEN.c5_p3=()=>({t:S.fl.bando_loki?[
  'Naglfar encalla en la orilla de Vigrid con un crujido que se oye en los nueve mundos. Los muertos de Hel bajan por la borda en silencio, miles y miles, con armas oxidadas y los ojos vacíos.',
  'Loki salta a la arena el primero, riendo. Te tiende la mano. «¡Vamos, {sobrino|sobrina}! ¡El mundo viejo se acaba, y nosotros vamos a verlo!»',
  'Al otro lado de la llanura, el ejército de los dioses se detiene. Entre las primeras filas ves a Thor. A Tyr. A Hervor y a Starkad. Y en el centro, en el puente del arco iris, a Heimdal, que te mira.']
 :[
  'El cielo se abre de lado a lado. Por la grieta bajan los hijos de Muspel, los gigantes de fuego, y al frente cabalga Surt con una espada que brilla más que el sol que ya no existe. Cuando pisan el puente del arco iris, el Bifrost se rompe con un ruido de cristal.',
  'Al este, Naglfar encalla en la orilla y los muertos de Hel bajan por la borda. Al norte, el ejército de Thrym avanza entre la nieve. Y desde el mar, levantando olas como montañas, sale Jormungandr, la Serpiente del Mundo, escupiendo veneno.',
  'Los einherjar salen por las quinientas cuarenta puertas del Valhalla, ochocientos por cada una, y corren hacia la llanura gritando. Tú corres con ellos. Kraka va en tu hombro, agarrado con todas sus garras.']});

GEN.c5_choque=()=>{const t=[];
  if(S.fl.bando_loki){t.push('Corres con los muertos de Hel hacia las filas de los dioses. Es como correr dentro de una pesadilla: a tu alrededor, nadie respira, nadie grita. Solo tú, y Kraka temblando en tu hombro.');
    t.push('Un einherjar se planta delante de ti. Lo reconoces: estaba en el banquete, dos mesas más allá de tu abuelo. Él también te reconoce. «Tú», dice, sin rabia, solo con tristeza.');return {t};}
  t.push('El primer choque es como dos mares que se encuentran. Gigantes contra einherjar, muertos contra vivos, fuego contra hielo.');
  const a=[];
  if(S.fl.aliado_gigantes)a.push('Por el flanco norte bajan los gigantes de escarcha de Bergelmir, con el viejo a la cabeza y Ymma ya mayor a su lado; se lanzan contra el ejército de Thrym, y los de la montaña no se esperaban encontrar a otros gigantes en contra');
  if(S.fl.aliado_enanos)a.push('Los enanos de Nidavellir salen de la tierra en medio de la llanura, con Brok, Eitri y Regin al frente, y sus martillos suenan como mil forjas');
  if(S.fl.aliado_skadi)a.push('Desde una colina, las flechas de Skadi caen sobre los gigantes como granizo negro');
  if(S.fl.aliado_hrimfaxi)a.push('Hrimfaxi baja del cielo galopando y apaga con su crin de escarcha los primeros incendios de Surt');
  if(S.fl.aliado_lobo)a.push('Un aullido rueda por la llanura, y el Lobo Ceniza se lanza contra los perros de Hel, que huyen aterrados');
  if(S.fl.aliado_ul)a.push('Una parte entera del ejército de Thrym se pone a pelear contra árboles, rocas y sombras que no existen: Utgarda-Loki ha cumplido su palabra');
  if(a.length)t.push('Y entonces llegan los tuyos. '+a.join('. ').replace(/^./,c=>c.toUpperCase())+'.');
  if(S.fl.sabotaje)t.push('Al primer golpe, las hachas de los gigantes de Thrym se parten como ramas secas. Las lanzas se quiebran. Las espadas se rajan. Los veinte herreros que liberaste cumplieron su juramento. Thrym ruge de rabia al ver su acero enano hecho pedazos.');
  if(S.fl.hel_conmovida)t.push('Y en el flanco este, algo extraño: la mitad de los muertos de Naglfar se detienen en la orilla y no avanzan. Hel no ha querido mandarlos a todos.');
  t.push('Un gigante de la montaña te ve, levanta su arma y viene a por ti.');
  return {t};};

GEN.c5_surt=()=>{const v=[['thor_vive','Thor'],['tyr_vive','Tyr'],['odin_vive','Odín'],['heimdal_vive','Heimdal']].filter(x=>S.fl[x[0]]).map(x=>x[1]);
  return {t:[
  'A tu alrededor, la batalla se acaba como se apaga una hoguera: no de golpe, sino a trozos. Thor y la serpiente. Tyr y el perro. Odín y el lobo. Heimdal y Loki. Freyr, sin la espada que regaló hace mucho, cae ante Surt.'+(v.length?' Pero no todo es como estaba escrito: '+v.join(' y ')+(v.length>1?' siguen':' sigue')+' en pie, gracias a un hilo que alguien ha cortado.':''),
  'Y entonces Surt levanta su espada de fuego y la clava en la tierra. Las llamas se extienden por la llanura de Vigrid, por Asgard, por Midgard, por los nueve mundos. El Árbol del Mundo arde. El cielo cae. El mar empieza a subir.',
  'En medio del fuego, Kraka se agarra a tu cuello. Y a tu lado, de pie entre las llamas sin quemarse, con el huso en las manos, está Skuld.']};};

GEN.c5_hilo=()=>{
  const favs=Object.keys(S.fav).length;
  const am=!S.fl.bando_loki&&S.fl.runa_skuld&&!S.fl.skuld_usada&&S.nid===0&&!S.fl.ultimo_roto&&S.rg>=5&&favs>=4;
  const va=!S.fl.bando_loki&&S.rg>=5&&!(S.fl.pacto_loki&&!S.fl.pacto_roto);
  S.fl.amanecer_ok=am?1:0;S.fl.valhalla_ok=va?1:0;
  const falta=[];
  if(S.fl.skuld_usada)falta.push('gastaste el tirón de tu hilo en salvar a otro, y eso no se puede deshacer');
  else if(!S.fl.runa_skuld)falta.push('no llevas mi runa');
  if(S.nid>0||S.fl.ultimo_roto)falta.push('rompiste un juramento');
  if(S.rg<5)falta.push('las valquirias aún no te han elegido');
  if(favs<4)falta.push('no tienes el favor de suficientes dioses');
  return {t:[
  '«Ya está», dice Skuld. Mira el fuego con una tristeza tranquila, como quien mira el final de una canción que conoce de memoria. «Así acaba lo que fue. Lo que ha de ser empieza mañana.»',
  am?'Te coge la mano marcada. «Tienes mi runa. No la has gastado en nadie. No has roto ni un juramento. Los dioses te han dado su favor y las valquirias te han elegido.» Por primera vez desde que la conoces, sonríe de verdad. «Puedes cortar tu propio hilo del fuego. Puedes ver el amanecer, {N}. Si quieres.»'
     :'Te coge la mano marcada. «Tu hilo llega hasta aquí», dice. '+(falta.length?'«Podría haber llegado más lejos, pero '+falta.join(', ').replace(/, ([^,]*)$/,' y $1')+'.»':'«No más lejos.»')+' Te aprieta la mano. «No es poco. Es mucho más de lo que tenías aquella noche en Vindvik.»',
  S.fl.folkvang_oferta?'Entre las llamas, una mano blanca se tiende hacia ti: Freya, con los ojos llenos de lágrimas de oro. Folkvang te espera, si lo quieres.':'',
  va?'Y desde arriba, entre el humo, baja una valquiria a caballo con la armadura dorada ardiendo. Sigrun. «Ven», dice. «Tu sitio está guardado.»'
    :(S.fl.bando_loki?'':'Desde abajo, desde muy abajo, una voz que habla con dos bocas te llama por tu nombre. Hel.')]};};

const epilogo=()=>{const t=[];
  const v=[['thor_vive','Thor, con el martillo en el cinturón, buscando a sus hijos'],['tyr_vive','Tyr, con su única mano, mirando el amanecer'],['odin_vive','Odín, el viejo tuerto, sentado en una piedra, cansado y vivo'],['heimdal_vive','Heimdal, que oye crecer la primera hierba del mundo nuevo']].filter(x=>S.fl[x[0]]).map(x=>x[1]);
  t.push('Después del fuego, la tierra se hunde en el mar. Y después del mar, vuelve a salir: verde, nueva, con cascadas y águilas que pescan en ellas. Los campos dan cosecha sin sembrar. Baldr y Höd vuelven del reino de Hel y se sientan juntos en la hierba. Vidar y Vali, los hijos de Odín, y Modi y Magni, los hijos de Thor, con Mjolnir, encuentran en la hierba las piezas de oro de los juegos de los dioses antiguos.'+(v.length?' Y con ellos, contra todo lo escrito: '+v.join('; ')+'.':''));
  if(S.fl.siri_bosque||S.fl.deseo==='siri')t.push('Del bosque de Mímir salen Lif y Lifthrasir, de la mano. Y con ellos sale Siri, con un hatillo de hierbas y un libro de runas, mirando el mundo nuevo con los ojos de su padre. Será ella quien enseñe las runas a los que vengan después.');
  else t.push('Del bosque de Mímir salen Lif y Lifthrasir, de la mano, y con ellos empieza un mundo nuevo. En Vindvik ya no queda nadie. Pero alguien, algún día, encontrará una piedra con un agujero en la playa, y la guardará porque da suerte.');
  return t;};

GEN.c5_fin_amanecer=()=>({t:[
  'Trazas la runa de Skuld sobre tu propia mano. El hilo que te ata al fuego se corta con un ruido diminuto, como una cuerda de arpa en otra habitación. Y caes. Caes a través del fuego, del humo y del mar, durante mucho tiempo.',
  ...epilogo(),
  'Despiertas en la hierba. Hace calor. Hay sol: un sol nuevo, pequeño y brillante, hijo del que se tragó el lobo. Estás viv{o|a}. Tienes en la palma una marca que ya no es de nadie más que tuya.',
  S.fl.deseo==='kraka'||S.fl.kraka_noche5?'Algo te picotea la oreja. «Por fin», dice Kraka. «Llevo toda la mañana aquí. Con este sol. Al principio de un mundo nuevo.» Se esponja las plumas. «¿Y ahora qué hacemos?»':'Algo te picotea la oreja. Es Kraka. No dice nada. Por una vez en su vida, no tiene nada que decir.',
  'A lo lejos, en una colina, una mujer de vestido gris os mira, sonríe y desaparece. Lo que ha de ser ya es. Y tú lo has visto.']});

GEN.c5_fin_valhalla=()=>({t:[
  'Coges la mano de Sigrun. Su caballo sube a través del humo, por encima del fuego, y desde allí arriba ves los nueve mundos arder y hundirse en el mar. Kraka va contigo, agarrado a tu hombro. Los cuervos no tienen adónde ir, pero este tiene a alguien con quien ir.',
  'El salón de oro te espera en el cielo del mundo nuevo: Gimlé, más brillante que el sol, donde los dignos viven después del fin. Allí están Hervor y Starkad, discutiendo. Allí está tu abuelo Hjalmar, que te hace sitio en el banco. Allí está Bragi, afinando el arpa. Y en la puerta, Skuld, que te saluda con el huso.',
  ...epilogo(),
  'Bragi canta tu saga esa noche, y todas las noches. Empieza siempre igual: «Había {un guerrero|una guerrera} en Vindvik que se moría de unas fiebres…». Y siempre termina igual: «…y se ganó su sitio».',
  S.fl.kraka_hel?'Y cada noche, antes de dormir, dices en voz alta un nombre, como le prometiste: Kraka. Para que no se apague. No se apaga.':'']});

GEN.c5_fin_folkvang=()=>({t:[
  'Coges la mano de Freya. Es cálida, la primera cosa cálida que tocas en todo el día. Las llamas se apartan a vuestro paso y, de pronto, estáis en un campo de flores que el fuego no ha tocado nunca. Folkvang, el salón de Freya, a salvo en el corazón del incendio.',
  'Freya ya no llora. Te sirve hidromiel ella misma, y los gatos de su carro se tumban a tus pies. «Elijo antes que Odín», dice. «Siempre ha sido así. Y esta vez te he elegido a ti.»',
  ...epilogo(),
  'En Folkvang no hay batallas. Hay campos, flores, y una mesa larga donde nunca falta sitio. Kraka duerme al sol en el respaldo de tu silla. Por primera vez desde aquella noche de fiebre en Vindvik, no tienes que ganarte nada.']});

GEN.c5_fin_hel=()=>({t:[
  'Las llamas te alcanzan. No duele tanto como pensabas. Y luego bajas, despacio, por un camino que ya conoces: el de los muertos de paja, el puente de oro, el río de los cuchillos, la reja de Helgrind.',
  S.fl.hel_conmovida||S.fl.hel_respeto
    ?'Hel te espera en la puerta de Eljudnir. No con dos caras: con una sola sonrisa, la de su mitad viva. «Tú», dice. «Te dije que me acordaría.» Te sienta a su derecha, en el sitio de honor. Junto a la mesa están tu padre, Bjorn, y tu hermano Einar, que te hacen sitio.'
    :'Hel te mira desde su trono con sus dos ojos, y su mitad muerta sonríe. «Al final», dice, «siempre vuelven todos a mí.» Te sientas en un banco largo, entre miles de muertos. Al fondo del salón ves a tu padre, Bjorn, que te saluda con la mano.',
  ...epilogo(),
  'Un día, mucho después, Baldr pasa por Eljudnir antes de subir al mundo nuevo. Se detiene junto a tu banco. «Viniste a buscarme una vez», dice. «Ahora vengo yo a darte las gracias.» Y en el reino donde no pasa nada, por un instante, pasa algo.']});

GEN.c5_fin_loki=()=>({t:[
  'Loki te coge de la mano en medio del fuego. Está herido de muerte; la lanza de Heimdal le ha atravesado el pecho, y a Heimdal la suya. Aun así, se ríe. «¿Ves?», dice. «Te dije que estarías en el mundo nuevo. No te dije cómo.»',
  'El hilo rojo de tu muñeca se tensa. Loki tira de él con su último aliento y te arrastra con él, fuera del fuego, fuera del mundo, a un sitio que no es ni Asgard ni Hel ni nada que tenga nombre.',
  ...epilogo(),
  'Despiertas en la orilla del mundo nuevo, sol{o|a}. Nadie te espera. Los dioses que vuelven no te miran. Tienes la marca roja en la mano, y por las noches, en sueños, una voz demasiado simpática te cuenta chistes que nadie más entiende.',
  'Kraka está contigo. Siempre está contigo. Pero ya no habla tanto como antes.']});

registrarCapitulo({capitulo:5,parte:3,titulo:'Ragnarok',escenas:{

/* ---------- El primer choque ---------- */
c5_p3:{h:'Ragnarok',cp:1,gen:'c5_p3',t:[],
  c:[{x:'Bajar del barco junto a Loki',to:'c5_choque',k:'main',oc:1,req:{fl:'bando_loki'}},
     {x:'Lanzarte a la batalla',to:'c5_choque',k:'main',oc:1,req:{no:'bando_loki'}}]},

c5_choque:{h:'El primer choque',gen:'c5_choque',t:[],
  c:[{x:'Defenderte',to:'c5_f_einherjar',k:'hunt',oc:1,req:{fl:'bando_loki'}},
     {x:'Plantarle cara',to:'c5_f_gigante_debil',k:'hunt',oc:1,req:{no:'bando_loki',fl:'sabotaje'}},
     {x:'Plantarle cara',to:'c5_f_gigante',k:'hunt',oc:1,req:{no:['bando_loki','sabotaje']}}]},

c5_f_einherjar:{t:['El einherjar levanta el escudo. «Lo siento», dice. Y ataca.'],f:{e:'einherjar_final',win:'c5_choque_tras',lose:'muerte'}},
c5_f_gigante_debil:{t:['El gigante descarga su hacha contra ti, y la hoja se parte a medio camino con un crujido. Ruge de rabia y te ataca con el mango.'],f:{e:'gigante_desarmado',win:'c5_choque_tras',lose:'muerte'}},
c5_f_gigante:{t:['El gigante de la montaña descarga su hacha de acero enano contra ti.'],f:{e:'gigante_escarcha',win:'c5_choque_tras',lose:'muerte'}},

c5_choque_tras:{h:'En medio de Vigrid',t:[
  'Tu rival cae. Te quedas un momento quiet{o|a}, jadeando, en medio de una batalla que se extiende hasta el horizonte en todas las direcciones. No hay líneas, no hay frentes: hay mil combates a la vez.',
  'Y en el centro de todo, los grandes. Los que estaban escritos.'],
  fx:{fl:{choque:1},gl:20},
  c:[{x:'Seguir a Loki hacia el puente roto',to:'c5_bando',k:'main',oc:1,req:{fl:'bando_loki'}},
     {x:'Mirar a tu alrededor',to:'c5_elegir',k:'main',oc:1,req:{no:'bando_loki'}}]},

c5_elegir:{h:'Los cuatro combates',cp:1,t:[
  'A tu izquierda, junto al mar, Thor lucha contra Jormungandr, la Serpiente del Mundo, que se enrosca alrededor de media llanura. Delante, Tyr, con su única mano, se enfrenta a Garm, el perro de Hel, libre por fin. A la derecha, Odín, sobre Sleipnir, carga contra Fenrir, que abre las fauces de la tierra al cielo. Y en lo que queda del puente del arco iris, Heimdal y Loki se miran como se han mirado desde el principio del mundo.',
  'Solo puedes estar en un sitio. Kraka te tira de la oreja. «Elige», dice. «Rápido.»'],
  c:[...ir('thor','Ir junto a Thor, contra la Serpiente del Mundo','c5_d_thor'),
     ...ir('tyr','Ir junto a Tyr, contra Garm','c5_d_tyr'),
     ...ir('odin','Ir junto a Odín, contra Fenrir','c5_d_odin'),
     ...ir('heimdal','Ir junto a Heimdal, contra Loki','c5_d_heimdal')]},

/* ---------- Thor y la Serpiente ---------- */
c5_d_thor:{h:'La Serpiente del Mundo',t:[
  'Jormungandr es tan grande que no ves su cola: rodea el mundo entero. Su cabeza es como una montaña de escamas verdes, y de sus colmillos chorrea un veneno que quema la tierra. Thor la golpea una y otra vez con Mjolnir, y cada golpe hace temblar la llanura.',
  'Thor te ve llegar y se ríe. «¡El de la hebilla!», ruge. «¡Ven, que esta lombriz es muy grande para uno solo!»'],
  c:[{x:'Atacar a la serpiente junto a Thor',to:'c5_f_serpiente',k:'hunt'}]},

c5_f_serpiente:{t:['La Serpiente del Mundo se vuelve hacia ti. Sus ojos son del tamaño de escudos.'],f:{e:'jormungandr',win:'c5_thor_pasos',lose:'muerte'}},

c5_thor_pasos:{h:'Nueve pasos',t:[
  'Thor da el último golpe. Mjolnir se hunde en el cráneo de la serpiente, que cae con un estruendo que levanta olas en el mar. Thor ha ganado.',
  'Pero el veneno le ha alcanzado. Lo ves en su cara, que se pone gris. Thor se vuelve hacia ti, sonríe y empieza a andar. Un paso. Dos. Tres. Cuenta en voz alta, como un niño. Cuatro. Cinco.'],
  c:tiron('c5_thor_vive','c5_thor_muere','Thor')},

c5_thor_vive:{t:[
  'El hilo de Thor se corta del veneno. El dios da el noveno paso… y el décimo. Y el undécimo. Se mira las manos, sorprendido. Luego se ríe tan fuerte que tiembla lo que queda de la llanura.',
  '«¡Diez!», ruge. «¡Once! ¡Lo dijo la profecía y me lo he saltado!» Te coge en brazos y te levanta del suelo. «¡El de la hebilla me ha robado a la muerte!»'],
  fx:{fl:{thor_vive:1,surt:1},gl:60,saga:'En Vigrid luchó junto a Thor contra la Serpiente del Mundo, y con un tirón del hilo le salvó del veneno.'},
  c:[{x:'Mirar al sur, donde arde el fuego',to:'c5_surt',k:'main'}]},

c5_thor_muere:{t:[
  'Seis. Siete. Ocho. Te quedas a su lado. Thor apoya una mano enorme en tu hombro para no caerse.',
  '«Nueve», dice. Y cae. Muere sonriendo, con el martillo en la mano y la cabeza de la serpiente a sus pies. Le cierras los ojos. Kraka, en tu hombro, dice en voz baja: «El de la cabra. Siempre fue el de la cabra». Y no dice nada más.'],
  fx:{fl:{surt:1},gl:40,saga:'En Vigrid luchó junto a Thor contra la Serpiente del Mundo, y estuvo a su lado en sus nueve pasos.'},
  c:[{x:'Mirar al sur, donde arde el fuego',to:'c5_surt',k:'main'}]},

/* ---------- Tyr y Garm ---------- */
c5_d_tyr:{h:'El perro de Hel',t:[
  'Garm, libre de su cadena, es todavía más grande que en la puerta de Helgrind. Tiene el pecho manchado de sangre y los ojos como hogueras. Tyr le hace frente con la espada en su única mano, y los dos se estudian, dando vueltas, como si llevaran siglos esperando este momento. Lo llevan.',
  'Garm te ve llegar. Se detiene. Olfatea el aire.'],
  c:[{x:'Sacar de tu bolsa un pan que no estaba ahí',to:'c5_garm_pan',k:'main',oc:1,req:{fl:'garm_amigo'}},
     {x:'Plantarte delante: Garm ya sabe quién eres',to:'c5_garm_miedo',k:'main',oc:1,req:{fl:'garm_vencido',no:'garm_amigo'}},
     {x:'Atacar a Garm junto a Tyr',to:'c5_f_garm',k:'hunt'}]},

c5_garm_pan:{h:'El pan',t:[
  'Metes la mano en la bolsa y ahí está, otra vez: un pan de cebada, caliente, como el que hacía Siri. Se lo lanzas a Garm.',
  'El perro de Hel lo atrapa al vuelo. Lo mastica despacio. Mira a Tyr, que tiene la espada en alto. Te mira a ti. Y entonces, el monstruo que según las profecías debía matar al dios de la guerra se tumba en el suelo, en medio del Ragnarok, con la cabeza entre las patas, como un perro de granja que ha comido bien.',
  'Tyr baja la espada, despacio. Te mira con los ojos muy abiertos. «Lo justo cuesta», dice. «Y a veces, cuesta un pan.» Se echa a reír. Es la primera vez que lo oyes reír.'],
  fx:{fl:{tyr_vive:1,garm_vive:1,surt:1},gl:80,saga:'En Vigrid calmó a Garm con un pan, y ni el perro ni Tyr murieron aquel día, contra todo lo escrito.'},
  c:[{x:'Mirar al sur, donde arde el fuego',to:'c5_surt',k:'main'}]},

c5_garm_miedo:{t:[
  'Te plantas delante de Garm. El perro te reconoce: eres quien lo tumbó en la puerta de Helgrind. Retrocede un paso, gruñendo, con las orejas pegadas a la cabeza.',
  'Ese paso es suficiente. Tyr salta, y su espada encuentra el corazón de Garm antes de que el perro pueda volverse. Garm cae. Tyr queda en pie, herido, sangrando, pero en pie. «Me lo dejaste a tiro», jadea. «Dicen que no se puede engañar al destino. Parece que sí se le puede asustar.»'],
  fx:{fl:{tyr_vive:1,surt:1},gl:60,saga:'En Vigrid asustó a Garm, y Tyr lo mató y sobrevivió, contra todo lo escrito.'},
  c:[{x:'Mirar al sur, donde arde el fuego',to:'c5_surt',k:'main'}]},

c5_f_garm:{t:['Garm salta. Tyr y tú lo recibís a la vez, uno por cada lado.'],f:{e:'garm_final',win:'c5_tyr_herido',lose:'muerte'}},

c5_tyr_herido:{h:'El dios manco',t:[
  'Garm cae, pero en su último mordisco atrapa a Tyr por el costado. El dios de la guerra se desploma junto al perro, los dos muriéndose, como estaba escrito.',
  'Tyr te mira desde el suelo. «Lo justo cuesta», susurra. «Siempre.»'],
  c:tiron('c5_tyr_vive','c5_tyr_muere','Tyr')},

c5_tyr_vive:{t:[
  'El hilo de Tyr se aparta de la muerte con un tirón. La herida se cierra, no del todo, pero lo bastante. Tyr se incorpora, mirándose el costado con incredulidad.',
  '«¿Qué has hecho?», pregunta. Se lo dices. Tyr se queda callado mucho rato. «Has pagado por mí», dice al fin. «Lo justo cuesta. Gracias por pagarlo.»'],
  fx:{fl:{tyr_vive:1,surt:1},gl:60,saga:'En Vigrid luchó junto a Tyr contra Garm, y con un tirón del hilo le salvó de la muerte.'},
  c:[{x:'Mirar al sur, donde arde el fuego',to:'c5_surt',k:'main'}]},

c5_tyr_muere:{t:[
  'Te arrodillas junto a Tyr y le coges la mano. Su única mano. Él aprieta, fuerte, y luego deja de apretar.',
  'Le cierras los ojos. A su lado, Garm también ha dejado de respirar. Los dos se mataron, como estaba escrito, y tú estuviste allí.'],
  fx:{fl:{surt:1},gl:40,saga:'En Vigrid luchó junto a Tyr contra Garm, y le cogió la mano al final.'},
  c:[{x:'Mirar al sur, donde arde el fuego',to:'c5_surt',k:'main'}]},

/* ---------- Odín y Fenrir ---------- */
c5_d_odin:{h:'El lobo',t:[
  'Fenrir es más grande que nunca. Abre las fauces y su mandíbula de abajo toca la tierra y la de arriba el cielo. Odín carga contra él sobre Sleipnir, con la lanza Gungnir en alto, y parece muy pequeño.',
  'Fenrir te ve llegar. Sus ojos amarillos se entornan. Te huele.'],
  c:[{x:'Ponerte entre los dos: «¡Fenrir! Soy quien le llevó tus cosas a tu madre»',to:'c5_fenrir_habla',k:'main',oc:1,req:{fl:'fenrir_amigo'}},
     {x:'Atacar al lobo junto a Odín',to:'c5_f_fenrir_herido',k:'hunt',oc:1,req:{fl:'fenrir_herido'}},
     {x:'Atacar al lobo junto a Odín',to:'c5_f_fenrir',k:'hunt',oc:1,req:{no:'fenrir_herido'}}]},

c5_fenrir_habla:{h:'Lo que quiere el lobo',t:[
  'Te pones entre Odín y Fenrir con los brazos abiertos. Es lo más estúpido que has hecho nunca. El lobo se detiene a un palmo de ti, con las fauces abiertas.',
  '«Tú», gruñe. «El de mi madre.» Mira a Odín por encima de tu cabeza. «El tuerto me encadenó. Me engañó. Me dejó atado con una espada en la boca durante siglos.» Pero no ataca.',
  '«¿Qué quieres de verdad?», le preguntas. Fenrir se queda callado mucho rato. «Correr», dice al fin, y su voz es casi la de un cachorro. «Solo quería correr.»',
  'Odín baja la lanza. Mira al lobo, y en su único ojo hay algo que nunca le habías visto: vergüenza. «Corre, entonces», dice. «Corre adonde quieras. Yo no te seguiré.» Y Fenrir, el lobo que debía tragarse al Padre de Todos, se da la vuelta y echa a correr hacia el este, hacia el Bosque de Hierro, hacia su madre. No vuelve.'],
  fx:{fl:{odin_vive:1,fenrir_vive:1,surt:1},gl:100,saga:'En Vigrid se interpuso entre Odín y Fenrir, y el lobo, en lugar de tragarse al dios, se fue a correr.'},
  c:[{x:'Mirar al sur, donde arde el fuego',to:'c5_surt',k:'main'}]},

c5_f_fenrir:{t:['Fenrir se lanza contra Odín, y tú te lanzas contra Fenrir.'],f:{e:'fenrir_final',win:'c5_odin_fauces',lose:'muerte'}},
c5_f_fenrir_herido:{t:['Fenrir se lanza contra Odín, pero cojea: las heridas de la cadena que deshiciste a medias en Lyngvi todavía no se han cerrado. Tú te lanzas contra él.'],f:{e:'fenrir_final_herido',win:'c5_odin_fauces',lose:'muerte'}},

c5_odin_fauces:{h:'Las fauces',t:[
  'Fenrir se tambalea, herido de muerte. Pero antes de caer, abre las fauces una última vez y se lanza hacia Odín. Ves cómo el Padre de Todos levanta la vista, sin miedo, como quien ve llegar algo que lleva esperando mil años.',
  'Vidar, el hijo silencioso de Odín, corre hacia el lobo con su bota de piel gruesa para pisarle la mandíbula. Pero llega tarde. Siempre llegó tarde. Estaba escrito.'],
  c:tiron('c5_odin_vive','c5_odin_muere','Odín')},

c5_odin_vive:{t:[
  'Cortas el hilo. Las fauces de Fenrir se cierran en el aire, a un palmo de Odín, que ya no está ahí: Sleipnir ha saltado hacia atrás en el último instante, como si alguien hubiera tirado de sus riendas.',
  'Vidar llega y pisa la mandíbula del lobo. Fenrir muere. Odín baja del caballo y se queda mirándote con su único ojo. «Lo vi en el pozo de Mímir», dice al fin. «Lo vi mil veces. Y nunca vi esto.» Se ríe, por primera vez, con una risa vieja y cansada. «Skuld ha ganado su apuesta.»'],
  fx:{fl:{odin_vive:1,surt:1},gl:70,saga:'En Vigrid luchó junto a Odín contra Fenrir, y con un tirón del hilo salvó al Padre de Todos de las fauces del lobo.'},
  c:[{x:'Mirar al sur, donde arde el fuego',to:'c5_surt',k:'main'}]},

c5_odin_muere:{t:[
  'Las fauces se cierran. Odín desaparece en la garganta del lobo con Sleipnir, con Gungnir, con sus cuervos. Durante un instante, el mundo entero se queda en silencio.',
  'Luego Vidar pisa la mandíbula de Fenrir con su bota, le agarra la de arriba con las manos y le desgarra las fauces hasta el corazón. El lobo muere. Y en tu hombro, Kraka llora, por primera vez desde que lo conoces, por el dios que lo echó.'],
  fx:{fl:{surt:1},gl:40,saga:'En Vigrid luchó junto a Odín contra Fenrir, y vio caer al Padre de Todos.'},
  c:[{x:'Mirar al sur, donde arde el fuego',to:'c5_surt',k:'main'}]},

/* ---------- Heimdal y Loki ---------- */
c5_d_heimdal:{h:'El puente roto',t:[
  'En lo que queda del Bifrost, Heimdal y Loki se enfrentan. Llevan haciéndolo desde el principio de los tiempos: el que todo lo vigila contra el que todo lo enreda. Heimdal tiene una herida en el brazo. Loki, ninguna. Sonríe.',
  'Loki te ve llegar. «Vaya», dice. «Aquí viene la apuesta de Skuld.» Se ríe. «Vamos a ver qué tal tira de los hilos, ahora que todos están ardiendo.»'],
  c:[{x:'Atacar a Loki junto a Heimdal',to:'c5_f_loki',k:'hunt'}]},

c5_f_loki:{t:['Loki se multiplica: hay tres, cinco, diez como él, riendo, todos con un cuchillo en la mano. Pero solo uno huele a manzanas asadas.'],f:{e:'loki_final',win:'c5_heimdal_herido',lose:'muerte'}},

c5_heimdal_herido:{h:'El que todo lo oye',t:[
  'Loki cae. El verdadero. Se queda tendido en el puente roto, mirando el cielo, y por una vez no sonríe. «Bueno», dice. «Al menos ha sido divertido.» Y cierra los ojos.',
  'Pero antes de caer, le ha clavado el cuchillo a Heimdal en el pecho. El guardián del puente se sienta despacio en el borde del Bifrost, con las piernas colgando sobre el abismo, y se lleva la mano a la herida. «Lo oigo», dice. «Oigo mi propio corazón. Va más despacio.»'],
  c:tiron('c5_heimdal_vive','c5_heimdal_muere','Heimdal')},

c5_heimdal_vive:{t:[
  'Cortas el hilo. El corazón de Heimdal, que iba más despacio, vuelve a latir fuerte. El guardián se mira el pecho, se mira la mano llena de sangre y luego te mira a ti.',
  '«Oigo crecer la hierba», dice. «Oigo cómo engordan las ovejas.» Sonríe con sus dientes de oro. «Y ahora oigo algo nuevo. Oigo un mundo que todavía no existe, debajo del mar, esperando para salir. Gracias por dejarme oírlo.»'],
  fx:{fl:{heimdal_vive:1,surt:1},gl:70,saga:'En Vigrid ayudó a Heimdal a vencer a Loki, y con un tirón del hilo salvó al guardián del puente.'},
  c:[{x:'Mirar al sur, donde arde el fuego',to:'c5_surt',k:'main'}]},

c5_heimdal_muere:{t:[
  'Te sientas a su lado, en el borde del puente roto. Heimdal te pasa el Gjallarhorn. «Guárdamelo», dice. Luego cierra los ojos y escucha, por última vez, cómo suena el mundo. Sonríe.',
  'Deja de oírlo. Te quedas con el cuerno en las manos. Pesa muchísimo.'],
  fx:{fl:{surt:1},gl:40,saga:'En Vigrid ayudó a Heimdal a vencer a Loki, y estuvo a su lado cuando el guardián dejó de oír el mundo.'},
  c:[{x:'Mirar al sur, donde arde el fuego',to:'c5_surt',k:'main'}]},

/* ---------- El bando de Loki ---------- */
c5_bando:{h:'El puente roto',cp:1,t:[
  'Sigues a Loki hasta lo que queda del Bifrost. Allí le espera Heimdal, con la espada desenvainada y un brazo herido. Te ve llegar al lado de Loki, y algo en su cara se rompe.',
  '«Te hice tres preguntas en este puente», dice. «Me dijiste la verdad.» Levanta la espada. «Dímela ahora. ¿De qué lado estás?»',
  'Loki te pone una mano en el hombro. «Del mío», contesta por ti, sonriendo. «¿Verdad, {sobrino|sobrina}?»'],
  fx:{fl:{duelo:'bando'}},
  c:[{x:'Levantar el arma contra Heimdal',to:'c5_f_heimdal',k:'n'},
     {x:'Volverte y levantar el arma contra Loki',to:'c5_traicion',k:'main'}]},

c5_f_heimdal:{t:['Heimdal suspira. «Lo oí venir», dice. «Desde el principio.» Y ataca.'],f:{e:'heimdal_final',win:'c5_bando_fin',lose:'muerte'}},

c5_bando_fin:{t:[
  'Heimdal cae de rodillas. Antes de caer del todo, alza su espada una última vez y atraviesa a Loki, que reía a tu lado. Los dos caen juntos al abismo del puente roto, como estaba escrito desde el principio.',
  'Te quedas sol{o|a} en el puente. A lo lejos, Surt levanta su espada de fuego.'],
  fx:{fl:{surt:1},gl:-50,saga:'En Vigrid luchó en el bando de Loki contra Heimdal.'},
  c:[{x:'Esperar el fuego',to:'c5_surt',k:'n'}]},

c5_traicion:{h:'La traición',t:[
  'Te das la vuelta. Loki ve tu cara y, por primera vez desde que lo conoces, no sonríe. «Ah», dice. «Así que al final eres de Skuld.»',
  'Te arrancas el hilo rojo de la muñeca y se lo tiras a los pies. Heimdal, detrás de ti, baja la espada un instante, sorprendido. Luego se pone a tu lado.'],
  fx:{fl:{pacto_roto:1,traicion_loki:1,bando_loki:0},gl:80,saga:'En el puente roto de Vigrid, en el último momento, se volvió contra Loki y luchó junto a Heimdal.'},
  c:[{x:'Atacar a Loki junto a Heimdal',to:'c5_f_loki',k:'hunt'}]},

/* ---------- El fuego de Surt y el último hilo ---------- */
c5_surt:{h:'El fuego de Surt',cp:1,gen:'c5_surt',t:[],
  c:[{x:'Volverte hacia Skuld',to:'c5_hilo',k:'main'}]},

c5_hilo:{h:'El último hilo',gen:'c5_hilo',t:[],
  c:[{x:'Trazar la runa de Skuld sobre tu propia mano y cortar tu hilo del fuego',to:'c5_fin_amanecer',k:'main',oc:1,req:{fl:'amanecer_ok'}},
     {x:'Coger la mano de Sigrun',to:'c5_fin_valhalla',k:'main',oc:1,req:{fl:'valhalla_ok'}},
     {x:'Coger la mano de Freya',to:'c5_fin_folkvang',k:'social',oc:1,req:{fl:'folkvang_oferta',no:'bando_loki'}},
     {x:'Dejar que el hilo rojo tire de ti',to:'c5_fin_loki',k:'n',oc:1,req:{fl:'bando_loki'}},
     {x:'Cerrar los ojos y dejar que el fuego te lleve',to:'c5_fin_hel',k:'n',oc:1,req:{no:['valhalla_ok','bando_loki']}}]},

/* ---------- Los finales ---------- */
c5_fin_amanecer:{h:'El que vio el amanecer',gen:'c5_fin_amanecer',t:[],
  fx:{saga:'Cortó su propio hilo del fuego de Surt y despertó en el mundo nuevo. Vio el amanecer.'},
  end:'El que vio el amanecer',saga:1},
c5_fin_valhalla:{h:'Valhalla',gen:'c5_fin_valhalla',t:[],
  fx:{saga:'Cayó en Vigrid con honor. Las valquirias lo llevaron a Gimlé, el salón de oro del mundo nuevo.'},
  end:'Valhalla',saga:1},
c5_fin_folkvang:{h:'Folkvang',gen:'c5_fin_folkvang',t:[],
  fx:{saga:'Cayó en Vigrid, y Freya lo eligió antes que Odín para su salón de Folkvang.'},
  end:'Folkvang',saga:1},
c5_fin_hel:{h:'Hel',gen:'c5_fin_hel',t:[],
  fx:{saga:'Cayó en el fuego de Surt y bajó por última vez al reino de Hel.'},
  end:'Hel',saga:1},
c5_fin_loki:{h:'El hilo de Loki',gen:'c5_fin_loki',t:[],
  fx:{saga:'Siguió el hilo rojo de Loki hasta el final, y despertó en el mundo nuevo sin nadie que lo esperara.'},
  end:'El hilo de Loki',saga:1}

}});
})();
