from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Skill(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class SkillResource(models.Model):
    RESOURCE_TYPES = [
        ('tutorial', 'Tutorial'),
        ('course', 'Course'),
        ('documentation', 'Documentation'),
        ('video', 'Video'),
        ('book', 'Book'),
        ('article', 'Article'),
        ('tool', 'Tool'),
        ('other', 'Other'),
    ]
    
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE, related_name='resources')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    url = models.URLField()
    resource_type = models.CharField(max_length=20, choices=RESOURCE_TYPES, default='tutorial')
    added_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='shared_resources', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_free = models.BooleanField(default=True)
    difficulty_level = models.CharField(max_length=20, choices=[
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced')
    ], default='beginner')
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)
    total_ratings = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.skill.name} - {self.title}"

    class Meta:
        ordering = ['-created_at']

class ResourceRating(models.Model):
    resource = models.ForeignKey(SkillResource, on_delete=models.CASCADE, related_name='ratings')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['resource', 'user']
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} rated {self.resource.title} - {self.rating}/5"

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    profile_pic = models.ImageField(upload_to='profiles/', blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    github = models.URLField(blank=True, null=True)
    skills = models.ManyToManyField(Skill, blank=True)

    def __str__(self):
        return self.user.username

class SwapRequest(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_requests')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_requests')
    skill_offered = models.ForeignKey(Skill, on_delete=models.CASCADE, related_name='offers')
    skill_requested = models.ForeignKey(Skill, on_delete=models.CASCADE, related_name='requests')
    message = models.TextField()
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('accepted', 'Accepted'), ('rejected', 'Rejected')], default='pending')

    def __str__(self):
        return f"{self.sender.username} ➝ {self.receiver.username}"

class ResourceShare(models.Model):
    resource = models.ForeignKey(SkillResource, on_delete=models.CASCADE, related_name='shares')
    from_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='resources_shared')
    to_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='resources_received')
    message = models.TextField(blank=True)
    shared_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-shared_at']
    
    def __str__(self):
        return f"{self.from_user.username} shared {self.resource.title} with {self.to_user.username}"

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)

