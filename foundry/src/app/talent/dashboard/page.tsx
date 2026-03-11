"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import "./dashboard.css";

type Tab = "discover" | "apps" | "msgs" | "profile";
type Thread = { name: string; sub: string; color: string; initial: string; preview: string; time: string; unread: boolean };

const THREADS: Thread[] = [
  { name: "Aryan Shah", sub: "Kirana Club \u00B7 Senior PM role", color: "#1A73E8", initial: "A", preview: "Loved your profile \u2014 can we chat?", time: "2h", unread: true },
  { name: "Priya R.", sub: "Setu \u00B7 Growth Lead", color: "#137333", initial: "P", preview: "Interview Tuesday 3pm confirmed", time: "1d", unread: false },
  { name: "Vikram N.", sub: "BrowserStack \u00B7 Head of PM", color: "#5F6368", initial: "V", preview: "Following up on your application", time: "3d", unread: true },
];

const DEFAULT_MSGS = [
  { dir: "in", text: "Hi Riya \u2014 we came across your profile on Foundry and your B2C growth background is exactly what we need. Would love to have a quick chat about the Senior PM role.", time: "10:24 AM" },
  { dir: "out", text: "Hi Aryan! Thanks for reaching out \u2014 I\u2019ve been following Kirana Club\u2019s work closely. Happy to connect. What timezone works best?", time: "10:31 AM" },
  { dir: "in", text: "We\u2019re in IST \u2014 free Thursday at 3pm for a 30-min intro call?", time: "10:45 AM" },
];

const JOBS = [
  { logo: "#1A73E8", initial: "K", title: "Senior Product Manager", company: "Kirana Club", loc: "Bengaluru \u00B7 Hybrid", match: 96, matchCls: "green", stage: "Series B", tags: ["Product Strategy", "B2C", "SQL"], pay: "\u20B928\u201340L", eq: "+ 0.1% equity" },
  { logo: "#137333", initial: "S", title: "Growth Lead", company: "Setu", loc: "Remote \u00B7 Full-time", match: 91, matchCls: "green", stage: "Series B", tags: ["Growth", "B2B SaaS", "Analytics"], pay: "\u20B922\u201332L", eq: "+ ESOP" },
  { logo: "#B45309", initial: "Z", title: "Head of Product", company: "Zepto", loc: "Mumbai \u00B7 Hybrid", match: 88, matchCls: "blue", stage: "Series C", tags: ["Product Leadership", "Quick Commerce"], pay: "\u20B940\u201360L", eq: "+ equity" },
];

const APPS = [
  { logo: "#1A73E8", initial: "K", title: "Senior Product Manager \u00B7 Kirana Club", meta: "Applied 3 days ago \u00B7 \u20B928\u201340L \u00B7 Hybrid", badge: "In Review", badgeCls: "td-bb", stages: ["done", "done", "cur", "", ""] },
  { logo: "#137333", initial: "S", title: "Growth Lead \u00B7 Setu", meta: "Applied 1 week ago \u00B7 \u20B922\u201332L \u00B7 Remote", badge: "Interviewing", badgeCls: "td-ba", stages: ["done", "done", "done", "cur", ""] },
  { logo: "#B45309", initial: "Z", title: "Product Designer \u00B7 Zepto", meta: "Applied 2 weeks ago \u00B7 \u20B918\u201326L", badge: "Under Review", badgeCls: "td-bd", stages: ["done", "cur", "", "", ""] },
];

const APP_LABELS = ["Applied", "Seen", "In Review", "Interview", "Offer"];

