import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import SpinWheel from './components/SpinWheel';
import Hero from './components/Hero';
import About from './components/About';
import IngredientsGrid from './components/IngredientsGrid';
import Ingredients from './components/Ingredients';
import Wellness from './components/Wellness';
import Brewing from './components/Brewing';
import Products from './components/Products';
import FAQ from './components/FAQ';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CartPage from './pages/CartPage';

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
          <Navbar />
          <SpinWheel />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <About />
                  <IngredientsGrid />
                  <Ingredients />
                  <Wellness />
                  <Brewing />
                  <Products />
                  <FAQ />
                  <Blog />
                  <Contact />
                </>
              } />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
