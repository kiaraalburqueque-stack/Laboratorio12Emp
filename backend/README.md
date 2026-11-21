# API de la cartelera (Django + Django REST Framework)

API del laboratorio 12. Expone las películas de la cartelera para que las consuma el proyecto de React (`../frontend`).

## Cómo levantarla (Windows, PowerShell)

```powershell
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations movies
python manage.py migrate
python manage.py loaddata movies      # 8 películas de ejemplo
python manage.py runserver            # http://127.0.0.1:8000
```

Pruebas de la API: `python manage.py test movies`.

## Recursos que consume el front

| Método | Dirección | Qué hace | Respuesta |
|---|---|---|---|
| GET | `http://127.0.0.1:8000/api/` | Raíz navegable de la API | 200 |
| GET | `http://127.0.0.1:8000/api/movies/` | Lista las películas | 200 + arreglo |
| POST | `http://127.0.0.1:8000/api/movies/` | Crea una película (cuerpo JSON) | 201 + película · 400 + errores por campo |
| DELETE | `http://127.0.0.1:8000/api/movies/<id>/` | Elimina una película | 204 |

Campos de una película: `title` (obligatorio), `genre` (obligatorio), `duration` (minutos, 30–300), `rating` (`APT`, `14`, `PG-13`, `18`), `score` (0–10, opcional), `synopsis` (opcional).

## CORS: qué origen espera

`django-cors-headers` está en `INSTALLED_APPS` y su middleware va justo después de `SecurityMiddleware`. Solo se autorizan los orígenes exactos del servidor de desarrollo de Vite:

```python
CORS_ALLOWED_ORIGINS = env_list("CORS_ALLOWED_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173")
```

No se usa el comodín (`CORS_ALLOW_ALL_ORIGINS`). En otro entorno se cambia con la variable de entorno `CORS_ALLOWED_ORIGINS`, sin tocar el código.

## Variables de entorno

| Variable | Por defecto | Para qué |
|---|---|---|
| `DJANGO_DEBUG` | `1` | `0` en producción |
| `DJANGO_SECRET_KEY` | aleatoria en desarrollo | Obligatoria si `DJANGO_DEBUG=0` |
| `DJANGO_ALLOWED_HOSTS` | `localhost,127.0.0.1` | Hosts que atiende Django |
| `CORS_ALLOWED_ORIGINS` | `http://localhost:5173,http://127.0.0.1:5173` | Orígenes del front autorizados |
