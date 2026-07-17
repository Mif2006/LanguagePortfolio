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
      gsap.fromTo(
        ".method-intro > *",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );

      const items = gsap.utils.toArray(".method-item");
      items.forEach((item: any) => {
        gsap.fromTo(
          item,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      gsap.fromTo(
        ".method-stat",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".stats-container", start: "top 90%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="methodology" 
      // Adjusted to neutral-800: A rich, warm mid-tone charcoal
      className="relative bg-gray-800 [#262626] py-24 text-[#F5F5F4] md:py-32"
    >
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-10">
        
        <div className="flex flex-col gap-16 md:flex-row md:items-start md:gap-24 lg:gap-32">
          
          <div className="method-intro md:sticky md:top-32 md:w-5/12 lg:w-1/3">
            <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
              <span className="h-[2px] w-8 bg-blue-400" />
              Подход к обучению
            </div>
            <h2 className="font-display text-4xl leading-[1.15] md:text-5xl lg:text-6xl">
              Меньше теории, <br className="hidden md:block" />
              <span className="text-stone-400">больше дела.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-stone-300 md:mt-8">
              Язык — это инструмент, а не школьный предмет. Мы не будем зубрить правила ради правил. Мы будем учиться общаться свободно и с удовольствием.
            </p>
          </div>

          <div className="flex flex-col md:w-7/12 lg:w-2/3">
            <div className="flex flex-col gap-12 border-t border-stone-700 pt-12 md:gap-16 md:border-none md:pt-0">
              {methods.map((method, index) => (
                <div 
                  key={index} 
                  className="method-item group relative flex flex-col gap-4 sm:flex-row sm:gap-8 lg:gap-12"
                >
                  <div className="font-mono text-3xl font-light text-stone-600 transition-colors duration-500 group-hover:text-blue-400 sm:text-4xl lg:text-5xl">
                    {method.num}
                  </div>
                  
                  <div>
                    <h3 className="mb-3 font-display text-2xl tracking-wide sm:text-3xl">
                      {method.title}
                    </h3>
                    <p className="max-w-xl text-base leading-relaxed text-stone-300 sm:text-lg">
                      {method.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="stats-container mt-24 grid grid-cols-2 gap-8 border-t border-stone-700 pt-16 md:mt-32 md:grid-cols-4">
          {[
            { num: "4", label: "Языка" },
            { num: "C1", label: "Английский" },
            { num: "B2", label: "Французский / Испанский" },
            { num: "100%", label: "Практики на уроках" },
          ].map((stat, i) => (
            <div key={i} className="method-stat flex flex-col">
              <span className="font-display text-4xl text-blue-400 md:text-5xl lg:text-6xl">
                {stat.num}
              </span>
              <span className="mt-3 text-[10px] font-medium uppercase tracking-[0.2em] text-stone-500 sm:text-xs">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}