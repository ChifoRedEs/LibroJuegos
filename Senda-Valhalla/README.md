# La Senda al Valhalla

LibroJuego de mitología nórdica en 4 capítulos. Cada capítulo tiene entre 80 y 90 escenas, repartidas en 3 partes.

> Vas a morir en la cama, y quien muere en la cama no entra en el salón de Odín. Una valquiria te ofrece un invierno de vida prestada para ganarte el Valhalla antes de que llegue el Ragnarok.

---

## Estado del proyecto

| Capítulo | Parte | Título | Estado |
|---|---|---|---|
| 1 · La Muerte de Paja | 1 | El trato de la Valquiria | ✅ Hecha (42 escenas, 7 de combate) |
| | 2 | El salón del jarl | ✅ Hecha (37 escenas, 5 de combate) |
| | 3 | El túmulo del rey draug | ✅ Hecha (48 escenas, 9 de combate) |
| 2 · Bajo las Raíces | 1 | El descenso | ✅ Hecha (46 escenas, 5 de combate) |
| | 2 | La forja de los hermanos | ✅ Hecha (60 escenas, 5 de combate) |
| | 3 | El gusano de la veta de oro | Pendiente |
| 3 · El Invierno sin Fin | 1–3 | | Pendiente |
| 4 · El Crepúsculo | 1–3 | | Pendiente |

**El Capítulo 1 está completo (128 escenas).** Su última escena, `c1_fin`, enlaza ahora con `c2_inicio`.

La escena `c2_p3` es un enlace provisional al final de la Parte 2 del Capítulo 2. Hay que sustituirla al escribir la Parte 3.

**Pendiente para la Parte 3 del Capítulo 2:** el juramento `fafnir` (traer el oro de la veta para el tercer tesoro de Brok) vence cuatro días después de la Gran Forja; hay que cumplirlo con `cumple:'fafnir'`. Regin acompaña al protagonista: Fafnir es su hermano. Marcas útiles: `hreidmar_charla`, `veta_vista`, `alvis_piedra`, `kraka_perdona`/`kraka_ofendido`, `mosca_ok` (0 a 3: calidad de los tesoros), `lopt_apuesta`, `rey_enano`, `dain_salvado`/`dain_muerto`, `loki_visto`.

**Marcas del Capítulo 1 que el Capítulo 2 puede usar:** `lobo_libre` (el Lobo Ceniza es aliado), `siri_aprendiz`/`siri_no`, `jur_siri`, `torgil_vencido`/`torgil_gana`/`torgil_ayuda`, `copa_dev` y `rolf_paz` (Rolf descansó en paz) o `saqueo` (se saqueó su tumba), `einar_paz`/`einar_cae`, `dar` (ayudó a Gudrun), `marca_jarl` y el favor `tyr`.

---

## Premisa

Ulf (o Astrid, según elija el jugador) es un guerrero (o una guerrera) veterano de Vindvik, una aldea de pescadores junto a un fiordo. Después de tres incursiones y un naufragio, se está muriendo de unas fiebres en la cama. Es la muerte de paja, la peor para un nórdico: lleva al reino gris de Hel y no al Valhalla.

En su última noche se le aparece **Skuld**, una valquiria, y le ofrece un trato. Le da un invierno de vida para ganarse un sitio entre los guerreros de Odín. Ese invierno resulta ser el **Fimbul**, el Gran Invierno que anuncia el **Ragnarok**. Si cuando llegue el fin del mundo no ha acumulado suficiente Gloria, su alma será de Hel.

**El giro final.** En los mitos, Skuld es también la Norna de «lo que ha de ser». No eligió al protagonista por casualidad: está tejiendo un hilo para cambiar el desenlace del Ragnarok, y el protagonista es su apuesta.

### Tono
Es una aventura épica con humor. El contrapunto cómico lo pone **Kraka**, un cuervo sarcástico y chismoso, igual que hacía el Abuelo Pei en Camino-Qi.

---

## Protagonistas

El jugador elige al empezar. La historia es la misma, pero cambian el nombre, la concordancia de género en el texto y los atributos iniciales.

| | Fuerza | Astucia | Espíritu | Suerte | Perfil |
|---|---|---|---|---|---|
| **Ulf** | 4 | 3 | 2 | 3 | Más fuerte que astuto |
| **Astrid** | 3 | 4 | 3 | 2 | Más astuta que fuerte |

