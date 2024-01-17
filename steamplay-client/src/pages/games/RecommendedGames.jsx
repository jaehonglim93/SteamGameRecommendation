import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { useAuth } from "../../helpers/AuthContext";
import {
  generateRecommendations,
  clearRecommendations,
  addPlayedGame,
} from "../../services/user";
import GameCard from "../../components/games/GameCard";
import loadingSpinner from "../../assets/loading.gif";

import "./RecommendedGames.css";

const RecommendedGames = () => {
  const { user } = useAuth();
  const recommendedGames = useLoaderData();
  const [isLoading, setIsLoading] = useState(false);
  const handleGenerateRecommendations = async () => {
    if (!user) {
      alert("User not found");
      return;
    }

    setIsLoading(true);
    try {
      await generateRecommendations(user.UserId);
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Failed to generate recommendations");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearRecommendations = async () => {
    if (!user) {
      alert("User not found");
      return;
    }
    try {
      await clearRecommendations(user.UserId);
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Failed to clear recommendations");
    }
  };

  // console.log(recommendedGames);
  return (
    <div className="recommended-games">
      <h2>Recommended Games</h2>
      <div className="recommended-games-container">
        {!recommendedGames.length ? (
          <div className="no-recommended-games">
            <button onClick={handleGenerateRecommendations}>
              Generate recommendations
            </button>
          </div>
        ) : (
          <>
            <button onClick={handleGenerateRecommendations}>
              Update recommendations
            </button>
            <button onClick={handleClearRecommendations}>
              Clear recommendations
            </button>
          </>
        )}
        <div className="recommended-games-list">
          {!recommendedGames.length && (
            <div className="no-recommended-games">
              <h3>No recommended games</h3>
            </div>
          )}
          {isLoading ? (
            <img src={loadingSpinner} alt="loading" />
          ) : (
            recommendedGames.map((game) => (
              <GameCard
                key={game.GameId}
                game={game}
                addPlayedGame={addPlayedGame}
              />
            ))
          )}
        </div>
      </div>
      <nav>
        <Link to="/games">Back</Link>
      </nav>
    </div>
  );
};

export default RecommendedGames;
