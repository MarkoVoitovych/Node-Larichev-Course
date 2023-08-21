import { inject, injectable } from 'inversify';
import { UserModel } from '@prisma/client';
import { plainToClass } from 'class-transformer';

import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUsersService } from './users.service.interface';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';
import { ENUMS } from '../common/enums';
import { IUsersRepository } from './users.repository.interface';

@injectable()
export class UsersService implements IUsersService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UsersRepository) private usersRepository: IUsersRepository,
	) {}

	async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
		const newUser = new User(email, name);
		const salt = this.configService.get(ENUMS.SALT);
		await newUser.setPassword(password, Number(salt));
		const existedUser = await this.usersRepository.find(email);
		if (existedUser) {
			return null;
		}
		return await this.usersRepository.create(newUser);
	}

	async validateUser(
		{ email, name, password: hashPassword }: UserModel,
		password: string,
	): Promise<boolean> {
		const newUser = new User(email, name, hashPassword);
		return await newUser.comparePassword(password);
	}

	async getUserInfo(email: string): Promise<UserModel | null> {
		const existedUser = await this.usersRepository.find(email);
		if (!existedUser) {
			return null;
		}
		return existedUser;
	}
}
