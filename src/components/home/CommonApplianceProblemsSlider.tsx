"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

type ProblemSlide = {
  title: string;
  detail: string;
  issues: string[];
  applianceName: string;
};

const applianceSlides: Record<string, ProblemSlide[]> = {
  "Air Conditioner": [
    { title: "AC Not Cooling", detail: "Cooling performance and airflow concerns", issues: ["Weak or no cooling", "Compressor not starting", "Temperature not reaching the set level"], applianceName: "Air Conditioner" },
    { title: "AC Water Leakage", detail: "Indoor unit drainage and water dripping", issues: ["Water dripping indoors", "Blocked drain pipe", "Ice build-up near the coil"], applianceName: "Air Conditioner" },
    { title: "AC Gas and Refrigerant Issue", detail: "Cooling loss and refrigerant-related symptoms", issues: ["Repeated low gas symptoms", "Possible refrigerant leakage", "Pressure and cooling checks"], applianceName: "Air Conditioner" },
    { title: "AC Noise and Vibration", detail: "Unusual sounds from indoor or outdoor unit", issues: ["Rattling or buzzing noise", "Outdoor unit vibration", "Fan or motor noise"], applianceName: "Air Conditioner" },
    { title: "AC Electrical and PCB Fault", detail: "Power, sensor and control-related problems", issues: ["AC not turning on", "Display or error code", "Remote or sensor response issue"], applianceName: "Air Conditioner" },
    { title: "AC Installation and Setup", detail: "New fitting, relocation and setup checks", issues: ["Indoor and outdoor unit fitting", "Drain and pipe routing", "Basic operation check"], applianceName: "Air Conditioner" },
  ],
  Refrigerator: [
    { title: "Refrigerator Not Cooling", detail: "Cooling and temperature control problems", issues: ["Fridge section not cooling", "Freezer cooling issue", "Temperature fluctuating"], applianceName: "Refrigerator" },
    { title: "Compressor and Start Issue", detail: "Compressor operation and starting faults", issues: ["Compressor not starting", "Repeated clicking sound", "Overheating or cut-off"], applianceName: "Refrigerator" },
    { title: "Refrigerator Gas Leakage", detail: "Refrigerant circuit inspection and checks", issues: ["Cooling gradually reduced", "Oil marks near pipe joints", "Repeated gas loss symptoms"], applianceName: "Refrigerator" },
    { title: "Water Leakage and Ice Build-up", detail: "Drain, defrost and excess ice concerns", issues: ["Water below refrigerator", "Excessive freezer ice", "Drain blockage symptoms"], applianceName: "Refrigerator" },
    { title: "Fridge Noise and Vibration", detail: "Fan, motor and cabinet noise concerns", issues: ["Unusual humming or rattling", "Fan hitting ice", "Vibration during operation"], applianceName: "Refrigerator" },
    { title: "PCB, Sensor and Display Fault", detail: "Electronic control and temperature sensor issues", issues: ["Display not responding", "Incorrect temperature reading", "Error or warning indicators"], applianceName: "Refrigerator" },
  ],
  "Washing Machine": [
    { title: "Washing Machine Not Working", detail: "Power, startup and cycle operation faults", issues: ["Machine not turning on", "Cycle stops midway", "Buttons or panel not responding"], applianceName: "Washing Machine" },
    { title: "Spin and Drum Not Rotating", detail: "Drum movement and spin-cycle problems", issues: ["Drum not spinning", "Clothes remain soaking wet", "Uneven or interrupted spin"], applianceName: "Washing Machine" },
    { title: "Excessive Vibration and Noise", detail: "Movement, balancing and mechanical noise", issues: ["Machine shakes during spin", "Loud banging or rattling", "Drum movement feels uneven"], applianceName: "Washing Machine" },
    { title: "Motor and Drive Issues", detail: "Motor, belt and drive-related symptoms", issues: ["Motor hums but drum does not move", "Weak or irregular rotation", "Burning smell or overheating"], applianceName: "Washing Machine" },
    { title: "Water Not Filling or Draining", detail: "Water inlet, outlet and drainage problems", issues: ["Water does not enter", "Water remains in the drum", "Inlet valve or drain blockage symptoms"], applianceName: "Washing Machine" },
    { title: "PCB and Error Code Problems", detail: "Electronic control and program errors", issues: ["Repeated error code", "Cycle selection not working", "Control panel malfunction"], applianceName: "Washing Machine" },
  ],
  Microwave: [
    { title: "Microwave Not Heating", detail: "Heating performance and power output concerns", issues: ["Food remains cold", "Uneven heating", "Heating stops during operation"], applianceName: "Microwave" },
    { title: "Turntable Not Rotating", detail: "Tray movement and roller support issues", issues: ["Glass tray not moving", "Turntable motor noise", "Tray movement is irregular"], applianceName: "Microwave" },
    { title: "Microwave Sparking", detail: "Internal arcing and cavity-related concerns", issues: ["Sparks inside cavity", "Burn marks on waveguide cover", "Unusual burning smell"], applianceName: "Microwave" },
    { title: "Door and Switch Fault", detail: "Door alignment and safety interlock symptoms", issues: ["Door not closing properly", "Microwave will not start", "Door switch response issue"], applianceName: "Microwave" },
    { title: "Display and Keypad Issue", detail: "Control panel and electronic response problems", issues: ["Buttons not responding", "Display flickering", "Timer or settings malfunction"], applianceName: "Microwave" },
    { title: "Microwave Noise and Fan Issue", detail: "Cooling fan and operating sound concerns", issues: ["Loud humming sound", "Fan not running properly", "Unusual vibration"], applianceName: "Microwave" },
  ],
  "LED TV": [
    { title: "TV No Display / Black Screen", detail: "Picture, backlight and screen symptoms", issues: ["Black screen with sound", "No picture after power on", "Flickering or dim display"], applianceName: "LED TV" },
    { title: "TV Not Turning On", detail: "Power supply and startup problems", issues: ["Standby light only", "TV switches off quickly", "No power response"], applianceName: "LED TV" },
    { title: "TV Sound Problems", detail: "Speaker and audio output concerns", issues: ["No sound from speakers", "Distorted or low audio", "Audio-video sync issue"], applianceName: "LED TV" },
    { title: "TV Main Board and PCB Fault", detail: "Main board, ports and control issues", issues: ["TV stuck on logo", "HDMI or USB port issue", "Restarting or hanging"], applianceName: "LED TV" },
    { title: "TV Connectivity and Smart Features", detail: "Wi-Fi, apps and input connectivity concerns", issues: ["Wi-Fi not connecting", "Apps not opening", "Input source not detected"], applianceName: "LED TV" },
    { title: "TV Wall Mounting and Setup", detail: "Mounting, bracket and cable arrangement", issues: ["Wall bracket fitting", "TV leveling and placement", "Cable routing and setup"], applianceName: "LED TV" },
  ],
  "Gas Hob": [
    { title: "Gas Hob Not Igniting", detail: "Ignition, spark and burner startup concerns", issues: ["No spark from igniter", "Burner not lighting", "Repeated clicking sound"], applianceName: "Gas Hob" },
    { title: "Low Flame and Uneven Burning", detail: "Flame strength and burner performance", issues: ["Weak or yellow flame", "Uneven burner flame", "Flame goes out repeatedly"], applianceName: "Gas Hob" },
    { title: "Gas Leakage Concern", detail: "Safety-first inspection of suspected gas leaks", issues: ["Gas smell near hob", "Loose or worn connection symptoms", "Shut-off and inspection required"], applianceName: "Gas Hob" },
    { title: "Burner Blockage and Cleaning", detail: "Burner cap, ports and flame distribution", issues: ["Blocked burner holes", "Uneven flame pattern", "Food or grease build-up"], applianceName: "Gas Hob" },
    { title: "Knob and Valve Problems", detail: "Control knob and gas valve operation", issues: ["Knob stuck or loose", "Gas flow not adjusting", "Valve operation concern"], applianceName: "Gas Hob" },
    { title: "Hob Glass and Electrical Fault", detail: "Surface, wiring and ignition module concerns", issues: ["Ignition switch not responding", "Cracked or damaged glass concern", "Power supply issue"], applianceName: "Gas Hob" },
  ],
  Geyser: [
    { title: "Geyser Not Heating", detail: "Heating element and thermostat symptoms", issues: ["Water remains cold", "Slow water heating", "Heating cuts off early"], applianceName: "Geyser" },
    { title: "Geyser Water Leakage", detail: "Tank, inlet and outlet connection concerns", issues: ["Water dripping from unit", "Pipe joint leakage", "Pressure valve discharge"], applianceName: "Geyser" },
    { title: "Geyser Electrical Issue", detail: "Power supply and safety component checks", issues: ["Indicator not turning on", "MCB trips during use", "Power switch not responding"], applianceName: "Geyser" },
    { title: "Geyser Noise and Pressure", detail: "Heating noise and water flow concerns", issues: ["Popping or rumbling noise", "Low hot-water flow", "Pressure fluctuation"], applianceName: "Geyser" },
    { title: "Thermostat and Sensor Fault", detail: "Temperature control and cut-off issues", issues: ["Water overheats", "Temperature inconsistent", "Thermal cut-off symptoms"], applianceName: "Geyser" },
    { title: "Geyser Installation and Setup", detail: "Mounting, plumbing and safe setup checks", issues: ["New geyser fitting", "Inlet and outlet connections", "Basic heating and safety check"], applianceName: "Geyser" },
  ],
  CCTV: [
    { title: "CCTV Camera No Display", detail: "Camera feed, power and video signal concerns", issues: ["Camera feed offline", "Black or distorted picture", "Power supply issue"], applianceName: "CCTV" },
    { title: "CCTV Recording Problem", detail: "DVR/NVR storage and recording checks", issues: ["No footage saved", "Hard drive not detected", "Recording schedule issue"], applianceName: "CCTV" },
    { title: "CCTV Night Vision Fault", detail: "IR LEDs and low-light image performance", issues: ["Dark night footage", "IR light not switching", "Blurred low-light image"], applianceName: "CCTV" },
    { title: "DVR / NVR Network Issue", detail: "Remote viewing and network configuration", issues: ["Mobile viewing unavailable", "Device offline", "Network or IP configuration issue"], applianceName: "CCTV" },
    { title: "CCTV Wiring and Connection", detail: "Cable, connector and signal continuity", issues: ["Intermittent camera feed", "Loose BNC or power connector", "Cable damage symptoms"], applianceName: "CCTV" },
    { title: "CCTV Installation and Setup", detail: "Camera placement and system configuration", issues: ["Camera positioning", "DVR/NVR setup", "Recording and remote-view test"], applianceName: "CCTV" },
  ],
  "Water Purifier": [
    { title: "RO Low Water Flow", detail: "Pressure, pump and filter-related flow problems", issues: ["Slow purified water flow", "Choked sediment or carbon filter", "Pump or low-pressure symptoms"], applianceName: "Water Purifier" },
    { title: "Purifier Water Leakage", detail: "Tubing, connector and tank leakage concerns", issues: ["Water dripping below the unit", "Loose tube or fitting", "Tank or valve leakage"], applianceName: "Water Purifier" },
    { title: "Bad Taste or High TDS", detail: "Filter, membrane and water quality concerns", issues: ["Salty or unusual taste", "TDS reading not reducing", "Old filter or membrane"], applianceName: "Water Purifier" },
    { title: "Purifier Not Starting", detail: "Adapter, pump and electrical faults", issues: ["No power or indicator", "Pump not running", "Adapter or SMPS fault"], applianceName: "Water Purifier" },
    { title: "Filter and Membrane Replacement", detail: "Scheduled service and consumables", issues: ["Filter change reminder", "Membrane replacement", "Sanitisation and general service"], applianceName: "Water Purifier" },
    { title: "Purifier Installation and Setup", detail: "New fitting and plumbing checks", issues: ["Wall mounting", "Inlet and drain connection", "Flow and TDS test"], applianceName: "Water Purifier" },
  ],
  Dishwasher: [
    { title: "Dishwasher Not Draining", detail: "Drain pump, hose and filter concerns", issues: ["Water remains after cycle", "Blocked filter or hose", "Drain pump not running"], applianceName: "Dishwasher" },
    { title: "Dishes Not Coming Out Clean", detail: "Spray arm, filter and water-supply issues", issues: ["Food residue on dishes", "Clogged spray arms", "Low water pressure"], applianceName: "Dishwasher" },
    { title: "Dishwasher Not Heating or Drying", detail: "Heater, thermostat and drying cycle faults", issues: ["Dishes stay wet", "Water does not heat", "Thermostat or heater symptoms"], applianceName: "Dishwasher" },
    { title: "Dishwasher Not Starting", detail: "Door latch, control and power problems", issues: ["Cycle will not start", "Door latch not detected", "Control board fault"], applianceName: "Dishwasher" },
    { title: "Dishwasher Water Leakage", detail: "Door seal, hose and inlet leaks", issues: ["Water under the unit", "Worn door gasket", "Inlet hose or valve leak"], applianceName: "Dishwasher" },
    { title: "Dishwasher Installation and Setup", detail: "Inlet, drain and placement checks", issues: ["Built-in placement", "Water and drain connection", "First cycle test"], applianceName: "Dishwasher" },
  ],
  Laptop: [
    { title: "Laptop Not Turning On", detail: "Startup, adapter and power symptoms", issues: ["No power response", "Charging light not working", "Unexpected shutdown"], applianceName: "Laptop" },
    { title: "Laptop Slow Performance", detail: "Boot, software and storage performance", issues: ["Slow startup", "System freezes", "Applications not responding"], applianceName: "Laptop" },
    { title: "Laptop Display Problem", detail: "Screen, backlight and display output", issues: ["Black or flickering screen", "Lines on display", "External display not detected"], applianceName: "Laptop" },
    { title: "Laptop Battery and Charging", detail: "Battery health and charging connection", issues: ["Battery not charging", "Fast battery drain", "Adapter or charging port issue"], applianceName: "Laptop" },
    { title: "Laptop Keyboard and Touchpad", detail: "Input device and connection symptoms", issues: ["Keys not responding", "Touchpad not working", "Intermittent input"], applianceName: "Laptop" },
    { title: "Laptop Heating and Fan Noise", detail: "Cooling, airflow and thermal concerns", issues: ["Excessive heating", "Fan running loudly", "Unexpected thermal shutdown"], applianceName: "Laptop" },
  ],
  "Kitchen Chimney": [
    { title: "Chimney Low Suction", detail: "Airflow and extraction performance concerns", issues: ["Smoke not extracting", "Weak suction", "Filter or duct blockage symptoms"], applianceName: "Kitchen Chimney" },
    { title: "Chimney Motor Not Working", detail: "Motor startup and operating faults", issues: ["Motor not starting", "Intermittent operation", "Unusual motor noise"], applianceName: "Kitchen Chimney" },
    { title: "Chimney Noise and Vibration", detail: "Fan, blower and mounting noise concerns", issues: ["Excessive vibration", "Rattling during operation", "Fan imbalance symptoms"], applianceName: "Kitchen Chimney" },
    { title: "Chimney Touch and Switch Fault", detail: "Control panel and speed setting problems", issues: ["Touch panel not responding", "Speed settings not changing", "Switch or display issue"], applianceName: "Kitchen Chimney" },
    { title: "Chimney Light Not Working", detail: "Lighting and electrical connection issues", issues: ["LED light not turning on", "Flickering light", "Loose connection symptoms"], applianceName: "Kitchen Chimney" },
    { title: "Chimney Cleaning and Filter Care", detail: "Grease build-up and filter maintenance", issues: ["Grease on baffle filters", "Oil build-up inside hood", "Cleaning and filter inspection"], applianceName: "Kitchen Chimney" },
  ],
};

