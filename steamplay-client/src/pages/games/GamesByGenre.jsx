import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { useAuth } from "../../helpers/AuthContext";
import { getGenresFromId } from "../../helpers/genre-util";

import "./GamesByGenre.css";

const GamesByGenre = () => {
  const { user } = useAuth();
  const games = useLoaderData();
  return (
    <div className="gamesbygenre">
      <h1>Your genre preferences</h1>
      {user &&
        getGenresFromId(user.Genre_GenreId).map((genre) => (
          <h3 key={genre.GenreId}>{genre.GenreName}</h3>
        ))}
      <ul>
        {games.map((game) => (
          <li key={game.GameId}>
            <h3>{game.GameTitle}</h3>
          </li>
        ))}
      </ul>
      <Link to="/games">Back</Link>
    </div>
  );
};

export default TopGames;
