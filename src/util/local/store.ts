import { createEffect } from "solid-js";
import { createStore, SetStoreFunction } from "solid-js/store";
import { isServer } from "solid-js/web";
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
} & { _effects: { [k in keyof LocalStores]: null | unknown } } = isServer
  ? ({} as any)
  : {
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
  if (isServer) return { state: "this is sever" } as any;
  const gotSavedStringed = localStorage.getItem(what);
  const [state, setState] = createStore<LocalStores[K]>(
    gotSavedStringed ? JSON.parse(gotSavedStringed) : defaultStores[what],
  );
  const theNewStore: ALocalStore<LocalStores[K]> = {
    state,
    setState,
  };
  localStores[what] = theNewStore;
  const theNewEffect = () => {
    const stringified = JSON.stringify(theNewStore.state);
    localStorage.setItem(what, stringified); // SAVE
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
  console.log("savedStore", what, savedStore);
  if (savedStore != null) return savedStore;
  const newStore = newLocalStore(what);
  console.log("newStore", what, newStore);
  return newStore;
}
