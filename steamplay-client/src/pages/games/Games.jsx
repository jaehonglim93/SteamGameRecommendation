import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../helpers/AuthContext";

import "./Games.css";

const Games = () => {
  const { user } = useAuth();
  return (
    <div className="games">
      <h1>Games</h1>
      <Link to={`/users/${user.UserId}/playedGames`}>My Played Games</Link>
      <Link to={`/users/${user.UserId}/recommendedGames`}>
        My Recommended Games
      </Link>
      <Link to={`/users/${user.UserId}/recommendations/ai`}>
        AI Recommendations
      </Link>
      <Link to="/games/search">Search Games</Link>
      <Link to="/games/metrics">Games by Metrics</Link>
      <Link to="/">Back</Link>
    </div>
  );
};

export default Games;
