# SentinelX — Deployment Guide

## 1. Local Production Deployment

### Backend Server (Uvicorn / Gunicorn)
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

### Frontend Production Build
```bash
cd frontend
npm install
npm run build
```
Serve the generated `frontend/dist` directory using Nginx or Caddy.

---

## 2. Docker & Docker Compose Deployment

SentinelX includes a multi-container Docker deployment configuration.

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    volumes:
      - ./backend/sentinelx.db:/app/sentinelx.db
    environment:
      - ENVIRONMENT=production

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
```

### Starting Containers
```bash
docker-compose up -d --build
```
Access the platform at `http://localhost`.
