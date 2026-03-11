"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import "./portal.css";

type Tab = "dashboard" | "roles" | "applicants" | "messages" | "company";
type Thread = { name: string; sub: string; color: string; initial: string; preview: string; time: string };

const THREADS: Thread[] = [
  { name: "Riya Menon", sub: "Re: Senior PM role", color: "#1A73E8", initial: "R", preview: "Thursday 3pm works perfectly!", time: "2h" },
  { name: "Aditya Kumar", sub: "Re: Senior PM", color: "#137333", initial: "A", preview: "Looking forward to the call", time: "1d" },
  { name: "Sneha Rao", sub: "Re: PM role", color: "#B45309", initial: "S", preview: "Can we do a Friday slot instead?", time: "2d" },
];

const DEFAULT_MSGS = [
  { dir: "out", text: "Hi Riya \u2014 we came across your profile and your B2C growth background at Swiggy is exactly what we\u2019re looking for at Kirana Club. Would love a quick 30-min call. Free Thursday 3pm IST?", time: "10:24 AM" },
  { dir: "in", text: "Hi Aryan! Thanks so much \u2014 I\u2019ve been following Kirana Club\u2019s work. Thursday 3pm works perfectly. Looking forward to it!", time: "10:45 AM" },
];

const ROLES = [
  { icon: "\uD83E\uDDE9", iconBg: "var(--blue-tint)", title: "Senior Product Manager", meta: "Bengaluru \u00B7 Hybrid \u00B7 \u20B928\u201340L + 0.1% equity", chips: ["Product Strategy", "B2C", "Series B"], badge: "Live", badgeCls: "sp-bg", apps: 47 },
  { icon: "\u2699\uFE0F", iconBg: "var(--green-bg)", title: "Full Stack Engineer (React/Node)", meta: "Bengaluru \u00B7 Hybrid \u00B7 \u20B918\u201328L + ESOP", chips: ["React", "Node.js", "PostgreSQL"], badge: "Live", badgeCls: "sp-bg", apps: 31 },
  { icon: "\uD83D\uDCC8", iconBg: "var(--amber-bg)", title: "Growth Marketing Manager", meta: "Bengaluru \u00B7 On-site \u00B7 \u20B914\u201320L", chips: ["Performance Marketing", "CRM"], badge: "Paused", badgeCls: "sp-ba", apps: 6 },
];

const APPLICANTS = [
  { initial: "R", name: "Riya Menon", role: "Senior PM \u00B7 Swiggy \u00B7 5 yrs exp", match: 96, cls: "high", avBg: "", avColor: "" },
  { initial: "A", name: "Aditya Kumar", role: "PM \u00B7 Razorpay \u00B7 4 yrs exp", match: 91, cls: "high", avBg: "var(--green-bg)", avColor: "var(--green)" },
  { initial: "S", name: "Sneha Rao", role: "Product Lead \u00B7 PhonePe \u00B7 6 yrs exp", match: 88, cls: "high", avBg: "var(--amber-bg)", avColor: "var(--amber)" },
  { initial: "K", name: "Karthik Nair", role: "Associate PM \u00B7 Ola \u00B7 2 yrs exp", match: 74, cls: "mid", avBg: "var(--red-bg)", avColor: "var(--red)" },
];

const BARS = [
  { label: "90\u2013100%", width: "30%", color: "var(--green)", count: 25 },
  { label: "75\u201390%", width: "52%", color: "var(--blue)", count: 44 },
  { label: "60\u201375%", width: "18%", color: "var(--amber)", count: 15 },
  { label: "Below 60%", width: "8%", color: "var(--bg-ter)", count: 0 },
];

