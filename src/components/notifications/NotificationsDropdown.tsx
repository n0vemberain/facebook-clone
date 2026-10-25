import React, { useState } from 'react';
import { Notification } from '../../types';
import { Avatar } from '../common/Avatar';
import {
  ThumbsUp,
  Heart,
  MessageCircle,
  UserPlus,
  Share2,
  Check,
} from 'lucide-react';

interface NotificationsDropdownProps {
  notifications: Notification[];
  isOpen: boolean;
  onClose: () => void;
  onMarkAllAsRead: () => void;
  onNotificationClick: (notif: Notification) => void;
}

export const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({
  notifications,
  isOpen,
  onClose,
  onMarkAllAsRead,
  onNotificationClick,
}) => {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  if (!isOpen) return null;

  const filtered = notifications.filter(n => (filter === 'unread' ? !n.isRead : true));

  const renderIconBadge = (type: Notification['type']) => {
    switch (type) {
      case 'like':
        return (
          <span className="w-5 h-5 rounded-full bg-fb-blue text-white flex items-center justify-center text-[10px]">
            <ThumbsUp size={10} fill="white" />
          </span>
        );
      case 'reaction':
        return (
          <span className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px]">
            <Heart size={10} fill="white" />
          </span>
        );
      case 'comment':
        return (
          <span className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px]">
            <MessageCircle size={10} fill="white" />
          </span>
        );
      case 'friend_request':
        return (
          <span className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px]">
            <UserPlus size={10} fill="white" />
          </span>
        );
      default:
        return (
          <span className="w-5 h-5 rounded-full bg-purple-500 text-white flex items-center justify-center text-[10px]">
            <Share2 size={10} fill="white" />
          </span>
        );
    }
  };

  return (
    <div
      className="absolute right-0 top-full mt-2 w-88 sm:w-96 bg-white dark:bg-[#242526] rounded-2xl shadow-fb-lg border border-gray-200 dark:border-gray-700 py-3 z-50 animate-in fade-in zoom-in-95 duration-150"
      onClick={e => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pb-2">
        <h3 className="font-bold text-2xl text-gray-900 dark:text-gray-100">
          Notifications
        </h3>
        <button
          type="button"
          onClick={onMarkAllAsRead}
          className="text-xs font-semibold text-fb-blue hover:underline"
        >
          Mark all as read
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 px-4 py-1.5 border-b border-gray-100 dark:border-gray-800">
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
            filter === 'all'
              ? 'bg-blue-50 dark:bg-fb-blue/20 text-fb-blue'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#3A3B3C]'
          }`}
        >
          All
        </button>
        <button
          type="button"
          onClick={() => setFilter('unread')}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
            filter === 'unread'
              ? 'bg-blue-50 dark:bg-fb-blue/20 text-fb-blue'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#3A3B3C]'
          }`}
        >
          Unread
        </button>
      </div>

      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto px-2 py-1 space-y-1">
        {filtered.length === 0 ? (
          <div className="text-center py-8 text-gray-500 text-xs">
            No notifications right now
          </div>
        ) : (
          filtered.map(notif => (
            <div
              key={notif.id}
              onClick={() => {
                onNotificationClick(notif);
                onClose();
              }}
              className={`flex items-start gap-3 p-2.5 rounded-xl cursor-pointer transition-colors ${
                !notif.isRead
                  ? 'bg-blue-50/60 dark:bg-blue-950/20 hover:bg-blue-50 dark:hover:bg-blue-950/30'
                  : 'hover:bg-gray-100 dark:hover:bg-[#3A3B3C]'
              }`}
            >
              {/* Avatar with badge */}
              <div className="relative">
                <Avatar src={notif.actor.avatar} alt={notif.actor.name} size="md" />
                <div className="absolute -bottom-1 -right-1">
                  {renderIconBadge(notif.type)}
                </div>
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-[13px] text-gray-900 dark:text-gray-100 leading-snug">
                  <span className="font-semibold">{notif.actor.name} </span>
                  {notif.content}
                </p>
                <span className="text-xs font-semibold text-fb-blue mt-0.5 block">
                  {notif.timestamp}
                </span>
              </div>

              {/* Unread indicator */}
              {!notif.isRead && (
                <span className="w-2.5 h-2.5 bg-fb-blue rounded-full flex-shrink-0 mt-2" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
