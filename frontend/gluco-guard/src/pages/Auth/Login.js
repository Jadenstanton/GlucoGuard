import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/authService';
import { AuthContext } from '../../context/AuthContext';
import './Login.css';

const Login = ({ isSignInActive, onSwitch }) => {
  // State to hold the input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toggleAuth } = useContext(AuthContext);
  const navigate = useNavigate();


  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      if ('token' in response) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.userId);
        toggleAuth(true);
        navigate('/dashboard');
      } else {
        // TODO
        // Implement a user-friendly way to show the login failure message
        console.log('Login Failed:', response.message); // Replace with UI feedback
      }
    } catch (error) {
      console.error('Login Error:', error);
      // TODO
      // Implement a user-friendly way to handle login errors
    }
  };

  return (
    <div className={`login-container ${isSignInActive ? "expanded" : "collapsed"}`}>
      {isSignInActive ? (
        <form onSubmit={handleSubmit}>
          <h1 className='login-title'>Sign in to GlucoGuard</h1>
          <input
            className="login-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-button" type="submit">Sign In</button>
        </form>
      ) : (
        <>
          <h2 className='login-title'>Welcome Back!</h2>
          <p>To get back where you left off <br />
            please enter your details
          </p>
          <button className='login-button' onClick={onSwitch}>Sign In</button>
        </>
      )}
    </div>
  );
}

export default Login;
