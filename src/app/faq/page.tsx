import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FaqSection } from "@/components/home/FaqSection";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.servicesupporthub.in/faq" },
  title: "Frequently Asked Questions | Service Support Hub",
  description:
    "Common questions about kitchen appliance repairs, visiting charges, doorstep timelines, and 30-day warranty policies.",
};

export default function FaqPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 mb-4">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 font-bold text-xs inline-flex items-center gap-1"
          >
            ← Back to Home
          </Link>
        </div>
        <FaqSection />
      </main>

      <Footer />
    </div>
  );
}
