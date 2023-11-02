import React from 'react';
import './Overlay.css';

const Overlay = () => {
  return (
    <div className="overlay-container">
      <div className="overlay-content">
        <h1>Welcome Back!</h1>
        <p>To keep connected with us please login with your personal info</p>
        {/* Any other content or buttons to switch between Sign In and Sign Up */}
      </div>
    </div>
  );
}

export default Overlay;
