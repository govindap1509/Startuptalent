"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import "./profile.css";

const PROFILE = {
  name: "Riya Menon",
  initial: "R",
  headline: "Senior Product Manager \u00B7 B2C Growth \u00B7 Bengaluru",
  bio: "Senior PM with 5 years building consumer products at scale. Led the Swiggy One loyalty programme to 4M subscribers. Passionate about 0\u21921 product work and high-ownership roles at Series A\u2013C startups where I can shape direction, not just execute.",
  stats: [
    { val: "5 years", lbl: "Experience" },
    { val: "Bengaluru", lbl: "Location" },
    { val: "Hybrid / Remote", lbl: "Work pref" },
    { val: "\u20B928\u201340L", lbl: "Expected CTC" },
    { val: "Series A\u2013C", lbl: "Preferred stage" },
  ],
  targets: ["Senior Product Manager", "Head of Product", "VP Product"],
  skills: ["Product Strategy", "User Research", "SQL", "Data Analysis", "A/B Testing", "B2C Growth", "Roadmapping", "Stakeholder Management", "Figma", "Python (basics)"],
  experience: [
    { logo: "S", color: "#f97316", role: "Senior Product Manager", co: "Swiggy \u00B7 Full-time", period: "Jan 2021 \u2013 Present \u00B7 3 yrs 2 mos \u00B7 Bengaluru", desc: "Led Swiggy One loyalty programme from 0 to 4M subscribers. Owned the subscription product end-to-end \u2014 pricing, cohort analysis, retention loops. Worked closely with design and engineering to ship weekly." },
    { logo: "U", color: "#6366f1", role: "Product Manager", co: "Urban Company \u00B7 Full-time", period: "Jun 2018 \u2013 Dec 2020 \u00B7 2 yrs 6 mos \u00B7 Bengaluru", desc: "Built the service partner onboarding flow, reducing time-to-first-booking by 40%. Led a team of 2 APMs and worked across 3 cities simultaneously." },
  ],
  education: [
    { logo: "I", color: "#0D47A1", degree: "MBA \u2014 Marketing & Strategy", school: "Indian Institute of Management Bangalore \u00B7 2018\u20132020" },
    { logo: "N", color: "#137333", degree: "B.Tech \u2014 Computer Science", school: "National Institute of Technology Trichy \u00B7 2014\u20132018" },
  ],
  score: 92,
  scoreBars: [
    { lbl: "CV", pct: 100 },
    { lbl: "Experience", pct: 100 },
    { lbl: "Skills", pct: 100 },
    { lbl: "Education", pct: 100 },
    { lbl: "Photo", pct: 60 },
  ],
  details: [
    { lbl: "Salary", val: "\u20B928\u201340L" },
    { lbl: "Work pref", val: "Hybrid / Remote" },
    { lbl: "Stage", val: "Series A\u2013C" },
    { lbl: "Availability", val: "30-day notice" },
  ],
};

