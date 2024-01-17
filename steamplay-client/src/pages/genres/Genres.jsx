import React, { useState } from "react";
import { useAuth } from "../../helpers/AuthContext";
import { updateUser } from "../../services/user";
import { Link } from "react-router-dom";
import {
  genresList,
  getGenresFromId,
  getIdFromGenres,
} from "../../helpers/genre-util";

import "./Genres.css";

const Genres = () => {
  //   const genresList = [
  //     "Indie",
  //     "Action",
  //     "Adventure",
  //     "Casual",
  //     "Strategy",
  //     "RPG",
  //     "Simulation",
  //     "Sports",
  //     "Racing",
  //     "MassivelyMultiplayer",
  //   ];

  //   const getGenresFromId = (id) => {
  //     const binaryStr = id.toString(2).padStart(10, "0");
  //     const indicesOfOnes = [];

  //     for (let i = 0; i < binaryStr.length; i++) {
  //       if (binaryStr[i] === "1") {
  //         indicesOfOnes.push(i);
  //       }
  //     }

  //     console.log(binaryStr);
  //     console.log(indicesOfOnes);
  //     return indicesOfOnes.map((index) => genresList[index]);
  //   };

  const { user, loginProvider } = useAuth();
  const [selectedGenres, setSelectedGenres] = useState(new Set());

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedGenres((prevState) => {
      const newSelectedGenres = new Set(prevState);
      if (checked) {
        newSelectedGenres.add(name);
      } else {
        newSelectedGenres.delete(name);
      }
      return newSelectedGenres;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // const arr = Array.from(selectedGenres);
    // console.log("Selected genres:", arr);
    // let res = 0;
    // for (const genre of arr) {
    //   res += 2 ** (genresList.length - 1 - genresList.indexOf(genre));
    // }
    // const updatedUser = {
    //   ...user,
    //   Genre_GenreId: res,
    // };

    const genres = Array.from(selectedGenres);
    const genreid = getIdFromGenres(genres);
    const updatedUser = {
      ...user,
      Genre_GenreId: genreid,
    };

    try {
      await updateUser(user.UserId, updatedUser);
      loginProvider(updatedUser);
      alert("Genre Preference Submitted");
    } catch (error) {
      alert("Error submitting genre");
    }
  };

  return (
    <div>
      <h2>Genres</h2>
      <h3>Currently Preferred Genres</h3>
      {user.Genre_GenreId ? (
        <ul>
          {getGenresFromId(user.Genre_GenreId).map((genre) => (
            <li key={genre}>{genre}</li>
          ))}
        </ul>
      ) : (
        <p>No preferred genres</p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="genre-checkboxes">
          {genresList.map((genre) => (
            <div key={genre} className="genre-check">
              <input
                type="checkbox"
                id={genre}
                name={genre}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={genre}>{genre}</label>
            </div>
          ))}
        </div>
        <button type="submit">Submit</button>
      </form>
      <Link to="/">Back</Link>
    </div>
  );
};

export default Genres;
