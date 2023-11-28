import React from 'react';
import { useBaseMetrics } from '../../../context/BaseMetricsContext';
import './AccountSettings.css'

const AccountSettings = () => {
    const { baseMetrics } = useBaseMetrics();
    console.log('basemetrics', baseMetrics);

    return (
        <div className="account-preferences">
            <h2>Account Information</h2>
            <table>
                <tbody>
                    <tr>
                        <th>Name:</th>
                        <td>{baseMetrics.name}</td>
                    </tr>
                    <tr>
                        <th>Age:</th>
                        <td>{baseMetrics.age}</td>
                    </tr>
                    <tr>
                        <th>Height (cm):</th>
                        <td>{baseMetrics.height}</td>
                    </tr>
                    <tr>
                        <th>Weight (kg):</th>
                        <td>{baseMetrics.weight}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default AccountSettings;
