import express, { Express } from 'express';
import { Server } from 'http';
import { json } from 'body-parser';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import { UsersController } from './users/users.controller';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { IConfigService } from './config/config.service.interface';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { PrismaService } from './database/prisma.service';
import { ENUMS } from './common/enums';
import { AuthMiddleware } from './common/auth.middleware';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.Logger) private logger: ILogger,
		@inject(TYPES.UsersController) private usersController: UsersController, // IUserController
		@inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		this.app = express();
		this.port = Number(this.configService.get(ENUMS.PORT));
	}

	useMiddleWare(): void {
		this.app.use(json());
		const authMiddleware = new AuthMiddleware(this.configService.get(ENUMS.SECRET));
		this.app.use(authMiddleware.execute.bind(authMiddleware));
	}

	useRoutes(): void {
		this.app.use('/users', this.usersController.router);
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
