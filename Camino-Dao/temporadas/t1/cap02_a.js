/* Temporada 1 · Capítulo 2 · «Hornos y Rencores» · PARTE A · «El Horno Encendido»
   Se carga DESPUÉS de cap01_mejoras.js. Conecta con el final del Capítulo 1 (fin1) y amplía el Patio. */
const mision1=window.mision;
window.mision=function(){if(S.fl.c2){
 if(!S.fl.c2_aprendiz)return 'Aprende los tres fundamentos de la alquimia con el Maestro Hu, en el Horno.';
 if(!S.fl.c2_wang_fin)return 'Wang vende «píldoras milagrosas» en el patio: averigua qué hay de cierto.';
 if(!S.fl.c2_ye_fin)return 'Ye Shan te espera junto a su caldero: te ha retado.';
 if(!S.fl.c2_a_fin)return 'El Maestro Hu pide verte con urgencia: algo ha pasado en el Horno.';
 return 'Parte A completada. La Parte B, «Rencores», continuará la historia.'}return mision1()};
OBJ.elixir_llama={n:'Elixir de Llama Serena',tipo:'consumible',pr:110,d:'+40 Vida y +40 Qi.',ef:{hp:40,qi:40}};
ALQ.push(AL('elixir_llama','Elixires',{lirio_fuego:2,polvo_jade:1,hierba_qi:2}));
GEN.c2_inicio=()=>{if(!S.fin.includes('Capítulo 1 completado'))S.fin.push('Capítulo 1 completado');
 return{h:'Capítulo 2 · Hornos y Rencores',cp:1,fx:{fl:{c2:true}},t:[
  'El verano llega al Dragón Azur como un ladrón con tambor: sin avisar y sin discreción. El aire huele a piedra caliente y a sopa recalentada. Las cigarras cantan tan alto que algunos aspirantes empiezan a creer que son profecías.',
  '«Qué calor, muchacho —se queja el Abuelo Pei desde tu cinto—. Y yo, que ni cuerpo tengo para sudar. Es una injusticia del cielo.»',
  'En la puerta de tu dormitorio, un criado jadeante te tiende un pergamino con un sello de ceniza. «De parte del Maestro Hu. Dice que vayas al Horno. Dice que no corras, pero que no tardes.»'],
  c:[{x:'Ir al Horno de Alquimia',to:'c2_horno',k:'main',fx:{t:1}}]}};
