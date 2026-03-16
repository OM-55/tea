import React from 'react';
import { Flame, Scale, Clock, Check, Coffee } from 'lucide-react';
import Reveal from './Reveal';

const steps = [
  {
    icon: Flame,
    title: "Boil Water",
    desc: "Bring fresh water to a rolling boil (212°F / 100°C)."
  },
  {
    icon: Scale,
    title: "Measure",
    desc: "Add 1 heaping spoon of Hibiscus blend per cup."
  },
  {
    icon: Clock,
    title: "Steep",
    desc: "Let it steep for 5 to 7 minutes for optimal extraction."
  },
  {
    icon: Check,
    title: "Strain",
    desc: "Remove the herbs or tea bag from your cup."
  },
  {
    icon: Coffee,
    title: "Enjoy",
    desc: "Serve hot, or pour over ice for a refreshing cooler."
  }
];

const Brewing = () => {
  return (
    <section id="brewing" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-display text-foreground mb-6">
            The Perfect <span className="italic text-primary">Brew</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            A simple ritual to unlock the full flavor and health benefits of your herbal blend.
          </p>
        </Reveal>

        <div className="relative max-w-5xl mx-auto px-4 z-0">
          {/* Desktop Arrow Connectors */}
          <div className="hidden md:flex absolute top-[32px] left-0 right-0 z-0 justify-around items-center px-[10%]" aria-hidden="true">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex-1 flex justify-center">
                <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary opacity-80">
                  <path d="M0 10H38M38 10L30 4M38 10L30 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            ))}
          </div>

          {/* Mobile Vertical Connector */}
          <div className="md:hidden absolute left-[31px] top-8 bottom-8 w-0.5 bg-border -z-10" aria-hidden="true" />

          {/* Steps Container */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-4 relative">
            {steps.map((step, index) => (
              <Reveal 
                key={step.title} 
                delay={index * 0.1} 
                className="flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 rounded-full bg-card border-4 border-background shadow-lg flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 relative z-20">
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center border-2 border-background">
                    {index + 1}
                  </span>
                  <step.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-3 px-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground px-4 leading-relaxed">
                  {step.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brewing;
