import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import ProfileDropdown from '../../pages/Profile/ProfileDropdown';

// TODO
/* Finish linking pages and fix dropdown for profile
 so that are personal pages can go in it*/
const Header = () => {
    const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

    return (
        <div className="header-container">
            <div className="branding">
                GlucoGuard
            </div>
            <div className="nav-items">
                <Link to='/auth' className='nav-button'>Sign Up</Link>
                <button className="nav-button">Home</button>
                <button className="nav-button">Dashboard</button>
                <button 
                    className="nav-button" 
                    onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}
                >
                    Profile
                </button>
                {isProfileDropdownOpen && <ProfileDropdown />}
                <button className="nav-button">Settings</button>
                <button className="nav-button">Nutritional Overview</button>
                <button className="nav-button">Activity Overview</button>
                <button className="nav-button">Logging & Tracking</button>
            </div>
        </div>
    );
}

export default Header;