En los textos de las escenas se usa `{N}` para el nombre y `{masculino|femenino}` para las palabras que cambian (por ejemplo, `cansad{o|a}` o `{tío|tía}`).

---

## Personajes

Los nombres están simplificados para que se pronuncien con facilidad en castellano.

| Personaje | Quién es |
|---|---|
| **Skuld** | Valquiria (y Norna) que marca al protagonista. Aparece en los momentos clave. |
| **Kraka** | Cuervo expulsado del servicio de Hugin y Munin por contar un chisme sobre Thor y una cabra. Es el compañero de toda la aventura. |
| **Siri** | Sobrina del protagonista, de 13 años. Perdió a sus padres en el mar. Es su ancla emocional. |
| **Groa** | Völva (vidente) ciega de Vindvik. Enseña las primeras runas y lleva el caldero. |
| **Hakon** | Jarl de Vindvik. Desconfiado y práctico. |
| **Eyvind** | Escaldo del jarl. Compone la saga del protagonista. |
| **Torgil** | Rival arrogante del salón del jarl (Capítulo 1, Parte 2). |
| **Grim el Tuerto** | Jefe de saqueadores que esclaviza lobos con una piedra rúnica. |
| **Lobo Ceniza** | Lobo enorme esclavizado por Grim. Se le puede matar o liberar. |
| **El rey Rolf** | Rey antiguo enterrado en las colinas, convertido en draug. |
| **Brok y Eitri** | Hermanos enanos, los mejores herreros de los nueve mundos. |
| **Ratatosk** | Ardilla mensajera de Yggdrasil. Lleva chismes e insultos entre el águila y el dragón. |
| **Alvis** | Enano sabelotodo, rival en un duelo de acertijos. |
| **Utgard-Loki** | Rey gigante maestro de las ilusiones. |
| **Loki** | Aparece disfrazado durante toda la historia. |

---

## Mecánicas

- **Vida y Furor.** El Furor va de 0 a 100. Se gana golpeando (+8), cubriéndose (+6) y recibiendo heridas (+10), y se gasta en runas. Cada combate empieza con al menos 20 de Furor.
- **Furia berserker.** Con el Furor al 100 % puedes desatarla: daño doble durante 3 turnos, sin poder cubrirte ni huir.
- **Gloria y rangos.** Bóndi (0) → Drengr (100) → Hersir (350) → Jarl (800) → Elegido o Elegida (1500). Cada rango sube la Vida máxima en 25. Los actos deshonrosos restan Gloria.
- **Runas.** Son las 24 runas del Futhark antiguo, repartidas en sus tres ættir (familias de 8). Cada capítulo desbloquea un ætt. Puedes llevar 4 preparadas en combate. La völva las mejora hasta +5, con un 12 % más de efecto por nivel. También se aprenden con **piedras rúnicas**.
- **Juramentos.** Juras una hazaña con un plazo en días. Si la cumples, ganas Gloria. Si la rompes, pierdes la mitad de esa Gloria y el nombre queda manchado (niding).
- **Hilos de las Nornas.** Empiezas con 3. Cada hilo permite repetir una tirada de dados fallida.
- **Favores de los dioses.** Son bendiciones pasivas que se ganan superando la prueba de cada dios: Tyr, Thor, Odín, Freya, Heimdal, Skadi y Loki.
- **Señales del Ragnarok.** Ciertos días traen avisos del fin del mundo. Algunas misiones solo se pueden hacer antes de una señal concreta.
- **Forja enana.** Sirve para forjar y mejorar equipo con hierro de pantano y materiales de criaturas. En el Capítulo 2 se añade el grabado de runas en las armas.
- **Caldero de la völva.** Ungüentos, tónicos e hidromiel.
- **Duelos de injurias.** Combates verbales en el salón: eliges la réplica más ingeniosa en cada asalto.
- **Acertijos.** Duelos de enigmas, como el de Odín o el del enano Alvis.
- **La saga.** El juego va anotando las hazañas reales del jugador, y un escaldo las recita en los finales.

---

## Capítulo 1 · La Muerte de Paja
**Escenario:** Midgard, la aldea de Vindvik y sus alrededores.
**Runas:** Ætt de Freyr (Fehu, Uruz, Thurisaz, Ansuz, Raidho, Kenaz, Gebo, Wunjo).

