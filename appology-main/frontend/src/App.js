import { useEffect } from "react";
import Lenis from "lenis";
import "@/App.css";
import { StarryBackground } from "@/components/StarryBackground";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Chapters } from "@/components/Chapters";
import { Letter } from "@/components/Letter";
import { Finale } from "@/components/Finale";

function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 1 });
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="App" data-testid="apology-app">
      <StarryBackground />
      <div className="grain-overlay" aria-hidden="true" />

      <main className="relative sky-gradient">
        <Hero />
        <Marquee />
        <Chapters />
        <Letter />
        <Finale />

        <footer className="relative z-10 pb-16 pt-8 text-center">
          <p className="font-script text-2xl sm:text-3xl text-[#A3A8B7]/70">
            written under the same sky, for Pratishtha — from Sadan
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
