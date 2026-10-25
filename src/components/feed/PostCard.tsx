import React, { useState, useRef, useEffect } from 'react';
import { Post, ReactionType, Comment } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useChat } from '../../context/ChatContext';
import { Avatar } from '../common/Avatar';
import { ReactionBar, REACTION_DETAILS } from './ReactionBar';
import { CommentItem } from './CommentItem';
import {
  Globe,
  Users,
  Lock,
  MoreHorizontal,
  Bookmark,
  Share2,
  MessageCircle,
  ThumbsUp,
  Trash2,
  Link,
  Send,
  Image as ImageIcon,
  Check,
} from 'lucide-react';

interface PostCardProps {
  post: Post;
  onUpdatePost: (updatedPost: Post) => void;
  onDeletePost?: (postId: string) => void;
  onViewProfile?: (userId: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onUpdatePost,
  onDeletePost,
  onViewProfile,
}) => {
  const { currentUser } = useAuth();
  const { openChat } = useChat();

  const [showReactionBar, setShowReactionBar] = useState(false);
  const [showComments, setShowComments] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [commentImage, setCommentImage] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const commentInputRef = useRef<HTMLInputElement>(null);
  const reactionHoverTimeout = useRef<any>(null);

  // Group reactions by type to count them
  const reactionCounts: { [key in ReactionType]?: number } = {};
  post.reactions.forEach(r => {
    reactionCounts[r.type] = (reactionCounts[r.type] || 0) + 1;
  });

  const sortedReactions = (Object.keys(reactionCounts) as ReactionType[]).sort(
    (a, b) => (reactionCounts[b] || 0) - (reactionCounts[a] || 0)
  );

  const totalReactions = post.reactions.length;
  const userReaction = post.userReaction;

  const handleMouseEnter = () => {
    reactionHoverTimeout.current = setTimeout(() => {
      setShowReactionBar(true);
    }, 300);
  };

  const handleMouseLeave = () => {
    if (reactionHoverTimeout.current) {
      clearTimeout(reactionHoverTimeout.current);
    }
    setShowReactionBar(false);
  };

  const handleSelectReaction = (type: ReactionType) => {
    let updatedReactions = post.reactions.filter(r => r.userId !== currentUser.id);
    let newReaction: ReactionType | null = type;

    // Toggle off if already chosen
    if (userReaction === type) {
      newReaction = null;
    } else {
      updatedReactions.push({
        userId: currentUser.id,
        type,
        timestamp: Date.now(),
      });
    }

    onUpdatePost({
      ...post,
      reactions: updatedReactions,
      userReaction: newReaction,
    });
    setShowReactionBar(false);
  };

  const handleQuickLike = () => {
    if (userReaction) {
      handleSelectReaction(userReaction);
    } else {
      handleSelectReaction('like');
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() && !commentImage) return;

    const newComment: Comment = {
      id: 'comm_' + Date.now(),
      postId: post.id,
      userId: currentUser.id,
      user: currentUser,
      content: commentText,
      image: commentImage || undefined,
      timestamp: 'Just now',
      likes: [],
    };

    onUpdatePost({
      ...post,
      comments: [...post.comments, newComment],
    });

    setCommentText('');
    setCommentImage(null);
  };

  const handleLikeComment = (commentId: string) => {
    const updatedComments = post.comments.map(c => {
      if (c.id === commentId) {
        const isLiked = c.likes.includes(currentUser.id);
        return {
          ...c,
          likes: isLiked
            ? c.likes.filter(id => id !== currentUser.id)
            : [...c.likes, currentUser.id],
        };
      }
      return c;
    });

    onUpdatePost({
      ...post,
      comments: updatedComments,
    });
  };

  const handleReplyComment = (commentId: string, replyText: string) => {
    const newReply: Comment = {
      id: 'reply_' + Date.now(),
      postId: post.id,
      userId: currentUser.id,
      user: currentUser,
      content: replyText,
      timestamp: 'Just now',
      likes: [],
      parentId: commentId,
    };

    onUpdatePost({
      ...post,
      comments: [...post.comments, newReply],
    });
  };

  const handleDeleteComment = (commentId: string) => {
    onUpdatePost({
      ...post,
      comments: post.comments.filter(c => c.id !== commentId && c.parentId !== commentId),
    });
  };

  const handleToggleSave = () => {
    onUpdatePost({
      ...post,
      isSaved: !post.isSaved,
    });
    setShowMenu(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.origin + '#post-' + post.id);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
    setShowMenu(false);
    setShowShareMenu(false);
  };

  const handleShareToMessenger = () => {
    openChat(post.userId);
    setShowShareMenu(false);
  };

  const handleShareToFeed = () => {
    onUpdatePost({
      ...post,
      sharesCount: post.sharesCount + 1,
    });
    setShowShareMenu(false);
  };

  const rootComments = post.comments.filter(c => !c.parentId);

  return (
    <div className="bg-white dark:bg-[#242526] rounded-xl shadow-fb border border-gray-100 dark:border-transparent mb-4 overflow-visible transition-colors duration-200">
      {/* Header */}
      <div className="flex items-center justify-between p-3.5 pb-2">
        <div className="flex items-center gap-3">
          <Avatar
            src={post.user.avatar}
            alt={post.user.name}
            size="md"
            className="cursor-pointer"
            onClick={() => onViewProfile && onViewProfile(post.userId)}
          />
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span
                onClick={() => onViewProfile && onViewProfile(post.userId)}
                className="font-semibold text-gray-900 dark:text-gray-100 hover:underline cursor-pointer text-[15px]"
              >
                {post.user.name}
              </span>
              {post.user.id === 'user_1' && (
                <span className="inline-flex items-center justify-center w-4 h-4 bg-fb-blue text-white rounded-full text-[10px]" title="Verified">
                  ✓
                </span>
              )}
              {post.feeling && (
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  is {post.feeling.emoji} {post.feeling.type} <span className="font-medium text-gray-700 dark:text-gray-300">{post.feeling.text}</span>
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              <span>{post.timestamp}</span>
              <span>•</span>
              {post.privacy === 'public' && <span title="Public"><Globe size={13} /></span>}
              {post.privacy === 'friends' && <span title="Friends"><Users size={13} /></span>}
              {post.privacy === 'only_me' && <span title="Only Me"><Lock size={13} /></span>}
            </div>
          </div>
        </div>

        {/* 3-Dots Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-full transition-colors"
          >
            <MoreHorizontal size={20} />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-1 w-52 bg-white dark:bg-[#242526] rounded-xl shadow-fb-lg border border-gray-200 dark:border-gray-700 py-1.5 z-40 text-sm">
              <button
                type="button"
                onClick={handleToggleSave}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] text-gray-700 dark:text-gray-200"
              >
                <Bookmark size={18} className={post.isSaved ? 'text-fb-blue fill-fb-blue' : ''} />
                <span>{post.isSaved ? 'Unsave post' : 'Save post'}</span>
              </button>
              <button
                type="button"
                onClick={handleCopyLink}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] text-gray-700 dark:text-gray-200"
              >
                <Link size={18} />
                <span>{copiedLink ? 'Copied to clipboard!' : 'Copy link'}</span>
              </button>
              {onDeletePost && post.userId === currentUser.id && (
                <button
                  type="button"
                  onClick={() => onDeletePost(post.id)}
                  className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 dark:text-red-400"
                >
                  <Trash2 size={18} />
                  <span>Move to trash</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Post Text */}
      <div className="px-3.5 py-1 text-[15px] text-gray-900 dark:text-gray-100 whitespace-pre-wrap break-words leading-relaxed">
        {post.content}
      </div>

      {/* Post Images / Media */}
      {post.images && post.images.length > 0 && (
        <div className="mt-3 bg-black flex justify-center overflow-hidden">
          {post.images.length === 1 ? (
            <img
              src={post.images[0]}
              alt="post"
              className="w-full max-h-[580px] object-cover cursor-pointer hover:opacity-95 transition-opacity"
            />
          ) : (
            <div className="grid grid-cols-2 gap-1 w-full max-h-[500px]">
              {post.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`post-${idx}`}
                  className="w-full h-full object-cover max-h-[250px] cursor-pointer"
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Reactions & Stats Bar */}
      <div className="px-3.5 py-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-[#393A3B]">
        <div className="flex items-center gap-1.5 cursor-pointer">
          {totalReactions > 0 ? (
            <>
              <div className="flex -space-x-1">
                {sortedReactions.slice(0, 3).map(type => (
                  <span
                    key={type}
                    className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-white dark:border-[#242526] text-xs"
                    title={REACTION_DETAILS[type].label}
                  >
                    {REACTION_DETAILS[type].emoji}
                  </span>
                ))}
              </div>
              <span className="hover:underline font-medium ml-1">
                {userReaction ? `You and ${totalReactions - 1} others` : totalReactions}
              </span>
            </>
          ) : (
            <span>Be the first to react</span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {post.comments.length > 0 && (
            <button
              type="button"
              onClick={() => setShowComments(!showComments)}
              className="hover:underline"
            >
              {post.comments.length} comment{post.comments.length > 1 ? 's' : ''}
            </button>
          )}
          {post.sharesCount > 0 && (
            <span>{post.sharesCount} share{post.sharesCount > 1 ? 's' : ''}</span>
          )}
        </div>
      </div>

      {/* Action Buttons (Like / Comment / Share) */}
      <div className="relative px-2 py-1 grid grid-cols-3 gap-1 border-b border-gray-100 dark:border-[#393A3B]">
        {/* Like Button with ReactionBar hover */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {showReactionBar && (
            <ReactionBar onSelectReaction={handleSelectReaction} />
          )}

          <button
            type="button"
            onClick={handleQuickLike}
            className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg font-semibold text-sm transition-colors hover:bg-gray-100 dark:hover:bg-[#3A3B3C] ${
              userReaction
                ? REACTION_DETAILS[userReaction].textColor
                : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            {userReaction ? (
              <span className="text-lg leading-none">{REACTION_DETAILS[userReaction].emoji}</span>
            ) : (
              <ThumbsUp size={18} />
            )}
            <span>{userReaction ? REACTION_DETAILS[userReaction].label : 'Like'}</span>
          </button>
        </div>

        {/* Comment Button */}
        <button
          type="button"
          onClick={() => {
            setShowComments(true);
            commentInputRef.current?.focus();
          }}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg font-semibold text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] transition-colors"
        >
          <MessageCircle size={18} />
          <span>Comment</span>
        </button>

        {/* Share Button with Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg font-semibold text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] transition-colors"
          >
            <Share2 size={18} />
            <span>Share</span>
          </button>

          {showShareMenu && (
            <div className="absolute right-0 bottom-full mb-1 w-48 bg-white dark:bg-[#242526] rounded-xl shadow-fb-lg border border-gray-200 dark:border-gray-700 py-1.5 z-40 text-sm">
              <button
                type="button"
                onClick={handleShareToFeed}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] text-gray-700 dark:text-gray-200"
              >
                <Share2 size={16} />
                <span>Share now (Public)</span>
              </button>
              <button
                type="button"
                onClick={handleShareToMessenger}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] text-gray-700 dark:text-gray-200"
              >
                <Send size={16} />
                <span>Send in Messenger</span>
              </button>
              <button
                type="button"
                onClick={handleCopyLink}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] text-gray-700 dark:text-gray-200"
              >
                <Link size={16} />
                <span>Copy link</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="p-3.5 space-y-3">
          {/* New Comment Input */}
          <form onSubmit={handleAddComment} className="flex gap-2 items-start">
            <Avatar src={currentUser.avatar} alt={currentUser.name} size="sm" />
            <div className="flex-1 bg-gray-100 dark:bg-[#3A3B3C] rounded-2xl px-3 py-1.5 flex flex-col focus-within:ring-1 focus-within:ring-fb-blue">
              <input
                ref={commentInputRef}
                type="text"
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                placeholder={`Write a comment as ${currentUser.name}...`}
                className="w-full bg-transparent text-sm text-gray-900 dark:text-gray-100 focus:outline-none placeholder-gray-500"
              />
              {commentImage && (
                <div className="relative mt-2 inline-block">
                  <img
                    src={commentImage}
                    alt="attachment"
                    className="w-20 h-20 object-cover rounded-lg border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => setCommentImage(null)}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gray-800 text-white rounded-full flex items-center justify-center text-xs"
                  >
                    ✕
                  </button>
                </div>
              )}
              <div className="flex items-center justify-between pt-1 text-gray-500 dark:text-gray-400 text-xs">
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer hover:text-fb-blue transition-colors">
                    <ImageIcon size={16} />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = ev => setCommentImage(ev.target?.result as string);
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={!commentText.trim() && !commentImage}
                  className="text-fb-blue hover:text-fb-blue-hover disabled:opacity-30 font-semibold p-1"
                >
                  <Send size={15} />
                </button>
              </div>
            </div>
          </form>

          {/* Comments List */}
          {rootComments.length > 0 && (
            <div className="space-y-1 pt-1">
              {rootComments.map(comment => {
                const replies = post.comments.filter(c => c.parentId === comment.id);
                return (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    onLike={handleLikeComment}
                    onReply={handleReplyComment}
                    onDelete={handleDeleteComment}
                    replies={replies}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
