import { createContext, useContext, useMemo } from "react";
import io from "socket.io-client";


const socketContext = createContext();

export const getSocket = () => useContext(socketContext);

export const SocketProvider = ({ children }) => {
  const socket = useMemo(() => io("http://localhost:3000", { withCredentials: true }),[]);
  console.log(socket)
  return (
    <socketContext.Provider value={socket}>{children}</socketContext.Provider>
  );
};

