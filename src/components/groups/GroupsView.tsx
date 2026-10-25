import React, { useState } from 'react';
import { Group, Post } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { PostCard } from '../feed/PostCard';
import { CreatePostBox } from '../feed/CreatePostBox';
import { Users, Globe, Lock, Plus, Check } from 'lucide-react';

interface GroupsViewProps {
  groups: Group[];
  posts: Post[];
  onUpdatePost: (post: Post) => void;
  onDeletePost: (postId: string) => void;
  onPostCreated: (post: Post) => void;
  onViewProfile: (userId: string) => void;
}

export const GroupsView: React.FC<GroupsViewProps> = ({
  groups: initialGroups,
  posts,
  onUpdatePost,
  onDeletePost,
  onPostCreated,
  onViewProfile,
}) => {
  const { currentUser } = useAuth();
  const [groups, setGroups] = useState<Group[]>(initialGroups);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

  const toggleJoin = (groupId: string) => {
    setGroups(prev =>
      prev.map(g =>
        g.id === groupId
          ? {
              ...g,
              isJoined: !g.isJoined,
              membersCount: g.isJoined ? g.membersCount - 1 : g.membersCount + 1,
            }
          : g
      )
    );
  };

  const selectedGroup = groups.find(g => g.id === selectedGroupId);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Groups</h1>
          <p className="text-sm text-gray-500">Discover and join communities based on your passions</p>
        </div>
      </div>

      {/* Selected Group View or Groups Discovery */}
      {selectedGroup ? (
        <div className="space-y-4">
          <button
            type="button"
            onClick={() => setSelectedGroupId(null)}
            className="text-sm font-semibold text-fb-blue hover:underline mb-2 block"
          >
            ← Back to all groups
          </button>

          {/* Group Banner */}
          <div className="bg-white dark:bg-[#242526] rounded-2xl overflow-hidden shadow-fb border border-gray-100 dark:border-transparent">
            <div className="h-64 sm:h-80 w-full overflow-hidden">
              <img
                src={selectedGroup.coverImage}
                alt={selectedGroup.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {selectedGroup.name}
                </h2>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                  <span>{selectedGroup.privacy} group</span>
                  <span>•</span>
                  <span>{selectedGroup.membersCount.toLocaleString()} members</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 max-w-2xl">
                  {selectedGroup.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => toggleJoin(selectedGroup.id)}
                className={`px-5 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors ${
                  selectedGroup.isJoined
                    ? 'bg-gray-200 dark:bg-[#3A3B3C] text-gray-800 dark:text-gray-200'
                    : 'bg-fb-blue text-white hover:bg-fb-blue-hover'
                }`}
              >
                {selectedGroup.isJoined ? (
                  <>
                    <Check size={16} />
                    <span>Joined</span>
                  </>
                ) : (
                  <>
                    <Plus size={16} />
                    <span>Join Group</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Group Feed */}
          <div className="max-w-2xl mx-auto space-y-4 mt-6">
            <CreatePostBox onPostCreated={onPostCreated} />
            {posts.slice(0, 3).map(post => (
              <PostCard
                key={post.id}
                post={post}
                onUpdatePost={onUpdatePost}
                onDeletePost={onDeletePost}
                onViewProfile={onViewProfile}
              />
            ))}
          </div>
        </div>
      ) : (
        /* Groups Directory Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {groups.map(group => (
            <div
              key={group.id}
              className="bg-white dark:bg-[#242526] rounded-2xl overflow-hidden shadow-fb border border-gray-100 dark:border-transparent flex flex-col justify-between hover:shadow-fb-lg transition-shadow"
            >
              <div>
                <div
                  className="h-44 w-full cursor-pointer overflow-hidden"
                  onClick={() => setSelectedGroupId(group.id)}
                >
                  <img
                    src={group.coverImage}
                    alt={group.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3
                    onClick={() => setSelectedGroupId(group.id)}
                    className="font-bold text-lg text-gray-900 dark:text-gray-100 cursor-pointer hover:underline"
                  >
                    {group.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                    {group.privacy === 'Public' ? <Globe size={13} /> : <Lock size={13} />}
                    <span>{group.privacy} Group</span>
                    <span>•</span>
                    <span>{group.membersCount.toLocaleString()} members</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
                    {group.description}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedGroupId(group.id)}
                  className="flex-1 py-2 bg-gray-100 dark:bg-[#3A3B3C] hover:bg-gray-200 dark:hover:bg-[#4E4F50] text-gray-800 dark:text-gray-200 rounded-xl text-xs font-semibold transition-colors"
                >
                  View Group
                </button>
                <button
                  type="button"
                  onClick={() => toggleJoin(group.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    group.isJoined
                      ? 'bg-blue-50 dark:bg-fb-blue/20 text-fb-blue'
                      : 'bg-fb-blue text-white hover:bg-fb-blue-hover'
                  }`}
                >
                  {group.isJoined ? (
                    <>
                      <Check size={14} />
                      <span>Joined</span>
                    </>
                  ) : (
                    <span>Join</span>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
