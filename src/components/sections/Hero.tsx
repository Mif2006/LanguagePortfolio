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
      // Using a timeline to ensure a single, snappy, cohesive motion 
      // without any sluggish initial delays or hesitation.
      const tl = gsap.timeline();

      tl.from(".hero-word", {
        yPercent: 110,
        duration: 1,
        ease: "expo.out",
      })
      .from(".hero-fade", { 
        opacity: 0, 
        y: 30, 
        duration: 1, 
        stagger: 0.1, 
        ease: "expo.out" 
      }, "<0.1") // Triggers just 0.1s after the word starts
      .from(".hero-portrait-wrapper", { 
        scale: 1.05, 
        y: 30,
        opacity: 0, 
        duration: 1, 
        ease: "expo.out" 
      }, "<0.1");

      // Parallax scroll effect
      gsap.to(".hero-portrait-wrapper", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, [lang]);

  return (
    <section ref={root} id="top" className="relative min-h-[100svh] overflow-hidden bg-[#eff8fb] text-[#1A1614] md:min-h-screen">
      
      {/* Lightened Background Overlay - perfectly blended into our brand background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(239,248,251,0.85), rgba(239,248,251,1)), url(${heroBg.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="mx-auto grid min-h-[100svh] max-w-[1400px] grid-cols-1 content-center gap-12 px-6 pb-24 pt-32 md:min-h-screen md:grid-cols-12 md:items-center md:gap-10 md:px-10">
        <div className="flex flex-col items-start md:col-span-7">
          
          {/* Pill Kicker */}
          <div className="hero-fade mb-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#e1f0f3] px-5 py-2 text-xs font-bold uppercase tracking-widest text-slate-700 md:mb-8">
            {t("heroKicker")}
          </div>

          {/* Main Title */}
          <h1 className="font-sans text-[clamp(4.5rem,13vw,9rem)] font-extrabold leading-[0.95] tracking-tight text-[#1A1614] md:text-[clamp(5rem,10vw,10rem)]">
            <span className="block overflow-hidden pb-2">
              <span className="hero-word inline-block">Ярослав</span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="hero-fade mt-6 max-w-lg text-base leading-relaxed text-slate-500 sm:text-lg md:mt-8 md:text-xl">
            {t("heroSub")}
          </p>

          {/* CTA & Links */}
          <div className="hero-fade mt-8 flex flex-wrap items-center gap-4 md:mt-10">
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-[#007AFF] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:scale-[1.02] hover:bg-blue-600 hover:shadow-blue-500/30 active:scale-[0.98]"
            >
              <span>{t("heroCta")}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            
            <a 
              href="#languages" 
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-bold text-slate-500 shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-300 hover:text-[#1A1614] hover:shadow-[0_8px_16px_rgba(0,0,0,0.08)] active:scale-[0.98]"
            >
              EN · FR · ES
            </a>
          </div>
        </div>

        {/* Portrait Container - Clean, modern shape without harsh border lines */}
        <div className="flex justify-center md:col-span-5 md:justify-end">
          <div className="hero-portrait-wrapper relative aspect-[3/4] w-full max-w-[340px] md:max-w-[420px]">
            <div className="h-full w-full overflow-hidden rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] transition-transform duration-700 hover:scale-[1.02]">
              <img
                src="/Me1.png"
                alt="Ярослав"
                className="h-full w-full object-cover"
                width={1200}
                height={1600}
              />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}