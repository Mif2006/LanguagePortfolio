import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const { t } = useLang();
  const root = useRef<HTMLDivElement>(null);
  
  // Custom state for the modern selector
  const [selectedGoal, setSelectedGoal] = useState("Индивидуальные занятия");
  const goals = [
    "Индивидуальные занятия", 
    "Мини-группа", 
    "Просто задать вопрос"
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-animate",
        { y: 40, opacity: 0 },
        {
          scrollTrigger: { trigger: root.current, start: "top 70%" },
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={root} 
      id="contact" 
      className="relative bg-[#eff8fb] py-24 md:py-32"
    >
      <div className="mx-auto max-w-2xl px-6">
        
        {/* Header - Now with the requested color pop */}
        <div className="contact-animate text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#e1f0f3] px-5 py-2 text-xs font-bold uppercase tracking-widest text-slate-700">
            {t("contactKicker")}
          </div>
          <h2 className="mt-4 font-sans text-5xl font-extrabold leading-tight text-[#1A1614] md:text-6xl">
            Начнем <span className="text-[#ff9900]">обучение</span>
          </h2>
          <p className="mt-6 text-lg text-slate-600 md:text-xl">
            Заполните форму, и я свяжусь с вами, чтобы обсудить ваши цели и подобрать удобное время.
          </p>
        </div>

        {/* Enrollment Form */}
        <div className="contact-animate mt-16 rounded-3xl bg-white p-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.06)] md:p-12">
          <form className="grid grid-cols-1 gap-8" onSubmit={(e) => e.preventDefault()}>
            
            {/* Name */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700">Ваше имя</label>
              <input 
                type="text" 
                className="w-full rounded-2xl border-none bg-[#eff8fb] p-4 text-[#1A1614] placeholder-slate-400 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder="Как к вам обращаться?"
              />
            </div>

            {/* Flexible Contact Field */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700">Как с вами связаться?</label>
              <input 
                type="text" 
                className="w-full rounded-2xl border-none bg-[#eff8fb] p-4 text-[#1A1614] placeholder-slate-400 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder="Email, Telegram (@username) или телефон"
              />
            </div>

            {/* Custom Modern Selector Grid */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700">Что вас интересует?</label>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {goals.map((goal) => (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => setSelectedGoal(goal)}
                    className={`rounded-2xl p-4 text-left text-sm font-bold transition-all duration-300 ${
                      selectedGoal === goal
                        ? "bg-[#ff9900] text-white shadow-lg shadow-orange-200"
                        : "bg-[#eff8fb] text-slate-500 hover:bg-[#e1f0f3] hover:text-slate-700"
                    }`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>

            {/* Button */}
            <button 
              type="submit"
              className="mt-4 w-full rounded-2xl bg-[#ff9900] py-4 text-center font-bold text-white shadow-lg shadow-orange-200 transition-transform hover:scale-[1.01] active:scale-[0.99] text-lg"
            >
              Отправить заявку
            </button>
          </form>
        </div>

        {/* Footer info */}
        <div className="contact-animate mt-12 flex flex-col items-center gap-2 text-center text-sm text-slate-500">
          <p>Обычно отвечаю в течение нескольких часов.</p>
         
        </div>
      </div>
    </section>
  );
}