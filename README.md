# 🌐 Facebook Web Clone

[![React](https://img.shields.io/badge/React-18.3-blue.svg?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![Live Demo](https://img.shields.io/badge/Live_Demo-Active-brightgreen.svg?logo=github)](https://n0vemberain.github.io/facebook-clone/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> An authentic, pixel-perfect Facebook Web Clone built from scratch with **React 18**, **TypeScript**, and **Tailwind CSS**. Features real-time interactive messaging, docked floating chat heads, animated 7-reaction hover bar, stories carousel & full-screen viewer, user profiles with account switcher, marketplace with direct seller messaging, video feeds (Watch), groups, notifications, and native dark/light mode.

---

## 🔗 Live Demo (সরাসরি ব্যবহারের লিঙ্ক)

Experience the live, interactive Facebook Clone in your browser:

🚀 **[https://n0vemberain.github.io/facebook-clone/](https://n0vemberain.github.io/facebook-clone/)**

---

## 🌟 Key Features

### 1. 💬 Real-Time Interactive Messenger
- **Docked Floating Chat Windows:** Exactly like desktop Facebook, open multiple chat windows simultaneously docked at the bottom-right corner of the screen.
- **Minimized Floating Chat Heads:** Collapse open chat boxes into floating circular avatar bubbles with unread count badges.
- **Instant Messaging Engine:**
  - Send formatted text messages, photos, and emoji stickers.
  - One-click **Facebook Blue Thumbs-Up (👍)** quick reply.
  - **Synthesized Audio Chimes:** Real-time audio tones for incoming and outgoing messages powered by the HTML5 Web Audio API (no external audio assets required).
  - **Animated Typing Indicator:** Displays real-time typing status (`"... is typing"`).
  - **Simulated Interactive Replies:** Automated responses from friends for realistic testing.
- **Full-Page Messenger View (`/messages`):** Dedicated three-column layout featuring conversation search, active chats list, chat history, shared media gallery, contact details, and simulated audio/video calling.

### 2. 📰 News Feed & Post Creation
- **Rich Post Creation Modal:**
  - Audience Privacy Selector: 🌍 Public, 👥 Friends, 🔒 Only Me.
  - **Iconic Facebook Colored Gradient Backgrounds:** Publish bold, centered status updates with customizable gradient themes.
  - **Feeling & Activity Picker:** Express emotions and activities (😊 Happy, 🤩 Excited, 🍕 Eating, ✈️ Traveling, 🎉 Celebrating, 💻 Coding).
  - **Photo & Video Attachments:** Upload image attachments with live previews and removal controls.
- **Authentic 7-Reaction Hover Bar:**
  - Hover or long-press the Like button to reveal animated Facebook reaction emojis with bounce transitions:
    - 👍 **Like** (Classic Blue)
    - ❤️ **Love** (Red heart with confetti effect)
    - 🥰 **Care** (Warm hugging heart)
    - 😆 **Haha** (Laughing)
    - 😮 **Wow** (Surprised)
    - 😢 **Sad** (Crying)
    - 😡 **Angry** (Fiery orange-red)
- **Comments & Nested Replies:**
  - Threaded commenting with photo attachment support.
  - Like comments and post nested replies.
  - Delete own comments.
- **Post Management Actions:** Save posts, copy direct post link, share to News Feed, share directly in Messenger, or delete posts.

### 3. 📸 Facebook Stories
- **Horizontal Stories Carousel:** Responsive stories tray at the top of the feed with friend story cards.
- **Full-Screen Interactive Story Viewer:**
  - Segmented progress bar with a 5-second automatic timer.
  - Pause playback on hold or touch.
  - Previous / Next story navigation controls.
  - Quick reaction emojis (❤️, 🔥, 😮, 😂, 👏, 😢) with celebration particle effects.
  - Direct message reply composer within the story player.
- **Create Story Modal:**
  - **Text Story:** Choose from vibrant background gradients and customized typography.
  - **Photo Story:** Upload custom photos with live crop preview.

### 4. 👤 User Profiles & Multi-Account Switcher
- **Comprehensive Profile Page:**
  - High-resolution Cover photo banner and 2XL avatar with update triggers.
  - Bio, Work, Education, Current City, Hometown, Relationship status, and Join date.
  - Tab navigation: **Posts**, **About**, **Friends**, **Photos**.
- **Edit Profile Modal:** Live update avatar, cover photo, bio, and personal details.
- **Instant Profile Switcher:**
  - Switch seamlessly between 6 pre-configured realistic profiles:
    1. **Mark Zuckerberg** (`@zuck`) — Founder & CEO at Meta
    2. **Tanvir Ahmed** (`@tanvir_dev`) — Software Architect
    3. **Sarah Jenkins** (`@sarah_j`) — Senior UX Lead
    4. **Fahim Rahman** (`@fahim_r`) — AI Researcher
    5. **Nusrat Jahan** (`@nusrat_j`) — Visual Creator & Photographer
    6. **Alex Rivera** (`@alex_r`) — Fitness & Outdoor Adventurer
  - Switch accounts to test cross-user interactions: commenting, liking, sending friend requests, and bidirectional messaging.

### 5. 🛒 Facebook Marketplace
- Grid showcase of listings with localized prices, item titles, and seller details.
- Filter by categories: *Electronics, Sports & Outdoors, Furniture, Apparel*.
- Product detail modal with image gallery and seller info.
- **"Message Seller" Button:** Immediately opens a docked Messenger conversation with the seller prefilled with inquiry text.
- **Create Listing Modal:** Publish custom listings with title, price, category, location, description, and image uploads.

### 6. 📺 Facebook Watch (Video & Reels)
- Dedicated video feed with HTML5 video player, custom poster previews, and playback controls.
- Channel metadata with verification checkmarks, follower counts, and follow actions.
- Categorized feeds: *Home, Live, Reels, Saved*.
- Full engagement toolbar with video reactions, comments, and sharing.

### 7. 👥 Facebook Groups
- Explore, join, and participate in topic-based communities.
- Dedicated group banners, privacy badges, member statistics, and descriptions.
- Group feed with the ability to publish posts directly inside groups.

### 8. 🔍 Global Search & 🔔 Notifications
- **Instant Global Search Modal:** Live search matching across People, Posts, Marketplace listings, and Groups with keyboard accessibility.
- **Notifications Dropdown:** Real-time badge counter, unread filter tabs, interactive notification items, and "Mark all as read" functionality.

### 9. 🌓 Native Dark & Light Mode
- Pixel-perfect theme toggle matching Facebook's official Dark Palette (`#18191A`, `#242526`, `#3A3B3C`) and Light Palette (`#F0F2F5`, `#FFFFFF`).
- Persistent theme preference saved in `localStorage`.

---

## 🛠️ Technology Stack

| Layer | Tool / Library | Purpose |
|---|---|---|
| **Core Framework** | [React 18.3](https://react.dev/) | Component architecture & state management |
| **Language** | [TypeScript 5.7](https://www.typescriptlang.org/) | Type safety, maintainability, and interfaces |
| **Styling** | [Tailwind CSS 3.4](https://tailwindcss.com/) | Utility-first CSS matching Facebook design tokens |
| **Icons** | [Lucide React](https://lucide.dev/) | Pixel-perfect modern iconography |
| **Build Tool** | [Vite 6.0](https://vitejs.dev/) | Fast Hot Module Replacement (HMR) & production bundling |
| **Visual FX** | [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) | Animated reaction effects |
| **Audio** | HTML5 Web Audio API | Client-side synthesized Messenger notification tones |
| **State Storage** | Browser `localStorage` | Client-side state persistence across reloads |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- `npm` (version 9 or higher)

### Installation

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
   Open your browser and navigate to **`http://localhost:3030`**.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## 📂 Project Structure

```
facebook-clone/
├── index.html                   # HTML entry point with Facebook favicon
├── package.json                 # Project dependencies & npm scripts
├── tsconfig.json                # TypeScript compiler configuration
├── vite.config.ts               # Vite configuration (port 3030, host enabled)
├── tailwind.config.js           # Tailwind theme extending Facebook color palette
├── postcss.config.js            # PostCSS configuration
├── src/
│   ├── main.tsx                 # Root React mounting with Context Providers
│   ├── App.tsx                  # Main orchestration component & tab routing
│   ├── index.css                # Global styles, Tailwind directives & custom scrollbars
│   ├── types/
│   │   └── index.ts             # TypeScript definitions (User, Post, Message, Story, etc.)
│   ├── context/
│   │   ├── AuthContext.tsx      # Current user, switch profile, friend requests
│   │   ├── ChatContext.tsx      # Messenger threads, floating chat windows & audio
│   │   └── ThemeContext.tsx     # Light & dark mode management
│   ├── data/
│   │   ├── mockUsers.ts         # User profiles with avatars & bios
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
└── README.md                    # Project documentation
```

---

## 💡 Usage Tips

- **Testing Multi-User Messaging:** Click the **"Switch User"** pill in the top navigation bar to change profiles. Send a message to another user, then switch to their account to view and continue the conversation!
- **Reaction Bar:** Hover over the **Like** button on any post to trigger the animated 7-reaction popup. Choosing **Love** or **Care** triggers a celebratory confetti burst.
- **Docked Messenger:** Click on any user from the **Contacts** list on the right sidebar or from the **Marketplace** ("Message Seller") to open a floating chat window.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

> **Disclaimer:** This project was developed solely for educational and portfolio demonstration purposes. Facebook and Meta are registered trademarks of Meta Platforms, Inc.