### Parte 1 · El trato de la Valquiria ✅
El protagonista agoniza. Skuld le ofrece el trato, y si lo rechaza llega el primer final: «La muerte de paja». Despierta curado y con una runa en la palma, mientras nieva en pleno verano: es la primera señal del Fimbul. Conoce a Kraka. El jarl Hakon sospecha que es un draug y le exige una prueba (de hierro, de fuerza o mostrando la marca). La völva Groa reconoce la marca de Skuld y le enseña **Fehu**. Primer juramento opcional: acabar con la amenaza del Bosque Gris en tres días. En el bosque descubre que los lobos los guían unos saqueadores con magia rúnica. Groa le enseña **Thurisaz** «con sangre». En el barranco del norte se enfrenta a Grim el Tuerto, y aquí está la primera decisión moral: matar al Lobo Ceniza o romper el hechizo y dejarlo libre. Hakon le da un sitio en su mesa y anuncia un banquete de Yule adelantado. Esa noche, las colinas de los túmulos brillan con luz azul.

### Parte 2 · El salón del jarl ✅
Es la base de vida diaria del capítulo, como el patio de Camino-Qi: el salón de día (el escaldo Eyvind cuenta la leyenda del rey Rolf y su espada Muerdetumbas; Torgil provoca), la herrería de Gunnar (forja), el puesto de la vieja Hild (tienda), la cabaña de Groa (caldero y taller de runas), las turberas (hierro de pantano), el muelle (duelo de injurias de práctica con Orm el Arenque) y el tablón de peticiones (la red de la viuda Ingrid, el zorro de Ulla y el hierro para Gunnar). Groa enseña **Uruz** (aguantar en el fiordo helado), **Raidho** (salvar a la pastora Asa de un oso en los pastos altos) y **Kenaz** (el primer draug, un ahogado de la tormenta en la que murió el hermano del protagonista). Siri pide ser aprendiz de la völva y el protagonista decide si responde por ella. En el banquete de Yule, la noche del día 5, se hacen los juramentos: bajar al túmulo del rey Rolf, hacer callar a Torgil o proteger a Siri. Después llega el **duelo de injurias** contra Torgil. Al final, el jinete Bersi trae la noticia: los muertos del rey Rolf han salido de las colinas.

### Parte 3 · El túmulo del rey draug ✅
Los draugs del rey Rolf atacan la granja de Bersi. El protagonista rescata a Gudrun y a la pequeña Thora (entrando a la fuerza o sin ser visto) y vence a un capitán draug, que antes de deshacerse revela la causa: alguien robó la copa del rey de su tumba. Si ayuda a Gudrun con plata o comida, Groa le enseña **Gebo**, la runa del regalo. Los chismes de la vieja Hild apuntan a Ketil, el padre de Torgil, que se hizo rico hace diez años. La copa se recupera por la fuerza, con astucia o, si Torgil fue humillado en Yule, con su ayuda. Groa enseña **Ansuz** con un acertijo.

En el túmulo hay un pasillo con trampa (leer las runas y pagar el peaje), la sala de la guardia (combate, sigilo o deslumbrar al guardián con Kenaz) y la puerta del rey (acertijo o fuerza bruta). En la cámara del barco, el jugador puede saquear la plata (pierde Gloria). Ante el rey Rolf hay dos caminos:
- **Con la copa y sin saquear:** combate de honor; Rolf entrega **Muerdetumbas** y descansa en paz.
- **Sin la copa, o habiendo saqueado:** combate a muerte contra un Rolf más fuerte.

Muerdetumbas hace daño extra a los no muertos. Al salir llega la **prueba de Tyr**: entregar el amuleto de Siri, un hilo de las Nornas o 15 de Vida máxima a cambio de su Favor, o no entregar nada.

De vuelta en Vindvik, Siri (si es aprendiz) o Groa le enseña **Wunjo**. Durante la celebración, los ahogados de la gran tormenta suben por el fiordo helado; si el jugador liberó al Lobo Ceniza, este vuelve para luchar a su lado. Al frente de los ahogados está **Einar**, el hermano del protagonista y padre de Siri: si Siri es aprendiz, puede cantarle el descanso; si no, hay que vencerlo. El salón del jarl arde (Torgil salva niños o huye, según el duelo de Yule). Al amanecer aparece Hugin, el cuervo de Odín, que envía al protagonista bajo las raíces de Yggdrasil. Skuld le regala un hilo, y llega la despedida de Siri y Groa.

