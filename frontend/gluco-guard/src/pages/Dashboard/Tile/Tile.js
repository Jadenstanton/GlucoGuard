import React from 'react';
import './Tile.css'

const Tile = ({ data, size }) => {
    const tileClass = `tile ${size}`;
  return (
    <div className={tileClass}>
      <img src={data.icon} alt={data.title} />
      <h3>{data.title}</h3>
      <p>{data.summary}</p>
    </div>
  );
};

export default Tile;
