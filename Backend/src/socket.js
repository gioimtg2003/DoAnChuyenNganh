const { Server } = require('socket.io');
const { HandleAccessToken } = require('./MiddleWare/VerifyToken');
const { SchemaShipper } = require('./Models/Users/ShipperModel');
const { mongoose } = require('./db/Connect.Mongo');


let socketIo = null;

const initSocket = (httpServer) => {
    socketIo = new Server(httpServer, {
        cors: {
            origin: ['http://localhost:8080', 'https://shippy.nguyenconggioi.me', 'http://localhost'],
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
            socketIo.to(parserToken.shopId).emit("shipper_location", {
                id: parserToken.id,
                lat: data.latitude,
                lng: data.longitude
            })

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
                let now = Date.now();
                console.log(`Date now ${now} - OnlineRecent ${updateOffline.OnlineRecent} = ${Date.now() - updateOffline.OnlineRecent}, Total ${now - updateOffline.OnlineRecent + updateOffline.OnlineTotal}`)
                console.log(updateOffline)
                let timeTotal = (now - updateOffline.OnlineRecent) + updateOffline.OnlineTotal;
                await SchemaShipper.updateOne(
                    {
                        _id: new mongoose.Types.ObjectId(updateOffline._id)
                    },
                    {
                        $set: {
                            'OnlineTotal': timeTotal
                        }
                    }
                ).exec();

                console.log(`OnlineTotal ${timeTotal}`)
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