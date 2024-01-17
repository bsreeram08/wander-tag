import { Publisher, setRedisConfig } from '@jetit/publisher';
import { TRedisConnectionOptions } from 'types';
import { PublisherEvents, TSignalEventsMap } from './events.map';

const shutdown = async function (publisher: Publisher): Promise<void> {
    console.log('Graceful shutdown initiated.');
    try {
        await publisher.close();
        console.log('Resources and connections successfully closed.');
    } catch (error) {
        console.error('Error during graceful shutdown:', error);
    }
    process.exit(0);
};

export function signal(serviceName: string, options: TRedisConnectionOptions) {
    /**
     * Default redis configuration.
     */
    setRedisConfig(options);

    const publisher = new Publisher(serviceName);
    console.log('The Publisher is initialized');
    process.on('SIGTERM', () => shutdown(publisher));
    process.on('SIGINT', () => shutdown(publisher));

    return {
        /**
         * Method to override default redis connection configurations
         */
        setRedisConfig: setRedisConfig,
        /**
         *
         * Publish an event to all your listeners.
         *
         * @param eventName PublisherEvents
         * @param data TSignalEventsMap[PublisherEvents]
         * @returns Promise<void>
         */
        publish: function <T extends PublisherEvents>(eventName: T, data: TSignalEventsMap[T]): Promise<void> {
            return publisher.publish({
                eventName: eventName,
                data: data,
            });
        },
        /**
         *
         * Listen for an event.
         *
         * @param eventName PublisherEvents
         * @returns TSignalEventsMap[PublisherEvents]
         */
        listen: function <T extends keyof TSignalEventsMap>(eventName: T) {
            return publisher.listen<TSignalEventsMap[T], T>(eventName);
        },
        /**
         *
         * Schedules a message for future publishing. Also supports recurring publishing as well
         *
         * @param eventName PublisherEvents
         * @param data TSignalEventsMap[PublisherEvents]
         * @param scheduledTime Date in the Future
         * @param repeatInterval number: Specified the time in ms for recurring publishing
         * @param uniquePerInstance boolean: When set to true ensures that the event is only scheduled once per time
         * @returns Promise<void>
         */
        scheduledPublish: function <T extends keyof TSignalEventsMap>(
            eventName: T,
            data: TSignalEventsMap[T],
            scheduledTime: Date,
            repeatInterval?: number,
            uniquePerInstance?: boolean,
        ) {
            return publisher.scheduledPublish(scheduledTime, { eventName, data }, uniquePerInstance, repeatInterval);
        },
        /**
         *
         * A function that has to be called during the application close.
         *
         * @returns Promise<void>
         */
        shutdown: async () => await shutdown(publisher),
    };
}

export { EventData } from '@jetit/publisher';
export type TSignal = ReturnType<typeof signal>;
