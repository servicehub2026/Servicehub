import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site, services } from "@/lib/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Icons } from "@/components/ui/Icons";

interface Props {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return site.areas.map((area) => ({
    slug: area.toLowerCase().replace(/\s+/g, "-"),
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const cityMatch = site.areas.find(
    (a) => a.toLowerCase().replace(/\s+/g, "-") === params.slug
  );
  const cityName = cityMatch || params.slug.replace(/-/g, " ");

  return {
    alternates: { canonical: `https://www.servicesupporthub.in/service-areas/${params.slug}` },
    title: `Kitchen Appliance Repair and Service in ${cityName} | Doorstep Service`,
    description: `Fast doorstep repair and cleaning service for Kitchen Chimneys, Gas Stoves, Hobs and Microwave Ovens in ${cityName}. 60-90 min response, genuine spares, 30-day warranty.`,
  };
}

export default function ServiceAreaPage({ params }: Props) {
  const cityMatch = site.areas.find(
    (a) => a.toLowerCase().replace(/\s+/g, "-") === params.slug
  );

  const cityName = cityMatch || params.slug.replace(/-/g, " ");

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 bg-white">
        {/* Breadcrumb */}
        <div className="bg-slate-100 border-b border-slate-200 py-3 px-4">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <span>Service Areas</span>
            <span>/</span>
            <span className="text-blue-600 font-bold">{cityName}</span>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-gradient-to-b from-slate-900 to-slate-950 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold">
              <Icons.MapPin size={15} />
              <span>{`Doorstep Service Across ${cityName}`}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">{`Expert Appliance Repair and Service in ${cityName}`}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">{`Facing issues with your kitchen chimney suction, gas stove burners, or microwave oven in ${cityName}? Our certified field technicians arrive at your home within 60 to 90 minutes.`}</p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`tel:${site.phoneRaw}`}
                className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm inline-flex items-center gap-2 shadow-lg shadow-blue-600/30"
              >
                <Icons.Phone size={18} className="text-amber-400" />
                <span>{`Call Helpline: ${site.phone}`}</span>
              </a>
              <a
                href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
                  `Hello! I need doorstep kitchen appliance service in ${cityName}. Please book my appointment.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm inline-flex items-center gap-2"
              >
                <Icons.WhatsApp size={18} />
                <span>{`WhatsApp in ${cityName}`}</span>
              </a>
            </div>
          </div>
        </section>

        {/* Services in City */}
        <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-slate-900 text-center mb-10">{`Available Services in ${cityName}`}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.slug}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-600">{`Same-Day in ${cityName}`}
                  </span>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-xs font-bold text-blue-600 hover:underline"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
