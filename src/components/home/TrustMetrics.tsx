import React from "react";
import { Icons } from "@/components/ui/Icons";

export const TrustMetrics: React.FC = () => {
  return (
    <section aria-label="Independent service provider disclaimer" className="w-[95%] max-w-none mx-auto py-3 sm:py-4">
      <div className="flex items-start gap-3 border border-red-300 bg-red-50 px-3 py-3 text-red-900 shadow-sm sm:px-4">
        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-[2px] bg-red-100 text-red-700">
          <Icons.ShieldCheck size={17} />
        </span>
        <div className="min-w-0">
          <h3 className="text-xs font-extrabold uppercase tracking-wide text-red-800 sm:text-sm">
            Important Disclaimer – Independent Service Provider
          </h3>
          <p className="mt-1 text-[10px] leading-relaxed text-red-800 sm:text-xs">
            Service Support Hub is an independent third-party appliance service assistance provider. We are not affiliated with, authorized by, sponsored by, or officially connected to any appliance manufacturer or brand unless expressly stated in writing. All brand names and trademarks belong to their respective owners and are used only to identify compatible products and service requirements. Brand references do not imply official authorization, partnership, or endorsement.
          </p>
        </div>
      </div>
    </section>
  );
};
