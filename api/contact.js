// EKSA — contact form serverless function (SMTP delivery).
// The form on the homepage posts JSON here; we relay it via SMTP through
// the Eksioğlu Grup mail server (mail.eksioglugrup.tr) to info@eksa.tr.
//
// Required Vercel environment variable:
//   SMTP_PASSWORD — the password for info@eksa.tr on mail.eksioglugrup.tr.
//
// Optional environment variables (with sensible defaults baked in):
//   SMTP_HOST     — default "mail.eksioglugrup.tr"
//   SMTP_PORT     — default "465"  (SMTPS/SSL). Set to "587" for STARTTLS.
//   SMTP_SECURE   — default "true" (true when port is 465). Set "false" with 587.
//   SMTP_USER     — default "info@eksa.tr"
//   CONTACT_TO    — recipient, default "info@eksa.tr"
//   CONTACT_FROM  — visible From address, default "EKSA Web <info@eksa.tr>"

import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST || "mail.eksioglugrup.tr";
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "465", 10);
const SMTP_SECURE = (process.env.SMTP_SECURE || (SMTP_PORT === 465 ? "true" : "false")) === "true";
const SMTP_USER = process.env.SMTP_USER || "info@eksa.tr";
const TO = process.env.CONTACT_TO || "info@eksa.tr";
const FROM = process.env.CONTACT_FROM || "EKSA Web <info@eksa.tr>";

// Lazy-create the transporter so cold-starts don't fail before validation.
let transporter = null;
function getTransporter() {
  if (transporter) return transporter;
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: {
      user: SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    // Short timeouts so the request doesn't hang past Vercel's function limit.
    connectionTimeout: 10_000,
    socketTimeout: 15_000,
  });
  return transporter;
}

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "object" && req.body
      ? req.body
      : JSON.parse(req.body || "{}");
    const { name, email, phone, project, message, website, locale } = body;

    // Honeypot — bots fill the hidden `website` field, humans don't.
    if (website && String(website).trim() !== "") {
      return res.status(200).json({ ok: true });
    }

    const isTR = (locale || "tr").toLowerCase().startsWith("tr");

    if (!name || !email) {
      return res.status(400).json({
        error: isTR
          ? "Ad ve e-posta zorunludur."
          : "Name and email are required.",
      });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
      return res.status(400).json({
        error: isTR
          ? "Geçerli bir e-posta adresi girin."
          : "Please enter a valid email address.",
      });
    }
    if (!process.env.SMTP_PASSWORD) {
      console.error("SMTP_PASSWORD is not set on Vercel.");
      return res.status(500).json({
        error: isTR
          ? "Sunucu yapılandırması eksik. Lütfen daha sonra deneyin."
          : "Server is not configured to send messages. Please try again later.",
      });
    }

    const lines = [
      ["Ad Soyad / Name", name],
      ["E-posta / Email", email],
      ["Telefon / Phone", phone || "—"],
      ["İlgilendiği proje / Project", project || "—"],
      ["Dil / Language", isTR ? "Türkçe" : "English"],
    ];
    const tableRows = lines
      .map(
        ([k, v]) =>
          `<tr><td style="padding:6px 18px 6px 0;color:#6b5a4e;font-size:12px;letter-spacing:0.04em;text-transform:uppercase;vertical-align:top">${esc(
            k
          )}</td><td style="padding:6px 0;color:#2A1810;font-size:15px">${esc(
            v
          )}</td></tr>`
      )
      .join("");

    const html = `
<!doctype html>
<html><body style="font-family:-apple-system,Segoe UI,Inter,sans-serif;background:#EFE7D8;padding:24px;color:#2A1810">
  <div style="max-width:600px;margin:0 auto;background:#fff;padding:32px;border-radius:4px">
    <p style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#6b5a4e;margin:0 0 6px">— EKSA · İletişim Formu</p>
    <h1 style="font-weight:300;font-size:28px;letter-spacing:-0.02em;margin:0 0 24px">Yeni teklif talebi.</h1>
    <table style="width:100%;border-collapse:collapse;border-top:1px solid #e5dccb;border-bottom:1px solid #e5dccb">
      ${tableRows}
    </table>
    ${message
      ? `<h2 style="font-weight:400;font-size:14px;letter-spacing:0.04em;text-transform:uppercase;color:#6b5a4e;margin:24px 0 8px">Mesaj</h2>
         <p style="font-size:15px;line-height:1.6;margin:0;white-space:pre-wrap">${esc(message)}</p>`
      : ""}
    <hr style="border:none;border-top:1px solid #e5dccb;margin:28px 0">
    <p style="font-size:11px;color:#6b5a4e;margin:0">Bu mesaj <a href="https://www.eksa.tr" style="color:#2A1810">www.eksa.tr</a> iletişim formundan gönderilmiştir. Yanıtlamak için doğrudan ${esc(
      email
    )} adresine cevap verebilirsiniz.</p>
  </div>
</body></html>`.trim();

    const plain = lines.map(([k, v]) => `${k}: ${v}`).join("\n") +
      (message ? `\n\nMesaj / Message:\n${message}` : "");

    await getTransporter().sendMail({
      from: FROM,
      to: TO,
      replyTo: String(email),
      subject: `Yeni teklif talebi — ${truncate(name, 60)}`,
      html,
      text: plain,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("contact handler error:", err);
    // Common SMTP failure modes — log but don't leak details to client.
    return res.status(502).json({
      error:
        "Mesaj gönderilemedi, lütfen daha sonra tekrar deneyin. / Could not send the message, please try again later.",
    });
  }
}

function esc(s) {
  if (s === null || s === undefined) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function truncate(s, n) {
  s = String(s || "");
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}
