import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../helpers/AuthContext";
import { getUserRecommendationsAI } from "../../services/user";
import loadingGif from "../../assets/loading.gif";

import "./AIRecommendations.css";

const AIReccomendations = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [data, setData] = useState([]);
  const handleGenerateRecommendations = async () => {
    setLoading(true);
    const response = await getUserRecommendationsAI(user.UserId, limit);
    setData(response);
    setLoading(false);
  };
  return (
    <div className="airec">
      <h1>AI Reccomendations</h1>
      <div className="row">
        <label htmlFor="limit">Limit</label>
        <input
          type="number"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
        />
      </div>
      <button onClick={handleGenerateRecommendations}>
        Generate Recommendations
      </button>
      {!loading && data && <p>{data}</p>}
      {loading && <img src={loadingGif} alt="loading" />}
      <Link to="/games">Back</Link>
    </div>
  );
};

export default AIReccomendations;
