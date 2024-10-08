const { SchemaShipper } = require("../Models/Users/ShipperModel");
const { getSocketIo } = require("../socket");
const { CreateToken } = require("./jwt.service");

function UpdateState(id, status) {
    const res = async () => {
        try {
            await SchemaShipper.findOneAndUpdate({ _id: id }, { Online: status === 'online' }).then(data => data).catch(err => err);
        }
        catch (err) {
            console.log(err);
        }
    }
    res()
}

const UpdateOnlineRecent = (id) => new Promise((resolve, reject) => {
    try {
        SchemaShipper.findOneAndUpdate({ _id: id }, { OnlineRecent: Date.now() }, { new: true })
            .then(data => resolve(data.OnlineRecent))
            .catch(err => reject(err));
    } catch (err) {
        reject(err);
    }
});

const UpdateOnlineTotal = (id, time) => new Promise((resolve, reject) => {
    try {
        SchemaShipper.findOneAndUpdate({ _id: id }, { $inc: { OnlineTotal: time } }, { new: true })
            .then(data => resolve(data))
            .catch(err => reject(err));
    } catch (err) {
        reject(err);
    }
});

const GetOnlineRecent = (id) => new Promise((resolve, reject) => {
    try {
        SchemaShipper.findById(id).select({ OnlineRecent: 1, _id: 0 })
            .then(data => resolve(data.OnlineRecent))
            .catch(err => reject(err));
    } catch (err) {
        reject(err);
    }
});


const VerifyAccount = async (data, callback) => {
    let { email, code } = data;
    try {
        let isShipper = await SchemaShipper.findOne({ Email: email });
        if (isShipper && code === isShipper.CodeVerify) {
            let time = Date.now();
            if (isShipper.ExpVerify < time) {
                callback(null, false);
            } else {
                let timeAccessToken = 60 * 30;
                let timeRefreshToken = 60 * 60 * 24 * 30;
                let user = {
                    idUser: String(isShipper._id),
                    Role: isShipper.Role,
                    shopId: String(isShipper.ShopId)
                }
                let token = await CreateToken(user, timeAccessToken, timeRefreshToken);
                let dataCallback = {
                    token: token,
                    Verify: true
                }
                let dataSocket = {
                    id: isShipper._id,
                    status: "online",
                    message: `Shipper ${isShipper.Name} is online`,
                    Online: true
                }
                let socketIO = getSocketIo();
                await SchemaShipper.findOneAndUpdate({ _id: isShipper._id }, { Online: true, OnlineRecent: Date.now() }, { new: true });

                socketIO.to(String(isShipper.ShopId)).emit("shipper_status", dataSocket);
                // socketIO.on("connection", async (socket) => {
                //     console.log(socketIO.sockets.adapter.rooms)
                //     socket.in("status_user").emit("shipper_status", dataSocket);
                //     console.log(`Send to ${isShipper.ShopId} Online`);
                //     await UpdateOnlineRecent(isShipper._id);
                //     socket.on('updateLocation', (data) => {
                //         socket.broadcast.emit('shipper_location', data);
                //     })
                //     // socket.on("disconnecting", async () => {
                //     //     //check key is Object id => console room
                //     //     if (socket.rooms.has(String(isShipper.ShopId))) {
                //     //         let dataSocket = {
                //     //             id: isShipper._id,
                //     //             status: "offline",
                //     //             message: `Shipper ${isShipper.Name} is offline`
                //     //         }
                //     //         let timeOnlineRecent = await GetOnlineRecent(isShipper._id);
                //     //         let timeOnline = Date.now() - timeOnlineRecent;
                //     //         await UpdateOnlineTotal(isShipper._id, timeOnline);
                //     //         await UpdateState(isShipper._id, "offline");
                //     //         socket.broadcast.emit("shipper_status", dataSocket);
                //     //         socket.leave(String(isShipper.ShopId));
                //     //     }
                //     // });

                // });
                callback(null, dataCallback);
            }
        } else {
            callback("Email Not found", null);
        }
    } catch (err) {
        callback(err, null);
    }
};

module.exports = {
    VerifyAccount, UpdateState,
    UpdateOnlineRecent, UpdateOnlineTotal, GetOnlineRecent
};