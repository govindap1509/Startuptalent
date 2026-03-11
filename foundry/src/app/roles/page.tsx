"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import "./roles.css";

type Job = {
  id: number; co: string; logo: string; color: string; stage: string;
  title: string; type: string; location: string; work: string;
  salary: string; equity: string; match: number; age: string;
  tags: string[]; desc: string;
  responsibilities: string[]; requirements: string[];
  skills: string[]; matched_skills: string[]; partial_skills: string[];
  perks: string[]; similar: number[];
};

const JOBS: Job[] = [
  {id:1,co:"Kirana Club",logo:"K",color:"#1A73E8",stage:"Series B",title:"Senior Product Manager",type:"product",location:"Bengaluru",work:"Hybrid",salary:"\u20B928\u201340L",equity:"0.1%",match:96,age:"3 days ago",tags:["Product Strategy","B2C","SQL","Roadmapping"],desc:"We\u2019re looking for a Senior PM to own the core merchant-side product \u2014 the dashboard, onboarding, and payments flows that 12 million kirana stores interact with daily.\n\nYou\u2019ll work directly with the CPO, lead a squad of 2 engineers and 1 designer, and ship every week.",responsibilities:["Own the merchant dashboard product end-to-end \u2014 strategy, roadmap, execution","Run weekly sprint reviews and fortnightly roadmap syncs with leadership","Define and track product KPIs; run A/B tests to improve activation and retention","Work closely with the field team to understand kirana owner pain points firsthand","Collaborate with data team to build self-serve analytics for merchants"],requirements:["3+ years as a PM at a consumer or B2B product company","Strong SQL skills \u2014 you should be comfortable pulling your own data","Experience owning a product with 500k+ active users","MBA from a Tier 1 institution preferred but not required","Prior experience in commerce, fintech, or marketplace products a plus"],skills:["Product Strategy","B2C","SQL","A/B Testing","Roadmapping","Figma","Data Analysis"],matched_skills:["Product Strategy","B2C","SQL","A/B Testing","Roadmapping"],partial_skills:["Figma"],perks:["Health insurance (family)","ESOP + equity","Hybrid 3 days/week","\u20B950K learning budget"],similar:[2,5,8]},
  {id:2,co:"Setu",logo:"S",color:"#137333",stage:"Series B",title:"Growth Lead",type:"growth",location:"Remote",work:"Remote",salary:"\u20B922\u201332L",equity:"ESOP",match:91,age:"1 week ago",tags:["Growth","B2B SaaS","Analytics","CRM"],desc:"Setu builds India\u2019s financial data infrastructure \u2014 APIs that power bank account verification, credit bureau pulls, and investment data for 300+ companies.\n\nWe need a Growth Lead to own the full funnel from awareness to activation.",responsibilities:["Own MQL\u2192SQL pipeline and optimise conversion at every stage","Build and run lifecycle email/in-app campaigns for developer activation","Work with product to identify and remove friction in the API trial experience","Manage SEO, content, and paid channels to drive qualified inbound"],requirements:["4+ years in B2B growth or demand gen at a SaaS / fintech company","Strong analytical skills \u2014 comfortable with GA4, Amplitude, SQL","Experience with CRM tooling (HubSpot or Salesforce)","Understanding of API/developer products a significant plus"],skills:["B2B Growth","SQL","Analytics","HubSpot","Content Marketing","SEO"],matched_skills:["B2B Growth","SQL","Analytics"],partial_skills:["HubSpot"],perks:["Fully remote","ESOP","Health cover","Home office stipend"],similar:[1,6,9]},
  {id:3,co:"Zepto",logo:"Z",color:"#B45309",stage:"Series C",title:"Head of Product",type:"product",location:"Mumbai",work:"Hybrid",salary:"\u20B940\u201360L",equity:"0.15%",match:88,age:"5 days ago",tags:["Product Leadership","Quick Commerce","0\u21921"],desc:"Zepto is India\u2019s fastest 10-minute grocery delivery platform with \u20B97,000 crore in ARR and growing 3\u00D7 year-on-year. We\u2019re hiring a Head of Product to lead our consumer-facing app team.",responsibilities:["Lead a team of 6 PMs across discovery, checkout, and post-order experiences","Drive the roadmap for the consumer app used by 5M+ monthly active users","Partner with the CEO and CMO on growth and retention strategy","Build a world-class product culture \u2014 hiring, mentoring, rituals"],requirements:["6+ years of product experience, with at least 2 years managing PMs","Track record of shipping at scale (10M+ users)","Deep intuition for consumer behaviour and mobile UX"],skills:["Product Leadership","Consumer Mobile","Team Management","Roadmapping","0\u21921"],matched_skills:["Product Leadership","Roadmapping"],partial_skills:["Consumer Mobile"],perks:["ESOP at series C valuation","Relocation support","Top-of-market comp"],similar:[1,4,7]},
  {id:4,co:"Razorpay",logo:"R",color:"#5B21B6",stage:"Series F",title:"Engineering Lead \u2014 Payments Core",type:"engineering",location:"Bengaluru",work:"Hybrid",salary:"\u20B935\u201355L",equity:"ESOP",match:82,age:"2 days ago",tags:["Distributed Systems","Java","Payments","Tech Lead"],desc:"Razorpay processes \u20B910L crore in payments annually. We\u2019re looking for an Engineering Lead for our payments core team.",responsibilities:["Lead a team of 8 engineers across backend and infra","Own the reliability and scalability of the payment settlement engine","Drive architectural decisions and technical roadmap","Mentor engineers and run structured 1:1s"],requirements:["6+ years of backend engineering, 2+ years in a lead role","Deep experience with distributed systems and high-throughput services","Strong Java / Kotlin background; Kafka and microservices experience preferred"],skills:["Java","Distributed Systems","Kafka","Microservices","Tech Leadership"],matched_skills:["Distributed Systems"],partial_skills:["Java"],perks:["ESOP at unicorn valuation","\u20B91L BYOD allowance","Comprehensive health cover"],similar:[7,10,11]},
  {id:5,co:"CRED",logo:"C",color:"#111827",stage:"Series E",title:"Product Manager \u2014 Rewards",type:"product",location:"Bengaluru",work:"On-site",salary:"\u20B920\u201330L",equity:"ESOP",match:79,age:"1 week ago",tags:["Rewards","Loyalty","B2C","Experimentation"],desc:"CRED\u2019s rewards system is one of India\u2019s most sophisticated loyalty programmes. We\u2019re looking for a PM to own the coins, cashback, and gamification layer.",responsibilities:["Own the coins economy \u2014 earn rates, redemption flows, and gamification","Design and run large-scale A/B experiments on reward mechanics","Partner with data science to build predictive models for reward personalisation"],requirements:["2\u20134 years as a PM in consumer or fintech","Strong quantitative background","Prior experience with loyalty, gamification, or subscription products"],skills:["Product Strategy","Loyalty","A/B Testing","SQL","Gamification"],matched_skills:["Product Strategy","A/B Testing","SQL"],partial_skills:["Loyalty"],perks:["ESOP","Unlimited leave","World-class design culture","Top comp"],similar:[1,2,6]},
  {id:6,co:"BrowserStack",logo:"B",color:"#E11D48",stage:"Series B",title:"Growth Marketing Manager",type:"growth",location:"Mumbai",work:"Hybrid",salary:"\u20B916\u201324L",equity:"ESOP",match:75,age:"4 days ago",tags:["Performance Marketing","Developer Marketing","B2B SaaS"],desc:"BrowserStack is the world\u2019s leading software testing platform. We need a Growth Marketing Manager to run developer acquisition across paid and organic channels.",responsibilities:["Manage \u20B92Cr+ monthly paid media budget across Google, LinkedIn, and Reddit","Build content and SEO strategy targeting developer personas","Run lifecycle campaigns to convert free trials to paid seats"],requirements:["3+ years in B2B growth or demand gen","Hands-on experience with Google Ads, LinkedIn Ads, and HubSpot","Understanding of developer audiences a strong plus"],skills:["Performance Marketing","SEO","HubSpot","Google Ads","LinkedIn Ads"],matched_skills:["Performance Marketing","SEO"],partial_skills:[],perks:["ESOP","Hybrid work","\u20B950K learning budget"],similar:[2,9,12]},
  {id:7,co:"PhonePe",logo:"P",color:"#5B21B6",stage:"Series E",title:"Senior Software Engineer \u2014 Android",type:"engineering",location:"Bengaluru",work:"Hybrid",salary:"\u20B922\u201335L",equity:"ESOP",match:72,age:"3 days ago",tags:["Android","Kotlin","Fintech","Mobile"],desc:"PhonePe serves 500M+ users. Our Android team builds the fastest, most reliable payments UX in India.",responsibilities:["Build and maintain critical features in the PhonePe Android app","Optimise app performance \u2014 startup time, memory, battery","Work with product and design to ship pixel-perfect UX"],requirements:["3+ years of Android development with Kotlin","Experience building high-performance UIs at scale","Strong CS fundamentals"],skills:["Kotlin","Android","Jetpack Compose","Performance Optimisation","Coroutines"],matched_skills:["Kotlin","Android"],partial_skills:[],perks:["ESOP","Flexible hours","Health + wellness cover"],similar:[4,10,11]},
  {id:8,co:"Ola",logo:"O",color:"#2563EB",stage:"Series J",title:"Product Manager \u2014 Driver Platform",type:"product",location:"Bengaluru",work:"Hybrid",salary:"\u20B918\u201328L",equity:"ESOP",match:68,age:"1 week ago",tags:["Platform","Driver Experience","Growth","B2C"],desc:"Ola\u2019s driver platform serves 3M+ driver-partners across India. We\u2019re looking for a PM to own the driver-side earnings, incentives, and support experience.",responsibilities:["Own driver earnings transparency","Design incentive structures that balance supply with demand","Reduce support contact rate through self-serve tooling"],requirements:["2\u20134 years as a PM on a marketplace or platform product","Data-driven mindset with strong SQL","Empathy for the driver persona"],skills:["Platform Products","SQL","Incentive Design","B2C","Marketplace"],matched_skills:["B2C","SQL"],partial_skills:["Platform Products"],perks:["ESOP","Hybrid","Learning allowance"],similar:[1,5,9]},
  {id:9,co:"Swiggy",logo:"S",color:"#f97316",stage:"IPO",title:"Senior Growth Manager",type:"growth",location:"Bengaluru",work:"Hybrid",salary:"\u20B920\u201332L",equity:"ESOP",match:65,age:"5 days ago",tags:["Growth","Retention","CRM","B2C"],desc:"Swiggy is looking for a Senior Growth Manager to own the retention and reactivation vertical.",responsibilities:["Own retention KPIs for the core food delivery product","Build and optimise CRM campaigns across push, email, and in-app","Work with data science on churn prediction models"],requirements:["4+ years in growth or CRM at a consumer internet company","Hands-on experience with MoEngage or CleverTap","Strong analytical skills"],skills:["CRM","Retention","MoEngage","A/B Testing","SQL"],matched_skills:["A/B Testing","SQL"],partial_skills:["CRM"],perks:["ESOP","Hybrid","Top comp","Free Swiggy One"],similar:[2,6,12]},
  {id:10,co:"Meesho",logo:"M",color:"#7C3AED",stage:"Series F",title:"Backend Engineer \u2014 Catalogue",type:"engineering",location:"Bengaluru",work:"Hybrid",salary:"\u20B918\u201328L",equity:"ESOP",match:61,age:"2 weeks ago",tags:["Python","Django","Elasticsearch","Backend"],desc:"Meesho\u2019s catalogue team manages 200M+ SKUs. We\u2019re looking for a backend engineer to build the indexing and search infrastructure.",responsibilities:["Build and maintain the catalogue ingestion and enrichment pipeline","Improve search relevance using Elasticsearch","Own reliability of catalogue APIs serving 50M+ users"],requirements:["3+ years of backend development with Python or Go","Experience with Elasticsearch or similar search infrastructure","Familiarity with large-scale data pipelines"],skills:["Python","Django","Elasticsearch","Kafka","PostgreSQL"],matched_skills:["Python"],partial_skills:["Elasticsearch"],perks:["ESOP","Hybrid","Health cover"],similar:[4,7,11]},
  {id:11,co:"Dunzo",logo:"D",color:"#059669",stage:"Series D",title:"Data Scientist \u2014 Demand Forecasting",type:"data",location:"Bengaluru",work:"Hybrid",salary:"\u20B920\u201330L",equity:"ESOP",match:58,age:"1 week ago",tags:["ML","Time Series","Python","Forecasting"],desc:"Dunzo is rebuilding its demand forecasting stack. We need a Data Scientist to build and own the models that predict demand at the dark store level.",responsibilities:["Build time-series forecasting models for 200+ SKUs across 40+ dark stores","Own the forecasting pipeline end-to-end","Collaborate with ops to translate model outputs into actionable inventory plans"],requirements:["3+ years of applied ML with a focus on time-series or forecasting","Strong Python and SQL skills","MLflow or similar model management experience preferred"],skills:["Python","Time Series","Machine Learning","SQL","MLflow"],matched_skills:["Python","SQL"],partial_skills:["Machine Learning"],perks:["ESOP","Hybrid","Flexible hours"],similar:[10,12,6]},
  {id:12,co:"Urban Company",logo:"U",color:"#6366f1",stage:"Series F",title:"Product Designer \u2014 Consumer",type:"design",location:"Gurugram",work:"Hybrid",salary:"\u20B916\u201324L",equity:"ESOP",match:54,age:"3 days ago",tags:["Figma","Consumer UX","Mobile","Design Systems"],desc:"Urban Company is looking for a Product Designer to own the consumer-side booking and discovery experience on mobile.",responsibilities:["Own end-to-end design for the service booking flow on iOS and Android","Build and maintain consumer-facing components in the design system","Run usability tests with real customers weekly"],requirements:["3+ years of product design at a consumer mobile company","Strong Figma skills \u2014 prototyping, auto-layout, components","A portfolio showing shipped mobile products"],skills:["Figma","Mobile UX","Design Systems","User Research","Prototyping"],matched_skills:["Figma","User Research"],partial_skills:["Mobile UX"],perks:["ESOP","Hybrid","Creative freedom","Design-led culture"],similar:[5,8,3]},
];

