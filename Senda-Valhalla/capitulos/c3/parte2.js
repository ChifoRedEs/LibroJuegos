/* =====================================================================
   Capítulo 3 · El Invierno sin Fin
   Parte 2 · «Los juegos de Utgarda-Loki»
   La fortaleza de Utgard: cinco juegos, uno cada noche (Logi, Hugi,
   el cuerno, el gato y Elli), todos ilusiones. El contador «sospecha»
   permite desenmascarar al señor de las ilusiones. Runas: Ingwaz,
   Laguz y Mannaz. Además: el campamento de Thrym, los enanos
   encadenados, Lopt, la mercader del Bosque de Hierro (Angrboda) y
   la llegada del Caminante.
   Sustituye la escena provisional c3_p2 de la Parte 1.
   Escena de enlace provisional: c3_p3 (la sustituirá la Parte 3)
   ===================================================================== */
(()=>{
const pelea=(e,win,flee,t)=>({t:[t],f:{e,win,lose:'muerte',flee}});

/* ---------- Datos nuevos ---------- */
Object.assign(OBJ,{
  escudo_enano:{n:'Escudo de los cautivos',tipo:'escudo',def:18,arm:6,vel:-1,pr:1500,d:'Forjado en secreto por los enanos que liberaste, con el acero que Thrym les robó.'},
  colmillo_hierro:{n:'Colmillo del Bosque de Hierro',tipo:'material',pr:60,d:'Un colmillo de lobo negro como el hierro. Angrboda dice que trae suerte. O lo contrario.'}
});
Object.assign(ENEMIGOS,{
  guardia_thrym:{n:'Guardia de Thrym',cat:'Gigante de la montaña',hp:172,a:25,gl:35,o:45,l:{hierro_pantano:1,carne_gigante:.4}}
});
TIENDAS.jarnvid={n:'La vieja del Bosque de Hierro · «Lo que vendo muerde. Lo que compro, también.»',
  stock:['carne_gigante','pocion_abedul','hidromiel_enana','pan_enano','piel_lobo','colmillo_hierro','hierro_pantano','savia_raiz']};

registrarSenales({
  20:'Esta noche los lobos de Utgard aúllan todos a la vez, mirando hacia el este. Hacia el Bosque de Hierro.',
  22:'Por la mañana, el hielo del foso de Utgard amanece teñido de rojo. Nadie sabe por qué. Nadie pregunta.'
},S=>S.fl.c3&&!S.fl.c4);

registrarMision(S=>{
  if(!S.fl.c3p1fin)return null;
  if(!S.fl.ul_intro)return 'Entra en Utgard y preséntate ante su señor.';
  const n=[1,2,3,4,5].filter(i=>S.fl['j'+i]).length;
  if(n<5){
    const s=S.fl.sospecha||0;
    return `Supera los juegos de Utgarda-Loki: uno cada noche, en el gran salón (${n} de 5).`+(s?` Algo no encaja en esos juegos (${s} sospecha${s>1?'s':''}).`:'')+(S.fl.campamento&&!S.fl.enanos_libres?' En el campamento de Thrym hay enanos encadenados.':'');
  }
  if(!S.fl.verdad)return 'Acude a la última noche en el salón de Utgarda-Loki.';
  if(!S.fl.c3p2fin)return 'Sigue al Caminante.';
  return null;
});

/* ---------- Textos variables ---------- */
GEN.c3_llegada_utgard=()=>({t:[
  'Las puertas de Utgard son tan altas que, para entrar, pasas entre los barrotes sin tocarlos. Dentro, todo es enorme: patios donde cabría Vindvik entera, escaleras de piedra con peldaños que te llegan a la cintura, antorchas del tamaño de pinos.',
  S.fl.aldea_destruida
    ?'Los gigantes del patio te miran y cuchichean. «Es el pequeño del martillo», oyes. «El que trajo a Thor a la aldea de Bergelmir.» Escupen al suelo a tu paso. Las noticias corren deprisa en Jotunheim, y las malas, más.'
    :'Los gigantes del patio te miran y cuchichean. «Es el pequeño de Bergelmir», oyes. «El que tumbó a Hrungnir.» Unos te miran con rabia; otros, a escondidas, con algo parecido al respeto.',
  'Fuera de las murallas, en la llanura, se extiende el campamento del ejército de Thrym: miles de hogueras, miles de gigantes y un brillo de acero que se ve desde lejos.']});

GEN.c3_lopt=()=>({t:S.fl.brok_tarde?[
  'Junto a la tienda de Thrym, sentado en un barril, hay un hombre delgado de pelo rojo. Lopt. Te ve y sonríe de oreja a oreja: no tuvo que pagar su apuesta, gracias al truco del cuello de Brok, y lo sabe.',
  '«¡{N}!», canturrea. «Qué alegría. Llegaste tarde a Nidavellir, ¿sabes? Un día tarde. Si no fuera por ese enano tramposo, ahora tendría una copa preciosa.» Se inclina hacia ti. «Tu hilo es muy bonito. Pronto, tijeras.» Y se mete en la tienda riéndose.',
  'Kraka tarda un buen rato en dejar de temblar.']
 :[
  'Junto a la tienda de Thrym, sentado en un barril, hay un hombre delgado de pelo rojo. Lopt. Te ve, sonríe, y la sonrisa se le tuerce en una mueca de dolor: tiene los labios llenos de cicatrices frescas, siete agujeros que no terminan de cerrarse.',
  'No habla. Coge una rama y escribe en la nieve, con letras rúnicas muy cuidadas: «Bonito hilo. Pronto, tijeras». Luego borra lo escrito con el pie, te guiña un ojo y se mete en la tienda.',
  'Kraka tarda un buen rato en dejar de temblar. «Se arrancó los puntos él solo», susurra. «Con los dientes.»']});

GEN.c3_verdad=()=>{const d=S.fl.desenmascarado,n=S.fl.jok||0;return {t:[
  d?'El salón entero tiembla. Las paredes ondulan como agua. Utgarda-Loki se pone en pie, y por un instante su figura parpadea: a veces es un gigante, a veces un hombre pequeño y flaco con una capa de humo. Cuando habla, ya no se burla.'
   :'Al amanecer, Utgarda-Loki en persona te acompaña hasta las puertas de la fortaleza. Ya no se burla. Camina a tu lado en silencio hasta que estáis fuera de las murallas, y entonces habla.',
  '«Te diré la verdad, ahora que no puedes volver a entrar», dice. «Logi, el que comió contra ti, era el fuego salvaje, que lo devora todo. Hugi, el que corrió contra ti, era mi pensamiento: nada es más rápido. El cuerno del que bebiste tenía la punta en el mar: mira mañana la costa y verás cuánto bajó por tu culpa. El gato era Jormungandr, la serpiente que rodea el mundo; cuando levantaste esa pata, todo mi salón se puso a temblar. Y Elli era la vejez, a la que nadie vence.»',
  n>=3?'«Lo hiciste mejor que nadie que haya entrado nunca aquí», añade. «Incluido cierto dios de barba roja al que no voy a nombrar.»'
       :'«Perdiste», añade. «Todos pierden. Pero perdiste mejor de lo que esperaba.»',
  d?'«Y lo viste», dice al fin, casi con miedo. «Viste a través de mis ilusiones. Ni siquiera Thor lo consiguió. Si llego a saberlo, no te habría dejado entrar nunca.»'
   :'«Si llego a saber lo fuerte que eras», dice al fin, «no te habría dejado entrar nunca. Y no te dejaré entrar otra vez.»']};};

/* Plantillas para los cinco juegos */
const sigue={x:'Volver a tu rincón a dormir',to:'c3_utgard',k:'main',fx:{hasta:8,dormir:1}};

registrarCapitulo({capitulo:3,parte:2,titulo:'Los juegos de Utgarda-Loki',escenas:{

/* ---------- Llegada ---------- */
c3_p2:{h:'Utgard',cp:1,gen:'c3_llegada_utgard',t:[],
  c:[{x:'Entrar en el gran salón',to:'c3_salon_ul',k:'main'}]},

c3_salon_ul:{h:'El señor de las ilusiones',t:[
  'El gran salón de Utgard es tan alto que sus vigas se pierden en la penumbra. En los bancos, cientos de gigantes beben y comen. En el trono del fondo hay un gigante delgado, de barba gris recortada y ojos risueños, que se echa a reír en cuanto te ve. Es Utgarda-Loki.',
  '«¡El famoso pequeño mortal!», exclama. «¡El de la marca de la Norna! Skrymir me ha hablado de ti. Dicen que tumbaste a Hrungnir. Aquí eso no impresiona: Hrungnir era muy grande, pero muy tonto.» Los gigantes se ríen.',
  'Junto al trono, un gigante enorme con armadura de acero enano te mira con odio: Thrym. Utgarda-Loki levanta una mano antes de que Thrym pueda hablar. «Es mi invitad{o|a}», dice. «Y en mi casa, los invitados no se tocan.» Luego te sonríe. «Pero sí se ponen a prueba. Cinco juegos, mortal. Uno cada noche. Nadie ha ganado nunca ninguno. Veamos si tú eres el primero.»'],
  fx:{fl:{ul_intro:1},hasta:8},
  c:[{x:'«Acepto»',to:'c3_utgard',k:'main',fx:{gl:10}}]},

/* ---------- Utgard: centro de la Parte 2 ---------- */
c3_utgard:{h:'Utgard',cp:1,mision:1,sort:1,t:[
  'De día, Utgard es un hormiguero de gigantes: herreros, cocineros, guardias, criados que arrastran barriles del tamaño de una casa. Por las noches, el gran salón se llena para ver los juegos del señor de las ilusiones.',
  'Kraka está de mal humor desde que llegasteis. «Aquí todo es demasiado grande», se queja. «Y huele raro. Como a humo que no viene de ningún fuego.»'],
  c:[{x:'Primer juego: el banquete',to:'c3_j1',k:'main',oc:1,req:{no:'j1',hmin:18}},
     {x:'Segundo juego: la carrera',to:'c3_j2',k:'main',oc:1,req:{fl:'j1',no:'j2',hmin:18}},
     {x:'Tercer juego: el cuerno',to:'c3_j3',k:'main',oc:1,req:{fl:'j2',no:'j3',hmin:18}},
     {x:'Cuarto juego: el gato',to:'c3_j4',k:'main',oc:1,req:{fl:'j3',no:'j4',hmin:18}},
     {x:'Quinto juego: la lucha',to:'c3_j5',k:'main',oc:1,req:{fl:'j4',no:'j5',hmin:18}},
     {x:'La última noche en el salón',to:'c3_noche_final',k:'main',oc:1,req:{fl:'j5',no:'verdad',hmin:18}},
     {x:'Esperar a que caiga la noche y empiece el juego',to:'c3_aposento',k:'main',oc:1,req:{no:'verdad',hmax:17}},
     {x:'El campamento de Thrym, fuera de las murallas',to:'c3_campamento',k:'hunt'},
     {x:'El patio de los gigantes',to:'c3_patio',k:'social'},
     {x:'La vieja del Bosque de Hierro',to:'c3_jarnvid',k:'shop'},
     {x:'La forja secreta de los enanos',to:'c3_forja_enana',k:'shop',oc:1,req:{fl:'enanos_libres'}},
     {x:'Tu rincón en la despensa',to:'c3_aposento',k:'side'}]},

c3_aposento:{h:'La despensa',t:[
  'Te han alojado en una despensa, entre un queso del tamaño de una rueda de carro y un saco de nabos. Utgarda-Loki lo llama «una habitación de invitados a tu medida». Los gigantes se ríen mucho cada vez que lo dice.'],
  c:[{x:'Descansar hasta el anochecer',to:'c3_utgard',k:'side',oc:1,req:{hmax:17},fx:{hasta:18,hp:60}},
     {x:'Dormir hasta la mañana (recuperación total)',to:'c3_utgard',k:'side',fx:{hasta:8,dormir:1}}],
  back:'c3_utgard'},

/* ---------- Primer juego: Logi ---------- */
c3_j1:{h:'El banquete',t:[
  'En el centro del salón hay una artesa de madera tan larga como un barco, llena de carne asada. Utgarda-Loki da una palmada. «Primer juego: comer. ¿Quién come más deprisa que nadie?» Se vuelve hacia un gigante flaco, de pelo rojo y ojos brillantes como brasas. «Logi. Mi cocinero. Él contra ti. Cada uno empieza por una punta y gana el que llegue antes al centro.»',
  'Logi sonríe. Tiene la piel caliente: desde donde estás notas cómo irradia calor, como una hoguera.'],
  c:[{x:'Comer como si no hubiera un mañana',to:'c3_j1_ok',k:'main',chk:{s:'fue',dc:11,ok:'c3_j1_ok',ko:'c3_j1_ko'}},
     {x:'Comer sin dejar de vigilar a Logi',to:'c3_j1_obs',k:'n',chk:{s:'ast',dc:9,ok:'c3_j1_obs',ko:'c3_j1_ko'}},
     {x:'Sentir el fuego de Logi con la runa Kenaz',to:'c3_j1_obs',k:'n',oc:1,req:{runa:'kenaz'}}]},

c3_j1_ok:{t:[
  'Comes como no has comido nunca: carne, huesos pequeños, hasta el pan de la base. Llegas al centro de la artesa casi a la vez que Logi. Casi. Él ha llegado un poco antes.',
  'El salón se ríe, pero algunos gigantes golpean la mesa con admiración. «¡Casi!», grita uno. Utgarda-Loki aplaude con cara de sorpresa. «Interesante», dice.'],
  fx:{fl:{j1:1},suma:{jok:1},gl:10},c:[sigue]},

c3_j1_ko:{t:[
  'Comes todo lo deprisa que puedes, pero no sirve de nada. Cuando aún te quedan dos tercios de artesa, Logi ya ha llegado al centro. Y no solo eso: se ha comido la carne, los huesos y hasta la madera de su mitad de artesa.',
  'Los gigantes se ríen a carcajadas. Utgarda-Loki se seca las lágrimas. «Uno a cero», dice. «Y quedan cuatro.»'],
  fx:{fl:{j1:1},gl:-5},c:[sigue]},

c3_j1_obs:{t:[
  'No comes tan deprisa como podrías, porque no le quitas el ojo a Logi. Y ves algo raro: Logi no mastica. La carne desaparece en su boca sin que mueva la mandíbula. Se come los huesos. Se come la madera de la artesa. Y donde ha pasado, la madera está negra, como quemada.',
  'Pierdes, claro. Los gigantes se ríen. Pero tú ya no te ríes con ellos. Kraka te susurra al oído: «Eso no era un cocinero. Eso era una hoguera con cara».'],
  fx:{fl:{j1:1},suma:{sospecha:1},gl:5},c:[sigue]},

/* ---------- Segundo juego: Hugi ---------- */
c3_j2:{h:'La carrera',t:[
  'La segunda noche, el salón entero sale a una pista de nieve aplanada que rodea la fortaleza. «Segundo juego», anuncia Utgarda-Loki. «Una carrera. Contra Hugi.»',
  'Hugi es un gigante joven, delgado, de ojos grises. No tiene nada especial. Se coloca a tu lado, te sonríe con amabilidad, y cuando Utgarda-Loki baja la mano, ya no está a tu lado: está en la meta.'],
  c:[{x:'Correr con todas tus fuerzas',to:'c3_j2_ok',k:'main',chk:{s:'ast',dc:12,ok:'c3_j2_ok',ko:'c3_j2_ko'}},
     {x:'Llamar a Hrimfaxi con la runa Ehwaz',to:'c3_j2_ok',k:'main',oc:1,req:{runa:'ehwaz'},fx:{gl:5}},
     {x:'Fijarte en las huellas de Hugi',to:'c3_j2_obs',k:'n',chk:{s:'esp',dc:9,ok:'c3_j2_obs',ko:'c3_j2_ko'}}]},

c3_j2_ok:{t:[
  'Corres como el viento, o como un caballo de la Noche, que es casi lo mismo. Tres veces dais la vuelta a la pista, y las tres Hugi llega primero, pero la tercera vez por tan poco que los gigantes se ponen de pie en las gradas.',
  'Al cruzar la meta, Hugi te mira con sus ojos grises y te habla, muy bajito, solo para ti. «Nadie había estado tan cerca», dice. «Toma. Te lo has ganado.» Te toca la frente con un dedo, y en tu mente florece una runa como una semilla cerrada: <b>Ingwaz</b>, lo que aún no ha nacido, la fuerza que espera su momento.'],
  fx:{fl:{j2:1},suma:{jok:1},runa:'ingwaz',gl:15},c:[sigue]},

c3_j2_ko:{t:[
  'Corres hasta que te arden los pulmones. No sirve de nada. Hugi te saca media pista de ventaja, luego una pista entera, luego dos. Los gigantes ya ni se ríen: bostezan.',
  'Al terminar, Hugi se acerca, amable, y te toca la frente con un dedo. «No te lo tomes a mal», dice. «Nadie me gana. Pero toma: para que no te vayas con las manos vacías.» En tu mente florece una runa como una semilla cerrada: <b>Ingwaz</b>, lo que aún no ha nacido.'],
  fx:{fl:{j2:1},runa:'ingwaz',gl:-5},c:[sigue]},

c3_j2_obs:{t:[
  'Antes de la tercera vuelta te agachas a mirar la pista. Tus huellas están ahí, profundas en la nieve. Las de Hugi, no. No hay ni una. Corre sin tocar el suelo, como corre un pensamiento.',
  'Hugi te ve agachad{o|a} y sonríe, como quien comparte un secreto. Al terminar la carrera, que pierdes, te toca la frente con un dedo. En tu mente florece una runa como una semilla cerrada: <b>Ingwaz</b>. «Piensas deprisa», dice Hugi. «Casi tanto como yo.»'],
  fx:{fl:{j2:1},suma:{sospecha:1},runa:'ingwaz',gl:8},c:[sigue]},

/* ---------- Tercer juego: el cuerno ---------- */
c3_j3:{h:'El cuerno',t:[
  'La tercera noche, un criado trae un cuerno de beber larguísimo, tan grande que tienen que sujetarlo entre dos gigantes. «Aquí los buenos bebedores lo vacían de un trago», dice Utgarda-Loki. «Los normales, de dos. Ni el más flojo de mis criados necesita tres.»',
  'Te ponen la boca del cuerno delante. Huele a hidromiel… y a algo más, algo que no consigues identificar.'],
  c:[{x:'Beber hasta reventar',to:'c3_j3_ok',k:'main',chk:{s:'fue',dc:12,ok:'c3_j3_ok',ko:'c3_j3_ko'}},
     {x:'Dar un sorbo y saborearlo con atención',to:'c3_j3_obs',k:'n',chk:{s:'ast',dc:9,ok:'c3_j3_obs',ko:'c3_j3_ko'}}]},

c3_j3_ok:{t:[
  'Bebes. Bebes. Bebes durante tanto rato que los gigantes empiezan a contar en voz alta. Cuando por fin te separas, sin aliento, el cuerno sigue casi lleno… pero no del todo. El nivel ha bajado lo suficiente como para que se vea el fondo de los bordes.',
  'Hay un silencio extraño en el salón. Utgarda-Loki ha dejado de sonreír. Y en tu boca queda un regusto salado, como el del agua del fiordo de Vindvik. Mientras te secas los labios, una runa te sube por la garganta como una ola: <b>Laguz</b>, el agua, la marea, lo que fluye y no se puede detener.'],
  fx:{fl:{j3:1},suma:{jok:1},runa:'laguz',gl:15},c:[sigue]},

c3_j3_ko:{t:[
  'Bebes tres tragos larguísimos y, cuando te separas, el cuerno parece igual de lleno que antes. Los gigantes se ríen tan fuerte que tiemblan las antorchas.',
  'Te queda en la boca un sabor salado, muy raro para una hidromiel. Y una runa que te sube por la garganta como una ola: <b>Laguz</b>, el agua que fluye.'],
  fx:{fl:{j3:1},runa:'laguz',gl:-5},c:[sigue]},

c3_j3_obs:{t:[
  'Das un sorbo pequeño y lo paladeas. No es hidromiel. Bueno, lo es por encima, pero debajo sabe a sal, a algas, a viento del norte. Sabe a mar. Pones la oreja en el cuerno y oyes, muy lejos, olas rompiendo.',
  'Bebes después, claro, y no consigues vaciarlo. Pero mientras los gigantes se ríen, tú miras el cuerno sabiendo algo que ellos no saben que sabes. Una runa te sube por la garganta como una ola: <b>Laguz</b>, el agua, la marea.'],
  fx:{fl:{j3:1},suma:{sospecha:1},runa:'laguz',gl:8},c:[sigue]},

/* ---------- Cuarto juego: el gato ---------- */
c3_j4:{h:'El gato',t:[
  'La cuarta noche, Utgarda-Loki suspira con fingida lástima. «Ya veo que no eres tan fuerte como decían. Te pondré algo fácil, un juego de niños: levantar a mi gato del suelo.»',
  'El gato entra en el salón. Es gris, gordo y tan grande como un buey. Se tumba delante de ti y te mira con unos ojos verdes y aburridos. Su cola da vueltas y vueltas alrededor de la sala, y no ves dónde termina.'],
  c:[{x:'Meterte debajo y empujar hacia arriba con todo',to:'c3_j4_ok',k:'main',chk:{s:'fue',dc:13,ok:'c3_j4_ok',ko:'c3_j4_ko'}},
     {x:'Seguir la cola del gato con la mirada',to:'c3_j4_obs',k:'n',chk:{s:'ast',dc:10,ok:'c3_j4_obs',ko:'c3_j4_ko'}},
     {x:'Iluminar al gato con la runa Sowilo',to:'c3_j4_obs',k:'n',oc:1,req:{runa:'sowilo'}}]},

c3_j4_ok:{t:[
  'Te metes bajo la barriga del gato y empujas con los hombros, con la espalda, con las piernas, con todo lo que tienes. El gato arquea el lomo como un puente, cada vez más alto… y por fin, una de sus patas se despega del suelo.',
  'Solo una. Pero en el salón, varios gigantes se ponen de pie de un salto, pálidos. Thrym deja caer su copa. Utgarda-Loki se agarra a los brazos de su trono. «Suficiente», dice, con la voz algo temblorosa. «Suficiente por hoy.»'],
  fx:{fl:{j4:1},suma:{jok:1},gl:20},c:[sigue]},

c3_j4_ko:{t:[
  'Empujas, empujas y empujas. El gato arquea el lomo, se estira, bosteza. No levanta ni una pata. Al final se aburre, se da la vuelta y se duerme encima de tu capa.',
  'Los gigantes se ríen hasta caerse de los bancos. Kraka, desde una viga, intenta mantener la dignidad. Fracasa.'],
  fx:{fl:{j4:1},gl:-5},c:[sigue]},

c3_j4_obs:{t:[
  'Sigues la cola del gato con la mirada. Da una vuelta al salón. Dos. Sale por una ventana. Vuelve a entrar por otra. Y en el punto donde pasa bajo una antorcha, por un instante, el pelo gris parece escamas. Escamas verdes, enormes, brillantes como el mar en invierno.',
  'Intentas levantarlo, y no puedes, claro. Pero cuando te apartas, miras al gato a los ojos y él te devuelve la mirada. Y en esos ojos aburridos ves algo muy antiguo, muy grande y muy cansado, que lleva desde el principio de los tiempos mordiéndose la cola.'],
  fx:{fl:{j4:1},suma:{sospecha:1},gl:10},c:[sigue]},

/* ---------- Quinto juego: Elli ---------- */
c3_j5:{h:'La lucha',t:[
  'La quinta noche, Utgarda-Loki ya no se ríe tanto como al principio. «Último juego», dice. «Una lucha. Pero no contra un gigante: no quiero que te hagan daño.» Hace un gesto. «Contra mi vieja nodriza, Elli. Ha tumbado a hombres mucho más fuertes que tú.»',
  'Entra una anciana diminuta, encorvada, con la piel arrugada como una manzana de invierno y un bastón en la mano. Deja el bastón contra la pared, se arremanga y te sonríe con una boca sin dientes.'],
  c:[{x:'Luchar con todas tus fuerzas',to:'c3_j5_ok',k:'main',chk:{s:'fue',dc:12,ok:'c3_j5_ok',ko:'c3_j5_ko'}},
     {x:'Escuchar lo que te susurra Elli al agarrarte',to:'c3_j5_obs',k:'n',chk:{s:'esp',dc:9,ok:'c3_j5_obs',ko:'c3_j5_ko'}},
     {x:'Resistir con la runa Berkano, la que hace crecer',to:'c3_j5_ok',k:'main',oc:1,req:{runa:'berkano'},chk:{s:'fue',dc:10,ok:'c3_j5_ok',ko:'c3_j5_ko'}}]},

c3_j5_ok:{t:[
  'Elli te agarra con unas manos frías como el invierno. Cuanto más empujas, más pesada se vuelve. Te duelen las rodillas, la espalda, las cicatrices de Sajonia. Sientes cada año que has vivido como una piedra atada a los tobillos. Pero aguantas, aguantas, y al final solo hincas una rodilla en el suelo.',
  'Una. Utgarda-Loki se levanta y detiene la lucha. «Basta», dice, en voz baja. Elli te ayuda a levantarte y, al hacerlo, te toca la mano marcada. Sientes una runa que se graba sola, como una arruga nueva: <b>Mannaz</b>, la humanidad, lo que somos los que vamos a morir. «Eres fuerte, pequeñ{o|a}», dice la anciana. «Pero yo siempre gano. Al final.»'],
  fx:{fl:{j5:1},suma:{jok:1},runa:'mannaz',gl:20},c:[sigue]},

c3_j5_ko:{t:[
  'Elli te agarra, y en un instante estás en el suelo, sin saber cómo. Te sientes de pronto muy cansad{o|a}, muy viej{o|a}, como si te hubieran caído encima todos tus inviernos de golpe.',
  'La anciana te ayuda a levantarte, y al hacerlo te toca la mano marcada. Una runa se te graba sola, como una arruga nueva: <b>Mannaz</b>, la humanidad, lo que somos los que vamos a morir.'],
  fx:{fl:{j5:1},runa:'mannaz',gl:-5},c:[sigue]},

c3_j5_obs:{t:[
  'Al agarrarte, Elli acerca su boca a tu oído y susurra cosas. Cosas que nadie podría saber: la cicatriz de tu hombro y quién te la hizo, la tos de tu padre en su último invierno, la fiebre que casi te mató hace un mes. «Te conozco desde que naciste», dice. «Conozco a todo el mundo. Al final, todos vienen a mí.»',
  'Y entonces lo entiendes. No es una anciana. Es la vejez. Te dejas caer sobre una rodilla sin luchar, porque contra eso no se lucha: se acepta. Elli sonríe y te toca la mano marcada. Una runa se graba sola, como una arruga nueva: <b>Mannaz</b>, lo que somos los que vamos a morir.'],
  fx:{fl:{j5:1},suma:{sospecha:1},runa:'mannaz',gl:10},c:[sigue]},

/* ---------- La última noche ---------- */
c3_noche_final:{h:'La última noche',cp:1,t:[
  'La sexta noche, el salón está lleno hasta los topes. Utgarda-Loki te recibe de pie, con una copa en la mano. «Cinco juegos», dice. «Y ninguno ganado. Como todos los que entran aquí.» Alza la copa. «Brindemos por {el pequeño mortal|la pequeña mortal} que lo intentó con más ganas que nadie. Mañana te irás, y no volverás.»',
  'Los gigantes levantan sus jarras. Thrym, junto al trono, sonríe por primera vez. Kraka se te acerca al oído. «Dilo», susurra. «Si lo has visto, dilo.»'],
  c:[{x:'«No he perdido ningún juego. Ninguno era lo que parecía.» (Desenmascararlo)',to:'c3_desenmascarar',k:'main',oc:1,req:{min:{sospecha:3}}},
     {x:'Alzar tu copa y aceptar la derrota con dignidad',to:'c3_verdad',k:'n',fx:{gl:5}}]},

c3_desenmascarar:{h:'Las ilusiones',t:[
  'Te pones en pie sobre el banco, que es lo único que te permite mirar a los gigantes a la altura del pecho. «Logi no es un cocinero», dices. «Es el fuego. Hugi no corre: piensa. El cuerno tiene la punta en el mar. Tu gato no es un gato: lo vi bajo la antorcha. Y Elli…» Tragas saliva. «Elli es la vejez.»',
  'El silencio es tan completo que oyes crepitar las antorchas. Luego, la primera grieta: una de las paredes del salón ondula como el agua. Los gigantes de los bancos parpadean, se vuelven transparentes, vuelven a ser sólidos. El trono de Utgarda-Loki tiembla.'],
  fx:{fl:{desenmascarado:1},gl:50,saga:'Vio a través de las ilusiones de Utgarda-Loki y las desenmascaró en su propio salón. Ni siquiera Thor lo había conseguido.'},
  c:[{x:'Mantenerle la mirada',to:'c3_verdad',k:'main'}]},

c3_verdad:{h:'La verdad',gen:'c3_verdad',t:[],
  fx:{fl:{verdad:1},saga:'Se enfrentó a los cinco juegos de Utgarda-Loki: el fuego, el pensamiento, el mar, la serpiente del mundo y la vejez.'},
  c:[{x:'Ver lo que pasa con Utgard',to:'c3_desaparece',k:'main'}]},

c3_desaparece:{h:'La llanura vacía',t:[
  'Utgarda-Loki chasquea los dedos. Y Utgard desaparece. No se derrumba: desaparece, como la niebla cuando sale el sol. Las murallas, el salón, las torres, los gigantes de los bancos. Te encuentras de pie en una llanura de nieve, con la copa vacía todavía en la mano y Kraka agarrado a tu hombro.',
  'Solo queda una cosa: el campamento del ejército de Thrym, más allá, que es real. Y se está moviendo. Miles de gigantes recogen sus tiendas y marchan hacia el norte, hacia las montañas donde, según los gigantes, está el fin del mundo.',
  'Kraka suelta el aire. «Todo era mentira», dice. «Todo. Hasta el queso de la despensa.» Se queda pensativo. «Pues estaba bueno.»'],
  c:[{x:'Mirar a tu alrededor',to:'c3_caminante',k:'main'}]},

/* ---------- El campamento de Thrym ---------- */
c3_campamento:{h:'El campamento de Thrym',t:[
  'El campamento de Thrym se extiende por la llanura hasta donde alcanza la vista: tiendas de piel del tamaño de casas, hogueras donde se asan bueyes enteros, gigantes que afilan hachas y practican con lanzas. Y por todas partes, el brillo azulado del acero enano.',
  'En el centro, junto a la tienda roja de Thrym, hay varias forjas al aire libre. Alrededor de ellas, encadenados por los tobillos, trabajan enanos. Muchos enanos.'],
  fx:{fl:{campamento:1}},
  c:[{x:'Acercarte a la tienda de Thrym',to:'c3_lopt',k:'main',oc:1,req:{no:'lopt3'}},
     {x:'Las forjas de los enanos encadenados',to:'c3_armeria',k:'main',oc:1,req:{no:'enanos_libres'}},
     {x:'Escuchar el consejo de guerra de Thrym esta noche',to:'c3_espiar',k:'main',oc:1,req:{no:'plan',hmin:18}},
     {x:'Escuchar el consejo de guerra de Thrym (solo de noche)',to:'c3_campamento',k:'main',oc:1,req:{no:'plan',hmax:17}},
     {x:'Plantarle cara a Thrym',to:'c3_thrym',k:'social',oc:1,req:{fl:'lopt3',no:'thrym_charla'}}],
  back:'c3_utgard'},

c3_lopt:{h:'Lopt',gen:'c3_lopt',t:[],
  fx:{fl:{lopt3:1}},
  back:'c3_campamento'},

c3_thrym:{h:'Thrym',t:[
  'Thrym sale de su tienda cuando te ve. De cerca es todavía más grande que Hrungnir, con una barba negra trenzada con anillos de acero enano y una corona de hierro. «Lopt dice que tienes un hilo interesante», gruñe. «Dice que, si te unes a nosotros, ese hilo podría tejer algo nuevo. Un mundo sin dioses.»',
  '«Los dioses mataron a Ymir y nos ahogaron en su sangre. Nos encadenaron en el norte. Nos llaman monstruos.» Escupe en la nieve. «Cuando suene el cuerno, marcharemos. Puedes estar con nosotros. O debajo.»'],
  fx:{fl:{thrym_charla:1}},
  c:[{x:'«Prefiero estar debajo.»',to:'c3_campamento',k:'main',fx:{gl:10}},
     {x:'«¿Y qué gano yo?»',to:'c3_thrym_gana',k:'n'}]},

c3_thrym_gana:{t:[
  'Thrym sonríe con los dientes negros. «Lo que quieras. Oro. Tierras. Tu propio salón en el mundo nuevo. Vivir para siempre, si Lopt cumple su palabra, y siempre la cumple… a su manera.»',
  'Kraka te pellizca la oreja tan fuerte que te sangra. Thrym se ríe y se vuelve a su tienda. «Piénsalo, mortal. Aún tienes tiempo. Poco.»',
  '<span class=tag>Las valquirias han visto que lo preguntabas.</span>'],
  fx:{fl:{thrym_tentado:1},gl:-5},
  back:'c3_campamento'},

c3_armeria:{h:'Las forjas encadenadas',t:[
  'Te acercas a las forjas con la capucha puesta. Son unos veinte enanos, flacos y sucios, con grilletes en los tobillos unidos a una cadena larga clavada en el suelo. Trabajan sin parar bajo la mirada de tres gigantes armados con látigos.',
  'Uno de los enanos levanta la vista al pasar a su lado. Es viejo, de barba gris quemada, y tiene una marca de Nidavellir en la mano. «Hijo de la superficie», susurra sin dejar de martillear. «Si nos sacas de aquí, te juro por mi barba que esas armas se romperán el día que más las necesiten.»'],
  c:[{x:'Liberarlos amparad{o|a} en la oscuridad, sin que nadie se entere',to:'c3_enanos_libres',k:'main',oc:1,req:{hmin:18},chk:{s:'ast',dc:11,ok:'c3_enanos_libres',ko:'c3_f_guardia'}},
     {x:'Esperar a la noche para liberarlos (ahora es de día)',to:'c3_armeria',k:'main',oc:1,req:{hmax:17}},
     {x:'Atacar a los guardias ahora mismo',to:'c3_f_guardia',k:'hunt'}],
  back:'c3_campamento'},

c3_f_guardia:pelea('guardia_thrym','c3_enanos_libres','c3_campamento','Un guardia gigante se da cuenta y te corta el paso con una lanza de acero enano. «¡Ladrón!», ruge.'),

c3_enanos_libres:{h:'Los cautivos',t:[
  'Rompes la cadena con un golpe seco. Los enanos se quitan los grilletes unos a otros con sus propias herramientas y desaparecen en la noche como sombras, cada uno con un saco al hombro.',
  'Antes de irse, el viejo de la barba quemada te coge del brazo. «Nos esconderemos en las bodegas de Utgard: nadie baja allí, ni siquiera los gigantes», dice. «Ven a vernos. Te forjaremos lo que necesites.» Sonríe. «Y esas armas… Cada hacha que hemos hecho tiene una grieta escondida en el filo. Cada lanza, un punto débil en el asta. El día de la batalla se partirán como ramas secas.»'],
  fx:{fl:{enanos_libres:1,sabotaje:1},gl:30,saga:'Liberó a veinte herreros enanos del campamento de Thrym, que sabotearon las armas del ejército de los gigantes.'},
  c:[{x:'Volver a Utgard',to:'c3_utgard',k:'main'}]},

c3_espiar:{h:'El consejo de guerra',t:[
  'Esa noche te arrastras hasta la tienda roja de Thrym y te pegas a la lona. Dentro, a la luz de una hoguera, hay varios gigantes reunidos. Y una voz que no es de gigante: aguda, alegre, demasiado simpática.',
  'Es Lopt. Y lo que dice te hiela la sangre.'],
  c:[{x:'Escuchar sin hacer ruido',to:'c3_espiar_ok',k:'main',chk:{s:'ast',dc:11,ok:'c3_espiar_ok',ko:'c3_espiar_ko'}},
     {x:'Escuchar envuelto en el silencio de Isa, inmóvil como el hielo',to:'c3_espiar_ok',k:'main',oc:1,req:{runa:'isa'}}]},

c3_espiar_ok:{t:[
  '«Cuando suene el cuerno de Heimdal», dice Lopt, «marcharemos todos a la llanura de Vigrid. Thrym con los gigantes de la montaña. Surt con los de fuego, desde el sur. Y yo llegaré por mar, en Naglfar, el barco hecho con las uñas de los muertos, con todo el ejército de Hel a bordo.»',
  '«Pero antes», añade, y oyes cómo sonríe, «hay que soltar al lobo. Mi hijo lleva demasiado tiempo encadenado. Y su cadena, como todas las cadenas de los dioses, tiene un punto débil.» Se oyen risas. «El pozo de Mímir. Allí está lo que necesito.»',
  'Te alejas de la tienda sin hacer ruido. Kraka tiembla en tu hombro. «Fenrir», susurra. «Quiere soltar a Fenrir.»'],
  fx:{fl:{plan:1},gl:20,saga:'Espió el consejo de guerra de Thrym y descubrió el plan de Lopt: liberar a Fenrir y marchar sobre Vigrid.'},
  back:'c3_campamento'},

c3_espiar_ko:{t:[
  'Pisas una rama helada. El crujido suena como un trueno en la noche. La conversación se corta de golpe. «¿Quién anda ahí?», ruge Thrym.',
  'Echas a correr. Detrás de ti sale un guardia, y luego otro.'],
  c:[{x:'Darte la vuelta y pelear',to:'c3_f_espia',k:'hunt'}]},

c3_f_espia:pelea('guardia_thrym','c3_espiar_huida','c3_utgard','El guardia te alcanza junto a una hoguera. Detrás, más gigantes se despiertan.'),

c3_espiar_huida:{t:[
  'Tumbas al guardia y huyes entre las tiendas antes de que lleguen los demás. No has oído todo, pero sí lo suficiente: un cuerno, una llanura llamada Vigrid, un barco hecho de uñas de muertos… y algo sobre un lobo y un pozo.',
  'Kraka está muy callado. «Fenrir», dice al fin. «Están hablando de Fenrir.»'],
  fx:{fl:{plan:1},gl:5},
  back:'c3_campamento'},

/* ---------- Patio, mercader y forja secreta ---------- */
c3_patio:{h:'El patio de los gigantes',t:[
  'En el patio principal de Utgard, los gigantes que no tienen nada que hacer, que son muchos, se sientan en bloques de piedra a beber, jugar a los dados con dados del tamaño de un baúl y criticar a todo el que pasa.'],
  c:[{x:'Saludar a Skrymir',to:'c3_skrymir_charla',k:'social',oc:1,req:{no:'skrymir_charla'}},
     {x:'Jugar a los dados con los gigantes',to:'c3_dados',k:'social',oc:1,req:{plata:20}}],
  back:'c3_utgard'},

c3_skrymir_charla:{t:[
  'Skrymir está sentado en un rincón del patio, tan grande que hace sombra a medio patio. Al verte se ríe. «¡Mi inquilin{o|a}! ¿Dormiste bien en mi guante?»',
  'Luego se frota la cabeza con aire pensativo. «Hace años, un tipo pelirrojo de barba roja también durmió en mi guante. Y por la noche, tres veces, me cayó algo en la cabeza mientras dormía. Me desperté y le pregunté si había caído una hoja, una bellota, un pájaro…» Se encoge de hombros. «Desde entonces me duele un poco aquí. Qué cosas.»',
  'Kraka se tapa el pico con un ala para no reírse. «Thor», susurra. «Fue Thor. Le dio tres martillazos en la cabeza y él creyó que eran hojas.»'],
  fx:{fl:{skrymir_charla:1}},
  back:'c3_patio'},

c3_dados:{h:'Los dados de los gigantes',t:[
  'Para tirar los dados de los gigantes tienes que empujarlos con las dos manos por el suelo. Los gigantes apuestan entre ellos sobre si conseguirás que den la vuelta.'],
  c:[{x:'Apostar 20 de plata',to:'c3_patio',k:'social',chk:{s:'sue',dc:8,ok:'c3_patio',ko:'c3_patio',fxok:{plata:40},fxko:{}},fx:{plata:-20,t:1}}],
  back:'c3_patio'},

c3_jarnvid:{h:'La vieja del Bosque de Hierro',t:[
  'En un rincón del mercado de Utgard, una giganta vieja vende cosas sobre una manta de piel de lobo negro: colmillos, garras, pociones de colores oscuros, carne seca de animales que no reconoces. Tiene los ojos amarillos, como los de un lobo.'],
  shop:'jarnvid',
  c:[{x:'Preguntarle quién es',to:'c3_angrboda',k:'social',oc:1,req:{no:'angrboda'}}],
  back:'c3_utgard'},

c3_angrboda:{h:'Angrboda',t:[
  'La vieja te mira largo rato. «Vengo del Bosque de Hierro, al este», dice al fin. «Me llaman Angrboda. Tuve tres hijos con un hombre pelirrojo muy simpático: un lobo, una serpiente y una niña medio muerta. Los dioses se los llevaron a los tres. Al lobo lo encadenaron. A la serpiente la tiraron al mar. A la niña la mandaron a gobernar a los muertos.»',
  '«Mi lobo se llama Fenrir», añade, y le brillan los ojos amarillos. «Dicen que cuando se suelte se tragará a Odín. A lo mejor. O a lo mejor solo quiere correr.» Te pone en la mano un colmillo negro. «Toma. Cuando lo veas, enséñaselo. Sabrá quién te lo ha dado.»'],
  fx:{fl:{angrboda:1},item:'colmillo_hierro'},
  back:'c3_jarnvid'},

c3_forja_enana:{h:'La forja de las bodegas',t:[
  'En las bodegas de Utgard, entre barriles olvidados, los enanos que liberaste han montado una forja con lo que han podido robar. El viejo de la barba quemada te saluda con el martillo en alto. «¡Nuestro libertador! Te tenemos un regalo.»'],
  c:[{x:'Recoger el regalo de los enanos',to:'c3_forja_enana',k:'shop',oc:1,req:{no:'regalo_enanos'},fx:{fl:{regalo_enanos:1},item:'escudo_enano'}},
     {x:'Forjar o mejorar equipo',to:'c3_forjar_enana',k:'shop'},
     {x:'Grabar una runa en tu arma',to:'c3_grabado_enana',k:'shop'}],
  back:'c3_utgard'},
c3_forjar_enana:{h:'La forja de las bodegas',t:['Los enanos trabajan con prisa y sin hacer ruido, por si acaso.'],forja:1,back:'c3_forja_enana'},
c3_grabado_enana:{h:'El grabado',t:['El viejo enano graba las runas con la misma mano firme con la que, durante semanas, escondió grietas en las armas de Thrym.'],grabado:1,back:'c3_forja_enana'},

/* ---------- Final de la Parte 2: el Caminante ---------- */
c3_caminante:{h:'El Caminante',cp:1,t:[
  'En medio de la llanura vacía, donde un momento antes estaba la puerta de Utgard, hay un hombre sentado en una piedra. Es viejo y alto, con un sombrero de ala ancha calado hasta las cejas y un manto azul gastado por mil caminos. Tiene un solo ojo. Donde estaba el otro, solo hay una sombra.',
  'Sobre sus hombros hay dos cuervos. Uno de ellos es Hugin. Kraka se pone rígido.',
  '«Siéntate, {N} de Vindvik», dice el Caminante. Su voz es tranquila y antigua, como el viento en un bosque de robles. «Has visto a través de las ilusiones de los gigantes. Has bebido del mar y has luchado contra la vejez. Ya casi estás preparad{o|a}.» Se levanta, apoyándose en una lanza. «Ven conmigo. Te espera el pozo de Mímir. Y el árbol del que me colgué hace mucho tiempo.»'],
  fx:{fl:{c3p2fin:1},gl:15,saga:'Al desaparecer Utgard, un caminante tuerto con un sombrero de ala ancha le esperaba en la llanura.'},
  c:[{x:'Seguir al Caminante',to:'c3_p3',k:'main'}]},

/* Escena de enlace provisional: la sustituirá la Parte 3 */
c3_p3:{h:'Continuará',t:[
  'El Caminante echa a andar hacia el norte sin mirar atrás. Sus pasos no dejan huellas en la nieve.',
  '<span class=tag>Aquí termina la Parte 2 del Capítulo 3. La historia continúa en la Parte 3: «El árbol del ahorcado».</span>'],
  c:[{x:'Volver a la llanura',to:'c3_desaparece'}]}

}});
})();
