import React, { useState } from 'react';
import './CollapsibleSetting.css';

const CollapsibleSetting = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const settingClassName = isOpen ? 'collapsible-setting-show' : 'collapsible-setting-hide';
  const contentClassName = isOpen ? 'collapsible-content-show' : 'collapsible-content-hide';

  return (
    <div className={`collapsible-setting ${settingClassName}`}>
      <button className="collapsible-button" onClick={toggleOpen}>
        {title}
      </button>
      <div className={contentClassName}>
        {children}
      </div>
    </div>
  );
};

export default CollapsibleSetting;
