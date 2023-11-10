import React, { useState } from 'react';
import CollapsibleSetting from '../CollapsibleSetting/CollapsibleSetting';
import './AccountSettings.css'

const AccountSettings = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle the form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // handle updating the account settings
    console.log('Submitted new email: ', email);
    console.log('Submitted new password: ', password);
    // Implement update logic here
  };

  return (
    <CollapsibleSetting title="Account Settings">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Settings</button>
      </form>
    </CollapsibleSetting>
  );
};

export default AccountSettings;
