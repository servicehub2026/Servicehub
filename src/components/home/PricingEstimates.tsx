import React from "react";
import { siteConfig } from "@/data/config";
import { Icons } from "@/components/ui/Icons";

interface PricingEstimatesProps {
  onOpenBooking: () => void;
  productName?: string;
  brandName?: string;
}

export const PricingEstimates: React.FC<PricingEstimatesProps> = ({ onOpenBooking, productName, brandName }) => {
  const priceList = [
    { service: "Doorstep Physical Inspection and Diagnosis", category: "All Appliances", price: "₹199 Starting", note: "Visit and initial fault assessment; adjusted in the final bill if repair is approved.", badge: "First Visit" },
    { service: 'Split / Window AC General Service', category: 'Air Conditioner', price: '₹499 Starting', note: 'Filter and accessible indoor-unit cleaning', badge: 'Popular' },
    { service: 'AC Deep Cleaning Service', category: 'Air Conditioner', price: '₹799 Starting', note: 'Deep cleaning scope depends on indoor and outdoor unit access', badge: 'Best Value' },
    { service: 'AC Gas Refilling / Refrigerant Charging', category: 'Air Conditioner', price: '₹1,999 Starting', note: 'Leak inspection and refrigerant requirement are assessed first', badge: 'Gas Service' },
    { service: 'AC Cooling, Sensor and PCB Diagnosis', category: 'Air Conditioner', price: '₹399 Starting', note: 'Diagnosis and estimate before component repair', badge: 'Diagnosis' },
    { service: 'AC Installation and Setup', category: 'Air Conditioner', price: '₹1,499 Starting', note: 'Basic fitting; copper pipe and stand may be extra', badge: 'Installation' },
    { service: 'AC Uninstallation', category: 'Air Conditioner', price: '₹799 Starting', note: 'Safe disconnection and removal; height/access may affect cost', badge: 'Service' },
    { service: 'Refrigerator Cooling and Temperature Diagnosis', category: 'Refrigerator', price: '₹399 Starting', note: 'Checks thermostat, sensors, fan and cooling performance', badge: 'Popular' },
    { service: 'Refrigerator Gas Leak Inspection', category: 'Refrigerator', price: '₹499 Starting', note: 'Leak test and repair estimate before refrigerant work', badge: 'Diagnosis' },
    { service: 'Refrigerator Gas Charging', category: 'Refrigerator', price: '₹1,499 Starting', note: 'Refrigerant type and quantity depend on model', badge: 'Gas Service' },
    { service: 'Refrigerator Compressor / Relay Repair', category: 'Refrigerator', price: '₹799 Starting', note: 'Component condition confirmed after inspection', badge: 'Repair Support' },
    { service: 'Refrigerator Fan and Sensor Repair', category: 'Refrigerator', price: '₹599 Starting', note: 'Checks evaporator fan, sensors and wiring', badge: 'Repair' },
    { service: 'Refrigerator Cleaning and Drain Service', category: 'Refrigerator', price: '₹499 Starting', note: 'Interior, drain path and accessible condenser cleaning', badge: 'Cleaning' },
    { service: 'Washing Machine General Inspection', category: 'Washing Machine', price: '₹199 Starting', note: 'Checks wash, drain, spin and operating cycle', badge: 'Popular' },
    { service: 'Washing Machine Drum and Spin Repair', category: 'Washing Machine', price: '₹499 Starting', note: 'Checks drum movement, balance and suspension', badge: 'Repair' },
    { service: 'Washing Machine Drainage / Pump Service', category: 'Washing Machine', price: '₹399 Starting', note: 'Checks drain filter, hose and pump operation', badge: 'Service' },
    { service: 'Washing Machine Motor / PCB Diagnosis', category: 'Washing Machine', price: '₹499 Starting', note: 'Fault diagnosis and estimate before repair', badge: 'Diagnosis' },
    { service: 'Washing Machine Inlet Valve and Water Issue', category: 'Washing Machine', price: '₹399 Starting', note: 'Checks inlet hose, valve and water flow', badge: 'Repair' },
    { service: 'Washing Machine Deep Cleaning', category: 'Washing Machine', price: '₹699 Starting', note: 'Drum and accessible tub cleaning; model dependent', badge: 'Cleaning' },
    { service: 'LED / Smart TV General Diagnosis', category: 'LED / LCD TV', price: '₹399 Starting', note: 'Checks power, display and connectivity symptoms', badge: 'Popular' },
    { service: 'TV Power Supply Board Repair', category: 'LED / LCD TV', price: '₹699 Starting', note: 'Component-level estimate after inspection', badge: 'Repair' },
    { service: 'TV Main Board / Motherboard Diagnosis', category: 'LED / LCD TV', price: '₹599 Starting', note: 'Board and component availability confirmed first', badge: 'Diagnosis' },
    { service: 'TV Backlight Repair', category: 'LED / LCD TV', price: '₹999 Starting', note: 'Panel type and screen size affect the estimate', badge: 'Repair' },
    { service: 'TV Sound / Speaker Fault Repair', category: 'LED / LCD TV', price: '₹499 Starting', note: 'Checks speaker, audio board and connections', badge: 'Repair' },
    { service: 'LED TV Wall Mounting and Setup', category: 'LED / LCD TV', price: '₹499 Starting', note: 'Bracket and wall type may be additional', badge: 'Setup' },
    { service: 'Geyser Inspection and Descaling', category: 'Geyser', price: '₹399 Starting', note: 'Tank, heating chamber and safety valve inspection', badge: 'Popular' },
    { service: 'Geyser Heating Element Replacement', category: 'Geyser', price: '₹699 Starting', note: 'Element type and capacity affect parts cost', badge: 'Repair' },
    { service: 'Geyser Thermostat / Thermal Cut-out Repair', category: 'Geyser', price: '₹499 Starting', note: 'Checks temperature control and safety cut-out', badge: 'Repair' },
    { service: 'Geyser Leakage and Valve Diagnosis', category: 'Geyser', price: '₹399 Starting', note: 'Checks inlet, outlet, joints and pressure valve', badge: 'Diagnosis' },
    { service: 'Geyser Electrical Fault Diagnosis', category: 'Geyser', price: '₹499 Starting', note: 'Checks wiring, indicator and power connections', badge: 'Diagnosis' },
    { service: 'Geyser Installation and Setup', category: 'Geyser', price: '₹999 Starting', note: 'Mounting and plumbing/electrical changes may be extra', badge: 'Installation' },
    { service: 'RO / Water Purifier General Service', category: 'Water Purifier', price: '₹399 Starting', note: 'Filter condition, flow, leakage and TDS check', badge: 'Popular' },
    { service: 'RO Filter Replacement Service', category: 'Water Purifier', price: '₹499 Starting', note: 'Filter and membrane cost depends on purifier model', badge: 'Service' },
    { service: 'RO Membrane / Pump Diagnosis', category: 'Water Purifier', price: '₹499 Starting', note: 'Checks pressure, pump and membrane performance', badge: 'Diagnosis' },
    { service: 'Water Purifier Leakage Repair', category: 'Water Purifier', price: '₹399 Starting', note: 'Checks tubing, connectors, tank and valves', badge: 'Repair' },
    { service: 'RO Electrical / Adapter Repair', category: 'Water Purifier', price: '₹399 Starting', note: 'Checks adapter, wiring and control system', badge: 'Repair' },
    { service: 'Water Purifier Installation', category: 'Water Purifier', price: '₹499 Starting', note: 'Basic installation; extra plumbing may cost more', badge: 'Installation' },
    { service: 'Dishwasher General Inspection', category: 'Dishwasher', price: '₹499 Starting', note: 'Checks wash cycle, water intake and drainage', badge: 'Popular' },
    { service: 'Dishwasher Cleaning and Descaling', category: 'Dishwasher', price: '₹599 Starting', note: 'Filter, spray arm and accessible sump cleaning', badge: 'Cleaning' },
    { service: 'Dishwasher Drain Pump Repair', category: 'Dishwasher', price: '₹699 Starting', note: 'Pump and drain path checked before repair', badge: 'Repair' },
    { service: 'Dishwasher Inlet Valve / Water Issue', category: 'Dishwasher', price: '₹599 Starting', note: 'Checks inlet valve, hose and water supply', badge: 'Repair' },
    { service: 'Dishwasher Control Board Diagnosis', category: 'Dishwasher', price: '₹699 Starting', note: 'Electrical diagnosis and estimate before repair', badge: 'Diagnosis' },
    { service: 'Dishwasher Heating / Drying Fault', category: 'Dishwasher', price: '₹799 Starting', note: 'Checks heater, thermostat and drying cycle', badge: 'Repair' },
    { service: 'Kitchen Chimney Inspection and Diagnosis', category: 'Kitchen Chimney', price: '₹299 Starting', note: 'Checks suction, motor, control panel, filters and duct airflow before repair approval', badge: 'Inspection' },
    { service: 'Chimney Deep Chemical Cleaning', category: 'Kitchen Chimney', price: '₹1,249 Starting', note: 'Internal dismantling, filter degreasing and accessible motor-area cleaning; auto-clean and island models may cost more', badge: 'Deep Cleaning' },
    { service: 'Chimney Motor Repair / Replacement Labour', category: 'Kitchen Chimney', price: '₹1,500 Starting', note: 'Motor diagnosis and labour; replacement motor and model-specific parts are quoted separately', badge: 'Motor Repair' },
    { service: 'Chimney PCB / Touch Panel Repair', category: 'Kitchen Chimney', price: '₹899 Starting', note: 'Control board and touch-switch diagnosis; electronic parts are quoted after testing', badge: 'PCB Repair' },
    { service: 'Chimney Suction and Duct Issue Repair', category: 'Kitchen Chimney', price: '₹699 Starting', note: 'Airflow, duct blockage, blower and installation path inspection; duct material extra', badge: 'Suction Repair' },
    { service: 'Kitchen Chimney Installation', category: 'Kitchen Chimney', price: '₹999 Starting', note: 'Ducting, core cutting and extra material may cost more', badge: 'Installation' },
    { service: 'Gas Hob General Inspection', category: 'Gas Stove / Hob', price: '₹199 Starting', note: 'Checks burners, knobs, ignition and visible connections', badge: 'Popular' },
    { service: 'Gas Hob Burner Cleaning', category: 'Gas Stove / Hob', price: '₹349 Starting', note: 'Burner cleaning and jet blockage check', badge: 'Cleaning' },
    { service: 'Auto-Ignition / Spark Plug Repair', category: 'Gas Stove / Hob', price: '₹449 Starting', note: 'Checks pulse generator, switch and spark plug', badge: 'Repair' },
    { service: 'Gas Leakage Safety Check', category: 'Gas Stove / Hob', price: '₹399 Starting', note: 'Leak test and safety inspection; repairs quoted separately', badge: 'Safety' },
    { service: 'Gas Hob Knob / Valve Repair', category: 'Gas Stove / Hob', price: '₹499 Starting', note: 'Valve and spindle condition checked first', badge: 'Repair' },
    { service: 'Built-in Hob Installation', category: 'Gas Stove / Hob', price: '₹999 Starting', note: 'Cut-out, gas line and countertop suitability checked', badge: 'Installation' },
    { service: 'CCTV System Inspection and Diagnosis', category: 'CCTV Camera', price: '₹499 Starting', note: 'Checks camera feed, DVR/NVR, SMPS, cabling, recording and remote access; parts extra', badge: 'Inspection' },
    { service: 'CCTV Camera Installation Labour', category: 'CCTV Camera', price: '₹549 Starting', note: 'Standard-height installation labour per camera; camera, cable, conduit and accessories extra', badge: 'Per Camera' },
    { service: 'CCTV DVR / NVR Installation and Setup', category: 'CCTV Camera', price: '₹1,699 Starting', note: 'Recorder mounting, channel configuration, camera linking and recording test; hardware extra', badge: 'Recorder Setup' },
    { service: 'CCTV Camera Offline / No Video Diagnosis', category: 'CCTV Camera', price: '₹699 Starting', note: 'Checks camera power, SMPS, BNC/RJ45 connectors, cable continuity and video signal', badge: 'Fault Diagnosis' },
    { service: 'CCTV HDD Installation and Recording Setup', category: 'CCTV Camera', price: '₹499 Starting', note: 'HDD fitting labour, formatting and recording test; surveillance hard disk charged separately', badge: 'HDD Setup' },
    { service: 'CCTV Remote Viewing / Mobile App Setup', category: 'CCTV Camera', price: '₹499 Starting', note: 'P2P/network configuration, mobile app pairing and remote-view test on supported devices', badge: 'App Setup' },
    { service: 'Microwave General Inspection', category: 'Microwave Oven', price: '₹199 Starting', note: 'Checks heating, turntable, controls and door operation', badge: 'Popular' },
    { service: 'Microwave Heating / Magnetron Repair', category: 'Microwave Oven', price: '₹999 Starting', note: 'Magnetron and high-voltage components diagnosed first', badge: 'Repair' },
    { service: 'Microwave Diode / Capacitor Repair', category: 'Microwave Oven', price: '₹699 Starting', note: 'Component testing and estimate before replacement', badge: 'Repair' },
    { service: 'Microwave Sparking / Mica Sheet Replacement', category: 'Microwave Oven', price: '₹399 Starting', note: 'Waveguide cover and cavity condition checked', badge: 'Quick Fix' },
    { service: 'Microwave Turntable Motor Repair', category: 'Microwave Oven', price: '₹499 Starting', note: 'Checks motor, coupler and glass tray rotation', badge: 'Repair' },
    { service: 'Microwave Control Panel / PCB Repair', category: 'Microwave Oven', price: '₹799 Starting', note: 'Control panel and board availability checked first', badge: 'Diagnosis' },
  ];

  const normalizedProduct = (productName || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");

  // Whole-word matching avoids "TV" inside "CCTV" and "RO" inside "Microwave".
  const categoryMatchers: Array<[string[], string]> = [
    [["cctv", "cctv camera", "security camera", "surveillance camera"], "CCTV Camera"],
    [["microwave", "microwave oven"], "Microwave Oven"],
    [["washing machine", "washer"], "Washing Machine"],
    [["refrigerator", "fridge"], "Refrigerator"],
    [["air conditioner", "air conditioning", "ac"], "Air Conditioner"],
    [["led tv", "lcd tv", "smart tv", "television", "tv", "led", "lcd"], "LED / LCD TV"],
    [["geyser", "water heater"], "Geyser"],
    [["water purifier", "ro purifier", "ro"], "Water Purifier"],
    [["dishwasher"], "Dishwasher"],
    [["kitchen chimney", "chimney"], "Kitchen Chimney"],
    [["gas stove", "gas hob", "hob", "stove"], "Gas Stove / Hob"],
  ];

  const matchedCategory = categoryMatchers.find(([terms]) =>
    terms.some((term) => new RegExp(`(^|\\s)${term}(?=\\s|$)`, "i").test(normalizedProduct))
  )?.[1];

  const visiblePriceList = matchedCategory
    ? priceList.filter((item) => item.category === "All Appliances" || item.category === matchedCategory)
    : priceList;

  const pricingHeading = productName
    ? `${brandName ? `${brandName} ` : ""}${productName} Service Pricing and Rate Card`
    : "Transparent Pricing and Rate Card";

  return (
    <section id="pricing" className="bg-white py-8 sm:py-12 lg:py-14">
      <div className="mx-auto w-[97.5%] max-w-none px-0">
        <div className="mx-auto mb-6 max-w-3xl text-center sm:mb-8 lg:mb-10">
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-blue-800 sm:text-xs">
            <Icons.Check size={13} /> No Hidden Charges
          </div>
          <h2 className="text-xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">{pricingHeading}</h2>
          <p className="mx-auto mt-2 max-w-2xl text-[10px] leading-relaxed text-slate-600 sm:mt-3 sm:text-sm lg:text-base">
            We believe in complete pricing clarity. You receive a precise cost breakdown before any work starts, with no surprise costs at the end.
          </p>
        </div>

        <div className="overflow-hidden rounded-[2px] border border-slate-200 bg-slate-50 shadow-sm">
          <div className="hidden md:block">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-slate-900 text-[11px] uppercase tracking-wide text-white lg:text-xs">
                    <th className="px-4 py-3 font-bold lg:px-5 lg:py-4">Appliance and Service Scope</th>
                    <th className="hidden px-4 py-3 font-bold lg:table-cell">Category</th>
                    <th className="px-4 py-3 font-bold">Starting Price</th>
                    <th className="hidden px-4 py-3 font-bold lg:table-cell">Inclusions / Scope</th>
                    <th className="px-4 py-3 text-right font-bold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs lg:text-sm">
                  {visiblePriceList.map((item, idx) => (
                    <tr key={idx} className="transition-colors hover:bg-blue-50/60">
                      <td className="px-4 py-3 font-bold leading-snug text-slate-900 lg:px-5 lg:py-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <span>{item.service}</span>
                          {item.badge && <span className="inline-block rounded-full bg-blue-100 px-2 py-0.5 text-[9px] font-extrabold uppercase text-blue-700">{item.badge}</span>}
                        </div>
                        <span className="mt-1 block text-[10px] font-medium text-slate-500 lg:hidden">{item.category}</span>
                        <span className="mt-1 block text-[10px] font-normal leading-relaxed text-slate-500 lg:hidden">{item.note}</span>
                      </td>
                      <td className="hidden px-4 py-3 text-xs text-slate-500 lg:table-cell">{item.category}</td>
                      <td className="whitespace-nowrap px-4 py-3 font-black text-blue-700">{item.price}</td>
                      <td className="hidden px-4 py-3 text-xs leading-relaxed text-slate-600 lg:table-cell">{item.note}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-right">
                        <button onClick={onOpenBooking} className="rounded-[2px] bg-slate-900 px-3 py-2 text-[11px] font-bold text-white transition-colors hover:bg-blue-700 lg:px-3.5 lg:text-xs">Book Visit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2.5 p-2.5 sm:grid-cols-2 sm:gap-3 sm:p-3 md:hidden">
            {visiblePriceList.map((item, idx) => (
              <article key={idx} className="min-w-0 rounded-[2px] border border-slate-200 bg-white p-2.5 shadow-[0_2px_8px_rgba(15,23,42,0.05)]">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="text-[10px] font-extrabold leading-snug text-slate-900 sm:text-sm">{item.service}</h3>
                    <p className="mt-1 text-[9px] font-medium text-slate-500">{item.category}</p>
                  </div>
                  {item.badge && <span className="shrink-0 rounded-full bg-blue-50 px-2 py-1 text-[8px] font-extrabold uppercase leading-tight text-blue-700 sm:text-[9px]">{item.badge}</span>}
                </div>
                <p className="mt-1.5 border-t border-slate-100 pt-1.5 text-[8px] leading-relaxed text-slate-600">{item.note}</p>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <span className="text-xs font-black tracking-tight text-blue-700 sm:text-base">{item.price}</span>
                  <button onClick={onOpenBooking} className="shrink-0 rounded-[2px] bg-slate-900 px-2.5 py-1.5 text-[9px] font-bold text-white transition-colors hover:bg-blue-700 sm:text-xs">Book Visit</button>
                </div>
              </article>
            ))}
          </div>

          <div className="flex flex-col items-start justify-between gap-2 border-t border-slate-200 bg-slate-100/70 px-3 py-2.5 text-[9px] leading-relaxed text-slate-500 sm:flex-row sm:items-center sm:px-4 sm:text-xs">
            <span>* All amounts are indicative starting prices. Final quote depends on model, capacity, fault, access and parts required. We confirm the estimate before work begins.</span>
            <a href={`tel:${siteConfig.phoneRaw}`} className="shrink-0 font-bold text-blue-700 hover:underline">{`Call for exact quote: ${siteConfig.phone}`}</a>
          </div>
        </div>
      </div>
    </section>
  );
};
