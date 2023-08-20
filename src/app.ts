import express, { Express } from 'express';
import { Server } from 'http';
import { json } from 'body-parser';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import { UserController } from './users/users.controller';
import { ILogger } from './logger/logger.interface';
import { ExeptionFilter } from './errors/exeption.filter';
import { TYPES } from './types';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.Logger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: ExeptionFilter,
	) {
		this.app = express();
		this.port = 4000;
	}

	useMiddleWare(): void {
		this.app.use(json());
	}

	useRoutes(): void {
		this.app.use('/users', this.userController.router);
	}

	useExeptionFilters(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	public async init(): Promise<void> {
		this.useMiddleWare();
		this.useRoutes();
		this.useExeptionFilters();
		this.server = this.app.listen(this.port);
		this.logger.log(`Server runs on port ${this.port}`);
	}
}
