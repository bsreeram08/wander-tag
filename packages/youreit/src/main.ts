import { initialize } from './initialize';

async function bootstrap() {
    await initialize();
}

bootstrap().then().catch();
