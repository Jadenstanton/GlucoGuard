import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Tile.css';

const Tile = ({ data, area, children }) => {
  const navigate = useNavigate();
  const tileClass = `tile ${area}`;

  const handleClick = () => {
    navigate(data.link);
  };

  return (
    <div className={tileClass} onClick={handleClick}>
      {data.icon && <FontAwesomeIcon icon={data.icon} size="2x" alt={data.title} />}
      <h3>{data.title}</h3>
      {data.summary && <p>{data.summary}</p>}
      {children}
    </div>
  );
};

export default Tile;
