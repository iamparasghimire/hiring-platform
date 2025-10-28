# 🚀 Quick Start Guide# Hiring Platform - Quick Start Guide# QUICK START GUIDE



Get the hiring platform up and running in **5 minutes**!



---## System Setup## 🚀 Getting Started with Hiring Platform



## Prerequisites



- Python 3.12+### PrerequisitesThis guide will help you set up and run the complete hiring platform in minutes.

- Node.js 20+

- npm/yarn- Python 3.12+

- Git

- Node.js 20+ ---

---

- npm or yarn

## Backend Setup (Django) - 2 minutes

- pip (Python package manager)## Part 1: Backend Setup (Django)

### Step 1: Navigate to Backend

```bash

cd hiring_platform

```---### Step 1: Open Terminal and Navigate to Backend



### Step 2: Create Virtual Environment

```bash

python3 -m venv venv## 1. Backend Setup (Django)```bash

source venv/bin/activate  # Windows: venv\Scripts\activate

```cd /home/paras/Documents/hiring/hiring_platform



### Step 3: Install Dependencies### 1.1 Navigate to Backend Directory```

```bash

pip install -r requirements.txt```bash

```

cd /home/paras/Documents/hiring/hiring_platform### Step 2: Create Python Virtual Environment

### Step 4: Run Migrations

```bash```

python3 manage.py migrate

``````bash



### Step 5: Create Admin User### 1.2 Create Virtual Environmentpython3 -m venv venv

```bash

python3 manage.py createsuperuser```bashsource venv/bin/activate

# Enter: username (admin), email, password

```python3 -m venv venv```



### Step 6: Start Backendsource venv/bin/activate

```bash

python3 manage.py runserver 0.0.0.0:8000```### Step 3: Install Required Packages

```



✅ **Backend running at**: http://localhost:8000

### 1.3 Install Dependencies```bash

**Key URLs:**

- API: http://localhost:8000/api/```bashpip install -r requirements.txt

- Admin: http://localhost:8000/admin/

- Company Registration: `POST /api/company-register/`pip install -r requirements.txt```

- Company Login: `POST /api/company-login/`

```

---

If `requirements.txt` doesn't exist, install manually:

## Frontend Setup (Next.js) - 2 minutes

### 1.4 Run Migrations

### Step 1: Open New Terminal, Navigate to Frontend

```bash```bash```bash

cd frontend

```python3 manage.py migratepip install django djangorestframework django-cors-headers python-multipart



### Step 2: Install Dependencies``````

```bash

npm install

```

### 1.5 Create Superuser (Admin Account)### Step 4: Apply Database Migrations

### Step 3: Start Development Server

```bash```bash

npm run dev

```python3 manage.py createsuperuser```bash



✅ **Frontend running at**: http://localhost:3000# Follow the prompts to set:python3 manage.py migrate



---# - Username: admin```



## Test the Platform - 1 minute# - Email: admin@example.com



### Register a Company# - Password: admin123456### Step 5: Create Admin User

**Option 1: Via Frontend**

1. Go to http://localhost:3000```

2. Click "Company Login" in header

3. Click "Sign up"```bash

4. Fill in company details and submit

### 1.6 Start Django Serverpython3 manage.py createsuperuser

**Option 2: Via cURL**

```bash```bash```

curl -X POST http://localhost:8000/api/company-register/ \

  -H "Content-Type: application/json" \python3 manage.py runserver 0.0.0.0:8000

  -d '{

    "name": "TechCorp",```Follow the prompts to create your admin account.

    "email": "admin@techcorp.com",

    "password": "Password123",

    "location": "San Francisco",

    "industry": "Technology"✅ Django server running at: **http://localhost:8000**### Step 6: Start Django Server

  }'

```



### Login to Company Account**Important URLs:**```bash

