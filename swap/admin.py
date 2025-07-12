from django.contrib import admin
from .models import Skill, UserProfile, SwapRequest, SkillResource

admin.site.register(Skill)
admin.site.register(UserProfile)
admin.site.register(SwapRequest)
admin.site.register(SkillResource)
