import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials=true

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Handle Signin
  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      // Sending data to the backend
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/login`,
        { email, password },
        { withCredentials: true } // Allows cookies to be sent
      );

      console.log(`response data`,response.data);
      

      // Success: Save token and navigate
      setMessage("Signin successful!");
      localStorage.setItem("token", response.data.token);
      setTimeout(() => {
        navigate("/userdashboard");
      }, 1000);
    } catch (error) {
      // Error handling
      setMessage(error.response?.data?.error || "Signin failed!");
    }
  };

  return (
    <div className="signupPage dark-theme">
      <div className="signupContainer">
        <form className="signUp" onSubmit={handleSignin}>
          <div className="title">
            <h1>Reactify-Code</h1>
            <p>Sign In</p>
          </div>
          <div className="inputs">
            <div className="inputWrapper">
              <FaEnvelope className="icon" />
              <input
                className="field"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="inputWrapper">
              <FaLock className="icon" />
              <input
                className="field"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="sup-btn" type="submit">Sign In</button>
            {message && <p className="message">{message}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
