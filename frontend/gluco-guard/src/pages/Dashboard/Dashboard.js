import React, { useState, useEffect } from 'react';
import { useNutritionContext } from '../../context/NutritionContext';
import { useActivityContext } from '../../context/ActivityContext';
import { faUserCircle, faCog, faRunning, faUtensils } from '@fortawesome/free-solid-svg-icons';

import NutritionChart from '../Nutrition/NutritionChart/NutritionChart';
import HealthMetrics from '../Profile/HealthMetrics/HealthMetrics';
import ActivityChart from '../Activity/ActivityChart/ActivityChart';
import Tile from './Tile/Tile';
import './Dashboard.css';



const Dashboard = () => {
  const { foods } = useNutritionContext();
  const { lastFoodItem } = useNutritionContext();
  const { activityEvaluation } = useActivityContext();
  const { activities } = useActivityContext();
  const [tilesData, setTilesData] = useState([
    {
      id: 1,
      title: 'My Profile',
      summary: 'Your personal details',
      icon: faUserCircle,
      link: '/my-profile',
      area: 'sm',
    },
    {
      id: 2,
      title: 'Nutrition',
      summary: 'Latest nutrition logs',
      icon: faUtensils,
      link: '/nutrition',
      area: 'sm2',
    },
    {
      id: 3,
      title: 'Activity',
      summary: 'Recent activity summary',
      icon: faRunning,
      link: '/activity',
      area: 'sm3',
    },
    {
      id: 4,
      title: 'Settings',
      summary: 'Configure your preferences',
      icon: faCog,
      link: '/settings',
      area: 'sm4',
    },
    {
      id: 5,
      title: 'Health Overview',
      summary: 'Current Status',
      icon: '/icons/settings.png',
      link: '/my-profile',
      area: 'large',
    },
    {
      id: 6,
      title: 'Place 2',
      summary: 'Configure your preferences',
      icon: '/icons/settings.png',
      link: '/settings',
      area: 'med',
    },
    {
      id: 7,
      title: 'Place 3',
      summary: 'Configure your preferences',
      icon: '/icons/settings.png',
      link: '/settings',
      area: 'med2',
    },
    {
      id: 8,
      title: 'Nutritional Overview',
      summary: 'Configure your preferences',
      icon: '',
      link: '/nutrition',
      area: 'large2',
    },
    {
      id: 9,
      title: 'Activity Overview',
      summary: 'Configure your preferences',
      icon: '/icons/settings.png',
      link: '/activity',
      area: 'large3',
    },
  ]);



  useEffect(() => {
    // This effect updates the 'Nutritional Overview' tile with the last food item's name
    if (lastFoodItem) {
      setTilesData(prevTilesData => prevTilesData.map(tile => {
        if (tile.title === 'Nutritional Overview') {
          return {
            ...tile,
            summary: `Last food: ${lastFoodItem.food_name}`,
          };
        }
        return tile;
      }));
    }
  }, [lastFoodItem]);


  return (
    <div className="dashboard">
      {tilesData.map(tile => {
        if (tile.title === 'Health Overview') {
          // Render the HealthMetricsContainer inside the 'Health Metrics' tile
          return (
            <Tile key={tile.id} data={tile} area={tile.area} className={`tile ${tile.area}`}>
              <HealthMetrics activityEvaluation={activityEvaluation} />
            </Tile>
          );
        }
        if (tile.title === 'Nutritional Overview') {
          // Render the NutritionChart inside the 'Nutritional Overview' tile
          return (
            <Tile key={tile.id} data={tile} area={tile.area} className={`tile ${tile.area}`}>
              <NutritionChart data={foods.data} showMacroChart={true} />
            </Tile>
          );
        }
        if (tile.title === 'Activity Overview') {
          // Render the ActivityVhart inside the 'Activity Overview' tile
          return (
            <Tile key={tile.id} data={tile} area={tile.area} className={`tile ${tile.area}`}>
              <ActivityChart activities={activities} />
            </Tile>
          );
        }
        // Render other tiles normally
        return <Tile key={tile.id} data={tile} area={tile.area} className={`tile ${tile.area}`} />;
      })}
    </div>
  );
};

export default Dashboard;
