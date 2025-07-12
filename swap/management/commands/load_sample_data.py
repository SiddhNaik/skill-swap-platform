from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from swap.models import Skill, UserProfile, SkillResource, ResourceShare
from django.contrib.auth.hashers import make_password

class Command(BaseCommand):
    help = 'Load sample data for Skill Swap Platform'

    def handle(self, *args, **options):
        self.stdout.write('Loading sample data...')
        
        # Create skills
        skills_data = [
            'Python', 'JavaScript', 'React', 'Django', 'Node.js', 
            'SQL', 'MongoDB', 'AWS', 'Docker', 'Git',
            'Machine Learning', 'Data Analysis', 'UI/UX Design',
            'Mobile Development', 'DevOps', 'Cybersecurity'
        ]
        
        skills = []
        for skill_name in skills_data:
            skill, created = Skill.objects.get_or_create(name=skill_name)
            skills.append(skill)
            if created:
                self.stdout.write(f'Created skill: {skill_name}')
        
        # Create sample users
        users_data = [
            {
                'username': 'alice_dev',
                'email': 'alice@example.com',
                'password': 'password123',
                'bio': 'Full-stack developer with 5 years of experience in React and Node.js',
                'skills': ['JavaScript', 'React', 'Node.js', 'MongoDB']
            },
            {
                'username': 'bob_python',
                'email': 'bob@example.com',
                'password': 'password123',
                'bio': 'Python developer specializing in Django and data analysis',
                'skills': ['Python', 'Django', 'SQL', 'Data Analysis']
            },
            {
                'username': 'carol_design',
                'email': 'carol@example.com',
                'password': 'password123',
                'bio': 'UI/UX designer with expertise in modern web design',
                'skills': ['UI/UX Design', 'JavaScript', 'React']
            },
            {
                'username': 'dave_devops',
                'email': 'dave@example.com',
                'password': 'password123',
                'bio': 'DevOps engineer with cloud and containerization experience',
                'skills': ['AWS', 'Docker', 'DevOps', 'Git']
            }
        ]
        
        users = []
        for user_data in users_data:
            user, created = User.objects.get_or_create(
                username=user_data['username'],
                defaults={
                    'email': user_data['email'],
                    'password': make_password(user_data['password']),
                    'first_name': user_data['username'].split('_')[0].title(),
                    'last_name': user_data['username'].split('_')[1].title()
                }
            )
            
            if created:
                # Create user profile
                profile = UserProfile.objects.get(user=user)
                profile.bio = user_data['bio']
                profile.linkedin = f"https://linkedin.com/in/{user_data['username']}"
                profile.github = f"https://github.com/{user_data['username']}"
                
                # Add skills to profile
                for skill_name in user_data['skills']:
                    skill = Skill.objects.get(name=skill_name)
                    profile.skills.add(skill)
                
                profile.save()
                self.stdout.write(f'Created user: {user_data["username"]}')
                users.append(user)
        
        # Get or create admin user for resources
        admin_user = User.objects.first()
        if not admin_user:
            admin_user = User.objects.create_user(
                username='admin',
                email='admin@example.com',
                password='admin123'
            )

        # Create sample resources
        resources_data = [
            {
                'skill': 'Python',
                'title': 'Python for Beginners',
                'description': 'A comprehensive tutorial for Python beginners',
                'url': 'https://docs.python.org/3/tutorial/',
                'resource_type': 'tutorial',
                'is_free': True,
                'difficulty_level': 'beginner'
            },
            {
                'skill': 'JavaScript',
                'title': 'Modern JavaScript Tutorial',
                'description': 'Learn modern JavaScript ES6+ features',
                'url': 'https://javascript.info/',
                'resource_type': 'tutorial',
                'is_free': True,
                'difficulty_level': 'intermediate'
            },
            {
                'skill': 'React',
                'title': 'React Official Documentation',
                'description': 'Official React documentation and tutorials',
                'url': 'https://react.dev/',
                'resource_type': 'documentation',
                'is_free': True,
                'difficulty_level': 'intermediate'
            },
            {
                'skill': 'Django',
                'title': 'Django Girls Tutorial',
                'description': 'Learn Django web development',
                'url': 'https://tutorial.djangogirls.org/',
                'resource_type': 'tutorial',
                'is_free': True,
                'difficulty_level': 'beginner'
            },
            {
                'skill': 'Machine Learning',
                'title': 'Coursera ML Course',
                'description': 'Andrew Ng\'s Machine Learning course',
                'url': 'https://www.coursera.org/learn/machine-learning',
                'resource_type': 'course',
                'is_free': False,
                'difficulty_level': 'advanced'
            }
        ]
        
        resources = []
        for resource_data in resources_data:
            skill = Skill.objects.get(name=resource_data['skill'])
            resource, created = SkillResource.objects.get_or_create(
                title=resource_data['title'],
                defaults={
                    'skill': skill,
                    'description': resource_data['description'],
                    'url': resource_data['url'],
                    'resource_type': resource_data['resource_type'],
                    'is_free': resource_data['is_free'],
                    'difficulty_level': resource_data['difficulty_level'],
                    'added_by': admin_user
                }
            )
            if created:
                self.stdout.write(f'Created resource: {resource.title}')
                resources.append(resource)
        
        # Create sample resource shares
        if len(users) >= 2 and len(resources) >= 2:
            share1 = ResourceShare.objects.create(
                resource=resources[0],
                from_user=users[0],
                to_user=users[1],
                message="This is a great resource for learning Python!"
            )
            share2 = ResourceShare.objects.create(
                resource=resources[1],
                from_user=users[1],
                to_user=users[0],
                message="Check out this JavaScript tutorial!"
            )
            self.stdout.write(f'Created {ResourceShare.objects.count()} resource shares')
        
        self.stdout.write(self.style.SUCCESS('Sample data loaded successfully!'))
        self.stdout.write('You can now log in with any of these users:')
        for user_data in users_data:
            self.stdout.write(f'  Username: {user_data["username"]}, Password: {user_data["password"]}') 