export default function PublicProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const p = PROFILE;

  const [modalOpen, setModalOpen] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);

  const openModal = () => { setModalSuccess(false); setModalOpen(true); };
  const closeModal = () => setModalOpen(false);
  const sendContact = () => setModalSuccess(true);
  const copyLink = () => { navigator.clipboard.writeText(`https://foundry.in/u/${username}`).catch(() => {}); };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <nav className="tp-topnav">
        <div className="tp-tn-inner">
          <Link href="/" className="tp-logo">Foundry<sup>IN</sup></Link>
          <div className="tp-links">
            <Link href="/roles">Browse Jobs</Link>
            <Link href="/auth">For Startups</Link>
          </div>
          <div className="tp-right">
            <Link href="/auth" className="btn btn-secondary btn-sm">Sign in</Link>
            <Link href="/auth" className="btn btn-primary btn-sm">Post a role \u2192</Link>
          </div>
        </div>
      </nav>

      <div className="tp-page">
        <div>
          {/* HERO */}
          <div className="tp-hero-card">
            <div className="tp-hero-banner" />
            <div className="tp-hero-body">
              <div className="tp-hero-identity">
                <div className="tp-hero-av">{p.initial}</div>
                <div>
                  <div className="tp-hero-name">{p.name}</div>
                  <div className="tp-hero-headline">{p.headline}</div>
                </div>
              </div>
              <div className="tp-hero-stats">
                {p.stats.map((s) => (
                  <div className="tp-hs-item" key={s.lbl}>
                    <span className="tp-hs-val">{s.val}</span>
                    <span className="tp-hs-lbl">{s.lbl}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 15, color: "var(--t-body)", lineHeight: 1.7, marginBottom: 20 }}>{p.bio}</p>
              <div className="tp-target-row">
                {p.targets.map((t) => <span className="tp-target-pill" key={t}>{t}</span>)}
              </div>
            </div>
          </div>

          {/* SKILLS */}
          <div className="tp-card">
            <div className="tp-section-head">Skills</div>
            <div className="tp-skill-cloud">
              {p.skills.map((s) => <span className="tp-skill-chip" key={s}>{s}</span>)}
            </div>
          </div>

          {/* EXPERIENCE */}
          <div className="tp-card">
            <div className="tp-section-head">Experience</div>
            {p.experience.map((e) => (
              <div className="tp-exp-item" key={e.co}>
                <div className="tp-exp-logo" style={{ background: e.color }}>{e.logo}</div>
                <div>
                  <div className="tp-exp-role">{e.role}</div>
                  <div className="tp-exp-co">{e.co}</div>
                  <div className="tp-exp-period">{e.period}</div>
                  <div className="tp-exp-desc">{e.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* EDUCATION */}
          <div className="tp-card">
            <div className="tp-section-head">Education</div>
            {p.education.map((e) => (
              <div className="tp-edu-item" key={e.school}>
                <div className="tp-edu-logo" style={{ background: e.color }}>{e.logo}</div>
                <div>
                  <div className="tp-edu-degree">{e.degree}</div>
                  <div className="tp-edu-school">{e.school}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SIDEBAR */}
        <div>
          <div className="tp-sc">
            <div className="tp-open-indicator"><span className="tp-oi-dot" />Open to roles right now</div>
            <button className="btn btn-primary" style={{ width: "100%", marginBottom: 10 }} onClick={openModal}>Contact {p.name.split(" ")[0]} \u2192</button>
            <Link href="/auth" className="btn btn-secondary" style={{ width: "100%", display: "flex" }}>View full profile on Foundry</Link>
          </div>

          <div className="tp-sc">
            <div className="tp-sc-title">Profile Score</div>
            <div style={{ fontSize: 28, fontWeight: 600, color: "var(--t-primary)", letterSpacing: "-.02em", marginBottom: 14 }}>{p.score}<span style={{ fontSize: 16, color: "var(--t-muted)" }}>%</span></div>
            {p.scoreBars.map((b) => (
              <div className="tp-score-bar-row" key={b.lbl}>
                <span className="tp-score-bar-lbl">{b.lbl}</span>
                <div className="tp-score-bar-track"><div className="tp-score-bar-fill" style={{ width: `${b.pct}%` }} /></div>
              </div>
            ))}
          </div>

          <div className="tp-sc">
            <div className="tp-sc-title">Details</div>
            {p.details.map((d) => (
              <div className="tp-detail-row" key={d.lbl}>
                <span className="tp-dr-lbl">{d.lbl}</span>
                <span className="tp-dr-val">{d.val}</span>
              </div>
            ))}
          </div>

          <div className="tp-sc">
            <div className="tp-sc-title" style={{ marginBottom: 12 }}>Share profile</div>
            <div style={{ fontSize: 12, color: "var(--t-muted)", marginBottom: 8, fontFamily: "monospace", background: "var(--bg-ter)", padding: "6px 10px", borderRadius: "var(--r-sm)" }}>foundry.in/u/{username}</div>
            <div className="tp-share-row">
              <button className="tp-share-btn" onClick={copyLink}>\uD83D\uDCCB Copy link</button>
              <button className="tp-share-btn">\uD83D\uDD17 LinkedIn</button>
              <button className="tp-share-btn">\uD83D\uDCAC WhatsApp</button>
            </div>
          </div>

          <div className="tp-foundry-badge">
            <div className="tp-fb-logo">Foundry<sup>IN</sup></div>
            <div style={{ fontSize: 12, color: "var(--t-muted)", lineHeight: 1.5 }}>This profile is powered by Foundry&rsquo;s AI matching engine. <Link href="/auth">Hire on Foundry \u2192</Link></div>
          </div>
        </div>
      </div>

      {/* CONTACT MODAL */}
      {modalOpen && (
        <div className="tp-modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
          <div className="tp-modal" onClick={(e) => e.stopPropagation()}>
            <button className="tp-modal-close" onClick={closeModal}>\u2715</button>
            {!modalSuccess ? (
              <div>
                <div className="tp-modal-title">Contact {p.name}</div>
                <div className="tp-modal-sub">Send a message. {p.name.split(" ")[0]} typically responds within 24 hours.</div>
                <div style={{ marginBottom: 16 }}><label className="ds-label">Your name</label><input className="ds-input" type="text" placeholder="Aryan Shah" /></div>
                <div style={{ marginBottom: 16 }}><label className="ds-label">Your company & role</label><input className="ds-input" type="text" placeholder="Co-founder, Kirana Club" /></div>
                <div style={{ marginBottom: 16 }}><label className="ds-label">Message</label><textarea className="ds-input" rows={4} style={{ height: "auto", padding: "12px 14px", resize: "vertical", lineHeight: 1.6 }} placeholder={`Hi ${p.name.split(" ")[0]} \u2014 we came across your profile and think you\u2019d be a great fit for our PM role...`} /></div>
                <button className="btn btn-primary" style={{ width: "100%", padding: 13, fontSize: 14 }} onClick={sendContact}>Send message \u2192</button>
                <p style={{ fontSize: 12, color: "var(--t-faint)", textAlign: "center", marginTop: 12 }}>Your message will go directly to {p.name.split(" ")[0]}&rsquo;s inbox on Foundry.</p>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "16px 0" }}>
                <div className="tp-success-icon">\u2713</div>
                <div style={{ fontSize: 20, fontWeight: 500, color: "var(--t-primary)", marginBottom: 8 }}>Message sent!</div>
                <p style={{ fontSize: 14, color: "var(--t-muted)", lineHeight: 1.6 }}>{p.name.split(" ")[0]} will be notified and can respond via Foundry. You&rsquo;ll get a notification when she replies.</p>
                <button className="btn btn-secondary" style={{ marginTop: 20, width: "100%" }} onClick={closeModal}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
