"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface LetterRevealTextProps {
  text: string;
  className?: string;
  highlightWords?: string[];
}

function LetterRevealText({ text, className = "", highlightWords = [] }: LetterRevealTextProps) {
  const words = text.split(" ");

  return (
    // aria-label carries the real sentence; the split letters are hidden from
    // assistive tech so it never reads the text out one character at a time.
    <p className={`flex flex-wrap justify-center gap-x-2 gap-y-1 ${className}`} aria-label={text}>
      {words.map((word, wordIdx) => {
        const cleanWord = word.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        const isHighlighted = highlightWords.some((hw) => hw.toLowerCase() === cleanWord);
        const letters = word.split("");

        return (
          <span
            key={wordIdx}
            aria-hidden="true"
            className={`inline-block whitespace-nowrap ${
              isHighlighted ? "text-brand font-black" : ""
            }`}
          >
            {letters.map((char, charIdx) => (
              // No dimmed state baked in here on purpose: GSAP owns the hidden
              // state, so if it never runs the copy stays readable instead of
              // being stranded invisible.
              <span key={charIdx} className="char-item inline-block opacity-0">
                {char}
              </span>
            ))}
          </span>
        );
      })}
    </p>
  );
}

export function WhatWeDoTextScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const slide1Ref = useRef<HTMLDivElement>(null);
  const slide2Ref = useRef<HTMLDivElement>(null);
  const slide3Ref = useRef<HTMLDivElement>(null);
  const slide4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // If reduced motion, reveal all text immediately
        gsap.set(".char-item", { opacity: 1 });
        return;
      }

      const slides = [slide1Ref.current, slide2Ref.current, slide3Ref.current, slide4Ref.current];

      slides.forEach((slide) => {
        if (!slide) return;

        const chars = slide.querySelectorAll(".char-item");
        if (!chars.length) return;

        const trigger = slide.querySelector(".slide-text") ?? slide;

        const zoomTarget = slide.querySelector(".slide-zoom");
        if (zoomTarget) {
          const zoomFrom = window.matchMedia("(min-width: 768px)").matches ? 1.3 : 1.12;
          gsap.fromTo(
            zoomTarget,
            { scale: zoomFrom },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger,
                start: "top 85%",
                end: "center 45%",
                scrub: 0.5,
                invalidateOnRefresh: true,
              },
            }
          );
        }

        // True Typewriter Reveal: letters start 100% invisible (opacity 0) and type out character by character
        gsap.fromTo(
          chars,
          {
            opacity: 0,
            visibility: "visible",
          },
          {
            opacity: 1,
            stagger: 0.04,
            ease: "none",
            scrollTrigger: {
              trigger,
              start: "top 80%",
              end: "center 45%",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    }, containerRef);

    // The homepage above this section is image-heavy, so trigger positions
    // measured on mount can be stale. Re-measure once everything has loaded.
    const refresh = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") {
      refresh();
    } else {
      window.addEventListener("load", refresh);
    }

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} id="what-we-do" className="bg-white text-black overflow-clip select-none">
      {/* SLIDE 1: OVERVIEW SHOWCASE */}
      <div
        ref={slide1Ref}
        className="min-h-screen py-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8"
      >
        <div className="slide-text max-w-3xl mx-auto">
          <LetterRevealText
            text="Connecting Australia with 100% Verified Local Experts and Trade Professionals"
            highlightWords={["Verified", "Local", "Experts"]}
            className="text-2xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight leading-tight"
          />
        </div>
      </div>

      {/* SLIDE 2: POINT 01 */}
      <div
        ref={slide2Ref}
        className="min-h-screen py-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8"
      >
        <div className="slide-zoom slide-text max-w-3xl mx-auto">
          <LetterRevealText
            text="Government Licence & Insurance Audits Required"
            highlightWords={["Licence", "Insurance"]}
            className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-black tracking-tight leading-tight"
          />
        </div>
      </div>

      {/* SLIDE 3: POINT 02 */}
      <div
        ref={slide3Ref}
        className="min-h-screen py-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8"
      >
        <div className="slide-text max-w-3xl mx-auto">
          <LetterRevealText
            text="Authentic Work Portfolios & Verified Client Reviews"
            highlightWords={["Authentic", "Portfolios", "Verified"]}
            className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-black tracking-tight leading-tight"
          />
        </div>
      </div>

      {/* SLIDE 4: POINT 03 */}
      <div
        ref={slide4Ref}
        className="min-h-screen py-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 relative"
      >
        <div className="slide-text max-w-3xl mx-auto">
          <LetterRevealText
            text="Instant Quotes & Direct Local Suburb Booking"
            highlightWords={["Instant", "Direct", "Local"]}
            className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-black tracking-tight leading-tight"
          />
        </div>
      </div>
    </section>
  );
}
