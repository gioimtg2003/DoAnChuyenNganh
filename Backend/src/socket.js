const { Server } = require('socket.io')

let socketIo = null;

const initSocket = (httpServer) => {
    socketIo = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    })
    socketIo.on("error", (err) => {
        console.error(err)
    })
    socketIo.on("connection", (socket) => {
        console.log("New client connected")
        socket.join("order-user-2")
        console.log(socket.id)
        socket.on("disconnect", () => {
            console.log("Client disconnected")
        })
    })
    return socketIo
}

const getSocketIo = () => {
    if (!socketIo) {
        throw new Error("Socket.io not initialized")
    }
    return socketIo
}

module.exports = { initSocket, getSocketIo } 