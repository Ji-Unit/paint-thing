const express = require("express");
const bodyParser = require("body-parser");

const app = express();

//CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

const port = process.env.PORT || 3001;

var server = require("http").createServer(app);
var io = require("socket.io")(server);
io.on("connection", function(client) {
  /* … */
  client.on("poop", data => {
    console.log("message", data);
    io.emit("cry");
  });
});

server.listen(port, () => {
  console.log("WE INSIDE THE STREAM");
});
