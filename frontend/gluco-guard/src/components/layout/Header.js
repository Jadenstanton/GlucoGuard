import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import ProfileDropdown from '../../pages/Profile/ProfileDropdown';

// TODO
const Header = () => {

    return (
        <div className="header-container">
            <div className="branding">
                GlucoGuard
            </div>
            <div className="nav-items">
                <ProfileDropdown />
                <Link to='/' className='nav-button'>Home</Link>
                {/* <Link to='/settings' className='nav-button'>Settings</Link> */}
                {/* <button className="nav-button">Home</button> */}
                <Link to='/dashboard' className="nav-button">Dashboard</Link>
                {/* <button className="nav-button">Nutritional Overview</button>
                <button className="nav-button">Activity Overview</button>
                <button className="nav-button">Logging & Tracking</button> */}
            </div>
        </div>
    );
}

export default Header;
