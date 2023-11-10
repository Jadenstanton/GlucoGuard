import React, { useState } from 'react';
import './Register.css';
import { registerUser } from '../../services/authService';

const Register = ({ isSignInActive, onSwitch }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle the registration submission
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      if (response.message === 'User registered successfully') {
        console.log('Registration Successful');
        // Redirect to login page or automatically log the user in
      } else {
        console.log('Registration Failed');
        // Show error messages to the user, based on the response.message
      }
    } catch (error) {
      console.error('Registration Error:', error);
      // Handle errors such as no network connection,
      // or server not responding properly
    }
  };

  return (
    <div className={isSignInActive ? "register-container collapsed" : "register-container expanded"}>
        {isSignInActive ? (
            <>
                <h2 className='register-title'>Hello there!</h2>
                <p>Enter your personal details <br/>
                  and start you health journey with us
                </p>
                <button className="register-button" onClick={onSwitch}>Sign Up</button>
            </>
        ) : (
            <>
                <h1>Sign Up for GlucoGuard</h1>
                <form onSubmit={handleRegister}> {/* Updated to use the new function */}
                    <input className='register-input' type="text" placeholder="Username" name="username" value={formData.username} onChange={handleChange} />
                    <input className='register-input' type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
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
