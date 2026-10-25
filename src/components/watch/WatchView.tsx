import React, { useState } from 'react';
import { Avatar } from '../common/Avatar';
import { ReactionBar } from '../feed/ReactionBar';
import { ReactionType } from '../../types';
import {
  Video,
  Play,
  Volume2,
  VolumeX,
  ThumbsUp,
  MessageCircle,
  Share2,
  Tv,
  Film,
  Bookmark,
} from 'lucide-react';

interface WatchItem {
  id: string;
  creator: {
    name: string;
    avatar: string;
    verified?: boolean;
    followers: string;
  };
  title: string;
  videoUrl: string;
  timestamp: string;
  views: string;
  likes: number;
  comments: number;
}

const MOCK_VIDEOS: WatchItem[] = [
  {
    id: 'vid_1',
    creator: {
      name: 'Meta Tech Labs',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      verified: true,
      followers: '14.2M followers',
    },
    title: 'Introducing Next-Gen AI Spatial Computing & Holographic Interfaces in Action! 🚀',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    timestamp: '4 hours ago',
    views: '1.2M views',
    likes: 45200,
    comments: 3200,
  },
  {
    id: 'vid_2',
    creator: {
      name: 'National Geographic Wild',
      avatar: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&auto=format&fit=crop&q=80',
      verified: true,
      followers: '28.5M followers',
    },
    title: 'Epic 4K Drone Footage: The Hidden Glaciers of Patagonia 🏔️❄️',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    timestamp: '1 day ago',
    views: '840K views',
    likes: 89000,
    comments: 4100,
  },
  {
    id: 'vid_3',
    creator: {
      name: 'Coding Innovations & Tech',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      verified: false,
      followers: '320K followers',
    },
    title: 'Building a Full-Stack Real-time System from Scratch in 15 Minutes! 💻⚡',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    timestamp: '2 days ago',
    views: '240K views',
    likes: 18400,
    comments: 1450,
  }
];

export const WatchView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'home' | 'live' | 'reels' | 'saved'>('home');
  const [likesState, setLikesState] = useState<{ [id: string]: boolean }>({});

  const toggleLike = (id: string) => {
    setLikesState(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Category Pills */}
      <div className="flex gap-2 pb-4 mb-4 border-b border-gray-200 dark:border-gray-800">
        {[
          { key: 'home', label: 'Home', icon: Tv },
          { key: 'live', label: 'Live', icon: Video },
          { key: 'reels', label: 'Reels', icon: Film },
          { key: 'saved', label: 'Saved Videos', icon: Bookmark },
        ].map(cat => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveCategory(cat.key as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                activeCategory === cat.key
                  ? 'bg-fb-blue text-white shadow'
                  : 'bg-white dark:bg-[#242526] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] border border-gray-200 dark:border-gray-700'
              }`}
            >
              <Icon size={16} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Videos Feed */}
      <div className="space-y-6">
        {MOCK_VIDEOS.map(video => {
          const isLiked = !!likesState[video.id];
          return (
            <div
              key={video.id}
              className="bg-white dark:bg-[#242526] rounded-2xl shadow-fb border border-gray-100 dark:border-transparent overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar src={video.creator.avatar} alt={video.creator.name} size="md" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-gray-900 dark:text-gray-100 text-sm">
                        {video.creator.name}
                      </span>
                      {video.creator.verified && (
                        <span className="w-4 h-4 bg-fb-blue text-white rounded-full flex items-center justify-center text-[9px]">
                          ✓
                        </span>
                      )}
                      <button className="text-fb-blue font-semibold text-xs ml-2 hover:underline">
                        Follow
                      </button>
                    </div>
                    <span className="text-xs text-gray-500">
                      {video.timestamp} • {video.views}
                    </span>
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className="px-4 pb-3">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {video.title}
                </p>
              </div>

              {/* Video Player */}
              <div className="bg-black relative aspect-video flex items-center justify-center">
                <video
                  src={video.videoUrl}
                  controls
                  className="w-full h-full max-h-[500px] object-contain"
                  poster="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=1200&auto=format&fit=crop&q=80"
                />
              </div>

              {/* Stats */}
              <div className="px-4 py-2 flex items-center justify-between text-xs text-gray-500 border-b border-gray-100 dark:border-gray-700">
                <span>{(video.likes + (isLiked ? 1 : 0)).toLocaleString()} reactions</span>
                <span>{video.comments.toLocaleString()} comments</span>
              </div>

              {/* Actions */}
              <div className="px-2 py-1 grid grid-cols-3 gap-1">
                <button
                  type="button"
                  onClick={() => toggleLike(video.id)}
                  className={`flex items-center justify-center gap-2 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 dark:hover:bg-[#3A3B3C] transition-colors ${
                    isLiked ? 'text-fb-blue' : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  <ThumbsUp size={18} fill={isLiked ? '#1877F2' : 'none'} />
                  <span>Like</span>
                </button>

                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-2 rounded-lg font-semibold text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] transition-colors"
                >
                  <MessageCircle size={18} />
                  <span>Comment</span>
                </button>

                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-2 rounded-lg font-semibold text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] transition-colors"
                >
                  <Share2 size={18} />
                  <span>Share</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
