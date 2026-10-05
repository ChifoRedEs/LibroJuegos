/* Capítulo 1 · Mejoras de hub: conecta caza, socializar y armería con el Patio Central. Cargar el último. */
const baseP=SC.patio.c.filter(c=>!['jardines','bosque','barracones'].includes(c.to));
registrarCapitulo({temporada:1,n:1,parte:'hub',titulo:'Hub',escenas:{
 patio:{...SC.patio,c:[...baseP.slice(0,-2),
  {x:'Zonas de caza y entrenamiento',to:'cazar',k:'hunt'},
  {x:'Socializar: alumnos, maestros y ciudad',to:'socializar',k:'social'},
  {x:'Armería del maestro Bao',to:'armeria',k:'shop'},
  ...baseP.slice(-2)]},
 armeria:{h:'Armería',t:['De las vigas cuelgan espadas, hachas, martillos, lanzas y escudos. Bao, el armero, golpea un yelmo abollado con cariño. «Todo funciona. Algunas cosas, incluso a propósito.»'],shop:'armeria',back:'patio'}}});
