import React from 'react';
import { Leaf } from 'lucide-react';
import Reveal from './Reveal';

const About = () => {
  return (
    <section id="about" className="py-24 bg-card relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal direction="right">
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-border/50">
                <img
                  src="/images/about-herbs.png"
                  alt="Organic herbs and ingredients"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10" />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <div className="flex items-center gap-3 text-secondary font-semibold mb-4">
                <Leaf className="w-5 h-5" />
                <span className="uppercase tracking-wider text-sm">Our Story</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display text-foreground mb-6">
                Rooted in <span className="italic text-primary">Tradition</span>, Crafted for Health
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Inspired by ancient herbal remedies, PushpRas was born out of a desire to create a 
                truly natural, health-boosting beverage that doesn't compromise on taste.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We carefully select our natural ingredients from sustainable organic farms. Our 
                signature blend combines the tangy richness of hibiscus leaves with the calming 
                essence of lemongrass, sweetened naturally without a single calorie. It's a 
                handcrafted ritual for your daily wellness.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="grid grid-cols-2 gap-6 border-t border-border pt-8">
                <div>
                  <h4 className="text-3xl font-display font-bold text-primary mb-2">100%</h4>
                  <p className="text-sm font-medium text-foreground uppercase tracking-wide">
                    Natural Ingredients
                  </p>
                </div>
                <div>
                  <h4 className="text-3xl font-display font-bold text-primary mb-2">Zero</h4>
                  <p className="text-sm font-medium text-foreground uppercase tracking-wide">
                    Added Sugar
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
