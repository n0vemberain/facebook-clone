import React, { useState } from 'react';
import { ActiveTab, Notification } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useChat } from '../../context/ChatContext';
import { useTheme } from '../../context/ThemeContext';
import { Avatar } from '../common/Avatar';
import { MessengerDropdown } from '../messenger/MessengerDropdown';
import { NotificationsDropdown } from '../notifications/NotificationsDropdown';
import { UserSwitcherModal } from '../modals/UserSwitcherModal';
import {
  Search,
  Home,
  Tv,
  Store,
  Users,
  Gamepad2,
  Grid,
  MessageCircle,
  Bell,
  Moon,
  Sun,
  UserCheck,
  Settings,
  LogOut,
  HelpCircle,
} from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenSearch: () => void;
  notifications: Notification[];
  onMarkAllNotificationsRead: () => void;
  onNotificationClick: (notif: Notification) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenSearch,
  notifications,
  onMarkAllNotificationsRead,
  onNotificationClick,
}) => {
  const { currentUser } = useAuth();
  const { totalUnreadCount } = useChat();
  const { isDark, toggleTheme } = useTheme();

  const [isMessengerOpen, setIsMessengerOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isUserSwitcherOpen, setIsUserSwitcherOpen] = useState(false);

  const unreadNotifsCount = notifications.filter(n => !n.isRead).length;

  return (
    <>
      <header className="sticky top-0 z-40 h-14 bg-white dark:bg-[#242526] border-b border-gray-200 dark:border-gray-800 shadow-xs flex items-center justify-between px-4">
        {/* Left: Facebook Logo & Search */}
        <div className="flex items-center gap-2">
          {/* Facebook 'f' Logo */}
          <button
            type="button"
            onClick={() => onSelectTab('feed')}
            className="flex-shrink-0 cursor-pointer focus:outline-none"
            title="Facebook"
          >
            <svg
              className="w-10 h-10 text-fb-blue fill-current"
              viewBox="0 0 36 36"
            >
              <path d="M15 35.8C6.5 34.3 0 26.9 0 18 0 8.1 8.1 0 18 0s18 8.1 18 18c0 8.9-6.5 16.3-15 17.8l-1-8.3h4l.7-4.5H20V19c0-1.3.4-2.2 2.2-2.2h2.4v-4c-.4-.1-1.9-.2-3.6-.2-3.6 0-6 2.2-6 6.2v3.5h-3.9v4.5H15l-1 9z" />
            </svg>
          </button>

          {/* Search Trigger */}
          <div
            onClick={onOpenSearch}
            className="flex items-center gap-2 bg-gray-100 dark:bg-[#3A3B3C] hover:bg-gray-200 dark:hover:bg-[#4E4F50] px-3 py-2 rounded-full cursor-pointer transition-colors text-gray-500 dark:text-gray-400 w-10 sm:w-60"
            title="Search Facebook"
          >
            <Search size={18} />
            <span className="hidden sm:inline text-sm">Search Facebook</span>
          </div>
        </div>

        {/* Center: Main Navigation Tabs */}
        <div className="hidden md:flex items-center justify-center flex-1 max-w-xl h-full px-2">
          {[
            { key: 'feed', icon: Home, label: 'Home' },
            { key: 'watch', icon: Tv, label: 'Watch' },
            { key: 'marketplace', icon: Store, label: 'Marketplace' },
            { key: 'groups', icon: Users, label: 'Groups' },
            { key: 'messages', icon: MessageCircle, label: 'Messenger' },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => onSelectTab(tab.key as ActiveTab)}
                className={`relative flex-1 flex items-center justify-center h-full px-4 rounded-lg transition-colors group ${
                  isActive
                    ? 'text-fb-blue'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#3A3B3C]'
                }`}
                title={tab.label}
              >
                <Icon size={26} strokeWidth={isActive ? 2.5 : 2} />
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-fb-blue rounded-t" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right: Actions, Messenger, Notifications, User Menu */}
        <div className="flex items-center gap-2">
          {/* Fast Switch User Pill Button */}
          <button
            type="button"
            onClick={() => setIsUserSwitcherOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-[#3A3B3C] hover:bg-gray-200 dark:hover:bg-[#4E4F50] rounded-full text-xs font-semibold text-gray-700 dark:text-gray-200 transition-colors"
            title="Switch User Profile"
          >
            <UserCheck size={14} className="text-fb-blue" />
            <span>Switch User</span>
          </button>

          {/* Dark Mode Quick Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-[#3A3B3C] hover:bg-gray-200 dark:hover:bg-[#4E4F50] text-gray-700 dark:text-gray-200 flex items-center justify-center transition-colors"
            title={isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}
          >
            {isDark ? <Sun size={19} className="text-amber-400" /> : <Moon size={19} />}
          </button>

          {/* Messenger Button with Badge */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsMessengerOpen(!isMessengerOpen);
                setIsNotificationsOpen(false);
                setIsProfileMenuOpen(false);
              }}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors relative ${
                isMessengerOpen
                  ? 'bg-blue-100 text-fb-blue dark:bg-fb-blue/20'
                  : 'bg-gray-100 dark:bg-[#3A3B3C] hover:bg-gray-200 dark:hover:bg-[#4E4F50] text-gray-700 dark:text-gray-200'
              }`}
              title="Messenger"
            >
              <MessageCircle size={20} />
              {totalUnreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-600 text-white rounded-full text-[11px] font-bold flex items-center justify-center px-1 border-2 border-white dark:border-[#242526]">
                  {totalUnreadCount}
                </span>
              )}
            </button>

            {/* Messenger Dropdown Popover */}
            <MessengerDropdown
              isOpen={isMessengerOpen}
              onClose={() => setIsMessengerOpen(false)}
              onOpenFullMessenger={() => {
                onSelectTab('messages');
                setIsMessengerOpen(false);
              }}
            />
          </div>

          {/* Notifications Button with Badge */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsNotificationsOpen(!isNotificationsOpen);
                setIsMessengerOpen(false);
                setIsProfileMenuOpen(false);
              }}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors relative ${
                isNotificationsOpen
                  ? 'bg-blue-100 text-fb-blue dark:bg-fb-blue/20'
                  : 'bg-gray-100 dark:bg-[#3A3B3C] hover:bg-gray-200 dark:hover:bg-[#4E4F50] text-gray-700 dark:text-gray-200'
              }`}
              title="Notifications"
            >
              <Bell size={20} />
              {unreadNotifsCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-600 text-white rounded-full text-[11px] font-bold flex items-center justify-center px-1 border-2 border-white dark:border-[#242526]">
                  {unreadNotifsCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown Popover */}
            <NotificationsDropdown
              notifications={notifications}
              isOpen={isNotificationsOpen}
              onClose={() => setIsNotificationsOpen(false)}
              onMarkAllAsRead={onMarkAllNotificationsRead}
              onNotificationClick={onNotificationClick}
            />
          </div>

          {/* Current User Profile Avatar & Account Menu */}
          <div className="relative">
            <div
              onClick={() => {
                setIsProfileMenuOpen(!isProfileMenuOpen);
                setIsMessengerOpen(false);
                setIsNotificationsOpen(false);
              }}
              className="cursor-pointer"
              title="Your profile & account"
            >
              <Avatar src={currentUser.avatar} alt={currentUser.name} size="md" />
            </div>

            {/* Profile Dropdown Menu */}
            {isProfileMenuOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-[#242526] rounded-2xl shadow-fb-lg border border-gray-200 dark:border-gray-700 p-2 z-50 animate-in fade-in zoom-in-95"
                onClick={e => e.stopPropagation()}
              >
                {/* User card header */}
                <div
                  onClick={() => {
                    onSelectTab('profile');
                    setIsProfileMenuOpen(false);
                  }}
                  className="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-[#3A3B3C] cursor-pointer flex items-center gap-3 shadow-xs"
                >
                  <Avatar src={currentUser.avatar} alt={currentUser.name} size="lg" />
                  <div className="flex-1 min-w-0">
                    <span className="font-bold text-base text-gray-900 dark:text-gray-100 block truncate">
                      {currentUser.name}
                    </span>
                    <span className="text-xs text-gray-500">See your profile</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-700 my-2 pt-1 space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsUserSwitcherOpen(true);
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-[#3A3B3C] text-sm text-gray-800 dark:text-gray-200 text-left"
                  >
                    <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-[#3A3B3C] flex items-center justify-center">
                      <UserCheck size={18} />
                    </div>
                    <span>Switch Profiles</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      toggleTheme();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-[#3A3B3C] text-sm text-gray-800 dark:text-gray-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-[#3A3B3C] flex items-center justify-center">
                        <Moon size={18} />
                      </div>
                      <span>Dark mode</span>
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-700">
                      {isDark ? 'On' : 'Off'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      localStorage.clear();
                      window.location.reload();
                    }}
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-[#3A3B3C] text-sm text-red-600 dark:text-red-400 text-left"
                  >
                    <div className="w-9 h-9 rounded-full bg-red-50 dark:bg-red-950/30 flex items-center justify-center">
                      <LogOut size={18} />
                    </div>
                    <span>Reset Data & Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* User Switcher Modal */}
      <UserSwitcherModal
        isOpen={isUserSwitcherOpen}
        onClose={() => setIsUserSwitcherOpen(false)}
      />
    </>
  );
};
