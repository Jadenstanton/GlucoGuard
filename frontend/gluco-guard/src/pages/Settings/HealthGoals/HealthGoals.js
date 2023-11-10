import React, { useState } from 'react';
import CollapsibleSetting from '../CollapsibleSetting/CollapsibleSetting';

const HealthGoals = () => {
  const [weightGoal, setWeightGoal] = useState('');
  const [bloodSugarGoal, setBloodSugarGoal] = useState('');
  const [exerciseFrequencyGoal, setExerciseFrequencyGoal] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to handle submission will go here.
    // This could include API calls to update the data on the backend.
    console.log('Health Goals:', {
      weightGoal,
      bloodSugarGoal,
      exerciseFrequencyGoal,
    });
  };

  return (
    <CollapsibleSetting title="Health Goals">
      <form onSubmit={handleSubmit} className="health-goals-form">
        <div className="form-group">
          <label htmlFor="weightGoal">Weight Goal (kg):</label>
          <input
            type="number"
            id="weightGoal"
            value={weightGoal}
            onChange={(e) => setWeightGoal(e.target.value)}
            placeholder="Enter your weight goal"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="bloodSugarGoal">Blood Sugar Level Goal (mg/dL):</label>
          <input
            type="number"
            id="bloodSugarGoal"
            value={bloodSugarGoal}
            onChange={(e) => setBloodSugarGoal(e.target.value)}
            placeholder="Enter your blood sugar level goal"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="exerciseFrequencyGoal">Exercise Frequency Goal:</label>
          <select 
            id="exerciseFrequencyGoal"
            value={exerciseFrequencyGoal}
            onChange={(e) => setExerciseFrequencyGoal(e.target.value)}
            required
          >
            <option value="">Select frequency...</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="biweekly">Biweekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <button type="submit">Update Goals</button>
      </form>
    </CollapsibleSetting>
  );
};

export default HealthGoals;
