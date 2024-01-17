import { setRedisConfig } from '@jetit/publisher';
import { Cluster, Redis } from 'ioredis';

export type TRedis = Redis | Cluster;
export type TRedisConnectionOptions = Parameters<typeof setRedisConfig>['0'];
