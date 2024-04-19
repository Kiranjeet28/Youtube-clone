import React, { createContext, useContext, useMemo } from 'react';
import { io } from 'socket.io-client';

// Create a context to hold the socket instance
const SocketContext = createContext(null);

// Custom hook to access the socket instance
export const useSocket = () => {
    const socket = useContext(SocketContext);
    if (!socket) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return socket;
};

// Provider component to wrap the application and provide the socket instance
export const SocketProvider = (props) => {
    // Memoize the socket instance creation to ensure it's only created once
    const socket = useMemo(() => io('localhost:8000'), []);

    return (
        // Provide the socket instance to the context
        <SocketContext.Provider value={socket}>
            {props.children}
        </SocketContext.Provider>
    );
};
