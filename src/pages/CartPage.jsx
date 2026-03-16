import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import Reveal from '../components/Reveal';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, getDiscountDetails } = useCart();
  const subtotal = getCartTotal();
  const { amount: discount, label: discountLabel, message: discountMessage, rewardType } = getDiscountDetails();
  const total = subtotal - discount;

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-24 min-h-[70vh] flex flex-col items-center justify-center px-4">
        <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-stone-400" />
        </div>
        <h1 className="text-3xl font-display font-bold text-stone-800 mb-4">Your Cart is Empty</h1>
        <p className="text-stone-500 mb-8 max-w-md text-center">
          Looks like you haven't added any premium herbal blends yet. Your journey to wellness starts here!
        </p>
        <Link 
          to="/" 
          className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-stone-800 mb-12">Your Cart</h1>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-8">
            {cart.map((item) => (
              // ... existing mapping ...
              <Reveal key={item.id}>
                {/* ... existing item div ... */}
                <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-stone-50 rounded-3xl border border-stone-100">
                  <div className="w-24 h-24 bg-white rounded-2xl overflow-hidden flex-shrink-0 shadow-sm">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-grow text-center sm:text-left">
                    <h3 className="text-lg font-bold text-stone-800 mb-1">{item.name}</h3>
                    <p className="text-stone-500 text-sm mb-4">{item.weight}</p>
                    
                    <div className="flex items-center justify-center sm:justify-start gap-12">
                      <div className="flex items-center bg-white border border-stone-200 rounded-full px-2 py-1">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:text-primary transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-bold text-stone-700">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:text-primary transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="text-lg font-bold text-stone-800">
                        ₹{item.price * item.quantity}
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-3 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </Reveal>
            ))}

            {rewardType === 'FREE SAMPLE' && (
              <Reveal>
                <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-primary/5 rounded-3xl border border-primary/20 border-dashed">
                  <div className="w-24 h-24 bg-white rounded-2xl overflow-hidden flex-shrink-0 shadow-sm flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10 text-primary opacity-40" />
                  </div>
                  <div className="flex-grow text-center sm:text-left">
                    <div className="inline-block px-2 py-1 bg-primary text-white text-[10px] font-black rounded-md mb-2 uppercase tracking-tighter">FREE REWARD</div>
                    <h3 className="text-lg font-bold text-stone-800 mb-1">Hibiscus Tea Sample</h3>
                    <p className="text-stone-500 text-sm italic">Our signature blend - on the house!</p>
                  </div>
                  <div className="text-lg font-bold text-primary">₹0</div>
                </div>
              </Reveal>
            )}
          </div>

          {/* Cart Summary Header */}
          <div className="lg:col-span-1">
            <Reveal delay={0.2}>
              <div className="bg-stone-50 rounded-3xl p-8 border border-stone-100 sticky top-32">
                {rewardType && rewardType !== 'BETTER LUCK NEXT TIME' && (
                  <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 mb-6 flex items-center gap-3">
                    <span className="text-xl">🎉</span>
                    <div>
                      <p className="text-primary font-black text-sm uppercase tracking-wider">Spin Reward: {rewardType}</p>
                      {discountMessage && <p className="text-[10px] text-primary/70 font-bold">{discountMessage}</p>}
                    </div>
                  </div>
                )}

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-stone-600">
                    <span>Subtotal</span>
                    <span className="font-bold">₹{subtotal}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-stone-600">
                      <span className="flex flex-col">
                        <span>{discountLabel || 'Discount'}</span>
                        <span className="text-[10px] text-primary font-bold">Spin Wheel Reward Applied</span>
                      </span>
                      <span className="text-green-600 font-bold">- ₹{discount}</span>
                    </div>
                  )}
                  <div className="pt-4 border-t border-stone-200 flex justify-between text-xl font-bold text-stone-800">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                <Link 
                  to="/checkout"
                  className="w-full bg-primary text-white py-4 rounded-full font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/20 mb-4 block text-center"
                >
                  Proceed to Checkout
                </Link>
                
                <Link 
                  to="/" 
                  className="w-full flex items-center justify-center gap-2 text-stone-500 font-medium hover:text-primary transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Shop
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
