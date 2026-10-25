import React, { useState } from 'react';
import { ActiveTab } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../common/Avatar';
import {
  Users,
  Store,
  Tv,
  Bookmark,
  Clock,
  Flag,
  Calendar,
  ChevronDown,
  ChevronUp,
  Rss,
  Sparkles,
} from 'lucide-react';

interface LeftSidebarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({ activeTab, onSelectTab }) => {
  const { currentUser } = useAuth();
  const [showMore, setShowMore] = useState(false);

  return (
    <aside className="w-72 xl:w-80 h-[calc(100vh-56px)] sticky top-14 overflow-y-auto no-scrollbar p-3 hidden lg:flex flex-col justify-between">
      <div className="space-y-1">
        {/* User Profile */}
        <button
          type="button"
          onClick={() => onSelectTab('profile')}
          className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-200/60 dark:hover:bg-[#3A3B3C] transition-colors text-left"
        >
          <Avatar src={currentUser.avatar} alt={currentUser.name} size="md" />
          <span className="font-semibold text-sm text-gray-900 dark:text-gray-100 truncate">
            {currentUser.name}
          </span>
        </button>

        {/* Friends */}
        <button
          type="button"
          onClick={() => onSelectTab('profile')}
          className="w-full flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-gray-200/60 dark:hover:bg-[#3A3B3C] transition-colors text-left"
        >
          <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/40 text-fb-blue flex items-center justify-center">
            <Users size={22} />
          </div>
          <div>
            <span className="font-semibold text-sm text-gray-900 dark:text-gray-100 block">
              Friends
            </span>
            <span className="text-xs text-gray-500">
              {currentUser.friendsCount.toLocaleString()} connected
            </span>
          </div>
        </button>

        {/* Feeds (Most Recent) */}
        <button
          type="button"
          onClick={() => onSelectTab('feed')}
          className={`w-full flex items-center gap-3.5 p-2.5 rounded-xl transition-colors text-left ${
            activeTab === 'feed'
              ? 'bg-blue-50 dark:bg-fb-blue/20 text-fb-blue'
              : 'hover:bg-gray-200/60 dark:hover:bg-[#3A3B3C]'
          }`}
        >
          <div className="w-9 h-9 rounded-full bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 flex items-center justify-center">
            <Rss size={22} />
          </div>
          <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
            Feeds (Most Recent)
          </span>
        </button>

        {/* Groups */}
        <button
          type="button"
          onClick={() => onSelectTab('groups')}
          className={`w-full flex items-center gap-3.5 p-2.5 rounded-xl transition-colors text-left ${
            activeTab === 'groups'
              ? 'bg-blue-50 dark:bg-fb-blue/20 text-fb-blue'
              : 'hover:bg-gray-200/60 dark:hover:bg-[#3A3B3C]'
          }`}
        >
          <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 flex items-center justify-center">
            <Users size={22} />
          </div>
          <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
            Groups
          </span>
        </button>

        {/* Marketplace */}
        <button
          type="button"
          onClick={() => onSelectTab('marketplace')}
          className={`w-full flex items-center gap-3.5 p-2.5 rounded-xl transition-colors text-left ${
            activeTab === 'marketplace'
              ? 'bg-blue-50 dark:bg-fb-blue/20 text-fb-blue'
              : 'hover:bg-gray-200/60 dark:hover:bg-[#3A3B3C]'
          }`}
        >
          <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/40 text-fb-blue flex items-center justify-center">
            <Store size={22} />
          </div>
          <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
            Marketplace
          </span>
        </button>

        {/* Watch (Video) */}
        <button
          type="button"
          onClick={() => onSelectTab('watch')}
          className={`w-full flex items-center gap-3.5 p-2.5 rounded-xl transition-colors text-left ${
            activeTab === 'watch'
              ? 'bg-blue-50 dark:bg-fb-blue/20 text-fb-blue'
              : 'hover:bg-gray-200/60 dark:hover:bg-[#3A3B3C]'
          }`}
        >
          <div className="w-9 h-9 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-600 flex items-center justify-center">
            <Tv size={22} />
          </div>
          <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
            Watch
          </span>
        </button>

        {/* Memories */}
        <button
          type="button"
          className="w-full flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-gray-200/60 dark:hover:bg-[#3A3B3C] transition-colors text-left"
        >
          <div className="w-9 h-9 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-600 flex items-center justify-center">
            <Clock size={22} />
          </div>
          <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
            Memories
          </span>
        </button>

        {/* Saved */}
        <button
          type="button"
          className="w-full flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-gray-200/60 dark:hover:bg-[#3A3B3C] transition-colors text-left"
        >
          <div className="w-9 h-9 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-600 flex items-center justify-center">
            <Bookmark size={22} />
          </div>
          <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
            Saved
          </span>
        </button>

        {/* Expandable items */}
        {showMore && (
          <>
            <button
              type="button"
              className="w-full flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-gray-200/60 dark:hover:bg-[#3A3B3C] transition-colors text-left"
            >
              <div className="w-9 h-9 rounded-full bg-orange-100 dark:bg-orange-900/40 text-orange-600 flex items-center justify-center">
                <Flag size={22} />
              </div>
              <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                Pages
              </span>
            </button>
            <button
              type="button"
              className="w-full flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-gray-200/60 dark:hover:bg-[#3A3B3C] transition-colors text-left"
            >
              <div className="w-9 h-9 rounded-full bg-red-100 dark:bg-red-900/40 text-red-600 flex items-center justify-center">
                <Calendar size={22} />
              </div>
              <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                Events
              </span>
            </button>
          </>
        )}

        {/* See More Toggle */}
        <button
          type="button"
          onClick={() => setShowMore(!showMore)}
          className="w-full flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-gray-200/60 dark:hover:bg-[#3A3B3C] transition-colors text-left"
        >
          <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-[#3A3B3C] text-gray-600 dark:text-gray-300 flex items-center justify-center">
            {showMore ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
            {showMore ? 'See less' : 'See more'}
          </span>
        </button>

        {/* Shortcuts */}
        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-xs font-bold text-gray-500 uppercase px-2 mb-1.5">
            Your shortcuts
          </h4>
          <div
            onClick={() => onSelectTab('groups')}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-200/60 dark:hover:bg-[#3A3B3C] cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=100&auto=format&fit=crop&q=80"
              alt="shortcut"
              className="w-8 h-8 rounded-lg object-cover"
            />
            <span className="font-semibold text-xs text-gray-900 dark:text-gray-100 truncate">
              Full-Stack Developers
            </span>
          </div>
          <div
            onClick={() => onSelectTab('groups')}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-200/60 dark:hover:bg-[#3A3B3C] cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&auto=format&fit=crop&q=80"
              alt="shortcut"
              className="w-8 h-8 rounded-lg object-cover"
            />
            <span className="font-semibold text-xs text-gray-900 dark:text-gray-100 truncate">
              Artificial Intelligence & LLMs
            </span>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-[11px] text-gray-400 p-2 space-y-1">
        <p>Privacy • Terms • Advertising • Meta © 2026</p>
      </div>
    </aside>
  );
};
