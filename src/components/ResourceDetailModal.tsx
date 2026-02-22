import { motion } from 'framer-motion';
import { X, Star, Download, Bookmark, BookmarkCheck, FileText, User, Calendar, HardDrive, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Resource } from '@/types';
import { mockReviews } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';

const typeLabels: Record<string, string> = {
  textbook: 'Textbook', research_paper: 'Research Paper', study_guide: 'Study Guide', video: 'Video', article: 'Article',
};

interface Props {
  resource: Resource;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

const ResourceDetailModal = ({ resource, onClose, isBookmarked, onToggleBookmark }: Props) => {
  const { toast } = useToast();
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const reviews = mockReviews.filter(r => r.resourceId === resource.id);

  const handleDownload = () => {
    toast({ title: 'Download started', description: `${resource.title} is being downloaded.` });
  };

  const handleSubmitReview = () => {
    if (userRating === 0) return;
    toast({ title: 'Review submitted', description: 'Thank you for your feedback!' });
    setUserRating(0);
    setReviewText('');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-card rounded-2xl shadow-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="gradient-primary p-6 rounded-t-2xl relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-primary-foreground/70 hover:text-primary-foreground">
            <X className="w-5 h-5" />
          </button>
          <Badge className="bg-card/20 text-primary-foreground border-0 mb-3">{typeLabels[resource.type]}</Badge>
          <h2 className="font-display text-2xl font-bold text-primary-foreground mb-2">{resource.title}</h2>
          <div className="flex items-center gap-3 text-primary-foreground/80 text-sm">
            <span className="flex items-center gap-1"><User className="w-4 h-4" /> {resource.author}</span>
            <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-current" /> {resource.rating} ({resource.reviewCount})</span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="font-display font-semibold mb-2">About this Resource</h3>
            <p className="text-sm text-muted-foreground">{resource.description}</p>
          </div>

          {/* Meta */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: FileText, label: 'Subject', value: resource.subject },
              { icon: GradCapIcon, label: 'Level', value: resource.gradeLevel },
              { icon: Calendar, label: 'Uploaded', value: new Date(resource.uploadedAt).toLocaleDateString() },
              { icon: HardDrive, label: 'Size', value: resource.fileSize },
              { icon: Download, label: 'Downloads', value: resource.downloads.toLocaleString() },
              { icon: Tag, label: 'Language', value: resource.language },
            ].map(m => (
              <div key={m.label} className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50">
                <m.icon className="w-4 h-4 text-muted-foreground" />
                <div>
                  <div className="text-xs text-muted-foreground">{m.label}</div>
                  <div className="text-sm font-medium">{m.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {resource.tags.map(t => (
              <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button className="flex-1 gradient-primary text-primary-foreground border-0" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" /> Download
            </Button>
            <Button variant="outline" onClick={onToggleBookmark}>
              {isBookmarked ? <BookmarkCheck className="w-4 h-4 mr-2 text-primary" /> : <Bookmark className="w-4 h-4 mr-2" />}
              {isBookmarked ? 'Saved' : 'Bookmark'}
            </Button>
          </div>

          {/* Reviews */}
          <div>
            <h3 className="font-display font-semibold mb-3">Reviews ({reviews.length})</h3>
            {reviews.length > 0 ? (
              <div className="space-y-3">
                {reviews.map(rev => (
                  <div key={rev.id} className="p-3 rounded-lg bg-secondary/50">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{rev.userName}</span>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < rev.rating ? 'fill-accent text-accent' : 'text-muted'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{rev.comment}</p>
                    <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
                      <span>👍 {rev.helpful}</span>
                      <span>👎 {rev.unhelpful}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No reviews yet. Be the first!</p>
            )}
          </div>

          {/* Add Review */}
          <div className="border-t border-border pt-4">
            <h4 className="font-semibold text-sm mb-2">Leave a Review</h4>
            <div className="flex gap-1 mb-3">
              {[1, 2, 3, 4, 5].map(s => (
                <button key={s} onClick={() => setUserRating(s)}>
                  <Star className={`w-5 h-5 transition-colors ${s <= userRating ? 'fill-accent text-accent' : 'text-muted hover:text-accent'}`} />
                </button>
              ))}
            </div>
            <Textarea placeholder="Share your thoughts..." className="mb-3 text-sm" rows={3} value={reviewText} onChange={e => setReviewText(e.target.value)} maxLength={500} />
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">{reviewText.length}/500</span>
              <Button size="sm" onClick={handleSubmitReview} disabled={userRating === 0}>Submit Review</Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Small helper to avoid import issue
const GradCapIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

export default ResourceDetailModal;
