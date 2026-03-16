import React from 'react';
import Reveal from './Reveal';

const ingredients = [
  {
    emoji: "🌺", // Hibiscus Leaves
    name: "Hibiscus Leaves",
    benefits: ["Rich in antioxidants", "Helps control blood pressure", "Refreshing tangy flavor"],
    color: "bg-primary/10 text-primary"
  },
  {
    emoji: "🍋", // Lemongrass
    name: "Lemongrass",
    benefits: ["Improves digestion", "Reduces stress", "Gives citrus aroma"],
    color: "bg-secondary/10 text-secondary"
  },
  {
    emoji: "🍃", // Stevia
    name: "Stevia",
    benefits: ["Natural sugar-free sweetener", "Good for diabetics", "Zero calories"],
    color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
  },
  {
    emoji: "💠", // Cardamom (using a placeholder emoji that looks okay)
    name: "Cardamom",
    benefits: ["Boosts metabolism", "Adds warm aroma", "Supports digestion"],
    color: "bg-accent/20 text-accent-foreground"
  },
  {
    emoji: "🍂", // Clove
    name: "Clove",
    benefits: ["Anti-inflammatory properties", "Improves overall immunity", "Strong herbal flavor"],
    color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-500"
  }
];

const Ingredients = () => {
  return (
    <section id="ingredients" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-full h-[800px] -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,var(--color-primary)_0%,transparent_70%)] opacity-[0.03] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-display text-foreground mb-6">
            Symphony of <span className="italic text-primary">Ingredients</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Every sip is a carefully orchestrated blend of five powerful botanicals, each chosen 
            for its unique flavor profile and profound health benefits.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {ingredients.map((ingredient, index) => (
            <Reveal
              key={ingredient.name}
              delay={index * 0.1}
              className={`p-8 rounded-3xl bg-card border border-border shadow-lg shadow-black/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${
                index === ingredients.length - 1 && ingredients.length % 3 !== 0
                  ? "lg:col-start-2"
                  : ""
              }`}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 ${ingredient.color}`}>
                {ingredient.emoji}
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                {ingredient.name}
              </h3>
              <ul className="space-y-3">
                {ingredient.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="text-primary mt-1">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ingredients;
