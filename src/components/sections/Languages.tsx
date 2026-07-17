import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/lib/i18n";
import en from "@/assets/english.jpg.asset.json";
import fr from "@/assets/french.jpg.asset.json";
import es from "@/assets/spanish.jpg.asset.json";

gsap.registerPlugin(ScrollTrigger);

export default function Languages() {
  const { t } = useLang();
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const items = [
    {
      code: "EN",
      flag: "🇬🇧",
      img: en.url,
      title: "Английский",
      level: "Для начинающих и продолжающих",
      desc: "Преодолеем языковой барьер и выведем ваш язык в актив. Будем много говорить, слушать живую речь и логично разбирать грамматику, чтобы вы чувствовали себя уверенно в любых ситуациях.",
      tag: "Свобода общения",
    },
    {
      code: "FR",
      flag: "🇫🇷",
      img: fr.url,
      title: "Французский",
      level: "Для начинающих",
      desc: "Заложим прочный фундамент с абсолютного нуля. Поставим красивое правильное произношение, освоим правила чтения и базовую лексику, чтобы вы могли легко начать свой путь в языке.",
      tag: "Прочная база",
    },
    {
      code: "ES",
      flag: "🇪🇸",
      img: es.url,
      title: "Испанский",
      level: "Для начинающих",
      desc: "Начнем погружение в язык динамично и с удовольствием. Быстро освоим фонетику, базовые конструкции и самые необходимые фразы для живого общения и путешествий.",
      tag: "Быстрый старт",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".lang-head > *",
        { y: 40, opacity: 0 },
        {
          scrollTrigger: { trigger: root.current, start: "top 75%" },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "expo.out",
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".lang-panel-content > *",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.05, ease: "expo.out" }
      );
      gsap.fromTo(
        ".lang-panel-img",
        { scale: 1.05, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "expo.out" }
      );
    }, root);
    return () => ctx.revert();
  }, [active]);

  return (
    <section ref={root} id="languages" className="relative bg-[#eff8fb] py-16 text-[#1A1614] md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        
        {/* Header */}
        <div className="lang-head mb-10 flex flex-col items-start gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#e1f0f3] px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-700 sm:px-5 sm:text-xs">
              {t("langKicker")}
            </div>
            
            <h2 className="text-4xl font-extrabold leading-tight text-[#1A1614] sm:text-5xl md:text-6xl lg:text-7xl">
              {t("langTitle")}
            </h2>
          </div>
          <div className="text-sm font-bold tracking-widest text-slate-400">
            0{active + 1} / 03
          </div>
        </div>

        {/* Tab Selector - Optimized for wrapping on mobile */}
        <div className="lang-head mb-10 flex flex-wrap gap-2 rounded-2xl bg-[#e1f0f3] p-1.5 sm:inline-flex sm:rounded-full">
          {items.map((it, i) => (
            <button
              key={it.code}
              onClick={() => setActive(i)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300 sm:flex-none sm:rounded-full sm:px-8 ${
                active === i 
                  ? "bg-white text-[#007AFF] shadow-[0_4px_12px_rgba(0,0,0,0.05)]" 
                  : "text-slate-500 hover:bg-white/50 hover:text-slate-700"
              }`}
            >
              <span className="text-lg leading-none sm:text-xl">{it.flag}</span>
              <span className="tracking-wide">{it.title}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Panel */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 lg:gap-16" key={active}>
          
          {/* Left Side: Image */}
          <div className="relative md:col-span-7">
            <div className="relative aspect-video overflow-hidden rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] sm:rounded-3xl">
              <img
                src={items[active].img}
                alt={items[active].title}
                loading="lazy"
                className="lang-panel-img h-full w-full object-cover"
                width={1600}
                height={1200}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 text-xs font-bold text-white sm:bottom-6 sm:left-6 sm:right-6 sm:text-sm">
                <span className="rounded-lg bg-white/20 px-3 py-1 backdrop-blur-md sm:rounded-xl sm:px-4 sm:py-1.5">
                  {items[active].code}
                </span>
                <span className="text-white/90">{items[active].level}</span>
              </div>
            </div>
          </div>

          {/* Right Side: Text Content */}
          <div className="lang-panel-content flex flex-col justify-center md:col-span-5">
            <div className="mb-4 inline-flex self-start rounded-full bg-[#e1f0f3] px-4 py-1.5 text-xs font-bold text-[#007AFF] sm:mb-6 sm:text-sm">
              {items[active].tag}
            </div>
            
            <h3 className="text-3xl font-extrabold leading-tight text-[#1A1614] sm:text-4xl md:text-5xl lg:text-6xl">
              {items[active].title}
            </h3>
            
            <p className="mt-4 text-sm leading-relaxed text-slate-500 sm:mt-6 sm:text-base md:text-lg">
              {items[active].desc}
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
}