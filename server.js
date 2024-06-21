const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(express.json());
app.use(express.static("public"));

let messages = [
  { author: "Juan", text: "Hola que tal" },
  { author: "Nico", text: "Bien y vos" },
  { author: "Pepito", text: "Genial" },
];

io.on("connection", function (socket) {
  console.log("Un cliente se ha conectado");
  socket.emit("messages", messages);
  socket.on("new-message", function (data) {
    messages.push(data);
    io.sockets.emit("messages", messages);
  });
});
app.get("/", (req, res) => {
  res.sendFile("index.html");
});

server.listen(8000, function () {
  console.log("Servidor corriendo en http://localhost:8000");
});