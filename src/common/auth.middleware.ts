import { NextFunction, Request, Response } from 'express';

import { IMiddleware } from './middleware.interface';
import jwt from 'jsonwebtoken';
import { HttpError } from '../errors/http-error';

interface JwtPayload {
	email: string;
}

export class AuthMiddleware implements IMiddleware {
	constructor(private secret: string) {}
	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			const { authorization = '' } = req.headers;
			const [bearer, token] = authorization.split(' ');
			if (bearer !== 'Bearer' || !token) {
				return next(new HttpError(401, 'No token provided', 'AuthMiddware'));
			}
			let payload: JwtPayload;
			try {
				payload = jwt.verify(token, this.secret) as JwtPayload;
			} catch (error) {
				return next(new HttpError(401, 'No token provided', 'AuthMiddware'));
			}
			req.user = payload.email;
			next();
		} else {
			next();
		}
	}
}
