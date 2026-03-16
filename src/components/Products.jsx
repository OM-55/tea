import React from 'react';
import { ShoppingBag, Star, ArrowRight } from 'lucide-react';
import Reveal from './Reveal';

const products = [
  {
    id: 1,
    name: "Classic Hibiscus Blend (200 g)",
    price: "320",
    description: "Our signature blend of Hibiscus, Lemongrass, and Stevia.",
    images: ["/images/product-front.jpg", "/images/product-back.jpg"],
    rating: 4.9,
    reviews: 128
  },
  {
    id: 2,
    name: "Classic Hibiscus Blend (1 kg)",
    price: "1600",
    description: "Our signature blend of Hibiscus, Lemongrass, and Stevia.",
    images: ["/images/product-front.jpg", "/images/product-back.jpg"],
    rating: 5.0,
    reviews: 86
  }
];

const Products = () => {
  return (
    <section id="products" className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-display text-foreground mb-4">
              Premium Herbal <span className="italic text-primary">Blends</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Ethically sourced, organic ingredients packed in every tin.
            </p>
          </div>
          <button className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg flex items-center gap-2">
            Show More <ArrowRight className="w-5 h-5" />
          </button>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {products.map((product, index) => (
            <Reveal key={product.id} delay={index * 0.2}>
              <div className="group flex flex-col md:flex-row bg-background rounded-[40px] overflow-hidden border border-border hover:shadow-2xl transition-all duration-500">
                <div className="w-full md:w-1/2 aspect-square relative group/carousel">
                  {/* Image Carousel */}
                  <div className="w-full h-full flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                    {product.images.map((img, i) => (
                      <div key={i} className="w-full h-full flex-shrink-0 snap-center relative">
                        <img
                          src={img}
                          alt={`${product.name} - View ${i + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    ))}
                  </div>
                  
                  {/* Carousel Indicators */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {product.images.map((_, i) => (
                      <div 
                        key={i} 
                        className="w-2 h-2 rounded-full bg-white/50 border border-black/10 transition-all duration-300"
                      />
                    ))}
                  </div>

                  <div className="absolute top-6 left-6 bg-accent text-accent-foreground px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider z-10">
                    Best Seller
                  </div>
                </div>
                <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-1 text-secondary mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 fill-secondary ${i >= Math.floor(product.rating) ? 'opacity-30' : ''}`} />
                    ))}
                    <span className="text-xs font-bold text-muted-foreground ml-2">({product.reviews})</span>
                  </div>
                  <h3 className="text-3xl font-display font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
                    {product.description}
                  </p>
                  <div className="flex items-end gap-3 mb-8">
                    <span className="text-3xl font-bold text-foreground">₹{product.price}</span>
                  </div>
                  <button className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold flex items-center justify-center gap-3 hover:bg-primary/90 transition-all shadow-lg">
                    <ShoppingBag className="w-5 h-5" /> Add to Cart
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
