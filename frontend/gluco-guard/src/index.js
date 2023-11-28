import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthContext';
import { NutritionProvider } from './context/NutritionContext';
import { ActivityProvider } from './context/ActivityContext';
import { CombinedActivityProvider } from './context/CombinedActivityContext';
import { BaseMetricsProvider } from './context/BaseMetricsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <NutritionProvider>
        <ActivityProvider>
          <CombinedActivityProvider>
            <BaseMetricsProvider>
              <App />
            </BaseMetricsProvider>
          </CombinedActivityProvider>
        </ActivityProvider>
      </NutritionProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
