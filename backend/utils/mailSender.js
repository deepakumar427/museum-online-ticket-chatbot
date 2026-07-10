
const nodemailer = require("nodemailer")

const mailSender = async (email, title, body) => {
  try {
    // Render free web services block SMTP ports. Resend uses HTTPS instead.
    if (process.env.RESEND_API_KEY) {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.MAIL_FROM || "Tixplore <onboarding@resend.dev>",
          to: [email],
          subject: title,
          html: body,
        }),
      })
      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.message || "Resend could not send the email")
      }
      console.log("Email queued with Resend:", result.id)
      return result
    }

    if (!process.env.MAIL_HOST || !process.env.MAIL_USER || !process.env.MAIL_PASS) {
      throw new Error("Email service is not configured. Set RESEND_API_KEY or SMTP credentials.");
    }

    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT || 587),
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      secure: false,
    })

    let info = await transporter.sendMail({
      from: process.env.MAIL_FROM || `"Tixplore" <${process.env.MAIL_USER}>`,
      to: `${email}`, // list of receivers
      subject: `${title}`, // Subject line
      html: `${body}`, // html body
    })
    console.log("Email sent:", info.messageId)
    return info
  } catch (error) {
    console.error("Email delivery failed:", error.message)
    throw error
  }
}

module.exports = mailSender
