import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../common/Avatar';
import { X, Check } from 'lucide-react';

interface UserSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserSwitcherModal: React.FC<UserSwitcherModalProps> = ({ isOpen, onClose }) => {
  const { users, currentUser, switchUser } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div
        className="bg-white dark:bg-[#242526] w-full max-w-md rounded-2xl shadow-fb-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
              Switch Profiles
            </h3>
            <p className="text-xs text-gray-500">
              Select any profile to test posting, reacting, and messaging as them!
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#3A3B3C] hover:bg-gray-200 text-gray-600 dark:text-gray-300 flex items-center justify-center"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-3 space-y-1.5 max-h-96 overflow-y-auto">
          {users.map(user => {
            const isCurrent = user.id === currentUser.id;
            return (
              <div
                key={user.id}
                onClick={() => {
                  switchUser(user.id);
                  onClose();
                }}
                className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                  isCurrent
                    ? 'bg-blue-50 dark:bg-fb-blue/20 border border-fb-blue/30'
                    : 'hover:bg-gray-100 dark:hover:bg-[#3A3B3C]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Avatar src={user.avatar} alt={user.name} size="md" online={user.online} />
                  <div>
                    <div className="font-semibold text-sm text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
                      <span>{user.name}</span>
                      {user.id === 'user_1' && (
                        <span className="w-3.5 h-3.5 bg-fb-blue text-white rounded-full flex items-center justify-center text-[8px]">
                          ✓
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      @{user.username} • {user.work?.split(' at ')[0] || 'User'}
                    </div>
                  </div>
                </div>

                {isCurrent && (
                  <span className="w-6 h-6 rounded-full bg-fb-blue text-white flex items-center justify-center">
                    <Check size={14} />
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
