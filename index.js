const express = require("express");
const app = express();
require("dotenv").config();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

app.use(express.json());

server.listen(process.env.PORT || 3101, () => {
    console.log("Server is OK!");
});

io.on("connection", socket => {
    console.log(socket.id);

    socket.on("sendElement", (data) => {
        socket.broadcast.emit("emitSendElement", data);
    });

    socket.on("sendText", (data) => {
        socket.broadcast.emit("emitSendText", data);
    });

    socket.on("disconnect", () => {
        console.log("User " + socket.id + " disconnected");
    });
});