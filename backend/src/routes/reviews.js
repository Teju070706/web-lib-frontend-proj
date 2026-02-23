import express from 'express';
import Review from '../models/Review.js';
import Resource from '../models/Resource.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get reviews for a resource
router.get('/resource/:resourceId', async (req, res) => {
    try {
        const reviews = await Review.find({ resourceId: req.params.resourceId })
            .populate('userId', 'name avatar')
            .sort({ createdAt: -1 });

        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews', error: error.message });
    }
});

// Create review
router.post('/', authenticate, async (req, res) => {
    try {
        const { resourceId, rating, comment } = req.body;

        // Check if user already reviewed
        const existingReview = await Review.findOne({
            resourceId,
            userId: req.user._id
        });

        if (existingReview) {
            return res.status(400).json({ message: 'You have already reviewed this resource' });
        }

        const review = new Review({
            resourceId,
            userId: req.user._id,
            userName: req.user.name,
            rating,
            comment
        });

        await review.save();

        // Update resource rating
        const reviews = await Review.find({ resourceId });
        const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
        await Resource.findByIdAndUpdate(resourceId, {
            rating: Math.round(avgRating * 10) / 10,
            reviewCount: reviews.length
        });

        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: 'Error creating review', error: error.message });
    }
});

// Update review
router.put('/:id', authenticate, async (req, res) => {
    try {
        const { rating, comment } = req.body;

        const review = await Review.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            { rating, comment },
            { new: true }
        );

        if (!review) {
            return res.status(404).json({ message: 'Review not found or unauthorized' });
        }

        // Update resource rating
        const reviews = await Review.find({ resourceId: review.resourceId });
        const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
        await Resource.findByIdAndUpdate(review.resourceId, {
            rating: Math.round(avgRating * 10) / 10
        });

        res.json(review);
    } catch (error) {
        res.status(500).json({ message: 'Error updating review', error: error.message });
    }
});

// Delete review
router.delete('/:id', authenticate, async (req, res) => {
    try {
        let review;

        // Allow admin to delete any review
        if (req.user.role === 'admin') {
            review = await Review.findByIdAndDelete(req.params.id);
        } else {
            review = await Review.findOneAndDelete({
                _id: req.params.id,
                userId: req.user._id
            });
        }

        if (!review) {
            return res.status(404).json({ message: 'Review not found or unauthorized' });
        }

        // Update resource rating
        const reviews = await Review.find({ resourceId: review.resourceId });
        if (reviews.length > 0) {
            const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
            await Resource.findByIdAndUpdate(review.resourceId, {
                rating: Math.round(avgRating * 10) / 10,
                reviewCount: reviews.length
            });
        } else {
            await Resource.findByIdAndUpdate(review.resourceId, {
                rating: 0,
                reviewCount: 0
            });
        }

        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting review', error: error.message });
    }
});

// Mark review as helpful/unhelpful
router.post('/:id/helpful', authenticate, async (req, res) => {
    try {
        const { helpful } = req.body;

        const updateField = helpful ? { $inc: { helpful: 1 } } : { $inc: { unhelpful: 1 } };

        const review = await Review.findByIdAndUpdate(
            req.params.id,
            updateField,
            { new: true }
        );

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.json(review);
    } catch (error) {
        res.status(500).json({ message: 'Error updating review', error: error.message });
    }
});

export default router;
