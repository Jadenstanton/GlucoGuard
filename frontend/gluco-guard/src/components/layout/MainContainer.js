import React from 'react';
import { useLocation } from 'react-router-dom';
import './MainContainer.css';

// import AuthContainer from './AuthContainer';
// import Overlay from './Overlay';

const MainContainer = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';
  
  return (
    <div className="main-container">
      {/* <Overlay />
      <AuthContainer /> */}
    </div>
  );
}

export default MainContainer;
