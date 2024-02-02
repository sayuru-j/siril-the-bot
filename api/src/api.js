require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ConnectDB = require("./db/connection");

const chatRoute = require("./routes/chatRoute");
const userRoute = require("./routes/userRoute");
const openairRoute = require("./routes/openaiConfigRoute");

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors({ origin: "*" }));

// DB
ConnectDB();

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/chat", chatRoute);
app.use("/user", userRoute);

app.use("/config/openai", openairRoute);

app.listen(process.env.API_PORT, () => {
  console.log(`App listening on ${process.env.API_PORT}`);
});
