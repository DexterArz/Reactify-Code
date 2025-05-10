import React from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
const Signup = () => {
  return (
    <div className="signupPage dark-theme">
      <div className="signupContainer">
        <form className="signUp">
          <div className="title">
            <h1>Reactify-Code</h1>
      
          </div>
          <div className="inputs">

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
