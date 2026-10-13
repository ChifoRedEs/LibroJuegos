/* Capítulo 1 · Hub final: agrupa y ordena el Patio Central, y activa comedor y tablón rotativos. Cargar el último. */
const baseP=SC.patio.c.filter(c=>!['jardines','bosque','barracones'].includes(c.to));
registrarCapitulo({temporada:1,n:1,parte:'hub',titulo:'Hub',escenas:{
 patio:{...SC.patio,sort:1,c:[...baseP,
  {x:'Zonas de caza y entrenamiento',to:'cazar',k:'hunt'},
  {x:'Socializar: alumnos, maestros y ciudad',to:'socializar',k:'social'},
  {x:'Armería del maestro Bao',to:'armeria',k:'shop'},
  {x:'Salón de Técnicas del Maestro Yun',to:'salon_tecnicas',k:'shop'}]},
 armeria:{h:'Armería',t:['De las vigas cuelgan espadas, hachas, martillos, lanzas y escudos. Bao, el armero, golpea un yelmo abollado con cariño. «Todo funciona. Algunas cosas, incluso a propósito.»'],shop:'armeria',back:'patio'},
 salon_tecnicas:{h:'Salón de Técnicas',t:['Estantes de pergaminos que huelen a incienso y a deudas antiguas. El Maestro Yun, un anciano diminuto, te mira por encima de sus lentes. «Cada técnica es una promesa. Algunas, también, una amenaza.»'],shop:'tecnicas',back:'patio'},
 comedor:{gen:'comedor',gt:['comedor','lin_rumores','patio']},
 tablon:{gen:'tablon',gt:['fragua','ms_ok','ms_ko','patio']}}});
