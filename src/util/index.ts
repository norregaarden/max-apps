// import { createSignal } from "solid-js";
// import { createStore } from "solid-js/store";
// import { objectKeys } from "./js/object";

console.log("file", "util");

export const logmsgret =
  (msg: string) =>
  <T,>(a: T) => (console.log(msg, a), a);

// export function newSignal<T>(d: T) {
//   const [get, set] = createSignal<T>(d);
//   return { get, set, _is: "signal" };
// }
// type _object = Record<keyof any, unknown>;
// export type ASignal<T> = ReturnType<typeof newSignal<T>>;
// export const newStore = <T extends _object>(d: T) => {
//   const [get, set] = createStore<T>(d);
//   return { get, set, _is: "store" };
// };
// export type AStore<T extends _object> = ReturnType<typeof newStore<T>>;
// export type SignalStore<T, specific = unknown> = Record<string, ASignal<T>> & {
//   [k in keyof specific]: ASignal<specific[k]>;
// };

// const filterIn =
//   (key: keyof any) =>
//   <T extends _object>(the: T): boolean =>
//     the != null && the[key] != null;

// export type Integer = { thenumber: number; isinteger: true };
// export type Categorical = any[] | number | string;
// // export type GroupedBy<Kf extends (keyof any), C extends Categorical, T extends { [k in Kf]: C }> = Map<{ [k in Kf]: C }, T[]>;
// export type GroupedBy<
//   Kf extends keyof any,
//   C extends Categorical,
//   T extends { [k in Kf]: C },
// > = Map<string, T[]>;

// export const groupBy = <
//   Keys extends keyof any,
//   Cats extends Categorical,
//   The extends { [k in Keys]: Cats },
// >(
//   onallof: The[],
//   ...keys: Keys[]
// ): GroupedBy<Keys, Cats, The> => {
//   const result: GroupedBy<Keys, Cats, The> = new Map();
//   for (let i = onallof.length; i >= 0; i -= 1) {
//     const the = onallof[i];
//     // const filterfun=keys.reduce((lazyprevs, nextkey) => () => filterIn(nextkey)(the) && lazyprevs(), () => false)
//     const gkeys = objectKeys(the).filter((k) => keys.includes(k as any));
//     gkeys.sort(); // when do I learn to remember that is mutates...
//     const gkobj = gkeys.reduce(
//       (o, k) => ({ ...o, [k]: the[k as keyof typeof the] }),
//       {} as any,
//     );
//     // const keybutasstring=gkeys.join('_such_unique_string_omg_much_')
//     const mapkey = Object.entries(gkobj)
//       .map((ent) => (ent as string[]).join("_sup_"))
//       .join("_wazz_");
//     const keytouse = mapkey; //gkobj
//     const groupexists = result.has(keytouse);
//     if (groupexists) {
//       const old = result.get(keytouse)!;
//       result.set(keytouse, [...old, the]);
//     } else {
//       result.set(keytouse, [the]);
//     }
//   }
//   return result;
// };

