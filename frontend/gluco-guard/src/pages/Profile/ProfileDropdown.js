import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProfileDropdown.css'
import LogoutButton from '../Auth/LogoutButton';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="profile-dropdown" style={{ position: 'relative' }}>
      <button className='nav-button' onClick={toggleDropdown}>Profile</button>
      {isOpen && (
        <div className="dropdown-content" style={{ position: 'absolute', zIndex: 1000 }}>
          <Link to='my-profile'>My Profile</Link>
          <Link to="/nutrition">Nutritional Overview</Link>
          <Link to="/activity">Activity Overview</Link>
          <Link to="/logging">Logging & Tracking</Link>
          <Link to="/settings">Settings</Link>
          <LogoutButton />
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
