require("dotenv").config()

const http = require("http")
const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/", require("./api/index"))

let PORT = process.env.PORT || 5000

http.createServer(app).listen(PORT, () => {
  console.log("Contact Mail Server started Successfully...")
})
