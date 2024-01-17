import { getEnvironmentVariables } from '@wander-tag/utils';

export const environment = {
    properties: getEnvironmentVariables({
        REDIS_CLUSTER: {
            required: ['REDIS_CLUSTER_HOST', 'REDIS_CLUSTER_PORT', 'REDIS_CLUSTER_USER', 'REDIS_CLUSTER_PASS'],
            optional: [],
        },
    }),
    production: process.env.NODE_ENV != 'development',
} as const;
