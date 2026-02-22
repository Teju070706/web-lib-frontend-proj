export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  joinedAt: string;
  bookmarks: string[];
  downloadHistory: string[];
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'textbook' | 'research_paper' | 'study_guide' | 'video' | 'article';
  subject: string;
  gradeLevel: string;
  language: string;
  author: string;
  thumbnail: string;
  fileUrl: string;
  fileSize: string;
  uploadedAt: string;
  uploadedBy: string;
  downloads: number;
  rating: number;
  reviewCount: number;
  tags: string[];
}

export interface Review {
  id: string;
  resourceId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
  helpful: number;
  unhelpful: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
