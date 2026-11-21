import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CityLandingClient from "@/components/home/CityLandingClient";
import { findCityBySlug, allCities } from "@/data/locations";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return allCities.map((city) => ({ slug: city.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const city = findCityBySlug(params.slug);
  if (!city) return { title: "City Not Found | Service Support Hub" };

  const title = `Home Appliance Repair and Service Support in ${city.name} | Service Support Hub`;
  const description = `Explore multi-brand home appliance repair, maintenance, installation and doorstep service assistance in ${city.name}, ${city.state}. Find support for AC, refrigerator, washing machine, TV, microwave, kitchen chimney, gas hob and more. Local availability and estimates are confirmed before booking.`;

  return {
    title,
    description,
    keywords: [
      `home appliance repair in ${city.name}`,
      `appliance service center in ${city.name}`,
      `AC repair in ${city.name}`,
      `refrigerator repair in ${city.name}`,
      `washing machine repair in ${city.name}`,
      `microwave repair in ${city.name}`,
      `kitchen chimney repair in ${city.name}`,
      `gas hob repair in ${city.name}`,
      `doorstep appliance service ${city.name}`,
    ],
    alternates: { canonical: `https://www.servicesupporthub.in/cities/${city.slug}` },
    openGraph: {
      title,
      description,
      url: `https://www.servicesupporthub.in/cities/${city.slug}`,
      type: "website",
    },
  };
}

export default function CityDetailPage({ params }: Props) {
  const city = findCityBySlug(params.slug);
  if (!city) notFound();

  return (
    <CityLandingClient
      cityName={city.name}
      citySlug={city.slug}
      stateName={city.state}
    />
  );
}
