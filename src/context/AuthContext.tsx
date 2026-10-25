import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { mockUsers, CURRENT_USER_DEFAULT } from '../data/mockUsers';

interface AuthContextType {
  currentUser: User;
  users: User[];
  switchUser: (userId: string) => void;
  updateProfile: (updatedData: Partial<User>) => void;
  friendRequests: { [userId: string]: 'pending' | 'accepted' | 'declined' | 'none' };
  sendFriendRequest: (userId: string) => void;
  acceptFriendRequest: (userId: string) => void;
  declineFriendRequest: (userId: string) => void;
  getUserById: (userId: string) => User | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('fb_users');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return mockUsers;
  });

  const [currentUserId, setCurrentUserId] = useState<string>(() => {
    return localStorage.getItem('fb_current_user_id') || CURRENT_USER_DEFAULT.id;
  });

  const [friendRequests, setFriendRequests] = useState<{ [userId: string]: 'pending' | 'accepted' | 'declined' | 'none' }>(() => {
    const saved = localStorage.getItem('fb_friend_requests');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return {
      user_6: 'pending', // Alex sent request
    };
  });

  useEffect(() => {
    localStorage.setItem('fb_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('fb_current_user_id', currentUserId);
  }, [currentUserId]);

  useEffect(() => {
    localStorage.setItem('fb_friend_requests', JSON.stringify(friendRequests));
  }, [friendRequests]);

  const currentUser = users.find(u => u.id === currentUserId) || users[0] || CURRENT_USER_DEFAULT;

  const switchUser = (userId: string) => {
    const target = users.find(u => u.id === userId);
    if (target) {
      setCurrentUserId(userId);
    }
  };

  const updateProfile = (updatedData: Partial<User>) => {
    setUsers(prev =>
      prev.map(u => (u.id === currentUser.id ? { ...u, ...updatedData } : u))
    );
  };

  const sendFriendRequest = (userId: string) => {
    setFriendRequests(prev => ({ ...prev, [userId]: 'pending' }));
  };

  const acceptFriendRequest = (userId: string) => {
    setFriendRequests(prev => ({ ...prev, [userId]: 'accepted' }));
    setUsers(prev =>
      prev.map(u => {
        if (u.id === currentUser.id) return { ...u, friendsCount: u.friendsCount + 1 };
        if (u.id === userId) return { ...u, friendsCount: u.friendsCount + 1 };
        return u;
      })
    );
  };

  const declineFriendRequest = (userId: string) => {
    setFriendRequests(prev => ({ ...prev, [userId]: 'declined' }));
  };

  const getUserById = (userId: string) => users.find(u => u.id === userId);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        switchUser,
        updateProfile,
        friendRequests,
        sendFriendRequest,
        acceptFriendRequest,
        declineFriendRequest,
        getUserById,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
