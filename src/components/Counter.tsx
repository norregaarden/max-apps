import { For, Show, onMount } from "solid-js";
import type { ParentProps } from "solid-js";
import { logmsgret } from "~/util";
import {
  AlmostSignal,
  ASignal,
  createMappedSiganal,
  JustGetter,
  newSignal,
} from "~/util/signal";

console.log("file", "Form");

export function Slider(props: {
  sig: AlmostSignal<number>;
  min: JustGetter<number>;
  max: JustGetter<number>;
  step: JustGetter<number>;
  // min: AlmostSignal<number>;
  // max: AlmostSignal<number>;
}) {
  return (
    <input
      type="range"
      value={props.sig.get()}
      step={props.step.get()}
      min={props.min.get()}
      max={props.max.get()}
      onChange={(e) => props.sig.set(parseInt(e.target.value))}
    />
  );
}

export function Counter(props: ParentProps<{ sig: ASignal<number> }>) {
  const increment = () => props.sig.set(props.sig.get() + 1);
  const decrement = () => props.sig.set(props.sig.get() - 1);
  return (
    <div class="counter">
      <button type="button" onClick={decrement}>
        -
      </button>
      <span>{props.sig.get()}</span>
      <button type="button" onClick={increment}>
        +
      </button>
      <div class="children">{props.children}</div>
    </div>
  );
}

export function ControlledInput(
  props: ParentProps<{
    sig: ASignal<string>;
    placeholder?: string;
    class?: string;
  }>,
) {
  return (
    <input
      class={props.class}
      value={props.sig.get()}
      placeholder={props.placeholder}
      onChange={(ev) => props.sig.set(ev.target.value)}
    >
      {props.children}
    </input>
  );
}

export function UncontrolledInput(
  props: ParentProps<{
    sigref?: (sig: ASignal<string>) => void;
    placeholder?: string;
    class?: string;
  }>,
) {
  const sig = newSignal("");
  onMount(() => {
    props.sigref?.(sig);
  });
  return (
    <input
      class={props.class}
      value={sig.get()}
      placeholder={props.placeholder}
      onChange={(ev) => sig.set(ev.target.value)}
    >
      {props.children}
    </input>
  );
}

export function ControlledNumberInput(
  props: ParentProps<{
    sig: ASignal<number>;
    placeholder?: string;
    class?: string;
  }>,
) {
  return (
    <input
      class={props.class}
      type="number"
      value={props.sig.get()}
      placeholder={props.placeholder}
      onChange={(ev) => props.sig.set(parseFloat(ev.target.value))}
    >
      {props.children}
    </input>
  );
}

export function Button(
  props: ParentProps<{
    label: string;
    invert?: boolean;
    onClick: (ev: MouseEvent) => void;
    class?: string;
  }>,
) {
  return (
    <button
      class={`${props.class} ${props.invert && "invert"}`}
      value={props.label}
      onClick={(ev) => props.onClick(ev)}
    >
      {props.children ?? props.label}
    </button>
  );
}

export function Buttons<T>(props: {
  isMulti?: false;
  options: { value: T; label: string }[];
  sig: ASignal<[T]>;
}): any;
export function Buttons<T>(props: {
  isMulti: true;
  options: { value: T; label: string }[];
  sig: ASignal<T[]>;
}): any;
export function Buttons<T>(
  props: ParentProps<{
    isMulti?: boolean;
    options: { value: T; label: string }[];
    sig: ASignal<any>;
  }>,
) {
  const isMulti = () => !!props.isMulti;
  const clicked = (val: T) =>
    !isMulti()
      ? props.sig.set([val])
      : null == props.sig.get().find((s: T) => s == val)
      ? props.sig.set((got) => [...got, val])
      : props.sig.set((got) => [...got].filter((s) => s != val));
  return (
    <div class="buttons">
      <For each={props.options}>
        {(option, i) => (
          <Button
            class="button"
            label={option.label}
            invert={props.sig.get().includes(option.value)}
            onClick={(_ev) => clicked(option.value)}
          />
        )}
      </For>
    </div>
  );
}

type stringable = string | number | boolean;
export function ControlledSwitch<T extends stringable>(props: {
  options: T[];
  default?: T;
  sig: ASignal<T>;
}) {
  const getOptions = () =>
    props.options.map((o) => ({ value: o, label: o.toString() }));
  return (
    <Buttons
      options={getOptions()}
      sig={createMappedSiganal(
        props.sig,
        (t) => [t],
        ([t]) => t,
      )}
    />
  );
}
