import React, { useState, useEffect } from 'react';
import { Star, User, MessageSquare, Send, Trash2 } from 'lucide-react';
import Reveal from './Reveal';

const Reviews = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Priya S.",
      rating: 5,
      text: "This tea is amazing. Very refreshing and calming. Perfect for my evening ritual.",
      date: new Date().toLocaleDateString()
    },
    {
      id: 2,
      name: "Rahul M.",
      rating: 4,
      text: "Great flavor profile! You can really taste the freshness of the lemongrass.",
      date: new Date().toLocaleDateString()
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    text: ''
  });

  useEffect(() => {
    const savedReviews = localStorage.getItem('product_reviews');
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.text) return;

    const currentUserId = sessionStorage.getItem('currentUser') || 'guest';

    const newReview = {
      id: Date.now(),
      ...formData,
      userId: currentUserId, // Track ownership
      date: new Date().toLocaleDateString()
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem('product_reviews', JSON.stringify(updatedReviews));
    setFormData({ name: '', rating: 5, text: '' });
  };

  const handleDelete = (id) => {
    const updatedReviews = reviews.filter(r => r.id !== id);
    setReviews(updatedReviews);
    localStorage.setItem('product_reviews', JSON.stringify(updatedReviews));
  };

  return (
    <section id="reviews" className="py-24 bg-card relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display text-foreground mb-4">
            Customer <span className="italic text-primary">Reviews</span>
          </h2>
          <p className="text-muted-foreground">What our community loves about PushpRas.</p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Reviews List */}
          <div className="space-y-8">
            {reviews.map((review, index) => (
              <Reveal key={review.id} delay={index * 0.1}>
                <div className="bg-background p-8 rounded-[32px] border border-border hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-1 text-secondary mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 fill-secondary ${i >= review.rating ? 'opacity-30' : ''}`} 
                      />
                    ))}
                  </div>
                  <p className="text-stone-700 italic mb-6 leading-relaxed">"{review.text}"</p>
                    <div className="flex-grow flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-stone-900">— {review.name}</h4>
                          <span className="text-xs text-stone-400">{review.date}</span>
                        </div>
                      </div>

                      {sessionStorage.getItem('currentUser') === review.userId && (
                        <button 
                          onClick={() => handleDelete(review.id)}
                          className="p-2 text-stone-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                          title="Delete My Review"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Submission Form */}
          <Reveal delay={0.2} className="sticky top-32">
            <div className="bg-primary/5 p-8 md:p-10 rounded-[40px] border border-primary/10">
              <h3 className="text-3xl font-display font-bold text-stone-900 mb-8 flex items-center gap-3">
                <MessageSquare className="w-8 h-8 text-primary" />
                Share Your <span className="text-primary italic">Story</span>
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Display Name</label>
                  <input 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Priya S."
                    className="w-full px-6 py-4 rounded-2xl bg-white border border-stone-200 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({...formData, rating: star})}
                        className="transition-transform active:scale-95"
                      >
                        <Star className={`w-8 h-8 ${formData.rating >= star ? 'fill-secondary text-secondary' : 'text-stone-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Review Content</label>
                  <textarea 
                    required
                    value={formData.text}
                    onChange={(e) => setFormData({...formData, text: e.target.value})}
                    placeholder="Tell us about your experience..."
                    rows="4"
                    className="w-full px-6 py-4 rounded-2xl bg-white border border-stone-200 focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 rounded-full bg-primary text-white font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-3"
                >
                  <Send className="w-5 h-5" /> Submit Review
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
