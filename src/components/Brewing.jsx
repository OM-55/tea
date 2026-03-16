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

        <div className="relative max-w-4xl mx-auto mt-12">
          {/* Desktop Curved Connectors */}
          <div className="hidden md:block absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full opacity-60">
              {/* Step 1 to 2 */}
              <path 
                d="M 25 10 Q 50 15 75 30" 
                stroke="#d6cfc7" strokeWidth="0.5" fill="none" 
              />
              {/* Step 2 to 3 */}
              <path 
                d="M 75 30 Q 50 45 25 50" 
                stroke="#d6cfc7" strokeWidth="0.5" fill="none" 
              />
              {/* Step 3 to 4 */}
              <path 
                d="M 25 50 Q 50 65 75 70" 
                stroke="#d6cfc7" strokeWidth="0.5" fill="none" 
              />
              {/* Step 4 to 5 */}
              <path 
                d="M 75 70 Q 50 85 25 90" 
                stroke="#d6cfc7" strokeWidth="0.5" fill="none" 
              />
            </svg>
          </div>

          {/* Mobile Vertical Connector */}
          <div className="md:hidden absolute left-8 top-12 bottom-12 w-0.5 bg-border -z-10" aria-hidden="true" />

          <div className="space-y-16 md:space-y-0 md:h-[1200px] relative">
            {steps.map((step, index) => (
              <div 
                key={step.title}
                className={`flex flex-col md:flex-row items-center md:absolute md:w-[50%] ${
                  index % 2 === 0 ? 'md:left-0' : 'md:right-0'
                }`}
                style={{ 
                  top: `${index * 20}%`,
                  textAlign: 'center'
                }}
              >
                <Reveal 
                  delay={index * 0.1} 
                  className="flex flex-col items-center group w-full px-8 py-4"
                >
                  <div className="w-16 h-16 rounded-full bg-card border-4 border-background shadow-lg flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 relative z-20">
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center border-2 border-background">
                      {index + 1}
                    </span>
                    <step.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    {step.desc}
                  </p>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brewing;
