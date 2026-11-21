import React from "react";
import { howItWorksSteps } from "@/data/servicesData";
import { Icons } from "@/components/ui/Icons";

const illustrations = [
  "/illustrations/step-booking.svg",
  "/illustrations/step-visit.svg",
  "/illustrations/step-approval.svg",
  "/illustrations/step-repair.svg",
];

const illustrationAlt = [
  "Customer booking a doorstep service",
  "Technician arriving for appliance diagnosis",
  "Technician explaining the repair estimate",
  "Technician repairing a home appliance",
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="bg-white py-9 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-none px-[2.5%]">
        <div className="mx-auto mb-6 max-w-3xl text-center sm:mb-8 lg:mb-10">
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-800 sm:text-xs">
            <Icons.Check size={13} />
            100% Transparent Process
          </div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            How Our Doorstep Service Works
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-xs leading-relaxed text-slate-600 sm:text-sm lg:text-base">
            No unexpected billing, no forced part replacements. We inspect, explain, and only proceed with your clear consent.
          </p>
        </div>

        <div className="grid grid-cols-2 items-stretch gap-2.5 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {howItWorksSteps.map((step, idx) => (
            <article
              key={step.step ?? idx}
              className="group flex min-w-0 flex-col overflow-hidden rounded-[4px] border border-blue-100 bg-slate-50/80 p-2.5 transition-colors duration-200 hover:border-blue-300 sm:p-4 lg:p-5"
            >
              <div className="flex h-[66px] items-start justify-between sm:h-[88px] lg:h-[104px]">
                <span className="pt-0.5 text-2xl font-black leading-none text-blue-600/70 sm:text-3xl lg:text-4xl">
                  {step.step}
                </span>
                <img
                  src={illustrations[idx]}
                  alt={illustrationAlt[idx]}
                  width="144"
                  height="120"
                  loading="lazy"
                  decoding="async"
                  className="h-[66px] w-[88px] object-contain sm:h-[88px] sm:w-[116px] lg:h-[104px] lg:w-[140px]"
                />
              </div>

              <div className="mt-1 flex-1">
                <h3 className="mb-1.5 text-[12px] font-bold leading-[1.3] text-slate-900 sm:text-sm lg:text-base">
                  {step.title}
                </h3>
                <p className="text-[10px] leading-[1.45] text-slate-600 sm:text-xs sm:leading-[1.55] lg:text-[13px]">
                  {step.description}
                </p>
              </div>

              <div className="mt-2.5 border-t border-slate-200/80 pt-2 text-[9px] font-semibold text-slate-500 sm:mt-3 sm:text-[10px] lg:text-[11px]">{`Step ${idx + 1} of 4`}</div>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-4 max-w-3xl rounded-[4px] border border-dashed border-blue-200 bg-slate-50 px-3 py-3 text-center sm:mt-6 sm:px-6 sm:py-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 sm:text-sm">
            <Icons.ShieldCheck size={18} className="text-emerald-600" />
            <span>Customer Approval Guarantee:</span>
          </div>
          <p className="mt-1 text-[10px] leading-relaxed text-slate-600 sm:text-xs lg:text-sm">
            If you choose not to proceed after diagnosis, you pay only the nominal visiting fee. No high-pressure sales pitches, ever.
          </p>
        </div>
      </div>
    </section>
  );
};
