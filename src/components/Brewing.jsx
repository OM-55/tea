import React from 'react';
import Reveal from './Reveal';

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

        <Reveal className="mx-auto flex items-center justify-center p-0">
          <img 
            src="/images/brewing-guide.png" 
            alt="PushpRas Brewing Guide" 
            className="w-[75%] h-auto object-contain mx-auto"
            style={{ filter: 'contrast(102%) saturate(105%)' }}
          />
        </Reveal>
      </div>
    </section>
  );
};

export default Brewing;
