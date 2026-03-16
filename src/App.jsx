import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  const isAuthRequired = !localStorage.getItem('userLoggedIn') && !localStorage.getItem('loginSkipped');

  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
          {!isAuthRequired && <Navbar />}
          {!isAuthRequired && <SpinWheel />}
          <main className="flex-grow">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={
                isAuthRequired ? <LoginPage /> : (
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
                )
              } />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
          </main>
          {!isAuthRequired && <Footer />}
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
