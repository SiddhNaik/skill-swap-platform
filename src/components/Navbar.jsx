import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // TODO: Connect to auth state

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-indigo-600 font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold">SkillSwap</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-indigo-200 transition-colors">
              Home
            </Link>
            <Link to="/create_swap" className="hover:text-indigo-200 transition-colors">
              Create Swap
            </Link>
            <Link to="/my_requests" className="hover:text-indigo-200 transition-colors">
              My Requests
            </Link>
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="hover:text-indigo-200 transition-colors">
                  Profile
                </Link>
                <button 
                  onClick={() => setIsLoggedIn(false)}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="hover:text-indigo-200 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-white text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-indigo-200 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-indigo-700 rounded-lg mt-2">
              <Link to="/" className="block px-3 py-2 hover:text-indigo-200 transition-colors">
                Home
              </Link>
              <Link to="/create_swap" className="block px-3 py-2 hover:text-indigo-200 transition-colors">
                Create Swap
              </Link>
              <Link to="/my_requests" className="block px-3 py-2 hover:text-indigo-200 transition-colors">
                My Requests
              </Link>
              {isLoggedIn ? (
                <>
                  <Link to="/profile" className="block px-3 py-2 hover:text-indigo-200 transition-colors">
                    Profile
                  </Link>
                  <button 
                    onClick={() => setIsLoggedIn(false)}
                    className="block w-full text-left px-3 py-2 text-red-300 hover:text-red-200 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block px-3 py-2 hover:text-indigo-200 transition-colors">
                    Login
                  </Link>
                  <Link to="/register" className="block px-3 py-2 hover:text-indigo-200 transition-colors">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 