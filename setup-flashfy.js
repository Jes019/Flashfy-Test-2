// setup-flashfy.js
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const w = (p, s) => {
  const f = path.join(root, p);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, s);
  console.log("✓ wrote", p);
};

// ---------- package & tooling ----------
w("package.json", `{
  "name": "flashfy-fullsite",
  "version": "1.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "emailjs-com": "^3.2.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.17",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.10",
    "vite": "^5.4.10"
  }
}`);

w("vite.config.js", `
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({ plugins: [react()] })
`);

w("tailwind.config.js", `
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
}
`);

w("postcss.config.js", `export default { plugins: { tailwindcss: {}, autoprefixer: {} } }`);

// ---------- index & root styles ----------
w("index.html", `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Flashfy — EU Product Sourcing</title>
    <meta name="description" content="Flashfy sources AHU filters, emergency lighting, temperature gauges and barometers. EU suppliers, transparent lead times. Get a quote today." />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`);

w("src/index.css", `
@tailwind base;
@tailwind components;
@tailwind utilities;
:root { color-scheme: light; }
`);

// ---------- main entry ----------
w("src/main.jsx", `
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
const rootEl = document.getElementById('root')
createRoot(rootEl).render(<App />)
`);

// ---------- App (ALL your requested tweaks inside) ----------
w("src/App.jsx", `
import React, { useEffect, useState } from "react";
import emailjs from "emailjs-com";

/* Flashfy — Full Site (Tweaked)
   - Longer About
   - Longer SEO product page descriptions
   - Contact form wider + email line
   - +3 FAQs & Help page
   - Thermometers -> Temperature Gauges
   - New category: Other Lights (Batten, Spots, Bulbs)
   - Header color = Footer color (slate-800)
   - Clickable Logo (public/images/Logo.jpg) -> Home
   - Taller category cards (length)
   - Trust/Why Choose Us section
   - EmailJS-ready (auto email) + mailto fallback
*/

const FALLBACKS = {
  hero: "https://source.unsplash.com/1200x800/?warehouse,logistics",
  ahu: "https://source.unsplash.com/1200x800/?filter,hvac",
  lights: "https://source.unsplash.com/1200x800/?emergency,light",
  gauges: "https://source.unsplash.com/1200x800/?temperature,gauge",
  baro: "https://source.unsplash.com/1200x800/?barometer,weather",
  otherLights: "https://source.unsplash.com/1200x800/?led,lighting",
  logo: "https://source.unsplash.com/400x120/?lightning,bolt"
};

function SafeImg({ src, placeholder, alt, className, style }) {
  const [imgSrc, setImgSrc] = useState(src);
  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      style={style}
      onError={() => { if (imgSrc !== placeholder) setImgSrc(placeholder); }}
    />
  );
}

function getHashPath(){ const raw = window.location.hash || "#/"; return raw.startsWith("#")? raw.slice(1): raw; }
function navigate(to){ window.location.hash = \`#\${to}\`; }

// Header & Footer (slate-800 both)
function Header() {
  return (
    <header className="bg-slate-800 text-white px-6 py-4 shadow flex items-center justify-between">
      <a href="#/" className="flex items-center gap-3 group" aria-label="Flashfy Home">
        <SafeImg src="/images/Logo.jpg" placeholder={FALLBACKS.logo} alt="Flashfy logo" className="h-10 w-auto object-contain" />
        <span className="text-3xl md:text-4xl font-extrabold tracking-tight group-hover:opacity-90">Flashfy</span>
      </a>
      <nav className="flex gap-4 text-sm md:text-base">
        <a href="#/" className="hover:underline">Home</a>
        <a href="#/categories" className="hover:underline">Categories</a>
        <a href="#/help" className="hover:underline">Help</a>
        <a href="#/about" className="hover:underline">About</a>
        <a href="#/contact" className="hover:underline">Contact</a>
        <a href="#/faq" className="hover:underline">FAQs</a>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-800 text-white px-8 py-10 grid gap-8 md:grid-cols-4">
      <div>
        <h4 className="font-bold mb-2">Company</h4>
        <a href="#/about" className="block text-slate-200 hover:underline">About Us</a>
        <a href="#/privacy" className="block text-slate-200 hover:underline">Privacy Policy</a>
        <a href="#/shipping" className="block text-slate-200 hover:underline">Shipping & Returns</a>
        <a href="#/terms" className="block text-slate-200 hover:underline">Terms & Conditions</a>
        <a href="#/legal" className="block text-slate-200 hover:underline">Legal Policy</a>
      </div>
      <div>
        <h4 className="font-bold mb-2">Support</h4>
        <a href="#/help" className="block text-slate-200 hover:underline">Help</a>
        <a href="#/faq" className="block text-slate-200 hover:underline">FAQs</a>
        <a href="#/contact" className="block text-slate-200 hover:underline">Contact Us</a>
      </div>
      <div>
        <h4 className="font-bold mb-2">Categories</h4>
        <a href="#/product/ahu" className="block text-slate-200 hover:underline">AHU Filters</a>
        <a href="#/product/lights" className="block text-slate-200 hover:underline">Emergency Lights</a>
        <a href="#/product/gauges" className="block text-slate-200 hover:underline">Temperature Gauges</a>
        <a href="#/product/baro" className="block text-slate-200 hover:underline">Barometers</a>
        <a href="#/product/otherlights" className="block text-slate-200 hover:underline">Other Lights</a>
      </div>
      <div>
        <h4 className="font-bold mb-2">Flashfy</h4>
        <p>© {new Date().getFullYear()} Flashfy. All rights reserved.</p>
      </div>
    </footer>
  );
}

// Sections
function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between gap-8 px-6 md:px-8 py-16 bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="max-w-xl">
        <h2 className="text-4xl font-extrabold mb-3">Your EU Product Sourcing Partner</h2>
        <p className="text-slate-600 mb-5">Reliable suppliers, lead-time visibility, and EU-compliant products across HVAC filtration and lighting.</p>
        <div className="flex gap-3 flex-wrap">
          <a href="#/quote"><button className="px-4 py-3 rounded-md bg-blue-600 text-white font-semibold">Request a Quote</button></a>
          <a href="#/categories"><button className="px-4 py-3 rounded-md border border-blue-600 text-blue-600 font-semibold bg-white">Browse Categories</button></a>
        </div>
      </div>
      <SafeImg src="/images/hero.jpg" placeholder={FALLBACKS.hero} alt="Warehouse logistics" className="rounded-xl shadow max-w-xl w-full" />
    </section>
  );
}

function TrustBar() {
  const items = [
    { title: "EU-Vetted Suppliers", desc: "We source from audited manufacturers and distributors." },
    { title: "Transparent Lead Times", desc: "Clear visibility—especially for custom filters (5–15 days)." },
    { title: "Specification Matching", desc: "Send product numbers or drawings; we match 1:1." },
    { title: "Dedicated Support", desc: "One point of contact from quote to delivery." }
  ];
  return (
    <section className="px-6 md:px-8 pb-12">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
        <h3 className="text-2xl font-bold mb-4 text-center">Why Choose Flashfy?</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i)=>(
            <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="font-semibold">{it.title}</h4>
              <p className="text-slate-600 text-sm mt-1">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Categories() {
  const cats = [
    { id: "ahu", name: "AHU Filters", img: "/images/ahu.jpg", fallback: FALLBACKS.ahu, desc: "G4 / F7 / F9 / H13 — bag, pleated & HEPA. Custom sizes available." },
    { id: "lights", name: "Emergency Lights", img: "/images/lights.jpg", fallback: FALLBACKS.lights, desc: "LED exit signs, bulkheads, twinspots. IP65 / IK10 options." },
    { id: "gauges", name: "Temperature Gauges", img: "/images/gauges.jpg", fallback: FALLBACKS.gauges, desc: "Dial and digital gauges for HVAC and process monitoring." },
    { id: "baro", name: "Barometers", img: "/images/baro.jpg", fallback: FALLBACKS.baro, desc: "Precision barometers for weather and labs." },
    { id: "otherlights", name: "Other Lights", img: "/images/other_lights.jpg", fallback: FALLBACKS.otherLights, desc: "Batten lights, spot lights, bulbs & accessories." },
  ];

  return (
    <section className="px-6 md:px-8 py-10">
      <h3 className="text-2xl font-bold mb-6">Categories</h3>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cats.map(c => (
          <div key={c.id}
               className="border border-slate-200 rounded-xl p-4 bg-white flex flex-col hover:-translate-y-0.5 hover:shadow transition min-h-[380px]"
               onClick={() => navigate(\`/product/\${c.id}\`)} role="button" tabIndex={0}
               onKeyDown={(e)=>{ if(e.key==='Enter') navigate(\`/product/\${c.id}\`)}}>
            <SafeImg src={c.img} placeholder={c.fallback} alt={c.name} className="w-full h-44 object-cover rounded mb-3" />
            <h4 className="font-semibold">{c.name}</h4>
            <p className="text-slate-600 text-sm mt-1 flex-1">{c.desc}</p>
            <div className="flex gap-2 mt-3">
              <button className="px-3 py-2 rounded-md bg-blue-600 text-white font-semibold" onClick={(e)=>{e.stopPropagation(); navigate(\`/product/\${c.id}\`)}}>View</button>
              <a href={\`#/quote?product=\${encodeURIComponent(c.name)}\`} onClick={(e)=>e.stopPropagation()} className="px-3 py-2 rounded-md border border-blue-600 text-blue-600 font-semibold bg-white text-center">Quote Now</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Product copy with longer SEO text
const PRODUCT_COPY = {
  ahu: {
    title: "AHU Filters",
    img: "/images/ahu.jpg",
    fallback: FALLBACKS.ahu,
    bullets: [
      "Grades: G4, F7, F9, H13 (EN ISO 16890 & EN1822)",
      "Formats: pleated panels, bag filters, HEPA cassettes",
      "Custom sizes made-to-order (lead time 5–15 working days)",
    ],
    seo: [
      "Our AHU filter range covers pre-filtration through high-efficiency HEPA for clean supply and extract air in commercial buildings, healthcare and industry.",
      "Provide us with your panel size, pocket count, media type or an OEM part number; we cross-reference and supply EU-compliant equivalents with certificates on request."
    ]
  },
  lights: {
    title: "Emergency Lights",
    img: "/images/lights.jpg",
    fallback: FALLBACKS.lights,
    bullets: [
      "LED bulkheads, exit signs, twinspots",
      "Self-test & maintained/non-maintained options",
      "IP65, IK10 models for industrial settings",
    ],
    seo: [
      "Emergency luminaires designed for reliability and compliance with EU safety standards.",
      "Choose from maintained or non-maintained variants, pictogram exit signs, and vandal-resistant housings for harsh environments."
    ]
  },
  gauges: {
    title: "Temperature Gauges",
    img: "/images/gauges.jpg",
    fallback: FALLBACKS.gauges,
    bullets: [
      "Bimetal dial, digital and remote-probe options",
      "Ranges for HVAC and process monitoring",
      "Optional calibration certificates",
    ],
    seo: [
      "Robust temperature gauges for HVAC plant rooms and light process applications, available in multiple dial sizes, connection threads and stem lengths.",
      "Supply your required range, accuracy and process connection—we’ll match a compatible model with lead times and certificates if needed."
    ]
  },
  baro: {
    title: "Barometers",
    img: "/images/baro.jpg",
    fallback: FALLBACKS.baro,
    bullets: [
      "Precision measurement for labs & weather",
      "Wall, bench & digital models",
      "Optional data logging",
    ],
    seo: [
      "Laboratory and meteorological barometers with stable, accurate sensing for environmental monitoring and research.",
      "We offer classic aneroid and modern digital variants, with optional data interfaces for analysis."
    ]
  },
  otherlights: {
    title: "Other Lights (Batten, Spots, Bulbs)",
    img: "/images/other_lights.jpg",
    fallback: FALLBACKS.otherLights,
    bullets: [
      "LED battens for linear illumination",
      "Spot lights for accent/task lighting",
      "Bulbs & accessories in common bases",
    ],
    seo: [
      "A complementary lighting category covering linear battens for corridors and workshops, spot luminaires for focused lighting, and high-efficiency bulbs in common fittings.",
      "Share quantities, lumen output targets, CCT requirements and IP ratings; we’ll source suitable EU-compliant options with competitive lead times."
    ]
  },
};

function ProductPage({ id }) {
  const data = PRODUCT_COPY[id];
  if (!data) return <div className="max-w-5xl mx-auto px-6 md:px-8 py-10"><h2 className="text-2xl font-bold">Product not found</h2></div>;
  return (
    <section className="max-w-6xl mx-auto px-6 md:px-8 py-12 flex flex-col md:flex-row gap-10 items-start">
      <SafeImg src={data.img} placeholder={data.fallback} alt={data.title} className="rounded-xl shadow w-full md:w-1/2" />
      <div className="flex-1">
        <h1 className="text-3xl font-extrabold mb-2">{data.title}</h1>
        <ul className="list-disc pl-5 text-slate-700 mb-4">
          {data.bullets.map((b,i)=>(<li key={i}>{b}</li>))}
        </ul>
        {data.seo?.map((p, i)=>(<p key={i} className="text-slate-700 mb-3">{p}</p>))}
        <a href={\`#/quote?product=\${encodeURIComponent(data.title)}\`} className="inline-block mt-2 px-4 py-3 rounded-md bg-blue-600 text-white font-semibold">Request a Quote</a>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="max-w-3xl mx-auto px-6 md:px-8 py-16 text-center">
      <h2 className="text-3xl font-extrabold mb-4">About Flashfy</h2>
      <p className="mb-4">
        Flashfy is a procurement partner and sourcing intermediary focused on EU-compliant HVAC filtration and lighting products.
        We coordinate carefully with audited manufacturers and distributors to ensure specification fit, quality and responsible lead times.
      </p>
      <p className="mb-4">
        Our model is straightforward: you send requests with product numbers or technical requirements; we validate, propose
        compatible options and share transparent lead times. Filters and custom builds often require 5–15 working days before dispatch.
      </p>
      <p className="mb-4">
        Whether equipping a facility with emergency luminaires, replacing AHU filters to EN standards, or selecting
        temperature gauges and barometers for monitoring, we streamline your supplier search and consolidate communication.
      </p>
      <p>
        We’re based in the EU and understand local compliance, documentation and logistics requirements.
        Our goal is to save you time and risk, from first quote to delivery.
      </p>
    </section>
  );
}

function Help() {
  return (
    <section className="max-w-3xl mx-auto px-6 md:px-8 py-16">
      <h2 className="text-3xl font-extrabold mb-4 text-center">Help</h2>
      <h3 className="font-bold mt-5 mb-2">How to Request a Quote</h3>
      <p>Open any category, press “Request a Quote” and include product numbers, quantities and delivery address.</p>
      <h3 className="font-bold mt-5 mb-2">Lead Times</h3>
      <p>Standard items 2–7 working days after confirmation. Filters/custom builds usually 5–15 working days pre-dispatch.</p>
      <h3 className="font-bold mt-5 mb-2">Support</h3>
      <p>For assistance email <a className="text-blue-600 underline" href="mailto:flashfyonlinestore@gmail.com">flashfyonlinestore@gmail.com</a>.</p>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "Do you hold stock?", a: "Flashfy is a sourcing middle-man (no stock). We procure per order from vetted suppliers." },
    { q: "Can I get fast delivery?", a: "Lead times vary by item; filters often need 5–15 working days before shipping." },
    { q: "How do I get pricing?", a: "Use 'Request a Quote' with specs or product number; we'll reply with a quote." },
    { q: "Can you match my OEM part?", a: "Yes—send the OEM code or drawing and we’ll quote an equivalent or original where available." },
    { q: "Do you supply certificates?", a: "Yes—request EN ISO or manufacturer certificates where applicable (additional lead time possible)." },
    { q: "Which countries do you ship to?", a: "Primarily EU/EEA; we can discuss other destinations case by case." },
  ];
  return (
    <section className="max-w-5xl mx-auto px-6 md:px-8 py-12">
      <h2 className="text-3xl font-extrabold mb-6 text-center">FAQs</h2>
      <div className="grid gap-5 sm:grid-cols-2">
        {faqs.map((f,i)=>(
          <div key={i} className="border border-slate-200 rounded-xl p-5 bg-white">
            <h3 className="font-semibold mb-2">{f.q}</h3>
            <p className="text-slate-700">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// Policies
function PrivacyPolicy() {
  return (
    <section className="max-w-3xl mx-auto px-6 md:px-8 py-16">
      <h2 className="text-3xl font-extrabold mb-4 text-center">Privacy Policy (GDPR)</h2>
      <p className="mb-3">We respect your privacy and process personal data in accordance with GDPR (EU) 2016/679 and applicable EU/Member State laws.</p>
      <h3 className="font-bold mt-5 mb-2">Data Controller</h3>
      <p>Flashfy — Contact: <a className="text-blue-600 underline" href="mailto:flashfyonlinestore@gmail.com">flashfyonlinestore@gmail.com</a></p>
      <h3 className="font-bold mt-5 mb-2">What We Collect</h3>
      <ul className="list-disc pl-5">
        <li>Identity & contact data (name, email, phone, company, billing)</li>
        <li>Order/quotation data (specs, product numbers, quantities, addresses)</li>
        <li>Communications (emails, forms)</li>
        <li>Technical data (IP, device, browser) for security and analytics</li>
      </ul>
      <h3 className="font-bold mt-5 mb-2">Purposes & Legal Bases</h3>
      <ul className="list-disc pl-5">
        <li>Quotations & Orders – contract performance (Art. 6(1)(b))</li>
        <li>Support, invoicing – legal obligation (Art. 6(1)(c))</li>
        <li>Security & fraud prevention – legitimate interests (Art. 6(1)(f))</li>
        <li>Marketing (optional) – consent (Art. 6(1)(a)); opt-out anytime</li>
      </ul>
      <h3 className="font-bold mt-5 mb-2">Sharing</h3>
      <p>Only as needed with vetted suppliers, logistics and payments; and with advisors/authorities where required. We do not sell personal data.</p>
      <h3 className="font-bold mt-5 mb-2">Storage, Location & Retention</h3>
      <p>Stored securely in the EU/EEA where possible. If transfers outside EEA occur, safeguards (SCCs) are used. Kept only as long as needed and for statutory retention.</p>
      <h3 className="font-bold mt-5 mb-2">Your GDPR Rights</h3>
      <ul className="list-disc pl-5">
        <li>Access, rectification, erasure</li>
        <li>Restriction, objection</li>
        <li>Portability</li>
        <li>Withdraw consent</li>
        <li>Complain to your authority</li>
      </ul>
    </section>
  );
}
function ShippingReturns() {
  return (
    <section className="max-w-3xl mx-auto px-6 md:px-8 py-16">
      <h2 className="text-3xl font-extrabold mb-4 text-center">Shipping & Returns</h2>
      <h3 className="font-bold mt-5 mb-2">Lead Times</h3>
      <ul className="list-disc pl-5">
        <li>Standard items: dispatch typically within 2–7 working days after confirmation.</li>
        <li>Filters/custom builds: production usually 5–15 working days before shipping.</li>
      </ul>
      <h3 className="font-bold mt-5 mb-2">Shipping</h3>
      <ul className="list-disc pl-5">
        <li>Tracked delivery via EU logistics partners. Shipping charges confirmed at quotation.</li>
        <li>Risk passes on delivery unless otherwise agreed. Inspect parcels upon receipt.</li>
      </ul>
      <h3 className="font-bold mt-5 mb-2">14-Day Right of Withdrawal (EU Consumers)</h3>
      <p>Under Directive 2011/83/EU, consumers may withdraw from most distance contracts within 14 days of delivery.</p>
      <h3 className="font-bold mt-5 mb-2">Return Conditions</h3>
      <ul className="list-disc pl-5">
        <li>Items must be unused, in original packaging, fit for resale.</li>
        <li>Customer pays return shipping unless faulty or not as described.</li>
      </ul>
      <h3 className="font-bold mt-5 mb-2">Exceptions</h3>
      <ul className="list-disc pl-5">
        <li>Custom-made or personalized items are non-returnable unless faulty.</li>
      </ul>
      <h3 className="font-bold mt-5 mb-2">Damaged or Faulty</h3>
      <p>Notify within 48 hours with photos; we’ll coordinate resolution with suppliers.</p>
    </section>
  );
}
function TermsConditions() {
  return (
    <section className="max-w-3xl mx-auto px-6 md:px-8 py-16">
      <h2 className="text-3xl font-extrabold mb-4 text-center">Terms & Conditions</h2>
      <h3 className="font-bold mt-5 mb-2">About Flashfy</h3>
      <p>Flashfy is a sourcing/procurement intermediary; we usually do not hold stock.</p>
      <h3 className="font-bold mt-5 mb-2">Quotations & Orders</h3>
      <ul className="list-disc pl-5"><li>Quotes valid for 14 days unless stated.</li><li>Orders subject to availability/spec confirmation.</li></ul>
      <h3 className="font-bold mt-5 mb-2">Prices, Taxes & Payment</h3>
      <ul className="list-disc pl-5"><li>Prices net of VAT unless stated.</li><li>Payment in advance unless agreed.</li></ul>
      <h3 className="font-bold mt-5 mb-2">Delivery & Risk</h3>
      <ul className="list-disc pl-5"><li>Lead times not guaranteed.</li><li>Risk transfers on delivery (per agreed Incoterms).</li></ul>
      <h3 className="font-bold mt-5 mb-2">Warranty</h3>
      <p>Products carry manufacturer’s warranty where applicable.</p>
      <h3 className="font-bold mt-5 mb-2">Liability</h3>
      <p>Liability limited to the price paid; no indirect losses.</p>
      <h3 className="font-bold mt-5 mb-2">Compliance</h3>
      <p>We source EU-compliant products; you ensure suitability/installation.</p>
      <h3 className="font-bold mt-5 mb-2">Governing Law & Disputes</h3>
      <p>Law of Malta (EU); consumers retain mandatory rights.</p>
    </section>
  );
}
function LegalPolicy() {
  return (
    <section className="max-w-3xl mx-auto px-6 md:px-8 py-16">
      <h2 className="text-3xl font-extrabold mb-4 text-center">Legal Policy</h2>
      <h3 className="font-bold mt-5 mb-2">Compliance Framework</h3>
      <ul className="list-disc pl-5">
        <li>Consumer Rights Directive 2011/83/EU</li>
        <li>E-Commerce Directive 2000/31/EC</li>
        <li>GDPR (EU) 2016/679</li>
      </ul>
      <h3 className="font-bold mt-5 mb-2">Intellectual Property</h3>
      <p>All site content is owned by Flashfy or its licensors.</p>
      <h3 className="font-bold mt-5 mb-2">Contact</h3>
      <p>Legal: <a className="text-blue-600 underline" href="mailto:flashfyonlinestore@gmail.com">flashfyonlinestore@gmail.com</a></p>
    </section>
  );
}

// Email sending (EmailJS → fallback mailto)
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";   // set these to auto-send
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // otherwise falls back to mailto
const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";

function sendEmailJS(formData, templateParams) {
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY ||
      EMAILJS_SERVICE_ID.includes("YOUR_")) {
    const subject = encodeURIComponent("Flashfy request");
    const body = encodeURIComponent(Object.entries(formData).map(([k,v])=>\`\${k}: \${v}\`).join("\\n"));
    window.location.href = \`mailto:flashfyonlinestore@gmail.com?subject=\${subject}&body=\${body}\`;
    return Promise.resolve({ fallback: true });
  }
  return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);
}

// Forms
function QuoteForm() {
  const qs = new URLSearchParams((window.location.hash.split("?")[1]||""));
  const initialProduct = qs.get("product") || "";
  const [form, setForm] = useState({ name: "", email: "", company: "", product: initialProduct, details: "" });
  const [status, setStatus] = useState("idle");
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault(); setStatus("sending");
    try { await sendEmailJS(form, { ...form, form_type: "quote" }); setStatus("sent"); }
    catch (err) { setStatus("error"); console.error(err); }
  };
  return (
    <section className="max-w-3xl mx-auto px-6 md:px-8 py-12">
      <h2 className="text-3xl font-extrabold mb-4 text-center">Request a Quote</h2>
      <form onSubmit={onSubmit} className="grid gap-3">
        <input className="border rounded px-3 py-2" placeholder="Your name" name="name" value={form.name} onChange={onChange} required />
        <input className="border rounded px-3 py-2" placeholder="Email" type="email" name="email" value={form.email} onChange={onChange} required />
        <input className="border rounded px-3 py-2" placeholder="Company (optional)" name="company" value={form.company} onChange={onChange} />
        <input className="border rounded px-3 py-2" placeholder="Product name / number" name="product" value={form.product} onChange={onChange} />
        <textarea className="border rounded px-3 py-2 min-h-[120px]" placeholder="Specifications, quantities, delivery address..." name="details" value={form.details} onChange={onChange} />
        <button className="px-4 py-3 rounded bg-blue-600 text-white font-semibold" type="submit" disabled={status==="sending"}>
          {status==="sending" ? "Sending..." : "Send Request"}
        </button>
        {status==="sent" && <p className="text-green-700">Thanks! We got your request.</p>}
        {status==="error" && <p className="text-red-700">Something went wrong. Please email us at flashfyonlinestore@gmail.com.</p>}
      </form>
    </section>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const onChange = (e)=> setForm({...form, [e.target.name]: e.target.value});
  const onSubmit = async (e)=>{
    e.preventDefault(); setStatus("sending");
    try { await sendEmailJS(form, { ...form, form_type: "contact" }); setStatus("sent"); }
    catch (err) { console.error(err); setStatus("error"); }
  };
  return (
    <section className="max-w-3xl mx-auto px-6 md:px-8 py-12">
      <h2 className="text-3xl font-extrabold mb-4 text-center">Contact Us</h2>
      <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-3 bg-white border border-slate-200 rounded-xl p-4">
        <input className="border rounded px-3 py-2" placeholder="Your name" name="name" value={form.name} onChange={onChange} required />
        <input className="border rounded px-3 py-2" placeholder="Email" type="email" name="email" value={form.email} onChange={onChange} required />
        <textarea className="md:col-span-2 border rounded px-3 py-2 min-h-[160px]" placeholder="How can we help?" name="message" value={form.message} onChange={onChange} required />
        <div className="md:col-span-2 flex items-center justify-between">
          <span className="text-slate-600 text-sm">Or email us: <a className="text-blue-600 underline" href="mailto:flashfyonlinestore@gmail.com">flashfyonlinestore@gmail.com</a></span>
          <button className="px-4 py-3 rounded bg-blue-600 text-white font-semibold" type="submit" disabled={status==='sending'}>
            {status==='sending' ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>
      {status==='sent' && <p className="text-green-700 mt-3 text-center">Thanks! We’ll reply by email soon.</p>}
      {status==='error' && <p className="text-red-700 mt-3 text-center">Could not send. Please email us directly.</p>}
    </section>
  );
}

// Router
function RouterView() {
  const [path, setPath] = useState(getHashPath());
  useEffect(() => { const onHash = () => setPath(getHashPath()); window.addEventListener("hashchange", onHash); return () => window.removeEventListener("hashchange", onHash); }, []);
  const base = path.split("?")[0];
  if (base === "/") return (<><Hero /><Categories /><TrustBar /></>);
  if (base === "/categories") return (<><Categories /><TrustBar /></>);
  if (base === "/help") return <Help />;
  if (base === "/about") return <About />;
  if (base === "/faq") return <FAQ />;
  if (base === "/privacy") return <PrivacyPolicy />;
  if (base === "/shipping") return <ShippingReturns />;
  if (base === "/terms") return <TermsConditions />;
  if (base === "/legal") return <LegalPolicy />;
  if (base === "/contact") return <ContactForm />;
  if (base === "/quote") return <QuoteForm />;
  if (base.startsWith("/product/")) return <ProductPage id={base.split("/")[2]} />;
  return <section className="max-w-3xl mx-auto px-6 md:px-8 py-12"><h2 className="text-2xl font-bold">404</h2><p>Page not found.</p></section>;
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col text-slate-900">
      <Header />
      <main className="flex-1">
        <RouterView />
      </main>
      <Footer />
    </div>
  );
}
`);

// ---------- SPA redirects for Cloudflare Pages ----------
w("public/_redirects", "/*    /index.html   200\n");

// ---------- Images folder (you will replace these with real ones) ----------
["Logo.jpg","hero.jpg","ahu.jpg","lights.jpg","gauges.jpg","baro.jpg","other_lights.jpg"].forEach(name=>{
  w("public/images/"+name, ""); // empty placeholders; app will fallback to Unsplash if these are missing
});

console.log("\\nAll files created. Next steps:");
console.log("1) npm install");
console.log("2) npm run dev   (http://localhost:5173)");
console.log("3) Put your images in public/images/ (replace the empty files).");
