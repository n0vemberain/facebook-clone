import React from 'react';
import { ReactionType } from '../../types';
import confetti from 'canvas-confetti';

interface ReactionBarProps {
  onSelectReaction: (type: ReactionType) => void;
  className?: string;
}

export const REACTION_DETAILS: {
  [key in ReactionType]: {
    label: string;
    emoji: string;
    color: string;
    textColor: string;
  };
} = {
  like: {
    label: 'Like',
    emoji: '👍',
    color: '#1877F2',
    textColor: 'text-fb-blue',
  },
  love: {
    label: 'Love',
    emoji: '❤️',
    color: '#F33E5B',
    textColor: 'text-[#F33E5B]',
  },
  care: {
    label: 'Care',
    emoji: '🥰',
    color: '#F7B125',
    textColor: 'text-[#F7B125]',
  },
  haha: {
    label: 'Haha',
    emoji: '😆',
    color: '#F7B125',
    textColor: 'text-[#F7B125]',
  },
  wow: {
    label: 'Wow',
    emoji: '😮',
    color: '#F7B125',
    textColor: 'text-[#F7B125]',
  },
  sad: {
    label: 'Sad',
    emoji: '😢',
    color: '#F7B125',
    textColor: 'text-[#F7B125]',
  },
  angry: {
    label: 'Angry',
    emoji: '😡',
    color: '#E9710F',
    textColor: 'text-[#E9710F]',
  },
};

export const ReactionBar: React.FC<ReactionBarProps> = ({ onSelectReaction, className = '' }) => {
  const reactions: ReactionType[] = ['like', 'love', 'care', 'haha', 'wow', 'sad', 'angry'];

  const handleSelect = (type: ReactionType, e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectReaction(type);

    if (type === 'love' || type === 'care') {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#F33E5B', '#1877F2', '#F7B125'],
      });
    }
  };

  return (
    <div
      className={`absolute bottom-full left-0 mb-2 flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-[#242526] rounded-full shadow-fb-lg border border-gray-200 dark:border-gray-700 z-50 animate-in fade-in zoom-in-95 duration-200 ${className}`}
      onClick={e => e.stopPropagation()}
    >
      {reactions.map((type, idx) => {
        const item = REACTION_DETAILS[type];
        return (
          <button
            key={type}
            type="button"
            onClick={(e) => handleSelect(type, e)}
            className="group relative flex items-center justify-center w-10 h-10 rounded-full transition-transform duration-200 hover:scale-125 hover:-translate-y-2 focus:outline-none"
            style={{ transitionDelay: `${idx * 20}ms` }}
          >
            <span className="text-2xl filter drop-shadow select-none transform transition-transform group-hover:scale-110">
              {item.emoji}
            </span>
            {/* Tooltip label */}
            <span className="absolute -top-7 px-2 py-0.5 bg-gray-900/90 text-white text-[11px] font-semibold rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow">
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
