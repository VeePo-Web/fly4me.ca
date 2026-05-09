// Branded HTML email template system for Worship in the Park
// All inline styles for maximum email client compatibility

const BRAND = {
  background: "#f5f3f0",
  primary: "#872d2d",
  primaryLight: "#d9a3a3",
  gold: "#d4a543",
  goldMuted: "#c4a060",
  text: "#2a2520",
  textMuted: "#6b6560",
  white: "#ffffff",
  border: "#e5ddd5",
  logoUrl: "https://worshipinthepark.lovable.app/favicon.png",
  website: "https://mitfordworship.com",
  serif: "Georgia, 'Times New Roman', Times, serif",
  sans: "Arial, Helvetica, sans-serif",
};

export function escapeHtml(str: string | undefined | null): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function nl2br(str: string): string {
  return escapeHtml(str).replace(/\n/g, "<br>");
}

export function emailWrapper(content: string, preheaderText: string): string {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="color-scheme" content="light" />
<meta name="supported-color-schemes" content="light" />
<title>Worship in the Park</title>
<!--[if mso]>
<style type="text/css">
body, table, td { font-family: Georgia, 'Times New Roman', Times, serif !important; }
</style>
<![endif]-->
</head>
<body style="margin:0;padding:0;background-color:${BRAND.background};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
<div style="display:none;font-size:1px;color:${BRAND.background};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
${escapeHtml(preheaderText)}${"&nbsp;&zwnj;".repeat(30)}
</div>
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:${BRAND.background};">
<tr><td style="padding:48px 16px;">
<table role="presentation" cellpadding="0" cellspacing="0" width="600" align="center" style="max-width:600px;width:100%;background-color:${BRAND.white};box-shadow:0 1px 4px rgba(42,37,32,0.06);">
${content}
</table>
</td></tr>
</table>
</body>
</html>`;
}

export function emailHeader(title: string, subtitle?: string): string {
  const subtitleHtml = subtitle
    ? `<tr><td style="padding:0 32px 0;text-align:center;font-family:${BRAND.sans};font-size:13px;color:${BRAND.textMuted};letter-spacing:0.3px;">${escapeHtml(subtitle)}</td></tr>`
    : "";
  return `
<tr><td style="padding:40px 32px 0;text-align:center;">
<img src="${BRAND.logoUrl}" width="72" height="90" alt="Worship in the Park" style="display:inline-block;width:72px;height:auto;border:0;" />
</td></tr>
<tr><td style="padding:20px 32px 0;text-align:center;font-family:${BRAND.serif};font-size:26px;font-weight:400;color:${BRAND.text};letter-spacing:-0.5px;line-height:1.25;">
${escapeHtml(title)}
</td></tr>
${subtitleHtml}
<tr><td style="padding:20px 32px 0;text-align:center;">
<div style="width:40px;height:2px;margin:0 auto;background:linear-gradient(90deg,${BRAND.gold},${BRAND.primaryLight});"></div>
  </td></tr>`;
}

export function eventDetailsBanner(): string {
  return `
<tr><td style="padding:20px 32px 0;text-align:center;font-family:${BRAND.sans};font-size:13px;color:${BRAND.text};letter-spacing:0.3px;line-height:1.5;">
August 8, 2026 &middot; 11 AM &ndash; 7 PM &middot; Mitford Park, Cochrane
</td></tr>
<tr><td style="padding:6px 32px 0;text-align:center;font-family:${BRAND.sans};font-size:12px;color:${BRAND.textMuted};letter-spacing:0.5px;text-transform:uppercase;line-height:1.4;">
No ticket &middot; No registration &middot; Just come
</td></tr>`;
}



export function emailFooter(reason: string): string {
  const year = new Date().getFullYear();
  return `
<tr><td style="padding:0;">
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:${BRAND.background};">
<tr><td style="padding:32px 32px;text-align:center;">
<p style="margin:0 0 6px;font-family:${BRAND.serif};font-size:14px;color:${BRAND.text};letter-spacing:0.2px;">Worship in the Park &mdash; Cochrane, Alberta</p>
<p style="margin:0 0 10px;"><a href="${BRAND.website}" style="font-family:${BRAND.sans};font-size:12px;color:${BRAND.gold};text-decoration:none;letter-spacing:0.3px;">mitfordworship.com</a></p>
<p style="margin:0 0 16px;font-family:${BRAND.sans};font-size:12px;color:${BRAND.textMuted};">Questions? Just reply &mdash; we read every message.</p>
<p style="margin:0;font-family:${BRAND.sans};font-size:11px;color:${BRAND.textMuted};line-height:1.5;">
You received this because ${escapeHtml(reason)}.<br/>
&copy; ${year} Worship in the Park
</p>
<p style="margin:12px 0 0;font-family:${BRAND.sans};font-size:9px;text-transform:uppercase;letter-spacing:1px;color:${BRAND.textMuted};line-height:1.4;"><a href="https://veepo.ca/services/web-development" target="_blank" style="color:${BRAND.textMuted};text-decoration:none;">This website is <span style="color:#e8863a;">powered</span> by <span style="color:#e8863a;">VeePo</span></a></p>
</td></tr>
</table>
</td></tr>`;
}

export function sectionDivider(): string {
  return `<tr><td style="padding:24px 32px;text-align:center;font-family:${BRAND.sans};font-size:14px;color:${BRAND.goldMuted};letter-spacing:8px;">&middot; &middot; &middot;</td></tr>`;
}

function labeledRow(label: string, value: string | undefined | null): string {
  if (!value) return "";
  return `
<tr><td style="padding:6px 32px;font-family:${BRAND.sans};font-size:13px;">
<span style="color:${BRAND.textMuted};text-transform:uppercase;letter-spacing:0.8px;font-size:11px;">${escapeHtml(label)}</span><br/>
<span style="color:${BRAND.text};line-height:1.6;">${escapeHtml(value)}</span>
</td></tr>`;
}

function sectionEyebrow(label: string): string {
  return `<tr><td style="padding:24px 32px 8px;font-family:${BRAND.sans};font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:${BRAND.gold};font-weight:700;">${escapeHtml(label)}</td></tr>`;
}

function messageBlock(message: string | undefined | null): string {
  if (!message) return "";
  return `
<tr><td style="padding:16px 32px 8px;">
<div style="font-family:${BRAND.serif};font-size:15px;color:${BRAND.text};line-height:1.7;border-left:3px solid ${BRAND.border};padding:12px 0 12px 20px;">
${nl2br(message)}
</div>
</td></tr>`;
}

function timestampRow(): string {
  const now = new Date();
  const formatted = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Edmonton",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(now);
  return `<tr><td style="padding:8px 32px;text-align:right;font-family:${BRAND.sans};font-size:11px;color:${BRAND.textMuted};">Submitted ${formatted} MST</td></tr>`;
}

function ctaButton(label: string, url: string): string {
  return `
<tr><td style="padding:28px 32px 0;text-align:center;">
<!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${url}" style="height:44px;v-text-anchor:middle;width:220px;" arcsize="9%" stroke="f" fillcolor="${BRAND.primary}">
<w:anchorlock/>
<center style="color:${BRAND.white};font-family:${BRAND.sans};font-size:12px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;">${escapeHtml(label)}</center>
</v:roundrect>
<![endif]-->
<!--[if !mso]><!-->
<a href="${url}" target="_blank" style="display:inline-block;background-color:${BRAND.primary};color:${BRAND.white};font-family:${BRAND.sans};font-size:12px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;text-decoration:none;padding:14px 32px;border-radius:4px;mso-hide:all;">
${escapeHtml(label)}
</a>
<!--<![endif]-->
</td></tr>`;
}

// ── Per-type body builders ─────────────────────────────────

export interface EmailPayload {
  type: string;
  name?: string;
  email?: string;
  message?: string;
  phone?: string;
  churchName?: string;
  contactName?: string;
  pastorName?: string;
  pastorEmail?: string;
  testimony?: string;
  fullName?: string;
  church?: string;
  experience?: string;
  prayerExperience?: string;
  preferredRole?: string;
  secondRole?: string;
  shifts?: string;
  whyVolunteer?: string;
  concerns?: string;
  emergencyName?: string;
  emergencyPhone?: string;
  // church-partner-signup
  partnerWays?: string[];
  quote?: string;
  quoteAttribution?: string;
  pastorPhotoUrl?: string;
  faithOptIn?: boolean;
  seekerContactName?: string;
  contactBio?: string;
  contactPhotoUrl?: string;
}

const TYPE_META: Record<string, { title: string; preheader: (p: EmailPayload) => string }> = {
  general:   { title: "New Inquiry",              preheader: (p) => `New inquiry from ${p.name || "someone"}` },
  prayer:    { title: "Prayer Request",           preheader: (p) => `Prayer request from ${p.name || "someone"}` },
  donate:    { title: "Donation Inquiry",         preheader: (p) => `Donation inquiry from ${p.name || "someone"}` },
  "church-partner": { title: "Church Partnership Inquiry", preheader: (p) => `Partnership inquiry — ${p.churchName || p.name || ""}` },
  "church-partner-page": { title: "Church Partnership Inquiry", preheader: (p) => `Partnership inquiry — ${p.churchName || ""}` },
  "church-partner-signup": { title: "Church Partnership Inquiry", preheader: (p) => `Partnership inquiry — ${p.churchName || ""}` },
  pastor:    { title: "",                         preheader: (p) => `Message for ${p.pastorName || "Church"} from ${p.name || "someone"}` },
  volunteer: { title: "Volunteer Application",    preheader: (p) => `Volunteer application from ${p.fullName || p.name || "someone"}` },
  testimony: { title: "Testimony",               preheader: (p) => `Testimony from ${p.name || "Anonymous"}` },
};

function buildContactBody(p: EmailPayload): string {
  return labeledRow("Name", p.name) +
    labeledRow("Email", p.email) +
    labeledRow("Phone", p.phone) +
    messageBlock(p.message);
}

function buildChurchPartnerBody(p: EmailPayload): string {
  return labeledRow("Church", p.churchName) +
    labeledRow("Contact", p.contactName || p.name) +
    labeledRow("Email", p.email) +
    messageBlock(p.message);
}

function buildPastorBody(p: EmailPayload): string {
  return labeledRow("From", p.name) +
    labeledRow("Email", p.email) +
    labeledRow("Phone", p.phone) +
    sectionDivider() +
    labeledRow("To Church", p.churchName || p.pastorName) +
    messageBlock(p.message);
}

function buildVolunteerBody(p: EmailPayload): string {
  return sectionEyebrow("About You") +
    labeledRow("Name", p.fullName || p.name) +
    labeledRow("Email", p.email) +
    labeledRow("Phone", p.phone) +
    sectionEyebrow("Church & Experience") +
    labeledRow("Church", p.church) +
    labeledRow("Experience", p.experience) +
    labeledRow("Prayer Ministry", p.prayerExperience) +
    sectionEyebrow("Role & Availability") +
    labeledRow("Preferred Role", p.preferredRole) +
    labeledRow("Second Choice", p.secondRole) +
    labeledRow("Shifts", p.shifts) +
    sectionEyebrow("Heart & Safety") +
    messageBlock(p.whyVolunteer) +
    labeledRow("Concerns", p.concerns) +
    labeledRow("Emergency Contact", p.emergencyName ? `${p.emergencyName} — ${p.emergencyPhone || "N/A"}` : undefined) +
    `<tr><td style="padding:16px 32px 4px;font-family:${BRAND.sans};font-size:12px;color:${BRAND.textMuted};font-style:italic;">Agreement to serve with unity, humility, and care: Yes</td></tr>`;
}

function buildTestimonyBody(p: EmailPayload): string {
  return labeledRow("From", p.name || "Anonymous") +
    `<tr><td style="padding:20px 32px 8px;">
<div style="font-family:${BRAND.serif};font-size:16px;color:${BRAND.text};line-height:1.8;font-style:italic;border-left:3px solid ${BRAND.gold};padding:16px 0 16px 24px;">
${nl2br(p.testimony || p.message || "")}
</div>
</td></tr>`;
}

function buildChurchPartnerSignupBody(p: EmailPayload): string {
  const ways = (p.partnerWays && p.partnerWays.length > 0)
    ? `<tr><td style="padding:8px 32px 4px;font-family:${BRAND.sans};font-size:13px;">
<span style="color:${BRAND.textMuted};text-transform:uppercase;letter-spacing:0.8px;font-size:11px;">Ways to Partner</span>
<ul style="margin:8px 0 0;padding:0 0 0 20px;color:${BRAND.text};line-height:1.7;">
${p.partnerWays.map((w) => `<li>${escapeHtml(w)}</li>`).join("")}
</ul>
</td></tr>`
    : "";

  const pastorPhoto = p.pastorPhotoUrl
    ? `<tr><td style="padding:6px 32px;font-family:${BRAND.sans};font-size:13px;">
<span style="color:${BRAND.textMuted};text-transform:uppercase;letter-spacing:0.8px;font-size:11px;">Pastor Photo</span><br/>
<a href="${p.pastorPhotoUrl}" target="_blank" style="color:${BRAND.gold};word-break:break-all;">${escapeHtml(p.pastorPhotoUrl)}</a>
</td></tr>`
    : "";

  const featureBlock = (p.pastorName || p.quote || p.pastorPhotoUrl)
    ? sectionEyebrow("Church Partners Page") +
      labeledRow("Pastor Name", p.pastorName) +
      pastorPhoto +
      (p.quote ? messageBlock(p.quote) : "") +
      labeledRow("Quote Attribution", p.quoteAttribution)
    : "";

  const contactPhoto = p.contactPhotoUrl
    ? `<tr><td style="padding:6px 32px;font-family:${BRAND.sans};font-size:13px;">
<span style="color:${BRAND.textMuted};text-transform:uppercase;letter-spacing:0.8px;font-size:11px;">Contact Photo</span><br/>
<a href="${p.contactPhotoUrl}" target="_blank" style="color:${BRAND.gold};word-break:break-all;">${escapeHtml(p.contactPhotoUrl)}</a>
</td></tr>`
    : "";

  const faithBlock = p.faithOptIn
    ? sectionEyebrow("Faith Opt-In") +
      `<tr><td style="padding:6px 32px;font-family:${BRAND.sans};font-size:13px;color:${BRAND.text};">Open to having their contact info published on mitfordworship.com for people new to faith.</td></tr>` +
      labeledRow("Seeker Contact", p.seekerContactName) +
      labeledRow("Bio", p.contactBio) +
      contactPhoto
    : "";

  return sectionEyebrow("Church & Contact") +
    labeledRow("Church", p.churchName) +
    labeledRow("Contact", p.contactName || p.name) +
    labeledRow("Email", p.email) +
    labeledRow("Phone", p.phone) +
    ways +
    featureBlock +
    faithBlock +
    (p.message ? sectionEyebrow("Anything Else") + messageBlock(p.message) : "");
}

export function buildHtmlEmail(p: EmailPayload): { html: string; subject: string } {
  const meta = TYPE_META[p.type] || { title: "Form Submission", preheader: () => "New form submission" };
  const title = p.type === "pastor" ? `Message for ${p.pastorName || p.churchName || "Church"}` : meta.title;
  const preheader = meta.preheader(p);

  let body: string;
  switch (p.type) {
    case "general":
    case "prayer":
    case "donate":
      body = buildContactBody(p);
      break;
    case "church-partner":
    case "church-partner-page":
      body = buildChurchPartnerBody(p);
      break;
    case "church-partner-signup":
      body = buildChurchPartnerSignupBody(p);
      break;
    case "pastor":
      body = buildPastorBody(p);
      break;
    case "volunteer":
      body = buildVolunteerBody(p);
      break;
    case "testimony":
      body = buildTestimonyBody(p);
      break;
    default:
      body = buildContactBody(p);
  }

  // Timestamp for admin traceability
  body += timestampRow();

  // "Be in the Word" CTA
  body += ctaButton("Be in the Word", "https://www.bible.com/bible/1588/2CH.7.AMP");
  body += `<tr><td style="padding:8px 32px 0;text-align:center;font-family:${BRAND.sans};font-size:11px;color:${BRAND.textMuted};letter-spacing:0.3px;">Sends you to Bible.com</td></tr>`;

  // Bottom spacer before footer
  body += `<tr><td style="padding:24px 0 0;"></td></tr>`;

  const subject = buildSubject(p);
  const html = emailWrapper(
    emailHeader(title) + eventDetailsBanner() + body + emailFooter("a form was submitted on mitfordworship.com"),
    preheader
  );

  return { html, subject };
}

function buildSubject(p: EmailPayload): string {
  switch (p.type) {
    case "general":
      return "General Inquiry — Worship in the Park";
    case "church-partner":
      return `Church Partnership Inquiry${p.churchName ? ` — ${p.churchName}` : ""}`;
    case "donate":
      return "Donation / Sponsorship Inquiry — Worship in the Park";
    case "prayer":
      return "Prayer Request — Worship in the Park";
    case "pastor":
      return `Message for ${p.pastorName || p.churchName || "Church"} — Worship in the Park`;
    case "volunteer":
      return `Volunteer Application — ${p.fullName || p.name || "Unknown"}`;
    case "testimony":
      return `Testimony — ${p.name || "Anonymous"}`;
    case "church-partner-page":
      return `Church Partnership Inquiry — ${p.churchName || "Unknown Church"}`;
    case "church-partner-signup":
      return `Church Partnership Inquiry — ${p.churchName || "Unknown Church"}`;
    default:
      return "Worship in the Park — Form Submission";
  }
}

// ── Confirmation / Auto-Reply Email ───────────────────────

const CONFIRM_COPY: Record<string, {
  title: string;
  thanks: (p: EmailPayload) => string;
  verse: string;
  reference: string;
}> = {
  general: {
    title: "We Received Your Message",
    thanks: () => "Thank you for reaching out to us. We read every message and will respond as soon as we can.",
    verse: "The Lord is near to all who call on him, to all who call on him in truth.",
    reference: "Psalm 145:18",
  },
  prayer: {
    title: "Your Prayer Has Been Received",
    thanks: () => "Thank you for trusting us with your prayer. Our team will be lifting this up in the days ahead.",
    verse: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.",
    reference: "Philippians 4:6",
  },
  donate: {
    title: "Thank You for Your Generosity",
    thanks: () => "We\u2019ve received your donation inquiry and will follow up shortly with next steps.",
    verse: "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.",
    reference: "2 Corinthians 9:7",
  },
  "church-partner": {
    title: "Partnership Inquiry Received",
    thanks: () => "Thank you for your church\u2019s interest in partnering with Worship in the Park. We\u2019ll be in touch soon.",
    verse: "How good and pleasant it is when God\u2019s people live together in unity!",
    reference: "Psalm 133:1",
  },
  "church-partner-page": {
    title: "Partnership Inquiry Received",
    thanks: () => "Thank you for your church\u2019s interest in partnering with Worship in the Park. We\u2019ll be in touch soon.",
    verse: "How good and pleasant it is when God\u2019s people live together in unity!",
    reference: "Psalm 133:1",
  },
  "church-partner-signup": {
    title: "Partnership Inquiry Received",
    thanks: () => "Thank you for your church\u2019s interest in partnering with Worship in the Park. We\u2019ll be in touch soon.",
    verse: "How good and pleasant it is when God\u2019s people live together in unity!",
    reference: "Psalm 133:1",
  },
  pastor: {
    title: "Your Message Has Been Sent",
    thanks: (p) => `Your message to ${escapeHtml(p.pastorName || p.churchName) || "the church"} has been delivered. They\u2019ll respond to you directly.`,
    verse: "Cast all your anxiety on him because he cares for you.",
    reference: "1 Peter 5:7",
  },
  volunteer: {
    title: "Application Received",
    thanks: () => "Thank you for offering to serve at Worship in the Park. We review each application carefully to place volunteers where they\u2019ll thrive, and we\u2019ll be in touch soon.",
    verse: "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.",
    reference: "Colossians 3:23",
  },
  testimony: {
    title: "Thank You for Sharing",
    thanks: () => "Your story matters. Thank you for sharing what God has done in your life.",
    verse: "They triumphed over him by the blood of the Lamb and by the word of their testimony.",
    reference: "Revelation 12:11",
  },
};

function confirmationBody(p: EmailPayload): string {
  const copy = CONFIRM_COPY[p.type] || CONFIRM_COPY.general;
  const name = p.fullName || p.name || "Friend";

  return `
<tr><td style="padding:28px 32px 0;font-family:${BRAND.serif};font-size:17px;color:${BRAND.text};line-height:1.6;">
Dear ${escapeHtml(name)},
</td></tr>
<tr><td style="padding:16px 32px 0;font-family:${BRAND.sans};font-size:15px;color:${BRAND.text};line-height:1.7;">
${copy.thanks(p)}
</td></tr>
<tr><td style="padding:28px 32px 0;">
<div style="border-left:3px solid ${BRAND.gold};padding:16px 0 16px 24px;font-family:${BRAND.serif};font-size:15px;font-style:italic;color:${BRAND.text};line-height:1.7;">
&ldquo;${escapeHtml(copy.verse)}&rdquo;
<br/><span style="font-style:normal;font-size:12px;color:${BRAND.textMuted};letter-spacing:0.5px;">&mdash; ${escapeHtml(copy.reference)}</span>
</div>
</td></tr>
<tr><td style="padding:32px 32px 0;font-family:${BRAND.serif};font-size:15px;color:${BRAND.text};line-height:1.6;">
With gratitude,<br/>
<span style="color:${BRAND.textMuted};">The Worship in the Park Team</span>
</td></tr>
${ctaButton("Be in the Word", "https://www.bible.com/bible/1588/2CH.7.AMP")}
<tr><td style="padding:8px 32px 0;text-align:center;font-family:${BRAND.sans};font-size:11px;color:${BRAND.textMuted};letter-spacing:0.3px;">Sends you to Bible.com</td></tr>
<tr><td style="padding:24px 0 0;"></td></tr>`;
}

export function buildConfirmationEmail(p: EmailPayload): { html: string; subject: string } {
  const copy = CONFIRM_COPY[p.type] || CONFIRM_COPY.general;
  const subject = `${copy.title} — Worship in the Park`;
  const html = emailWrapper(
    emailHeader(copy.title, "Worship in the Park — Cochrane, Alberta") +
    eventDetailsBanner() +
    confirmationBody(p) +
    emailFooter("you submitted a form on mitfordworship.com"),
    copy.title
  );
  return { html, subject };
}
