const router = require("express").Router()

const mailTransporter = require("../gates/email")

router.get("/", (req, res) => {
  res.send("Welcome to Contact Mail Server")
})

router.post("/send-mail", async (req, res) => {
  try {
    const {
      to = [],
      from_email,
      from_username,
      subject,
      text,
      clientName,
    } = req.body

    if (
      !to ||
      to?.length === 0 ||
      !subject ||
      !text ||
      !clientName ||
      !from_email ||
      !from_username
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" })
    }

    await mailTransporter({
      ...req.body,
    })

    res.json({ success: true, message: "Message Sent Successfully" })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      success: false,
      message: `Internal Server Error: ${err.message}`,
    })
  }
})
