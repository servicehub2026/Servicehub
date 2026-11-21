import type { Metadata } from "next";
import HomeClient from "@/components/home/HomeClient";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.servicesupporthub.in" },
};

export default function HomePage() {
  return <HomeClient />;
}
