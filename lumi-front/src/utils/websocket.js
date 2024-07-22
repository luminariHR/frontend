export const createWebSocket = (url, onMessageCallback) => {
  const socket = new WebSocket(url);

  socket.onopen = () => {
    console.log("WebSocket connected");
  };

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    onMessageCallback(message);
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  socket.onclose = () => {
    console.log("WebSocket disconnected");
  };

  return socket;
};
