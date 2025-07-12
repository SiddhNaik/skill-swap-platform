from django.shortcuts import render, redirect
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from .models import Skill, SwapRequest, SkillResource, UserProfile
from .forms import RegisterForm, SwapRequestForm, UserProfileForm, SkillResourceForm


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
def add_resource(request):
    if request.method == 'POST':
        form = SkillResourceForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('home')
    else:
        form = SkillResourceForm()
    return render(request, 'swap/add_resource.html', {'form': form})