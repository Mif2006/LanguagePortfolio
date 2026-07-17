import { createContext, useContext, useState, type ReactNode } from "react";

type Lang = "ru" | "en";

type Dict = Record<string, { ru: string; en: string }>;

export const dict = {
  navAbout: { ru: "Обо мне", en: "About" },
  navLanguages: { ru: "Языки", en: "Languages" },
  navPricing: { ru: "Цены", en: "Pricing" },
  navContact: { ru: "Связаться", en: "Contact" },

  heroKicker: { ru: "Репетитор иностранных языков", en: "Language tutor" },
  heroName: { ru: "Милан Фролов", en: "Milan Frolov" },
  heroLine1: { ru: "Учу говорить —", en: "I teach you to speak —" },
  heroLine2: { ru: "не просто зубрить.", en: "not just to memorize." },
  heroSub: {
    ru: "Английский · Французский · Испанский. Индивидуально и в мини-группах.",
    en: "English · French · Spanish. One-to-one and small groups.",
  },
  heroCta: { ru: "Записаться на урок", en: "Book a lesson" },
  heroScroll: { ru: "Прокрутите", en: "Scroll" },

  aboutKicker: { ru: "Кто я", en: "Who I am" },
  aboutTitle: {
    ru: "Мне 20. Я говорю на четырёх языках и учу трём из них.",
    en: "I'm 20. I speak four languages and teach three of them.",
  },
  aboutP1: {
    ru: "Русский — родной. Английский на уровне C1, французский и испанский — B2. Я не филолог за кафедрой — я твой сверстник, который прошёл этот путь и помнит, что работает, а что нет.",
    en: "Russian is my native tongue. English at C1, French and Spanish at B2. I'm not a professor behind a podium — I'm someone your age who walked this road and remembers what works and what doesn't.",
  },
  aboutP2: {
    ru: "Мои уроки — про живую речь, честный фидбек и материалы, которые ты действительно захочешь открыть.",
    en: "My lessons are about real speech, honest feedback, and materials you'll actually want to open.",
  },
  aboutStat1: { ru: "языка в активе", en: "active languages" },
  aboutStat2: { ru: "год преподаю", en: "years teaching" },
  aboutStat3: { ru: "довольных учеников", en: "happy students" },

  langKicker: { ru: "Три языка · Три мира", en: "Three languages · Three worlds" },
  langTitle: { ru: "Выбери свой", en: "Pick yours" },

  englishTitle: { ru: "Английский", en: "English" },
  englishLevel: { ru: "Мой уровень: C1", en: "My level: C1" },
  englishDesc: {
    ru: "От уверенного small talk до IELTS и деловых переговоров. Ставим произношение, разбираем идиомы, смотрим сериалы без субтитров.",
    en: "From confident small talk to IELTS and business negotiations. We fix pronunciation, dig into idioms, and watch shows without subtitles.",
  },
  englishTag: { ru: "Advanced · Business · IELTS", en: "Advanced · Business · IELTS" },

  frenchTitle: { ru: "Французский", en: "French" },
  frenchLevel: { ru: "Мой уровень: B2", en: "My level: B2" },
  frenchDesc: {
    ru: "Тот самый язык, где важно не только что ты говоришь, но и как. Учим красиво звучать, читать Камю и заказывать вино в Париже.",
    en: "The language where it matters how you say it. We learn to sound beautiful, read Camus and order wine in Paris.",
  },
  frenchTag: { ru: "Débutant · Intermédiaire · DELF", en: "Beginner · Intermediate · DELF" },

  spanishTitle: { ru: "Испанский", en: "Spanish" },
  spanishLevel: { ru: "Мой уровень: B2", en: "My level: B2" },
  spanishDesc: {
    ru: "Тёплый, быстрый и живой. Через музыку, сериалы и разговоры доводим тебя до уверенного B1–B2 быстрее, чем ты думаешь.",
    en: "Warm, fast, alive. Through music, series and real conversation we get you to a confident B1–B2 faster than you'd expect.",
  },
  spanishTag: { ru: "Principiante · Conversación · DELE", en: "Beginner · Conversation · DELE" },

  pricingKicker: { ru: "Стоимость", en: "Pricing" },
  pricingTitle: { ru: "Просто и честно", en: "Simple and honest" },
  pricingPrivate: { ru: "Индивидуально", en: "Private" },
  pricingPrivateDesc: {
    ru: "Только ты и я. Программа под твои цели, скорость и слабые места. 60 минут полного внимания.",
    en: "Just you and me. A program built around your goals, pace and weak spots. 60 minutes of full attention.",
  },
  pricingGroup: { ru: "Мини-группа", en: "Small group" },
  pricingGroupDesc: {
    ru: "До 4 человек. Больше практики речи, меньше цена. Отлично для друзей, коллег или пар.",
    en: "Up to 4 people. More speaking practice, lower price. Perfect for friends, coworkers or couples.",
  },
  pricingPerLesson: { ru: "за урок", en: "per lesson" },
  pricingCurrency: { ru: "BYN", en: "BYN" },
  pricingInclude1: { ru: "60 минут занятия", en: "60-minute lesson" },
  pricingInclude2: { ru: "Материалы и домашка", en: "Materials and homework" },
  pricingInclude3: { ru: "Онлайн или вживую", en: "Online or in person" },
  pricingInclude4: { ru: "Поддержка между уроками", en: "Support between lessons" },

  contactKicker: { ru: "Связаться", en: "Get in touch" },
  contactTitle: {
    ru: "Первый урок — знакомство. Бесплатно.",
    en: "First lesson is an intro. On the house.",
  },
  contactSub: {
    ru: "Напиши мне — обсудим цели, уровень и удобное время.",
    en: "Drop me a line — we'll talk about goals, level and a good time.",
  },
  contactTelegram: { ru: "Telegram", en: "Telegram" },
  contactInstagram: { ru: "Instagram", en: "Instagram" },
  contactEmail: { ru: "Email", en: "Email" },

  footer: { ru: "© 2026 Милан Фролов · Минск, Беларусь", en: "© 2026 Milan Frolov · Minsk, Belarus" },
} satisfies Dict;

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: keyof typeof dict) => string };
const LangCtx = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ru");
  const t = (k: keyof typeof dict) => dict[k][lang];
  return <LangCtx.Provider value={{ lang, setLang, t }}>{children}</LangCtx.Provider>;
}

export function useLang() {
  const c = useContext(LangCtx);
  if (!c) throw new Error("useLang outside provider");
  return c;
}
