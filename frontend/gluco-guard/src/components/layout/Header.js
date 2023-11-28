import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Header.css';

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
                        {/* Empty because sidebar renders */}
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
