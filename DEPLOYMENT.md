# Deployment Guide

## Production Architecture

```
                    INTERNET
                       |
            +----------+----------+
            |                     |
            v                     v
       VERCEL                  RENDER
       Next.js                Django
       Frontend               DRF + Daphne
            |                     |
            | HTTPS / WSS         |
            +-------------------->+
                                  |
                                  v
                           Render PostgreSQL
```

## Changed Files

### Backend

| File | Change | Why |
|------|--------|-----|
| `backend/djangobnb_backend/requirements.txt` | Added `dj-database-url==2.1.0` | Support DATABASE_URL env var |
| `backend/djangobnb_backend/djangobnb_backend/settings.py` | Added DATABASE_URL support, env-based DEBUG, SECRET_KEY, ALLOWED_HOSTS, CORS, CSRF, STATIC_ROOT, SIGNING_KEY | Production security |
| `backend/djangobnb_backend/Dockerfile` | Added CMD for Daphne, changed netcat package | Production-ready for Render |
| `backend/djangobnb_backend/entrypoint.sh` | Added collectstatic, DATABASE_URL parsing, set -e | Production startup |
| `backend/docker-compose.yml` | Removed explicit command (uses Dockerfile CMD) | Consistency |
| `backend/.env.dev` | Added DATABASE_URL, CORS, CSRF, FRONTEND_URL vars | Local dev parity |
| `backend/.env.example` | **NEW** - Template for local env vars | Developer onboarding |

### Frontend

| File | Change | Why |
|------|--------|-----|
| `frontend/app/lib/actions.ts` | Replaced hardcoded `localhost:8000` with `NEXT_PUBLIC_API_HOST`, secure cookies based on env | Production support |
| `frontend/app/landlords/[id]/page.tsx` | Replaced hardcoded `localhost:8000` | Production support |
| `frontend/app/myfavorites/page.tsx` | Replaced hardcoded `localhost:8000` | Production support |
| `frontend/app/myreservations/page.tsx` | Replaced hardcoded `localhost:8000` | Production support |
| `frontend/app/myproperties/page.tsx` | Replaced hardcoded `localhost:8000` | Production support |
| `frontend/app/inbox/page.tsx` | Replaced hardcoded `localhost:8000` | Production support |
| `frontend/app/inbox/[id]/page.tsx` | Replaced hardcoded `localhost:8000` | Production support |
| `frontend/app/properties/[id]/page.tsx` | Replaced hardcoded `localhost:8000` | Production support |
| `frontend/app/components/modals/SearchModal.tsx` | Fixed null type errors | Build fix |
| `frontend/app/components/navbar/SearchFilters.tsx` | Fixed null type error | Build fix |
| `frontend/app/hooks/useSearchModal.ts` | Exported `SearchQuery` interface | Build fix |
| `frontend/next.config.ts` | Added `*.onrender.com` image domain | Production images |
| `frontend/.env.example` | **NEW** - Template for frontend env vars | Developer onboarding |

### Root

| File | Change | Why |
|------|--------|-----|
| `.gitignore` | **NEW** - Root gitignore for secrets | Prevent committing secrets |
| `render.yaml` | **NEW** - Render deployment config | One-click deployment |
| `DEPLOYMENT.md` | **NEW** - This file | Documentation |

---

## Environment Variables

### Local Backend (`.env.dev`)

```
DEBUG=True
SECRET_KEY=dev-secret-key-local-only
SIGNING_KEY=dev-signing-key-local-only
WEBSITE_URL=http://localhost:8000
DATABASE=postgres
DATABASE_URL=postgresql://postgresuser:postgrespassword@db:5432/djangobnb
SQL_ENGINE=django.db.backends.postgresql
SQL_DATABASE=djangobnb
SQL_USER=postgresuser
SQL_PASSWORD=postgrespassword
SQL_HOST=db
SQL_PORT=5432
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
CSRF_TRUSTED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
ALLOWED_HOSTS=localhost,127.0.0.1
FRONTEND_URL=http://localhost:3000
```

### Local Frontend (`.env.local`)

```
NEXT_PUBLIC_API_HOST=http://localhost:8000
NEXT_PUBLIC_WS_HOST=ws://localhost:8000
```

### Render Backend (set in Render Dashboard)

```
DEBUG=False
SECRET_KEY=<generate-a-strong-secret>
SIGNING_KEY=<generate-a-strong-signing-key>
DATABASE_URL=<from Render PostgreSQL>
WEBSITE_URL=https://<your-backend>.onrender.com
ALLOWED_HOSTS=<your-backend>.onrender.com
CORS_ALLOWED_ORIGINS=https://<your-frontend>.vercel.app
CSRF_TRUSTED_ORIGINS=https://<your-frontend>.vercel.app
FRONTEND_URL=https://<your-frontend>.vercel.app
```

### Vercel Frontend (set in Vercel Dashboard)

```
NEXT_PUBLIC_API_HOST=https://<your-backend>.onrender.com
NEXT_PUBLIC_WS_HOST=wss://<your-backend>.onrender.com
```

---

## Render Deployment Steps

