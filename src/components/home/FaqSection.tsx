"use client";

import React, { useState } from "react";
import { getFaqs } from "@/data/faqData";
import { Icons } from "@/components/ui/Icons";

interface FaqSectionProps {
  cityName?: string;
  productName?: string;
  brandName?: string;
  /** e.g. "refrigerator-repair" — selects the product-specific questions */
  productSlug?: string;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ cityName, productName, brandName, productSlug }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = getFaqs({ productSlug, productName, brandName, cityName });

  // FAQPage structured data that always matches the visible FAQs on THIS page.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const heading =
    brandName && productName && cityName
      ? `${brandName} ${productName} Service FAQs in ${cityName}`
      : productName && cityName
        ? `${productName} Service FAQs in ${cityName}`
        : brandName && productName
          ? `${brandName} ${productName} Service FAQs`
          : productName
            ? `${productName} Service FAQs`
            : "Got Questions? We Have Answers";

  return (
    <section id="faq" className="py-10 sm:py-14 lg:py-16 bg-slate-50">
      <div className="w-[97.5%] max-w-none mx-auto px-0">
        <div className="text-center max-w-2xl mx-auto mb-7 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Icons.Check size={14} />
            Frequently Asked Questions
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">{heading}</h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Everything you need to know about our visiting charges, appointment scheduling,
            spare parts warranty, and diagnostic process.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-2 lg:gap-3 items-start">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="bg-white rounded-[2px] border border-slate-200 overflow-hidden transition-all shadow-sm">
                <h3 className="m-0">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full py-3 px-3 sm:py-4 sm:px-4 text-left flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className="text-xs sm:text-sm font-bold text-slate-900">{faq.question}</span>
                    <span
                      className={`w-6 h-6 rounded-[2px] bg-slate-100 flex items-center justify-center shrink-0 text-slate-600 transition-transform duration-200 ${
                        isOpen ? "rotate-180 bg-blue-50 text-blue-600" : ""
                      }`}
                    >
                      <Icons.ChevronDown size={16} />
                    </span>
                  </button>
                </h3>
                {/* The answer is ALWAYS present in the server-rendered HTML; only its visibility changes. */}
                <div
                  id={`faq-answer-${index}`}
                  hidden={!isOpen}
                  className="px-3 pb-4 pt-1 text-[11px] sm:px-4 sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40"
                >
                  {faq.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </section>
  );
};
