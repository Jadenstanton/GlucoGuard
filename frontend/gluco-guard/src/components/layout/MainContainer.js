import React from 'react';
import './MainContainer.css';

import AuthContainer from './AuthContainer';
import Overlay from './Overlay';

const MainContainer = () => {
  return (
    <div className="main-container">
      <Overlay />
      <AuthContainer />
    </div>
  );
}

export default MainContainer;
