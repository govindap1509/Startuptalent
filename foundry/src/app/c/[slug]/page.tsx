"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import "./company.css";

const COMPANY = {
  name: "Kirana Club",
  logo: "K",
  color: "#1A73E8",
  tagline: "Digitising India\u2019s \u20B950L crore kirana ecosystem \u2014 payments, B2B ordering, and AI demand forecasting in one platform.",
  stage: "Series B",
  sector: "B2B Commerce",
  hq: "Bengaluru",
  founded: "2019",
  teamSize: "80\u2013150",
  raised: "\u20B9180Cr",
  kiranas: "12M",
  yoy: "3\u00D7",
  openRoles: 3,
  about: [
    "Kirana Club is digitising India\u2019s unorganised retail sector \u2014 a \u20B950 lakh crore market that remains almost entirely offline. We build payments infrastructure, B2B ordering platforms, and AI-powered forecasting tools that let kirana owners run smarter businesses.",
    "Since our Series B in 2023, we\u2019ve grown from 20 to 150 people, launched in 8 cities, and now serve 12 million kiranas monthly. Backed by Sequoia India, Lightspeed, and Tiger Global.",
  ],
  products: [
    { icon: "\uD83D\uDCB3", title: "Payments", desc: "QR, UPI, credit lines" },
    { icon: "\uD83D\uDCE6", title: "B2B Ordering", desc: "Direct from 200+ FMCG brands" },
    { icon: "\uD83E\uDD16", title: "AI Forecasting", desc: "Demand prediction & restocking" },
  ],
  values: [
    { icon: "\uD83C\uDFC3", title: "Move fast, ship often", desc: "We ship weekly. Small teams, big ownership. No committee approvals \u2014 if you own it, you decide it." },
    { icon: "\uD83C\uDDEE\uD83C\uDDF3", title: "India-first thinking", desc: "We build for Bharat, not Silicon Valley. Our customers think in Hindi, operate on \u20B93,000 phones, and need software that works on 2G." },
    { icon: "\uD83D\uDCCA", title: "Data over opinions", desc: "Every product decision starts with data. Opinions are welcome \u2014 metrics decide." },
    { icon: "\uD83C\uDF31", title: "Grow with us", desc: "We\u2019re Series B with Series A velocity. If you want to go from IC to leader in 18 months, this is it." },
  ],
  perks: [
    { icon: "\uD83D\uDC8A", title: "Health Insurance", desc: "\u20B95L GMC for you + family from Day 1" },
    { icon: "\uD83D\uDCC8", title: "ESOP", desc: "Meaningful equity at every level \u2014 IC through leadership" },
    { icon: "\uD83C\uDFE0", title: "Flexible Work", desc: "Hybrid \u2014 3 days in our Bengaluru office" },
    { icon: "\uD83D\uDCDA", title: "Learning Budget", desc: "\u20B950K/year for courses, books, and conferences" },
    { icon: "\uD83C\uDF7D\uFE0F", title: "Catered Meals", desc: "Lunch + dinner provided on office days" },
    { icon: "\u2708\uFE0F", title: "Workations", desc: "Quarterly team offsites \u2014 last one was in Coorg" },
  ],
  roles: [
    { id: "pm", title: "Senior Product Manager", meta: "Bengaluru \u00B7 Hybrid \u00B7 Full-time \u00B7 Posted 3 days ago", tags: ["Product Strategy", "B2C", "SQL", "3+ yrs"], comp: "\u20B928\u201340L", equity: "+ 0.1% equity", badge: "New", badgeClass: "blue" },
    { id: "eng", title: "Full Stack Engineer (React / Node.js)", meta: "Bengaluru \u00B7 Hybrid \u00B7 Full-time \u00B7 Posted 1 week ago", tags: ["React", "Node.js", "PostgreSQL", "2+ yrs"], comp: "\u20B918\u201328L", equity: "+ ESOP", badge: "Hot", badgeClass: "green" },
    { id: "growth", title: "Growth Marketing Manager", meta: "Bengaluru \u00B7 On-site \u00B7 Full-time \u00B7 Posted 5 days ago", tags: ["Performance Marketing", "CRM", "B2B"], comp: "\u20B914\u201320L", equity: "+ ESOP", badge: "Open", badgeClass: "gray" },
  ],
  team: [
    { name: "Aryan Shah", role: "Co-founder & CEO", prev: "Ex-McKinsey \u00B7 IIT Delhi", color: "#1A73E8", initial: "A" },
    { name: "Neha Iyer", role: "Co-founder & CTO", prev: "Ex-Google \u00B7 IIT Bombay", color: "#137333", initial: "N" },
    { name: "Rohit Gupta", role: "CPO", prev: "Ex-Swiggy \u00B7 ISB", color: "#B45309", initial: "R" },
    { name: "Priya Menon", role: "CFO", prev: "Ex-Sequoia \u00B7 CA + MBA", color: "#5B21B6", initial: "P" },
    { name: "Sanjay Rao", role: "VP Sales", prev: "Ex-Juspay \u00B7 15 yrs retail", color: "#E11D48", initial: "S" },
    { name: "Ananya Bose", role: "Head of Design", prev: "Ex-Urban Company \u00B7 NID", color: "#059669", initial: "A" },
  ],
  investors: ["Sequoia India", "Lightspeed", "Tiger Global", "Accel India"],
  lifeCards: [
    { icon: "\uD83C\uDFE2", label: "Office, Bengaluru", bg: "var(--blue-tint)", border: "rgba(26,115,232,.1)", labelColor: "var(--blue)" },
    { icon: "\uD83D\uDC65", label: "Team of 120+", bg: "var(--green-bg)", border: "rgba(19,115,51,.1)", labelColor: "var(--green)" },
    { icon: "\uD83C\uDF89", label: "Last offsite: Coorg", bg: "var(--amber-bg)", border: "rgba(180,83,9,.1)", labelColor: "var(--amber)" },
    { icon: "\uD83D\uDCBB", label: "Ship every Friday", bg: "var(--red-bg)", border: "rgba(197,34,31,.08)", labelColor: "var(--red)" },
    { icon: "\uD83C\uDF1F", label: "4.6 \u2605 on Glassdoor", bg: "var(--bg-ter)", border: "var(--border)", labelColor: "var(--t-muted)" },
    { icon: "\uD83D\uDE80", label: "3\u00D7 YoY growth", bg: "var(--blue-tint)", border: "rgba(26,115,232,.1)", labelColor: "var(--blue)" },
  ],
  quotes: [
    { text: "I joined as an APM 18 months ago and now own two full product lines. The pace of growth is unreal \u2014 and leadership actually listens when you push back.", author: "Priya Krishnaswamy", role: "Product Manager \u00B7 1.5 yrs at Kirana Club", color: "#6366f1", initial: "P", bg: "var(--blue-tint)", border: "rgba(26,115,232,.15)" },
    { text: "The kirana problem is genuinely hard \u2014 it needs empathy for a population that\u2019s never used software before. Working on it is deeply motivating.", author: "Ravi Shankar", role: "Senior Engineer \u00B7 2 yrs at Kirana Club", color: "#059669", initial: "R", bg: "var(--green-bg)", border: "rgba(19,115,51,.15)" },
  ],
  press: [
    { logo: "TC", title: "Kirana Club raises \u20B9180Cr Series B to digitise India\u2019s kirana network", meta: "TechCrunch \u00B7 December 2023" },
    { logo: "M", title: "How Kirana Club is building India\u2019s B2B commerce infrastructure", meta: "Mint \u00B7 August 2023" },
    { logo: "YS", title: "Kirana Club hits 10M kirana milestone in under 3 years", meta: "YourStory \u00B7 March 2024" },
  ],
};

