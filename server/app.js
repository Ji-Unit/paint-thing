const express = require("express");
const bodyParser = require("body-parser");
const io = require("socket.io");

const app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 4000;

app.get("/test", (req, res) => res.json({ thing: "stff" }));

app.listen(port, function() {
  console.log("got your backend");
});