---

## Capítulo 2 · Bajo las Raíces
**Escenario:** Las raíces de Yggdrasil y Nidavellir, la tierra de los enanos.
**Runas:** Ætt de Hagal (Hagalaz, Nauthiz, Isa, Jera, Eihwaz, Perthro, Algiz, Sowilo).

### Parte 1 · El descenso ✅
El protagonista baja por el pozo seco del Bosque Gris (con cuerda o de un salto) hasta las raíces de Yggdrasil. Ratatosk, la ardilla mensajera, solo ayuda a cambio de chismes: contarle el de Kraka, Thor y la cabra le encanta (y ofende a Kraka), el de Ketil le parece regular y un chisme inventado sobre Odín puede colar o no. A cambio da un mapa.

El centro de la parte es **el cruce de las raíces**: Nali, el buhonero enano (tienda con pan enano, setas de luz y la piedra rúnica de Eihwaz), caza de ratas, savia de Yggdrasil, un campamento para dormir, una charla nocturna con Kraka y la primera aparición de **Loki** disfrazado como «Lopt», un viajero pelirrojo. Desde el cruce salen tres caminos:
- **El manantial helado de Hvergelmir:** el protagonista arranca la runa **Isa** del hielo y se encuentra con **Nidhogg**. Puede sostenerle la mirada, huir o entregarle un insulto del águila por encargo de Ratatosk; el dragón suelta escamas y Ratatosk paga la respuesta con la piedra rúnica de Perthro.
- **El bosque de los ciervos:** Dain, el ciervo más viejo de Yggdrasil, está herido por una flecha élfica. Curarlo da la runa **Algiz** y un asta; cazarlo da carne curativa y astas, pero cuesta 30 de Gloria.
- **Las cuevas de los hongos:** un hongo dorado que puede subir la Vida máxima o provocar alucinaciones. Los elfos oscuros de **Kol el Pálido** tienen enjaulados a herreros enanos. Tras vencer a Kol (con sigilo, con Ansuz o en combate abierto) el protagonista rescata a **Regin**, aprendiz de Brok, que revela que un pelirrojo está armando a los gigantes para el Ragnarok.

La puerta de Nidavellir se abre con el aval de Regin, adivinando la contraseña o pagando 150 de plata.

### Parte 2 · La forja de los hermanos ✅
**Nidavellir** es la base de esta parte, una ciudad en anillos dentro de una montaña:
- **La casa de Hreidmar**, el padre de Regin: cuenta la historia de sus hijos Otr (al que mató un viajero pelirrojo) y Fafnir (que se llevó el oro maldito de Andvari a la veta de oro y se convirtió en dragón). Si Regin no fue rescatado, hay una posada en su lugar, y Brok no abre su forja hasta que vuelva su aprendiz.
- **La forja de Brok y Eitri:** forja con materiales de la Parte 1 (hacha de escama negra, escudo del ciervo, cota enana) y el **grabado de runas**. El primer grabado es gratis.
- **El Salón de las Runas de Dvalin:** enseña **Jera** tras cumplir tres encargos de los gremios, y **Eihwaz** tras dar descanso a Durin el Primero, un rey enano que se ha levantado de su tumba.
- **El Salón de los Gremios** (cuatro encargos): el gusano del pozo siete (mineros), hongos de lava (cerveceros), escoltar a la joyera Sindri por el puente de lava (joyeros) y vender una escama de Nidhogg (herreros).
- **Las minas profundas:** hierro, hongos de lava, gusanos de roca y la reja de la veta de oro, donde algo susurra «mío».
- **El mercado y la taberna del Yunque Sediento:** concurso de hidromiel, reconciliación con Kraka (si se ofendió en la Parte 1) y el **duelo de acertijos con Alvis**. Ganar da **Perthro**; o se le puede entretener con preguntas hasta que la luz del Pozo del Alba lo convierta en piedra, como hizo Thor.

