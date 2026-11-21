import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductServiceLandingClient from "@/components/services/ProductServiceLandingClient";
export const metadata: Metadata = {
  alternates: { canonical: "https://www.servicesupporthub.in/services/gas-stove-repair" },
  title: "Gas Stove and Hob Repair Service | Burner, Ignition and Leak Fix",
  description:
    "Expert doorstep gas stove, cooking range, and built-in glass hob repair. Fix low yellow flames, continuous clicking ignition, burner clogging, and gas leaks safely.",
  keywords: [
    "gas stove repair",
    "gas hob repair",
    "stove burner cleaning",
    "auto ignition hob not clicking",
    "gas leak repair in kitchen",
    "built in hob glass repair",
    "stove service chandigarh",
    "Glen hob repair",
    "Faber gas stove repair",
  ],
};

export default function ProductPage() {
  return (
    <ProductServiceLandingClient
      productSlug="gas-stove-repair"
      productName="Gas Hob / Stove"
    />
  );
}
