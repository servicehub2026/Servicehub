"use client";

import React, { useEffect, useRef } from "react";
import { whyChooseUs } from "@/data/servicesData";
import { Icons } from "@/components/ui/Icons";

const featureVisuals = [
  { emoji: "⏱️", label: "Quick doorstep service" },
  { emoji: "🧩", label: "Genuine spare parts" },
  { emoji: "💳", label: "Clear pricing" },
  { emoji: "🛡️", label: "Service warranty" },
  { emoji: "👨‍🔧", label: "Verified technicians" },
  { emoji: "🧰", label: "Multi-brand expertise" },
];

export const WhyChooseUs: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const moveSlider = (direction: "prev" | "next") => {
    const slider = sliderRef.current;
    if (!slider) return;
    const firstCard = slider.querySelector<HTMLElement>("[data-feature-card]");
    const gap = window.innerWidth >= 1024 ? 20 : window.innerWidth >= 640 ? 16 : 12;
    const distance = firstCard ? firstCard.getBoundingClientRect().width + gap : slider.clientWidth;
    slider.scrollBy({ left: direction === "next" ? distance : -distance, behavior: "smooth" });
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const autoRotate = window.setInterval(() => {
      if (document.hidden) return;
      const firstCard = slider.querySelector<HTMLElement>("[data-feature-card]");
      if (!firstCard) return;

      const styles = window.getComputedStyle(slider);
      const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
      const step = firstCard.getBoundingClientRect().width + gap;
      const maxScroll = slider.scrollWidth - slider.clientWidth;

      if (maxScroll <= 2) return;
      if (slider.scrollLeft >= maxScroll - 8) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        slider.scrollBy({ left: step, behavior: "smooth" });
      }
    }, 2000);

    return () => window.clearInterval(autoRotate);
  }, []);

  return (
    <section id="why-choose-us" className="relative overflow-hidden bg-[#142b4d] py-8 text-white sm:py-10 lg:py-12">
      <div className="pointer-events-none absolute left-0 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-blue-400/15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-5 max-w-3xl text-center sm:mb-6 lg:mb-7">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-blue-300/25 bg-[#1d3b63] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-100 sm:text-xs">
            <Icons.BadgeCheck size={14} />
            The Service Support Hub Difference
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">
            Why Thousands of Homeowners Trust Us
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-blue-100/85 sm:mt-3 sm:text-sm lg:text-base">
            We hold ourselves to the highest standards of technical excellence, honesty, and punctual doorstep assistance.
          </p>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => moveSlider("prev")}
            aria-label="Previous benefits"
            className="absolute left-1 top-1/2 z-10 hidden h-8 w-8 sm:flex -translate-y-1/2 items-center justify-center rounded-[4px] border border-blue-200/20 bg-[#102440]/90 text-white shadow-sm backdrop-blur-sm transition hover:bg-blue-600/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 sm:-left-3 sm:h-9 sm:w-9 lg:-left-5"
          >
            <span aria-hidden="true" className="text-xl leading-none">‹</span>
          </button>
          <div
            ref={sliderRef}
            className="why-choose-slider flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth [touch-action:pan-x_pan-y] sm:gap-4 lg:gap-5"
            aria-label="Why choose Service Support Hub benefits"
          >
            {whyChooseUs.map((item, idx) => (
              <article
                key={idx}
                data-feature-card
                className="group flex w-[88%] shrink-0 snap-start flex-col rounded-[4px] border border-blue-200/15 bg-[#1d3b63] px-5 py-4 transition-colors duration-200 hover:border-blue-300/60 hover:bg-[#244875] sm:w-[calc(50%-8px)] sm:p-5 lg:w-[calc(33.333%-14px)] lg:px-6 lg:py-5"
              >
                <div className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-[4px] bg-gradient-to-br from-blue-500 to-cyan-500 text-[20px] shadow-sm sm:mb-3">
                  <span role="img" aria-label={featureVisuals[idx]?.label ?? "Service benefit"}>
                    {featureVisuals[idx]?.emoji ?? "✨"}
                  </span>
                </div>
                <h3 className="mb-1.5 text-sm font-bold leading-snug text-white transition-colors group-hover:text-blue-300 sm:text-base">
                  {idx === 3 ? "30-Day Service Warranty*" : item.title}
                </h3>
                <p className="text-xs leading-[1.55] text-blue-100/75 sm:text-[13px]">
                  {idx === 3
                    ? "Eligible repair work includes a 30-day service warranty, subject to the applicable warranty terms and conditions."
                    : item.description}
                </p>
              </article>
            ))}
          </div>
          <button
            type="button"
            onClick={() => moveSlider("next")}
            aria-label="Next benefits"
            className="absolute right-1 top-1/2 z-10 hidden h-8 w-8 sm:flex -translate-y-1/2 items-center justify-center rounded-[4px] border border-blue-200/20 bg-[#102440]/90 text-white shadow-sm backdrop-blur-sm transition hover:bg-blue-600/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 sm:-right-3 sm:h-9 sm:w-9 lg:-right-5"
          >
            <span aria-hidden="true" className="text-xl leading-none">›</span>
          </button>
        </div>
        <p className="mt-2 text-[10px] leading-relaxed text-blue-200/60">
          *Warranty coverage, exclusions, and claim requirements are governed by the applicable service warranty terms and conditions.
        </p>
      </div>
    </section>
  );
};
