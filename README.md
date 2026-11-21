# Laboratorio 12 – Servicios web: React + API de Django

**Curso:** Desarrollo de Aplicaciones Empresariales (4-C24-A)
**Docente:** Michael Montgomery Rosell
**Alumna:** Kiara Alburqueque

El repositorio tiene los dos lados del laboratorio:

| Carpeta | Qué es | Dirección | Origen que espera |
|---|---|---|---|
| `backend/` | API REST en Django + DRF, con CORS (`django-cors-headers`) | `http://127.0.0.1:8000/api/` | Acepta peticiones del navegador solo desde `http://localhost:5173` y `http://127.0.0.1:5173` |
| `frontend/` | Cartelera en React + Vite (continuación del lab 11) que consume la API con Axios | `http://localhost:5173` | Llama a `http://127.0.0.1:8000/api` (cambiable con `VITE_API_URL`) |

## Cómo levantar los dos lados

Se necesitan **dos terminales**.

**Terminal 1 · API (Python 3.12+)**

```powershell
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py loaddata movies
python manage.py runserver
```

**Terminal 2 · Front (Node 20+)**

```powershell
cd frontend
npm install
npm run dev
```

Abrir `http://localhost:5173` y entrar a **Gestión** (`/peliculas`).

## Qué consume el front

| Pantalla | Petición | Cargando | Con datos | Con error |
|---|---|---|---|---|
| Gestión (`/peliculas`) | `GET /api/movies/` al montar | Tabla de esqueleto (5 filas) | Tabla con título, género, duración, clasificación, valoración y botón Eliminar | Mensaje rojo con la causa y botón **Reintentar** |
| Eliminar | `DELETE /api/movies/<id>/` | Botón «Eliminando…» deshabilitado | Aviso «Se eliminó…» y la tabla se vuelve a pedir | Aviso con la causa |
| Nueva película (`/peliculas/nueva`) | `POST /api/movies/` al enviar | Botón «Guardando…» deshabilitado | Aviso y vuelta al listado | Mensajes de la API debajo de cada campo (400) o la causa general |

La dirección de la API se escribe en un solo lugar: `frontend/src/api/client.js`. Las funciones `listMovies`, `createMovie` y `deleteMovie` están en `frontend/src/api/movies.js`.

## Errores provocados

- **CORS:** si se quita el origen de `CORS_ALLOWED_ORIGINS`, el navegador bloquea la respuesta (`blocked by CORS policy: No 'Access-Control-Allow-Origin' header`) y la pantalla muestra el estado de error.
- **Validación:** si se envía el título vacío, la API responde 400 con `{"title": ["Este campo no puede estar en blanco."]}` y el mensaje aparece debajo del campo.
- **Servidor apagado:** con Django detenido, la gestión muestra «No se pudo conectar con la API…» con Reintentar, nunca una pantalla en blanco.
