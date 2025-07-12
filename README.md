# 🚀 Skill Swap Platform

A beautiful Django-based platform for skill exchange and learning. Connect with others, share your expertise, and learn new skills through direct mentorship.

## ✨ Features

- **Modern UI**: Beautiful, responsive design with Bootstrap 5 and custom CSS
- **User Authentication**: Secure registration and login system
- **Skill Management**: Add and manage your skills profile
- **Swap Requests**: Create and manage skill exchange requests
- **Real-time Status**: Track the status of your swap requests
- **Profile Management**: Complete user profiles with social links
- **Resource Sharing**: Share helpful learning resources

## 🎨 Design Highlights

- **Glassmorphism Effects**: Modern glass-like UI elements
- **Gradient Backgrounds**: Beautiful purple/indigo gradients
- **Responsive Design**: Works perfectly on all devices
- **Smooth Animations**: Hover effects and transitions
- **Font Awesome Icons**: Professional iconography
- **Google Fonts**: Clean, modern typography

## 🛠️ Technology Stack

- **Backend**: Django 5.2.4
- **Frontend**: Bootstrap 5, Custom CSS
- **Database**: SQLite (development)
- **Icons**: Font Awesome 6.4.0
- **Fonts**: Google Fonts (Inter)

## 📋 Prerequisites

- Python 3.8+
- pip (Python package installer)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/skillswap.git
   cd skillswap
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Create a superuser (optional)**
   ```bash
   python manage.py createsuperuser
   ```

6. **Start the development server**
   ```bash
   python manage.py runserver
   ```

7. **Visit the application**
   - Main site: http://127.0.0.1:8000/
   - Admin panel: http://127.0.0.1:8000/admin/

## 📁 Project Structure

```
skillswap/
├── skillswap/          # Django project settings
├── swap/              # Main application
│   ├── models.py      # Database models
│   ├── views.py       # View functions
│   ├── forms.py       # Form classes
│   └── admin.py       # Admin configuration
├── templates/         # HTML templates
│   ├── base.html      # Base template
│   ├── swap/          # App-specific templates
│   └── registration/  # Auth templates
├── static/           # Static files (CSS, JS, images)
├── media/           # User-uploaded files
├── requirements.txt  # Python dependencies
└── manage.py        # Django management script
```

## 🎯 Key Features

### User Authentication
- Secure registration and login
- Password validation
- User profile creation

### Skill Management
- Add skills to your profile
- Browse available skills
- Skill-based user matching

### Swap Requests
- Create skill exchange requests
- Send personalized messages
- Track request status (Pending/Accepted/Rejected)

### Profile Management
- Edit bio and personal information
- Add social media links (LinkedIn, GitHub)
- Upload profile pictures

## 🎨 UI Components

### Home Page
- Hero section with call-to-action
- Available skills display
- Recent activity for logged-in users
- Features showcase

### Forms
- Bootstrap-styled form fields
- Real-time validation
- User-friendly error messages
- Responsive design

### Navigation
- Collapsible mobile navigation
- User dropdown menu
- Active state indicators

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the project root:
```env
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

### Database
The project uses SQLite by default. For production, consider using PostgreSQL:
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'skillswap_db',
        'USER': 'your_username',
        'PASSWORD': 'your_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

## 🚀 Deployment

### Heroku
1. Install Heroku CLI
2. Create a `Procfile`:
   ```
   web: gunicorn skillswap.wsgi
   ```
3. Add `gunicorn` to requirements.txt
4. Deploy using Heroku CLI

### Railway
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

### Vercel
1. Install Vercel CLI
2. Configure for Django
3. Deploy with `vercel --prod`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Django Documentation
- Bootstrap Team
- Font Awesome
- Google Fonts

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Made with ❤️ using Django and Bootstrap** 