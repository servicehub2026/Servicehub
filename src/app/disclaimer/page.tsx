import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.servicesupporthub.in/disclaimer" },
  title: "Disclaimer | Service Support Hub",
  description:
    "Independent service provider disclaimer for Service Support Hub (servicesupporthub.in).",
};

export default function DisclaimerPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="border-b border-slate-200 pb-6">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Disclaimer
            </h1>
            <p className="text-xs text-slate-500 mt-2">{`Last updated: ${new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}`}
            </p>
          </div>

          <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">
                1. Independent Service Provider
              </h2>
              <p>
                <strong>{site.name}</strong>{` (${site.domain}) is an independent third-party doorstep repair and maintenance service platform. We are not officially affiliated with, endorsed by, authorized by, or in any way connected to any original equipment manufacturers (OEMs) or brand owners.`}</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">
                2. Brand Names and Trademarks
              </h2>
              <p>
                All brand names, logos, model designations, and registered trademarks mentioned on
                this website (including but not limited to Faber, Elica, Glen, Kaff, Hindware,
                Bosch, Whirlpool, IFB, Samsung, LG, Sunflame, Prestige, etc.) are the exclusive
                property of their respective owners. They are referenced strictly for descriptive
                purposes to indicate compatibility of our independent repair and maintenance services.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">
                3. Scope of Warranty
              </h2>
              <p>{`Any warranties provided by ${site.name} are independent doorstep service guarantees offered directly by our service network on labor and replaced components, and are separate from any original manufacturer warranties.`}</p>
            </section>
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
