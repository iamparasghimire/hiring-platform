# Hiring Platform

This repository contains a simple hiring platform. The backend is built with Django REST Framework and the frontend uses Next.js with TypeScript. The project lets companies post roles and job seekers apply.

## What’s Inside
- Django API for managing jobs, applications, and companies
- Next.js frontend with company and candidate views
- Token based login for company accounts
- SQLite database for local development (switchable to PostgreSQL in production)

## Run It Locally

### Backend
```bash
cd hiring_platform
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 manage.py migrate
python3 manage.py runserver 0.0.0.0:8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000 in your browser. The frontend expects the backend at http://localhost:8000.

## Default Company Login (Sample Data)
```
Email: admin@innovatetech.com
Password: SecurePass2024
```

## Deployment Notes
- Set environment variables for Django secret key and database settings before going live.
- Replace the SQLite database with PostgreSQL by updating `DATABASES` in `hiring_platform/settings.py`.
- For the frontend, configure API URLs through environment variables such as `NEXT_PUBLIC_API_BASE_URL`.

## License
MIT License — see `LICENSE` for details.
- 📊 **Analytics** - View platform statistics and metrics
