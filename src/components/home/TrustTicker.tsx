"use client";

import React from "react";
import { Icons } from "@/components/ui/Icons";

const highlights = [
  "Happy Customer Experience",
  "Multi-Brand Appliance Service",
  "Doorstep Repair Assistance",
  "Easy Service Booking",
  "Repair and Maintenance Support",
  "Customer Care Assistance",
  "Support for Major Appliance Brands",
];

export const TrustTicker: React.FC = () => {
  const items = [...highlights, ...highlights];

  return (
    <section
      aria-label="Service highlights"
      className="relative z-10 overflow-hidden border-y border-blue-100 bg-white py-3 shadow-[0_5px_18px_rgba(15,40,75,0.06)]"
    >
      <div className="service-ticker-track flex w-max items-center">
        {items.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="mx-4 inline-flex shrink-0 items-center gap-2 text-[11px] font-extrabold tracking-wide text-slate-700 sm:mx-6 sm:text-xs"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              {index % 4 === 0 ? <Icons.Star size={13} /> :
               index % 4 === 1 ? <Icons.BadgeCheck size={14} /> :
               index % 4 === 2 ? <Icons.MapPin size={14} /> :
               <Icons.Clock size={14} />}
            </span>
            <span className="whitespace-nowrap">{item}</span>
            <span className="ml-3 h-1 w-1 rounded-full bg-sky-400" />
          </div>
        ))}
      </div>
    </section>
  );
};
