const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, { cors: { origin: "*" } });

const USERS = new Map()

io.on("connection", socket => {
    socket.on("login", data => {
        let user = {
            id: socket.id,
            username: data.username
        }
        USERS.set(socket.id, user)
        socket.emit("login", user)
        io.emit("onlines", Array.from(USERS.values()))
    })

    socket.on("onlines", () => {
        socket.emit("onlines", Array.from(USERS.values()))
    })

    socket.on("logout", () => {
        USERS.delete(socket.id)
        console.log(USERS);
        socket.emit("logout")
        io.emit("onlines", Array.from(USERS.values()))
    })

    socket.on("disconnect", () => {
        USERS.delete(socket.id)
        console.log(USERS);
        io.emit("onlines", Array.from(USERS.values()))
    })

    socket.on("message", data => {
        if (!USERS.has(data.to))
            return
        socket.emit("message", {
            room: data.to,
            sendBy: socket.id,
            message: data.message
        })
        io.to(data.to).emit("message", {
            room: socket.id,
            sendBy: socket.id,
            message: data.message
        })
        socket.emit("messageDetail", {
            room: data.to,
            message: data.message
        })
        io.to(data.to).emit("messageDetail", {
            room: socket.id,
            message: data.message
        })
    })
});

httpServer.listen(3001);
