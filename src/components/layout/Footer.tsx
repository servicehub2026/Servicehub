"use client";

import React, { useState } from "react";
import Link from "next/link";
import { site, services } from "@/lib/site";

export default function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    appliance: "",
    service: "",
    city: "",
    pincode: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.mobile) {
      alert("Please enter your mobile number.");
      return;
    }

    const text =
      `*NEW SERVICE REQUEST - Service Support Hub*\n` +
      `------------------------------------\n` +
      `*Name:* ${formData.name || "Customer"}\n` +
      `*Mobile:* ${formData.mobile}\n` +
      `*Appliance:* ${formData.appliance || "Not selected"}\n` +
      `*Service Type:* ${formData.service || "Repair"}\n` +
      `*City:* ${formData.city || "Not selected"}\n` +
      `*PIN Code:* ${formData.pincode || "N/A"}\n` +
      `*Message:* ${formData.message || "Doorstep service request"}\n` +
      `------------------------------------`;

    window.open(
      `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <>
      <footer className="ssh-footer">
        <div className="ssh-wrap">
          <div className="ssh-grid">

            {/* BRAND */}
            <div className="ssh-brand">
              <Link href="/" className="ssh-logo">
                Service<span>Support Hub</span>
              </Link>

              <small className="ssh-subtitle">
                HOME and OFFICE APPLIANCE CARE
              </small>

              <p>
                Trusted home appliance repair, installation and
                maintenance support at your doorstep.
              </p>

              <strong>Service Support Hub</strong>

              <p>
                Reliable support for everyday home and office
                appliances.
              </p>
            </div>

            {/* CONNECT */}
            <div className="ssh-connect">
              <h3>Connect</h3>

              <p>
                <strong>Customer Support:</strong>
                <a href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </p>

              <p>
                For service enquiries and appointment assistance.
              </p>

              <p>
                <strong>Website:</strong>
                <a href={site.url}>{`www.${site.domain}`}
                </a>
              </p>

              <p>
                <strong>Service Network:</strong>
                {site.network}
              </p>
            </div>

            {/* DROPDOWN MENUS */}
            <div className="ssh-menus">

              <details className="ssh-dropdown">
                <summary>Our Services</summary>
                <div className="ssh-dropdown-content">
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                    >
                      {s.title}
                    </Link>
                  ))}
                </div>
              </details>

              <details className="ssh-dropdown">
                <summary>Service Cities</summary>
                <div className="ssh-dropdown-content">
                  {site.areas.map((area) => (
                    <Link
                      key={area}
                      href={`/service-areas/${area
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {area}
                    </Link>
                  ))}
                </div>
              </details>

              <details className="ssh-dropdown">
                <summary>Customer Help</summary>
                <div className="ssh-dropdown-content">
                  <Link href="/contact-us">Contact Us</Link>
                  <Link href="/about-us">About Us</Link>
                  <Link href="/faq">FAQs</Link>
                </div>
              </details>

              <details className="ssh-dropdown">
                <summary>Policies and More</summary>
                <div className="ssh-dropdown-content">
                  <Link href="/privacy-policy">Privacy Policy</Link>
                  <Link href="/terms-and-conditions">
                    Terms and Conditions
                  </Link>
                  <Link href="/disclaimer">Disclaimer</Link>
                </div>
              </details>

            </div>

            {/* REQUEST FORM */}
            <div className="ssh-request">
              <h3>Request for Service</h3>

              <p>
                Share your appliance and location details to request
                a service callback.
              </p>

              <form className="ssh-form" onSubmit={handleSubmit}>
                <div className="ssh-form-grid">

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="User Name"
                    required
                  />

                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Mobile Number"
                    required
                  />

                  <select
                    name="appliance"
                    value={formData.appliance}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select Appliance
                    </option>

                    {services.map((s) => (
                      <option key={s.slug} value={s.slug}>
                        {s.title}
                      </option>
                    ))}
                  </select>

                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select Service
                    </option>
                    <option value="repair">Repair</option>
                    <option value="installation">Installation</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="amc">AMC Service</option>
                  </select>

                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select City
                    </option>

                    {site.areas.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="PIN Code (optional)"
                    maxLength={6}
                  />

                </div>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe the issue (optional)"
                  rows={2}
                />

                <button type="submit">Submit</button>
              </form>
            </div>

          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="ssh-copyright">{`© ${new Date().getFullYear()} Service Support Hub. All Rights Reserved.`}</div>

      </footer>

      
    </>
  );
}
export { Footer };
