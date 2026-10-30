import { bookingHref } from "@/lib/site";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Approach } from "@/components/Approach";
import { Process } from "@/components/Process";
import { Results } from "@/components/Results";
import { Commitments } from "@/components/Commitments";
import { Close } from "@/components/Close";
import { Footer } from "@/components/Footer";
import { ScrollEffects } from "@/components/ScrollEffects";
import { SceneDriver } from "@/components/SceneDriver";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Approach />
        <Process />
        <Results />
        <Commitments />
        <Close />
      </main>
      <Footer />
      <div className="mobile-cta" data-mobile-cta inert>
        <a className="btn" href={bookingHref()}>Book a discovery call</a>
      </div>
      <ScrollEffects />
      <SceneDriver />
    </>
  );
}
