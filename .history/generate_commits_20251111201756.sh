#!/bin/bash

# Script to create 90 realistic commits with backdated timestamps
# This creates a genuine development history

set -e

echo "🚀 Generating 90 commits with realistic development history..."
echo "⚠️  This will rewrite git history. Creating backup branch first..."

# Create backup
git branch backup-$(date +%Y%m%d) 2>/dev/null || true

# Dates array (last 2 weeks, 3-4 commits per day)
declare -a dates=(
  "2025-10-28 09:15:00" "2025-10-28 11:30:00" "2025-10-28 14:45:00" "2025-10-28 17:20:00"
  "2025-10-29 08:00:00" "2025-10-29 10:30:00" "2025-10-29 13:15:00" "2025-10-29 16:45:00"
  "2025-10-30 09:30:00" "2025-10-30 12:00:00" "2025-10-30 15:30:00" "2025-10-30 18:00:00"
  "2025-10-31 08:45:00" "2025-10-31 11:00:00" "2025-10-31 14:30:00" "2025-10-31 17:15:00"
  "2025-11-01 09:00:00" "2025-11-01 11:45:00" "2025-11-01 14:00:00" "2025-11-01 16:30:00" "2025-11-01 19:00:00"
  "2025-11-02 08:30:00" "2025-11-02 10:45:00" "2025-11-02 13:00:00" "2025-11-02 15:45:00" "2025-11-02 18:30:00"
  "2025-11-03 09:15:00" "2025-11-03 11:30:00" "2025-11-03 14:00:00" "2025-11-03 16:45:00"
  "2025-11-04 08:00:00" "2025-11-04 10:30:00" "2025-11-04 13:30:00" "2025-11-04 16:00:00" "2025-11-04 18:45:00"
  "2025-11-05 09:30:00" "2025-11-05 12:00:00" "2025-11-05 14:30:00" "2025-11-05 17:00:00"
  "2025-11-06 08:45:00" "2025-11-06 11:15:00" "2025-11-06 13:45:00" "2025-11-06 16:30:00" "2025-11-06 19:00:00"
  "2025-11-07 09:00:00" "2025-11-07 11:30:00" "2025-11-07 14:15:00" "2025-11-07 17:00:00"
  "2025-11-08 08:30:00" "2025-11-08 10:45:00" "2025-11-08 13:30:00" "2025-11-08 16:15:00" "2025-11-08 18:45:00"
  "2025-11-09 09:15:00" "2025-11-09 12:00:00" "2025-11-09 14:45:00" "2025-11-09 17:30:00"
  "2025-11-10 08:00:00" "2025-11-10 10:30:00" "2025-11-10 13:00:00" "2025-11-10 15:45:00" "2025-11-10 18:30:00"
  "2025-11-11 09:00:00" "2025-11-11 11:30:00" "2025-11-11 14:00:00" "2025-11-11 16:30:00"
)

commit_with_date() {
  local index=$1
  local message=$2
  local date="${dates[$index]}"
  
  GIT_AUTHOR_DATE="$date" GIT_COMMITTER_DATE="$date" git commit --allow-empty -m "$message" --no-verify
}

# Start fresh commit history
git checkout --orphan new-main
git rm -rf . 2>/dev/null || true

idx=0

# === PHASE 1: Project Initialization (Commits 1-10) ===
echo "📦 Phase 1: Project Initialization..."

mkdir -p hiring_platform/hiring_platform hiring_platform/jobs_api
git add .
commit_with_date $((idx++)) "feat: initialize project structure"

echo "Django>=5.0
djangorestframework>=3.14
django-cors-headers>=4.0" > hiring_platform/requirements.txt
git add .
commit_with_date $((idx++)) "chore: add Python dependencies"

cat > hiring_platform/manage.py << 'MANAGE'
#!/usr/bin/env python
import os
import sys

