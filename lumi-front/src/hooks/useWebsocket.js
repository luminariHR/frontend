import { useEffect, useState, useRef } from "react";
import { createWebSocket } from "../utils/websocket";

const useWebSocket = (url) => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const socket = createWebSocket(url + `?token=${accessToken}`, (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socketRef.current = socket;

    return () => {
      socket.close();
    };
  }, [url]);

  const sendMessage = (message) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    }
  };

  return { messages, sendMessage };
};

export default useWebSocket;
