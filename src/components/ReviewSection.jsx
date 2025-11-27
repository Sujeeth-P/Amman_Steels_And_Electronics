import React, { useState } from 'react';
import { Star, User, Send } from 'lucide-react';
import { cn } from '../lib/utils';

export default function ReviewSection({ productId, initialReviews = [] }) {
  const [reviews, setReviews] = useState(initialReviews);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 0,
    comment: ''
  });
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newReview.rating === 0) {
      alert("Please select a rating");
      return;
    }

    setIsSubmitting(true);

    // Simulate API delay
    setTimeout(() => {
      const review = {
        id: Date.now(),
        user: newReview.name,
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString().split('T')[0]
      };

      setReviews([review, ...reviews]);
      setNewReview({ name: '', rating: 0, comment: '' });
      setIsSubmitting(false);
    }, 600);
  };

  const averageRating = reviews.length 
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1) 
    : 0;

  return (
    <div className="mt-12 pt-12 border-t border-slate-200">
      <h2 className="text-2xl font-bold text-slate-900 mb-8">Customer Reviews</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 px-2 md:px-4 lg:px-6">
        {/* Summary & Form Section */}
        <div className="lg:col-span-1 space-y-8">
          {/* Rating Summary */}
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
            <div className="text-center">
              <div className="text-5xl font-bold text-slate-900 mb-2">{averageRating}</div>
              <div className="flex justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    size={20} 
                    className={cn(
                      "fill-current", 
                      star <= Math.round(averageRating) ? "text-yellow-400" : "text-slate-300"
                    )} 
                  />
                ))}
              </div>
              <p className="text-slate-500 text-sm">Based on {reviews.length} reviews</p>
            </div>
          </div>

          {/* Write a Review */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4">Write a Review</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Your Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      className="focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star 
                        size={24} 
                        className={cn(
                          "transition-colors",
                          star <= (hoveredStar || newReview.rating) 
                            ? "fill-yellow-400 text-yellow-400" 
                            : "text-slate-300"
                        )} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <input 
                  type="text" 
                  required
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Review</label>
                <textarea 
                  required
                  rows="3"
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                  placeholder="Share your experience with this product..."
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-slate-900 text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Posting...' : 'Submit Review'} <Send size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className="bg-white p-6 rounded-xl border border-slate-100 hover:shadow-sm transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                        <User size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{review.user}</h4>
                        <div className="flex items-center gap-2">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={12} 
                                className={cn("fill-current", i < review.rating ? "text-yellow-400" : "text-slate-200")} 
                              />
                            ))}
                          </div>
                          <span className="text-xs text-slate-400">• {review.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    "{review.comment}"
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <p className="text-slate-500">No reviews yet. Be the first to review this product!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
