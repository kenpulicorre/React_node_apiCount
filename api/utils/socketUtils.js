const socketIO = require("socket.io");

exports.sio = (server) => {
  return socketIO(server, {
    transports: ["polling"],
    cors: {
      origin: "*",
    },
  });
};

exports.connection = (io) => {
  io.on("connection", (socket) => {
    let nombre;
    console.log("usuario equipo en coneccion");
    // socket.on("conectado", (x, y) => {
    //   console.log(`user ${x},${y} send message from client`);
    //   let x2 = ` ${x} back`;
    //   let y2 = ` ${y} back`;
    //   socket.emit("conectadoz", x2, y2);
    // });
    //------------------------------

    socket.on("conectado", (nomb) => {
      console.log("desde back en /conectado/ recibe");
      nombre = nomb;
      //socket.broadcast.emit manda el mensaje a todos los clientes excepto al que ha enviado el mensaje
      socket.broadcast.emit("mensajes", {
        nombre: nombre,
        mensaje: `${nombre} ha entrado en la sala del chat`,
      });
      console.log("desde back en /conectado/ envio");
    });

    socket.on("mensaje", (nombre, mensaje) => {
      //io.emit manda el mensaje a todos los clientes conectados al chat
      io.emit("mensajes", { nombre, mensaje });
    });
    socket.on("mensajew", (text) => {
      //io.emit manda el mensaje a todos los clientes conectados al chat
      console.log("recibi texto de front", text);
      io.emit("mensajesw", { text, socketid: socket.id });
    });

    //------------------------------ejemplo socketcitas

    //------------------------------
    socket.on("boton_socket", (e) => {
      console.log(`message from ${socket.id} : and  text${e}`);
      socket.emit("rendermsj", e);
    });

    socket.on("message", (message) => {
      console.log(`message from ${socket.id} : ${message}`);
    });

    socket.on("disconnect", () => {
      // console.log(socket);
      console.log(`socket ${socket.id} have been disconnected`);
      io.emit("mensajes", {
        servidor: "Servidor",
        mensaje: `${nombre} ha abandonado la sala`,
      });
      // return () => {
      //   socket.off();
      // };
    });
  });
};
