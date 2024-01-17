import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

const db = mysql.createConnection({
  host: "34.172.135.35",
  user: "root",
  password: process.env.DB_ROOT_PASSWORD,
  database: "steamplayfinder_db",
});

db.connect((err) => {
  if (err) {
    console.log(err);
    console.log("Error connecting to database ❌");
    process.exit(1);
  } else {
    console.log("Connected to database ✅");
  }
});

export default db;
