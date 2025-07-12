from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import SwapRequest, UserProfile, SkillResource, Skill, ResourceRating, ResourceShare

class RegisterForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields.values():
            field.widget.attrs.update({'class': 'form-control'})

class SwapRequestForm(forms.ModelForm):
    class Meta:
        model = SwapRequest
        fields = ['receiver', 'skill_offered', 'skill_requested', 'message']
        widgets = {
            'message': forms.Textarea(attrs={'rows': 4}),
        }
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields.values():
            if isinstance(field.widget, forms.Select):
                field.widget.attrs.update({'class': 'form-select'})
            elif isinstance(field.widget, forms.Textarea):
                field.widget.attrs.update({'class': 'form-control'})
            else:
                field.widget.attrs.update({'class': 'form-control'})

class UserProfileForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ['bio', 'profile_pic', 'linkedin', 'github', 'skills']
        widgets = {
            'bio': forms.Textarea(attrs={'rows': 4}),
            'skills': forms.SelectMultiple(attrs={'size': 6}),
        }
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields.values():
            if isinstance(field.widget, forms.SelectMultiple):
                field.widget.attrs.update({'class': 'form-select'})
            elif isinstance(field.widget, forms.Textarea):
                field.widget.attrs.update({'class': 'form-control'})
            else:
                field.widget.attrs.update({'class': 'form-control'})

class SkillResourceForm(forms.ModelForm):
    class Meta:
        model = SkillResource
        fields = ['skill', 'title', 'description', 'url', 'resource_type', 'is_free', 'difficulty_level']
        widgets = {
            'description': forms.Textarea(attrs={'rows': 4, 'placeholder': 'Describe the resource...'}),
            'title': forms.TextInput(attrs={'placeholder': 'Enter resource title'}),
            'url': forms.URLInput(attrs={'placeholder': 'https://example.com'}),
        }
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields.values():
            if isinstance(field.widget, forms.Select):
                field.widget.attrs.update({'class': 'form-select'})
            elif isinstance(field.widget, forms.Textarea):
                field.widget.attrs.update({'class': 'form-control'})
            else:
                field.widget.attrs.update({'class': 'form-control'})

class ResourceRatingForm(forms.ModelForm):
    class Meta:
        model = ResourceRating
        fields = ['rating', 'comment']
        widgets = {
            'rating': forms.Select(attrs={'class': 'form-select'}),
            'comment': forms.Textarea(attrs={'rows': 3, 'placeholder': 'Share your thoughts about this resource...', 'class': 'form-control'}),
        }

class SkillForm(forms.ModelForm):
    class Meta:
        model = Skill
        fields = ['name']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter skill name'})
        }

class ResourceShareForm(forms.ModelForm):
    to_user = forms.ModelChoiceField(queryset=User.objects.none(), label="Share with")
    message = forms.CharField(widget=forms.Textarea(attrs={'rows': 2, 'placeholder': 'Add a message (optional)'}), required=False)

    class Meta:
        model = ResourceShare
        fields = ['to_user', 'message']

    def __init__(self, *args, **kwargs):
        user = kwargs.pop('user', None)
        super().__init__(*args, **kwargs)
        if user:
            self.fields['to_user'].queryset = User.objects.exclude(id=user.id)
        else:
            self.fields['to_user'].queryset = User.objects.all()
        self.fields['to_user'].widget.attrs.update({'class': 'form-select'})
        self.fields['message'].widget.attrs.update({'class': 'form-control'})
