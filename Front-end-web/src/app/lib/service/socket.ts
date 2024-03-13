import { Socket, io } from "socket.io-client";

type statusShipper = "online" | "offline";

export interface DataEvent {
    status_shipper: {
        id: string;
        status: statusShipper;
        message: string;
    };
}

interface ServerToClientEvents {
    NotificationOrder: (data: DataOrder) => void;
    shipper_status: (data: DataEvent["status_shipper"]) => void;
}

interface ClientToServerEvents {
    cancelOrder: (data: DataOrder) => void;
    completeOrder: (data: DataOrder) => void;
    trackingOrder: (data: DataOrder) => void;
}

interface DataOrder {
    type: string;
    message: string;
    description: string;
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    "http://localhost:3000"
);

export function getSocket() {
    return socket.connect();
}
