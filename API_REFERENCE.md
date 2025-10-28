# 📚 Complete API Reference

Full documentation for all hiring platform API endpoints.

---

## Base URL

```
http://localhost:8000/api
```

## Authentication

Token-based authentication for protected endpoints:

```http
Authorization: Token your-token-here
```

## Response Format

All responses are JSON:

```json
{
  "data": {},
  "status": "success",
  "message": "Operation successful"
}
```

## Pagination

Default: 10 items per page

```http
GET /api/jobs/?page=2
```

**Response includes**:
- `count` - Total items
- `next` - Next page URL
- `previous` - Previous page URL
- `results` - Array of items

---

## Authentication Endpoints

### Company Registration

```http
POST /api/company-register/
Content-Type: application/json
```

**Request**:
```json
{
  "name": "TechCorp Inc",
  "email": "admin@techcorp.com",
  "password": "SecurePassword123",
  "location": "San Francisco, CA",
  "website": "https://techcorp.com",
  "industry": "Technology",
  "phone": "+1-555-0123",
  "employee_count": "100-500",
  "founded_year": 2020,
  "description": "Leading tech company"
}
```

**Required fields**: `name`, `email`, `password`

**Response (201 Created)**:
```json
{
  "token": "9f9cecba8ee7762c7c88f376ca291bf824f1b236",
  "company_id": 4,
  "company_name": "TechCorp Inc",
  "email": "admin@techcorp.com"
}
```

**Error (400 Bad Request)**:
```json
{
  "detail": "Email already registered"
}
```

---

### Company Login

```http
POST /api/company-login/
Content-Type: application/json
```

**Request**:
```json
{
  "email": "admin@techcorp.com",
  "password": "SecurePassword123"
}
```

**Response (200 OK)**:
```json
{
  "token": "9f9cecba8ee7762c7c88f376ca291bf824f1b236",
  "company_id": 4,
  "company_name": "TechCorp Inc",
  "email": "admin@techcorp.com"
}
```

**Errors**:
- `400` - Missing email or password
- `401` - Invalid credentials
- `404` - Company not found

---

## Category Endpoints

### List Categories

```http
GET /api/categories/
```

**Response (200 OK)**:
```json
{
  "count": 5,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "name": "Technology",
      "icon": "💻",
      "description": "Tech and software jobs",
      "jobs_count": 42
    },
    {
      "id": 2,
      "name": "Design",
      "icon": "🎨",
      "description": "Design positions",
      "jobs_count": 18
    }
  ]
}
```

### Get Category Details

```http
GET /api/categories/{id}/
```

**Response (200 OK)**:
```json
{
  "id": 1,
  "name": "Technology",
  "icon": "💻",
  "description": "Tech and software jobs",
  "jobs_count": 42
}
```

### Get Category Jobs

```http
GET /api/categories/{id}/jobs/
```

**Query Parameters**:
- `search` - Search term
- `page` - Page number
- `page_size` - Items per page

**Response (200 OK)**:
```json
{
  "count": 42,
  "results": [
    {
      "id": 1,
      "title": "Senior Python Developer",
      "company": {...},
      "location": "San Francisco",
      ...
    }
  ]
}
```

---

## Job Endpoints

### List Jobs

```http
GET /api/jobs/
```

**Query Parameters**:
| Parameter | Type | Example |
|-----------|------|---------|
| search | string | `developer` |
| job_type | string | `full_time` |
| experience_level | string | `senior` |
| category | integer | `1` |
| location | string | `San Francisco` |
| salary_min | integer | `80000` |
| salary_max | integer | `150000` |
| page | integer | `1` |

**Example**:
```http
GET /api/jobs/?search=python&job_type=full_time&salary_min=100000&page=1
```

**Response (200 OK)**:
```json
{
  "count": 156,
  "next": "http://localhost:8000/api/jobs/?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "title": "Senior Python Developer",
      "company": {
        "id": 4,
        "name": "TechCorp Inc",
        "email": "admin@techcorp.com",
        "location": "San Francisco, CA",
        "industry": "Technology"
      },
      "location": "San Francisco, CA",
      "description": "Join our team...",
      "requirements": "5+ years experience...",
      "salary_min": 120000,
      "salary_max": 160000,
      "job_type": "full_time",
      "experience_level": "senior",
      "category": {
        "id": 1,
        "name": "Technology"
      },
      "skills_required": "Python, Django, REST API",
      "benefits": "Health insurance, remote work",
      "status": "open",
      "applications_count": 12,
      "views_count": 245,
      "created_at": "2024-10-25T10:30:00Z",
      "updated_at": "2024-10-25T10:30:00Z"
    }
  ]
}
```

### Get Job Details

```http
GET /api/jobs/{id}/
```

**Response (200 OK)**:
```json
{
  "id": 1,
  "title": "Senior Python Developer",
  "company": {...},
  "location": "San Francisco, CA",
  ...
}
```

### Create Job

```http
POST /api/jobs/
Authorization: Token your-token
Content-Type: application/json
```

