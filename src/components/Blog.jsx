import React from 'react';
import { ArrowRight } from 'lucide-react';
import Reveal from './Reveal';

const articles = [
  {
    id: 1,
    title: "The Ancient Origins of Hibiscus Tea",
    excerpt: "Discover the rich history of how this vibrant flower became a staple in traditional medicine across continents.",
    imageUrl: "https://images.unsplash.com/photo-1599813295982-f54f762691b1?w=600&q=80",
    author: "Dr. Alisha Ray",
    publishedAt: "2023-10-12",
    tags: ["History", "Wellness"]
  },
  {
    id: 2,
    title: "5 Herbal Drinks to Boost Your Immunity",
    excerpt: "As seasons change, keep your defenses strong with these potent, natural herbal infusions you can make at home.",
    imageUrl: "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=600&q=80",
    author: "Sarah Jenkins",
    publishedAt: "2023-11-05",
    tags: ["Immunity", "Recipes"]
  },
  {
    id: 3,
    title: "Quitting Sugar? Try Stevia in Your Tea",
    excerpt: "How natural stevia leaf provides the perfect zero-calorie sweetness without the harmful effects of refined sugar.",
    imageUrl: "https://images.unsplash.com/photo-1596633605700-1efc9b49e277?w=600&q=80",
    author: "Emma Stone",
    publishedAt: "2023-11-20",
    tags: ["Diet", "Health"]
  }
];

const Blog = () => {
  return (
    <section id="blog" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-display text-foreground mb-4">
              Journal of <span className="italic text-primary">Wellness</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Insights, recipes, and knowledge to support your holistic lifestyle.
            </p>
          </div>
          <a href="#blog" className="text-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all">
            View All Articles <ArrowRight className="w-5 h-5" />
          </a>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <Reveal key={article.id} delay={index * 0.1}>
              <article className="group cursor-pointer">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-6 relative shadow-md">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {article.tags.map(tag => (
                      <span key={tag} className="bg-background/90 backdrop-blur text-foreground text-xs font-bold px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground mb-3 flex justify-between">
                  <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  <span>{article.author}</span>
                </div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-muted-foreground line-clamp-2">
                  {article.excerpt}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
