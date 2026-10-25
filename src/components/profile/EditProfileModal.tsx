import React, { useState } from 'react';
import { User } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { X, Camera, Briefcase, GraduationCap, Home, MapPin, Heart } from 'lucide-react';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, updateProfile } = useAuth();

  const [bio, setBio] = useState(currentUser.bio || '');
  const [work, setWork] = useState(currentUser.work || '');
  const [education, setEducation] = useState(currentUser.education || '');
  const [livesIn, setLivesIn] = useState(currentUser.livesIn || '');
  const [from, setFrom] = useState(currentUser.from || '');
  const [relationship, setRelationship] = useState(currentUser.relationship || '');
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [coverPhoto, setCoverPhoto] = useState(currentUser.coverPhoto);

  if (!isOpen) return null;

  const handleAvatarFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => setAvatar(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCoverFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => setCoverPhoto(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateProfile({
      bio,
      work,
      education,
      livesIn,
      from,
      relationship,
      avatar,
      coverPhoto,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div
        className="bg-white dark:bg-[#242526] w-full max-w-xl rounded-2xl shadow-fb-lg border border-gray-200 dark:border-gray-700 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
            Edit profile
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#3A3B3C] hover:bg-gray-200 text-gray-600 dark:text-gray-300 flex items-center justify-center"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-4 overflow-y-auto space-y-5 flex-1">
          {/* Profile Picture */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                Profile picture
              </span>
              <label className="text-xs font-semibold text-fb-blue hover:underline cursor-pointer">
                Change photo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarFile}
                />
              </label>
            </div>
            <div className="flex justify-center">
              <img
                src={avatar}
                alt="preview"
                className="w-28 h-28 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700 shadow"
              />
            </div>
          </div>

          {/* Cover Photo */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                Cover photo
              </span>
              <label className="text-xs font-semibold text-fb-blue hover:underline cursor-pointer">
                Change cover
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleCoverFile}
                />
              </label>
            </div>
            <div className="w-full h-32 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <img src={coverPhoto} alt="cover" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Bio */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <span className="font-semibold text-sm text-gray-900 dark:text-gray-100 block mb-1">
              Bio
            </span>
            <textarea
              value={bio}
              onChange={e => setBio(e.target.value)}
              placeholder="Describe who you are..."
              rows={3}
              maxLength={150}
              className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-fb-blue"
            />
          </div>

          {/* Details / Customize your intro */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-3">
            <span className="font-semibold text-sm text-gray-900 dark:text-gray-100 block">
              Customize your intro
            </span>

            <div>
              <label className="text-xs text-gray-500 mb-1 flex items-center gap-1.5">
                <Briefcase size={14} /> Work
              </label>
              <input
                type="text"
                value={work}
                onChange={e => setWork(e.target.value)}
                placeholder="e.g. Software Engineer at Meta"
                className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-xs text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-fb-blue"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 flex items-center gap-1.5">
                <GraduationCap size={14} /> Education
              </label>
              <input
                type="text"
                value={education}
                onChange={e => setEducation(e.target.value)}
                placeholder="e.g. Studied Computer Science at Harvard"
                className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-xs text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-fb-blue"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 flex items-center gap-1.5">
                <Home size={14} /> Current city (Lives in)
              </label>
              <input
                type="text"
                value={livesIn}
                onChange={e => setLivesIn(e.target.value)}
                placeholder="e.g. San Francisco, California"
                className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-xs text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-fb-blue"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 flex items-center gap-1.5">
                <MapPin size={14} /> Hometown
              </label>
              <input
                type="text"
                value={from}
                onChange={e => setFrom(e.target.value)}
                placeholder="e.g. Seattle, Washington"
                className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-xs text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-fb-blue"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 flex items-center gap-1.5">
                <Heart size={14} /> Relationship
              </label>
              <input
                type="text"
                value={relationship}
                onChange={e => setRelationship(e.target.value)}
                placeholder="e.g. In a relationship / Married"
                className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-xs text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-fb-blue"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3 bg-gray-50 dark:bg-[#242526]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 font-semibold text-sm rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#3A3B3C]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2 bg-fb-blue hover:bg-fb-blue-hover text-white font-semibold text-sm rounded-lg"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};
