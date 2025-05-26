const nodemailer = require("nodemailer");
// const { Resend } = require("resend");
const logger = require("../utils/logger.util");

logger.info("BREVO_EMAIL: " + process.env.BREVO_EMAIL);
logger.info("BREVO_SMTP_KEY exists: " + !!process.env.BREVO_SMTP_KEY);
logger.info("MONGODB_URI exists: " + !!process.env.MONGODB_URI);
logger.info("RESEND_API_KEY exists: " + !!process.env.RESEND_API_KEY);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_APP_PASS,
  },
});

const sendResetPasswordEmail = async (to, token) => {
  const resetURL = `http://localhost:3000/auth/reset-password/${token}`;

  const mailOptions = {
    from: `"Messmate" <${process.env.BREVO_EMAIL}>`,
    to,
    subject: "Reset Your Password",
    html: `
      <h2>Reset Password</h2>
      <p>You requested a password reset. Click the link below:</p>
      <a href="${resetURL}">${resetURL}</a>
      <p>This link expires in 1 hour.</p>
    `,
  };

  // Resend.sendMail({
  //   mailOptions,
  // });

  try {
    logger.info(`Sending email to: ${to}`);
    const info = await transporter.sendMail(mailOptions);
    logger.info("Email sent successfully:", info);
  } catch (error) {
    logger.error("Failed to send email:", error); // This will show what’s going wrong
    throw error; // Optional: re-throw to bubble up to 500
  }
};

module.exports = { sendResetPasswordEmail };
