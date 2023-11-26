import React, { createContext, useState, useContext } from 'react';

const BaseMetricsContext = createContext(null);

export const useBaseMetrics = () => useContext(BaseMetricsContext);

export const BaseMetricsProvider = ({ children }) => {
    const [baseMetrics, setBaseMetrics] = useState(() => {
        const localData = localStorage.getItem('baseMetrics');
        return localData ? JSON.parse(localData) : { name: '', age: '', weight: '', height: '' };
    });

    const handleBaseMetricsChange = (newMetrics) => {
        setBaseMetrics(newMetrics);
        localStorage.setItem('baseMetrics', JSON.stringify(newMetrics));
    };

    return (
        <BaseMetricsContext.Provider value={{ baseMetrics, handleBaseMetricsChange }}>
            {children}
        </BaseMetricsContext.Provider>
    );
};