**La Gran Forja:** Lopt, convertido en mosca, pica al protagonista tres veces mientras maneja el fuelle (guiño al mito de Mjolnir). Se resiste con tiradas, con las runas Isa o Ansuz o pidiendo a Kraka que se trague la mosca (sabe a manzana asada). Los aciertos deciden la calidad del jabalí de oro y del gemelo de Draupnir. Al final, Lopt se revela: la apuesta era de **tres tesoros**, y el tercero necesita el oro de la veta donde duerme **Fafnir**. Si no está en cuatro días, se llevará la cabeza de Brok. El protagonista puede jurar que traerá el oro. Brok le regala la cota enana, y Regin decide acompañarle.

### Parte 3 · El gusano de la veta de oro
Un descendiente de Nidhogg custodia la veta que necesitan los enanos. El protagonista forja su arma definitiva, y elegir qué runa grabar en ella cambia su estilo de combate. Llega la **prueba de Thor**. Aprende **Hagalaz, Nauthiz y Sowilo**. Al final canta **Fialar**, el primer gallo del fin del mundo.

---

## Capítulo 3 · El Invierno sin Fin
**Escenario:** Jotunheim, la tierra de los gigantes.
**Runas:** Ætt de Tyr (Tiwaz, Berkano, Ehwaz, Mannaz, Laguz, Ingwaz, Dagaz, Othala).

### Parte 1 · La tierra de los gigantes
El Fimbul está en su punto más duro. El protagonista participa en la **gran cacería con Skadi** (prueba de Skadi), cruza ríos helados y llega a una aldea de gigantes de escarcha pacíficos, lo que plantea un dilema moral. Aprende **Berkano y Ehwaz**.

### Parte 2 · Los juegos de Utgard-Loki
Es la gran prueba del capítulo: comer contra Logi, correr contra Hugi, beber de un cuerno sin fondo, levantar un gato gigante y luchar contra la anciana Eli. Todo es ilusión. Si el jugador lo sospecha y lo descubre, gana mucha Gloria. Aprende **Laguz, Mannaz y Ingwaz**.

### Parte 3 · El árbol del ahorcado
El protagonista llega al pozo de Mimir, donde puede sacrificar un ojo como hizo Odín para obtener más hilos de las Nornas. Llega la **prueba de Odín**: colgar nueve noches de Yggdrasil para comprender las últimas runas, **Tiwaz, Dagaz y Othala**. Fenrir rompe su cadena y Loki escapa, y aquí está la gran decisión moral del juego: Loki ofrece un pacto. Al final canta **Gullinkambi**, el gallo de Asgard.

---

## Capítulo 4 · El Crepúsculo
**Escenario:** Asgard y la llanura de Vigrid.
**Runas:** Bandrunas maestras (combinaciones de dos runas) y la runa secreta de Skuld.

### Parte 1 · El puente que arde
El protagonista cruza el puente Bifrost y supera la **prueba de Heimdal** en la puerta. Las 540 puertas del Valhalla están cerradas, y los einherjar, los guerreros elegidos, le someten a su prueba: un día entero de combate y un banquete por la noche. Aquí se revela quién es Skuld en realidad.

### Parte 2 · La víspera
Es la última vuelta por los salones de los dioses para reunir favores, cumplir los juramentos pendientes y prepararse. Freya ofrece un lugar en su salón de Folkvang (**prueba de Freya**). Canta el tercer gallo, el rojo de Hel, y suena el cuerno Gjallarhorn.

### Parte 3 · Ragnarok
Es la batalla final en la llanura de Vigrid. Las elecciones del jugador deciden a quién puede ayudar: a Thor contra la Serpiente del Mundo, a Tyr contra el perro Garm o a Odín contra Fenrir. Después llegan los finales.

---

## Finales

| Final | Condición |
|---|---|
| **La muerte de paja** | Rechazar el trato de Skuld (Capítulo 1). |
| **Valhalla** | Gloria suficiente: cae con honor y es elegido o elegida. |
| **Folkvang** | Tener el Favor de Freya: ella elige antes que Odín. |
| **Hel** | Gloria insuficiente o demasiados juramentos rotos. |
| **El hilo de Loki** | Haber aceptado el pacto de Loki: lucha en el bando de los gigantes. |
| **El que vio el amanecer** (oculto) | Todos los juramentos cumplidos, el favor de todos los dioses y la runa de Skuld. Sobrevive al Ragnarok y despierta en el mundo renacido. |

---

## Estructura de archivos

