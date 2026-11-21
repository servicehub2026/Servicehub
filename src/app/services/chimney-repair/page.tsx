import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductServiceLandingClient from "@/components/services/ProductServiceLandingClient";
export const metadata: Metadata = {
  alternates: { canonical: "https://www.servicesupporthub.in/services/chimney-repair" },
  title: "Kitchen Chimney Repair and Cleaning Service | 60-Min Doorstep Visit",
  description:
    "Professional doorstep kitchen chimney repair, deep chemical cleaning, motor fixing, PCB repair, and suction restoration. 30-day warranty, 100% genuine parts.",
  keywords: [
    "kitchen chimney repair",
    "chimney deep cleaning",
    "chimney low suction problem",
    "chimney motor noise repair",
    "chimney auto clean repair",
    "chimney service in chandigarh",
    "Faber chimney repair",
    "Elica chimney repair",
    "Glen chimney repair",
  ],
};

export default function ProductPage() {
  return (
    <ProductServiceLandingClient
      productSlug="chimney-repair"
      productName="Kitchen Chimney"
    />
  );
}
