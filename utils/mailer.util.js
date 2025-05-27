const nodemailer = require("nodemailer");
const logger = require("../utils/logger.util");
// const { Resend } = require("resend");

// logger.info("RESEND_API_KEY exists: " + !!process.env.RESEND_API_KEY);
logger.info("GMAIL_EMAIL: " + process.env.GMAIL_EMAIL);
logger.info("GMAIL_APP_PASS exists: " + !!process.env.GMAIL_APP_PASS);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_APP_PASS,
  },
});

async function sendMail(to, mailOptions) {
  try {
    logger.info(`Sending email to: ${to}`);
    const info = await transporter.sendMail(mailOptions);
    logger.info("Email sent successfully:", info);
  } catch (error) {
    logger.error("Failed to send email:", error); // This will show what’s going wrong
    throw error; // Optional: re-throw to bubble up to 500
  }
}

const sendResetPasswordEmail = async (to, token) => {
  const FRONTEND_URI =
    process.env.ENVIRONMENT === "LOCAL"
      ? "http://localhost:3000"
      : process.env.FRONTEND_URI;
  const resetURL = FRONTEND_URI + `/auth/reset-password/${token}`;

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

  await sendMail(to, mailOptions);
};

const sendResetPasswordAcknowledgementEmail = async (to) => {
  const mailOptions = {
    from: `"Messmate" <${process.env.BREVO_EMAIL}>`,
    to: to,
    subject: "Acknowledgement for Password Reset",
    html: `
      <h2>Password Reset Successful</h2>
      <p>You requested a password reset. It was done.</p>
    `,
  };

  await sendMail(to, mailOptions);
};

module.exports = {
  sendResetPasswordEmail,
  sendResetPasswordAcknowledgementEmail,
};
