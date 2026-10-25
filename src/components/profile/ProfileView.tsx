import React, { useState } from 'react';
import { User, Post } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useChat } from '../../context/ChatContext';
import { Avatar } from '../common/Avatar';
import { PostCard } from '../feed/PostCard';
import { CreatePostBox } from '../feed/CreatePostBox';
import { EditProfileModal } from './EditProfileModal';
import {
  Camera,
  Plus,
  Edit2,
  UserPlus,
  UserCheck,
  MessageCircle,
  Briefcase,
  GraduationCap,
  Home,
  MapPin,
  Heart,
  Calendar,
} from 'lucide-react';

interface ProfileViewProps {
  userId: string;
  posts: Post[];
  onUpdatePost: (post: Post) => void;
  onDeletePost: (postId: string) => void;
  onPostCreated: (post: Post) => void;
  onViewProfile: (userId: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  userId,
  posts,
  onUpdatePost,
  onDeletePost,
  onPostCreated,
  onViewProfile,
}) => {
  const { currentUser, getUserById, users, friendRequests, sendFriendRequest, acceptFriendRequest } = useAuth();
  const { openChat } = useChat();

  const [activeTab, setActiveTab] = useState<'posts' | 'about' | 'friends' | 'photos'>('posts');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const profileUser = getUserById(userId) || currentUser;
  const isMe = profileUser.id === currentUser.id;
  const friendStatus = friendRequests[profileUser.id] || 'none';

  const userPosts = posts.filter(p => p.userId === profileUser.id);
  const otherUsers = users.filter(u => u.id !== profileUser.id);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#18191A] pb-12">
      {/* Cover & Top Section Card */}
      <div className="bg-white dark:bg-[#242526] shadow-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto">
          {/* Cover Photo */}
          <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-b-xl overflow-hidden bg-neutral-800">
            <img
              src={profileUser.coverPhoto}
              alt="cover"
              className="w-full h-full object-cover"
            />
            {isMe && (
              <button
                type="button"
                onClick={() => setIsEditModalOpen(true)}
                className="absolute right-4 bottom-4 flex items-center gap-2 px-3.5 py-1.5 bg-white/90 dark:bg-black/80 hover:bg-white dark:hover:bg-black rounded-lg text-xs font-semibold shadow transition-colors"
              >
                <Camera size={16} />
                <span>Edit cover photo</span>
              </button>
            )}
          </div>

          {/* User Info Header Bar */}
          <div className="px-6 pb-4">
            <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-4 -mt-16 sm:-mt-20 relative z-10 pb-4 border-b border-gray-200 dark:border-gray-700">
              {/* Avatar + Name Details */}
              <div className="flex flex-col md:flex-row items-center md:items-end gap-4 text-center md:text-left">
                <div className="relative">
                  <Avatar
                    src={profileUser.avatar}
                    alt={profileUser.name}
                    size="2xl"
                    className="shadow-md"
                  />
                  {isMe && (
                    <button
                      type="button"
                      onClick={() => setIsEditModalOpen(true)}
                      className="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-gray-200 dark:bg-[#3A3B3C] hover:bg-gray-300 dark:hover:bg-[#4E4F50] text-gray-800 dark:text-gray-100 flex items-center justify-center shadow"
                    >
                      <Camera size={18} />
                    </button>
                  )}
                </div>

                <div className="mb-2">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center justify-center md:justify-start gap-2">
                    <span>{profileUser.name}</span>
                    {profileUser.id === 'user_1' && (
                      <span className="w-5 h-5 bg-fb-blue text-white rounded-full flex items-center justify-center text-xs">
                        ✓
                      </span>
                    )}
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    {profileUser.friendsCount.toLocaleString()} friends
                  </p>
                  {/* Mutual friends avatars */}
                  <div className="flex justify-center md:justify-start -space-x-1.5 mt-2">
                    {otherUsers.slice(0, 5).map(u => (
                      <img
                        key={u.id}
                        src={u.avatar}
                        alt={u.name}
                        className="w-7 h-7 rounded-full border-2 border-white dark:border-[#242526] object-cover"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {isMe ? (
                  <>
                    <button
                      type="button"
                      className="flex items-center gap-1.5 px-4 py-2 bg-fb-blue hover:bg-fb-blue-hover text-white rounded-lg text-sm font-semibold transition-colors"
                    >
                      <Plus size={16} />
                      <span>Add to story</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditModalOpen(true)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-gray-200 dark:bg-[#3A3B3C] hover:bg-gray-300 dark:hover:bg-[#4E4F50] text-gray-800 dark:text-gray-200 rounded-lg text-sm font-semibold transition-colors"
                    >
                      <Edit2 size={16} />
                      <span>Edit profile</span>
                    </button>
                  </>
                ) : (
                  <>
                    {friendStatus === 'accepted' ? (
                      <button
                        type="button"
                        className="flex items-center gap-1.5 px-4 py-2 bg-gray-200 dark:bg-[#3A3B3C] text-gray-800 dark:text-gray-200 rounded-lg text-sm font-semibold"
                      >
                        <UserCheck size={16} className="text-fb-blue" />
                        <span>Friends</span>
                      </button>
                    ) : friendStatus === 'pending' ? (
                      <button
                        type="button"
                        onClick={() => acceptFriendRequest(profileUser.id)}
                        className="flex items-center gap-1.5 px-4 py-2 bg-fb-blue hover:bg-fb-blue-hover text-white rounded-lg text-sm font-semibold"
                      >
                        <UserCheck size={16} />
                        <span>Confirm Request</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => sendFriendRequest(profileUser.id)}
                        className="flex items-center gap-1.5 px-4 py-2 bg-fb-blue hover:bg-fb-blue-hover text-white rounded-lg text-sm font-semibold"
                      >
                        <UserPlus size={16} />
                        <span>Add Friend</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => openChat(profileUser.id)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-gray-200 dark:bg-[#3A3B3C] hover:bg-gray-300 dark:hover:bg-[#4E4F50] text-gray-800 dark:text-gray-200 rounded-lg text-sm font-semibold transition-colors"
                    >
                      <MessageCircle size={16} />
                      <span>Message</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 pt-1 text-sm font-semibold overflow-x-auto">
              {(['posts', 'about', 'friends', 'photos'] as const).map(tab => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 capitalize transition-colors relative ${
                    activeTab === tab
                      ? 'text-fb-blue font-bold'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-lg'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-1 bg-fb-blue rounded-t" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Body Grid */}
      <div className="max-w-6xl mx-auto px-4 mt-4">
        {activeTab === 'posts' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Left Column (Intro / Photos / Friends) */}
            <div className="md:col-span-5 space-y-4">
              {/* Intro Card */}
              <div className="bg-white dark:bg-[#242526] p-4 rounded-xl shadow-fb border border-gray-100 dark:border-transparent space-y-3">
                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">Intro</h3>
                {profileUser.bio && (
                  <p className="text-sm text-gray-700 dark:text-gray-300 text-center py-1 border-b border-gray-100 dark:border-gray-700">
                    {profileUser.bio}
                  </p>
                )}

                <div className="space-y-2.5 text-sm text-gray-700 dark:text-gray-300">
                  {profileUser.work && (
                    <div className="flex items-center gap-3">
                      <Briefcase size={18} className="text-gray-400 flex-shrink-0" />
                      <span>{profileUser.work}</span>
                    </div>
                  )}
                  {profileUser.education && (
                    <div className="flex items-center gap-3">
                      <GraduationCap size={18} className="text-gray-400 flex-shrink-0" />
                      <span>{profileUser.education}</span>
                    </div>
                  )}
                  {profileUser.livesIn && (
                    <div className="flex items-center gap-3">
                      <Home size={18} className="text-gray-400 flex-shrink-0" />
                      <span>Lives in <span className="font-semibold">{profileUser.livesIn}</span></span>
                    </div>
                  )}
                  {profileUser.from && (
                    <div className="flex items-center gap-3">
                      <MapPin size={18} className="text-gray-400 flex-shrink-0" />
                      <span>From <span className="font-semibold">{profileUser.from}</span></span>
                    </div>
                  )}
                  {profileUser.relationship && (
                    <div className="flex items-center gap-3">
                      <Heart size={18} className="text-gray-400 flex-shrink-0" />
                      <span>{profileUser.relationship}</span>
                    </div>
                  )}
                  {profileUser.joinedDate && (
                    <div className="flex items-center gap-3">
                      <Calendar size={18} className="text-gray-400 flex-shrink-0" />
                      <span>Joined {profileUser.joinedDate}</span>
                    </div>
                  )}
                </div>

                {isMe && (
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(true)}
                    className="w-full py-2 bg-gray-200 dark:bg-[#3A3B3C] hover:bg-gray-300 dark:hover:bg-[#4E4F50] text-gray-800 dark:text-gray-200 font-semibold text-xs rounded-lg transition-colors mt-2"
                  >
                    Edit details
                  </button>
                )}
              </div>

              {/* Photos Preview Card */}
              <div className="bg-white dark:bg-[#242526] p-4 rounded-xl shadow-fb border border-gray-100 dark:border-transparent">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">Photos</h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab('photos')}
                    className="text-xs text-fb-blue hover:underline"
                  >
                    See all photos
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-1.5 rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&auto=format&fit=crop&q=80"
                    alt="preview"
                    className="w-full h-24 object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&auto=format&fit=crop&q=80"
                    alt="preview"
                    className="w-full h-24 object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=300&auto=format&fit=crop&q=80"
                    alt="preview"
                    className="w-full h-24 object-cover"
                  />
                </div>
              </div>

              {/* Friends Preview Card */}
              <div className="bg-white dark:bg-[#242526] p-4 rounded-xl shadow-fb border border-gray-100 dark:border-transparent">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">Friends</h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab('friends')}
                    className="text-xs text-fb-blue hover:underline"
                  >
                    See all friends
                  </button>
                </div>
                <p className="text-xs text-gray-500 mb-3">
                  {profileUser.friendsCount.toLocaleString()} friends
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {otherUsers.slice(0, 6).map(friend => (
                    <div
                      key={friend.id}
                      onClick={() => onViewProfile(friend.id)}
                      className="cursor-pointer group"
                    >
                      <img
                        src={friend.avatar}
                        alt={friend.name}
                        className="w-full h-24 object-cover rounded-lg group-hover:opacity-90 transition-opacity"
                      />
                      <span className="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate block mt-1">
                        {friend.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (Create Post + Feed) */}
            <div className="md:col-span-7 space-y-4">
              {isMe && <CreatePostBox onPostCreated={onPostCreated} />}

              {userPosts.length === 0 ? (
                <div className="bg-white dark:bg-[#242526] p-8 rounded-xl shadow-fb text-center text-gray-500">
                  No posts yet from {profileUser.name}
                </div>
              ) : (
                userPosts.map(post => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onUpdatePost={onUpdatePost}
                    onDeletePost={onDeletePost}
                    onViewProfile={onViewProfile}
                  />
                ))
              )}
            </div>
          </div>
        )}

        {/* About Tab */}
        {activeTab === 'about' && (
          <div className="bg-white dark:bg-[#242526] p-6 rounded-xl shadow-fb max-w-3xl mx-auto space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">About {profileUser.name}</h2>
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <p><strong>Bio:</strong> {profileUser.bio || 'None'}</p>
              <p><strong>Works at:</strong> {profileUser.work || 'Not specified'}</p>
              <p><strong>Education:</strong> {profileUser.education || 'Not specified'}</p>
              <p><strong>Lives in:</strong> {profileUser.livesIn || 'Not specified'}</p>
              <p><strong>Hometown:</strong> {profileUser.from || 'Not specified'}</p>
              <p><strong>Relationship:</strong> {profileUser.relationship || 'Not specified'}</p>
            </div>
          </div>
        )}

        {/* Friends Tab */}
        {activeTab === 'friends' && (
          <div className="bg-white dark:bg-[#242526] p-6 rounded-xl shadow-fb max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Friends ({profileUser.friendsCount.toLocaleString()})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {otherUsers.map(friend => (
                <div
                  key={friend.id}
                  className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-xl"
                >
                  <div
                    onClick={() => onViewProfile(friend.id)}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <Avatar src={friend.avatar} alt={friend.name} size="lg" online={friend.online} />
                    <div>
                      <span className="font-semibold text-sm text-gray-900 dark:text-gray-100 block hover:underline">
                        {friend.name}
                      </span>
                      <span className="text-xs text-gray-500">{friend.friendsCount} friends</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => openChat(friend.id)}
                    className="px-3 py-1.5 bg-gray-100 dark:bg-[#3A3B3C] hover:bg-gray-200 text-xs font-semibold rounded-lg"
                  >
                    Message
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Photos Tab */}
        {activeTab === 'photos' && (
          <div className="bg-white dark:bg-[#242526] p-6 rounded-xl shadow-fb max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Photos</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {[
                'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=500&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=500&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=80',
              ].map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`photo-${i}`}
                  className="w-full h-40 object-cover rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
};
