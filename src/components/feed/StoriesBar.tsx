import React, { useState } from 'react';
import { Story } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { Plus } from 'lucide-react';
import { CreateStoryModal } from '../modals/CreateStoryModal';
import { StoryViewerModal } from '../modals/StoryViewerModal';

interface StoriesBarProps {
  stories: Story[];
  onAddStory: (newStory: Story) => void;
}

export const StoriesBar: React.FC<StoriesBarProps> = ({ stories, onAddStory }) => {
  const { currentUser } = useAuth();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  return (
    <>
      <div className="relative mb-4 overflow-x-auto no-scrollbar py-1">
        <div className="flex gap-2.5 min-w-full">
          {/* Create Story Card */}
          <div
            onClick={() => setIsCreateOpen(true)}
            className="flex-shrink-0 w-28 sm:w-32 h-48 sm:h-52 bg-white dark:bg-[#242526] rounded-xl overflow-hidden shadow-fb border border-gray-200 dark:border-gray-800 cursor-pointer relative group flex flex-col transition-transform duration-200 hover:scale-[1.02]"
          >
            {/* Top avatar preview */}
            <div className="h-36 overflow-hidden">
              <img
                src={currentUser.avatar}
                alt="Create story"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Plus icon */}
            <div className="absolute top-[125px] left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-fb-blue text-white flex items-center justify-center border-4 border-white dark:border-[#242526] shadow">
              <Plus size={20} strokeWidth={3} />
            </div>

            {/* Text */}
            <div className="flex-1 flex items-end justify-center pb-2 px-1 text-center">
              <span className="font-semibold text-xs text-gray-900 dark:text-gray-100">
                Create story
              </span>
            </div>
          </div>

          {/* Friends Stories Cards */}
          {stories.map((story, idx) => (
            <div
              key={story.id}
              onClick={() => setViewerIndex(idx)}
              className="flex-shrink-0 w-28 sm:w-32 h-48 sm:h-52 rounded-xl overflow-hidden shadow-fb relative cursor-pointer group transition-transform duration-200 hover:scale-[1.02] bg-neutral-800"
            >
              {/* Background preview */}
              {story.type === 'image' ? (
                <img
                  src={story.mediaUrl}
                  alt={story.user.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div
                  className={`w-full h-full bg-gradient-to-br ${story.bgGradient} flex items-center justify-center p-3 text-center text-xs font-bold text-white group-hover:scale-105 transition-transform duration-300`}
                >
                  <p className="line-clamp-4">{story.text}</p>
                </div>
              )}

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 pointer-events-none" />

              {/* User Avatar with Blue Ring */}
              <div className="absolute top-3 left-3 w-10 h-10 rounded-full border-4 border-fb-blue overflow-hidden shadow">
                <img
                  src={story.user.avatar}
                  alt={story.user.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* User Name */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5">
                <span className="text-white text-xs font-semibold drop-shadow truncate block">
                  {story.user.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <CreateStoryModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onStoryCreated={onAddStory}
      />

      {viewerIndex !== null && (
        <StoryViewerModal
          stories={stories}
          initialIndex={viewerIndex}
          isOpen={viewerIndex !== null}
          onClose={() => setViewerIndex(null)}
        />
      )}
    </>
  );
};
