import { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';

import { BaseController } from '../common/base.controller';
import { HttpError } from '../errors/http-error';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { IUserController } from './users.controller.interface';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { IUsersService } from './users.service.interface';
import { ValidareMiddleware } from '../common/validate.middleware';

@injectable()
export class UsersController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.Logger) private loggerService: ILogger,
		@inject(TYPES.UsersService) private userService: IUsersService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidareMiddleware(UserRegisterDto)],
			},
			{
				path: '/login',
				method: 'post',
				func: this.login,
				middlewares: [new ValidareMiddleware(UserLoginDto)],
			},
		]);
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(body);
		if (!result) {
			next(new HttpError(409, 'Email in use', 'register'));
			return;
		}
		this.ok(res, { email: result.email, id: result.id });
	}

	async login(
		{ body }: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.getUserInfo(body.email);
		if (!result) {
			next(new HttpError(401, 'Email or password is wrong.', 'login'));
			return;
		}
		const isPasswordValid = await this.userService.validateUser(result, body.password);
		if (!isPasswordValid) {
			next(new HttpError(401, 'Email or password is wrong.', 'login'));
			return;
		}
		this.ok(res, { email: result.email, id: result.id });
	}
}
