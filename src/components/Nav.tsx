import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";

export default function Nav() {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  const links: Array<[string, keyof typeof import("@/lib/i18n").dict]> = [
    ["#about", "navAbout"],
    ["#languages", "navLanguages"],
    ["#pricing", "navPricing"],
    ["#contact", "navContact"],
  ];

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled ? "bg-background/70 backdrop-blur-xl border-b border-border/40" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
        <a href="#top" className="group flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-ember/60 font-display text-lg text-ember transition-transform group-hover:rotate-12">
            M
          </span>
          <span className="font-display text-lg tracking-tight">Milan Frolov</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map(([href, key]) => (
            <a
              key={href}
              href={href}
              className="group relative text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(key)}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-ember transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1 rounded-full border border-border/60 p-1 text-xs">
          {(["ru", "en"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`rounded-full px-3 py-1 uppercase tracking-widest transition-all ${
                lang === l ? "bg-ember text-ink" : "text-muted-foreground hover:text-foreground"
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
