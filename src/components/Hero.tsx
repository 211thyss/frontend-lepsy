import { useEffect, useRef, useState } from "react";
import "./Hero.css";

const logoPlaceholders = ["FFPP", "Ordre", "Éthique", "Formation"] as const;

const SERIF_PHRASES = [
  "dans l'écoute et la confiance.",
  "dans un cadre déontologique clair.",
  "au rythme que vous vous donnez.",
  "dans la relation thérapeutique.",
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
              <p className="hero-eyebrow">GICHT' · Gichtenaere</p>

              <h1 id="hero-title" className="hero-headline">
                <span className="hero-headline-sans">Retrouver le calme</span>
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

              <p className="hero-desc">
                Un cabinet de psychologie où vous pouvez poser vos mots, à votre rythme, dans un cadre
                bienveillant et confidentiel — pour mieux comprendre ce que vous traversez et avancer
                avec plus de clarté.
              </p>

              <div className="hero-cta-group">
                <a className="hero-cta hero-cta--primary" href="/prendre-rdv">
                  Prendre rendez-vous
                </a>
                <a className="hero-cta hero-cta--secondary" href="#contact">
                  Nous contacter
                </a>
              </div>
            </header>

            <div className="hero-logos" aria-hidden>
              <p className="hero-logos-label">Engagements et cadre professionnel</p>
              <ul className="hero-logos-row">
                {logoPlaceholders.map((label) => (
                  <li key={label} className="hero-logo-item">
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
