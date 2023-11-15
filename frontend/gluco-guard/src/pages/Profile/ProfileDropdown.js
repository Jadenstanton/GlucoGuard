import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../components/layout/Header.css';
import './ProfileDropdown.css'
import LogoutButton from '../Auth/LogoutButton';



const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="profile-dropdown" style={{ position: 'relative' }}>
      <button className='nav-button' onClick={() => setIsOpen(!isOpen)}>Profile</button>
      {isOpen && (
        <div className="dropdown-content" style={{ position: 'absolute', zIndex: 1000 }}>
          <Link to='my-profile'>My Profile</Link>
          {/* <a href="/profile">My Profile</a> */}
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
