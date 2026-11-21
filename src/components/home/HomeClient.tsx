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

export default function HomeClient() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedAppliance, setSelectedAppliance] = useState("Kitchen Chimney");

  const handleOpenBooking = (applianceName?: string) => {
    if (applianceName) {
      setSelectedAppliance(applianceName);
    }
    setBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navbar */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Main Content Sections */}
      <main className="min-w-0 w-full max-w-full flex-1 overflow-x-clip">
        {/* 1. Responsive Hero Slider */}
        <HeroSection onOpenBooking={() => handleOpenBooking()} />
        <TrustTicker />

        {/* 2. Core Specialized Services */}
        <ServicesGrid onOpenBooking={() => handleOpenBooking()} />

        {/* 3. Transparent 4-Step How It Works */}
        <HowItWorks />

        {/* Responsive appliance problems carousel */}
        <CommonApplianceProblemsSlider onOpenBooking={handleOpenBooking} theme="dark" />

        {/* 6. Common Issues and Diagnostic Guide (SEO Powerhouse) */}
        <CommonIssues />

        {/* Brand-wise service coverage slider */}
        <BrandCoverageSlider />

        {/* 6. Combined dynamic product, brand and city service finder */}
        <BrandsWeService />

        {/* 7. Transparent Rate Card / Pricing */}
        <PricingEstimates onOpenBooking={() => handleOpenBooking()} />

        {/* 9. Customer Testimonials and Reviews */}
        <Testimonials />

        {/* 10. FAQ Accordion */}
        <FaqSection />
        <TrustMetrics />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky Floating Bar */}
      <MobileFloatingBar onOpenBooking={() => handleOpenBooking()} />

      {/* Interactive Booking Modal */}
      <QuickBookingModal
        isOpen={bookingModalOpen}
        onClose={handleCloseBooking}
        defaultAppliance={selectedAppliance}
      />
    </div>
  );
}
