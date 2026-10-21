/* =====================================================================
   TEXTOS DE LAS AYUDAS «i» · LibroJuegos
   Un texto por función del juego. Se escriben de 10 en 10.

   Formato de cada entrada:
     id:{ t:'Título de la ventana',
          h:{ '*':'HTML común a los dos libros',
              dao:'HTML extra solo de El Camino del Dao',
              senda:'HTML extra solo de La Senda al Valhalla' } }
   (h también puede ser un texto simple si es igual en los dos libros.)

   Clases disponibles dentro del HTML:
     <h3>      subtítulo en mayúsculas pequeñas
     <ol><ul>  pasos y listas
     .ej       recuadro de ejemplo (borde amarillo)
     .tip      consejo (barra lateral)

   TANDA 1 · cabecera, tiempo, dormir, guardado, exportar, estado,
             decisiones, bloqueadas, dados, atributos
   TANDA 2 · estadisticas, combate, guardia, equipo, tiendas, forja,
             objetos, acertijos, progreso, alquimia
   TANDA 3 · Dao: qi, tecnicas, reinos, caza, social, tablon, comedor
             Senda: furor, berserker, runas
   TANDA 4 · Senda: estados, taller, grabado, juramentos, favores, hilos,
             senales, injurias, saga, protagonista
   ===================================================================== */
