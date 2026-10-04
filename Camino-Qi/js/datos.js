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
const ALQ=[{r:'pildora_qi',ing:{hierba_qi:2}},{r:'pildora_salud',ing:{hierba_qi:1,lirio_fuego:1}}];
