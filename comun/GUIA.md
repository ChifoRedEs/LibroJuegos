# Estándar de diseño de LibroJuegos

Todas las historias comparten una misma hoja de estilos, `comun/libro.css`. Cada historia solo añade un tema pequeño con sus colores, su fuente de títulos y su emblema. Así todas se leen como libros de la misma colección, y cada una conserva su carácter.

## Estructura

```
LibroJuegos/
├── index.html            ← biblioteca (catálogo en la lista LIBROS)
├── comun/
│   ├── libro.css         ← el estándar: no se toca desde una historia
│   └── GUIA.md
└── Mi-Historia/
    ├── index.html
    └── css/estilos.css   ← tema: solo variables y detalles propios
```

## Crear una historia nueva

1. Copia la carpeta de una historia existente o crea una nueva junto a `Camino-Dao`.
2. En su `index.html`, carga las fuentes del estándar más la fuente de títulos que quieras. Después enlaza el estándar y, a continuación, el tema, en este orden:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Alegreya+Sans:wght@400;500;700&family=TU+FUENTE&display=swap">
<link rel="stylesheet" href="../comun/libro.css">
<link rel="stylesheet" href="css/estilos.css">
```

3. En `css/estilos.css`, redefine solo las variables que cambien, tanto para el modo oscuro como para el claro:

```css
:root{
  --mesa:#1a1210; --papel:#211b17; --acento:#c9774a;
  --f-titulo:"Tu Fuente",Georgia,serif;
  --emblema:"✠"; --orn:"❦";
}
@media (prefers-color-scheme:light){
  :root:not([data-theme="dark"]){ --mesa:#d8cfc2; --papel:#f8f2e4; --acento:#8e4a25; }
}
```

4. Añade la historia a la lista `LIBROS` de `LibroJuegos/index.html`.
5. En la portada de la historia, incluye `<a class=volver href="../index.html">Biblioteca de LibroJuegos</a>` antes del `<h1>`.

## Variables

| Variable | Para qué sirve |
|---|---|
| `--mesa`, `--mesa-luz` | Fondo detrás del libro y su halo de luz |
| `--papel`, `--papel-2`, `--canto` | Página, recuadros y hojas apiladas del borde |
| `--tinta`, `--tenue`, `--linea` | Texto, texto secundario y filetes |
| `--acento` | Color de la historia: títulos, capitular, selección |
| `--oro`, `--peligro`, `--exito`, `--azul` | Dinero o misión, vida o combate, aciertos, misiones secundarias |
| `--sobre-acento` | Texto encima de un botón activo |
| `--rar-comun`, `--rar-raro`, `--rar-epico`, `--rar-leg` | Colores de rareza de objetos y técnicas |
| `--f-titulo`, `--f-texto`, `--f-ui` | Títulos, lectura e interfaz |
| `--emblema` | Carácter sobre el título de la portada (vacío = sin emblema) |
| `--orn` | Florón bajo los capítulos y al final de cada pasaje |
| `--ancho`, `--pad` | Ancho de la página y margen interior |

## Piezas que reconoce el estándar

El motor solo tiene que generar este HTML para que todo se vea bien.

| Pieza | Marcado |
|---|---|
| Página | `<div id="app">` |
| Portada | `#app > a.volver`, `h1`, `p.sub`, botones y `p.tag` |
| Cabecera de lectura | `header.hud` con filas `.rw`, `.rn` (nombre de nivel), `.bw > .bar > i.hp / i.qi` y `button.sm` |
| Escena | `div.sc` con `h2` (capítulo, lleva capitular) y `p` sin clase (párrafos con sangría) |
| Decisiones | `.sc > button.k-main / k-shop / k-hunt / k-social / k-side / k-n`; los grupos van con `b.t.g-*` |
| Nota de misión y leyenda | `.mision`, `.leyenda > span.k-*` |
| Tirada o enigma | `.dice` |
| Combate | `.fight` con `b` (enemigo), `.log` y `.row` de botones |
| Final | `span.sello` |
| Pestañas | `.sc > .row > button(.on)` |
| Tiendas y listas | `.sc > button` o `.lst > button`, con el precio en `span.pr`; filas `.lst > .rw` y `.tec` |
| Estadísticas | `.stats` y `.stats.mini`; cabecera fija `.stk` |
| Textos auxiliares | `.tag`, `.ok`, `.warn`, `.oro`, `textarea` |

## Reglas

- Un tema nunca cambia medidas, márgenes ni componentes del estándar. Si algo debe cambiar para todas las historias, se cambia en `libro.css`.
- Los colores escritos en el JavaScript usan variables (por ejemplo, `var(--rar-raro)`) para que funcionen en el modo claro y en el oscuro.
- Comprueba siempre los dos modos (claro y oscuro) y el móvil.
