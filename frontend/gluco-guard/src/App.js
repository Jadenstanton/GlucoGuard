import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import AuthPage from './pages/Auth/AuthPage';
import ProfilePage from './pages/Profile/ProfilePage';
import HomePage from './pages/Home/HomePage';
import Dashboard from './pages/Dashboard/Dashboard';
import SettingsPage from './pages/Settings/SettingsPage';
import NutritionPage from './pages/Nutrition/NutritionPage';
import LoggingPage from './pages/Logging/LoggingPage';
import ActivityPage from './pages/Activity/ActivityPage';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';


//TODO
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className='page-content'>
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route element={<PrivateRoute />}>
              <Route path='/settings' element={<SettingsPage />} />
              <Route path="/my-profile" element={<ProfilePage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path='/nutrition' element={<NutritionPage />} />
              <Route path='/logging' element={<LoggingPage />} />
              <Route path='/activity' element={<ActivityPage />} />

            </Route>

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
