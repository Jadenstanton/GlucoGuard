import React from 'react';
import './AccountSettingsContainer.css';
import AccountSettings from './AccountSettings';
import { useBaseMetrics } from '../../../context/BaseMetricsContext';

const AccountSettingsContainer = () => {
  const { baseMetrics, handleBaseMetricsChange } = useBaseMetrics();
  return (
    <div className="account-preferences-container">
      <AccountSettings baseMetrics={baseMetrics} onBaseMetricsChange={handleBaseMetricsChange} />
    </div>
  );
};

export default AccountSettingsContainer;
