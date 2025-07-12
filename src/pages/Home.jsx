// Home.jsx - Home page

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const featuredSkills = [
    { id: 1, name: 'Web Development', category: 'Programming', level: 'Advanced', user: 'alex_dev' },
    { id: 2, name: 'Graphic Design', category: 'Design', level: 'Intermediate', user: 'sarah_design' },
    { id: 3, name: 'Python Programming', category: 'Programming', level: 'Advanced', user: 'mike_python' },
    { id: 4, name: 'Digital Marketing', category: 'Marketing', level: 'Intermediate', user: 'jess_marketing' },
    { id: 5, name: 'Photography', category: 'Creative', level: 'Beginner', user: 'tom_photo' },
    { id: 6, name: 'Data Analysis', category: 'Analytics', level: 'Advanced', user: 'lisa_data' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Exchange Skills, 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                Grow Together
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-indigo-100 max-w-3xl mx-auto">
              Connect with people who have the skills you need and share your expertise in return. 
              Build meaningful relationships while learning and growing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register" 
                className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 py-3 rounded-lg font-semibold text-lg transition-colors shadow-lg"
              >
                Get Started
              </Link>
              <Link 
                to="/create_swap" 
                className="border-2 border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
              >
                Create Swap
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-indigo-600 mb-2">500+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-purple-600 mb-2">1,200+</div>
              <div className="text-gray-600">Skills Exchanged</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-pink-600 mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Skills */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Skills</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover popular skills available for exchange. Connect with experts and start learning today.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSkills.map((skill) => (
              <div key={skill.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">
                    {skill.category}
                  </span>
                  <span className="text-sm text-gray-500">{skill.level}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{skill.name}</h3>
                <p className="text-gray-600 mb-4">Available for exchange with @{skill.user}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">@{skill.user}</span>
                  <Link 
                    to="/create_swap" 
                    className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
                  >
                    Request Swap →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/create_swap" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Browse All Skills
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Getting started with SkillSwap is simple. Follow these three easy steps to begin exchanging skills.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Create Your Profile</h3>
              <p className="text-gray-600">Sign up and list the skills you can offer and what you want to learn.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Find Your Match</h3>
              <p className="text-gray-600">Browse available skills and connect with people who match your needs.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-pink-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Learning</h3>
              <p className="text-gray-600">Arrange your skill exchange and begin your learning journey together.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 