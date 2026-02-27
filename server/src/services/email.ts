const RESEND_API = "https://api.resend.com/emails";

function getApiKey() {
  return process.env.RESEND_API_KEY;
}

function getFromAddress() {
  return process.env.SMTP_FROM || "hola@leadlanguage.eu";
}

async function sendEmail(to: string, subject: string, html: string) {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.log("[Email] Skipping (RESEND_API_KEY not configured)");
    console.log("[Email] Would send to:", to, "| Subject:", subject);
    return;
  }

  const res = await fetch(RESEND_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `Lead Language <${getFromAddress()}>`,
      to,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend API error ${res.status}: ${body}`);
  }

  const data = await res.json();
  console.log(`[Email] Sent to ${to} (id: ${data.id})`);
}

export async function sendLeadNotification(lead: {
  name: string;
  email: string;
  phone: string;
  academy_name: string;
  academy_url: string;
  academy_location: string;
}) {
  const notifyEmail = process.env.NOTIFY_EMAIL;
  if (!notifyEmail) {
    console.log("[Email] Skipping notification (NOTIFY_EMAIL not set)");
    console.log("[Email] Lead data:", JSON.stringify(lead, null, 2));
    return;
  }

  await sendEmail(
    notifyEmail,
    `Nuevo lead: ${lead.academy_name} — ${lead.name}`,
    `
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
      <p><a href="https://leadlanguage.eu/admin">Ver en el panel de administración</a></p>
    `
  );
}

export async function sendLeadConfirmation(lead: {
  name: string;
  email: string;
  academy_name: string;
}) {
  await sendEmail(
    lead.email,
    "Tu estrategia personalizada está en camino — Lead Language",
    `
      <div style="margin:0;padding:0;background-color:#f4f4f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f7;padding:40px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
                <!-- Header -->
                <tr>
                  <td style="background:linear-gradient(135deg,#0a0a1a 0%,#1e1b4b 100%);padding:32px 40px;text-align:center;">
                    <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;letter-spacing:-0.5px;">Lead Language</h1>
                    <p style="margin:6px 0 0;color:#a5b4fc;font-size:13px;">Marketing digital para academias de idiomas</p>
                  </td>
                </tr>
                <!-- Body -->
                <tr>
                  <td style="padding:40px;">
                    <h2 style="margin:0 0 8px;color:#1e1b4b;font-size:22px;font-weight:700;">Hola ${lead.name},</h2>
                    <p style="margin:0 0 24px;color:#6366f1;font-size:18px;font-weight:600;line-height:1.4;">
                      Ya estás un paso más cerca de llenar tus aulas.
                    </p>
                    <p style="margin:0 0 24px;color:#374151;font-size:16px;line-height:1.7;">
                      Hemos recibido tu solicitud para <strong style="color:#1e1b4b;">${lead.academy_name}</strong> y nos vamos a poner en contacto contigo en seguida para ver cómo podemos adaptar nuestra estrategia a tu academia.
                    </p>
                    <!-- Highlight box -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background-color:#eef2ff;border-left:4px solid #6366f1;border-radius:0 8px 8px 0;padding:20px 24px;">
                          <p style="margin:0 0 4px;color:#4338ca;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">Próximos pasos</p>
                          <p style="margin:0;color:#374151;font-size:15px;line-height:1.6;">
                            Un especialista de nuestro equipo revisará tu caso y te contactará en las próximas 24 horas con una propuesta personalizada.
                          </p>
                        </td>
                      </tr>
                    </table>
                    <p style="margin:28px 0 0;color:#6b7280;font-size:14px;line-height:1.6;">
                      Si tienes alguna pregunta mientras tanto, responde directamente a este email o escríbenos a
                      <a href="mailto:hola@leadlanguage.eu" style="color:#6366f1;text-decoration:none;font-weight:600;">hola@leadlanguage.eu</a>.
                    </p>
                  </td>
                </tr>
                <!-- Footer -->
                <tr>
                  <td style="background-color:#f9fafb;border-top:1px solid #e5e7eb;padding:24px 40px;text-align:center;">
                    <p style="margin:0 0 4px;color:#9ca3af;font-size:12px;">Lead Language &mdash; Marketing para academias de idiomas</p>
                    <p style="margin:0;color:#d1d5db;font-size:11px;">leadlanguage.eu</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    `
  );
}
