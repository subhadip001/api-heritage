const express = require("express");
const cors = require("cors");
const app = express();

require("./config/db");

require("dotenv").config();

const allowedOrigins = [
  "https://marg-historicroads.com/",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: allowedOrigins,
  })
);
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "config/config.env" });
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/marg/visitor", require("./routes/visitorCounterRouter"));

module.exports = app;
