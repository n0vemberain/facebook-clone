import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useChat } from '../../context/ChatContext';
import { Avatar } from '../common/Avatar';
import { Search, Gift, MoreHorizontal, UserCheck, X } from 'lucide-react';

export const RightSidebar: React.FC = () => {
  const { users, currentUser, friendRequests, acceptFriendRequest, declineFriendRequest } = useAuth();
  const { openChat } = useChat();

  const [contactSearch, setContactSearch] = useState('');
  const [showContactSearch, setShowContactSearch] = useState(false);

  const friends = users.filter(u => u.id !== currentUser.id);

  const pendingFriendId = Object.keys(friendRequests).find(
    id => friendRequests[id] === 'pending'
  );
  const pendingUser = pendingFriendId ? users.find(u => u.id === pendingFriendId) : null;

  const filteredFriends = friends.filter(f =>
    f.name.toLowerCase().includes(contactSearch.toLowerCase())
  );

  return (
    <aside className="w-72 xl:w-80 h-[calc(100vh-56px)] sticky top-14 overflow-y-auto no-scrollbar p-3 hidden xl:block space-y-4">
      {/* Sponsored Ads */}
      <div>
        <h4 className="text-xs font-bold text-gray-500 uppercase px-2 mb-2">
          Sponsored
        </h4>
        <div className="space-y-3">
          <a
            href="https://meta.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-200/60 dark:hover:bg-[#3A3B3C] transition-colors group"
          >
            <img
              src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=200&auto=format&fit=crop&q=80"
              alt="ad"
              className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
            />
            <div className="min-w-0">
              <span className="font-semibold text-xs text-gray-900 dark:text-gray-100 line-clamp-2">
                Meta Quest Pro & Ray-Ban Smart Glasses — Experience Spatial Computing
              </span>
              <span className="text-[11px] text-gray-500 block mt-1">meta.com</span>
            </div>
          </a>

          <a
            href="https://google.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-200/60 dark:hover:bg-[#3A3B3C] transition-colors group"
          >
            <img
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=200&auto=format&fit=crop&q=80"
              alt="ad"
              className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
            />
            <div className="min-w-0">
              <span className="font-semibold text-xs text-gray-900 dark:text-gray-100 line-clamp-2">
                Accelerate Web Development with High Performance Clouds
              </span>
              <span className="text-[11px] text-gray-500 block mt-1">cloud.google.com</span>
            </div>
          </a>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700" />

      {/* Friend Request Banner if pending */}
      {pendingUser && (
        <div>
          <div className="flex items-center justify-between px-2 mb-2">
            <h4 className="text-xs font-bold text-gray-500 uppercase">
              Friend Requests
            </h4>
            <span className="text-xs text-fb-blue font-semibold hover:underline cursor-pointer">
              See all
            </span>
          </div>

          <div className="bg-white dark:bg-[#242526] p-3 rounded-xl shadow-fb border border-gray-100 dark:border-transparent">
            <div className="flex items-center gap-3 mb-2.5">
              <Avatar src={pendingUser.avatar} alt={pendingUser.name} size="md" />
              <div className="min-w-0">
                <span className="font-semibold text-sm text-gray-900 dark:text-gray-100 block truncate">
                  {pendingUser.name}
                </span>
                <span className="text-xs text-gray-500">4 mutual friends</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => acceptFriendRequest(pendingUser.id)}
                className="flex-1 py-1.5 bg-fb-blue hover:bg-fb-blue-hover text-white rounded-lg text-xs font-semibold shadow transition-colors"
              >
                Confirm
              </button>
              <button
                type="button"
                onClick={() => declineFriendRequest(pendingUser.id)}
                className="flex-1 py-1.5 bg-gray-200 dark:bg-[#3A3B3C] hover:bg-gray-300 dark:hover:bg-[#4E4F50] text-gray-800 dark:text-gray-200 rounded-lg text-xs font-semibold transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 mt-4" />
        </div>
      )}

      {/* Birthdays Widget */}
      <div>
        <h4 className="text-xs font-bold text-gray-500 uppercase px-2 mb-2">
          Birthdays
        </h4>
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-200/60 dark:hover:bg-[#3A3B3C] cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-500 flex items-center justify-center flex-shrink-0">
            <Gift size={20} />
          </div>
          <p className="text-xs text-gray-700 dark:text-gray-300 leading-snug">
            <span className="font-semibold text-gray-900 dark:text-gray-100">Sarah Jenkins</span> and <span className="font-semibold text-gray-900 dark:text-gray-100">1 other</span> have birthdays today.
          </p>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700" />

      {/* Contacts List with Instant Chat Trigger */}
      <div>
        <div className="flex items-center justify-between px-2 mb-2">
          <h4 className="text-xs font-bold text-gray-500 uppercase">
            Contacts
          </h4>
          <div className="flex items-center gap-1 text-gray-500">
            <button
              type="button"
              onClick={() => setShowContactSearch(!showContactSearch)}
              className="p-1 hover:bg-gray-200/60 dark:hover:bg-[#3A3B3C] rounded-full transition-colors"
              title="Search contacts"
            >
              <Search size={15} />
            </button>
            <button
              type="button"
              className="p-1 hover:bg-gray-200/60 dark:hover:bg-[#3A3B3C] rounded-full transition-colors"
              title="Options"
            >
              <MoreHorizontal size={15} />
            </button>
          </div>
        </div>

        {/* Contact Search Input */}
        {showContactSearch && (
          <div className="px-2 pb-2">
            <input
              type="text"
              value={contactSearch}
              onChange={e => setContactSearch(e.target.value)}
              placeholder="Search contacts..."
              className="w-full px-3 py-1 bg-gray-100 dark:bg-[#3A3B3C] rounded-full text-xs text-gray-900 dark:text-gray-100 focus:outline-none"
              autoFocus
            />
          </div>
        )}

        {/* Contact Friends List */}
        <div className="space-y-0.5">
          {filteredFriends.map(friend => (
            <div
              key={friend.id}
              onClick={() => openChat(friend.id)}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-200/60 dark:hover:bg-[#3A3B3C] cursor-pointer transition-colors group"
              title={`Send message to ${friend.name}`}
            >
              <Avatar src={friend.avatar} alt={friend.name} size="sm" online={friend.online} />
              <span className="font-medium text-xs text-gray-800 dark:text-gray-200 truncate group-hover:text-fb-blue">
                {friend.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
