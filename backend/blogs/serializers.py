from rest_framework import serializers
from .models import  BlogPost, Booking, Course, InstituteCourse, Service, Testimonial, FreeConsultationRequest, Comment

# serializers.py ফাইলে PersonalServiceSerializer টি এভাবে পরিবর্তন করুন:

class PersonalServiceSerializer(serializers.ModelSerializer):
    # ৫টি ট্যাবের জন্য কাস্টম মেথড ফিল্ড তৈরি করা হলো
    included_services = serializers.SerializerMethodField()
    what_we_do = serializers.SerializerMethodField()
    working_process = serializers.SerializerMethodField()
    who_is_for = serializers.SerializerMethodField()
    why_choose_me = serializers.SerializerMethodField()

    class Meta:
        model = Service
        fields = [
            'id', 'name', 'service_type', 'service_overview', 'image', 
            'description', 'created_at', 'updated_at',
            'included_services', 'what_we_do', 'working_process', 'who_is_for', 'why_choose_me'
        ]

    def get_tab_content(self, obj, tab_type):
        # ServiceTabItem থেকে নির্দিষ্ট টাইপের কন্টেন্ট (JSONField) খুঁজে বের করার হেল্পার
        tab_item = obj.tab_items.filter(tab_type=tab_type).first()
        return tab_item.content if tab_item else []

    def get_included_services(self, obj):
        return self.get_tab_content(obj, 'included_services')

    def get_what_we_do(self, obj):
        return self.get_tab_content(obj, 'what_we_do')

    def get_working_process(self, obj):
        return self.get_tab_content(obj, 'working_process')

    def get_who_is_for(self, obj):
        # ডাটাবেজের 'who_is_service_for' এর সাথে ফ্রন্টএন্ড কন্টেন্ট ম্যাপিং
        return self.get_tab_content(obj, 'who_is_service_for')

    def get_why_choose_me(self, obj):
        # ডাটাবেজের 'why_choose_us' এর সাথে ফ্রন্টএন্ড কন্টেন্ট ম্যাপিং
        return self.get_tab_content(obj, 'why_choose_us')

class InstituteCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstituteCourse
        fields = '__all__'



class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = '__all__'

class FreeConsultationRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FreeConsultationRequest
        fields = '__all__'


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        # ফ্রন্টঅ্যান্ড থেকে আমরা যে ৪টি ফিল্ড পাঠাচ্ছি এবং আইডি
        fields = ['id', 'name', 'email', 'whatsapp', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']  # আইডি এবং তৈরি হওয়ার সময় ফ্রন্টএন্ড থেকে পাঠানো যাবে না


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'  # 👈 জ্যাঙ্গো নিজেই আপনার সব JSONField-কে সরাসরি পারফেক্ট অ্যারে আকারে ফ্রন্টএন্ডে পাঠিয়ে দেবে!


class BlogPostSerializer(serializers.ModelSerializer):
    # মানুষের পড়ার উপযোগী ফরম্যাটে ডেট দেখানোর জন্য (ঐচ্ছিক)
    created_at_formatted = serializers.DateTimeField(source='created_at', format="%b %d, %Y", read_only=True)

    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'content', 'excerpt', 
            'image', 'category', 'read_time', 'created_at', 
            'created_at_formatted', 'updated_at', 'is_published'
        ]
        read_only_fields = ['id', 'slug', 'created_at', 'updated_at']


class CommentSerializer(serializers.ModelSerializer):
    replies = serializers.SerializerMethodField()
    name = serializers.CharField(required=False, allow_blank=True, default="Anonymous")
    email = serializers.EmailField(required=False, allow_blank=True, allow_null=True, default="")

    class Meta:
        model = Comment
        fields = ['id', 'blog', 'parent', 'name', 'email', 'content', 'approved', 'created_at', 'replies']
        read_only_fields = ['blog', 'approved'] 

    def get_replies(self, obj):
        if obj.replies:
            approved_replies = obj.replies.filter(approved=True)
            return CommentSerializer(approved_replies, many=True).data
        return []