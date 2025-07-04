import { io } from 'socket.io-client';

const socket = io('https://tictactoe-aclz.onrender.com', { transports: ['websocket'] });


export default socket;
