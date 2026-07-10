"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function EerieLoading() {
  const t = useTranslations("HomePage.loading");
  const [messageIndex, setMessageIndex] = useState(0);
  
  const messages = [
    t("msg1"),
    t("msg2"),
    t("msg3"),
    t("msg4"),
  ];

  const currentMessage = messages[messageIndex] || messages[0];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-12">
      {/* Static Glow Aura */}
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 bg-[#8b0000] rounded-full blur-2xl opacity-50" />
        <div className="absolute inset-4 bg-[#8b0000] rounded-full blur-xl opacity-70" />
        <div className="absolute inset-8 bg-[#ff0000] rounded-full blur-md opacity-90" />
      </div>

      {/* Atmospheric Text */}
      <p className="text-zinc-400 italic text-xl animate-ghostly-flicker transition-opacity duration-1000">
        {currentMessage}
      </p>
    </div>
  );
}
