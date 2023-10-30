import React, { useState, useEffect } from 'react';

const ActivityList = () => {
  const [activities, setActivities] = useState([]);

  // Fetch activities from the API when the component mounts
  useEffect(() => {
    // Implement data fetching logic here (e.g., API request)
  }, []);

  return (
    <div>
      <h2>Activity List</h2>
      <ul>
        {activities.map((activity, index) => (
          <li key={index}>{activity}</li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityList;
