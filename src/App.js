import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Contact from './components/Contact';
import FeaturedBrands from './components/FeaturedBrands';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Dashboard from './components/UserDashboard';
import Footer from './components/Footer';
import CheckOutTheDashboard from "./components/CheckOutTheDashboard"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PasswordAuth from './components/PasswordAuth'; 
import { auth } from './firebaseConfig';
import { UserContext } from './components/CTX/UserContext';
import {onAuthStateChanged} from "firebase/auth"

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const value = {
    currentUser,
    setCurrentUser : useCallback((user) => setCurrentUser(user), [])
  }

  // Listen if the user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("The user is signed in")
        setCurrentUser(currentUser)
      } else {
        console.log("The user is signed out")
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);


  return (
    <UserContext.Provider value={value}>
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<>
          <Hero />
          <Testimonials />
          <HowItWorks />
          {currentUser ? <CheckOutTheDashboard/>: <FeaturedBrands /> }
          <FAQ />
          <Contact/> 
          </>} />
          <Route path="/login" element={<>
          <PasswordAuth />
          </>} />
          <Route path="/login2" element={<>
          </>} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
        <Footer />
      </Router>
    </div>
    </UserContext.Provider>
  );
}

export default App;
