export type Expand<T> = T extends T
  ? T extends object
    ? { [k in keyof T]: T[k] }
    : T
  : never;

export type ObjectKeys<T extends object> = (keyof T)[];
export type ObjectValues<T extends object> = T[keyof T][];
export type ObjectEntries<T extends object> = (keyof T extends infer K
  ? K extends keyof T
    ? [K, T[K]]
    : never
  : never)[];

export const objectKeys = <T extends object>(the: T) =>
  Object.keys(the) as Expand<ObjectKeys<T>>;
export const objectValues = <T extends object>(the: T) =>
  Object.values(the) as Expand<ObjectValues<T>>;
export const objectEntries = <T extends object>(the: T) =>
  Object.entries(the) as Expand<ObjectEntries<T>>;

type nat = number & {
  readonly _is: "natural number";
  readonly _more_info: "includes zero";
};

export const objectMap = <T extends object, U extends Record<keyof T, any>>(
  the: T,
  fun: <K extends keyof T>(
    key: K,
    val: T[K],
    i: nat,
    es: ObjectEntries<T>,
  ) => U[K],
) =>
  Object.fromEntries(
    Object.keys(the).map((k, i, a) => [
      k,
      fun(k as keyof T, the[k as keyof T], i as nat, a as any),
    ]),
  ) as {
    [k in keyof T]: U[k];
  };

export const objectFilter = <T extends object, As = T>(
  the: T,
  include: <K extends keyof T>(
    k: K,
    v: T[K],
    i: nat,
    es: ObjectEntries<T>,
  ) => boolean,
) =>
  Object.fromEntries(
    objectEntries(the).filter(([k, v], i, a) =>
      include(k, v, i as nat, a as any),
    ),
  ) as As;

export const objectReduce = <T extends object, U>(
  the: T,
  addU: <K extends keyof T>(
    lastU: U,
    k: K,
    v: T[K],
    i: nat,
    es: ObjectEntries<T>,
  ) => U,
  zeroU: U,
  reversed = false,
) =>
  objectEntries(the)[reversed ? "reduceRight" : "reduce"](
    (prevU, [key, value], index, entries) =>
      addU(prevU, key, value, index as nat, entries as any),
    zeroU,
  );


