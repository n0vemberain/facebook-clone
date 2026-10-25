export type ReactionType = 'like' | 'love' | 'care' | 'haha' | 'wow' | 'sad' | 'angry';

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  coverPhoto: string;
  bio?: string;
  work?: string;
  education?: string;
  livesIn?: string;
  from?: string;
  relationship?: string;
  joinedDate?: string;
  friendsCount: number;
  online?: boolean;
}

export interface ReactionItem {
  userId: string;
  type: ReactionType;
  timestamp: number;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  user: User;
  content: string;
  image?: string;
  timestamp: string;
  likes: string[]; // userIds
  parentId?: string; // for nested replies
}

export interface Post {
  id: string;
  userId: string;
  user: User;
  content: string;
  images?: string[];
  video?: string;
  feeling?: {
    type: 'feeling' | 'activity';
    text: string;
    emoji: string;
  };
  privacy: 'public' | 'friends' | 'only_me';
  timestamp: string;
  reactions: ReactionItem[];
  userReaction?: ReactionType | null;
  comments: Comment[];
  sharesCount: number;
  isSaved?: boolean;
  groupId?: string;
  groupName?: string;
}

export interface Story {
  id: string;
  userId: string;
  user: User;
  type: 'image' | 'text';
  mediaUrl?: string;
  text?: string;
  bgGradient?: string;
  timestamp: string;
  isViewed?: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  image?: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'seen';
  reaction?: string;
}

export interface Conversation {
  id: string;
  participantIds: string[];
  participant: User;
  lastMessage: Message;
  unreadCount: number;
}

export interface Notification {
  id: string;
  userId: string;
  actor: User;
  type: 'like' | 'comment' | 'reaction' | 'friend_request' | 'post' | 'message';
  content: string;
  timestamp: string;
  isRead: boolean;
  targetId?: string; // postId or userId
}

export interface MarketplaceItem {
  id: string;
  title: string;
  price: number;
  location: string;
  category: string;
  description: string;
  image: string;
  seller: User;
  createdAt: string;
}

export interface Group {
  id: string;
  name: string;
  coverImage: string;
  avatar: string;
  privacy: 'Public' | 'Private';
  membersCount: number;
  description: string;
  isJoined?: boolean;
}

export type ActiveTab = 'feed' | 'watch' | 'marketplace' | 'groups' | 'gaming' | 'profile' | 'messages';
