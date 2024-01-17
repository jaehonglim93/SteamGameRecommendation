import React, { useState } from "react";
import { Link, useNavigate, useParams, useLoaderData } from "react-router-dom";

import { Button, Accordion, Card, Form } from "react-bootstrap";

import "./Game.css";

const Game = () => {
  const { gameId } = useParams();
  const game = useLoaderData();
  const navigate = useNavigate();

  return (
    <div className="game">
      <h1>{game.GameTitle}</h1>
      <p>{game.Description}</p>
      <Link to={`/games`}>Back</Link>
    </div>
  );
};

export default Game;
