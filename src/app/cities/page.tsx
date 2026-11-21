import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { stateWiseCities } from "@/data/locations";

export const metadata = {
  title: "Service Cities in India | Service Support Hub",
  description: "Explore Service Support Hub appliance repair service locations across Uttar Pradesh, Delhi NCR, Chandigarh, Maharashtra and other major Indian cities.",
  alternates: { canonical: "https://www.servicesupporthub.in/cities" },
};

export default function CitiesPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <section className="bg-[#102d3c] px-4 py-14 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-[.2em] text-sky-300">Service Support Hub</p>
          <h1 className="text-3xl font-black sm:text-4xl">Explore Our Service Cities</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">Choose your city to explore available home appliance repair and doorstep service information.</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-2 lg:grid-cols-3">
        {stateWiseCities.map((group) => (
          <div key={group.state} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-3 border-b border-slate-100 pb-3 text-lg font-extrabold text-slate-900">{group.state}</h2>
            <div className="flex flex-wrap gap-2">
              {group.cities.map((city) => (
                <Link key={city.slug} href={`/cities/${city.slug}`} className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700">{city.name}</Link>
              ))}
            </div>
          </div>
        ))}
      </section>
      <Footer />
    </main>
  );
}
