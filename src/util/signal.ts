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
