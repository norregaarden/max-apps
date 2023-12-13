import { isServer } from "solid-js/web";
import { Title } from "solid-start";
import { PlayCard } from "~/components/PlayCard";
import { getLocalStore } from "~/util/local/store";

export default function Home() {
  if (isServer) return null;
  const yay = getLocalStore('mystore');
  return (
    <main>
      <button onClick={(e)=>yay.setState("card","width", w=>w*2)}>buttontext</button>
      <Title>Ad, min</Title>
      admin
      {JSON.stringify(yay.state)}
      <button onClick={(e)=>yay.setState("bunker", (b)=>[...b,...b])}>buttontext</button>
      <PlayCard />
    </main>
  );
}
