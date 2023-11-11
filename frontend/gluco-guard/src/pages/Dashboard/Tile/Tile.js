import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Tile.css';

const Tile = ({ data, size, children }) => {
  const navigate = useNavigate();
  const tileClass = `tile ${size}`;

  // Function to navigate to the tile's link when clicked
  const handleClick = () => {
    navigate(data.link);
  };

  return (
    <div className={tileClass} onClick={handleClick}>
      {data.icon && <img src={data.icon} alt={data.title} />}
      <h3>{data.title}</h3>
      {data.summary && <p>{data.summary}</p>}
      {children} 
    </div>
  );
};

export default Tile;
