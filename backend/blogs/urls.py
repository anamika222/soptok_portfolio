from django.urls import path
from . import views

urlpatterns = [
    # আপনার এক্সিস্টিং ইউআরএলসমূহ
    path('testimonials/', views.testimonial_list, name='testimonial-list'),
    path('consultation/submit/', views.free_consultation_create, name='consultation-submit'),
    
    # হোমপেজে সব কার্ড দেখানোর এপিআই এন্ডপয়েন্ট
    path('services/', views.ServiceListAPIView.as_view(), name='service-list'),
    
    # আইডি ধরে নির্দিষ্ট সার্ভিসের ডিটেইলস দেখার এপিআই এন্ডপয়েন্ট
    path('services/<int:pk>/', views.ServiceDetailAPIView.as_view(), name='service-detail'),
    path('booking/', views.create_booking, name='create-booking'),

   # 🚀 ফিক্সড: সামনে থেকে 'api/' কেটে দেওয়া হলো, কারণ মেইন ইউআরএল-এ অলরেডি 'api/' আছে
    path('courses/', views.CourseListAPIView.as_view(), name='api-course-list'),
    path('courses/<int:pk>/', views.CourseDetailAPIView.as_view(), name='api-course-detail'),

    path('blogs/', views.BlogPostViewSet.as_view({'get': 'list', 'post': 'create'}), name='blog-list-create'),
    
    # স্লাগ (Slug) ধরে নির্দিষ্ট ব্লগের ডিটেইলস দেখা, আপডেট বা ডিলিট করার এন্ডপয়েন্ট
    path('blogs/<slug:slug>/', views.BlogPostViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='blog-detail-view'),
    path('blogs/<slug:slug>/comments/', views.CommentListCreateView.as_view(), name='blog-comments'),
]