```bash

curl -X POST http://localhost:8000/api/company-login/ \- API Root: http://localhost:8000/api/python3 manage.py runserver

  -H "Content-Type: application/json" \

  -d '{- Admin Panel: http://localhost:8000/admin/```

    "email": "admin@techcorp.com",

    "password": "Password123"- Company Registration: POST http://localhost:8000/api/company-register/

  }'

```- Company Login: POST http://localhost:8000/api/company-login/✅ Backend is now running at: **http://localhost:8000**



---



## What's Next?------



1. **Register a company** - Go to `/company/signup`

2. **Post a job** - Click "+ Post New Job" on dashboard

3. **Browse jobs** - Visit `/jobs` to see all listings## 2. Frontend Setup (Next.js)## Part 2: Frontend Setup (Next.js)

4. **Apply for jobs** - Click on a job and submit application with CV

5. **Check admin panel** - Visit `http://localhost:8000/admin/`



---### 2.1 Open New Terminal, Navigate to Frontend### Step 1: Open New Terminal and Navigate to Frontend



## Common Issues```bash



### "Cannot connect to localhost:8000"cd /home/paras/Documents/hiring/frontend```bash

```bash

# Make sure you're in the correct directory and server is running```cd /home/paras/Documents/hiring/frontend

cd hiring_platform

python3 manage.py runserver 0.0.0.0:8000```

```

### 2.2 Install Dependencies

### "Cannot connect to localhost:3000"

```bash```bash### Step 2: Install Dependencies

# Make sure frontend is running

cd frontendnpm install

npm run dev

# or```bash

# If port 3000 is in use, try:

npm run dev -- -p 3001yarn installnpm install

```

``````

### "ModuleNotFoundError" in backend

```bash

# Make sure virtual environment is activated

source venv/bin/activate  # Windows: venv\Scripts\activate### 2.3 Start Development Server### Step 3: Start Development Server

pip install -r requirements.txt

``````bash



### "Module not found" in frontendnpm run dev```bash

```bash

# Reinstall dependencies# ornpm run dev

rm -rf node_modules

npm installyarn dev```

npm run dev

``````



---✅ Frontend is now running at: **http://localhost:3000**



## 📚 Learn More✅ Next.js frontend running at: **http://localhost:3001** (or http://localhost:3000)



- [Main README](README.md) - Complete documentation---

- [Company Auth Guide](COMPANY_AUTH_GUIDE.md) - Authentication details

- [API Documentation](README.md#-api-documentation) - All API endpoints---



---## Part 3: Add Sample Data



## Support## 3. Testing the Platform



If you encounter issues:### Option A: Using Django Admin Panel



1. Check the [Main README](README.md) troubleshooting section### Step 1: Register a Company

2. Review [COMPANY_AUTH_GUIDE.md](COMPANY_AUTH_GUIDE.md)

3. Check console logs for errors1. Open **http://localhost:8000/admin**

4. Verify all prerequisites are installed

**Via Frontend:**2. Login with your superuser credentials

---

1. Go to http://localhost:30013. Click "Job categories" and add categories:

**Happy coding! 🎉**

2. Click "Company Login" in header   - Name: "Technology", Icon: "💻"

3. Click "Sign up" to register a new company   - Name: "Design", Icon: "🎨"

4. Fill in company details   - Name: "Marketing", Icon: "📱"

5. Submit form4. Click "Jobs" and add sample jobs:

   - Title: "Python Developer"

**Via cURL:**   - Company: "TechCorp"

```bash   - Location: "New York"

curl -X POST http://localhost:8000/api/company-register/ \   - Category: "Technology"

  -H "Content-Type: application/json" \   - Description: (Add any description)

  -d '{   - Requirements: "- 5+ years experience\n- Django knowledge"

    "name": "My Company",   - Salary: "$120,000 - $150,000"

    "email": "admin@mycompany.com",   - Job Type: "Full-time"

    "password": "Password123",   - Status: "open"

    "location": "San Francisco",

    "industry": "Technology"### Option B: Using Django Shell (Faster)

  }'

``````bash

python3 manage.py shell

**Expected Response:**```

```json

{```python

  "token": "9f9cecba8ee7762c7c88f376ca291bf824f1b236",from jobs_api.models import JobCategory, Job

  "company_id": 4,from django.utils import timezone

  "company_name": "My Company",

  "email": "admin@mycompany.com"# Create Categories

}tech = JobCategory.objects.create(

```    name="Technology",

    icon="💻",

### Step 2: Login to Company Account    description="Technology and Software Development roles"

)

**Via Frontend:**

1. Go to http://localhost:3001/company/logindesign = JobCategory.objects.create(

2. Use credentials from registration    name="Design",

3. Dashboard automatically opens    icon="🎨",

    description="UI/UX and Design positions"

**Via cURL:**)

```bash

curl -X POST http://localhost:8000/api/company-login/ \marketing = JobCategory.objects.create(

  -H "Content-Type: application/json" \    name="Marketing",

  -d '{    icon="📱",

    "email": "admin@mycompany.com",    description="Marketing and Sales roles"

    "password": "Password123")

  }'

