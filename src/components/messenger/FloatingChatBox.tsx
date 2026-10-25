import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useChat } from '../../context/ChatContext';
import { Avatar } from '../common/Avatar';
import {
  X,
  Minus,
  Maximize2,
  Phone,
  Video,
  Send,
  ThumbsUp,
  Image as ImageIcon,
  Smile,
  AlertCircle,
} from 'lucide-react';

interface FloatingChatBoxProps {
  partnerId: string;
  isMinimized: boolean;
  rightOffset: number; // in pixels
}

const COMMON_EMOJIS = ['😊', '😂', '🔥', '❤️', '👍', '🎉', '👏', '😍', '🙌'];

export const FloatingChatBox: React.FC<FloatingChatBoxProps> = ({
  partnerId,
  isMinimized,
  rightOffset,
}) => {
  const { getUserById, currentUser } = useAuth();
  const { closeChat, toggleMinimize, getMessages, sendMessage, isTyping } = useChat();

  const partner = getUserById(partnerId);
  const messages = getMessages(partnerId);
  const partnerIsTyping = isTyping(partnerId);

  const [inputText, setInputText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [callNotification, setCallNotification] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!isMinimized) {
      scrollToBottom();
    }
  }, [messages.length, partnerIsTyping, isMinimized]);

  if (!partner) return null;

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(partnerId, inputText.trim());
    setInputText('');
    setShowEmojiPicker(false);
  };

  const handleSendThumbsUp = () => {
    sendMessage(partnerId, '👍');
  };

  const handleImageSend = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => {
        sendMessage(partnerId, '', ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCall = (type: 'audio' | 'video') => {
    setCallNotification(`Calling ${partner.name}...`);
    setTimeout(() => {
      setCallNotification(`${partner.name} is currently unavailable.`);
      setTimeout(() => setCallNotification(null), 2500);
    }, 2000);
  };

  // If minimized, display floating circular chat head
  if (isMinimized) {
    return (
      <div
        style={{ right: `${rightOffset}px` }}
        className="fixed bottom-3 z-50 transition-all duration-200"
      >
        <div
          onClick={() => toggleMinimize(partnerId)}
          className="relative cursor-pointer group"
          title={`Chat with ${partner.name}`}
        >
          <Avatar
            src={partner.avatar}
            alt={partner.name}
            size="lg"
            online={partner.online}
            className="shadow-fb-chat border-2 border-white dark:border-[#242526] hover:scale-105 transition-transform"
          />
          <button
            type="button"
            onClick={e => {
              e.stopPropagation();
              closeChat(partnerId);
            }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-gray-700 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 text-xs shadow"
          >
            ✕
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ right: `${rightOffset}px` }}
      className="fixed bottom-0 z-50 w-80 sm:w-84 h-[440px] bg-white dark:bg-[#242526] rounded-t-xl shadow-fb-chat border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-200"
    >
      {/* Chat Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-white dark:bg-[#242526] border-b border-gray-100 dark:border-gray-700 shadow-sm">
        <div className="flex items-center gap-2 cursor-pointer flex-1 min-w-0" onClick={() => toggleMinimize(partnerId)}>
          <Avatar src={partner.avatar} alt={partner.name} size="sm" online={partner.online} />
          <div className="flex-1 min-w-0">
            <span className="font-semibold text-sm text-gray-900 dark:text-gray-100 truncate block">
              {partner.name}
            </span>
            <span className="text-[11px] text-gray-500 dark:text-gray-400 block truncate leading-tight">
              {partner.online ? 'Active now' : 'Active 2h ago'}
            </span>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-0.5 text-fb-blue">
          <button
            type="button"
            onClick={() => handleCall('audio')}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-full transition-colors"
            title="Start a phone call"
          >
            <Phone size={17} />
          </button>
          <button
            type="button"
            onClick={() => handleCall('video')}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-full transition-colors"
            title="Start a video call"
          >
            <Video size={17} />
          </button>
          <button
            type="button"
            onClick={() => toggleMinimize(partnerId)}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] text-gray-500 dark:text-gray-400 rounded-full transition-colors"
            title="Minimize"
          >
            <Minus size={17} />
          </button>
          <button
            type="button"
            onClick={() => closeChat(partnerId)}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] text-gray-500 dark:text-gray-400 rounded-full transition-colors"
            title="Close chat"
          >
            <X size={17} />
          </button>
        </div>
      </div>

      {/* Call notification banner */}
      {callNotification && (
        <div className="bg-fb-blue text-white text-xs px-3 py-1.5 flex items-center justify-between animate-pulse">
          <span>{callNotification}</span>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm bg-gray-50/50 dark:bg-[#18191A]/50">
        {/* Intro */}
        <div className="text-center py-4">
          <Avatar src={partner.avatar} alt={partner.name} size="xl" className="mx-auto mb-2" />
          <h4 className="font-bold text-gray-900 dark:text-gray-100">{partner.name}</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400">{partner.bio || `You're friends on Facebook`}</p>
        </div>

        {/* Message items */}
        {messages.map((msg, idx) => {
          const isMe = msg.senderId === currentUser.id;
          return (
            <div
              key={msg.id || idx}
              className={`flex items-end gap-1.5 ${isMe ? 'justify-end' : 'justify-start'}`}
            >
              {!isMe && (
                <Avatar src={partner.avatar} alt={partner.name} size="xs" className="mb-0.5" />
              )}
              <div
                className={`max-w-[75%] rounded-2xl px-3 py-1.5 text-[14px] leading-snug break-words ${
                  msg.content === '👍'
                    ? 'bg-transparent text-3xl'
                    : isMe
                    ? 'bg-fb-blue text-white rounded-br-none shadow-sm'
                    : 'bg-gray-200 dark:bg-[#3A3B3C] text-gray-900 dark:text-gray-100 rounded-bl-none'
                }`}
              >
                {msg.content && <span>{msg.content}</span>}
                {msg.image && (
                  <img
                    src={msg.image}
                    alt="attachment"
                    className="rounded-xl mt-1 max-h-40 object-cover"
                  />
                )}
              </div>
            </div>
          );
        })}

        {/* Partner Typing Indicator */}
        {partnerIsTyping && (
          <div className="flex items-center gap-1.5 text-gray-500">
            <Avatar src={partner.avatar} alt={partner.name} size="xs" />
            <div className="bg-gray-200 dark:bg-[#3A3B3C] rounded-full px-3 py-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Emoji Quick Picker */}
      {showEmojiPicker && (
        <div className="p-2 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-[#242526] flex gap-2 justify-center">
          {COMMON_EMOJIS.map(emoji => (
            <button
              key={emoji}
              type="button"
              onClick={() => {
                setInputText(prev => prev + emoji);
                setShowEmojiPicker(false);
              }}
              className="text-lg hover:scale-125 transition-transform"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      {/* Chat Composer */}
      <div className="p-2 bg-white dark:bg-[#242526] border-t border-gray-100 dark:border-gray-700">
        <form onSubmit={handleSend} className="flex items-center gap-1">
          {/* Add photo */}
          <label className="p-1.5 text-fb-blue hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-full cursor-pointer transition-colors">
            <ImageIcon size={19} />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageSend}
            />
          </label>

          {/* Emoji */}
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-1.5 text-fb-blue hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-full transition-colors"
          >
            <Smile size={19} />
          </button>

          {/* Input text */}
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder="Aa"
            className="flex-1 bg-gray-100 dark:bg-[#3A3B3C] rounded-full px-3.5 py-1.5 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-fb-blue"
          />

          {/* Send or Thumbs Up */}
          {inputText.trim() ? (
            <button
              type="submit"
              className="p-1.5 text-fb-blue hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-full transition-colors"
            >
              <Send size={19} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSendThumbsUp}
              className="p-1.5 text-fb-blue hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-full transition-colors text-lg"
              title="Send a Like"
            >
              <ThumbsUp size={19} fill="#1877F2" />
            </button>
          )}
        </form>
      </div>
    </div>
  );
};
