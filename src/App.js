import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import FeaturedBrands from './components/FeaturedBrands';
import Testimonials from './components/Testimonials';
import CTASection from './components/CTASection';
import Dashboard from './components/UserDashboard';
import Footer from './components/Footer';
import { app, analytics } from './firebaseConfig';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PasswordlessAuth from './components/PasswordlessAuth'; 
import { auth } from './firebaseConfig';
import UserDashboard from './components/UserDashboard';

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
          <Route path="/" element={<><Hero /><HowItWorks /><FeaturedBrands /><Testimonials /><CTASection /><UserDashboard /></>} />
          <Route path="/passwordless-auth" element={<PasswordlessAuth />} />
          <Route path="/dashboard" element={<UserDashboard />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
