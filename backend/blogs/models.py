from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.text import slugify

# ==========================================
# ১. SERVICES & COURSES MANAGEMENT (সার্ভিস এবং কোর্স)
# ==========================================

class Service(models.Model):
    name = models.CharField(max_length=255, help_text="e.g., Complete Business Growth Solution")
    service_type = models.CharField(max_length=100, blank=True, null=True, help_text="e.g., Premium Consultation Blueprint")
    service_overview = models.TextField(blank=True, null=True, help_text="আমার এই সার্ভিসের মূল উদ্দেশ্য বা সংক্ষিপ্ত বিবরণ")
    image = models.ImageField(upload_to="service_images/", blank=True, null=True)
    description = models.TextField(blank=True, null=True, help_text="সার্ভিসের ধরন (যেমন: Customized Solution Only)")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


@receiver(post_save, sender=Service)
def create_default_service_tabs(sender, instance, created, **kwargs):
    """
    যখনই কোনো নতুন ব্যক্তিগত বা ফ্রিল্যান্সিং সার্ভিস তৈরি হবে, 
    স্বয়ংক্রিয়ভাবে তার আন্ডারে 'what_we_do' এবং 'who_is_service_for' তৈরি হয়ে যাবে।
    """
    if created:
        # ব্যক্তিগত কাজের উপযোগী 'What I Do' স্ট্রাকচার (গ্রিড ফরম্যাট)
        default_what_we_do = [
            {
                "title": "Digital Strategy & Execution",
                "icon": "🎯",
                "items": ["Competitor Mapping", "Conversion Architecture", "Funnel Planning"]
            }
        ]
        
        # আপনার ক্লায়েন্ট কারা হবে তাদের ডিফল্ট লিস্ট
        default_who_for = [
            "Solo Entrepreneurs", "E-commerce Store Owners", "Local Business Operators", "Personal Brands"
        ]

        # ডাটাবেজে ট্যাব দুটি অটো-জেনারেট করা হচ্ছে
        ServiceTabItem.objects.get_or_create(
            service=instance,
            tab_type='what_we_do',
            defaults={'content': default_what_we_do}
        )
        
        ServiceTabItem.objects.get_or_create(
            service=instance,
            tab_type='who_is_service_for',
            defaults={'content': default_who_for}
        )


class ServiceTabItem(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name="tab_items", verbose_name="Select Service")
    
    # কোম্পানির জায়গায় ব্যক্তিগত কাজের টোন দেওয়ার জন্য লেবেলগুলো পরিবর্তন করা হয়েছে
    TAB_TYPE_CHOICES = [
        ('included_services', 'Included Services'),
        ('what_we_do', 'What I Do / Core Expertise'),
        ('working_process', 'My Strategic Working Process'),
        ('who_is_service_for', 'Who is this Service For'),
        ('why_choose_us', 'Why Choose Me'),
    ]
    tab_type = models.CharField(max_length=50, choices=TAB_TYPE_CHOICES, verbose_name="Tab Type")
    content = models.JSONField(verbose_name="Content (JSON)")

    def __str__(self):
        return f"{self.service.name} - {self.get_tab_type_display()}"


