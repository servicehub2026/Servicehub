"use client";

import React, { useState } from "react";
import Link from "next/link";
import { applianceProducts } from "@/data/locations";
import { getCityServiceLandingPath } from "@/lib/cityServiceUrls";

interface ServicesGridProps {
  onOpenBooking: () => void;
  cityName?: string;
  citySlug?: string;
}

// On a city page, every service link must point to that city's own service page
// (e.g. /cities/meerut/ac-repair-service-center). On the home page there is no
// city, so the generic /services/<product> page is used.
const serviceHref = (productSlug: string, citySlug?: string) =>
  citySlug ? getCityServiceLandingPath(citySlug, productSlug) : `/services/${productSlug}`;

type GlyphName =
  | "ac" | "fridge" | "washer" | "microwave" | "tv"
  | "geyser" | "ro" | "chimney" | "hob" | "dishwasher"
  | "cooling" | "kitchen" | "laundry" | "entertainment" | "water" | "maintenance";

const ServiceGlyph: React.FC<{ name: GlyphName; size?: number; className?: string }> = ({
  name,
  size = 38,
  className = "",
}) => {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  const drawings: Record<GlyphName, React.ReactNode> = {
    ac: <><rect x="3" y="5" width="18" height="8" rx="2" /><path d="M5 9h14M7 16l-1 2m6-2v3m6-3 1 2" /><path d="M7 7h.01M10 7h.01" /></>,
    fridge: <><rect x="6" y="2.5" width="12" height="19" rx="2" /><path d="M6 11h12M9 6v2m0 6v3" /></>,
    washer: <><rect x="3" y="2.5" width="18" height="19" rx="2" /><path d="M3 7h18M7 4.8h.01M10 4.8h.01" /><circle cx="12" cy="14" r="5" /><path d="M9 13c1.2-1.2 2.8-1.2 4 0" /></>,
    microwave: <><rect x="2.5" y="5" width="19" height="14" rx="2" /><rect x="5" y="7.5" width="10" height="9" rx="1" /><path d="M18 8h1m-1 3h1m-1 3h1" /><circle cx="10" cy="12" r="2.2" /></>,
    tv: <><rect x="2.5" y="4" width="19" height="13" rx="1.5" /><path d="M9 21h6m-3-4v4" /><path d="m10 8 5 2.5-5 2.5z" /></>,
    geyser: <><rect x="6" y="2.5" width="12" height="16" rx="4" /><path d="M9 6h6m-3 12v2m-2 2h4" /><path d="M12 9c-2 2-2 3.5 0 4.5 2-1 2-2.5 0-4.5z" /></>,
    ro: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 7h8m-8 3h8" /><path d="M12 12c-3 3-3 5 0 6.5 3-1.5 3-3.5 0-6.5z" /></>,
    chimney: <><path d="M9 3h6v5l7 7H2l7-7z" /><path d="M5 18v2m7-2v2m7-2v2M9 3h6" /></>,
    hob: <><rect x="2.5" y="5" width="19" height="14" rx="2" /><circle cx="8" cy="10" r="2.2" /><circle cx="16" cy="10" r="2.2" /><circle cx="8" cy="15" r="1.2" /><circle cx="16" cy="15" r="1.2" /></>,
    dishwasher: <><rect x="4" y="2.5" width="16" height="19" rx="2" /><path d="M4 7h16M7 4.8h.01M10 4.8h.01" /><path d="M7 11h10v7H7zM9 13h6m-6 2h6" /></>,
    cooling: <><path d="M12 2v20M4 6l16 12M4 18 20 6M8 3l4 3 4-3M8 21l4-3 4 3M2 9l4 3-4 3m20-6-4 3 4 3" /></>,
    kitchen: <><path d="M9 3h6v5l7 7H2l7-7zM5 18v3m7-3v3m7-3v3" /></>,
    laundry: <><rect x="3" y="2.5" width="18" height="19" rx="2" /><path d="M3 7h18" /><circle cx="12" cy="14" r="5" /></>,
    entertainment: <><rect x="2.5" y="4" width="19" height="13" rx="1.5" /><path d="M9 21h6m-3-4v4m-2-13 6 3-6 3z" /></>,
    water: <><path d="M12 2.5S5 10 5 14a7 7 0 0 0 14 0c0-4-7-11.5-7-11.5z" /></>,
    maintenance: <><path d="M14 6a5 5 0 0 0-6.5 6.5L3 17l4 4 4.5-4.5A5 5 0 0 0 18 10l-3 3-4-4z" /><path d="m14 6 4-4 4 4-4 4" /></>,
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      {...common}
    >
      {drawings[name]}
    </svg>
  );
};

