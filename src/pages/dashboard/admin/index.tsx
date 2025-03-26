import React, { useState } from 'react';
import SubmissionManagement from '@app/components/SubmissionManagement';
import UserManagement from '@app/components/UserManagement';

function App() {
  const [activeTab, setActiveTab] = useState('submissions');

  return (
    <div className="min-h-screen bg-gray-50 w-full flex flex-col items-center">
      {/* Header */}
      <header className="bg-white shadow-sm w-full flex flex-row items-center">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <nav className="flex space-x-8">
              <button
                className={`${
                  activeTab === 'submissions'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
                onClick={() => setActiveTab('submissions')}
              >
                Submission Management
              </button>
              <button
                className={`${
                  activeTab === 'users'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
                onClick={() => setActiveTab('users')}
              >
                User Management
              </button>
            </nav>
          </div>
        </div>
      </header>
      {/* Content */}
      <main className='flex'>
        {activeTab === 'submissions' && <SubmissionManagement />}
        {activeTab === 'users' && <UserManagement />}
      </main>
    </div>
  );
}

export default App