export default function TalentDashboardPage() {
  const [tab, setTab] = useState<Tab>("discover");
  const [filter, setFilter] = useState("All");
  const [appFilter, setAppFilter] = useState("All");
  const [threadIdx, setThreadIdx] = useState(0);
  const [msgs, setMsgs] = useState(DEFAULT_MSGS);
  const [msgInput, setMsgInput] = useState("");
  const [applied, setApplied] = useState<Set<number>>(new Set());
  const msgsEndRef = useRef<HTMLDivElement>(null);

  const sw = (t: Tab) => setTab(t);

  const sendMsg = () => {
    const v = msgInput.trim();
    if (!v) return;
    setMsgs([...msgs, { dir: "out", text: v, time: "Just now" }]);
    setMsgInput("");
    setTimeout(() => msgsEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const applyJob = (idx: number) => setApplied((p) => new Set(p).add(idx));

  const filters = ["All", "Product", "Remote", "Series A\u2013B", "\u20B920L+"];
  const appFilters = ["All", "In Review", "Interview", "Offer"];

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "var(--bg-alt)", overflow: "hidden" }}>
      {/* NAV */}
      <nav className="td-topnav">
        <div className="td-tn-inner">
          <Link href="/" className="td-logo">Foundry<sup>IN</sup></Link>
          <div className="td-mode">
            <span className="td-am">Talent</span>
            <Link href="/startup/portal">Startup</Link>
          </div>
          <div className="td-right">
            <div className="td-notif">🔔<div className="td-ndot" /></div>
            <div className="td-uav">R</div>
          </div>
        </div>
      </nav>

      <div className="td-shell">
        {/* SIDEBAR */}
        <div className="td-sidebar">
          <div className="td-sb-prof">
            <div className="td-sb-av">R</div>
            <div>
              <div className="td-sb-name">Riya Menon</div>
              <div className="td-sb-sub">Senior Product Manager</div>
              <span className="td-sb-badge">✦ AI Profile</span>
            </div>
          </div>
          <div className="td-sb-stats">
            <div className="td-sb-stat"><span className="td-sbn">47</span><div className="td-sbl">Matches</div></div>
            <div className="td-sb-stat"><span className="td-sbn">5</span><div className="td-sbl">Applied</div></div>
            <div className="td-sb-stat"><span className="td-sbn">3</span><div className="td-sbl">Replies</div></div>
          </div>
          <div className="td-sb-nav">
            <button className={`td-sni${tab === "discover" ? " active" : ""}`} onClick={() => sw("discover")}><span className="td-sni-icon">🔍</span>Discover Jobs<span className="td-snb">47</span></button>
            <button className={`td-sni${tab === "apps" ? " active" : ""}`} onClick={() => sw("apps")}><span className="td-sni-icon">📋</span>My Applications<span className="td-snb red">2</span></button>
            <button className={`td-sni${tab === "msgs" ? " active" : ""}`} onClick={() => sw("msgs")}><span className="td-sni-icon">💬</span>Messages<span className="td-snb">3</span></button>
            <button className={`td-sni${tab === "profile" ? " active" : ""}`} onClick={() => sw("profile")}><span className="td-sni-icon">👤</span>My Profile</button>
          </div>
          <div className="td-sb-prog">
            <div className="td-spg-row"><span className="td-spg-lbl">Profile strength</span><span className="td-spg-pct">78%</span></div>
            <div className="td-spg-track"><div className="td-spg-fill" style={{ width: "78%" }} /></div>
          </div>
          <div className="td-sb-foot"><Link href="/auth">&larr; Sign out</Link></div>
        </div>

        <div className="td-main">

          {/* DISCOVER */}
          <div className={`td-tp${tab === "discover" ? " active" : ""}`}>
            <div className="td-ph">
              <div><div className="td-ph-t">Discover Jobs</div><div className="td-ph-s">47 roles matched to your profile</div></div>
              <button className="btn btn-primary">Update preferences</button>
            </div>
            <div className="td-alert-bar">✦ AI found 3 new matches overnight matching your target role &ldquo;Head of Product&rdquo; at Series B startups.</div>
            <div className="td-fc-bar">
              {filters.map((f) => (
                <button key={f} className={`td-fc${filter === f ? " on" : ""}`} onClick={() => setFilter(f)}>{f}</button>
              ))}
            </div>
            <div className="td-ai-label">✦ AI Top Picks</div>
            {JOBS.map((j, i) => (
              <div className="td-jc" key={i}>
                <div className="td-jc-row">
                  <div className="td-jc-logo" style={{ background: j.logo }}>{j.initial}</div>
                  <div style={{ flex: 1 }}><div className="td-jc-title">{j.title}</div><div className="td-jc-co">{j.company} &middot; {j.loc}</div></div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3, flexShrink: 0 }}>
                    <span className="td-jc-match" style={{ background: j.matchCls === "green" ? "var(--green-bg)" : "var(--blue-tint)", color: j.matchCls === "green" ? "var(--green)" : "var(--blue)" }}>{j.match}%</span>
                    <span style={{ fontSize: 11, color: "var(--t-muted)" }}>{j.stage}</span>
                  </div>
                </div>
                <div className="td-jc-tags">{j.tags.map((t) => <span className="td-jc-tag" key={t}>{t}</span>)}</div>
                <div className="td-jc-foot">
                  <span className="td-jc-comp">{j.pay} <span>{j.eq}</span></span>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button className="btn btn-sm btn-secondary">Save</button>
                    {applied.has(i) ? (
                      <button className="btn btn-sm" style={{ background: "var(--green)", color: "#fff", border: "none" }} disabled>Applied ✓</button>
                    ) : (
                      <button className="btn btn-sm btn-primary" onClick={() => applyJob(i)}>Apply →</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* APPLICATIONS */}
          <div className={`td-tp${tab === "apps" ? " active" : ""}`}>
            <div className="td-ph"><div><div className="td-ph-t">My Applications</div><div className="td-ph-s">5 active applications</div></div></div>
            <div className="td-fc-bar">
              {appFilters.map((f) => (
                <button key={f} className={`td-fc${appFilter === f ? " on" : ""}`} onClick={() => setAppFilter(f)}>{f}</button>
              ))}
            </div>
            {APPS.map((a, i) => (
              <div className="td-ac" key={i}>
                <div className="td-ac-top">
                  <div className="td-ac-logo" style={{ background: a.logo }}>{a.initial}</div>
                  <div style={{ flex: 1 }}><div className="td-ac-title">{a.title}</div><div className="td-ac-meta">{a.meta}</div></div>
                  <span className={`td-badge ${a.badgeCls}`}>{a.badge}</span>
                </div>
                <div className="td-pipe">
                  {a.stages.map((s, si) => (
                    <div className={`td-ps${s ? ` ${s}` : ""}`} key={si}>
                      <div className="td-pdot" />
                      {si < a.stages.length - 1 && <div className="td-pline" />}
                    </div>
                  ))}
                </div>
                <div className="td-plabels">{APP_LABELS.map((l) => <span className="td-pl" key={l}>{l}</span>)}</div>
              </div>
            ))}
          </div>

          {/* MESSAGES */}
          <div className={`td-tp${tab === "msgs" ? " active" : ""}`}>
            <div className="td-ph"><div><div className="td-ph-t">Messages</div><div className="td-ph-s">3 unread conversations</div></div></div>
            <div className="td-msg-layout">
              <div className="td-mt-list">
                {THREADS.map((t, i) => (
                  <div key={i} className={`td-mt-item${threadIdx === i ? " active" : ""}`} onClick={() => setThreadIdx(i)}>
                    <div className="td-mt-av" style={{ background: t.color }}>{t.initial}</div>
                    <div style={{ flex: 1, minWidth: 0 }}><div className="td-mt-name">{t.name}</div><div className="td-mt-prev">{t.preview}</div></div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                      <span className="td-mt-time">{t.time}</span>
                      {t.unread && <div className="td-mt-unread" />}
                    </div>
                  </div>
                ))}
              </div>
              <div className="td-mc">
                <div className="td-mc-head">
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: THREADS[threadIdx].color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{THREADS[threadIdx].initial}</div>
                  <div><div className="td-mc-name">{THREADS[threadIdx].name}</div><div className="td-mc-sub">{THREADS[threadIdx].sub}</div></div>
                </div>
                <div className="td-mc-msgs">
                  {msgs.map((m, i) => (
                    <div key={i}>
                      <div className={`td-bubble ${m.dir === "in" ? "td-b-in" : "td-b-out"}`}>{m.text}</div>
                      <div className="td-b-time" style={m.dir === "out" ? { textAlign: "right" } : undefined}>{m.time}</div>
                    </div>
                  ))}
                  <div ref={msgsEndRef} />
                </div>
                <div className="td-mc-inp">
                  <input className="ds-input" style={{ flex: 1 }} placeholder="Type a message\u2026" value={msgInput} onChange={(e) => setMsgInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMsg()} />
                  <button className="btn btn-primary btn-sm" onClick={sendMsg}>Send</button>
                </div>
              </div>
            </div>
          </div>

          {/* PROFILE */}
          <div className={`td-tp${tab === "profile" ? " active" : ""}`}>
            <div className="td-ph">
              <div><div className="td-ph-t">My Profile</div><div className="td-ph-s">78% complete &middot; <Link href="/u/riya-menon" target="_blank">View public profile ↗</Link></div></div>
              <div style={{ display: "flex", gap: 8 }}>
                <Link href="/profile/setup" className="btn btn-secondary">Edit</Link>
                <button className="btn btn-primary">Share profile</button>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
              <div>
                <div className="td-card">
                  <div className="td-ch"><span className="td-ch-t">Experience</span><button className="btn btn-secondary btn-sm">+ Add</button></div>
                  <div className="td-cb">
                    <div className="td-exp-item"><div className="td-exp-logo" style={{ background: "#f97316" }}>S</div><div><div className="td-exp-role">Senior Product Manager</div><div className="td-exp-co">Swiggy</div><div className="td-exp-period">Jan 2021 \u2013 Present \u00B7 3 yrs</div></div></div>
                    <div className="td-exp-item"><div className="td-exp-logo" style={{ background: "#6366f1" }}>U</div><div><div className="td-exp-role">Product Manager</div><div className="td-exp-co">Urban Company</div><div className="td-exp-period">Jun 2018 \u2013 Dec 2020</div></div></div>
                  </div>
                </div>
                <div className="td-card">
                  <div className="td-ch"><span className="td-ch-t">Education</span></div>
                  <div className="td-cb">
                    <div className="td-exp-item"><div className="td-exp-logo" style={{ background: "#0D47A1" }}>I</div><div><div className="td-exp-role">MBA \u2014 Marketing & Strategy</div><div className="td-exp-co">IIM Bangalore \u00B7 2018\u20132020</div></div></div>
                    <div className="td-exp-item"><div className="td-exp-logo" style={{ background: "#137333" }}>N</div><div><div className="td-exp-role">B.Tech \u2014 Computer Science</div><div className="td-exp-co">NIT Trichy \u00B7 2014\u20132018</div></div></div>
                  </div>
                </div>
              </div>
              <div>
                <div className="td-card" style={{ marginBottom: 14 }}>
                  <div className="td-ch"><span className="td-ch-t">Skills</span><button className="btn btn-secondary btn-sm">Edit</button></div>
                  <div className="td-cb"><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {["Product Strategy", "User Research", "SQL", "A/B Testing", "B2C Growth", "Roadmapping"].map((s) => <span className="td-sk" key={s}>{s}</span>)}
                  </div></div>
                </div>
                <div className="td-card">
                  <div className="td-ch"><span className="td-ch-t">Looking for</span></div>
                  <div className="td-cb" style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: "var(--t-body)" }}>
                    <div>Senior Product Manager</div>
                    <div>Head of Product</div>
                    <div style={{ fontSize: 12, color: "var(--t-muted)", marginTop: 4 }}>Series A\u2013C \u00B7 \u20B925L+ \u00B7 Bengaluru or Remote</div>
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
