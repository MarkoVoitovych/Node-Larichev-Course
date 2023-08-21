import { PrismaClient, UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';

import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class PrismaService {
	client: PrismaClient;
	constructor(@inject(TYPES.Logger) private logger: ILogger) {
		this.client = new PrismaClient();
	}

	async connect(): Promise<void> {
		try {
			await this.client.$connect();
			this.logger.log('[PrismaService] Successfully connected to datebase.');
		} catch (error) {
			if (error instanceof Error) {
				this.logger.error('[PrismaService] Failed to connect to datebase. Error: ' + error.message);
			}
		}
	}

	async disconnect(): Promise<void> {
		try {
			await this.client.$disconnect();
		} catch (error) {
			if (error instanceof Error) {
				this.logger.error(
					'[PrismaService] Failed to disconnect from datebase. Error: ' + error.message,
				);
			}
		}
	}
}
