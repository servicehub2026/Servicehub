"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileFloatingBar } from "@/components/layout/MobileFloatingBar";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustTicker } from "@/components/home/TrustTicker";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CommonIssues } from "@/components/home/CommonIssues";
import { CommonApplianceProblemsSlider } from "@/components/home/CommonApplianceProblemsSlider";
import { BrandCoverageSlider } from "@/components/home/BrandCoverageSlider";
import { BrandsWeService } from "@/components/home/BrandsWeService";
import { PricingEstimates } from "@/components/home/PricingEstimates";
import { Testimonials } from "@/components/home/Testimonials";
import { FaqSection } from "@/components/home/FaqSection";
import { TrustMetrics } from "@/components/home/TrustMetrics";
import { QuickBookingModal } from "@/components/home/QuickBookingModal";
import { PopularProductServices } from "@/components/services/PopularProductServices";

interface CityLandingClientProps {
  cityName: string;
  citySlug: string;
  stateName: string;
  selectedProductSlug?: string;
  selectedBrand?: string;
  seoProductName?: string;
  seoBrandName?: string;
}

export default function CityLandingClient({ cityName, citySlug, stateName, selectedProductSlug, selectedBrand, seoProductName, seoBrandName }: CityLandingClientProps) {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedAppliance, setSelectedAppliance] = useState("Kitchen Chimney");

  const handleOpenBooking = (applianceName?: string) => {
    if (applianceName) setSelectedAppliance(applianceName);
    setBookingModalOpen(true);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar onOpenBooking={() => handleOpenBooking()} />
      <main className="min-w-0 w-full max-w-full flex-1 overflow-x-clip">
        <HeroSection onOpenBooking={() => handleOpenBooking()} cityName={cityName} seoProductName={seoProductName} seoBrandName={seoBrandName} />
        <TrustTicker />
        {selectedProductSlug ? (
          <PopularProductServices
            productSlug={selectedProductSlug}
            cityName={cityName}
            brandName={seoBrandName || selectedBrand}
          />
        ) : (
          <ServicesGrid onOpenBooking={() => handleOpenBooking()} cityName={cityName} citySlug={citySlug} />
        )}
        <HowItWorks />
        <CommonApplianceProblemsSlider onOpenBooking={handleOpenBooking} cityName={cityName} productName={seoProductName} brandName={seoBrandName || selectedBrand} />
        <CommonIssues cityName={cityName} stateName={stateName} productName={seoProductName} brandName={seoBrandName || selectedBrand} />
        <BrandCoverageSlider />
        <BrandsWeService cityName={cityName} citySlug={citySlug} initialProductSlug={selectedProductSlug} initialBrand={selectedBrand} />
        <PricingEstimates onOpenBooking={() => handleOpenBooking()} productName={seoProductName || selectedProductSlug} brandName={seoBrandName || selectedBrand} />
        <Testimonials />
        <FaqSection cityName={cityName} productSlug={selectedProductSlug} productName={seoProductName} brandName={seoBrandName || selectedBrand} />
        <TrustMetrics />
      </main>
      <Footer />
      <MobileFloatingBar onOpenBooking={() => handleOpenBooking()} />
      <QuickBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        defaultAppliance={selectedAppliance}
        defaultLocality={cityName}
      />
    </div>
  );
}