```# Create Sample Jobs

Job.objects.create(

### Step 3: Post a Job    title="Senior Python Developer",

    company_name="TechCorp Inc",

1. Go to Company Dashboard (auto-redirected after login)    location="San Francisco, CA",

2. Click "+ Post New Job"    description="We are looking for an experienced Python developer to join our growing team. You will work on cutting-edge technologies and contribute to mission-critical projects.",

3. Fill in job details:    requirements="- 5+ years of Python experience\n- Django and DRF knowledge\n- REST API design experience\n- Strong problem-solving skills",

   - Title: "Senior Software Engineer"    salary="$120,000 - $160,000",

   - Location: "Remote"    job_type="Full-time",

   - Description: "..."    category=tech,

   - Salary Range: 80000 - 120000    status="open"

   - Job Type: "Full Time")

   - Experience Level: "Senior"

   - Category: "Technology"Job.objects.create(

4. Submit form    title="React Developer",

    company_name="WebStudio",

### Step 4: Browse Jobs    location="New York, NY",

    description="Join our frontend team and create amazing user experiences. Work with latest React technologies and build scalable web applications.",

1. Go to http://localhost:3001/jobs    requirements="- 3+ years React experience\n- TypeScript knowledge\n- UI/UX fundamentals",

2. See posted jobs in the grid    salary="$100,000 - $140,000",

3. Use filters to search:    job_type="Full-time",

   - Search term    category=tech,

   - Job type    status="open"

   - Experience level)

   - Location

   - Salary rangeJob.objects.create(

    title="UI/UX Designer",

### Step 5: Apply for a Job    company_name="DesignHub",

    location="Remote",

1. Click on any job card    description="We're looking for a creative UI/UX designer to create beautiful and intuitive user interfaces for our products.",

2. Scroll to "Apply Now" section    requirements="- 4+ years UI/UX design experience\n- Figma expertise\n- Prototyping skills",

3. Enter candidate details:    salary="$90,000 - $130,000",

   - Full Name    job_type="Full-time",

   - Email    category=design,

   - Phone    status="open"

4. Upload CV (PDF, DOC, DOCX, or TXT))

5. Submit application

print("✅ Sample data created successfully!")

---exit()

```

## 4. Admin Panel

---

### Access Admin Dashboard

```## 🎉 Done! Now Test the Platform

http://localhost:8000/admin/

```1. Open **http://localhost:3000** in your browser

2. You should see:

**Default Credentials:**   - Homepage with job categories

- Username: admin   - Recent job listings

- Password: admin123456   - Browse by category button



### Manage:3. Try these features:

- Companies   - Click on a category to view jobs

- Jobs   - Click on a job to see details

- Applications   - Fill out the application form and upload a CV

