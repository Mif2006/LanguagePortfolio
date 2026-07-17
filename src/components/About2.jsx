import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

export default function Methodology() {
  const { t } = useLang();
  const root = useRef<HTMLDivElement>(null);

  const methods = [
    {
      title: "Строить прочный фундамент",
      desc: "Поставим красивое произношение, освоим чтение и научимся понимать иностранную речь на слух.",
      icon: "01",
    },
    {
      title: "Выводить язык в актив",
      desc: "Наша главная цель — не просто знать правила, а свободно и грамотно говорить, преодолев языковой барьер.",
      icon: "02",
    },
    {
      title: "Разбирать грамматику логично",
      desc: "Никакой скучной зубрежки, только то, что действительно нужно для общения, с немедленной отработкой на практике.",
      icon: "03",
    },
    {
      title: "Для школьников и начинающих",
      desc: "Помогу не только подтянуть оценки и легко справляться с домашним заданием, но и действительно полюбить язык.",
      icon: "04",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section header
      gsap.from(".method-header > *", {
        scrollTrigger: { trigger: root.current, start: "top 75%" },
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
      });

      const cards = gsap.utils.toArray<HTMLElement>(".method-card");

      cards.forEach((card, i) => {
        // 1. Entrance animation for each card as it comes into view
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 85%" },
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });

        // 2. Parallax scale-down effect for the background cards as the next one overlaps
        if (i !== cards.length - 1) {
          gsap.to(card, {
            scale: 0.92,
            opacity: 0.2, // Darkens/fades the background card
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          });
        }
      });

      // Animate the stats at the bottom
      gsap.from(".stat", {
        scrollTrigger: { trigger: ".stats", start: "top 85%" },
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="methodology" className="relative border-t border-border/40 py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        
        {/* Section Header */}
        <div className="method-header max-w-3xl">
          <div className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-ember">
            <span className="h-px w-10 bg-ember" />
            Подход к обучению
          </div>
          <h2 className="font-display text-4xl leading-tight md:text-6xl">
            Не просто уроки, а работа на результат
          </h2>
          <p className="mt-8 max-w-xl text-lg text-muted-foreground">
            Забудьте о страхе сделать ошибку. Мы будем учиться в комфортном темпе, 
            сразу применяя новые знания в диалогах.
          </p>
        </div>

        {/* Vertical Stacking Cards Container */}
        {/* Added extra padding bottom to give the last card scroll space */}
        <div className="method-grid mt-24 flex flex-col pb-24 md:mt-32">
          {methods.map((m, i) => (
            <div 
              key={i} 
              className="method-card sticky mx-auto w-full max-w-4xl rounded-2xl border border-border/40 bg-background p-8 shadow-2xl transition-colors hover:border-ember/50 sm:p-12 md:p-16"
              style={{ 
                // Dynamically offset the top so they create a stepped stack effect
                top: `calc(15vh + ${i * 1.5}rem)`,
                // Ensure z-index layers correctly
                zIndex: i + 1
              }}
            >
              <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                <div className="md:w-1/3">
                  <span className="font-mono text-6xl font-light text-ember/20 transition-colors group-hover:text-ember md:text-8xl">
                    {m.icon}
                  </span>
                </div>
                <div className="md:w-2/3">
                  <h3 className="mb-4 font-display text-3xl tracking-tight text-foreground md:text-4xl">
                    {m.title}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats / Highlights Footer */}
        <div className="stats mt-24 grid grid-cols-2 gap-6 border-t border-border/40 pt-16 md:grid-cols-4">
          {[
            { n: "4", l: "Языка" },
            { n: "C1", l: "Английский" },
            { n: "B2", l: "Французский / Испанский" },
            { n: "100%", l: "Практики на уроках" },
          ].map((s, i) => (
            <div key={i} className="stat">
              <div className="font-display text-4xl text-ember md:text-5xl">{s.n}</div>
              <div className="mt-3 text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}