import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useChat } from '../../context/ChatContext';
import { Avatar } from '../common/Avatar';
import { Post, MarketplaceItem, Group } from '../../types';
import { Search, X, MessageSquare, ShoppingBag, Users, FileText } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts: Post[];
  marketplaceItems: MarketplaceItem[];
  groups: Group[];
  onSelectUser: (userId: string) => void;
  onSelectTab: (tab: any) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  posts,
  marketplaceItems,
  groups,
  onSelectUser,
  onSelectTab,
}) => {
  const { users } = useAuth();
  const { openChat } = useChat();
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredUsers = query.trim()
    ? users.filter(u => u.name.toLowerCase().includes(query.toLowerCase()) || u.username.toLowerCase().includes(query.toLowerCase()))
    : users.slice(0, 4);

  const filteredPosts = query.trim()
    ? posts.filter(p => p.content.toLowerCase().includes(query.toLowerCase()))
    : [];

  const filteredMarketplace = query.trim()
    ? marketplaceItems.filter(m => m.title.toLowerCase().includes(query.toLowerCase()))
    : [];

  const filteredGroups = query.trim()
    ? groups.filter(g => g.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-14 bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-100"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#242526] w-full max-w-xl rounded-2xl shadow-fb-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
          <Search size={20} className="text-gray-400 ml-2" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search Facebook (people, posts, marketplace, groups)..."
            className="w-full bg-transparent text-base text-gray-900 dark:text-gray-100 focus:outline-none placeholder-gray-400"
            autoFocus
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-[#3A3B3C] text-gray-400"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Results List */}
        <div className="p-3 max-h-[70vh] overflow-y-auto space-y-4">
          {/* People Results */}
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase px-2 mb-2 flex items-center gap-1.5">
              <Users size={14} />
              <span>People</span>
            </h4>
            <div className="space-y-1">
              {filteredUsers.map(user => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-[#3A3B3C] cursor-pointer"
                  onClick={() => {
                    onSelectUser(user.id);
                    onClose();
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Avatar src={user.avatar} alt={user.name} size="md" online={user.online} />
                    <div>
                      <span className="font-semibold text-sm text-gray-900 dark:text-gray-100 block">
                        {user.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        @{user.username} • {user.friendsCount} friends
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      openChat(user.id);
                      onClose();
                    }}
                    className="px-3 py-1 bg-fb-blue text-white rounded-lg text-xs font-semibold hover:bg-fb-blue-hover"
                  >
                    Message
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Posts Results */}
          {filteredPosts.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase px-2 mb-2 flex items-center gap-1.5">
                <FileText size={14} />
                <span>Posts</span>
              </h4>
              <div className="space-y-1">
                {filteredPosts.map(post => (
                  <div
                    key={post.id}
                    onClick={() => {
                      onSelectTab('feed');
                      onClose();
                    }}
                    className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-[#3A3B3C] cursor-pointer"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Avatar src={post.user.avatar} alt={post.user.name} size="xs" />
                      <span className="font-semibold text-xs text-gray-900 dark:text-gray-100">
                        {post.user.name}
                      </span>
                      <span className="text-[11px] text-gray-400">• {post.timestamp}</span>
                    </div>
                    <p className="text-xs text-gray-700 dark:text-gray-300 line-clamp-2">
                      {post.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Marketplace Results */}
          {filteredMarketplace.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase px-2 mb-2 flex items-center gap-1.5">
                <ShoppingBag size={14} />
                <span>Marketplace</span>
              </h4>
              <div className="space-y-1">
                {filteredMarketplace.map(item => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelectTab('marketplace');
                      onClose();
                    }}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-[#3A3B3C] cursor-pointer"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <span className="font-semibold text-sm text-gray-900 dark:text-gray-100 block">
                        {item.title}
                      </span>
                      <span className="text-xs font-bold text-fb-blue">
                        ${item.price.toLocaleString()} • {item.location}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Groups Results */}
          {filteredGroups.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase px-2 mb-2 flex items-center gap-1.5">
                <Users size={14} />
                <span>Groups</span>
              </h4>
              <div className="space-y-1">
                {filteredGroups.map(grp => (
                  <div
                    key={grp.id}
                    onClick={() => {
                      onSelectTab('groups');
                      onClose();
                    }}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-[#3A3B3C] cursor-pointer"
                  >
                    <img
                      src={grp.avatar}
                      alt={grp.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <span className="font-semibold text-sm text-gray-900 dark:text-gray-100 block">
                        {grp.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {grp.privacy} • {grp.membersCount.toLocaleString()} members
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
