import React from 'react';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src="/images/logo.png" alt="PushpRas Logo" className="w-16 h-16 object-contain" />
              <span className="font-display text-2xl font-bold">PushpRas</span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Crafting premium, organic herbal blends rooted in traditional wellness. Nature's perfect remedy in every sip.
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">Our Story</a></li>
              <li><a href="#products" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">Shop Tea</a></li>
              <li><a href="#benefits" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">Health Benefits</a></li>
              <li><a href="#brewing" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">Brewing Guide</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-bold mb-6">Support</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">FAQ</a></li>
              <li><a href="#contact" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">Contact Us</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">Shipping & Returns</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-bold mb-6">Connect</h4>
            <div className="flex gap-4 mb-6">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
            <a href="mailto:hello@pushpras.com" className="flex items-center gap-2 text-primary-foreground/80 hover:text-white transition-colors text-sm">
              <Mail className="w-4 h-4" />
              hello@pushpras.com
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/60">
          <p>© {new Date().getFullYear()} PushpRas. All rights reserved.</p>
          <p>Designed for wellness and natural living.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
