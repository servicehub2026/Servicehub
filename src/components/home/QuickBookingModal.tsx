"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { allCities, applianceProducts } from "@/data/locations";
import { resolveCityServiceLanding } from "@/lib/cityServiceUrls";
import {
  OTHER_BRAND,
  SHEET_SCRIPT_URL,
  WEB3FORMS_KEY,
  bookingProducts,
  type BookingProduct,
} from "@/data/bookingData";

interface QuickBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultAppliance?: string;
  defaultLocality?: string;
}

const slugify = (t: string) => t.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

/** Brand list for a product: reference-form list + the brands used on the site's own pages (A-Z, "Other Brand" last). */
function brandsFor(p: BookingProduct): string[] {
  const site = applianceProducts.find((x) => x.slug === p.siteSlug)?.brands ?? [];
  const seen = new Set<string>();
  const out: string[] = [];
  [...p.brands, ...site].forEach((b) => {
    const k = slugify(b);
    if (!k || seen.has(k)) return;
    seen.add(k);
    out.push(b);
  });
  out.sort((a, b) => a.localeCompare(b));
  out.push(OTHER_BRAND);
  return out;
}

/** Fuzzy product detection from free text / URL tokens (same rules as the reference form). */
export function findProductKey(tokens: string[]): string {
  const idx = (...w: string[]) => {
    let b = -1;
    tokens.forEach((t, i) => { if (w.includes(t) && (b < 0 || i < b)) b = i; });
    return b;
  };
  const seq = (a: string, c: string) => {
    for (let i = 0; i < tokens.length - 1; i++) if (tokens[i] === a && tokens[i + 1] === c) return i;
    return -1;
  };
  const first = (...v: number[]) => { const ok = v.filter((x) => x >= 0); return ok.length ? Math.min(...ok) : -1; };
  const cands: Array<[string, number]> = [
    ["Kitchen Chimney", idx("chimney", "chimneys")],
    ["Kitchen Hob/Stove", idx("hob", "hobs", "stove", "stoves", "cooktop", "cooktops")],
    ["AC", first(idx("ac", "acs"), seq("air", "conditioner"), seq("air", "conditioning"))],
    ["Fridge", idx("fridge", "refrigerator", "refrigerators")],
    ["Washing Machine", seq("washing", "machine")],
    ["LED LCD TV", idx("tv", "television", "led", "lcd")],
    ["Microwave Oven", idx("microwave", "microwaves")],
    ["Geyser", first(idx("geyser", "geysers"), seq("water", "heater"))],
    ["RO Water", first(idx("ro"), idx("purifier", "purifiers"))],
    ["CCTV Camera", idx("cctv")],
    ["Dishwasher", idx("dishwasher", "dishwashers")],
  ];
  const ok = cands.filter((c) => c[1] >= 0).sort((a, b) => a[1] - b[1]);
  return ok.length ? ok[0][0] : "";
}

interface Detected { product: string; brand: string; city: string }

/** Reads the current page URL and works out city + product + brand. */
export function detectFromPage(hint?: string): Detected {
  const res: Detected = { product: "", brand: "", city: "" };
  if (typeof window === "undefined") return res;
  const segs = window.location.pathname.toLowerCase().split("/").filter(Boolean);

  // City: /cities/<city>/... or /service-areas/<city>
  if ((segs[0] === "cities" || segs[0] === "service-areas") && segs[1]) {
    const city = allCities.find((c) => c.slug === segs[1]);
    if (city) res.city = city.name;
  }

  // /cities/<city>/<brand>-<product>-repair-service-center  (exact match)
  if (segs[0] === "cities" && segs[2]) {
    const landing = resolveCityServiceLanding(segs[2]);
    if (landing) {
      const bp = bookingProducts.find((p) => p.siteSlug === landing.product.slug);
      if (bp) { res.product = bp.key; res.brand = landing.brand || ""; }
    }
  }
  // /services/<product-slug>
  if (!res.product && segs[0] === "services" && segs[1]) {
    const bp = bookingProducts.find((p) => p.siteSlug === segs[1]);
    if (bp) res.product = bp.key;
  }
  // Fallback: the appliance label passed by the button that opened the form
  if (!res.product && hint) {
    const key = findProductKey(hint.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean));
    if (key) res.product = key;
  }
  return res;
}

