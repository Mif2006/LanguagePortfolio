import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";

export default function Nav() {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [langTheme, setLangTheme] = useState<{ bg: string; border: string } | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false); // Close menu on click

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

  const headerStyle = scrolled 
    ? langTheme 
      ? `${langTheme.bg} backdrop-blur-xl border-b ${langTheme.border}` 
      : "bg-[#eff8fb]/80 backdrop-blur-xl border-b border-[#e1f0f3]"
    : "bg-transparent border-b border-transparent";

  return (
    <>
      <header className={`fixed top-0 z-50 w-screen max-w-screen transition-colors duration-1000 ease-in-out ${headerStyle}`}>
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
          
          <a 
            href="#top" 
            onClick={(e) => smoothScroll(e, "#top")}
            className="group relative z-[60] flex items-center gap-3"
          >
            {/* <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-[#007AFF] font-sans text-lg font-bold text-[#007AFF] transition-transform group-hover:scale-105">
              Я
            </span> */}
            <span className="font-sans text-lg font-extrabold tracking-tight text-[#007AFF]">Ярослав</span>
          </a>

          {/* Desktop Nav */}
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

          {/* Mobile Burger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="relative z-[60] flex h-10 w-10 flex-col items-center justify-center md:hidden"
            aria-label="Toggle menu"
          >
            <span 
              className={`absolute h-[2px] w-5 rounded-full bg-[#1A1614] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isMobileMenuOpen ? "translate-y-0 rotate-45" : "-translate-y-1.5"
              }`}
            />
            <span 
              className={`absolute h-[2px] w-5 rounded-full bg-[#1A1614] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isMobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span 
              className={`absolute h-[2px] w-5 rounded-full bg-[#1A1614] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isMobileMenuOpen ? "translate-y-0 -rotate-45" : "translate-y-1.5"
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Sidebar Panel */}
      <div 
        className={`fixed right-0 top-0 z-50 flex h-[100svh] w-[85vw] max-w-[360px] flex-col overflow-y-auto bg-white px-8 pb-12 pt-28 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col gap-8">
          {links.map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={(e) => smoothScroll(e, href)}
              className="text-2xl font-extrabold tracking-tight text-[#1A1614] transition-colors active:text-[#007AFF]"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}