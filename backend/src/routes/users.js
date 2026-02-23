import express from 'express';
import User from '../models/User.js';
import Resource from '../models/Resource.js';
import { authenticate, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Get all users (admin only)
router.get('/', authenticate, adminOnly, async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
});

// Get user by ID
router.get('/:id', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
});

// Update user profile
router.put('/profile', authenticate, async (req, res) => {
    try {
        const { name, avatar } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { name, avatar },
            { new: true }
        ).select('-password');

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
});

// Change password
router.put('/password', authenticate, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(req.user._id);
        const isMatch = await user.comparePassword(currentPassword);

        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        user.password = newPassword;
        await user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error changing password', error: error.message });
    }
});

// Add to bookmarks
router.post('/bookmarks/:resourceId', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user.bookmarks.includes(req.params.resourceId)) {
            return res.status(400).json({ message: 'Resource already in bookmarks' });
        }

        user.bookmarks.push(req.params.resourceId);
        await user.save();

        res.json({ message: 'Added to bookmarks', bookmarks: user.bookmarks });
    } catch (error) {
        res.status(500).json({ message: 'Error adding bookmark', error: error.message });
    }
});

// Remove from bookmarks
router.delete('/bookmarks/:resourceId', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        user.bookmarks = user.bookmarks.filter(
            id => id.toString() !== req.params.resourceId
        );
        await user.save();

        res.json({ message: 'Removed from bookmarks', bookmarks: user.bookmarks });
    } catch (error) {
        res.status(500).json({ message: 'Error removing bookmark', error: error.message });
    }
});

// Get user bookmarks
router.get('/bookmarks', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .populate({
                path: 'bookmarks',
                populate: { path: 'uploadedBy', select: 'name email' }
            });

        res.json(user.bookmarks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookmarks', error: error.message });
    }
});

// Add to download history
router.post('/downloads/:resourceId', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        // Add to download history (keep last 50)
        user.downloadHistory.unshift(req.params.resourceId);
        if (user.downloadHistory.length > 50) {
            user.downloadHistory = user.downloadHistory.slice(0, 50);
        }
        await user.save();

        res.json({ message: 'Added to download history', downloadHistory: user.downloadHistory });
    } catch (error) {
        res.status(500).json({ message: 'Error adding to download history', error: error.message });
    }
});

// Get user download history
router.get('/downloads', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .populate({
                path: 'downloadHistory',
                populate: { path: 'uploadedBy', select: 'name email' }
            });

        res.json(user.downloadHistory);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching download history', error: error.message });
    }
});

// Delete user (admin only)
router.delete('/:id', authenticate, adminOnly, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
});

export default router;
