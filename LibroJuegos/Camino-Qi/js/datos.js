/* Datos del mundo: se amplían sin tocar el motor */
const NM={cu:'Cuerpo',es:'Espíritu',me:'Mente',su:'Suerte'};
const REINOS=[{n:'Condensación de Qi',xp:0},{n:'Espiritual de Qi',xp:150},{n:'Celestial de Qi',xp:500},{n:'Dios Marcial',xp:1500}];
const RANGOS=['Aspirante','Discípulo Común','Maestro Común','Maestro Anciano','Líder Supremo'];
const TECNICAS={
 golpe:{n:'Puño del Monte',c:0,d:[6,10],s:'cu'},
 palma:{n:'Palma de Jade',c:6,d:[12,18],s:'es'},
 corte:{n:'Corte de Luna Fría',c:10,d:[20,28],s:'me'}};
const OBJ={
 hierba_qi:{n:'Hierba de Qi Menor',tipo:'material',pr:8,d:'Emana una ligera energía verde.'},
 lirio_fuego:{n:'Lirio de Llama',tipo:'material',pr:20,d:'Crece cerca de volcanes.'},
 mineral_hierro:{n:'Mineral de Hierro Frío',tipo:'material',pr:15,d:'Para forja y mejoras.'},
 cuero:{n:'Cuero Curtido',tipo:'material',pr:10,d:'Para armaduras ligeras.'},
 pildora_qi:{n:'Píldora de Concentración',tipo:'consumible',pr:30,d:'Restaura 20 de Qi.',ef:{qi:20}},
 pildora_salud:{n:'Píldora de Sangre',tipo:'consumible',pr:40,d:'Restaura 60 de Vida.',ef:{hp:60}},
 espada_madera:{n:'Espada de Bambú',tipo:'arma',atq:5,pr:20,d:'Ataque +5. Dentro vive alguien muy hablador.'},
 espada_acero:{n:'Espada de Acero Frío',tipo:'arma',atq:15,pr:120,d:'Ataque +15.'},
 tunica_cuero:{n:'Túnica de Cuero',tipo:'armadura',def:4,pr:60,d:'Defensa +4.'},
 tunica_seda:{n:'Túnica de Seda Espiritual',tipo:'armadura',def:8,pr:150,d:'Defensa +8.'},
 medalla:{n:'Medalla del Maestro',tipo:'clave',pr:0,d:'Prueba de que superaste el enigma.'}};
const ENEMIGOS={
 maton:{n:'Matón de la Calle',hp:30,a:5,xp:15,o:8,l:{hierba_qi:1}},
 rata:{n:'Rata Busca-Tesoros',hp:25,a:4,xp:12,o:5,l:{hierba_qi:1}},
 mono:{n:'Mono Ladrón de Píldoras',hp:40,a:7,xp:20,o:10,l:{pildora_salud:1}},
 lobo:{n:'Lobo de Ojos Rojos',hp:55,a:10,xp:30,o:12,l:{lirio_fuego:1,cuero:1}},
 bandido:{n:'Bandido del Camino',hp:65,a:12,xp:35,o:30,l:{mineral_hierro:1,pildora_salud:1}},
 wang:{n:'Wang, Discípulo Arrogante',hp:80,a:13,xp:50,o:40,l:{pildora_qi:1,pildora_salud:1}}};
const TIENDAS={botica:{n:'Mercader Gong Gong · «¡Precios justos, es decir, míos!»',stock:['pildora_salud','pildora_qi','hierba_qi','lirio_fuego','mineral_hierro','cuero','espada_madera']}};
const FORJA=[{r:'espada_acero',mat:{mineral_hierro:3},oro:60},{r:'tunica_cuero',mat:{cuero:3},oro:30}];

Object.assign(TECNICAS,{
 vendaval:{n:'Danza del Bambú',c:7,d:[14,22],s:'cu'},
 aliento:{n:'Aliento del Dragón',c:8,d:[18,26],s:'es'}});
