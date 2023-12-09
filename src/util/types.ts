export type AnyFunction = (...args: any[]) => any;

export type GetArgOne<F> = F extends (an: infer X) => infer _Y ? X : never;
export type GetRetOne<F> = F extends (an: infer _X) => infer Y ? Y : never;

export type AFunOne<singleton> = singleton extends <
  a extends infer A,
  b extends infer B,
>(
  an: a,
) => b
  ? <a extends A, b extends B>(an: a) => b
  : singleton extends <a extends infer A>(an: a) => a
  ? <a extends A>(an: a) => a
  : singleton extends (an: infer A) => infer B
  ? (an: A) => B
  : { err: "wrongsingleton"; from: [singleton] };

export type Piped<t> = t extends Array<any>
  ? t extends [infer singleton]
    ? AFunOne<singleton>
    : t extends [infer atail, infer head]
    ? head extends (a: infer a) => infer b
      ? atail extends (an: any) => a
        ? (an: GetArgOne<atail>) => b
        : { err: "twotupleatail not fun"; from: t }
      : { err: "twotuplehead not fun"; from: t }
    : t extends [...infer tail, infer head]
    ? head extends (a: infer a) => infer b
      ? tail extends [...infer tailtail, infer tovalidate]
        ? tovalidate extends (an: any) => a
          ? (an: GetArgOne<Piped<tailtail>>) => b
          : { err: "tailhead not validated"; from: t }
        : { err: "tail not Tuple"; from: t }
      : { err: "head not function"; from: t }
    : { err: "t not [...tail, head]"; from: t }
  : { err: "t not array"; from: t };
