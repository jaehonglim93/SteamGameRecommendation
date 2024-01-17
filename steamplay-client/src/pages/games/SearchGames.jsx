import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Accordion } from "react-bootstrap";

import SearchBar from "../../components/search/SearchBar";
import GameCard from "../../components/games/GameCard";
import { getGamesBySearchTerm } from "../../services/game";
import { addPlayedGame } from "../../services/user";
import { useAuth } from "../../helpers/AuthContext";

import "./SearchGames.css";

const SearchGames = () => {
  const { user } = useAuth();
  const [games, setGames] = useState([]);
  const handleSearch = async (searchTerm) => {
    const data = await getGamesBySearchTerm(searchTerm);
    setGames(data);
  };

  return (
    <div className="searchgames">
      <h1>Search Games</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="games">
        {games.map((game) => (
          // <Link to={`/games/${game.GameId}`} key={game.GameId}>
          //   <h3>{game.GameTitle}</h3>
          // </Link>
          <GameCard key={game.GameId} game={game} />
        ))}
      </div>
      <Link to="/games">Back</Link>
    </div>
  );
};

export default SearchGames;
