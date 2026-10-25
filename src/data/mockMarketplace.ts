import { MarketplaceItem } from '../types';
import { mockUsers } from './mockUsers';

export const mockMarketplaceItems: MarketplaceItem[] = [
  {
    id: 'mp_1',
    title: 'Sony Alpha A7 IV Mirrorless Camera Body',
    price: 1850,
    location: 'Dhaka, Bangladesh',
    category: 'Electronics',
    description: 'Barely used Sony A7 IV in mint condition with box, charger, two original batteries and strap. Shutter count under 4,500.',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80',
    seller: mockUsers[4], // Nusrat Jahan
    createdAt: '2 days ago',
  },
  {
    id: 'mp_2',
    title: 'Apple MacBook Pro 16" M3 Max 36GB / 1TB SSD',
    price: 2600,
    location: 'San Francisco, CA',
    category: 'Electronics',
    description: 'Space Black M3 Max MacBook Pro in pristine condition. AppleCare+ valid through late 2026. Includes original 140W MagSafe charger.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
    seller: mockUsers[2], // Sarah Jenkins
    createdAt: '1 day ago',
  },
  {
    id: 'mp_3',
    title: 'Trek Mountain Bike Fuel EX 8 (Large)',
    price: 1400,
    location: 'Denver, Colorado',
    category: 'Sports & Outdoors',
    description: 'Full suspension 29er mountain bike. Tubeless setup, dropper post, Shimano XT drivetrain. Regularly serviced and ready for the trails.',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&auto=format&fit=crop&q=80',
    seller: mockUsers[5], // Alex Rivera
    createdAt: '3 days ago',
  },
  {
    id: 'mp_4',
    title: 'Modern Ergonomic Herman Miller Aeron Chair (Size B)',
    price: 650,
    location: 'Palo Alto, CA',
    category: 'Furniture',
    description: 'Mineral colorway with posturefit SL and fully adjustable arms. Perfect for work-from-home engineers and creatives.',
    image: 'https://images.unsplash.com/photo-1580481077195-c3a8a37f714c?w=800&auto=format&fit=crop&q=80',
    seller: mockUsers[0], // Mark Zuckerberg
    createdAt: '4 days ago',
  },
  {
    id: 'mp_5',
    title: 'Vintage Leather Travel Backpack',
    price: 120,
    location: 'Dhaka, Bangladesh',
    category: 'Apparel',
    description: 'Handcrafted full-grain leather rucksack with padded laptop compartment and brass buckles.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
    seller: mockUsers[1], // Tanvir Ahmed
    createdAt: '5 days ago',
  },
  {
    id: 'mp_6',
    title: 'Mechanical Keyboard Custom Keychron Q1 Pro',
    price: 175,
    location: 'Toronto, Canada',
    category: 'Electronics',
    description: 'Wireless custom mechanical keyboard with Gateron Jupiter Banana tactile switches and PBT keycaps.',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
    seller: mockUsers[3], // Fahim Rahman
    createdAt: '6 days ago',
  }
];
