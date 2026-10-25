import React, { useState, useEffect, useRef } from 'react';
import { Story } from '../../types';
import { Avatar } from '../common/Avatar';
import { useChat } from '../../context/ChatContext';
import { X, ChevronLeft, ChevronRight, Send, Heart, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

interface StoryViewerModalProps {
  stories: Story[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_REACTIONS = ['❤️', '🔥', '😮', '😂', '👏', '😢'];

export const StoryViewerModal: React.FC<StoryViewerModalProps> = ({
  stories,
  initialIndex,
  isOpen,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [replyText, setReplyText] = useState('');
  const { sendMessage } = useChat();

  const currentStory = stories[currentIndex] || stories[0];
  const timerRef = useRef<any>(null);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setProgress(0);
  }, [initialIndex, isOpen]);

  // Timer loop for story progress
  useEffect(() => {
    if (!isOpen || isPaused) return;

    const interval = 50; // update every 50ms
    const step = 100 / (5000 / interval); // 5 seconds duration

    timerRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          // Advance to next story or close if last
          if (currentIndex < stories.length - 1) {
            setCurrentIndex(c => c + 1);
            return 0;
          } else {
            onClose();
            return 100;
          }
        }
        return prev + step;
      });
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, isPaused, currentIndex, stories.length, onClose]);

  if (!isOpen || !currentStory) return null;

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(c => c + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(c => c - 1);
      setProgress(0);
    }
  };

  const handleReaction = (emoji: string) => {
    confetti({
      particleCount: 25,
      spread: 70,
      origin: { y: 0.7 },
    });
    sendMessage(currentStory.userId, `Reacted ${emoji} to your story!`);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    sendMessage(currentStory.userId, `Replied to your story: "${replyText}"`);
    setReplyText('');
    handleNext();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 select-none"
      onMouseDown={() => setIsPaused(true)}
      onMouseUp={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
      >
        <X size={24} />
      </button>

      {/* Navigation chevrons */}
      {currentIndex > 0 && (
        <button
          type="button"
          onClick={e => {
            e.stopPropagation();
            handlePrev();
          }}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white/10 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
        >
          <ChevronLeft size={28} />
        </button>
      )}

      {currentIndex < stories.length - 1 && (
        <button
          type="button"
          onClick={e => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white/10 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
        >
          <ChevronRight size={28} />
        </button>
      )}

      {/* Story Player Container */}
      <div className="relative w-full max-w-[420px] h-[85vh] max-h-[780px] bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between">
        {/* Progress Bars */}
        <div className="absolute top-3 left-3 right-3 z-30 flex gap-1.5">
          {stories.map((story, idx) => (
            <div key={story.id} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-75 ease-linear"
                style={{
                  width:
                    idx < currentIndex
                      ? '100%'
                      : idx === currentIndex
                      ? `${progress}%`
                      : '0%',
                }}
              />
            </div>
          ))}
        </div>

        {/* User Info Header */}
        <div className="absolute top-6 left-4 right-4 z-30 flex items-center gap-3">
          <Avatar src={currentStory.user.avatar} alt={currentStory.user.name} size="sm" />
          <div className="flex-1 min-w-0">
            <span className="font-semibold text-white text-sm truncate block drop-shadow">
              {currentStory.user.name}
            </span>
            <span className="text-white/70 text-xs block drop-shadow">
              {currentStory.timestamp}
            </span>
          </div>
        </div>

        {/* Story Content */}
        <div className="w-full h-full flex items-center justify-center relative">
          {currentStory.type === 'text' ? (
            <div
              className={`w-full h-full bg-gradient-to-br ${currentStory.bgGradient} flex items-center justify-center p-8 text-center`}
            >
              <p className="text-white font-bold text-2xl drop-shadow-md leading-relaxed whitespace-pre-wrap">
                {currentStory.text}
              </p>
            </div>
          ) : (
            <img
              src={currentStory.mediaUrl}
              alt="Story media"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Bottom Bar: Reply & Reactions */}
        <div className="absolute bottom-4 left-4 right-4 z-30 flex flex-col gap-2">
          {/* Reaction Emojis */}
          <div className="flex justify-center gap-2 pb-1">
            {QUICK_REACTIONS.map(emoji => (
              <button
                key={emoji}
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  handleReaction(emoji);
                }}
                className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur text-xl flex items-center justify-center transform hover:scale-125 transition-transform"
              >
                {emoji}
              </button>
            ))}
          </div>

          {/* Reply Form */}
          <form
            onSubmit={handleSendReply}
            onClick={e => e.stopPropagation()}
            className="flex items-center gap-2 bg-black/50 backdrop-blur-md rounded-full px-4 py-2 border border-white/20"
          >
            <input
              type="text"
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
              placeholder={`Reply to ${currentStory.user.name.split(' ')[0]}...`}
              className="flex-1 bg-transparent text-sm text-white focus:outline-none placeholder-white/60"
            />
            <button
              type="submit"
              disabled={!replyText.trim()}
              className="text-white hover:text-fb-blue disabled:opacity-40"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
