import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface Payload {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  project?: unknown;
}

function asString(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = (await req.json()) as Payload;

    const name = asString(body.name, 100);
    const email = asString(body.email, 255);
    const phone = asString(body.phone, 30);
    const project = asString(body.project, 2000);

    if (!name || !email || !project || !isEmail(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid input" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const resendKey = Deno.env.get("RESEND_API_KEY");

    const supabase = createClient(supabaseUrl, serviceKey);

    const { error: insertError } = await supabase
      .from("contact_submissions")
      .insert({
        name,
        email,
        phone: phone || null,
        project,
      });

    if (insertError) {
      console.error("[send-contact] insert failed", insertError);
    }

    // Email delivery via Resend
    if (resendKey) {
      const html = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif; color:#111; max-width:560px; margin:0 auto; padding:32px 24px;">
          <p style="font-size:11px; letter-spacing:0.2em; text-transform:uppercase; color:#888; margin:0 0 24px;">New enquiry · Fly4MEdia</p>
          <h1 style="font-size:22px; font-weight:500; margin:0 0 24px; line-height:1.3;">${escapeHtml(name)} wants to start a project.</h1>
          <table style="width:100%; border-collapse:collapse; font-size:14px; line-height:1.6;">
            <tr><td style="padding:8px 0; color:#888; width:90px;">Email</td><td style="padding:8px 0;"><a href="mailto:${escapeHtml(email)}" style="color:#111;">${escapeHtml(email)}</a></td></tr>
            ${phone ? `<tr><td style="padding:8px 0; color:#888;">Phone</td><td style="padding:8px 0;"><a href="tel:${escapeHtml(phone)}" style="color:#111;">${escapeHtml(phone)}</a></td></tr>` : ""}
          </table>
          <div style="margin-top:32px; padding-top:24px; border-top:1px solid #eee;">
            <p style="font-size:11px; letter-spacing:0.2em; text-transform:uppercase; color:#888; margin:0 0 12px;">Project</p>
            <p style="font-size:15px; line-height:1.65; white-space:pre-wrap; margin:0;">${escapeHtml(project)}</p>
          </div>
          <p style="margin-top:40px; font-size:12px; color:#888;">Reply directly to this email to respond.</p>
        </div>
      `;

      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Fly4MEdia <onboarding@resend.dev>",
          to: ["tobyrennick@gmail.com"],
          reply_to: email,
          subject: `New enquiry from ${name}`,
          html,
        }),
      });

      if (!resendRes.ok) {
        const text = await resendRes.text();
        console.error("[send-contact] resend failed", resendRes.status, text);
      }
    } else {
      console.warn("[send-contact] RESEND_API_KEY missing, skipping email");
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[send-contact] error", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
