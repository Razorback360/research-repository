import React, { useState } from 'react';
import { HiXMark } from 'react-icons/hi2';

interface Permission {
  id: string;
  name: string;
  description: string;
}

const availablePermissions: Permission[] = [
  {
    id: 'submit',
    name: 'Submit Content',
    description: 'Can submit papers and datasets'
  },
  {
    id: 'comment',
    name: 'Comment',
    description: 'Can comment on submissions'
  },
  {
    id: 'review',
    name: 'Review',
    description: 'Can review submissions'
  },
  {
    id: 'moderate',
    name: 'Moderate',
    description: 'Can moderate comments and discussions'
  }
];

interface PermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

function PermissionModal({ isOpen, onClose, user }: PermissionModalProps) {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(
    user?.permissions || []
  );

  if (!isOpen || !user) return null;

  const handlePermissionChange = (permissionId: string) => {
    setSelectedPermissions(prev =>
      prev.includes(permissionId)
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle permission update here
    console.log('Updated permissions:', selectedPermissions);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            Manage Permissions for {user.name}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <HiXMark className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {availablePermissions.map((permission) => (
              <div key={permission.id} className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id={permission.id}
                    type="checkbox"
                    checked={selectedPermissions.includes(permission.id)}
                    onChange={() => handlePermissionChange(permission.id)}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor={permission.id} className="font-medium text-gray-700">
                    {permission.name}
                  </label>
                  <p className="text-gray-500">{permission.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue- 600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PermissionModal;