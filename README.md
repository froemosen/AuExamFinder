# froemosen-homepage
Website project, that will be used as the homepage on the website I open with my home server.

This repository contains a minimal Docker-runnable project with:

- A Python Flask backend that serves the frontend and exposes a small JSON API (`/api/hello`).
- A static frontend in `frontend/` (HTML, CSS, JS).
- A `Dockerfile` and `docker-compose.yml` for running locally.

Quick start (requires Docker & Docker Compose):

1) Build and run with docker-compose (recommended):

```powershell
docker-compose up --build
```

2) Or build and run the image directly:

```powershell
docker build -t froemosen-homepage .
docker run -p 5000:5000 froemosen-homepage
```

Open http://localhost:5000 in your browser. The page will call `/api/hello` and display the backend message.

Files added by the scaffold:

- `Dockerfile` - builds a Python image and runs the Flask app using the Flask CLI (`flask run`)
- `docker-compose.yml` - simple compose file mapping port 5000
- `.dockerignore` - common ignores for container builds
- `backend/app.py` - Flask app that serves `frontend/index.html` and `/api/hello`
- `backend/requirements.txt` - Python deps (Flask)
- `frontend/index.html` - static HTML
- `frontend/static/styles.css` - styling
- `frontend/static/script.js` - small client JS to call the backend

Next steps (suggested):

- Add real site content to `frontend/index.html` and assets in `frontend/static/`.
- Add any additional API endpoints in `backend/app.py` as needed.
- (Optional) Add a small Makefile or scripts to simplify local development.
