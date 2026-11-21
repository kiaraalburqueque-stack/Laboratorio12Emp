# Laboratorio 11 – Comunicación entre componentes: Cartelera de cine

**Curso:** Desarrollo de Aplicaciones Empresariales (4-C24-A)
**Docente:** Michael Montgomery Rosell
**Alumna:** Kiara Alburqueque
**Rama de trabajo:** `lab11-componentes`

Continuación de la cartelera de los laboratorios 9 y 10 (React + Vite). Esta semana se agregan: un adaptador de datos, avisos emergentes con **react-hot-toast**, los hooks propios `useDebounce`, `useWindowSize` y `usePremieres`, un esqueleto de carga, el carrusel de estrenos con sus estados de carga y error, y el botón que limpia el filtro desde el banner.

## Cómo levantar el proyecto

```bash
npm install
npm run dev
```

## Árbol de componentes y dato que vive en cada nivel

```
NotificationProvider            notify()  (contexto: única pieza que conoce react-hot-toast)
└── App                         favorites (useLocalStorage) · searchText (useState) · query = useDebounce(searchText)
    ├── Header                  recibe favoritesCount (solo el número)
    ├── Hero                    recibe movie y, como children, el buscador y el botón
    │   ├── MovieSearch         recibe value + onChange (no guarda estado)
    │   └── Button «Limpiar»    llama a setSearchText('')
    ├── MovieList               recibe movies, query, favorites, onToggleFavorite · usa useWindowSize
    │   └── MovieCard × N       recibe movie, isFavorite, onToggleFavorite · usa useNotify
    ├── PremieresSection        simulateError (useState) · usePremieres · useWindowSize
    │   ├── SkeletonCard × N    (mientras carga)
    │   └── PremiereCarousel    recibe premieres + visible
    └── Footer
```

## Hooks propios

| Hook | Qué lógica extrae | Quién lo usa |
|---|---|---|
| `useDebounce(value, delay)` | Esperar a que un valor deje de cambiar | `App` (texto de búsqueda) y `useWindowSize` (tamaño de ventana) |
| `useWindowSize()` | Escuchar `resize`, limpiar el listener y devolver el tamaño con retardo | `MovieList` (tarjetas por fila) y `PremieresSection` (tarjetas visibles en el carrusel) |
| `usePremieres({ fail })` | Pedir los estrenos y exponer `loading`, `success` o `error`, con `retry` | `PremieresSection` |
| `useLocalStorage(key, initial)` | `useState` que se guarda en el navegador | `App` (favoritas) |
| `useNotify()` | Pedir un aviso sin saber cómo se muestra | `MovieCard` |

## ¿Por qué el contador de favoritas no puede vivir en la cabecera?

El contador se calcula a partir de la lista de favoritas, y esa lista la cambian las tarjetas (`MovieCard`), que no son hijas del `Header` sino sus «primas»: las dos cuelgan de `App`. Los datos en React solo bajan por props; un hermano no puede leer ni cambiar el estado de otro. Si la lista o el contador vivieran en el `Header`, las tarjetas no tendrían cómo avisarle. Por eso la lista sube al ancestro común (`App`), que le pasa al `Header` solo el número (`favoritesCount`) y a cada tarjeta solo lo suyo (`isFavorite` y `onToggleFavorite`).
