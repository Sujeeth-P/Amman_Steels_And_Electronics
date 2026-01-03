import React, { useState, useEffect } from 'react';
import { Star, User, Send, ThumbsUp, Edit2, Trash2, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';

const API_BASE = 'http://localhost:5000/api';

export default function ReviewSection({ productId }) {
  const { user, isAuthenticated } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({
    averageRating: 0,
    totalReviews: 0,
    ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  });
  const [newReview, setNewReview] = useState({
    rating: 0,
    title: '',
    comment: ''
  });
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [userHasReviewed, setUserHasReviewed] = useState(false);
  const [userReview, setUserReview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    hasMore: false
  });

  // Fetch reviews from API
  const fetchReviews = async (page = 1) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

      const response = await fetch(
        `${API_BASE}/reviews/${productId}?sort=${sortBy}&page=${page}&limit=10`,
        { headers }
      );
      const data = await response.json();

      if (data.success) {
        setReviews(data.reviews);
        setStats(data.stats);
        setPagination(data.pagination);
        setUserHasReviewed(data.userHasReviewed);
        setUserReview(data.userReview);

        // If user has a review, pre-fill the form for editing
        if (data.userReview) {
          setNewReview({
            rating: data.userReview.rating,
            title: data.userReview.title || '',
            comment: data.userReview.comment
          });
        }
      }
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId, sortBy]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setError('Please sign in to leave a review');
      return;
    }

    if (newReview.rating === 0) {
      setError('Please select a rating');
      return;
    }

    if (newReview.comment.trim().length < 10) {
      setError('Review must be at least 10 characters');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const url = isEditing
        ? `${API_BASE}/reviews/${userReview.id}`
        : `${API_BASE}/reviews/${productId}`;

      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          rating: newReview.rating,
          title: newReview.title,
          comment: newReview.comment
        })
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMsg(isEditing ? 'Review updated successfully!' : 'Review submitted successfully!');
        setIsEditing(false);
        fetchReviews();

        if (!isEditing) {
          setNewReview({ rating: 0, title: '', comment: '' });
        }

        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        setError(data.message || 'Failed to submit review');
      }
    } catch (err) {
      setError('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your review?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/reviews/${userReview.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMsg('Review deleted successfully!');
        setNewReview({ rating: 0, title: '', comment: '' });
        setUserHasReviewed(false);
        setUserReview(null);
        setIsEditing(false);
        fetchReviews();
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        setError(data.message || 'Failed to delete review');
      }
    } catch (err) {
      setError('Failed to delete review. Please try again.');
    }
  };

  const handleHelpful = async (reviewId) => {
    if (!isAuthenticated) {
      setError('Please sign in to vote');
      setTimeout(() => setError(''), 3000);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/reviews/${reviewId}/helpful`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        // Update the review in the list
        setReviews(reviews.map(review =>
          review.id === reviewId
            ? { ...review, helpfulVotes: data.helpfulVotes }
            : review
        ));
      }
    } catch (err) {
      console.error('Failed to vote:', err);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="mt-12 pt-12 border-t border-slate-200">
      <h2 className="text-2xl font-bold text-slate-900 mb-8">Customer Reviews</h2>

      {/* Messages */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          {successMsg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 px-2 md:px-4 lg:px-6">
        {/* Summary & Form Section */}
        <div className="lg:col-span-1 space-y-8">
          {/* Rating Summary */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 p-6 rounded-xl border border-slate-100">
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-slate-900 mb-2">{stats.averageRating}</div>
              <div className="flex justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={20}
                    className={cn(
                      "fill-current",
                      star <= Math.round(stats.averageRating) ? "text-yellow-400" : "text-slate-300"
                    )}
                  />
                ))}
              </div>
              <p className="text-slate-500 text-sm">Based on {stats.totalReviews} reviews</p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = stats.ratingDistribution[rating] || 0;
                const percentage = stats.totalReviews > 0
                  ? (count / stats.totalReviews) * 100
                  : 0;

                return (
                  <div key={rating} className="flex items-center gap-2 text-sm">
                    <span className="w-8 text-slate-600">{rating}★</span>
                    <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-8 text-slate-500 text-right">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Write a Review */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              {isEditing ? (
                <>
                  <Edit2 size={18} className="text-blue-600" />
                  Edit Your Review
                </>
              ) : userHasReviewed ? (
                'Your Review'
              ) : (
                'Write a Review'
              )}
            </h3>

            {!isAuthenticated ? (
              <div className="text-center py-6">
                <User size={40} className="mx-auto text-slate-300 mb-3" />
                <p className="text-slate-600 mb-4">Sign in to leave a review</p>
                <a
                  href="/signin"
                  className="inline-block px-6 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                >
                  Sign In
                </a>
              </div>
            ) : userHasReviewed && !isEditing ? (
              <div className="space-y-4">
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={20}
                      className={cn(
                        "fill-current",
                        star <= newReview.rating ? "text-yellow-400" : "text-slate-300"
                      )}
                    />
                  ))}
                </div>
                {newReview.title && (
                  <p className="font-semibold text-slate-900">{newReview.title}</p>
                )}
                <p className="text-slate-600 text-sm">"{newReview.comment}"</p>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Edit2 size={14} /> Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ) : (
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
                          size={28}
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
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Title <span className="text-slate-400">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={newReview.title}
                    onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                    placeholder="Summarize your experience"
                    maxLength={100}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Review</label>
                  <textarea
                    required
                    rows="4"
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm resize-none"
                    placeholder="Share your experience with this product..."
                    minLength={10}
                    maxLength={1000}
                  />
                  <p className="text-xs text-slate-400 mt-1">{newReview.comment.length}/1000</p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-slate-900 text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        {isEditing ? 'Updating...' : 'Submitting...'}
                      </>
                    ) : (
                      <>
                        {isEditing ? 'Update Review' : 'Submit Review'}
                        <Send size={16} />
                      </>
                    )}
                  </button>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        if (userReview) {
                          setNewReview({
                            rating: userReview.rating,
                            title: userReview.title || '',
                            comment: userReview.comment
                          });
                        }
                      }}
                      className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-2">
          {/* Sort Options */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-slate-600 text-sm">
              {stats.totalReviews} {stats.totalReviews === 1 ? 'review' : 'reviews'}
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Rated</option>
              <option value="lowest">Lowest Rated</option>
              <option value="helpful">Most Helpful</option>
            </select>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 size={32} className="animate-spin text-blue-600" />
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.length > 0 ? (
                <>
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className={cn(
                        "bg-white p-6 rounded-xl border hover:shadow-md transition-all",
                        review.userId === user?._id
                          ? "border-blue-200 bg-blue-50/30"
                          : "border-slate-100"
                      )}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {review.userName?.charAt(0).toUpperCase() || 'U'}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-slate-900 text-sm">{review.userName}</h4>
                              {review.userId === user?._id && (
                                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                                  You
                                </span>
                              )}
                              {review.isVerifiedPurchase && (
                                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                                  Verified Purchase
                                </span>
                              )}
                            </div>
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
                              <span className="text-xs text-slate-400">• {formatDate(review.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {review.title && (
                        <h5 className="font-semibold text-slate-900 mb-2">{review.title}</h5>
                      )}

                      <p className="text-slate-600 text-sm leading-relaxed mb-4">
                        "{review.comment}"
                      </p>

                      {/* Helpful Button */}
                      <button
                        onClick={() => handleHelpful(review.id)}
                        className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors group"
                      >
                        <ThumbsUp size={14} className="group-hover:fill-blue-100" />
                        <span>Helpful ({review.helpfulVotes || 0})</span>
                      </button>
                    </div>
                  ))}

                  {/* Load More */}
                  {pagination.hasMore && (
                    <button
                      onClick={() => fetchReviews(pagination.currentPage + 1)}
                      className="w-full py-3 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors font-medium"
                    >
                      Load More Reviews
                    </button>
                  )}
                </>
              ) : (
                <div className="text-center py-16 bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-xl border border-dashed border-slate-200">
                  <Star size={48} className="mx-auto text-slate-300 mb-4" />
                  <h4 className="font-semibold text-slate-900 mb-2">No Reviews Yet</h4>
                  <p className="text-slate-500">Be the first to review this product!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