**Request**:
```json
{
  "title": "Senior Python Developer",
  "location": "San Francisco, CA",
  "description": "We are looking for...",
  "requirements": "- 5+ years experience\n- Django knowledge",
  "salary_min": 120000,
  "salary_max": 160000,
  "job_type": "full_time",
  "experience_level": "senior",
  "category": 1,
  "skills_required": "Python, Django, REST API",
  "benefits": "- Health insurance\n- Remote work"
}
```

**Required fields**: `title`, `location`, `description`, `category`

**Response (201 Created)**:
```json
{
  "id": 142,
  "title": "Senior Python Developer",
  ...
}
```

### Update Job

```http
PATCH /api/jobs/{id}/
Authorization: Token your-token
Content-Type: application/json
```

**Request** (partial update):
```json
{
  "status": "closed",
  "salary_max": 165000
}
```

**Response (200 OK)**:
```json
{
  "id": 1,
  "title": "Senior Python Developer",
  ...
}
```

### Delete Job

```http
DELETE /api/jobs/{id}/
Authorization: Token your-token
```

**Response (204 No Content)**: Empty

---

## Application Endpoints

### Submit Application

```http
POST /api/applications/
Content-Type: multipart/form-data
```

**Form Data**:
| Field | Type | Required |
|-------|------|----------|
| job | integer | ✓ |
| candidate_name | string | ✓ |
| candidate_email | string | ✓ |
| candidate_phone | string | ✓ |
| cv | file | ✓ |
| cover_letter | string | - |

**File validation**:
- Formats: PDF, DOC, DOCX, TXT
- Max size: 5MB

**Example**:
```bash
curl -X POST http://localhost:8000/api/applications/ \
  -F "job=1" \
  -F "candidate_name=John Doe" \
  -F "candidate_email=john@example.com" \
  -F "candidate_phone=+1-555-1234" \
  -F "cv=@resume.pdf" \
  -F "cover_letter=I am interested..."
```

**Response (201 Created)**:
```json
{
  "id": 42,
  "job": 1,
  "candidate_name": "John Doe",
  "candidate_email": "john@example.com",
  "candidate_phone": "+1-555-1234",
  "cv": "http://localhost:8000/media/cvs/2024/10/25/resume.pdf",
  "cover_letter": "I am interested...",
  "status": "submitted",
  "rating": null,
  "notes": "",
  "created_at": "2024-10-25T14:32:00Z"
}
```

### List Applications

```http
GET /api/applications/
Authorization: Token your-token
```

**Query Parameters**:
| Parameter | Type | Example |
|-----------|------|---------|
| job | integer | `1` |
| status | string | `reviewing` |
| search | string | `John` |
| page | integer | `1` |

**Example**:
```http
GET /api/applications/?job=1&status=reviewing
```

**Response (200 OK)**:
```json
{
  "count": 12,
  "results": [
    {
      "id": 42,
      "job": 1,
      "candidate_name": "John Doe",
      ...
    }
  ]
}
```

### Get Application Details

```http
GET /api/applications/{id}/
Authorization: Token your-token
```

**Response (200 OK)**:
```json
{
  "id": 42,
  "job": 1,
  "candidate_name": "John Doe",
  ...
}
```

### Update Application

```http
PATCH /api/applications/{id}/
Authorization: Token your-token
Content-Type: application/json
```

**Request**:
```json
{
  "status": "reviewing",
  "rating": 4,
  "notes": "Strong candidate, needs more experience"
}
```

**Valid statuses**: `submitted`, `reviewing`, `interview`, `accepted`, `rejected`

**Response (200 OK)**:
```json
{
  "id": 42,
  "status": "reviewing",
  "rating": 4,
  "notes": "Strong candidate, needs more experience",
  ...
}
```

### Delete Application

```http
DELETE /api/applications/{id}/
Authorization: Token your-token
```

**Response (204 No Content)**: Empty

---

## Company Endpoints

### List Companies

```http
GET /api/companies/
```

**Response (200 OK)**:
```json
{
  "count": 15,
  "results": [
    {
      "id": 4,
      "name": "TechCorp Inc",
      "email": "admin@techcorp.com",
      "location": "San Francisco, CA",
      "website": "https://techcorp.com",
      "industry": "Technology",
      "phone": "+1-555-0123",
      "employee_count": "100-500",
      "founded_year": 2020,
      "description": "Leading tech company",
      "verified": false,
      "jobs_count": 8,
      "active_jobs": 7,
      "created_at": "2024-10-25T10:00:00Z"
    }
  ]
}
```

### Get Company Details

```http
GET /api/companies/{id}/
```

**Response (200 OK)**:
```json
{
  "id": 4,
  "name": "TechCorp Inc",
  ...
}
```

### Get Company Jobs

```http
GET /api/companies/{id}/jobs/
```

**Response (200 OK)**:
```json
{
  "count": 8,
  "results": [
    {
      "id": 1,
      "title": "Senior Python Developer",
      ...
    }
  ]
}
```

### Update Company (Authenticated)

