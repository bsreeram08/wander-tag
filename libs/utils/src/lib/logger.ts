import winston, { createLogger } from 'winston';

export class Logger {
    private wLogger: winston.Logger = createLogger({
        level: 'info',
        format: winston.format.simple(),
        defaultMeta: { service: this.location },
        transports: [
            new winston.transports.Console({
                format: winston.format.simple(),
            }),
        ],
    });

    static appName: string = 'root';
    constructor(private location: string) {
        if (process.env.NODE_ENV == 'production') {
            this.wLogger.add(new winston.transports.File({ filename: `./logs/${Logger.appName}/error.log`, level: 'error' }));
            this.wLogger.add(new winston.transports.File({ filename: `./logs/${Logger.appName}/combined.log` }));
        }
    }

    log(requestId: string, message: string, data: object | null = null) {
        this.wLogger.info(`${this.location} [${requestId}] ${message}`);
        if (data) this.wLogger.info(`${this.location} [${requestId}] ${JSON.stringify(data)}`);
    }

    warn(requestId: string, message: string, data: object | null = null) {
        this.wLogger.warn(`${this.location} [${requestId}] ${message}`);
        if (data) this.wLogger.warn(`${this.location} [${requestId}] ${JSON.stringify(data)}`);
    }

    error(requestId: string, message: string, data: object | null = null) {
        this.wLogger.error(`${this.location} [${requestId}] ${message}`);
        if (data) this.wLogger.error(`${this.location} [${requestId}] ${JSON.stringify(data)}`);
    }

    debug(requestId: string, message: string, data: object | null = null) {
        this.wLogger.debug(`${this.location} [${requestId}] ${message}`);
        if (data) this.wLogger.debug(`${this.location} [${requestId}] ${JSON.stringify(data)}`);
    }

    request(requestId: string) {
        return {
            log: (message: string, data: object | null = null) => this.log(requestId, message, data),
            warn: (message: string, data: object | null = null) => this.warn(requestId, message, data),
            debug: (message: string, data: object | null = null) => this.debug(requestId, message, data),
            error: (message: string, data: object | null = null) => this.error(requestId, message, data),
        };
    }
}
