
import React, { useEffect, useState } from "react";
import emailjs from "emailjs-com";

const FALLBACKS = {
  hero: "https://source.unsplash.com/1200x800/?warehouse,logistics",
  ahu: "https://source.unsplash.com/1200x800/?filter,hvac",
  lights: "https://source.unsplash.com/1200x800/?emergency,light",
  thermo: "https://source.unsplash.com/1200x800/?thermometer",
  baro: "https://source.unsplash.com/1200x800/?barometer,weather",
};
function SafeImg({ src, placeholder, alt, className, style }) {
  const [imgSrc, setImgSrc] = useState(src);
  return <img src={imgSrc} alt={alt} className={className} style={style} onError={()=>{ if(imgSrc!==placeholder) setImgSrc(placeholder); }} />;
}
function getHashPath(){ const raw = window.location.hash || "#/"; return raw.startsWith("#")?raw.slice(1):raw; }
function navigate(to){ window.location.hash = `#${to}`; }

function Header(){
  return (
    <header className="bg-blue-600 text-white px-6 py-4 shadow flex items-center justify-between">
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">⚡ Flashfy</h1>
      <nav className="flex gap-4 text-sm md:text-base">
        <a href="#/" className="hover:underline">Home</a>
        <a href="#/categories" className="hover:underline">Categories</a>
        <a href="#/about" className="hover:underline">About</a>
        <a href="#/contact" className="hover:underline">Contact</a>
        <a href="#/faq" className="hover:underline">FAQs</a>
      </nav>
    </header>
  );
}
function Footer(){
  return (
    <footer className="bg-slate-800 text-white px-8 py-10 grid gap-8 md:grid-cols-3">
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
        <a href="#/faq" className="block text-slate-200 hover:underline">FAQs</a>
        <a href="#/contact" className="block text-slate-200 hover:underline">Contact Us</a>
      </div>
      <div>
        <h4 className="font-bold mb-2">Flashfy</h4>
        <p>© {new Date().getFullYear()} Flashfy. All rights reserved.</p>
      </div>
    </footer>
  );
}

