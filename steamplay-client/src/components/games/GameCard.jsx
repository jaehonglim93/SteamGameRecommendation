import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Accordion } from "react-bootstrap";
import { useAuth } from "../../helpers/AuthContext";
import { addPlayedGame } from "../../services/user";

import "./GameCard.css";

const GameCard = ({ game }) => {
  const { user } = useAuth();
  const [showDescription, setShowDescription] = useState(false);

  const handleAddPlayedGame = async () => {
    if (!user) {
      alert("User not found");
      return;
    }
    try {
      await addPlayedGame(user.UserId, game.GameId);
      alert(`Successfully added to played games!`);
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Failed to add played game");
    }
  };
  return (
    <>
      <Card className="game-card">
        <Card.Header className="game-card-header">
          <Link to={`/games/${game.GameId}`}>
            <Card.Title>{game.GameTitle}</Card.Title>
          </Link>
        </Card.Header>
        <Card.Body className="game-card-body">
          <Button onClick={() => setShowDescription(!showDescription)}>
            {showDescription ? "Hide" : "Show"} Description
          </Button>
          {showDescription && <Card.Text>{game.Description}</Card.Text>}
          <Button onClick={handleAddPlayedGame}>Add to Played Games</Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default GameCard;
