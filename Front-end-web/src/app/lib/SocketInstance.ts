import { Socket, io } from "socket.io-client";
import { grantAccessToken } from "./util/axios";
import { useToken } from "./hook/useToken";

type statusShipper = "online" | "offline";

export interface DataEvent {
    status_shipper: {
        id: string;
        status: statusShipper;
        message: string;
        Online: boolean;
    };
    location_shipper: {
        id: string;
        lat: number;
        lng: number;
    };
}

export interface ServerToClientEvents {
    NotificationOrder: (data: DataOrder) => void;
    shipper_status: (data: DataEvent["status_shipper"]) => void;
    required_token: () => void;
    shipper_location: (data: DataEvent["location_shipper"]) => void;
}

export interface ClientToServerEvents {
    cancelOrder: (data: DataOrder) => void;
    completeOrder: (data: DataOrder) => void;
    trackingOrder: (data: DataOrder) => void;
}

interface DataOrder {
    type: string;
    message: string;
    description: string;
}

export class SocketInstance {
    private static instance: Socket<ServerToClientEvents, ClientToServerEvents>;

    constructor() {}

    public static getInstance(): Socket<
        ServerToClientEvents,
        ClientToServerEvents
    > {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { accessToken } = useToken();
        if (!SocketInstance.instance) {
            SocketInstance.instance = io("http://localhost:3000", {
                auth: { token: accessToken },
            });
        }
        return SocketInstance.instance;
    }
}
