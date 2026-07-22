import os
from pathlib import Path
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.permissions import AllowAny
from dotenv import load_dotenv
from rest_framework import viewsets
from django.shortcuts import get_object_or_404

# আপনার মডেল এবং সিরিয়ালাইজার ইম্পোর্ট
from .models import BlogPost, Booking, Course, InstituteCourse, Service, ServiceTabItem, Testimonial, FreeConsultationRequest, Comment, BlogPost
from .serializers import (
    BlogPostSerializer, CourseSerializer, PersonalServiceSerializer, InstituteCourseSerializer, TestimonialSerializer, FreeConsultationRequestSerializer, CommentSerializer
)

# 🎯 পারফেক্ট সিকিউর পাথ ট্র্যাকিং ফিক্স:
# backend/blogs/views.py থেকে ৩ ধাপ উপরে গিয়ে মেইন backend ফোল্ডারের .env লোড করা
BASE_DIR = Path(__file__).resolve().parent.parent.parent
load_dotenv(os.path.join(BASE_DIR, '.env'))


class ServiceListAPIView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            services = Service.objects.all().order_by('-id') 
            if not services.exists():
                return Response([], status=status.HTTP_200_OK)
                
            serializer = PersonalServiceSerializer(services, many=True, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ServiceDetailAPIView(APIView):
    def get(self, request, pk, *args, **kwargs):
        try:
            service_instance = Service.objects.get(pk=pk)
            service_data = PersonalServiceSerializer(service_instance, context={'request': request}).data
            tabs = ServiceTabItem.objects.filter(service=service_instance)
            
            tabs_map = {
                "included_services": [],
                "what_we_do": [],
                "working_process": [],
                "who_is_service_for": [],
                "why_choose_us": []
            }
            
            for tab in tabs:
                tabs_map[tab.tab_type] = tab.content

            return Response({
                "id": service_data.get('id'),
                "name": service_data.get('name'),
                "service_type": service_data.get('service_type'),
                "service_overview": service_data.get('service_overview'),
                "image": service_data.get('image'),
                "description": service_data.get('description'),
                
                "included_services": tabs_map["included_services"],
                "what_we_do": tabs_map["what_we_do"],          
                "working_process": tabs_map["working_process"],  
                "who_is_service_for": tabs_map["who_is_service_for"], 
                "why_choose_us": tabs_map["why_choose_us"],      
            }, status=status.HTTP_200_OK)

        except Service.DoesNotExist:
            return Response({"error": "Requested service not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# ২. курс лист API
@api_view(['GET'])
def course_list(request):
    courses = InstituteCourse.objects.all().order_by('-created_at')
    serializer = InstituteCourseSerializer(courses, many=True)
    return Response(serializer.data)


# ৪. টেস্টিমোনিয়াল ও সার্টিফিকেট লিস্ট API
@api_view(['GET'])
def testimonial_list(request):
    testimonials = Testimonial.objects.all().order_by('-created_at')
    serializer = TestimonialSerializer(testimonials, many=True)
    return Response(serializer.data)

# ৫. ফ্রি কনসালটেশন সাবমিট করার API
@api_view(['POST'])
def free_consultation_create(request):
    serializer = FreeConsultationRequestSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Consultation request submitted successfully!", "data": serializer.data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 🚀 শতভাগ কার্যকরী ও নিরাপদ জ্যাঙ্গো SMTP বুকিং এপিআই
@api_view(['POST'])
def create_booking(request):
    data = request.data
    
    try:
        # ১. ডাটাবেজে বুকিংয়ের ডেটা নিরাপদে সেভ করা হচ্ছে
        Booking.objects.create(
            name=data.get('name'),
            email=data.get('email'),
            whatsapp=data.get('whatsapp'),
            service=data.get('service'),
            message=data.get('message')
        )

        # ২. ডায়নামিক ইমেইল মেসেজ বডি তৈরি
        subject = f"New Portfolio Booking: {data.get('service')}"
        message_body = f"""
        Hello,
        
        You have received a new booking request on the portfolio website.
        
        Client/Visitor Details:
        --------------------------------------
        Name: {data.get('name')}
        Email: {data.get('email')}
        WhatsApp: {data.get('whatsapp')}
        Service Requested: {data.get('service')}
        
        Project Brief / Message:
        {data.get('message')}
        --------------------------------------
        
        Best regards,
        Portfolio Notification System
        """
        
        # .env ফাইল থেকে ক্লায়েন্টের রিসিভার মেইল অ্যাড্রেস নেওয়া হচ্ছে
        client_mail = os.getenv('CLIENT_NOTIFICATION_EMAIL')
        my_mail = settings.EMAIL_HOST_USER
        
        # ৩. জ্যাঙ্গোর বিল্ট-ইন SMTP দিয়ে সম্পূর্ণ নিরাপদে মেইল পাঠানো
        send_mail(
            subject=subject,
            message=message_body,
            from_email=my_mail,
            recipient_list=[client_mail, my_mail],  # 👈 ক্লায়েন্ট ও ডেভেলপার দুজনের কাছেই মেইল যাবে
            fail_silently=False,
        )

        return Response({"success": True, "message": "Booking saved and Notification email sent!"}, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        return Response({"success": False, "error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
# ১. হোমপেজে সব কোর্স কার্ড আকারে দেখানোর জন্য API
class CourseListAPIView(generics.ListAPIView):
    queryset = Course.objects.all().order_by('-created_at')
    serializer_class = CourseSerializer
    permission_classes = [AllowAny] # সবার জন্য উন্মুক্ত রাখতে

# ২. আইডি ধরে নির্দিষ্ট কোর্সের ডিটেইলস দেখার জন্য API
class CourseDetailAPIView(generics.RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [AllowAny] # সবার জন্য উন্মুক্ত রাখতে


class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all().order_by('-created_at') # নতুন ব্লগ আগে দেখাবে
    serializer_class = BlogPostSerializer
    
    # আইডি (ID)-র পরিবর্তে স্লাগ (Slug) দিয়ে সিঙ্গেল ব্লগ খোঁজার জন্য
    lookup_field = 'slug'

    def get_queryset(self):
        """
        সাধারণ ইউজারদের জন্য শুধু পাবলিশড হওয়া ব্লগগুলো দেখাবে।
        তবে অ্যাডমিন বা স্টাফরা সব ব্লগই দেখতে ও ম্যানেজ করতে পারবেন।
        """
        user = self.request.user
        if user.is_staff:
            return BlogPost.objects.all().order_by('-created_at')
        return BlogPost.objects.filter(is_published=True).order_by('-created_at')
    

class CommentListCreateView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer

    # 🔍 গেট (GET) লজিক
    def get_queryset(self):
        slug = self.kwargs.get('slug')
        blog = get_object_or_404(BlogPost, slug=slug) # 🎯 BlogPost ব্যবহার করা হয়েছে
        return Comment.objects.filter(blog=blog, parent=None, approved=True)

    # 📥 পোস্ট (POST) লজিক
    def create(self, request, *args, **kwargs):
        slug = self.kwargs.get('slug')
        blog = get_object_or_404(BlogPost, slug=slug) # 🎯 BlogPost ব্যবহার করা হয়েছে
        
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            parent_id = request.data.get('parent')
            parent_comment = None
            
            if parent_id:
                try:
                    parent_comment = Comment.objects.get(id=parent_id)
                except Comment.DoesNotExist:
                    return Response({"error": "Parent comment not found"}, status=status.HTTP_400_BAD_REQUEST)
            
            # ডাটা সেভ
            serializer.save(
                blog=blog, 
                parent=parent_comment, 
                name=request.data.get('name', 'Anonymous') or 'Anonymous',
                approved=False
            )
            
            return Response({
                "message": "Comment submitted successfully!",
                "status": "pending"
            }, status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)