import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import ProfileDropdown from '../../pages/Profile/ProfileDropdown';
import { AuthContext } from '../../context/AuthContext';

// TODO
const Header = () => {
    const { isAuthenticated } = useContext(AuthContext);
   
    return (
        <div className="header-container">
            <div className="branding">
                GlucoGuard
            </div>
            <div className="nav-items">
            {isAuthenticated ? (
                <>
                    <ProfileDropdown />
                    <Link to='/dashboard' className='nav-button'>Dashboard</Link>
                    
                </>
            ) : (
                <>
                    <Link to='/' className='nav-button'>Home</Link>
                    <Link to='/auth' className='nav-button'>Login</Link>
                </>
            )}
               
            </div>
        </div>
    );
}

export default Header;
