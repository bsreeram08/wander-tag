/**
 * @module DatabaseConnectionManager
 * @description The DatabaseConnectionManager module is responsible for managing Prisma database connection instances and initializing/terminating the connection.
 */

import { PrismaClient } from '@prisma/client';
import { Logger } from '@wander-tag/utils';

/**
 * @class DatabaseConnectionManager
 * @description The DatabaseConnectionManager class manages Prisma database connections and provides methods for initializing and terminating the connection.
 */
export class Database {
    private static prismaClient: PrismaClient = new PrismaClient();
    private static logger = new Logger('PRISMA_DATABASE');

    /**
     * @method getDatabase
     * @description Returns the Prisma client instance for database operations.
     * @returns {PrismaClient} The Prisma client instance.
     */
    static getDatabase() {
        return Database.prismaClient;
    }

    /**
     * @method initialize
     * @description Initializes the database connection by connecting to the Prisma server.
     * @returns {Promise<void>} A promise that resolves when the initialization is complete.
     */
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

    /**
     * @method terminate
     * @description Terminates the database connection when the application is shutting down.
     * @returns {Promise<void>} A promise that resolves when the termination is complete.
     */
    static async terminate() {
        const rLogger = this.logger.request('terminate');
        rLogger.log(`[DATABASE] Prisma connection terminate initiated`);
        await Database.prismaClient.$disconnect();
        rLogger.log(`[DATABASE] Prisma connection terminate complete`);
    }
}