### 1. Push code to GitHub

```bash
git add .
git commit -m "Production deployment ready"
git push origin main
```

### 2. Create Render Backend Service

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New** → **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `djangobnb-backend`
   - **Runtime**: Docker
   - **Dockerfile Path**: `./backend/djangobnb_backend/Dockerfile`
   - **Docker Context**: `./backend/djangobnb_backend`
   - **Port**: 8000
   - **Plan**: Free (or your preferred plan)

### 3. Create Render PostgreSQL Database

1. In Render Dashboard, click **New** → **PostgreSQL**
2. Configure:
   - **Name**: `djangobnb-db`
   - **Plan**: Free
   - **Database**: `djangobnb`
3. Copy the **Internal Database URL** (format: `postgresql://user:password@host:port/djangobnb`)

### 4. Set Environment Variables

In the Render Web Service → **Environment** tab, add:

```
DEBUG=False
SECRET_KEY=<generate with: python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())">
SIGNING_KEY=<generate same way>
DATABASE_URL=<paste Render PostgreSQL Internal URL>
WEBSITE_URL=https://djangobnb-backend.onrender.com
ALLOWED_HOSTS=djangobnb-backend.onrender.com
CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app
CSRF_TRUSTED_ORIGINS=https://your-frontend.vercel.app
FRONTEND_URL=https://your-frontend.vercel.app
```

### 5. Deploy

Render will automatically deploy when you push to GitHub.

The entrypoint.sh will:
1. Wait for database connection
2. Run `python manage.py migrate --noinput`
3. Run `python manage.py collectstatic --noinput`
4. Start Daphne on `0.0.0.0:$PORT`

---

## Vercel Deployment Steps

### 1. Push code to GitHub

(Same as above)

### 2. Create Vercel Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **New Project**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### 3. Set Environment Variables

In Vercel Project → **Settings** → **Environment Variables**, add:

```
NEXT_PUBLIC_API_HOST=https://djangobnb-backend.onrender.com
NEXT_PUBLIC_WS_HOST=wss://djangobnb-backend.onrender.com
```

### 4. Deploy

Vercel will automatically deploy when you push to GitHub.

---

## Database Setup

### How Render PostgreSQL connects to Django

1. Render provides a `DATABASE_URL` environment variable
2. Django's `settings.py` uses `dj-database-url` to parse it:
   ```python
   DATABASE_URL = os.environ.get("DATABASE_URL")
   if DATABASE_URL:
       DATABASES = {'default': dj_database_url.parse(DATABASE_URL)}
   ```
3. The entrypoint.sh runs `migrate --noinput` on startup
4. **Data persists** across deployments (Render PostgreSQL is managed)

### Local Development

- Docker PostgreSQL runs on `db:5432`
- `DATABASE_URL=postgresql://postgresuser:postgrespassword@db:5432/djangobnb`
- Data persists in Docker volume `postgres_data`

---

## WebSocket Setup

### Local Development

```
ws://localhost:8000/ws/{conversation_id}/?token={jwt_token}
```

### Production

```
wss://djangobnb-backend.onrender.com/ws/{conversation_id}/?token={jwt_token}
```

**How it works:**

1. Frontend connects using `NEXT_PUBLIC_WS_HOST` env var
2. Backend runs Daphne (ASGI server) which handles WebSocket connections
3. Render automatically routes `wss://` to the Docker container
4. JWT token is passed as query parameter for authentication
5. `TokenAuthMiddleware` in `chat/token_auth.py` validates the token

**Note:** The project uses `InMemoryChannelLayer`. This works for single-process deployments (Render Free tier). If scaling to multiple processes, consider Redis channel layer.

---

## Testing

### Backend

```bash
# Docker build
docker build -t djangobnb-backend ./backend/djangobnb_backend

# Run locally
cd backend && docker-compose up --build

# Test API
curl http://localhost:8000/api/properties/
```

### Frontend

```bash
cd frontend
npm run build  # ✓ Passed
npm run dev    # http://localhost:3000
```

### Verified

- [x] Docker build succeeds
- [x] Frontend production build succeeds
- [x] No hardcoded localhost in frontend code
- [x] All env vars configurable via environment
- [x] Cookies use secure flag in production
- [x] CORS only allows configured origins
- [x] STATIC_ROOT configured for collectstatic
- [x] Entry point handles migrations + collectstatic

---

## Remaining Manual Steps

1. **Generate production secrets** for `SECRET_KEY` and `SIGNING_KEY`:
   ```bash
   python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
   ```

2. **Set Vercel env vars** after Render backend is deployed

3. **Update CORS/CSRF origins** with actual Vercel URL after deployment

4. **Update `ALLOWED_HOSTS`** with actual Render backend URL

5. **Test WebSocket connection** in production after deployment

6. **Verify image uploads** work with production media storage

---

## Known Limitations

1. **InMemoryChannelLayer**: Works for single-process. For multi-process, needs Redis.
2. **Media files**: Stored on Render's ephemeral filesystem. For production, consider S3.
3. **Free tier**: Render free tier spins down after inactivity. First request may take 30-60s.
