import React from 'react';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  online?: boolean;
  hasStory?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  online,
  hasStory,
  className = '',
  onClick,
}) => {
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-36 h-36 border-4 border-white dark:border-[#242526]',
  }[size];

  const dotSizeClasses = {
    xs: 'w-2 h-2',
    sm: 'w-2.5 h-2.5',
    md: 'w-3 h-3',
    lg: 'w-3.5 h-3.5',
    xl: 'w-4 h-4',
    '2xl': 'w-6 h-6',
  }[size];

  return (
    <div className={`relative inline-block flex-shrink-0 ${className}`} onClick={onClick}>
      <img
        src={src}
        alt={alt}
        className={`${sizeClasses} rounded-full object-cover select-none ${
          hasStory ? 'ring-2 ring-offset-2 ring-fb-blue' : ''
        }`}
        loading="lazy"
      />
      {online !== undefined && (
        <span
          className={`absolute bottom-0 right-0 ${dotSizeClasses} rounded-full border-2 border-white dark:border-[#242526] ${
            online ? 'bg-green-500' : 'bg-gray-400'
          }`}
        />
      )}
    </div>
  );
};
