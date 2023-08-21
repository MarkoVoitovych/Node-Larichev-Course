import { IsEmail, IsString, Matches } from 'class-validator';

export class UserLoginDto {
	@IsEmail({}, { message: 'Wrong email format' })
	email: string;
	@Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,18}$/)
	password: string;
}
