// import express from "express";
// import bodyParser from "body-parser";
// import cors from "cors";
// import dotenv from "dotenv";

// const app = express();
// app.use(cors());
// // app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
// dotenv.config();

// import { db } from "./db/db.js";

// app.post("/api/register", (req, res) => {});

// app.get("/api/games", (req, res) => {
//   db.query("SELECT * FROM Game LIMIT 10", (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.json(result);
//     }
//   });
// });

// app.get("/api/games/:id", (req, res) => {
//   db.query(
//     "SELECT * FROM Game WHERE id = ?",
//     [req.params.id],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.json(result);
//       }
//     }
//   );
// });

// app.get("/api/games/search/:searchTerm", (req, res) => {
//   db.query(
//     "SELECT * FROM Game WHERE GameTitle LIKE ?",
//     ["%" + req.params.searchTerm + "%"],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.json(result);
//       }
//     }
//   );
// });

import app from "./app.js";
import setRoutes from "./routes/routes.js";
import dotenv from "dotenv";
dotenv.config();

setRoutes(app);

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
