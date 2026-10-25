import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useChat } from '../../context/ChatContext';
import { Avatar } from '../common/Avatar';
import {
  Search,
  Phone,
  Video,
  Info,
  Send,
  ThumbsUp,
  Image as ImageIcon,
  Smile,
  CheckCircle,
  MoreVertical,
} from 'lucide-react';

const COMMON_EMOJIS = ['😊', '😂', '🔥', '❤️', '👍', '🎉', '👏', '😍', '🙌'];

export const FullMessenger: React.FC = () => {
  const { users, currentUser } = useAuth();
  const { getMessages, sendMessage, isTyping } = useChat();

  const friends = users.filter(u => u.id !== currentUser.id);
  const [selectedPartnerId, setSelectedPartnerId] = useState<string>(friends[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [inputText, setInputText] = useState('');
  const [showRightSidebar, setShowRightSidebar] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const selectedPartner = users.find(u => u.id === selectedPartnerId) || friends[0];
  const messages = selectedPartner ? getMessages(selectedPartner.id) : [];
  const partnerIsTyping = selectedPartner ? isTyping(selectedPartner.id) : false;

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, partnerIsTyping, selectedPartnerId]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || !selectedPartner) return;
    sendMessage(selectedPartner.id, inputText.trim());
    setInputText('');
    setShowEmojiPicker(false);
  };

  const handleSendThumbsUp = () => {
    if (selectedPartner) {
      sendMessage(selectedPartner.id, '👍');
    }
  };

  const handleImageSend = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedPartner) {
      const reader = new FileReader();
      reader.onload = ev => {
        sendMessage(selectedPartner.id, '', ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredFriends = friends.filter(f =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-56px)] bg-white dark:bg-[#18191A] overflow-hidden">
      {/* Column 1: Conversations List */}
      <div className="w-80 sm:w-96 border-r border-gray-200 dark:border-gray-800 flex flex-col bg-white dark:bg-[#242526]">
        {/* Header */}
        <div className="p-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Chats</h2>
        </div>

        {/* Search */}
        <div className="px-4 pb-2">
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-[#3A3B3C] rounded-full px-3 py-2 text-sm text-gray-500">
            <Search size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search Messenger"
              className="w-full bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none text-sm"
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-2 space-y-1">
          {filteredFriends.map(friend => {
            const isSelected = friend.id === selectedPartnerId;
            const msgs = getMessages(friend.id);
            const lastMsg = msgs[msgs.length - 1];

            return (
              <div
                key={friend.id}
                onClick={() => setSelectedPartnerId(friend.id)}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-blue-50 dark:bg-[#3A3B3C]'
                    : 'hover:bg-gray-100 dark:hover:bg-[#3A3B3C]/50'
                }`}
              >
                <Avatar src={friend.avatar} alt={friend.name} size="lg" online={friend.online} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-gray-900 dark:text-gray-100 truncate">
                      {friend.name}
                    </span>
                    <span className="text-xs text-gray-400">
                      {lastMsg ? lastMsg.timestamp : ''}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                    {lastMsg
                      ? lastMsg.senderId === currentUser.id
                        ? `You: ${lastMsg.content || 'Sent a photo'}`
                        : lastMsg.content || 'Sent a photo'
                      : 'Say hi! 👋'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Column 2: Main Chat Window */}
      {selectedPartner ? (
        <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-[#18191A]">
          {/* Chat Header */}
          <div className="h-16 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 bg-white dark:bg-[#242526]">
            <div className="flex items-center gap-3">
              <Avatar
                src={selectedPartner.avatar}
                alt={selectedPartner.name}
                size="md"
                online={selectedPartner.online}
              />
              <div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base">
                  {selectedPartner.name}
                </h3>
                <span className="text-xs text-green-500 font-medium">
                  {selectedPartner.online ? 'Active now' : 'Active recently'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-fb-blue">
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-full transition-colors">
                <Phone size={20} />
              </button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-full transition-colors">
                <Video size={20} />
              </button>
              <button
                onClick={() => setShowRightSidebar(!showRightSidebar)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-full transition-colors text-gray-600 dark:text-gray-300"
              >
                <Info size={20} />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <div className="text-center py-6">
              <Avatar
                src={selectedPartner.avatar}
                alt={selectedPartner.name}
                size="2xl"
                className="mx-auto mb-3"
              />
              <h4 className="font-bold text-xl text-gray-900 dark:text-gray-100">
                {selectedPartner.name}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-sm mx-auto">
                {selectedPartner.bio || `You're friends on Facebook`}
              </p>
            </div>

            {messages.map((msg, idx) => {
              const isMe = msg.senderId === currentUser.id;
              return (
                <div
                  key={msg.id || idx}
                  className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}
                >
                  {!isMe && (
                    <Avatar
                      src={selectedPartner.avatar}
                      alt={selectedPartner.name}
                      size="xs"
                      className="mb-1"
                    />
                  )}
                  <div
                    className={`max-w-[65%] rounded-2xl px-4 py-2 text-[15px] leading-relaxed break-words ${
                      msg.content === '👍'
                        ? 'bg-transparent text-4xl'
                        : isMe
                        ? 'bg-fb-blue text-white rounded-br-none shadow-sm'
                        : 'bg-gray-100 dark:bg-[#3A3B3C] text-gray-900 dark:text-gray-100 rounded-bl-none'
                    }`}
                  >
                    {msg.content && <span>{msg.content}</span>}
                    {msg.image && (
                      <img
                        src={msg.image}
                        alt="attachment"
                        className="rounded-xl mt-2 max-h-60 object-cover"
                      />
                    )}
                  </div>
                </div>
              );
            })}

            {partnerIsTyping && (
              <div className="flex items-center gap-2 text-gray-500">
                <Avatar src={selectedPartner.avatar} alt={selectedPartner.name} size="xs" />
                <div className="bg-gray-100 dark:bg-[#3A3B3C] rounded-full px-3 py-1 flex items-center gap-1">
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Emoji Picker Popup */}
          {showEmojiPicker && (
            <div className="p-2 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-[#242526] flex gap-3 justify-center">
              {COMMON_EMOJIS.map(emoji => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => {
                    setInputText(prev => prev + emoji);
                    setShowEmojiPicker(false);
                  }}
                  className="text-2xl hover:scale-125 transition-transform"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}

          {/* Chat Composer */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#242526]">
            <form onSubmit={handleSend} className="flex items-center gap-2">
              <label className="p-2 text-fb-blue hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-full cursor-pointer transition-colors">
                <ImageIcon size={22} />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageSend}
                />
              </label>

              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="p-2 text-fb-blue hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-full transition-colors"
              >
                <Smile size={22} />
              </button>

              <input
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder="Aa"
                className="flex-1 bg-gray-100 dark:bg-[#3A3B3C] rounded-full px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-fb-blue"
              />

              {inputText.trim() ? (
                <button
                  type="submit"
                  className="p-2 text-fb-blue hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-full transition-colors"
                >
                  <Send size={22} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSendThumbsUp}
                  className="p-2 text-fb-blue hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-full transition-colors"
                  title="Send a Like"
                >
                  <ThumbsUp size={22} fill="#1877F2" />
                </button>
              )}
            </form>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Select a chat to start messaging
        </div>
      )}

      {/* Column 3: Contact Details Panel */}
      {showRightSidebar && selectedPartner && (
        <div className="w-72 sm:w-80 border-l border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-[#242526] hidden lg:flex flex-col items-center">
          <Avatar src={selectedPartner.avatar} alt={selectedPartner.name} size="xl" className="mt-4 mb-2" />
          <h4 className="font-bold text-gray-900 dark:text-gray-100 text-lg">
            {selectedPartner.name}
          </h4>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {selectedPartner.online ? 'Active now' : 'Offline'}
          </span>

          <div className="w-full mt-6 space-y-4">
            <div className="border-t border-gray-100 dark:border-gray-800 pt-3">
              <h5 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                About
              </h5>
              <p className="text-xs text-gray-700 dark:text-gray-300">
                {selectedPartner.bio || 'No bio provided'}
              </p>
              {selectedPartner.livesIn && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Lives in {selectedPartner.livesIn}
                </p>
              )}
            </div>

            <div className="border-t border-gray-100 dark:border-gray-800 pt-3">
              <h5 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                Shared Photos
              </h5>
              <div className="grid grid-cols-3 gap-1.5">
                <img
                  src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=200&auto=format&fit=crop&q=80"
                  alt="shared"
                  className="w-full h-16 object-cover rounded-lg"
                />
                <img
                  src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=200&auto=format&fit=crop&q=80"
                  alt="shared"
                  className="w-full h-16 object-cover rounded-lg"
                />
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=200&auto=format&fit=crop&q=80"
                  alt="shared"
                  className="w-full h-16 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
