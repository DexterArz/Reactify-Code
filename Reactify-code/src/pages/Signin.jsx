import React from 'react';

const Signin = () => {
  return (
    <div className="signupPage dark-theme"> {/* Add scoped theme class */}
      <div className="signupBg">
        <div className="signUp">
          <div className="title">
            <h1>Reactify-Code</h1>

          </div>
          <div className="inputs">
            {/* <input className="field" type="text" placeholder="UserName" /> */}
            <input className="field" type="email" placeholder="Email" />
            <input className="field" type="password" placeholder="Password" />
            <button className="sup-btn">Sign-up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
