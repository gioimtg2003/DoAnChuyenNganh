import io from 'socket.io-client';

const socket = io('http://192.168.1.3:3003');

// Assume you have coordinates in variables latitude and longitude
export const sendLocationSocket = ( x, y) => {
    socket.emit('coordinates', { x, y });
}

