export interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  features: string[];
  issuesHandled: {
    title: string;
    description: string;
  }[];
  priceStarting: string;
  image: string;
  warranty: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: "chimney-repair",
    slug: "chimney-repair",
    name: "Kitchen Chimney Repair and Cleaning",
    tagline: "High Suction Restored • Deep Degreasing • Motor and PCB Fix",
    shortDescription:
      "Expert doorstep diagnosis, filter degreasing, motor noise fixing, PCB replacement, and comprehensive suction restoration for all chimney brands.",
    fullDescription:
      "A kitchen chimney is crucial to keeping your cooking space free from grease, pungent fumes, and sticky oil residues. Over time, grease accumulates in the baffle filters, blowers, and auto-clean oil collector chambers, drastically diminishing suction power and causing noisy motor vibrations. Our certified technicians provide deep chemical degreasing, circuit repairs, touch switch replacement, and genuine motor replacements with up to 90 days warranty.",
    iconName: "chimney",
    features: [
      "Low Suction and Smoke Backflow Rectification",
      "Auto-Clean Heating Coil and Oil Cup Repair",
      "Motor Humming, Screeching and Vibration Fix",
      "Touch Screen and Gesture Control PCB Repair",
      "Chemical Filter Deep Cleaning and Degreasing",
      "Exhaust Duct Pipe Installation and Replacement",
    ],
    issuesHandled: [
      {
        title: "Chimney Not Sucking Smoke / Low Suction",
        description:
          "Clogged baffle filters, jammed centrifugal blowers, or duct blockages cause smoke and oil vapors to linger in your kitchen.",
      },
      {
        title: "Loud Noise or Motor Screeching",
        description:
          "Worn-out motor bearings, unbalanced impeller blades, or dry fan shafts cause irritating sounds during operation.",
      },
      {
        title: "Auto-Clean Function Failure",
        description:
          "Burnt heating elements or broken thermostat circuits prevent thermal melting and oil drainage into the collection tray.",
      },
      {
        title: "Touch Sensor or Speed Control Not Working",
        description:
          "Faulty PCB capacitors, damp touch sensors, or broken push buttons stopping chimney speed variation.",
      },
    ],
    priceStarting: "₹299",
    image: "/images/chimney-service.webp",
    warranty: "30-Day Service Guarantee",
  },
  {
    id: "gas-stove-repair",
    slug: "gas-stove-repair",
    name: "Gas Hob and Stove Repair",
    tagline: "Burner Cleaning • Auto-Ignition Fix • Gas Leakage Safety",
    shortDescription:
      "Safe, doorstep repair for built-in glass hobs, stainless steel cooktops, low yellow flames, continuous clicking ignition, and faulty valves.",
    fullDescription:
      "Gas hobs and cooking stoves demand prompt, meticulous care to ensure kitchen safety and optimal cooking efficiency. We handle jammed control knobs, low yellow soot-producing flames, faulty piezoelectric or pulse spark igniters, and urgent gas smell safety inspections. Our technicians carry genuine multi-point brass burners, micro-switches, and safety valves.",
    iconName: "flame",
    features: [
      "Auto-Ignition Pulse Unit and Spark Plug Repair",
      "Low Flame and Uneven Burner Cleaning / Decarbonizing",
      "Gas Smell / Regulator Valve Leak Safety Check",
      "Jammed Knob Lubrication and Valve Spindle Replacement",
      "Toughened Glass-Top Inspection and Realignment",
      "LPG to PNG (Piped Natural Gas) Conversion",
    ],
    issuesHandled: [
      {
        title: "Burner Won't Ignite or Continuous Spark Clicking",
        description:
          "Moisture under the knob, malfunctioning pulse generator box, or carbonized spark electrode pins preventing reliable ignition.",
      },
      {
        title: "Low Yellow Flame and Blackened Cookware",
        description:
          "Blocked jet nozzles, incorrect air-to-gas ratio, or clogged brass burner ports wasting gas and sooting utensils.",
      },
      {
        title: "Gas Odour / Leaking Valve Spindle",
        description:
          "Worn-out rubber O-rings, loose hose clamps, or cracked internal manifold pipes requiring immediate safety intervention.",
      },
      {
        title: "Control Knobs Hard to Turn or Stuck",
        description:
          "Burnt cooking oil seepage stiffening the brass gas cock mechanism, resolved through chemical cleaning and heat-resistant regreasing.",
      },
    ],
    priceStarting: "₹249",
    image: "/images/hob-service.webp",
    warranty: "30-Day Service Guarantee",
  },
  {
    id: "microwave-repair",
    slug: "microwave-repair",
    name: "Microwave Oven Repair",
    tagline: "Solo, Grill and Convection • Heating Faults • Magnetron and PCB",
    shortDescription:
      "Prompt doorstep diagnosis for microwaves not heating food, sparking inside, non-rotating glass trays, broken keypads, and power trip faults.",
    fullDescription:
      "When your microwave oven stops warming meals or creates alarming electrical sparking inside the cavity, quick professional diagnosis is vital. We service Solo, Grill, and Convection microwave ovens across all leading brands. From burnt mica waveguide covers and faulty magnetrons to unresponsive touch membranes, our repair team restores your appliance quickly and safely.",
    iconName: "microwave",
    features: [
      "Oven Running but Not Heating (Magnetron/Diode)",
      "Sparking / Arcing Inside Cavity (Waveguide Mica Sheet)",
      "Turntable Glass Plate Not Rotating (Motor/Ring)",
      "Touch Keypad / Membrane Membrane Failure Fix",
      "Door Latch Sensor and Microswitch Replacement",
      "Main PCB Board and Inverter Circuit Servicing",
    ],
    issuesHandled: [
      {
        title: "Microwave Turns On But Food Remains Cold",
        description:
          "Blown high-voltage fuse, defective magnetron tube, or shorted high-voltage diode preventing radio wave generation.",
      },
      {
        title: "Sparks and Crackling Noise Inside the Cavity",
        description:
          "Damaged mica sheet wave cover contaminated with food splatter causing electrical arcing against the metal chamber.",
      },
      {
        title: "Glass Turntable Plate Won't Spin",
        description:
          "Stripped turntable coupling, burnt 21V synchronous drive motor, or misaligned roller guide ring preventing smooth rotation.",
      },
      {
        title: "Buttons Not Working / Display Error Codes",
        description:
          "Worn flexible ribbon cables, burnt relay switches on the micro-controller board, or failed capacitive touch membrane.",
      },
    ],
    priceStarting: "₹299",
    image: "/images/microwave-service.webp",
    warranty: "30-Day Service Guarantee",
  },
];

