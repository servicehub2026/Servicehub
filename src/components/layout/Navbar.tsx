"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { usePathname, useRouter } from "next/navigation";
import { Icons } from "@/components/ui/Icons";
import { applianceProducts, allCities, findCityBySlug, stateWiseCities } from "@/data/locations";
import { getCityServiceLandingPath } from "@/lib/cityServiceUrls";

interface NavbarProps {
  onOpenBooking?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [navbarVisible, setNavbarVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      if (currentY < 40) {
        setNavbarVisible(true);
      } else if (delta > 5) {
        setNavbarVisible(false);
      } else if (delta < -5) {
        setNavbarVisible(true);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const citySlug = pathname?.startsWith("/cities/") ? pathname.split("/")[2] : "";
  const currentCity = findCityBySlug(citySlug);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [productsBarOpen, setProductsBarOpen] = useState(true);
  const [loadingCityName, setLoadingCityName] = useState<string | null>(null);
  const cityLoadingTimer = useRef<number | null>(null);
  const [activeProduct, setActiveProduct] = useState<string | null>(null);
  const [productPinned, setProductPinned] = useState(false);
  const [cityPickerOpen, setCityPickerOpen] = useState(false);
  const [citySearch, setCitySearch] = useState("");
  const [activeState, setActiveState] = useState("All Cities");
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileActiveProduct, setMobileActiveProduct] = useState<string | null>(null);

  const cityLabel = currentCity?.name || "Select City";
  const closeMenus = () => {
    setOpenMenu(null);
    setMobileMenuOpen(false);
    setActiveProduct(null);
    setProductPinned(false);
  };
  const closeCityPicker = () => {
    setCityPickerOpen(false);
    setCitySearch("");
    setActiveState("All Cities");
  };
  const cityHref = (slug: string) => `/cities/${slug}`;
  const productHref = (productSlug: string, brand?: string) => {
    if (!currentCity) return `/services/${productSlug}`;
    return getCityServiceLandingPath(currentCity.slug, productSlug, brand);
  };

  const filteredCities = useMemo(() => {
    const query = citySearch.trim().toLowerCase();
    return allCities.filter((city) => {
      const matchesSearch = !query || city.name.toLowerCase().includes(query) || city.state.toLowerCase().includes(query);
      const matchesState = activeState === "All Cities" || city.state === activeState;
      return matchesSearch && matchesState;
    });
  }, [citySearch, activeState]);

  const openCityPicker = () => {
    setCityPickerOpen(true);
    setMobileMenuOpen(false);
    setOpenMenu(null);
  };

  useEffect(() => {
    return () => {
      if (cityLoadingTimer.current !== null) {
        window.clearTimeout(cityLoadingTimer.current);
      }
    };
  }, []);

  const handleCitySelect = (city: { name: string; slug: string }, event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    closeCityPicker();
    setLoadingCityName(city.name);
    if (cityLoadingTimer.current !== null) window.clearTimeout(cityLoadingTimer.current);
    cityLoadingTimer.current = window.setTimeout(() => {
      router.push(cityHref(city.slug));
      cityLoadingTimer.current = null;
    }, 500);
  };

  return (
    <header className={`ssh-header sticky top-0 z-[100] w-full bg-white shadow-sm transition-transform duration-300 ease-out ${navbarVisible ? "translate-y-0" : "-translate-y-full"}`}>
      <div className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-3 px-3 py-2.5 sm:px-4 sm:py-3">
          <Link href="/" onClick={closeMenus} className="flex min-w-0 items-center gap-2 sm:gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-md shadow-blue-200 sm:h-11 sm:w-11">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 13v-2a9 9 0 0 1 18 0v2" /><rect x="2.5" y="12" width="4" height="7" rx="2" /><rect x="17.5" y="12" width="4" height="7" rx="2" /><path d="M19.5 19c-.8 1.5-2.5 2.5-5 2.5H12" /><path d="M10 21.5h2" /></svg>
            </span>
            <span className="min-w-0">
              <span className="block whitespace-nowrap text-[16px] font-black leading-tight tracking-tight text-slate-900 sm:text-[22px]">
                Service <span className="text-blue-600">Support</span> Hub
              </span>
              <span className="block text-[8px] font-semibold uppercase tracking-[.12em] text-slate-500 sm:text-[10px]">Home Appliance Care</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-5 lg:flex">
            <Link href="/" className="text-[13px] font-semibold text-slate-700 transition hover:text-blue-600">Home</Link>
            <button onClick={openCityPicker} aria-haspopup="dialog" className={`flex items-center gap-1 rounded-lg px-2 py-2 text-[13px] font-semibold transition hover:bg-blue-50 hover:text-blue-700 ${currentCity ? "text-blue-700" : "text-slate-700"}`}>
              <Icons.MapPin size={15} />{` ${currentCity ? cityLabel : "Cities"} `}<Icons.ChevronDown size={14} />
            </button>
            <button type="button" aria-expanded={productsBarOpen} onClick={() => { setProductsBarOpen((open) => !open); setActiveProduct(null); setProductPinned(false); setOpenMenu(null); }} className={`inline-flex items-center gap-1 text-[13px] font-semibold transition hover:text-blue-600 ${productsBarOpen ? "text-blue-700" : "text-slate-700"}`}>
              Support Product <Icons.ChevronDown size={13} />
            </button>
            <Link href="/about-us" className="text-[13px] font-semibold text-slate-700 transition hover:text-blue-600">About Us</Link>
            <Link href="/contact-us" className="text-[13px] font-semibold text-slate-700 transition hover:text-blue-600">Contact Us</Link>
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
<button onClick={onOpenBooking} className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-200 transition hover:from-blue-700 hover:to-indigo-700"><Icons.Calendar size={15} /> Book Doorstep Visit</button>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 lg:hidden">
            <button
              type="button"
              onClick={openCityPicker}
              aria-label={currentCity ? `Change city, currently ${cityLabel}` : "Choose your city"}
              className="inline-flex max-w-[112px] items-center gap-1.5 rounded-lg border border-blue-100 bg-blue-50 px-2 py-2.5 text-blue-700 transition hover:border-blue-300 hover:bg-blue-100 sm:max-w-[140px]"
            >
              <Icons.MapPin size={16} className="shrink-0" />
              <span className="truncate text-[11px] font-extrabold sm:text-xs">{currentCity ? cityLabel : "Choose City"}</span>
              <Icons.ChevronDown size={12} className="shrink-0" />
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu" aria-expanded={mobileMenuOpen} className="rounded-lg bg-slate-100 p-2.5 text-slate-800">
              {mobileMenuOpen ? <Icons.Close size={21} /> : <Icons.Menu size={21} />}
            </button>
          </div>
        </div>
      </div>

      {/* Product strip is visible by default on desktop and toggled with Support Product. */}
      {productsBarOpen && (
        <div
          className="relative hidden border-b border-slate-700 bg-[#102d3c] text-white lg:block"
          onMouseLeave={() => {
            if (!productPinned) setActiveProduct(null);
          }}
        >
          <div className="mx-auto flex max-w-[1280px] items-center gap-1 overflow-x-auto px-3 py-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <span className="mr-3 inline-flex shrink-0 items-center gap-1.5 rounded-md bg-rose-500/15 px-2.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[.12em] text-rose-300">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
              {currentCity ? `${currentCity.name} Services` : "Support Products"}
            </span>
            {applianceProducts.map((product) => {
              const isActive = activeProduct === product.slug;
              return (
                <button key={product.slug} type="button" aria-expanded={isActive}
                  onMouseEnter={() => {
                    setActiveProduct(product.slug);
                    setProductPinned(false);
                  }}
                  onFocus={() => {
                    setActiveProduct(product.slug);
                    setProductPinned(false);
                  }}
                  onClick={() => {
                    if (isActive && productPinned) {
                      setActiveProduct(null);
                      setProductPinned(false);
                    } else {
                      setActiveProduct(product.slug);
                      setProductPinned(true);
                    }
                  }}
                  className={`flex shrink-0 items-center gap-1 whitespace-nowrap px-3 py-3 text-[13px] transition hover:bg-[#1b4355] ${isActive ? "bg-[#1b4355] text-white" : "text-slate-200"}`}>
                  {`${product.name} `}<Icons.ChevronDown size={12} />
                </button>
              );
            })}
          </div>
          {activeProduct && (() => {
            const product = applianceProducts.find((item) => item.slug === activeProduct);
            if (!product) return null;
            const cityName = currentCity?.name;
            const menuItems = [
              { brand: "", label: cityName ? `${product.name} Repair Services In ${cityName}` : `${product.name} Repair Services` },
              ...product.brands.map((brand) => ({
                brand,
                label: cityName
                  ? `${brand} ${product.name} Service Center In ${cityName}`
                  : `${brand} ${product.name} Service Center`,
              })),
            ];
            return (
              <div className="ssh-product-mega absolute left-1/2 top-full z-[135] w-[min(1140px,96vw)] -translate-x-1/2 rounded-b-lg border border-slate-200 bg-white p-4 text-slate-800 shadow-2xl sm:p-5">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 sm:text-base">{`${product.name} Repair Services In ${cityName}`}</h3>
                    <p className="mt-0.5 text-xs text-slate-500">{currentCity ? `Choose a brand to view ${currentCity.name} service information.` : "Choose a brand to explore service information across India."}</p>
                  </div>
                  <Link href={productHref(product.slug)} onClick={() => { closeMenus(); setProductsBarOpen(false); }} className="rounded-md bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700 hover:bg-blue-100">{`View All ${product.name} Services →`}</Link>
                </div>
                <div className="grid max-h-[62vh] grid-cols-1 gap-x-6 overflow-y-auto sm:grid-cols-2 lg:grid-cols-4">
                  {menuItems.map((item, index) => (
                    <Link key={`${item.brand || "all"}-${index}`} href={productHref(product.slug, item.brand || undefined)}
                      onClick={() => { closeMenus(); setActiveProduct(null); setProductPinned(false); setProductsBarOpen(false); }}
                      className="border-b border-dashed border-slate-300 px-1 py-2 text-[13px] leading-[1.35] text-slate-700 transition hover:bg-blue-50 hover:text-blue-700">{item.label}</Link>
                  ))}
                </div>
                {!currentCity && <p className="mt-3 rounded-md bg-blue-50 px-3 py-2 text-xs text-blue-800">Explore brand-wise appliance service information across India. Select a city whenever you need location-specific services.</p>}
              </div>
            );
          })()}
        </div>
      )}

      {/* Mobile navigation: compact accordion layout, no cramped horizontal product bar. */}
{mobileMenuOpen && typeof document !== "undefined" && createPortal((
        <div className="fixed inset-x-0 top-[66px] bottom-0 z-[140] overflow-y-auto overscroll-contain border-b border-slate-200 bg-white px-4 pb-5 pt-4 shadow-xl lg:hidden">
          <div className="grid gap-1">
            <Link href="/" onClick={closeMenus} className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50">Home</Link>
            <button onClick={openCityPicker} className="flex w-full items-center justify-between rounded-xl bg-blue-50 px-3 py-3 text-left text-sm font-semibold text-blue-800">
              <span className="flex items-center gap-2"><Icons.MapPin size={17} />{` ${currentCity ? cityLabel : "Choose Your City"}`}</span><Icons.ChevronDown size={16} />
            </button>
            <button onClick={() => setMobileProductsOpen((open) => !open)} aria-expanded={mobileProductsOpen} className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-semibold text-slate-800 hover:bg-slate-50">
              <span>Support Product</span><Icons.ChevronDown size={16} />
            </button>
            {mobileProductsOpen && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-2">
                {applianceProducts.map((product) => {
                  const expanded = mobileActiveProduct === product.slug;
                  const mobileCityName = currentCity?.name;
                  return (
                    <div key={product.slug} className="mb-1 overflow-hidden rounded-lg border border-slate-200 bg-white last:mb-0">
                      <button
                        type="button"
                        aria-expanded={expanded}
                        onClick={() => setMobileActiveProduct(expanded ? null : product.slug)}
                        className={`flex w-full items-center justify-between px-3 py-3 text-left text-sm font-bold transition ${expanded ? "bg-blue-50 text-blue-700" : "text-slate-800 hover:bg-slate-50"}`}
                      >
                        <span>{product.name}</span>
                        <Icons.ChevronDown size={16} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
                      </button>
                      {expanded && (
                        <div className="border-t border-slate-100 bg-white px-3 py-2">
                          <Link
                            href={productHref(product.slug)}
                            onClick={closeMenus}
                            className="mb-1 block rounded-md bg-blue-50 px-2.5 py-2 text-xs font-extrabold text-blue-700"
                          >
                            {currentCity ? `All ${product.name} Repair Services in ${mobileCityName}` : `All ${product.name} Repair Services`}
                          </Link>
                          <div className="grid grid-cols-1 gap-1">
                            {product.brands.map((brand) => (
                              <Link
                                key={`${product.slug}-${brand}`}
                                href={productHref(product.slug, brand)}
                                onClick={closeMenus}
                                className="flex items-center justify-between gap-2 border-b border-dashed border-slate-200 px-2.5 py-2 text-xs font-medium text-slate-700 last:border-0 hover:bg-blue-50 hover:text-blue-700"
                              >
                                <span>{`${brand} ${product.name} Service Center${currentCity ? ` in ${mobileCityName}` : ""}`}</span>
                                <span className="shrink-0 text-blue-500">›</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            <Link href="/about-us" onClick={closeMenus} className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50">About Us</Link>
            <Link href="/contact-us" onClick={closeMenus} className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50">Contact Us</Link>
            <div className="sticky bottom-0 mt-2 grid grid-cols-2 gap-2 border-t border-slate-100 bg-white pb-2 pt-3">
              <button onClick={() => { closeMenus(); onOpenBooking?.(); }} className="col-span-2 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-3 text-xs font-bold text-white"><Icons.Calendar size={15} /> Book Visit</button>
            </div>
          </div>
        </div>
      ), document.body)}

      {/* Advanced city picker: same searchable dialog on desktop and mobile. */}
{cityPickerOpen && typeof document !== "undefined" && createPortal((
        <div className="fixed inset-0 z-[300] flex items-end justify-center bg-slate-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-5" role="dialog" aria-modal="true" aria-labelledby="city-picker-title" onMouseDown={(event) => { if (event.target === event.currentTarget) closeCityPicker(); }}>
          <div className="flex max-h-[92vh] w-full max-w-7xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:max-h-[88vh] sm:rounded-2xl">
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-white px-5 py-4 sm:px-7 sm:py-5">
              <div>
                <p className="mb-1 text-[10px] font-extrabold uppercase tracking-[.18em] text-blue-600">Service Support Hub</p>
                <h2 id="city-picker-title" className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">Choose your city</h2>
                <p className="mt-1 text-xs text-slate-500 sm:text-sm">Search your city or browse state-wise service locations.</p>
              </div>
              <button onClick={closeCityPicker} aria-label="Close city selector" className="rounded-full bg-white p-2 text-slate-600 shadow-sm ring-1 ring-slate-200 hover:bg-slate-100"><Icons.Close size={19} /></button>
            </div>

            <div className="border-b border-slate-100 px-4 py-4 sm:px-7">
              <div className="relative">
                <svg className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-blue-600" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
                <input autoFocus value={citySearch} onChange={(event) => setCitySearch(event.target.value)} placeholder="Search city, state or location..." className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 sm:h-14 sm:text-base" />
                {citySearch && <button onClick={() => setCitySearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-bold text-blue-600 hover:bg-blue-50">Clear</button>}
              </div>
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {["All Cities", ...stateWiseCities.map((group) => group.state)].map((state) => (
                  <button key={state} onClick={() => setActiveState(state)} className={`shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-bold transition sm:text-xs ${activeState === state ? "border-blue-600 bg-blue-600 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-700"}`}>{state}</button>
                ))}
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-7 sm:py-5">
              {citySearch.trim() ? (
                <div>
                  <div className="mb-3 flex items-center justify-between"><h3 className="text-sm font-extrabold text-slate-800">Search results</h3><span className="text-xs text-slate-500">{`${filteredCities.length} locations`}</span></div>
                  {filteredCities.length ? (
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {filteredCities.map((city) => (
                        <Link key={city.slug} href={cityHref(city.slug)} onClick={(event) => handleCitySelect(city, event)} className="group flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-3 transition hover:border-blue-300 hover:bg-blue-50/60">
                          <div className="min-w-0"><p className="whitespace-normal break-words text-sm font-bold text-slate-900 group-hover:text-blue-700">{city.name}</p><p className="text-[11px] text-slate-500">{city.state}</p></div>
                          <span className="shrink-0 text-xs font-extrabold text-blue-600">→</span>
                        </Link>
                      ))}
                    </div>
                  ) : <p className="rounded-xl bg-slate-50 p-6 text-center text-sm text-slate-500">No city found. Try another city or state name.</p>}
                </div>
              ) : (
                <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {stateWiseCities.filter((group) => activeState === "All Cities" || group.state === activeState).map((group) => (
                    <section key={group.state} className={`overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-blue-200 hover:shadow-md ${activeState === group.state ? "sm:col-span-2 lg:col-span-4" : ""}`}>
                      <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-slate-50 px-3 py-2.5"><h3 className="text-xs font-extrabold uppercase tracking-wide text-slate-800">{group.state}</h3><span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">{`${group.cities.length} ${group.cities.length === 1 ? "city" : "cities"}`}</span></div>
                      <div className="grid grid-cols-2 gap-x-2 px-2 py-2">
                        {group.cities.map((city) => (
                          <Link
                            key={city.slug}
                            href={cityHref(city.slug)}
                            onClick={(event) => handleCitySelect(city, event)}
                            className="group flex min-w-0 items-start gap-1.5 rounded-md border-b border-dashed border-slate-200 px-2 py-2 text-[12px] font-medium leading-5 text-slate-700 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 sm:text-[13px]"
                          >
                            <Icons.MapPin size={13} className="shrink-0 text-slate-400 group-hover:text-blue-600" />
                            <span className="truncate">{city.name}</span>
                          </Link>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-slate-100 bg-slate-50 px-4 py-3 sm:px-7">
              <p className="text-[11px] text-slate-500">Can’t find your city? Contact our support team.</p>
              <Link href="/cities" onClick={closeCityPicker} className="shrink-0 text-xs font-extrabold text-blue-700 hover:underline">View all locations →</Link>
            </div>
          </div>
        </div>
      ), document.body)}

      {loadingCityName && typeof document !== "undefined" && createPortal(
        <div className="fixed inset-0 z-[500] flex items-center justify-center bg-slate-950/75 px-5 backdrop-blur-sm" role="status" aria-live="polite" aria-label={`Opening ${loadingCityName}`}>
          <div className="flex min-w-[220px] flex-col items-center rounded-2xl border border-white/15 bg-slate-900/95 px-9 py-8 text-center text-white shadow-2xl">
            <div className="ssh-city-loader mb-5" aria-hidden="true">
              <span className="ssh-city-loader-triangle" />
              <span className="ssh-city-loader-dot" />
            </div>
            <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-blue-300">Loading City</p>
            <h2 className="mt-1 text-2xl font-black tracking-tight">{loadingCityName}</h2>
            <p className="mt-1 text-xs text-slate-300">Preparing local service information…</p>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
};
