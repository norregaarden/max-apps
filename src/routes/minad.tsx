import { For, isServer, Show } from "solid-js/web";
import { Title } from "solid-start";
import { Slider } from "~/components/Counter";
import { PlayCard, PlayCardProps } from "~/components/PlayCard";
import { getLocalStore } from "~/util/local/store";
import { AlmostSignal, newSignal } from "~/util/signal";

const getYay = () => {
  const yay = getLocalStore("mystore");
  return yay;
};
type Yay = ReturnType<typeof getYay>;
export default function Home() {
  if (isServer) return null;
  const yay = getYay();
  return (
    <main>
      <Title>Ad, min</Title>
      <h1>bunk admin</h1>
      <button onClick={(e) => yay.reset(confirm("rly"))}>reset store</button>
      {JSON.stringify(yay.state)}
      <For each={yay.state.bunker}>{VisBunke}</For>
      <button onClick={(e) => yay.setState("bunker", (b) => [...b, []])}>
        buttontext add one bunk
      </button>
      <h1>card admin</h1>
      <CardSize yay={yay} />
      <PlayCard />
    </main>
  );
}

function VisBunke(item: PlayCardProps[], index: () => number) {
  if (isServer) return null;
  const yay = getYay();
  const ied = index();
  return (
    <div>
      <button
        onClick={(e) =>
          yay.setState("bunker", (bs) => {
            const bb = [...bs];
            const lengthBefore = bb.length;
            bb.splice(ied, 1);
            if (bb.length != lengthBefore - 1) alert("ooh err");
            return bb;
          })
        }
      >
        buttontext slet bunk
      </button>
      <For each={yay.state.bunker[ied]}>
        {(it, i) => {
          const dirty = newSignal<null | string>(null);
          const getContents = () => yay.state.bunker[ied][i()].content;
          const saveContents = (html: string) => {
            yay.setState("bunker", ied, i(), {
              content: { type: "markup", markup: html },
            });
          };
          return (
            <div>
              <Show when={dirty.get() != null}>
                <button onClick={() => saveContents(dirty.get() as string)}>
                  save
                </button>
              </Show>
              <div
                contenteditable
                innerHTML={getContents()?.markup}
                onKeyPress={(e) => dirty.set(e.target.innerHTML)}
              />
              <PlayCard content={getContents()} />
            </div>
          );
        }}
      </For>
      <button
        onClick={(e) =>
          yay.setState("bunker", ied, (b) => {
            // const minBunke = b[index()];
            return [...b, {}] as PlayCardProps[];
          })
        }
      >
        buttontext add one card
      </button>
    </div>
  );
}

function CardSize(props: { yay: Yay }) {
  return (
    <div>
      <h4>CARD HEIGHT plus det løse</h4>
      <Slider
        sig={
          {
            get: () => props.yay.state.card.height,
            set: (newVal) => props.yay.setState("card", "height", newVal),
          } as AlmostSignal<number>
        }
        min={{ get: () => 0 }}
        max={{ get: () => 1234 }}
        step={{ get: () => 1 }}
      />
      <h4>CARD WIDTH plus det løse</h4>
      <Slider
        sig={
          {
            get: () => props.yay.state.card.width,
            set: (newVal) => props.yay.setState("card", "width", newVal),
          } as AlmostSignal<number>
        }
        min={{ get: () => 0 }}
        max={{ get: () => 1234 }}
        step={{ get: () => 1 }}
      />
      <h4>SIZE border og padding</h4>
      <Slider
        sig={
          {
            get: () => props.yay.state.size,
            set: (newVal) => props.yay.setState("size", newVal),
          } as AlmostSignal<number>
        }
        min={{ get: () => 0 }}
        max={{ get: () => 12 }}
        step={{ get: () => 0.125 }}
      />
    </div>
  );
}