const popularServices: { name: string; slug: string; icon: GlyphName }[] = [
  { name: "AC Service", slug: "ac-repair", icon: "ac" },
  { name: "Refrigerator Service", slug: "refrigerator-repair", icon: "fridge" },
  { name: "Washing Machine Service", slug: "washing-machine-repair", icon: "washer" },
  { name: "Microwave Service", slug: "microwave-repair", icon: "microwave" },
  { name: "TV Service", slug: "tv-repair", icon: "tv" },
  { name: "Geyser Service", slug: "geyser-repair", icon: "geyser" },
  { name: "RO Purifier Service", slug: "water-purifier-repair", icon: "ro" },
  { name: "Chimney Service", slug: "chimney-repair", icon: "chimney" },
  { name: "Gas Hob / Stove", slug: "gas-stove-repair", icon: "hob" },
  { name: "Dishwasher Service", slug: "dishwasher-repair", icon: "dishwasher" },
];

const categories: {
  id: string;
  title: string;
  subtitle: string;
  icon: GlyphName;
  products: string[];
}[] = [
  {
    id: "cooling",
    title: "Cooling Appliances",
    subtitle: "AC and refrigerator service, repair and maintenance",
    icon: "cooling",
    products: ["AC", "Refrigerator"],
  },
  {
    id: "kitchen",
    title: "Kitchen Appliances",
    subtitle: "Chimney, microwave, hob and dishwasher support",
    icon: "kitchen",
    products: ["Kitchen Chimney", "Microwave", "Gas Hob / Stove", "Dishwasher"],
  },
  {
    id: "laundry",
    title: "Laundry Appliances",
    subtitle: "Washing machine service, repair and installation",
    icon: "laundry",
    products: ["Washing Machine"],
  },
  {
    id: "entertainment",
    title: "Entertainment Appliances",
    subtitle: "LED, LCD and Smart TV repair support",
    icon: "entertainment",
    products: ["TV"],
  },
  {
    id: "water",
    title: "Water Solutions",
    subtitle: "Geyser and water purifier service",
    icon: "water",
    products: ["Geyser", "Water Purifier"],
  },
  {
    id: "maintenance",
    title: "General Maintenance",
    subtitle: "Installation support, repair support and AMC service",
    icon: "maintenance",
    products: ["Installation Support", "Repair Support", "Annual Maintenance"],
  },
];

