export type Reverser<T extends Record<PropertyKey, PropertyKey>> = {
  [P in keyof T as T[P]]: P;
};

export type Split<S extends string> = string extends S
  ? string[]
  : S extends ""
  ? []
  : S extends `${infer T}${""}${infer U}`
  ? [T, ...Split<U>]
  : [S];

export type Prettify<T> = {
  [K in keyof T]: T[K];
  // eslint-disable-next-line @typescript-eslint/ban-types
} & {};

/**
 * Temporary Types for Computing types
 */
export type SBM = { value: unknown };

export type TypeFromSurfboardDataModel<T extends ValidatorInternal> = Prettify<{
  [P in keyof T]: T[P] extends SBM
    ? T[P]["value"]
    : T[P] extends Array<SBM>
    ? Array<T[P][number]["value"]>
    : T[P] extends
        | { [U: string]: ValidatorInternal }
        | Array<ValidatorInternal>
        | Array<{ [U: string]: ValidatorInternal }>
    ? TypeFromSurfboardDataModel<T[P]>
    : never;
}>;

export type RemoveNever<T> = Omit<T, PickNeverKeys<T, keyof T>[number]>;

export type PickNeverKeys<T, K> = [
  K extends keyof T ? (T[K] extends never ? K : "") : K
];

export type TSurfboardValidator = Record<
  string,
  readonly ["mandatory" | "optional", Validator<unknown>]
>;

type ValidatorInternal =
  | SBM
  | { [K: string]: ValidatorInternal }
  | Array<ValidatorInternal>;

export type Validator<T> = (data: T) => ValidatorInternal;

type MandatoryPT<PT extends TSurfboardValidator> = Writeable<
  {
    [K in keyof PT]: PT[K][0] extends "mandatory"
      ? ReturnType<PT[K][1]>
      : never;
  },
  KeyOf<PT>
>;
type OptionalPT<PT extends TSurfboardValidator> = Partial<
  Writeable<
    {
      [K in keyof PT]: PT[K][0] extends "optional"
        ? ReturnType<PT[K][1]>
        : never;
    },
    KeyOf<PT>
  >
>;
export type GetTypeFromValidator<T extends TSurfboardValidator> = Prettify<
  RemoveNever<MandatoryPT<T>> & RemoveNever<OptionalPT<T>>
>;
export type KeyOf<T> = Extract<keyof T, string>;
export type Writeable<T extends { [x: string]: unknown }, K extends string> = {
  [P in K]: T[P];
};

export type TValidatorResponse<V> =
  | {
      status: "ERROR";
      error: string;
    }
  | { status: "SUCCESS"; data: V };

export type SimpleListValidatorResponse<V extends TSurfboardValidator> =
  TValidatorResponse<Array<GetTypeFromValidator<V>>>;

export type ValueOf<T> = T[keyof T];

export type KeysOfUnion<T> = T extends T ? keyof T : never;
