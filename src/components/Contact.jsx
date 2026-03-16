import React, { useState } from 'react';
import { MapPin, Mail, Phone, Send, CheckCircle, Loader2 } from 'lucide-react';
import Reveal from './Reveal';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      e.target.reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setIsSubscribed(true);
    e.target.reset();
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  return (
    <section id="contact" className="py-24 bg-card relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Newsletter Section */}
        <Reveal className="bg-primary rounded-3xl p-8 md:p-12 mb-24 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h3 className="text-3xl font-display font-bold text-primary-foreground mb-2">
              Join the PushpRas Club
            </h3>
            <p className="text-primary-foreground/80">
              Get 10% off your first order, exclusive brewing tips, and wellness articles delivered to your inbox.
            </p>
          </div>
          <form onSubmit={handleNewsletterSubmit} className="w-full md:w-auto flex-grow max-w-md relative">
            <div className="relative">
              <input
                type="email"
                required
                placeholder="Your email address"
                className="w-full px-6 py-4 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:bg-primary-foreground focus:text-foreground transition-all pr-32"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 px-6 rounded-full bg-accent text-accent-foreground font-bold hover:bg-accent/90 transition-colors flex items-center justify-center"
              >
                Subscribe
              </button>
            </div>
            {isSubscribed && (
              <p className="text-white text-sm mt-2 pl-4 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" /> You're on the list!
              </p>
            )}
          </form>
        </Reveal>

        {/* Contact Info and Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-display text-foreground mb-6">
              Let's <span className="italic text-primary">Connect</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Have a question about our ingredients, need help with an order, or want to stock PushpRas in your store? Reach out below.
            </p>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">Our Head Quarter</h4>
                  <p className="text-muted-foreground">Nagpur, Maharashtra</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">Email Us</h4>
                  <p className="text-muted-foreground">
                    hello@pushpras.com<br />
                    support@pushpras.com
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 text-accent-foreground flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">Call Us</h4>
                  <p className="text-muted-foreground">
                    +91-9356344115<br />
                    Mon-Fri, 9am-5pm IST
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <form onSubmit={handleContactSubmit} className="bg-background p-8 sm:p-10 rounded-3xl border border-border shadow-lg">
              <h3 className="text-2xl font-display font-bold text-foreground mb-8">Send a Message</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Your Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone (Optional)</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      placeholder="+91- 00000-00000"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                  <textarea
                    rows={4}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                    placeholder="How can we help you today?"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle className="w-5 h-5" /> Message Sent
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" /> Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
