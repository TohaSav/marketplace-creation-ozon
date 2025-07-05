import { useEffect, useRef, useCallback } from "react";
import { WebSocketMessage, Order, Notification } from "@/types/marketplace";
import { useToast } from "@/hooks/use-toast";

interface UseWebSocketOptions {
  url: string;
  onConnected?: () => void;
  onDisconnected?: () => void;
  onMessage?: (data: WebSocketMessage) => void;
  onError?: (error: Event) => void;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
}

export const useWebSocket = ({
  url,
  onConnected,
  onDisconnected,
  onMessage,
  onError,
  reconnectInterval = 3000,
  maxReconnectAttempts = 5,
}: UseWebSocketOptions) => {
  const { toast } = useToast();
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    try {
      wsRef.current = new WebSocket(url);

      wsRef.current.onopen = () => {
        console.log("WebSocket connected");
        reconnectAttemptsRef.current = 0;
        onConnected?.();
      };

      wsRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          onMessage?.(data);
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      wsRef.current.onclose = () => {
        console.log("WebSocket disconnected");
        onDisconnected?.();
        attemptReconnect();
      };

      wsRef.current.onerror = (error) => {
        console.error("WebSocket error:", error);
        onError?.(error);
      };
    } catch (error) {
      console.error("Error creating WebSocket connection:", error);
      attemptReconnect();
    }
  }, [url, onConnected, onDisconnected, onMessage, onError]);

  const attemptReconnect = useCallback(() => {
    if (reconnectAttemptsRef.current >= maxReconnectAttempts) {
      console.log("Max reconnect attempts reached");
      return;
    }

    reconnectAttemptsRef.current++;
    console.log(
      `Attempting to reconnect (${reconnectAttemptsRef.current}/${maxReconnectAttempts})...`,
    );

    reconnectTimeoutRef.current = setTimeout(() => {
      connect();
    }, reconnectInterval);
  }, [connect, reconnectInterval, maxReconnectAttempts]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  }, []);

  const sendMessage = useCallback((message: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    } else {
      console.warn("WebSocket is not connected");
    }
  }, []);

  const isConnected = wsRef.current?.readyState === WebSocket.OPEN;

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    isConnected,
    sendMessage,
    disconnect,
    reconnect: connect,
  };
};

// Specialized hook for marketplace WebSocket
export const useMarketplaceWebSocket = (
  onOrderUpdate: (order: Order) => void,
  onNotification: (notification: Notification) => void,
  onProductUpdate: (product: any) => void,
  onConnectionChange: (connected: boolean) => void,
) => {
  const { toast } = useToast();

  const handleMessage = useCallback(
    (data: WebSocketMessage) => {
      switch (data.type) {
        case "NEW_ORDER":
          if (data.order) {
            onOrderUpdate(data.order);
            const notification: Notification = {
              id: Date.now().toString(),
              type: "order",
              title: "Новый заказ",
              message: `Заказ #${data.order.id} создан`,
              isRead: false,
              createdAt: new Date(),
            };
            onNotification(notification);
            toast({
              title: "Новый заказ",
              description: `Заказ #${data.order.id} создан`,
            });
          }
          break;

        case "ORDER_STATUS_UPDATE":
          if (data.order) {
            onOrderUpdate(data.order);
            const notification: Notification = {
              id: Date.now().toString(),
              type: "order",
              title: "Статус заказа изменен",
              message: `Заказ #${data.order.id} - ${data.order.status}`,
              isRead: false,
              createdAt: new Date(),
            };
            onNotification(notification);
          }
          break;

        case "PRODUCT_UPDATE":
          if (data.product) {
            onProductUpdate(data.product);
          }
          break;

        case "NEW_NOTIFICATION":
          if (data.notification) {
            onNotification(data.notification);
            toast({
              title: data.notification.title,
              description: data.notification.message,
            });
          }
          break;
      }
    },
    [onOrderUpdate, onNotification, onProductUpdate, toast],
  );

  return useWebSocket({
    url: "ws://localhost:8080/ws",
    onConnected: () => onConnectionChange(true),
    onDisconnected: () => onConnectionChange(false),
    onMessage: handleMessage,
    onError: (error) => {
      console.error("Marketplace WebSocket error:", error);
      onConnectionChange(false);
    },
  });
};
