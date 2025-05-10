import axios from 'axios';

import React from 'react';
import { useState } from 'react';


import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
const Signup = () => {
  const [formData, setFormData] = useState({ email: "", username: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signup`, formData, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true, // Include cookies in request
            });

            setMessage(response.data.message);
            setFormData({ email: "", username: "", password: "" });
        } catch (error) {
            setMessage(error.response?.data?.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };
  return (
    <div className="signupPage dark-theme">
      <div className="signupContainer">
        <form className="signUp" onSubmit={handleSubmit}>
          <div className="title">
            <h1>Reactify-Code</h1>
            <p>
              Already have an account? <span>Login</span>
            </p>
          </div>
          <div className="inputs">
            <div className="inputWrapper">
              <FaUser className="icon" />
              <input className="field" type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange} />
            </div>
            <div className="inputWrapper">
              <FaEnvelope className="icon" />
              <input className="field" type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange} />
            </div>
            <div className="inputWrapper">
              <FaLock className="icon" />
              <input className="field" type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange} />
            </div>
            <button className="sup-btn" type="submit" disabled={loading}>
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