export default function CompanyProfilePage() {
  const params = useParams();
  const slug = params.slug as string;
  const co = COMPANY; // In production, fetch by slug

  const [tab, setTab] = useState("about");
  const [following, setFollowing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRole, setModalRole] = useState<{ title: string; comp: string } | null>(null);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [notified, setNotified] = useState(false);

  const switchTab = (t: string) => setTab(t);
  const openApply = (title: string, comp: string) => { setModalRole({ title, comp }); setModalSuccess(false); setModalOpen(true); };
  const submitApply = () => setModalSuccess(true);
  const closeModal = () => setModalOpen(false);
  const copyLink = () => { navigator.clipboard.writeText(`https://foundry.in/c/${slug}`).catch(() => {}); };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape" && modalOpen) closeModal(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [modalOpen]);

  return (
    <>
      {/* NAV */}
      <nav className="cp-topnav">
        <div className="cp-tn-inner">
          <Link href="/" className="cp-logo">Foundry<sup>IN</sup></Link>
          <div className="cp-bc">
            <Link href="/roles">Browse Jobs</Link>
            <span className="cp-bc-sep">/</span>
            <span className="cp-bc-cur">{co.name}</span>
          </div>
          <span className="cp-tn-pill">{co.openRoles} open roles</span>
          <div className="cp-tn-right">
            <Link href="/auth" className="btn btn-secondary btn-sm">Sign in</Link>
            <Link href="/auth" className="btn btn-primary btn-sm">Post a role \u2192</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <div className="cp-hero">
        <div className="cp-hero-inner">
          <div className="cp-hero-top">
            <div className="cp-co-logo" style={{ background: co.color }}>{co.logo}</div>
            <div style={{ flex: 1 }}>
              <div className="cp-co-name">{co.name}</div>
              <div className="cp-co-tagline">{co.tagline}</div>
              <div className="cp-co-badges">
                <span className="cp-badge green">\u2713 Verified startup</span>
                <span className="cp-badge blue">{co.stage}</span>
                <span className="cp-badge gray">{co.sector}</span>
                <span className="cp-badge gray">\uD83D\uDCCD {co.hq}</span>
                <span className="cp-badge gray">Founded {co.founded}</span>
              </div>
            </div>
          </div>
          <div className="cp-co-stats">
            <div className="cp-stat"><div className="cp-stat-val">{co.raised}</div><div className="cp-stat-lbl">Raised</div></div>
            <div className="cp-stat"><div className="cp-stat-val">{co.teamSize}</div><div className="cp-stat-lbl">Team size</div></div>
            <div className="cp-stat"><div className="cp-stat-val">{co.kiranas}</div><div className="cp-stat-lbl">Kiranas served</div></div>
            <div className="cp-stat"><div className="cp-stat-val">{co.yoy}</div><div className="cp-stat-lbl">YoY growth</div></div>
            <div className="cp-stat"><div className="cp-stat-val">{co.openRoles}</div><div className="cp-stat-lbl">Open roles</div></div>
          </div>
          <div className="cp-hero-actions">
            <button className="btn btn-primary" onClick={() => switchTab("roles")}>See {co.openRoles} open roles \u2192</button>
            <button className={`btn btn-secondary${following ? " following" : ""}`} onClick={() => setFollowing(!following)} style={following ? { background: "var(--blue)", color: "#fff", borderColor: "var(--blue)" } : undefined}>{following ? "\u2713 Following" : "+ Follow"}</button>
            <button className="btn btn-secondary" onClick={copyLink}>\uD83D\uDCCB Share page</button>
          </div>
        </div>
      </div>

      {/* TAB BAR */}
      <div className="cp-tab-bar">
        <div className="cp-tab-inner">
          {[["about", "About"], ["roles", "Open Roles"], ["team", "Team"], ["life", "Life here"]].map(([key, label]) => (
            <button key={key} className={`cp-tab-btn${tab === key ? " active" : ""}`} onClick={() => switchTab(key)}>
              {label}{key === "roles" && <span className="cp-tab-count">{co.openRoles}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* PAGE */}
      <div className="cp-page">
        <div>
          {/* ABOUT TAB */}
          <div className={`cp-tp${tab === "about" ? " active" : ""}`}>
            <div className="cp-card" style={{ background: "var(--blue-tint)", borderColor: "rgba(26,115,232,.15)" }}>
              <p style={{ fontSize: 18, fontWeight: 400, color: "var(--t-primary)", lineHeight: 1.65, fontStyle: "italic" }}>\u201CWe\u2019re building the operating system for India\u2019s 12 million kirana stores \u2014 payments, B2B ordering, and AI-driven demand forecasting in one platform.\u201D</p>
              <div style={{ fontSize: 13, color: "var(--t-muted)", marginTop: 14, display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#1A73E8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff" }}>A</div>
                Aryan Shah \u00B7 Co-founder & CEO
              </div>
            </div>

            <div className="cp-card">
              <div className="cp-section-head">About {co.name}</div>
              {co.about.map((p, i) => <p key={i} style={{ fontSize: 14, color: "var(--t-body)", lineHeight: 1.75, marginBottom: i < co.about.length - 1 ? 14 : 0 }}>{p}</p>)}
              <div className="cp-prod-grid">
                {co.products.map((p) => (
                  <div className="cp-prod-card" key={p.title}>
                    <div className="cp-prod-icon">{p.icon}</div>
                    <div className="cp-prod-title">{p.title}</div>
                    <div className="cp-prod-desc">{p.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="cp-card">
              <div className="cp-section-head">Our values</div>
              <div className="cp-values-grid">
                {co.values.map((v) => (
                  <div className="cp-value-card" key={v.title}>
                    <span className="cp-vc-icon">{v.icon}</span>
                    <div className="cp-vc-title">{v.title}</div>
                    <div className="cp-vc-desc">{v.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="cp-card">
              <div className="cp-section-head">Perks & benefits</div>
              <div className="cp-perks-grid">
                {co.perks.map((p) => (
                  <div className="cp-perk-item" key={p.title}>
                    <span className="cp-perk-icon">{p.icon}</span>
                    <div>
                      <div className="cp-perk-title">{p.title}</div>
                      <div className="cp-perk-desc">{p.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ROLES TAB */}
          <div className={`cp-tp${tab === "roles" ? " active" : ""}`}>
            <div style={{ background: "var(--blue-tint)", border: "1px solid rgba(26,115,232,.18)", borderRadius: "var(--r-md)", padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
              <div style={{ fontSize: 14, color: "var(--blue)" }}>\uD83D\uDD14 Get notified when new roles open</div>
              <button className="btn btn-primary btn-sm" disabled={notified} onClick={() => setNotified(true)} style={notified ? { background: "var(--green)" } : undefined}>{notified ? "\u2713 You\u2019re subscribed" : "Notify me"}</button>
            </div>

            {co.roles.map((r) => (
              <div className="cp-job-card" key={r.id}>
                <div className="cp-jc-top">
                  <div>
                    <div className="cp-jc-title">{r.title}</div>
                    <div className="cp-jc-meta">{r.meta}</div>
                  </div>
                  <span className={`cp-badge ${r.badgeClass}`}>{r.badge}</span>
                </div>
                <div className="cp-jc-tags">
                  {r.tags.map((t) => <span className="cp-jc-tag" key={t}>{t}</span>)}
                </div>
                <div className="cp-jc-foot">
                  <div className="cp-jc-comp">{r.comp} <span>{r.equity}</span></div>
                  <div className="cp-jc-btns">
                    <Link href="/roles" className="btn btn-secondary btn-sm">View full JD \u2197</Link>
                    <button className="btn btn-primary btn-sm" onClick={() => openApply(r.title, `${r.comp} ${r.equity}`)}>Apply now \u2192</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* TEAM TAB */}
          <div className={`cp-tp${tab === "team" ? " active" : ""}`}>
            <div className="cp-card">
              <div className="cp-section-head">Leadership</div>
              <div className="cp-team-grid">
                {co.team.map((m) => (
                  <div className="cp-team-card" key={m.name}>
                    <div className="cp-team-av" style={{ background: m.color }}>{m.initial}</div>
                    <div className="cp-team-name">{m.name}</div>
                    <div className="cp-team-role">{m.role}</div>
                    <div className="cp-team-prev">{m.prev}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="cp-card">
              <div className="cp-section-head">Investors</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {co.investors.map((inv) => (
                  <div key={inv} style={{ background: "var(--bg-alt)", border: "1px solid var(--border)", borderRadius: "var(--r-md)", padding: "12px 18px", fontSize: 13, fontWeight: 500, color: "var(--t-primary)" }}>{inv}</div>
                ))}
              </div>
            </div>
          </div>

          {/* LIFE TAB */}
          <div className={`cp-tp${tab === "life" ? " active" : ""}`}>
            <div className="cp-life-grid">
              {co.lifeCards.map((c, i) => (
                <div className="cp-life-card" key={i} style={{ background: c.bg, border: `1px solid ${c.border}` }}>
                  {c.icon}
                  <span className="cp-life-label" style={{ color: c.labelColor }}>{c.label}</span>
                </div>
              ))}
            </div>

            {co.quotes.map((q) => (
              <div className="cp-quote-card" key={q.author} style={{ background: q.bg, border: `1px solid ${q.border}` }}>
                <div className="cp-qc-text">\u201C{q.text}\u201D</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 2 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: q.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff" }}>{q.initial}</div>
                  <div><div className="cp-qc-author">{q.author}</div><div className="cp-qc-role">{q.role}</div></div>
                </div>
              </div>
            ))}

            <div className="cp-card">
              <div className="cp-section-head">In the news</div>
              {co.press.map((p) => (
                <div className="cp-press-item" key={p.logo}>
                  <div className="cp-press-logo">{p.logo}</div>
                  <div>
                    <div className="cp-press-title">{p.title}</div>
                    <div className="cp-press-meta">{p.meta}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div>
          <div className="cp-sc">
            <div className="cp-sc-title">Company details</div>
            <div className="cp-detail-row"><span className="cp-dr-lbl">Stage</span><span className="cp-dr-val">{co.stage}</span></div>
            <div className="cp-detail-row"><span className="cp-dr-lbl">Founded</span><span className="cp-dr-val">{co.founded}</span></div>
            <div className="cp-detail-row"><span className="cp-dr-lbl">Sector</span><span className="cp-dr-val">{co.sector}</span></div>
            <div className="cp-detail-row"><span className="cp-dr-lbl">HQ</span><span className="cp-dr-val">{co.hq}</span></div>
            <div className="cp-detail-row"><span className="cp-dr-lbl">Team</span><span className="cp-dr-val">{co.teamSize} people</span></div>
            <div className="cp-detail-row"><span className="cp-dr-lbl">Website</span><span className="cp-dr-val"><a href="#">kiranaclub.com \u2197</a></span></div>
          </div>

          <div className="cp-sc">
            <div className="cp-sc-title">Open roles</div>
            {co.roles.map((r) => (
              <div className="cp-quick-role" key={r.id} onClick={() => switchTab("roles")}>
                <span className="cp-qr-title">{r.title.split(" ").slice(0, 2).join(" ")}</span>
                <span className="cp-qr-chip">{r.comp}</span>
              </div>
            ))}
          </div>

          <div className="cp-sc">
            <div className="cp-sc-title" style={{ marginBottom: 10 }}>Followers</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div className="cp-fav-stk">
                {["#1A73E8","#137333","#B45309","#5F6368","#E11D48"].map((c, i) => (
                  <div className="cp-fav-av" key={i} style={{ background: c }}>{["R","A","S","P","K"][i]}</div>
                ))}
              </div>
              <span className="cp-fav-count">214 people follow<br />{co.name}</span>
            </div>
            <button className={`cp-follow-btn${following ? " following" : ""}`} onClick={() => setFollowing(!following)}>{following ? "\u2713 Following" : `+ Follow ${co.name}`}</button>
          </div>

          <div className="cp-sc">
            <div className="cp-sc-title" style={{ marginBottom: 10 }}>Share</div>
            <div className="cp-share-row">
              <button className="cp-share-btn" onClick={copyLink}>\uD83D\uDCCB Copy link</button>
              <button className="cp-share-btn">\uD83D\uDD17 LinkedIn</button>
              <button className="cp-share-btn">\uD83D\uDCAC WhatsApp</button>
            </div>
          </div>

          <div className="cp-foundry-badge">
            <div className="cp-fb-logo">Foundry<sup>IN</sup></div>
            <div style={{ fontSize: 12, color: "var(--t-muted)", lineHeight: 1.5 }}>Verified startup. <Link href="/auth">Hire on Foundry \u2192</Link></div>
          </div>
        </div>
      </div>

      {/* APPLY MODAL */}
      {modalOpen && (
        <div className="cp-modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
          <div className="cp-modal" onClick={(e) => e.stopPropagation()}>
            <button className="cp-modal-close" onClick={closeModal}>\u2715</button>
            {!modalSuccess ? (
              <div>
                <div className="cp-modal-title">Apply \u2014 {modalRole?.title}</div>
                <div className="cp-modal-sub">{co.name} \u00B7 {co.hq} \u00B7 {modalRole?.comp}</div>
                <div style={{ background: "var(--green-bg)", border: "1px solid rgba(19,115,51,.2)", borderRadius: "var(--r-md)", padding: "11px 14px", fontSize: 13, color: "var(--green)", marginBottom: 16 }}>\u2713 Your Foundry profile is attached. No cover letter needed.</div>
                <div style={{ marginBottom: 15 }}><label className="ds-label">Full name</label><input className="ds-input" type="text" placeholder="Riya Menon" /></div>
                <div style={{ marginBottom: 15 }}><label className="ds-label">Email</label><input className="ds-input" type="email" placeholder="riya@example.com" /></div>
                <div style={{ marginBottom: 15 }}><label className="ds-label">Availability</label><select className="ds-input"><option>Immediately</option><option>1 month notice</option><option>2 months notice</option><option>3 months notice</option></select></div>
                <div style={{ marginBottom: 15 }}><label className="ds-label">Anything to add? <span style={{ fontWeight: 400, color: "var(--t-faint)" }}>(optional)</span></label><textarea className="ds-input" rows={3} style={{ height: "auto", padding: "10px 13px", resize: "vertical", lineHeight: 1.6 }} placeholder="A short note for the team\u2026" /></div>
                <button className="btn btn-primary" style={{ width: "100%", padding: 12, fontSize: 14 }} onClick={submitApply}>Submit application \u2192</button>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "8px 0" }}>
                <div className="cp-success-icon">\u2713</div>
                <div style={{ fontSize: 20, fontWeight: 500, color: "var(--t-primary)", marginBottom: 8 }}>Applied!</div>
                <p style={{ fontSize: 14, color: "var(--t-muted)", lineHeight: 1.6 }}>{co.name} will review your application and respond within 5\u20137 days. Track it in your <Link href="/talent/dashboard">dashboard</Link>.</p>
                <button className="btn btn-secondary" style={{ marginTop: 20, width: "100%" }} onClick={closeModal}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