export default function StartupPortalPage() {
  const [tab, setTab] = useState<Tab>("dashboard");
  const [filter, setFilter] = useState("All");
  const [threadIdx, setThreadIdx] = useState(0);
  const [msgs, setMsgs] = useState(DEFAULT_MSGS);
  const [msgInput, setMsgInput] = useState("");
  const [coName, setCoName] = useState("Kirana Club");
  const [website, setWebsite] = useState("kiranaclub.com");
  const [stage, setStage] = useState("Series B");
  const [teamSize, setTeamSize] = useState("80\u2013150");
  const [tagline, setTagline] = useState("Digitising India\u2019s \u20B950L cr kirana ecosystem");
  const [about, setAbout] = useState("Kirana Club is building the digital infrastructure for India\u2019s 12 million kirana stores \u2014 powering payments, B2B ordering, and AI-driven demand forecasting.");
  const msgsRef = useRef<HTMLDivElement>(null);

  const sw = (t: Tab) => setTab(t);

  const sendMsg = () => {
    const v = msgInput.trim();
    if (!v) return;
    setMsgs([...msgs, { dir: "out", text: v, time: "Just now" }]);
    setMsgInput("");
    setTimeout(() => msgsRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const appFilters = ["All", "New", "Shortlisted", "Interview", "Rejected"];

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "var(--bg-alt)", overflow: "hidden" }}>
      <nav className="sp-topnav">
        <div className="sp-tn-inner">
          <Link href="/" className="sp-logo">Foundry<sup>IN</sup></Link>
          <div className="sp-mode">
            <Link href="/talent/dashboard">Talent</Link>
            <span className="sp-am">Startup</span>
          </div>
          <div className="sp-right">
            <div className="sp-notif">🔔<div className="sp-ndot" /></div>
            <div className="sp-uav">K</div>
          </div>
        </div>
      </nav>

      <div className="sp-shell">
        <div className="sp-sidebar">
          <div className="sp-sb-co">
            <div className="sp-sb-co-row">
              <div className="sp-sb-co-logo">K</div>
              <div><div className="sp-sb-co-name">Kirana Club</div><div className="sp-sb-co-meta">Bengaluru &middot; Series B</div></div>
            </div>
            <div className="sp-sb-chips">
              <span className="sp-sb-chip sp-sb-chip-blue">✓ Verified</span>
              <span className="sp-sb-chip">B2B Commerce</span>
              <span className="sp-sb-chip">80\u2013150 people</span>
            </div>
            <div className="sp-sb-plan">
              <div className="sp-sb-plan-label">Current plan</div>
              <div className="sp-sb-plan-name">Growth</div>
              <a href="#" className="sp-sb-plan-link">Upgrade to Scale →</a>
            </div>
          </div>
          <div className="sp-sb-nav">
            <button className={`sp-sni${tab === "dashboard" ? " active" : ""}`} onClick={() => sw("dashboard")}><span className="sp-sni-icon">📊</span>Dashboard</button>
            <button className={`sp-sni${tab === "roles" ? " active" : ""}`} onClick={() => sw("roles")}><span className="sp-sni-icon">📋</span>My Roles<span className="sp-snb">3</span></button>
            <button className={`sp-sni${tab === "applicants" ? " active" : ""}`} onClick={() => sw("applicants")}><span className="sp-sni-icon">👥</span>Applicants<span className="sp-snb red">12</span></button>
            <button className={`sp-sni${tab === "messages" ? " active" : ""}`} onClick={() => sw("messages")}><span className="sp-sni-icon">💬</span>Messages<span className="sp-snb">5</span></button>
            <button className={`sp-sni${tab === "company" ? " active" : ""}`} onClick={() => sw("company")}><span className="sp-sni-icon">🏢</span>Company Profile</button>
          </div>
          <div className="sp-sb-foot">
            <Link href="/c/kirana-club" target="_blank">View public page ↗</Link>
            <br /><br />
            <Link href="/auth" style={{ marginTop: 8 }}>&larr; Sign out</Link>
          </div>
        </div>

        <div className="sp-main">

          {/* DASHBOARD */}
          <div className={`sp-tp${tab === "dashboard" ? " active" : ""}`}>
            <div className="sp-ph"><div><div className="sp-ph-t">Dashboard</div><div className="sp-ph-s">Overview of your hiring activity</div></div><button className="btn btn-primary" onClick={() => sw("roles")}>+ Post New Role</button></div>
            <div className="sp-kpi-row">
              <div className="sp-kpi"><span className="sp-kpi-n">84</span><div className="sp-kpi-l">Total applicants</div><div className="sp-kpi-d">↑ 12 this week</div></div>
              <div className="sp-kpi"><span className="sp-kpi-n">12</span><div className="sp-kpi-l">New since last visit</div><div className="sp-kpi-d">↑ 4 today</div></div>
              <div className="sp-kpi"><span className="sp-kpi-n">91%</span><div className="sp-kpi-l">Avg AI match score</div></div>
              <div className="sp-kpi"><span className="sp-kpi-n">3</span><div className="sp-kpi-l">Active roles</div></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div className="sp-card">
                <div className="sp-ch"><span className="sp-ch-t">Match score distribution</span></div>
                <div className="sp-cb">
                  <div className="sp-bar-row">
                    {BARS.map((b) => (
                      <div className="sp-bar-item" key={b.label}>
                        <span className="sp-bar-lbl">{b.label}</span>
                        <div className="sp-bar-track"><div className="sp-bar-fill" style={{ width: b.width, background: b.color }} /></div>
                        <span style={{ fontSize: 12, color: "var(--t-muted)", width: 30, textAlign: "right" }}>{b.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="sp-card">
                <div className="sp-ch"><span className="sp-ch-t">New applicants today</span></div>
                <div className="sp-cb">
                  {APPLICANTS.slice(0, 3).map((a, i) => (
                    <div className="sp-app-row" key={i}>
                      <div className="sp-ar-av" style={a.avBg ? { background: a.avBg, color: a.avColor } : undefined}>{a.initial}</div>
                      <div style={{ flex: 1 }}><div className="sp-ar-name">{a.name}</div><div className="sp-ar-role">{a.role.split(" \u00B7 ").slice(0, 2).join(" \u00B7 ")}</div></div>
                      <span className={`sp-ar-match ${a.cls}`}>{a.match}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ROLES */}
          <div className={`sp-tp${tab === "roles" ? " active" : ""}`}>
            <div className="sp-ph"><div><div className="sp-ph-t">My Roles</div><div className="sp-ph-s">3 active roles &middot; 84 total applicants</div></div><button className="btn btn-primary">+ Post New Role</button></div>
            {ROLES.map((r, i) => (
              <div className="sp-role-card" key={i}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: r.iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{r.icon}</div>
                <div className="sp-rc-info">
                  <div className="sp-rc-title">{r.title}</div>
                  <div className="sp-rc-meta">{r.meta}</div>
                  <div className="sp-rc-chips">{r.chips.map((c) => <span className="sp-rc-chip" key={c}>{c}</span>)}</div>
                </div>
                <div className="sp-rc-right">
                  <span className={`sp-badge ${r.badgeCls}`}>{r.badge}</span>
                  <div className="sp-rc-apps">{r.apps} <span>applicants</span></div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button className="btn btn-secondary btn-sm">{r.badge === "Paused" ? "Resume" : "Edit"}</button>
                    <button className="btn btn-sm btn-primary" onClick={() => sw("applicants")}>Review →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* APPLICANTS */}
          <div className={`sp-tp${tab === "applicants" ? " active" : ""}`}>
            <div className="sp-ph">
              <div><div className="sp-ph-t">Applicants</div><div className="sp-ph-s">84 total &middot; 12 new</div></div>
              <select className="ds-input" style={{ width: "auto", padding: "0 12px" }}>
                <option>All Roles</option>
                <option>Senior PM</option>
                <option>Full Stack Eng.</option>
                <option>Growth Marketing</option>
              </select>
            </div>
            <div className="sp-fc-bar">
              {appFilters.map((f) => (
                <button key={f} className={`sp-fc${filter === f ? " on" : ""}`} onClick={() => setFilter(f)}>{f}</button>
              ))}
            </div>
            <div className="sp-card">
              <div className="sp-ch"><span className="sp-ch-t">Senior PM &middot; 47 applicants</span><span style={{ fontSize: 13, color: "var(--t-muted)" }}>Sorted by AI match</span></div>
              <div className="sp-cb" style={{ padding: 0 }}>
                {APPLICANTS.map((a, i) => (
                  <div className="sp-app-row" key={i} style={{ padding: "14px 20px" }}>
                    <div className="sp-ar-av" style={a.avBg ? { background: a.avBg, color: a.avColor } : undefined}>{a.initial}</div>
                    <div style={{ flex: 1 }}><div className="sp-ar-name">{a.name}</div><div className="sp-ar-role">{a.role}</div></div>
                    <span className={`sp-ar-match ${a.cls}`}>{a.match}%</span>
                    <div style={{ display: "flex", gap: 6, marginLeft: 12 }}>
                      <button className="btn btn-sm btn-secondary">View</button>
                      {a.match >= 80 ? (
                        <button className="btn btn-sm btn-primary">Shortlist</button>
                      ) : (
                        <button style={{ background: "var(--red-bg)", color: "var(--red)", border: "none", borderRadius: "var(--r-md)", padding: "6px 13px", fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "var(--font)" }}>Pass</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* MESSAGES */}
          <div className={`sp-tp${tab === "messages" ? " active" : ""}`}>
            <div className="sp-ph"><div><div className="sp-ph-t">Messages</div><div className="sp-ph-s">5 active conversations</div></div></div>
            <div className="sp-msg-layout">
              <div className="sp-mt-list">
                {THREADS.map((t, i) => (
                  <div key={i} className={`sp-mt-item${threadIdx === i ? " active" : ""}`} onClick={() => setThreadIdx(i)}>
                    <div className="sp-mt-av" style={{ background: t.color }}>{t.initial}</div>
                    <div style={{ flex: 1, minWidth: 0 }}><div className="sp-mt-name">{t.name}</div><div className="sp-mt-prev">{t.preview}</div></div>
                    <span className="sp-mt-time">{t.time}</span>
                  </div>
                ))}
              </div>
              <div className="sp-mc">
                <div className="sp-mc-head">
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: THREADS[threadIdx].color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{THREADS[threadIdx].initial}</div>
                  <div><div className="sp-mc-name">{THREADS[threadIdx].name}</div><div className="sp-mc-sub">{THREADS[threadIdx].sub}</div></div>
                </div>
                <div className="sp-mc-msgs">
                  {msgs.map((m, i) => (
                    <div key={i}>
                      <div className={`sp-bubble ${m.dir === "in" ? "sp-b-in" : "sp-b-out"}`}>{m.text}</div>
                      <div className="sp-b-time" style={m.dir === "out" ? { textAlign: "right" } : undefined}>{m.time}</div>
                    </div>
                  ))}
                  <div ref={msgsRef} />
                </div>
                <div className="sp-mc-inp">
                  <input className="ds-input" style={{ flex: 1 }} placeholder="Type a message\u2026" value={msgInput} onChange={(e) => setMsgInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMsg()} />
                  <button className="btn btn-primary btn-sm" onClick={sendMsg}>Send</button>
                </div>
              </div>
            </div>
          </div>

          {/* COMPANY */}
          <div className={`sp-tp${tab === "company" ? " active" : ""}`}>
            <div className="sp-ph">
              <div><div className="sp-ph-t">Company Profile</div><div className="sp-ph-s">How talent sees Kirana Club on Foundry</div></div>
              <div style={{ display: "flex", gap: 8 }}>
                <Link href="/c/kirana-club" target="_blank" className="btn btn-secondary">Preview page ↗</Link>
                <button className="btn btn-primary">Save changes</button>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
              <div>
                <div className="sp-card">
                  <div className="sp-ch"><span className="sp-ch-t">Company Details</span></div>
                  <div className="sp-cb" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <div><label style={{ fontSize: 12, fontWeight: 500, color: "var(--t-muted)", display: "block", marginBottom: 6 }}>Company Name</label><input className="ds-input" value={coName} onChange={(e) => setCoName(e.target.value)} /></div>
                    <div><label style={{ fontSize: 12, fontWeight: 500, color: "var(--t-muted)", display: "block", marginBottom: 6 }}>Website</label><input className="ds-input" value={website} onChange={(e) => setWebsite(e.target.value)} /></div>
                    <div><label style={{ fontSize: 12, fontWeight: 500, color: "var(--t-muted)", display: "block", marginBottom: 6 }}>Stage</label><input className="ds-input" value={stage} onChange={(e) => setStage(e.target.value)} /></div>
                    <div><label style={{ fontSize: 12, fontWeight: 500, color: "var(--t-muted)", display: "block", marginBottom: 6 }}>Team Size</label><input className="ds-input" value={teamSize} onChange={(e) => setTeamSize(e.target.value)} /></div>
                    <div style={{ gridColumn: "span 2" }}><label style={{ fontSize: 12, fontWeight: 500, color: "var(--t-muted)", display: "block", marginBottom: 6 }}>Tagline</label><input className="ds-input" value={tagline} onChange={(e) => setTagline(e.target.value)} /></div>
                    <div style={{ gridColumn: "span 2" }}><label style={{ fontSize: 12, fontWeight: 500, color: "var(--t-muted)", display: "block", marginBottom: 6 }}>About</label><textarea className="ds-input" rows={4} style={{ height: "auto", padding: "10px 12px", resize: "vertical", lineHeight: 1.6 }} value={about} onChange={(e) => setAbout(e.target.value)} /></div>
                  </div>
                </div>
              </div>
              <div>
                <div className="sp-card" style={{ marginBottom: 14 }}>
                  <div className="sp-ch"><span className="sp-ch-t">Company Logo</span></div>
                  <div className="sp-cb" style={{ textAlign: "center" }}>
                    <div style={{ width: 64, height: 64, borderRadius: 12, background: "#1A73E8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700, color: "#fff", margin: "0 auto 12px" }}>K</div>
                    <button className="btn btn-secondary" style={{ width: "100%" }}>Upload logo</button>
                    <p style={{ fontSize: 12, color: "var(--t-faint)", marginTop: 8 }}>PNG or SVG &middot; Square &middot; Min 200\u00D7200</p>
                  </div>
                </div>
                <div className="sp-card">
                  <div className="sp-ch"><span className="sp-ch-t">Profile Completeness</span></div>
                  <div className="sp-cb" style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13 }}>
                    {["Company details", "About section", "Team & perks"].map((item) => (
                      <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--green)" }}><span>✓</span>{item}</div>
                    ))}
                    {["Office photos", "Founder video"].map((item) => (
                      <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--t-muted)" }}><span>○</span>{item}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
