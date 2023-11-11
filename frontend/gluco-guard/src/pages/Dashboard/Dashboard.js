import React, { useState, useEffect } from 'react';
import Tile from './Tile/Tile';
import './Dashboard.css';

const Dashboard = () => {
  const [tilesData, setTilesData] = useState([
    {
      id: 1,
      title: 'My Profile',
      summary: 'Your personal details',
      icon: '/icons/profile.png', // replace with actual icon paths
      link: '/my-profile', // replace with actual routing paths
      size: 'size-2x1', // Default size
    },
    {
      id: 2,
      title: 'Nutritional Overview',
      summary: 'Latest nutrition logs',
      icon: '/icons/nutrition.png',
      link: '/nutrition',
      size: 'size-1x2',
    },
    {
      id: 3,
      title: 'Activity Overview',
      summary: 'Recent activity summary',
      icon: '/icons/activity.png',
      link: '/activity',
      size: 'size-1x2',
    },
    {
      id: 4,
      title: 'Settings',
      summary: 'Configure your preferences',
      icon: '/icons/settings.png',
      link: '/settings',
      size: 'size-1x1',
    },
    {
      id: 5,
      title: 'Logging & Tracking',
      summary: 'Record your daily metrics',
      icon: '/icons/logging.png',
      link: '/logging',
      size: 'size-1x1',
    },
    // ... more tiles
  ]);
  

  const getRandomSize = () => {
    const sizes = ['size-1x1', 'size-2x1', 'size-1x2', 'size-2x2'];
    return sizes[Math.floor(Math.random() * sizes.length)];
  };

  useEffect(() => {
    // Placeholder for fetching data
    const fetchData = async () => {
      try {
        // Example of fetching data for each tile 
        const responses = await Promise.all([
          fetch('/api/data-for-page1'),
          fetch('/api/data-for-page2'),
          // Add more fetch calls for each tile
        ]);

        const data = await Promise.all(responses.map(res => res.json()));

        // Create an updated array of tiles with the fetched data
        const updatedTilesData = tilesData.map((tile, index) => ({
          ...tile,
          summary: data[index].summary, // Update this with actual data property names
          // Add any other data fetched
          size: getRandomSize(),
        }));

        setTilesData(updatedTilesData);
      } catch (error) {
        console.error('Error fetching tile data:', error);
        // Handle errors appropriately
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      {tilesData.map(tile => (
        <Tile key={tile.id} data={tile} size={tile.size} />
      ))}
    </div>
  );
};

export default Dashboard;
