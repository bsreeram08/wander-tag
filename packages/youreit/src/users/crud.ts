import { WTService } from '@wander-tag/utils';

export class UserCrudService extends WTService {
    constructor() {
        super('USERS_CRUD');
    }

    async createUser(requestId: string, user: object) {
        const logger = this.logger.request(requestId);
        logger.log('Hello');
        await this.database.tag.create({
            data: {
                id: '',
            },
        });
        logger.log('User saved');
    }
}
