import { PrismaClient } from '@prisma/client';
import { Database } from '@wander-tag/database';
import { TSignal } from '@wander-tag/events';
import { Logger } from './logger';
export class WanderTagService implements IWanderTagService {
    constructor(
        private readonly location: string,
        notifier: TSignal,
    ) {
        this.database = Database.getDatabase();
        this.logger = new Logger(this.location);
        this.notifier = notifier;
        Object.freeze(this.database);
        Object.freeze(this.logger);
        Object.freeze(this.notifier);
    }
    database: PrismaClient;
    logger: Logger;
    notifier: TSignal;
}

export interface IWanderTagService {
    readonly database: PrismaClient;
    readonly logger: Logger;
    readonly notifier: TSignal;
}
