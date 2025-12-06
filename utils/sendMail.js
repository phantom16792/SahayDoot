// utils/sendMail.js
const nodemailer = require("nodemailer");

exports.sendMail = async (options) => {
  // transporter configuration
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sahaydoot@gmail.com",  
      pass: "pdwqdwmmpqlafqfk",  
    },
  });

  // mail options
  const mailOptions = {
    from: '"SAHAYDOOT ALERT" <sahaydoot@gmail.com>',
    to: options.to,
    subject: options.subject,
    html: options.html,
  };

  // send email
  await transporter.sendMail(mailOptions);
};
