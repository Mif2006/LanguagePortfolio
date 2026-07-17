import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

const methods = [
  {
    title: "Погружение с первого дня",
    desc: "Мы сразу начинаем говорить. Даже с минимальным словарным запасом вы сможете строить диалоги и выражать свои мысли без страха.",
    num: "01",
  },
  {
    title: "Живая грамматика",
    desc: "Забудем про сухие таблицы и скучные учебники. Мы разбираем структуры на живых примерах из фильмов, статей и повседневных ситуаций.",
    num: "02",
  },
  {
    title: "Свобода от барьера",
    desc: "Ошибаться — это нормально. На уроках мы создаем абсолютно комфортную атмосферу, где пропадает страх сказать что-то «не так».",
    num: "03",
  },
  {
    title: "Индивидуальный темп",
    desc: "Для школьников, студентов и взрослых. Будь то подготовка к экзаменам, переезд или просто желание свободно общаться в путешествиях.",
    num: "04",
  },
];

export default function Methodology() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Intro Animation
      gsap.fromTo(
        ".method-intro > *",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "expo.out", // Sharp, fluid entry with zero hesitancy
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );

      // 2. List Items Scroll Animation
      const items = gsap.utils.toArray(".method-item");
      items.forEach((item: any) => {
        gsap.fromTo(
          item,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "expo.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // 3. Stats Animation
      gsap.fromTo(
        ".method-stat",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: { trigger: ".stats-container", start: "top 90%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="about" 
      // Matching the fresh, airy blue background
      className="relative bg-[#eff8fb] py-24 text-[#1A1614] md:py-32"
    >
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-10">
        
        <div className="flex flex-col gap-16 md:flex-row md:items-start md:gap-24 lg:gap-32">
          
          {/* Left Sticky Column */}
          <div className="method-intro md:sticky md:top-32 md:w-5/12 lg:w-1/3">
            {/* Friendly Pill Kicker */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#e1f0f3] px-5 py-2 text-xs font-bold uppercase tracking-widest text-slate-700">
              Подход к обучению
            </div>
            
            {/* Bold, Accessible Typography */}
            <h2 className="mt-4 font-sans text-5xl font-extrabold leading-tight text-[#1A1614] md:text-6xl">
              Меньше теории, <br className="hidden md:block" />
              <span className="text-[#ff9900]">больше дела.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-600 md:text-xl md:mt-8">
              Язык — это инструмент, а не школьный предмет. Мы не будем зубрить правила ради правил. Мы будем учиться общаться свободно и с удовольствием.
            </p>
          </div>

          {/* Right Scrolling List */}
          <div className="flex flex-col md:w-7/12 lg:w-2/3">
            <div className="flex flex-col gap-12 border-t border-[#e1f0f3] pt-12 md:gap-16 md:border-none md:pt-0">
              {methods.map((method, index) => (
                <div 
                  key={index} 
                  className="method-item group relative flex flex-col gap-4 sm:flex-row sm:gap-8 lg:gap-10"
                >
                  {/* Large Stylized Number */}
                  <div className="font-sans text-4xl font-extrabold text-slate-300 transition-colors duration-500 group-hover:text-[#ff9900] sm:text-5xl lg:text-6xl">
                    {method.num}
                  </div>
                  
                  <div>
                    <h3 className="mb-3 font-sans text-2xl font-bold tracking-tight text-[#1A1614] sm:text-3xl">
                      {method.title}
                    </h3>
                    <p className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                      {method.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Stats Footer */}
        <div className="stats-container mt-24 grid grid-cols-2 gap-8 border-t border-[#e1f0f3] pt-16 md:mt-32 md:grid-cols-4">
          {[
            { num: "4", label: "Языка" },
            { num: "C1", label: "Английский" },
            { num: "B2", label: "Французский / Испанский" },
            { num: "100%", label: "Практики на уроках" },
          ].map((stat, i) => (
            <div key={i} className="method-stat flex flex-col">
              <span className="font-sans text-4xl font-extrabold text-[#1A1614] md:text-5xl lg:text-6xl">
                {stat.num}
              </span>
              <span className="mt-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 sm:text-xs">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}