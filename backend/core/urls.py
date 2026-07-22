from django.contrib import admin
from django.http import JsonResponse
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static


def home_api(request):
    return JsonResponse({"message": "Welcome to Saptak Portfolio API Ecosystem!"})
urlpatterns = [
    path('', home_api),
    path('admin/', admin.site.urls),
    path('api/', include('blogs.urls')), # এর ফলে ইউআরএলগুলো হবে: /api/services/, /api/courses/ ইত্যাদি
]

# মিডিয়া ফাইল (যেমন আপলোড করা ছবি) ব্রাউজারে শো করার জন্য এই কনফিগারেশন জরুরি
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)