import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/config";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.servicesupporthub.in/terms-and-conditions" },
  title: "Terms and Conditions | Service Support Hub",
  description:
    "Terms and Conditions governing doorstep repair services, visiting fees, and warranties provided by Service Support Hub.",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="border-b border-slate-200 pb-6">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Terms and Conditions
            </h1>
            <p className="text-xs text-slate-500 mt-2">{`Effective Date: ${new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}`}
            </p>
          </div>

          <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">
                1. Service Inquiries and Appointment Scheduling
              </h2>
              <p>{`Submitting an appointment request or callback form on `}
                <strong>{siteConfig.domain}</strong> constitutes a preliminary service inquiry.
                An appointment is officially scheduled once our coordinator or technician confirms
                the visit time slot directly with you by phone or WhatsApp.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">
                2. Doorstep Diagnosis and Approval of Estimates
              </h2>
              <p>
                A nominal inspection fee (typically ₹199 to ₹299 depending on the appliance) applies
                for technician visit and physical diagnosis. Before performing any repair or replacing
                parts, the technician will present an upfront estimate explaining the exact scope and
                cost. Repair work proceeds ONLY after your explicit verbal or written approval.
              </p>
              <p>
                If you choose to proceed with the repair work, the visiting fee is waived and
                incorporated directly into the final repair bill.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">
                3. Post-Service Warranty
              </h2>
              <p>
                Repairs and replaced spare parts carry a standard <strong>30-Day Doorstep Guarantee</strong>.
                If the identical symptom reoccurs during this period, our technician will inspect and
                rectify it at no extra service charge. The warranty does not cover damages resulting
                from subsequent electrical surges, liquid spillage, pest infestation, or unauthorized
                tampering by third parties.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">
                4. Independent Third-Party Status and Trademarks
              </h2>
              <p>
                Service Support Hub is an independent doorstep technical service provider. We are not
                affiliated with or endorsed by any specific original equipment manufacturer (such as
                Faber, Elica, Glen, Kaff, Hindware, Bosch, Whirlpool, IFB, Samsung, LG, etc.). All brand
                names and trademarks belong solely to their respective copyright holders and are cited
                only for compatibility identification.
              </p>
            </section>
          </div>

          <div className="pt-6 border-t border-slate-200">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 font-bold text-sm inline-flex items-center gap-1"
            >
              ← Return to Homepage
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
