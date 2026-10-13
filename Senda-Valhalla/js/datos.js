/* =====================================================================
   La Senda al Valhalla · Datos
   Protagonistas, atributos, rangos de Gloria, runas, favores de los
   dioses, objetos, enemigos, tiendas, forja y caldero.
   Los capítulos pueden ampliar estas tablas con Object.assign / push.
   ===================================================================== */

/* ---------- Protagonistas ---------- */
const PROTAS={
  h:{nom:'Ulf',d:'Guerrero de Vindvik, curtido en tres incursiones. Más fuerte que astuto.',st:{fue:4,ast:3,esp:2,sue:3}},
  m:{nom:'Astrid',d:'Escudera de Vindvik, curtida en tres incursiones. Más astuta que fuerte.',st:{fue:3,ast:4,esp:3,sue:2}}
};

/* ---------- Atributos y rangos ---------- */
const NM={fue:'Fuerza',ast:'Astucia',esp:'Espíritu',sue:'Suerte'};
const RANGOS=[
  {n:'Bóndi',gl:0},          // granjero libre
  {n:'Drengr',gl:100},        // guerrero de honor
  {n:'Hersir',gl:350},       // caudillo
  {n:'Jarl',gl:800},
  {n:'Campeón',gl:1400},     // campeón de los dioses
  {n:'Elegid{o|a}',gl:2400}   // digno del Valhalla
];

/* ---------- Runas: las 24 del Futhark antiguo en sus tres ættir ----------
   Campos de efecto (combinables):
   dmg:[a,b] daño + Atributo×2 · cura:[a,b] · esc:n golpes con escudo (-60 %)
   aturde:1 el enemigo pierde su turno · critSig:1 próximo golpe crítico
   crit:1 este golpe es crítico · esq:n esquivas aseguradas · quema:1 arde 3 turnos
   roba:1 cura lo que daña · regen:[a,b] cura 3 turnos · fu:n gana Furor
   desesp:1 más daño cuanta menos Vida · azar:1 daño ×0,5 / ×1 / ×2            */
