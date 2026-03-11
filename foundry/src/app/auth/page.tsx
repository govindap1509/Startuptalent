"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./auth.css";

/* ─── LEFT PANEL CONTENT ─── */
const leftContent: Record<string, { headline: string; sub: string; quote: string; author: string }> = {
  talent: {
    headline: "Your next startup role is waiting.",
    sub: "AI-matched jobs at India\u2019s best startups. Salary and equity upfront. Free forever.",
    quote: "\u201CI found my PM role at a Series B startup within 3 weeks. The AI match score told me exactly why I was right for it.\u201D",
    author: "Riya Menon \u00B7 Senior PM, Kirana Club",
  },
  startup: {
    headline: "Find builders who move fast.",
    sub: "Post a role, get AI-ranked applicants, and hire from 500k+ verified profiles.",
    quote: "\u201CWe filled our VP Engineering role in 11 days. The AI shortlist was better than 3 months of agency work.\u201D",
    author: "Aryan Shah \u00B7 Co-founder, Kirana Club",
  },
  login: {
    headline: "Welcome back.",
    sub: "Pick up where you left off. Your matches and applications are waiting.",
    quote: "\u201CFoundry is the only platform where salary is shown upfront. That alone saves 2 weeks of wasted interviews.\u201D",
    author: "Sneha Rao \u00B7 Head of Engineering",
  },
};

type Screen = "role" | "details" | "success" | "login" | "portal" | "forgot" | "forgot-done";

