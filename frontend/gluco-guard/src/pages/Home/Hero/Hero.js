import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css'; 

const Hero = () => {
  const navigate = useNavigate();

  // Function to handle navigation
  const handleSignUpClick = () => {
    navigate('/auth'); 
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Take Control of Your Health Today</h1>
        <p>Monitor your activities, manage your diet, and assess your risk for diabetes.</p>
        <button onClick={handleSignUpClick} className="hero-cta">Start Your Assessment</button>
      </div>
    </section>
  );
};

export default Hero;
