import React, { useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { useAuth } from "../../helpers/AuthContext";
import { removePlayedGame } from "../../services/user";

import "./PlayedGames.css";

const PlayedGames = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const playedGames = useLoaderData();

  const handleRemovePlayedGame = async (gameId) => {
    try {
      const res = await removePlayedGame(user.UserId, gameId);
      console.log(res);
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="playedGames">
      <h1>Played Games</h1>
      <div className="playedGames-list">
        {playedGames.map((game) => (
          <div key={game.GameId} className="playedgame-card">
            <Link to={`/games/${game.GameId}`}>
              <h3>{game.GameTitle}</h3>
            </Link>
            <Link to={`/games/${game.GameId}/writereview`}>
              <button>Write Review</button>
            </Link>
            <button onClick={() => handleRemovePlayedGame(game.GameId)}>
              Remove
            </button>
          </div>
        ))}
      </div>
      <nav>
        <Link to="/games">Back</Link>
      </nav>
    </div>
  );
};

export default PlayedGames;
