import React, { useState, useEffect } from 'react';
import { ActiveTab, Post, Story, MarketplaceItem, Group, Notification } from './types';
import { useAuth } from './context/AuthContext';
import { useChat } from './context/ChatContext';

// Data
import { mockPosts } from './data/mockPosts';
import { mockStories } from './data/mockStories';
import { mockMarketplaceItems } from './data/mockMarketplace';
import { mockGroups } from './data/mockGroups';
import { mockNotifications } from './data/mockNotifications';

// Layout
import { Navbar } from './components/layout/Navbar';
import { LeftSidebar } from './components/layout/LeftSidebar';
import { RightSidebar } from './components/layout/RightSidebar';
import { MobileNav } from './components/layout/MobileNav';

// Views & Components
import { StoriesBar } from './components/feed/StoriesBar';
import { CreatePostBox } from './components/feed/CreatePostBox';
import { PostCard } from './components/feed/PostCard';
import { ProfileView } from './components/profile/ProfileView';
import { MarketplaceView } from './components/marketplace/MarketplaceView';
import { WatchView } from './components/watch/WatchView';
import { GroupsView } from './components/groups/GroupsView';
import { FullMessenger } from './components/messenger/FullMessenger';
import { FloatingChatBox } from './components/messenger/FloatingChatBox';
import { SearchModal } from './components/modals/SearchModal';

export const App: React.FC = () => {
  const { currentUser } = useAuth();
  const { openChatWindows } = useChat();

  const [activeTab, setActiveTab] = useState<ActiveTab>('feed');
  const [viewingProfileUserId, setViewingProfileUserId] = useState<string>(currentUser.id);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Posts State
  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('fb_posts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return mockPosts;
  });

  // Stories State
  const [stories, setStories] = useState<Story[]>(() => {
    const saved = localStorage.getItem('fb_stories');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return mockStories;
  });

  // Marketplace State
  const [marketplaceItems, setMarketplaceItems] = useState<MarketplaceItem[]>(() => {
    const saved = localStorage.getItem('fb_marketplace');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return mockMarketplaceItems;
  });

  // Groups State
  const [groups, setGroups] = useState<Group[]>(() => {
    const saved = localStorage.getItem('fb_groups');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return mockGroups;
  });

  // Notifications State
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem('fb_notifications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return mockNotifications;
  });

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('fb_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('fb_stories', JSON.stringify(stories));
  }, [stories]);

  useEffect(() => {
    localStorage.setItem('fb_marketplace', JSON.stringify(marketplaceItems));
  }, [marketplaceItems]);

  useEffect(() => {
    localStorage.setItem('fb_groups', JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    localStorage.setItem('fb_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Handlers
  const handlePostCreated = (newPost: Post) => {
    setPosts(prev => [newPost, ...prev]);
  };

  const handleUpdatePost = (updatedPost: Post) => {
    setPosts(prev => prev.map(p => (p.id === updatedPost.id ? updatedPost : p)));
  };

  const handleDeletePost = (postId: string) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
  };

  const handleAddStory = (newStory: Story) => {
    setStories(prev => [newStory, ...prev]);
  };

  const handleAddMarketplaceItem = (item: MarketplaceItem) => {
    setMarketplaceItems(prev => [item, ...prev]);
  };

  const handleViewProfile = (userId: string) => {
    setViewingProfileUserId(userId);
    setActiveTab('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleNotificationClick = (notif: Notification) => {
    setNotifications(prev =>
      prev.map(n => (n.id === notif.id ? { ...n, isRead: true } : n))
    );
    if (notif.type === 'friend_request' && notif.targetId) {
      handleViewProfile(notif.targetId);
    } else {
      setActiveTab('feed');
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] dark:bg-[#18191A] text-[#050505] dark:text-[#E4E6EB] transition-colors duration-150">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={tab => {
          if (tab === 'profile') {
            setViewingProfileUserId(currentUser.id);
          }
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        notifications={notifications}
        onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
        onNotificationClick={handleNotificationClick}
      />

      {/* Main Content Area */}
      {activeTab === 'feed' && (
        <div className="flex justify-between max-w-[1920px] mx-auto">
          {/* Left Sidebar */}
          <LeftSidebar
            activeTab={activeTab}
            onSelectTab={tab => {
              if (tab === 'profile') setViewingProfileUserId(currentUser.id);
              setActiveTab(tab);
            }}
          />

          {/* Center Column: Feed */}
          <main className="flex-1 max-w-[680px] mx-auto px-2 sm:px-4 py-4 pb-20 md:pb-8 min-w-0">
            {/* Stories */}
            <StoriesBar stories={stories} onAddStory={handleAddStory} />

            {/* Create Post Card */}
            <CreatePostBox onPostCreated={handlePostCreated} />

            {/* Posts Stream */}
            <div className="space-y-4">
              {posts.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  onUpdatePost={handleUpdatePost}
                  onDeletePost={handleDeletePost}
                  onViewProfile={handleViewProfile}
                />
              ))}
            </div>
          </main>

          {/* Right Sidebar: Contacts & Ads */}
          <RightSidebar />
        </div>
      )}

      {/* Profile Page View */}
      {activeTab === 'profile' && (
        <ProfileView
          userId={viewingProfileUserId}
          posts={posts}
          onUpdatePost={handleUpdatePost}
          onDeletePost={handleDeletePost}
          onPostCreated={handlePostCreated}
          onViewProfile={handleViewProfile}
        />
      )}

      {/* Marketplace View */}
      {activeTab === 'marketplace' && (
        <MarketplaceView
          items={marketplaceItems}
          onAddItem={handleAddMarketplaceItem}
        />
      )}

      {/* Watch View */}
      {activeTab === 'watch' && <WatchView />}

      {/* Groups View */}
      {activeTab === 'groups' && (
        <GroupsView
          groups={groups}
          posts={posts}
          onUpdatePost={handleUpdatePost}
          onDeletePost={handleDeletePost}
          onPostCreated={handlePostCreated}
          onViewProfile={handleViewProfile}
        />
      )}

      {/* Full Messenger View */}
      {activeTab === 'messages' && <FullMessenger />}

      {/* Floating Messenger Windows at Bottom-Right */}
      <div className="fixed bottom-0 right-4 z-50 flex items-end pointer-events-none">
        {openChatWindows.map((chat, idx) => (
          <div key={chat.userId} className="pointer-events-auto">
            <FloatingChatBox
              partnerId={chat.userId}
              isMinimized={chat.isMinimized}
              rightOffset={16 + idx * (chat.isMinimized ? 72 : 336)}
            />
          </div>
        ))}
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav
        activeTab={activeTab}
        onSelectTab={tab => {
          if (tab === 'profile') setViewingProfileUserId(currentUser.id);
          setActiveTab(tab);
        }}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        posts={posts}
        marketplaceItems={marketplaceItems}
        groups={groups}
        onSelectUser={handleViewProfile}
        onSelectTab={setActiveTab}
      />
    </div>
  );
};
