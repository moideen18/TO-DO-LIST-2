import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function RegisterBox() {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = () => {
    if (!formValues.username || !formValues.email || !formValues.password) {
      alert("All fields are required!");
      return;
    }
    alert(`Registered successfully!\nUsername: ${formValues.username}\nEmail: ${formValues.email}`);
    navigate("/tasks"); 
  };

  return (
    <div className="register-box">
      <h2>Sign Up</h2>
      <div className="form-field">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formValues.username}
          onChange={handleInputChange}
          placeholder="Enter your username"
        />
      </div>
      <div className="form-field">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formValues.email}
          onChange={handleInputChange}
          placeholder="Enter your email"
        />
      </div>
      <div className="form-field">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formValues.password}
          onChange={handleInputChange}
          placeholder="Enter your password"
        />
      </div>
      <button className="register-btn" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
}

export default RegisterBox;
