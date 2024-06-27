import sgMail from "@sendgrid/mail";

const { SENDGRID_API_KEY, BASE_URL, SENDGRID_MAIL, PORT } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

export const sendEmail = async ({ email, verificationToken }) => {
  const msg = {
    to: email,
    from: SENDGRID_MAIL,
    subject: "Verify your email",
    html: `<a target="_blank" href="${BASE_URL}:${PORT}/users/verify/${verificationToken}">Verify your email</a>`,
  };
  return await sgMail.send(msg);
};