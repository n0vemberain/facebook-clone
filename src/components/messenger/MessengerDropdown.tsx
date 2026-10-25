import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useChat } from '../../context/ChatContext';
import { Avatar } from '../common/Avatar';
import { Search, MoreHorizontal, ExternalLink } from 'lucide-react';

interface MessengerDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenFullMessenger: () => void;
}

export const MessengerDropdown: React.FC<MessengerDropdownProps> = ({
  isOpen,
  onClose,
  onOpenFullMessenger,
}) => {
  const { users, currentUser } = useAuth();
  const { openChat, getMessages } = useChat();
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const friends = users.filter(u => u.id !== currentUser.id);
  const filteredFriends = friends.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="absolute right-0 top-full mt-2 w-88 sm:w-96 bg-white dark:bg-[#242526] rounded-2xl shadow-fb-lg border border-gray-200 dark:border-gray-700 py-3 z-50 animate-in fade-in zoom-in-95 duration-150"
      onClick={e => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pb-2">
        <h3 className="font-bold text-2xl text-gray-900 dark:text-gray-100">Chats</h3>
        <button
          type="button"
          onClick={onOpenFullMessenger}
          className="p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-full transition-colors"
          title="Open in full screen"
        >
          <ExternalLink size={18} />
        </button>
      </div>

      {/* Search Input */}
      <div className="px-4 py-1.5">
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-[#3A3B3C] rounded-full px-3 py-1.5 text-sm text-gray-500">
          <Search size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search Messenger"
            className="w-full bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none text-xs"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="mt-2 max-h-96 overflow-y-auto px-2 space-y-1">
        {filteredFriends.map(friend => {
          const msgs = getMessages(friend.id);
          const lastMsg = msgs[msgs.length - 1];

          return (
            <div
              key={friend.id}
              onClick={() => {
                openChat(friend.id);
                onClose();
              }}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-[#3A3B3C] cursor-pointer transition-colors"
            >
              <Avatar src={friend.avatar} alt={friend.name} size="lg" online={friend.online} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-gray-900 dark:text-gray-100 truncate">
                    {friend.name}
                  </span>
                  <span className="text-[11px] text-gray-400">
                    {lastMsg ? lastMsg.timestamp : 'Active'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  <span className="truncate max-w-[200px]">
                    {lastMsg
                      ? lastMsg.senderId === currentUser.id
                        ? `You: ${lastMsg.content || 'Sent an image'}`
                        : lastMsg.content || 'Sent an image'
                      : 'Say hi to start chatting! 👋'}
                  </span>
                  {lastMsg?.status === 'delivered' && (
                    <span className="w-2.5 h-2.5 bg-fb-blue rounded-full flex-shrink-0" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="pt-2 px-4 border-t border-gray-100 dark:border-gray-700 text-center">
        <button
          type="button"
          onClick={() => {
            onOpenFullMessenger();
            onClose();
          }}
          className="text-xs font-semibold text-fb-blue hover:underline py-1"
        >
          See all in Messenger
        </button>
      </div>
    </div>
  );
};
