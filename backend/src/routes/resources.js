import express from 'express';
import Resource from '../models/Resource.js';
import { authenticate, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Get all resources with filters
router.get('/', async (req, res) => {
    try {
        const {
            subject,
            type,
            gradeLevel,
            search,
            sortBy = 'uploadedAt',
            sortOrder = 'desc',
            page = 1,
            limit = 20
        } = req.query;

        const query = {};

        if (subject) query.subject = subject;
        if (type) query.type = type;
        if (gradeLevel) query.gradeLevel = gradeLevel;
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { tags: { $in: [new RegExp(search, 'i')] } }
            ];
        }

        const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const resources = await Resource.find(query)
            .populate('uploadedBy', 'name email')
            .sort(sort)
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Resource.countDocuments(query);

        res.json({
            resources,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / parseInt(limit))
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching resources', error: error.message });
    }
});

// Get single resource
router.get('/:id', async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id)
            .populate('uploadedBy', 'name email');

        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        res.json(resource);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching resource', error: error.message });
    }
});

// Create resource (admin only)
router.post('/', authenticate, adminOnly, async (req, res) => {
    try {
        const resource = new Resource({
            ...req.body,
            uploadedBy: req.user._id
        });

        await resource.save();
        res.status(201).json(resource);
    } catch (error) {
        res.status(500).json({ message: 'Error creating resource', error: error.message });
    }
});

// Update resource (admin only)
router.put('/:id', authenticate, adminOnly, async (req, res) => {
    try {
        const resource = await Resource.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        res.json(resource);
    } catch (error) {
        res.status(500).json({ message: 'Error updating resource', error: error.message });
    }
});

// Delete resource (admin only)
router.delete('/:id', authenticate, adminOnly, async (req, res) => {
    try {
        const resource = await Resource.findByIdAndDelete(req.params.id);

        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        res.json({ message: 'Resource deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting resource', error: error.message });
    }
});

// Increment downloads
router.post('/:id/download', async (req, res) => {
    try {
        const resource = await Resource.findByIdAndUpdate(
            req.params.id,
            { $inc: { downloads: 1 } },
            { new: true }
        );

        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        res.json(resource);
    } catch (error) {
        res.status(500).json({ message: 'Error incrementing downloads', error: error.message });
    }
});

// Get featured/popular resources
router.get('/featured/popular', async (req, res) => {
    try {
        const resources = await Resource.find()
            .sort({ downloads: -1 })
            .limit(10)
            .populate('uploadedBy', 'name email');

        res.json(resources);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching popular resources', error: error.message });
    }
});

// Get top rated resources
router.get('/featured/top-rated', async (req, res) => {
    try {
        const resources = await Resource.find({ reviewCount: { $gt: 0 } })
            .sort({ rating: -1 })
            .limit(10)
            .populate('uploadedBy', 'name email');

        res.json(resources);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching top rated resources', error: error.message });
    }
});

// Get subjects list
router.get('/meta/subjects', async (req, res) => {
    try {
        const subjects = await Resource.distinct('subject');
        res.json(subjects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subjects', error: error.message });
    }
});

export default router;