class InstituteCourse(models.Model):
    """
    Saptak-এর 'Drive to Traffic' ইনস্টিটিউটের আইটি ট্রেনিং কোর্সসমূহ
    """
    title = models.CharField(max_length=255, verbose_name="Course Title")
    thumbnail = models.ImageField(upload_to="courses/")
    price = models.IntegerField(blank=True, null=True, verbose_name="Course Fee")
    duration = models.CharField(max_length=100, help_text="e.g., 3 Months", blank=True, null=True)
    total_lectures = models.IntegerField(default=24, blank=True, null=True)
    
    # কোর্স ডেসক্রিপশন এবং মডিউল (JSON দিয়ে ডাইনামিক করা হয়েছে)
    what_you_will_learn = models.JSONField(help_text="লিস্ট আকারে লিখুন, যেমন: ['SEO Basic', 'Keyword Research']", blank=True, null=True)
    course_benefits = models.JSONField(help_text="লিস্ট আকারে লিখুন", blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"[Training Course] {self.title}"




# ==========================================
# ৩. TESTIMONIALS & CERTIFICATES (সার্টিফিকেট এবং এক্সপেরিয়েন্স)
# ==========================================

class Testimonial(models.Model):
    """
    টেস্টিমোনিয়াল সেকশন যেখানে স্টুডেন্টদের সার্টিফিকেট এবং ক্লায়েন্টদের এক্সপেরিয়েন্স লেটার আপলোড করা যাবে
    """
    TYPE_CHOICES = [
        ('certificate', 'Student Certificate'),
        ('experience', 'Client Experience Certificate'),
    ]

    name = models.CharField(max_length=150, verbose_name="Student/Client Name")
    designation = models.CharField(max_length=150, blank=True, null=True, help_text="যেমন: Student of Batch 5 বা CEO of TechCorp")
    testimonial_type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    comment = models.TextField(help_text="তারা Saptak বা Drive to Traffic সম্পর্কে কি বলেছেন")
    document_image = models.ImageField(upload_to="testimonials/", blank=True, null=True, help_text="সার্টিফিকেট বা এক্সপেরিয়েন্স লেটারের ছবি")
    rating = models.IntegerField(default=5, help_text="১ থেকে ৫ এর মধ্যে রেটিং")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"[{self.get_testimonial_type_display()}] {self.name}"


# ==========================================
# ৪. FREE CONSULTATION & LEAD GENERATION (ফ্রি কনসালটেশন)
# ==========================================

class FreeConsultationRequest(models.Model):
    """
    হিরো সেকশন এবং হেডারের 'Start Free Consultation' ফর্মের ডাটা সেভ করার জন্য
    """
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    business_or_topic = models.CharField(max_length=255, blank=True, null=True, help_text="তিনি কি শিখতে চান নাকি বিজনেস গ্রোথ সার্ভিস চান")
    message = models.TextField()
    is_contacted = models.BooleanField(default=False, verbose_name="Mark as Contacted (Saptak checked this?)")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Consultation Request from {self.name} ({self.created_at.strftime('%d-%b-%Y')})"
    

class Booking(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    whatsapp = models.CharField(max_length=20) # নতুন হোয়াটসঅ্যাপ ফিল্ড
    service = models.CharField(max_length=255)
    message = models.TextField() # সার্ভিস ডেসক্রিপশন
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.service}"



class Course(models.Model):
    name = models.CharField(max_length=255, verbose_name="Course Name")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Course Price")
    
    # Instructor Info
    instructor_name = models.CharField(max_length=255, verbose_name="Instructor Name")
    designation = models.CharField(max_length=255, verbose_name="Designation")
    instructor_bio = models.TextField(verbose_name="Instructor Bio")
    certification = models.CharField(max_length=255, verbose_name="Certification")
    
    # Course Meta
    duration = models.CharField(max_length=100, verbose_name="Duration (e.g., 4 Months / 48 Hours)")
    version = models.CharField(max_length=50, verbose_name="Version (e.g., Offline/Online)")
    image = models.ImageField(upload_to='course_images/', blank=True, null=True, verbose_name="Course Thumbnail")
    course_overview = models.TextField(verbose_name="Course Overview")
    
    # ⚙️ আপনার ইচ্ছা অনুযায়ী এগুলোকে JSONField করে দেওয়া হলো
    what_you_will_learn = models.JSONField(
        default=list, 
        help_text="Format: [{'category': '...', 'topics': ['...', '...']}]",
        verbose_name="What You Will Learn"
    )
    who_can_join = models.JSONField(
        default=list, 
        help_text="Format: ['Student', 'Job Seeker']",
        verbose_name="Who Can Join"
    )
    course_benefits = models.JSONField(
        default=list, 
        help_text="Format: ['Benefit 1', 'Benefit 2']",
        verbose_name="Course Benefits"
    )
    career_opportunities = models.JSONField(
        default=list, 
        help_text="Format: ['Opportunity 1', 'Opportunity 2']",
        verbose_name="Career Opportunities"
    )
    
    why_choose_me = models.JSONField(
        default=list, 
        help_text="Format: [{'title': '...', 'description': '...'}]",
        verbose_name="Why Choose Me"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class BlogPost(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    content = models.TextField()
    excerpt = models.CharField(max_length=500, blank=True)
    image = models.ImageField(upload_to='blog_images/', blank=True, null=True)
    category = models.CharField(max_length=100, default='Tech')
    read_time = models.IntegerField(default=5)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
    
class Comment(models.Model):
    # 🎯 এখানে Blog এর বদলে BlogPost ব্যবহার করা হয়েছে
    blog = models.ForeignKey(BlogPost, on_delete=models.CASCADE, related_name='comments')
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='replies')
    
    # 🎯 নাম ও ইমেইল ছাড়া সাবমিট করার জন্য ঐচ্ছিক করা হলো
    name = models.CharField(max_length=100, null=True, blank=True, default="Anonymous")
    email = models.EmailField(null=True, blank=True)
    content = models.TextField()
    
    approved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f"Comment on {self.blog.title}"