const AETT=['Ætt de Freyr','Ætt de Hagal','Ætt de Tyr'];
const RUNAS={
  // Ætt de Freyr (Capítulo 1)
  fehu:    {n:'Fehu',sym:'ᚠ',a:0,c:6, critSig:1,d:'Fortuna. Tu próximo golpe será crítico.'},
  uruz:    {n:'Uruz',sym:'ᚢ',a:0,c:12,cura:[14,20],d:'La fuerza del uro. Te cura.'},
  thurisaz:{n:'Thurisaz',sym:'ᚦ',a:0,c:10,dmg:[14,22],s:'fue',d:'La espina del gigante. Un golpe de rayo.'},
  ansuz:   {n:'Ansuz',sym:'ᚨ',a:0,c:16,aturde:1,d:'La palabra de Odín. El enemigo pierde su turno.'},
  raidho:  {n:'Raidho',sym:'ᚱ',a:0,c:8, esq:1,d:'El camino. Esquivas el siguiente ataque.'},
  kenaz:   {n:'Kenaz',sym:'ᚲ',a:0,c:10,dmg:[6,10],s:'esp',quema:1,d:'La antorcha. Prende fuego al enemigo.'},
  gebo:    {n:'Gebo',sym:'ᚷ',a:0,c:12,dmg:[10,14],s:'esp',roba:1,d:'El regalo. Lo que quitas, lo recibes.'},
  wunjo:   {n:'Wunjo',sym:'ᚹ',a:0,c:0, fu:15,cura:[5,7],d:'El júbilo. Recuperas ánimo y algo de Vida.'},
  // Ætt de Hagal (Capítulo 2)
  hagalaz: {n:'Hagalaz',sym:'ᚺ',a:1,c:18,dmg:[24,34],s:'fue',d:'El granizo. Daño devastador.'},
  nauthiz: {n:'Nauthiz',sym:'ᚾ',a:1,c:14,dmg:[16,24],s:'fue',desesp:1,d:'La necesidad. Más daño cuanto más herid{o|a} estés.'},
  isa:     {n:'Isa',sym:'ᛁ',a:1,c:14,dmg:[6,10],s:'esp',aturde:1,d:'El hielo. Congela al enemigo un turno.'},
  jera:    {n:'Jera',sym:'ᛃ',a:1,c:14,regen:[8,10],d:'La cosecha. Te cura durante 3 turnos.'},
  eihwaz:  {n:'Eihwaz',sym:'ᛇ',a:1,c:10,esc:2,d:'El tejo. Escudo contra 2 golpes.'},
  perthro: {n:'Perthro',sym:'ᛈ',a:1,c:12,dmg:[20,30],s:'sue',azar:1,d:'El cubilete del destino. Daño al azar.'},
  algiz:   {n:'Algiz',sym:'ᛉ',a:1,c:16,esc:4,d:'El alce. Escudo contra 4 golpes.'},
  sowilo:  {n:'Sowilo',sym:'ᛊ',a:1,c:20,cura:[30,40],d:'El sol. Curación poderosa.'},
  // Ætt de Tyr (Capítulo 3)
  tiwaz:   {n:'Tiwaz',sym:'ᛏ',a:2,c:20,dmg:[26,36],s:'fue',crit:1,d:'La lanza de Tyr. Siempre crítico.'},
  berkano: {n:'Berkano',sym:'ᛒ',a:2,c:16,regen:[12,15],d:'El abedul. Gran regeneración.'},
  ehwaz:   {n:'Ehwaz',sym:'ᛖ',a:2,c:12,esq:2,d:'El caballo. Esquivas 2 ataques.'},
  mannaz:  {n:'Mannaz',sym:'ᛗ',a:2,c:18,dmg:[20,28],s:'esp',roba:1,d:'La humanidad. Daño que te cura.'},
  laguz:   {n:'Laguz',sym:'ᛚ',a:2,c:20,dmg:[14,20],s:'esp',aturde:1,d:'El agua. Arrastra y aturde.'},
  ingwaz:  {n:'Ingwaz',sym:'ᛜ',a:2,c:0, fu:30,d:'La semilla. Gran ganancia de Furor.'},
  dagaz:   {n:'Dagaz',sym:'ᛞ',a:2,c:30,dmg:[40,55],s:'fue',d:'El amanecer. El golpe definitivo.'},
  othala:  {n:'Othala',sym:'ᛟ',a:2,c:24,esc:3,cura:[20,26],d:'La herencia. Escudo y curación.'}
};
const MAX_RUNAS=4;

/* ---------- Favores de los dioses ---------- */
const FAV={
  tyr:    {n:'Favor de Tyr',d:'+25 % de Gloria en cada victoria.'},
  thor:   {n:'Favor de Thor',d:'+5 de ataque.',atq:5},
  odin:   {n:'Favor de Odín',d:'+1 en todas las tiradas de dados.'},
  freya:  {n:'Favor de Freya',d:'Tus curaciones sanan un 25 % más.'},
  heimdal:{n:'Favor de Heimdal',d:'+10 de velocidad (esquivas más).',vel:10},
  skadi:  {n:'Favor de Skadi',d:'Doble probabilidad de botín.'},
  loki:   {n:'Favor de Loki',d:'+15 % de crítico, pero las victorias dan un 20 % menos de Gloria.',crit:15}
};

/* ---------- Objetos ----------
   tipo: arma | escudo | armadura | consumible | material | piedra | clave
   arma/escudo/armadura: atq, def (%), arm, crit (%), vel · consumible: ef:{hp,fu} */