const applianceMeta = [
  { name: "Air Conditioner", label: "AIR CONDITIONER", icon: "❄️" },
  { name: "Refrigerator", label: "REFRIGERATOR", icon: "🧊" },
  { name: "Washing Machine", label: "WASHING MACHINE", icon: "🫧" },
  { name: "Microwave", label: "MICROWAVE OVEN", icon: "🍲" },
  { name: "LED TV", label: "LED / LCD TV", icon: "📺" },
  { name: "Kitchen Chimney", label: "KITCHEN CHIMNEY", icon: "♨️" },
  { name: "Gas Hob", label: "GAS HOB / STOVE", icon: "🔥" },
  { name: "Geyser", label: "WATER HEATER", icon: "♨️" },
  { name: "Water Purifier", label: "WATER PURIFIER", icon: "💧" },
  { name: "Dishwasher", label: "DISHWASHER", icon: "🍽️" },
  { name: "CCTV", label: "CCTV CAMERA", icon: "📹" },
  { name: "Laptop", label: "LAPTOP", icon: "💻" },
];

const productKey = (value?: string) => {
  const product = (value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  // CCTV must be resolved before TV: the letters "tv" occur at the end of "cctv".
  if (product.includes("cctv") || product.includes("surveillance camera")) return "CCTV";
  if (product.includes("led tv") || product.includes("lcd tv") || product.includes("smart tv") || /(^|\s)tv($|\s)/.test(product) || product.includes("television")) return "LED TV";
  if (product.includes("refrigerator") || product.includes("fridge")) return "Refrigerator";
  if (product.includes("washing")) return "Washing Machine";
  if (product.includes("microwave")) return "Microwave";
  if (product.includes("chimney")) return "Kitchen Chimney";
  if (product.includes("gas hob") || product.includes("gas stove") || product.includes("hob")) return "Gas Hob";
  if (product.includes("geyser") || product.includes("water heater")) return "Geyser";
  if (product.includes("water purifier") || product.includes("ro purifier") || /(^|\s)ro($|\s)/.test(product)) return "Water Purifier";
  if (product.includes("dishwasher")) return "Dishwasher";
  if (product.includes("laptop") || product.includes("computer")) return "Laptop";
  if (product.includes("air conditioner") || /(^|\s)ac($|\s)/.test(product) || product.includes("air conditioner")) return "Air Conditioner";
  return undefined;
};

export const CommonApplianceProblemsSlider: React.FC<{
  onOpenBooking?: (applianceName?: string) => void;
  cityName?: string;
  productName?: string;
  brandName?: string;
  theme?: "dark" | "light";
}> = ({ onOpenBooking, cityName, productName, brandName, theme = "light" }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const pauseRef = useRef(false);
  const [guideSlide, setGuideSlide] = useState<ProblemSlide | null>(null);
  const selectedProduct = productKey(productName);

  const slides = useMemo<ProblemSlide[]>(() => {
    if (selectedProduct) return applianceSlides[selectedProduct];
    return applianceMeta.map((item) => ({
      title: `${item.name} Problems`,
      detail: `Common ${item.name.toLowerCase()} faults and service symptoms`,
      issues: item.name === "Washing Machine"
        ? ["Not spinning", "Water not draining", "Error code issues"]
        : item.name === "LED TV"
          ? ["No display or black screen", "Sound not working", "Power on/off issue"]
          : ["Performance or operation issue", "Unusual noise or vibration", "Control or component fault"],
      applianceName: item.name,
    }));
  }, [selectedProduct]);

  const move = useCallback((direction: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-problem-card]");
    if (!card) return;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap || "16") || 16;
    const max = track.scrollWidth - track.clientWidth;
    if (direction > 0 && track.scrollLeft >= max - 4) track.scrollTo({ left: 0, behavior: "smooth" });
    else if (direction < 0 && track.scrollLeft <= 4) track.scrollTo({ left: max, behavior: "smooth" });
    else track.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: "smooth" });
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (!pauseRef.current) move(1);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [move]);

  const dark = theme === "dark";
  const sectionClass = dark ? "bg-[#071b3b] text-white" : "bg-slate-50 text-slate-900";
  const badgeClass = dark ? "border-sky-400/80 bg-blue-900/40 text-sky-200" : "border-blue-200 bg-blue-50 text-blue-700";
  const headingClass = dark ? "text-white" : "text-slate-900";
  const subTextClass = dark ? "text-blue-100/90" : "text-slate-600";
  const cardClass = dark
    ? "border-blue-400/80 bg-gradient-to-br from-[#123d78] via-[#0b2b58] to-[#061a39] text-white shadow-[0_8px_24px_rgba(15,23,42,0.16)]"
    : "border-slate-200 bg-white text-slate-800 shadow-[0_5px_18px_rgba(15,23,42,0.07)]";
  const issueTextClass = dark ? "text-blue-50" : "text-slate-600";
  const issueCheckClass = dark ? "bg-sky-500/20 text-cyan-300" : "bg-emerald-50 text-emerald-600";
  const iconWrapClass = dark ? "border-blue-300/30 bg-blue-400/10" : "border-blue-100 bg-blue-50";
  const iconTextClass = dark ? "text-sky-200/80" : "text-blue-600";
  const buttonClass = dark
    ? "border-cyan-400 text-white hover:bg-cyan-500 hover:text-[#061a39]"
    : "border-blue-600 bg-blue-600 text-white hover:bg-blue-700";

  return (
    <section aria-labelledby="common-problems-heading" className={`relative overflow-hidden py-7 sm:py-9 lg:py-11 ${sectionClass}`}>
      {dark && <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(22,105,210,0.24),transparent_60%)]" />}
      <div className="relative mx-auto w-full max-w-[1600px] px-[2.5%]">
        <div className="mb-4 text-center sm:mb-7 lg:mb-8">
          <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[9px] font-extrabold tracking-wide sm:px-4 sm:py-2 sm:text-xs ${badgeClass}`}>
            <span aria-hidden="true">🔧</span> COMMON APPLIANCE PROBLEMS WE SOLVE
          </span>
          <h2 id="common-problems-heading" className={`mt-2.5 text-xl font-black tracking-tight sm:mt-4 sm:text-3xl lg:text-[42px] ${headingClass}`}>
            {`${brandName && productName ? `${brandName} ${productName} Problems` : productName ? `${productName} Problems` : "Common Appliance Problems"} `}<span className={dark ? "text-cyan-400" : "text-blue-600"}>{cityName ? `in ${cityName}` : "We Solve"}</span>
          </h2>
          <p className={`mx-auto mt-2 max-w-3xl text-xs leading-relaxed sm:mt-3 sm:text-base lg:text-lg ${subTextClass}`}>
            {cityName
              ? `Explore common ${brandName ? `${brandName} ` : ""}${productName ? `${productName.toLowerCase()} ` : "appliance "}issues and available repair support for homes in ${cityName}.`
              : productName
                ? `Explore common ${brandName ? `${brandName} ` : ""}${productName.toLowerCase()} faults, symptoms and repair support options.`
                : "Explore common appliance faults, symptoms and repair support options for your home."}
          </p>
        </div>

        <div className="relative">
          <button type="button" aria-label="Previous appliance problems" onClick={() => move(-1)} className={`absolute -left-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-md border text-xl shadow transition sm:flex lg:-left-4 ${dark ? "border-blue-300/30 bg-[#071329]/95 text-white hover:border-cyan-400 hover:bg-blue-800" : "border-slate-200 bg-white text-slate-700 hover:border-blue-400 hover:bg-blue-50"}`}>‹</button>
          <div
            ref={trackRef}
            onMouseEnter={() => { pauseRef.current = true; }}
            onMouseLeave={() => { pauseRef.current = false; }}
            onTouchStart={() => { pauseRef.current = true; }}
            onTouchEnd={() => { pauseRef.current = false; }}
            className="problem-slider-track flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-4 lg:gap-5"
          >
            {slides.map((slide, index) => {
              const meta = applianceMeta.find((item) => item.name === slide.applianceName);
              return (
                <article data-problem-card key={`${slide.applianceName}-${slide.title}-${cityName || ""}`} className={`group relative flex min-h-[190px] w-[88%] shrink-0 snap-center overflow-hidden rounded-lg border p-3 transition duration-300 hover:-translate-y-1 sm:w-[calc((100%-16px)/2)] sm:min-h-[220px] sm:rounded-xl sm:p-5 lg:w-[calc((100%-40px)/3)] lg:min-h-[238px] ${cardClass} ${dark ? "hover:border-cyan-300 hover:shadow-[0_14px_36px_rgba(0,126,255,0.2)]" : "hover:border-blue-300 hover:shadow-[0_12px_28px_rgba(37,99,235,0.12)]"}`}>
                  <div className={`relative flex w-[29%] shrink-0 flex-col items-center justify-center border-r pr-2 sm:w-[30%] sm:pr-4 ${dark ? "border-blue-300/25" : "border-slate-200"}`}>
                    <div className={`flex h-14 w-14 items-center justify-center rounded-xl border text-4xl sm:h-20 sm:w-20 sm:rounded-2xl sm:text-5xl ${iconWrapClass}`}>{meta?.icon || "🔧"}</div>
                    <span className={`mt-2 text-center text-[7px] font-extrabold tracking-[0.08em] sm:text-[9px] ${iconTextClass}`}>{meta?.label || slide.applianceName.toUpperCase()}</span>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-center pl-3 sm:pl-4">
                    <h3 className={`text-[13px] font-extrabold leading-snug sm:text-base lg:text-lg ${headingClass}`}>
                      {`${brandName ? `${brandName} ` : ""}${slide.title}${cityName ? ` in ${cityName}` : ""}`}
                    </h3>
                    <p className={`mt-1 text-[10px] leading-snug sm:text-xs ${subTextClass}`}>{slide.detail}</p>
                    <ul className={`mt-2 space-y-1.5 text-[10px] leading-snug sm:mt-3 sm:space-y-2 sm:text-xs lg:text-[13px] ${issueTextClass}`}>
                      {slide.issues.map((issue) => <li key={issue} className="flex items-start gap-2"><span className={`mt-px flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-black ${issueCheckClass}`}>✓</span><span>{issue}</span></li>)}
                    </ul>
                    <div className="mt-3 flex flex-row flex-nowrap items-center gap-1.5 sm:mt-4 sm:gap-2">
                      <button type="button" onClick={() => onOpenBooking?.(slide.applianceName)} className={`shrink-0 rounded-full border px-2.5 py-2 text-[10px] font-extrabold leading-none transition sm:px-3.5 sm:py-2.5 sm:text-xs ${buttonClass}`}>Raise a Query <span aria-hidden="true">→</span></button>
                      <button type="button" onClick={() => setGuideSlide(slide)} className={`group inline-flex min-w-0 flex-1 items-center justify-center gap-1 rounded-full border px-2 py-2 text-[9px] font-bold leading-none transition sm:gap-1.5 sm:px-3 sm:py-2.5 sm:text-xs ${dark ? "border-cyan-300/25 text-cyan-200 hover:bg-white/10" : "border-blue-100 bg-blue-50/70 text-blue-700 hover:border-blue-300 hover:bg-blue-100"}`}>
                        <span aria-hidden="true" className="issue-touch-animation inline-block shrink-0">👆</span>
                        <span className="truncate">Understand this issue</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <button type="button" aria-label="Next appliance problems" onClick={() => move(1)} className={`absolute -right-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-md border text-xl shadow transition sm:flex lg:-right-4 ${dark ? "border-blue-300/30 bg-[#071329]/95 text-white hover:border-cyan-400 hover:bg-blue-800" : "border-slate-200 bg-white text-slate-700 hover:border-blue-400 hover:bg-blue-50"}`}>›</button>
        </div>
        <div className={`mt-2 flex items-center justify-center gap-2 sm:hidden ${dark ? "text-blue-200/70" : "text-slate-500"}`}>
          <span className="text-[10px] font-medium">Swipe to explore</span><span className={dark ? "text-cyan-300" : "text-blue-600"} aria-hidden="true">⟷</span>
        </div>
      </div>

      {guideSlide && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/65 p-3 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="problem-guide-title"
          onMouseDown={(event) => { if (event.target === event.currentTarget) setGuideSlide(null); }}
        >
          <div className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-slate-200 bg-white p-4 text-slate-800 shadow-2xl sm:p-6">
            <button type="button" aria-label="Close issue guide" onClick={() => setGuideSlide(null)} className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xl text-slate-600 hover:bg-slate-200">×</button>
            <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide text-blue-700">Free troubleshooting guide</span>
            <h3 id="problem-guide-title" className="mt-3 pr-9 text-xl font-black leading-tight text-slate-900 sm:text-2xl">
              {`${brandName ? `${brandName} ` : ""}${guideSlide.title}${cityName ? ` in ${cityName}` : ""}`}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {`${guideSlide.title.toLowerCase().includes("cooling")
                ? "Cooling problems can be caused by restricted airflow, dirty filters or coils, incorrect temperature settings, a door-seal problem, sensor trouble, or a fault in the cooling system."
                : guideSlide.title.toLowerCase().includes("leak")
                  ? "Leakage may come from a blocked drain, loose water connection, damaged seal, overflowing tray, or — in gas/refrigerant-related cases — a system fault that needs professional inspection."
                  : guideSlide.title.toLowerCase().includes("spin") || guideSlide.title.toLowerCase().includes("drum") || guideSlide.title.toLowerCase().includes("vibration")
                    ? "Spin and vibration issues often relate to an unbalanced load, an uneven floor, an obstructed drum, worn suspension parts, or a motor/drive problem."
                    : guideSlide.title.toLowerCase().includes("display") || guideSlide.title.toLowerCase().includes("board") || guideSlide.title.toLowerCase().includes("pcb") || guideSlide.title.toLowerCase().includes("electrical")
                      ? "Display and electrical symptoms may be caused by an unstable power supply, loose external connection, control setting, sensor, or an internal board/component fault."
                      : guideSlide.title.toLowerCase().includes("heating")
                        ? "Heating problems may be linked to incorrect settings, restricted airflow, a safety cut-off, thermostat/sensor trouble, or a heating component fault."
                        : guideSlide.title.toLowerCase().includes("motor") || guideSlide.title.toLowerCase().includes("compressor")
                          ? "Motor or compressor symptoms can be related to power supply, starting components, overheating, mechanical wear, or a control-system issue."
                          : "This problem may be caused by settings, blocked airflow or drainage, dirt build-up, loose external connections, normal wear, or a component fault. The exact cause depends on the model and symptoms."}The exact cause should be confirmed from the appliance model and an inspection.`}</p>
            <div className="mt-5 rounded-lg border border-blue-100 bg-blue-50/70 p-4">
              <h4 className="text-sm font-extrabold text-slate-900">Common signs to look for</h4>
              <ul className="mt-2 space-y-2 text-sm text-slate-700">
                {guideSlide.issues.map((issue) => <li key={issue} className="flex gap-2"><span className="font-black text-blue-600">✓</span><span>{issue}</span></li>)}
              </ul>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-extrabold text-slate-900">A few safe things you can try</h4>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-600">
                <li>Switch the appliance off and check the user manual for the relevant warning or error indicator.</li>
                <li>For an accessible filter, drain tray or air vent, check for visible dust or blockage and clean only as the manual allows.</li>
                <li>Check that the plug, socket, water tap or remote settings are normal, where applicable.</li>
              </ul>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <h4 className="text-sm font-extrabold text-slate-900">Why this issue can happen</h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  The symptom can have more than one cause. It may be related to normal wear, dust or grease build-up, a blocked air or water path, unstable power, a loose external connection, incorrect settings, or a component that is no longer working within its normal range. The appliance model, age and exact symptom help narrow it down.
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <h4 className="text-sm font-extrabold text-slate-900">What a technician checks</h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  A proper visit starts with the model and symptom history, followed by a visual inspection and relevant operating tests. The technician should explain the likely fault, whether parts are needed, the expected cost and the work scope before starting. No component should be replaced without your approval.
                </p>
              </div>
            </div>
            <div className="mt-3 rounded-lg border border-emerald-100 bg-emerald-50/70 p-3">
              <h4 className="text-sm font-extrabold text-slate-900">Before you book</h4>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                Keep the brand and model number handy, note when the problem started, and share any error code or indicator pattern. A clear photo or short video of the symptom can help with the first assessment. Do not keep restarting an appliance that smells burnt, trips the breaker, leaks near electrical parts or makes severe mechanical noise.
              </p>
            </div>
            <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-900">
              <strong>Safety first:</strong> Do not open electrical panels, handle refrigerant or gas lines, bypass safety switches, or attempt internal repairs. If you notice a gas smell, sparks, smoke, overheating or water near electrical parts, switch off the supply if it is safe and contact a qualified professional.
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              If these basic checks do not help, no problem — you do not need to keep experimenting. Contact Service Support Hub for guided troubleshooting and a clear repair estimate before any work begins.
            </p>
            <div className="mt-5 flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => setGuideSlide(null)} className="rounded-md border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50">Close Guide</button>
              <button type="button" onClick={() => { const appliance = guideSlide.applianceName; setGuideSlide(null); onOpenBooking?.(appliance); }} className="rounded-md bg-red-600 px-5 py-2.5 text-sm font-extrabold text-white hover:bg-red-700">Still Need Help? Raise a Query →</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
