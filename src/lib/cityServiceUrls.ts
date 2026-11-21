import { applianceProducts, allCities } from "@/data/locations";

const slugify = (value: string) =>
  value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const getCityServiceLandingSlug = (productSlug: string, brand?: string) => {
  const product = applianceProducts.find((item) => item.slug === productSlug);
  if (!product) return null;
  const prefix = brand ? `${slugify(brand)}-` : "";
  return `${prefix}${slugify(product.name)}-repair-service-center`;
};

export const getCityServiceLandingPath = (citySlug: string, productSlug: string, brand?: string) => {
  const landingSlug = getCityServiceLandingSlug(productSlug, brand);
  return landingSlug ? `/cities/${citySlug}/${landingSlug}` : `/cities/${citySlug}`;
};

export const resolveCityServiceLanding = (landingSlug: string) => {
  for (const product of applianceProducts) {
    const genericSlug = getCityServiceLandingSlug(product.slug);
    if (genericSlug === landingSlug) {
      return { product, brand: "" };
    }
    for (const brand of product.brands) {
      if (getCityServiceLandingSlug(product.slug, brand) === landingSlug) {
        return { product, brand };
      }
    }
  }
  return null;
};

export const getAllCityServiceLandingParams = () =>
  allCities.flatMap((city) =>
    applianceProducts.flatMap((product) => [
      { slug: city.slug, landingSlug: getCityServiceLandingSlug(product.slug)! },
      ...product.brands.map((brand) => ({
        slug: city.slug,
        landingSlug: getCityServiceLandingSlug(product.slug, brand)!,
      })),
    ])
  );
