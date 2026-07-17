import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";

export default function Nav() {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [langTheme, setLangTheme] = useState<{ bg: string; border: string } | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    
    // Listen for custom events dispatched by the Languages component
    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail.inView) {
        setLangTheme(customEvent.detail.theme);
      } else {
        setLangTheme(null);
      }
    };
    window.addEventListener("langSectionView", handleThemeChange);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("langSectionView", handleThemeChange);
    };
  }, []);

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (!element) return;

    const startPosition = window.scrollY;
    const targetPosition = element.getBoundingClientRect().top + window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 800; 
    let start: number | null = null;

    function animation(currentTime: number) {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);

      const ease = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, startPosition + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }
    requestAnimationFrame(animation);
  };

  const links = [
    ["#about", "О Уроках"],
    ["#languages", "Языки"],
    ["#formats", "Форматы"],
    ["#contact", "Контакты"],
  ];

  // Determine the dynamic background and border based on section visibility
  const headerStyle = scrolled 
    ? langTheme 
      ? `${langTheme.bg} backdrop-blur-xl border-b ${langTheme.border}` 
      : "bg-[#eff8fb]/80 backdrop-blur-xl border-b border-[#e1f0f3]"
    : "bg-transparent border-b border-transparent";

  return (
    <header className={`fixed top-0 z-50 w-screen max-w-screen transition-colors duration-1000 ease-in-out ${headerStyle}`}>
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
        
        <a 
          href="#top" 
          onClick={(e) => smoothScroll(e, "#top")}
          className="group flex items-center gap-3"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-[#007AFF] font-sans text-lg font-bold text-[#007AFF] transition-transform group-hover:scale-105">
            Я
          </span>
          <span className="font-sans text-lg font-extrabold tracking-tight text-[#1A1614]">Ярослав</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={(e) => smoothScroll(e, href)}
              className="group relative text-sm font-bold text-slate-500 transition-colors hover:text-[#1A1614]"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1 rounded-full border border-[#e1f0f3] bg-white p-1 text-xs shadow-sm transition-colors duration-1000">
          {(["ru", "en"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`rounded-full px-4 py-1.5 font-bold uppercase tracking-widest transition-all ${
                lang === l 
                  ? "bg-[#007AFF] text-white" 
                  : "text-slate-400 hover:text-[#1A1614]"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}