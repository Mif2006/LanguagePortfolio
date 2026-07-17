import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

export default function Pricing() {
  const { t } = useLang();
  const root = useRef<HTMLDivElement>(null);

  const formats = [
    {
      id: "private",
      title: "Индивидуально",
      caption: "1 на 1 с преподавателем",
      desc: "Максимальное внимание и программа, которая адаптируется специально под ваши цели, интересы и комфортный темп усвоения.",
      price: 30,
      features: [
        "100% внимания преподавателя",
        "Персональный план обучения",
        "Гибкий график занятий",
        "Глубокая проработка ошибок",
      ],
    },
    {
      id: "group",
      title: "Мини-группа",
      caption: "До 4 человек",
      desc: "Динамичные занятия в компании единомышленников. Отличный выбор для тех, кому важна разговорная практика и взаимная мотивация.",
      price: 20,
      features: [
        "Много живой разговорной практики",
        "Парные диалоги и интерактивы",
        "Поддержка и мотивация от группы",
        "Фиксированное расписание",
      ],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Bulletproof Header Animation
      gsap.fromTo(
        ".format-header > *",
        { y: 20, opacity: 0 },
        {
          scrollTrigger: { trigger: root.current, start: "top 75%" },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
        }
      );

      // Bulletproof Card Animation
      gsap.fromTo(
        ".format-card",
        { y: 40, opacity: 0 },
        {
          scrollTrigger: { trigger: ".formats-grid", start: "top 80%" },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="formats"
      className="relative bg-[#FDFBF7] py-24 text-[#1A1614] md:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        
        {/* Header Block */}
        <div className="format-header mb-16 text-center md:mb-24">
          <div className="mb-4 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
            <span className="h-px w-8 bg-blue-600" />
            Форматы обучения
            <span className="h-px w-8 bg-blue-600" />
          </div>
          <h2 className="font-display text-4xl leading-tight md:text-5xl lg:text-6xl">
            Выберите то, что подходит вам
          </h2>
        </div>

        {/* Formats Grid */}
        <div className="formats-grid mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          {formats.map((format) => (
            <div
              key={format.id}
              className="format-card group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200/60 bg-white p-8 shadow-xl shadow-slate-200/40 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-2xl hover:shadow-slate-200/70 sm:p-10"
            >
              {/* Top Badge */}
              <div className="mb-6 self-start rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600">
                {format.caption}
              </div>
              
              {/* Title & Desc */}
              <h3 className="font-display text-3xl md:text-4xl">
                {format.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                {format.desc}
              </p>

              {/* Price Area */}
              <div className="my-8 flex items-end gap-3 border-y border-slate-100 py-8">
                <span className="font-display text-6xl text-blue-600 md:text-7xl lg:text-8xl">
                  {format.price}
                </span>
                <div className="pb-2 sm:pb-3">
                  <div className="text-xl font-medium text-slate-700 md:text-2xl">BYN</div>
                  <div className="text-sm text-slate-400">/ занятие</div>
                </div>
              </div>

              {/* Feature List */}
              <ul className="mb-10 flex-grow space-y-4 text-sm sm:text-base">
                {format.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600">
                    <span className="mt-0.5 text-blue-400">✦</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Call to Action Button */}
              <a
                href="#contact"
                className="mt-auto flex w-full items-center justify-center gap-2 rounded-full border-2 border-slate-200 bg-transparent px-6 py-4 text-sm font-medium text-slate-700 transition-all duration-300 group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white"
              >
                <span>Записаться на пробное</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}