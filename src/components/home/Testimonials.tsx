"use client";

import React, { useEffect, useState } from "react";
import { testimonialsData } from "@/data/servicesData";
import { siteConfig } from "@/data/config";
import { Icons } from "@/components/ui/Icons";

export const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const total = testimonialsData.length;
  const maxIndex = Math.max(0, total - visibleCount);

  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      const desiredCount = width >= 1280 ? 4 : width >= 1024 ? 3 : width >= 640 ? 2 : 1;
      setVisibleCount(Math.min(total, desiredCount));
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  useEffect(() => {
    setActiveIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (maxIndex < 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => current >= maxIndex ? 0 : current + 1);
    }, 3000);
    return () => window.clearInterval(timer);
  }, [maxIndex]);

  const go = (direction: number) => {
    setActiveIndex((current) => {
      if (current + direction > maxIndex) return 0;
      if (current + direction < 0) return maxIndex;
      return current + direction;
    });
  };

  if (!total) return null;

  return (
    <section className="bg-slate-50 py-8 sm:py-10 lg:py-12">
      <div className="mx-auto w-[97.5%] max-w-none px-0">
        <div className="mx-auto mb-5 max-w-3xl text-center sm:mb-7">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-700 ring-1 ring-slate-200 sm:text-xs">
            <span className="flex items-center gap-0.5 text-amber-500">
              {[1, 2, 3, 4, 5].map((n) => <Icons.Star key={n} size={12} />)}
            </span>
            Customer Reviews
          </div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">{`Loved By ${siteConfig.ratingCount.toLocaleString()}+ Kitchen Owners`}</h2>
          <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
            Customer experiences with our doorstep assistance, clear estimates, and repair support.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex"
              style={{
                width: `${(total / visibleCount) * 100}%`,
                transform: `translateX(-${(activeIndex / total) * 100}%)`,
                transition: "transform 650ms ease",
              }}
            >
              {testimonialsData.map((item) => (
                <article
                  key={item.id}
                  className="min-w-0 px-1 sm:px-1.5"
                  style={{ width: `${100 / total}%` }}
                  aria-label={`Review by ${item.name}`}
                >
                  <div className="flex h-full min-h-[205px] flex-col justify-between rounded-[2px] border border-slate-200 bg-white p-3 shadow-sm sm:min-h-[220px] sm:p-4 lg:min-h-[230px]">
                    <div>
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-0.5 text-amber-500" aria-label={`${item.rating} out of 5 stars`}>
                          {[...Array(item.rating)].map((_, i) => <Icons.Star key={i} size={13} />)}
                        </div>
                        <span className="rounded-[2px] bg-emerald-50 px-1.5 py-1 text-[8px] font-bold uppercase tracking-wide text-emerald-700">
                          Customer feedback
                        </span>
                      </div>
                      <p className="text-[11px] leading-relaxed text-slate-700 sm:text-xs lg:text-[13px]">{`“${item.review}”`}</p>
                    </div>
                    <div className="mt-4 flex items-end justify-between gap-2 border-t border-slate-100 pt-2.5">
                      <div className="min-w-0">
                        <p className="truncate text-xs font-bold text-slate-900 sm:text-sm">{item.name}</p>
                        <p className="truncate text-[9px] text-slate-500 sm:text-[10px]">{item.location}</p>
                        <p className="mt-0.5 truncate text-[9px] font-semibold text-blue-700">{item.appliance}</p>
                      </div>
                      <span className="shrink-0 text-[9px] text-slate-400">{item.date}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {maxIndex > 0 && (
            <div className="mt-3 flex items-center justify-center gap-3">
              <button type="button" onClick={() => go(-1)} aria-label="Previous reviews" className="flex h-7 w-7 items-center justify-center rounded-[2px] border border-slate-200 bg-white text-slate-700 transition hover:border-blue-400 hover:text-blue-700">
                <span aria-hidden="true">‹</span>
              </button>
              <span className="min-w-12 text-center text-[10px] font-medium tabular-nums text-slate-500">
                {`${activeIndex + 1} / ${maxIndex + 1}`}
              </span>
              <button type="button" onClick={() => go(1)} aria-label="Next reviews" className="flex h-7 w-7 items-center justify-center rounded-[2px] border border-slate-200 bg-white text-slate-700 transition hover:border-blue-400 hover:text-blue-700">
                <span aria-hidden="true">›</span>
              </button>
            </div>
          )}
        </div>
        <p className="mt-2 text-center text-[9px] text-slate-400">
          Reviews shown are customer feedback supplied for this website.
        </p>
      </div>
    </section>
  );
};
