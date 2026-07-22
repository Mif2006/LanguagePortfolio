import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const { t } = useLang();
  const root = useRef<HTMLDivElement>(null);
  
  const [selectedGoal, setSelectedGoal] = useState("Индивидуальные занятия");
  const [name, setName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contactInfo.trim()) return;

    setStatus("loading");

    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

    let message = `🔥 Новая заявка с сайта!\n\n👤 Имя: ${name}\n📞 Связь: ${contactInfo}\n🎯 Интересует: ${selectedGoal}`;
    
    if (comment.trim()) {
      message += `\n💬 Комментарий: ${comment.trim()}`;
    }

    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setName("");
        setContactInfo("");
        setComment("");
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section 
      ref={root} 
      id="contact" 
      className="relative bg-[#eff8fb] py-24 md:py-32"
    >
      <div className="mx-auto max-w-2xl px-6">
        
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

        <div className="contact-animate mt-16 rounded-3xl bg-white p-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.06)] md:p-12">
          <form className="grid grid-cols-1 gap-8" onSubmit={handleSubmit}>
            
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700">Ваше имя</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border-none bg-[#eff8fb] p-4 text-[#1A1614] placeholder-slate-400 outline-none transition-all focus:ring-2 focus:ring-blue-200"
                placeholder="Как к вам обращаться?"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700">Как с вами связаться?</label>
              <input 
                type="text" 
                required
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                className="w-full rounded-2xl border-none bg-[#eff8fb] p-4 text-[#1A1614] placeholder-slate-400 outline-none transition-all focus:ring-2 focus:ring-blue-200"
                placeholder="Email, Telegram (@username) или телефон"
              />
            </div>

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

            {/* Optional Comment Field */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700">
                Комментарий или вопрос
              </label>
              <textarea 
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full resize-none rounded-2xl border-none bg-[#eff8fb] p-4 text-[#1A1614] placeholder-slate-400 outline-none transition-all focus:ring-2 focus:ring-blue-200"
                placeholder="Ваш текущий уровень, удобное время или пожелания..."
              />
            </div>

            <button 
              type="submit"
              disabled={status === "loading" || status === "success"}
              className={`mt-4 w-full rounded-2xl py-4 text-center text-lg font-bold text-white shadow-lg transition-transform active:scale-[0.99] ${
                status === "success" 
                  ? "bg-green-500 shadow-green-200 cursor-default" 
                  : status === "error"
                  ? "bg-red-500 shadow-red-200"
                  : "bg-[#ff9900] shadow-orange-200 hover:scale-[1.01]"
              }`}
            >
              {status === "idle" && "Отправить заявку"}
              {status === "loading" && "Отправка..."}
              {status === "success" && "✓ Заявка отправлена"}
              {status === "error" && "Ошибка. Попробовать еще раз?"}
            </button>
          </form>
        </div>

        <div className="contact-animate mt-12 flex flex-col items-center gap-2 text-center text-sm text-slate-500">
          <p>Обычно отвечаю в течение нескольких часов.</p>
        </div>
      </div>
    </section>
  );
}