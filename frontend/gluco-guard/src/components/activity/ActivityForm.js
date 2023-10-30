import React, { useState } from 'react';

const ActivityForm = () => {
  const [activity, setActivity] = useState('');

  const handleSubmit = () => {
    // Implement form submission logic (e.g., API request)
  };

  return (
    <div>
      <h2>Log Your Activity</h2>
      <form>
        <div>
          <label>Activity:</label>
          <input
            type="text"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
          />
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default ActivityForm;
