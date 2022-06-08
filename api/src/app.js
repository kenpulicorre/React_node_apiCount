const express = require("express");
const http = require("http"); //para socket
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");

require("./db.js");

const server = express();

server.name = "API";
//Inicializamos socketio
const servidor = http.createServer(server);
const socketio = require("socket.io");
const socketUtils = require("../utils/socketUtils"); //2
// const io = socketio(servidor);//1
const io = socketUtils.sio(servidor); //2
// //--------------1
// io.on("connection", (socket) => {
//   socket.on("conectado", () => {
//     console.log("usuario kenneth conectado");
//   });
// });
// //--------------1
socketUtils.connection(io);
//fin Inicializamos socketio
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

// module.exports = server; //sin sokect io
module.exports = servidor; //con socket io
