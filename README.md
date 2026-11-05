# Recetario

Una app de recetas hecha con Vite, React y React Router. Funciona… más o menos:
los usuarios reportaron diez fallas. El trabajo es encontrarlas y arreglarlas.

## Correr el proyecto

```bash
npm install
npm run dev
```

Abre <http://localhost:5173>. Las recetas salen de `public/data/recetas.json`.

## Qué hay en el proyecto

```
src/
├── main.jsx               monta la app dentro del BrowserRouter
├── App.jsx                rutas y estado de favoritos
├── api.js                 pide las recetas
├── components/
│   ├── Navegacion.jsx
│   ├── TarjetaReceta.jsx
│   └── Temporizador.jsx
└── paginas/
    ├── Inicio.jsx
    ├── Catalogo.jsx
    ├── Detalle.jsx
    ├── Favoritos.jsx
    ├── NuevaReceta.jsx
    └── NoEncontrada.jsx
```

## Reportes de usuario

1. Entro a la página y no sale nada, todo en blanco. Probé en Chrome y en Edge y es igual.
2. En Recetas dice "Mostrando 12 recetas" pero no veo ni una. ¿Dónde están?
3. ¿Por qué sale un 0 al lado de Favoritos? No tengo ningún favorito y se ve raro.
4. Le doy a "Agregar a favoritos" y no pasa nada, el botón sigue igual. Lo raro es que después fui a Favoritos y ahí sí estaba.
5. Estaba limpiando mis favoritos y cuando quité el último se me puso todo en blanco.
6. Abajo de la receta salen otras de "También te puede gustar". Le doy click a una, cambia la dirección arriba, pero la receta sigue siendo la misma.
7. La receta dice 30 minutos, le di al temporizador y se acabó en 15. Y le doy a Pausar y sigue corriendo.
8. Llené todo el formulario para subir mi receta, le di Guardar y se puso en blanco. Perdí todo lo que había escrito 😡
9. Ayer me funcionaba. Hoy le di F5 y quedó en blanco. ¿La dañaron?
10. Me pasaron un link a /contacto y solo me sale el menú. Ni un "no existe" ni nada.

## Reglas

- Se puede usar el material del curso, la documentación de React y la de React
  Router.
- Se arregla el código que hay: no se reescribe la app desde cero.
- No se cambian los nombres de los archivos ni las carpetas, ni lo que exporta
  cada uno.
- No se toca `public/data/recetas.json`.
