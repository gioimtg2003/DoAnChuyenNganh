const { Server } = require('socket.io')

let socketIo = null;

const initSocket = (httpServer) => {
    socketIo = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            credentials: false
        },

    })
    socketIo.on("connection", (socket) => {
        console.log(socket.rooms)
    })
    socketIo.on("error", (err) => {
        console.error(err)
    })

    // socketIo.on("connection", (socket) => {
    //     console.log(socket.handshake.auth);
    //     socket.join("user")
    //     console.log(socket.rooms)
    //     socket.on("disconnect", () => {
    //         console.log("User disconnected")
    //         socket.on("offline", (data) => {
    //             console.log(data)
    //         })
    //         console.log(socket.rooms)
    //         console.log(socket.handshake.auth)
    //     })
    //     socket.on("offline", (data) => {
    //         console.log(data)
    //     })
    // })

    return socketIo
}

const getSocketIo = () => {
    if (!socketIo) {
        throw new Error("Socket.io not initialized")
    }
    return socketIo
}

module.exports = { initSocket, getSocketIo } 