import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./Form.css";

const Login = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // New loading state

  useEffect(() => {
    return () => {
      // Cleanup function to cancel any pending tasks
      setLoading(false);
    };
  }, []);
  const handleLogin = async () => {
    try {
      setLoading(true); // Set loading to true before making the API call

      const response = await axios.post(
        "https://bakcend-todo.onrender.com/api/login",
        {
          username,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      history.push("/todos");
      console.log("Login successfully");
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false); // Set loading to false after API call completes
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Login</h1>
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
        <button className="form-button" onClick={handleLogin}>
          {loading ? "Loading..." : "Login"}
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Login;
