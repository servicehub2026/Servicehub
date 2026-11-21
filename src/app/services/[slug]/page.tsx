import { notFound } from "next/navigation";
import ProductServiceLandingClient from "@/components/services/ProductServiceLandingClient";
import { applianceProducts } from "@/data/locations";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return applianceProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props) {
  const product = applianceProducts.find((item) => item.slug === params.slug);
  return {
    alternates: { canonical: `https://www.servicesupporthub.in/services/${params.slug}` },
    title: product ? `${product.name} Repair and Service | Service Support Hub` : "Service Not Found",
    description: product
      ? `Explore ${product.name.toLowerCase()} repair, cleaning, maintenance and installation support from Service Support Hub.`
      : "Service page not found.",
  };
}

export default function ProductServicePage({ params }: Props) {
  const product = applianceProducts.find((item) => item.slug === params.slug);
  if (!product) notFound();

  return (
    <ProductServiceLandingClient
      productSlug={product.slug}
      productName={product.name}
    />
  );
}
