import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { addFriend } from "../../services/user";
import { useAuth } from "../../helpers/AuthContext";

import "./User.css";

const User = () => {
  const { user } = useAuth();
  const userData = useLoaderData();

  const handleAddFriend = async () => {
    try {
      await addFriend(user.UserId, userData.UserId);
      alert("Friend added!");
    } catch (error) {
      console.log(error);
      alert("Error adding friend");
    }
  };

  return (
    <div className="user">
      <h1>User</h1>
      <p>Username: {userData.Username}</p>
      <p>Email: {userData.Email}</p>
      <button onClick={handleAddFriend}>Add Friend</button>
      <Link to={`/users/${userData.UserId}/reviews`}>View Reviews</Link>
      <Link to="/users">Back</Link>
    </div>
  );
};

export default User;
