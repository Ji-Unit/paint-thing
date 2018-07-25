const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 3001;

var server = require("http").createServer(app);
var io = require("socket.io")(server);
io.on("connection", function() {
  /* … */
});

server.listen(port, () => {
  console.log("WE INSIDE THE STREAM");
});
