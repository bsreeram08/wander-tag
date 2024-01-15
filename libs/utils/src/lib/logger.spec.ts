import { Logger } from './logger';

// Test 1
{
    const logger = new Logger('location');
    const rLogger = logger.request('request');

    rLogger.log('logging', { data: {} });
    rLogger.error('erroring'), { data: {} };
    rLogger.debug('debugging', { data: {} });
    rLogger.warn('warning', { data: {} });
}
