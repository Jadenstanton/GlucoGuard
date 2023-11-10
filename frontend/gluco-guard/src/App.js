import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AuthPage from './pages/Auth/AuthPage';
import ProfilePage from './pages/Profile/ProfilePage';
import HomePage from './pages/Home/HomePage';
import Dashboard from './pages/Dashboard/Dashboard';
import SettingsPage from './pages/Settings/SettingsPage';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';


//TODO
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path='/settings' element={<SettingsPage />} />
          <Route path="/my-profile" element={<ProfilePage />} />
          {/* <Route path="/dashboard"  element={DashboardPage} />
          <Route path="/profile" element={ProfilePage} />
         */}
          <Route path="/" exact element={<HomePage />} /> 
          <Route path="/dashboard" exact element={<Dashboard />} /> 
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
