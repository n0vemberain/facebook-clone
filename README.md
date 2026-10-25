# 🌐 Facebook Web Clone (ফেসবুক ফুল-ফিচার্ড ক্লোন)

> An authentic, pixel-perfect Facebook clone built with **React 18**, **TypeScript**, and **Tailwind CSS**, featuring real-time messaging, stories, reactions, marketplace, watch feeds, profile management, and dark mode.

---

## ✨ Features (ফাংশনালিটি সমূহ)

### 1. 💬 Real-Time Messenger (মেসেজিং সিস্টেম)
- **Docked Floating Chat Boxes:** Exactly like desktop Facebook, open multiple chat windows simultaneously docked at the bottom-right of your screen.
- **Minimized Chat Heads:** Minimize chats into floating circular avatar bubbles.
- **Interactive Messaging:**
  - Send text messages, photos, and emoji stickers.
  - Quick **Facebook Blue Thumbs-Up 👍** send button.
  - **Realistic Sound Effects:** Synthesized audio chime on sending and receiving messages.
  - **Typing Indicator:** Real-time animated typing status ("... is typing").
  - **Smart Simulated Replies:** Automated friendly replies from friends for interactive testing.
- **Full-Screen Messenger View (`/messages`):** Dedicated 3-column messenger layout with conversation lists, rich media galleries, contact info, and audio/video call simulation.

### 2. 📰 News Feed & Post Creation (নিউজফিড ও পোস্ট)
- **Rich Post Creation Modal:**
  - Audience Selector: 🌍 Public, 👥 Friends, 🔒 Only Me.
  - **Facebook Colored Background Templates:** Create iconic bold text status updates with stylish gradients.
  - **Feeling & Activity Picker:** Express moods (😊 Happy, 🤩 Excited, 🍕 Eating, ✈️ Traveling, 🎉 Celebrating, etc.).
  - **Photo & Video Attachments:** Upload photos with instant preview and remove options.
- **Authentic 7 Facebook Reactions Hover Bar:**
  - Hover over the Like button to reveal animated Facebook emojis:
    - 👍 **Like** (Blue)
    - ❤️ **Love** (Red heart with confetti burst)
    - 🥰 **Care** (Hugging heart)
    - 😆 **Haha** (Laughing)
    - 😮 **Wow** (Surprised)
    - 😢 **Sad** (Crying)
    - 😡 **Angry** (Fiery red)
- **Comments & Nested Replies:**
  - Rich commenting with photo attachments.
  - Like comments and post nested replies.
  - Delete own comments.
- **Post Actions:** Save post, copy direct link, share to News Feed, share in Messenger, or delete post.

### 3. 📸 Stories (স্টোরিজ)
- **Top Stories Carousel:** Scrollable horizontal story bar with friend story cards.
- **Fullscreen Story Viewer:**
  - Multi-segment progress bar with 5-second automatic progression.
  - Pause playback on hold/touch.
  - Previous / Next story navigation.
  - Quick reaction emojis (❤️, 🔥, 😮, 😂, 👏, 😢).
  - Direct message reply input inside story viewer.
- **Create Story Modal:**
  - **Text Story:** Choose from vibrant gradient backgrounds.
  - **Photo Story:** Upload custom photos.

### 4. 👤 User Profiles & Multi-Account Switcher (প্রোফাইল ও অ্যাকাউন্ট পরিবর্তন)
- **Comprehensive Profile View:**
  - High-resolution Cover photo & 2XL Profile picture with edit buttons.
  - Bio, Work, Education, Current city, Hometown, Relationship status, and Join date.
  - Profile navigation tabs: **Posts**, **About**, **Friends**, **Photos**.
- **Edit Profile Modal:** Live update avatar, cover photo, bio, and personal details.
- **Fast User Switcher Modal:**
  - Instantly switch between 6 pre-configured realistic profiles:
    1. **Mark Zuckerberg** (`@zuck`) - Meta CEO
    2. **Tanvir Ahmed** (`@tanvir_dev`) - Full Stack Architect
    3. **Sarah Jenkins** (`@sarah_j`) - Senior UX Lead
    4. **Fahim Rahman** (`@fahim_r`) - AI Researcher
    5. **Nusrat Jahan** (`@nusrat_j`) - Visual Creator & Photographer
    6. **Alex Rivera** (`@alex_r`) - Nature & Fitness Coach
  - Switch users to test two-way commenting, liking, sending friend requests, and chatting back-and-forth in real-time!

