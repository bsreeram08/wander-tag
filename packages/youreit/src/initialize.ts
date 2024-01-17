import { Database } from '@wander-tag/database';
import { environment } from './environment';

export async function initialize() {
    console.log(environment);
    await Database.initialize();
}
