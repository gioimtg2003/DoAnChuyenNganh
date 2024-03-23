import io from 'socket.io-client';
import { useAuth } from './AuthContext';


const socket = io('http://10.0.2.2:3003', {
    transports : ["websocket"],
});

export const getSocket = () => socket;

// // Assume you have coordinates in variables latitude and longitude
// export const sendLocationSocket = ( x, y) => {
//     socket.on("connect", () => {
//         socket.emit('coordinates', { x, y }); // socket connect rồi mới emit sự kiện
//     })
    
// }

