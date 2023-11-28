import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from '../../context/AuthContext';
import { faRightFromBracket, faAddressCard, faHouse, faUserCircle, faCog, faRunning, faUtensils, faUserDoctor } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';



const Sidebar = () => {
    const { toggleAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        toggleAuth(false);
        navigate('/auth');
    };


    return (
        <nav className="sidebar">
            <div className="sidebar-logo">
                <FontAwesomeIcon icon={faUserDoctor} size="2xl" />
                <h2>GlucoGuard</h2>
            </div>
            <ul className="sidebar-nav">
                <li className="nav-item">
                    <NavLink to="/my-profile" exact className="nav-link" activeClassName="">
                        <FontAwesomeIcon icon={faUserCircle} />
                        <i className="icon-overview"></i>
                        <span>My Profile</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/activity" exact className="nav-link" activeClassName="">
                        <FontAwesomeIcon icon={faRunning} />
                        <i className="icon-overview"></i>
                        <span>Activity</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/nutrition" exact className="nav-link" activeClassName="">
                        <FontAwesomeIcon icon={faUtensils} />
                        <i className="icon-overview"></i>
                        <span>Nutrition</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/dashboard" exact className="nav-link" activeClassName="">
                        <FontAwesomeIcon icon={faHouse} />
                        <i className="icon-overview"></i>
                        <span>Dashboard</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/contact" exact className="nav-link" activeClassName="">
                        <FontAwesomeIcon icon={faAddressCard} />
                        <i className="icon-overview"></i>
                        <span>Contact</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/settings" exact className="nav-link" activeClassName="">
                        <FontAwesomeIcon icon={faCog} spin />
                        <i className="icon-overview"></i>
                        <span>Settings</span>
                    </NavLink>
                </li>
            </ul>
            <div className="sidebar-footer">
                <NavLink onClick={handleLogout} className="nav-link">
                    <FontAwesomeIcon icon={faRightFromBracket} rotation={180} />
                    <i className="icon-logout"></i>
                    <span>Log out</span>
                </NavLink>
            </div>
        </nav>
    );
};

export default Sidebar;
