import { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';

import { IExeptionFilter } from './exeption.filter.interface';
import { HttpError } from './http-error';
import { ILogger } from './../logger/logger.interface';
import { TYPES } from './../types';

@injectable()
export class ExeptionFilter implements IExeptionFilter {
	constructor(@inject(TYPES.Logger) private logger: ILogger) {}

	catch(err: Error | HttpError, req: Request, res: Response, next: NextFunction): void {
		if (err instanceof HttpError) {
			this.logger.error(`[${err.context}] Error ${err.statusCode}: ${err.message}`);
			res.status(err.statusCode).send({ err: err.message });
		} else {
			this.logger.error(`${err.message}`);
			res.status(500).send({ err: err.message });
		}
	}
}
