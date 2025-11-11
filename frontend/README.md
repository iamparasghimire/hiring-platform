# Hiring Platform - Frontend

Next.js frontend application for the job hiring platform.

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running on http://localhost:8000

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   Navigate to http://localhost:3000

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Features

- Browse and search jobs
- View job details
- Apply to jobs with CV upload
- Company registration and login
- Company dashboard for managing jobs and applications
- Responsive design with Tailwind CSS

## Pages

- `/` - Homepage
- `/jobs` - All jobs listing
- `/jobs/[id]` - Job details and application
- `/company/signup` - Company registration
- `/company/login` - Company login
- `/company/dashboard` - Company dashboard
- `/company/jobs/post` - Post new job
- `/about` - About page
- `/contact` - Contact page

## Tech Stack

- Next.js 14+
- React 18+
- TypeScript
- Tailwind CSS
- Axios

## Environment Variables

Create a `.env.local` file for custom API URL:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Build for Production

```bash
npm run build
npm start
```

The application will be optimized and ready for deployment.