const CSS = `
.bk-ov{position:fixed;inset:0;z-index:60;background:rgba(15,23,42,.7);backdrop-filter:blur(4px);overflow-y:auto;display:flex;align-items:flex-start;justify-content:center;padding:12px 8px}
.bk-card{position:relative;width:100%;max-width:720px;margin:auto;background:#fff;border-radius:2px;box-shadow:0 15px 40px rgba(15,23,42,.25);border:1px solid #bfdbfe;overflow:hidden;font-family:inherit;color:#0f172a}
.bk-head{background:linear-gradient(135deg,#0f172a 0%,#1e3a8a 45%,#0f172a 100%);padding:24px 16px 22px;text-align:center;position:relative}
.bk-head h2{font-size:21px;font-weight:900;color:#fff;margin:0 0 6px;letter-spacing:-.3px}
.bk-head h2 span{color:#f59e0b}
.bk-head p{font-size:12px;color:rgba(255,255,255,.9);font-weight:500;margin:0;line-height:1.4}
.bk-x{position:absolute;top:10px;right:10px;width:30px;height:30px;border:1px solid rgba(255,255,255,.3);background:rgba(255,255,255,.12);color:#fff;border-radius:2px;cursor:pointer;font-size:18px;line-height:1}
.bk-x:hover{background:rgba(255,255,255,.25)}
.bk-prog{padding:8px 20px 0}
.bk-track{height:4px;background:#e2e8f0;border-radius:2px;overflow:hidden}
.bk-fill{height:100%;width:0;background:linear-gradient(90deg,#2563eb,#60a5fa);transition:width .4s ease}
.bk-fill.done{background:linear-gradient(90deg,#16a34a,#4ade80)}
.bk-plab{display:flex;justify-content:space-between;margin-top:4px;font-size:10px;font-weight:700;color:#475569}
.bk-body{padding:12px 20px 18px}
.bk-form{display:grid;grid-template-columns:repeat(2,1fr);gap:12px 10px}
.bk-grp{display:flex;flex-direction:column;gap:4px}
.bk-full{grid-column:1/-1}
.bk-sec{grid-column:1/-1;display:flex;align-items:center;gap:8px;margin:4px 0 -2px}
.bk-sec span{font-size:10.5px;font-weight:800;letter-spacing:1px;text-transform:uppercase;color:#2563eb;white-space:nowrap}
.bk-sec i{flex:1;height:1px;background:linear-gradient(90deg,#dbeafe,transparent)}
.bk-lab{font-size:11px;font-weight:700;color:#0f172a;text-transform:uppercase;display:flex;align-items:center;justify-content:space-between;gap:6px}
.bk-tag{font-size:9px;color:#16a34a;background:#dcfce7;padding:1px 5px;border-radius:3px;font-weight:600;text-transform:none}
.bk-in,.bk-sel,.bk-ta{width:100%;padding:10px;border:1px solid #bfdbfe;border-radius:2px;background:#f8fafc;color:#0f172a;font-size:13px;outline:none;transition:all .2s;font-family:inherit}
.bk-sel{appearance:none;-webkit-appearance:none;padding-right:26px;cursor:pointer;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%232563eb' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 10px center}
.bk-ta{min-height:60px;resize:vertical;line-height:1.4}
.bk-in:focus,.bk-sel:focus,.bk-ta:focus{border-color:#2563eb;background-color:#fff;box-shadow:0 0 0 2px rgba(37,99,235,.15)}
.bk-ok .bk-lab{color:#15803d}
.bk-ok .bk-in,.bk-ok .bk-sel,.bk-ok .bk-ta{border-color:#4ade80;background-color:#f0fdf4}
.bk-err .bk-in,.bk-err .bk-sel,.bk-err .bk-ta{border-color:#dc2626;box-shadow:0 0 0 2px rgba(220,38,38,.1)}
.bk-em{font-size:10px;color:#dc2626;font-weight:600}
.bk-note{font-size:10.5px;color:#92400e;background:#fffbeb;border:1px solid #fde68a;padding:4px 7px;border-radius:2px;font-weight:600;line-height:1.35}
.bk-btn{grid-column:1/-1;margin-top:4px;width:100%;padding:12px 15px;border:0;border-radius:2px;background:linear-gradient(135deg,#1e3a8a 0%,#2563eb 100%);color:#fff;font-weight:800;font-size:15px;cursor:pointer;box-shadow:0 4px 15px rgba(30,58,138,.2);transition:all .2s}
.bk-btn:hover{transform:translateY(-1px)}
.bk-btn:disabled{opacity:.7;cursor:wait;transform:none}
.bk-trust{grid-column:1/-1;display:flex;justify-content:center;gap:15px;flex-wrap:wrap;font-size:10.5px;color:#475569;font-weight:600}
.bk-pop{position:fixed;inset:0;z-index:80;background:rgba(15,23,42,.7);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:16px}
.bk-pop>div{background:#fff;border:2px solid #60a5fa;border-radius:2px;padding:25px;text-align:center;width:100%;max-width:320px}
.bk-pop h3{font-size:18px;margin:10px 0 6px;color:#0f172a}
.bk-pop p{font-size:12.5px;color:#475569;margin:0}
.bk-tick{width:50px;height:50px;margin:0 auto;border-radius:50%;background:#2563eb;color:#fff;display:grid;place-items:center;font-size:26px}
.bk-done{margin-top:15px;width:100%;padding:10px 20px;background:#0f172a;color:#fff;border:0;border-radius:2px;font-weight:700;cursor:pointer}
.bk-sheet{position:fixed;inset:0;z-index:90;background:rgba(15,23,42,.6);backdrop-filter:blur(3px);display:flex;align-items:flex-end}
.bk-panel{width:100%;max-height:85vh;display:flex;flex-direction:column;background:#fff;border-radius:2px 2px 0 0;padding-bottom:env(safe-area-inset-bottom,0px)}
.bk-ph{display:flex;align-items:center;justify-content:space-between;padding:16px 18px 10px}
.bk-ph h3{font-size:18px;font-weight:800;margin:0;color:#0f172a}
.bk-pc{width:38px;height:38px;border:1px solid #bfdbfe;border-radius:2px;background:#f1f5f9;font-size:22px;line-height:1;cursor:pointer}
.bk-ps{padding:0 18px 10px}
.bk-ps input{width:100%;padding:14px;font-size:15px;border:1px solid #bfdbfe;border-radius:2px;background:#f8fafc}
.bk-pl{flex:1 1 auto;min-height:0;overflow-y:auto;padding:6px 18px 18px;display:flex;flex-direction:column;gap:10px}
.bk-pl.grid{display:grid;grid-template-columns:repeat(2,1fr)}
.bk-pi{display:flex;align-items:center;min-height:56px;padding:14px;border:1px solid #bfdbfe;border-radius:2px;background:#fff;color:#0f172a;font-size:15px;font-weight:600;text-align:left;cursor:pointer}
.bk-pl.grid .bk-pi{justify-content:center;text-align:center}
.bk-pi.svc{flex-direction:column;align-items:flex-start;gap:5px}
.bk-pi .pp{color:#2563eb;font-size:14.5px;font-weight:800}
.bk-pi.sel{border-color:#16a34a;background:#f0fdf4}
.bk-empty{grid-column:1/-1;padding:22px 10px;text-align:center;color:#475569;font-size:14px}
@media(max-width:600px){.bk-ov{padding:8px 6px}.bk-form{grid-template-columns:1fr;gap:10px}.bk-in,.bk-sel,.bk-ta{font-size:14.5px;padding:14px 10px}.bk-body{padding:12px 14px 16px}.bk-head h2{font-size:18px}.bk-lab{font-size:12px}}
`;

