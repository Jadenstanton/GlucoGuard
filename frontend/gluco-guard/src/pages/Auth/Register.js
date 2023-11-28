import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { registerUser } from '../../services/authService';
import { AuthContext } from '../../context/AuthContext';
import './Register.css';

const Register = ({ isSignInActive, onSwitch }) => {
  const navigate = useNavigate();
  const { toggleAuth } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
  const [isEmailAvailable, setIsEmailAvailable] = useState(true);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // Function to check username availability
  const checkUsernameAvailability = debounce(async (username) => {
    if (username) {
      try {
        const response = await fetch(`${API_BASE_URL}/user/check-username`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username }),
        });

        const data = await response.json();
        setIsUsernameAvailable(data.isAvailable);
      } catch (error) {
        console.error('An error occurred while checking username availability:', error);
      }
    }
  }, 300);

  // Function to check email availability
  const checkEmailAvailability = debounce(async (email) => {
    if (email) {
      try {
        const response = await fetch(`${API_BASE_URL}/user/check-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email })
        });

        const data = await response.json();
        setIsEmailAvailable(data.isAvailable);
      } catch (error) {
        console.error('An error occurred while checking email availability:', error);
      }
    }
  }, 300);

  // Function to handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'username') {
      setIsUsernameAvailable(true); // Reset availability while typing
      checkUsernameAvailability(value);
    }

    if (name === 'email') {
      setIsEmailAvailable(true);
      checkEmailAvailability(value);
    }
  };

  // Function to handle the registration submission
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isUsernameAvailable) {
      console.error('Please choose a different username. This one is already taken.');
      return;
    }
    if (!isEmailAvailable) {
      console.error('This email is already associated with an account.');
      return;
    }

    try {
      const response = await registerUser(formData);
      if (response.message === 'User registered successfully') {
        console.log('Registration Successful', response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.userId);
        localStorage.setItem('username', response.username);
        toggleAuth(true);
        navigate('/my-profile', { state: { isNewUser: true, username: response.username } });
      } else {
        console.log('Registration Failed', response.message);
        // Show error messages to the user, based on the response.message
      }
    } catch (error) {
      console.error('Registration Error:', error);
      // Handle errors such as no network connection,
      // or server not responding properly
      if (error.message.includes('duplicate key value violates unique constrain')) {
        console.error('The username is already taken. Please choose another one.');
      }
    }
  };

  // Conditional rendering based on isSignInActive
  return (
    <div className={isSignInActive ? "register-container collapsed" : "register-container expanded"}>
      {isSignInActive ? (
        // Sign In view
        <>
          <h2 className='register-title'>Hello there!</h2>
          <p>Enter your personal details <br />
            and start you health journey with us
          </p>
          <button className="register-button" onClick={onSwitch}>Sign Up</button>
        </>
      ) : (
        // Sign Up form view
        <>
          <h1>Sign Up for GlucoGuard</h1>
          <form onSubmit={handleRegister}>
            <input className='register-input' type="text" placeholder="Username" name="username" value={formData.username} onChange={handleChange} />
            {!isUsernameAvailable && <div className='username-taken'>Username is taken</div>}
            <input className='register-input' type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
            {!isEmailAvailable && <div className='email-taken'>Email is already registered</div>}
            <input className='register-input' type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
            <button className='register-button' type="submit">Register</button>
          </form>
          <p>Already have an account? <span onClick={onSwitch}>Sign In</span></p>
        </>
      )}
    </div>
  );
}

export default Register;
