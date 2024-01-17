import express from "express";
import db from "../db/db.js";
const router = express.Router();

router.get("/", (req, res) => {
  db.query(
    "SELECT * FROM UserReview \
     JOIN User ON User_UserId = UserId \
     JOIN Game ON Game_GameId = GameId",
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

export default router;
