import express from "express";
const router = express.Router();

import db from "../db/db.js";

import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";

router.post(
  "/register",
  [
    body("username")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    // body("email").isEmail().withMessage("Invalid email address"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, email } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    db.query(
      "INSERT INTO User (username, password, email) VALUES (?, ?, ?)",
      [username, hashedPassword, email],
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        } else {
          return res.status(200).json({ message: "User registered" });
        }
      }
    );
  }
);

router.post(
  "/login",
  [
    body("username")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    db.query(
      "SELECT * FROM User WHERE username = ?",
      [username],
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        } else if (result.length === 0) {
          return res
            .status(401)
            .json({ error: "Invalid username or password" });
        } else {
          const user = result[0];
          const isValid = bcrypt.compareSync(password, user.Password);
          if (isValid) {
            return res.status(200).json(user);
          } else {
            return res
              .status(401)
              .json({ error: "Invalid username or password" });
          }
        }
      }
    );
  }
);

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(200).json({ message: "Logged out" });
    }
  });
});

router.get("/", (req, res) => {
  if (req.session.user) {
    return res.status(200).json(req.session.user);
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
});

router.get("/delete/:username", (req, res) => {
  db.query(
    "DELETE FROM User WHERE Username = ?",
    [req.params.username],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    }
  );
});

// router.put("/update/:username", (req, res) => {
//   db.query(
//     "UPDATE User SET Username = 'helloworld' WHERE Username = ?",
//     [req.params.username],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.json(result);
//       }
//     }
//   );
// });

router.put(
  "/update",
  [
    body("username"),
    body("newUsername")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters")
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, newUsername } = req.body;
    db.query(
      "UPDATE User SET Username = ? WHERE Username = ?",
      [newUsername, username],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
      }
    );
  }
);

router.get("/users", (req, res) => {
  db.query("SELECT Username FROM User", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

export default router;
