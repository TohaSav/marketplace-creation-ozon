type WebSocketEventHandler = (data: any) => void;
type WebSocketEvents = {
  [event: string]: WebSocketEventHandler[];
};

class WebSocketManager {
  private ws: WebSocket | null = null;
  private events: WebSocketEvents = {};
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private isConnected = false;

  constructor() {
    this.connect();
  }

  private connect() {
    try {
      // В реальном проекте здесь будет реальный WebSocket сервер
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      const wsUrl = `${protocol}//${window.location.host}/ws`;

      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log("WebSocket connected");
        this.isConnected = true;
        this.reconnectAttempts = 0;
        this.emit("connected", {});
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.emit(data.type, data.payload);
        } catch (error) {
          console.error("Failed to parse WebSocket message:", error);
        }
      };

      this.ws.onclose = () => {
        console.log("WebSocket disconnected");
        this.isConnected = false;
        this.emit("disconnected", {});
        this.handleReconnect();
      };

      this.ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        this.emit("error", { error });
      };
    } catch (error) {
      console.error("Failed to connect to WebSocket:", error);
      this.handleReconnect();
    }
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      setTimeout(() => {
        this.reconnectAttempts++;
        console.log(`Reconnecting... Attempt ${this.reconnectAttempts}`);
        this.connect();
      }, this.reconnectDelay * this.reconnectAttempts);
    } else {
      console.error("Max reconnection attempts reached");
      this.emit("maxReconnectAttemptsReached", {});
    }
  }

  public on(event: string, handler: WebSocketEventHandler) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(handler);
  }

  public off(event: string, handler: WebSocketEventHandler) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter((h) => h !== handler);
    }
  }

  private emit(event: string, data: any) {
    if (this.events[event]) {
      this.events[event].forEach((handler) => handler(data));
    }
  }

  public send(type: string, payload: any) {
    if (this.ws && this.isConnected) {
      this.ws.send(JSON.stringify({ type, payload }));
    } else {
      console.warn("WebSocket not connected. Message not sent:", {
        type,
        payload,
      });
    }
  }

  public disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  public getConnectionStatus() {
    return this.isConnected;
  }
}

// Создаем глобальный экземпляр WebSocket менеджера
export const wsManager = new WebSocketManager();

// Хук для использования WebSocket в компонентах
export const useWebSocket = () => {
  const [isConnected, setIsConnected] = React.useState(
    wsManager.getConnectionStatus(),
  );

  React.useEffect(() => {
    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);

    wsManager.on("connected", handleConnect);
    wsManager.on("disconnected", handleDisconnect);

    return () => {
      wsManager.off("connected", handleConnect);
      wsManager.off("disconnected", handleDisconnect);
    };
  }, []);

  return {
    isConnected,
    send: wsManager.send.bind(wsManager),
    on: wsManager.on.bind(wsManager),
    off: wsManager.off.bind(wsManager),
  };
};

export default wsManager;
