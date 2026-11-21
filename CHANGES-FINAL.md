# Service Support Hub - Final fixes (HTML-first SEO)

## Bugs fixed
1. FAQ answers were only in the HTML for the one open item. Now EVERY answer is in server-rendered HTML (visible in Ctrl+U); the accordion only toggles `hidden`.
2. Wrong FAQs on every page (chimney/hob/microwave FAQs with "Refrigerator ..." glued in front). New `src/data/faqData.ts`: 8 product-specific FAQs per product (+brand and city variants), clean questions.
3. FAQPage JSON-LD was sitewide with kitchen FAQs. Now each page emits FAQPage schema matching its own visible FAQs.
4. "Read More" service details (includes, problems, appliance types, price table, coverage) lived only in a popup. Now inline in the card HTML.
5. Problem slider regex bug: AC and TV pages never matched and showed generic slides. Fixed; Water Purifier and Dishwasher slides added.
6. Canonical: root layout canonicalised every page to the homepage. Removed; each page has its own canonical.
7. Doubled titles ("... | Service Support Hub | Service Support Hub"). Title template fixed.
8. /services/ro-water-purifier was a 404 link. Now /services/water-purifier-repair.
9. public/sitemap.xml (6 URLs) shadowed app/sitemap.ts. Deleted; sitemap now lists all products, /services, /cities and all city landing pages.
10. TypeScript error on home page (CommonIssues invalid prop) that breaks next build. Fixed; home is now a server page + HomeClient.
11. Services grid category links now stay in the HTML; removed visible developer note.
12. Removed fake aggregateRating from LocalBusiness schema.
13. Ctrl+U / Ctrl+F fix: React was splitting sentences with `<!-- -->` comments wherever text and `{variables}` were mixed, so copied sentences could not be found in view-source. All such text is now one single string per element (61 places across the site). Verified: 0 `<!-- -->` left in the HTML of all main pages.
Note: in view-source, `&` appears as `&amp;` and `'` as `&#x27;` - that is normal HTML escaping, not missing content.
14. Visible '&' replaced by 'and' (and &apos; by ’) so every heading/paragraph is searchable verbatim in Ctrl+U. Verified on 16 pages: 4470 of 4471 visible text blocks found exactly in raw HTML (only the brand name 'Fisher & Paykel' keeps its &).
15. FULLY STATIC: `next.config.mjs` uses `output: "export"`. `npm run build` now writes ~8,866 plain HTML pages (every city x product x brand) plus `sitemap.xml` (8,865 URLs) and `robots.txt` into `out/`. Upload the contents of `out/` to your hosting. `public/.htaccess` (copied into out/) makes extensionless URLs work on Apache/cPanel.
16. New booking form (`src/components/home/QuickBookingModal.tsx`, data in `src/data/bookingData.ts`), same features as the gen1service reference form: auto-detects city/product/brand from the page URL, progress bar, green filled fields, mobile bottom-sheet pickers, verified-rate service list, Web3Forms email + Google Sheets backup.
17. `?brand=` / `?product=` query pages removed (they cannot be static). Brand pages are the /cities/<city>/<brand>-<product>-repair-service-center pages.
Commands: `npm install` (once), `npm run build`, optional `npm run start` to preview ./out locally.