export interface HowItWorksStep {
  step: string;
  title: string;
  description: string;
  icon: string;
}

export const howItWorksSteps: HowItWorksStep[] = [
  {
    step: "01",
    title: "Request Online or via WhatsApp",
    description:
      "Select your kitchen appliance, describe the problem, and pick your preferred doorstep time slot or tap for instant WhatsApp booking.",
    icon: "clipboard-list",
  },
  {
    step: "02",
    title: "Doorstep Visit and Detailed Diagnosis",
    description:
      "Our certified technician reaches your doorstep within 60–90 minutes equipped with diagnostic tools to inspect the root cause.",
    icon: "user-check",
  },
  {
    step: "03",
    title: "Upfront Estimate and Customer Approval",
    description:
      "We explain the exact issue and provide a transparent, fixed quotation. Repair work begins ONLY after your explicit approval.",
    icon: "receipt",
  },
  {
    step: "04",
    title: "Precision Repair and 30-Day Warranty",
    description:
      "Your appliance is restored with 100% genuine spares, safety-checked, and backed by our hassle-free 30-day service guarantee.",
    icon: "shield-check",
  },
];

export interface WhyChooseUsItem {
  title: string;
  description: string;
  icon: string;
}

export const whyChooseUs: WhyChooseUsItem[] = [
  {
    title: "Same-Day Doorstep Service",
    description:
      "No waiting for days. Our localized technician network arrives within 60 to 90 minutes across all city sectors.",
    icon: "clock",
  },
  {
    title: "100% Genuine Spare Parts",
    description:
      "We source authentic OEM components and brand-compatible spares to guarantee long appliance lifespan.",
    icon: "cpu",
  },
  {
    title: "Clear, Upfront Pricing",
    description:
      "Zero hidden fees. You receive a comprehensive cost breakdown before any repair commences.",
    icon: "badge-percent",
  },
  {
    title: "30-Day Service Warranty with Terms and Conditions",
    description:
      "Rest easy with our 30-day warranty on workmanship and replaced replacement components.",
    icon: "shield",
  },
  {
    title: "Background-Verified Technicians",
    description:
      "Every field professional undergoes strict identity checks, technical vetting, and safety compliance training.",
    icon: "award",
  },
  {
    title: "Multi-Brand Proficiency",
    description:
      "Hands-on experience across Faber, Elica, Glen, Kaff, Hindware, Bosch, Whirlpool, IFB, Prestige and more.",
    icon: "tool",
  },
];

