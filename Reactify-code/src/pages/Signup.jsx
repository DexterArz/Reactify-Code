import React from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
const Signup = () => {
  return (
    <div className="signupPage dark-theme">
      <div className="signupContainer">
        <form className="signUp">
          <div className="title">
            <h1>Reactify-Code</h1>
            <p>
              Already have an account? <span>Login</span>
            </p>
          </div>
          <div className="inputs">
            <div className="inputWrapper">
              <FaUser className="icon" />
              <input className="field" type="text" placeholder="Username" />
            </div>
            <div className="inputWrapper">
              <FaEnvelope className="icon" />
              <input className="field" type="email" placeholder="Email" />
            </div>
            <div className="inputWrapper">
              <FaLock className="icon" />
              <input className="field" type="password" placeholder="Password" />
            </div>
            <button className="sup-btn">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
