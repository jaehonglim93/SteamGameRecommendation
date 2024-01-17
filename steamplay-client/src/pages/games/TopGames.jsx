import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

import "./TopGames.css";

const TopGames = () => {
  const topGames = useLoaderData();
  return (
    <div className="topgames">
      <h1>Top Games</h1>
      <ul>
        {topGames.map((game) => (
          <li key={game.GameId}>
            <h3>{game.GameTitle}</h3>
          </li>
        ))}
      </ul>
      <Link to="/games/metrics">Back</Link>
    </div>
  );
};

export default TopGames;
