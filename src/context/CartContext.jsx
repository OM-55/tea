import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === productId) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const getDiscountDetails = () => {
    const reward = localStorage.getItem('spinReward');
    const subtotal = getCartTotal();
    let discountAmount = 0;
    let discountLabel = '';
    let specialMessage = '';

    if (!reward || reward === 'BETTER LUCK NEXT TIME') {
      return { amount: 0, label: '', message: '' };
    }

    if (reward === '20% OFF') {
      discountAmount = subtotal * 0.2;
      discountLabel = '20% Spin Discount';
    } else if (reward.includes('% OFF')) {
      // Handles random "UP TO 50% OFF" result
      const percentage = parseInt(reward) / 100;
      discountAmount = Math.min(subtotal * percentage, 500);
      discountLabel = `${reward} (Max ₹500)`;
    } else if (reward === 'BUY 1 GET 1 FREE') {
      // Find items with quantity >= 2 and discount one unit of each
      cart.forEach(item => {
        if (item.quantity >= 2) {
          discountAmount += item.price;
        }
      });
      if (discountAmount > 0) {
        discountLabel = 'B1G1 Applied';
      } else {
        specialMessage = 'Add 2 of same item for B1G1';
      }
    } else if (reward === 'FREE SAMPLE') {
      discountLabel = 'Free Sample Included';
      specialMessage = 'Hibiscus Tea Sample added to order';
    }

    return { 
      amount: Math.round(discountAmount), 
      label: discountLabel,
      message: specialMessage,
      rewardType: reward
    };
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        getCartCount,
        getDiscountDetails,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