export default function AuthPage() {
  const router = useRouter();
  const [screen, setScreen] = useState<Screen>("role");
  const [role, setRole] = useState<"talent" | "startup" | null>(null);
  const [email, setEmail] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [pw, setPw] = useState("");
  const [leftKey, setLeftKey] = useState<string>("talent");

  /* helpers */
  const leftData = leftContent[leftKey] || leftContent.talent;

  const emailValid = /\S+@\S+\.\S+/.test(email);
  const step1Ok = !!role && emailValid;

  const show = useCallback((s: Screen, lk?: string) => {
    setScreen(s);
    if (lk) setLeftKey(lk);
  }, []);

  /* password strength */
  const pwStrength = (() => {
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  })();
  const pwClass = pwStrength <= 1 ? "weak" : pwStrength <= 2 ? "ok" : "strong";
  const pwLabel = !pw ? "Enter a password" : ["", "Weak", "Fair", "Good", "Strong"][pwStrength];
  const pwLabelColor = pwClass === "weak" ? "var(--red)" : pwClass === "ok" ? "#B45309" : "var(--green)";

  return (
    <div className="a-shell">
      {/* ── LEFT ── */}
      <div className="a-left">
        <Link href="/" className="a-logo">Foundry<sup>IN</sup></Link>
        <div className="a-body">
          <div className="a-headline">{leftData.headline}</div>
          <p className="a-sub">{leftData.sub}</p>
          <div className="a-stats">
            <div className="a-stat"><div className="a-stat-num">500k+</div><div className="a-stat-lbl">Talent profiles</div></div>
            <div className="a-stat"><div className="a-stat-num">3,200+</div><div className="a-stat-lbl">Live roles</div></div>
            <div className="a-stat"><div className="a-stat-num">1,800+</div><div className="a-stat-lbl">Verified startups</div></div>
            <div className="a-stat"><div className="a-stat-num">94%</div><div className="a-stat-lbl">AI match accuracy</div></div>
          </div>
        </div>
        <div className="a-quote">
          <p className="a-quote-text">{leftData.quote}</p>
          <div className="a-quote-author">{leftData.author}</div>
        </div>
      </div>

      {/* ── RIGHT ── */}
      <div className="a-right">
        <div className="a-box">

          {/* SCREEN: ROLE SELECT */}
          {screen === "role" && (
            <div className="a-screen" key="role">
              <div className="a-top-link">
                Already have an account?{" "}
                <button onClick={() => show("login", "login")}>Sign in</button>
              </div>
              <h1 className="a-title">Create your account</h1>
              <p className="a-sub-text">Are you looking for a role, or are you hiring?</p>
              <div className="a-role-cards">
                <div
                  className={`a-role-card${role === "talent" ? " selected" : ""}`}
                  onClick={() => { setRole("talent"); setLeftKey("talent"); }}
                >
                  <span className="a-role-card-icon">🚀</span>
                  <div className="a-role-card-title">I&rsquo;m looking for a role</div>
                  <div className="a-role-card-desc">Browse startup jobs, get AI-matched</div>
                </div>
                <div
                  className={`a-role-card${role === "startup" ? " selected" : ""}`}
                  onClick={() => { setRole("startup"); setLeftKey("startup"); }}
                >
                  <span className="a-role-card-icon">🏗️</span>
                  <div className="a-role-card-title">I&rsquo;m hiring</div>
                  <div className="a-role-card-desc">Post roles, find vetted talent</div>
                </div>
              </div>
              <div className="a-field">
                <label className="ds-label">Work email</label>
                <input className="ds-input" type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <button className="a-btn-primary" disabled={!step1Ok} onClick={() => show("details")}>Continue →</button>
              <p className="a-fine">By continuing you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.</p>
            </div>
          )}

          {/* SCREEN: DETAILS */}
          {screen === "details" && (
            <div className="a-screen" key="details">
              <div className="a-step-dots">
                <div className="a-step-dot done" />
                <div className="a-step-dot active" />
                <div className="a-step-dot" />
              </div>
              <h1 className="a-title">Set up your account</h1>
              <p className="a-sub-text">
                {role === "startup" ? "Tell us about your company and set a password." : "Your name and a password \u2014 that\u2019s all."}
              </p>
              <div className="a-field"><label className="ds-label">First name</label><input className="ds-input" type="text" placeholder="Riya" /></div>
              <div className="a-field"><label className="ds-label">Last name</label><input className="ds-input" type="text" placeholder="Menon" /></div>
              {role === "startup" && (
                <div className="a-field"><label className="ds-label">Company name</label><input className="ds-input" type="text" placeholder="Kirana Club" /></div>
              )}
              <div className="a-field">
                <label className="ds-label">Password</label>
                <div className="a-pw-wrap">
                  <input className="ds-input" type={showPw ? "text" : "password"} placeholder="At least 8 characters" value={pw} onChange={(e) => setPw(e.target.value)} />
                  <button className="a-pw-toggle" type="button" onClick={() => setShowPw(!showPw)}>👁</button>
                </div>
                <div className="a-pw-strength">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className={`a-pw-bar${i < pwStrength ? " " + pwClass : ""}`} />
                  ))}
                </div>
                <div className="a-pw-label" style={{ color: pw ? pwLabelColor : undefined }}>{pwLabel}</div>
              </div>
              <button className="a-btn-primary" onClick={() => show("success")}>Create account →</button>
              <button className="a-btn-secondary" onClick={() => show("role")}>← Back</button>
            </div>
          )}

          {/* SCREEN: SUCCESS */}
          {screen === "success" && (
            <div className="a-screen" key="success">
              <div className="a-step-dots">
                <div className="a-step-dot done" />
                <div className="a-step-dot done" />
                <div className="a-step-dot active" />
              </div>
              <div className="a-success-icon">✓</div>
              <h1 className="a-title" style={{ textAlign: "center" }}>
                {role === "startup" ? "Company account created!" : "Account created!"}
              </h1>
              <p className="a-sub-text" style={{ textAlign: "center" }}>
                {role === "startup"
                  ? "Set up your company profile to start attracting talent."
                  : "Your profile is ready. Let\u2019s set it up so startups can find you."}
              </p>
              <Link
                href={role === "startup" ? "/startup/portal" : "/profile/setup"}
                className="a-btn-primary"
              >
                {role === "startup" ? "Go to Startup Portal →" : "Set up my profile →"}
              </Link>
            </div>
          )}

          {/* SCREEN: LOGIN */}
          {screen === "login" && (
            <div className="a-screen" key="login">
              <div className="a-top-link">
                New to Foundry?{" "}
                <button onClick={() => show("role", "talent")}>Create account</button>
              </div>
              <h1 className="a-title">Welcome back</h1>
              <p className="a-sub-text">Sign in to your Foundry account.</p>
              <div className="a-field">
                <label className="ds-label">Email</label>
                <input className="ds-input" type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="a-field">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <label className="ds-label" style={{ margin: 0 }}>Password</label>
                  <button className="a-link-btn" onClick={() => show("forgot")}>Forgot password?</button>
                </div>
                <div className="a-pw-wrap">
                  <input className="ds-input" type={showPw ? "text" : "password"} placeholder="Your password" />
                  <button className="a-pw-toggle" type="button" onClick={() => setShowPw(!showPw)}>👁</button>
                </div>
              </div>
              <button
                className="a-btn-primary"
                onClick={() => {
                  const lo = email.toLowerCase();
                  if (lo.includes("both")) { show("portal"); return; }
                  if (lo.includes("startup")) { router.push("/startup/portal"); return; }
                  router.push("/talent/dashboard");
                }}
              >
                Sign in →
              </button>
              <div className="a-or"><div className="a-or-line" /><span>or</span><div className="a-or-line" /></div>
              <button className="a-btn-secondary" onClick={() => show("role", "talent")}>Create a new account</button>
            </div>
          )}

          {/* SCREEN: PORTAL */}
          {screen === "portal" && (
            <div className="a-screen" key="portal">
              <h1 className="a-title">Choose your portal</h1>
              <p className="a-sub-text">You have access to both talent and startup portals. Where would you like to go?</p>
              <div className="a-portal-cards">
                <Link href="/talent/dashboard" className="a-portal-card">
                  <span className="a-portal-card-icon">🚀</span>
                  <div className="a-portal-card-title">Talent Portal</div>
                  <div className="a-portal-card-desc">Browse jobs, track applications, manage your profile</div>
                </Link>
                <Link href="/startup/portal" className="a-portal-card">
                  <span className="a-portal-card-icon">🏗️</span>
                  <div className="a-portal-card-title">Startup Portal</div>
                  <div className="a-portal-card-desc">Post roles, review applicants, manage your company</div>
                </Link>
              </div>
            </div>
          )}

          {/* SCREEN: FORGOT */}
          {screen === "forgot" && (
            <div className="a-screen" key="forgot">
              <h1 className="a-title">Reset your password</h1>
              <p className="a-sub-text">Enter your email and we&rsquo;ll send you a reset link.</p>
              <div className="a-field">
                <label className="ds-label">Email</label>
                <input className="ds-input" type="email" placeholder="you@company.com" />
              </div>
              <button className="a-btn-primary" onClick={() => show("forgot-done")}>Send reset link →</button>
              <button className="a-btn-secondary" onClick={() => show("login", "login")}>← Back to sign in</button>
            </div>
          )}

          {/* SCREEN: FORGOT DONE */}
          {screen === "forgot-done" && (
            <div className="a-screen" key="forgot-done">
              <div className="a-success-icon">📧</div>
              <h1 className="a-title" style={{ textAlign: "center" }}>Check your email</h1>
              <p className="a-sub-text" style={{ textAlign: "center" }}>
                We sent a reset link to your email address. It expires in 15 minutes.
              </p>
              <button className="a-btn-secondary" onClick={() => show("login", "login")}>Back to sign in</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
