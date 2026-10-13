/* =====================================================================
   Capítulo 3 · El Invierno sin Fin
   Parte 1 · «La tierra de los gigantes»
   Jotunheim en lo peor del Fimbul. La niña gigante Ymma, la aldea de
   Bergelmir, la sanadora Hyndla (Berkano), el caballo de la Noche
   Hrimfaxi (Ehwaz), la gran cacería de Skadi y el ultimátum de Thrym:
   la asamblea con Hrungnir. Termina con la invitación de Skrymir.
   Convierte c2_fin en enlace hacia c3_inicio.
   Escena de enlace provisional: c3_p2 (la sustituirá la Parte 2)
   ===================================================================== */
(()=>{
const pelea=(e,win,flee,t)=>({t:[t],f:{e,win,lose:'muerte',flee}});

/* ---------- Datos nuevos ---------- */
Object.assign(OBJ,{
  cuerno_thor:{n:'Cuerno de Thor',tipo:'clave',d:'Un cuerno de cabra con runas de tormenta. «Sóplalo una vez, solo una, y vendré.»'},
  piel_oso_blanco:{n:'Piel del Oso de Escarcha',tipo:'material',pr:120,d:'Blanca como la nieve y caliente como un hogar.'},
  savia_abedul:{n:'Savia de abedul blanco',tipo:'material',pr:20,d:'Clara y dulce. Las sanadoras gigantes curan con ella la fiebre del hielo.'},
  liquen_rojo:{n:'Liquen rojo',tipo:'material',pr:8,d:'Crece en las rocas del Bosque Negro. Amargo y medicinal.'},
  carne_gigante:{n:'Pierna de cabra gigante asada',tipo:'consumible',ef:{hp:70},pr:30,d:'Una ración de gigante. Recupera 70 de Vida.'},
  pocion_abedul:{n:'Tónico de abedul',tipo:'consumible',ef:{hp:90},pr:45,d:'Recupera 90 de Vida.'},
  manto_escarcha:{n:'Manto de escarcha',tipo:'armadura',def:18,arm:8,vel:2,pr:1200,d:'Piel del Oso de Escarcha sobre anillas enanas. Ni el Fimbul lo atraviesa.'}
});
Object.assign(ENEMIGOS,{
  lobo_escarcha:{n:'Lobo de escarcha',cat:'Bestia de Jotunheim',hp:110,a:20,gl:24,o:0,l:{piel_lobo:.7,liquen_rojo:.3}},
  troll_abedul:{n:'Troll de los abedules',cat:'Troll',hp:175,a:22,gl:45,o:40,l:{savia_abedul:2}},
  oso_escarcha:{n:'El Oso de Escarcha',cat:'Bestia legendaria',hp:235,a:24,gl:80,o:0,l:{piel_oso_blanco:1}},
  serpiente_hielo:{n:'Serpiente de hielo',cat:'Bestia del río',hp:150,a:21,gl:35,o:0,l:{liquen_rojo:2}},
  hrungnir:{n:'Hrungnir, Corazón de Piedra',cat:'Gigante · campeón de Thrym',hp:320,a:27,gl:150,o:120},
  hrungnir_cansado:{n:'Hrungnir, Corazón de Piedra',cat:'Gigante · agotado por la persecución',hp:240,a:25,gl:150,o:120}
});
FORJA.push({r:'manto_escarcha',mat:{piel_oso_blanco:1,piel_lobo:2,hierro_pantano:2},plata:200});
CALDERO.push({c:'Remedios de Jotunheim',r:'pocion_abedul',ing:{savia_abedul:1,liquen_rojo:2}});
TIENDAS.gunnlod={n:'El trueque de Gunnlod · «Una pierna de cabra por una buena historia, o por plata.»',
  stock:['carne_gigante','hidromiel','pocion_serbal','liquen_rojo','savia_abedul','piel_lobo','hierro_pantano']};

registrarSenales({
  15:'El sol no ha salido hoy. Ni un resplandor. Los gigantes dicen que el lobo Skoll lo tiene entre los dientes.',
  17:'Esta noche, sobre las montañas, se ve una luz verde que se retuerce como una serpiente. Los gigantes viejos no quieren ni mirarla.'
},S=>S.fl.c3&&!S.fl.c4);

registrarMision(S=>{
  if(!S.fl.c3)return null;
  if(!S.fl.c3_aldea)return 'Sobrevive a la ventisca y busca refugio.';
  if(!S.fl.asamblea_fin){
    const p=[];
    if(!S.fl.skadi_fin)p.push('busca a Skadi en Thrymheim');
    if(!S.fl.berkano)p.push('ayuda a Hyndla a curar a Ymma');
    if(!S.fl.ehwaz)p.push('el caballo de la Noche ronda el río helado');
    return `Thrym exige que la aldea de Bergelmir se una a su ejército antes del final del día ${S.fl.plazo3}.`+(p.length?' Mientras tanto: '+p.join('; ')+'.':' Acude a la asamblea de los gigantes.');
  }
  if(!S.fl.c3p1fin)return 'Escucha al gigante de la montaña.';
  return null;
});

/* ---------- Enlace desde el Capítulo 2 ---------- */
Object.assign(SC.c2_fin,{end:null,saga:null,
  fx:{fl:{c2fin:1},fin:'Capítulo 2 completado',saga:'Partió hacia Jotunheim en el carro de Thor.'},
  c:[{x:'Continuar con el Capítulo 3: El Invierno sin Fin',to:'c3_inicio',k:'main'}]});
SC.c2_fin.t=SC.c2_fin.t.map(p=>p.replace('<span class=tag>Has completado el Capítulo 2: Bajo las Raíces. La senda continúa en el Capítulo 3: El Invierno sin Fin.</span>','<span class=tag>Has completado el Capítulo 2: Bajo las Raíces.</span>'));

/* ---------- Textos variables ---------- */
const tarde3=()=>S.dia>S.fl.plazo3;
GEN.c3_bergelmir=()=>{if(!S.fl.plazo3)S.fl.plazo3=S.dia+5;return {t:[
  'Bergelmir es el jefe de la aldea, un gigante viejo de barba blanca y helada que le llega a las rodillas. Cuando Ymma le cuenta lo que ha pasado, el gigante se arrodilla, y aun así su cabeza queda muy por encima de la tuya.',
  '«Has traído de vuelta a mi nieta», dice con una voz como un alud lejano. «En Jotunheim, eso es una deuda de sangre. Esta casa es tu casa, {pequeño|pequeña} {N}.» Kraka resopla al oír lo de «pequeñ{o|a}».',
  'Luego su cara se ensombrece. «Pero has llegado en mal momento. Thrym, el señor de los gigantes de la montaña, está reuniendo un ejército para marchar contra Asgard. Alguien le ha dado armas: armas enanas, de las buenas. Y nos ha dado cinco días para unirnos a él.» Mira hacia las montañas. «Si no lo hacemos, quemará la aldea.»']};};

GEN.c3_asamblea=()=>({t:[
  tarde3()
    ?'Los emisarios de Thrym no han esperado. Llegaron ayer al anochecer, quemaron el granero de Bergelmir para dejar claro el mensaje y ahora esperan en la plaza, alrededor de una hoguera hecha con su tejado.'
    :'Al quinto día, los emisarios de Thrym llegan a la aldea con el primer resplandor gris de la mañana. Son veinte gigantes de la montaña, con armaduras nuevas que brillan demasiado: acero enano, forjado por manos que no lo forjaron por gusto.',
  'Al frente viene Hrungnir. Es el gigante más grande que has visto nunca, y su cabeza es de piedra: piedra de verdad, gris y agrietada, con dos ojos como brasas en las grietas. Dicen que su corazón también es de piedra, con tres puntas, y que nunca ha perdido una pelea.',
  '«Bergelmir», retumba Hrungnir. «Se acabó el tiempo. ¿Marcháis con Thrym o ardéis?» Luego te ve, y sus ojos de brasa se entornan. «Vaya. Un mortal. Con la marca de una Norna. Lopt nos habló de ti.»']});

GEN.c3_thor_llega=()=>({t:S.fl.thor_convencido?[
  'Thor mira a Bergelmir. Mira a Ymma, que se esconde detrás de las piernas de su abuelo. Te mira a ti. Gruñe algo que no entiendes y, por fin, baja el martillo. «Muy bien», dice. «Solo al de la cabeza de piedra.»',
  'Lo que pasa después dura muy poco. Hrungnir lanza contra Thor una piedra de afilar del tamaño de un barco; Mjolnir la parte en el aire en mil pedazos y sigue volando hasta la cabeza de piedra del gigante. Hrungnir cae como una montaña que se derrumba. Los emisarios huyen.',
  'Thor recoge el martillo, se limpia el polvo de la barba y le hace a Bergelmir una inclinación de cabeza, rígida pero sincera. «Gigantes que no quieren pelear», murmura al subir al carro. «Lo que hay que ver.»']
 :[
  'No consigues hacerte oír. Thor solo ve gigantes, armas y un enemigo de Asgard, y Mjolnir no distingue entre emisarios y aldeanos.',
  'Hrungnir cae, sí. Pero también caen las casas de piedra y turba, el granero, la herrería, la cabaña de Hyndla. Cuando el trueno se apaga, la aldea de Bergelmir es un campo de escombros humeantes. Los gigantes miran a Thor desde las ruinas, en silencio.',
  'Thor sube al carro sin mirar atrás. Ymma te mira a ti. No dice nada. No hace falta.']});

GEN.c3_cuerno_fin=()=>({t:S.fl.thor_convencido?[
  'Al final, Bergelmir habla. «Has llamado a un dios para salvarnos», dice. «Y el dios te ha escuchado. No sabía que eso fuera posible.» Te pone una mano enorme en el hombro. «Gracias, pequeñ{o|a}.»',
  'Ymma, detrás de él, sonríe. La aldea sigue en pie.']
 :[
  'Al final, Bergelmir habla. «Sé que no querías esto», dice, con la voz rota. «Lo sé. Pero los dioses son así. Por eso los temíamos.» Se da la vuelta y se va hacia las ruinas de su casa.',
  'Esa noche los gigantes entierran a los suyos. Nadie te echa. Nadie te habla. Kraka se queda pegado a tu cuello toda la noche, en silencio.']});

registrarCapitulo({capitulo:3,parte:1,titulo:'La tierra de los gigantes',escenas:{

/* ---------- Llegada a Jotunheim ---------- */
c3_inicio:{h:'Capítulo 3 · El Invierno sin Fin',cp:1,t:[
  'El carro de Thor aterriza en una ladera nevada con un estruendo que levanta una nube blanca. Te bajas tambaleándote. Kraka se baja todavía peor.',
  '«Aquí te dejo», dice Thor. «Tengo que ir al este a romper unas cuantas cabezas. Busca a Skadi, la cazadora de las montañas: si alguien sabe dónde reúne Thrym a su ejército, es ella.» Rebusca en el carro y te lanza un cuerno de cabra con runas de tormenta. «Si me necesitas, sóplalo. Una vez. Solo una. Y vendré.»',
  'Antes de que puedas darle las gracias, el carro ya es un punto en el cielo. Y entonces el viento cambia, y en el horizonte aparece una pared blanca que avanza hacia ti. Una ventisca.'],
  fx:{fl:{c3:1},item:'cuerno_thor',hp:999},
  c:[{x:'Cavar un refugio en la nieve',to:'c3_cueva_nieve',k:'main',chk:{s:'ast',dc:9,ok:'c3_cueva_nieve',ko:'c3_ventisca',fxko:{hp:-30}}},
     {x:'Encender un fuego con la runa Kenaz y aguantar',to:'c3_cueva_nieve',k:'main',oc:1,req:{runa:'kenaz'},fx:{hp:-10}},
     {x:'Seguir caminando contra el viento',to:'c3_ventisca',k:'n',fx:{hp:-40}}]},

c3_ventisca:{h:'La ventisca',t:[
  'El viento te arranca el aire de los pulmones. La nieve te ciega. Durante horas solo existen el frío, el blanco y el graznido de Kraka, que se ha metido dentro de tu manto y se niega a salir.',
  'Cuando ya no sientes los pies, tropiezas con algo blando. No es una roca. Es un guante. Un guante de lana del tamaño de una barca, tirado en la nieve, con un hueco dentro donde no llega el viento.',
  'Te metes dentro sin pensarlo. Y ahí dentro, acurrucada en el pulgar, hay alguien más.'],
  c:[{x:'Ver quién es',to:'c3_ymma',k:'main'}]},

c3_cueva_nieve:{h:'El refugio',t:[
  'Excavas un agujero en un ventisquero y te metes dentro con Kraka justo cuando la ventisca te alcanza. Fuera, el mundo aúlla durante horas. Dentro, con un poco de fuego y mucho apretarse, se sobrevive.',
  'Cuando la tormenta amaina, sales a gatas. A pocos pasos, medio enterrado en la nieve, hay un guante de lana del tamaño de una barca. Y dentro del guante, alguien llora.'],
  c:[{x:'Ver quién es',to:'c3_ymma',k:'main'}]},

c3_ymma:{h:'Ymma',t:[
  'Es una niña. Una niña gigante, de unos siete u ocho años, que mide casi el triple que tú. Tiene el pelo blanco como la escarcha, la nariz roja y los ojos hinchados de llorar. El guante es suyo.',
  'Al verte, chilla. Luego te mira mejor y deja de chillar. «¿Eres un enano?», pregunta. «Los enanos son más bajitos. ¿Eres un elfo? Los elfos son más guapos.» Kraka se ríe tanto que tiene que salir del manto.',
  '«Me llamo Ymma», dice al fin, sorbiendo los mocos. «Salí a buscar a mi cabra, Copito, y me perdí. Mi abuelo es Bergelmir, el jefe de la aldea del lago. ¿Me llevas a casa?»'],
  c:[{x:'«Claro que sí»',to:'c3_lobos',k:'main',fx:{fl:{ymma:1}}}]},

c3_lobos:{h:'Ojos en la nieve',t:[
  'Ymma conoce el camino, pero camina despacio, y el frío ha despertado a los que cazan de noche. Al cruzar un bosque de abetos negros, ves los primeros ojos: dos puntos azules entre los árboles. Luego cuatro. Luego diez.',
  'Lobos de escarcha: más grandes que los de Midgard, con el pelo blanco y escarcha en los bigotes. Ymma se agarra a tu manto con una mano del tamaño de tu cabeza. «Tengo miedo», susurra.'],
  c:[{x:'Ponerte delante de Ymma y alzar el arma',to:'c3_f_lobos',k:'hunt'}]},

c3_f_lobos:pelea('lobo_escarcha','c3_llegada',null,'El lobo más grande sale de entre los abetos y se lanza hacia Ymma. Tú te cruzas en su camino.'),

c3_llegada:{h:'La aldea del lago',t:[
  'Los demás lobos huyen al ver caer a su jefe. Ymma te abraza tan fuerte que te levanta del suelo y casi te ahoga.',
  'Al amanecer, si es que esto es un amanecer, llegáis a la aldea: veinte casas enormes de piedra y turba alrededor de un lago helado, con columnas de humo que suben hasta el cielo gris. Los gigantes salen de sus casas al oír los gritos de Ymma. Te miran desde arriba con desconfianza: hachas del tamaño de puertas, lanzas como mástiles.',
  'Entonces aparece un gigante viejo, el más alto de todos, y Ymma echa a correr hacia él gritando «¡abuelo!».'],
  fx:{fl:{c3_aldea:1},saga:'Salvó a Ymma, una niña gigante perdida en la ventisca, y la llevó a casa.'},
  c:[{x:'Esperar a que el abuelo hable',to:'c3_bergelmir',k:'main'}]},

c3_bergelmir:{h:'Bergelmir',gen:'c3_bergelmir',t:[],
  c:[{x:'«¿Y qué vais a hacer?»',to:'c3_aldea',k:'main',fx:{gl:10}}]},

/* ---------- La aldea de Bergelmir: centro de la Parte 1 ---------- */
c3_aldea:{h:'La aldea de Bergelmir',cp:1,mision:1,sort:1,t:[
  'La aldea de los gigantes de escarcha es tranquila, a su manera enorme. Los niños gigantes patinan en el lago helado; las mujeres ahúman pescados del tamaño de una vaca; los viejos fuman pipas que echan nubes. Nadie parece querer marchar contra Asgard. Todos parecen tener miedo de Thrym.',
  'Kraka se ha acostumbrado a dormir en el ala del sombrero de un gigante muy viejo, que no se ha dado cuenta todavía.'],
  c:[{x:'Esperar a los emisarios de Thrym (avanza hasta el día del plazo)',to:'c3_asamblea',k:'main',oc:1,req:{no:'asamblea_fin'},fx:{hastaDia:'plazo3'}},
     {x:'Subir a Thrymheim a buscar a Skadi · 4 h',to:'c3_thrymheim',k:'main',oc:1,req:{no:'skadi_fin'},fx:{t:4}},
     {x:'La cabaña de la sanadora Hyndla',to:'c3_hyndla',k:'main'},
     {x:'La casa de Bergelmir',to:'c3_casa',k:'side'},
     {x:'El trueque de Gunnlod',to:'c3_trueque',k:'shop'},
     {x:'La forja de hielo de Hrimnir',to:'c3_forja',k:'shop'},
     {x:'El tronco de los encargos',to:'c3_encargos',k:'side'},
     {x:'El Bosque Negro · 1 h',to:'c3_bosque',k:'hunt',fx:{t:1}},
     {x:'El río helado · 2 h',to:'c3_rio',k:'hunt',oc:1,req:{no:'ehwaz'},fx:{t:2}}]},

c3_casa:{h:'La casa de Bergelmir',t:[
  'La casa de Bergelmir es tan grande que dentro cabría el salón de Hakon entero. Te han hecho una cama en un cajón de madera junto al fuego, con pieles dobladas varias veces, y Ymma te ha dejado su muñeca para que no estés solo. La muñeca es más grande que tú.'],
  c:[{x:'Hablar con Bergelmir junto al fuego',to:'c3_bergelmir_charla',k:'social',oc:1,req:{no:'bergelmir_charla'}},
     {x:'Dormir (recuperación total)',to:'c3_aldea',k:'side',fx:{t:8,dormir:1}}],
  back:'c3_aldea'},

c3_bergelmir_charla:{t:[
  '«Vosotros, los de Midgard, creéis que todos los gigantes somos iguales», dice Bergelmir, removiendo las brasas con un tronco. «Que todos odiamos a los dioses y queremos el fin del mundo.» Sacude la cabeza. «Algunos sí. Thrym, Hrungnir, los de la montaña. Pero nosotros solo queremos pescar en el lago y que nos dejen en paz.»',
  '«Mi antepasado, el primer Bergelmir, sobrevivió en una barca cuando los dioses mataron al gigante Ymir y su sangre inundó el mundo. Todos los gigantes de escarcha venimos de él.» Se queda mirando el fuego. «Los dioses nos ahogaron una vez. No queremos pelear con ellos. Pero tampoco queremos que vuelvan a ahogarnos.»'],
  fx:{fl:{bergelmir_charla:1},saga:'Escuchó la historia de los gigantes de escarcha de boca del viejo Bergelmir.'},
  back:'c3_casa'},

/* ---------- Hyndla y Berkano ---------- */
c3_hyndla:{h:'La cabaña de Hyndla',t:[
  'Hyndla es la sanadora de la aldea, una giganta vieja con el pelo recogido en mil trenzas y las manos manchadas de hierbas. Su cabaña huele a abedul, a humo y a ungüentos. Tiene un caldero donde podrías bañarte.',
  'Te mira con unos ojos muy claros, casi blancos. «Una mortal con la marca de Skuld», dice. «Lo vi en sueños. Siéntate, {pequeño|pequeña}. Te enseñaré lo que pueda.»'],
  c:[{x:'Preguntar por Ymma',to:'c3_ymma_enferma',k:'main',oc:1,req:{no:'ymma_enferma'}},
     {x:'Ir al bosque de los abedules blancos · 2 h',to:'c3_abedules',k:'hunt',oc:1,req:{fl:'ymma_enferma',no:'berkano'},fx:{t:2}},
     {x:'Usar el caldero de Hyndla',to:'c3_caldero',k:'shop'},
     {x:'Pedirle que fortalezca tus runas',to:'c3_taller',k:'shop'}],
  back:'c3_aldea'},

c3_ymma_enferma:{h:'La fiebre del hielo',t:[
  'Hyndla aparta una cortina. Detrás, tumbada en una cama enorme, está Ymma, temblando. Tiene la cara blanca y los labios azules.',
  '«La fiebre del hielo», dice Hyndla. «La cogió en la ventisca. Es mala en los niños.» Te mira. «Necesito savia de los abedules blancos, que crecen en el bosque del norte. Pero allí vive un troll que se come a todo el que toca sus árboles. Nosotros somos demasiado grandes para escondernos de él. Tú no.»'],
  fx:{fl:{ymma_enferma:1}},
  c:[{x:'«Iré yo»',to:'c3_hyndla',k:'main'}]},

c3_abedules:{h:'El bosque de los abedules blancos',t:[
  'Los abedules blancos crecen en un valle pequeño y escondido, con troncos tan pálidos que parecen de hueso y hojas que, increíblemente, siguen verdes en mitad del Gran Invierno. El aire aquí es casi tibio.',
  'En el centro del valle, sentado sobre una roca, un troll enorme y verdoso mastica algo que prefieres no saber qué es. Tiene musgo en la espalda y setas en las orejas.'],
  c:[{x:'Atacar al troll',to:'c3_f_troll',k:'hunt'},
     {x:'Sangrar un abedul sin que te vea',to:'c3_abedules_sigilo',k:'main',chk:{s:'ast',dc:10,ok:'c3_abedules_sigilo',ko:'c3_f_troll'}},
     {x:'Volver a la aldea · 2 h',to:'c3_aldea',fx:{t:2}}]},

c3_f_troll:pelea('troll_abedul','c3_berkano',null,'El troll se levanta, olfatea el aire y te mira con unos ojillos rojos. «Carne pequeña», gruñe. «Carne pequeña que toca mis árboles.»'),

c3_abedules_sigilo:{t:[
  'Te arrastras entre los troncos, haces un corte pequeño en la corteza del abedul más cercano y recoges la savia en un cuerno. El troll no se entera: está demasiado ocupado masticando.',
  'Antes de irte, pones la mano marcada sobre el abedul. Está tibio, como un ser vivo.'],
  fx:{item:{savia_abedul:2},gl:5},
  c:[{x:'Volver con la savia',to:'c3_berkano',k:'main'}]},

c3_berkano:{h:'Berkano',t:[
  'Vuelves a la cabaña de Hyndla con la savia. La sanadora la mezcla con hierbas, la calienta y se la da a Ymma a cucharadas. Durante horas no pasa nada. Luego, de madrugada, Ymma deja de temblar, abre los ojos y pide pescado.',
  'Hyndla sonríe por primera vez. Te coge la mano marcada y traza en ella una runa como una mujer embarazada, o como dos colinas: <b>Berkano</b>, el abedul, la madre, la runa de lo que sana y vuelve a crecer. «Para que cures lo que otros rompen», dice.',
  'Ymma, desde la cama, te tira de la manga. «Cuando sea mayor», dice muy seria, «me casaré contigo.» Kraka no ha parado de reírse todavía.'],
  fx:{fl:{berkano:1},runa:'berkano',gl:20,t:6,saga:'Consiguió la savia de los abedules blancos para curar a Ymma de la fiebre del hielo, y Hyndla le enseñó la runa Berkano.'},
  c:[{x:'Volver a la aldea',to:'c3_aldea',k:'main'}]},

c3_caldero:{h:'El caldero de Hyndla',t:['El caldero de Hyndla es tan grande que tienes que subirte a un taburete para remover. Huele a abedul y a liquen.'],
  caldero:1,back:'c3_hyndla'},
c3_taller:{h:'Fortalecer las runas',t:['Hyndla repasa tus runas con un dedo enorme, una por una. «Las runas de los pequeños son pequeñas», dice. «Pero se pueden hacer más hondas.»'],
  taller:1,back:'c3_hyndla'},

/* ---------- Comercio ---------- */
c3_trueque:{h:'El trueque de Gunnlod',t:[
  'Gunnlod es una giganta joven y risueña que comercia con todo lo que llega a la aldea. Su puesto es una mesa de piedra donde tú podrías tumbarte a lo largo. «¿Una pierna de cabra?», te ofrece. «Es pequeña. Solo pesa como tú.»'],
  shop:'gunnlod',back:'c3_aldea'},

c3_forja:{h:'La forja de hielo',t:[
  'Hrimnir, el herrero de la aldea, trabaja con un yunque de piedra negra y un martillo que tú no podrías ni levantar. Al ver tu arma, silba. «Trabajo enano», dice con respeto. «Yo no sé hacer eso. Pero sé grabar runas, y sé coser pieles para que no entre el frío.»'],
  c:[{x:'Forjar o mejorar equipo',to:'c3_forjar',k:'shop'},
     {x:'Grabar una runa en tu arma',to:'c3_grabado',k:'shop'}],
  back:'c3_aldea'},
c3_forjar:{h:'La forja de Hrimnir',t:['Hrimnir aviva el fuego con un fuelle hecho con la piel de una ballena entera.'],forja:1,back:'c3_forja'},
c3_grabado:{h:'El grabado de Hrimnir',t:['Hrimnir no tiene la delicadeza de Eitri, pero tiene buen pulso y ninguna prisa.'],grabado:1,back:'c3_forja'},

/* ---------- El tronco de los encargos ---------- */
c3_encargos:{h:'El tronco de los encargos',t:[
  'En la plaza de la aldea hay un tronco enorme clavado en el suelo, con encargos tallados a cuchillo. Las letras miden lo que tu brazo.'],
  c:[{x:'«Echo un pulso a quien sea». Firmado: Baugi',to:'c3_pulso',k:'social',oc:1,req:{no:'pulso'}},
     {x:'«Se ha perdido una cabra blanca. Se llama Copito». Firmado: Ymma',to:'c3_cabra',k:'side',oc:1,req:{no:'cabra'}},
     {x:'«Algo rompe el hielo de pesca del lago». Firmado: los pescadores',to:'c3_pesca',k:'hunt',oc:1,req:{no:'pesca'}}],
  back:'c3_aldea'},

c3_pulso:{h:'El pulso',t:[
  'Baugi es un gigante joven, con brazos como troncos de pino y una sonrisa bobalicona. Cuando te ve llegar, se ríe tanto que tiene que sentarse. «¿Tú? ¿Contra mí? ¡Si eres del tamaño de mi pulgar!»',
  'Se apoya en una mesa de piedra y te ofrece… el dedo meñique. Los gigantes de la plaza se acercan a mirar.'],
  c:[{x:'Agarrarle el meñique y apretar con todo',to:'c3_pulso_ok',k:'social',chk:{s:'fue',dc:11,ok:'c3_pulso_ok',ko:'c3_pulso_ko'}},
     {x:'Pensar en Thor y apretar con la fuerza del trueno',to:'c3_pulso_ok',k:'social',oc:1,req:{fl:'thor_cabra'},chk:{s:'fue',dc:8,ok:'c3_pulso_ok',ko:'c3_pulso_ko'}}],
  back:'c3_encargos'},

c3_pulso_ok:{t:[
  'Aprietas. Baugi deja de sonreír. Aprietas más. Baugi se pone rojo. Con un último tirón, el meñique de Baugi toca la mesa con un golpe que hace saltar las jarras.',
  'La plaza estalla en carcajadas y vítores. Baugi se mira el dedo con incredulidad, luego te mira a ti, y te da una palmada amistosa en la espalda que te tira de cara a la nieve. «¡Pequeñ{o|a} pero matón!», ruge. Desde ese día, todos los gigantes de la aldea te llaman así.'],
  fx:{fl:{pulso:1},gl:12,plata:40,saga:'Le ganó un pulso al gigante Baugi. Bueno, a su meñique.'},
  back:'c3_encargos'},

c3_pulso_ko:{t:[
  'Aprietas con todas tus fuerzas. Baugi bosteza. Luego mueve el meñique, apenas un poco, y sales volando por encima de la mesa hasta un montón de nieve.',
  'Los gigantes se ríen, pero sin maldad. Baugi te saca de la nieve tirando de tu capa como quien saca un gatito de un pozo. «Ha estado bien», dice. «Para ser tan pequeñ{o|a}.»'],
  fx:{fl:{pulso:1},hp:-10},
  back:'c3_encargos'},

c3_cabra:{h:'Copito',t:[
  'Copito, la cabra de Ymma, es fácil de encontrar: se oyen sus balidos desde lejos. Está atrapada en el fondo de una grieta en el hielo, sobre un saliente, demasiado lejos para que un gigante llegue con el brazo y demasiado estrecho para que baje.',
  'Para alguien de tu tamaño, en cambio, no es tan difícil. O eso piensas antes de asomarte.'],
  c:[{x:'Bajar por la grieta con una cuerda',to:'c3_cabra_ok',k:'side',chk:{s:'ast',dc:9,ok:'c3_cabra_ok',ko:'c3_cabra_ko'}}],
  back:'c3_encargos'},

c3_cabra_ok:{t:[
  'Bajas, coges a Copito en brazos (la cabra es casi tan grande como tú, porque es una cabra de gigantes) y subís juntos tirando de la cuerda. Copito te lame la cara todo el camino.',
  'Ymma llora de alegría, abraza a Copito, te abraza a ti y luego os abraza a los dos a la vez. Te regala lo más valioso que tiene: un cuerno de hidromiel de su abuelo, del tamaño de un barril.'],
  fx:{fl:{cabra:1},item:{hidromiel:3},gl:10},
  back:'c3_encargos'},

c3_cabra_ko:{t:[
  'A mitad de bajada, la cuerda resbala y caes los últimos metros, justo encima de Copito. La cabra te da una coz en las costillas por las molestias.',
  'Al final subís los dos, magullados y de mal humor. Ymma está tan contenta que no se fija en tus moratones.'],
  fx:{fl:{cabra:1},item:{hidromiel:2},hp:-20,gl:5},
  back:'c3_encargos'},

c3_pesca:{h:'El agujero de pesca',t:[
  'Los pescadores gigantes han abierto un agujero en el hielo del lago del tamaño de una casa. Cada mañana lo encuentran roto, con grietas por todas partes, y la pesca desaparece.',
  'Te asomas al agujero. El agua es negra. Y entonces algo blanco y largo se mueve debajo del hielo, muy despacio, como una cinta de niebla.'],
  c:[{x:'Esperar a que salga',to:'c3_f_serpiente',k:'hunt'}],
  back:'c3_encargos'},

c3_f_serpiente:pelea('serpiente_hielo','c3_pesca_fin','c3_encargos','El hielo revienta y una serpiente blanca, transparente como el cristal, sale del agua abriendo una boca llena de dientes de hielo.'),

c3_pesca_fin:{t:[
  'La serpiente se hunde en el agua negra y no vuelve a salir. Los pescadores te suben a hombros (literalmente: a hombros de gigante, a una altura que da vértigo) y te pasean por toda la aldea.',
  'Esa noche se come pescado en todas las casas. A ti te sirven uno entero, más grande que tú. Kraka se come los ojos.'],
  fx:{fl:{pesca:1},plata:60,item:{carne_gigante:2},gl:12},
  back:'c3_encargos'},

/* ---------- El Bosque Negro ---------- */
c3_bosque:{h:'El Bosque Negro',t:[
  'Abetos negros, altísimos, tan juntos que la nieve apenas llega al suelo. En las rocas crece un liquen rojo que los gigantes usan para sus remedios. Y entre los árboles, siempre, ojos azules que te observan.'],
  c:[{x:'Cazar lobos de escarcha',to:'c3_f_lobo_rep',k:'hunt'},
     {x:'Recoger liquen rojo · 1 h',to:'c3_bosque',k:'side',fx:{item:{liquen_rojo:2},t:1}},
     {x:'Volver a la aldea · 1 h',to:'c3_aldea',fx:{t:1}}]},

c3_f_lobo_rep:pelea('lobo_escarcha','c3_bosque','c3_bosque','Un lobo de escarcha sale de entre los abetos, con el pelo erizado y los colmillos al aire.'),

/* ---------- Hrimfaxi y Ehwaz ---------- */
c3_rio:{h:'El río helado',t:[
  'El gran río que baja de las montañas está helado de orilla a orilla, y el hielo es tan grueso que los gigantes lo cruzan con sus carros. Pero esta noche, en medio del río, hay algo que no debería estar ahí.',
  'Un caballo. Un caballo negro como la noche, enorme, con una crin blanca de escarcha que tintinea cuando se mueve. Galopa de un lado a otro sobre el hielo, asustado, y de su crin caen copos de nieve que brillan como estrellas.',
  'Kraka suelta un graznido de asombro. «Hrimfaxi», susurra. «El caballo de la Noche. El que tira de su carro por el cielo. ¿Qué hace aquí abajo?»'],
  c:[{x:'Acercarte despacio, con la mano tendida',to:'c3_hrimfaxi',k:'main'},
     {x:'Volver a la aldea · 2 h',to:'c3_aldea',fx:{t:2}}]},

c3_hrimfaxi:{h:'Hrimfaxi',t:[
  'El caballo se detiene y te mira. Tiene los ojos plateados, como dos lunas. Está herido: tiene un corte en el pecho y restos de arneses rotos colgando del cuello.',
  'Kraka lo entiende antes que tú. «El carro de la Noche se ha roto», dice. «El Gran Invierno es tan largo que la Noche no ha dejado de correr, y el caballo ya no podía más. Se ha escapado.» Baja la voz. «Si la Noche no tiene caballo… no sé qué pasa. Nadie lo sabe.»'],
  c:[{x:'Calmarlo con la voz, como hacías con los caballos de Vindvik',to:'c3_ehwaz',k:'main',chk:{s:'esp',dc:10,ok:'c3_ehwaz',ko:'c3_hrimfaxi_coz'}},
     {x:'Ofrecerle algo de comer',to:'c3_ehwaz',k:'main',oc:1,req:{item:'pan_enano'},fx:{quita:{pan_enano:1}},chk:{s:'esp',dc:7,ok:'c3_ehwaz',ko:'c3_hrimfaxi_coz'}},
     {x:'Curarle la herida con la runa Berkano',to:'c3_ehwaz',k:'main',oc:1,req:{runa:'berkano'}}]},

c3_hrimfaxi_coz:{t:[
  'Te acercas demasiado deprisa. Hrimfaxi se encabrita, te da una coz en el pecho que te lanza por los aires y sale galopando río arriba, dejando un rastro de escarcha.',
  'Cuando recuperas el aliento, Kraka está a tu lado. «Bueno», dice. «Al menos sabemos que sigue teniendo fuerza.» Habrá que volver a intentarlo.'],
  fx:{hp:-30},
  c:[{x:'Volver a la aldea · 2 h',to:'c3_aldea',fx:{t:2}}]},

c3_ehwaz:{h:'Ehwaz',t:[
  'Hrimfaxi resopla, duda… y baja la cabeza. Pones la mano marcada sobre su cuello. Está frío como el hielo y suave como el terciopelo. Le limpias la herida, le quitas los arneses rotos y le hablas en voz baja durante mucho rato, de nada en concreto. De Vindvik. De Siri. Del mar.',
  'Cuando terminas, el caballo apoya su enorme frente contra la tuya. Sientes que algo pasa entre vosotros: confianza, la de un jinete en su montura y la de una montura en su jinete. En tu palma aparece una runa como dos postes unidos: <b>Ehwaz</b>, el caballo, la runa de los que avanzan juntos.',
  'Luego Hrimfaxi relincha, se aleja al galope hacia el cielo y, para tu asombro, sigue galopando por el aire, cada vez más alto, hasta perderse entre las nubes. Esa noche, por primera vez en semanas, la oscuridad se mueve.'],
  fx:{fl:{ehwaz:1},runa:'ehwaz',gl:25,saga:'Calmó y curó a Hrimfaxi, el caballo de la Noche, que había escapado del cielo, y aprendió la runa Ehwaz.'},
  c:[{x:'Volver a la aldea · 2 h',to:'c3_aldea',k:'main',fx:{t:2}}]},

/* ---------- Skadi y la gran cacería ---------- */
c3_thrymheim:{h:'Thrymheim',t:[
  'Thrymheim es el hogar de Skadi: una sala de madera y piedra encaramada en lo más alto de las montañas, donde el viento no deja de soplar y los lobos aúllan día y noche. Subir te lleva cuatro horas de nieve hasta la cintura.',
  'Skadi te espera en la puerta, como si supiera que venías. Es una giganta alta y esbelta, de pelo negro trenzado, con un arco a la espalda y un par de esquís de madera clavados en la nieve a su lado. Tiene los ojos más fríos que has visto nunca.',
  '«Te ha mandado Thor», dice. No es una pregunta. «Los Aesir mataron a mi padre, mortal. Me casaron con un dios del mar que huele a pescado. No le debo nada a Asgard.» Te mira de arriba abajo. «Pero los de la montaña me han matado tres perros. Así que tal vez te escuche.»'],
  c:[{x:'«¿Qué tengo que hacer?»',to:'c3_skadi',k:'main'}]},

c3_skadi:{h:'La cazadora',t:[
  '«En estas montañas hay un oso blanco», dice Skadi. «El Oso de Escarcha. Es viejo, es listo y ha matado a tres de mis perros. Llevo un mes persiguiéndolo.» Se cuelga el arco. «Cazaremos juntas. Si estás a mi altura, te diré dónde se reúne el ejército de Thrym.»',
  'Te tiende un par de esquís. Son más largos que tú. «¿Sabes usarlos?» No esperas la respuesta. Ella ya ha salido disparada ladera abajo.',
  '<span class=tag>Prueba de Skadi: la gran cacería.</span>'],
  fx:{fl:{caceria:1}},
  c:[{x:'Lanzarte ladera abajo detrás de ella',to:'c3_caceria1',k:'main'}]},

c3_caceria1:{h:'La ladera',t:[
  'Bajas a una velocidad que no creías posible. Los abetos pasan a tu lado como flechas, el viento te arranca las lágrimas y Kraka va agarrado a tu capucha gritando algo sobre la dignidad de los cuervos.',
  'Delante, Skadi esquía como si hubiera nacido con los esquís puestos. De pronto, la ladera se corta en un barranco.'],
  c:[{x:'Saltar el barranco detrás de Skadi',to:'c3_caceria2',k:'main',chk:{s:'ast',dc:10,ok:'c3_caceria2',ko:'c3_caceria1_ko'}},
     {x:'Usar la runa Ehwaz: avanzar como un caballo al galope',to:'c3_caceria2',k:'main',oc:1,req:{runa:'ehwaz'},fx:{gl:5}},
     {x:'Usar la runa Raidho: encontrar el camino más seguro',to:'c3_caceria2',k:'main',oc:1,req:{runa:'raidho'},chk:{s:'ast',dc:7,ok:'c3_caceria2',ko:'c3_caceria1_ko'}}]},

c3_caceria1_ko:{t:[
  'Saltas. Durante un instante glorioso vuelas. Luego aterrizas de cabeza en un ventisquero, con un esquí en cada dirección.',
  'Skadi vuelve atrás, te saca de la nieve tirándote de un tobillo y te mira con algo que podría ser una sonrisa. «No está mal para una primera vez», dice. «Mi marido se cayó en el primer metro.»'],
  fx:{hp:-25},
  c:[{x:'Seguir la cacería',to:'c3_caceria2',k:'main'}]},

c3_caceria2:{h:'El rastro',t:[
  'Al pie del barranco, Skadi se arrodilla junto a unas huellas enormes. «Ha pasado por aquí hace poco», dice. «Pero el viento borra las huellas. Hay que leer lo que no está: ramas rotas, nieve removida, el silencio de los pájaros.»',
  'Te mira. «A ver qué ves tú.»'],
  c:[{x:'Leer el rastro tú mism{o|a}',to:'c3_caceria3',k:'main',chk:{s:'ast',dc:10,ok:'c3_caceria3',ko:'c3_caceria2_ko'}},
     {x:'Pedirle a Kraka que vuele y busque desde arriba',to:'c3_caceria3',k:'social',oc:1,req:{no:'kraka_ofendido'}},
     {x:'Pedirle a Kraka que vuele y busque desde arriba',to:'c3_caceria3',k:'social',oc:1,req:{fl:['kraka_ofendido','kraka_perdona']}}]},

c3_caceria2_ko:{t:[
  'Sigues un rastro durante una hora antes de darte cuenta de que son tus propias huellas. Skadi te ha seguido todo el rato sin decir nada, con cara de estar pasándolo muy bien.',
  'Al final señala hacia una cueva en la ladera. «Allí», dice. «Desde hace una hora.» Te duele el orgullo más que las piernas.'],
  fx:{t:2},
  c:[{x:'Ir hacia la cueva',to:'c3_caceria3',k:'main'}]},

c3_caceria3:{h:'El Oso de Escarcha',cp:1,t:[
  'La cueva está en una pared de hielo azul. Delante, sobre la nieve, hay huesos de alce, de lobo… y de perro. Skadi aprieta los dientes.',
  'Del fondo de la cueva sale un gruñido que hace temblar los carámbanos. Luego sale él: un oso blanco del tamaño de una casa, con el pelo lleno de escarcha y unos ojos azules, viejos y muy listos. Se pone de pie. Es más alto que Skadi.',
  'Skadi tensa el arco. «Tú por delante», te dice. «Yo por detrás. Como hacen los lobos.»'],
  c:[{x:'Atacar de frente para que Skadi pueda disparar',to:'c3_f_oso',k:'hunt'}]},

c3_f_oso:pelea('oso_escarcha','c3_skadi_fin',null,'El Oso de Escarcha ruge y carga contra ti. Detrás, oyes el silbido de la primera flecha de Skadi.'),

c3_skadi_fin:{h:'El favor de la cazadora',t:[
  'El Oso de Escarcha cae con tres flechas de Skadi en la espalda y tu arma en el pecho. Skadi se acerca, le cierra los ojos y le susurra algo al oído en un idioma que no conoces. Luego te mira.',
  '«Cazas bien», dice. En boca de Skadi, eso es como una canción de escaldo. «Puedes quedarte la piel. Te abrigará mejor que esos trapos de Midgard.»',
  '«Ahora escucha. Thrym reúne a su ejército en Utgard, la fortaleza de Utgarda-Loki, el señor de las ilusiones. Allí están las armas de los enanos. Pero antes va a mandar a Hrungnir, su campeón, a recoger a los rezagados. Como la aldea de Bergelmir.» Te pone una mano en el hombro. «Ve. Y si necesitas ayuda… las montañas son grandes, y yo conozco todos sus escondites.»'],
  fx:{fl:{skadi_fin:1},favor:'skadi',gl:30,saga:'Cazó al Oso de Escarcha junto a Skadi, la cazadora de las montañas, y ganó su favor.'},
  c:[{x:'Volver a la aldea de Bergelmir · 4 h',to:'c3_aldea',k:'main',fx:{t:4}}]},

/* ---------- La asamblea y Hrungnir ---------- */
c3_asamblea:{h:'Hrungnir',cp:1,gen:'c3_asamblea',t:[],
  c:[{x:'Interponerte: «Esta aldea no marcha con nadie. Si quieres pelea, pelea conmigo»',to:'c3_duelo',k:'hunt'},
     {x:'Soplar el cuerno de Thor',to:'c3_cuerno',k:'main',oc:1,req:{item:'cuerno_thor'}},
     {x:'Proponer a Bergelmir que la aldea huya esta noche a los escondites de Skadi, guiada por Hrimfaxi',to:'c3_huida',k:'social',oc:1,req:{fl:['skadi_fin','ehwaz']}}]},

c3_duelo:{t:[
  'Hrungnir se ríe con un ruido de rocas que caen. «¿Tú? ¿Un mortal del tamaño de un perro?» Pero los gigantes de la aldea, detrás de ti, cogen sus hachas y sus lanzas, y Bergelmir se pone a tu lado. «Si pelea, pelea por todos nosotros», dice el viejo.',
  'Hrungnir deja de reírse. Coge su arma: una piedra de afilar del tamaño de una barca, atada a un mango de hierro. «Muy bien», dice. «Uno contra uno, como en los viejos tiempos. Si gano, la aldea marcha. Si ganas…» Se encoge de hombros. «No vas a ganar.»'],
  c:[{x:'Aceptar el duelo',to:'c3_f_hrungnir',k:'hunt'}]},

c3_f_hrungnir:{t:['Hrungnir alza la piedra de afilar sobre su cabeza de piedra. La sombra te cubre entero.'],f:{e:'hrungnir',win:'c3_hrungnir_cae',lose:'muerte'}},

c3_hrungnir_cae:{h:'Corazón de piedra',t:[
  'Hrungnir cae de rodillas, y luego de bruces, y la tierra entera tiembla. La cabeza de piedra se le parte en dos. Dentro, donde debería estar el cerebro, solo hay más piedra.',
  'Los emisarios de Thrym se miran unos a otros. Luego miran a los gigantes de la aldea, que se acercan con las hachas en alto, y huyen montaña arriba sin mirar atrás.',
  'La aldea entera estalla en un rugido. Ymma corre hacia ti y te levanta del suelo. Bergelmir pone una rodilla en tierra. «Pequeñ{o|a}», dice, «has hecho lo que ningún gigante se atrevía a hacer.»'],
  fx:{fl:{asamblea_fin:1,hrungnir_muerto:1,aldea_salvada:1},gl:40,saga:'Derrotó en duelo a Hrungnir, Corazón de Piedra, el campeón de Thrym, y salvó la aldea de Bergelmir.'},
  c:[{x:'Celebrarlo con los gigantes',to:'c3_skrymir',k:'main'}]},

c3_cuerno:{h:'El cuerno de Thor',t:[
  'Soplas el cuerno. El sonido no es fuerte, pero rueda por las montañas como un trueno lejano. Hrungnir se pone pálido, si una cabeza de piedra puede ponerse pálida.',
  'El cielo se abre. Por la grieta baja el carro de Thor, tirado por Rechinadientes y Crujedientes, entre rayos. Thor salta al suelo con Mjolnir en la mano y los ojos encendidos. Ve a Hrungnir. Ve a veinte gigantes armados. Ve a toda una aldea de gigantes. Levanta el martillo.',
  'Tienes un instante, solo uno, para hacerte oír.'],
  fx:{quita:{cuerno_thor:1}},
  c:[{x:'Gritarle que la aldea es inocente y que solo Hrungnir es el enemigo',to:'c3_thor_llega',k:'main',chk:{s:'esp',dc:10,ok:'c3_thor_llega',ko:'c3_thor_llega',fxok:{fl:{thor_convencido:1}}}},
     {x:'Recordarle la cabra: «¡Crujedientes tiene mejor juicio que tú! ¡Escúchala!»',to:'c3_thor_llega',k:'social',oc:1,req:{fl:'thor_cabra'},fx:{fl:{thor_convencido:1}}}]},

c3_thor_llega:{h:'El martillo',gen:'c3_thor_llega',t:[],
  c:[{x:'Ver qué queda',to:'c3_cuerno_tras',k:'main'}]},

c3_cuerno_tras:{t:[
  'Cuando el polvo se asienta, haces balance. Hrungnir, el campeón de Thrym, está muerto. Los emisarios han huido. Y Thor se ha ido tan deprisa como llegó.',
  'Bergelmir se acerca y se queda mirándote un largo rato. Sea lo que sea lo que piensa, todavía no lo dice.'],
  fx:{fl:{asamblea_fin:1,hrungnir_muerto:1,cuerno_usado:1}},
  c:[{x:'Esperar a que Bergelmir hable',to:'c3_cuerno_fin',k:'main',oc:1,req:{fl:'thor_convencido'},
      fx:{fl:{aldea_salvada:1},gl:30,saga:'Llamó a Thor con su cuerno y lo convenció de que solo matara a Hrungnir y respetara la aldea de los gigantes.'}},
     {x:'Esperar a que Bergelmir hable',to:'c3_cuerno_fin',k:'main',oc:1,req:{no:'thor_convencido'},
      fx:{fl:{aldea_destruida:1},gl:-20,saga:'Llamó a Thor con su cuerno, y la aldea de Bergelmir quedó destruida junto con Hrungnir.'}}]},

c3_cuerno_fin:{gen:'c3_cuerno_fin',t:[],
  c:[{x:'Seguir',to:'c3_skrymir',k:'main'}]},

c3_huida:{h:'La huida de la aldea',t:[
  'Bergelmir escucha tu plan en silencio. Luego asiente. «Mejor huir que arder», dice. «Mejor huir que matar.»',
  'Esa noche, mientras los emisarios duermen confiados en la plaza, toda la aldea se pone en marcha: viejos, niños, cabras, carros con pescado ahumado. Llamas a Hrimfaxi con la runa Ehwaz, y el caballo de la Noche baja del cielo y abre el camino por la nieve, con su crin de escarcha brillando como un farol. Skadi os espera en el paso para guiaros hasta sus escondites.',
  'Al amanecer, la aldea está vacía. Pero Hrungnir no es tonto. Ha visto las huellas. Y viene detrás, solo, furioso, a la carrera.'],
  fx:{fl:{aldea_huida:1},gl:20},
  c:[{x:'Quedarte atrás en el paso para cubrir la huida',to:'c3_f_hrungnir_huida',k:'hunt'}]},

c3_f_hrungnir_huida:{t:['Hrungnir llega al paso jadeando, con la cabeza de piedra cubierta de escarcha. Ha corrido toda la noche. Ve a la aldea a lo lejos y te ve a ti, sol{o|a}, en medio del camino. «Tú», gruñe.'],f:{e:'hrungnir_cansado',win:'c3_hrungnir_paso',lose:'muerte'}},

c3_hrungnir_paso:{h:'El paso',t:[
  'Hrungnir cae en el paso con un estruendo que provoca un alud. La nieve lo entierra antes de que deje de moverse.',
  'Desde lo alto, toda la aldea de Bergelmir lo ha visto. Los gigantes golpean sus escudos, sus ollas y sus carros. Skadi baja la cabeza en señal de respeto. Ymma grita tu nombre tan fuerte que provoca otro alud, más pequeño.',
  'Esa noche, en los escondites de Skadi, los gigantes de escarcha encienden hogueras y celebran estar vivos. La aldea se puede reconstruir. Los gigantes, no.'],
  fx:{fl:{asamblea_fin:1,hrungnir_muerto:1,aldea_salvada:1},gl:50,saga:'Sacó de noche a toda la aldea de Bergelmir, guiada por Hrimfaxi, y venció a Hrungnir en el paso para cubrir su huida.'},
  c:[{x:'Celebrarlo con los gigantes',to:'c3_skrymir',k:'main'}]},

/* ---------- Final de la Parte 1: Skrymir ---------- */
c3_skrymir:{h:'El guante',t:[
  'Esa noche, cansad{o|a} hasta los huesos, te alejas de las hogueras para dormir un poco. Encuentras un refugio perfecto: una especie de cabaña blanda y cálida, con cinco habitaciones estrechas en un lado. Te tumbas en la más grande y duermes como un tronco.',
  'Te despierta un temblor. La cabaña se mueve. Se levanta. Sales a gatas y descubres que no era una cabaña: era un guante. Un guante tan grande que el de Ymma parecería un dedal. Y su dueño, un gigante tan alto que su cabeza se pierde entre las nubes, se está agachando para recogerlo.',
  '«Ah», dice una voz como una montaña que bosteza. «Así que tú eres {el famoso|la famosa} {N}. Me llamo Skrymir. Mi señor, Utgarda-Loki, ha oído hablar de ti.» Una sonrisa enorme aparece entre las nubes. «Te invita a Utgard, a sus juegos. Dice que nadie ha ganado nunca. Dice que tú tampoco ganarás.»'],
  fx:{fl:{skrymir:1}},
  c:[{x:'«Dile que allí estaré»',to:'c3_p1_fin',k:'main'}]},

c3_p1_fin:{h:'Hacia Utgard',cp:1,t:[
  'Skrymir se pone el guante, se da la vuelta y se aleja hacia el norte. Cada paso suyo es un pequeño terremoto. Kraka sale de debajo de tu manto, donde se había escondido. «Dormimos en su guante», dice, horrorizado. «En su guante. Toda la noche.»',
  'Por la mañana te despides de los gigantes. Bergelmir te regala una capa de piel de foca. Hyndla, un saquito de hierbas. Ymma no te regala nada: te abraza, muy fuerte, y luego se va corriendo para que no la veas llorar.',
  'Al norte, más allá de las montañas, se alza la fortaleza de Utgard, tan alta que tienes que echar la cabeza atrás para ver dónde acaba. Allí está el ejército de Thrym. Allí están las armas de los enanos. Y allí te espera el señor de las ilusiones.'],
  fx:{fl:{c3p1fin:1},item:{carne_gigante:2,pocion_abedul:1}},
  c:[{x:'Ponerte en camino hacia Utgard',to:'c3_p2',k:'main'}]},

/* Escena de enlace provisional: la sustituirá la Parte 2 */
c3_p2:{h:'Continuará',t:[
  'Las puertas de Utgard son tan altas que, para entrar, tienes que pasar entre los barrotes.',
  '<span class=tag>Aquí termina la Parte 1 del Capítulo 3. La historia continúa en la Parte 2: «Los juegos de Utgarda-Loki».</span>'],
  c:[{x:'Volver a la aldea de Bergelmir',to:'c3_aldea'}]}

}});

})();
