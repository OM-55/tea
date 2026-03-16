import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, CheckCircle, CreditCard, Wallet } from 'lucide-react';
import Reveal from '../components/Reveal';

const CheckoutPage = () => {
  const { cart, getCartTotal } = useCart();
  const navigate = useNavigate();
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [transactionId, setTransactionId] = useState('');

  const subtotal = getCartTotal();
  const discount = 0;
  const total = subtotal - discount;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    // In a real app, we would process payment and clear cart here
    setIsOrderPlaced(true);
    // localStorage.removeItem('cart'); // Should be done in context
  };

  if (isOrderPlaced) {
    return (
      <div className="pt-32 pb-24 min-h-[70vh] flex flex-col items-center justify-center px-4">
        <Reveal className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-display font-bold text-stone-800 mb-4">Order Placed Successfully!</h1>
          <p className="text-stone-500 mb-8 max-w-md mx-auto">
            Thank you for choosing PushpRas. Your blend is being prepared and will be at your doorstep soon.
          </p>
          <Link 
            to="/" 
            className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform inline-flex items-center gap-2"
          >
            Back to Home
          </Link>
        </Reveal>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-24 min-h-[70vh] flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-display font-bold text-stone-800 mb-4">Your cart is empty</h1>
        <Link to="/" className="text-primary font-bold hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Go back to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-stone-800 mb-12">Checkout</h1>
        </Reveal>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Side: Form */}
          <div className="lg:col-span-2 space-y-12">
            <Reveal>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold font-display text-stone-800 border-b pb-4">Customer Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-stone-600 mb-1">Full Name</label>
                    <input required className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" type="text" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-600 mb-1">Phone Number</label>
                    <input required className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" type="tel" placeholder="+91 98765 43210" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-stone-600 mb-1">Email (Optional)</label>
                    <input className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" type="email" placeholder="john@example.com" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-stone-600 mb-1">Full Address</label>
                    <textarea required className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" rows="3" placeholder="House No, Street Name, Area..."></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-600 mb-1">City</label>
                    <input required className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" type="text" placeholder="Mumbai" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-600 mb-1">State</label>
                    <input required className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" type="text" placeholder="Maharashtra" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-600 mb-1">PIN Code</label>
                    <input required className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" type="text" placeholder="400001" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-stone-600 mb-1">Order Notes (Optional)</label>
                    <input className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" type="text" placeholder="Gift wrap, delivery instructions, etc." />
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold font-display text-stone-800 border-b pb-4">Payment Method</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div 
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-4 ${paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-stone-100 hover:border-stone-200'}`}
                  >
                    <input type="radio" checked={paymentMethod === 'cod'} readOnly className="w-5 h-5 accent-primary" />
                    <div>
                      <p className="font-bold text-stone-800">Cash on Delivery</p>
                      <p className="text-xs text-stone-500 italic">Pay when you receive your tea</p>
                    </div>
                  </div>
                  <div 
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-4 ${paymentMethod === 'upi' ? 'border-primary bg-primary/5' : 'border-stone-100 hover:border-stone-200'}`}
                  >
                    <input type="radio" checked={paymentMethod === 'upi'} readOnly className="w-5 h-5 accent-primary" />
                    <div>
                      <p className="font-bold text-stone-800">UPI Payment</p>
                      <p className="text-xs text-stone-500 italic">Fast & Secure Digital Payment</p>
                    </div>
                  </div>
                </div>

                {paymentMethod === 'upi' && (
                  <Reveal className="p-8 bg-stone-50 rounded-3xl border border-stone-200 space-y-8">
                    <div>
                      <h3 className="text-lg font-bold text-stone-800 mb-6 flex items-center gap-2">
                        <Wallet className="w-5 h-5 text-primary" />
                        Select your UPI App
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[
                          { id: 'gpay', name: 'Google Pay', color: '#4285F4' },
                          { id: 'phonepe', name: 'PhonePe', color: '#5f259f' },
                          { id: 'paytm', name: 'Paytm', color: '#00BAF2' },
                          { id: 'bhim', name: 'BHIM', color: '#e51a24' }
                        ].map((app) => (
                          <button
                            key={app.id}
                            type="button"
                            onClick={() => setTransactionId('')} // Reset for demo
                            className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white border border-stone-200 hover:border-primary hover:bg-primary/5 transition-all group"
                          >
                            <div 
                              className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-black text-xs shadow-sm group-hover:scale-110 transition-transform"
                              style={{ backgroundColor: app.color }}
                            >
                              {app.id.toUpperCase().slice(0, 2)}
                            </div>
                            <span className="text-xs font-bold text-stone-600">{app.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-stone-200">
                      <div className="bg-white p-6 rounded-2xl border border-stone-100 mb-6 flex flex-col items-center text-center">
                        <p className="text-xs text-stone-500 uppercase tracking-widest font-bold mb-2">Send Payment To</p>
                        <p className="text-2xl font-display font-bold text-stone-800 tracking-tight">pushpras@upi</p>
                        <p className="text-[10px] text-stone-400 mt-2">Open your selected app and enter the ID above</p>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-stone-600">Enter Transaction ID (12 Digits)</label>
                        <input 
                          required 
                          maxLength={12}
                          value={transactionId}
                          onChange={(e) => setTransactionId(e.target.value.replace(/\D/g, ''))}
                          className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-mono tracking-widest" 
                          type="text" 
                          placeholder="0000 0000 0000" 
                        />
                        <p className="text-[10px] text-stone-400 italic">Check your UPI app's transaction history for the ID</p>
                      </div>
                    </div>
                  </Reveal>
                )}
              </div>
            </Reveal>
          </div>

          {/* Right Side: Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-8">
              <Reveal delay={0.2}>
                <div className="bg-stone-50 rounded-3xl p-8 border border-stone-100">
                  <h2 className="text-2xl font-display font-bold text-stone-800 mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-8">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-stone-600">{item.name} <span className="font-bold">× {item.quantity}</span></span>
                        <span className="font-bold">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                    
                    <div className="pt-4 border-t border-stone-200 space-y-2">
                      <div className="flex justify-between text-stone-600">
                        <span>Subtotal</span>
                        <span className="font-bold">₹{subtotal}</span>
                      </div>
                      <div className="flex justify-between text-stone-600">
                        <span>Discount</span>
                        <span className="text-green-600 font-bold">- ₹{discount}</span>
                      </div>
                      <div className="pt-4 flex justify-between text-xl font-bold text-stone-800">
                        <span>Total</span>
                        <span>₹{total}</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-primary text-white py-4 rounded-full font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-5 h-5" /> Place Order
                  </button>
                </div>
              </Reveal>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
