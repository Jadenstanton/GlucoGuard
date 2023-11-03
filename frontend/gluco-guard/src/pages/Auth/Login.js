import React from 'react';
import './Login.css';

const Login = ({isSignInActive, onSwitch}) => {
  return (
    <div className={`login-container ${isSignInActive ? "expanded" : "collapsed"}`}>
      {isSignInActive ? (
      <>
        <h1 className='login-title'>Sign in to GlucoGuard</h1>
        <input className="login-input" type="email" placeholder="Email" />
        <input className="login-input" type="password" placeholder="Password" />
        <button className="login-button">Sign In</button>
      </>
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
