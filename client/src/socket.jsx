import { createContext, useContext, useMemo } from "react";
import io from "socket.io-client";


const socketContext = createContext();

export const getSocket = () => useContext(socketContext);

export const SocketProvider = ({ children }) => {
  const socket = useMemo(() => io("https://chat-app-uzs8.onrender.com", { withCredentials: true }),[]);
 console.log(socket)
  return (
    <socketContext.Provider value={socket}>{children}</socketContext.Provider>
  );
};

