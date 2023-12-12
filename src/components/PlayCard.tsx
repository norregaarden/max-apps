import { JSX, Match, Switch } from "solid-js";
import { pipe, piped } from "~/util/functions";

type Color =
  | { type: "rgba"; r: number; g: number; b: number; a: number }
  | { type: "hsla"; h: number; s: number; l: number; a: number };
type ColorProps = {
  type: "color";
  color: Color;
};
type UpmarkedProps = {
  type: "markup";
  markup: string;
};
type PlaintextProps = {
  type: "thetext";
  thetext: string;
};
type Props = ColorProps | UpmarkedProps | PlaintextProps;
export type PlayCardProps= Props;
const pixels = (a: number) => `${a}px`;
const bigger = (a: number) => 2 * a;
const biggerer = (a: number) => 4 * a;
const huger = (a: number) => 6 * a;
const hugerer = (a: number) => 8 * a;
const smaller = (a: number) => a / 2;
const smallerer = (a: number) => a / 4;
const tinier = (a: number) => a / 6;
const tinierer = (a: number) => a / 8;
const append = (start: string, end: string, middle = " ") =>
  `${start}${middle}${end}`;
const space = " ";
const size = 123;
const colors={
  black:'black',
  white:'white',
  blue:'blue',
}
const blackBorder: (size: number) => JSX.CSSProperties = (size) => ({
  border: [pipe(size, bigger, pixels), "solid", colors.black].join(space),
  "border-radius": pipe(size, biggerer, pixels),
});
const boxy: (x: number, y:number) => JSX.CSSProperties = (x,y) => ({
  width: pipe(x, pixels),
  height: pipe(y, pixels)
});
export function PlayCard(props: Props) {
  const mysize=2
  const mywidth=100
  const myheight=300
  return (
    <div style={{ ...blackBorder(mysize), ...boxy(mywidth, myheight) }}>
      <Switch
        fallback={
          <div>
            this is a playing card to play with cards for card play not in
            cardboard or is it
          </div>
        }
      >
        <Match when={props.type == "color"}>
          color {JSON.stringify((props as ColorProps).color)}
        </Match>
        <Match when={props.type == "markup"}>
          markup {JSON.stringify((props as UpmarkedProps).markup)}
        </Match>
        <Match when={props.type == "thetext"}>
          thetext {JSON.stringify((props as PlaintextProps).thetext)}
        </Match>
      </Switch>
    </div>
  );
}
export function AdminPlayCard(props: Props) {
  
}
export function BunchOfPlayCards(props: Props[]) {
  
}
export function AdminBunchOfPlayCards(props: Props[]) {
  
}