const OBJ={
  // Equipo
  hacha_vieja:{n:'Hacha de tu padre',tipo:'arma',atq:4,crit:5,pr:20,d:'Mellada, pesada y fiel.'},
  hacha_barbada:{n:'Hacha barbada',tipo:'arma',atq:9,crit:8,pr:140,d:'Su hoja curva engancha escudos.'},
  espada_grim:{n:'Espada de Grim',tipo:'arma',atq:8,crit:10,pr:120,d:'Una buena espada en malas manos. Hasta ahora.'},
  escudo_tablas:{n:'Escudo de tablas',tipo:'escudo',def:6,arm:2,vel:-1,pr:30,d:'Tilo pintado. Aguanta lo justo.'},
  escudo_hierro:{n:'Escudo con umbo de hierro',tipo:'escudo',def:10,arm:3,vel:-2,pr:110,d:'El umbo desvía hasta un hachazo.'},
  jubon_cuero:{n:'Jubón de cuero',tipo:'armadura',def:5,arm:2,vel:1,pr:40,d:'Cuero hervido en cera.'},
  cota_anillas:{n:'Cota de anillas',tipo:'armadura',def:10,arm:5,vel:-3,pr:220,d:'Miles de anillos remachados a mano.'},
  manto_lobo:{n:'Manto del Lobo Ceniza',tipo:'armadura',def:8,arm:3,vel:3,crit:5,pr:200,d:'Huele a bosque y a victoria.'},
  // Consumibles
  unguento:{n:'Ungüento de Groa',tipo:'consumible',ef:{hp:30},pr:12,d:'Recupera 30 de Vida.'},
  carne_seca:{n:'Carne seca',tipo:'consumible',ef:{hp:15},pr:5,d:'Recupera 15 de Vida.'},
  hidromiel:{n:'Cuerno de hidromiel',tipo:'consumible',ef:{fu:30},pr:15,d:'Un trago de valor: +30 Furor.'},
  pocion_serbal:{n:'Tónico de serbal',tipo:'consumible',ef:{hp:45},pr:25,d:'Recupera 45 de Vida.'},
  // Materiales
  serbal:{n:'Bayas de serbal',tipo:'material',pr:3,d:'Rojas y amargas. Protegen de la magia, dicen.'},
  miel:{n:'Panal de miel',tipo:'material',pr:6,d:'Para hidromiel, si sabes hacerlo.'},
  piel_lobo:{n:'Piel de lobo',tipo:'material',pr:8,d:'Abrigo, moneda o ambas cosas.'},
  colmillo:{n:'Colmillo de lobo',tipo:'material',pr:6,d:'Las völvas los usan en sus amuletos.'},
  hierro_pantano:{n:'Hierro de pantano',tipo:'material',pr:10,d:'Mineral rojizo sacado de las turberas.'},
  piel_ceniza:{n:'Piel del Lobo Ceniza',tipo:'material',pr:60,d:'Gris como el humo y suave como la nieve.'},
  // Objetos clave
  amuleto_siri:{n:'Amuleto de Siri',tipo:'clave',d:'Una piedra con un agujero, colgada de un cordel. Da suerte.'},
  piedra_lobos:{n:'Piedra rúnica de los lobos',tipo:'clave',d:'Una piedra negra con una runa que obliga a los lobos.'}
};
/* Piedras rúnicas: enseñan una runa al usarlas desde Estado */
for(const k in RUNAS){const r=RUNAS[k];
  OBJ['piedra_'+k]={n:`Piedra rúnica: ${r.sym} ${r.n}`,tipo:'piedra',runa:k,pr:[60,180,450][r.a],d:'Enseña la runa '+r.n+'.'}}
const EQT=['arma','escudo','armadura'];
const SLOT={arma:'arma',escudo:'esc',armadura:'arm'};

/* ---------- Enemigos ----------
   hp, a (ataque), gl (Gloria), o (plata), l (botín: n<1 probabilidad, n≥1 cantidad) */
