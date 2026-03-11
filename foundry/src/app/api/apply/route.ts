import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { job_id, email, availability, note } = body;

    if (!job_id || !email) {
      return NextResponse.json({ error: "job_id and email are required" }, { status: 400 });
    }

    const supabase = await createClient();

    // Get authenticated user (if any)
    const { data: { user } } = await supabase.auth.getUser();

    // Check if job exists
    const { data: job, error: jobErr } = await supabase
      .from("jobs")
      .select("id, title, company_id")
      .eq("id", job_id)
      .single();

    if (jobErr || !job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // Check for duplicate application
    if (user) {
      const { data: existing } = await supabase
        .from("applications")
        .select("id")
        .eq("job_id", job_id)
        .eq("talent_id", user.id)
        .single();

      if (existing) {
        return NextResponse.json({ error: "You have already applied to this role" }, { status: 409 });
      }
    }

    // Create application
    const { data: application, error: appErr } = await supabase
      .from("applications")
      .insert({
        job_id,
        talent_id: user?.id || null,
        status: "applied",
        note: note || null,
      })
      .select()
      .single();

    if (appErr) {
      return NextResponse.json({ error: "Failed to create application" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      application_id: application.id,
      message: `Application submitted for ${job.title}`,
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
