import express, { Request, Response, NextFunction } from "express";
import logger from "morgan";
import "dotenv/config";

import { router as userRouter } from "./users/users.js";

const port = 4000;
const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));

app.use("/users", userRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err.message);
  res.status(500).send(err.message);
});

app.listen(port, () => {
  console.log(`Server starts on http://localhost:${port}`);
});
