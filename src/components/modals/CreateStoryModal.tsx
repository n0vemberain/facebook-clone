import React, { useState } from 'react';
import { Story } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { X, Image as ImageIcon, Type } from 'lucide-react';

interface CreateStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStoryCreated: (newStory: Story) => void;
}

const STORY_GRADIENTS = [
  'from-blue-600 via-indigo-600 to-purple-800',
  'from-rose-500 via-pink-500 to-amber-400',
  'from-emerald-500 to-teal-800',
  'from-amber-500 via-orange-600 to-red-600',
  'from-fuchsia-600 to-pink-600',
];

export const CreateStoryModal: React.FC<CreateStoryModalProps> = ({
  isOpen,
  onClose,
  onStoryCreated,
}) => {
  const { currentUser } = useAuth();
  const [storyType, setStoryType] = useState<'text' | 'image'>('text');
  const [textContent, setTextContent] = useState('');
  const [selectedGradient, setSelectedGradient] = useState(STORY_GRADIENTS[0]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => {
        setImagePreview(ev.target?.result as string);
        setStoryType('image');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (storyType === 'text' && !textContent.trim()) return;
    if (storyType === 'image' && !imagePreview) return;

    const newStory: Story = {
      id: 'story_' + Date.now(),
      userId: currentUser.id,
      user: currentUser,
      type: storyType,
      text: storyType === 'text' ? textContent : undefined,
      bgGradient: storyType === 'text' ? selectedGradient : undefined,
      mediaUrl: storyType === 'image' ? imagePreview! : undefined,
      timestamp: 'Just now',
      isViewed: false,
    };

    onStoryCreated(newStory);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div
        className="bg-white dark:bg-[#242526] w-full max-w-xl rounded-2xl shadow-fb-lg overflow-hidden border border-gray-200 dark:border-gray-700"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
            Create a story
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#3A3B3C] hover:bg-gray-200 text-gray-600 dark:text-gray-300 flex items-center justify-center"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Type Toggle */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 p-2 gap-2">
          <button
            type="button"
            onClick={() => setStoryType('text')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl font-semibold text-sm transition-colors ${
              storyType === 'text'
                ? 'bg-fb-blue text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#3A3B3C]'
            }`}
          >
            <Type size={18} />
            <span>Text Story</span>
          </button>
          <label
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl font-semibold text-sm transition-colors cursor-pointer ${
              storyType === 'image'
                ? 'bg-fb-blue text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#3A3B3C]'
            }`}
          >
            <ImageIcon size={18} />
            <span>Photo Story</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        {/* Story Live Preview Box */}
        <div className="p-6 flex justify-center bg-gray-100 dark:bg-[#18191A]">
          <div
            className={`w-60 h-96 rounded-2xl shadow-fb-lg overflow-hidden flex flex-col justify-center items-center p-6 text-center relative ${
              storyType === 'text'
                ? `bg-gradient-to-br ${selectedGradient} text-white`
                : 'bg-black text-white'
            }`}
          >
            {storyType === 'text' ? (
              <textarea
                value={textContent}
                onChange={e => setTextContent(e.target.value)}
                placeholder="Start typing your story..."
                maxLength={200}
                className="w-full bg-transparent border-none text-center font-bold text-lg resize-none focus:outline-none placeholder-white/70"
                rows={5}
                autoFocus
              />
            ) : imagePreview ? (
              <img
                src={imagePreview}
                alt="Story preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-gray-400 text-sm flex flex-col items-center gap-2">
                <ImageIcon size={40} />
                <span>Upload a photo to preview</span>
              </div>
            )}
          </div>
        </div>

        {/* Gradients selector (for text story) */}
        {storyType === 'text' && (
          <div className="px-6 py-3 flex items-center gap-3">
            <span className="text-xs font-semibold text-gray-500">Theme:</span>
            <div className="flex gap-2">
              {STORY_GRADIENTS.map((grad, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedGradient(grad)}
                  className={`w-7 h-7 rounded-full bg-gradient-to-br ${grad} border-2 ${
                    selectedGradient === grad ? 'border-fb-blue scale-110' : 'border-transparent'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 font-semibold text-sm rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#3A3B3C]"
          >
            Discard
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={(storyType === 'text' && !textContent.trim()) || (storyType === 'image' && !imagePreview)}
            className="px-6 py-2 bg-fb-blue hover:bg-fb-blue-hover disabled:bg-gray-300 text-white font-semibold text-sm rounded-lg transition-colors"
          >
            Share to story
          </button>
        </div>
      </div>
    </div>
  );
};