LJInfo.registrar({

/* 1 ─────────────────────────────────────────────────────────────── */
cabecera:{ ver:{'*':['tiempo','estado'],dao:['qi'],senda:['furor']}, t:'La cabecera', h:{
 '*':'<p>La franja de la parte de arriba te acompaña durante toda la partida y te muestra cómo estás de un vistazo. Se queda fija mientras lees.</p>',
 dao:'<h3>Primera línea</h3><ul>'+
  '<li><b>Tu Reino de cultivo</b> (por ejemplo, «Condensación de Qi»): cuánto has avanzado en tu camino de poder.</li>'+
  '<li><b>El día y la hora</b> de la partida.</li>'+
  '<li><b>🪙 Tus monedas.</b></li></ul>'+
  '<h3>Las dos barras</h3><ul>'+
  '<li><b>Vida:</b> si llega a 0, caes derrotado.</li>'+
  '<li><b>Qi:</b> la energía que gastas al usar técnicas de lucha. Se recupera meditando, con píldoras o durmiendo.</li></ul>'+
  '<h3>Última línea</h3><ul>'+
  '<li>Tu <b>rango en la secta</b> (por ejemplo, Aspirante).</li>'+
  '<li><b>Estado:</b> tu ficha completa.</li>'+
  '<li><b>Menú:</b> te lleva al menú principal del libro. Tu partida ya está guardada, puedes volver con «Continuar».</li></ul>',
 senda:'<h3>Primera línea</h3><ul>'+
  '<li><b>Tu rango de guerrero:</b> sube a medida que ganas Gloria.</li>'+
  '<li><b>El día y la hora</b> de la partida.</li>'+
  '<li><b>🪙 Tu plata.</b></li></ul>'+
  '<h3>Las dos barras</h3><ul>'+
  '<li><b>Vida:</b> si llega a 0, caes derrotado.</li>'+
  '<li><b>Furor:</b> se llena durante los combates y se gasta al usar runas. Cuando está al máximo puedes desatar la furia berserker.</li></ul>'+
  '<h3>Última línea</h3><ul>'+
  '<li><b>Gloria:</b> la fama de tus hazañas. <b>Hilos:</b> las veces que puedes repetir una tirada fallida.</li>'+
  '<li><b>Estado:</b> tu ficha completa.</li>'+
  '<li><b>Menú:</b> te lleva al menú principal del libro. Tu partida ya está guardada, puedes volver con «Continuar».</li></ul>'
}},

/* 2 ─────────────────────────────────────────────────────────────── */
tiempo:{ ver:['dormir','cabecera'], t:'El tiempo: horas y días', h:{
 '*':'<p>En este libro el tiempo cuenta: casi todo lo que haces gasta horas.</p>'+
  '<h3>Cómo funciona</h3><ol>'+
  '<li>Cada opción indica lo que tarda, por ejemplo <b>· 2 h</b>. Al elegirla, el reloj avanza esas horas.</li>'+
  '<li>El reloj llega hasta las 24:00. Al pasarlas empieza un <b>día nuevo</b> y recuperas algo de Vida.</li>'+
  '<li>En la cabecera ves el día y si es mañana, tarde o noche.</li></ol>',
 dao:'<div class="ej"><p>Al amanecer recuperas <b>30 de Vida</b> sin hacer nada.</p></div>',
 senda:'<div class="ej"><p>Al amanecer recuperas <b>25 de Vida</b> sin hacer nada.</p></div>'
}},
/* (el cierre común del tiempo se añade debajo, para que el ejemplo quede arriba) */

/* 3 ─────────────────────────────────────────────────────────────── */
dormir:{ ver:['tiempo','guardado'], t:'Dormir', h:{
 '*':'<p>Dormir es la forma de recuperarte del todo.</p><h3>Qué hace</h3><ul>'+
  '<li>Cuesta <b>8 horas</b>.</li>'+
  '<li>Recuperas <b>toda tu Vida</b>.</li>',
 dao:'<li>Recuperas también <b>todo tu Qi</b>.</li></ul>',
 senda:'<li>Tu <b>Furor vuelve a 0</b>.</li></ul>'
}},

/* 4 ─────────────────────────────────────────────────────────────── */
guardado:{ ver:['exportar'], t:'Guardado y puntos seguros', h:{
 '*':'<h3>Se guarda solo</h3>'+
  '<p>Tu partida se guarda automáticamente cada vez que avanzas. No tienes que hacer nada: para seguir otro día, abre el libro y pulsa <b>«Continuar»</b>.</p>'+
  '<p>El guardado vive <b>en este navegador y en este dispositivo</b>. Si borras los datos del navegador, o juegas desde otro dispositivo, no lo encontrarás. Para eso existe «Exportar partida».</p>'+
  '<h3>Puntos seguros</h3>'+
  '<p>En ciertos momentos clave el juego marca un <b>punto seguro</b>. Si caes derrotado, puedes volver al último que pasaste.</p>'+
  '<div class="ej"><p>Vuelves con la Vida, el dinero y los objetos que tenías <b>en ese momento</b>. Lo que hiciste después de ese punto se pierde.</p></div>',
 dao:'<ol><li>Cuando caigas, pulsa <b>«Volver al último punto de guardado»</b>.</li><li>Elige de nuevo y prueba otra estrategia.</li></ol>',
 senda:'<ol><li>Cuando caigas, pulsa <b>«Volver al último punto seguro»</b>.</li><li>Elige de nuevo y prueba otra estrategia.</li></ol>'
}},

/* 5 ─────────────────────────────────────────────────────────────── */
exportar:{ ver:['guardado'], t:'Exportar e importar partida', h:{
 '*':'<p>Sirve para hacer una <b>copia de seguridad</b> de tu partida o para llevarla a otro dispositivo u otro navegador.</p>'+
  '<h3>Para guardar una copia</h3><ol>'+
  '<li>En el menú principal del libro, pulsa <b>«Exportar partida»</b>.</li>'+
  '<li>Pulsa <b>«Descargar archivo de guardado»</b>. Se descarga un archivo <b>.json</b> con el día de tu partida en el nombre.</li>'+
  '<li>Guárdalo donde quieras: tu nube, tu correo o un pendrive.</li></ol>'+
  '<h3>Para recuperarla</h3><ol>'+
  '<li>Abre el mismo libro en el dispositivo o navegador donde quieras seguir.</li>'+
  '<li>En el menú principal pulsa <b>«Importar partida»</b> y luego <b>«Elegir archivo…»</b>.</li>'+
  '<li>Selecciona el archivo .json y confirma.</li></ol>'+
  '<p class="tip"><b>Importante:</b> al importar se <b>sustituye</b> la partida guardada que tuvieras. Y cada libro tiene su propio archivo: el de un libro no sirve en el otro.</p>'
}},

/* 6 ─────────────────────────────────────────────────────────────── */
estado:{ ver:['atributos','decisiones'], t:'El botón «Estado»', h:{
 '*':'<p>«Estado» abre tu ficha de personaje. <b>No gasta tiempo</b>, así que puedes consultarla cuantas veces quieras.</p>'+
  '<ol><li>Pulsa <b>«Estado»</b> en la cabecera.</li>'+
  '<li>Arriba verás tus cifras de combate: <b>Atq</b> (ataque), <b>Def</b> (defensa), <b>Arm</b> (armadura), <b>Crít</b> (probabilidad de golpe crítico) y <b>Vel</b> (velocidad).</li>'+
  '<li>Más abajo están tus atributos, lo que llevas puesto y tu bolsa.</li>'+
  '<li>Para volver a la historia, pulsa <b>«Estado»</b> otra vez.</li></ol>'+
  '<h3>En la bolsa</h3><ul>'+
  '<li><b>Equipar:</b> te pones un arma, un escudo o una armadura.</li>'+
  '<li><b>Usar:</b> consumes un objeto, por ejemplo una poción.</li></ul>',
 dao:'<ul><li><b>Aprender:</b> estudias un pergamino para conocer una técnica nueva.</li></ul>'+
  '<h3>Dos pestañas</h3><ul><li><b>Equipo y bolsa:</b> tu ficha y tus objetos.</li><li><b>Técnicas de lucha:</b> las que conoces y las que llevas preparadas para combatir.</li></ul>',
 senda:'<ul><li><b>Aprender:</b> usas una piedra rúnica para conocer una runa nueva.</li></ul>'+
  '<h3>Cuatro pestañas</h3><ul><li><b>Equipo:</b> tu ficha y tus objetos.</li><li><b>Runas:</b> las que conoces y las que llevas preparadas.</li><li><b>Juramentos:</b> tus promesas y los favores de los dioses.</li><li><b>Saga:</b> el registro de tus hazañas.</li></ul>'
}},

/* 7 ─────────────────────────────────────────────────────────────── */
decisiones:{ ver:['bloqueadas'], t:'Cómo leer las decisiones', h:{
 '*':'<h3>La misión principal</h3>'+
  '<p>La caja dorada te dice cuál es el <b>siguiente objetivo de la historia</b>. Si no sabes qué hacer, empieza por ahí.</p>'+
  '<h3>Los símbolos de cada opción</h3>'+
  '<p>El símbolo que ves delante de una opción indica de qué tipo es:</p><ul>'+
  '<li><span class="m">★</span> <b>Historia:</b> hace avanzar la trama principal.</li>',
 dao:'<li><span class="m">■</span> <b>Secundaria:</b> misiones y vida diaria de la secta.</li>'+
  '<li><span class="m">▲</span> <b>Caza:</b> combates y entrenamiento.</li>'+
  '<li><span class="m">◆</span> <b>Tienda:</b> comprar, vender, forjar y refinar.</li>'+
  '<li><span class="m">●</span> <b>Social:</b> hablar con otros personajes.</li></ul>',
 senda:'<li><span class="m">■</span> <b>Vida diaria:</b> tareas y descanso.</li>'+
  '<li><span class="m">▲</span> <b>Caza:</b> combates y peligros.</li>'+
  '<li><span class="m">◆</span> <b>Comercio:</b> comprar, vender y forjar.</li>'+
  '<li><span class="m">●</span> <b>Gente:</b> hablar con otros personajes.</li></ul>'
}},

/* 8 ─────────────────────────────────────────────────────────────── */
bloqueadas:{ ver:['decisiones'], t:'Opciones bloqueadas', h:{
 '*':'<p>Una opción en gris con la nota <b>«(requisito no cumplido)»</b> todavía no se puede elegir. Te falta algo para desbloquearla.</p>'+
  '<h3>Qué puede faltarte</h3><ul>'+
  '<li>Un <b>objeto</b> concreto.</li>'+
  '<li>Un <b>atributo</b> más alto.</li>'+
  '<li>Más <b>dinero</b>.</li>'+
  '<li>Que <b>llegue cierto día</b>, o que sea antes de cierta hora.</li>'+
  '<li>Haber hecho antes <b>otra cosa</b> de la historia (hablar con alguien, descubrir una pista).</li></ul>',
 dao:'<p>También puede pedirte un <b>Reino de cultivo</b> o un <b>rango</b> en la secta más alto.</p>',
 senda:'<p>También puede pedirte más <b>Gloria</b> o un <b>rango</b> más alto.</p>'
}},

/* 9 ─────────────────────────────────────────────────────────────── */
dados:{ ver:{'*':['atributos'],senda:['hilos','favores']}, t:'Pruebas de dados', h:{
 '*':'<p>Algunas decisiones se resuelven con una <b>tirada de dados</b>. Así funciona:</p><ol>'+
  '<li>Se lanzan <b>dos dados</b> de seis caras.</li>'+
  '<li>Se suma tu <b>atributo</b> relacionado con la acción. Lo indica la propia opción, por ejemplo «(Suerte)».</li>'+
  '<li>Se compara el total con una <b>dificultad</b>.</li>'+
  '<li>Si igualas o superas la dificultad, es un <b>éxito</b>. Si no, un <b>fallo</b>.</li></ol>',
 dao:'<div class="ej"><p>🎲 4 + 3 + Mente 5 = <b>12</b> contra 10 → <b>Éxito</b></p>'+
  '<p>Dos dados (4 y 3), más tu Mente (5), suman 12. La dificultad era 10, así que lo logras.</p></div>'+
  '<p>Cuanto más alto sea tu atributo, más fácil es acertar: cada punto cuenta como +1.</p>'+
  '<p class="tip">Un fallo no siempre es el final: a veces solo cambia el rumbo de la historia, y otras te cuesta algo de Vida. La tirada no se puede repetir.</p>',
 senda:'<div class="ej"><p>🎲 4 + 3 + Astucia 5 = <b>12</b> contra 10 → <b>Éxito</b></p>'+
  '<p>Dos dados (4 y 3), más tu Astucia (5), suman 12. La dificultad era 10, así que lo logras.</p></div>'+
  '<p>Cuanto más alto sea tu atributo, más fácil es acertar: cada punto cuenta como +1.</p>'+
  '<p class="tip">Si fallas, puedes <b>gastar un Hilo de las Nornas</b> para repetir la tirada. Si no te quedan hilos, aceptas el destino.</p>'
}},

/* 10 ────────────────────────────────────────────────────────────── */
atributos:{ ver:['dados','estado'], t:'Los atributos', h:{
 '*':'<p>Los atributos son las cuatro cualidades básicas de tu personaje. Los ves en <b>Estado</b>, en la primera línea. Sirven para dos cosas:</p><ul>'+
  '<li><b>En las pruebas de dados:</b> se suman a la tirada.</li>'+
  '<li><b>En combate:</b> mejoran tus golpes y tus defensas.</li></ul>',
 dao:'<h3>Qué hace cada uno</h3><ul>'+
  '<li><b>Cuerpo y Espíritu:</b> potencian las técnicas de lucha que dependen de ellos. Cada punto añade <b>+2 de daño</b>.</li>'+
  '<li><b>Mente:</b> también potencia técnicas, y te ayuda a <b>huir</b> de un combate.</li>'+
  '<li><b>Suerte:</b> sube la probabilidad de <b>golpe crítico</b> (daño extra).</li></ul>'+
  '<p>Cada técnica indica de qué atributo depende.</p>'+
  '<h3>Cómo subirlos</h3><p>Con ciertas recompensas de la historia, como resolver enigmas o superar pruebas.</p>',
 senda:'<h3>Qué hace cada uno</h3><ul>'+
  '<li><b>Fuerza:</b> sube tu <b>ataque</b>. Cada punto añade +2.</li>'+
  '<li><b>Astucia:</b> sube tu <b>velocidad</b> (más posibilidades de esquivar) y te ayuda a <b>huir</b> de un combate.</li>'+
  '<li><b>Espíritu:</b> potencia tus <b>runas</b> y su poder de curación.</li>'+
  '<li><b>Suerte:</b> sube la probabilidad de <b>golpe crítico</b> (daño extra).</li></ul>'+
  '<h3>Cómo subirlos</h3><p>Con ciertas recompensas de la historia, como superar pruebas y enigmas.</p>'
}}
,


/* ═══════════════════════ TANDA 2 ═══════════════════════ */

/* 11 ────────────────────────────────────────────────────────────── */
estadisticas:{ ver:{'*':['equipo','combate'],dao:['qi']}, t:'Estadísticas de combate', h:{
 '*':'<p>Son los seis números de la franja que ves en <b>Estado</b>. Resumen de cómo luchas: se calculan solos a partir de tu personaje y de lo que llevas puesto.</p>'+
  '<ul>'+
  '<li><b>Atq (ataque):</b> el daño que se suma a tus golpes.</li>'+
  '<li><b>Def (defensa):</b> el porcentaje del daño enemigo que se anula. Tiene un tope del <b>60 %</b>.</li>'+
  '<li><b>Arm (armadura):</b> puntos fijos que se restan a cada golpe que recibes. Siempre recibes al menos 1.</li>',
 dao:'<li><b>Crít:</b> el daño extra de tus golpes críticos. Un crítico normal hace ×1,5; este número lo aumenta. La probabilidad de que salga depende de tu <b>Suerte</b> (8 % más 1 % por punto).</li>'+
  '<li><b>Qi:</b> tu poder de Qi. Cada punto suma +2 de daño a las técnicas que gastan Qi.</li>'+
  '<li><b>Vel (velocidad):</b> la probabilidad de esquivar un ataque, con un tope del <b>40 %</b>. También ayuda a huir.</li></ul>'+
  '<p>Estos números vienen de tu <b>equipo</b> y de sus mejoras. Los demás factores del daño son tus atributos, tu Reino y la técnica que uses.</p>',
 senda:'<li><b>Crít:</b> la probabilidad de golpe crítico: 5 % más 1 % por punto de Suerte, más lo que sume tu equipo. Un crítico hace un 60 % más de daño.</li>'+
  '<li><b>Vel (velocidad):</b> la probabilidad de esquivar un ataque, con un tope del <b>35 %</b>. Sale de tu Astucia y de tu equipo, y también ayuda a huir.</li>'+
  '<li><b>Runas:</b> las que llevas preparadas, de un máximo de 4.</li></ul>'+
  '<p>Tu <b>ataque</b> sale de tu Fuerza (cada punto suma 2), de tu rango de Gloria (3 por rango) y de tu arma. Def y Arm vienen de tu equipo y de sus mejoras.</p>'
}},

/* 12 ────────────────────────────────────────────────────────────── */
combate:{ ver:{'*':['guardia','estadisticas'],dao:['qi','tecnicas'],senda:['furor','runas','estados']}, t:'El combate por turnos', h:{
 '*':'<p>En un combate, tú y el enemigo os turnáis. <b>Tú actúas primero</b>; después, si sigue en pie, ataca él.</p>'+
  '<h3>Cómo jugar un turno</h3><ol>'+
  '<li><b>Lee la «Intención» del enemigo.</b> Te avisa de lo que hará en su turno. Si dice que <b>carga</b> un golpe, su próximo ataque hará <b>doble daño</b>: es buen momento para cubrirte.</li>'+
  '<li><b>Elige tu acción</b> entre los botones de abajo.</li>'+
  '<li><b>Mira el registro</b> sobre los botones: cuenta lo que pasó en el turno anterior.</li></ol>'+
  '<p>Cubrirte, descansar o usar un objeto <b>también gastan tu turno</b>.</p>'+
  '<h3>Cómo termina</h3><ul>'+
  '<li><b>Ganas</b> si la barra de Vida del enemigo llega a 0: recibes recompensa y, a veces, botín.</li>'+
  '<li><b>Pierdes</b> si la tuya llega a 0. Entonces puedes volver al último punto seguro.</li></ul>',
 dao:'<h3>Tus acciones</h3><ul><li><b>Técnicas:</b> cada una gasta Qi y muestra su daño aproximado. Si no tienes Qi suficiente, el botón se apaga.</li>'+
  '<li><b>Meditar:</b> recuperas 8 de Qi.</li><li><b>Objetos:</b> las píldoras y elixires que lleves.</li></ul>',
 senda:'<h3>Tus acciones</h3><ul><li><b>Golpe:</b> siempre disponible, y te da +8 de Furor.</li>'+
  '<li><b>Runas:</b> gastan Furor y hacen cosas muy distintas. Con Furor 100 puedes desatar la furia berserker.</li>'+
  '<li><b>Objetos:</b> ungüentos, tónicos y bebidas que lleves.</li></ul>'+
  '<p>Bajo la intención del enemigo aparecen los <b>estados</b> activos: aturdido, escudo rúnico, esquiva, regeneración… Un enemigo aturdido no ataca ese turno.</p>'
}},

/* 13 ────────────────────────────────────────────────────────────── */
guardia:{ ver:{'*':['combate'],senda:['berserker']}, t:'Guardia y huir', h:{
 '*':'<h3>Guardia</h3>'+
  '<p>Te cubres durante este turno: el ataque del enemigo hace un <b>60 % menos de daño</b>. Gasta tu turno.</p>'+
  '<h3>Huir</h3>'+
  '<p>Intentas escapar del combate. Se tiran dos dados, se suman tu atributo y un bonus por velocidad (1 por cada 5 de Vel), y hace falta sacar <b>9 o más</b>.</p>'+
  '<ul><li>Si lo logras, <b>sales del combate</b> y no recibes su recompensa.</li>'+
  '<li>Si fallas, <b>pierdes el turno</b> y el enemigo ataca.</li></ul>',
 dao:'<div class="ej"><p>🎲 4 + 3 + Mente 3 + velocidad 0 = <b>10</b> → logras huir (hacía falta 9)</p></div>'+
  '<p>En el Dao se suma tu <b>Mente</b>. La guardia no gasta Qi.</p>',
 senda:'<div class="ej"><p>🎲 4 + 3 + Astucia 3 + velocidad 0 = <b>10</b> → logras huir (hacía falta 9)</p></div>'+
  '<p>En la Senda se suma tu <b>Astucia</b>.</p>'+
  '<ul><li>La guardia te da además <b>+6 de Furor</b>.</li>'+
  '<li><b>No todos los combates permiten huir:</b> si no ves el botón «Huir», ese combate no tiene escapatoria.</li>'+
  '<li>Con la furia berserker activa no puedes cubrirte ni huir.</li></ul>'
}},

/* 14 ────────────────────────────────────────────────────────────── */
equipo:{ ver:['estadisticas','forja'], t:'Equipo: armas y armaduras', h:{
 '*':'<p>Llevas tres piezas a la vez: <b>un arma, un escudo y una armadura</b>. Cada una mejora tus estadísticas de combate (Atq, Def, Arm…).</p>'+
  '<h3>Para equiparte</h3><ol>'+
  '<li>Abre <b>Estado</b>.</li>'+
  '<li>En tu <b>Bolsa</b>, busca la pieza y pulsa <b>«Equipar»</b>. No gasta tiempo.</li>'+
  '<li>Quedará marcada como <b>«(equipado)»</b>. Si ya llevabas otra del mismo tipo, la sustituye.</li></ol>'+
  '<p>Si ves un <b>+1, +2…</b> junto al nombre, es el nivel de mejora de esa pieza (hasta +5). Se consigue en la forja.</p>',
 dao:'<p class="tip">En el Dao, el color del nombre indica la rareza de la pieza: común, muy rara, épica o legendaria. Las más raras se forjan con materiales más difíciles y piden un Reino más alto.</p>',
 senda:'<ul><li>Para dejar una pieza sin equipar, pulsa <b>«Quitar»</b> junto a ella en la sección Equipo.</li>'+
  '<li>Algunas armas dan un bonus especial, por ejemplo contra los no muertos.</li></ul>'
}},

/* 15 ────────────────────────────────────────────────────────────── */
tiendas:{ ver:['objetos','forja'], t:'Tiendas: comprar y vender', h:{
 '*':'<h3>Para comprar</h3><ol>'+
  '<li>Elige la <b>cantidad</b> con los botones de arriba (×1, ×5, ×10 o «Máx»).</li>'+
  '<li>Pulsa el objeto que quieres. Su precio total aparece a la derecha.</li>'+
  '<li>Se descuenta de tu dinero y el objeto pasa a tu bolsa.</li></ol>'+
  '<p>Si no te alcanza el dinero, el botón se apaga. Si pides más unidades de las que puedes pagar, compras todas las que te alcancen.</p>'+
  '<h3>Para vender</h3><ol>'+
  '<li>Pulsa la pestaña <b>«Vender»</b>.</li>'+
  '<li>Elige cantidad y pulsa el objeto.</li></ol>'+
  '<ul><li>Te pagan <b>la mitad</b> de su precio de compra.</li>'+
  '<li>Los <b>objetos clave</b> de la historia no se pueden vender.</li>'+
  '<li>Si vendes la última copia de una pieza que llevas puesta, te la quitas.</li></ul>'+
  '<p>«(tienes N)» te dice cuántas unidades llevas ya. Más arriba ves tu dinero y tus materiales.</p>',
 dao:'<p class="tip">En el Dao también existe la cantidad ×50. Antes de vender materiales, piensa si los necesitas para forjar o refinar píldoras.</p>',
 senda:'<p class="tip">Antes de vender materiales, piensa si los necesitas para forjar o preparar remedios en el caldero.</p>'
}},

/* 16 ────────────────────────────────────────────────────────────── */
forja:{ ver:['equipo','objetos'], t:'La forja: forjar y mejorar', h:{
 '*':'<p>La forja tiene dos pestañas.</p>'+
  '<h3>Forjar · 2 horas</h3><p>Creas una pieza nueva a cambio de dinero y materiales.</p><ol>'+
  '<li>Cada receta muestra su precio y lo que necesita. En <b>verde</b> lo que ya tienes; en <b>rojo</b>, lo que te falta.</li>'+
  '<li>Si puedes pagarla, pulsa la receta. Se gastan el dinero y los materiales, y la pieza pasa a tu bolsa.</li></ol>',
 dao:'<p>Las recetas de piezas más raras se desbloquean al subir de Reino: muy raras en el Espiritual de Qi, épicas en el Celestial y legendarias en el Dios Marcial. Puedes filtrar por rareza o pulsar «Solo las que puedo forjar».</p>',
 senda:'',
},
/* el resto, común, se añade abajo */ },

/* 17 ────────────────────────────────────────────────────────────── */
objetos:{ ver:['tiendas','alquimia'], t:'Objetos y botín', h:{
 '*':'<p>Todo lo que recoges va a tu <b>bolsa</b> (en Estado). Hay varios tipos:</p><ul>'+
  '<li><b>Materiales:</b> ingredientes para la forja y para preparar remedios. No se usan solos.</li>'+
  '<li><b>Consumibles:</b> restauran Vida u otras reservas. Úsalos con <b>«Usar»</b> en tu bolsa, o dentro de un combate (gasta tu turno).</li>'+
  '<li><b>Equipo:</b> armas, escudos y armaduras. Se llevan puestos con «Equipar».</li>'+
  '<li><b>Objetos clave:</b> pruebas y llaves de la historia. No se usan ni se venden.</li>',
 dao:'<li><b>Pergaminos:</b> con «Aprender» conoces una técnica nueva.</li></ul>'+
  '<p>Las píldoras de Concentración devuelven Qi, las de Sangre devuelven Vida y los elixires devuelven las dos cosas.</p>',
 senda:'<li><b>Piedras rúnicas:</b> con «Aprender» conoces una runa nueva.</li></ul>'+
  '<p>Los ungüentos y tónicos devuelven Vida, y el cuerno de hidromiel te da Furor.</p>'
}},

/* 18 ────────────────────────────────────────────────────────────── */
acertijos:{ ver:['tiempo'], t:'Acertijos y enigmas', h:{
 '*':'<p>Un enigma plantea una pregunta con varias respuestas. Elige la que creas correcta.</p><ul>'+
  '<li><b>Si aciertas:</b> recibes la recompensa (a veces un punto de atributo u un objeto) y el enigma <b>no vuelve a aparecer</b>: solo se resuelve una vez.</li>'+
  '<li><b>Si fallas:</b> pierdes <b>1 hora</b> y no puedes reintentarlo hasta el <b>día siguiente</b>.</li>'+
  '<li>El <b>orden de las respuestas cambia cada día</b>, así que no sirve recordar en qué posición estaba la buena.</li></ul>'+
  '<p class="tip">Piénsalo con calma antes de contestar: un error te cuesta tiempo y un día de espera.</p>'
}},

/* 19 ────────────────────────────────────────────────────────────── */
progreso:{ ver:{'*':['estadisticas'],dao:['reinos'],senda:['juramentos']}, t:'Progreso: experiencia y rangos', h:{
 dao:'<p>Tu progreso en el Dao tiene dos vías distintas.</p>'+
  '<h3>Experiencia y Reinos</h3>'+
  '<p>Los combates y algunas misiones te dan <b>experiencia (XP)</b>. En Estado ves cuánta llevas y cuánta necesitas para el siguiente Reino.</p>'+
  '<ul><li><b>Condensación de Qi:</b> el inicio.</li><li><b>Espiritual de Qi:</b> con 150 XP.</li><li><b>Celestial de Qi:</b> con 500 XP.</li><li><b>Dios Marcial:</b> con 1500 XP.</li></ul>'+
  '<p>Al subir de Reino: <b>+40 de Vida máxima</b>, <b>+20 de Qi máximo</b>, recuperas todo, tus técnicas pegan <b>+5 de daño</b> más y se desbloquean mejores recetas de forja.</p>'+
  '<h3>Rango en la secta</h3>'+
  '<p>Aspirante, Discípulo Común, Maestro Común, Maestro Anciano y Líder Supremo. Lo concede la <b>historia</b>, no la experiencia, y aparece en la cabecera.</p>',
 senda:'<h3>Gloria</h3>'+
  '<p>La Gloria mide la fama de tus hazañas. La ganas <b>venciendo enemigos</b> (más cuanto más fuertes), cumpliendo juramentos y con actos valerosos; la pierdes si rompes un juramento. En Estado ves cuánta llevas y cuánta falta para el siguiente rango.</p>'+
  '<h3>Rangos</h3>'+
  '<ul><li><b>Bóndi:</b> el inicio.</li><li><b>Drengr:</b> 100 de Gloria.</li><li><b>Hersir:</b> 350.</li><li><b>Jarl:</b> 800.</li><li><b>Campeón:</b> 1400.</li><li><b>Elegido:</b> 2400, digno del Valhalla.</li></ul>'+
  '<p>Cada vez que subes de rango: <b>+25 de Vida máxima</b>, recuperas toda la Vida y ganas <b>+3 de ataque</b> (también en el daño de tus runas).</p>'
}},

/* 20 ────────────────────────────────────────────────────────────── */
alquimia:{ ver:['objetos','tiempo'], t:'Preparar pociones', h:{
 '*':'<p>Aquí conviertes ingredientes en remedios y bebidas. Cada unidad preparada cuesta <b>1 hora</b>.</p><ol>'+
  '<li>Elige la <b>cantidad</b> (×1, ×5…, o «Máx»).</li>'+
  '<li>Pulsa la receta que quieres. Se gastan los ingredientes y recibes el resultado.</li>'+
  '<li>El tiempo avanza una hora por cada unidad.</li></ol>'+
  '<p>En cada receta ves los ingredientes: en <b>verde</b> los que tienes, en <b>rojo</b> los que faltan. Si te faltan, el botón se apaga. «(tienes N)» indica cuántas unidades ya llevas del resultado.</p>'+
  '<p class="tip">Si pides una cantidad grande, comprueba antes la hora: ×5 son 5 horas de tu día.</p>',
 dao:'<p>En el Dao se prepara en el <b>Horno de Alquimia</b>: las hierbas y otras plantas se refinan en píldoras.</p>',
 senda:'<p>En la Senda se prepara en el <b>caldero de la völva</b>: remedios, como ungüentos y tónicos, y bebidas, como el hidromiel.</p>'
}},


/* ═══════════════════════ TANDA 3 ═══════════════════════ */

/* 21 · Dao ──────────────────────────────────────────────────────── */
qi:{ ver:['tecnicas','combate'], t:'El Qi', h:{
 dao:'<p>El Qi es la energía de tu cultivo. Es la <b>barra verde</b> de la cabecera («Qi 30/30») y se gasta al usar técnicas de lucha.</p>'+
  '<h3>Cuánto gastas</h3>'+
  '<p>Cada técnica indica su coste, por ejemplo «6 Qi». Si no tienes Qi suficiente, el botón de esa técnica se apaga. La técnica básica, el Puño del Monte, <b>no gasta Qi</b>: nunca te quedas sin ataque.</p>'+
  '<h3>Cómo se recupera</h3><ul>'+
  '<li><b>Meditar</b> en combate: +8 de Qi (gasta tu turno).</li>'+
  '<li><b>Píldora de Concentración:</b> +20 de Qi. Los elixires también devuelven Qi.</li>'+
  '<li><b>Dormir:</b> lo recuperas todo.</li>'+
  '<li><b>Comer</b> en el comedor: algunos platos dan Qi.</li>'+
  '<li><b>Subir de Reino:</b> +20 de Qi máximo y te rellena la barra.</li></ul>'+
  '<p class="tip">El «Qi» de la franja de Estado es otra cosa: tu poder de Qi. Cada punto suma +2 de daño a las técnicas que gastan Qi.</p>'
}},

/* 22 · Dao ──────────────────────────────────────────────────────── */
tecnicas:{ ver:['qi','objetos'], t:'Técnicas de lucha', h:{
 dao:'<p>Las técnicas son tus ataques en combate. Las gestionas en <b>Estado → «Técnicas de lucha»</b>.</p>'+
  '<h3>Qué ves de cada una</h3><ul>'+
  '<li>Su <b>nombre</b>; el color indica la rareza (de común a legendaria). Las más raras pegan más, pero gastan más Qi.</li>'+
  '<li>Su <b>coste en Qi</b> y su <b>daño aproximado</b>.</li>'+
  '<li>El <b>atributo</b> del que depende (Cuerpo, Espíritu o Mente): cada punto suma +2 de daño.</li></ul>'+
  '<h3>Equipar</h3>'+
  '<p>Llevas <b>hasta 4 técnicas</b> a la vez en combate. Pulsa <b>«Equipar»</b> o <b>«Quitar»</b>. Siempre debes llevar al menos una. Si ya llevas 4 y equipas otra, sustituye a la más antigua.</p>'+
  '<h3>Aprender nuevas</h3><ol>'+
  '<li>Consigue un <b>pergamino</b>: en la tienda del Maestro Yun, como botín de algunos enemigos o como premio de enigmas.</li>'+
  '<li>En Estado, en tu bolsa, pulsa <b>«Aprender»</b>.</li>'+
  '<li>Si tenías algún hueco libre, se equipa sola.</li></ol>'+
  '<h3>Mejorar</h3>'+
  '<p>El botón <b>«Mejorar 🪙N»</b> sube la técnica hasta <b>+5</b>. Cada nivel suma un <b>12 % de daño</b> y cuesta más que el anterior.</p>'
}},

/* 23 · Dao ──────────────────────────────────────────────────────── */
reinos:{ ver:['progreso'], t:'Reino y rango', h:{
 dao:'<p>En la cabecera ves dos cosas que se parecen pero son <b>distintas</b>:</p>'+
  '<h3>Reino de cultivo</h3>'+
  '<p>Está en la primera línea («Condensación de Qi»…). Mide tu <b>poder real</b> y sube al ganar experiencia en combates y misiones. Mejora tu Vida, tu Qi y tu daño, y te abre nuevas zonas de caza y recetas de forja.</p>'+
  '<h3>Rango en la secta</h3>'+
  '<p>Está en la última línea («Aspirante»…). Mide tu <b>posición</b> dentro de la secta y lo concede la <b>historia</b>, al superar pruebas y logros. Algunas opciones piden un rango mínimo.</p>'+
  '<div class="ej"><p>Puedes tener un Reino alto y seguir siendo Aspirante, o al revés: avanzan por separado.</p></div>'
}},

/* 24 · Dao ──────────────────────────────────────────────────────── */
caza:{ ver:['combate','progreso'], t:'Zonas de caza y entrenamiento', h:{
 dao:'<p>Cazar es combatir bestias, villanos y espíritus para ganar <b>experiencia, monedas y botín</b>.</p>'+
  '<h3>Elegir zona</h3>'+
  '<p>Las tierras se dividen en tres niveles, según tu Reino:</p><ul>'+
  '<li><b>Nivel 1 · Estribaciones:</b> desde el principio.</li>'+
  '<li><b>Nivel 2 · Tierras Altas:</b> con el Reino Espiritual de Qi.</li>'+
  '<li><b>Nivel 3 · Cumbres Prohibidas:</b> con el Reino Celestial de Qi.</li></ul>'+
  '<p>Las zonas que aún no puedes pisar muestran «requiere» y el Reino necesario. Más nivel significa enemigos más duros, pero también más experiencia y mejor botín.</p>'+
  '<h3>Dentro de una zona</h3><ul>'+
  '<li><b>Buscar presa · 2 h:</b> te topas con un enemigo al azar de la zona y empieza un combate. Si huyes, vuelves a la lista de zonas.</li>'+
  '<li><b>Entrenar · 3 h:</b> una prueba de dados. Si la superas, ganas experiencia; si fallas, pierdes algo de Vida. Solo puedes entrenar <b>una vez al día</b> en cada zona.</li></ul>'+
  '<p class="tip">Antes de subir de nivel, comprueba tu Vida, tu Qi y tu equipo.</p>'
}},

/* 25 · Dao ──────────────────────────────────────────────────────── */
social:{ ver:['dados','acertijos','combate'], t:'Socializar', h:{
 dao:'<p>Cada día te cruzas con <b>cinco personajes distintos</b>. Mañana serán otros. Hablar con cualquiera cuesta <b>1 hora</b>.</p>'+
  '<h3>Qué te pueden ofrecer</h3><ul>'+
  '<li><b>Charla:</b> siempre sale bien. Pequeña recompensa: experiencia, monedas, Vida o Qi.</li>'+
  '<li><b>Reto:</b> una prueba de dados con el atributo que indica la opción. Si la superas, recompensa; si fallas, pierdes un poco de dinero o de Vida.</li>'+
  '<li><b>Duelo:</b> un combate (se marca con el símbolo ▲ rojo).</li>'+
  '<li><b>Enigma:</b> un acertijo que puedes resolver una sola vez.</li></ul>'+
  '<p>Con cada personaje solo puedes hacerlo <b>una vez al día</b>.</p>'+
  '<p class="tip">Antes de aceptar un reto, mira el atributo que pide entre paréntesis y comprueba que lo llevas bien.</p>'
}},

/* 26 · Dao ──────────────────────────────────────────────────────── */
tablon:{ ver:['tiempo','dados'], t:'El tablón de misiones', h:{
 dao:'<p>El tablón ofrece encargos de la secta. Se renuevan <b>cada dos días</b>: hay cuatro a la vez.</p>'+
  '<h3>Qué dice cada línea</h3>'+
  '<p>Nombre del encargo · horas que tarda · atributo de la prueba · recompensa (experiencia, monedas y a veces un objeto) · «hasta el día N».</p>'+
  '<h3>Cómo se hace</h3><ol>'+
  '<li>Pulsa el encargo. Se gastan las horas indicadas.</li>'+
  '<li>Se hace una prueba de dados con ese atributo.</li>'+
  '<li>Si la superas, recibes la recompensa. Si fallas, pierdes <b>5 de Vida</b>.</li></ol>'+
  '<p>Cada encargo se hace <b>una sola vez</b>, salga bien o mal.</p>'+
  '<p class="tip">Solo puedes empezar uno si te da tiempo de terminarlo <b>antes de medianoche</b>. Si no, aparece bloqueado hasta el día siguiente.</p>'
}},

/* 27 · Dao ──────────────────────────────────────────────────────── */
comedor:{ ver:['tiempo','cabecera'], t:'El comedor', h:{
 dao:'<p>Madre Lin cocina cada día un menú de <b>cinco platos</b> que cambia de un día para otro.</p>'+
  '<h3>Qué ves en cada plato</h3><ul>'+
  '<li>Su <b>precio</b> en monedas.</li>'+
  '<li>Cuánta <b>Vida</b> y cuánto <b>Qi</b> recuperas.</li>'+
  '<li>Que cuesta <b>1 hora</b>.</li></ul>'+
  '<p>Pulsa un plato para comerlo. Si no te alcanza el dinero, aparece apagado. Puedes pedir más de uno.</p>'+
  '<p class="tip">Es una buena forma de curarte sin gastar píldoras. Compara cuánta Vida te da cada plato por moneda.</p>'
}},

/* 28 · Senda ────────────────────────────────────────────────────── */
furor:{ ver:['runas','berserker'], t:'El Furor', h:{
 senda:'<p>El Furor es la <b>barra dorada</b> de la cabecera. Mide tu rabia de guerrero, de 0 a 100, y alimenta tus runas.</p>'+
  '<h3>Cómo se gana</h3><ul>'+
  '<li><b>Golpear:</b> +8.</li>'+
  '<li><b>Cubrirte con la guardia:</b> +6.</li>'+
  '<li><b>Recibir una herida:</b> +10.</li>'+
  '<li>Algunas runas, como Wunjo o Ingwaz, y el <b>cuerno de hidromiel</b> (+30).</li></ul>'+
  '<h3>Cómo se gasta</h3>'+
  '<p>Cada runa cuesta Furor, por ejemplo «10 Furor». Si no llegas, el botón de esa runa se apaga.</p>'+
  '<h3>Otros detalles</h3><ul>'+
  '<li>Empiezas todo combate con <b>al menos 20</b>.</li>'+
  '<li>Se <b>conserva</b> entre combates.</li>'+
  '<li><b>Dormir</b> lo vacía por completo.</li>'+
  '<li>Con <b>100</b> puedes desatar la furia berserker.</li></ul>'+
  '<p class="tip">Golpe y Guardia son tus fuentes seguras de Furor. Si te quedas sin él, úsalos hasta recuperar.</p>'
}},

/* 29 · Senda ────────────────────────────────────────────────────── */
berserker:{ ver:['furor','guardia'], t:'Furia berserker', h:{
 senda:'<p>Cuando tu Furor llega a <b>100</b>, en el combate aparece el botón <b>«¡Furia berserker!»</b>.</p>'+
  '<h3>Qué hace</h3><ul>'+
  '<li>Durante tus <b>3 turnos siguientes</b>, tu Golpe y tus runas de daño hacen <b>el doble</b>.</li>'+
  '<li>Gasta <b>todo tu Furor</b>: vuelve a 0.</li>'+
  '<li>Activarla <b>no gasta tu turno</b>: puedes golpear enseguida.</li></ul>'+
  '<h3>Lo que no puedes hacer mientras dura</h3><ul>'+
  '<li>Cubrirte con la guardia.</li><li>Huir del combate.</li></ul>'+
  '<p>Sí puedes seguir usando runas y objetos.</p>'+
  '<p class="tip">Úsala contra enemigos con mucha Vida o para rematar rápido. Si necesitas protegerte, espera a que termine.</p>'
}},

/* 30 · Senda ────────────────────────────────────────────────────── */
runas:{ ver:['furor','berserker','estados','taller','grabado'], t:'Las runas', h:{
 senda:'<p>Las runas son tus <b>poderes especiales</b> en combate. Hay 24, repartidas en tres grupos (ættir): Freyr, Hagal y Tyr. Las vas consiguiendo según avanza la historia.</p>'+
  '<h3>Aprender una runa</h3>'+
  '<p>Con piedras rúnicas (en Estado → bolsa → «Aprender») y con otras recompensas de la historia. Si tienes hueco, se prepara sola.</p>'+
  '<h3>Prepararlas</h3><ol>'+
  '<li>Abre <b>Estado → «Runas»</b>.</li>'+
  '<li>Pulsa <b>«Preparar»</b> en las que quieras llevar al combate, o <b>«Quitar»</b> para dejarlas.</li></ol>'+
  '<p>Puedes llevar <b>hasta 4</b> a la vez, y al menos una. Si ya llevas 4, quita una antes.</p>'+
  '<h3>En combate</h3>'+
  '<p>Cada runa gasta <b>Furor</b> y su botón resume su efecto: daño, curación, escudo, aturdir, esquivar, quemar, regenerar… El daño suma tu atributo (×2) y 3 por rango.</p>'+
  '<h3>Mejorarlas</h3>'+
  '<p>En el taller de la völva: de +1 a <b>+5</b>, con <b>+12 % de efecto</b> por nivel. Cada mejora cuesta <b>1 hora</b> y plata, más cara cuanto más avanzado es su grupo.</p>'
}},


/* ═══════════════════════ TANDA 4 (solo La Senda) ═══════════════════════ */

/* 31 ────────────────────────────────────────────────────────────── */
estados:{ ver:['runas','berserker','combate'], t:'Estados de combate', h:{
 senda:'<p>Bajo la línea de «Intención» aparece, cuando hay alguno, la lista de <b>estados activos</b>, separados por puntos. Se apagan solos cuando se agotan.</p><ul>'+
  '<li><b>Escudo rúnico ×N:</b> los próximos N golpes que recibas hacen un <b>60 % menos</b> de daño.</li>'+
  '<li><b>Esquiva ×N:</b> esquivas los próximos N ataques.</li>'+
  '<li><b>Regeneración ×N:</b> durante N turnos recuperas Vida.</li>'+
  '<li><b>Próximo golpe crítico:</b> tu siguiente golpe, o tu siguiente runa de daño, será crítico (+60 % de daño).</li>'+
  '<li><b>Furia berserker: N turnos:</b> tu daño se duplica mientras dure.</li>'+
  '<li><b>«Enemigo arde (N)»:</b> el enemigo pierde de 3 a 6 de Vida por turno durante N turnos más.</li></ul>'+
  '<h3>Aturdido</h3>'+
  '<p>Si un enemigo está aturdido, lo dice la línea de Intención: ese turno <b>no atacará</b>.</p>'
}},

/* 32 ────────────────────────────────────────────────────────────── */
taller:{ ver:['runas'], t:'El taller de runas', h:{
 senda:'<p>En el taller de la völva refuerzas las runas que ya conoces.</p><ol>'+
  '<li>Elige una runa de la lista. Cada botón muestra su nivel actual y lo que cuesta subirla.</li>'+
  '<li>Púlsalo: la runa sube <b>un nivel</b> y pasa <b>1 hora</b>.</li></ol>'+
  '<p>Cada nivel aumenta un <b>12 %</b> el efecto de la runa, hasta <b>+5</b>. Un botón apagado significa que no te alcanza la plata o que la runa ya está al máximo.</p>'+
  '<h3>Cuánto cuesta</h3>'+
  '<p>El precio es <b>20 de plata × el nivel al que subes × el grupo de la runa</b> (Freyr cuenta 1, Hagal 2 y Tyr 3).</p>'+
  '<div class="ej"><p>Subir una runa de Freyr: 20, 40, 60, 80 y 100.</p><p>De Hagal: 40, 80, 120, 160 y 200.</p><p>De Tyr: 60, 120, 180, 240 y 300.</p></div>'+
  '<p class="tip">Mejora primero las runas que más uses en combate.</p>'
}},

/* 33 ────────────────────────────────────────────────────────────── */
grabado:{ ver:['equipo','runas'], t:'Grabar una runa en el arma', h:{
 senda:'<p>Brok puede <b>grabar una runa en tu arma</b>. Es un poder pasivo: funciona siempre, sin gastar Furor, mientras lleves esa arma.</p>'+
  '<h3>Cómo se hace</h3><ol>'+
  '<li><b>Equipa</b> el arma que quieras grabar.</li>'+
  '<li>Elige la runa en la lista (solo salen las que conoces). Cada botón explica su efecto.</li>'+
  '<li>Se gasta el coste y pasan <b>2 horas</b>.</li></ol>'+
  '<h3>Qué debes saber</h3><ul>'+
  '<li><b>Coste:</b> 80 de plata y 2 de savia de raíz. A veces Brok te hace un grabado gratis.</li>'+
  '<li>Cada arma admite <b>una sola runa</b>: grabar otra borra la anterior.</li>'+
  '<li>El efecto va con el arma. Si cambias de arma, dejas de tenerlo.</li></ul>'+
  '<div class="ej"><p>Algunos efectos: Thurisaz da +5 de ataque; Uruz, 15 de Vida al ganar un combate; Algiz, +8 % de defensa y +2 de armadura; Mannaz, curarte un 25 % del daño de cada golpe.</p></div>'
}},

/* 34 ────────────────────────────────────────────────────────────── */
juramentos:{ ver:['favores','progreso','hilos'], t:'Juramentos', h:{
 senda:'<p>A veces la historia te propone <b>jurar algo</b>: una promesa con plazo. Te avisa con «Has jurado: …» y te dice hasta qué día tienes.</p>'+
  '<h3>Dónde los ves</h3>'+
  '<p>En <b>Estado → «Juramentos»</b>. Cada uno muestra si está en curso, cumplido o roto, su plazo y la Gloria que vale.</p>'+
  '<h3>Si lo cumples</h3>'+
  '<p>Haces lo prometido antes de que acabe el plazo: ganas esa <b>Gloria</b> y queda anotado en tu saga.</p>'+
  '<h3>Si lo rompes</h3>'+
  '<p>Si el plazo termina sin cumplirlo, pierdes <b>la mitad de esa Gloria</b> y tu nombre se mancha. En Estado se cuenta cuántos juramentos has roto.</p>'+
  '<p class="tip">Antes de jurar, piensa si te dará tiempo: el reloj sigue corriendo.</p>'
}},

/* 35 ────────────────────────────────────────────────────────────── */
favores:{ ver:['juramentos','progreso'], t:'Favores de los dioses', h:{
 senda:'<p>Son <b>bonus permanentes</b> que te concede un dios por tus decisiones en la historia. No se gastan ni hay que activarlos: actúan solos. Los ves en <b>Estado → «Juramentos»</b>.</p>'+
  '<h3>Los siete favores</h3><ul>'+
  '<li><b>Tyr:</b> +25 % de Gloria en cada victoria.</li>'+
  '<li><b>Thor:</b> +5 de ataque.</li>'+
  '<li><b>Odín:</b> +1 en todas tus tiradas de dados.</li>'+
  '<li><b>Freya:</b> tus curaciones sanan un 25 % más.</li>'+
  '<li><b>Heimdal:</b> +10 de velocidad (esquivas más).</li>'+
  '<li><b>Skadi:</b> el doble de probabilidad de botín.</li>'+
  '<li><b>Loki:</b> +15 % de crítico, pero las victorias dan un 20 % menos de Gloria.</li></ul>'+
  '<p class="tip">El favor de Loki es un trato con trampa: más daño a cambio de progresar más despacio en rango.</p>'
}},

/* 36 ────────────────────────────────────────────────────────────── */
hilos:{ ver:['dados','favores'], t:'Hilos de las Nornas', h:{
 senda:'<p>Los hilos son tu segunda oportunidad: cada uno te permite <b>repetir una tirada de dados fallida</b>. Empiezas con <b>3</b>.</p>'+
  '<h3>Cómo se usan</h3><ol>'+
  '<li>Haces una prueba de dados y fallas.</li>'+
  '<li>Aparecen dos botones: <b>«Tirar de un hilo de las Nornas y repetir»</b> (te dice cuántos te quedan) y <b>«Aceptar el destino»</b>.</li>'+
  '<li>Si tiras del hilo, se lanzan los dados otra vez y esa tirada es la que vale.</li></ol>'+
  '<p>Si vuelves a fallar y aún te quedan hilos, puedes gastar otro.</p>'+
  '<h3>Dónde ves los que tienes</h3>'+
  '<p>En <b>Estado → «Juramentos»</b>, al final, y en la cabecera junto a la Gloria.</p>'+
  '<p>Algunas recompensas de la historia te dan más.</p>'+
  '<p class="tip">Guárdalos para las pruebas importantes: un fallo en un momento clave suele costar más que uno cualquiera.</p>'
}},

/* 37 ────────────────────────────────────────────────────────────── */
senales:{ ver:['tiempo','decisiones'], t:'Señales del Ragnarok', h:{
 senda:'<p>Mientras pasan los días del Gran Invierno, algunos días traen <b>avisos del fin del mundo</b>: un aullido enorme, un sol pálido, hielo en pleno verano…</p>'+
  '<h3>Cómo las ves</h3>'+
  '<p>Aparecen en el mensaje verde de arriba al empezar el día, junto al «Amanece…».</p>'+
  '<h3>Para qué sirven</h3><ul>'+
  '<li>Cuentan cómo avanza la historia y te recuerdan que el tiempo corre.</li>'+
  '<li>Algunas misiones solo se pueden hacer <b>antes de una señal concreta</b>.</li></ul>'+
  '<p>No cambian tus estadísticas.</p>'+
  '<p class="tip">Si una misión menciona un plazo, vigila los días: la caja de «Misión principal» te dice cuál es tu siguiente objetivo.</p>'
}},

/* 38 ────────────────────────────────────────────────────────────── */
injurias:{ ver:['dados','progreso'], t:'Duelo de injurias', h:{
 senda:'<p>Un duelo de ingenio en lugar de espadas: el rival te lanza una provocación y tú contestas.</p><ol>'+
  '<li><b>Lee la provocación</b> del rival.</li>'+
  '<li><b>Elige tu réplica.</b> Solo una es la más certera; el orden cambia en cada asalto.</li>'+
  '<li>Verás ✔ o ✘ y un comentario sobre cómo ha sentado.</li>'+
  '<li>Así hasta acabar los asaltos. El marcador dice «Asalto 2 de 3 · Aciertos: 1».</li></ol>'+
  '<p>Ganas si consigues suficientes aciertos: normalmente <b>más de la mitad</b> de los asaltos. Ganar trae una recompensa; perder, una pequeña penalización.</p>'+
  '<p>Cada duelo se puede disputar <b>una sola vez</b> con ese rival.</p>'+
  '<p class="tip">Piensa en cómo respondería alguien con humor nórdico: seco, orgulloso y con segundas.</p>'
}},

/* 39 ────────────────────────────────────────────────────────────── */
saga:{ ver:['juramentos'], t:'La Saga', h:{
 senda:'<p>La Saga es el <b>registro de tus hazañas</b>, tal como las contaría un escaldo.</p>'+
  '<ul><li>Se escribe sola: la historia añade una línea en los grandes momentos, y también cuando <b>cumples un juramento</b>.</li>'+
  '<li>La encuentras en <b>Estado → «Saga»</b>.</li>'+
  '<li>Debajo aparecen los <b>finales</b> que has visto.</li></ul>'+
  '<p>No cambia tus estadísticas: es tu memoria y tu orgullo.</p>'
}},

/* 40 ────────────────────────────────────────────────────────────── */
protagonista:{ ver:['atributos','guardado'], t:'Elegir protagonista', h:{
 senda:'<p>Puedes llevar a <b>Ulf</b> o a <b>Astrid</b>. La historia es la misma: cambian la voz, algunos diálogos y sus fuerzas.</p>'+
  '<h3>En qué se diferencian</h3><ul>'+
  '<li><b>Ulf</b> (guerrero): Fuerza 4, Astucia 3, Espíritu 2, Suerte 3. Más fuerte que astuto: pega más fuerte.</li>'+
  '<li><b>Astrid</b> (escudera): Fuerza 3, Astucia 4, Espíritu 3, Suerte 2. Más astuta que fuerte: esquiva mejor y tiene más Espíritu para las runas.</li></ul>'+
  '<p>Ninguno es mejor: depende de cómo quieras jugar. Tu elección vale para toda la partida.</p>'+
  '<p class="tip">Empezar una partida nueva <b>sustituye la guardada</b>. Si quieres conservarla, expórtala antes desde el menú.</p>'
}}
});

