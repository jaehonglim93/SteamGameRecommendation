import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "./TopGamesByReview.css";
import { getTopGamesByReview } from "../../services/game";

const TopGamesByReview = () => {
  const [reviewScore, setReviewScore] = useState(0);
  const [topGames, setGames] = useState([]);
  const handleReviewScoreChange = (event) => {
    setReviewScore(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await getTopGamesByReview(reviewScore);
    console.log(res);
    setGames(res);
    setReviewScore(0);
    // try {
    //   const res = await getTopGamesByReview(reviewScore);
    //   console.log(res);
    //   setGames(res);
    //   setReviewScore(0);
    //   alert("Score submitted");
    // } catch (error) {
    //   console.log(error);
    //   alert("Error submitting score");
    // }
  };

  return (
    <div className="topgames">
      <h1>Top Games by User Reviews</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="reviewScore">
          <Form.Label>Review Score (out of 100)</Form.Label>
          <Form.Control
            type="number"
            min={0}
            max={100}
            value={reviewScore}
            onChange={handleReviewScoreChange}
          />
        </Form.Group>
        <Button variant="secondary" type="submit" style={{width: 100}}>
          Submit
        </Button>
      </Form>
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

// const TopGamesByReview = () => {
//   const topGames = useLoaderData();
//   return (
//     <div className="topgames">
//       <h1>Top Games</h1>
//       <ul>
//         {topGames.map((game) => (
//           <li key={game.GameId}>
//             <h3>{game.GameTitle}</h3>
//           </li>
//         ))}
//       </ul>
//       <Link to="/games/metrics">Back</Link>
//     </div>
//   );
// };

export default TopGamesByReview;