/* =====================================================================
   Capítulo 1 · La Muerte de Paja
   Parte 1 · «El trato de la Valquiria»
   Escenas c1_*  ·  Continúa en parte2.js (c1_colinas)
   Marcas de texto: {N} nombre · {o|a} masculino|femenino
   ===================================================================== */
(()=>{
const pelea=(e,win,flee,t)=>({t:[t],f:{e,win,lose:'muerte',flee}});

registrarSenales({
  3:'Un aullido rueda desde el Bosque Gris al amanecer, tan largo que parece que el bosque entero tuviera hambre.',
  4:'El sol sale pálido como una moneda gastada. Los viejos dicen que algo lo persigue por el cielo.',
  5:'El mar amanece con hielo en la orilla. En pleno verano.'
},S=>!S.fl.c2);

registrarMision(S=>{
  if(!S.fl.trato)return 'Sobrevive a la noche.';
  if(!S.fl.salon&&!S.fl.groa)return 'Preséntate ante el jarl Hakon o visita a la völva Groa.';
  if(!S.fl.amenaza)return S.fl.cabana?'Sigue el rastro de los saqueadores hasta su guarida en el Bosque Gris.':'Acaba con la amenaza que diezma el ganado de Vindvik, en el Bosque Gris.';
  if(!S.fl.salon_noche)return 'Preséntate en el salón del jarl al anochecer.';
  return null;
});

registrarCapitulo({capitulo:1,parte:1,titulo:'El trato de la Valquiria',escenas:{

/* ---------- La última noche ---------- */
c1_inicio:{h:'Capítulo 1 · La Muerte de Paja',cp:1,t:[
  'La fiebre llegó con las primeras escarchas y ya no se ha ido. Llevas nueve días en el jergón, bajo pieles que no calientan, escuchando cómo el viento golpea la puerta de tu casa como un acreedor con prisa.',
  'Tú, {N}, que sobreviviste a tres incursiones en las costas de Sajonia y a una tormenta que partió tu barco en dos, vas a morir de unos sudores. En la cama. Como una vaca vieja.',
  'Siri, tu sobrina, cambia el paño de tu frente. Tiene trece inviernos y los ojos rojos de no dormir. «Groa dice que esta noche es la peor, {tío|tía}. Que si pasas de esta, vives.» Por cómo lo dice, Groa dijo otra cosa.'],
  c:[{x:'Pedirle a Siri que te traiga el hacha',to:'c1_hacha'},
     {x:'Decirle que se vaya a dormir',to:'c1_siri_duerme'},
     {x:'Rezar a Odín en voz baja',to:'c1_rezo'}]},

c1_hacha:{t:[
  'Siri arrastra el hacha de tu padre hasta el jergón. Pesa casi tanto como ella. Tus dedos se cierran sobre el mango gastado y, por un momento, vuelves a ser tú.',
  'Dicen que quien muere con el arma en la mano engaña a las valquirias. Lo dicen los borrachos. Los escaldos son más claros: morir en la cama es muerte de paja, aunque abraces una espada, y la muerte de paja lleva al reino gris de Hel.',
  'El hacha resbala de tus dedos. Y el fuego del hogar se encoge, como si alguien hubiera abierto una puerta a un sitio mucho más frío.'],
  c:[{x:'Mirar hacia la puerta',to:'c1_valquiria',fx:{fl:{hacha_cama:1}}}]},

c1_siri_duerme:{t:[
  'Siri protesta, pero el sueño le puede. Se queda dormida sentada, con la cabeza apoyada en el poste de la cama y tu mano entre las suyas.',
  'Mejor así. Nadie debería ver a {un guerrero|una guerrera} de Vindvik irse de este modo, y menos una niña que ya enterró a sus padres.',
  'Entonces el fuego del hogar se encoge, como si alguien hubiera abierto una puerta a un sitio mucho más frío.'],
  c:[{x:'Mirar hacia la puerta',to:'c1_valquiria',fx:{fl:{siri_durmio:1}}}]},

c1_rezo:{t:[
  'Le pides a Odín una muerte mejor. Una batalla. Un barco en llamas. Un oso, aunque sea. Algo que los escaldos puedan cantar sin bostezar.',
  'Odín, como siempre, no contesta.',
  'Pero algo sí lo hace. El fuego del hogar se encoge, como si alguien hubiera abierto una puerta a un sitio mucho más frío.'],
  c:[{x:'Mirar hacia la puerta',to:'c1_valquiria',fx:{fl:{rezo:1}}}]},

c1_valquiria:{h:'La visitante',t:[
  'Hay una mujer sentada a los pies de tu cama. No ha entrado: simplemente está, como si hubiera estado ahí siempre. Lleva una cota de malla tan pulida que parece agua helada, y su pelo tiene el color de la ceniza vieja. En el regazo sostiene un huso de hilar, y del huso cuelga un hilo que brilla y se pierde en la oscuridad.',
  'Siri no se mueve. El fuego no crepita. El mundo entero se ha quedado quieto, como un ciervo que oye al cazador.',
  '«Me llamo Skuld», dice. «Soy una de las que eligen. Y tú, {N} de Vindvik, estás a punto de morir de la forma más vulgar que conozco. Odín no recoge a los que mueren en la cama. Si cierras los ojos esta noche, bajarás por el camino de Hel, a un salón donde la comida es hambre y la cama es enfermedad. Para siempre.»'],
  c:[{x:'«¿Y has venido solo a decirme eso?»',to:'c1_trato'}]},

c1_trato:{h:'El trato',t:[
  '«He venido a ofrecerte un invierno», dice Skuld, y tira suavemente del hilo. «Te devuelvo la salud y la fuerza. A cambio, te ganarás un lugar entre los guerreros de Odín: con hazañas, con juramentos cumplidos, con sangre derramada con honor. Las valquirias lo verán todo.»',
  'Un invierno. Has vivido cuarenta. Pero ella lo dice como si fuera el último.',
  '«Este no terminará como los demás», añade, como si te leyera el pensamiento. «Lo llamarán el Gran Invierno, y detrás de él viene el Ragnarok, el fin de los dioses. Cuando llegue, las puertas del Valhalla se cerrarán. Si para entonces no te has ganado el sitio…» Mira el hilo y no termina la frase.'],
  c:[{x:'Aceptar el trato',to:'c1_acepta'},
     {x:'«¿Por qué yo?»',to:'c1_porque',oc:1,req:{no:'porque'}},
     {x:'Rechazarlo: morirás como has vivido, sin deber nada a nadie',to:'c1_rechaza'}]},

c1_porque:{t:[
  '«Porque el hilo pasa por ti», dice Skuld, como si eso lo explicara todo. «Las Nornas no explican, {N}. Tejen.»',
  'Te parece una respuesta de lo más sospechosa. Pero te estás muriendo, y quien se muere no está en posición de regatear.'],
  fx:{fl:{porque:1}},
  c:[{x:'Aceptar el trato',to:'c1_acepta'},
     {x:'Rechazarlo de todas formas',to:'c1_rechaza'}]},

c1_rechaza:{h:'El camino gris',t:[
  'Skuld se encoge de hombros. «Como quieras.» El hilo se corta con un sonido diminuto, como una cuerda de arpa en otra habitación.',
  'Bajas por un camino largo y gris, entre muertos que no te miran. Al final hay un salón con las puertas abiertas, y una mujer mitad viva y mitad cadáver que tampoco te mira.',
  '<span class=tag>Hay muchas maneras de morir. Esta era la peor.</span>'],
  end:'La muerte de paja'},

c1_acepta:{t:[
  'Skuld toma tu mano derecha entre las suyas. Están frías como el fondo de un lago. Aprieta, y un dolor finísimo te cruza la palma, como si alguien escribiera en ella con una aguja de hielo.',
  '«Es mi marca», dice. «Mientras la lleves, tu hilo es mío y yo sabré dónde estás. Duerme. Mañana empieza tu saga.»',
  'Ya en la puerta, se vuelve. «Un último consejo: no te fíes de los que hablan demasiado.» Fuera, en la ventana, algo negro grazna con indignación.'],
  fx:{fl:{trato:1},saga:'En su lecho de muerte aceptó el trato de la valquiria Skuld: un invierno para ganarse el Valhalla.'},
  c:[{x:'Cerrar los ojos',to:'c1_despertar'}]},

/* ---------- El Gran Invierno ---------- */
c1_despertar:{h:'El Gran Invierno',cp:1,t:[
  'Despiertas con hambre. Con un hambre feroz, de lobo, de las de antes. La fiebre ha desaparecido como si nunca hubiera existido, y cuando te levantas, las piernas que ayer no te sostenían te obedecen como a los veinte años.',
  'En la palma derecha tienes una marca: una runa que no reconoces, fina como un corte y fría al tacto.',
  'Siri está en la puerta con un cubo de leche. El cubo cae. «¡{Tío|Tía}!» Y luego, mirando más allá de ti, hacia fuera, con la voz rota: «Está nevando. Estamos en verano y está nevando.»'],
  fx:{hp:100,t:10,item:{hacha_vieja:1,unguento:2,carne_seca:2},equipa:'hacha_vieja'},
  c:[{x:'Abrazar a Siri',to:'c1_nieve',fx:{fl:{abrazo:1}}},
     {x:'Salir a ver la nieve',to:'c1_nieve'}]},

c1_nieve:{t:[
  'Vindvik amanece blanca. La nieve cubre los tejados de turba, los barcos varados y los campos de cebada que deberían estar dorándose. Los vecinos han salido de sus casas y miran al cielo con la boca abierta, como si esperaran que alguien les explicara la broma.',
  'Te miran también a ti. Todo el pueblo sabía que te morías. Una mujer hace el gesto contra el mal de ojo; un niño se esconde tras las piernas de su padre.',
  'En el alero de tu casa, un cuervo te observa con la cabeza ladeada. Tiene las plumas despeinadas y una expresión que, en un ser humano, llamarías de fastidio. «Por fin», dice el cuervo. «Llevo toda la noche ahí fuera. Con esta nieve. En verano.»'],
  c:[{x:'«¿Hablas?»',to:'c1_kraka'}]},

c1_kraka:{h:'Kraka',t:[
  '«Sí, hablo. No, no soy el espíritu de tus antepasados. Sí, soy un cuervo. ¿Alguna otra pregunta evidente?»',
  'El cuervo se sacude la nieve y baja a tu hombro sin pedir permiso. «Me llamo Kraka. Hasta hace tres días era aprendiz de Hugin y Munin, los cuervos de Odín. Ahora soy tu… niñera. Me envía Skuld. Dice que necesitarás a alguien que te vigile y que te diga las cosas que no quieres oír.»',
  '«¿Por qué dejé el servicio de Odín? Una tontería. Conté un pequeño chisme sobre Thor y una cabra. Thor no le vio la gracia. Thor no le ve la gracia a casi nada.»'],
  c:[{x:'«¿Qué es exactamente eso de ganarse el Valhalla?»',to:'c1_kraka_gloria',k:'side',oc:1,req:{no:'gloria_expl'}},
     {x:'Ir al centro del pueblo',to:'c1_aldea',k:'main'}]},

c1_kraka_gloria:{t:[
  'Kraka carraspea, si es que un cuervo puede carraspear. «Las valquirias llevan la cuenta de tu <b>Gloria</b>. Cada enemigo digno que tumbas, cada hazaña, cada juramento cumplido, suma. Cada cobardía, cada mentira, cada juramento roto, resta. Y créeme: ellas no olvidan nada.»',
  '«Según tu Gloria, subirás de rango: de simple bóndi a drengr, hersir, jarl… y, si los dioses quieren, a {elegido|elegida}. Para entonces quizá merezcas un banco en el salón de Odín.»',
  '«Y otra cosa. Si haces un juramento, cúmplelo a tiempo. Un juramento roto te convierte en niding, y a un niding no lo quieren ni en Hel. Ah, y no te mueras. Skuld me desplumaría.»'],
  fx:{fl:{gloria_expl:1}},
  c:[{x:'Ir al centro del pueblo',to:'c1_aldea',k:'main'}]},

/* ---------- Vindvik: centro de la Parte 1 ---------- */
c1_aldea:{h:'Vindvik',cp:1,mision:1,sort:1,t:[
  'Vindvik es una aldea de pescadores encajada entre el fiordo y el Bosque Gris: treinta casas de turba, un muelle, el gran salón del jarl en lo alto y, apartada junto a los abedules, la cabaña de la völva.',
  'La nieve no deja de caer, lenta y silenciosa. Kraka, en tu hombro, comenta en voz baja quién te mira con miedo y quién con envidia. La lista es larga.'],
  c:[{x:'Subir al salón del jarl Hakon',to:'c1_salon',k:'main',oc:1,req:{no:'salon'}},
     {x:'Visitar a la völva Groa',to:'c1_groa',k:'main',oc:1,req:{no:'groa'}},
     {x:'Volver a la cabaña de la völva Groa',to:'c1_groa2',k:'main',oc:1,req:{fl:'groa'}},
     {x:'Presentarte en el salón del jarl al anochecer',to:'c1_salon_noche',k:'main',oc:1,req:{fl:'amenaza'}},
     {x:'Ir al Bosque Gris · 2 h',to:'c1_bosque',k:'hunt',oc:1,req:{fl:'mision_lobos'},fx:{t:2}},
     {x:'Volver a casa con Siri',to:'c1_casa',k:'side'}]},

c1_casa:{h:'Tu casa',t:[
  'El hogar vuelve a estar encendido y huele a gachas. Siri ha recogido la leche derramada y ha fregado el suelo dos veces, que es lo que hace cuando está nerviosa.'],
  c:[{x:'Hablar con Siri',to:'c1_siri_charla',k:'social',oc:1,req:{no:'siri_charla'}},
     {x:'Dormir hasta el amanecer (recuperación total)',to:'c1_aldea',k:'side',fx:{t:8,dormir:1}}],
  back:'c1_aldea'},

c1_siri_charla:{t:[
  'Siri remueve las gachas sin mirarte. «Anoche soñé con una mujer de plata sentada en tu cama», dice. «Y esta mañana estás bien. Y nieva. No soy tonta, {tío|tía}.»',
  'Le cuentas lo justo. Ella escucha con la misma cara seria con la que escuchaba las historias de su padre, tu hermano, antes de que el mar se los llevara a él y a su madre.',
  'Cuando terminas, se quita del cuello un cordel con una piedrecita agujereada y te lo pone. «Una piedra con agujero da suerte. La encontré el día que volviste de Sajonia.» Luego, más bajo: «Esta vez vuelve también.»'],
  fx:{fl:{siri_charla:1},item:'amuleto_siri',st:{sue:1},saga:'Su sobrina Siri le dio su amuleto para que volviera con vida.'},
  c:[{x:'Prometerle que volverás',to:'c1_casa',k:'social',fx:{gl:5}}]},

/* ---------- El salón del jarl ---------- */
c1_salon:{h:'El salón de Hakon',t:[
  'El salón del jarl huele a humo, a cerveza y a perro mojado. Hakon está sentado en su sitial, con la barba trenzada y los ojos pequeños de quien ha sobrevivido a muchos enemigos sospechando de todos. A su lado, el escaldo Eyvind afina una lira y no te quita ojo.',
  '«{N}», dice Hakon despacio. «Ayer te morías. Hoy caminas. Y el mismo día que te levantas, nieva en verano.» Se inclina hacia delante. «Los muertos no se levantan de la cama, a no ser que no estén del todo vivos. ¿Eres un draug?»',
  'Alrededor, los guerreros del jarl se llevan la mano a las armas. Muy despacio.'],
  c:[{x:'Ofrecer la mano para la prueba del hierro candente',to:'c1_salon_ok',chk:{s:'esp',dc:8,ok:'c1_salon_ok',ko:'c1_salon_ko',fxko:{hp:-10}}},
     {x:'Retar a su campeón a un pulso: un draug no siente cansancio, pero tampoco tiene corazón',to:'c1_salon_ok',chk:{s:'fue',dc:9,ok:'c1_salon_ok',ko:'c1_salon_ko',fxko:{hp:-5}}},
     {x:'Mostrarle la marca de tu mano',to:'c1_salon_marca'}]},

c1_salon_ok:{t:[
  'Aguantas. Lo que sea que te pidan, lo aguantas sin un gemido, y cuando terminas, el sudor te corre por la frente. Hakon se fija precisamente en eso. «Los draugs no sudan», murmura. «Ni tiemblan.»',
  'El jarl se recuesta. «Muy bien, {N}. Si estás vivo, sirves. Algo se está llevando mi ganado en el Bosque Gris. Lobos, dicen los pastores, pero ningún lobo arrastra una vaca entera sin dejar huellas de botas. Acaba con eso y te sentarás a mi mesa.»',
  'Eyvind el escaldo sonríe por primera vez. Un escaldo siempre huele una historia.'],
  fx:{fl:{salon:1,mision_lobos:1},gl:10,t:1,saga:'Probó ante el jarl Hakon que seguía con vida.'},
  c:[{x:'Jurar ante todos que acabarás con la amenaza en tres días',to:'c1_aldea',k:'main',fx:{jura:{id:'lobos',txt:'Acabar con la amenaza que diezma el ganado de Vindvik',dias:3,gl:40}}},
     {x:'Aceptar el encargo sin jurar nada',to:'c1_aldea'}]},

c1_salon_ko:{t:[
  'Fallas. Lo intentas con todas tus fuerzas y aun así fallas, delante de todo el salón. Alguien se ríe. Luego se ríe más gente.',
  'Para tu sorpresa, Hakon también se ríe. «Un draug no perdería con tanta torpeza», dice. «Estás vivo, {N}. Débil, pero vivo.» Se pone serio. «Algo se está llevando mi ganado en el Bosque Gris. Lobos, dicen, pero los lobos no llevan botas. Encárgate y quizá olvidemos este espectáculo.»'],
  fx:{fl:{salon:1,mision_lobos:1},t:1},
  c:[{x:'Jurar ante todos que acabarás con la amenaza en tres días',to:'c1_aldea',k:'main',fx:{jura:{id:'lobos',txt:'Acabar con la amenaza que diezma el ganado de Vindvik',dias:3,gl:40}}},
     {x:'Aceptar el encargo sin jurar nada',to:'c1_aldea'}]},

c1_salon_marca:{t:[
  'Abres la mano. La runa de tu palma brilla muy débilmente, como escarcha al sol. Hakon palidece. El escaldo Eyvind deja de tocar.',
  '«Eso no es cosa de draugs», dice Eyvind en voz baja. «Es una marca de las Nornas. Mi abuela hablaba de ellas.» El jarl lo mira, te mira a ti, y decide que no quiere saber nada más.',
  '«Sea lo que seas», dice al fin, «algo se está llevando mi ganado en el Bosque Gris. Si las Nornas te han devuelto, que sea para algo útil.»'],
  fx:{fl:{salon:1,mision_lobos:1,marca_jarl:1},gl:5,t:1},
  c:[{x:'Jurar ante todos que acabarás con la amenaza en tres días',to:'c1_aldea',k:'main',fx:{jura:{id:'lobos',txt:'Acabar con la amenaza que diezma el ganado de Vindvik',dias:3,gl:40}}},
     {x:'Aceptar el encargo sin jurar nada',to:'c1_aldea'}]},

/* ---------- La völva ---------- */
c1_groa:{h:'La cabaña de Groa',t:[
  'La cabaña de Groa está llena de cosas colgadas: hierbas, huesos, plumas, una piel de foca y algo que prefieres no identificar. La völva es tan vieja que parece tallada en raíz de abedul, y tiene los ojos blancos de los ciegos.',
  '«Siéntate, {N}», dice antes de que abras la boca. «Y dame la mano. La derecha.» Pasa sus dedos por la marca y aspira entre dientes. «Skuld. Te ha marcado Skuld.» Se ríe, una risa seca como hojas. «{Muchacho|Muchacha}, no sabes en qué lío te has metido.»',
  '«Los hilos de las Nornas son fuertes, pero se pueden cortar. Necesitarás algo más que un hacha.» Coge un trozo de hueso, araña en él un signo y te lo pone en la palma. «Esto es <b>Fehu</b>, la runa de la fortuna. Las runas no son letras: son puertas. Y tú acabas de aprender a llamar a una.»'],
  fx:{fl:{groa:1,mision_lobos:1},runa:'fehu',t:1},
  c:[{x:'«¿Cómo se usan las runas?»',to:'c1_groa_runas',k:'side'},
     {x:'Preguntarle por la nieve',to:'c1_groa_nieve',k:'side'},
     {x:'Volver a la aldea',to:'c1_aldea'}]},

c1_groa2:{h:'La cabaña de Groa',t:[
  'Groa remueve un caldero que huele a serbal y a algo quemado. «Vuelves», dice sin volverse. «Bien. Los que no vuelven me preocupan más.»'],
  c:[{x:'Pedirle que te enseñe otra runa',to:'c1_groa_thur',k:'main',oc:1,req:{fl:'sangre',no:'thur'}},
     {x:'Pedirle que te enseñe otra runa',to:'c1_groa_espera',k:'main',oc:1,req:{no:['sangre','thur']}},
     {x:'«Explícame otra vez cómo funcionan las runas»',to:'c1_groa_runas',k:'side'},
     {x:'Preguntarle por la nieve',to:'c1_groa_nieve',k:'side'}],
  back:'c1_aldea'},

c1_groa_espera:{t:[
  '«Otra runa», repite Groa, y chasquea la lengua. «La siguiente es Thurisaz, la espina del gigante, y esa no se aprende con palabras. Se aprende con sangre. Cuando hayas matado algo que quería matarte, vuelve y te la enseñaré.»'],
  back:'c1_groa2'},

c1_groa_runas:{t:[
  '«Escucha bien, porque no lo repetiré más que unas cuantas veces», dice Groa. «Las runas se alimentan de tu <b>Furor</b>, la rabia que arde en la sangre de los guerreros. Lo ganas golpeando, cubriéndote y, sobre todo, recibiendo golpes. Por eso los cobardes nunca aprenden runas: no aguantan lo suficiente.»',
  '«En combate solo podrás tener cuatro runas preparadas. Elige bien. Y si tu Furor llega a rebosar… entonces podrás dejarte llevar por la <b>furia berserker</b>: golpearás el doble de fuerte, pero ni te cubrirás ni podrás huir. Los berserkers ganan muchas batallas. También mueren en muchas.»',
  '<span class=tag>Prepara tus runas desde «Estado», en la pestaña «Runas».</span>'],
  back:'c1_groa2'},

c1_groa_nieve:{t:[
  'Groa se queda muy quieta. «Fimbul», dice al fin. «El Gran Invierno. Tres inviernos seguidos sin verano entre ellos, dice la profecía. Primero se rompen las familias. Luego se rompen los juramentos. Luego se rompe el cielo.»',
  '«Y en medio de todo eso, Skuld marca a {un guerrero|una guerrera} de pueblo que se moría de unas fiebres.» Vuelve la cara hacia ti, aunque no te ve. «Las Nornas no hacen nada sin motivo, {N}. Me gustaría saber cuál es el tuyo.»'],
  fx:{fl:{fimbul:1}},
  back:'c1_groa2'},

c1_groa_thur:{t:[
  'Groa huele la sangre seca en tu ropa antes de que digas nada. «Ya está», dice, satisfecha. «Ahora sabes lo que se siente cuando algo quiere tu vida y no la consigue. Eso es Thurisaz.»',
  'Te coge la mano y traza el signo sobre tu marca: una espina, un relámpago, un diente. La palma te arde un instante. «<b>Thurisaz</b>. La espina del gigante, el martillo de Thor. Úsala cuando necesites que algo deje de moverse.»'],
  fx:{fl:{thur:1},runa:'thurisaz',gl:5,t:1},
  back:'c1_groa2'},

/* ---------- El Bosque Gris ---------- */
c1_bosque:{h:'El Bosque Gris',sort:1,t:[
  'Los abetos se doblan bajo el peso de una nieve que no debería existir. El silencio es tan espeso que oyes tu propio aliento y el crujido de las plumas de Kraka cuando se acomoda en tu hombro.',
  'Hay rastros por todas partes: huellas de lobo, regueros de sangre, ramas rotas a la altura de un hombre. Kraka ladea la cabeza. «Esas ramas no las ha roto un lobo. Los lobos no son tan altos. Ni tan torpes.»'],
  c:[{x:'Seguir el rastro de sangre hasta su origen',to:'c1_cabana',k:'main',oc:1,req:{no:'cabana'},chk:{s:'ast',dc:8,ok:'c1_cabana',ko:'c1_f_emboscada',fxko:{hp:-10}}},
     {x:'Ir a la guarida de los saqueadores',to:'c1_guarida',k:'main',oc:1,req:{fl:'cabana',no:'amenaza'}},
     {x:'Cazar lobos grises por los alrededores',to:'c1_f_lobo',k:'hunt'},
     {x:'Recoger bayas de serbal bajo la nieve · 1 h',to:'c1_bosque',k:'side',fx:{item:{serbal:2},t:1}},
     {x:'Volver a Vindvik · 2 h',to:'c1_aldea',fx:{t:2}}]},

c1_f_lobo:pelea('lobo_gris','c1_lobo_muerto','c1_bosque','Un lobo gris sale de entre los abetos, flaco y con los ojos amarillos de hambre. No es el único que te observa.'),

c1_lobo_muerto:{t:[
  'El lobo cae en la nieve y se queda quieto. Por primera vez desde que despertaste, el corazón te late como debe: fuerte, rápido, vivo.',
  '«No ha estado mal», concede Kraka. «Para alguien que ayer no podía levantarse a mear.»'],
  fx:{fl:{sangre:1}},
  c:[{x:'Volver al bosque',to:'c1_bosque'}]},

c1_f_emboscada:pelea('lobo_gris','c1_cabana','c1_bosque','Pierdes el rastro entre los abetos y, mientras buscas, algo te muerde la pierna. Un lobo, y luego otro aullido detrás.'),

c1_cabana:{h:'La cabaña del cazador',t:[
  'El rastro termina en una cabaña de troncos medio enterrada en la nieve. La puerta está arrancada. Dentro, entre pieles desordenadas, yace el viejo Tore, el cazador que surtía de pieles a medio Vindvik.',
  'No lo han matado los lobos. Tiene un tajo de hacha en el cuello, limpio y profesional. Fuera, las huellas de lobo y las de botas se mezclan como si caminaran juntas.',
  'Kraka se eriza. «Lobos que caminan con hombres. Esto no me gusta nada.» Entonces se oye una rama partirse a tu espalda.'],
  fx:{fl:{cabana:1,sangre:1},t:1},
  c:[{x:'Darte la vuelta con el hacha en alto',to:'c1_f_saqueador'}]},

c1_f_saqueador:pelea('saqueador','c1_saq_tras','c1_bosque','Un hombre con pieles de lobo y la cara pintada de ceniza sale de entre los árboles con una lanza. «El Tuerto dijo que nadie debía encontrar al viejo», gruñe.'),

c1_saq_tras:{t:[
  'El saqueador se arrastra por la nieve, sangrando. Antes de morir, se ríe. «Grim… el Tuerto… tiene la piedra. Los lobos le obedecen. Os comerán a todos… y luego vendrá el invierno de verdad.»',
  'En su cinturón llevaba una bolsa de cuero. Dentro hay unas monedas de plata y una piedra negra, plana, con una runa grabada que te hace doler la marca de la mano solo con mirarla.',
  '«Una piedra de mando», dice Kraka en voz baja. «Magia de esclavizar. La guarida estará en el barranco del norte: los cobardes siempre se esconden en barrancos.»'],
  fx:{item:{piedra_lobos:1},plata:10,saga:'Descubrió que unos saqueadores usaban magia rúnica para guiar a los lobos contra Vindvik.'},
  c:[{x:'Ir hacia el barranco del norte · 1 h',to:'c1_guarida',k:'main',fx:{t:1}},
     {x:'Volver primero al bosque',to:'c1_bosque'}]},

c1_guarida:{h:'El barranco del norte',cp:1,t:[
  'El barranco es una herida en la montaña, con una cueva al fondo y huesos de vaca esparcidos por la nieve. Junto a una hoguera, un hombre enorme con un parche de cuero en el ojo afila una espada. Grim el Tuerto.',
  'A su lado, atado con una cadena que brilla con runas, hay un lobo. Pero no es un lobo cualquiera: es casi tan grande como un caballo, de pelaje gris ceniza, y tiene los ojos cansados de quien obedece sin querer.',
  'La piedra de tu bolsa pesa más que antes. Tu marca palpita.'],
  c:[{x:'Atacar a Grim de frente',to:'c1_f_grim',k:'hunt'},
     {x:'Usar la piedra para romper el hechizo que esclaviza al lobo',to:'c1_lobo_libre',k:'main',req:{item:'piedra_lobos'},chk:{s:'esp',dc:9,ok:'c1_lobo_libre',ko:'c1_hechizo_falla',fxko:{hp:-8}}}]},

c1_hechizo_falla:{t:[
  'Aprietas la piedra en tu mano marcada e intentas romper el hechizo. Algo se rompe, sí, pero no del todo: la cadena se suelta, el lobo aúlla de rabia y Grim se levanta de un salto con la espada en la mano.',
  '«¡Has soltado a Ceniza, imbécil!», ruge. «Primero te mato a ti y luego lo vuelvo a atar.»'],
  c:[{x:'Enfrentarte a Grim',to:'c1_f_grim'}]},

c1_f_grim:{t:['Grim el Tuerto se pone en pie y escupe a la nieve. «Otro héroe. Mis lobos están hartos de comer vacas.»'],f:{e:'grim',win:'c1_grim_cae',lose:'muerte'}},

c1_grim_cae:{t:[
  'Grim cae de rodillas. Con su último aliento suelta la cadena del lobo y grita una palabra en una lengua que te araña los oídos.',
  'El gran lobo gris se vuelve hacia ti. No hay odio en sus ojos, solo la orden. Respiras hondo y te secas la sangre de la cara.'],
  fx:{hp:15},
  c:[{x:'Prepararte para la última pelea',to:'c1_f_ceniza'}]},

c1_f_ceniza:{t:['El Lobo Ceniza se lanza contra ti, y el barranco entero tiembla con su gruñido.'],f:{e:'ceniza',win:'c1_victoria',lose:'muerte'}},

c1_victoria:{h:'El silencio del barranco',t:[
  'El Lobo Ceniza se tumba en la nieve, despacio, como un perro viejo junto al fuego. Te mira una última vez y cierra los ojos. Por un instante te parece que hay alivio en ellos.',
  'Kraka baja de una rama. Por una vez, no hace ningún chiste. «Buen trabajo», dice al fin. «Las valquirias lo han visto. Yo también.»',
  'Recoges lo que queda en la guarida y emprendes el regreso. Vindvik dormirá tranquila esta noche.'],
  fx:{fl:{amenaza:1,sangre:1},cumple:'lobos',gl:15,saga:'Mató a Grim el Tuerto y al gran Lobo Ceniza en el barranco del norte.'},
  c:[{x:'Volver a Vindvik · 3 h',to:'c1_aldea',k:'main',fx:{t:3}}]},

c1_lobo_libre:{h:'El lobo liberado',t:[
  'Cierras el puño sobre la piedra y dejas que tu marca hable. La piedra se raja con un chasquido de hielo. La cadena de runas se apaga.',
  'El Lobo Ceniza se queda quieto un instante, como quien despierta de una pesadilla. Luego se vuelve hacia Grim. El Tuerto apenas tiene tiempo de gritar.',
  'Cuando termina, el lobo te mira desde el otro lado de la hoguera. Inclina la cabeza, una sola vez, y desaparece entre los abetos sin hacer ruido. Kraka suelta el aire que no sabía que estaba conteniendo. «Eso», dice, «no lo había visto nunca. Y he visto muchas cosas.»'],
  fx:{fl:{amenaza:1,sangre:1,lobo_libre:1},quita:{piedra_lobos:1},item:{espada_grim:1},plata:40,cumple:'lobos',gl:30,saga:'Rompió el hechizo que esclavizaba al Lobo Ceniza y lo dejó libre. El lobo hizo justicia con su amo.'},
  c:[{x:'Volver a Vindvik · 3 h',to:'c1_aldea',k:'main',fx:{t:3}}]},

/* ---------- Final de la Parte 1 ---------- */
c1_salon_noche:{h:'Un sitio en la mesa',cp:1,t:[
  'Esa noche, el salón de Hakon está lleno hasta las vigas. Cuando entras, se hace el silencio. Luego alguien golpea la mesa con el cuerno, y otro, y otro, hasta que el salón entero retumba.',
  'Hakon te señala un sitio a su derecha. «Siéntate, {N}. Has hecho más en dos días que mis guerreros en todo el verano.» Eyvind el escaldo ya está componiendo versos sobre ti; algunos son verdad y otros mejoran mucho la verdad.',
  '«Dentro de tres noches celebraremos el banquete de Yule, aunque sea verano», anuncia el jarl. «Si el invierno ha venido antes, que venga antes también la fiesta.» El salón ruge de aprobación.',
  'Entonces Kraka te tira de la oreja con el pico. Por la puerta abierta se ven las colinas de los túmulos, donde descansan los reyes antiguos. Están brillando con una luz azul y fría. «Eso, {N}», susurra el cuervo, «no es una aurora.»'],
  fx:{fl:{salon_noche:1},gl:10,saga:'El jarl Hakon le dio un sitio a su derecha en el salón de Vindvik.'},
  c:[{x:'Mirar las colinas',to:'c1_colinas',k:'main'}]}

}});
})();
