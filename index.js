const express = require("express");
const app = express();
const io = require("socket.io")(3101, {
    cors: {
        origin: ["http://localhost:3000"],
    },
});

app.use(express.json());

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