import React from 'react';
import { ShoppingBag, Star, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Reveal from './Reveal';

const products = [
  {
    id: 1,
    name: "Classic Hibiscus Blend (200 g)",
    price: 320,
    weight: "200 g",
    description: "Our signature blend of Hibiscus, Lemongrass, and Stevia.",
    images: ["/images/product-front.jpg", "/images/product-back.jpg"],
    rating: 4.9,
    reviews: 128
  },
  {
    id: 2,
    name: "Classic Hibiscus Blend (1 kg)",
    price: 1600,
    weight: "1 kg",
    description: "Our signature blend of Hibiscus, Lemongrass, and Stevia.",
    images: ["/images/product-front.jpg", "/images/product-back.jpg"],
    rating: 5.0,
    reviews: 86
  }
];

const ProductCard = ({ product, index }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const scrollRef = React.useRef(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, offsetWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / offsetWidth);
      setActiveIndex(index);
    }
  };

  const handleAddToCart = () => {
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      weight: product.weight,
      image: product.images[0]
    };
    addToCart(item);
    navigate('/cart');
  };

  const handleBuyNow = () => {
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      weight: product.weight,
      image: product.images[0]
    };
    addToCart(item);
    navigate('/checkout');
  };

  return (
    <Reveal delay={index * 0.2}>
      <div className="group flex flex-col md:flex-row bg-background rounded-[40px] overflow-hidden border border-border hover:shadow-2xl transition-all duration-500">
        <div className="w-full md:w-1/2 aspect-square relative group/carousel">
          {/* Image Carousel */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="w-full h-full flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-translucent"
          >
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
                className={`w-2.5 h-2.5 rounded-full border border-black/10 transition-all duration-300 ${
                  activeIndex === i ? 'bg-primary w-5' : 'bg-white/50'
                }`}
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
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleAddToCart}
              className="flex-1 py-4 rounded-2xl border-2 border-primary text-primary font-bold flex items-center justify-center gap-2 hover:bg-primary/5 transition-all"
            >
              <ShoppingBag className="w-5 h-5" /> Add to Cart
            </button>
            <button 
              onClick={handleBuyNow}
              className="flex-1 py-4 rounded-2xl bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
              <CreditCard className="w-5 h-5" /> Buy Now
            </button>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

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
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
