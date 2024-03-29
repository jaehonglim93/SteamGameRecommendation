import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

export default app;
