import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../component/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", formData);
      alert(response.data.message);
      
      // Save user authentication (optional)
      localStorage.setItem("userToken", response.data.token);

      // Redirect to Tasks page after successful login
      navigate("/tasks");
    } catch (error) {
      alert(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/Register">Register</a></p>
    </div>
  );
};

export default Login;
