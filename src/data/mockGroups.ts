import { Group } from '../types';

export const mockGroups: Group[] = [
  {
    id: 'grp_1',
    name: 'Full-Stack Web Developers Global',
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80',
    avatar: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=200&auto=format&fit=crop&q=80',
    privacy: 'Public',
    membersCount: 148500,
    description: 'A community for React, Node, TypeScript, Python, and modern cloud architecture engineers to share knowledge, jobs, and project showcases.',
    isJoined: true,
  },
  {
    id: 'grp_2',
    name: 'Artificial Intelligence & Large Language Models',
    coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&auto=format&fit=crop&q=80',
    avatar: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200&auto=format&fit=crop&q=80',
    privacy: 'Public',
    membersCount: 220000,
    description: 'Discussions on foundation models, AI agents, multimodal research, and AI product engineering.',
    isJoined: true,
  },
  {
    id: 'grp_3',
    name: 'UI/UX Designers & Product Crafters',
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80',
    avatar: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=200&auto=format&fit=crop&q=80',
    privacy: 'Private',
    membersCount: 89400,
    description: 'Design critique, Figma tips, motion design, design tokens, and frontend handoff.',
    isJoined: false,
  },
  {
    id: 'grp_4',
    name: 'Bangladesh Tech Community 🇧🇩',
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80',
    privacy: 'Public',
    membersCount: 65200,
    description: 'Connect with tech founders, software developers, and startup innovators across Bangladesh and diaspora.',
    isJoined: true,
  }
];
