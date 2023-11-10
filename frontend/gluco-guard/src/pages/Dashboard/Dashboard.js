import React, { useState, useEffect } from 'react';
import Tile from './Tile/Tile';
import './Dashboard.css'

const Dashboard = () => {
  // Placeholder for tile data
  const [tilesData, setTilesData] = useState([
    { id: 1, title: 'Page 1', summary: 'Summary of Page 1', icon: 'icon-url-1' },
    { id: 2, title: 'Page 2', summary: 'Summary of Page 2', icon: 'icon-url-2' },
    { id: 3, title: 'Page 3', summary: 'Summary of Page 3', icon: 'icon-url-3' },
    { id: 4, title: 'Page 4', summary: 'Summary of Page 4', icon: 'icon-url-4' },
    { id: 5, title: 'Page 5', summary: 'Summary of Page 5', icon: 'icon-url-5' },
  ]);

  const getRandomSize = () => {
    const sizes = ['size-1x1', 'size-2x1', 'size-1x2'];
    return sizes[Math.floor(Math.random() * sizes.length)];
  };

  useEffect(() => {
    setTilesData(tilesData.map(tile => ({ ...tile, size: getRandomSize() })));
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
