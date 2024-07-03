const express = require("express");
const { getHello } = require("./controller/hello");
require("dotenv").config();

const app = express();

app.set("trust proxy", true);

app.get("/api/hello", getHello);

app.get("/", (req, res) => {
  res.send("Welcome to Hello app!");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}`);
});
