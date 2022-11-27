const nodemailer = require("nodemailer")

let mailTransporter = async ({
  to = [],
  from_email,
  from_username,
  subject,
  text,
  clientName,
}) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD,
    },
  })

  let mailDetails = {
    to,
    from: from_email,
    subject,
    text,
    html: `
     <div style={{ minHeight: "40vh" }}>
        <h2>${from_email} whose name is <u>${from_username}</u> texted you from ${clientName}:</h2>
        <h4><u>Message body: </u></h4>
        <h2>${text}</h2>
     </div>
    `,
  }

  await transporter.sendMail(mailDetails)
}

//mailTransporter()

module.exports = mailTransporter
