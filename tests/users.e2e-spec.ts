import request from 'supertest';

import { App } from './../src/app';
import { boot } from './../src/main';

let application: App;

beforeAll(async () => {
	const { app } = await boot;
	application = app;
});

describe('users e2e', () => {
	it('Register - error', async () => {
		const res = await request(application.app)
			.post('/users/register')
			.send({ name: 'Dave', email: 'hi22@gmail.com', password: 'Qdsdfg123' });
		expect(res.statusCode).toBe(409);
	});

	it('Login - success', async () => {
		const res = await request(application.app)
			.post('/users/login')
			.send({ email: 'hi22@gmail.com', password: 'Qdsdfg123' });
		expect(res.body.token).not.toBeUndefined();
	});

	it('Login - error', async () => {
		const res = await request(application.app)
			.post('/users/login')
			.send({ email: 'hi22@gmail.com', password: 'Sddfsffsf3' });
		expect(res.statusCode).toBe(401);
	});

	it('Info - success', async () => {
		const login = await request(application.app)
			.post('/users/login')
			.send({ email: 'hi22@gmail.com', password: 'Qdsdfg123' });

		const res = await request(application.app)
			.get('/users/info')
			.set('Authorization', `Bearer ${login.body.token}`);
		expect(res.body.email).toBe('hi22@gmail.com');
	});

	it('Info - success', async () => {
		const res = await request(application.app).get('/users/info').set('Authorization', 'Bearer 1');
		expect(res.statusCode).toBe(401);
	});
});

afterAll(() => {
	application.close();
});
