import 'reflect-metadata';
import { Container } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { IUsersRepository } from './users.repository.interface';
import { IUsersService } from './users.service.interface';
import { TYPES } from '../types';
import { UsersService } from './users.service';
import { UserModel } from '@prisma/client';
import { User } from './user.entity';

const configServiceMock: IConfigService = {
	get: jest.fn(),
};

const UsersRepositoryMock: IUsersRepository = {
	create: jest.fn(),
	find: jest.fn(),
};

const container = new Container();
let configServise: IConfigService;
let usersRepository: IUsersRepository;
let usersService: IUsersService;

beforeAll(() => {
	container.bind<IUsersService>(TYPES.UsersService).to(UsersService);
	container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(configServiceMock);
	container.bind<IUsersRepository>(TYPES.UsersRepository).toConstantValue(UsersRepositoryMock);

	configServise = container.get<IConfigService>(TYPES.ConfigService);
	usersRepository = container.get<IUsersRepository>(TYPES.UsersRepository);
	usersService = container.get<IUsersService>(TYPES.UsersService);
});

let createdUser: UserModel | null;

describe('User Service', () => {
	it('createUser', async () => {
		configServise.get = jest.fn().mockReturnValueOnce('1');
		usersRepository.create = jest.fn().mockImplementationOnce(
			(user: User): UserModel => ({
				name: user.name,
				email: user.email,
				password: user.password,
				id: 2,
			}),
		);
		createdUser = await usersService.createUser({
			email: 'hi@mail.com',
			name: 'Dave',
			password: '22',
		});

		expect(createdUser?.id).toEqual(2);
		expect(createdUser?.password).not.toEqual('22');
	});

	it('validateUser when using correct password', async () => {
		const result = await usersService.validateUser(createdUser as UserModel, '22');
		expect(result).toEqual(true);
	});

	it('validateUser when using wrong password', async () => {
		const result = await usersService.validateUser(createdUser as UserModel, '11');
		expect(result).toEqual(false);
	});
});