const ENEMIGOS={
  lobo_gris:{n:'Lobo gris',cat:'Bestia',hp:34,a:7,gl:6,o:0,l:{piel_lobo:.5,colmillo:.4}},
  saqueador:{n:'Saqueador',cat:'Forajido',hp:48,a:9,gl:12,o:14,l:{carne_seca:.5,hierro_pantano:.4}},
  grim:{n:'Grim el Tuerto',cat:'Jefe de saqueadores',hp:70,a:10,gl:30,o:40,l:{espada_grim:1}},
  ceniza:{n:'Lobo Ceniza',cat:'Bestia antigua',hp:85,a:11,gl:40,o:0,l:{piel_ceniza:1}},
  // Para próximas partes
  draug:{n:'Draug',cat:'No muerto',hp:70,a:12,gl:25,o:10,l:{hierro_pantano:.5}},
  oso:{n:'Oso pardo',cat:'Bestia',hp:90,a:13,gl:28,o:0,l:{carne_seca:1}}
};

/* ---------- Tiendas, forja y caldero ---------- */
const TIENDAS={
  hild:{n:'Puesto de la vieja Hild · «Si no lo tengo, no lo necesitas.»',stock:['unguento','carne_seca','hidromiel','escudo_tablas','jubon_cuero']}
};
const FORJA=[
  {r:'hacha_barbada',mat:{hierro_pantano:3},plata:60},
  {r:'escudo_hierro',mat:{hierro_pantano:3},plata:50},
  {r:'cota_anillas',mat:{hierro_pantano:6},plata:120},
  {r:'manto_lobo',mat:{piel_ceniza:1,piel_lobo:2},plata:40}
];
const CALDERO=[
  {c:'Remedios',r:'unguento',ing:{serbal:2,colmillo:1}},
  {c:'Remedios',r:'pocion_serbal',ing:{serbal:4,miel:1}},
  {c:'Bebidas',r:'hidromiel',ing:{miel:2}}
];

/* ---------- Runas grabadas en el arma (forja de Brok, Capítulo 2) ----------
   atq, crit, def, arm, vel, am: bonificaciones fijas
   aturde / quema: % de probabilidad por golpe · roba: % del daño del golpe que te cura
   fuG: Furor extra por golpe · curaV: Vida que recuperas al ganar un combate */
const GRABADO={
  fehu:{crit:8,d:'+8 % de crítico.'},
  uruz:{curaV:15,d:'Recuperas 15 de Vida al ganar un combate.'},
  thurisaz:{atq:5,d:'+5 de ataque.'},
  ansuz:{aturde:10,d:'10 % de aturdir al golpear.'},
  raidho:{vel:6,d:'+6 de velocidad.'},
  kenaz:{quema:20,d:'20 % de prender fuego al golpear.'},
  gebo:{roba:15,d:'Cada golpe te cura un 15 % del daño.'},
  wunjo:{fuG:5,d:'+5 de Furor extra por golpe.'},
  hagalaz:{atq:8,d:'+8 de ataque.'},
  nauthiz:{atq:4,crit:6,d:'+4 de ataque y +6 % de crítico.'},
  isa:{aturde:15,d:'15 % de congelar al enemigo al golpear.'},
  jera:{curaV:25,d:'Recuperas 25 de Vida al ganar un combate.'},
  eihwaz:{def:6,arm:1,d:'+6 % de defensa y +1 de armadura.'},
  perthro:{crit:12,d:'+12 % de crítico.'},
  algiz:{def:8,arm:2,d:'+8 % de defensa y +2 de armadura.'},
  sowilo:{am:10,curaV:10,d:'+10 contra no muertos y 10 de Vida al vencer.'},
  tiwaz:{atq:6,crit:6,d:'+6 de ataque y +6 % de crítico.'},
  berkano:{roba:10,curaV:15,d:'Roba un 10 % de vida y recuperas 15 al vencer.'},
  ehwaz:{vel:10,d:'+10 de velocidad.'},
  mannaz:{roba:25,d:'Cada golpe te cura un 25 % del daño.'},
  laguz:{aturde:20,d:'20 % de aturdir al golpear.'},
  ingwaz:{fuG:8,d:'+8 de Furor extra por golpe.'},
  dagaz:{atq:12,d:'+12 de ataque.'},
  othala:{def:6,arm:3,curaV:10,d:'+6 % de defensa, +3 de armadura y 10 de Vida al vencer.'}
};