- Interviews   - Check the Django admin panel for submitted applications

- Saved Jobs

- Categories---



---## 📁 Project Structure Overview



## 5. API Endpoints```

hiring/

### Authentication├── hiring_platform/          ← Django Backend

- `POST /api/company-register/` - Register new company│   ├── db.sqlite3           (Database)

- `POST /api/company-login/` - Login company│   ├── media/               (Uploaded CVs)

- `POST /api/company-logout/` - Logout (coming soon)│   ├── jobs_api/            (API Application)

│   │   ├── models.py        (Database models)

### Companies│   │   ├── serializers.py   (API serialization)

- `GET /api/companies/` - List all companies│   │   ├── views.py         (API endpoints)

- `GET /api/companies/{id}/` - Get company details│   │   ├── urls.py

- `GET /api/companies/{id}/jobs/` - Get company's jobs│   │   └── admin.py         (Admin interface)

- `POST /api/companies/` - Create company (DEPRECATED, use company-register)│   └── hiring_platform/     (Project settings)

- `PATCH /api/companies/{id}/` - Update company│       ├── settings.py

│       ├── urls.py

### Jobs│

- `GET /api/jobs/` - List all jobs (filterable)└── frontend/                ← Next.js Frontend

- `GET /api/jobs/{id}/` - Get job details    ├── src/

- `POST /api/jobs/` - Post new job    │   ├── app/            (Pages)

- `PATCH /api/jobs/{id}/` - Update job    │   ├── components/     (Reusable components)

- `DELETE /api/jobs/{id}/` - Delete job    │   ├── services/       (API communication)

    │   ├── types/          (TypeScript types)

### Applications    │   └── styles/         (Global styles)

- `GET /api/applications/` - List applications```

- `POST /api/applications/` - Submit application

- `PATCH /api/applications/{id}/` - Update application status---

- `GET /api/applications/?job={id}` - Get applications for job

- `GET /api/applications/?status=pending` - Filter by status## 🔑 Admin Panel Access



### Other**URL:** http://localhost:8000/admin

- `GET /api/categories/` - Get job categories

- `GET /api/interviews/` - Manage interviews**Features:**

- `GET /api/saved-jobs/` - Get saved jobs- View all jobs and applications

- Edit job listings

---- View submitted CVs

- Track application status

## 6. Query Parameters- Manage job categories



### Job Listing Filters---

```

GET /api/jobs/?search=engineer&job_type=full_time&experience_level=senior&salary_min=80000## 📝 Common Issues & Solutions

```

### Issue: "Connection refused" on frontend

**Available Filters:****Solution:** Make sure Django server is running on port 8000

- `search` - Search job title/description

- `job_type` - full_time, part_time, contract, temporary### Issue: CVs not uploading

- `experience_level` - entry, mid, senior**Solution:** Ensure media folder exists with proper permissions

- `category` - technology, finance, healthcare, marketing, sales```bash

- `location` - Filter by locationmkdir -p media/cvs

- `salary_min` - Minimum salary```

- `salary_max` - Maximum salary

- `page` - Page number (default: 1, 10 items per page)### Issue: "ModuleNotFoundError"

**Solution:** Activate virtual environment and install dependencies

---```bash

source venv/bin/activate

## 7. Troubleshootingpip install -r requirements.txt

```

### Issue: "Cannot connect to localhost:8000"

**Solution:**### Issue: Port 3000 already in use

```bash**Solution:** Start on different port

cd hiring_platform```bash

python3 manage.py runserver 0.0.0.0:8000npm run dev -- -p 3001

``````



### Issue: "Cannot connect to localhost:3001"### Issue: Port 8000 already in use

**Solution:****Solution:** Use different port

```bash```bash

cd frontendpython3 manage.py runserver 8001

npm run dev```

```

---

### Issue: "Module not found" in Next.js

**Solution:**## 🌐 API Endpoints Quick Reference

```bash

