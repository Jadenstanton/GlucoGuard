import React from 'react';
import HeroContainer from './Hero/HeroContainer';
import FeatureContainer from './FeaturesIntroduction/FeatureContainer';
import AboutUsContainer from './AboutUs/AboutUsContainer';

import './HomePage.css'

const HomePage = () => {
  return (
    <div className='homepage-container'>
      <HeroContainer />
      <FeatureContainer />
      <AboutUsContainer />
    </div>
  );
};

export default HomePage;