export interface FaqItem {
  question: string;
  answer: string;
  category: "General" | "Chimney" | "Gas Stove" | "Microwave";
}

export const faqsData: FaqItem[] = [
  {
    category: "General",
    question: "How quickly can a technician reach my home?",
    answer:
      "Under standard conditions, our verified technician reaches your doorstep within 60 to 90 minutes of booking confirmation. You can also schedule an appointment for any preferred date and time slot that suits your daily schedule.",
  },
  {
    category: "General",
    question: "How do your service charges and diagnostic fees work?",
    answer:
      "We charge a minimal inspection/visiting fee (starting from ₹199 to ₹299 depending on the appliance). If you proceed with the repair work, this visiting charge is adjusted within the final repair invoice, making the inspection virtually free!",
  },
  {
    category: "General",
    question: "Do you offer a warranty on kitchen appliance repairs?",
    answer:
      "Eligible repair work may include a 30-day service warranty. Coverage, exclusions, and claim requirements depend on the applicable written warranty terms and conditions shared for the service.",
  },
  {
    category: "Chimney",
    question: "Why has my kitchen chimney lost suction power?",
    answer:
      "The most common culprit is heavy grease clogging the baffle or mesh filters, or oil coating the blower fan blades. In auto-clean chimneys, a dysfunctional heating coil can prevent oil drainage. Routine chemical deep-cleaning or duct unblocking typically restores 100% suction.",
  },
  {
    category: "Chimney",
    question: "How frequently should a kitchen chimney be serviced and cleaned?",
    answer:
      "For regular Indian cooking involving spices and deep frying, we recommend a thorough deep cleaning every 3 to 6 months. Baffle filters should be washed at home every 2–3 weeks to avoid motor load.",
  },
  {
    category: "Gas Stove",
    question: "Why is my gas stove burner producing yellow soot flames?",
    answer:
      "A yellow flame indicates incomplete combustion, usually caused by clogged burner orifices, cooking spills obstructing air intake mixers, or low regulator pressure. We clean and recalibrate the gas jet to restore a clean, hot blue flame.",
  },
  {
    category: "Gas Stove",
    question: "Is it safe to use my auto-ignition hob if it keeps clicking?",
    answer:
      "Continuous clicking usually points to moisture trapped in the ignition microswitch or a jammed sparker unit. While it rarely poses immediate danger, you should turn off the electrical supply / unplug the hob and book a visit to prevent burn-out of the pulse generator.",
  },
  {
    category: "Microwave",
    question: "My microwave oven runs but food is not getting hot. What is wrong?",
    answer:
      "This classic symptom usually indicates a failed magnetron (the component generating microwaves), a blown high-voltage diode, or a faulty transformer. Our technicians carry replacement magnetrons and can repair it right at your home.",
  },
];

export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  appliance: string;
  rating: number;
  review: string;
  date: string;
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: "1",
    name: "Rohit Malhotra",
    location: "Sector 38, Chandigarh",
    appliance: "Faber Kitchen Chimney Repair",
    rating: 5,
    review:
      "My Faber chimney had zero suction and was vibrating badly. The technician from Service Support Hub arrived in 45 minutes, did a thorough chemical degreasing, and changed the motor capacitor. Suction is back like new!",
    date: "2 days ago",
  },
  {
    id: "2",
    name: "Simran Kaur",
    location: "Sector 15, Chandigarh",
    appliance: "Elica 4-Burner Hob Repair",
    rating: 5,
    review:
      "Two burners were producing low yellow flames and the auto ignition was clicking non-stop. They serviced the nozzles, changed the spark plug, and tested for gas leaks. Very polite technician and clear quote.",
    date: "1 week ago",
  },
  {
    id: "3",
    name: "Dr. Vikas Sharma",
    location: "Sector 49, Chandigarh",
    appliance: "LG Convection Microwave",
    rating: 5,
    review:
      "Microwave stopped heating food just before dinner guests arrived. Booked through their WhatsApp button. The technician inspected the magnetron, replaced it on the spot, and tested with a glass of water. Outstanding service!",
    date: "2 weeks ago",
  },
];
