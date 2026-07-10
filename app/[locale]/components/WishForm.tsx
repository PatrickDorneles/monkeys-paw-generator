"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export default function WishForm() {
  const t = useTranslations("HomePage");
  const params = useParams();
  const locale = params.locale as string;

  const [wish, setWish] = useState("");
  const [story, setStory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const makeWish = async () => {
    if (!wish.trim()) return;

    setIsLoading(true);
    setStory("");

    try {
      const res = await fetch("/api/wish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wish, locale }),
      });
      const data = await res.json();
      if (data.story) {
        setStory(data.story);
      } else {
        setStory(data.error || t("error_generic"));
      }
    } catch {
      setStory(t("error_connection"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-12 text-center">
      {/* Input Area */}
      <div className="relative group">
        <textarea
          className="w-full bg-[#121212] border border-zinc-800 rounded-lg p-4 text-lg focus:outline-none focus:border-[#8b0000] transition-colors duration-700 resize-none h-32 placeholder-zinc-700"
          placeholder={t("placeholder")}
          value={wish}
          onChange={(e) => setWish(e.target.value)}
        />
        <div className="absolute inset-0 pointer-events-none rounded-lg ring-1 ring-inset ring-white/5 group-hover:ring-[#8b0000]/20 transition-all duration-500" />
      </div>

      {/* Button */}
      <button
        onClick={makeWish}
        disabled={isLoading || !wish.trim()}
        className="relative px-8 py-3 bg-[#8b0000] text-white font-bold uppercase tracking-widest hover:bg-[#a00000] disabled:bg-zinc-900 disabled:text-zinc-600 transition-all duration-500 rounded-sm overflow-hidden group"
      >
        <span className={`relative z-10 ${isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-300"}`}>
          {t("button")}
        </span>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
      </button>

      {/* Results Container */}
      <div className={`min-h-[200px] transition-all duration-1000 ${story ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        {story && (
          <div className="bg-[#121212] border-l-4 border-[#8b0000] p-6 text-left italic leading-relaxed text-zinc-300 shadow-2xl">
          {story.split('\n').map((para, i) => (
            <p key={i} className="mb-4 last:mb-0">{para}</p>
          ))}
          </div>
        )}
      </div>
    </div>
  );
}
