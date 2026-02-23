import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: {
        type: String,
        enum: ['textbook', 'research_paper', 'study_guide', 'video', 'article'],
        required: true
    },
    subject: { type: String, required: true },
    gradeLevel: { type: String, required: true },
    language: { type: String, default: 'English' },
    author: { type: String, required: true },
    thumbnail: { type: String, default: '' },
    fileUrl: { type: String, required: true },
    fileSize: { type: String, default: '0 MB' },
    uploadedAt: { type: Date, default: Date.now },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    downloads: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    tags: [{ type: String }],
});

// Index for searching
resourceSchema.index({ title: 'text', description: 'text', tags: 'text' });

const Resource = mongoose.model('Resource', resourceSchema);

export default Resource;
