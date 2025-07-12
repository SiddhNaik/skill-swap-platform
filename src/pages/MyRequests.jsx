// MyRequests.jsx - View my swap requests page

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MyRequests = () => {
  const [activeTab, setActiveTab] = useState('sent');
  
  const sentRequests = [
    {
      id: 1,
      receiver: 'alex_dev',
      skillOffered: 'Web Development',
      skillWanted: 'Graphic Design',
      status: 'pending',
      date: '2024-01-15',
      message: 'Hi Alex! I can help you with React and JavaScript. Would love to learn some design principles from you.'
    },
    {
      id: 2,
      receiver: 'sarah_design',
      skillOffered: 'Python Programming',
      skillWanted: 'UI/UX Design',
      status: 'accepted',
      date: '2024-01-10',
      message: 'Hey Sarah! I\'m a Python developer looking to learn design. Can teach you data analysis in return.'
    }
  ];

  const receivedRequests = [
    {
      id: 3,
      sender: 'mike_python',
      skillOffered: 'Data Analysis',
      skillWanted: 'Photography',
      status: 'pending',
      date: '2024-01-12',
      message: 'Hi! I can teach you data analysis with Python. Would love to learn photography basics from you.'
    },
    {
      id: 4,
      sender: 'jess_marketing',
      skillOffered: 'Digital Marketing',
      skillWanted: 'Web Development',
      status: 'accepted',
      date: '2024-01-08',
      message: 'Hello! I can help with marketing strategies. Looking to learn some web development skills.'
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', text: 'Pending' },
      accepted: { color: 'bg-green-100 text-green-800', text: 'Accepted' },
      rejected: { color: 'bg-red-100 text-red-800', text: 'Rejected' },
      completed: { color: 'bg-blue-100 text-blue-800', text: 'Completed' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.text}
      </span>
    );
  };

  const handleAction = (requestId, action) => {
    // TODO: Implement accept/reject logic
    console.log(`${action} request ${requestId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Swap Requests</h1>
          <p className="text-gray-600">
            Manage your skill exchange requests and track their status
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('sent')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'sent'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sent Requests ({sentRequests.length})
            </button>
            <button
              onClick={() => setActiveTab('received')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'received'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Received Requests ({receivedRequests.length})
            </button>
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-6">
          {activeTab === 'sent' ? (
            sentRequests.length > 0 ? (
              sentRequests.map((request) => (
                <div key={request.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          To @{request.receiver}
                        </h3>
                        {getStatusBadge(request.status)}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div className="bg-green-50 p-3 rounded-lg">
                          <p className="text-sm font-medium text-green-800">You offer:</p>
                          <p className="text-green-900">{request.skillOffered}</p>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-sm font-medium text-blue-800">You want:</p>
                          <p className="text-blue-900">{request.skillWanted}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{request.message}</p>
                      <p className="text-xs text-gray-500">Sent on {new Date(request.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    {request.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleAction(request.id, 'cancel')}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Cancel Request
                        </button>
                      </>
                    )}
                    {request.status === 'accepted' && (
                      <Link
                        to="/create_swap"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Schedule Session
                      </Link>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No sent requests yet</h3>
                <p className="text-gray-600 mb-4">Start by creating your first swap request</p>
                <Link
                  to="/create_swap"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Create Request
                </Link>
              </div>
            )
          ) : (
            receivedRequests.length > 0 ? (
              receivedRequests.map((request) => (
                <div key={request.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          From @{request.sender}
                        </h3>
                        {getStatusBadge(request.status)}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div className="bg-green-50 p-3 rounded-lg">
                          <p className="text-sm font-medium text-green-800">They offer:</p>
                          <p className="text-green-900">{request.skillOffered}</p>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-sm font-medium text-blue-800">They want:</p>
                          <p className="text-blue-900">{request.skillWanted}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{request.message}</p>
                      <p className="text-xs text-gray-500">Received on {new Date(request.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  {request.status === 'pending' && (
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleAction(request.id, 'accept')}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleAction(request.id, 'reject')}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Decline
                      </button>
                    </div>
                  )}
                  
                  {request.status === 'accepted' && (
                    <Link
                      to="/create_swap"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Schedule Session
                    </Link>
                  )}
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No received requests yet</h3>
                <p className="text-gray-600">When someone sends you a swap request, it will appear here</p>
              </div>
            )
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/create_swap"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white p-4 rounded-lg text-center transition-all duration-200"
            >
              <div className="text-lg font-medium mb-1">Create New Request</div>
              <div className="text-sm opacity-90">Send a swap request to someone</div>
            </Link>
            <Link
              to="/"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-4 rounded-lg text-center transition-colors"
            >
              <div className="text-lg font-medium mb-1">Browse Skills</div>
              <div className="text-sm">Find people to swap skills with</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRequests; 