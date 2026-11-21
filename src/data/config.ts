export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  domain: string;
  url: string;
  phone: string;
  phoneRaw: string;
  whatsapp: string;
  whatsappMessage: string;
  email: string;
  workingHours: string;
  responseTime: string;
  warranty: string;
  ratingValue: number;
  ratingCount: number;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  socialLinks: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
  serviceAreas: string[];
  popularBrands: string[];
}

export const siteConfig: SiteConfig = {
  name: "Service Support Hub",
  shortName: "SupportHub",
  tagline: "Expert Kitchen Appliance Repair and Maintenance Service",
  description:
    "Service Support Hub offers reliable doorstep repair, cleaning and maintenance services for Kitchen Chimneys, Gas Stoves, Hobs, and Microwave Ovens. Same-day service, 100% genuine parts, transparent pricing, and 30-day warranty.",
  domain: "servicesupporthub.in",
  url: "https://www.servicesupporthub.in",
  phone: "+91 98765 43210",
  phoneRaw: "9876543210",
  whatsapp: "919876543210",
  whatsappMessage:
    "Hello Service Support Hub! I need doorstep repair/service for my kitchen appliance. Please assist me with booking.",
  email: "support@servicesupporthub.in",
  workingHours: "8:00 AM – 9:00 PM (Open All 7 Days)",
  responseTime: "60 – 90 Minutes Response",
  warranty: "30-Day Service and Parts Warranty",
  ratingValue: 4.9,
  ratingCount: 1840,
  address: {
    street: "Main Market Road, Service Centre Corridor",
    city: "Chandigarh",
    state: "Chandigarh",
    postalCode: "160017",
    country: "India",
  },
  socialLinks: {
    facebook: "https://facebook.com/servicesupporthub",
    instagram: "https://instagram.com/servicesupporthub",
  },
  serviceAreas: [
    "Sector 1 to 15",
    "Sector 16 to 25",
    "Sector 26 to 35",
    "Sector 36 to 45",
    "Sector 46 to 60",
    "Industrial Area Phase 1 and 2",
    "Manimajra",
    "Panchkula Sectors 1-25",
    "Mohali Phases 1-11 and Sectors 67-82",
    "Zirakpur and VIP Road",
    "Dhanas and Maloya",
    "New Chandigarh / Mullanpur",
  ],
  popularBrands: [
    "Faber",
    "Elica",
    "Glen",
    "Kaff",
    "Hindware",
    "Bosch",
    "Whirlpool",
    "IFB",
    "Sunflame",
    "Prestige",
    "Pigeon",
    "Samsung",
    "LG",
    "Haier",
    "Morphy Richards",
    "Bajaj",
  ],
};

export const getWhatsAppLink = (customText?: string) => {
  const text = encodeURIComponent(customText || siteConfig.whatsappMessage);
  return `https://wa.me/${siteConfig.whatsapp}?text=${text}`;
};
