import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../helpers/AuthContext";
import DeleteButton from "../../components/delete/DeleteButton";

import { Button } from "react-bootstrap";

import "./Profile.css";

const Profile = () => {
  const { user, logoutProvider } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutProvider();
    navigate("/");
  };

  if (!user) return <Link to="/login">Login</Link>;
  return (
    <div className="profile">
      <h1>Profile</h1>
      <p>Welcome, {user.Username}.</p>
      <p>Email: {user.Email || "Not set"}</p>
      <Link to="/profile/update">
        <Button>Update Profile</Button>
      </Link>

      <Button onClick={handleLogout}>Logout</Button>
      <DeleteButton />
      <Link to="/">Back</Link>
    </div>
  );
};

export default Profile;
