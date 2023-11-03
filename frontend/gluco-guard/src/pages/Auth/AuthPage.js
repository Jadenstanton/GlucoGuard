import React from 'react';
import { useLocation } from 'react-router-dom';
import './AuthPage.css';

import AuthContainer from './AuthContainer';

const AuthPage = () => {
    return (
        <div className="auth-page">
            <div className="auth-background"></div>
            <AuthContainer />
        </div>
    );
}


export default AuthPage;
