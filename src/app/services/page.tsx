import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { applianceProducts } from "@/data/locations";

export const metadata = {
  alternates: { canonical: "https://www.servicesupporthub.in/services" },
  title: "Home Appliance Repair Services | Service Support Hub",
  description: "Explore AC, refrigerator, washing machine, TV, microwave, kitchen chimney, gas hob, geyser and other appliance support services.",
};

export default function ServicesIndexPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <section className="bg-[#102d3c] px-4 py-14 text-white"><div className="mx-auto max-w-6xl"><p className="text-xs font-bold uppercase tracking-widest text-sky-300">Our Support Products</p><h1 className="mt-2 text-3xl font-black sm:text-4xl">Home Appliance Repair and Support</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">Choose an appliance to explore relevant brands and service information.</p></div></section>
      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-10 sm:grid-cols-2 lg:grid-cols-3">
        {applianceProducts.map((product) => <Link key={product.slug} href={`/services/${product.slug}`} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"><h2 className="text-lg font-extrabold text-slate-900">{product.name}</h2><p className="mt-2 text-sm text-slate-500">{product.brands.slice(0, 5).join(" • ")}</p><span className="mt-4 inline-block text-sm font-bold text-blue-600">Explore service →</span></Link>)}
      </section><Footer />
    </main>
  );
}
