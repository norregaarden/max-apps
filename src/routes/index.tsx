import { Title } from "solid-start";
import { Counter } from "~/components/Counter";
import { newSignal } from "~/util/signal";

export default function Home() {
  const testSignal = newSignal(42);
  return (
    <main>
      <Title>Hello World</Title>
      <h1>Hello world!</h1>
      <Counter sig={testSignal} />
      <p>
        Visit{" "}
        <a href="https://start.solidjs.com" target="_blank">
          start.solidjs.com
        </a>{" "}
        to learn how to build SolidStart apps.
      </p>
    </main>
  );
}
