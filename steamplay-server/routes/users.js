import express from "express";
import db from "../db/db.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

// GENERAL ROUTES

router.get("/", (req, res) => {
  db.query("SELECT * FROM User", (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500).json(err);
    } else {
      res.json(result);
    }
  });
});

router.get("/:id", (req, res) => {
  db.query(
    "SELECT * FROM User WHERE UserId = ?",
    [req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500).json(err);
      } else {
        if (result.length === 0) {
          res.status(404).json({
            message: "User not found",
          });
        }
        res.json(result[0]);
      }
    }
  );
});

router.put(
  "/:id",
  [
    body("Username")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters"),
    body("Email").isEmail().withMessage("Email must be a valid email address"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    db.query(
      "UPDATE User SET ? WHERE UserId = ?",
      [req.body, req.params.id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.sendStatus(500).json(err);
        } else {
          res.json(result);
        }
      }
    );
  }
);

router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM User WHERE UserId = ?",
    [req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500).json(err);
      } else {
        res.json(result);
      }
    }
  );
});

// PLAYED GAMES ROUTES

router.post("/:userId/playedGames", (req, res) => {
  db.query(
    "INSERT INTO User_Plays_Game (User_UserId, Game_GameId) VALUES (?, ?)",
    [Number(req.params.userId), req.body.gameId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500).json(err);
      } else {
        res.json(result);
      }
    }
  );
});

router.delete("/:userId/playedGames/:gameId", (req, res) => {
  db.query(
    "DELETE FROM User_Plays_Game WHERE User_UserId = ? AND Game_GameId = ?",
    [req.params.userId, req.params.gameId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500).json(err);
      } else {
        res.json(result);
      }
    }
  );
});

router.get("/:userId/playedGames", (req, res) => {
  db.query(
    "SELECT User_Plays_Game.User_UserId, Game.* FROM User_Plays_Game \
     JOIN Game ON User_Plays_Game.Game_GameId = Game.GameId \
     WHERE User_UserId = ?",
    [req.params.userId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500).json(err);
      } else {
        res.json(result);
      }
    }
  );
});

// USER FRIEND ROUTES

router.get("/:userId/friends", (req, res) => {
  db.query(
    "SELECT * FROM User \
     JOIN User_Friendship ON User.UserId = User_Friendship.User_UserId2 \
     WHERE User_UserId1 = ?",
    [req.params.userId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500).json(err);
      } else {
        res.json(result);
      }
    }
  );
});

router.post("/:userId/friends", (req, res) => {
  db.query(
    "INSERT INTO User_Friendship (User_UserId1, User_UserId2) VALUES (?, ?)",
    [Number(req.params.userId), req.body.friendId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500).json(err);
      } else {
        res.json(result);
      }
    }
  );
});

router.delete("/:userId/friends/:friendId", (req, res) => {
  db.query(
    "DELETE FROM User_Friendship WHERE User_UserId1 = ? AND User_UserId2 = ?",
    [req.params.userId, req.params.friendId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500).json(err);
      } else {
        res.json(result);
      }
    }
  );
});

// USER REVIEW ROUTES

router.post("/:userId/reviews", (req, res) => {
  db.query(
    "INSERT INTO UserReview (User_UserId, Game_GameId, ReviewText, ReviewScore) VALUES (?, ?, ?, ?)",
    [
      req.params.userId,
      req.body.gameId,
      req.body.reviewText,
      req.body.reviewScore,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500).json(err);
      } else {
        res.json(result);
      }
    }
  );
});

router.put("/:userId/reviews/:reviewId", (req, res) => {
  db.query(
    "UPDATE UserReview SET ? WHERE UserReviewId = ?",
    [req.body, req.params.reviewId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500).json(err);
      } else {
        res.json(result);
      }
    }
  );
});

router.delete("/:userId/reviews/:reviewId", (req, res) => {
  db.query(
    "DELETE FROM UserReview WHERE UserReviewId = ?",
    [req.params.reviewId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500).json(err);
      } else {
        res.json(result);
      }
    }
  );
});

router.get("/:userId/reviews", (req, res) => {
  db.query(
    "SELECT * FROM UserReview \
     JOIN Game ON UserReview.Game_GameId = Game.GameId \
     WHERE User_UserId = ?",
    [req.params.userId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500).json(err);
      } else {
        res.json(result);
      }
    }
  );
});

// USER RECOMMENDATIONS ROUTES

router.post("/:userId/generateRecommendations", (req, res) => {
  db.query("CALL RecommendGames(?);", [req.params.userId], (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500).json(err);
    } else {
      res.json(result);
    }
  });
});

router.delete("/:userId/generateRecommendations", (req, res) => {
  db.query(
    "DELETE FROM User_Recommended_Game WHERE User_UserId = ?",
    [req.params.userId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500).json(err);
      } else {
        res.json(result);
      }
    }
  );
});

router.get("/:userId/recommendations", (req, res) => {
  if (!req.query.limit) {
    req.query.limit = 10;
  }
  db.query(
    "SELECT * FROM User_Recommended_Game \
     JOIN Game ON User_Recommended_Game.Game_GameId = Game.GameId \
     WHERE User_UserId = ? \
     ORDER BY RecommendationCount DESC \
     LIMIT ?",
    [req.params.userId, req.query.limit],
    (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500).json(err);
      } else {
        res.json(result);
      }
    }
  );
});

// AI

import { Configuration, OpenAIApi } from "openai";

router.get("/:userId/ai-recommendations", (req, res) => {
  const configuration = new Configuration({
    organization: "org-zsU45ytLYNp1UbanHsMwX5kX",
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  if (!req.query.limit) {
    req.query.limit = 3;
  }
  db.query(
    "SELECT User_Plays_Game.User_UserId, Game.* FROM User_Plays_Game \
     JOIN Game ON User_Plays_Game.Game_GameId = Game.GameId \
     WHERE User_UserId = ?",
    [req.params.userId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500).json(err);
      } else {
        const gameTitles = result.map((game) => game.GameTitle).join(", ");
        const prompt = `Generate ${req.query.limit} Steam game recommendations for me based on my list of previously played games: ${gameTitles}. Include very brief explanations for recommendations.`;
        openai
          .createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0.7,
            max_tokens: 100,
            n: 1,
            stop: null,
            user: req.params.userId,
          })
          .then((completion) => {
            res.json(completion.data.choices[0].text);
          })
          .catch((err) => {
            console.log(err);
            res.sendStatus(500).json(err);
          });
      }
    }
  );
});

export default router;
