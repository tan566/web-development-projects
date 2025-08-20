const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const users = {};

// serve static files from public folder
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("new-user-joined", (name) => {
        users[socket.id] = name;
        console.log(`${name} joined`);
        socket.broadcast.emit("receive", { name: "System", message: `${name} joined the chat` });
    });

    socket.on("send", (message) => {
        let dataObj = {
            message: message,
            name: users[socket.id],
        };
        socket.broadcast.emit("receive", dataObj);
    });

    socket.on("disconnect", () => {
        if (users[socket.id]) {
            socket.broadcast.emit("receive", { name: "System", message: `${users[socket.id]} left the chat` });
            console.log(`${users[socket.id]} left`);
            delete users[socket.id];
        }
    });
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

server.listen(3000, () => {
    console.log("✅ Server running at http://localhost:3000");
});

