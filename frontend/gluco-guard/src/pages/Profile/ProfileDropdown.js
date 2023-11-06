
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../components/layout/Header.css';
import './ProfileDropdown.css'



const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  // This div is positioned relative, which means the absolute elements inside it will be positioned relative to this div.
  return (
    <div className="profile-dropdown" style={{ position: 'relative' }}>
      <button className='nav-button' onClick={() => setIsOpen(!isOpen)}>Profile</button>
      {isOpen && (
        // This div is positioned absolute, which means it will float over other content.
        <div className="dropdown-content" style={{ position: 'absolute', zIndex: 1000 }}>
          <Link to='my-profile'>My Profile</Link>
          {/* <a href="/profile">My Profile</a> */}
          <a href="/nutrition">Nutritional Overview</a>
          <a href="/activity">Activity Overview</a>
          <a href="/logging">Logging & Tracking</a>
          <a href="/settings">Settings</a>
          <Link to='/auth' className='auth-button'>Sign Up</Link>

          {/* ... other links ... */}
        </div>
      )}
    </div>
  );
};


export default ProfileDropdown;
