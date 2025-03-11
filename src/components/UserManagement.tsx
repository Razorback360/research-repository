import React, { useState } from 'react';
import { HiMagnifyingGlass, HiNoSymbol, HiCog6Tooth } from 'react-icons/hi2';
import PermissionModal from './PermissionModal';

interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'banned';
  banDate?: string;
  permissions: string[];
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@research.edu',
    status: 'active',
    permissions: ['submit', 'comment']
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@research.edu',
    status: 'banned',
    banDate: '2024/02/15',
    permissions: ['submit']
  },
  // Add more mock users as needed
];

function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [permissionModalOpen, setPermissionModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handlePermissions = (user: User) => {
    setSelectedUser(user);
    setPermissionModalOpen(true);
  };

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <HiMagnifyingGlass className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Users List */}
      <div className="mt-6">
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <li key={user.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        {user.name}
                      </p>
                      <div className="ml-2 flex-shrink-0">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.status === 'active' ? 'Active' : `Banned since ${user.banDate}`}
                        </span>
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{user.email}</p>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Permissions: {user.permissions.join(', ')}
                      </p>
                    </div>
                  </div>
                  <div className="ml-6 flex items-center space-x-3">
                    <button
                      onClick={() => handlePermissions(user)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Manage Permissions"
                    >
                      <HiCog6Tooth className="h-5 w-5" />
                    </button>
                    <button
                      className={`${
                        user.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'
                      }`}
                      title={user.status === 'active' ? 'Ban User' : 'Unban User'}
                    >
                      <HiNoSymbol className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Permission Modal */}
      <PermissionModal
        isOpen={permissionModalOpen}
        onClose={() => setPermissionModalOpen(false)}
        user={selectedUser}
      />
    </div>
  );
}

export default UserManagement;