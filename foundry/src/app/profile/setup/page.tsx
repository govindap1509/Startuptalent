"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import "./setup.css";

const AI_SKILLS = ["Product Strategy", "User Research", "SQL", "Data Analysis", "A/B Testing", "B2C Growth", "Roadmapping", "Stakeholder Management"];

const STEP_NAMES = ["Upload CV", "AI Extract", "Basics", "Experience", "Skills", "Education", "Preview"];
const TL_NAMES = ["Upload CV", "AI Extraction", "Basics", "Experience & Target", "Skills", "Education & Intro", "Profile Ready"];
const TL_SUMS_DEFAULT = ["Drop your CV for AI extraction", "Pulling your key details", "Name, location, headline", "Years of exp, target roles", "Confirm your skill tags", "Degree, college, bio", "Review and launch"];

type Edu = { degree: string; field: string; institution: string; year: string };

export default function ProfileSetupPage() {
  const [step, setStep] = useState(1);
  const [scoreMap, setScoreMap] = useState<Record<string, number>>({});
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("Riya");
  const [lastName, setLastName] = useState("Menon");
  const [city, setCity] = useState("Bengaluru");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [headline, setHeadline] = useState("Senior Product Manager \u00B7 B2C Growth \u00B7 Bengaluru");
  const [currentRole, setCurrentRole] = useState("Senior Product Manager");
  const [currentCompany, setCurrentCompany] = useState("Swiggy");
  const [experience, setExperience] = useState(5);
  const [targets, setTargets] = useState(["Senior Product Manager", "Head of Product"]);
  const [targetInput, setTargetInput] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<Set<string>>(new Set(AI_SKILLS));
  const [customSkills, setCustomSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [eduList, setEduList] = useState<Edu[]>([
    { degree: "MBA", field: "Marketing & Strategy", institution: "IIM Bangalore", year: "2018\u20132020" },
    { degree: "B.Tech", field: "Computer Science", institution: "NIT Trichy", year: "2014\u20132018" },
  ]);
  const [bio, setBio] = useState("Senior PM with 5 years building consumer products at scale. Led the Swiggy One loyalty programme to 4M subscribers. Looking for a high-ownership PM role at a Series A\u2013C startup.");
  const [exDone, setExDone] = useState<boolean[]>([false, false, false, false, false]);
  const [exPct, setExPct] = useState(0);
  const [tlSums, setTlSums] = useState(TL_SUMS_DEFAULT);
  const [copyText, setCopyText] = useState("Copy");

  const score = Object.values(scoreMap).reduce((a, b) => a + b, 0);

  const markScore = useCallback((key: string, pts: number) => {
    setScoreMap((prev) => (prev[key] ? prev : { ...prev, [key]: pts }));
  }, []);

  const goStep = (n: number) => {
    setStep(n);
    window.scrollTo(0, 0);
  };

  /* AI Extraction simulation */
  const startExtraction = () => {
    markScore("cv", 5);
    goStep(2);
    const labels = ["Work experience & roles", "Skills & technologies", "Education & qualifications", "Achievements & metrics", "Writing a profile summary"];
    const pcts = [20, 40, 60, 80, 100];
    labels.forEach((_, i) => {
      setTimeout(() => {
        setExDone((prev) => { const n = [...prev]; n[i] = true; return n; });
        setExPct(pcts[i]);
        if (i === labels.length - 1) setTimeout(() => goStep(3), 600);
      }, 700 * (i + 1));
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) { setFileName(f.name); setFileSize(Math.round(f.size / 1024) + " KB"); }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = (ev) => { setAvatarUrl(ev.target?.result as string); markScore("photo", 15); };
    r.readAsDataURL(f);
  };

  const addTarget = () => {
    const v = targetInput.trim();
    if (!v || targets.length >= 5) return;
    setTargets([...targets, v]);
    setTargetInput("");
  };

  const toggleSkill = (s: string) => {
    setSelectedSkills((prev) => {
      const next = new Set(prev);
      next.has(s) ? next.delete(s) : next.add(s);
      return next;
    });
  };

  const addSkill = () => {
    const v = skillInput.trim();
    if (!v) return;
    setCustomSkills([...customSkills, v]);
    setSelectedSkills((prev) => new Set(prev).add(v));
    setSkillInput("");
  };

  const updateEdu = (idx: number, field: keyof Edu, value: string) => {
    setEduList((prev) => prev.map((e, i) => (i === idx ? { ...e, [field]: value } : e)));
  };

  const removeEdu = (idx: number) => setEduList((prev) => prev.filter((_, i) => i !== idx));

  const addEdu = () => setEduList([...eduList, { degree: "", field: "", institution: "", year: "" }]);

  const progressPct = Math.round((step / 7) * 100);
  const allSkills = [...AI_SKILLS, ...customSkills];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg-alt)" }}>
      {/* NAV */}
      <nav className="ps-topnav">
        <div className="ps-topnav-inner">
          <Link href="/" className="ps-topnav-logo">Foundry<sup>IN</sup></Link>
          <div className="ps-step-labels">
            {STEP_NAMES.map((name, i) => (
              <span key={name}>
                {i > 0 && <span className="ps-step-sep" />}
                <span className={`ps-step-lbl${i + 1 === step ? " active" : ""}${i + 1 < step ? " done" : ""}`}>
                  <span className="ps-step-lbl-dot" />{name}
                </span>
              </span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, marginLeft: "auto" }}>
            <button onClick={() => goStep(7)} style={{ background: "none", border: "1.5px solid var(--border)", borderRadius: "var(--r-md)", padding: "7px 16px", fontFamily: "var(--font)", fontSize: 13, color: "var(--t-muted)", cursor: "pointer" }}>Skip setup</button>
            <Link href="/talent/dashboard" style={{ fontSize: 13, fontWeight: 500, color: "var(--blue)" }}>Dashboard →</Link>
          </div>
        </div>
      </nav>
      <div className="ps-progress-wrap"><div className="ps-progress-fill" style={{ width: `${progressPct}%` }} /></div>

      <div className="ps-shell">
        {/* SIDEBAR */}
        <div className="ps-sidebar">
          <div className="ps-cc">
            <div className="ps-cc-top"><span className="ps-cc-label">Profile Score</span><span className={`ps-cc-pct${score >= 80 ? " complete" : ""}`}>{Math.min(100, score)}%</span></div>
            <div className="ps-cc-track"><div className="ps-cc-fill" style={{ width: `${Math.min(100, score)}%` }} /></div>
            <div className="ps-cc-items">
              {[
                { id: "photo", label: "Profile photo", pts: 15 },
                { id: "cv", label: "CV uploaded", pts: 5 },
                { id: "basics", label: "Basic details", pts: 20 },
                { id: "exp", label: "Experience & targets", pts: 20 },
                { id: "skills", label: "Skills confirmed", pts: 20 },
                { id: "edu", label: "Education & intro", pts: 20 },
              ].map((item) => (
                <div className={`ps-cc-item${scoreMap[item.id] ? " done" : ""}`} key={item.id}>
                  <div className="ps-cc-item-check">✓</div>
                  <span>{item.label}</span>
                  <span className="ps-cc-pts">+{item.pts}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="ps-tl">
            <div className="ps-tl-head">Setup steps</div>
            <div className="ps-tl-sub">~2 mins. AI does the heavy lifting.</div>
            <div className="ps-tl-steps">
              {TL_NAMES.map((name, i) => (
                <div key={i} className={`ps-tl-step${i + 1 === step ? " active" : ""}${i + 1 < step ? " done" : ""}`}>
                  <div className="ps-tl-bullet" />
                  <div>
                    <div className="ps-tl-step-name">{name}</div>
                    <div className="ps-tl-step-sum">{tlSums[i]}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MAIN */}
        <div className="ps-main">

          {/* STEP 1 */}
          {step === 1 && (
            <div className="ps-panel" key="s1">
              <span className="ps-step-label">Step 1 of 6</span>
              <h2 className="ps-title">Start with your CV.</h2>
              <p className="ps-sub">Upload your CV and our AI will extract your experience, skills, and education automatically — saving you 10 minutes of typing.</p>
              {!fileName ? (
                <div className="ps-upload-zone">
                  <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
                  <span className="ps-uz-icon">📄</span>
                  <div className="ps-uz-title">Drop your CV here</div>
                  <div className="ps-uz-sub">or click to browse your files</div>
                  <div className="ps-uz-formats">PDF, DOC or DOCX · Max 10MB</div>
                </div>
              ) : (
                <div className="ps-file-picked">
                  <span className="ps-fp-icon">📄</span>
                  <div><div className="ps-fp-name">{fileName}</div><div className="ps-fp-size">{fileSize}</div></div>
                  <button className="ps-fp-remove" onClick={() => setFileName(null)}>✕ Remove</button>
                </div>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
                <span style={{ fontSize: 12, color: "var(--t-faint)" }}>don&rsquo;t have it handy?</span>
                <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
              </div>
              <button style={{ width: "100%", padding: 12, border: "1.5px solid var(--border)", borderRadius: "var(--r-md)", fontFamily: "var(--font)", fontSize: 14, fontWeight: 500, color: "var(--t-body)", background: "var(--bg)", cursor: "pointer" }} onClick={() => goStep(3)}>Fill in manually instead →</button>
              <div className="ps-actions"><span /><button className="ps-btn-continue" disabled={!fileName} onClick={startExtraction}>Extract with AI →</button></div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="ps-panel" key="s2">
              <div className="ps-extraction">
                <div className="ps-ai-orb">🤖</div>
                <div className="ps-ex-title">Reading your CV...</div>
                <div className="ps-ex-sub">This takes about 5 seconds</div>
                <div className="ps-ex-items">
                  {["Work experience & roles", "Skills & technologies", "Education & qualifications", "Achievements & metrics", "Writing a profile summary"].map((label, i) => (
                    <div className={`ps-ex-item${exDone[i] ? " done" : ""}`} key={i}>
                      <div className="ps-ex-check">✓</div><span>{label}</span>
                    </div>
                  ))}
                </div>
                <div className="ps-ex-progress"><div className="ps-ex-progress-fill" style={{ width: `${exPct}%` }} /></div>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="ps-panel" key="s3">
              <span className="ps-step-label">Step 2 of 6 · Basics</span>
              <h2 className="ps-title">Let&rsquo;s confirm your details.</h2>
              <p className="ps-sub">These were extracted from your CV. Edit anything that needs fixing.</p>
              <div className="ps-avatar-row">
                <div className="ps-avatar-circle">
                  {avatarUrl ? <img src={avatarUrl} alt="avatar" /> : <span>{firstName[0] || "R"}</span>}
                  <input type="file" accept="image/*" onChange={handleAvatarChange} />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "var(--t-primary)", marginBottom: 4 }}>Profile Photo</div>
                  <div style={{ fontSize: 13, color: "var(--t-muted)", lineHeight: 1.5 }}>Helps startups put a face to your name. JPG or PNG.</div>
                  {avatarUrl && <button onClick={() => setAvatarUrl(null)} style={{ fontSize: 12, color: "var(--red)", background: "none", border: "none", cursor: "pointer", marginTop: 4 }}>✕ Remove photo</button>}
                </div>
              </div>
              <div className="ps-ai-note"><span>✦</span><div><strong>AI pre-filled these fields.</strong> Fields with a blue border were extracted from your CV.</div></div>
              <div className="ps-form-grid">
                <div className="ps-field"><label className="ds-label">First Name</label><input className="ds-input ai-filled" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} /></div>
                <div className="ps-field"><label className="ds-label">Last Name</label><input className="ds-input ai-filled" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} /></div>
                <div className="ps-field"><label className="ds-label">City</label><input className="ds-input ai-filled" type="text" value={city} onChange={(e) => setCity(e.target.value)} /></div>
                <div className="ps-field"><label className="ds-label">Phone</label><input className="ds-input ai-filled" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
                <div className="ps-field span-2">
                  <label className="ds-label">Professional Headline <span style={{ fontSize: 11, color: "var(--blue)", fontWeight: 500, background: "var(--blue-tint)", padding: "2px 7px", borderRadius: "var(--r-pill)" }}>✦ AI</span></label>
                  <input className="ds-input ai-filled" type="text" value={headline} onChange={(e) => setHeadline(e.target.value)} />
                  <div className="ps-field-hint">One line that summarises who you are. Shown on your public profile.</div>
                </div>
              </div>
              <div className="ps-actions">
                <button className="ps-btn-back" onClick={() => goStep(1)}>← Back</button>
                <button className="ps-btn-continue" onClick={() => { markScore("basics", 20); setTlSums((p) => { const n = [...p]; n[2] = "Done"; return n; }); goStep(4); }}>Looks good →</button>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="ps-panel" key="s4">
              <span className="ps-step-label">Step 3 of 6 · Experience</span>
              <h2 className="ps-title">Where are you in your career?</h2>
              <p className="ps-sub">Tell us your experience level and the kinds of roles you&rsquo;re looking for.</p>
              <div className="ps-form-grid" style={{ marginBottom: 24 }}>
                <div className="ps-field"><label className="ds-label">Current / Last Role</label><input className="ds-input ai-filled" type="text" value={currentRole} onChange={(e) => setCurrentRole(e.target.value)} /></div>
                <div className="ps-field"><label className="ds-label">Current / Last Company</label><input className="ds-input ai-filled" type="text" value={currentCompany} onChange={(e) => setCurrentCompany(e.target.value)} /></div>
              </div>
              <div style={{ marginBottom: 28 }}>
                <label className="ds-label" style={{ marginBottom: 14, display: "block" }}>Total Years of Experience</label>
                <div className="ps-exp-val"><span>{experience === 20 ? "20+" : experience}</span><sub> years</sub></div>
                <input type="range" className="ps-exp-slider" min={0} max={20} value={experience} onChange={(e) => setExperience(+e.target.value)} />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--t-faint)", marginTop: 6 }}><span>0</span><span>5 yrs</span><span>10 yrs</span><span>15 yrs</span><span>20+</span></div>
              </div>
              <div>
                <label className="ds-label" style={{ marginBottom: 6, display: "block" }}>Target Roles <span style={{ fontSize: 12, fontWeight: 400, color: "var(--t-muted)" }}>— add up to 5</span></label>
                <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                  <input className="ds-input" type="text" placeholder="e.g. Product Manager, Growth Lead…" style={{ flex: 1 }} value={targetInput} onChange={(e) => setTargetInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addTarget()} />
                  <button onClick={addTarget} style={{ padding: "0 18px", background: "var(--blue)", color: "#fff", border: "none", borderRadius: "var(--r-md)", fontFamily: "var(--font)", fontSize: 14, fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap" }}>+ Add</button>
                </div>
                <div className="ps-target-list">
                  {targets.map((t, i) => (
                    <div className="ps-target-pill" key={i}>
                      <span className="ps-tp-name">{t}</span>
                      <button className="ps-tp-remove" onClick={() => setTargets(targets.filter((_, j) => j !== i))}>✕</button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="ps-actions">
                <button className="ps-btn-back" onClick={() => goStep(3)}>← Back</button>
                <button className="ps-btn-continue" onClick={() => { markScore("exp", 20); setTlSums((p) => { const n = [...p]; n[3] = "Done"; return n; }); goStep(5); }}>Continue →</button>
              </div>
            </div>
          )}

          {/* STEP 5 */}
          {step === 5 && (
            <div className="ps-panel" key="s5">
              <span className="ps-step-label">Step 4 of 6 · Skills</span>
              <h2 className="ps-title">Confirm your skills.</h2>
              <p className="ps-sub">These were extracted from your CV. Tap to deselect skills that aren&rsquo;t relevant, or add new ones.</p>
              <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 12, background: "var(--blue-tint)", color: "var(--blue)", padding: "3px 10px", borderRadius: "var(--r-pill)" }}>✦ AI-extracted</span>
                <span style={{ fontSize: 12, background: "var(--bg-ter)", color: "var(--t-body)", padding: "3px 10px", borderRadius: "var(--r-pill)" }}>Manually added</span>
              </div>
              <div className="ps-skills-cloud">
                {allSkills.map((s) => (
                  <span key={s} className={`ps-skill-chip${selectedSkills.has(s) ? " selected" : ""}${AI_SKILLS.includes(s) ? " ai" : ""}`} onClick={() => toggleSkill(s)}>{s}</span>
                ))}
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <input className="ds-input" type="text" placeholder="Add a skill…" style={{ flex: 1 }} value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addSkill()} />
                <button onClick={addSkill} style={{ padding: "0 18px", background: "var(--blue)", color: "#fff", border: "none", borderRadius: "var(--r-md)", fontFamily: "var(--font)", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>+ Add</button>
              </div>
              <div className="ps-actions">
                <button className="ps-btn-back" onClick={() => goStep(4)}>← Back</button>
                <button className="ps-btn-continue" onClick={() => { markScore("skills", 20); setTlSums((p) => { const n = [...p]; n[4] = `${selectedSkills.size} skills confirmed`; return n; }); goStep(6); }}>Continue →</button>
              </div>
            </div>
          )}

          {/* STEP 6 */}
          {step === 6 && (
            <div className="ps-panel" key="s6">
              <span className="ps-step-label">Step 5 of 6 · Education & Intro</span>
              <h2 className="ps-title">Education & intro.</h2>
              <p className="ps-sub">We extracted your education from your CV. Add or edit entries below, then write a short intro.</p>
              {eduList.map((edu, idx) => (
                <div className="ps-edu-card" key={idx}>
                  <div className="ps-edu-card-head">
                    <span className="ps-edu-card-title">{edu.degree ? `🎓 ${edu.degree} — ${edu.institution}` : "📚 New Qualification"}</span>
                    <button className="ps-edu-card-remove" onClick={() => removeEdu(idx)}>Remove</button>
                  </div>
                  <div className="ps-form-grid">
                    <div className="ps-field"><label className="ds-label">Degree</label><input className="ds-input ai-filled" type="text" value={edu.degree} onChange={(e) => updateEdu(idx, "degree", e.target.value)} /></div>
                    <div className="ps-field"><label className="ds-label">Field of Study</label><input className="ds-input ai-filled" type="text" value={edu.field} onChange={(e) => updateEdu(idx, "field", e.target.value)} /></div>
                    <div className="ps-field"><label className="ds-label">Institution</label><input className="ds-input ai-filled" type="text" value={edu.institution} onChange={(e) => updateEdu(idx, "institution", e.target.value)} /></div>
                    <div className="ps-field"><label className="ds-label">Year</label><input className="ds-input ai-filled" type="text" value={edu.year} onChange={(e) => updateEdu(idx, "year", e.target.value)} /></div>
                  </div>
                </div>
              ))}
              <button onClick={addEdu} style={{ fontSize: 13, color: "var(--blue)", background: "none", border: "1.5px dashed var(--border)", borderRadius: "var(--r-md)", padding: "10px 20px", width: "100%", cursor: "pointer", fontFamily: "var(--font)", marginBottom: 24 }}>+ Add another qualification</button>
              <div className="ps-field">
                <label className="ds-label">Short Introduction <span style={{ fontSize: 11, color: "var(--blue)", fontWeight: 500, background: "var(--blue-tint)", padding: "2px 7px", borderRadius: "var(--r-pill)" }}>✦ AI-written</span></label>
                <textarea className="ds-input" rows={4} style={{ height: "auto", padding: "12px 14px", resize: "vertical", lineHeight: 1.65 }} value={bio} onChange={(e) => setBio(e.target.value)} />
                <div className={`ps-char-counter${bio.length > 350 ? " warn" : ""}`}>{bio.length} / 400</div>
              </div>
              <div className="ps-actions">
                <button className="ps-btn-back" onClick={() => goStep(5)}>← Back</button>
                <button className="ps-btn-continue" onClick={() => { markScore("edu", 20); goStep(7); }}>Continue →</button>
              </div>
            </div>
          )}

          {/* STEP 7 */}
          {step === 7 && (
            <div className="ps-panel" key="s7">
              <span className="ps-step-label">Step 6 of 6 · Preview</span>
              <h2 className="ps-title">Your profile is ready.</h2>
              <p className="ps-sub" style={{ marginBottom: 24 }}>Here&rsquo;s how it looks to startups and recruiters on Foundry.</p>
              <div className="ps-complete-banner">
                <span className="ps-cb-icon">🎉</span>
                <div style={{ flex: 1 }}>
                  <div className="ps-cb-title">Profile live — you&rsquo;re discoverable</div>
                  <div className="ps-cb-sub">Startups can now find and reach out to you. 47 roles match your profile right now.</div>
                  <div className="ps-cb-link-row">
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>Your public link:</span>
                    <code style={{ fontSize: 12, color: "rgba(255,255,255,0.85)", background: "rgba(255,255,255,0.12)", padding: "3px 10px", borderRadius: "var(--r-sm)" }}>foundry.in/u/{firstName.toLowerCase()}-{lastName.toLowerCase()}</code>
                    <button onClick={(e) => { navigator.clipboard.writeText(`https://foundry.in/u/${firstName.toLowerCase()}-${lastName.toLowerCase()}`).catch(() => {}); setCopyText("Copied ✓"); setTimeout(() => setCopyText("Copy"), 2000); }} style={{ fontSize: 12, padding: "4px 12px", borderRadius: "var(--r-sm)", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", cursor: "pointer", fontFamily: "var(--font)" }}>{copyText}</button>
                    <Link href={`/u/${firstName.toLowerCase()}-${lastName.toLowerCase()}`} style={{ fontSize: 12, padding: "4px 12px", borderRadius: "var(--r-sm)", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff" }}>Preview ↗</Link>
                  </div>
                </div>
              </div>
              <div className="ps-preview-card">
                <div className="ps-preview-banner" />
                <div className="ps-preview-body">
                  <div className="ps-preview-identity">
                    <div className="ps-preview-avatar">{avatarUrl ? <img src={avatarUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} /> : (firstName[0] || "R")}</div>
                    <div>
                      <div className="ps-preview-name">{firstName} {lastName}</div>
                      <div className="ps-preview-headline">{headline}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: 14, color: "var(--t-muted)", lineHeight: 1.65, marginBottom: 14 }}>{bio.substring(0, 120)}...</p>
                  <div className="ps-preview-skills">
                    {[...selectedSkills].slice(0, 8).map((s) => (
                      <span className="ps-preview-chip" key={s}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                <Link href="/roles" className="ps-btn-continue" style={{ textDecoration: "none", flex: 1, justifyContent: "center" }}>Browse Jobs →</Link>
                <Link href="/talent/dashboard" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", border: "1.5px solid var(--border)", borderRadius: "var(--r-md)", fontSize: 14, fontWeight: 500, color: "var(--t-body)", textDecoration: "none" }}>Go to Dashboard</Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
