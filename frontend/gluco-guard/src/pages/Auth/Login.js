import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { loginUser } from '../../services/authService';
import { AuthContext } from '../../context/AuthContext';

const Login = ({ isSignInActive, onSwitch }) => {
  // State to hold the input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toggleAuth } = useContext(AuthContext);
  const navigate = useNavigate();


  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submit action
    try {
      const response = await loginUser({ email, password });
      if ('token' in response) {
        console.log('Login Successful:', response.token);
        console.log(response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.userId)
        toggleAuth(true);
        navigate('/dashboard')
      } else {
        console.log('Login Failed:', response.message);
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
