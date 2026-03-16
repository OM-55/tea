import React from 'react';
import Navbar from './components/Navbar';
import SpinWheel from './components/SpinWheel';
import Hero from './components/Hero';
import About from './components/About';
import Ingredients from './components/Ingredients';
import Products from './components/Products';
import Wellness from './components/Wellness';
import Brewing from './components/Brewing';
import FAQ from './components/FAQ';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Navbar />
      <SpinWheel />
      <main className="flex-grow">
        <Hero />
        <About />
        <Ingredients />
        <Wellness />
        <Brewing />
        <Products />
        <FAQ />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
