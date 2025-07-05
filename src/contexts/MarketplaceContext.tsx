import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import {
  MarketplaceContextType,
  MarketplaceState,
  Order,
  Notification,
} from "@/types/marketplace";
import { marketplaceReducer, initialState } from "@/store/marketplace/reducers";
import { useMarketplaceActions } from "@/hooks/useMarketplaceActions";
import { useMarketplaceWebSocket } from "@/hooks/useWebSocket";

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(
  undefined,
);

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error("useMarketplace must be used within a MarketplaceProvider");
  }
  return context;
};

interface MarketplaceProviderProps {
  children: ReactNode;
}

export const MarketplaceProvider: React.FC<MarketplaceProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(marketplaceReducer, initialState);

  // Get all marketplace actions
  const actions = useMarketplaceActions({ dispatch, state });

  // WebSocket handlers
  const handleOrderUpdate = (order: Order) => {
    dispatch({ type: "ADD_ORDER", payload: order });
  };

  const handleNotificationReceived = (notification: Notification) => {
    dispatch({ type: "ADD_NOTIFICATION", payload: notification });
  };

  const handleProductUpdate = (product: any) => {
    dispatch({ type: "UPDATE_PRODUCT", payload: product });
  };

  const handleConnectionChange = (connected: boolean) => {
    dispatch({ type: "SET_CONNECTED", payload: connected });
  };

  // Initialize WebSocket connection
  const { isConnected, sendMessage, disconnect, reconnect } =
    useMarketplaceWebSocket(
      handleOrderUpdate,
      handleNotificationReceived,
      handleProductUpdate,
      handleConnectionChange,
    );

  // Load initial data
  useEffect(() => {
    actions.loadProducts();
  }, []);

  // Update connection state
  useEffect(() => {
    dispatch({ type: "SET_CONNECTED", payload: isConnected });
  }, [isConnected]);

  const value: MarketplaceContextType = {
    state,
    ...actions,
  };

  return (
    <MarketplaceContext.Provider value={value}>
      {children}
    </MarketplaceContext.Provider>
  );
};
