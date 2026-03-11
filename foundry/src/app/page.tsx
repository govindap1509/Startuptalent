"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import "./home.css";

/* ───────────────────────── HOME PAGE ───────────────────────── */
export default function HomePage() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handler = () =>
      navRef.current?.classList.toggle("scrolled", window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      {/* ── NAV ── */}
      <nav ref={navRef} className="h-nav">
        <div className="h-nav-inner">
          <Link href="/" className="h-nav-logo">
            Foundry<sup>IN</sup>
          </Link>
          <div className="h-nav-links">
            <Link href="/" className="active">For Talent</Link>
            <Link href="/roles">For Startups</Link>
            <Link href="/roles">Browse Jobs</Link>
            <Link href="#">Browse Startups</Link>
          </div>
          <div className="h-nav-right">
            <Link href="/auth" className="btn btn-secondary btn-sm">Sign in</Link>
            <Link href="/auth" className="btn btn-primary btn-sm">Get started</Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="h-hero">
        <div className="h-hero-inner">
          <div>
            <div className="h-hero-eyebrow">
              <span className="h-hero-eyebrow-dot" />
              500k+ startup-ready professionals across India
            </div>
            <h1 className="h-h1">Where startup<br />careers are built.</h1>
            <p className="h-hero-sub">
              AI-matched roles at India&rsquo;s most ambitious startups. Salary and equity shown upfront. No recruiter games.
            </p>
            <div className="h-hero-ctas">
              <Link href="/auth" className="btn btn-primary btn-lg">Find your role →</Link>
              <Link href="/auth" className="btn btn-secondary btn-lg">Hire on Foundry</Link>
            </div>
            <div className="h-hero-trust">
              <div className="h-hero-trust-avatars">
                <div className="h-trust-av" style={{ background: "#1A73E8" }}>R</div>
                <div className="h-trust-av" style={{ background: "#137333" }}>A</div>
                <div className="h-trust-av" style={{ background: "#B45309" }}>S</div>
                <div className="h-trust-av" style={{ background: "#C5221F" }}>P</div>
                <div className="h-trust-av" style={{ background: "#5F6368" }}>K</div>
              </div>
              <p className="h-hero-trust-text"><strong>2,400+ people</strong> found their startup role this month</p>
            </div>
          </div>

          <div className="h-hero-right">
            <div className="h-hero-stat-float h-hsf-1">
              <div className="h-hsf-icon">🤖</div>
              <div><div className="h-hsf-num">94%</div><div className="h-hsf-lbl">AI match accuracy</div></div>
            </div>

            <div className="h-job-feed-card">
              <div className="h-jf-header">
                <span className="h-jf-title">Live roles for you</span>
                <span className="h-jf-live"><span className="h-jf-live-dot" />Updating now</span>
              </div>
              {[
                { letter: "K", bg: "#1A73E8", title: "Senior Product Manager", meta: "Kirana Club · Bengaluru · ₹28–40L", match: "96% match", comp: "+ 0.1% equity" },
                { letter: "S", bg: "#137333", title: "Growth Lead", meta: "Setu · Remote · ₹22–32L", match: "91% match", comp: "Series B" },
                { letter: "Z", bg: "#B45309", title: "Product Designer", meta: "Zepto · Bengaluru · ₹18–26L", match: "88% match", comp: "Series C" },
                { letter: "R", bg: "#C5221F", title: "Engineering Lead", meta: "Razorpay · Hybrid · ₹35–50L", match: "85% match", comp: "Series F" },
                { letter: "C", bg: "#5F6368", title: "Marketing Manager", meta: "Cred · Bengaluru · ₹16–24L", match: "83% match", comp: "+ ESOP" },
              ].map((j, i) => (
                <div className="h-job-item" key={i}>
                  <div className="h-ji-logo" style={{ background: j.bg }}>{j.letter}</div>
                  <div className="h-ji-info">
                    <div className="h-ji-title">{j.title}</div>
                    <div className="h-ji-meta">{j.meta}</div>
                  </div>
                  <div className="h-ji-right">
                    <span className="h-ji-match">{j.match}</span>
                    <span className="h-ji-comp">{j.comp}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-hero-stat-float h-hsf-2">
              <div className="h-hsf-icon">⚡</div>
              <div><div className="h-hsf-num">3,200+</div><div className="h-hsf-lbl">Live roles right now</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div className="h-trust-bar">
        <div className="h-trust-bar-inner">
          <span className="h-tb-label">Trusted by teams at</span>
          <div className="h-tb-logos">
            {["Swiggy", "Razorpay", "Zepto", "CRED", "Setu", "BrowserStack"].map((n) => (
              <span className="h-tb-logo" key={n}>{n}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── BROWSE BY FUNCTION ── */}
      <section className="h-section">
        <div className="h-section-inner">
          <div className="h-section-head-row">
            <div>
              <span className="h-section-label">Browse by function</span>
              <h2 className="h-section-title">Find roles that match your skills</h2>
            </div>
            <Link href="/roles" className="btn btn-secondary">View all categories</Link>
          </div>
          <div className="h-cat-grid">
            {[
              { icon: "🧩", name: "Product", count: "842 open roles" },
              { icon: "⚙️", name: "Engineering", count: "1,240 open roles" },
              { icon: "📈", name: "Growth & Marketing", count: "620 open roles" },
              { icon: "🎨", name: "Design", count: "310 open roles" },
              { icon: "💰", name: "Finance & Ops", count: "280 open roles" },
              { icon: "🤝", name: "Sales & BD", count: "450 open roles" },
              { icon: "📊", name: "Data & Analytics", count: "390 open roles" },
              { icon: "👥", name: "People & HR", count: "155 open roles" },
            ].map((c) => (
              <Link href="/roles" className="h-cat-card" key={c.name}>
                <div className="h-cat-icon">{c.icon}</div>
                <div className="h-cat-name">{c.name}</div>
                <div className="h-cat-count">{c.count}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOR TALENT ── */}
      <section className="h-section-alt">
        <div className="h-section-inner">
          <div className="h-split">
            <div>
              <span className="h-section-label">For talent</span>
              <h2 className="h-section-title">Your next role,<br />matched by AI</h2>
              <p style={{ fontSize: 16, color: "var(--t-muted)", lineHeight: 1.65, marginTop: 12 }}>
                Upload your CV once. Our AI extracts your skills, matches you to the right roles, and tells you exactly why you&rsquo;re a fit — before you apply.
              </p>
              <ul className="h-feature-list">
                {[
                  "AI builds your profile from your CV in 60 seconds",
                  "Match score on every role so you apply with confidence",
                  "Salary and equity shown upfront — no surprises",
                  "Apply in one click, track status in your dashboard",
                  "Only verified Indian startups — no spam, no ghost roles",
                ].map((t) => (
                  <li key={t}><span className="h-fl-check">✓</span>{t}</li>
                ))}
              </ul>
              <div className="h-split-ctas">
                <Link href="/auth" className="btn btn-primary">Create free profile →</Link>
                <Link href="/talent/dashboard" className="btn btn-secondary">See how it works</Link>
              </div>
            </div>
            <div className="h-split-visual">
              <div className="h-split-visual-inner">
                <div className="h-mock-dash">
                  <div className="h-mock-dash-head">
                    <div className="h-mock-dot" style={{ background: "#E8EAED" }} />
                    <div className="h-mock-dot" style={{ background: "#E8EAED" }} />
                    <div className="h-mock-dot" style={{ background: "#E8EAED" }} />
                    <span style={{ fontSize: 11, color: "var(--t-muted)", marginLeft: 8 }}>Talent Dashboard</span>
                  </div>
                  <div className="h-mock-content">
                    <div className="h-mock-stat-row">
                      <div className="h-mock-stat"><div className="h-mock-stat-n">47</div><div className="h-mock-stat-l">Matches</div></div>
                      <div className="h-mock-stat"><div className="h-mock-stat-n">5</div><div className="h-mock-stat-l">Applied</div></div>
                      <div className="h-mock-stat"><div className="h-mock-stat-n">3</div><div className="h-mock-stat-l">Replies</div></div>
                    </div>
                    <div className="h-mock-jobs">
                      {[
                        { letter: "K", bg: "#1A73E8", title: "Senior PM · Kirana Club", meta: "₹28–40L · Hybrid", match: "96%" },
                        { letter: "S", bg: "#137333", title: "Growth Lead · Setu", meta: "₹22–32L · Remote", match: "91%" },
                        { letter: "Z", bg: "#B45309", title: "Product Designer · Zepto", meta: "₹18–26L · Bengaluru", match: "88%" },
                      ].map((j, i) => (
                        <div className="h-mock-job" key={i}>
                          <div className="h-mock-job-logo" style={{ background: j.bg }}>{j.letter}</div>
                          <div><div className="h-mock-job-title">{j.title}</div><div className="h-mock-job-meta">{j.meta}</div></div>
                          <span className="h-mock-job-match">{j.match}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOR STARTUPS ── */}
      <section className="h-section">
        <div className="h-section-inner">
          <div className="h-split" style={{ direction: "rtl" }}>
            <div style={{ direction: "ltr" }}>
              <span className="h-section-label">For startups</span>
              <h2 className="h-section-title">Hire the builders<br />who move fast</h2>
              <p style={{ fontSize: 16, color: "var(--t-muted)", lineHeight: 1.65, marginTop: 12 }}>
                Post a role, get AI-ranked applicants, and build a company page that makes top talent want to join. No agencies, no markups.
              </p>
              <ul className="h-feature-list">
                {[
                  "AI writes your job description from a 2-line brief",
                  "Every applicant ranked by AI match score automatically",
                  "Proactively search 500k+ verified profiles",
                  "Full ATS pipeline included at every tier",
                  "Pay on hire — no upfront cost with Scout plan",
                ].map((t) => (
                  <li key={t}><span className="h-fl-check">✓</span>{t}</li>
                ))}
              </ul>
              <div className="h-split-ctas">
                <Link href="/auth" className="btn btn-primary">Post your first role →</Link>
                <Link href="/startup/portal" className="btn btn-secondary">See the portal</Link>
              </div>
            </div>
            <div className="h-split-visual" style={{ direction: "ltr" }}>
              <div className="h-split-visual-inner">
                <div className="h-mock-dash">
                  <div className="h-mock-dash-head">
                    <div className="h-mock-dot" style={{ background: "#E8EAED" }} />
                    <div className="h-mock-dot" style={{ background: "#E8EAED" }} />
                    <div className="h-mock-dot" style={{ background: "#E8EAED" }} />
                    <span style={{ fontSize: 11, color: "var(--t-muted)", marginLeft: 8 }}>Startup Portal</span>
                  </div>
                  <div className="h-mock-content">
                    <div className="h-mock-stat-row">
                      <div className="h-mock-stat"><div className="h-mock-stat-n">84</div><div className="h-mock-stat-l">Applicants</div></div>
                      <div className="h-mock-stat"><div className="h-mock-stat-n">12</div><div className="h-mock-stat-l">Shortlisted</div></div>
                      <div className="h-mock-stat"><div className="h-mock-stat-n">91%</div><div className="h-mock-stat-l">Avg match</div></div>
                    </div>
                    <div className="h-mock-bar-row">
                      <div style={{ fontSize: 11, color: "var(--t-muted)", marginBottom: 8, fontWeight: 500 }}>AI match distribution</div>
                      {[
                        { label: "90–100%", w: "30%", color: "#137333", n: "25" },
                        { label: "75–90%", w: "52%", color: undefined, n: "44" },
                        { label: "Below 75%", w: "18%", color: "#BDC1C6", n: "15" },
                      ].map((b) => (
                        <div className="h-mock-bar-item" key={b.label}>
                          <span className="h-mock-bar-label">{b.label}</span>
                          <div className="h-mock-bar-track">
                            <div className="h-mock-bar-fill" style={{ width: b.w, ...(b.color ? { background: b.color } : {}) }} />
                          </div>
                          <span style={{ fontSize: 11, color: "var(--t-muted)" }}>{b.n}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="h-section-alt">
        <div className="h-section-inner">
          <div className="h-section-head" style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 48px" }}>
            <span className="h-section-label">How it works</span>
            <h2 className="h-section-title">From CV to offer in days, not months</h2>
          </div>
          <div className="h-how-grid">
            {[
              { num: "01", title: "Upload your CV", desc: "Drop your CV and our AI extracts your skills, experience, and education in under 60 seconds. No form filling.", tag: "AI-powered" },
              { num: "02", title: "Get matched instantly", desc: "Your profile is scored against every live role. You see exactly why you're a match — skills, experience, company stage.", tag: "Real-time" },
              { num: "03", title: "Apply with one click", desc: "Your profile is your application. Startups see your match score and experience — no cover letters needed.", tag: "Instant" },
            ].map((s) => (
              <div className="h-how-step" key={s.num}>
                <div className="h-how-num">{s.num}</div>
                <div className="h-how-title">{s.title}</div>
                <p className="h-how-desc">{s.desc}</p>
                <span className="h-how-tag">✦ {s.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED COMPANIES ── */}
      <section className="h-section">
        <div className="h-section-inner">
          <div className="h-section-head-row">
            <div>
              <span className="h-section-label">Featured companies</span>
              <h2 className="h-section-title">Hiring right now</h2>
            </div>
            <Link href="/c/kirana-club" className="btn btn-secondary">Browse all startups</Link>
          </div>
          <div className="h-startup-grid">
            {[
              { slug: "kirana-club", letter: "K", bg: "#1A73E8", name: "Kirana Club", desc: "Digitising India\u2019s \u20B950L cr kirana ecosystem with payments, ordering, and AI forecasting.", stage: "Series B", sector: "B2B Commerce", loc: "Bengaluru", roles: "3 open roles", size: "80\u2013150 people" },
              { slug: "setu", letter: "S", bg: "#137333", name: "Setu", desc: "India\u2019s financial data infrastructure. APIs that power millions of transactions daily.", stage: "Series B", sector: "Fintech", loc: "Remote", roles: "5 open roles", size: "50\u201380 people" },
              { slug: "zepto", letter: "Z", bg: "#B45309", name: "Zepto", desc: "10-minute grocery delivery. One of India\u2019s fastest-growing commerce platforms.", stage: "Series C", sector: "Quick Commerce", loc: "Mumbai", roles: "8 open roles", size: "500\u20131000 people" },
            ].map((c) => (
              <Link href={`/c/${c.slug}`} className="h-startup-card" key={c.slug}>
                <div className="h-sc-top">
                  <div className="h-sc-logo" style={{ background: c.bg }}>{c.letter}</div>
                  <span className="h-sc-badge">✓ Verified</span>
                </div>
                <div className="h-sc-name">{c.name}</div>
                <div className="h-sc-desc">{c.desc}</div>
                <div className="h-sc-meta">
                  <span className="h-sc-chip h-sc-chip-blue">{c.stage}</span>
                  <span className="h-sc-chip">{c.sector}</span>
                  <span className="h-sc-chip">{c.loc}</span>
                </div>
                <div className="h-sc-footer">
                  <span className="h-sc-roles">{c.roles}</span>
                  <span className="h-sc-size">{c.size}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROOF BAR ── */}
      <div className="h-proof">
        <div className="h-proof-inner">
          {[
            { num: "500", suffix: "k+", label: "Talent profiles" },
            { num: "3,200", suffix: "+", label: "Live roles" },
            { num: "1,800", suffix: "+", label: "Verified startups" },
            { num: "94", suffix: "%", label: "AI match accuracy" },
          ].map((p) => (
            <div className="h-proof-item" key={p.label}>
              <span className="h-proof-num">{p.num}<span>{p.suffix}</span></span>
              <span className="h-proof-label">{p.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── FINAL CTA ── */}
      <section className="h-final-cta">
        <div className="h-final-cta-inner">
          <h2>Ready to find your<br />next startup role?</h2>
          <p>
            Join 500k+ professionals who use Foundry to find roles that actually match their skills — at India&rsquo;s most ambitious startups.
          </p>
          <div className="h-final-cta-cards">
            <div className="h-cta-card h-cta-card-featured">
              <span className="h-cta-card-icon">🚀</span>
              <div className="h-cta-card-title">I&rsquo;m looking for a role</div>
              <p className="h-cta-card-desc">Upload your CV, get AI-matched, and apply in one click. Free forever.</p>
              <Link href="/auth" className="btn btn-primary" style={{ width: "100%" }}>Create talent profile →</Link>
            </div>
            <div className="h-cta-card">
              <span className="h-cta-card-icon">🏗️</span>
              <div className="h-cta-card-title">I&rsquo;m hiring</div>
              <p className="h-cta-card-desc">Post a role, get AI-ranked applicants, and build your employer brand.</p>
              <Link href="/auth" className="btn btn-secondary" style={{ width: "100%" }}>Post a role →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="h-footer">
        <div className="h-footer-inner">
          <div className="h-footer-grid">
            <div>
              <span className="h-footer-brand">Foundry<sup>IN</sup></span>
              <p className="h-footer-tagline">India&rsquo;s AI-powered startup talent platform. Connecting the builders of tomorrow with the startups building it.</p>
            </div>
            <div>
              <span className="h-footer-col-head">For Talent</span>
              <ul className="h-footer-links">
                <li><Link href="/roles">Browse Jobs</Link></li>
                <li><Link href="/auth">Create Profile</Link></li>
                <li><Link href="#">AI Matching</Link></li>
                <li><Link href="#">Salary Guide</Link></li>
              </ul>
            </div>
            <div>
              <span className="h-footer-col-head">For Startups</span>
              <ul className="h-footer-links">
                <li><Link href="/auth">Post a Role</Link></li>
                <li><Link href="/startup/portal">ATS Dashboard</Link></li>
                <li><Link href="#">Browse Talent</Link></li>
                <li><Link href="#">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <span className="h-footer-col-head">Company</span>
              <ul className="h-footer-links">
                <li><Link href="#">About</Link></li>
                <li><Link href="#">Blog</Link></li>
                <li><Link href="#">Careers</Link></li>
                <li><Link href="#">Press</Link></li>
              </ul>
            </div>
            <div>
              <span className="h-footer-col-head">Support</span>
              <ul className="h-footer-links">
                <li><Link href="#">Help Centre</Link></li>
                <li><Link href="#">Privacy</Link></li>
                <li><Link href="#">Terms</Link></li>
                <li><Link href="#">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="h-footer-bottom">
            <span className="h-footer-copy">© 2025 Foundry Technologies Pvt. Ltd. · 🇮🇳 Built in India</span>
            <div className="h-footer-btm-links">
              <Link href="#">Privacy</Link>
              <Link href="#">Terms</Link>
              <Link href="#">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
