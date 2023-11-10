import React, { useState } from 'react';
import './Login.css';
import { loginUser } from '../../services/authService';

const Login = ({ isSignInActive, onSwitch }) => {
  // State to hold the input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submit action
    try {
      const response = await loginUser({ email, password });
      if ('token' in response) {
        console.log('Login Successful');
        // Save the JWT token in local storage or context
        // Redirect user to their dashboard or homepage
      } else {
        console.log('Login Failed');
        // Show error messages to the user
      }
    } catch (error) {
      console.error('Login Error:', error);
      // Handle errors such as no network connection,
      // or server not responding properly
    }
  };

  return (
    <div className={`login-container ${isSignInActive ? "expanded" : "collapsed"}`}>
      {isSignInActive ? (
        <form onSubmit={handleSubmit}> {/* Add the form tag with the onSubmit handler */}
          <h1 className='login-title'>Sign in to GlucoGuard</h1>
          <input 
            className="login-input" 
            type="email" 
            placeholder="Email" 
            value={email} // Bind input to state
            onChange={(e) => setEmail(e.target.value)} // Update state when typing
          />
          <input 
            className="login-input" 
            type="password" 
            placeholder="Password" 
            value={password} // Bind input to state
            onChange={(e) => setPassword(e.target.value)} // Update state when typing
          />
          <button className="login-button" type="submit">Sign In</button>
        </form>
      ) : (
        <>
          <h2 className='login-title'>Welcome Back!</h2>
          <p>To get back where you left off <br/> 
            please enter your details
          </p>
          <button className='login-button' onClick={onSwitch}>Sign In</button>
        </>
      )}
    </div>
  );
}

export default Login;
