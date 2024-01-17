import React, { useState } from "react";
import {
  Link,
  createBrowserRouter,
  RouterProvider,
  useRouteError,
} from "react-router-dom";

import { AuthProvider } from "./helpers/AuthContext";
import { getGameById, getTopGames, getTopGamesByReview } from "./services/game";
import {
  getUsers,
  getUserById,
  getFriends,
  getPlayedGames,
  getUserRecommendations,
} from "./services/user";
import { getUserReviews, getAllReviews } from "./services/review";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import Games from "./pages/games/Games";
import SearchGames from "./pages/games/SearchGames";
import Game from "./pages/games/Game";
import TopGames from "./pages/games/TopGames";
import TopGamesByReview from "./pages/games/TopGamesByReview";
import Users from "./pages/users/Users";
import User from "./pages/users/User";
import UpdateProfile from "./components/update/UpdateProfile";
import CreateUserReview from "./pages/reviews/CreateUserReview";
import Reviews from "./pages/reviews/Reviews";
import UserReviews from "./pages/reviews/UserReviews";
import Friends from "./pages/users/Friends";
import PlayedGames from "./pages/games/PlayedGames";
import RecommendedGames from "./pages/games/RecommendedGames";
import GamesByMetrics from "./pages/games/GamesByMetrics";
import AllReviews from "./pages/reviews/AllReviews";
import Genres from "./pages/genres/Genres";
import AIReccomendations from "./pages/games/AIReccomendations";

import "./App.css";

const errorElement = () => {
  const error = useRouteError();
  return (
    <div>
      <h2>Error</h2>
      <pre>{error.message}</pre>
      <Link to="/">Go back</Link>
    </div>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/profile/update",
    element: <UpdateProfile />,
    errorElement: errorElement,
  },
  {
    path: "/games",
    element: <Games />,
  },
  {
    path: "/games/search",
    element: <SearchGames />,
  },
  {
    path: "/games/:gameId/writereview",
    element: <CreateUserReview />,
  },
  {
    path: "/games/:gameId",
    element: <Game />,
    loader: ({ params }) => getGameById(params.gameId),
  },
  {
    path: "/games/top",
    element: <TopGames />,
    loader: () => getTopGames(),
  },
  {
    path: "/games/topByReview",
    element: <TopGamesByReview />,
    loader: () => getTopGamesByReview(),
  },
  {
    path: "/games/metrics",
    element: <GamesByMetrics />,
  },
  {
    path: "/users",
    element: <Users />,
    loader: () => getUsers(),
  },
  {
    path: "/users/:userId",
    element: <User />,
    loader: ({ params }) => getUserById(params.userId),
  },
  {
    path: "/genres",
    element: <Genres />,
  },
  {
    path: "/reviews",
    element: <Reviews />,
  },
  {
    path: "/reviews/all",
    element: <AllReviews />,
    loader: () => getAllReviews(),
  },
  {
    path: "/users/:userId/reviews",
    element: <UserReviews />,
    loader: async ({ params }) => {
      return {
        userData: await getUserById(params.userId),
        reviewData: await getUserReviews(params.userId),
      };
    },
  },
  {
    path: "/users/:userId/friends",
    element: <Friends />,
    loader: ({ params }) => getFriends(params.userId),
  },
  {
    path: "/users/:userId/playedGames",
    element: <PlayedGames />,
    loader: ({ params }) => getPlayedGames(params.userId),
  },
  {
    path: "/users/:userId/recommendedGames",
    element: <RecommendedGames />,
    loader: ({ params }) => getUserRecommendations(params.userId),
  },
  {
    path: "/users/:userId/recommendations/ai",
    element: <AIReccomendations />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
