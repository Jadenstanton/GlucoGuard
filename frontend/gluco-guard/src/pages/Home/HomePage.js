import React from 'react';
import HeroContainer from './Hero/HeroContainer';
import FeatureContainer from './FeaturesIntroduction/FeatureContainer';
import AboutUs from './AboutUs/AboutUs';

import './HomePage.css'

const HomePage = () => {
  return (
    <div className='homepage-container'>
      <HeroContainer />
      <FeatureContainer />
      <AboutUs />
    </div>
  );
};

export default HomePage;
