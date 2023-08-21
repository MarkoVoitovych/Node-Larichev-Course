import express, { Express } from 'express';
import { Server } from 'http';
import { json } from 'body-parser';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import { UserController } from './users/users.controller';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { IConfigService } from './config/config.service.interface';
import { IUserController } from './users/users.controller.interface';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { PrismaService } from './database/prisma.service';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.Logger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: UserController, // IUserController
		@inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
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
		await this.prismaService.connect();
		this.server = this.app.listen(this.port);
		this.logger.log(`Server runs on port ${this.port}`);
	}
}
