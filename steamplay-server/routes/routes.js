import authRouter from "./auth.js";
import gameRouter from "./game.js";
import usersRouter from "./users.js";
import reviewRouter from "./reviews.js";

const setRoutes = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/games", gameRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/reviews", reviewRouter);
};

export default setRoutes;
