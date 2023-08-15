import { injectable } from "inversify";
import { Logger, ILogObj } from "tslog";
import "reflect-metadata";

import { ILogger } from "./logger.interface";

@injectable()
export class LoggerService implements ILogger {
  public logger: Logger<ILogObj>;

  constructor() {
    this.logger = new Logger({
      hideLogPositionForProduction: true,
    });
  }

  log(...args: unknown[]) {
    this.logger.info(...args);
  }

  error(...args: unknown[]) {
    this.logger.error(...args);
  }

  warn(...args: unknown[]) {
    this.logger.warn(...args);
  }
}
