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
    }, 1200);

    const removeTimer = setTimeout(() => {
      setShowSplash(false);
      try {
        sessionStorage.setItem("myhitch_splash_shown", "true");
      } catch {
        // Ignore
      }
    }, 1950);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!showSplash) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-9999 flex items-center justify-center bg-white transition-all duration-700 ease-in-out ${
        isFadingOut
          ? "opacity-0 pointer-events-none backdrop-blur-none"
          : "opacity-100 backdrop-blur-2xl"
      }`}
      style={{
        transitionProperty: "opacity, backdrop-filter, transform",
        transitionDuration: "750ms",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Ambient glowing aura */}
      <div
        className={`absolute w-96 h-96 rounded-full bg-cyan-400/15 blur-3xl pointer-events-none transition-opacity duration-700 ${
          isFadingOut ? "opacity-0 scale-125" : "opacity-100 scale-100"
        }`}
      />

      {/* Center content with smooth scale, lift & blur dissolve */}
      <div
        className="relative z-10 transition-all duration-700"
        style={{
          transform: isFadingOut ? "translateY(-12px) scale(0.96)" : "translateY(0) scale(1)",
          filter: isFadingOut ? "blur(3px)" : "blur(0px)",
          opacity: isFadingOut ? 0 : 1,
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <LoadingAnimation fullPage={false} size="lg" text="Connecting to verified network" />
      </div>
    </div>
  );
}
