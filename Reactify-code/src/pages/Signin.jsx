import React from "react";

const signup = () => {
  return (
    <>
      <div className="signupBg">
        <div className="signUp">
          <div className="title">
            <h1>Reactify-Code</h1>
          </div>
          <div className="inputs">
            <input className="field" type="email" placeholder="Email" />
            <input className="field" type="password" placeholder="Password" />
            <button className="sup-btn">Sign-in</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default signup;
