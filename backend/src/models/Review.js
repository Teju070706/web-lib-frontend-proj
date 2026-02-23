import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    resourceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resource', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    helpful: { type: Number, default: 0 },
    unhelpful: { type: Number, default: 0 },
});

// Update resource rating when a review is added/modified
reviewSchema.post('save', async function () {
    const Resource = mongoose.model('Resource');
    const reviews = await this.constructor.find({ resourceId: this.resourceId });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await Resource.findByIdAndUpdate(this.resourceId, {
        rating: Math.round(avgRating * 10) / 10,
        reviewCount: reviews.length
    });
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
