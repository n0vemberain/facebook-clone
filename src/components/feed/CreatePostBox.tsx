import React, { useState } from 'react';
import { Post } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../common/Avatar';
import {
  Video,
  Image as ImageIcon,
  Smile,
  Globe,
  Users,
  Lock,
  X,
  MapPin,
  UserCheck,
} from 'lucide-react';

interface CreatePostBoxProps {
  onPostCreated: (newPost: Post) => void;
}

const BG_GRADIENTS = [
  'none',
  'bg-gradient-to-r from-blue-600 to-indigo-900 text-white font-bold text-center text-xl flex items-center justify-center min-h-[160px]',
  'bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 text-white font-bold text-center text-xl flex items-center justify-center min-h-[160px]',
  'bg-gradient-to-r from-emerald-500 to-teal-800 text-white font-bold text-center text-xl flex items-center justify-center min-h-[160px]',
  'bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white font-bold text-center text-xl flex items-center justify-center min-h-[160px]',
  'bg-gradient-to-r from-slate-900 to-gray-800 text-white font-bold text-center text-xl flex items-center justify-center min-h-[160px]',
];

const FEELINGS_LIST = [
  { emoji: '😊', text: 'happy' },
  { emoji: '🤩', text: 'excited' },
  { emoji: '🥰', text: 'blessed' },
  { emoji: '😎', text: 'cool' },
  { emoji: '🍕', text: 'eating delicious food' },
  { emoji: '✈️', text: 'traveling' },
  { emoji: '💻', text: 'coding' },
  { emoji: '☕', text: 'drinking coffee' },
  { emoji: '🎉', text: 'celebrating' },
];

