import React, { useState } from 'react';
import { MarketplaceItem } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useChat } from '../../context/ChatContext';
import { Avatar } from '../common/Avatar';
import { Search, MapPin, Tag, MessageCircle, Plus, X, Check } from 'lucide-react';

interface MarketplaceViewProps {
  items: MarketplaceItem[];
  onAddItem: (item: MarketplaceItem) => void;
}

const CATEGORIES = ['All', 'Electronics', 'Sports & Outdoors', 'Furniture', 'Apparel'];

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({ items, onAddItem }) => {
  const { currentUser } = useAuth();
  const { openChat, sendMessage } = useChat();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // New listing state
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState(CATEGORIES[1]);
  const [newLocation, setNewLocation] = useState('Dhaka, Bangladesh');
  const [newDescription, setNewDescription] = useState('');
  const [newImage, setNewImage] = useState<string | null>(null);

  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newPrice || !newImage) return;

    const newItem: MarketplaceItem = {
      id: 'mp_' + Date.now(),
      title: newTitle,
      price: parseFloat(newPrice) || 0,
      location: newLocation,
      category: newCategory,
      description: newDescription,
      image: newImage,
      seller: currentUser,
      createdAt: 'Just now',
    };

    onAddItem(newItem);
    setIsCreateOpen(false);
    setNewTitle('');
    setNewPrice('');
    setNewDescription('');
    setNewImage(null);
  };

  const handleMessageSeller = (item: MarketplaceItem) => {
    openChat(item.seller.id);
    sendMessage(item.seller.id, `Hi ${item.seller.name.split(' ')[0]}, is "${item.title}" still available?`);
    setSelectedItem(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Top Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Marketplace</h1>
          <p className="text-sm text-gray-500">Buy and sell items locally or with delivery</p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="flex items-center gap-2 bg-white dark:bg-[#242526] rounded-full px-4 py-2 border border-gray-200 dark:border-gray-700 shadow-sm flex-1 md:w-72">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search Marketplace"
              className="w-full bg-transparent text-sm text-gray-900 dark:text-gray-100 focus:outline-none"
            />
          </div>

          <button
            type="button"
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-fb-blue hover:bg-fb-blue-hover text-white rounded-full font-semibold text-sm shadow transition-colors whitespace-nowrap"
          >
            <Plus size={18} />
            <span>Create new listing</span>
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-4">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-fb-blue text-white shadow-sm'
                : 'bg-white dark:bg-[#242526] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] border border-gray-200 dark:border-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredItems.map(item => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="bg-white dark:bg-[#242526] rounded-xl overflow-hidden shadow-fb border border-gray-100 dark:border-transparent cursor-pointer group hover:shadow-fb-lg transition-all flex flex-col"
          >
            <div className="h-44 overflow-hidden bg-neutral-900">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-3 flex-1 flex flex-col justify-between">
              <div>
                <span className="font-bold text-base text-gray-900 dark:text-gray-100 block">
                  ${item.price.toLocaleString()}
                </span>
                <h4 className="text-sm text-gray-800 dark:text-gray-200 line-clamp-1 font-medium mt-0.5">
                  {item.title}
                </h4>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-2 block flex items-center gap-1">
                <MapPin size={12} />
                <span className="truncate">{item.location}</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal with Message Seller Button */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white dark:bg-[#242526] w-full max-w-2xl rounded-2xl shadow-fb-lg overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row"
            onClick={e => e.stopPropagation()}
          >
            <div className="md:w-1/2 bg-black flex items-center justify-center">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-80 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100">
                    {selectedItem.title}
                  </h3>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="p-1 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-[#3A3B3C]"
                  >
                    <X size={20} />
                  </button>
                </div>
                <span className="text-2xl font-bold text-fb-blue block mt-2">
                  ${selectedItem.price.toLocaleString()}
                </span>
                <span className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                  <MapPin size={14} /> {selectedItem.location} • {selectedItem.createdAt}
                </span>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h5 className="text-xs font-bold uppercase text-gray-500 mb-1">Description</h5>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center gap-3">
                  <Avatar src={selectedItem.seller.avatar} alt={selectedItem.seller.name} size="md" />
                  <div>
                    <span className="font-semibold text-sm text-gray-900 dark:text-gray-100 block">
                      {selectedItem.seller.name}
                    </span>
                    <span className="text-xs text-gray-500">Seller details</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleMessageSeller(selectedItem)}
                className="mt-6 w-full py-2.5 bg-fb-blue hover:bg-fb-blue-hover text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 shadow"
              >
                <MessageCircle size={18} />
                <span>Message Seller</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Listing Modal */}
      {isCreateOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in"
          onClick={() => setIsCreateOpen(false)}
        >
          <div
            className="bg-white dark:bg-[#242526] w-full max-w-lg rounded-2xl shadow-fb-lg overflow-hidden border border-gray-200 dark:border-gray-700 p-6"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700 mb-4">
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                Create new item for sale
              </h3>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-[#3A3B3C]"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateListing} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                  Item Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="What are you selling?"
                  className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-fb-blue"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={e => setNewPrice(e.target.value)}
                    placeholder="0"
                    className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-fb-blue"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-fb-blue"
                  >
                    {CATEGORIES.slice(1).map(c => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={e => setNewLocation(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-fb-blue"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                  Description
                </label>
                <textarea
                  value={newDescription}
                  onChange={e => setNewDescription(e.target.value)}
                  rows={3}
                  placeholder="Describe your item..."
                  className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-fb-blue"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                  Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = ev => setNewImage(ev.target?.result as string);
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="text-xs"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 text-sm font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-[#3A3B3C]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-fb-blue text-white font-semibold text-sm rounded-lg hover:bg-fb-blue-hover"
                >
                  Publish listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
