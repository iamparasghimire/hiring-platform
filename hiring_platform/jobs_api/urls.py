from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    JobCategoryViewSet, 
    JobViewSet, 
    ApplicationViewSet,
    CompanyViewSet,
    InterviewViewSet,
    SavedJobViewSet,
    RecentJobsView,
    JobsByCategoryView,
    company_login,
    company_register
)

router = DefaultRouter()
router.register(r'categories', JobCategoryViewSet, basename='category')
router.register(r'jobs', JobViewSet, basename='job')
router.register(r'applications', ApplicationViewSet, basename='application')
router.register(r'companies', CompanyViewSet, basename='company')
router.register(r'interviews', InterviewViewSet, basename='interview')
router.register(r'saved-jobs', SavedJobViewSet, basename='saved-job')

urlpatterns = [
    path('', include(router.urls)),
    path('recent-jobs/', RecentJobsView.as_view(), name='recent-jobs'),
    path('category/<int:category_id>/jobs/', JobsByCategoryView.as_view(), name='category-jobs'),
    path('company-login/', company_login, name='company-login'),
    path('company-register/', company_register, name='company-register'),
]