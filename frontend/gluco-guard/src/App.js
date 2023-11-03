import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AuthPage from './pages/Auth/AuthPage';
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
          {/* <Route path="/dashboard"  element={DashboardPage} />
          <Route path="/profile" element={ProfilePage} />
         */}
          {/* <Route path="/" exact component={HomePageComponent} />  */}
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
