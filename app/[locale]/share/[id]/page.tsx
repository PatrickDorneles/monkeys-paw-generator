import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from '@/i18n/routing';
import { redis } from "@/lib/ratelimit";
import Logo from "@/app/[locale]/components/Logo";
import Link from "next/link";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ShareFatePage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("SharePage");

  const data = await redis.get(`fate:${id}`);
  const fate = data ? JSON.parse(data as string) : null;

  if (!fate) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-[#d1d1d1] flex flex-col items-center justify-center p-6 font-sans text-center">
        <div className="max-w-md w-full space-y-8">
          <Logo />
          <h1 className="text-3xl font-bold text-[#8b0000] font-gothic">
            {t("void_title")}
          </h1>
          <p className="text-zinc-500 italic font-story">
            {t("void_msg")}
          </p>
          <Link 
            href={`/${locale}`}
            className="inline-block px-6 py-2 border border-[#8b0000] text-[#8b0000] hover:bg-[#8b0000] hover:text-white transition-colors duration-300 font-gothic tracking-widest uppercase text-sm"
          >
            {t("back_home")}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#d1d1d1] flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-2xl w-full space-y-12 text-center">
        <header className="space-y-4 flex flex-col items-center justify-center">
          <Logo />
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-bold text-[#8b0000] tracking-tighter drop-shadow-[0_0_15px_rgba(139,0,0,0.5)] font-gothic">
              {t("title")}
            </h1>
            <p className="text-zinc-500 italic text-lg font-story">{t("subtitle")}</p>
          </div>
        </header>

        <div className="space-y-8 bg-[#111] border border-zinc-800 p-8 md:p-12 rounded-sm shadow-2xl relative overflow-hidden group">
          {/* Subtle red glow in corner */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#8b0000] opacity-10 blur-[100px] group-hover:opacity-20 transition-opacity duration-700"></div>
          
          <div className="space-y-6 relative z-10">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 font-sans">The Wish</span>
              <p className="text-xl md:text-2xl font-gothic text-zinc-300 italic">
                "{fate.wish}"
              </p>
            </div>
            
            <div className="h-px w-12 bg-zinc-800 mx-auto"></div>
            
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 font-sans">The Consequence</span>
              <div className="text-lg md:text-xl leading-relaxed font-story text-zinc-400 first-letter:text-4xl first-letter:font-gothic first-letter:text-[#8b0000] first-letter:mr-1">
                {fate.story}
              </div>
            </div>
          </div>
        </div>

        <footer className="flex flex-col items-center space-y-6">
          <Link 
            href={`/${locale}`}
            className="px-8 py-3 border border-[#8b0000] text-[#8b0000] hover:bg-[#8b0000] hover:text-white transition-all duration-300 font-gothic tracking-widest uppercase text-sm group relative overflow-hidden"
          >
            <span className="relative z-10">{t("try_your_luck")}</span>
            <div className="absolute inset-0 bg-[#8b0000] translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </Link>
        </footer>
      </div>
    </main>
  );
}
