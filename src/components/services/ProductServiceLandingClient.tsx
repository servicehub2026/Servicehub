"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileFloatingBar } from "@/components/layout/MobileFloatingBar";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustTicker } from "@/components/home/TrustTicker";
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

export default function ProductServiceLandingClient({
  productSlug,
  productName,
  brandName,
}: {
  productSlug: string;
  productName: string;
  brandName?: string;
}) {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedAppliance, setSelectedAppliance] = useState(productName);

  const handleOpenBooking = (applianceName?: string) => {
    if (applianceName) setSelectedAppliance(applianceName);
    setBookingModalOpen(true);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar onOpenBooking={() => handleOpenBooking()} />
      <main className="min-w-0 w-full max-w-full flex-1 overflow-x-clip">
        <HeroSection
          onOpenBooking={() => handleOpenBooking()}
          seoProductName={productName}
          seoBrandName={brandName}
        />
        <TrustTicker />
        <PopularProductServices productSlug={productSlug} brandName={brandName} />
        <HowItWorks />
        <CommonApplianceProblemsSlider onOpenBooking={handleOpenBooking} productName={productName} brandName={brandName} theme="light" />
        <CommonIssues />
        <BrandCoverageSlider />
        <BrandsWeService initialProductSlug={productSlug} initialBrand={brandName} />
        <PricingEstimates onOpenBooking={() => handleOpenBooking()} productName={productName} brandName={brandName} />
        <Testimonials />
        <FaqSection productSlug={productSlug} productName={productName} brandName={brandName} />
        <TrustMetrics />
      </main>
      <Footer />
      <MobileFloatingBar onOpenBooking={() => handleOpenBooking()} />
      <QuickBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        defaultAppliance={selectedAppliance}
      />
    </div>
  );
}