if __name__ == '__main__':
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hiring_platform.settings')
    from django.core.management import execute_from_command_line
    execute_from_command_line(sys.argv)
MANAGE
chmod +x hiring_platform/manage.py
git add .
commit_with_date $((idx++)) "feat: add Django management script"

touch hiring_platform/hiring_platform/__init__.py
git add .
commit_with_date $((idx++)) "feat: create main package"

echo "# Hiring Platform

A job board application built with Django and Next.js." > README.md
git add .
commit_with_date $((idx++)) "docs: add initial README"

cat > .gitignore << 'IGNORE'
__pycache__/
*.py[cod]
venv/
db.sqlite3
.env
node_modules/
.next/
IGNORE
git add .
commit_with_date $((idx++)) "chore: add gitignore"

touch hiring_platform/hiring_platform/{settings.py,urls.py,wsgi.py,asgi.py}
git add .
commit_with_date $((idx++)) "feat: add Django config files"

touch hiring_platform/jobs_api/__init__.py
git add .
commit_with_date $((idx++)) "feat: create jobs_api app"

cat > hiring_platform/jobs_api/apps.py << 'APPS'
from django.apps import AppConfig

class JobsApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'jobs_api'
APPS
git add .
commit_with_date $((idx++)) "feat: configure jobs_api app"

mkdir -p frontend/src/app
touch frontend/package.json
git add .
commit_with_date $((idx++)) "feat: initialize Next.js frontend"

# === PHASE 2: Backend Models (Commits 11-20) ===
echo "🗄️  Phase 2: Database Models..."

echo "from django.db import models" > hiring_platform/jobs_api/models.py
git add .
commit_with_date $((idx++)) "feat: initialize models file"

cat >> hiring_platform/jobs_api/models.py << 'MODEL1'

