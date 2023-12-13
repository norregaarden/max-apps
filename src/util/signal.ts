import type { Accessor, Setter } from "solid-js";
import { createSignal } from "solid-js";

export type ASignal<T> = {
  get: Accessor<T>;
  set: Setter<T>;
};
export function newSignal<T>(startingValue: T): ASignal<T> {
  const [get, set] = createSignal<T>(startingValue);
  return { get, set };
}

export const createMappedSiganal = <T, U>(
  sig: ASignal<T>,
  got: (t: T) => U,
  flot: (snot: U) => T,
) => {
  return {
    get: () => got(sig.get()),
    set: (flet: U | ((u: U) => U)) =>
      typeof flet == "function"
        ? sig.set((t) => flot((flet as (u: U) => U)(got(t))))
        : sig.set(flot(flet as U) as Exclude<T, Function>),
  } as ASignal<U>;
};

export type AlmostSignal<T> = {
  get: () => T;
  set: (newValue: T) => void;
};

export type JustGetter<T> = {
  get: ()=>T
}
// export const signalFromGetSet = <T>(
//   getter: ()=>T,
//   setter: (a:T)=>void
// ):ASignal<T>=> {
//   // const fake = newSignal(getter())
//   const set = ()
//   return {get: fake.get}
// }
