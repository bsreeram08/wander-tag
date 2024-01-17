import { Redis } from 'ioredis';
import { TRedis, TRedisConnectionOptions } from 'types';

export function connectToRedis(config: TRedisConnectionOptions): TRedis {
    if (config.redis) return new Redis(config.redis);
    else if (config.cluster) return new Redis.Cluster(config.cluster.nodes, config.cluster.options);
    else throw new Error('Invalid Redis connection credntials');
}
