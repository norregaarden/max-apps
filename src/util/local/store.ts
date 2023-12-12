import { createEffect } from "solid-js";
import { createStore, SetStoreFunction } from "solid-js/store";
import { PlayCardProps } from "~/components/PlayCard";
import { ASignal, newSignal } from "../signal";

type LocalStores = {
  mystore: {
    size: number;
    card: {
      width: number;
      height: number;
    };
    bunker: PlayCardProps[];
  };
};
const defaultStores: LocalStores = {
  mystore: {
    size: 2,
    card: {
      width: 100,
      height: 300,
    },
    bunker: [
      { type: "thetext", thetext: "this is a test text for testing text" },
    ],
  },
};
const localStores: {
  [k in keyof LocalStores]: ALocalStore<LocalStores[k]> | null;
} & { _effects: { [k in keyof LocalStores]: null | unknown } } = {
  mystore: null,
  _effects: {
    mystore: null,
  },
};
type ALocalStore<T> = {
  state: T;
  setState: SetStoreFunction<T>;
};
export type AStore<T> = ALocalStore<T>;
function newLocalStore<K extends keyof LocalStores>(
  what: K,
): ALocalStore<LocalStores[K]> {
  const [state, setState] = createStore<LocalStores[K]>(defaultStores[what]);
  const theNewStore: ALocalStore<LocalStores[K]> = {
    state,
    setState,
  };
  localStores[what] = theNewStore;
  const theNewEffect = () => {
    const stringified = JSON.stringify(theNewStore.state);
    console.log({ stringified });
    return { stringified };
  };
  createEffect(theNewEffect);
  localStores._effects[what] = theNewEffect;
  return theNewStore;
}
export function getLocalStore<K extends keyof LocalStores>(
  what: K,
): ALocalStore<LocalStores[K]> {
  const savedStore = localStores[what];
  if (savedStore != null) return savedStore;
  const newStore = newLocalStore(what);
  return newStore;
}
