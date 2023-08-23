import { NextFunction, Request, Response } from 'express';

import { IMiddleware } from './middleware.interface';
import { HttpError } from '../errors/http-error';

export class AuthGuard implements IMiddleware {
	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.user) {
			return next();
		}
		next(new HttpError(401, 'Not authorized', 'AuthGuard'));
	}
}