function matchColor(m: number) { return m >= 85 ? "high" : m >= 70 ? "mid" : "low"; }

export default function BrowseRolesPage() {
  const [activeId, setActiveId] = useState(1);
  const [activeType, setActiveType] = useState("all");
  const [aiOn, setAiOn] = useState(true);
  const [search, setSearch] = useState("");
  const [locFilter, setLocFilter] = useState("");
  const [stageFilter, setStageFilter] = useState("");
  const [salFilter, setSalFilter] = useState("");
  const [saved, setSaved] = useState<Set<number>>(new Set());
  const [applied, setApplied] = useState<Set<number>>(new Set());
  const [modalOpen, setModalOpen] = useState(false);
  const [modalJobId, setModalJobId] = useState<number | null>(null);
  const [modalSuccess, setModalSuccess] = useState(false);

  const filtered = JOBS.filter((j) => {
    if (activeType !== "all" && j.type !== activeType) return false;
    const q = search.toLowerCase();
    if (q && !j.title.toLowerCase().includes(q) && !j.co.toLowerCase().includes(q) && !j.tags.some((t) => t.toLowerCase().includes(q))) return false;
    if (locFilter) { const l = locFilter.toLowerCase(); if (l === "remote" && j.work.toLowerCase() !== "remote") return false; if (l === "hybrid" && j.work.toLowerCase() !== "hybrid") return false; if (l !== "remote" && l !== "hybrid" && !j.location.toLowerCase().includes(l)) return false; }
    if (stageFilter) { const sm: Record<string,string> = {seed:"Seed","series-a":"Series A","series-b":"Series B","series-c":"Series C"}; if (!j.stage.includes(sm[stageFilter] || stageFilter)) return false; }
    if (salFilter) { const nums = j.salary.replace(/[^\d\u2013]/g, "").split("\u2013").map(Number); if (nums[0] < parseInt(salFilter)) return false; }
    return true;
  }).sort((a, b) => (aiOn ? b.match - a.match : 0));

  const active = JOBS.find((j) => j.id === activeId) || filtered[0];

  useEffect(() => { if (filtered.length && !filtered.find((j) => j.id === activeId)) setActiveId(filtered[0].id); }, [filtered, activeId]);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (modalOpen) { if (e.key === "Escape") { setModalOpen(false); } return; }
    if (e.key === "ArrowDown" || e.key === "j") { const idx = filtered.findIndex((j) => j.id === activeId); if (idx < filtered.length - 1) setActiveId(filtered[idx + 1].id); }
    if (e.key === "ArrowUp" || e.key === "k") { const idx = filtered.findIndex((j) => j.id === activeId); if (idx > 0) setActiveId(filtered[idx - 1].id); }
  }, [activeId, filtered, modalOpen]);

  useEffect(() => { window.addEventListener("keydown", handleKey); return () => window.removeEventListener("keydown", handleKey); }, [handleKey]);

  const toggleSave = (id: number) => setSaved((p) => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const openApply = (id: number) => { setModalJobId(id); setModalSuccess(false); setModalOpen(true); };
  const submitApply = () => { if (modalJobId) setApplied((p) => new Set(p).add(modalJobId)); setModalSuccess(true); };

  const types = [["all","All"],["product","Product"],["engineering","Engineering"],["growth","Growth"],["design","Design"],["data","Data"]];

  const ringDash = (pct: number) => { const r = 22; const c = 2 * Math.PI * r; return { dasharray: c, dashoffset: c - (pct / 100) * c }; };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <nav className="br-topnav">
        <div className="br-tn-inner">
          <Link href="/" className="br-logo">Foundry<sup>IN</sup></Link>
          <div className="br-links">
            <Link href="/roles" className="active">Browse Jobs</Link>
            <Link href="/">Browse Startups</Link>
            <Link href="/">For Startups</Link>
          </div>
          <div className="br-right">
            <Link href="/auth" className="btn btn-secondary btn-sm">Sign in</Link>
            <Link href="/auth" className="btn btn-primary btn-sm">Post a role →</Link>
            <Link href="/talent/dashboard"><div className="br-uav">R</div></Link>
          </div>
        </div>
      </nav>

      <div className="br-filter-bar">
        <div className="br-search-wrap">
          <span className="br-search-icon">🔍</span>
          <input type="text" placeholder="Search roles, skills, companies\u2026" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="br-fb-sep" />
        <div className="br-fb-group">
          {types.map(([val, label]) => (
            <button key={val} className={`br-fb-chip${activeType === val ? " on" : ""}`} onClick={() => setActiveType(val)}>{label}</button>
          ))}
        </div>
        <div className="br-fb-sep" />
        <select className="br-fb-select" value={locFilter} onChange={(e) => setLocFilter(e.target.value)}>
          <option value="">📍 Any location</option>
          <option value="bengaluru">Bengaluru</option>
          <option value="mumbai">Mumbai</option>
          <option value="delhi">Delhi NCR</option>
          <option value="remote">Remote</option>
          <option value="hybrid">Hybrid</option>
        </select>
        <select className="br-fb-select" value={stageFilter} onChange={(e) => setStageFilter(e.target.value)}>
          <option value="">🚀 Any stage</option>
          <option value="seed">Seed / Pre-seed</option>
          <option value="series-a">Series A</option>
          <option value="series-b">Series B</option>
          <option value="series-c">Series C+</option>
        </select>
        <select className="br-fb-select" value={salFilter} onChange={(e) => setSalFilter(e.target.value)}>
          <option value="">₹ Any salary</option>
          <option value="10">₹10L+</option>
          <option value="20">₹20L+</option>
          <option value="30">₹30L+</option>
          <option value="50">₹50L+</option>
        </select>
        <button className={`br-ai-toggle${aiOn ? "" : " off"}`} onClick={() => setAiOn(!aiOn)}>
          <span className="br-amt-dot" />AI Match
        </button>
        <span className="br-fb-count">Showing {filtered.length} roles</span>
      </div>

      <div className="br-split">
        {/* LEFT LIST */}
        <div className="br-job-list">
          <div className="br-jl-header">
            <div className="br-jl-count">{filtered.length} roles</div>
            <div className="br-jl-sub">{aiOn ? "Sorted by AI match score" : "Sorted by date posted"}</div>
          </div>
          <div className="br-jl-body">
            {filtered.map((j) => (
              <div key={j.id} className={`br-jlc${j.id === activeId ? " active" : ""}`} onClick={() => setActiveId(j.id)}>
                <div className="br-jlc-top">
                  <div className="br-jlc-logo" style={{ background: j.color }}>{j.logo}</div>
                  <div style={{ flex: 1, minWidth: 0, paddingRight: 36 }}>
                    <div className="br-jlc-title">{j.title}</div>
                    <div className="br-jlc-co">{j.co} &middot; {j.location}</div>
                  </div>
                </div>
                {aiOn && <span className={`br-jlc-match ${matchColor(j.match)}`}>{j.match}%</span>}
                <div className="br-jlc-tags">{j.tags.slice(0, 3).map((t) => <span className="br-jlc-tag" key={t}>{t}</span>)}</div>
                <div className="br-jlc-foot"><span className="br-jlc-comp">{j.salary}</span><span className="br-jlc-age">{j.age}</span></div>
              </div>
            ))}
            {!filtered.length && (
              <div style={{ padding: 48, textAlign: "center" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>🔍</div>
                <div style={{ fontSize: 17, fontWeight: 500, color: "var(--t-primary)", marginBottom: 6 }}>No roles found</div>
                <div style={{ fontSize: 14, color: "var(--t-muted)" }}>Try adjusting your filters</div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT DETAIL */}
        <div className="br-jd-panel">
          {active && (
            <div className="br-jd-inner">
              <div className="br-jd-header">
                <div className="br-jd-top">
                  <div className="br-jd-logo" style={{ background: active.color }}>{active.logo}</div>
                  <div style={{ flex: 1 }}>
                    <div className="br-jd-title">{active.title}</div>
                    <Link href={`/c/${active.co.toLowerCase().replace(/\s+/g, "-")}`} className="br-jd-co-link">{active.co} ↗</Link>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
                    <span className="badge" style={{ background: active.stage.includes("Series") ? "var(--blue-tint)" : "var(--bg-ter)", color: active.stage.includes("Series") ? "var(--blue)" : "var(--t-body)", fontSize: 11, fontWeight: 500, padding: "3px 8px", borderRadius: "var(--r-pill)" }}>{active.stage}</span>
                    <span style={{ fontSize: 12, color: "var(--t-faint)" }}>Posted {active.age}</span>
                  </div>
                </div>
                <div className="br-jd-meta-row">
                  <span className="br-jd-meta-chip">📍 {active.location}</span>
                  <span className="br-jd-meta-chip">🏠 {active.work}</span>
                  <span className="br-jd-meta-chip">💰 {active.salary}</span>
                  {active.equity && <span className="br-jd-meta-chip">📈 {active.equity} equity</span>}
                </div>
                <div className="br-jd-actions">
                  <button className="br-apply-btn" disabled={applied.has(active.id)} onClick={() => openApply(active.id)}>{applied.has(active.id) ? "✓ Applied" : "Apply now →"}</button>
                  <button className={`br-save-btn${saved.has(active.id) ? " saved" : ""}`} onClick={() => toggleSave(active.id)}>{saved.has(active.id) ? "🔖 Saved" : "🔖 Save"}</button>
                  <button className="br-save-btn" onClick={() => { navigator.clipboard.writeText(window.location.href).catch(() => {}); }}>📋 Share</button>
                </div>
              </div>

              {aiOn && (
                <div className="br-amc">
                  <div className="br-amc-ring">
                    <svg style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }} viewBox="0 0 56 56">
                      <circle fill="none" stroke="rgba(26,115,232,.15)" strokeWidth={4} cx={28} cy={28} r={22} />
                      <circle fill="none" stroke="var(--blue)" strokeWidth={4} strokeLinecap="round" cx={28} cy={28} r={22} strokeDasharray={ringDash(active.match).dasharray} strokeDashoffset={ringDash(active.match).dashoffset} />
                    </svg>
                    <span className="br-ring-num">{active.match}%</span>
                  </div>
                  <div className="br-amc-body">
                    <div className="br-amc-title">Your AI match score</div>
                    <div className="br-amc-reasons">
                      {active.matched_skills.slice(0, 3).map((s) => <div className="br-amc-reason" key={s}><span style={{ color: "var(--green)" }}>✓</span>{s} matches the job requirements</div>)}
                      {active.partial_skills.slice(0, 1).map((s) => <div className="br-amc-reason" key={s}><span style={{ color: "var(--amber)" }}>◐</span>{s} \u2014 partial match, but worth applying</div>)}
                    </div>
                  </div>
                </div>
              )}

              <div className="br-comp-strip">
                <div className="br-cs-item"><div className="br-cs-val">{active.salary}</div><div className="br-cs-lbl">Base salary</div></div>
                <div className="br-cs-item"><div className="br-cs-val">{active.equity || "\u2014"}</div><div className="br-cs-lbl">Equity</div></div>
                <div className="br-cs-item"><div className="br-cs-val">{active.work}</div><div className="br-cs-lbl">Work type</div></div>
              </div>

              <div className="br-jd-section">
                <div className="br-jds-title">About the role</div>
                <div className="br-jd-desc">{active.desc.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}</div>
              </div>

              <div className="br-jd-section">
                <div className="br-jds-title">What you&rsquo;ll do</div>
                <ul className="br-jd-list">{active.responsibilities.map((r, i) => <li key={i}><span className="br-jd-dot" />{r}</li>)}</ul>
              </div>

              <div className="br-jd-section">
                <div className="br-jds-title">What we&rsquo;re looking for</div>
                <ul className="br-jd-list">{active.requirements.map((r, i) => <li key={i}><span className="br-jd-dot" />{r}</li>)}</ul>
              </div>

              <div className="br-jd-section">
                <div className="br-jds-title">Skills</div>
                <div className="br-skill-cloud">
                  {active.skills.map((s) => <span key={s} className={`br-skill-chip${active.matched_skills.includes(s) ? " match" : active.partial_skills.includes(s) ? " partial" : ""}`}>{s}</span>)}
                </div>
                {aiOn && <p style={{ fontSize: 12, color: "var(--t-muted)", marginTop: 10 }}><span style={{ color: "var(--green)" }}>■</span> You have this &nbsp; <span style={{ color: "var(--blue)" }}>■</span> Partial match &nbsp; ■ Not yet</p>}
              </div>

              <div className="br-jd-section">
                <div className="br-jds-title">Perks & benefits</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {active.perks.map((p) => <span key={p} style={{ fontSize: 13, padding: "5px 12px", borderRadius: "var(--r-pill)", background: "var(--bg-alt)", border: "1px solid var(--border-md)", color: "var(--t-body)" }}>✦ {p}</span>)}
                </div>
              </div>

              <div className="br-jd-section">
                <div className="br-jds-title">About {active.co}</div>
                <div className="br-co-mini">
                  <div className="br-cm-logo" style={{ background: active.color }}>{active.logo}</div>
                  <div>
                    <div className="br-cm-name">{active.co}</div>
                    <div className="br-cm-desc">{active.location} &middot; {active.stage}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                      <span className="badge" style={{ background: "var(--green-bg)", color: "var(--green)", fontSize: 11, fontWeight: 500, padding: "3px 8px", borderRadius: "var(--r-pill)" }}>✓ Verified</span>
                      <span className="badge" style={{ background: "var(--blue-tint)", color: "var(--blue)", fontSize: 11, fontWeight: 500, padding: "3px 8px", borderRadius: "var(--r-pill)" }}>{active.stage}</span>
                    </div>
                  </div>
                  <Link href={`/c/${active.co.toLowerCase().replace(/\s+/g, "-")}`} className="btn btn-secondary btn-sm" style={{ marginLeft: "auto", flexShrink: 0 }}>View company ↗</Link>
                </div>
              </div>

              {active.similar.length > 0 && (
                <div className="br-jd-section">
                  <div className="br-jds-title">Similar roles</div>
                  {active.similar.map((sid) => { const s = JOBS.find((j) => j.id === sid); if (!s) return null; return (
                    <div className="br-sj-card" key={sid} onClick={() => setActiveId(sid)}>
                      <div className="br-sj-logo" style={{ background: s.color }}>{s.logo}</div>
                      <div><div className="br-sj-title">{s.title}</div><div className="br-sj-co">{s.co} &middot; {s.location}</div></div>
                      <div className="br-sj-comp">{s.salary}</div>
                    </div>
                  ); })}
                </div>
              )}

              <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid var(--border-md)", display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                <button className="br-apply-btn" disabled={applied.has(active.id)} onClick={() => openApply(active.id)}>{applied.has(active.id) ? "✓ Applied" : "Apply now →"}</button>
                <button className={`br-save-btn${saved.has(active.id) ? " saved" : ""}`} onClick={() => toggleSave(active.id)}>{saved.has(active.id) ? "🔖 Saved" : "🔖 Save role"}</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* APPLY MODAL */}
      {modalOpen && (
        <div className="br-modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}>
          <div className="br-modal" onClick={(e) => e.stopPropagation()}>
            <button className="br-modal-close" onClick={() => setModalOpen(false)}>✕</button>
            {!modalSuccess ? (
              <div>
                <div className="br-modal-title">Apply \u2014 {JOBS.find((j) => j.id === modalJobId)?.title}</div>
                <div className="br-modal-sub">{JOBS.find((j) => j.id === modalJobId)?.co} &middot; {JOBS.find((j) => j.id === modalJobId)?.location} &middot; {JOBS.find((j) => j.id === modalJobId)?.salary}</div>
                <div style={{ background: "var(--green-bg)", border: "1px solid rgba(19,115,51,.2)", borderRadius: "var(--r-md)", padding: "12px 14px", fontSize: 13, color: "var(--green)", marginBottom: 18 }}>✓ Your Foundry profile will be attached automatically. No cover letter needed.</div>
                <div style={{ marginBottom: 15 }}><label className="ds-label">Confirm email</label><input className="ds-input" type="email" defaultValue="riya.menon@gmail.com" /></div>
                <div style={{ marginBottom: 15 }}><label className="ds-label">Availability</label><select className="ds-input"><option>Available immediately</option><option>1 month notice</option><option>2 months notice</option><option>3 months notice</option></select></div>
                <div style={{ marginBottom: 15 }}><label className="ds-label">Anything to add? <span style={{ fontWeight: 400, color: "var(--t-faint)" }}>(optional)</span></label><textarea className="ds-input" rows={3} style={{ height: "auto", padding: "10px 13px", resize: "vertical", lineHeight: 1.6 }} placeholder="A short note for the hiring team\u2026" /></div>
                <button className="btn btn-primary" style={{ width: "100%", padding: 12, fontSize: 14 }} onClick={submitApply}>Submit application →</button>
                <p style={{ fontSize: 12, color: "var(--t-faint)", textAlign: "center", marginTop: 10 }}>Your AI match score and profile will be shared with the startup.</p>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "8px 0" }}>
                <div className="br-success-icon">✓</div>
                <div style={{ fontSize: 20, fontWeight: 500, color: "var(--t-primary)", marginBottom: 8 }}>Applied!</div>
                <p style={{ fontSize: 14, color: "var(--t-muted)", lineHeight: 1.6 }}>Your application has been sent. Track its status in your <Link href="/talent/dashboard">dashboard</Link>.</p>
                <button className="btn btn-secondary" style={{ marginTop: 20, width: "100%" }} onClick={() => setModalOpen(false)}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
