import { io } from 'socket.io-client';

// Create socket instance with backend URL
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Initialize socket with options
export const socket = io(BACKEND_URL, {
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    transports: ['websocket', 'polling']
});

// Socket event listeners for connection status
socket.on('connect', () => {
    console.log('Socket connected successfully');
});

socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error);
});

socket.on('disconnect', (reason) => {
    console.log('Socket disconnected:', reason);
});

// Export socket instance
export default socket;