### 5. 🛒 Facebook Marketplace (মার্কেটপ্লেস)
- Browse items for sale with grid layout, prices, and locations.
- Filter by categories: *Electronics, Sports & Outdoors, Furniture, Apparel*.
- Detailed product lightbox.
- **"Message Seller" Button:** Instantly launches a floating Messenger conversation with the seller about the listing.
- **Create Listing Modal:** Publish your own items for sale with title, price, category, location, and photos.

### 6. 📺 Facebook Watch (ভিডিও ও রিলস)
- Playable HTML5 video feeds with sound controls and full-screen support.
- Channel verification badges, follower counts, and follow button.
- Video categories: *Home, Live, Reels, Saved*.
- Video reaction, comment, and share toolbar.

### 7. 👥 Facebook Groups (গ্রুপস)
- Discover and join active communities.
- Dedicated group banner, privacy badges, member counts, and group descriptions.
- Group feed with the ability to create posts directly inside groups.

### 8. 🔍 Search & 🔔 Notifications (সার্চ এবং নোটিফিকেশন)
- **Instant Search Modal:** Live global search across people, posts, marketplace items, and groups.
- **Notifications Dropdown:** Real-time badge counter, unread filtering, interactive notification cards, and "Mark all as read".

### 9. 🌓 Dark Mode & Light Mode (ডার্ক মোড)
- Toggle seamlessly between Facebook's official dark mode (`#18191A`) and classic light mode (`#F0F2F5`).
- State persists across page reloads via `localStorage`.

---

## 🛠️ Technology Stack (ব্যবহৃত প্রযুক্তি)

| Component | Technology |
|---|---|
| **Framework** | [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite 6](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Animations** | Tailwind CSS transitions & [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) |
| **Audio** | HTML5 Web Audio API (Synthesized Messenger sound chimes) |
| **Storage** | Client `localStorage` for state persistence across sessions |

---

## 🚀 Getting Started (রান করার নিয়ম)

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `yarn`

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/n0vemberain/facebook-clone.git
   cd facebook-clone
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000`.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## 📂 Project Structure (ফাইল স্ট্রাকচার)

```
facebook/
├── index.html                   # HTML entry point with Facebook favicon
├── package.json                 # Dependencies & scripts
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite configuration
├── tailwind.config.js           # Tailwind theme with Facebook palette
├── src/
│   ├── main.tsx                 # Root React mounting with Context Providers
│   ├── App.tsx                  # Main orchestration component
│   ├── index.css                # Global styles and custom scrollbars
│   ├── types/
│   │   └── index.ts             # TypeScript definitions
│   ├── context/
│   │   ├── AuthContext.tsx      # Current user, switch profile, friend requests
│   │   ├── ChatContext.tsx      # Messenger threads, floating chat windows, audio
│   │   └── ThemeContext.tsx     # Light & dark mode management
│   ├── data/
│   │   ├── mockUsers.ts         # User profiles
│   │   ├── mockPosts.ts         # Sample posts with comments & reactions
│   │   ├── mockStories.ts       # Sample stories
│   │   ├── mockMarketplace.ts   # Sample listings
│   │   ├── mockGroups.ts        # Sample groups
│   │   └── mockNotifications.ts # Sample notifications
│   └── components/
│       ├── layout/              # Navbar, LeftSidebar, RightSidebar, MobileNav
│       ├── feed/                # StoriesBar, CreatePostBox, PostCard, ReactionBar, CommentItem
│       ├── messenger/           # FloatingChatBox, MessengerDropdown, FullMessenger
│       ├── profile/             # ProfileView, EditProfileModal
│       ├── marketplace/         # MarketplaceView
│       ├── watch/               # WatchView
│       ├── groups/              # GroupsView
│       ├── notifications/       # NotificationsDropdown
│       ├── modals/              # CreateStoryModal, StoryViewerModal, SearchModal, UserSwitcherModal
│       └── common/              # Avatar, Button, Tooltip
└── README.md                    # Documentation
```

---

## 📄 License
This project is open-source and intended for educational and portfolio demonstration purposes. Facebook and Meta are trademarks of Meta Platforms, Inc.