export const CreatePostBox: React.FC<CreatePostBoxProps> = ({ onPostCreated }) => {
  const { currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');
  const [privacy, setPrivacy] = useState<'public' | 'friends' | 'only_me'>('public');
  const [selectedFeeling, setSelectedFeeling] = useState<{ emoji: string; text: string } | null>(null);
  const [showFeelingsPicker, setShowFeelingsPicker] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedBgIdx, setSelectedBgIdx] = useState(0);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    setContent('');
    setImagePreview(null);
    setSelectedFeeling(null);
    setSelectedBgIdx(0);
    setShowFeelingsPicker(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => {
        setImagePreview(ev.target?.result as string);
        setSelectedBgIdx(0); // clear bg gradient when image added
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !imagePreview) return;

    const newPost: Post = {
      id: 'post_' + Date.now(),
      userId: currentUser.id,
      user: currentUser,
      content,
      images: imagePreview ? [imagePreview] : undefined,
      feeling: selectedFeeling
        ? {
            type: 'feeling',
            text: selectedFeeling.text,
            emoji: selectedFeeling.emoji,
          }
        : undefined,
      privacy,
      timestamp: 'Just now',
      reactions: [],
      comments: [],
      sharesCount: 0,
    };

    onPostCreated(newPost);
    handleClose();
  };

  return (
    <>
      {/* Box Trigger */}
      <div className="bg-white dark:bg-[#242526] rounded-xl shadow-fb border border-gray-100 dark:border-transparent p-3.5 mb-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100 dark:border-[#393A3B]">
          <Avatar src={currentUser.avatar} alt={currentUser.name} size="md" />
          <button
            type="button"
            onClick={handleOpen}
            className="flex-1 text-left bg-gray-100 dark:bg-[#3A3B3C] hover:bg-gray-200 dark:hover:bg-[#4E4F50] px-4 py-2.5 rounded-full text-gray-500 dark:text-gray-400 text-[15px] transition-colors cursor-pointer"
          >
            What's on your mind, {currentUser.name.split(' ')[0]}?
          </button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-1 pt-2">
          <button
            type="button"
            onClick={handleOpen}
            className="flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#3A3B3C] text-gray-600 dark:text-gray-300 font-semibold text-sm transition-colors"
          >
            <Video className="text-red-500" size={22} />
            <span className="hidden sm:inline">Live video</span>
          </button>

          <button
            type="button"
            onClick={handleOpen}
            className="flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#3A3B3C] text-gray-600 dark:text-gray-300 font-semibold text-sm transition-colors"
          >
            <ImageIcon className="text-green-500" size={22} />
            <span className="hidden sm:inline">Photo/video</span>
          </button>

          <button
            type="button"
            onClick={() => {
              handleOpen();
              setShowFeelingsPicker(true);
            }}
            className="flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#3A3B3C] text-gray-600 dark:text-gray-300 font-semibold text-sm transition-colors"
          >
            <Smile className="text-amber-500" size={22} />
            <span className="hidden sm:inline">Feeling/activity</span>
          </button>
        </div>
      </div>

      {/* Full Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div
            className="bg-white dark:bg-[#242526] w-full max-w-lg rounded-xl shadow-fb-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative border-b border-gray-200 dark:border-gray-700 p-4 text-center">
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                Create post
              </h3>
              <button
                type="button"
                onClick={handleClose}
                className="absolute right-3.5 top-3.5 w-8 h-8 rounded-full bg-gray-100 dark:bg-[#3A3B3C] hover:bg-gray-200 dark:hover:bg-[#4E4F50] text-gray-600 dark:text-gray-300 flex items-center justify-center transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* User Profile Bar */}
            <div className="p-4 flex items-center gap-3">
              <Avatar src={currentUser.avatar} alt={currentUser.name} size="md" />
              <div>
                <div className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                  {currentUser.name}
                  {selectedFeeling && (
                    <span className="font-normal text-gray-500 ml-1">
                      is {selectedFeeling.emoji} feeling <span className="font-medium">{selectedFeeling.text}</span>
                    </span>
                  )}
                </div>
                {/* Privacy Dropdown */}
                <div className="relative inline-block mt-1">
                  <select
                    value={privacy}
                    onChange={e => setPrivacy(e.target.value as any)}
                    className="bg-gray-100 dark:bg-[#3A3B3C] text-gray-700 dark:text-gray-300 text-xs font-semibold px-2.5 py-1 rounded-md border-none focus:outline-none cursor-pointer"
                  >
                    <option value="public">🌍 Public</option>
                    <option value="friends">👥 Friends</option>
                    <option value="only_me">🔒 Only me</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Input Body */}
            <div className="px-4">
              <div className={selectedBgIdx > 0 ? BG_GRADIENTS[selectedBgIdx] + ' rounded-xl p-4' : ''}>
                <textarea
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder={`What's on your mind, ${currentUser.name.split(' ')[0]}?`}
                  rows={selectedBgIdx > 0 ? 3 : 4}
                  className={`w-full bg-transparent resize-none border-none focus:outline-none text-base placeholder-gray-500 dark:placeholder-gray-400 ${
                    selectedBgIdx > 0 ? 'text-white placeholder-white/80 font-bold text-center' : 'text-gray-900 dark:text-gray-100'
                  }`}
                  autoFocus
                />
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="relative mt-3 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 max-h-60">
                  <img src={imagePreview} alt="upload preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setImagePreview(null)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black/90"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}

              {/* Background Color Themes Palette (if no image) */}
              {!imagePreview && (
                <div className="flex items-center gap-1.5 py-2">
                  <button
                    type="button"
                    onClick={() => setSelectedBgIdx(0)}
                    className={`w-7 h-7 rounded-lg border-2 ${
                      selectedBgIdx === 0 ? 'border-fb-blue' : 'border-gray-300 dark:border-gray-600'
                    } flex items-center justify-center text-xs font-bold text-gray-500`}
                  >
                    Aa
                  </button>
                  {BG_GRADIENTS.slice(1).map((bg, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedBgIdx(idx + 1)}
                      className={`w-7 h-7 rounded-lg ${bg} border-2 ${
                        selectedBgIdx === idx + 1 ? 'border-fb-blue scale-110' : 'border-transparent'
                      } transition-transform`}
                    />
                  ))}
                </div>
              )}

              {/* Feelings Picker Grid */}
              {showFeelingsPicker && (
                <div className="mt-2 p-2.5 bg-gray-50 dark:bg-[#3A3B3C] rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-2 px-1">
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">How are you feeling?</span>
                    <button
                      type="button"
                      onClick={() => setShowFeelingsPicker(false)}
                      className="text-xs text-gray-500 hover:text-gray-800"
                    >
                      Close
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 max-h-36 overflow-y-auto">
                    {FEELINGS_LIST.map(f => (
                      <button
                        key={f.text}
                        type="button"
                        onClick={() => {
                          setSelectedFeeling(f);
                          setShowFeelingsPicker(false);
                        }}
                        className="flex items-center gap-1.5 p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-[#4E4F50] text-xs text-gray-800 dark:text-gray-200 text-left"
                      >
                        <span className="text-base">{f.emoji}</span>
                        <span className="truncate capitalize">{f.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Add to Post Toolbar */}
              <div className="mt-3 p-3 border border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-between">
                <span className="font-semibold text-xs text-gray-700 dark:text-gray-300">
                  Add to your post
                </span>
                <div className="flex items-center gap-1">
                  <label className="p-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-full cursor-pointer text-green-500 transition-colors" title="Photo/video">
                    <ImageIcon size={20} />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowFeelingsPicker(!showFeelingsPicker)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-full text-amber-500 transition-colors"
                    title="Feeling/activity"
                  >
                    <Smile size={20} />
                  </button>
                  <button
                    type="button"
                    className="p-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-full text-blue-500 transition-colors"
                    title="Tag people"
                  >
                    <UserCheck size={20} />
                  </button>
                  <button
                    type="button"
                    className="p-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-full text-red-500 transition-colors"
                    title="Check in"
                  >
                    <MapPin size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="p-4">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!content.trim() && !imagePreview}
                className="w-full py-2.5 bg-fb-blue hover:bg-fb-blue-hover disabled:bg-gray-200 dark:disabled:bg-[#3A3B3C] text-white disabled:text-gray-400 font-semibold rounded-lg text-sm transition-colors cursor-pointer disabled:cursor-not-allowed"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
