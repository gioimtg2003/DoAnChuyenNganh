const { Server } = require('socket.io');
const { HandleAccessToken } = require('./MiddleWare/VerifyToken');
const { SchemaShipper } = require('./Models/Users/ShipperModel');
const { mongoose } = require('./db/Connect.Mongo');


const UpdateOnlineTotal = (id, time) => new Promise((resolve, reject) => {
    try {
        SchemaShipper.findOneAndUpdate({ _id: id }, { $inc: { OnlineTotal: time } }, { new: true })
            .then(data => resolve(data))
            .catch(err => reject(err));
    } catch (err) {
        reject(err);
    }
});


let socketIo = null;

const initSocket = (httpServer) => {
    socketIo = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },

    })

    socketIo.on("connection", handleConnect);
    socketIo.on("error", (err) => {
        console.error(err)
    })

    return socketIo
}
const handleConnect = async (socket) => {
    let { token } = socket.handshake.auth;
    if (!token) {
        console.log("Token socket not found");
        socket.emit("required_token")
        socket.disconnect()
        return;
    }

    let parserToken = await HandleAccessToken(token)
    if (parserToken.role === 1 && parserToken.shopId) {
        socket.join(parserToken.shopId)
        console.log("Shipper join room:: " + parserToken.shopId)

        socket.on("update_location", (data) => {
            console.log(data)
        })

    } else if (parserToken.role === 2) {
        socket.join(parserToken.id);
        console.log("Shop join room:: " + parserToken.id)

    }

    socket.on("disconnect", async () => {
        console.log("User disconnected");

        if (parserToken.role === 1 && parserToken.shopId) {
            try {
                let updateOffline = await SchemaShipper.findOneAndUpdate({ _id: parserToken.id }, { Online: false }, { new: true })
                let timeTotal = (Date.now() - updateOffline.OnlineRecent) + updateOffline.OnlineTotal;

                let s = await SchemaShipper.aggregate([
                    {
                        $match: {
                            _id: new mongoose.Types.ObjectId(parserToken.id)
                        }
                    },
                    {
                        $set: {
                            'OnlineTotal': timeTotal
                        }
                    },
                    {
                        $unset: "OnlineRecent"
                    }
                ]).exec();
                await UpdateOnlineTotal(parserToken.id, timeTotal)
                console.log(timeTotal)
                console.log(s)
                socketIo.to(parserToken.shopId).emit("shipper_status", {
                    id: parserToken.id,
                    status: "offline",
                    message: `Shipper is offline`
                })
                console.log("Shipper leave room:: " + parserToken.shopId)
            } catch (err) {
                console.error(err)
            }

        }
    })
}

const getSocketIo = () => {
    if (!socketIo) {
        throw new Error("Socket.io not initialized")
    }
    return socketIo
}

module.exports = { initSocket, getSocketIo } 