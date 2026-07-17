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
      gsap.fromTo(
        ".format-header > *",
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

      gsap.fromTo(
        ".format-card",
        { y: 50, opacity: 0 },
        {
          scrollTrigger: { trigger: ".formats-grid", start: "top 80%" },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "expo.out",
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="formats"
      className="relative bg-[#eff8fb] py-24 text-[#1A1614] md:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        
        {/* Header Block */}
        <div className="format-header mb-16 flex flex-col items-center text-center md:mb-24">
          <div className="mb-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#e1f0f3] px-5 py-2 text-xs font-bold uppercase tracking-widest text-slate-700">
            Форматы обучения
          </div>
          
          <h2 className="mt-2 font-sans text-5xl font-extrabold leading-tight md:text-6xl lg:text-7xl">
            Выберите <span className="text-[#ff9900]">подходящий</span>
          </h2>
        </div>

        {/* Formats Grid */}
        <div className="formats-grid mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
          {formats.map((format) => (
            <div
              key={format.id}
              className="format-card group relative flex flex-col overflow-hidden rounded-3xl bg-white p-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] sm:p-10"
            >
              {/* Top Badge */}
              <div className="mb-6 self-start rounded-full bg-[#eff8fb] px-4 py-1.5 text-sm font-bold text-slate-600 transition-colors group-hover:bg-[#e1f0f3]">
                {format.caption}
              </div>
              
              {/* Title & Desc */}
              <h3 className="font-sans text-3xl font-extrabold text-[#1A1614] md:text-4xl">
                {format.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-slate-500">
                {format.desc}
              </p>

              {/* Price Area - Swapped to crisp system blue */}
              <div className="my-8 flex items-end gap-3 border-y border-[#e1f0f3] py-8">
                <span className="font-sans text-6xl font-extrabold text-[#007AFF] md:text-7xl lg:text-8xl">
                  {format.price}
                </span>
                <div className="pb-2 sm:pb-3">
                  <div className="text-xl font-bold text-slate-500 md:text-2xl">BYN</div>
                  <div className="text-sm font-bold text-slate-400">/ занятие</div>
                </div>
              </div>

              {/* Feature List */}
              <ul className="mb-10 flex-grow space-y-4 text-sm font-medium sm:text-base">
                {format.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600">
                    <span className="mt-0.5 font-bold text-[#007AFF]">✦</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Call to Action Button */}
              <a
                href="#contact"
                className="mt-auto flex w-full items-center justify-center gap-2 rounded-2xl bg-[#eff8fb] px-6 py-4 text-base font-bold text-slate-600 transition-all duration-300 hover:scale-[1.02] hover:bg-[#007AFF] hover:text-white hover:shadow-lg hover:shadow-blue-500/30 active:scale-[0.98]"
              >
                <span>Записаться на пробное</span>
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}