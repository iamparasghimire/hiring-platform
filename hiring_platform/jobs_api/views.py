from rest_framework import viewsets, generics, status
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.authtoken.models import Token
from django.db.models import Q
from django.contrib.auth.models import User
from .models import JobCategory, Job, Application, Company, Interview, SavedJob
from .serializers import (
    JobCategorySerializer, 
    JobSerializer, 
    JobDetailSerializer,
    ApplicationSerializer, 
    ApplicationCreateSerializer,
    ApplicationListSerializer,
    CompanySerializer,
    InterviewSerializer,
    SavedJobSerializer
)


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class JobCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = JobCategory.objects.all()
    serializer_class = JobCategorySerializer
    pagination_class = StandardResultsSetPagination
    
    @action(detail=True, methods=['get'])
    def jobs(self, request, pk=None):
        """Get all open jobs in a category"""
        category = self.get_object()
        jobs = category.jobs.filter(status='open')
        
        page = self.paginate_queryset(jobs)
        if page is not None:
            serializer = JobSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = JobSerializer(jobs, many=True)
        return Response(serializer.data)


class JobViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Job.objects.filter(status='open')
    serializer_class = JobSerializer
    pagination_class = StandardResultsSetPagination

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return JobDetailSerializer
        return JobSerializer

    def get_queryset(self):
        queryset = Job.objects.filter(status='open')
        
        # Filter by category
        category_id = self.request.query_params.get('category')
        if category_id is not None:
            queryset = queryset.filter(category_id=category_id)
        
        # Search by title, company, or location
        search = self.request.query_params.get('search')
        if search is not None:
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(company_name__icontains=search) |
                Q(location__icontains=search)
            )
        
        # Filter by job type
        job_type = self.request.query_params.get('job_type')
        if job_type is not None:
            queryset = queryset.filter(job_type=job_type)
        
        return queryset

    @action(detail=True, methods=['get'])
    def applications(self, request, pk=None):
        """Get all applications for a specific job"""
        job = self.get_object()
        applications = job.applications.all()
        
        page = self.paginate_queryset(applications)
        if page is not None:
            serializer = ApplicationListSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = ApplicationListSerializer(applications, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def similar(self, request, pk=None):
        """Get similar jobs from the same category"""
        job = self.get_object()
        similar_jobs = Job.objects.filter(
            category=job.category,
            status='open'
        ).exclude(id=job.id)[:5]
        
        serializer = JobSerializer(similar_jobs, many=True)
        return Response(serializer.data)


class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    pagination_class = StandardResultsSetPagination
    
    def get_serializer_class(self):
        if self.action == 'create':
            return ApplicationCreateSerializer
        elif self.action == 'list':
            return ApplicationListSerializer
        return ApplicationSerializer
    
    def get_queryset(self):
        queryset = Application.objects.all()
        
        # Filter by job
        job_id = self.request.query_params.get('job')
        if job_id is not None:
            queryset = queryset.filter(job_id=job_id)
        
        # Filter by status
        status = self.request.query_params.get('status')
        if status is not None:
            queryset = queryset.filter(status=status)
        
        # Search by candidate email or name
        search = self.request.query_params.get('search')
        if search is not None:
            queryset = queryset.filter(
                Q(candidate_name__icontains=search) |
                Q(candidate_email__icontains=search)
            )
        
        return queryset
    
    def create(self, request, *args, **kwargs):
        """Create a new application with CV upload"""
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            try:
                self.perform_create(serializer)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response(
                    {'error': str(e)}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Convenience views for common operations
class RecentJobsView(generics.ListAPIView):
    """Get the most recent jobs"""
    queryset = Job.objects.filter(status='open').order_by('-created_at')[:10]
    serializer_class = JobSerializer
    pagination_class = StandardResultsSetPagination


class JobsByCategoryView(generics.ListAPIView):
    """Get jobs by category"""
    serializer_class = JobSerializer
    pagination_class = StandardResultsSetPagination
    
    def get_queryset(self):
        category_id = self.kwargs.get('category_id')
        return Job.objects.filter(category_id=category_id, status='open')


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    pagination_class = StandardResultsSetPagination
    
    @action(detail=True, methods=['get'])
    def jobs(self, request, pk=None):
        """Get all jobs posted by a company"""
        company = self.get_object()
        jobs = company.jobs.all()
        
        page = self.paginate_queryset(jobs)
        if page is not None:
            serializer = JobSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = JobSerializer(jobs, many=True)
        return Response(serializer.data)


class InterviewViewSet(viewsets.ModelViewSet):
    queryset = Interview.objects.all()
    serializer_class = InterviewSerializer
    pagination_class = StandardResultsSetPagination
    
    def get_queryset(self):
        queryset = Interview.objects.all()
        
        # Filter by application
        application_id = self.request.query_params.get('application')
        if application_id is not None:
            queryset = queryset.filter(application_id=application_id)
        
        # Filter by status
        status_filter = self.request.query_params.get('status')
        if status_filter is not None:
            queryset = queryset.filter(status=status_filter)
        
        return queryset


class SavedJobViewSet(viewsets.ModelViewSet):
    queryset = SavedJob.objects.all()
    serializer_class = SavedJobSerializer
    pagination_class = StandardResultsSetPagination
    
    def get_queryset(self):
        queryset = SavedJob.objects.all()
        
        # Filter by candidate email
        candidate_email = self.request.query_params.get('candidate_email')
        if candidate_email is not None:
            queryset = queryset.filter(candidate_email=candidate_email)
        
        return queryset


@api_view(['POST'])
def company_login(request):
    """
    Company login endpoint
    Expects: { "email": "...", "password": "..." }
    Returns: { "token": "...", "company_id": ..., "company_name": "..." }
    """
    email = request.data.get('email')
    password = request.data.get('password')
    
    if not email or not password:
        return Response(
            {'detail': 'Email and password are required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        # Find user by email
        user = User.objects.get(email=email)
        
        # Check password
        if not user.check_password(password):
            return Response(
                {'detail': 'Invalid email or password'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        # Get company associated with user
        company = Company.objects.get(user=user)
        
        # Get or create token
        token, created = Token.objects.get_or_create(user=user)
        
        return Response({
            'token': token.key,
            'company_id': company.id,
            'company_name': company.name,
            'email': company.email,
        }, status=status.HTTP_200_OK)
        
    except User.DoesNotExist:
        return Response(
            {'detail': 'Invalid email or password'},
            status=status.HTTP_401_UNAUTHORIZED
        )
    except Company.DoesNotExist:
        return Response(
            {'detail': 'Company profile not found'},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response(
            {'detail': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['POST'])
def company_register(request):
    """
    Company registration endpoint
    Expects: { "name": "...", "email": "...", "password": "...", "location": "..." }
    Returns: { "token": "...", "company_id": ..., "company_name": "..." }
    """
    name = request.data.get('name')
    email = request.data.get('email')
    password = request.data.get('password')
    location = request.data.get('location', '')
    website = request.data.get('website', '')
    industry = request.data.get('industry', '')
    phone = request.data.get('phone', '')
    employee_count = request.data.get('employee_count', '')
    founded_year = request.data.get('founded_year')
    description = request.data.get('description', '')
    
    if not name or not email or not password:
        return Response(
            {'detail': 'Name, email, and password are required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Check if user already exists
    if User.objects.filter(email=email).exists():
        return Response(
            {'detail': 'Email already registered'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Check if company name already exists
    if Company.objects.filter(name=name).exists():
        return Response(
            {'detail': 'Company name already exists'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        # Create user
        user = User.objects.create_user(
            username=email,
            email=email,
            password=password
        )
        
        # Create company
        company = Company.objects.create(
            user=user,
            name=name,
            email=email,
            location=location,
            website=website,
            industry=industry,
            phone=phone,
            employee_count=employee_count,
            founded_year=founded_year,
            description=description
        )
        
        # Get or create token
        token, created = Token.objects.get_or_create(user=user)
        
        return Response({
            'token': token.key,
            'company_id': company.id,
            'company_name': company.name,
            'email': company.email,
        }, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        return Response(
            {'detail': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )