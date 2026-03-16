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

        <Reveal className="max-w-4xl mx-auto overflow-hidden rounded-[40px] shadow-2xl shadow-primary/5 bg-[#fdfaf5] border border-primary/5 flex items-center justify-center p-4 md:p-8">
          <img 
            src="/images/brewing-guide.jpg" 
            alt="PushpRas Brewing Guide" 
            className="w-full h-auto object-contain rounded-3xl"
            style={{ filter: 'sepia(10%) contrast(105%) saturate(110%)' }}
          />
        </Reveal>
      </div>
    </section>
  );
};

export default Brewing;