/* Cierres comunes que se colocan detrás del texto específico de cada libro */
(function(){
  var T = LJInfo.TEXTOS;
  T.tiempo.h.senda += '<h3>Por qué importa</h3><p>Algunas cosas solo se pueden hacer a partir de cierto día, o antes de cierta hora. Los <b>juramentos</b> tienen un plazo en días.</p>'+
    '<p class="tip">Si te quedan pocas horas, aprovecha para dormir: empezarás el día siguiente con todo recuperado.</p>';
  T.tiempo.h.dao += '<h3>Por qué importa</h3><p>Algunas cosas solo se pueden hacer a partir de cierto día, o antes de cierta hora. Por ejemplo, una misión del tablón solo puede empezarse si te da tiempo a terminarla <b>antes de medianoche</b>.</p>'+
    '<p class="tip">Si te quedan pocas horas, aprovecha para dormir: empezarás el día siguiente con todo recuperado.</p>';
  var cierre = '<h3>Cuándo conviene</h3><ul><li>Cuando estés herido y no quieras arriesgarte en otro combate.</li>'+
    '<li>Para cerrar el día y empezar el siguiente con todo recuperado.</li></ul>'+
    '<p class="tip">Como cuesta 8 horas, comprueba antes que no tienes nada con plazo hoy. La opción de dormir aparece en lugares donde puedes descansar, como tu cama o una fogata.</p>';
  T.dormir.h.dao += cierre; T.dormir.h.senda += cierre;
  /* La forja: la parte «Mejorar» es común, con las cifras de cada libro */
  var mej = '<h3>Mejorar · 1 hora</h3><p>Subes una pieza que ya tienes, de +0 hasta <b>+5</b>. Cada nivel cuesta más:</p><ul>'+
    '<li><b>Dinero:</b> %D.</li>'+
    '<li><b>Material:</b> %M. Necesitas 1 unidad para el +1, 2 para el +2, y así hasta 5 para el +5.</li></ul>'+
    '<p>Qué ganas con cada nivel: las <b>armas</b> suman <b>+3 de ataque</b>; los <b>escudos y armaduras</b> suman <b>+2 de armadura</b> y <b>+1 de defensa</b>.</p>';
  T.forja.h.dao += mej.replace('%D','40 monedas para el +1, 80 para el +2, 120 para el +3, 160 para el +4 y 200 para el +5').replace('%M','mineral de hierro frío');
  T.forja.h.senda += mej.replace('%D','30 de plata para el +1, 60 para el +2, 90 para el +3, 120 para el +4 y 150 para el +5').replace('%M','hierro de pantano');
})();
