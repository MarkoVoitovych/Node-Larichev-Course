import { Router, Response } from 'express';
import { injectable } from 'inversify';

import { IControllerRoute } from './routes.interface';
import { ILogger } from '../logger/logger.interface';

@injectable()
export abstract class BaseController {
	private readonly _router: Router;

	constructor(private logger: ILogger) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	public send<T>(res: Response, code: number, data: T): void {
		res.status(code).json(data);
	}

	public ok<T>(res: Response, data: T): void {
		this.send<T>(res, 200, data);
	}

	public created(res: Response): void {
		res.sendStatus(201);
	}

	protected bindRoutes(routes: IControllerRoute[]): void {
		for (const route of routes) {
			this.logger.log(`[${route.method}] ${route.path}`);
			const middleware = route.middlewares?.map((m) => m.execute.bind(m));
			const handler = route.func.bind(this);
			const pipeline = middleware ? [...middleware, handler] : handler;
			this.router[route.method]([route.path], pipeline);
		}
	}
}
