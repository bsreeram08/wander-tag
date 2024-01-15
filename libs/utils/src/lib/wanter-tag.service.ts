import { PrismaClient } from '@prisma/client';
import { Database } from '@wander-tag/database';
import { Logger } from './logger';
export class WanderTagService {
    protected database: PrismaClient;
    protected logger: Logger;
    constructor(private location: string) {
        this.database = Database.getDatabase();
        this.logger = new Logger(this.location);
    }
}
