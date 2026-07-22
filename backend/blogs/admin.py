
from django.contrib import admin
import json
# ২ নম্বর লাইন থেকে PortfolioService বাদ দেওয়া হয়েছে
from .models import BlogPost, Course, InstituteCourse, Service, ServiceTabItem, Testimonial, FreeConsultationRequest, Booking, Comment

class PersonalServiceTabItemInline(admin.StackedInline):
    model = ServiceTabItem
    extra = 1  # নতুন ট্যাব এন্ট্রি করার জন্য ফাঁকা ১টি বক্স সবসময় নিচে থাকবে

@admin.register(Service)
class PersonalServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'service_type', 'updated_at')
    search_fields = ('name', 'service_type')
    inlines = [PersonalServiceTabItemInline]

@admin.register(ServiceTabItem)
class PersonalServiceTabItemAdmin(admin.ModelAdmin):
    list_display = ('service', 'tab_type')
    list_filter = ('tab_type', 'service')

@admin.register(InstituteCourse)
class InstituteCourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'duration', 'created_at')

    search_fields = ('title',)



@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('name', 'testimonial_type', 'rating', 'created_at')
    list_filter = ('testimonial_type', 'rating')
    search_fields = ('name', 'designation')

@admin.register(FreeConsultationRequest)
class FreeConsultationRequestAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'is_contacted', 'created_at')
    list_filter = ('is_contacted', 'created_at')
    search_fields = ('name', 'email', 'phone')
    list_editable = ('is_contacted',)  # এডমিন প্যানেল থেকেই সরাসরি টিক দেওয়া যাবে



@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    # এডমিন প্যানেলের টেবিলে যে কলামগুলো দেখাবে
    list_display = ('name', 'email', 'whatsapp', 'created_at')
    
    # সার্চ বার দিয়ে যা যা সার্চ করা যাবে
    search_fields = ('name', 'email', 'whatsapp', 'message')
    
    # ডানপাশে ফিল্টারিং অপশন
    list_filter = ('created_at',)
    
    # ডেটাগুলো তৈরি হওয়ার সময় অনুযায়ী ক্রমানুসারে দেখাবে (নতুনগুলো ওপরে)
    ordering = ('-created_at',)


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'duration', 'version', 'instructor_name', 'created_at')
    search_fields = ('name', 'instructor_name')
    list_filter = ('version', 'duration')
    
    fieldsets = (
        ('📚 Course Core Information', {
            'fields': ('name', 'price', 'image', 'duration', 'version', 'course_overview')
        }),
        ('👨‍🏫 Instructor Profile', {
            'fields': ('instructor_name', 'designation', 'certification', 'instructor_bio'),
        }),
        ('⚙️ Course Content & Structure (JSON Fields)', {
            # 🎯 ফিক্সড: models.py এর সাথে মিল রেখে 'why_choose_us' বদলে 'why_choose_me' করা হলো
            'fields': ('what_you_will_learn', 'who_can_join', 'course_benefits', 'career_opportunities', 'why_choose_me'),
        }),
    )

    # 💡 নতুন কোর্স খোলার সময় প্রতিটি ঘরে পিওর জেসন স্ট্রাকচার বসানোর ফিক্সড লজিক
    def get_changeform_initial_data(self, request):
        initial = super().get_changeform_initial_data(request)
        
        # ১. হোয়াট ইউ উইল লার্ন
        initial['what_you_will_learn'] = json.dumps([
            {
                "category": "Computer Fundamentals",
                "topics": ["Operate a Personal Computer", "Basic Computer Management"]
            }
        ], ensure_ascii=False, indent=2)
        
        # ২. হু ক্যান জয়েন
        initial['who_can_join'] = json.dumps(["Students", "Job Seekers"], ensure_ascii=False, indent=2)
        
        # ৩. কোর্স বেনিফিটস
        initial['course_benefits'] = json.dumps(["Offline Practical Classes", "Real Project Practice"], ensure_ascii=False, indent=2)
        
        # ৪. ক্যারিয়ার অপরচুনিটি
        initial['career_opportunities'] = json.dumps(["Computer Operator", "Office Executive"], ensure_ascii=False, indent=2)
        
        # ৫. হোয়াই চুজ মি (FIXED ফিল্ড নেম)
        initial['why_choose_me'] = json.dumps([
            {
                "title": "Industry Focused Training",
                "description": "বর্তমান Industry Requirement অনুযায়ী Practical Skill Development করানো হয়।"
            }
        ], ensure_ascii=False, indent=2)
        
        return initial
    

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    # অ্যাডমিন প্যানেলে কলাম আকারে যা যা দেখাবে
    list_display = ('title', 'category', 'read_time', 'is_published', 'created_at')
    
    # ডানপাশে ফিল্টার অপশন
    list_filter = ('is_published', 'category', 'created_at')
    
    # সার্চ বার
    search_fields = ('title', 'content', 'excerpt')
    
    # টাইটেল লিখলে স্লাগ অটো জেনারেট হওয়ার ম্যাজিক ফিল্ড
    prepopulated_fields = {'slug': ('title',)}
    
    # অ্যাডমিন টেবিল থেকেই সরাসরি এডিট করার সুবিধা
    list_editable = ('is_published', 'category')


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    # অ্যাডমিন লিস্টে যা যা দেখাবে
    list_display = ('name', 'blog', 'approved', 'created_at', 'parent')
    list_filter = ('approved', 'created_at')
    search_fields = ('name', 'email', 'content')
    
    # ⚡ এক ক্লিকে অনেকগুলো কমেন্ট অ্যাপ্রুভ করার কাস্টম অ্যাকশন
    actions = ['approve_comments']

    def approve_comments(self, request, queryset):
        queryset.update(approved=True)
    approve_comments.short_description = "নির্বাচিত কমেন্টগুলো Approve করুন"