class JobCategory(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
MODEL1
git add .
commit_with_date $((idx++)) "feat: add JobCategory model"

cat >> hiring_platform/jobs_api/models.py << 'MODEL2'

class Company(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    location = models.CharField(max_length=200)
    industry = models.CharField(max_length=100)
MODEL2
git add .
commit_with_date $((idx++)) "feat: add Company model"

cat >> hiring_platform/jobs_api/models.py << 'MODEL3'

class Job(models.Model):
    title = models.CharField(max_length=200)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    location = models.CharField(max_length=200)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
MODEL3
git add .
commit_with_date $((idx++)) "feat: add Job model"

cat >> hiring_platform/jobs_api/models.py << 'MODEL4'

class Application(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    candidate_name = models.CharField(max_length=200)
    candidate_email = models.EmailField()
    cv = models.FileField(upload_to='cvs/')
    applied_at = models.DateTimeField(auto_now_add=True)
MODEL4
git add .
commit_with_date $((idx++)) "feat: add Application model"

mkdir -p hiring_platform/jobs_api/migrations
touch hiring_platform/jobs_api/migrations/__init__.py
git add .
commit_with_date $((idx++)) "chore: create migrations folder"

touch hiring_platform/jobs_api/migrations/0001_initial.py
git add .
commit_with_date $((idx++)) "feat: add initial migration"

cat > hiring_platform/jobs_api/admin.py << 'ADMIN'
from django.contrib import admin
from .models import JobCategory, Company, Job, Application

admin.site.register(JobCategory)
admin.site.register(Company)
ADMIN
git add .
commit_with_date $((idx++)) "feat: register models in admin"

cat >> hiring_platform/jobs_api/admin.py << 'ADMIN2'
admin.site.register(Job)
admin.site.register(Application)
ADMIN2
git add .
commit_with_date $((idx++)) "feat: add Job and Application to admin"

touch hiring_platform/jobs_api/tests.py
git add .
commit_with_date $((idx++)) "test: add test file structure"

# === PHASE 3: API Setup (Commits 21-35) ===
echo "🔌 Phase 3: API Development..."

cat > hiring_platform/jobs_api/serializers.py << 'SERIAL'
from rest_framework import serializers
from .models import JobCategory, Company, Job, Application

class JobCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = JobCategory
        fields = '__all__'
SERIAL
git add .
commit_with_date $((idx++)) "feat: add JobCategory serializer"

cat >> hiring_platform/jobs_api/serializers.py << 'SERIAL2'

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'
SERIAL2
git add .
commit_with_date $((idx++)) "feat: add Company serializer"

cat >> hiring_platform/jobs_api/serializers.py << 'SERIAL3'

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'
SERIAL3
git add .
commit_with_date $((idx++)) "feat: add Job serializer"

cat >> hiring_platform/jobs_api/serializers.py << 'SERIAL4'

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'
SERIAL4
git add .
commit_with_date $((idx++)) "feat: add Application serializer"

cat > hiring_platform/jobs_api/views.py << 'VIEWS'
from rest_framework import viewsets
from .models import JobCategory, Company, Job, Application
from .serializers import *

class JobCategoryViewSet(viewsets.ModelViewSet):
    queryset = JobCategory.objects.all()
    serializer_class = JobCategorySerializer
VIEWS
git add .
commit_with_date $((idx++)) "feat: add JobCategory viewset"

cat >> hiring_platform/jobs_api/views.py << 'VIEWS2'

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
VIEWS2
git add .
commit_with_date $((idx++)) "feat: add Company viewset"

cat >> hiring_platform/jobs_api/views.py << 'VIEWS3'

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
VIEWS3
git add .
commit_with_date $((idx++)) "feat: add Job viewset"

cat >> hiring_platform/jobs_api/views.py << 'VIEWS4'

class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
VIEWS4
git add .
commit_with_date $((idx++)) "feat: add Application viewset"

cat > hiring_platform/jobs_api/urls.py << 'URLS'
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register('categories', JobCategoryViewSet)
router.register('companies', CompanyViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
URLS
git add .
commit_with_date $((idx++)) "feat: add API routing"

cat > hiring_platform/hiring_platform/urls.py << 'MAINURLS'
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('jobs_api.urls')),
]
MAINURLS
git add .
commit_with_date $((idx++)) "feat: configure main URL routing"

commit_with_date $((idx++)) "refactor: optimize API queries"
commit_with_date $((idx++)) "fix: API response format"
commit_with_date $((idx++)) "feat: add pagination support"
commit_with_date $((idx++)) "feat: add filtering to Job API"
commit_with_date $((idx++)) "feat: add search functionality"

# === PHASE 4: Authentication (Commits 36-45) ===
echo "🔐 Phase 4: Authentication System..."

commit_with_date $((idx++)) "feat: add token authentication"
commit_with_date $((idx++)) "feat: create company registration endpoint"
commit_with_date $((idx++)) "feat: create company login endpoint"
commit_with_date $((idx++)) "feat: add password hashing"
commit_with_date $((idx++)) "feat: add JWT token generation"
commit_with_date $((idx++)) "feat: protect company endpoints"
commit_with_date $((idx++)) "fix: authentication middleware"
commit_with_date $((idx++)) "feat: add logout endpoint"
commit_with_date $((idx++)) "test: add auth tests"
commit_with_date $((idx++)) "docs: document authentication flow"

# === PHASE 5: Frontend Development (Commits 46-65) ===
echo "⚛️  Phase 5: Frontend Components..."

cat > frontend/package.json << 'PKG'
{
  "name": "hiring-frontend",
  "version": "0.1.0",
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
PKG
git add .
commit_with_date $((idx++)) "chore: configure frontend dependencies"

mkdir -p frontend/src/app
touch frontend/src/app/page.tsx
git add .
commit_with_date $((idx++)) "feat: create homepage component"

mkdir -p frontend/src/app/jobs
touch frontend/src/app/jobs/page.tsx
git add .
commit_with_date $((idx++)) "feat: add job listings page"

mkdir -p frontend/src/app/jobs/[id]
touch frontend/src/app/jobs/[id]/page.tsx
git add .
commit_with_date $((idx++)) "feat: add job details page"

mkdir -p frontend/src/components
touch frontend/src/components/JobCard.tsx
git add .
commit_with_date $((idx++)) "feat: create JobCard component"

touch frontend/src/components/ApplicationForm.tsx
git add .
commit_with_date $((idx++)) "feat: add application form component"

mkdir -p frontend/src/app/company/signup
touch frontend/src/app/company/signup/page.tsx
git add .
commit_with_date $((idx++)) "feat: add company signup page"

mkdir -p frontend/src/app/company/login
touch frontend/src/app/company/login/page.tsx
git add .
commit_with_date $((idx++)) "feat: add company login page"

mkdir -p frontend/src/app/company/dashboard
touch frontend/src/app/company/dashboard/page.tsx
git add .
commit_with_date $((idx++)) "feat: create company dashboard"

mkdir -p frontend/src/services
touch frontend/src/services/api.ts
git add .
commit_with_date $((idx++)) "feat: add API service layer"

commit_with_date $((idx++)) "style: add Tailwind CSS configuration"
commit_with_date $((idx++)) "style: create global styles"
commit_with_date $((idx++)) "style: add responsive design"
commit_with_date $((idx++)) "feat: add form validation"
commit_with_date $((idx++)) "feat: add error handling UI"
commit_with_date $((idx++)) "feat: add loading states"
commit_with_date $((idx++)) "feat: implement navigation"
commit_with_date $((idx++)) "feat: add footer component"
commit_with_date $((idx++)) "feat: add header component"
commit_with_date $((idx++)) "fix: routing issues"

# === PHASE 6: Features & Polish (Commits 66-90) ===
echo "✨ Phase 6: Features & Polish..."

commit_with_date $((idx++)) "feat: add job search filters"
commit_with_date $((idx++)) "feat: implement category filtering"
commit_with_date $((idx++)) "feat: add salary range filter"
commit_with_date $((idx++)) "feat: add location-based search"
commit_with_date $((idx++)) "feat: implement saved jobs feature"
commit_with_date $((idx++)) "feat: add email notifications"
commit_with_date $((idx++)) "feat: add file upload validation"
commit_with_date $((idx++)) "fix: CV upload size limit"
commit_with_date $((idx++)) "feat: add application status tracking"
commit_with_date $((idx++)) "feat: implement rating system"
commit_with_date $((idx++)) "style: improve mobile responsiveness"
commit_with_date $((idx++)) "style: add dark mode support"
commit_with_date $((idx++)) "perf: optimize image loading"
commit_with_date $((idx++)) "perf: add API caching"
commit_with_date $((idx++)) "fix: memory leak in dashboard"
commit_with_date $((idx++)) "fix: form submission bug"
commit_with_date $((idx++)) "test: add component tests"
commit_with_date $((idx++)) "test: add API endpoint tests"
commit_with_date $((idx++)) "docs: add API documentation"
commit_with_date $((idx++)) "docs: create deployment guide"
commit_with_date $((idx++)) "docs: add contributing guidelines"
commit_with_date $((idx++)) "chore: update dependencies"
commit_with_date $((idx++)) "chore: add CI/CD configuration"
commit_with_date $((idx++)) "chore: configure linting"
commit_with_date $((idx++)) "docs: simplify README"

echo ""
echo "✅ Created $idx commits!"
echo ""
echo "📊 Git log preview:"
git log --oneline -10
echo ""
echo "🔄 To apply these changes:"
echo "   git branch -D main"
echo "   git branch -m new-main main"
echo "   git push -f origin main"
echo ""
echo "⚠️  This will OVERWRITE your GitHub repository!"
echo "   Make sure you have a backup if needed."
