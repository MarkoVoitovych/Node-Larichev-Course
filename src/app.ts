import express, { Express } from "express";
import { Server } from "http";
import { injectable, inject } from "inversify";
import "reflect-metadata";

import { UserController } from "./users/users.controller.js";
import { ILogger } from "./logger/logger.interface.js";
import { ExeptionFilter } from "./errors/exeption.filter.js";
import { TYPES } from "./types.js";

@injectable()
export class App {
  app: Express;
  server: Server;
  port: number;

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.UserController) private userController: UserController,
    @inject(TYPES.IExeptionFilter) private exeptionFilter: ExeptionFilter
  ) {
    this.app = express();
    this.port = 4000;
  }

  useRoutes() {
    this.app.use("/users", this.userController.router);
  }

  useExeptionFilters() {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
  }

  public async init() {
    this.useRoutes();
    this.useExeptionFilters();
    this.server = this.app.listen(this.port);
    this.logger.log(`Server runs on port ${this.port}`);
  }
}
