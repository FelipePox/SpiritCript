const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "spiritscriptapp@gmail.com",
    pass: "xbgzbneclvyggpei",
  },
});

const SendEmail = (subject, content, target) => {
  let targets = "";

  target.forEach((email) => {
    targets = targets.concat(", ", email);
  });

  const mailOptions = {
    from: "spiritscriptapp@gmail.com",
    to: targets,
    subject: subject,
    text: content,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = { SendEmail };
