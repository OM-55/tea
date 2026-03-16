import React, { useState, useEffect } from 'react';
import { Star, User, MessageSquare, Send, Trash2, Pencil } from 'lucide-react';
import Reveal from './Reveal';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    text: ''
  });

  const currentUser = sessionStorage.getItem('currentUser');

  useEffect(() => {
    const loadReviews = async () => {
      try {
        // Fetch shared reviews (seed)
        const response = await fetch('/reviews.json');
        const seedReviews = await response.json();
        
        // Fetch local reviews (overrides)
        const savedReviews = localStorage.getItem('product_reviews');
        const localReviews = savedReviews ? JSON.parse(savedReviews) : [];
        
        // Merge: Local reviews replace seed reviews if IDs match, otherwise stack them
        // In this shared-ready simulation, we use a Map for easy deduplication
        const reviewMap = new Map();
        seedReviews.forEach(r => reviewMap.set(r.id, r));
        localReviews.forEach(r => reviewMap.set(r.id, r));
        
        const merged = Array.from(reviewMap.values()).sort((a, b) => b.id - a.id);
        setReviews(merged);
      } catch (error) {
        console.error('Error loading shared reviews:', error);
        // Fallback to local only if fetch fails
        const savedReviews = localStorage.getItem('product_reviews');
        if (savedReviews) setReviews(JSON.parse(savedReviews));
      }
    };
    
    loadReviews();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.text) return;

    const currentUserId = currentUser || 'guest';

    const newReview = {
      id: Date.now(),
      ...formData,
      userId: currentUserId,
      date: new Date().toLocaleDateString()
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem('product_reviews', JSON.stringify(updatedReviews.filter(r => r.userId === currentUserId)));
    setFormData({ name: '', rating: 5, text: '' });
  };

  const handleUpdate = (id) => {
    const updatedReviews = reviews.map(r => 
      r.id === id ? { ...r, text: editContent } : r
    );
    setReviews(updatedReviews);
    
    // Update local persistence for the owner
    const localOwned = updatedReviews.filter(r => r.userId === currentUser);
    localStorage.setItem('product_reviews', JSON.stringify(localOwned));
    
    setEditingId(null);
  };

  const handleDelete = (id) => {
    const updatedReviews = reviews.filter(r => r.id !== id);
    setReviews(updatedReviews);
    
    const localOwned = updatedReviews.filter(r => r.userId === currentUser);
    localStorage.setItem('product_reviews', JSON.stringify(localOwned));
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
                  
                  {editingId === review.id ? (
                    <div className="mb-6 space-y-4">
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full p-4 rounded-xl border border-primary/20 focus:ring-2 focus:ring-primary/10 outline-none transition-all resize-none min-h-[100px]"
                        autoFocus
                      />
                      <div className="flex gap-4">
                        <button 
                          onClick={() => handleUpdate(review.id)}
                          className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-full hover:bg-primary/90 transition-all"
                        >
                          Save Changes
                        </button>
                        <button 
                          onClick={() => setEditingId(null)}
                          className="px-4 py-2 bg-stone-100 text-stone-600 text-xs font-bold rounded-full hover:bg-stone-200 transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-stone-700 italic mb-6 leading-relaxed">"{review.text}"</p>
                  )}

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

                    {currentUser === review.userId && !editingId && (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            setEditingId(review.id);
                            setEditContent(review.text);
                          }}
                          className="p-2 text-stone-300 hover:text-primary hover:bg-primary/5 rounded-full transition-all"
                          title="Edit My Review"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(review.id)}
                          className="p-2 text-stone-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                          title="Delete My Review"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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
