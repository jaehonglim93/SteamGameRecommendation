import React, { useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useAuth } from "../../helpers/AuthContext";

import "./Users.css";

const Users = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const users = useLoaderData();

  return (
    <div className="users">
      <h1>Users</h1>
      <h2>All Users</h2>
      <div className="users-list">
        {users.map((user1) => (
          <Link to={`/users/${user1.UserId}`} key={user1.UserId}>
            <h3>{user1.Username}</h3>
          </Link>
        ))}
      </div>
      <nav>
        {user && (
          <Link to={`/users/${user.UserId}/friends`}>
            <button>Friends</button>
          </Link>
        )}
        <Link to="/">
          <button>Back</button>
        </Link>
      </nav>
    </div>
  );
};

export default Users;
