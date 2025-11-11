# Hiring Platform

A full-stack job board application where companies can post jobs and candidates can apply. Built with Django REST Framework (backend) and Next.js (frontend).

## Features

- **For Companies:** Register, login, post jobs, manage applications
- **For Job Seekers:** Browse jobs, filter by category, apply with CV upload
- **Admin Panel:** Manage all data through Django admin interface

## Tech Stack

**Backend:**
- Django 5.2.7 + Django REST Framework
- Python 3.12+
- SQLite (development) / PostgreSQL (production)
- Token-based authentication

**Frontend:**
- Next.js 14+ with TypeScript
- React 18+
- Tailwind CSS
- Axios for API calls

## Installation & Setup

### Prerequisites

Make sure you have these installed:
- Python 3.12 or higher
- Node.js 18+ and npm
- Git

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd hiring_platform
   ```

2. **Create and activate virtual environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run database migrations:**
   ```bash
   python3 manage.py migrate
   ```

5. **Create a superuser (admin account):**
   ```bash
   python3 manage.py createsuperuser
   ```
   Follow the prompts to set username, email, and password.

6. **Start the development server:**
   ```bash
   python3 manage.py runserver 0.0.0.0:8000
   ```

   Backend will be running at: **http://localhost:8000**
   Admin panel: **http://localhost:8000/admin**

### Frontend Setup

1. **Navigate to frontend directory (in a new terminal):**
   ```bash
   cd frontend
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   Frontend will be running at: **http://localhost:3000**

## Usage

1. Open **http://localhost:3000** in your browser
2. Browse available jobs or register as a company
3. Companies can login and post new jobs
4. Job seekers can apply by uploading their CV

### Test Company Account

If you have sample data, you can login with:
```
Email: admin@innovatetech.com
Password: SecurePass2024
```

## Project Structure

```
hiring-platform/
├── hiring_platform/          # Django backend
│   ├── manage.py
│   ├── requirements.txt
│   ├── hiring_platform/      # Project settings
│   └── jobs_api/             # Main API app
│       ├── models.py
│       ├── views.py
│       ├── serializers.py
│       └── urls.py
│
├── frontend/                 # Next.js frontend
│   ├── package.json
│   ├── src/
│   │   ├── app/              # Pages
│   │   ├── components/       # React components
│   │   ├── services/         # API service
│   │   └── types/            # TypeScript types
│   └── public/
│
└── README.md
```

## API Endpoints

- `GET /api/jobs/` - List all jobs
- `POST /api/jobs/` - Create a job (requires auth)
- `GET /api/jobs/{id}/` - Get job details
- `POST /api/applications/` - Submit job application
- `POST /api/company-register/` - Register new company
- `POST /api/company-login/` - Company login

## Environment Variables

Create a `.env` file in the backend directory for production:

```env
SECRET_KEY=your-secret-key-here
DEBUG=False
ALLOWED_HOSTS=yourdomain.com
DATABASE_URL=your-database-url
```

## Deployment

### Backend (Django)
- Use PostgreSQL instead of SQLite for production
- Set `DEBUG=False` in settings
- Configure allowed hosts
- Collect static files: `python manage.py collectstatic`

### Frontend (Next.js)
- Build for production: `npm run build`
- Deploy to Vercel, Netlify, or any Node.js hosting
- Set `NEXT_PUBLIC_API_URL` environment variable

## License

MIT License - feel free to use this project for learning or personal purposes.
