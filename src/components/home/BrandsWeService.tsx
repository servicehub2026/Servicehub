"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { applianceProducts, allCities, stateWiseCities } from "@/data/locations";
import { getCityServiceLandingPath } from "@/lib/cityServiceUrls";


function ProductGlyph({ name }: { name: string }) {
  const n = name.toLowerCase();
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  let drawing: React.ReactNode;
  if (n.includes("ac")) drawing = <><rect x="3" y="5" width="18" height="10" rx="2"/><path d="M7 18v2m5-2v2m5-2v2M6 9h12"/></>;
  else if (n.includes("refrigerator")) drawing = <><rect x="6" y="2.5" width="12" height="19" rx="2"/><path d="M6 11h12M9 7v2m0 5v2"/></>;
  else if (n.includes("washing")) drawing = <><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="12" cy="13" r="5"/><path d="M7 7h.01M10 7h.01M14 7h3"/></>;
  else if (n.includes("tv")) drawing = <><rect x="2.5" y="4" width="19" height="14" rx="1.5"/><path d="M9 21h6m-3-3v3"/></>;
  else if (n.includes("microwave")) drawing = <><rect x="2.5" y="5" width="19" height="14" rx="2"/><rect x="5" y="8" width="10" height="8" rx="1"/><path d="M18 9h.01M18 12h.01M18 15h.01"/></>;
  else if (n.includes("chimney")) drawing = <><path d="M8 3h8v5l4 7H4l4-7V3Z"/><path d="M3 18h18M9 21h6"/></>;
  else if (n.includes("gas")) drawing = <><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8" cy="10" r="2.2"/><circle cx="16" cy="10" r="2.2"/><path d="M7 16h10"/></>;
  else if (n.includes("geyser")) drawing = <><rect x="7" y="2.5" width="10" height="19" rx="3"/><path d="M10 7h4m-2 7c-2 2-1 4 1 4s3-2 1-4"/></>;
  else if (n.includes("water")) drawing = <><rect x="6" y="3" width="12" height="18" rx="3"/><path d="M9 7h6m-3 5c-2 2-2 4 0 5 2-1 2-3 0-5Z"/></>;
  else if (n.includes("dishwasher")) drawing = <><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M4 8h16"/><circle cx="12" cy="14" r="4"/></>;
  else drawing = <><rect x="3" y="4" width="18" height="13" rx="1.5"/><path d="M8 21h8m-4-4v4"/></>;
  return <svg viewBox="0 0 24 24" className="h-6 w-6" {...common}>{drawing}</svg>;
}

function LineIcon({ type, className = "" }: { type: "product" | "brand" | "pin" | "search"; className?: string }) {
  if (type === "search") return <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></svg>;
  if (type === "pin") return <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>;
  if (type === "brand") return <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z"/><circle cx="7.5" cy="7.5" r="1.3"/></svg>;
  return <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h10M7 12h6M7 16h4"/></svg>;
}

