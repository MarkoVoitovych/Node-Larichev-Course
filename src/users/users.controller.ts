import { NextFunction, Request, Response } from "express";
import { injectable, inject } from "inversify";
import "reflect-metadata";

import { BaseController } from "../common/base.controller.js";
import { HttpError } from "../errors/http-error.js";
import { TYPES } from "../types.js";
import { ILogger } from "../logger/logger.interface.js";

@injectable()
export class UserController extends BaseController {
  constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
    super(loggerService);
    this.bindRoutes([
      {
        path: "/register",
        method: "post",
        func: this.register,
      },
      {
        path: "/login",
        method: "post",
        func: this.login,
      },
    ]);
  }

  register(req: Request, res: Response, next: NextFunction) {
    this.created(res);
  }

  login(req: Request, res: Response, next: NextFunction) {
    // next(new HttpError(401, "Not authorized", "login"));
    this.ok(res, "login");
  }
}
