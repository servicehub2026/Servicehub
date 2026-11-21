import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CityLandingClient from "@/components/home/CityLandingClient";
import { findCityBySlug } from "@/data/locations";
import { getAllCityServiceLandingParams, resolveCityServiceLanding } from "@/lib/cityServiceUrls";

type Props = { params: { slug: string; landingSlug: string } };

// Every city x product x brand landing page is pre-rendered as static HTML at build time.
export const dynamicParams = false;
export function generateStaticParams() {
  return getAllCityServiceLandingParams();
}

export function generateMetadata({ params }: Props): Metadata {
  const city = findCityBySlug(params.slug);
  const landing = resolveCityServiceLanding(params.landingSlug);
  if (!city || !landing) return { title: "Service Page Not Found | Service Support Hub" };

  const { product, brand } = landing;
  const brandLabel = brand ? `${brand} ` : "";
  const title = `${brandLabel}${product.name} Repair Service Center in ${city.name} | Service Support Hub`;
  const description = `Looking for ${brandLabel}${product.name} repair service center in ${city.name}, ${city.state}? Explore independent doorstep repair and maintenance assistance, common appliance issues, service estimates and booking information for ${brandLabel}${product.name}.`;
  const canonical = `https://www.servicesupporthub.in/cities/${city.slug}/${params.landingSlug}`;

  return {
    title,
    description,
    keywords: [
      `${brandLabel}${product.name} repair service center in ${city.name}`,
      `${brandLabel}${product.name} service center ${city.name}`,
      `${brandLabel}${product.name} repair in ${city.name}`,
      `${product.name} repair service in ${city.name}`,
      `doorstep ${product.name.toLowerCase()} repair ${city.name}`,
    ],
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website" },
  };
}

export default function CityBrandProductPage({ params }: Props) {
  const city = findCityBySlug(params.slug);
  const landing = resolveCityServiceLanding(params.landingSlug);
  if (!city || !landing) notFound();

  return (
    <CityLandingClient
      cityName={city.name}
      citySlug={city.slug}
      stateName={city.state}
      selectedProductSlug={landing.product.slug}
      selectedBrand={landing.brand || undefined}
      seoProductName={landing.product.name}
      seoBrandName={landing.brand || undefined}
    />
  );
}
