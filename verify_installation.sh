#!/bin/bash

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🔍 Hiring Platform - Installation Verification"
echo "================================================"
echo ""

# Check backend
echo -e "${YELLOW}Backend Check:${NC}"

if [ -f "hiring_platform/manage.py" ]; then
    echo -e "${GREEN}✓${NC} manage.py found"
else
    echo -e "${RED}✗${NC} manage.py not found"
fi

if [ -f "hiring_platform/db.sqlite3" ]; then
    echo -e "${GREEN}✓${NC} Database exists"
else
    echo -e "${YELLOW}!${NC} Database not created (Run: python manage.py migrate)"
fi

if [ -f "hiring_platform/jobs_api/models.py" ]; then
    echo -e "${GREEN}✓${NC} Models defined"
else
    echo -e "${RED}✗${NC} Models not found"
fi

if [ -f "hiring_platform/jobs_api/views.py" ]; then
    echo -e "${GREEN}✓${NC} Views created"
else
    echo -e "${RED}✗${NC} Views not found"
fi

echo ""
echo -e "${YELLOW}Frontend Check:${NC}"

if [ -f "frontend/package.json" ]; then
    echo -e "${GREEN}✓${NC} package.json found"
else
    echo -e "${RED}✗${NC} package.json not found"
fi

if [ -d "frontend/node_modules" ]; then
    echo -e "${GREEN}✓${NC} Dependencies installed"
else
    echo -e "${YELLOW}!${NC} Dependencies not installed (Run: npm install)"
fi

if [ -f "frontend/src/app/page.tsx" ]; then
    echo -e "${GREEN}✓${NC} Home page created"
else
    echo -e "${RED}✗${NC} Home page not found"
fi

if [ -f "frontend/src/components/JobCard.tsx" ]; then
    echo -e "${GREEN}✓${NC} Components created"
else
    echo -e "${RED}✗${NC} Components not found"
fi

if [ -f "frontend/src/services/api.ts" ]; then
    echo -e "${GREEN}✓${NC} API service created"
else
    echo -e "${RED}✗${NC} API service not found"
fi

echo ""
echo -e "${YELLOW}Documentation Check:${NC}"

if [ -f "README.md" ]; then
    echo -e "${GREEN}✓${NC} README.md found"
else
    echo -e "${YELLOW}!${NC} README.md not found"
fi

if [ -f "QUICK_START.md" ]; then
    echo -e "${GREEN}✓${NC} QUICK_START.md found"
else
    echo -e "${YELLOW}!${NC} QUICK_START.md not found"
fi

if [ -f "IMPLEMENTATION_SUMMARY.md" ]; then
    echo -e "${GREEN}✓${NC} IMPLEMENTATION_SUMMARY.md found"
else
    echo -e "${YELLOW}!${NC} IMPLEMENTATION_SUMMARY.md not found"
fi

echo ""
echo "================================================"
echo -e "${GREEN}✅ Verification Complete!${NC}"
echo ""
echo "📝 Next Steps:"
echo "1. Read QUICK_START.md for setup instructions"
echo "2. Start backend: cd hiring_platform && python manage.py runserver"
echo "3. Start frontend: cd frontend && npm run dev"
echo "4. Add sample data from QUICK_START.md"
echo "5. Visit http://localhost:3000"
echo ""
