
import React from 'react';

const ProfileDropdown = () => {
  return (
    <div className="profile-dropdown-pane">
      <div className="dropdown-content">
        <a href="/profile">My Profile</a>
        <a href="/settings">Settings</a>
        {/* ... other links ... */}
      </div>
    </div>
  );
};

export default ProfileDropdown;
