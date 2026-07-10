
const nodemailer = require("nodemailer")

const mailSender = async (email, title, body) => {
  try {
    if (!process.env.MAIL_HOST || !process.env.MAIL_USER || !process.env.MAIL_PASS) {
      throw new Error("Email service is not configured");
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
      from: `"Tixplore | broCode" <${process.env.MAIL_USER}>`, // sender address
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
