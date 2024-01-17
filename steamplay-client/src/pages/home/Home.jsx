import React, { useState } from "react";
import { Link } from "react-router-dom";

import SearchBar from "../../components/search/SearchBar";
import { useAuth } from "../../helpers/AuthContext";

import { Button } from "react-bootstrap";

import "./Home.css";

const Home = () => {
  const { user, logoutProvider } = useAuth();
  return (
    <div className="Home">
      <h1>Steamplay Finder!</h1>
      {!user ? (
        <nav>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
          <Link to="/users">Users</Link>
        </nav>
      ) : (
        <nav>
          <Link to="/profile">Profile</Link>
          <Link to="/games">Games</Link>
          <Link to="/genres">Genres</Link>
          <Link to="/reviews">Reviews</Link>
          <Link to="/users">Users</Link>
        </nav>
      )}
    </div>
  );
};

export default Home;
