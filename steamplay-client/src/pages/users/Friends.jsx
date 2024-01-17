import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { useAuth } from "../../helpers/AuthContext";

import "./Friends.css";

const Friends = () => {
  const { user } = useAuth();
  const friends = useLoaderData();

  return (
    <div className="friends">
      <h1>Friends</h1>
      <div className="friends-list">
        {friends.map((friend) => (
          <Link to={`/users/${friend.UserId}`} key={friend.UserId}>
            {friend.Username}
          </Link>
        ))}
      </div>
      <nav>
        <Link to="/users">
          <button>Back</button>
        </Link>
      </nav>
    </div>
  );
};

export default Friends;
