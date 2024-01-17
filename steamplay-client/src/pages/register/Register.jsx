import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import { useAuth } from "../../helpers/AuthContext";
import { register, login } from "../../services/auth";

import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { loginProvider } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(username, password, email);
      const userData = await login(username, password);
      loginProvider(userData);
      navigate("/profile");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <Button type="submit">Register</Button>
      </form>
      <Link to="/">Back</Link>
    </div>
  );
};

export default Register;
