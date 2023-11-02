import React, { useState } from 'react';
import './AuthContainer.css';
import Login from '../auth/Login'; 
import Register from '../auth/Register'; 

const AuthContainer = () => {
    const [isSignInActive, setIsSignInActive] = useState(true);

    const onSwitch = () => {
        setIsSignInActive(prev => !prev);
    }

    return (
        <div className="auth-container">
        <Login 
            className={`login-panel ${isSignInActive ? '' : 'shrink'}`}
            isSignInActive={isSignInActive}
            onSwitch={onSwitch}
        />
        <Register 
            className={`register-panel ${isSignInActive ? '' : 'expand'}`}
            isSignInActive={isSignInActive}
            onSwitch={onSwitch}
        />
        </div>
    );
}

export default AuthContainer;