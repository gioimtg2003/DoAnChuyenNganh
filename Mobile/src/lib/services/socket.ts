import { Socket, io } from "socket.io-client";
import { useToken } from "../hooks/useToken";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEY } from "../Constant";
import { LocationObjectCoords } from "expo-location";

export interface ServerToClientEvents {
    required_token: () => void;
}

export interface ClientToServerEvents {
    cancelOrder: (data: DataOrder) => void;
    completeOrder: (data: DataOrder) => void;
    trackingOrder: (data: DataOrder) => void;
    online: (id: string) => void;
    offline: (id: string) => void;
    update_location: (coords: LocationObjectCoords) => void;
}
interface DataOrder {
    id: string;
    status: string;
    message: string;
}

export const initSocket = () => {
    console.log("init socket");

    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
        "http://apishippy.nguyenconggioi.me",
        {
            transports: ["websocket"],
        }
    );

    socket.on("disconnect", () => {
        socket.emit("offline", "sdd");
    });

    // socket.on("required_token", async () => {
    //     try {
    //         const accessToken = await AsyncStorage.getItem(
    //             STORAGE_KEY.ACCESS_TOKEN
    //         );
    //         socket.auth = { token: accessToken };
    //         socket.connect();
    //     } catch (error) {
    //         console.error(error);
    //     }
    // });

    return socket;
};
