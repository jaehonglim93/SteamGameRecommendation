import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { useAuth } from "../../helpers/AuthContext";
import ReviewCard from "../../components/review/ReviewCard";

import "./AllReviews.css";

const AllReviews = () => {
  const reviewData = useLoaderData();
  console.log(reviewData);
  return (
    <div>
      <h1>All Reviews</h1>
      {reviewData.map((review) => (
        <ReviewCard key={review.UserReviewId} review={review} />
      ))}
      <Link to="/reviews">Back</Link>
    </div>
  );
};

export default AllReviews;
