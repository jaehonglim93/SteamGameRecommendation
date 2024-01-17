import React from "react";
import { Link } from "react-router-dom";
import "./Games.css";

const GamesByMetrics = () => {
  return (
    <div>
      <h1>Games By Metrics</h1>
      <nav>
        <Link to="/games/top">Popular Games</Link>
        <Link to="/games/topByReview">Top Games By Review</Link>
        <Link to="/games">Back</Link>
      </nav>
    </div>
  );
};

export default GamesByMetrics;
