import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from '../../i18n/routing';
import WishForm from "./components/WishForm";
import Logo from "./components/Logo";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function MonkeyPawPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations("HomePage");

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#d1d1d1] flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-2xl w-full space-y-12 text-center">
        {/* Header */}
        <header className="space-y-4 flex flex-col items-center justify-center">
          <Logo />
          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl font-bold text-[#8b0000] tracking-tighter drop-shadow-[0_0_15px_rgba(139,0,0,0.5)] font-gothic">
              {t("title")}
            </h1>
            <p className="text-zinc-500 italic text-lg font-story">{t("subtitle")}</p>
          </div>
        </header>

        <WishForm />
      </div>
    </main>
  );
}

