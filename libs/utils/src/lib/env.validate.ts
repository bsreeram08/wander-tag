import { Prettify, UnionOfArrayValues, ValueOf } from '@wander-tag/type-utils';
import { deepFreeze } from './deep-freeze';

type ENABLED_SERVICES = 'GCLOUD' | 'PRISMA' | 'REDIS' | 'REDIS_CLUSTER' | 'RABBITMQ';

type REQUIRED_VALUES<T = string, U = string> = {
    required: Array<T>;
    optional: Array<U>;
};
type ENABLED_SERVICES_MAP = {
    [Key in ENABLED_SERVICES]: REQUIRED_VALUES;
};

type TCheckEnv = Prettify<Partial<ENABLED_SERVICES_MAP> & { [Key: string]: REQUIRED_VALUES }>;
type TGetOptionalAsObject<T extends TCheckEnv> = { [K in UnionOfArrayValues<ValueOf<T>['optional']>]: string };
type TGetMandatoryAsObject<T extends TCheckEnv> = { [K in UnionOfArrayValues<ValueOf<T>['required']>]: string };
type TResponse<T extends TCheckEnv> = Prettify<Record<keyof T, Partial<TGetOptionalAsObject<T>> & TGetMandatoryAsObject<T>>>;

export function getEnvironmentVariables<const T extends TCheckEnv>(options: T): TResponse<T> {
    const keys: Array<keyof T> = Object.keys(options);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const env: any = {};
    const missingMandatory: Array<string> = [];
    const missingOptional: Array<string> = [];
    keys.forEach((key) => {
        env[key] = {};
        const category = options[key];
        const { optional, required } = category;
        required.forEach((variable) => {
            const value = process.env[variable];
            if (!value) missingMandatory.push(`${String(key)}.${variable} is missing`);
            else env[key][variable] = value;
        });

        optional.forEach((variable) => {
            const value = process.env[variable];
            if (!value) missingOptional.push(`${String(key)}.${variable} is missing`);
            else env[key][variable] = value;
        });
    });
    return deepFreeze(env);
}
