import React from 'react';
import { ActiveTab } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useChat } from '../../context/ChatContext';
import { Home, Tv, Store, Users, MessageCircle, User } from 'lucide-react';

interface MobileNavProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeTab, onSelectTab }) => {
  const { totalUnreadCount } = useChat();

  const navItems: { key: ActiveTab; icon: React.ElementType; label: string }[] = [
    { key: 'feed', icon: Home, label: 'Home' },
    { key: 'watch', icon: Tv, label: 'Watch' },
    { key: 'marketplace', icon: Store, label: 'Market' },
    { key: 'groups', icon: Users, label: 'Groups' },
    { key: 'messages', icon: MessageCircle, label: 'Messenger' },
    { key: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 h-14 bg-white dark:bg-[#242526] border-t border-gray-200 dark:border-gray-800 flex items-center justify-around md:hidden px-2 shadow-lg">
      {navItems.map(item => {
        const Icon = item.icon;
        const isActive = activeTab === item.key;
        return (
          <button
            key={item.key}
            type="button"
            onClick={() => onSelectTab(item.key)}
            className={`relative flex flex-col items-center justify-center flex-1 h-full py-1 text-xs font-medium transition-colors ${
              isActive ? 'text-fb-blue font-bold' : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            <div className="relative">
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              {item.key === 'messages' && totalUnreadCount > 0 && (
                <span className="absolute -top-1 -right-2 min-w-[16px] h-4 bg-red-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center px-0.5">
                  {totalUnreadCount}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
