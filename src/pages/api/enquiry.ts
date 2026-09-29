import type { APIRoute } from "astro";

// This is the only server-rendered route in the project (see astro.config.mjs).
// Everything else is prerendered to static HTML.
export const prerender = false;

interface EnquiryPayload {
  name: string;
  company: string;
  email: string;
  phone?: string;
  country?: string;
  division: string;
  product?: string;
  quantity?: string;
  message: string;
  /** Honeypot field — real users never fill this in. */
  website?: string;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export const POST: APIRoute = async ({ request }) => {
  let data: EnquiryPayload;
  try {
    data = await request.json();
  } catch {
    return json({ success: false, message: "Invalid request body." }, 400);
  }

  // Honeypot: bots fill every field, including ones hidden from real users.
  if (data.website) {
    return json({ success: true, message: "Thank you." }); // pretend success, drop silently
  }

  const required: (keyof EnquiryPayload)[] = ["name", "company", "email", "division", "message"];
  const missing = required.filter((field) => !data[field] || String(data[field]).trim() === "");
  if (missing.length > 0) {
    return json({ success: false, message: `Missing required fields: ${missing.join(", ")}` }, 400);
  }
  if (!isValidEmail(data.email)) {
    return json({ success: false, message: "Please provide a valid email address." }, 400);
  }

  const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
  const TO_EMAIL = import.meta.env.ENQUIRY_TO_EMAIL || "info@intignisindustries.com";
  const FROM_EMAIL = import.meta.env.ENQUIRY_FROM_EMAIL || "enquiries@intignisworld.com";

  if (!RESEND_API_KEY) {
    // Fails loudly in production so a missing env var is never silently swallowed.
    console.error("RESEND_API_KEY is not set — enquiry email was not sent.");
    return json(
      { success: false, message: "The enquiry service isn't configured yet. Please email us directly." },
      500
    );
  }

  const subject = `New enquiry — ${data.division} — ${data.company}`;
  const bodyLines = [
    `Name: ${data.name}`,
    `Company: ${data.company}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "—"}`,
    `Country: ${data.country || "—"}`,
    `Division: ${data.division}`,
    `Product: ${data.product || "General enquiry"}`,
    `Quantity: ${data.quantity || "—"}`,
    "",
    "Message:",
    data.message,
  ].join("\n");

  try {
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        reply_to: data.email,
        subject,
        text: bodyLines,
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      console.error("Resend API error:", resendRes.status, errText);
      return json({ success: false, message: "We couldn't send your enquiry. Please try again or email us directly." }, 502);
    }
  } catch (err) {
    console.error("Failed to reach Resend:", err);
    return json({ success: false, message: "We couldn't send your enquiry. Please try again or email us directly." }, 502);
  }

  return json({ success: true, message: "Thank you. Your enquiry has been sent." });
};

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
