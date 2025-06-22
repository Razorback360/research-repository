import React, { useEffect, useState } from 'react';
import { HiMagnifyingGlass, HiNoSymbol, HiCog6Tooth, HiOutlineCheckCircle  } from 'react-icons/hi2';
import PermissionModal from './PermissionModal';
import { User } from '@interfaces/index';
import { appFetcher } from '@app/utils/fetcher';
import { permissionMapping } from '@app/utils/mappings';


function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [permissionModalOpen, setPermissionModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [users, setUsers] = useState<User[]>([]);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const req = await appFetcher.get("/api/user");
        setUsers(req.data);
      } catch (err) {
        console.error(err);
      }
    };
    getUsers();
  }, [trigger]);

  const handlePermissions = (user: User) => {
    setSelectedUser(user);
    setPermissionModalOpen(true);
  };

  const handleBan = async (user: User) => {
    // Ban or unban the user
    console.log(`Banning user: ${user.name}`);
    await appFetcher.put(`/api/user/ban?id=${user.id}`, {
      action: user.bannedAt ? "unban" : "ban",
    });
    setTrigger(!trigger);
  }

  const update = () => setTrigger(!trigger);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='flex items-center flex-col'>
      {/* Search Bar */}
      <div className="relative w-full mt-2">
        <div className="absolute inset-y-0 left-0 ps-3 flex items-center pointer-events-none">
          <HiMagnifyingGlass className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full ps-10 pe-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-hidden focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Users List */}
      <div className="mt-6">
        <div className="bg-white shadow-sm overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <li key={user.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        {user.name}
                      </p>
                      <div className="ml-2 shrink-0">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.bannedAt ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {user.bannedAt ? `Banned since ${user.bannedAt}` : 'Active'}
                        </span>
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{user.email}</p>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Permissions: {Object.entries(user.permissions).map(([key, value]) => {
                          if(key !== 'id' && key !== 'userId')
                          return value ? `${permissionMapping[key as keyof typeof permissionMapping].name}` : '';
                        }).filter((permission) => permission !== '').join(", ")}
                      </p>
                    </div>
                  </div>
                  <div className="ml-6 flex items-center space-x-3">
                    <button
                      onClick={() => handlePermissions(user)}
                      className="text-primary hover:text-blue-900"
                      title="Manage Permissions"
                    >
                      <HiCog6Tooth className="h-5 w-5" />
                    </button>
                    <button
                      className={`${
                        user.bannedAt ? 'text-green-600 hover:text-green-900' : 'text-red-600 hover:text-red-900'
                      }`}
                      title={user.bannedAt ? 'Unban User' : 'Ban User'}
                      onClick={() => handleBan(user)}
                    >
                      {user.bannedAt ? <HiOutlineCheckCircle className="h-5 w-5" /> : <HiNoSymbol className="h-5 w-5" />}
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
        update={() => update()}
      />
    </div>
  );
}

export default UserManagement;