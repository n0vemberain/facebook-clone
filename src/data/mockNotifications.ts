import { Notification } from '../types';
import { mockUsers } from './mockUsers';

export const mockNotifications: Notification[] = [
  {
    id: 'notif_1',
    userId: 'user_2',
    actor: mockUsers[0], // Mark Zuckerberg
    type: 'like',
    content: 'liked your comment: "The open weights release is a game changer for independent developers!"',
    timestamp: '15m ago',
    isRead: false,
    targetId: 'post_1',
  },
  {
    id: 'notif_2',
    userId: 'user_2',
    actor: mockUsers[2], // Sarah Jenkins
    type: 'reaction',
    content: 'reacted ❤️ to your post about Full Stack architecture.',
    timestamp: '1h ago',
    isRead: false,
    targetId: 'post_3',
  },
  {
    id: 'notif_3',
    userId: 'user_2',
    actor: mockUsers[4], // Nusrat Jahan
    type: 'comment',
    content: 'commented on your photo: "Awesome view! Where was this taken?"',
    timestamp: '3h ago',
    isRead: true,
    targetId: 'post_2',
  },
  {
    id: 'notif_4',
    userId: 'user_2',
    actor: mockUsers[5], // Alex Rivera
    type: 'friend_request',
    content: 'sent you a friend request.',
    timestamp: '5h ago',
    isRead: true,
    targetId: 'user_6',
  },
  {
    id: 'notif_5',
    userId: 'user_2',
    actor: mockUsers[3], // Fahim Rahman
    type: 'post',
    content: 'shared a new post in Artificial Intelligence & Large Language Models.',
    timestamp: '1d ago',
    isRead: true,
    targetId: 'post_4',
  }
];
