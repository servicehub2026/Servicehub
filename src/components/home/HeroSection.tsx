"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icons } from "@/components/ui/Icons";

interface HeroSectionProps {
  onOpenBooking: () => void;
  cityName?: string;
  seoProductName?: string;
  seoBrandName?: string;
}

const heroSlides = [
  {
    id: "reception",
    image: "/images/hero/hero-reception.webp",
    alt: "Modern empty customer service reception at Service Support Hub",
    eyebrow: "WELCOME TO SERVICE SUPPORT HUB",
    title: "Your Trusted Home Appliance",
    highlight: "Service Center",
    description:
      "Repair, maintenance and installation support for the appliances that keep your home running.",
    features: [
      { label: "60–90 Mins", detail: "Average Doorstep Arrival", Icon: Icons.Clock },
      { label: "15,000+", detail: "Kitchen Appliances Serviced", Icon: Icons.Wrench },
      { label: "30-Day", detail: "Comprehensive Warranty", Icon: Icons.ShieldCheck },
    ],
  },
  {
    id: "team",
    image: "/images/hero/hero-support-team.webp",
    alt: "Customer support team working together at computers in a modern office",
    eyebrow: "A TEAM THAT IS HERE TO HELP",
    title: "Dedicated Support.",
    highlight: "Reliable Assistance.",
    description:
      "Our customer support team helps you find the right appliance service and arrange a convenient doorstep visit.",
    features: [
      { label: "Customer Support", detail: "Friendly Assistance", Icon: Icons.UserCheck },
      { label: "Repair and Maintenance", detail: "Appliance Care", Icon: Icons.Wrench },
      { label: "Doorstep Assistance", detail: "Convenient Service", Icon: Icons.Clock },
    ],
  },
  {
    id: "agent",
    image: "/images/hero/hero-support-agent.webp",
    alt: "Customer care professional wearing a headset and assisting customers at a computer",
    eyebrow: "CUSTOMER-FIRST SERVICE",
    title: "Personal Support for",
    highlight: "Every Service Need.",
    description:
      "Get help with appliance repair, installation and maintenance through a simple, customer-friendly booking process.",
    features: [
      { label: "4.9★ / 5", detail: "Customer Rating", Icon: Icons.Star },
      { label: "Multi-Brand", detail: "Appliance Support", Icon: Icons.BadgeCheck },
      { label: "Easy Booking", detail: "Simple Service Requests", Icon: Icons.Calendar },
    ],
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking, cityName, seoProductName, seoBrandName }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(
      () => setActiveSlide((current) => (current + 1) % heroSlides.length),
      6500
    );
    return () => window.clearInterval(timer);
  }, [isPaused]);

  const showPrevious = () =>
    setActiveSlide((current) => (current - 1 + heroSlides.length) % heroSlides.length);
  const showNext = () =>
    setActiveSlide((current) => (current + 1) % heroSlides.length);

  const slide = heroSlides[activeSlide];

  return (
    <section className="w-full max-w-full overflow-hidden bg-[#f3f6fb] px-0 pb-5 pt-0 sm:px-0 sm:pt-4 lg:px-0 lg:pb-7">
      <div className="mx-auto w-full max-w-none">
        <div
          className="relative isolate overflow-hidden bg-[#071d3b] shadow-[0_18px_55px_rgba(15,40,75,0.16)] sm:rounded-[2px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setIsPaused(false);
            }
          }}
        >
          {/* One shared slide layer: image and copy enter together */}
          <div key={slide.id} className="hero-slide-enter relative min-h-0 lg:min-h-[470px]">
            {/* Desktop image is a single blended background, not a separate right-side card */}
            <div className="pointer-events-none absolute inset-0 hidden lg:block">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={activeSlide === 0}
                sizes="100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#071d3b] via-[#071d3b]/95 via-45% to-[#071d3b]/10" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06172f]/25 via-transparent to-[#06172f]/10" />
            </div>

            {/* Mobile content first, image second */}
            <div className="relative z-10 flex flex-col lg:min-h-[470px] lg:max-w-[680px] lg:justify-center lg:px-14 lg:py-12">
              <div className="order-1 px-5 pb-5 pt-7 text-white sm:px-8 sm:pb-6 lg:px-0 lg:py-0">
                <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-sky-300/25 bg-sky-300/10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.15em] text-sky-200 sm:text-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-300" />
                  {slide.eyebrow}
                </div>

                <h1 className="max-w-[620px] text-[29px] font-black leading-[1.08] tracking-tight sm:text-4xl lg:text-[50px]">
                  {`${seoProductName
                    ? cityName
                      ? `${seoBrandName ? `${seoBrandName} ` : ""}${seoProductName} Repair Service Center in`
                      : `${seoBrandName ? `${seoBrandName} ` : ""}${seoProductName} Repair and Service`
                    : cityName ? "Home Appliance Repair Support in" : slide.title} `}
                  <span className="block text-sky-300">{cityName || (seoProductName ? "Doorstep Support" : slide.highlight)}</span>
                </h1>

                <p className="mt-3 max-w-[540px] text-[13px] leading-6 text-blue-50/90 sm:text-base sm:leading-7 lg:mt-4 lg:text-[17px]">
                  {seoProductName
                    ? cityName
                      ? `Explore independent ${seoBrandName ? `${seoBrandName} ` : ""}${seoProductName} repair and doorstep service assistance in ${cityName}, India. Review common issues, service information and request a visit.`
                      : `Explore independent ${seoBrandName ? `${seoBrandName} ` : ""}${seoProductName} repair, maintenance and installation assistance. Review service details, common issues and request a doorstep visit.`
                    : cityName ? `Explore multi-brand appliance repair, maintenance and installation support in ${cityName}. Choose your appliance, review service information and request a doorstep visit.` : slide.description}
                </p>

                {/* All three service promises stay in one horizontal row */}
                <div className="mt-4 grid grid-cols-3 gap-2 sm:mt-5 sm:max-w-[490px] sm:gap-4">
                  {slide.features.map(({ label, detail, Icon }) => (
                    <div key={label} className="flex min-w-0 items-center gap-1.5 text-white sm:gap-2">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-sky-200/25 bg-white/10 text-sky-200 sm:h-8 sm:w-8">
                        <Icon size={15} />
                      </span>
                      <span className="min-w-0 leading-tight">
                        <span className="block text-[9px] font-extrabold sm:text-xs">{label}</span>
                        <span className="mt-0.5 block text-[8px] font-medium text-blue-100/75 sm:text-[10px]">{detail}</span>
                      </span>
                    </div>
                  ))}
                </div>

                {/* Buttons remain side by side on mobile */}
                <div className="mt-5 grid grid-cols-2 gap-2.5 sm:flex sm:items-center sm:gap-3 lg:mt-6">
                  <button
                    type="button"
                    onClick={onOpenBooking}
                    className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-2.5 py-2.5 text-[11px] font-extrabold text-white shadow-lg shadow-blue-950/25 transition hover:bg-blue-500 active:scale-[0.98] sm:min-h-12 sm:w-fit sm:gap-3 sm:px-6 sm:text-sm"
                  >
                    <Icons.Calendar size={16} />
                    <span className="whitespace-nowrap">Book Doorstep Visit</span>
                    <Icons.ArrowRight size={14} />
                  </button>
                  <Link
                    href="#services"
                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/25 bg-white/10 px-2.5 py-2.5 text-[11px] font-bold text-white transition hover:bg-white/15 sm:min-h-11 sm:w-fit sm:px-5 sm:text-sm"
                  >
                    Explore Services
                  </Link>
                </div>
              </div>

              {/* Mobile-only image sits below heading/buttons and blends at the top edge */}
              <div className="relative order-2 h-[190px] w-full overflow-hidden sm:h-[245px] lg:hidden">
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority={activeSlide === 0}
                  sizes="100vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#071d3b] via-[#071d3b]/55 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#071d3b]/25 via-transparent to-[#071d3b]/10" />
                <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#071d3b]/35 to-transparent" />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={showPrevious}
            aria-label="Previous hero slide"
            className="absolute left-3 top-[44%] z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-[#08254a]/75 text-white shadow-lg backdrop-blur transition hover:bg-blue-600 lg:flex"
          >
            <span className="text-2xl leading-none">‹</span>
          </button>
          <button
            type="button"
            onClick={showNext}
            aria-label="Next hero slide"
            className="absolute right-3 top-[44%] z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-[#08254a]/75 text-white shadow-lg backdrop-blur transition hover:bg-blue-600 lg:flex"
          >
            <span className="text-2xl leading-none">›</span>
          </button>

          <div className="absolute bottom-3 right-4 z-20 flex items-center gap-2 lg:bottom-5 lg:right-9">
            {heroSlides.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveSlide(index)}
                aria-label={`Show slide ${index + 1}`}
                aria-current={activeSlide === index}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeSlide === index ? "w-8 bg-sky-300" : "w-2.5 bg-white/65 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop thumbnails are removed to keep the hero clean and spacious */}
      </div>
    </section>
  );
};
