export interface ServiceMeta {
  slug: string;
  title: string;
  shortDesc?: string;
}

export interface SiteMeta {
  name: string;
  tagline: string;
  subtitle: string;
  domain: string;
  url: string;
  email: string;
  phone: string;
  phoneRaw: string;
  whatsapp: string;
  network: string;
  areas: string[];
}

export const site: SiteMeta = {
  name: "Service Support Hub",
  tagline: "Trusted home appliance repair, installation and maintenance support at your doorstep.",
  subtitle: "HOME and OFFICE APPLIANCE CARE",
  domain: "servicesupporthub.in",
  url: "https://www.servicesupporthub.in",
  email: "care@servicesupporthub.in",
  phone: "+91 98765 43210",
  phoneRaw: "9876543210",
  whatsapp: "919876543210",
  network: "Delhi NCR, Uttar Pradesh, Chandigarh Tricity and nearby service areas.",
  areas: [
    "Chandigarh",
    "Mohali",
    "Panchkula",
    "Zirakpur",
    "Delhi NCR",
    "Noida",
    "Greater Noida",
    "Gurgaon",
    "Ghaziabad",
    "Faridabad",
    "Lucknow",
    "Kanpur",
    "Meerut",
  ],
};

export const services: ServiceMeta[] = [
  {
    slug: "chimney-repair",
    title: "Kitchen Chimney Repair and Cleaning",
    shortDesc: "Suction restoration, deep degreasing, motor and PCB repair",
  },
  {
    slug: "gas-stove-repair",
    title: "Gas Hob and Stove Repair",
    shortDesc: "Auto-ignition, burner decarbonizing, gas leakage safety check",
  },
  {
    slug: "microwave-repair",
    title: "Microwave Oven Repair",
    shortDesc: "Heating restoration, magnetron, sparking and turntable fix",
  },
  {
    slug: "water-purifier-repair",
    title: "RO Water Purifier Service",
    shortDesc: "Filter replacement, membrane service and TDS tuning",
  },
  {
    slug: "dishwasher-repair",
    title: "Dishwasher Repair and Servicing",
    shortDesc: "Water drainage, heating coil and pump motor repair",
  },
  {
    slug: "refrigerator-repair",
    title: "Refrigerator and Fridge Repair",
    shortDesc: "Cooling coil, gas charging, thermostat and compressor check",
  },
  {
    slug: "washing-machine-repair",
    title: "Washing Machine Repair",
    shortDesc: "Drum spin, PCB sensor, drain pump and motor repair",
  },
];
