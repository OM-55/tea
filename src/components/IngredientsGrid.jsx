import React from 'react';
import Reveal from './Reveal';

const ingredients = [
  {
    emoji: "🌺",
    name: "Hibiscus Leaves",
    color: "bg-primary/10 text-primary"
  },
  {
    emoji: "🍋",
    name: "Lemongrass",
    color: "bg-secondary/10 text-secondary"
  },
  {
    emoji: "🍃",
    name: "Stevia",
    color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
  },
  {
    emoji: "💠",
    name: "Cardamom",
    color: "bg-accent/20 text-accent-foreground"
  },
  {
    emoji: "🍂",
    name: "Clove",
    color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-500"
  }
];

const IngredientsGrid = () => {
  return (
    <section className="py-12 bg-stone-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display text-foreground">
            Ingredients
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {ingredients.map((ingredient, index) => (
            <Reveal
              key={ingredient.name}
              delay={index * 0.1}
              className="flex flex-col items-center text-center group"
            >
              <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-4 ${ingredient.color} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                {ingredient.emoji}
              </div>
              <p className="font-display font-bold text-foreground tracking-wide group-hover:text-primary transition-colors">
                {ingredient.name}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IngredientsGrid;
