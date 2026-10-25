import React, { useState } from 'react';
import { Comment } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../common/Avatar';
import { Heart, ThumbsUp, Trash2 } from 'lucide-react';

interface CommentItemProps {
  comment: Comment;
  onLike: (commentId: string) => void;
  onReply: (commentId: string, replyContent: string) => void;
  onDelete?: (commentId: string) => void;
  replies?: Comment[];
}

export const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onLike,
  onReply,
  onDelete,
  replies = [],
}) => {
  const { currentUser } = useAuth();
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState('');

  const isLiked = comment.likes.includes(currentUser.id);

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    onReply(comment.id, replyText);
    setReplyText('');
    setShowReplyInput(false);
  };

  return (
    <div className="flex gap-2.5 py-1.5 text-sm group">
      <Avatar src={comment.user.avatar} alt={comment.user.name} size="sm" />
      <div className="flex-1 min-w-0">
        <div className="relative inline-block max-w-[90%] bg-gray-100 dark:bg-[#3A3B3C] rounded-2xl px-3.5 py-2">
          <div className="font-semibold text-gray-900 dark:text-gray-100 hover:underline cursor-pointer text-xs">
            {comment.user.name}
          </div>
          <div className="text-gray-800 dark:text-gray-200 text-[13px] mt-0.5 whitespace-pre-wrap break-words">
            {comment.content}
          </div>
          {comment.image && (
            <img
              src={comment.image}
              alt="attachment"
              className="mt-2 rounded-lg max-h-48 object-cover"
            />
          )}

          {/* Reaction bubble badge */}
          {comment.likes.length > 0 && (
            <div className="absolute -bottom-2 right-1 flex items-center gap-0.5 bg-white dark:bg-[#242526] px-1.5 py-0.5 rounded-full shadow border border-gray-200 dark:border-gray-700 text-[11px] text-gray-600 dark:text-gray-300">
              <span className="flex items-center justify-center w-3.5 h-3.5 rounded-full bg-fb-blue text-white text-[8px]">
                <ThumbsUp size={8} fill="white" />
              </span>
              <span className="font-medium">{comment.likes.length}</span>
            </div>
          )}
        </div>

        {/* Comment Action Links */}
        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-1 ml-2">
          <button
            type="button"
            onClick={() => onLike(comment.id)}
            className={`font-semibold hover:underline ${
              isLiked ? 'text-fb-blue' : ''
            }`}
          >
            Like
          </button>
          <button
            type="button"
            onClick={() => setShowReplyInput(!showReplyInput)}
            className="font-semibold hover:underline"
          >
            Reply
          </button>
          <span>{comment.timestamp}</span>

          {onDelete && comment.userId === currentUser.id && (
            <button
              type="button"
              onClick={() => onDelete(comment.id)}
              className="opacity-0 group-hover:opacity-100 text-red-500 hover:underline ml-1"
              title="Delete comment"
            >
              <Trash2 size={12} />
            </button>
          )}
        </div>

        {/* Reply Input */}
        {showReplyInput && (
          <form onSubmit={handleSendReply} className="flex gap-2 items-center mt-2">
            <Avatar src={currentUser.avatar} alt={currentUser.name} size="xs" />
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={`Reply to ${comment.user.name}...`}
              className="flex-1 bg-gray-100 dark:bg-[#3A3B3C] rounded-full px-3 py-1 text-xs text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-fb-blue"
              autoFocus
            />
            <button
              type="submit"
              disabled={!replyText.trim()}
              className="text-xs font-semibold text-fb-blue disabled:opacity-40"
            >
              Send
            </button>
          </form>
        )}

        {/* Nested Replies */}
        {replies.length > 0 && (
          <div className="mt-2 pl-4 border-l-2 border-gray-200 dark:border-gray-700 space-y-2">
            {replies.map(reply => (
              <div key={reply.id} className="flex gap-2 text-xs">
                <Avatar src={reply.user.avatar} alt={reply.user.name} size="xs" />
                <div className="bg-gray-100 dark:bg-[#3A3B3C] rounded-2xl px-3 py-1.5 max-w-[85%]">
                  <div className="font-semibold text-gray-900 dark:text-gray-100 text-[11px]">
                    {reply.user.name}
                  </div>
                  <div className="text-gray-800 dark:text-gray-200 text-xs mt-0.5">
                    {reply.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
