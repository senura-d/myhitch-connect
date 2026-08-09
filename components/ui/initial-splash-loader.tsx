"use client";

import React, { useEffect, useState } from "react";
import { LoadingAnimation } from "./loading-animation";

export function InitialSplashLoader() {
  const [showSplash, setShowSplash] = useState<boolean | null>(null);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Check if the splash screen has already been shown in this browser session
    try {
      const hasSeenSplash = sessionStorage.getItem("myhitch_splash_shown");
      if (hasSeenSplash) {
        setShowSplash(false);
        return;
      }
    } catch {
      // If sessionStorage is unavailable, proceed safely
    }

    // First load of the website: show splash
    setShowSplash(true);

    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 1300);

    const removeTimer = setTimeout(() => {
      setShowSplash(false);
      try {
        sessionStorage.setItem("myhitch_splash_shown", "true");
      } catch {
        // Ignore
      }
    }, 1800);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!showSplash) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-9999 flex items-center justify-center bg-white/95 backdrop-blur-3xl transition-all duration-500 ease-out ${
        isFadingOut ? "opacity-0 scale-102 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Ambient background aura */}
      <div className="absolute w-96 h-96 rounded-full bg-cyan-400/10 blur-3xl pointer-events-none animate-pulse" />
      
      <div className="relative z-10">
        <LoadingAnimation fullPage={false} size="lg" text="Connecting to verified network" />
      </div>
    </div>
  );
}
