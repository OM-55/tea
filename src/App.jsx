import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import SpinWheel from './components/SpinWheel';
import Hero from './components/Hero';
import About from './components/About';
import IngredientsGrid from './components/IngredientsGrid';
import Wellness from './components/Wellness';
import Brewing from './components/Brewing';
import Products from './components/Products';
import FAQ from './components/FAQ';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';

function AppContent() {
  const [showAuth, setShowAuth] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const isAuthDone = sessionStorage.getItem('userLoggedIn') === 'true' || sessionStorage.getItem('loginSkipped') === 'true';
    // Only show auth on home page if not done
    if (!isAuthDone && location.pathname === '/') {
      setShowAuth(true);
    } else {
      setShowAuth(false);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* 
          Homepage content renders in background to avoid white screen.
          LoginPage is a fixed full-screen overlay when showAuth is true.
      */}
      {showAuth && <LoginPage onClose={() => setShowAuth(false)} />}
      
      {!showAuth && <Navbar />}
      {!showAuth && <SpinWheel />}
      
      <main className="flex-grow">
        <Routes>
          <Route path="/login" element={<LoginPage onClose={() => setShowAuth(false)} />} />
          <Route path="/" element={
            <>
              <Hero />
              <About />
              <IngredientsGrid />
              <Wellness />
              <Brewing />
              <Products />
              <FAQ />
              <Reviews />
              <Contact />
            </>
          } />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </main>
      
      {!showAuth && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </Router>
  );
}

export default App;
