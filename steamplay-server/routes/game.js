import express from "express";
import db from "../db/db.js";

const router = express.Router();

router.get("/top", (req, res) => {
  db.query(
    "SELECT g.GameTitle, COUNT(*) AS NumReviews\
     FROM Game g\
     WHERE g.GameId IN (\
       SELECT e.Game_GameId\
       FROM ExternalReview e\
       WHERE e.ReviewScore > (\
         SELECT AVG(ReviewScore)\
         FROM ExternalReview\
       )\
     )\
     GROUP BY g.GameTitle\
     ORDER BY NumReviews DESC\
     LIMIT 10",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    }
  );
});

// router.get("/developers/top", (req, res) => {
//   db.query(
//     "SELECT DISTINCT Developer.DeveloperName, COUNT(*) AS GameCount\
//      FROM \
// 	Developer \
// 	JOIN Game_Has_Developer ON Developer.DeveloperId = Game_Has_Developer.Developer_DeveloperId\
// 	JOIN Game ON Game_Has_Developer.Game_GameId = Game.GameId\
// GROUP BY DeveloperId\
// ORDER BY GameCount DESC"
//   );
// });

// TODO: fix query
// router.get("/topByReview", (req, res) => {
//   const { threshold } = req.query;
//   let thresholdNum = 0;
//   if (threshold) thresholdNum = parseInt(threshold) / 100;

//   db.query(
//     // "SELECT DISTINCT Game.GameId, Game.GameTitle\
//     //  FROM Game JOIN ExternalReview On Game.GameId = ExternalReview.Game_GameId\
//     //  WHERE (\
//     //    SELECT SUM(ReviewScore)\
//     //    FROM ExternalReview e\
//     //    WHERE e.Game_GameId = Game.GameId\
//     //  ) / (\
//     //    SELECT COUNT(GameId) AS game_count\
//     //    FROM ExternalReview e1\
//     //    WHERE e1.Game_GameId = Game.GameId\
//     //    GROUP BY Game_GameId\
//     //  ) >= ?\
//     //  LIMIT 10",
//     "SELECT DISTINCT Game.GameId, Game.GameTitle\
//      FROM Game JOIN ExternalReview ON Game.GameId = ExternalReview.Game_GameId\
//      GROUP BY Game.GameId, Game.GameTitle\
//      HAVING (\
//      SUM(ExternalReview.ReviewScore) / COUNT(ExternalReview.Game_GameId)\
//      ) >= ?\
//      ORDER BY (\
//      SUM(ExternalReview.ReviewScore) / COUNT(ExternalReview.Game_GameId)\
//      ) DESC\
//      LIMIT 10",
//     [thresholdNum],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.json(result);
//       }
//     }
//   );
// });
router.get("/topByReview/:score", (req, res) => {
  // const { threshold } = req.params.score;
  // let thresholdNum = 0;
  // if (threshold) thresholdNum = parseInt(threshold);
  db.query(
    "SELECT Game.GameTitle, AVG(UserReview.ReviewScore)\
    FROM UserReview JOIN Game ON UserReview.Game_GameId = Game.GameId\
    GROUP BY UserReview.Game_GameId\
    HAVING AVG(UserReview.ReviewScore) >= ?\
    LIMIT 10",
    [req.params.score],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    }
  );
});

router.get("/", (req, res) => {
  db.query("SELECT * FROM Game LIMIT 10", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

router.get("/:id", (req, res) => {
  db.query(
    "SELECT * FROM Game WHERE GameId = ?",
    [req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result.length === 0) {
          res.status(404).json({
            message: "Game not found",
          });
        }
        res.json(result[0]);
      }
    }
  );
});

router.get("/search/:searchTerm", (req, res) => {
  db.query(
    "SELECT * FROM Game WHERE GameTitle LIKE ?",
    ["%" + req.params.searchTerm + "%"],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    }
  );
});

router.get("/genre/:genreId", (req, res) => {});

export default router;
