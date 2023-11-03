import React, { useState } from 'react';
import './Register.css';

const Register = ({ isSignInActive, onSwitch }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // TODO
    // integrate backend registration logic.
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
                <form onSubmit={handleSubmit}>
                    <input className='register-input' type="text" placeholder="Username" name="name" value={formData.name} onChange={handleChange} />
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

