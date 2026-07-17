
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/lib/i18n";
import heroBg from "@/assets/hero-bg.jpg.asset.json";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const { t, lang } = useLang();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-word", {
        yPercent: 110,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.08,
        delay: 0.2,
      });
      gsap.from(".hero-fade", { opacity: 0, y: 20, duration: 1, ease: "power3.out", stagger: 0.15, delay: 0.9 });
      gsap.from(".hero-portrait-wrapper", { scale: 1.05, opacity: 0, duration: 1.6, ease: "expo.out", delay: 0.1 });
      gsap.to(".hero-portrait-wrapper", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".hero-marquee-inner", { xPercent: -50, duration: 30, ease: "none", repeat: -1 });
    }, root);
    return () => ctx.revert();
  }, [lang]);

  return (
    <section ref={root} id="top" className="relative min-h-[100svh] overflow-hidden bg-gray-300 [#FDFBF7] text-[#1A1614] md:min-h-screen">
      
      {/* Lightened Background Overlay */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(253,251,247,0.7), rgba(253,251,247,1)), url(${heroBg.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="mx-auto grid min-h-[100svh] max-w-[1400px] grid-cols-1 content-center gap-12 px-6 pb-32 pt-28 md:min-h-screen md:grid-cols-12 md:items-center md:gap-10 md:px-10 md:pb-24 md:pt-32">
        <div className="md:col-span-7">
          
          {/* Kicker */}
          <div className="hero-fade mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 md:mb-8">
            <span className="h-px w-8 bg-blue-600" />
            {t("heroKicker")}
          </div>

          {/* Main Title */}
          <h1 className="font-display text-[clamp(4rem,15vw,9rem)] leading-[0.95] tracking-tight md:text-[clamp(4rem,10vw,9rem)]">
            <span className="block overflow-hidden">
              <span className="hero-word inline-block">Ярослав</span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="hero-fade mt-6 max-w-lg text-lg text-slate-600 md:mt-8">
            {t("heroSub")}
          </p>

          {/* CTA & Links */}
          <div className="hero-fade mt-8 flex flex-wrap items-center gap-4 md:mt-10">
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-blue-600 px-7 py-4 text-sm font-medium text-white transition-all hover:gap-5 hover:bg-blue-700"
            >
              <span>{t("heroCta")}</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a href="#languages" className="text-sm font-medium text-slate-500 transition-colors hover:text-blue-600">
              EN · FR · ES
            </a>
          </div>
        </div>

        {/* Portrait Container */}
        <div className="flex justify-center md:col-span-5">
          <div className="hero-portrait-wrapper relative aspect-[3/4] w-full max-w-[340px] md:max-w-[420px]">
            <div className="h-full w-full overflow-hidden rounded-2xl shadow-xl shadow-slate-200/50">
              <img
                src="/Me1.png"
                alt="Yaroslav"
                className="h-full w-full object-cover"
                width={1200}
                height={1600}
              />
              {/* The gradient div has been completely removed from here */}
            </div>
            
            {/* Corner Accents */}
            <div className="pointer-events-none absolute -left-4 -top-4 h-12 w-12 border-l border-t border-blue-400 transition-transform duration-500 hover:scale-110 md:-left-8 md:-top-8 md:h-16 md:w-16" />
            <div className="pointer-events-none absolute -bottom-4 -right-4 h-12 w-12 border-b border-r border-blue-400 transition-transform duration-500 hover:scale-110 md:-bottom-8 md:-right-8 md:h-16 md:w-16" />
          </div>
        </div>
      </div>

    </section>
  );
}
