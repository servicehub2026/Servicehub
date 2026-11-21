"use client";

import React from "react";

const brands = [
  "LG", "Samsung", "Bosch", "Whirlpool", "IFB", "Haier", "Godrej",
  "Panasonic", "Voltas", "Daikin", "Sony", "Faber", "Kaff", "Glen",
];

export const BrandCoverageSlider: React.FC = () => {
  const loop = [...brands, ...brands];

  return (
    <section aria-label="Appliance brands" className="brand-strip w-full overflow-hidden bg-[#142b4d] py-5 text-white sm:py-6">
      <div className="mx-auto flex w-full max-w-none items-center justify-between gap-3 px-[1%]">
        <div className="min-w-0">
          <h2 className="text-base font-extrabold tracking-tight sm:text-lg">Service Brands</h2>
        </div>
        <a href="#find-service" onClick={(event) => { event.preventDefault(); window.dispatchEvent(new Event("focus-product-selector")); document.getElementById("product-selector-field")?.scrollIntoView({ behavior: "smooth", block: "center" }); }} className="brand-find-button shrink-0 rounded-[4px] border border-blue-200/50 bg-[#2d67a5] px-3 py-2 text-[10px] font-extrabold text-white transition hover:bg-[#397bbd] sm:px-4 sm:text-xs">
          Find Your Brand
        </a>
      </div>

      <div className="brand-marquee-viewport mt-4 w-full overflow-hidden">
        <div className="brand-marquee-track flex w-max">
          {loop.map((brand, index) => (
            <div
              key={`${brand}-${index}`}
              aria-hidden={index >= brands.length}
              className="brand-logo-tile mx-1.5 flex h-[62px] w-[calc((100vw-36px)/3)] shrink-0 items-center justify-center rounded-[5px] border border-white/10 bg-[#1d3b63] px-2 sm:mx-2 sm:h-[72px] sm:w-[150px] lg:w-[166px]"
            >
              <span className={`brand-wordmark brand-${brand.toLowerCase().replace(/[^a-z]/g, "")}`}>{brand}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="mx-auto mt-3 w-full px-[1%] text-[9px] leading-relaxed text-slate-500">
        Brand names are used only for product identification. Service Support Hub is an independent service assistance platform and is not affiliated with or endorsed by the brands mentioned.
      </p>
    </section>
  );
};
