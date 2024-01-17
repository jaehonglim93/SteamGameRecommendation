import React from "react";

import { Link } from "react-router-dom";
import { useAuth } from "../../helpers/AuthContext";
import { deleteUserReview } from "../../services/review";
import { Card, Button } from "react-bootstrap";

import "./ReviewCard.css";

const ReviewCard = ({ review, deletable }) => {
  const { user } = useAuth();
  const handleDelete = async (reviewId) => {
    try {
      await deleteUserReview(user.UserId, reviewId);
      alert("Review deleted successfully");
      window.location.reload();
    } catch (error) {
      alert("Error deleting review");
    }
  };

  return (
    <Card key={review.ReviewId} className="review-card">
      <Card.Body>
        <h2>
          <Link to={`/games/${review.GameId}`}>{review.GameTitle}</Link>
        </h2>
        {review.UserId && review.Username && (
          <h3>
            Posted by{" "}
            <Link to={`/users/${review.UserId}`}>{review.Username}</Link>
          </h3>
        )}
        <h3>{review.ReviewScore}/100</h3>
        <Card.Text>{review.ReviewText}</Card.Text>
        {deletable && (
          <Button
            variant="secondary"
            onClick={() => handleDelete(review.UserReviewId)}
          >
            Delete
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ReviewCard;
