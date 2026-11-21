import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/config";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.servicesupporthub.in/privacy-policy" },
  title: "Privacy Policy | Service Support Hub",
  description:
    "Privacy Policy for Service Support Hub (servicesupporthub.in). Learn how we handle your booking and contact information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="border-b border-slate-200 pb-6">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xs text-slate-500 mt-2">{`Last updated: ${new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}`}
            </p>
          </div>

          <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">
                1. Overview and Commitment
              </h2>
              <p>
                At <strong>Service Support Hub</strong>{` (operating on `}
                <strong>{siteConfig.domain}</strong>), we value your privacy and are committed
                to handling your personal details with integrity and utmost security. This
                policy explains what information we collect when you submit a doorstep service
                inquiry or contact our technical helpdesk.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">
                2. Information We Collect
              </h2>
              <p>
                When you initiate a service request via our website forms, phone hotline, or
                WhatsApp, we collect only the necessary information to arrange and execute
                doorstep repair:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-slate-600">
                <li>Customer Name</li>
                <li>Contact Mobile / Telephone Number</li>
                <li>Residential Locality or Sector for technician dispatch</li>
                <li>Appliance category (e.g., Chimney, Gas Stove, Microwave)</li>
                <li>Description of symptoms or faults</li>
              </ul>
              <p>
                We do not collect or request sensitive payment credentials, bank account PINs,
                or passwords. Service payments are conducted directly in person via official UPI
                or cash upon satisfactory job completion.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">
                3. Use of WhatsApp Messaging
              </h2>
              <p>
                Our platform integrates with WhatsApp to facilitate swift service booking and
                instant technician assignment. When you click “Confirm via WhatsApp”, your
                specified details are pre-formatted into a message within your own WhatsApp client.
                Any communications conducted through WhatsApp are additionally subject to
                WhatsApp’s own end-to-end encrypted terms of service and privacy policies.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">
                4. Data Protection and Sharing
              </h2>
              <p>
                We never sell, rent, or trade your contact information to third-party telemarketers
                or advertisers. Your details are shared solely with the assigned certified technician
                and dispatch coordinator to reach your residence and deliver doorstep service.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">
                5. Contacting Us
              </h2>
              <p>
                If you have questions regarding our privacy practices or wish to have your details
                removed from our service records, please contact:
              </p>
              <p className="font-semibold text-slate-900">{`Email: ${siteConfig.email} `}<br />{`Helpline: ${siteConfig.phone}`}
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
