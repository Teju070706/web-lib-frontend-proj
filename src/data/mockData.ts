import { Resource, Review, User } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1', name: 'Alex Johnson', email: 'alex@example.com', role: 'user',
    avatar: '', joinedAt: '2024-01-15', bookmarks: ['1', '3'], downloadHistory: ['1', '2', '5'],
  },
  {
    id: '2', name: 'Admin User', email: 'admin@example.com', role: 'admin',
    avatar: '', joinedAt: '2023-06-01', bookmarks: [], downloadHistory: [],
  },
];

const subjects = ['Mathematics', 'Physics', 'Computer Science', 'Biology', 'Chemistry', 'Literature', 'History', 'Economics'];
const types: Resource['type'][] = ['textbook', 'research_paper', 'study_guide', 'video', 'article'];
const gradeLevels = ['Undergraduate', 'Graduate', 'High School', 'Professional'];

export const mockResources: Resource[] = [
  {
    id: '1', title: 'Introduction to Linear Algebra', description: 'A comprehensive guide to linear algebra concepts including vectors, matrices, and transformations.',
    type: 'textbook', subject: 'Mathematics', gradeLevel: 'Undergraduate', language: 'English', author: 'Dr. Sarah Chen',
    thumbnail: '', fileUrl: '#', fileSize: '24.5 MB', uploadedAt: '2024-08-15', uploadedBy: '2',
    downloads: 1842, rating: 4.7, reviewCount: 156, tags: ['algebra', 'matrices', 'vectors'],
  },
  {
    id: '2', title: 'Quantum Computing: A Primer', description: 'Explore the fundamentals of quantum computing and its applications in modern technology.',
    type: 'research_paper', subject: 'Computer Science', gradeLevel: 'Graduate', language: 'English', author: 'Prof. James Liu',
    thumbnail: '', fileUrl: '#', fileSize: '8.2 MB', uploadedAt: '2024-09-02', uploadedBy: '2',
    downloads: 923, rating: 4.5, reviewCount: 89, tags: ['quantum', 'computing', 'qubits'],
  },
  {
    id: '3', title: 'Organic Chemistry Study Guide', description: 'Master organic chemistry with this detailed study guide covering reactions, mechanisms, and synthesis.',
    type: 'study_guide', subject: 'Chemistry', gradeLevel: 'Undergraduate', language: 'English', author: 'Dr. Maria Santos',
    thumbnail: '', fileUrl: '#', fileSize: '15.8 MB', uploadedAt: '2024-07-20', uploadedBy: '2',
    downloads: 2156, rating: 4.8, reviewCount: 234, tags: ['organic', 'reactions', 'synthesis'],
  },
  {
    id: '4', title: 'Machine Learning Fundamentals', description: 'Learn the core concepts of machine learning from supervised to unsupervised learning.',
    type: 'textbook', subject: 'Computer Science', gradeLevel: 'Graduate', language: 'English', author: 'Dr. Alan Park',
    thumbnail: '', fileUrl: '#', fileSize: '32.1 MB', uploadedAt: '2024-10-01', uploadedBy: '2',
    downloads: 3201, rating: 4.9, reviewCount: 312, tags: ['ML', 'AI', 'neural networks'],
  },
  {
    id: '5', title: 'World History: Modern Era', description: 'An engaging overview of world history from the Industrial Revolution to the present day.',
    type: 'textbook', subject: 'History', gradeLevel: 'High School', language: 'English', author: 'Prof. Emily Brown',
    thumbnail: '', fileUrl: '#', fileSize: '18.3 MB', uploadedAt: '2024-06-10', uploadedBy: '2',
    downloads: 1567, rating: 4.3, reviewCount: 98, tags: ['modern history', 'world wars', 'globalization'],
  },
  {
    id: '6', title: 'Microeconomics Principles', description: 'Understanding supply, demand, and market structures in modern economics.',
    type: 'article', subject: 'Economics', gradeLevel: 'Undergraduate', language: 'English', author: 'Dr. Robert Kim',
    thumbnail: '', fileUrl: '#', fileSize: '5.4 MB', uploadedAt: '2024-11-05', uploadedBy: '2',
    downloads: 876, rating: 4.1, reviewCount: 67, tags: ['microeconomics', 'supply demand', 'markets'],
  },
  {
    id: '7', title: 'Cell Biology Illustrated', description: 'Visual guide to cell structure, function, and molecular biology processes.',
    type: 'study_guide', subject: 'Biology', gradeLevel: 'Undergraduate', language: 'English', author: 'Dr. Lisa Wang',
    thumbnail: '', fileUrl: '#', fileSize: '28.7 MB', uploadedAt: '2024-09-18', uploadedBy: '2',
    downloads: 1423, rating: 4.6, reviewCount: 145, tags: ['cell biology', 'molecular', 'genetics'],
  },
  {
    id: '8', title: 'Classical Mechanics Video Series', description: 'Comprehensive video lectures covering Newtonian mechanics, energy, and momentum.',
    type: 'video', subject: 'Physics', gradeLevel: 'Undergraduate', language: 'English', author: 'Prof. David Miller',
    thumbnail: '', fileUrl: '#', fileSize: '2.1 GB', uploadedAt: '2024-08-28', uploadedBy: '2',
    downloads: 2890, rating: 4.8, reviewCount: 278, tags: ['mechanics', 'Newton', 'energy'],
  },
  {
    id: '9', title: 'Shakespeare: Complete Analysis', description: 'In-depth literary analysis of Shakespeare\'s major works and their cultural impact.',
    type: 'article', subject: 'Literature', gradeLevel: 'High School', language: 'English', author: 'Prof. Anne Taylor',
    thumbnail: '', fileUrl: '#', fileSize: '12.0 MB', uploadedAt: '2024-10-12', uploadedBy: '2',
    downloads: 654, rating: 4.4, reviewCount: 56, tags: ['Shakespeare', 'literary analysis', 'drama'],
  },
];

export const mockReviews: Review[] = [
  { id: '1', resourceId: '1', userId: '1', userName: 'Alex Johnson', rating: 5, comment: 'Excellent textbook! Clear explanations and great examples.', createdAt: '2024-09-01', helpful: 24, unhelpful: 1 },
  { id: '2', resourceId: '1', userId: '3', userName: 'Sam Wilson', rating: 4, comment: 'Very thorough coverage of linear algebra topics.', createdAt: '2024-09-15', helpful: 18, unhelpful: 2 },
  { id: '3', resourceId: '4', userId: '1', userName: 'Alex Johnson', rating: 5, comment: 'The best ML resource I\'ve found. Highly recommended!', createdAt: '2024-10-20', helpful: 42, unhelpful: 0 },
];

export const subjects_list = subjects;
export const types_list = types;
export const gradeLevels_list = gradeLevels;
