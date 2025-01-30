import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import axios from "axios";
import "./Register.css";
import backgroundImage from "./paper.avif"; 

const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/users/register", formData);
      alert(response.data.message);
      setFormData({ username: "", email: "", password: "" });

      navigate("/tasks");
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="register-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
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
        <button type="submit">Register</button>
      </form>
      
      <p className="login-link">
        Already have an account? <Link to="/Login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
