import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.servicesupporthub.in/about-us" },
  title: "About Us | Service Support Hub",
  description:
    "Learn about Service Support Hub - providing rapid doorstep repair, maintenance, and genuine spare parts for home and office appliances.",
};

export default function AboutUsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="border-b border-slate-200 pb-6">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              About Service Support Hub
            </h1>
            <p className="text-xs text-slate-500 mt-2">
              HOME and OFFICE APPLIANCE CARE
            </p>
          </div>

          <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>Service Support Hub</strong>{` (${site.domain}) was founded with a singular mission: to deliver transparent, reliable, and prompt doorstep technical services for essential kitchen and home appliances.`}</p>
            <p>{`We recognize how disruptive a malfunctioning kitchen chimney, leaking gas stove, or non-heating microwave oven can be to your daily routine. That is why our localized service network guarantees 60 to 90 minutes doorstep arrival across ${site.network}.`}</p>
            <p>
              Every technician in our network is thoroughly vetted, background-verified, and
              equipped with precision testing instruments and authentic spare parts. Our strict
              “Upfront Estimate and Approval” policy ensures you always have complete
              control over repair decisions with zero hidden surprises.
            </p>
          </div>

          <div className="pt-6 border-t border-slate-200">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 font-bold text-sm inline-flex items-center gap-1"
            >
              ← Back to Homepage
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
