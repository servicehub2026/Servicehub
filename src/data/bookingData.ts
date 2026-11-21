// Booking form data: products, brands and fixed "verified rate" services.
// Ported 1:1 from the reference HTML booking form.

export interface BookingProduct {
  /** key used in the form */
  key: string;
  /** label shown in the product dropdown */
  label: string;
  /** short name used in the headline ("Book LG Microwave Service") */
  short: string;
  /** matching slug in src/data/locations.ts applianceProducts */
  siteSlug: string;
  brands: string[];
  services: string[];
}

const V = "Visit and Diagnosis Checkup — ₹249";
const OTHER = "Other Service — As per inspection";

export const bookingProducts: BookingProduct[] = [
  {
    key: "Kitchen Chimney", label: "Kitchen Chimney", short: "Chimney", siteSlug: "chimney-repair",
    brands: ["KAFF", "Faber", "Elica", "Hindware", "Kutchina", "Glen", "Sunflame", "Cata", "Crompton", "Hafele", "Bajaj", "Inalsa", "Lifelong", "Prestige", "Pigeon", "Havells", "Akai", "Morphy Richards", "Usha", "Whirlpool", "Bosch", "Siemens", "Gilma", "Robam", "Franke", "Teka", "Electrolux", "Smeg", "Indesit", "Gaggenau", "Ruwa", "Blowhot", "Butterfly", "V-Guard", "Carysil", "Ventair", "Greenchef", "Seavy"],
    services: [V, "Basic General Cleaning and Servicing — ₹799 starting", "Deep Chemical Cleaning — ₹1199 starting", "Auto-Clean Servicing and Descaling — ₹1399 starting", "Motor Repair and Service — ₹1299 starting", "Motor Replacement and Fitting — ₹2999 starting", "Baffle / Mesh Filter Replacement — ₹499 starting", "Chimney Installation and Duct Setup — ₹899 starting", "Uninstallation and Re-installation — ₹699 starting", "Noise and Vibration Inspection — ₹399 starting", OTHER],
  },
  {
    key: "AC", label: "AC (Air Conditioner)", short: "AC", siteSlug: "ac-repair",
    brands: ["Actron", "Blue Star", "Bosch", "BPL", "Carrier", "Croma", "Cruise", "Daikin", "Electrolux", "Fisher and Paykel", "Fujitsu", "GE", "GEM", "Godrej", "Haier", "Hitachi", "Hyundai", "IFB", "Kelvinator", "Koryo", "LG", "Lloyd", "Midea", "Mitsubishi", "Napoleon", "O'General", "Onida", "Panasonic", "Philips", "Samsung", "Sansui", "Sanyo", "Sharp", "Siemens", "Sony", "TCL", "Toshiba", "Vestar", "Videocon", "Voltas", "Whirlpool", "White Westinghouse"],
    services: [V, "AC General Service and Filter Wash — ₹599", "AC Deep Jet Foam Cleaning — ₹899 starting", "AC Gas Refilling (Top-up / Full) — ₹1999 starting", "AC Installation / Uninstallation — ₹699 starting", "Water Leakage and Drainage Fix — ₹499 starting", "PCB Repair and Electrical Check — ₹899 starting", "Compressor Repair and Replacement — ₹3499 starting", OTHER],
  },
  {
    key: "Fridge", label: "Refrigerator", short: "Fridge", siteSlug: "refrigerator-repair",
    brands: ["Beko", "Blue Star", "Bosch", "BPL", "Carrier", "Croma", "Daikin", "Electrolux", "Fisher and Paykel", "Fujitsu", "GE", "GEM", "Godrej", "Haier", "Hisense", "Hitachi", "Hyundai", "IFB", "Kelvinator", "Kenstar", "Koryo", "LG", "Lloyd", "Midea", "Mitsubishi", "Napoleon", "O-General", "Onida", "Panasonic", "Philips", "Samsung", "Sansui", "Sanyo", "Sharp", "Siemens", "Sony", "TCL", "Toshiba", "Vestar", "Videocon", "Voltas", "Whirlpool", "White Westinghouse"],
    services: [V, "Refrigerator Deep Cleaning — ₹699 starting", "Cooling Issue Diagnosis and Gas Charge — ₹1499 starting", "Compressor Replacement — ₹3999 starting", "Thermostat and Sensor Repair — ₹599 starting", "Door Gasket / Seal Replacement — ₹899 starting", "Defrost System and Relay Fix — ₹799 starting", OTHER],
  },
  {
    key: "Washing Machine", label: "Washing Machine", short: "Washing Machine", siteSlug: "washing-machine-repair",
    brands: ["Actron", "Amana", "Bosch", "Carrier", "Daikin", "Electrolux", "Fisher and Paykel", "Fujitsu", "GE", "GEM", "Godrej", "Haier", "Hitachi", "IFB", "Intex", "Kelvinator", "Kenstar", "LG", "Lloyd", "Maytag", "Midea", "Mitsubishi", "Napoleon", "O-General", "Onida", "Panasonic", "Philips", "Samsung", "Sansui", "Sanyo", "Sharp", "Siemens", "Sony", "Speed Queen", "TCL", "Toshiba", "Vestar", "Videocon", "Voltas", "Whirlpool", "White Westinghouse"],
    services: [V, "Washing Machine General Service — ₹599", "Drum Deep Cleaning and Descaling — ₹899 starting", "Motor Repair and Replacement — ₹1499 starting", "Water Inlet and Drain Pump Fix — ₹599 starting", "PCB Repair and Spin Issue Fix — ₹999 starting", "Installation and Demo — ₹499 starting", OTHER],
  },
  {
    key: "LED LCD TV", label: "LED / LCD TV", short: "LED TV", siteSlug: "tv-repair",
    brands: ["Acer", "Beltek", "Blaupunkt", "BPL", "Coocaa", "Croma", "Dyanora", "Foxsky", "Haier", "Hisense", "Hitachi", "iFFALCON", "Infinix", "Intex", "Karbonn", "Kodak", "LG", "Limeberry", "Lloyd", "Micromax", "Mi", "Mitashi", "Motorola", "Nokia", "OnePlus", "Onida", "Oscar", "Panasonic", "Philips", "Realme", "Redmi", "Salora", "Samsung", "Sansui", "Sens", "Sharp", "Skywall", "Sony", "TCL", "Thomson", "Toshiba", "T-Series", "Videocon", "Vu", "Weston", "White Westinghouse", "Xiaomi", "Zebronics"],
    services: [V, "TV Wall Mount Installation — ₹499 starting", "Screen / Panel Repair and Replacement — ₹2999 starting", "Motherboard / Power Supply Repair — ₹999 starting", "Backlight Issue Fix — ₹1199 starting", "Sound and Speaker Repair — ₹699 starting", OTHER],
  },
  {
    key: "Kitchen Hob/Stove", label: "Kitchen Hob and Stove", short: "Hob/Stove", siteSlug: "gas-stove-repair",
    brands: ["Faber", "Elica", "KAFF", "Glen", "Sunflame", "Hindware", "Cata", "Prestige", "Pigeon", "Blowhot", "Bajaj", "Inalsa", "Kutchina", "Havells", "Lifelong", "Hafele", "Gilma", "Indesit", "Smeg", "Siemens", "Gaggenau", "Crompton", "Ruwa", "Robam", "Whirlpool", "Butterfly", "V-Guard", "Carysil", "Ventair", "Greenchef", "Seavy", "Bosch", "IFB", "Cello", "Sujata", "Milton", "Suryaviva", "iBell", "Goodflame"],
    services: [V, "Hob General Servicing (2 Burner) — ₹599", "Hob General Servicing (3 Burner) — ₹799", "Gas Leakage Check and Pipe Fixing — ₹399 starting", "Burner Tune-up and Valve Repair — ₹499 starting", "Auto Ignition Switch and Sparker Fix — ₹599 starting", "Glass Top Replacement — ₹1799 starting", OTHER],
  },
  {
    key: "Microwave Oven", label: "Microwave Oven", short: "Microwave", siteSlug: "microwave-repair",
    brands: ["Agaro", "Bajaj", "Electrolux", "Faber", "Godrej", "Haier", "IFB", "Kenstar", "LG", "Lifelong", "Morphy Richards", "Onida", "Panasonic", "Philips", "Pigeon", "Prestige", "Samsung", "Sharp", "Voltas", "Whirlpool"],
    services: [V, "Microwave General Servicing — ₹499", "Magnetron Replacement (Heating Issue) — ₹1499 starting", "Touch Panel and Keypad Repair — ₹699 starting", "Turntable Motor and Coupler Fix — ₹599 starting", "Sparking and Door Switch Repair — ₹699 starting", OTHER],
  },
  {
    key: "Geyser", label: "Geyser / Water Heater", short: "Geyser", siteSlug: "geyser-repair",
    brands: ["AO Smith", "Bajaj", "Crompton", "Havells", "Kenstar", "Morphy Richards", "Orient", "Polar", "Racold", "Surya", "Usha", "V-Guard", "Venus"],
    services: [V, "Geyser General Service and Check — ₹499", "Heating Element Replacement — ₹799 starting", "Thermostat Repair and Safety Valve Fix — ₹599 starting", "Water Leakage and Tank Welding — ₹699 starting", "Geyser Installation / Uninstallation — ₹599 starting", OTHER],
  },
  {
    key: "RO Water", label: "RO Water Purifier", short: "RO", siteSlug: "water-purifier-repair",
    brands: ["Aquaguard / Eureka Forbes", "Aquasure", "AO Smith", "Blue Star", "Havells", "Kent", "Livpure", "Prestige", "Pureit", "Tata Swach", "Usha", "Zero B"],
    services: [V, "RO General Servicing and TDS Check — ₹499", "Filter and Sediment Candle Change — ₹799 starting", "RO Membrane Replacement — ₹1199 starting", "UV Lamp and SMPS Power Supply Fix — ₹699 starting", "RO Installation and Relocation — ₹599 starting", OTHER],
  },
  {
    key: "CCTV Camera", label: "CCTV Camera", short: "CCTV", siteSlug: "cctv-camera-repair",
    brands: ["CP Plus", "Dahua", "Ezviz", "Godrej", "Hikvision", "Honeywell", "Qubo", "Realme", "Tiandy", "Uniview"],
    services: [V, "CCTV Camera Installation (per camera) — ₹399 starting", "DVR / NVR Configuration and Setup — ₹599 starting", "Camera Alignment and Focus Fix — ₹499 starting", "Power Supply and Cable Fault Troubleshooting — ₹599 starting", OTHER],
  },
  {
    key: "Dishwasher", label: "Dishwasher", short: "Dishwasher", siteSlug: "dishwasher-repair",
    brands: ["Bosch", "Electrolux", "Elica", "Faber", "Franke", "Hafele", "IFB", "KAFF", "LG", "Miele", "Samsung", "Siemens", "Teka", "Whirlpool"],
    services: [V, "Dishwasher Deep Cleaning and Descaling — ₹899 starting", "Dishwasher Installation and Demo — ₹699 starting", "Drain Pump and Water Inlet Fix — ₹899 starting", "Heating and Spray Arm Repair — ₹1199 starting", OTHER],
  },
];

export const OTHER_BRAND = "Other Brand";

/** Web3Forms public access key (safe to expose; it only allows sending to the owner's inbox). */
export const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "3e8200f4-b4d6-49eb-9d04-bdc403a9ca50";
/** Google Apps Script web-app URL that appends each booking to the Google Sheet. */
export const SHEET_SCRIPT_URL =
  process.env.NEXT_PUBLIC_SHEET_SCRIPT_URL ||
  "https://script.google.com/macros/s/AKfycbzL-m-lJd7n9j_D7Xq3r5XQf7yLwD2lS_uW6W8Wf-9_1-YmFz0/exec";
