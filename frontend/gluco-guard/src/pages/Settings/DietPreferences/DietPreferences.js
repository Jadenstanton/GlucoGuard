import React, { useState } from 'react';
import CollapsibleSetting from '../CollapsibleSetting/CollapsibleSetting';

const DietPreferences = () => {
  const [dietPreference, setDietPreference] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');

  const handleDietPreferenceChange = (event) => {
    setDietPreference(event.target.value);
  };

  const handleDietaryRestrictionsChange = (event) => {
    setDietaryRestrictions(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the submission of dietary preferences
    console.log('Diet Preference: ', dietPreference);
    console.log('Dietary Restrictions: ', dietaryRestrictions);
    // Implement submission logic here
  };

  return (
    <CollapsibleSetting title="Diet Preferences">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="dietPreference">Preferred Diet:</label>
          <select 
            id="dietPreference"
            value={dietPreference}
            onChange={handleDietPreferenceChange}
            required
          >
            <option value="">Select Diet...</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="keto">Keto</option>
            <option value="vegan">Vegan</option>
            {/* More options as needed */}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="dietaryRestrictions">Dietary Restrictions:</label>
          <input 
            type="text"
            id="dietaryRestrictions"
            value={dietaryRestrictions}
            onChange={handleDietaryRestrictionsChange}
            placeholder="Enter any dietary restrictions"
            required
          />
        </div>
        <button type="submit">Save Preferences</button>
      </form>
    </CollapsibleSetting>
  );
};

export default DietPreferences;
