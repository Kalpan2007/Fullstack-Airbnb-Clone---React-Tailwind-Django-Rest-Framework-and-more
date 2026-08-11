# DjangoBNB - Full Stack Airbnb Clone

A full-stack Airbnb clone built with **Next.js** (React, TypeScript, Tailwind CSS) frontend and **Django REST Framework** backend with JWT authentication.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4 |
| Backend | Django 5, Django REST Framework, SimpleJWT |
| Database | PostgreSQL (Docker) / SQLite (local) |
| Auth | JWT (access + refresh tokens), httpOnly cookies |
| State | Zustand |
| UI | react-date-range, react-select, world-countries |

## Setup

### Backend (Docker)
```bash
cd backend
docker-compose up --build
```
Backend runs at `http://localhost:8000`

### Admin Panel
- URL: `http://localhost:8000/admin/`
- Email: `admin@djangobnb.com`
- Password: `admin123`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at `http://localhost:3000`

---

## Features

### Implemented

| # | Feature | Status |
|---|---------|--------|
| 1 | Home page with property grid | Done |
| 2 | Property detail page | Done |
| 3 | User signup (modal) | Done |
| 4 | User login (modal) | Done |
| 5 | User logout | Done |
| 6 | JWT token management (auto-refresh) | Done |
| 7 | Property creation (5-step modal wizard) | Done |
| 8 | Property listing with filters (backend) | Done |
| 9 | Image upload for properties | Done |
| 10 | Book a property (date picker + guests) | Done |
| 11 | View booked dates on calendar | Done |
| 12 | My reservations page | Done |
| 13 | Add/remove favorite (heart toggle) | Done |
| 14 | My favorites page | Done |
| 15 | My properties page | Done |
| 16 | Landlord profile page | Done |
| 17 | Category tabs (Beach, Villas, Cabins, Tiny homes) | Done |
| 18 | Django admin panel (Users, Properties, Reservations) | Done |
| 19 | Responsive design (Tailwind) | Done |
| 20 | Error handling on forms | Done |
| 21 | Booking button loading state + success/error messages | Done |

### Not Implemented

| # | Feature | Status |
|---|---------|--------|
| 1 | Search filters UI (Where/When/Who) | Static only |
| 2 | Category filtering from homepage tabs | UI only, no query propagation |
| 3 | Property update/edit | Not started |
| 4 | Property delete | Not started |
| 5 | Messaging/inbox system | Mock data only |
| 6 | Contact landlord | Static button |
| 7 | Booking cancellation | Not started |

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register/` | User registration |
| POST | `/api/login/` | User login (returns JWT) |
| POST | `/api/logout/` | User logout (blacklists token) |
| POST | `/api/token/refresh/` | Refresh access token |

### Properties
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/properties/` | List properties (supports filters) |
| GET | `/api/properties/{id}/` | Property detail |
| POST | `/api/properties/create/` | Create property (auth required) |
| POST | `/api/properties/{id}/book/` | Book property (auth required) |
| GET | `/api/properties/{id}/reservations/` | Get property reservations |
| POST | `/api/properties/{id}/toggle_favorite/` | Toggle favorite (auth required) |

### User
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/myreservations/` | Current user's reservations |
| GET | `/api/myproperties/` | Current user's properties |
| GET | `/api/myfavorites/` | Current user's favorites |
| GET | `/api/{id}/` | Landlord profile (public) |