const M=(n,pr,d)=>({n,tipo:'material',pr,d}),P=(n,pr,d,ef)=>({n,tipo:'consumible',pr,d,ef});
Object.assign(OBJ,{
 ginseng_sangre:M('Ginseng de Sangre',25,'Raíz roja que late sola.'),
 raiz_dragon:M('Raíz de Dragón Dormido',45,'Rara. Huele a trueno antiguo.'),
 hongo_niebla:M('Hongo de la Niebla',18,'Brota en los valles húmedos.'),
 musgo_trueno:M('Musgo del Trueno',14,'Chispea al tocarlo.'),
 flor_loto_lunar:M('Flor de Loto Lunar',35,'Solo abre bajo la luna.'),
 jade_bruto:M('Jade en Bruto',30,'Piedra con Qi dormido.'),
 jade_azul:M('Jade Azul Puro',90,'Muy rico en Qi.'),
 polvo_jade:M('Polvo de Jade',22,'Jade molido para elixires.'),
 cinabrio:M('Cinabrio Rojo',28,'Mineral de alquimia.'),
 cristal_frio:M('Cristal de Escarcha',32,'Frío que no se derrite.'),
 pildora_vigor:P('Píldora de Vigor',120,'+1 Cuerpo permanente.',{st:{cu:1}}),
 pildora_mente:P('Píldora de Claridad',120,'+1 Mente permanente.',{st:{me:1}}),
 pildora_suerte:P('Píldora del Azar',120,'+1 Suerte permanente.',{st:{su:1}}),
 pildora_nucleo:P('Píldora del Núcleo',220,'+20 Vida y +10 Qi máximos.',{mhp:20,mqi:10}),
 elixir_vida:P('Elixir de Vida',90,'Restaura 150 de Vida.',{hp:150}),
 elixir_qi:P('Elixir de Qi Puro',70,'Restaura 50 de Qi.',{qi:50}),
 elixir_cultivo:P('Elixir de Cultivo',150,'+60 de experiencia.',{xp:60})});
TIENDAS.herbolario={n:'Viejo Mu, herbolario · «Las plantas no mienten; yo sí, pero poco.»',stock:['hierba_qi','lirio_fuego','musgo_trueno','hongo_niebla','ginseng_sangre','polvo_jade','cinabrio','pildora_salud']};
const AL=(r,c,ing)=>({r,c,ing});
const ALQ=[AL('pildora_qi','Píldoras',{hierba_qi:2}),AL('pildora_salud','Píldoras',{hierba_qi:1,lirio_fuego:1}),
 AL('pildora_vigor','Píldoras',{ginseng_sangre:2,raiz_dragon:1}),AL('pildora_mente','Píldoras',{flor_loto_lunar:2,hongo_niebla:1}),
 AL('pildora_suerte','Píldoras',{musgo_trueno:2,polvo_jade:1}),AL('pildora_nucleo','Píldoras',{jade_azul:1,raiz_dragon:2,cinabrio:1}),
 AL('elixir_vida','Elixires',{ginseng_sangre:1,lirio_fuego:2,cristal_frio:1}),AL('elixir_qi','Elixires',{hierba_qi:3,polvo_jade:1}),
 AL('elixir_cultivo','Elixires',{flor_loto_lunar:1,jade_azul:1,hongo_niebla:2}),AL('polvo_jade','Refinados',{jade_bruto:1})];
Object.assign(ENEMIGOS.rata.l,{musgo_trueno:.3});Object.assign(ENEMIGOS.mono.l,{hongo_niebla:.4});
Object.assign(ENEMIGOS.lobo.l,{raiz_dragon:.3,ginseng_sangre:.3});Object.assign(ENEMIGOS.bandido.l,{jade_bruto:.5,cristal_frio:.3,cinabrio:.3});
Object.assign(ENEMIGOS.wang.l,{jade_azul:.5,flor_loto_lunar:.4});