type SelId = "city" | "product" | "brand" | "service";
const PICK: Record<SelId, { title: string; grid: boolean; search: boolean; svc: boolean }> = {
  city: { title: "Select Your City", grid: true, search: true, svc: false },
  product: { title: "Select Appliance", grid: false, search: false, svc: false },
  brand: { title: "Select Brand", grid: true, search: true, svc: false },
  service: { title: "Select Service and Price", grid: false, search: false, svc: true },
};
const PROGRESS_LABELS = ["Fill your details", "Great start!", "Looking good!", "Almost done!", "Ready to Book!"];

function BookingForm({ onClose, defaultAppliance, defaultLocality }: Omit<QuickBookingModalProps, "isOpen">) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [productKey, setProductKey] = useState("");
  const [brand, setBrand] = useState("");
  const [service, setService] = useState("");
  const [address, setAddress] = useState("");
  const [showErr, setShowErr] = useState(false);
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);
  const [pick, setPick] = useState<SelId | null>(null);
  const [pickQuery, setPickQuery] = useState("");
  const [detected, setDetected] = useState<Detected>({ product: "", brand: "", city: "" });
  const prevOverflow = useRef("");

  const product = bookingProducts.find((p) => p.key === productKey);
  const brandOptions = useMemo(() => (product ? brandsFor(product) : []), [product]);
  const cityOptions = useMemo(() => [...allCities.map((c) => c.name), "Other"], []);

  // Auto-fill from the page URL once, when the form opens.
  useEffect(() => {
    const d = detectFromPage(defaultAppliance);
    setDetected(d);
    if (d.product) {
      setProductKey(d.product);
      const p = bookingProducts.find((x) => x.key === d.product);
      if (p && d.brand) {
        const match = brandsFor(p).find((b) => slugify(b) === slugify(d.brand));
        if (match) setBrand(match);
      }
    }
    if (d.city) setCity(d.city);
    else if (defaultLocality) {
      const m = allCities.find((c) => slugify(c.name) === slugify(defaultLocality));
      if (m) setCity(m.name);
    }
    prevOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prevOverflow.current; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mobileOk = /^[6-9]\d{9}$/.test(mobile);
  const checks = {
    name: !!name.trim(), mobile: mobileOk, city: !!city, product: !!productKey,
    brand: !!brand, service: !!service, address: !!address.trim(),
  };
  const filled = Object.values(checks).filter(Boolean).length;
  const pct = Math.round((filled / 7) * 100);
  const lead = detected.product && product
    ? `${brand && slugify(brand) === slugify(detected.brand) ? brand + " " : ""}${product.short}`
    : "";

  const grpCls = (k: keyof typeof checks, extra = "") =>
    `bk-grp ${extra} ${checks[k] ? "bk-ok" : showErr ? "bk-err" : ""}`;

  const onProduct = (key: string) => {
    setProductKey(key);
    setBrand("");
    setService("");
  };

  const choose = (id: SelId, value: string) => {
    if (id === "city") setCity(value);
    if (id === "product") onProduct(value);
    if (id === "brand") setBrand(value);
    if (id === "service") setService(value);
    setPick(null);
  };

  const isMobile = () => typeof window !== "undefined" && window.matchMedia("(max-width: 700px)").matches;
  const selProps = (id: SelId) => ({
    onMouseDown: (e: React.MouseEvent<HTMLSelectElement>) => {
      if (!isMobile()) return;
      e.preventDefault();
      (e.currentTarget as HTMLSelectElement).blur();
      setPickQuery("");
      setPick(id);
    },
  });

  const submit = async () => {
    setShowErr(true);
    if (!Object.values(checks).every(Boolean) || !product) return;
    setBusy(true);
    const payload = {
      first_name: name.trim(), mobile_number: mobile, city, product: product.key,
      brand, service_type: service, address: address.trim(),
      page: typeof window !== "undefined" ? window.location.href : "",
    };
    const fd = new FormData();
    fd.append("access_key", WEB3FORMS_KEY);
    fd.append("subject", `New Booking: ${product.key} (${brand}) - ${service}`);
    fd.append("from_name", "Service Support Hub Booking Portal");
    Object.entries(payload).forEach(([k, v]) => fd.append(k, v));
    try {
      // Google Sheets backup (fire and forget)
      fetch(SHEET_SCRIPT_URL, {
        method: "POST", mode: "no-cors", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => {});
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd });
      const data = await res.json();
      setBusy(false);
      if (data.success) {
        if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate([150, 100, 150]);
        setSuccess(true);
      } else {
        alert("Submission failed. Please call us directly.");
      }
    } catch {
      setBusy(false);
      alert("Network error. Please call us directly.");
    }
  };

  // Bottom-sheet options
  const sheetOptions = (() => {
    if (!pick) return [] as string[];
    if (pick === "city") return cityOptions;
    if (pick === "product") return bookingProducts.map((p) => p.key);
    if (pick === "brand") return brandOptions;
    return product ? product.services : [];
  })();
  const q = pickQuery.trim().toLowerCase();
  const shown = q ? sheetOptions.filter((o) => o.toLowerCase().includes(q)) : sheetOptions;
  const currentVal = pick === "city" ? city : pick === "product" ? productKey : pick === "brand" ? brand : service;
  const optLabel = (id: SelId, v: string) => (id === "product" ? bookingProducts.find((p) => p.key === v)?.label || v : v);

  return (
    <div className="bk-ov" role="dialog" aria-modal="true" aria-label="Book a doorstep service" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="bk-card">
        <div className="bk-head">
          <button type="button" className="bk-x" onClick={onClose} aria-label="Close">×</button>
          <h2>{lead ? <>Book <span>{lead}</span> Service</> : <>Book Your <span>Service</span></>}</h2>
          <p>{lead ? `Verified Expert ${lead} Technicians${detected.city ? " in " + detected.city : ""} at your Doorstep` : "Expert Technicians at your Doorstep"}</p>
        </div>
        <div className="bk-prog">
          <div className="bk-track"><div className={`bk-fill ${pct === 100 ? "done" : ""}`} style={{ width: pct + "%" }} /></div>
          <div className="bk-plab"><span>{PROGRESS_LABELS[Math.min(Math.floor((filled / 7) * 4), 4)]}</span><span>{pct}%</span></div>
        </div>
        <div className="bk-body">
          <div className="bk-form">
            <div className="bk-sec"><span>Personal Details</span><i /></div>
            <div className={grpCls("name")}>
              <label className="bk-lab" htmlFor="bk-name">Your Name *</label>
              <input id="bk-name" className="bk-in" type="text" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
              {showErr && !checks.name && <span className="bk-em">⚠ Name required</span>}
            </div>
            <div className={grpCls("mobile")}>
              <label className="bk-lab" htmlFor="bk-mobile">Mobile Number *</label>
              <input id="bk-mobile" className="bk-in" type="tel" inputMode="numeric" maxLength={10} placeholder="10 Digit Mobile Number" value={mobile} onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))} autoComplete="tel" />
              {showErr && !checks.mobile && <span className="bk-em">⚠ Valid 10-digit number needed</span>}
            </div>

            <div className="bk-sec"><span>Location and Appliance</span><i /></div>
            <div className={grpCls("city")}>
              <label className="bk-lab" htmlFor="bk-city">Select City *</label>
              <select id="bk-city" className="bk-sel" value={city} onChange={(e) => setCity(e.target.value)} {...selProps("city")}>
                <option value="" disabled>Select City / Region</option>
                {cityOptions.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              {showErr && !checks.city && <span className="bk-em">⚠ Please select city</span>}
            </div>
            <div className={grpCls("product")}>
              <label className="bk-lab" htmlFor="bk-product">Select Product *</label>
              <select id="bk-product" className="bk-sel" value={productKey} onChange={(e) => onProduct(e.target.value)} {...selProps("product")}>
                <option value="" disabled>Select Appliance</option>
                {bookingProducts.map((p) => <option key={p.key} value={p.key}>{p.label}</option>)}
              </select>
              {showErr && !checks.product && <span className="bk-em">⚠ Please select product</span>}
            </div>

            <div className="bk-sec"><span>Brand and Service Pricing</span><i /></div>
            <div className={grpCls("brand")}>
              <label className="bk-lab" htmlFor="bk-brand">Select Brand *</label>
              <select id="bk-brand" className="bk-sel" value={brand} onChange={(e) => setBrand(e.target.value)} {...selProps("brand")}>
                <option value="" disabled>{product ? `Select ${product.short} Brand` : "Select Brand First"}</option>
                {brandOptions.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
              {showErr && !checks.brand && <span className="bk-em">⚠ Please select brand</span>}
            </div>
            <div className={grpCls("service")}>
              <label className="bk-lab" htmlFor="bk-service">Service and Price * <span className="bk-tag">✔ Verified Rates</span></label>
              <select id="bk-service" className="bk-sel" value={service} onChange={(e) => setService(e.target.value)} {...selProps("service")}>
                <option value="" disabled>Select Service and Price</option>
                {(product?.services || []).map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              {showErr && !checks.service && <span className="bk-em">⚠ Please select service</span>}
              <span className="bk-note">ℹ This is an estimated price. Final bill is confirmed after technician inspection.</span>
            </div>

            <div className={grpCls("address", "bk-full")}>
              <label className="bk-lab" htmlFor="bk-address">Complete Address (Area / Sector / House No) *</label>
              <textarea id="bk-address" className="bk-ta" placeholder="Enter Sector, House No, Society / Landmark..." value={address} onChange={(e) => setAddress(e.target.value)} />
              {showErr && !checks.address && <span className="bk-em">⚠ Address required</span>}
            </div>

            <button type="button" className="bk-btn" onClick={submit} disabled={busy}>
              {busy ? "Submitting..." : "Confirm Service Booking Now"}
            </button>
            <div className="bk-trust"><span>🛡 100% Genuine Parts</span><span>⏱ Same-Day Expert Visit</span></div>
          </div>
        </div>
      </div>

      {pick && (
        <div className="bk-sheet" onMouseDown={(e) => { if (e.target === e.currentTarget) setPick(null); }}>
          <div className="bk-panel">
            <div className="bk-ph"><h3>{PICK[pick].title}</h3><button type="button" className="bk-pc" onClick={() => setPick(null)} aria-label="Close">×</button></div>
            {PICK[pick].search && <div className="bk-ps"><input type="text" placeholder="Search..." value={pickQuery} onChange={(e) => setPickQuery(e.target.value)} autoComplete="off" /></div>}
            {PICK[pick].svc && <div className="bk-note" style={{ margin: "0 18px 8px" }}>ℹ This is an estimated price. Final bill is confirmed after technician inspection.</div>}
            <div className={`bk-pl ${PICK[pick].grid ? "grid" : ""}`}>
              {!sheetOptions.length && <div className="bk-empty">Please select the appliance first.</div>}
              {sheetOptions.length > 0 && !shown.length && <div className="bk-empty">No match. Select &quot;Other Brand&quot;.</div>}
              {shown.map((o) => {
                const label = optLabel(pick, o);
                const i = label.lastIndexOf(" — ");
                const svc = PICK[pick].svc && i > -1;
                return (
                  <button key={o} type="button" className={`bk-pi ${svc ? "svc" : ""} ${o === currentVal ? "sel" : ""}`} onClick={() => choose(pick, o)}>
                    {svc ? <><span>{label.slice(0, i)}</span><span className="pp">{label.slice(i + 3)}</span></> : label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {busy && <div className="bk-pop"><div><h3 style={{ fontSize: 14 }}>Submitting...</h3></div></div>}
      {success && (
        <div className="bk-pop">
          <div>
            <div className="bk-tick">✓</div>
            <h3>Booking Confirmed! 🎉</h3>
            <p>Aapki booking successfully submit ho gayi hai!<br /><strong>Hamari team 30 mins mein contact karegi.</strong></p>
            <button type="button" className="bk-done" onClick={onClose}>Done</button>
          </div>
        </div>
      )}
    </div>
  );
}

export const QuickBookingModal: React.FC<QuickBookingModalProps> = ({ isOpen, onClose, defaultAppliance, defaultLocality }) => {
  if (!isOpen) return null;
  return <BookingForm onClose={onClose} defaultAppliance={defaultAppliance} defaultLocality={defaultLocality} />;
};
