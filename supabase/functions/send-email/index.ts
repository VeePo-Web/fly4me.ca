import { buildHtmlEmail, buildConfirmationEmail, type EmailPayload } from "../_shared/email-templates.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const TO_EMAIL = "mitfordworship@gmail.com";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY not configured");
    }

    const payload: EmailPayload = await req.json();

    if (!payload.type) {
      return new Response(
        JSON.stringify({ error: "Missing 'type' field" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { html, subject } = buildHtmlEmail(payload);
    const replyTo = payload.email || undefined;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Worship in the Park <hello@mitfordworship.com>",
        to: [TO_EMAIL],
        subject,
        html,
        reply_to: replyTo,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Resend API error:", data);
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: data }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ── Auto-reply confirmation (best-effort) ──
    if (payload.email) {
      try {
        const confirmation = buildConfirmationEmail(payload);
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "Worship in the Park <hello@mitfordworship.com>",
            to: [payload.email],
            subject: confirmation.subject,
            html: confirmation.html,
            reply_to: "mitfordworship@gmail.com",
          }),
        });
      } catch (confirmErr) {
        console.error("Confirmation email failed (non-fatal):", confirmErr);
      }
    }

    return new Response(
      JSON.stringify({ success: true, id: data.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("send-email error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : String(error) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
