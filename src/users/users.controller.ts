import { NextFunction, Request, Response } from "express";

import { BaseController } from "../common/base.controller.js";
import { LoggerService } from "../logger/logger.service.js";
import { HttpError } from "../errors/http-error.js";

export class UserController extends BaseController {
  constructor(logger: LoggerService) {
    super(logger);
    this.bindRoutes([
      {
        path: "/login",
        method: "post",
        func: this.login,
      },
      {
        path: "/register",
        method: "post",
        func: this.register,
      },
    ]);
  }

  login(req: Request, res: Response, next: NextFunction) {
    next(new HttpError(401, "No authorized"));
    this.ok(res, "login");
  }

  register(req: Request, res: Response, next: NextFunction) {
    this.created(res);
  }
}
