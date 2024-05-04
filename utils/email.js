const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1) create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    auth: {
      user: process.env.NODEMAILER_AUTH_USER,
      pass: process.env.NODEMAILER_AUTH_PASS,
    },
    // debug: true, // show debug output
    // logger: true, // log information in console
  });

  // 2) define the email options
  const mailOptions = {
    from: process.env.NODEMAILER_FROM,
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };

  // 3) actually send the email
  const sentEmail = await transporter.sendMail(mailOptions);
  // console.log(sentEmail);
};

module.exports = sendEmail;
