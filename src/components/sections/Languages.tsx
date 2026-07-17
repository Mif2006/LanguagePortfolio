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
      gsap.from(".lang-head > *", {
        scrollTrigger: { trigger: ".lang-head", start: "top 75%" },
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".lang-panel-content",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
    );
    gsap.fromTo(
      ".lang-panel-img",
      { scale: 1.05, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: "power2.out" },
    );
  }, [active]);

  return (
    <section ref={root} id="languages" className="relative bg-[#FDFBF7] py-24 text-[#1A1614] md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        
        {/* Header */}
        <div className="lang-head mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
              <span className="h-px w-8 bg-blue-600" />
              {t("langKicker")}
            </div>
            <h2 className="font-display text-4xl leading-tight md:text-5xl lg:text-6xl">
              {t("langTitle")}
            </h2>
          </div>
          <div className="text-sm font-medium text-slate-400">
            0{active + 1} / 03
          </div>
        </div>

        {/* Friendly Pill Tabs */}
        <div className="mb-10 inline-flex w-full grid-cols-3 gap-1 rounded-full bg-slate-100/80 p-1.5 sm:w-auto sm:grid">
          {items.map((it, i) => (
            <button
              key={it.code}
              onClick={() => setActive(i)}
              className={`relative flex items-center justify-center gap-2.5 rounded-full px-5 py-3 text-sm font-medium transition-all duration-300 sm:px-8 ${
                active === i 
                  ? "bg-white text-blue-600 shadow-sm" 
                  : "text-slate-500 hover:bg-slate-200/50 hover:text-slate-700"
              }`}
            >
              <span className="text-lg leading-none">{it.flag}</span>
              <span className="tracking-wide">{it.title}</span>
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 lg:gap-16" key={active}>
          
          {/* Left Side: Image */}
          <div className="relative md:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl shadow-slate-200/40">
              <img
                src={items[active].img}
                alt={items[active].title}
                loading="lazy"
                className="lang-panel-img h-full w-full object-cover"
                width={1600}
                height={1200}
              />
              {/* Softer, warmer gradient just for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent" />
              
              {/* Image Footer Label */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3 text-sm font-medium text-white/90">
                <span className="rounded-md bg-white/20 px-3 py-1 backdrop-blur-md">
                  {items[active].code}
                </span>
                <span>{items[active].level}</span>
              </div>
            </div>
          </div>

          {/* Right Side: Text Content */}
          <div className="lang-panel-content flex flex-col justify-center md:col-span-5">
            {/* Friendly soft badge instead of harsh mono text */}
            <div className="mb-6 inline-flex self-start rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600">
              {items[active].tag}
            </div>
            
            <h3 className="font-display text-4xl leading-tight md:text-5xl lg:text-6xl">
              {items[active].title}
            </h3>
            
            <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg">
              {items[active].desc}
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
}