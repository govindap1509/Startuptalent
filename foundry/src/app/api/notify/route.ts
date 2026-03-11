import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { to, subject, type, data } = body;

    if (!to || !type) {
      return NextResponse.json({ error: "to and type are required" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      // In development, just log and return success
      console.log(`[notify] Would send ${type} email to ${to}:`, { subject, data });
      return NextResponse.json({ success: true, message: "Notification logged (no API key)" });
    }

    const templates: Record<string, { subject: string; html: string }> = {
      application_received: {
        subject: subject || `New application for ${data?.role || "your role"}`,
        html: `
          <div style="font-family:'DM Sans',sans-serif;max-width:560px;margin:0 auto;padding:32px;">
            <h2 style="color:#202124;font-size:20px;margin-bottom:8px;">New application received</h2>
            <p style="color:#3C4043;font-size:14px;line-height:1.7;">
              <strong>${data?.applicant || "A candidate"}</strong> has applied for
              <strong>${data?.role || "a role"}</strong> at <strong>${data?.company || "your company"}</strong>.
            </p>
            <p style="color:#5F6368;font-size:13px;">Match score: <strong>${data?.match || "—"}%</strong></p>
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}/startup/portal" style="display:inline-block;margin-top:16px;background:#1A73E8;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-size:13px;font-weight:500;">Review application →</a>
          </div>
        `,
      },
      application_status: {
        subject: subject || `Update on your application`,
        html: `
          <div style="font-family:'DM Sans',sans-serif;max-width:560px;margin:0 auto;padding:32px;">
            <h2 style="color:#202124;font-size:20px;margin-bottom:8px;">Application update</h2>
            <p style="color:#3C4043;font-size:14px;line-height:1.7;">
              Your application for <strong>${data?.role || "a role"}</strong> at
              <strong>${data?.company || "a company"}</strong> has moved to
              <strong>${data?.status || "the next stage"}</strong>.
            </p>
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}/talent/dashboard" style="display:inline-block;margin-top:16px;background:#1A73E8;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-size:13px;font-weight:500;">View in dashboard →</a>
          </div>
        `,
      },
      new_message: {
        subject: subject || `New message on Foundry`,
        html: `
          <div style="font-family:'DM Sans',sans-serif;max-width:560px;margin:0 auto;padding:32px;">
            <h2 style="color:#202124;font-size:20px;margin-bottom:8px;">You have a new message</h2>
            <p style="color:#3C4043;font-size:14px;line-height:1.7;">
              <strong>${data?.from || "Someone"}</strong> sent you a message on Foundry.
            </p>
            <div style="background:#F8F9FA;border:1px solid #E8EAED;border-radius:8px;padding:14px;margin:16px 0;">
              <p style="color:#3C4043;font-size:13px;line-height:1.6;margin:0;">${data?.preview || ""}</p>
            </div>
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}/talent/dashboard" style="display:inline-block;margin-top:8px;background:#1A73E8;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-size:13px;font-weight:500;">Reply on Foundry →</a>
          </div>
        `,
      },
    };

    const template = templates[type];
    if (!template) {
      return NextResponse.json({ error: `Unknown notification type: ${type}` }, { status: 400 });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Foundry <notifications@foundry.in>",
        to: [to],
        subject: template.subject,
        html: template.html,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      return NextResponse.json({ error: "Failed to send email", details: err }, { status: 500 });
    }

    const result = await res.json();
    return NextResponse.json({ success: true, id: result.id });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
