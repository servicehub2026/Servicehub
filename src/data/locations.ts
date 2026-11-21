export interface CityItem {
  name: string;
  slug: string;
}

export interface StateGroup {
  state: string;
  cities: CityItem[];
}

export const stateWiseCities: StateGroup[] = [
  {
    state: "Uttar Pradesh",
    cities: [
      ["Noida", "noida"], ["Greater Noida", "greater-noida"], ["Ghaziabad", "ghaziabad"],
      ["Meerut", "meerut"], ["Hapur", "hapur"], ["Modinagar", "modinagar"],
      ["Muzaffarnagar", "muzaffarnagar"], ["Baghpat", "baghpat"], ["Bulandshahr", "bulandshahr"],
      ["Khatauli", "khatauli"], ["Shamli", "shamli"], ["Kanpur", "kanpur"],
      ["Lucknow", "lucknow"], ["Prayagraj", "prayagraj"]
    ].map(([name, slug]) => ({ name, slug }))
  },
  {
    state: "Delhi",
    cities: [["Delhi", "delhi"], ["New Delhi", "new-delhi"]].map(([name, slug]) => ({ name, slug }))
  },
  {
    state: "Haryana",
    cities: [
      ["Gurugram", "gurugram"], ["Faridabad", "faridabad"], ["Sonipat", "sonipat"],
      ["Panipat", "panipat"], ["Rohtak", "rohtak"], ["Rewari", "rewari"],
      ["Palwal", "palwal"], ["Bahadurgarh", "bahadurgarh"]
    ].map(([name, slug]) => ({ name, slug }))
  },
  {
    state: "Chandigarh",
    cities: [["Chandigarh", "chandigarh"], ["Mohali", "mohali"], ["Panchkula", "panchkula"], ["Zirakpur", "zirakpur"]]
      .map(([name, slug]) => ({ name, slug }))
  },
  {
    state: "Maharashtra",
    cities: [["Mumbai", "mumbai"], ["Navi Mumbai", "navi-mumbai"], ["Thane", "thane"], ["Pune", "pune"], ["Nagpur", "nagpur"]]
      .map(([name, slug]) => ({ name, slug }))
  },
  {
    state: "Gujarat",
    cities: [["Surat", "surat"], ["Ahmedabad", "ahmedabad"], ["Vadodara", "vadodara"], ["Rajkot", "rajkot"]]
      .map(([name, slug]) => ({ name, slug }))
  },
  {
    state: "Rajasthan",
    cities: [["Jaipur", "jaipur"], ["Jodhpur", "jodhpur"], ["Udaipur", "udaipur"], ["Kota", "kota"]]
      .map(([name, slug]) => ({ name, slug }))
  },
  {
    state: "Tamil Nadu",
    cities: [["Chennai", "chennai"], ["Coimbatore", "coimbatore"]]
      .map(([name, slug]) => ({ name, slug }))
  },
  {
    state: "Karnataka",
    cities: [["Bengaluru", "bengaluru"], ["Mysuru", "mysuru"]]
      .map(([name, slug]) => ({ name, slug }))
  },
  {
    state: "Telangana",
    cities: [["Hyderabad", "hyderabad"]].map(([name, slug]) => ({ name, slug }))
  },
  {
    state: "West Bengal",
    cities: [["Kolkata", "kolkata"], ["Howrah", "howrah"]].map(([name, slug]) => ({ name, slug }))
  }
];

export const allCities = stateWiseCities.flatMap((group) =>
  group.cities.map((city) => ({ ...city, state: group.state }))
);

export const findCityBySlug = (slug?: string) =>
  allCities.find((city) => city.slug === slug);

export const applianceProducts = [
  { name: "AC", slug: "ac-repair", brands: ["LG", "Samsung", "Daikin", "Voltas", "Blue Star", "Hitachi", "Panasonic", "Carrier", "Lloyd", "Haier", "Godrej", "Mitsubishi Electric", "Mitsubishi Heavy Industries", "O General", "Toshiba", "Fujitsu", "Hisense", "Midea", "Gree", "Onida", "IFB", "Kelvinator", "Videocon"] },
  { name: "Refrigerator", slug: "refrigerator-repair", brands: ["LG", "Samsung", "Whirlpool", "Haier", "Godrej", "Bosch", "Panasonic", "Hitachi", "Hisense", "Voltas", "Liebherr", "Electrolux", "Siemens", "Voltas Beko", "Midea", "Kelvinator", "Videocon", "Onida", "BPL", "Toshiba", "Sharp", "Croma", "GE", "Fisher & Paykel"] },
  { name: "Washing Machine", slug: "washing-machine-repair", brands: ["LG", "Samsung", "Whirlpool", "IFB", "Bosch", "Siemens", "Haier", "Godrej", "Panasonic", "Voltas Beko", "Electrolux", "Miele", "AEG", "Lloyd", "BPL", "Onida", "Videocon", "Kelvinator", "Toshiba", "Mitashi", "Sharp"] },
  { name: "TV", slug: "tv-repair", brands: ["Samsung", "LG", "Sony", "Panasonic", "TCL", "Hisense", "Xiaomi", "OnePlus", "Haier", "Philips", "Vu", "Toshiba", "Thomson", "Kodak", "Acer", "Motorola", "Sansui", "BPL", "Onida", "Micromax", "iFFALCON", "Realme", "Infinix"] },
  { name: "Microwave", slug: "microwave-repair", brands: ["LG", "Samsung", "IFB", "Panasonic", "Whirlpool", "Godrej", "Haier", "Bosch", "Sharp", "Bajaj", "Siemens", "Electrolux", "Morphy Richards", "Toshiba", "BPL", "Onida", "Voltas Beko"] },
  { name: "Kitchen Chimney", slug: "chimney-repair", brands: ["Faber", "Kaff", "Glen", "Elica", "Hindware", "Crompton", "Prestige", "Sunflame", "Kutchina", "Inalsa", "Eurodomo", "Bosch", "Siemens", "Hafele", "Franke", "Cata", "Ventair", "Seavy", "Livpure", "Falmec", "Teka"] },
  { name: "Gas Hob / Stove", slug: "gas-stove-repair", brands: ["Faber", "Kaff", "Glen", "Elica", "Hindware", "Prestige", "Sunflame", "Bosch", "Siemens", "Hafele", "Pigeon", "Butterfly"] },
  { name: "Geyser", slug: "geyser-repair", brands: ["AO Smith", "Racold", "Havells", "Bajaj", "Crompton", "V-Guard", "Venus", "Jaquar", "Orient"] },
  { name: "Water Purifier", slug: "water-purifier-repair", brands: ["Kent", "Aquaguard", "Pureit", "Livpure", "Blue Star", "AO Smith", "Havells"] },
  { name: "CCTV Camera", slug: "cctv-camera-repair", brands: ["Hikvision", "CP Plus", "Dahua", "Godrej", "Prama", "Uniview", "Axis"] },
  { name: "Dishwasher", slug: "dishwasher-repair", brands: ["Bosch", "IFB", "Siemens", "LG", "Samsung", "Voltas Beko", "Faber", "Haier"] }
];