const P2=SC.patio.c;
registrarCapitulo({temporada:1,n:2,parte:'A',titulo:'Hornos y Rencores',escenas:{
 fin1:{...SC.fin1,end:undefined,c:[{x:'Continuar: llega el verano · Capítulo 2',to:'c2_inicio',k:'main'}]},
 c2_inicio:{gen:'c2_inicio',gt:['c2_horno']},
 patio:{...SC.patio,c:[...P2,
  {x:'Maestro Hu: continuar tus lecciones en el Horno',to:'c2_horno',req:{fl:'c2',no:'c2_aprendiz'},oc:1,k:'main'},
  {x:'Puesto de «píldoras milagrosas» de Wang',to:'c2_wang_pildoras',req:{fl:'c2_aprendiz',no:'c2_wang_fin'},oc:1,k:'main'},
  {x:'Ye Shan te espera junto a su caldero',to:'c2_ye',req:{fl:'c2_wang_fin',no:'c2_ye_fin'},oc:1,k:'main'},
  {x:'El Maestro Hu pide verte con urgencia',to:'c2_cierre',req:{fl:'c2_ye_fin',no:'c2_a_fin'},oc:1,k:'main'},
  {x:'Enigma del Maestro Hu',to:'c2_hu_enigma',req:{fl:'c2_aprendiz'},oc:1,k:'side'},
  {x:'Enigma de la aprendiz Xiao Mei',to:'c2_mei_enigma',req:{fl:'meiConocida'},oc:1,k:'side'}]},
 c2_horno:{h:'El Horno del Maestro Hu',t:['El Horno es una caverna de ladrillo rojo donde diez calderos bufan como bestias dormidas. El Maestro Hu, con la barba más chamuscada que la semana pasada, te recibe con un cucharón en una mano y una lista en la otra.','«A fin de verano se celebra el Concurso del Horno, entre todas las sectas de la comarca. El Dragón Azur necesita representantes. Y yo necesito a alguien con buena nariz y mala memoria para los errores ajenos.»','«La nariz es del chico —apunta el Abuelo Pei—. Las manos, de la providencia.»'],
  c:[{x:'Aceptar con entusiasmo · +5 XP',to:'c2_l1',fx:{xp:5,t:1}},{x:'Aceptar con sarcasmo («¿Y la paga?») · +20 monedas',to:'c2_l1',fx:{oro:20,t:1,fl:{huSarcasmo:true}}},{x:'Aceptar en silencio, mirando los calderos con respeto',to:'c2_l1',fx:{t:1,fl:{huRespeto:true}}}]},
 c2_l1:{h:'Lección 1 · La selección de hierbas',t:['Hu extiende sobre la mesa treinta hierbas casi idénticas. «Una de cada cuatro es venenosa. Otra, tan solo desagradable. La mayoría, deliciosa para los monos.»'],
  c:[{x:'Distinguir las hierbas con cuidado (prueba de Mente)',chk:{s:'me',dc:10,ok:'c2_l2',ko:'c2_l2',fxok:{xp:10},fxko:{hp:-5}}}]},
 c2_l2:{h:'Lección 2 · El fuego',t:['«El fuego es como un alumno impaciente —dice Hu—: si lo dejas solo, te quema. Si lo vigilas, te quema igual, pero con más información.» Tu caldero debe mantenerse «del color de un pato asado: ni más ni menos».'],
  c:[{x:'Regular la llama con tu Qi (prueba de Espíritu)',chk:{s:'es',dc:10,ok:'c2_l3',ko:'c2_l3',fxok:{xp:10},fxko:{hp:-5}}}]},
 c2_l3:{h:'Lección 3 · La mezcla',t:['La última lección es la más delicada: mezclar tres ingredientes en el orden exacto. Un error, y la poción se convierte en humo con ideas. «Si estornudas —advierte Hu—, apártate hacia la derecha. Siempre hacia la derecha.»'],
  c:[{x:'Mezclar sin temblar (prueba de Suerte)',chk:{s:'su',dc:10,ok:'c2_l_fin',ko:'c2_l_fin',fxok:{xp:10},fxko:{hp:-5}}}]},
 c2_l_fin:{h:'El primer aprendizaje',t:['Hu examina tu elixir con la solemnidad de un juez. Lo huele. Lo agita. Lo prueba con la punta de un dedo. Y lo deja caer en un cuenco sin decir palabra.','«Aprobado. A duras penas, pero con dignidad.» Sonríe por primera vez en tres semanas. «Aquí tienes tu primer material de trabajo. Con él aprenderás más que con mis sermones.»'],
  fx:{item:{polvo_jade:2,elixir_qi:1},xp:20,fl:{c2_aprendiz:true}},c:[{x:'Salir del Horno, con las manos manchadas',to:'c2_mei'}]},
 c2_mei:{h:'Xiao Mei, la aprendiz que explota cosas',t:['En la puerta del Horno, una joven con hollín hasta las cejas y una sonrisa sin vergüenza te intercepta. «¡Hola! Soy Xiao Mei, aprendiz del Maestro Hu. Llevo dos calderos rotos este verano. El segundo fue un accidente. El primero, también, pero con más entusiasmo.»','Te cuenta, a media voz, que un discípulo mayor vende píldoras milagrosas a los novatos. «Todo el mundo dice que es una estafa. Nadie lo dice delante de Wang.»','«Esta chica me cae bien —opina el Abuelo Pei—. Tiene el mismo respeto por la prudencia que yo.»'],
  fx:{fl:{meiConocida:true}},c:[{x:'Ayudarla a limpiar el hollín · +10 XP · 1 h',to:'patio',fx:{xp:10,t:1,fl:{meiAmiga:true}}},{x:'Reírte y seguir tu camino',to:'patio'}]},
 c2_hu_enigma:{h:'El enigma del Maestro Hu',t:['Hu enciende una brasa con un chasquido y te mira por encima de las gafas. «Un buen alquimista no solo mezcla: piensa. Contesta.»'],acertijo:'c2a1',back:'patio'},
 c2_mei_enigma:{h:'El enigma de Xiao Mei',t:['Mei saca un trapo ennegrecido de la manga. «Mi abuela decía que quien resuelve este enigma jamás volverá a quemarse. Mi abuela mentía bastante, pero era buena en enigmas.»'],acertijo:'c2a2',back:'patio'},
 c2_wang_pildoras:{h:'Las «píldoras milagrosas»',t:['En una esquina del patio, rodeado de novatos con los ojos brillantes, Wang agita un frasco con una sonrisa de vendedor de feria. «¡Píldoras de Mil Poderes! ¡Un solo bocado, y serás Núcleo Dorado antes de la cena!»','«Tiene todo el aspecto de un timo con peinado», sentencia el Abuelo Pei.'],
  c:[{x:'Comprar una píldora (10 monedas)',to:'c2_wang_compra',req:{oro:10},fx:{oro:-10}},{x:'Examinar la píldora y desenmascararlo (prueba de Mente)',chk:{s:'me',dc:11,ok:'c2_wang_ok',ko:'c2_wang_ko'}},{x:'Alejarte, de momento',to:'patio'}]},
 c2_wang_compra:{t:['Te tragas la píldora con fe y arrepentimiento. Sabe a tiza, a ceniza y a un vago sentimiento de traición. Tu estómago emite un sonido nuevo.','«Eso no es Qi —diagnostica el Abuelo Pei—. Eso es harina con ambición.»'],fx:{hp:-10},c:[{x:'Volver al puesto de Wang',to:'c2_wang_pildoras'}]},
 c2_wang_ok:{t:['Partes la píldora, la hueles, la lames con una teatralidad que te asombra a ti mismo. «Harina, tiza y tinte rojo. Dos monedas de materia prima, diez de insolencia.» La multitud suelta una carcajada.','Wang enrojece hasta las orejas, devuelve el dinero a los compradores y se marcha con la dignidad de un gato mojado.'],fx:{oro:40,xp:20,fl:{c2_wang_fin:true,wangAvergonzado:true}},c:[{x:'Volver al patio',to:'patio'}]},
 c2_wang_ko:{t:['Tu argumento sale torpe y sin pruebas. La multitud murmura, Wang se ríe y, para colmo, te pide una «tasa por difamación». Pierdes diez monedas y bastante prestigio.','«Hoy has perdido —resume el Abuelo Pei—. Pero con mucha elegancia.»'],fx:{oro:-10,fl:{c2_wang_fin:true,wangTrampa:true}},c:[{x:'Volver al patio, con orgullo en pedazos',to:'patio'}]},
 c2_ye:{h:'Ye Shan, la discípula de los dos hornos',t:['Junto al caldero más grande del Horno, una joven de túnica roja te observa con unos ojos que no parpadean. Es Ye Shan, discípula interna, de las que dicen «buenos días» como quien firma una sentencia.','«Dicen que Hu te ha tomado de aprendiz. Qué gesto tan generoso. Para él.» Señala un caldero. «Te reto a preparar un elixir. Si lo logras, te dejaré ayudarme. Si no, limpiarás mi caldero. Con la lengua.»'],
  c:[{x:'Aceptar el duelo de caldero (prueba de Mente)',chk:{s:'me',dc:11,ok:'c2_ye_ok',ko:'c2_ye_ko'}},{x:'Declinar con educación, de momento',to:'patio'}]},
 c2_ye_ok:{t:['Tu elixir hierve con un tono azul inesperado. Ye Shan lo observa en silencio, mueve los labios sin decir nada y, al fin, asiente. «No está mal. Para un mono con manos.»','Es el mayor elogio que ha dado en su vida. Lo sabes porque Mei, detrás de ti, se ha llevado la mano a la boca.'],fx:{item:'elixir_vida',xp:30,fl:{c2_ye_fin:true,yeRespeto:true}},c:[{x:'Volver al patio',to:'patio'}]},
 c2_ye_ko:{t:['Tu elixir se agria, humea y termina convertido en un charco verde. Ye Shan lo mira, te mira, y esboza una sonrisa fina como un cuchillo. «Eso, aprendiz, es lo que llamamos una lección.»','Te quemas un dedo. El orgullo, mucho más.'],fx:{hp:-5,fl:{c2_ye_fin:true,yeDesprecio:true}},c:[{x:'Volver al patio, con el dedo en la boca',to:'patio'}]},
 c2_cierre:{h:'El caldero roto',cp:1,t:['El Horno está en silencio. El Maestro Hu, de pie junto al mayor de sus calderos, el de Nueve Llamas, no se mueve. Un largo agrietado recorre el hierro de arriba abajo. Las estanterías del Loto Lunar, antes llenas, están vacías.','«Este caldero fue de mi maestro —dice con una voz que no le conocías—. Y del maestro de mi maestro. Lo han roto esta noche. Sin ruido. Sin cerradura forzada.»','Ye Shan, apoyada en la pared, no acusa a nadie. Solo te mira un instante más de lo necesario.','«Qué conveniente», murmura el Abuelo Pei.'],
  c:[{x:'Prometer al Maestro Hu que descubrirás la verdad',to:'c2_cierre_fin'},{x:'Guardar silencio y poner una mano sobre el caldero',to:'c2_cierre_fin'}]},
 c2_cierre_fin:{h:'Fin de la Parte A',t:['La ola de calor se apaga al caer la tarde. Mei te lleva una taza de té con las manos temblorosas. «Dicen que el caldero rompió el aire. Que sonó como un trueno sin tormenta.»','El Abuelo Pei, por primera vez en semanas, habla sin gracia. «Quien rompió ese caldero sabía lo que hacía, muchacho. Y quien se llevó el Loto Lunar, también.»','En el patio, los cigarrones callan. Algo, en la oscuridad, ha cambiado de ritmo. Pero eso, quizá, es asunto de la Parte B: «Rencores».'],
  fx:{fl:{c2_a_fin:true},xp:30,oro:50},c:[{x:'Volver al patio',to:'patio'}]}
}});
registrarAcertijos({
 c2a1:{q:'«Soy hijo del fuego y de la tierra; me moldean para guardar aquello que no debe escapar.»',o:['El caldero','La espada','La lámpara'],k:0,fx:{item:{polvo_jade:2,lirio_fuego:1},xp:25},ok:'Hu sonríe: «Por fin alguien que escucha a los calderos.» Te regala materiales.',ko:'Hu suspira: «Ese caldero me llora cada vez que alguien piensa así.»'},
 c2a2:{q:'«Respiro sin pulmones y soplo sin boca; sin mí, el fuego se duerme.»',o:['El fuelle','El viento','La brasa'],k:0,fx:{st:{es:1},xp:20},ok:'Mei aplaude con las manos tiznadas. «¡Un fuelle! Mi abuela tenía razón.» Ganas +1 Espíritu.',ko:'Mei se ríe, sin maldad. «Casi. Casi como yo con las calderas.»'}
});
