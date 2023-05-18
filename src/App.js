import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Contact from './components/Contact';
import FeaturedBrands from './components/FeaturedBrands';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PasswordlessAuth from './components/PasswordlessAuth'; 
import { auth } from './firebaseConfig';

import { isSignInWithEmailLink as firebaseIsSignInWithEmailLink } from "firebase/auth"; // Import the function


function App() {
  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log("User signed in:", user);
      } else {
        console.log("User not signed in");
      }
    });

    return () => {
      unregisterAuthObserver();
    };
  }, []);

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<>
          <Hero />
          <Testimonials />
          <HowItWorks />
          <FeaturedBrands />
          <FAQ />
          <Contact/> 
          </>} />
          <Route path="/login" element={<>
          <PasswordlessAuth />
          </>} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
