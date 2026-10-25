import React, { createContext, useContext, useState, useEffect } from 'react';
import { Message, User } from '../types';
import { useAuth } from './AuthContext';

export interface ChatWindow {
  userId: string;
  isMinimized: boolean;
}

interface ChatContextType {
  openChatWindows: ChatWindow[];
  openChat: (userId: string) => void;
  closeChat: (userId: string) => void;
  toggleMinimize: (userId: string) => void;
  getMessages: (partnerId: string) => Message[];
  sendMessage: (partnerId: string, content: string, image?: string) => void;
  isTyping: (partnerId: string) => boolean;
  totalUnreadCount: number;
  activeFullChatUser: User | null;
  setActiveFullChatUser: (user: User | null) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Web Audio sound generator for authentic Facebook Messenger pop
const playMessengerSound = (type: 'sent' | 'received') => {
  try {
    const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'sent') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.08); // A5
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.2);
    }
  } catch (err) {
    // Audio might be blocked before first user gesture
  }
};

const getConvoKey = (u1: string, u2: string) => [u1, u2].sort().join('_');

const INITIAL_MESSAGES: { [convoKey: string]: Message[] } = {
  // Tanvir (user_2) and Mark Zuckerberg (user_1)
  'user_1_user_2': [
    {
      id: 'm_init_1',
      senderId: 'user_1',
      receiverId: 'user_2',
      content: 'Hey Tanvir! Saw your open-source full stack project earlier today. Great architecture!',
      timestamp: 'Yesterday at 4:30 PM',
      status: 'seen',
    },
    {
      id: 'm_init_2',
      senderId: 'user_2',
      receiverId: 'user_1',
      content: 'Thanks Mark! Really appreciate your feedback. Looking forward to testing out your new AI features as well.',
      timestamp: 'Yesterday at 4:32 PM',
      status: 'seen',
    },
    {
      id: 'm_init_3',
      senderId: 'user_1',
      receiverId: 'user_2',
      content: 'Let me know if you want early access API keys to test multimodal video inference.',
      timestamp: 'Yesterday at 4:35 PM',
      status: 'seen',
    }
  ],
  // Tanvir (user_2) and Sarah (user_3)
  'user_2_user_3': [
    {
      id: 'm_init_4',
      senderId: 'user_3',
      receiverId: 'user_2',
      content: 'Hi Tanvir! Are you free for a quick 10-min design review on the new mobile components?',
      timestamp: '10:45 AM',
      status: 'seen',
    },
    {
      id: 'm_init_5',
      senderId: 'user_2',
      receiverId: 'user_3',
      content: 'Sure Sarah! Send over the Figma links or screenshots whenever ready.',
      timestamp: '10:50 AM',
      status: 'seen',
    },
    {
      id: 'm_init_6',
      senderId: 'user_3',
      receiverId: 'user_2',
      content: 'Awesome, here is the preview!',
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&auto=format&fit=crop&q=80',
      timestamp: '11:02 AM',
      status: 'seen',
    }
  ],
  // Tanvir (user_2) and Nusrat (user_5)
  'user_2_user_5': [
    {
      id: 'm_init_7',
      senderId: 'user_5',
      receiverId: 'user_2',
      content: 'Hey! Loved the photos from your tech summit. Let’s collaborate on a documentary reel sometime soon.',
      timestamp: '2 hours ago',
      status: 'delivered',
    }
  ]
};

const BOT_REPLIES = [
  "That sounds fantastic! 🚀",
  "Totally agree with you on that.",
  "Let's catch up and discuss more details soon!",
  "Haha yes, exactly! 😂",
  "Check this out when you have a moment.",
  "Got it, thanks for letting me know! 👍",
  "Working on that right now, will keep you updated.",
  "Sounds like a plan! Let's do it. 💯",
  "Just checked the feed, looks amazing!"
];

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, users } = useAuth();
  
  const [messages, setMessages] = useState<{ [convoKey: string]: Message[] }>(() => {
    const saved = localStorage.getItem('fb_messages');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_MESSAGES;
  });

  const [openChatWindows, setOpenChatWindows] = useState<ChatWindow[]>([]);
  const [typingUsers, setTypingUsers] = useState<{ [userId: string]: boolean }>({});
  const [activeFullChatUser, setActiveFullChatUser] = useState<User | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('fb_messages', JSON.stringify(messages));
  }, [messages]);

  // Open docked chat window
  const openChat = (userId: string) => {
    if (userId === currentUser.id) return;
    setOpenChatWindows(prev => {
      const existing = prev.find(w => w.userId === userId);
      if (existing) {
        // If minimized, restore it
        return prev.map(w => (w.userId === userId ? { ...w, isMinimized: false } : w));
      }
      // Keep max 3 floating chats open, add new one to the front
      const updated = [{ userId, isMinimized: false }, ...prev.filter(w => w.userId !== userId)];
      return updated.slice(0, 3);
    });
  };

  const closeChat = (userId: string) => {
    setOpenChatWindows(prev => prev.filter(w => w.userId !== userId));
  };

  const toggleMinimize = (userId: string) => {
    setOpenChatWindows(prev =>
      prev.map(w => (w.userId === userId ? { ...w, isMinimized: !w.isMinimized } : w))
    );
  };

  const getMessages = (partnerId: string): Message[] => {
    const key = getConvoKey(currentUser.id, partnerId);
    return messages[key] || [];
  };

  const isTyping = (partnerId: string) => !!typingUsers[partnerId];

  const sendMessage = (partnerId: string, content: string, image?: string) => {
    if (!content.trim() && !image) return;

    const key = getConvoKey(currentUser.id, partnerId);
    const newMsg: Message = {
      id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      senderId: currentUser.id,
      receiverId: partnerId,
      content,
      image,
      timestamp: 'Just now',
      status: 'delivered',
    };

    setMessages(prev => ({
      ...prev,
      [key]: [...(prev[key] || []), newMsg],
    }));

    playMessengerSound('sent');

    // Simulate smart interactive reply from partner after 1.5 - 2.5s
    const partner = users.find(u => u.id === partnerId);
    if (partner) {
      setTimeout(() => {
        setTypingUsers(prev => ({ ...prev, [partnerId]: true }));
      }, 700);

      setTimeout(() => {
        setTypingUsers(prev => ({ ...prev, [partnerId]: false }));
        const randomReply = BOT_REPLIES[Math.floor(Math.random() * BOT_REPLIES.length)];
        const replyMsg: Message = {
          id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
          senderId: partnerId,
          receiverId: currentUser.id,
          content: randomReply,
          timestamp: 'Just now',
          status: 'delivered',
        };

        setMessages(prev => ({
          ...prev,
          [key]: [...(prev[key] || []), replyMsg],
        }));

        playMessengerSound('received');
      }, 2300);
    }
  };

  // Calculate unread count
  const totalUnreadCount = 2; // initial badge count

  return (
    <ChatContext.Provider
      value={{
        openChatWindows,
        openChat,
        closeChat,
        toggleMinimize,
        getMessages,
        sendMessage,
        isTyping,
        totalUnreadCount,
        activeFullChatUser,
        setActiveFullChatUser,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error('useChat must be used within ChatProvider');
  return context;
};
