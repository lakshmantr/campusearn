# CampusEarn

CampusEarn is a student job marketplace built with React, Tailwind CSS, Node.js, Express, JWT auth, and PostgreSQL.

## Project structure

- `frontend/` - React + Vite frontend
- `backend/` - Node.js + Express API

## Deployment targets

- Frontend → Vercel
- Backend → Render
- Database → Supabase (PostgreSQL)

## Local development

### Backend

1. Open a terminal in `backend/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy environment file:
   ```bash
   cp .env.example .env
   ```
4. Update `.env` values:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `CORS_ORIGIN`
   - `DB_SSL`
5. Start the backend:
   ```bash
   npm run dev
   ```

The backend serves API routes under `http://localhost:5000/api`.

### Frontend

1. Open a terminal in `frontend/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy environment file:
   ```bash
   cp .env.example .env
   ```
4. Update `.env` with your backend API URL:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
5. Start the frontend:
   ```bash
   npm run dev
   ```

The frontend runs by default at `http://localhost:5173`.

## Supabase setup

1. Create a new Supabase project.
2. Get the Postgres connection string.
3. Set `DATABASE_URL` in `backend/.env`.
4. Run the SQL schema in `backend/db/schema.sql` using Supabase SQL editor or a Postgres client.

### Database schema

- `users`
  - `id`, `name`, `email`, `password`, `role`, `created_at`
- `jobs`
  - `id`, `title`, `description`, `pay`, `location`, `employer_id`, `created_at`
- `applications`
  - `id`, `student_id`, `job_id`, `status`, `created_at`, `updated_at`

## Render deployment (backend)

1. Sign in to Render and create a new **Web Service**.
2. Connect your GitHub repository.
3. Set the service root to the `backend/` folder.
4. Configure build and start commands:
   - Build command: `npm install`
   - Start command: `npm start`
5. Configure environment variables in Render:
   - `DATABASE_URL` → Supabase connection string
   - `JWT_SECRET` → strong secret
   - `CORS_ORIGIN` → Vercel frontend URL, e.g. `https://campusearn.vercel.app`
   - `DB_SSL` → `true` or `false` depending on your Postgres config
6. Deploy the service.

Render will expose the backend API at `https://<your-backend>.onrender.com/api`.

## Vercel deployment (frontend)

1. Sign in to Vercel and create a new project.
2. Import the repository.
3. Set the project root to `frontend/`.
4. Configure environment variables in Vercel:
   - `VITE_API_URL` → `https://<your-backend>.onrender.com/api`
5. Deploy the site.

### Vercel config

- `frontend/vercel.json` is included for static build configuration.

## Important environment variables

### Backend (`backend/.env`)

- `PORT` - optional, default `5000`
- `DATABASE_URL` - Supabase Postgres connection string
- `JWT_SECRET` - JWT signing secret
- `CORS_ORIGIN` - allowed frontend origin
- `DB_SSL` - `true` or `false`

### Frontend (`frontend/.env`)

- `VITE_API_URL` - full backend API URL, e.g. `https://<your-backend>.onrender.com/api`

## GitHub deployment flow

1. Commit your changes:
   ```bash
   git add .
   git commit -m "Add CampusEarn deployment config and README"
   git push origin main
   ```
2. Connect the repository in Render and Vercel.
3. Set required environment variables in both platforms.
4. Deploy.

## Notes

- Use Render for the backend service and Vercel for the frontend static site.
- Ensure `CORS_ORIGIN` matches the actual frontend deployment URL.
- If you change backend route prefixes, update `VITE_API_URL` accordingly.
