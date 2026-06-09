import { useEffect, useRef, useState } from "react";
import "./Hero.css";

const SERIF_PHRASES = [
  "L'enfant",
  "L'adolescent",
  "L'adulte",
  "La personne vieillissante",
] as const;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => {
      if (mq.matches) setPhraseIndex(0);
    };
    mq.addEventListener("change", syncMotion);
    return () => mq.removeEventListener("change", syncMotion);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (prefersReducedMotion()) return;

      const root = rootRef.current;
      if (!root) return;

      const scrollable = root.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const scrolled = window.scrollY - root.offsetTop;
      const progress = Math.min(1, Math.max(0, scrolled / scrollable));
      const n = SERIF_PHRASES.length;
      const idx = Math.min(n - 1, Math.floor(progress * n));
      setPhraseIndex((prev) => (prev === idx ? prev : idx));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={rootRef} className="hero-scroll-root">
      <div className="hero-sticky">
        <div className="hero" aria-labelledby="hero-title">
          <div className="hero-bg-layer" aria-hidden>
            <div className="hero-bg" />
          </div>
          <div className="hero-overlay" aria-hidden />
          <div className="hero-vignette" aria-hidden />

          <div className="hero-layout">
            <header className="hero-inner">
              <p className="hero-eyebrow">CABINET · Gichtenaere</p>

              <h1 id="hero-title" className="hero-headline">
                <span className="hero-headline-sans">De l'enfance au grand âge</span>
                <span className="hero-serif-line" aria-live="polite">
                  {SERIF_PHRASES.map((text, i) => (
                    <span
                      key={text}
                      className={
                        i === phraseIndex
                          ? "hero-serif-phrase hero-serif-phrase--on"
                          : "hero-serif-phrase"
                      }
                      aria-hidden={i !== phraseIndex}
                    >
                      {text}
                    </span>
                  ))}
                </span>
              </h1>

              <div className="hero-bubbles">
                <a href="/formats-accompagnement#bilan-tdah" className="hero-bubble">
                  Bilan TDAH
                </a>
                <a href="/formats-accompagnement#bilan-autisme" className="hero-bubble">
                  Bilan autisme
                </a>
                <a href="/formats-accompagnement#accompagnement-individuel" className="hero-bubble">
                  Accompagnement individuel
                </a>
                <a href="/formats-accompagnement#consultation-memoire" className="hero-bubble">
                  Consultation mémoire
                </a>
              </div>

              <div className="hero-cta-group">
                <a className="hero-cta hero-cta--primary" href="/prendre-rdv">
                  Prendre rendez-vous
                </a>
              </div>
            </header>
          </div>
        </div>
      </div>
    </section>
  );
}
