"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { QuickBookingModal } from "@/components/home/QuickBookingModal";

interface CityPageHeaderProps {
  cityName: string;
}

export const CityPageHeader: React.FC<CityPageHeaderProps> = ({ cityName }) => {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <Navbar onOpenBooking={() => setBookingOpen(true)} />
      <QuickBookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        defaultLocality={cityName}
      />
    </>
  );
};
