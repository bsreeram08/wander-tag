import { PrismaClient } from '@prisma/client';
import { Logger } from '@wander-tag/utils';

export class Database {
    private static prismaClient: PrismaClient = new PrismaClient();
    private static logger = new Logger('PRISMA_DATABASE');
    static getDatabase() {
        return Database.prismaClient;
    }
    static async initialize() {
        const rLogger = this.logger.request('initialize');
        rLogger.log('[DATABASE] Initialize called');
        await Database.prismaClient.$connect();
        rLogger.log('[DATABASE] Initialize complete');
        ['SIGTERM', 'SIGINT', 'exit'].map((v) =>
            process.on(v, async () => {
                rLogger.error(`[DATABASE] Connection is terminated due to ${v}`);
                await Database.terminate();
            }),
        );
    }
    static async terminate() {
        const rLogger = this.logger.request('terminate');
        rLogger.log(`[DATABASE] Prisma connection terminate initiated`);
        await Database.prismaClient.$disconnect();
        rLogger.log(`[DATABASE] Prisma connection terminate complete`);
    }
}
