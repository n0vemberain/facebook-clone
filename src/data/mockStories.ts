import { Story } from '../types';
import { mockUsers } from './mockUsers';

export const mockStories: Story[] = [
  {
    id: 'story_1',
    userId: 'user_1',
    user: mockUsers[0], // Mark Zuckerberg
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    timestamp: '45m ago',
    isViewed: false,
  },
  {
    id: 'story_2',
    userId: 'user_3',
    user: mockUsers[2], // Sarah Jenkins
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80',
    timestamp: '2h ago',
    isViewed: false,
  },
  {
    id: 'story_3',
    userId: 'user_5',
    user: mockUsers[4], // Nusrat Jahan
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&auto=format&fit=crop&q=80',
    timestamp: '3h ago',
    isViewed: false,
  },
  {
    id: 'story_4',
    userId: 'user_6',
    user: mockUsers[5], // Alex Rivera
    type: 'text',
    text: 'Early morning trail ride completed! 🚵‍♂️ 40km in 90 minutes. Stay active friends! 💪',
    bgGradient: 'from-amber-500 via-rose-500 to-purple-600',
    timestamp: '5h ago',
    isViewed: false,
  },
  {
    id: 'story_5',
    userId: 'user_4',
    user: mockUsers[3], // Fahim Rahman
    type: 'text',
    text: 'Debugging distributed GPU clusters at 2 AM... but the model is finally converging! 🚀🤖',
    bgGradient: 'from-blue-600 via-indigo-600 to-purple-800',
    timestamp: '7h ago',
    isViewed: true,
  }
];
