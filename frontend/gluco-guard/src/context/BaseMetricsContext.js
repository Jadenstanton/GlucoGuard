import React, { createContext, useState, useContext } from 'react';

const BaseMetricsContext = createContext(null);

export const useBaseMetrics = () => useContext(BaseMetricsContext);

export const BaseMetricsProvider = ({ children }) => {
    // Initializing state from local storage if available
    const [baseMetrics, setBaseMetrics] = useState(() => {
        const localData = localStorage.getItem('baseMetrics');
        return localData ? JSON.parse(localData) : { name: '', age: '', weight: '', height: '' };
    });

    // Function to update base metrics and save to local storage
    const handleBaseMetricsChange = (newMetrics) => {
        setBaseMetrics(newMetrics);
        localStorage.setItem('baseMetrics', JSON.stringify(newMetrics));
    };

    // Context provider
    return (
        <BaseMetricsContext.Provider value={{ baseMetrics, handleBaseMetricsChange }}>
            {children}
        </BaseMetricsContext.Provider>
    );
};
