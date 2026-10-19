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
   ===================================================================== */
LJInfo.registrar({

/* 1 ─────────────────────────────────────────────────────────────── */
cabecera:{ ver:['tiempo','estado'], t:'La cabecera', h:{
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
dados:{ ver:['atributos'], t:'Pruebas de dados', h:{
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
  '<h3>Cómo subirlos</h3><p>Con píldoras permanentes y con ciertas recompensas de la historia, como resolver enigmas.</p>',
 senda:'<h3>Qué hace cada uno</h3><ul>'+
  '<li><b>Fuerza:</b> sube tu <b>ataque</b>. Cada punto añade +2.</li>'+
  '<li><b>Astucia:</b> sube tu <b>velocidad</b> (más posibilidades de esquivar) y te ayuda a <b>huir</b> de un combate.</li>'+
  '<li><b>Espíritu:</b> potencia tus <b>runas</b> y su poder de curación.</li>'+
  '<li><b>Suerte:</b> sube la probabilidad de <b>golpe crítico</b> (daño extra).</li></ul>'+
  '<h3>Cómo subirlos</h3><p>Con algunos objetos y con ciertas recompensas de la historia.</p>'
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
})();
