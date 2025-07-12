import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SwapCreate = () => {
  const [formData, setFormData] = useState({
    receiverUsername: '',
    skillYouOffer: '',
    skillYouWant: '',
    message: '',
    preferredTime: '',
    duration: '1'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.receiverUsername.trim()) {
      newErrors.receiverUsername = 'Receiver username is required';
    }

    if (!formData.skillYouOffer.trim()) {
      newErrors.skillYouOffer = 'Please specify what skill you can offer';
    }

    if (!formData.skillYouWant.trim()) {
      newErrors.skillYouWant = 'Please specify what skill you want to learn';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please add a message to your request';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      // TODO: Implement swap request submission
      console.log('Swap request:', formData);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        // TODO: Show success message and redirect
        alert('Swap request sent successfully!');
      }, 2000);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Swap Request</h1>
          <p className="text-gray-600">
            Connect with someone and exchange your skills for theirs
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Receiver Username */}
            <div>
              <label htmlFor="receiverUsername" className="block text-sm font-medium text-gray-700 mb-2">
                Who do you want to swap with? *
              </label>
              <input
                id="receiverUsername"
                name="receiverUsername"
                type="text"
                value={formData.receiverUsername}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.receiverUsername ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter username (e.g., @john_developer)"
              />
              {errors.receiverUsername && (
                <p className="mt-1 text-sm text-red-600">{errors.receiverUsername}</p>
              )}
            </div>

            {/* Skills Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="skillYouOffer" className="block text-sm font-medium text-gray-700 mb-2">
                  What can you offer? *
                </label>
                <input
                  id="skillYouOffer"
                  name="skillYouOffer"
                  type="text"
                  value={formData.skillYouOffer}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.skillYouOffer ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Web Development, Graphic Design"
                />
                {errors.skillYouOffer && (
                  <p className="mt-1 text-sm text-red-600">{errors.skillYouOffer}</p>
                )}
              </div>

              <div>
                <label htmlFor="skillYouWant" className="block text-sm font-medium text-gray-700 mb-2">
                  What do you want to learn? *
                </label>
                <input
                  id="skillYouWant"
                  name="skillYouWant"
                  type="text"
                  value={formData.skillYouWant}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.skillYouWant ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Python Programming, Photography"
                />
                {errors.skillYouWant && (
                  <p className="mt-1 text-sm text-red-600">{errors.skillYouWant}</p>
                )}
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message to the user *
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.message ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Introduce yourself and explain why you'd like to swap skills..."
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">{errors.message}</p>
              )}
            </div>

            {/* Preferences */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Time
                </label>
                <select
                  id="preferredTime"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select preferred time</option>
                  <option value="weekday-morning">Weekday Morning</option>
                  <option value="weekday-afternoon">Weekday Afternoon</option>
                  <option value="weekday-evening">Weekday Evening</option>
                  <option value="weekend-morning">Weekend Morning</option>
                  <option value="weekend-afternoon">Weekend Afternoon</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>

              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                  Session Duration (hours)
                </label>
                <select
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="1">1 hour</option>
                  <option value="2">2 hours</option>
                  <option value="3">3 hours</option>
                  <option value="4">4 hours</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-900 mb-2">💡 Tips for a successful swap:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Be specific about what you can teach and what you want to learn</li>
                <li>• Mention your experience level and learning goals</li>
                <li>• Suggest a specific time or be flexible</li>
                <li>• Be friendly and professional in your message</li>
              </ul>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending Request...
                  </span>
                ) : (
                  'Send Swap Request'
                )}
              </button>
              
              <Link
                to="/my_requests"
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors text-center"
              >
                View My Requests
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SwapCreate; 