function Hero(){
  return (
    <section className="flex flex-col md:flex-row items-center justify-between gap-8 px-6 md:px-8 py-16 bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="max-w-xl">
        <h2 className="text-4xl font-extrabold mb-3">Your EU Product Sourcing Partner</h2>
        <p className="text-slate-600 mb-5">Reliable suppliers, lead-time visibility, and certified EU products.</p>
        <div className="flex gap-3 flex-wrap">
          <a href="#/quote"><button className="px-4 py-3 rounded-md bg-blue-600 text-white font-semibold">Request a Quote</button></a>
          <a href="#/categories"><button className="px-4 py-3 rounded-md border border-blue-600 text-blue-600 font-semibold bg-white">Browse Categories</button></a>
        </div>
      </div>
      <SafeImg src="/images/hero.jpg" placeholder={FALLBACKS.hero} alt="Warehouse logistics" className="rounded-xl shadow max-w-xl w-full" />
    </section>
  );
}
function Categories(){
  const cats = [
    { id: "ahu", name: "AHU Filters", img: "/images/ahu.webp", fallback: FALLBACKS.ahu, desc: "EU certified HVAC filters (G4 / F7 / F9 / H13). Bag, pleated & HEPA." },
    { id: "lights", name: "Emergency Lights", img: "/images/lights.webp", fallback: FALLBACKS.lights, desc: "LED exit signs, bulkhead lights & safety luminaires." },
    { id: "thermo", name: "Thermometers", img: "/images/thermo.webp", fallback: FALLBACKS.thermo, desc: "Digital & analog thermometers (industrial & home)." },
    { id: "baro", name: "Barometers", img: "/images/baro.webp", fallback: FALLBACKS.baro, desc: "Precision barometers for weather & labs." },
  ];
  return (
    <section className="px-6 md:px-8 py-10">
      <h3 className="text-2xl font-bold mb-6">Categories</h3>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cats.map(c => (
          <div key={c.id} className="border border-slate-200 rounded-xl p-4 bg-white flex flex-col hover:-translate-y-0.5 hover:shadow transition"
               onClick={() => navigate(`/product/${c.id}`)} role="button" tabIndex={0}
               onKeyDown={(e)=>{ if(e.key==='Enter') navigate(`/product/${c.id}`)}}>
            <SafeImg src={c.img} placeholder={c.fallback} alt={c.name} className="w-full h-44 object-cover rounded mb-3" />
            <h4 className="font-semibold">{c.name}</h4>
            <p className="text-slate-600 text-sm mt-1 flex-1">{c.desc}</p>
            <div className="flex gap-2 mt-3">
              <button className="px-3 py-2 rounded-md bg-blue-600 text-white font-semibold" onClick={(e)=>{e.stopPropagation(); navigate(`/product/${c.id}`)}}>View</button>
              <a href={`#/quote?product=${encodeURIComponent(c.name)}`} onClick={(e)=>e.stopPropagation()} className="px-3 py-2 rounded-md border border-blue-600 text-blue-600 font-semibold bg-white text-center">Quote Now</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const PRODUCT_COPY = {
  ahu: { title: "AHU Filters", img: "/images/ahu.webp", fallback: FALLBACKS.ahu,
    bullets: ["Grades: G4, F7, F9, H13 (EN ISO 16890 & EN1822)", "Formats: pleated panels, bag filters, HEPA cassettes", "Custom sizes made-to-order (lead time 5–15 working days)"]},
  lights: { title: "Emergency Lights", img: "/images/lights.webp", fallback: FALLBACKS.lights,
    bullets: ["LED bulkheads, exit signs, twinspots", "Self-test & maintained/non-maintained options", "IP65, IK10 models for industrial settings"]},
  thermo: { title: "Thermometers", img: "/images/thermo.webp", fallback: FALLBACKS.thermo,
    bullets: ["Digital and analog models", "Industrial & lab-grade accuracy", "Optional calibration certificates"]},
  baro: { title: "Barometers", img: "/images/baro.webp", fallback: FALLBACKS.baro,
    bullets: ["Precision measurement for labs & weather", "Wall, bench & digital models", "Optional data logging"]},
};

function ProductPage({ id }){
  const data = PRODUCT_COPY[id];
  if(!data) return <div className="max-w-5xl mx-auto px-6 md:px-8 py-10"><h2 className="text-2xl font-bold">Product not found</h2></div>;
  return (
    <section className="max-w-6xl mx-auto px-6 md:px-8 py-12 flex flex-col md:flex-row gap-10 items-start">
      <SafeImg src={data.img} placeholder={data.fallback} alt={data.title} className="rounded-xl shadow w-full md:w-1/2" />
      <div className="flex-1">
        <h2 className="text-3xl font-extrabold mb-2">{data.title}</h2>
        <ul className="list-disc pl-5 text-slate-700 mb-6">{data.bullets.map((b,i)=>(<li key={i}>{b}</li>))}</ul>
        <a href={`#/quote?product=${encodeURIComponent(data.title)}`} className="inline-block px-4 py-3 rounded-md bg-blue-600 text-white font-semibold">Request a Quote</a>
      </div>
    </section>
  );
}

function About(){
  return (
    <section className="max-w-3xl mx-auto px-6 md:px-8 py-16 text-center">
      <h2 className="text-3xl font-extrabold mb-4">About Flashfy</h2>
      <p className="mb-4">We’re your trusted partner in EU product sourcing and procurement.</p>
      <p>We collaborate with vetted suppliers across Europe to deliver certified products with transparent lead times.</p>
    </section>
  );
}
function FAQ(){
  const faqs = [
    { q: "Do you hold stock?", a: "Flashfy is a sourcing middle-man (no stock). We procure per order from vetted suppliers." },
    { q: "Can I get fast delivery?", a: "Lead times vary by item; filters often need 5–15 working days before shipping." },
    { q: "How do I get pricing?", a: "Use 'Request a Quote' with specs or product number; we'll reply with a quote." },
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

function PrivacyPolicy(){
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
function ShippingReturns(){
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
function TermsConditions(){
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
function LegalPolicy(){
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

const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
function sendEmailJS(formData, templateParams){
  if(!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY || EMAILJS_SERVICE_ID.includes("YOUR_")){
    const subject = encodeURIComponent("Flashfy request");
    const body = encodeURIComponent(Object.entries(formData).map(([k,v])=>`${k}: ${v}`).join("\\n"));
    window.location.href = `mailto:flashfyonlinestore@gmail.com?subject=${subject}&body=${body}`;
    return Promise.resolve({fallback:true});
  }
  return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);
}
function QuoteForm(){
  const qs = new URLSearchParams((window.location.hash.split("?")[1]||""));
  const initialProduct = qs.get("product") || "";
  const [form,setForm] = useState({ name:"", email:"", company:"", product: initialProduct, details:"" });
  const [status,setStatus] = useState("idle");
  const onChange = (e)=> setForm({...form,[e.target.name]: e.target.value});
  const onSubmit = async (e)=>{ e.preventDefault(); setStatus("sending"); try{ await sendEmailJS(form,{...form,form_type:"quote"}); setStatus("sent"); }catch(err){ console.error(err); setStatus("error"); } };
  return (
    <section className="max-w-3xl mx-auto px-6 md:px-8 py-12">
      <h2 className="text-3xl font-extrabold mb-4 text-center">Request a Quote</h2>
      <form onSubmit={onSubmit} className="grid gap-3">
        <input className="border rounded px-3 py-2" placeholder="Your name" name="name" value={form.name} onChange={onChange} required />
        <input className="border rounded px-3 py-2" placeholder="Email" type="email" name="email" value={form.email} onChange={onChange} required />
        <input className="border rounded px-3 py-2" placeholder="Company (optional)" name="company" value={form.company} onChange={onChange} />
        <input className="border rounded px-3 py-2" placeholder="Product name / number" name="product" value={form.product} onChange={onChange} />
        <textarea className="border rounded px-3 py-2 min-h-[120px]" placeholder="Specifications, quantities, delivery address..." name="details" value={form.details} onChange={onChange} />
        <button className="px-4 py-3 rounded bg-blue-600 text-white font-semibold" type="submit" disabled={status==='sending'}>{status==='sending'?'Sending...':'Send Request'}</button>
        {status==='sent' && <p className="text-green-700">Thanks! We got your request.</p>}
        {status==='error' && <p className="text-red-700">Something went wrong. Please email us at flashfyonlinestore@gmail.com.</p>}
      </form>
    </section>
  );
}
function ContactForm(){
  const [form,setForm] = useState({ name:"", email:"", message:"" });
  const [status,setStatus] = useState("idle");
  const onChange = (e)=> setForm({...form,[e.target.name]: e.target.value});
  const onSubmit = async (e)=>{ e.preventDefault(); setStatus("sending"); try{ await sendEmailJS(form,{...form,form_type:"contact"}); setStatus("sent"); }catch(err){ console.error(err); setStatus("error"); } };
  return (
    <section className="max-w-md mx-auto px-6 md:px-8 py-12">
      <h2 className="text-3xl font-extrabold mb-4 text-center">Contact Us</h2>
      <form onSubmit={onSubmit} className="grid gap-3">
        <input className="border rounded px-3 py-2" placeholder="Your name" name="name" value={form.name} onChange={onChange} required />
        <input className="border rounded px-3 py-2" placeholder="Email" type="email" name="email" value={form.email} onChange={onChange} required />
        <textarea className="border rounded px-3 py-2 min-h-[120px]" placeholder="How can we help?" name="message" value={form.message} onChange={onChange} required />
        <button className="px-4 py-3 rounded bg-blue-600 text-white font-semibold" type="submit" disabled={status==='sending'}>{status==='sending'?'Sending...':'Send Message'}</button>
        {status==='sent' && <p className="text-green-700">Thanks! We’ll reply by email soon.</p>}
        {status==='error' && <p className="text-red-700">Could not send. Please email us at flashfyonlinestore@gmail.com.</p>}
      </form>
    </section>
  );
}

function RouterView(){
  const [path,setPath] = useState(getHashPath());
  useEffect(()=>{ const onHash=()=>setPath(getHashPath()); window.addEventListener("hashchange", onHash); return ()=>window.removeEventListener("hashchange", onHash); },[]);
  const base = path.split("?")[0];
  if(base==="/") return (<><Hero/><Categories/></>);
  if(base==="/categories") return <Categories/>;
  if(base==="/about") return <About/>;
  if(base==="/faq") return <FAQ/>;
  if(base==="/privacy") return <PrivacyPolicy/>;
  if(base==="/shipping") return <ShippingReturns/>;
  if(base==="/terms") return <TermsConditions/>;
  if(base==="/legal") return <LegalPolicy/>;
  if(base==="/contact") return <ContactForm/>;
  if(base==="/quote") return <QuoteForm/>;
  if(base.startsWith("/product/")) return <ProductPage id={base.split("/")[2]}/>;
  return <section className="max-w-3xl mx-auto px-6 md:px-8 py-12"><h2 className="text-2xl font-bold">404</h2><p>Page not found.</p></section>;
}

export default function App(){
  return (
    <div className="min-h-screen flex flex-col text-slate-900">
      <Header/>
      <main className="flex-1"><RouterView/></main>
      <Footer/>
    </div>
  );
}
