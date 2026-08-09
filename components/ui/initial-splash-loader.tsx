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
      // If sessionStorage is unavailable (e.g. strict security mode), proceed
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
    }, 1700);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!showSplash) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-9999 flex items-center justify-center bg-white transition-opacity duration-500 ease-out ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <LoadingAnimation fullPage={false} size="lg" text="Connecting to MYHitch..." />
    </div>
  );
}
