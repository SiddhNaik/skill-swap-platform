from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from .models import Skill, SwapRequest, SkillResource, UserProfile, ResourceRating, ResourceShare
from .forms import RegisterForm, SwapRequestForm, UserProfileForm, SkillResourceForm, SkillForm, ResourceRatingForm, ResourceShareForm
from django.contrib import messages
from django.db import models


def home(request):
    skills = Skill.objects.all()
    return render(request, 'swap/home.html', {'skills': skills})

def register(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            UserProfile.objects.create(user=user)
            login(request, user)
            return redirect('home')
    else:
        form = RegisterForm()
    return render(request, 'registration/register.html', {'form': form})

@login_required
def create_swap_request(request):
    if request.method == 'POST':
        form = SwapRequestForm(request.POST)
        if form.is_valid():
            swap_request = form.save(commit=False)
            swap_request.sender = request.user
            swap_request.save()
            return redirect('home')
    else:
        form = SwapRequestForm()
    return render(request, 'swap/create_swap.html', {'form': form})

@login_required
def my_requests(request):
    sent = request.user.sent_requests.all()
    received = request.user.received_requests.all()
    return render(request, 'swap/my_requests.html', {'sent': sent, 'received': received})

@login_required
def edit_profile(request):
    profile = request.user.userprofile
    if request.method == 'POST':
        form = UserProfileForm(request.POST, request.FILES, instance=profile)
        if form.is_valid():
            form.save()
            return redirect('home')
    else:
        form = UserProfileForm(instance=profile)
    return render(request, 'swap/edit_profile.html', {'form': form})

@login_required
def browse_resources(request):
    skills = Skill.objects.all()
    selected_skill = request.GET.get('skill')
    resource_type = request.GET.get('type')
    difficulty = request.GET.get('difficulty')
    search_query = request.GET.get('search')
    
    resources = SkillResource.objects.all()
    
    if selected_skill:
        resources = resources.filter(skill_id=selected_skill)
    if resource_type:
        resources = resources.filter(resource_type=resource_type)
    if difficulty:
        resources = resources.filter(difficulty_level=difficulty)
    if search_query:
        resources = resources.filter(
            models.Q(title__icontains=search_query) |
            models.Q(description__icontains=search_query) |
            models.Q(skill__name__icontains=search_query)
        )
    
    context = {
        'resources': resources,
        'skills': skills,
        'selected_skill': selected_skill,
        'selected_type': resource_type,
        'selected_difficulty': difficulty,
        'search_query': search_query,
        'resource_types': SkillResource.RESOURCE_TYPES,
        'difficulty_levels': [
            ('beginner', 'Beginner'),
            ('intermediate', 'Intermediate'),
            ('advanced', 'Advanced')
        ]
    }
    return render(request, 'swap/browse_resources.html', context)

@login_required
def add_resource(request):
    if request.method == 'POST':
        form = SkillResourceForm(request.POST)
        if form.is_valid():
            resource = form.save(commit=False)
            resource.added_by = request.user
            resource.save()
            messages.success(request, f'Resource "{resource.title}" added successfully!')
            return redirect('browse_resources')
    else:
        form = SkillResourceForm()
    return render(request, 'swap/add_resource.html', {'form': form})

@login_required
def rate_resource(request, resource_id):
    resource = get_object_or_404(SkillResource, id=resource_id)
    
    if request.method == 'POST':
        form = ResourceRatingForm(request.POST)
        if form.is_valid():
            rating, created = ResourceRating.objects.get_or_create(
                resource=resource,
                user=request.user,
                defaults=form.cleaned_data
            )
            if not created:
                rating.rating = form.cleaned_data['rating']
                rating.comment = form.cleaned_data['comment']
                rating.save()
            
            # Update resource rating
            ratings = resource.ratings.all()
            if ratings:
                avg_rating = sum(r.rating for r in ratings) / len(ratings)
                resource.rating = round(avg_rating, 2)
                resource.total_ratings = len(ratings)
                resource.save()
            
            messages.success(request, 'Thank you for your rating!')
            return redirect('browse_resources')
    else:
        form = ResourceRatingForm()
    
    return render(request, 'swap/rate_resource.html', {'form': form, 'resource': resource})

@login_required
def resource_detail(request, resource_id):
    resource = get_object_or_404(SkillResource, id=resource_id)
    user_rating = None
    if request.user.is_authenticated:
        user_rating = ResourceRating.objects.filter(resource=resource, user=request.user).first()
    
    context = {
        'resource': resource,
        'user_rating': user_rating,
        'ratings': resource.ratings.all()[:5]  # Show last 5 ratings
    }
    return render(request, 'swap/resource_detail.html', context)

@login_required
def add_skill(request):
    if request.method == 'POST':
        form = SkillForm(request.POST)
        if form.is_valid():
            name = form.cleaned_data['name'].strip()
            if Skill.objects.filter(name__iexact=name).exists():
                messages.error(request, f'Skill "{name}" already exists!')
            else:
                form.save()
                messages.success(request, f'Skill "{name}" added successfully!')
                return redirect('add_skill')
    else:
        form = SkillForm()
    return render(request, 'swap/add_skill.html', {'form': form})

@login_required
def share_resource(request, resource_id):
    resource = get_object_or_404(SkillResource, id=resource_id)
    if request.method == 'POST':
        form = ResourceShareForm(request.POST, user=request.user)
        if form.is_valid():
            share = form.save(commit=False)
            share.resource = resource
            share.from_user = request.user
            share.save()
            messages.success(request, f'Resource "{resource.title}" shared successfully!')
            return redirect('resource_detail', resource_id=resource.id)
    else:
        form = ResourceShareForm(user=request.user)
    return render(request, 'swap/share_resource.html', {'form': form, 'resource': resource})

@login_required
def shared_with_me(request):
    shared_resources = ResourceShare.objects.filter(to_user=request.user).select_related('resource', 'from_user')
    return render(request, 'swap/shared_with_me.html', {'shared_resources': shared_resources})