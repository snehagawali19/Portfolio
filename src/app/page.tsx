import { About } from "@/components/about";
import { Connect } from "@/components/connect";
import { Cursor } from "@/components/cursor";
import { Hero } from "@/components/hero";
import { Loader } from "@/components/loader";
import { Nav } from "@/components/nav";
import { Outro } from "@/components/outro";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Starfield } from "@/components/starfield";
import { Work } from "@/components/work";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="grain" aria-hidden />
      <Starfield />
      <Cursor />
      <Loader />
      <Nav />
      <main className="relative z-[3]">
        <Hero />
        <About />
        <Work />
        <Outro />
        <Connect />
      </main>
    </SmoothScroll>
  );
}
