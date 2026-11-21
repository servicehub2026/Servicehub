import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductServiceLandingClient from "@/components/services/ProductServiceLandingClient";
export const metadata: Metadata = {
  alternates: { canonical: "https://www.servicesupporthub.in/services/microwave-repair" },
  title: "Microwave Oven Repair Service | Heating, Sparking and PCB Fix",
  description:
    "Reliable doorstep repair for Solo, Grill, and Convection microwave ovens. We fix microwave not heating, internal sparking, non-rotating plate, and dead touch pads with 30-day warranty.",
  keywords: [
    "microwave oven repair",
    "microwave not heating food",
    "microwave sparking inside",
    "microwave magnetron replacement",
    "microwave turntable plate motor repair",
    "microwave touch keypad repair",
    "LG microwave repair",
    "Samsung microwave repair",
    "IFB microwave repair",
  ],
};

export default function ProductPage() {
  return (
    <ProductServiceLandingClient
      productSlug="microwave-repair"
      productName="Microwave Oven"
    />
  );
}
