  # Architecture Overview

  ## High-Level Architecture

  ```
  ┌─────────────────────────────────────────────────────────┐
  │                      YOUR MACHINE                       │
  │                                                         │
  │  ┌──────────────────┐         ┌──────────────────────┐  │
  │  │    FRONTEND      │         │      BACKEND         │  │
  │  │   (Next.js)      │         │    (Django + DRF)    │  │
  │  │                  │         │                      │  │
  │  │  http://         │  HTTP   │  http://             │  │
  │  │  localhost:3000  │ ──────> │  localhost:8000      │  │
  │  │                  │  WS     │                      │  │
  │  │  Running on:     │ ──────> │  Running on:         │  │
  │  │  YOUR PC (npm)   │         │  DOCKER CONTAINER    │  │
  │  └──────────────────┘         └──────────┬───────────┘  │
  │                                          │              │
  │                                          │ TCP          │
  │                                          │ (port 5432)  │
  │                                          ▼              │
  │                               ┌──────────────────────┐  │
  │                               │    DATABASE          │  │
  │                               │   (PostgreSQL)       │  │
  │                               │                      │  │
                                │  Running on:         │  │
  │                               │  DOCKER CONTAINER    │  │
  │                               └──────────────────────┘  │
  └─────────────────────────────────────────────────────────┘
  ```

  ## How It Works Locally

  ### Frontend (Next.js)
  - Runs **directly on your PC** via `npm run dev`
  - No Docker needed for frontend
  - Accessible at `http://localhost:3000`
  - Sends API requests to `http://localhost:8000`
  - WebSocket connects to `ws://localhost:8000`

  ### Backend (Django + DRF)
  - Runs inside a **Docker container**
  - Built from `backend/djangobnb_backend/Dockerfile`
  - Uses Python 3.12 + Daphne (ASGI server for WebSockets)
  - Accessible at `http://localhost:8000` (mapped from container port 8000)

  ### Database (PostgreSQL)
  - Runs inside a **separate Docker container**
  - Uses official `postgres:15` image
  - Data persisted in Docker volume `postgres_data`
  - Connected to Django container via Docker network (host: `db`, port: `5432`)

  ## Docker Setup

  ```yaml
  # docker-compose.yml (backend/)
  services:
    web:          # Django app
      ports: 8000:8000
      depends_on: db

    db:           # PostgreSQL
      image: postgres:15
      volumes: postgres_data
  ```

  ### Container Communication

  ```
  ┌─────────────────────┐     ┌─────────────────────┐
  │   backend-web-1     │     │   backend-db-1      │
  │   (Django)          │────>│   (PostgreSQL)      │
  │                     │     │                     │
  │  SQL_HOST=db        │     │  Port: 5432         │
  │  SQL_PORT=5432      │     │  DB: djangobnb      │
  └─────────────────────┘     └─────────────────────┘
          ▲
          │ HTTP (localhost:8000)
          │
  ┌─────────────────────┐
  │   YOUR PC           │
  │   (Next.js dev)     │
  │                     │
  │  localhost:3000     │
  └─────────────────────┘
  ```

  ## Environment Variables

  ### Backend (.env.dev)
  ```
  DATABASE=postgres
  SQL_HOST=db           # Docker service name
  SQL_PORT=5432
  SQL_DATABASE=djangobnb
  SQL_USER=postgresuser
  SQL_PASSWORD=postgrespassword
  ```

  ### Frontend (.env.local)
  ```
  NEXT_PUBLIC_API_HOST=http://localhost:8000
  NEXT_PUBLIC_WS_HOST=ws://localhost:8000
  ```

  ## API Flow

  ```
  Browser (localhost:3000)
      │
      ├──> GET /api/properties/        ──> Django (localhost:8000) ──> PostgreSQL
      ├──> POST /api/auth/login/       ──> Django (localhost:8000) ──> PostgreSQL
      ├──> POST /api/properties/       ──> Django (localhost:8000) ──> PostgreSQL
      └──> WS  /ws/chat/{id}/         ──> Django (localhost:8000) ──> PostgreSQL
  ```

  ## Start Commands

  ```bash
  # Backend (Docker)
  cd backend
  docker-compose up --build

  # Frontend (npm)
  cd frontend
  npm run dev
  ```

  ## Ports Summary

  | Service      | Port  | Running On     |
  |-------------|-------|----------------|
  | Frontend    | 3000  | Your PC (npm)  |
  | Backend API | 8000  | Docker (web)   |
  | Database    | 5432  | Docker (db)    |