export const BrandsWeService: React.FC<{ cityName?: string; citySlug?: string; initialProductSlug?: string; initialBrand?: string }> = ({ cityName, citySlug, initialProductSlug, initialBrand }) => {
  const router = useRouter();
  const [productSlug, setProductSlug] = useState(initialProductSlug || "");
  const [brand, setBrand] = useState(initialBrand || "");
  const [cityQuery, setCityQuery] = useState(cityName || "");
  const [citySlugState, setCitySlug] = useState(citySlug || "");
  const [showCityOptions, setShowCityOptions] = useState(false);
  const [expandedState, setExpandedState] = useState("");
  const cityPickerRef = useRef<HTMLDivElement>(null);
  // Only navigate after an actual user selection. This avoids React Strict Mode
  // re-running the initial effect and repeatedly routing to the same URL.
  const [userChangedSelection, setUserChangedSelection] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);
  const [portalReady, setPortalReady] = useState(false);
  const [productHighlight, setProductHighlight] = useState(false);

  const selectedProduct = useMemo(
    () => applianceProducts.find((product) => product.slug === productSlug),
    [productSlug]
  );
  const selectedCity = allCities.find((city) => city.slug === citySlugState);
  const filteredCities = useMemo(() => {
    const q = cityQuery.trim().toLowerCase();
    if (!q) return allCities.slice(0, 8);
    return allCities.filter((city) => `${city.name} ${city.state}`.toLowerCase().includes(q)).slice(0, 10);
  }, [cityQuery]);
  const allSelected = Boolean(selectedProduct && brand && selectedCity);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    const highlightProduct = () => {
      setProductHighlight(true);
      window.setTimeout(() => setProductHighlight(false), 2300);
    };
    window.addEventListener("focus-product-selector", highlightProduct);
    return () => window.removeEventListener("focus-product-selector", highlightProduct);
  }, []);

  useEffect(() => {
    if (!showCityOptions) return;
    const closeOnOutside = (event: PointerEvent) => {
      if (cityPickerRef.current && !cityPickerRef.current.contains(event.target as Node)) {
        setShowCityOptions(false);
      }
    };
    document.addEventListener("pointerdown", closeOnOutside, true);
    return () => document.removeEventListener("pointerdown", closeOnOutside, true);
  }, [showCityOptions]);

  useEffect(() => {
    if (!showCityOptions || !cityQuery.trim()) return;
    const q = cityQuery.trim().toLowerCase();
    const firstMatch = stateWiseCities.find((group) =>
      group.state.toLowerCase().includes(q) || group.cities.some((city) => city.name.toLowerCase().includes(q))
    );
    if (firstMatch) setExpandedState(firstMatch.state);
  }, [cityQuery, showCityOptions]);

  useEffect(() => {
    if (!userChangedSelection || !allSelected || !selectedProduct || !selectedCity) return;

    const destination = getCityServiceLandingPath(selectedCity.slug, selectedProduct.slug, brand);
    setIsTransferring(true);
    // Give the user a brief visual acknowledgement, then navigate immediately.
    const timer = window.setTimeout(() => {
      setUserChangedSelection(false);
      router.push(destination);
    }, 220);

    return () => window.clearTimeout(timer);
  }, [userChangedSelection, allSelected, selectedProduct, selectedCity, brand, router]);

  return (
    <>
      <section id="find-service" className="relative isolate overflow-x-clip overflow-y-visible bg-gradient-to-br from-[#f7fbff] via-[#eaf3ff] to-[#dcecff] py-5 sm:py-7 lg:py-9">
        <div className="pointer-events-none absolute -right-24 -top-28 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-36 left-1/4 h-80 w-80 rounded-full bg-sky-100/80 blur-3xl" />
        <div className="relative mx-auto w-full max-w-none px-[1%]">
          <div className="relative rounded-[6px] border border-white/90 bg-white/55 shadow-[0_14px_38px_rgba(37,99,235,0.12)] backdrop-blur-sm">
            <div className="grid items-center lg:grid-cols-[1.25fr_.75fr]">
              <div className="relative z-10 min-w-0 p-4 sm:p-6 lg:p-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-100/90 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-blue-700 sm:text-xs">
                  <LineIcon type="search" className="h-3.5 w-3.5"/> Find Your Service
                </div>
                <h2 className="mt-3 max-w-3xl text-[23px] font-black leading-[1.12] tracking-tight text-slate-950 sm:text-3xl lg:text-[39px]">
                  Find Your Appliance <span className="text-blue-600">Service</span> in Your Area
                </h2>
                <p className="mt-2 max-w-2xl text-[11px] leading-relaxed text-slate-600 sm:text-sm">
                  Choose your product, select its brand, and search your city or area to reach the right service page.
                </p>

                <div className="mt-5 grid grid-cols-2 gap-2 sm:gap-3">
                  <label id="product-selector-field" className={`flex min-w-0 items-center gap-1.5 rounded-[5px] border px-2 py-2.5 shadow-sm transition-all duration-300 focus-within:border-blue-500 sm:gap-2 sm:px-3 ${productHighlight ? "product-selector-highlight border-red-500 bg-red-50 ring-4 ring-red-300/60" : "border-blue-200 bg-white"}`}>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[4px] bg-blue-50 text-2xl font-bold text-blue-700">{selectedProduct ? <ProductGlyph name={selectedProduct.name}/> : <ProductGlyph name="TV"/>}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[10px] font-semibold text-slate-500">1. Choose Your Appliance</span>
                      <select value={productSlug} onChange={(e) => { setProductSlug(e.target.value); setBrand(""); setUserChangedSelection(true); }} className="mt-0.5 w-full bg-transparent text-xs font-extrabold text-slate-900 outline-none sm:text-sm">
                        <option value="">Select appliance</option>
                        {applianceProducts.map((product) => <option key={product.slug} value={product.slug}>{product.name}</option>)}
                      </select>
                    </span>
                  </label>

                  <label className={`flex min-w-0 items-center gap-2 rounded-[5px] border px-3 py-2.5 shadow-sm ${selectedProduct ? "border-slate-200 bg-white" : "border-slate-100 bg-slate-50"}`}>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[4px] bg-blue-50 text-blue-700 sm:h-9 sm:w-9"><LineIcon type="brand" className="h-5 w-5"/></span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[10px] font-semibold text-slate-500">2. Choose Brand</span>
                      <select value={brand} disabled={!selectedProduct} onChange={(e) => { setBrand(e.target.value); setUserChangedSelection(true); }} className="mt-0.5 w-full bg-transparent text-xs font-extrabold text-slate-900 outline-none disabled:cursor-not-allowed disabled:text-slate-400 sm:text-sm">
                        <option value="">Select brand</option>
                        {selectedProduct?.brands.map((item) => <option key={item} value={item}>{item}</option>)}
                      </select>
                    </span>
                  </label>
                </div>

                <div ref={cityPickerRef} className="relative z-[200] mt-2.5">
                  <button
                    type="button"
                    onClick={() => setShowCityOptions((open) => !open)}
                    className="flex w-full items-center gap-3 rounded-[5px] border border-slate-200 bg-white px-3 py-2.5 text-left shadow-sm transition hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    aria-expanded={showCityOptions}
                    aria-haspopup="listbox"
                    onKeyDown={(e) => {
                      if (e.key === "Escape") setShowCityOptions(false);
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setShowCityOptions((open) => !open);
                      }
                    }}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[4px] bg-blue-50 text-blue-700"><LineIcon type="pin" className="h-6 w-6"/></span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[10px] font-semibold text-slate-500">3. Select State and City</span>
                      <span className={`mt-0.5 block truncate text-xs sm:text-sm ${selectedCity ? "font-bold text-slate-900" : "text-slate-400"}`}>
                        {selectedCity ? `${selectedCity.state}  ›  ${selectedCity.name}` : "Choose state, then select your city"}
                      </span>
                    </span>
                    <span className="text-sm font-bold text-blue-600">{showCityOptions ? "⌃" : "⌄"}</span>
                  </button>

                  {showCityOptions && (
                    <div className="absolute left-0 right-0 top-full z-[9999] mt-1 overflow-hidden rounded-[6px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.22)]">
                      <div className="border-b border-slate-100 p-2">
                        <div className="flex items-center gap-2 rounded-[4px] border border-slate-200 bg-slate-50 px-2.5">
                          <LineIcon type="search" className="h-4 w-4 shrink-0 text-blue-600"/>
                          <input
                            autoFocus
                            value={cityQuery}
                            onChange={(e) => setCityQuery(e.target.value)}
                            onKeyDown={(e) => { if (e.key === "Escape") setShowCityOptions(false); }}
                            placeholder="Search state or city..."
                            className="h-9 w-full bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-400"
                            aria-label="Search state or city"
                          />
                          {cityQuery && <button type="button" onClick={() => setCityQuery("")} className="text-[10px] font-bold text-blue-600">Clear</button>}
                        </div>
                      </div>
                      <div className="max-h-[min(62vh,520px)] overscroll-y-contain overflow-y-auto p-2 touch-pan-y" role="listbox" aria-label="Cities grouped by state">
                        {stateWiseCities.map((group) => {
                          const q = cityQuery.trim().toLowerCase();
                          const matches = group.cities.filter((city) =>
                            !q || city.name.toLowerCase().includes(q) || group.state.toLowerCase().includes(q)
                          );
                          if (!matches.length) return null;
                          const isExpanded = expandedState === group.state || Boolean(q && (group.state.toLowerCase().includes(q) || matches.some((city) => city.name.toLowerCase().includes(q))));
                          return (
                            <div key={group.state} className="mb-1 overflow-hidden rounded-[4px] border border-slate-100 last:mb-0">
                              <button
                                type="button"
                                onClick={() => setExpandedState((current) => current === group.state ? "" : group.state)}
                                aria-expanded={isExpanded}
                                className={`flex w-full items-center justify-between px-3 py-2.5 text-left text-[11px] font-extrabold transition ${isExpanded ? "bg-blue-50 text-blue-700" : "bg-white text-slate-700 hover:bg-slate-50"}`}
                              >
                                <span>{group.state}</span>
                                <span className="flex items-center gap-2 text-[10px] font-semibold text-slate-400"><span>{`${matches.length} cities`}</span><span>{isExpanded ? "−" : "+"}</span></span>
                              </button>
                              {isExpanded && (
                                <div className="grid grid-cols-2 gap-1 border-t border-slate-100 bg-slate-50/70 p-1.5 sm:grid-cols-3">
                                  {matches.map((city) => (
                                    <button
                                      key={city.slug}
                                      type="button"
                                      role="option"
                                      aria-selected={citySlugState === city.slug}
                                      onClick={() => {
                                        setCitySlug(city.slug);
                                        setCityQuery("");
                                        setExpandedState(group.state);
                                        setShowCityOptions(false);
                                      }}
                                      className={`flex min-h-9 items-center justify-between gap-1 rounded-[4px] px-2 py-2 text-left text-[11px] transition hover:bg-blue-100 ${citySlugState === city.slug ? "bg-blue-100 font-bold text-blue-700" : "bg-white text-slate-700"}`}
                                    >
                                      <span className="truncate">{city.name}</span>
                                      {citySlugState === city.slug && <span className="shrink-0 text-blue-600">✓</span>}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                        {!stateWiseCities.some((group) => group.cities.some((city) => {
                          const q = cityQuery.trim().toLowerCase();
                          return !q || city.name.toLowerCase().includes(q) || group.state.toLowerCase().includes(q);
                        })) && <p className="px-3 py-4 text-center text-xs text-slate-500">No matching state or city found.</p>}
                      </div>
                      {selectedCity && (
                        <div className="border-t border-slate-100 p-2">
                          <button type="button" onClick={() => { setCitySlug(""); setCityQuery(""); }} className="w-full rounded-[4px] px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50">Remove selected city</button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <div className={`inline-flex min-h-10 items-center gap-2 rounded-[5px] px-6 text-xs font-extrabold text-white shadow-md transition ${allSelected ? "bg-gradient-to-r from-blue-600 to-indigo-600" : "bg-blue-400"}`}>
                    <LineIcon type="search" className="h-4 w-4"/>{` ${allSelected ? "Preparing Your Service Page..." : "Select all details to continue"} `}<span>→</span>
                  </div>
                  <span className="text-[10px] text-slate-500">You will be redirected automatically after selecting your city.</span>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] font-bold text-slate-700 sm:text-xs">
                  <span className="flex items-center gap-1.5"><span className="text-blue-600">✓</span> Doorstep Service</span>
                  <span className="flex items-center gap-1.5"><span className="text-blue-600">✓</span> Multi-Brand Support</span>
                  <span className="flex items-center gap-1.5"><span className="text-blue-600">✓</span> Transparent Estimates</span>
                </div>
              </div>

              <div className="relative hidden min-h-[430px] items-center justify-center overflow-visible lg:flex">
                <div className="absolute right-[-8%] top-[4%] h-[92%] w-[96%] rounded-full bg-gradient-to-br from-blue-100 to-blue-400/70"/>
                <img src="/images/service-finder-technician-fresh.webp" alt="Service Support Hub technician with home appliances" className="relative z-10 h-[400px] w-full scale-[1.02] object-contain object-center" width="694" height="580" loading="lazy"/>
              </div>
              <div className="relative mx-0 mt-3 h-[clamp(220px,62vw,280px)] w-full max-w-full overflow-hidden sm:h-[300px] lg:hidden">
                <img src="/images/service-finder-technician-fresh.webp" alt="Service Support Hub technician with home appliances" className="absolute inset-0 h-full w-full object-contain object-center" width="694" height="580" loading="lazy"/>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isTransferring && portalReady && createPortal(
        <div className="fixed inset-0 z-[2147483000] flex min-h-[100dvh] w-screen items-center justify-center overflow-y-auto bg-[#eaf3ff]/90 p-3 backdrop-blur-md sm:p-6" role="status" aria-live="polite">
          <div className="my-auto box-border w-full min-w-0 max-w-xl overflow-hidden rounded-[8px] border border-white bg-gradient-to-br from-white via-blue-50 to-blue-100 p-4 text-center shadow-[0_25px_80px_rgba(37,99,235,0.24)] sm:p-8">
            <div className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border-[6px] border-blue-100">
              <span className="absolute inset-[-6px] animate-spin rounded-full border-[6px] border-transparent border-t-blue-600"/>
              <LineIcon type="pin" className="h-8 w-8 text-blue-700"/>
            </div>
            <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-blue-600">Service Support Hub</p>
            <h3 className="mt-2 text-xl font-black leading-snug text-slate-950 sm:text-2xl">
              Finding <span className="text-blue-600">{selectedProduct?.name}</span> Service for <span className="text-blue-600">{brand}</span> in <span className="text-blue-600">{selectedCity?.name}</span>...
            </h3>
            <p className="mt-2 text-xs text-slate-600 sm:text-sm">Please wait, we are preparing your service page.</p>
            <div className="mx-auto mt-6 h-2 max-w-sm overflow-hidden rounded-full bg-blue-100">
              <div className="h-full w-full origin-left animate-[finderProgress_1.5s_ease-in-out_forwards] rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"/>
            </div>
            <p className="mt-3 text-[10px] font-semibold text-slate-500">Taking you to your selected service</p>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
