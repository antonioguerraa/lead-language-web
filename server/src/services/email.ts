import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendLeadNotification(lead: {
  name: string;
  email: string;
  phone: string;
  academy_name: string;
  academy_url: string;
  academy_location: string;
}) {
  const notifyEmail = process.env.NOTIFY_EMAIL;
  if (!notifyEmail || !process.env.SMTP_PASS) {
    console.log("[Email] Skipping notification (SMTP not configured)");
    console.log("[Email] Lead data:", JSON.stringify(lead, null, 2));
    return;
  }

  await transporter.sendMail({
    from: `"Lead Language" <${process.env.SMTP_USER}>`,
    to: notifyEmail,
    subject: `Nuevo lead: ${lead.academy_name} — ${lead.name}`,
    html: `
      <h2>Nuevo lead desde el simulador de funnel</h2>
      <table style="border-collapse:collapse;font-family:sans-serif;">
        <tr><td style="padding:8px;font-weight:bold;">Nombre:</td><td style="padding:8px;">${lead.name}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Email:</td><td style="padding:8px;">${lead.email}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Teléfono:</td><td style="padding:8px;">${lead.phone}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Academia:</td><td style="padding:8px;">${lead.academy_name}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Web:</td><td style="padding:8px;"><a href="${lead.academy_url}">${lead.academy_url}</a></td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Ubicación:</td><td style="padding:8px;">${lead.academy_location}</td></tr>
      </table>
      <br>
      <p><a href="https://leadlanguage.com/admin">Ver en el panel de administración</a></p>
    `,
  });

  console.log(`[Email] Notification sent for lead: ${lead.name}`);
}
