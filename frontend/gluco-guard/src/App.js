import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';

import { AuthContext } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import PublicLayout from './components/layout/PublicLayout';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import HomePage from './pages/Home/HomePage';
import AuthPage from './pages/Auth/AuthPage';
import ProfilePage from './pages/Profile/ProfilePage';
import Dashboard from './pages/Dashboard/Dashboard';
import SettingsPage from './pages/Settings/SettingsPage';
import NutritionPage from './pages/Nutrition/NutritionPage';
import ActivityPage from './pages/Activity/ActivityPage';
import ContactPage from './pages/Contact/ContactPage';


function App() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <Router>
      <div className="App">
        <Header />
        <main className='page-content'>
          <Routes>
            <Route path="/" exact element={<PublicLayout><HomePage /></PublicLayout>} />
            <Route path="/auth" element={<PublicLayout><AuthPage /></PublicLayout>} />
            <Route element={<PrivateRoute />}>
              <Route path='/settings' element={<SettingsPage />} />
              <Route path="/my-profile" element={<ProfilePage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path='/nutrition' element={<NutritionPage />} />
              <Route path='/activity' element={<ActivityPage />} />
              <Route path='/contact' element={<ContactPage />} />
            </Route>
          </Routes>
        </main>
        {!isAuthenticated && <Footer />}
      </div>
    </Router>
  );
}

export default App;
