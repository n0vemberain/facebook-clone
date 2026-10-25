import { Post } from '../types';
import { mockUsers } from './mockUsers';

export const mockPosts: Post[] = [
  {
    id: 'post_1',
    userId: 'user_1',
    user: mockUsers[0], // Mark Zuckerberg
    content: 'Excited to announce our newest breakthrough in AI glasses and open source intelligence models! The future of computing is going to be so natural and seamless. What do you think will be the biggest impact in the next 5 years? 🚀👓',
    images: [
      'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=1200&auto=format&fit=crop&q=80'
    ],
    feeling: {
      type: 'feeling',
      text: 'excited',
      emoji: '🤩'
    },
    privacy: 'public',
    timestamp: '2 hours ago',
    reactions: [
      { userId: 'user_2', type: 'like', timestamp: Date.now() - 3600000 },
      { userId: 'user_3', type: 'love', timestamp: Date.now() - 3000000 },
      { userId: 'user_4', type: 'wow', timestamp: Date.now() - 2500000 },
      { userId: 'user_5', type: 'care', timestamp: Date.now() - 1500000 },
    ],
    userReaction: 'like',
    comments: [
      {
        id: 'comm_1_1',
        postId: 'post_1',
        userId: 'user_2',
        user: mockUsers[1],
        content: 'The open weights release is a game changer for independent developers! Kudos Mark!',
        timestamp: '1 hour ago',
        likes: ['user_1', 'user_3'],
      },
      {
        id: 'comm_1_2',
        postId: 'post_1',
        userId: 'user_3',
        user: mockUsers[2],
        content: 'The ergonomic design and lightweight form factor look super sleek. Can’t wait to try them out!',
        timestamp: '45 mins ago',
        likes: ['user_1'],
      }
    ],
    sharesCount: 142,
    isSaved: false,
  },
  {
    id: 'post_2',
    userId: 'user_5',
    user: mockUsers[4], // Nusrat Jahan
    content: 'Caught the golden hour light reflecting over the tranquil river this morning. Nature always has a way of resetting your peace of mind. 🌅🍃\n\nShot on 50mm f/1.4.',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80'
    ],
    feeling: {
      type: 'feeling',
      text: 'peaceful',
      emoji: '😌'
    },
    privacy: 'public',
    timestamp: '4 hours ago',
    reactions: [
      { userId: 'user_1', type: 'love', timestamp: Date.now() - 5000000 },
      { userId: 'user_2', type: 'love', timestamp: Date.now() - 4000000 },
      { userId: 'user_6', type: 'wow', timestamp: Date.now() - 3000000 },
    ],
    userReaction: 'love',
    comments: [
      {
        id: 'comm_2_1',
        postId: 'post_2',
        userId: 'user_6',
        user: mockUsers[5],
        content: 'Breathtaking colors! What camera settings did you use for this shot?',
        timestamp: '3 hours ago',
        likes: ['user_5'],
      }
    ],
    sharesCount: 29,
    isSaved: true,
  },
  {
    id: 'post_3',
    userId: 'user_3',
    user: mockUsers[2], // Sarah Jenkins
    content: 'Just launched our brand new Design System 2.0 at work! 🎨✨ Over 200 components with fully accessible contrast ratios, fluid typography, and dark mode native support.\n\nShout out to the whole design and engineering team for crushing this milestone! 💪',
    images: [
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80'
    ],
    feeling: {
      type: 'activity',
      text: 'celebrating success',
      emoji: '🎉'
    },
    privacy: 'public',
    timestamp: 'Yesterday at 5:14 PM',
    reactions: [
      { userId: 'user_2', type: 'love', timestamp: Date.now() - 86400000 },
      { userId: 'user_4', type: 'like', timestamp: Date.now() - 80000000 },
    ],
    userReaction: null,
    comments: [
      {
        id: 'comm_3_1',
        postId: 'post_3',
        userId: 'user_4',
        user: mockUsers[3],
        content: 'Huge congratulations Sarah! The attention to detail is inspiring.',
        timestamp: 'Yesterday at 6:30 PM',
        likes: ['user_3'],
      }
    ],
    sharesCount: 18,
    isSaved: false,
  },
  {
    id: 'post_4',
    userId: 'user_6',
    user: mockUsers[5], // Alex Rivera
    content: 'Summit achieved! 3,800 meters above sea level. Legs are burning, oxygen is thin, but this view makes every single step worth it! 🏔️🧗‍♂️',
    images: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&auto=format&fit=crop&q=80'
    ],
    privacy: 'friends',
    timestamp: '2 days ago',
    reactions: [
      { userId: 'user_2', type: 'wow', timestamp: Date.now() - 172800000 },
      { userId: 'user_3', type: 'care', timestamp: Date.now() - 170000000 },
      { userId: 'user_5', type: 'love', timestamp: Date.now() - 160000000 },
    ],
    userReaction: null,
    comments: [],
    sharesCount: 5,
    isSaved: false,
  }
];
