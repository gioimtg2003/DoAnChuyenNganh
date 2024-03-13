import { Socket, io } from "socket.io-client";

interface ServerToClientEvents {}

interface ClientToServerEvents {
    cancelOrder: (data: DataOrder) => void;
    completeOrder: (data: DataOrder) => void;
    trackingOrder: (data: DataOrder) => void;
    online: (id: string) => void;
    offline: (id: string) => void;
}
interface DataOrder {
    id: string;
    status: string;
    message: string;
}

export const initSocket = (id: string) => {
    console.log("init socket");
    try {
        const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
            "http://192.168.1.77:3000",
            {
                transports: ["websocket"],
                auth: {
                    id: id,
                },
            }
        );
        socket.on("disconnect", () => {
            socket.emit("offline", id);
        });
        return socket;
    } catch (error) {
        console.log(error);
    }
};