rm -rf node_modules### Categories

npm install- `GET /api/categories/` - List all categories

npm run dev- `GET /api/categories/{id}/` - Get category details

```- `GET /api/categories/{id}/jobs/` - Get jobs in category



### Issue: Database migrations fail### Jobs

**Solution:**- `GET /api/jobs/` - List all jobs

```bash- `GET /api/jobs/{id}/` - Get job details

rm db.sqlite3- `GET /api/jobs/{id}/similar/` - Get similar jobs

python3 manage.py migrate- `GET /recent-jobs/` - Get recent jobs

```

### Applications

### Issue: CORS errors in browser console- `POST /api/applications/` - Submit CV/Application

**Solution:** CORS is already configured in `settings.py` for localhost:3000 and 3001- `GET /api/applications/` - List all applications

- `GET /api/applications/{id}/` - Get application details

### Issue: Can't upload CV

**Solution:** Ensure file is PDF, DOC, DOCX, or TXT and under 5MB---



---## 🚀 Next Steps



## 8. File Structure1. ✅ Setup both backend and frontend

2. ✅ Add sample job data

```3. ✅ Test job browsing and applications

hiring/4. ✅ Check admin panel

├── hiring_platform/          # Django backend5. Try these advanced features:

│   ├── manage.py   - Search jobs by keyword

│   ├── requirements.txt   - Filter by job type

│   ├── db.sqlite3   - View similar jobs

│   ├── hiring_platform/   - Track application status

│   │   ├── settings.py       # Django config

│   │   ├── urls.py          # URL routing---

│   │   ├── wsgi.py

│   │   └── asgi.py## 📧 Need Help?

│   └── jobs_api/

│       ├── models.py         # Database modelsCheck the main README.md file for:

│       ├── views.py          # API endpoints- Detailed API documentation

│       ├── serializers.py    # Data serialization- Database schema

│       ├── urls.py           # API routes- Deployment instructions

│       └── admin.py- Development tips

├── frontend/                 # Next.js frontend

│   ├── package.json---

│   ├── tsconfig.json

│   └── src/## 🎓 Learning Resources

│       ├── app/

│       │   ├── page.tsx      # Home page- Django: https://docs.djangoproject.com/

│       │   ├── layout.tsx    # Navigation- Django REST Framework: https://www.django-rest-framework.org/

│       │   ├── jobs/         # Job listing- Next.js: https://nextjs.org/docs

│       │   ├── company/      # Company pages- React: https://react.dev/

│       │   └── admin/        # Admin panel

│       ├── components/Happy coding! 🎉

│       ├── services/
│       │   └── api.ts        # API client
│       └── types/
│           └── index.ts      # TypeScript types
└── README.md
```

---

## 9. Key Features Implemented

### For Job Seekers
✅ Browse jobs with advanced filters
✅ View job details
✅ Apply with CV upload
✅ Save jobs for later
✅ Track application status

### For Companies
✅ Register company account
✅ Post job listings
✅ View all applications
✅ Manage job postings
✅ Track job statistics
✅ Interview scheduling

### For Administrators
✅ Django admin panel
✅ Manage all models
✅ View analytics
✅ Moderate content
✅ User management

---

## 10. Next Steps

1. **Test Company Registration**
   - Navigate to http://localhost:3001/company/signup
   - Fill out form and submit

2. **Post Your First Job**
   - Login to company account
   - Click "+ Post New Job"
   - Fill details and submit

3. **Apply for Jobs**
   - Navigate to http://localhost:3001/jobs
   - Click on a job
   - Submit application with CV

4. **Check Admin Panel**
   - Go to http://localhost:8000/admin/
   - Review all data

---

## Support

For issues or questions:
1. Check Django logs: `python3 manage.py runserver`
2. Check browser console (F12)
3. Check API responses with cURL
4. Review error messages in admin panel

Happy hiring! 🎉
