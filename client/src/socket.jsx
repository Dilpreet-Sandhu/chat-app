import { createContext, useContext, useMemo } from "react";
import io from "socket.io-client";


const socketContext = createContext();

export const getSocket = () => useContext(socketContext);

export const SocketProvider = ({ children }) => {
  const socket = useMemo(() => io("https://chat-app-ruby-seven.vercel.app", { withCredentials: true }),[]);
 console.log(socket)
  return (
    <socketContext.Provider value={socket}>{children}</socketContext.Provider>
  );
};

