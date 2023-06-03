import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./Form.css";

const Register = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "https://bakcend-todo.onrender.com/api/register",
        {
          username,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      history.push("/login");
      console.log("Registered successfully");
    } catch (error) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Register</h1>
      <div className="form-group">
        <label className="form-label">Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <button className="form-button" onClick={handleRegister}>
          Register
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Register;
