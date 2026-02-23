import express from 'express';
import User from '../models/User.js';
import { generateToken, authenticate } from '../middleware/auth.js';

const router = express.Router();

// Register new user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // Create new user
        const user = new User({
            name,
            email,
            password,
            role: role || 'user',
            bookmarks: [],
            downloadHistory: []
        });

        await user.save();

        const token = generateToken(user._id);

        res.status(201).json({
            token,
            user: user.toJSON()
        });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
});

// Login user
router.post('/login', async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check role
        if (role && user.role !== role) {
            return res.status(400).json({ message: 'Invalid role for this user' });
        }

        const token = generateToken(user._id);

        res.json({
            token,
            user: user.toJSON()
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});

// Get current user
router.get('/me', authenticate, async (req, res) => {
    res.json(req.user);
});

// Logout (client-side token removal)
router.post('/logout', (req, res) => {
    res.json({ message: 'Logged out successfully' });
});

export default router;
