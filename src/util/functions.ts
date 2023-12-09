import { AnyFunction, Piped } from "./types";

const id = <T,>(the: T) => the;

export const piped = <Functions extends Function[]>(
  ...fs: Functions
): Piped<Functions> =>
  fs.reduce(
    (acc, elm) => (the: any) => elm(acc(the)),
    <T,>(the: T) => the,
  ) as any;

export const pipe = <A, Functions extends any[]>(
  arg: A,
  ...fs: Functions
): Piped<Functions> extends AnyFunction
  ? ReturnType<Piped<Functions>>
  : "nah no not today" => (piped(...fs) as unknown as AnyFunction)(arg);
