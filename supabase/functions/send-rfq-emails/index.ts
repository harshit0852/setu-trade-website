import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface EnquiryPayload {
  enquiryId: string;
  fullName: string;
  company: string;
  country: string;
  city: string | null;
  email: string;
  phoneWhatsapp: string;
  buyerType: string;
  product: string;
  varietyGrade: string | null;
  quantity: number | null;
  unit: string | null;
  packaging: string | null;
  destination: string;
  deliveryDate: string | null;
  specifications: string | null;
  additionalMessage: string | null;
  incoterm: string | null;
  paymentTerms: string | null;
  createdAt: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function safe(value: string | null | undefined): string {
  return escapeHtml(value && value.trim() ? value : "—");
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function buildBuyerEmailHtml(e: EnquiryPayload): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f6f6f5;font-family:Inter,system-ui,-apple-system,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f6f6f5;padding:24px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 2px rgba(16,16,14,0.04),0 4px 16px rgba(16,16,14,0.06);">
        <tr><td style="background-color:#234e28;padding:32px 40px;">
          <p style="margin:0;font-size:20px;font-weight:800;color:#ffffff;letter-spacing:-0.02em;">Setu Trade</p>
          <p style="margin:4px 0 0;font-size:13px;color:#bbd8bc;">Export &amp; Trade</p>
        </td></tr>
        <tr><td style="padding:32px 40px;">
          <h1 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#1a1a18;">Thank you for your enquiry</h1>
          <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#474640;">Dear ${safe(e.fullName)},</p>
          <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#474640;">We have received your Request for Quote and our team will review your requirements. Here is a summary of your enquiry:</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e7e7e4;border-radius:12px;overflow:hidden;margin-bottom:24px;">
            <tr><td style="padding:12px 16px;background-color:#f6f6f5;font-size:13px;font-weight:600;color:#5d5c54;border-bottom:1px solid #e7e7e4;">Reference ID</td><td style="padding:12px 16px;font-size:13px;color:#1a1a18;border-bottom:1px solid #e7e7e4;font-family:monospace;">${escapeHtml(e.enquiryId)}</td></tr>
            <tr><td style="padding:12px 16px;background-color:#f6f6f5;font-size:13px;font-weight:600;color:#5d5c54;border-bottom:1px solid #e7e7e4;">Product</td><td style="padding:12px 16px;font-size:13px;color:#1a1a18;border-bottom:1px solid #e7e7e4;">${safe(e.product)}</td></tr>
            <tr><td style="padding:12px 16px;background-color:#f6f6f5;font-size:13px;font-weight:600;color:#5d5c54;border-bottom:1px solid #e7e7e4;">Quantity</td><td style="padding:12px 16px;font-size:13px;color:#1a1a18;border-bottom:1px solid #e7e7e4;">${e.quantity != null ? escapeHtml(String(e.quantity) + " " + (e.unit ?? "")) : "—"}</td></tr>
            <tr><td style="padding:12px 16px;background-color:#f6f6f5;font-size:13px;font-weight:600;color:#5d5c54;border-bottom:1px solid #e7e7e4;">Destination</td><td style="padding:12px 16px;font-size:13px;color:#1a1a18;border-bottom:1px solid #e7e7e4;">${safe(e.destination)}</td></tr>
            <tr><td style="padding:12px 16px;background-color:#f6f6f5;font-size:13px;font-weight:600;color:#5d5c54;">Submission Date</td><td style="padding:12px 16px;font-size:13px;color:#1a1a18;">${escapeHtml(formatDate(e.createdAt))}</td></tr>
          </table>
          <p style="margin:0 0 8px;font-size:15px;line-height:1.6;color:#474640;">Our team will review your enquiry and respond regarding availability, specifications and commercial terms.</p>
          <p style="margin:0;font-size:13px;line-height:1.6;color:#7d7c74;">If you did not submit this enquiry, please disregard this email.</p>
        </td></tr>
        <tr><td style="padding:24px 40px 32px;border-top:1px solid #e7e7e4;">
          <p style="margin:0;font-size:13px;color:#7d7c74;line-height:1.5;">Setu Trade — Export &amp; Trade<br/>This is an automated confirmation. Please do not reply to this email.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function buildAdminEmailHtml(e: EnquiryPayload, adminUrl: string): string {
  const rows: [string, string][] = [
    ["Enquiry ID", e.enquiryId],
    ["Submission Date", formatDate(e.createdAt)],
    ["Buyer Name", e.fullName],
    ["Company", e.company],
    ["Country", e.country],
    ["City", e.city ?? ""],
    ["Email", e.email],
    ["Phone / WhatsApp", e.phoneWhatsapp],
    ["Buyer Type", e.buyerType],
    ["Product", e.product],
    ["Variety / Grade", e.varietyGrade ?? ""],
    ["Quantity", e.quantity != null ? String(e.quantity) : ""],
    ["Unit", e.unit ?? ""],
    ["Packaging", e.packaging ?? ""],
    ["Destination", e.destination],
    ["Delivery Date", e.deliveryDate ? formatDate(e.deliveryDate) : ""],
    ["Specifications", e.specifications ?? ""],
    ["Additional Message", e.additionalMessage ?? ""],
    ["Incoterm", e.incoterm ?? ""],
    ["Payment Terms", e.paymentTerms ?? ""],
  ];

  const rowsHtml = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:10px 16px;background-color:#f6f6f5;font-size:13px;font-weight:600;color:#5d5c54;border-bottom:1px solid #e7e7e4;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td><td style="padding:10px 16px;font-size:13px;color:#1a1a18;border-bottom:1px solid #e7e7e4;">${safe(value)}</td></tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f6f6f5;font-family:Inter,system-ui,-apple-system,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f6f6f5;padding:24px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 2px rgba(16,16,14,0.04),0 4px 16px rgba(16,16,14,0.06);">
        <tr><td style="background-color:#234e28;padding:24px 40px;">
          <p style="margin:0;font-size:18px;font-weight:800;color:#ffffff;">New Buyer RFQ</p>
          <p style="margin:4px 0 0;font-size:13px;color:#bbd8bc;">${safe(e.product)} — ${safe(e.company)}</p>
        </td></tr>
        <tr><td style="padding:28px 40px;">
          <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#474640;">A new buyer enquiry has been submitted through the website.</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e7e7e4;border-radius:12px;overflow:hidden;margin-bottom:24px;">
            ${rowsHtml}
          </table>
          <a href="${escapeHtml(adminUrl)}" style="display:inline-block;background-color:#234e28;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;padding:12px 24px;border-radius:8px;">View Enquiry in Admin Dashboard</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

async function sendEmail(
  resendApiKey: string,
  from: string,
  to: string,
  subject: string,
  html: string,
): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, html }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend API error (${res.status}): ${body}`);
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const notificationEmail = Deno.env.get("SETU_TRADE_NOTIFICATION_EMAIL");
    const fromAddress = Deno.env.get("EMAIL_FROM_ADDRESS");
    const appUrl = Deno.env.get("APP_URL") ?? "";

    if (!resendApiKey) throw new Error("RESEND_API_KEY is not configured.");
    if (!notificationEmail) throw new Error("SETU_TRADE_NOTIFICATION_EMAIL is not configured.");
    if (!fromAddress) throw new Error("EMAIL_FROM_ADDRESS is not configured.");

    const body: EnquiryPayload = await req.json();

    if (!body.enquiryId || !body.email || !EMAIL_REGEX.test(body.email)) {
      return new Response(JSON.stringify({ error: "Invalid enquiry data." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const adminClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });

    const buyerSubject = "Setu Trade — RFQ Received";
    const adminSubject = `New Buyer RFQ — ${body.product} — ${body.company}`;

    const adminLink = appUrl
      ? `${appUrl.replace(/\/$/, "")}/admin/enquiries/${body.enquiryId}`
      : "";

    let buyerEmailSent = false;
    let adminEmailSent = false;
    const errors: string[] = [];

    // Send buyer confirmation email
    try {
      await sendEmail(
        resendApiKey,
        fromAddress,
        body.email,
        buyerSubject,
        buildBuyerEmailHtml(body),
      );
      buyerEmailSent = true;
    } catch (err) {
      errors.push(`Buyer email: ${err instanceof Error ? err.message : String(err)}`);
    }

    // Send admin notification email
    try {
      await sendEmail(
        resendApiKey,
        fromAddress,
        notificationEmail,
        adminSubject,
        buildAdminEmailHtml(body, adminLink),
      );
      adminEmailSent = true;
    } catch (err) {
      errors.push(`Admin email: ${err instanceof Error ? err.message : String(err)}`);
    }

    const errorText = errors.length > 0 ? errors.join("; ") : null;

    // Update the enquiry record with email status
    await adminClient
      .from("enquiries")
      .update({
        buyer_email_sent: buyerEmailSent,
        admin_email_sent: adminEmailSent,
        email_notification_error: errorText,
      })
      .eq("id", body.enquiryId);

    return new Response(
      JSON.stringify({
        buyerEmailSent,
        adminEmailSent,
        error: errorText,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error.";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