```http
PATCH /api/companies/{id}/
Authorization: Token your-token
Content-Type: application/json
```

**Request**:
```json
{
  "website": "https://newtechcorp.com",
  "description": "Updated description"
}
```

**Response (200 OK)**:
```json
{
  "id": 4,
  "name": "TechCorp Inc",
  ...
}
```

---

## Interview Endpoints

### Create Interview

```http
POST /api/interviews/
Authorization: Token your-token
Content-Type: application/json
```

**Request**:
```json
{
  "application": 42,
  "interview_type": "phone",
  "scheduled_at": "2024-11-01T10:00:00Z",
  "duration": 60,
  "notes": "Initial phone screen"
}
```

**Interview types**: `phone`, `video`, `in_person`, `assignment`

**Response (201 Created)**:
```json
{
  "id": 10,
  "application": 42,
  "interview_type": "phone",
  "scheduled_at": "2024-11-01T10:00:00Z",
  "duration": 60,
  "status": "scheduled",
  "rating": null,
  "notes": "Initial phone screen",
  "created_at": "2024-10-25T14:32:00Z"
}
```

### List Interviews

```http
GET /api/interviews/
Authorization: Token your-token
```

**Query Parameters**:
| Parameter | Type | Example |
|-----------|------|---------|
| status | string | `scheduled` |
| application | integer | `42` |
| page | integer | `1` |

**Response (200 OK)**:
```json
{
  "count": 5,
  "results": [
    {
      "id": 10,
      ...
    }
  ]
}
```

### Update Interview

```http
PATCH /api/interviews/{id}/
Authorization: Token your-token
Content-Type: application/json
```

**Request**:
```json
{
  "status": "completed",
  "rating": 5,
  "notes": "Excellent candidate, offer extended"
}
```

**Valid statuses**: `scheduled`, `completed`, `no_show`, `cancelled`

**Response (200 OK)**:
```json
{
  "id": 10,
  "status": "completed",
  "rating": 5,
  ...
}
```

---

## Saved Job Endpoints

### Save Job

```http
POST /api/saved-jobs/
Content-Type: application/json
```

**Request**:
```json
{
  "job": 1,
  "candidate_email": "john@example.com"
}
```

**Response (201 Created)**:
```json
{
  "id": 100,
  "job": 1,
  "candidate_email": "john@example.com",
  "saved_at": "2024-10-25T14:32:00Z"
}
```

### List Saved Jobs

```http
GET /api/saved-jobs/?candidate_email=john@example.com
```

**Response (200 OK)**:
```json
{
  "count": 5,
  "results": [
    {
      "id": 100,
      "job": {...},
      "candidate_email": "john@example.com",
      "saved_at": "2024-10-25T14:32:00Z"
    }
  ]
}
```

### Delete Saved Job

```http
DELETE /api/saved-jobs/{id}/
```

**Response (204 No Content)**: Empty

---

## Error Responses

### 400 Bad Request
```json
{
  "detail": "Invalid request data",
  "field_name": ["Error message"]
}
```

### 401 Unauthorized
```json
{
  "detail": "Authentication credentials were not provided."
}
```

### 403 Forbidden
```json
{
  "detail": "You do not have permission to perform this action."
}
```

### 404 Not Found
```json
{
  "detail": "Not found."
}
```

### 500 Server Error
```json
{
  "detail": "Internal server error"
}
```

---

## Rate Limiting

Currently unlimited, but production setup should include:

```
- 1000 requests per hour per IP
- 100 requests per minute for authenticated users
```

---

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 204 | No Content - Successful delete |
| 400 | Bad Request - Invalid data |
| 401 | Unauthorized - Auth required |
| 403 | Forbidden - No permission |
| 404 | Not Found - Resource doesn't exist |
| 500 | Server Error - Internal error |

---

## Testing Endpoints

### List All Jobs
```bash
curl http://localhost:8000/api/jobs/
```

### Create Company
```bash
curl -X POST http://localhost:8000/api/company-register/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Company",
    "email": "test@company.com",
    "password": "Password123"
  }'
```

### Login Company
```bash
curl -X POST http://localhost:8000/api/company-login/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@company.com",
    "password": "Password123"
  }'
```

### Submit Application
```bash
curl -X POST http://localhost:8000/api/applications/ \
  -F "job=1" \
  -F "candidate_name=John Doe" \
  -F "candidate_email=john@example.com" \
  -F "candidate_phone=+1-555-1234" \
  -F "cv=@resume.pdf"
```

---

## Webhooks (Future)

Planned webhook events:
- Application submitted
- Application status changed
- Interview scheduled
- Job posted
- Job closed

---

## Versioning

Current API version: `v1`

Future versions will support:
```http
GET /api/v2/jobs/
```

---

## Support

- 📧 Email: api-support@hiringplatform.dev
- 📚 Full docs: https://github.com/yourusername/hiring-platform
- 🐛 Report bugs: https://github.com/yourusername/hiring-platform/issues

---

**Last Updated**: October 25, 2025  
**API Version**: 1.0