```
Senda-Valhalla/
├── index.html              ← carga el motor y las partes (añade aquí cada parte nueva)
├── README.md
├── css/estilos.css         ← tema: hielo, sangre y oro (sobre ../comun/libro.css)
├── js/
│   ├── datos.js            ← protagonistas, runas, favores, objetos, enemigos, tiendas, forja, caldero
│   └── motor.js            ← motor del juego
└── capitulos/
    ├── c1/
    │   ├── parte1.js       ← escenas c1_* de la Parte 1
    │   ├── parte2.js       ← Parte 2 (amplía c1_aldea, c1_casa y c1_groa2 con SC.<escena>.c.push)
    │   └── parte3.js       ← Parte 3 y final del capítulo (c1_fin)
    └── c2/
        ├── parte1.js       ← escenas c2_* de la Parte 1 (convierte c1_fin en enlace)
        └── parte2.js       ← Parte 2 (Nidavellir, forja y grabado, la Gran Forja)
```

### Cómo escribir una parte nueva
Cada parte es un archivo que llama a `registrarCapitulo({capitulo, parte, titulo, escenas:{…}})`. También puede usar estas funciones:

- `registrarMision(S => texto | null)`: el texto de la misión principal (se usa el primer resultado que no sea `null`).
- `registrarSenales({dia: texto})`: las señales del Ragnarok.
- `registrarAcertijos({...})` y `registrarSenna({...})`: acertijos y duelos de injurias.
- `Object.assign(ENEMIGOS, {...})`, `OBJ`, `TIENDAS`, y `FORJA.push(...)` o `CALDERO.push(...)` para ampliar los datos.

**Campos de una escena:**

| Campo | Para qué sirve |
|---|---|
| `h` | Título |
| `t` | Párrafos |
| `c` | Decisiones |
| `fx` | Efectos al entrar |
| `cp` | Punto de guardado |
| `mision` | Muestra el recuadro de misión |
| `sort` | Agrupa las decisiones por tipo |
| `back` | Escena a la que lleva «Volver» |
| `f` | Combate: `{e, win, lose, flee}` |
| `shop` | Tienda |
| `forja` | Forja |
| `caldero` | Caldero |
| `taller` | Taller de runas |
| `grabado` | Grabado de una runa en el arma equipada |
| `acertijo` | Acertijo |
| `senna` | Duelo de injurias |
| `end` | Final |
| `saga` | Recita la saga en el final |
| `gen` | Nombre de una función de `GEN` que devuelve `{t:[…]}`: textos que cambian según lo que hizo el jugador |

**Campos de una decisión:**

| Campo | Para qué sirve |
|---|---|
| `x` | Texto |
| `to` | Escena de destino |
| `k` | Tipo: `main` (historia), `shop`, `hunt`, `social`, `side` o `n` |
| `req` | Requisitos |
| `oc` | Ocultar la decisión si no se cumplen los requisitos |
| `fx` | Efectos |
| `chk` | Tirada: `{s, dc, ok, ko, fxok, fxko}` |

**Efectos (`fx`):** `hp`, `fu`, `plata`, `item`, `quita`, `equipa`, `runa`, `fl`, `st`, `mhp`, `hilo`, `gl`, `favor`, `jura:{id, txt, dias, gl}`, `cumple:'id'`, `saga:'texto'`, `suma:{marca:n}` (suma n a un contador), `fin:'texto'` (anota un final o capítulo completado), `t` (horas), `hasta` (avanza hasta esa hora), `dormir`.

**Requisitos (`req`):** `item`, `fl`, `no`, `min:{marca:n}` y `max:{marca:n}` (contadores), `st:[atributo, valor]`, `plata`, `dia`, `gl`, `rg`, `hilos`, `runa`, `hmin`, `hmax`.

**Runas grabadas (`GRABADO` en `datos.js`):** cada runa da al arma un efecto pasivo: bonificaciones fijas (`atq`, `crit`, `def`, `arm`, `vel`, `am`) o efectos al golpear (`aturde` y `quema` en %, `roba` en % del daño, `fuG` Furor extra, `curaV` Vida al vencer).

**Objetos:** además de `atq`, `def`, `arm`, `crit` y `vel`, un arma puede tener `am` (daño extra contra no muertos y draugs).

Antes de dar una parte por terminada, usa **«Comprobar la historia»** en el menú. Revisa enlaces rotos, escenas inalcanzables y datos que falten.
