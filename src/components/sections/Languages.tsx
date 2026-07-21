import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

export default function Languages() {
  const { t } = useLang();
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const items = [
    {
      code: "EN",
      flag: "🇬🇧",
      title: "Английский",
      level: "Для начинающих и продолжающих",
      desc: "Преодолеем языковой барьер и выведем ваш язык в актив. Будем много говорить, слушать живую речь и логично разбирать грамматику, чтобы вы чувствовали себя уверенно в любых ситуациях.",
      tag: "Свобода общения",
      features: [
        "Разговорная практика", "Интуитивная грамматика", "Современная лексика",
        "Аудирование", "Интерактивный формат", "Снятие барьера",
        "Английский для жизни", "Живые диалоги", "Правильное произношение",
        "Игры на уроках", "Разбор сленга", "Погружение в среду",
        "Быстрый старт", "Уверенность в себе", "Повседневные фразы"
      ],
      theme: {
        bg: "bg-[#eef2ff]",
        text: "text-[#312e81]",
        textMuted: "text-[#4f46e5]",
        pill: "bg-[#e0e7ff] text-[#3730a3]",
        featureCard: "bg-[#e0e7ff]/60 hover:bg-[#e0e7ff]",
        activeBtn: "bg-[#4f46e5] text-white shadow-[0_4px_12px_rgba(79,70,229,0.25)]",
        inactiveBtn: "text-[#4f46e5] hover:bg-[#e0e7ff]",
        nav: { bg: "bg-[#e0e7ff]/80", border: "border-[#c7d2fe]" }
      },
    },
    {
      code: "FR",
      flag: "🇫🇷",
      title: "Французский",
      level: "Для начинающих",
      desc: "Заложим прочный фундамент с абсолютного нуля. Поставим красивое правильное произношение, освоим правила чтения и базовую лексику, чтобы вы могли легко начать свой путь в языке.",
      tag: "Прочная база",
      features: [
        "Парижское произношение", "Логичная грамматика", "Практика говорения",
        "Лексика для жизни", "Интерактивный формат", "Чтение без словаря",
        "Для путешествий", "Живые диалоги", "Понимание на слух",
        "Игровые методы", "Преодоление барьера", "Культурный контекст",
        "Быстрый старт", "Уверенность в общении", "Элегантность речи"
      ],
      theme: {
        bg: "bg-[#e0f2fe]",
        text: "text-[#082f49]",
        textMuted: "text-[#0284c7]",
        pill: "bg-[#bae6fd] text-[#0369a1]",
        featureCard: "bg-[#bae6fd]/50 hover:bg-[#bae6fd]",
        activeBtn: "bg-[#0284c7] text-white shadow-[0_4px_12px_rgba(2,132,199,0.25)]",
        inactiveBtn: "text-[#0284c7] hover:bg-[#bae6fd]",
        nav: { bg: "bg-[#bae6fd]/80", border: "border-[#7dd3fc]" }
      },
    },
    {
      code: "ES",
      flag: "🇪🇸",
      title: "Испанский",
      level: "Для начинающих",
      desc: "Начнем погружение в язык динамично и с удовольствием. Быстро освоим фонетику, базовые конструкции и самые необходимые фразы для живого общения и путешествий.",
      tag: "Быстрый старт",
      features: [
        "Динамичная практика", "Грамматика без зубрежки", "Испанский ритм",
        "Фразы для поездок", "Интерактивный формат", "Снятие барьера",
        "Живые диалоги", "Понимание носителей", "Игровые уроки",
        "Современный сленг", "Темперамент языка", "Быстрый старт",
        "Уверенность в беседах", "Повседневная лексика", "Естественное общение"
      ],
      theme: {
        bg: "bg-[#ffedd5]",
        text: "text-[#431407]",
        textMuted: "text-[#ea580c]",
        pill: "bg-[#fed7aa] text-[#9a3412]",
        featureCard: "bg-[#fed7aa]/50 hover:bg-[#fed7aa]",
        activeBtn: "bg-[#ea580c] text-white shadow-[0_4px_12px_rgba(234,88,12,0.25)]",
        inactiveBtn: "text-[#ea580c] hover:bg-[#fed7aa]",
        nav: { bg: "bg-[#fed7aa]/80", border: "border-[#fdba74]" }
      },
    },
  ];

  const currItem = items[active];
  const currTheme = currItem.theme;

  const row1 = currItem.features.slice(0, 8);
  const row2 = currItem.features.slice(8, 15);

  useEffect(() => {
    const updateNav = (inView: boolean) => {
      window.dispatchEvent(
        new CustomEvent("langSectionView", { detail: { inView, theme: currTheme.nav } })
      );
    };

    const st = ScrollTrigger.create({
      trigger: root.current,
      start: "top 80px", 
      end: "bottom 80px",
      onEnter: () => updateNav(true),
      onEnterBack: () => updateNav(true),
      onLeave: () => updateNav(false),
      onLeaveBack: () => updateNav(false),
    });

    if (st.isActive) updateNav(true);

    return () => st.kill();
  }, [active, currTheme.nav]);

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
        ".lang-dynamic-content > *",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "expo.out" }
      );
    }, root);
    return () => ctx.revert();
  }, [active]);

  return (
    <section 
      ref={root} 
      id="languages" 
      className={`relative transition-colors duration-1000 ease-in-out py-16 md:py-24 lg:py-32 ${currTheme.bg} overflow-hidden`}
    >
      <style>{`
        @keyframes marquee-l {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-r {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left { animation: marquee-l 70s linear infinite; }
        .animate-marquee-right { animation: marquee-r 70s linear infinite; }
        .pause-on-hover:hover { animation-play-state: paused; }
        .mask-linear-fade {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>

      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        
        {/* Header Content */}
        <div className="lang-head mb-10 flex flex-col items-start gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl transition-colors duration-1000">
            <div className={`mb-4 inline-flex items-center justify-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest transition-colors duration-1000 md:mb-6 md:px-5 md:py-2 ${currTheme.pill}`}>
              {t("langKicker")}
            </div>
            <h2 className={`mt-2 font-sans text-4xl font-extrabold leading-tight transition-colors duration-1000 sm:text-5xl md:text-6xl lg:text-7xl ${currTheme.text}`}>
              {t("langTitle")}
            </h2>
          </div>
          <div className={`text-sm font-bold tracking-widest transition-colors duration-1000 ${currTheme.textMuted}`}>
            0{active + 1} / 03
          </div>
        </div>

        {/* Updated Tab Selector: Flex Wrap for Pyramid/Mobile Layout */}
        <div className={`lang-head mb-12 flex flex-wrap gap-2 rounded-2xl p-1.5 transition-colors duration-1000 sm:inline-flex sm:flex-row sm:rounded-full sm:p-2 md:mb-16 lg:mb-20 ${currTheme.featureCard}`}>
          {items.map((it, i) => (
            <button
              key={it.code}
              onClick={() => setActive(i)}
              className={`relative flex flex-1 items-center justify-center gap-3 rounded-xl px-5 py-3 text-sm font-bold transition-all duration-300 sm:flex-none sm:rounded-full sm:px-8 ${
                active === i ? currTheme.activeBtn : currTheme.inactiveBtn
              }`}
            >
              <span className="text-xl leading-none">{it.flag}</span>
              <span className="tracking-wide whitespace-nowrap">{it.title}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Text-Based Panel Layout */}
        <div className="lang-dynamic-content grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16" key={active}>
          <div className="flex flex-col items-start lg:col-span-5">
            <div className={`mb-6 inline-flex rounded-full px-5 py-2 text-sm font-bold ${currTheme.pill}`}>
              {currItem.tag}
            </div>
            
            <h3 className={`font-sans text-5xl font-extrabold leading-tight sm:text-6xl lg:text-[5rem] ${currTheme.text}`}>
              {currItem.title}
            </h3>
            
            <div className="mt-8 flex items-center gap-5">
              <span className={`flex h-14 w-14 items-center justify-center rounded-2xl text-3xl shadow-sm ${currTheme.pill}`}>
                {currItem.flag}
              </span>
              <div>
                <div className={`text-sm font-bold uppercase tracking-widest ${currTheme.textMuted}`}>
                  {currItem.code}
                </div>
                <div className={`mt-1 text-lg font-bold ${currTheme.text}`}>
                  {currItem.level}
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col justify-center overflow-hidden lg:col-span-7 lg:pl-10">
            <p className={`text-lg font-medium leading-relaxed sm:text-xl md:text-2xl ${currTheme.textMuted}`}>
              {currItem.desc}
            </p>
            
            <div className="mt-12 flex flex-col gap-6 lg:mt-16">
              <div className="relative flex w-full overflow-hidden mask-linear-fade py-2">
                <div className="animate-marquee-left pause-on-hover flex w-max gap-5 md:gap-6">
                  {[...row1, ...row1].map((feature, idx) => (
                    <div 
                      key={idx} 
                      className={`flex w-max items-center gap-3 md:gap-4 rounded-full px-6 py-4 md:px-8 md:py-5 transition-colors duration-300 ${currTheme.featureCard}`}
                    >
                      <div className={`shrink-0 rounded-full bg-white p-2 shadow-sm ${currTheme.textMuted}`}>
                        <svg className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className={`text-base font-bold whitespace-nowrap md:text-lg ${currTheme.text}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative flex w-full overflow-hidden mask-linear-fade py-2">
                <div className="animate-marquee-right pause-on-hover flex w-max gap-5 md:gap-6">
                  {[...row2, ...row2].map((feature, idx) => (
                    <div 
                      key={idx} 
                      className={`flex w-max items-center gap-3 md:gap-4 rounded-full px-6 py-4 md:px-8 md:py-5 transition-colors duration-300 ${currTheme.featureCard}`}
                    >
                      <div className={`shrink-0 rounded-full bg-white p-2 shadow-sm ${currTheme.textMuted}`}>
                        <svg className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className={`text-base font-bold whitespace-nowrap md:text-lg ${currTheme.text}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}