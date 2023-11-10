import React, { useState } from 'react';
import CollapsibleSetting from '../CollapsibleSetting/CollapsibleSetting';

// Mock user data - replace with actual data once the API is connected
const mockUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  profilePic: 'default-profile.jpg', 
};

const UserProfile = ({ user = mockUser }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [profilePic, setProfilePic] = useState(user.profilePic);

  const handleNameChange = (event) => setName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  // Handle file selection for profilePic
  const handleProfilePicChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setProfilePic(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // replace this with the API call to update the user profile
    console.log('Profile Updated:', { name, email, profilePic });
  };

  return (
    <CollapsibleSetting title="User Profile">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userName">Name:</label>
          <input
            type="text"
            id="userName"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="userEmail">Email:</label>
          <input
            type="email"
            id="userEmail"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="profilePic">Profile Picture:</label>
          <input
            type="file"
            id="profilePic"
            onChange={handleProfilePicChange}
          />
          {profilePic && (
            <img src={profilePic} alt="Profile" width="100" height="100" />
          )}
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </CollapsibleSetting>
  );
};

export default UserProfile;
