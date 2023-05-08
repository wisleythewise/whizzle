import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import FeaturedBrands from './components/FeaturedBrands';
import Testimonials from './components/Testimonials';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import { app, analytics } from './firebaseConfig';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <HowItWorks />
      <FeaturedBrands />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
}

export default App;
