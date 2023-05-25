import { createContext } from "react";
import { Socket, io } from "socket.io-client";
import { ContextProps } from "./types";

const socket = io("http://localhost:4000");
export const WebSocketContext = createContext<Socket>(socket);

const WebSocketProvider = ({ children }: ContextProps) => {
  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;
