import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Icons } from "@/components/ui/Icons";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.servicesupporthub.in/contact-us" },
  title: "Contact Us | Service Support Hub Doorstep Helpdesk",
  description:
    "Get in touch with Service Support Hub for kitchen appliance repair appointments, customer care, and emergency doorstep service.",
};

export default function ContactUsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Contact Service Support Hub
            </h1>
            <p className="text-sm text-slate-600">
              Need quick assistance or want to schedule a doorstep technician visit? We are
              available 7 days a week from 8:00 AM to 9:00 PM.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto">
                <Icons.Phone size={22} />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Call Helpline</h3>
              <p className="text-xs text-slate-500">Fastest appointment booking</p>
              <a
                href={`tel:${site.phoneRaw}`}
                className="font-bold text-blue-600 text-sm block hover:underline"
              >
                {site.phone}
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <Icons.WhatsApp size={22} />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">WhatsApp Chat</h3>
              <p className="text-xs text-slate-500">Send photo and symptom details</p>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-emerald-600 text-sm block hover:underline"
              >
                Chat on WhatsApp
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
                <Icons.Wrench size={22} />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Email Support</h3>
              <p className="text-xs text-slate-500">For billing and corporate inquiries</p>
              <a
                href={`mailto:${site.email}`}
                className="font-bold text-indigo-600 text-sm block hover:underline"
              >
                {site.email}
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
