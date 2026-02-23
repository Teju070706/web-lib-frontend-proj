import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Resource from './models/Resource.js';
import Review from './models/Review.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/eduvault';

const seedData = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await Resource.deleteMany({});
        await Review.deleteMany({});
        console.log('Cleared existing data');

        // Create users
        const adminUser = await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'admin123',
            role: 'admin',
            avatar: '',
            joinedAt: new Date('2023-06-01'),
            bookmarks: [],
            downloadHistory: []
        });

        const regularUser = await User.create({
            name: 'Alex Johnson',
            email: 'alex@example.com',
            password: 'user123',
            role: 'user',
            avatar: '',
            joinedAt: new Date('2024-01-15'),
            bookmarks: [],
            downloadHistory: []
        });

        console.log('Created users');

        // Create resources
        const resources = await Resource.insertMany([
            {
                title: 'Introduction to Linear Algebra',
                description: 'A comprehensive guide to linear algebra concepts including vectors, matrices, and transformations.',
                type: 'textbook',
                subject: 'Mathematics',
                gradeLevel: 'Undergraduate',
                language: 'English',
                author: 'Dr. Sarah Chen',
                thumbnail: '',
                fileUrl: '/files/linear-algebra.pdf',
                fileSize: '24.5 MB',
                uploadedAt: new Date('2024-08-15'),
                uploadedBy: adminUser._id,
                downloads: 1842,
                rating: 4.7,
                reviewCount: 2,
                tags: ['algebra', 'matrices', 'vectors']
            },
            {
                title: 'Quantum Computing: A Primer',
                description: 'Explore the fundamentals of quantum computing and its applications in modern technology.',
                type: 'research_paper',
                subject: 'Computer Science',
                gradeLevel: 'Graduate',
                language: 'English',
                author: 'Prof. James Liu',
                thumbnail: '',
                fileUrl: '/files/quantum-computing.pdf',
                fileSize: '8.2 MB',
                uploadedAt: new Date('2024-09-02'),
                uploadedBy: adminUser._id,
                downloads: 923,
                rating: 4.5,
                reviewCount: 0,
                tags: ['quantum', 'computing', 'qubits']
            },
            {
                title: 'Organic Chemistry Study Guide',
                description: 'Master organic chemistry with this detailed study guide covering reactions, mechanisms, and synthesis.',
                type: 'study_guide',
                subject: 'Chemistry',
                gradeLevel: 'Undergraduate',
                language: 'English',
                author: 'Dr. Maria Santos',
                thumbnail: '',
                fileUrl: '/files/organic-chemistry.pdf',
                fileSize: '15.8 MB',
                uploadedAt: new Date('2024-07-20'),
                uploadedBy: adminUser._id,
                downloads: 2156,
                rating: 4.8,
                reviewCount: 0,
                tags: ['organic', 'reactions', 'synthesis']
            },
            {
                title: 'Machine Learning Fundamentals',
                description: 'Learn the core concepts of machine learning from supervised to unsupervised learning.',
                type: 'textbook',
                subject: 'Computer Science',
                gradeLevel: 'Graduate',
                language: 'English',
                author: 'Dr. Alan Park',
                thumbnail: '',
                fileUrl: '/files/ml-fundamentals.pdf',
                fileSize: '32.1 MB',
                uploadedAt: new Date('2024-10-01'),
                uploadedBy: adminUser._id,
                downloads: 3201,
                rating: 4.9,
                reviewCount: 1,
                tags: ['ML', 'AI', 'neural networks']
            },
            {
                title: 'World History: Modern Era',
                description: 'An engaging overview of world history from the Industrial Revolution to the present day.',
                type: 'textbook',
                subject: 'History',
                gradeLevel: 'High School',
                language: 'English',
                author: 'Prof. Emily Brown',
                thumbnail: '',
                fileUrl: '/files/world-history.pdf',
                fileSize: '18.3 MB',
                uploadedAt: new Date('2024-06-10'),
                uploadedBy: adminUser._id,
                downloads: 1567,
                rating: 4.3,
                reviewCount: 0,
                tags: ['modern history', 'world wars', 'globalization']
            },
            {
                title: 'Microeconomics Principles',
                description: 'Understanding supply, demand, and market structures in modern economics.',
                type: 'article',
                subject: 'Economics',
                gradeLevel: 'Undergraduate',
                language: 'English',
                author: 'Dr. Robert Kim',
                thumbnail: '',
                fileUrl: '/files/microeconomics.pdf',
                fileSize: '5.4 MB',
                uploadedAt: new Date('2024-11-05'),
                uploadedBy: adminUser._id,
                downloads: 876,
                rating: 4.1,
                reviewCount: 0,
                tags: ['microeconomics', 'supply demand', 'markets']
            },
            {
                title: 'Cell Biology Illustrated',
                description: 'Visual guide to cell structure, function, and molecular biology processes.',
                type: 'study_guide',
                subject: 'Biology',
                gradeLevel: 'Undergraduate',
                language: 'English',
                author: 'Dr. Lisa Wang',
                thumbnail: '',
                fileUrl: '/files/cell-biology.pdf',
                fileSize: '28.7 MB',
                uploadedAt: new Date('2024-09-18'),
                uploadedBy: adminUser._id,
                downloads: 1423,
                rating: 4.6,
                reviewCount: 0,
                tags: ['cell biology', 'molecular', 'genetics']
            },
            {
                title: 'Classical Mechanics Video Series',
                description: 'Comprehensive video lectures covering Newtonian mechanics, energy, and momentum.',
                type: 'video',
                subject: 'Physics',
                gradeLevel: 'Undergraduate',
                language: 'English',
                author: 'Prof. David Miller',
                thumbnail: '',
                fileUrl: '/files/classical-mechanics.mp4',
                fileSize: '2.1 GB',
                uploadedAt: new Date('2024-08-28'),
                uploadedBy: adminUser._id,
                downloads: 2890,
                rating: 4.8,
                reviewCount: 0,
                tags: ['mechanics', 'Newton', 'energy']
            },
            {
                title: 'Shakespeare: Complete Analysis',
                description: 'In-depth literary analysis of Shakespeare major works and their cultural impact.',
                type: 'article',
                subject: 'Literature',
                gradeLevel: 'High School',
                language: 'English',
                author: 'Prof. Anne Taylor',
                thumbnail: '',
                fileUrl: '/files/shakespeare-analysis.pdf',
                fileSize: '12.0 MB',
                uploadedAt: new Date('2024-10-12'),
                uploadedBy: adminUser._id,
                downloads: 654,
                rating: 4.4,
                reviewCount: 0,
                tags: ['Shakespeare', 'literary analysis', 'drama']
            }
        ]);

        console.log('Created resources');

        // Update user bookmarks and download history
        await User.findByIdAndUpdate(regularUser._id, {
            bookmarks: [resources[0]._id, resources[2]._id],
            downloadHistory: [resources[0]._id, resources[1]._id, resources[4]._id]
        });

        // Create reviews
        await Review.insertMany([
            {
                resourceId: resources[0]._id,
                userId: regularUser._id,
                userName: 'Alex Johnson',
                rating: 5,
                comment: 'Excellent textbook! Clear explanations and great examples.',
                createdAt: new Date('2024-09-01'),
                helpful: 24,
                unhelpful: 1
            },
            {
                resourceId: resources[0]._id,
                userId: adminUser._id,
                userName: 'Admin User',
                rating: 4,
                comment: 'Very thorough coverage of linear algebra topics.',
                createdAt: new Date('2024-09-15'),
                helpful: 18,
                unhelpful: 2
            },
            {
                resourceId: resources[3]._id,
                userId: regularUser._id,
                userName: 'Alex Johnson',
                rating: 5,
                comment: 'The best ML resource I have found. Highly recommended!',
                createdAt: new Date('2024-10-20'),
                helpful: 42,
                unhelpful: 0
            }
        ]);

        console.log('Created reviews');
        console.log('\n Seed data created successfully!');
        console.log('\nTest accounts:');
        console.log('  Admin: admin@example.com / admin123');
        console.log('  User: alex@example.com / user123');

    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
};

seedData();
