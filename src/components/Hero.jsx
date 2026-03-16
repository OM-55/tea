import React from 'react';
import { ArrowRight } from 'lucide-react';
import Reveal from './Reveal';

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-primary/5 to-transparent -z-10 rounded-bl-[200px]" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-t from-secondary/5 to-transparent -z-10 rounded-tr-[200px]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="max-w-2xl">
            <Reveal>
              <span className="inline-block py-1 px-3 rounded-full bg-secondary/10 text-secondary font-semibold text-sm mb-6 uppercase tracking-wider">
                100% Organic • Caffeine-Free
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display text-foreground leading-[1.1] mb-6">
                Nature in Every Sip <br />
                <span className="text-primary italic">Pure Hibiscus</span> Herbal Tea
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
                Experience the perfect blend of tart hibiscus, soothing lemongrass, and warming spices. 
                Crafted to support your immunity, digestion, and daily relaxation.
              </p>
            </Reveal>
            <Reveal delay={0.3} className="flex flex-wrap gap-4">
              <a
                href="#products"
                className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold flex items-center gap-2 hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
              >
                Shop Now <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#ingredients"
                className="px-8 py-4 rounded-full bg-background border border-border text-foreground font-semibold flex items-center gap-2 hover:border-primary/50 hover:text-primary transition-all duration-300"
              >
                Explore Ingredients
              </a>
            </Reveal>
          </div>

          <div className="relative">
            <Reveal delay={0.4} direction="left">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/10 aspect-[4/5]">
                  <img
                    src="/images/hero-tea.png"
                    alt="Refreshing iced hibiscus tea"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <span className="absolute bottom-3 left-3 text-white text-xs font-semibold bg-black/40 px-2 py-1 rounded-full backdrop-blur-sm">
                    Iced
                  </span>
                </div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/10 aspect-[4/5] mt-8">
                  <img
                    src="/images/hot-hibiscus-tea.png"
                    alt="Steaming hot hibiscus tea"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <span className="absolute bottom-3 left-3 text-white text-xs font-semibold bg-black/40 px-2 py-1 rounded-full backdrop-blur-sm">
                    Hot
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
