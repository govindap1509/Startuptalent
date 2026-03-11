import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { talent_id, job_id } = body;

    if (!talent_id || !job_id) {
      return NextResponse.json({ error: "talent_id and job_id are required" }, { status: 400 });
    }

    const supabase = await createClient();

    // Fetch talent profile
    const { data: talent, error: tErr } = await supabase
      .from("talent_profiles")
      .select("skills, experience_years, preferred_roles, preferred_stage")
      .eq("id", talent_id)
      .single();

    if (tErr || !talent) {
      return NextResponse.json({ error: "Talent profile not found" }, { status: 404 });
    }

    // Fetch job
    const { data: job, error: jErr } = await supabase
      .from("jobs")
      .select("skills_required, title, description")
      .eq("id", job_id)
      .single();

    if (jErr || !job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // Calculate match score
    const talentSkills: string[] = talent.skills || [];
    const jobSkills: string[] = job.skills_required || [];

    const matched = talentSkills.filter((s: string) =>
      jobSkills.some((js: string) => js.toLowerCase() === s.toLowerCase())
    );

    const partial = talentSkills.filter((s: string) =>
      !matched.includes(s) &&
      jobSkills.some((js: string) =>
        js.toLowerCase().includes(s.toLowerCase()) ||
        s.toLowerCase().includes(js.toLowerCase())
      )
    );

    const skillScore = jobSkills.length > 0
      ? ((matched.length + partial.length * 0.5) / jobSkills.length) * 100
      : 0;

    const score = Math.min(99, Math.round(skillScore * 0.8 + 20)); // base 20 + skill weight

    return NextResponse.json({
      match_score: score,
      matched_skills: matched,
      partial_skills: partial,
      missing_skills: jobSkills.filter(
        (s: string) => !matched.some((m: string) => m.toLowerCase() === s.toLowerCase()) &&
          !partial.some((p: string) => p.toLowerCase() === s.toLowerCase())
      ),
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