const productIcon = (name: string): GlyphName => {
  const normalized = name.toLowerCase();
  if (normalized.includes("air") || normalized === "ac") return "ac";
  if (normalized.includes("refrigerator")) return "fridge";
  if (normalized.includes("washing")) return "washer";
  if (normalized.includes("microwave")) return "microwave";
  if (normalized === "tv") return "tv";
  if (normalized.includes("geyser")) return "geyser";
  if (normalized.includes("water")) return "ro";
  if (normalized.includes("chimney")) return "chimney";
  if (normalized.includes("hob") || normalized.includes("stove")) return "hob";
  if (normalized.includes("dishwasher")) return "dishwasher";
  return "maintenance";
};

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onOpenBooking, cityName, citySlug }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const findProduct = (name: string) =>
    applianceProducts.find((product) => product.name.toLowerCase() === name.toLowerCase());

  return (
    <section id="services" className="bg-white py-9 sm:py-12 lg:py-14">
      <div className="mx-auto w-full max-w-none px-[1%]">
        {/* Popular appliance services */}
        <div className="relative z-[1] mt-5 sm:mt-7 lg:mt-8">
          <div className="mb-4 flex items-center justify-center gap-3 sm:mb-5">
            <span className="h-[2px] w-8 bg-blue-500" />
            <h3 className="text-lg font-black tracking-tight text-slate-900 sm:text-2xl">{cityName ? `Popular Services in ${cityName}` : "Popular Services"}</h3>
            <span className="h-[2px] w-8 bg-blue-500" />
          </div>

          <div className="service-card-grid grid grid-cols-3 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5 lg:gap-3">
            {popularServices.map((service) => (
              <Link
                key={service.slug}
                href={serviceHref(service.slug, citySlug)}
                className={`service-popular-card group flex min-h-[104px] animate-[serviceCardRise_.55s_ease-out_both] flex-col items-center justify-center rounded-[2px] ${service.slug === "dishwasher-repair" ? "col-span-3 flex-row gap-3 sm:col-span-1 sm:flex-col sm:gap-0" : ""} border border-blue-100 bg-gradient-to-b from-white to-blue-50/60 px-1.5 py-3 text-center shadow-[0_2px_8px_rgba(15,55,110,0.04)] transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:min-h-[128px] sm:rounded-[2px] sm:px-2.5`}
              >
                <span className={`service-popular-icon mb-2 flex h-11 w-11 items-center justify-center rounded-[2px] bg-blue-50 text-[#092b66] transition duration-300 sm:h-14 sm:w-14 ${service.slug === "dishwasher-repair" ? "mb-0 sm:mb-2" : ""}`}>
                  <ServiceGlyph name={service.icon} size={30} className="sm:hidden" />
                  <ServiceGlyph name={service.icon} size={38} className="hidden sm:block" />
                </span>
                <span className="service-popular-label text-[10px] font-extrabold leading-tight text-slate-900 transition-colors duration-300 sm:text-xs lg:text-[13px]">
                  {service.name}
                </span>
                <span className="service-popular-explore mt-1 hidden items-center gap-1 text-[10px] font-bold text-blue-600 transition-colors duration-300 sm:inline-flex">
                  Explore <span aria-hidden="true">›</span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Browse by category: cards expand into real appliance links */}
        <div className="mt-7 sm:mt-9 lg:mt-10">
          <div className="mb-4 flex items-center justify-center gap-3 sm:mb-5">
            <span className="h-[2px] w-8 bg-blue-500" />
            <h3 className="text-lg font-black tracking-tight text-slate-900 sm:text-2xl">{cityName ? `Browse Services in ${cityName}` : "Browse by Category"}</h3>
            <span className="h-[2px] w-8 bg-blue-500" />
          </div>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 lg:gap-4">
            {categories.map((category) => {
              const isExpanded = expandedCategory === category.id;
              return (
                <div
                  key={category.id}
                  className="service-category-card animate-[serviceCardRise_.6s_ease-out_both] overflow-hidden rounded-[2px] border border-blue-100 bg-white shadow-[0_2px_8px_rgba(15,55,110,0.04)] transition hover:border-blue-200 hover:shadow-md"
                >
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                    className="flex w-full items-center gap-3 p-3.5 text-left sm:min-h-[96px] sm:p-4"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[2px] bg-blue-50 text-blue-700 sm:h-14 sm:w-14">
                      <ServiceGlyph name={category.icon} size={31} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs font-extrabold text-slate-900 sm:text-sm">{category.title}</span>
                      <span className="mt-1 block text-[10px] leading-4 text-slate-500 sm:text-xs">{category.subtitle}</span>
                    </span>
                    <span className={`text-blue-700 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} aria-hidden="true">⌄</span>
                  </button>

                  {/* Always rendered in the HTML (links are crawlable); only hidden visually until expanded. */}
                  {(
                    <div hidden={!isExpanded} className="border-t border-blue-50 bg-blue-50/40 px-3.5 py-3 sm:px-4">
                      <div className="flex flex-wrap gap-2">
                        {category.products.map((name) => {
                          const product = findProduct(name);
                          return product ? (
                            <Link
                              key={name}
                              href={serviceHref(product.slug, citySlug)}
                              className="inline-flex items-center gap-1.5 rounded-[2px] border border-blue-100 bg-white px-2.5 py-2 text-[11px] font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
                            >
                              <ServiceGlyph name={productIcon(name)} size={15} />
                              {name}
                              <span className="text-blue-600">→</span>
                            </Link>
                          ) : (
                            <button
                              key={name}
                              type="button"
                              onClick={onOpenBooking}
                              className="rounded-[2px] border border-blue-100 bg-white px-2.5 py-2 text-[11px] font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
                            >
                              {`${name} `}<span className="text-blue-600">→</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
