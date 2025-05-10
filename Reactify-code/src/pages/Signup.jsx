import axios from 'axios';
import React from 'react';
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
        <form className="signUp">
          <div className="title">
            <h1>Reactify-Code</h1>
            <p>
              Already have an account? <span>Login</span>
            </p>
          </div>
          <form onSubmit={handleSubmit}>

          <div className="inputs">
            <input className="field" type="text" placeholder="UserName" />
            <input className="field" type="email" placeholder="Email" />
            <input className="field" type="password" placeholder="Password" />
            <button className="sup-btn">Sign-up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
