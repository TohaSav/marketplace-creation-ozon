import React from "react";

interface LoadingIndicatorProps {
  show: boolean;
  message?: string;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  show,
  message = "Загрузка...",
}) => {
  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-blue-500 h-1">
      <div className="h-full bg-blue-600 animate-pulse"></div>
    </div>
  );
};

export const FullPageLoader: React.FC<{ show: boolean }> = ({ show }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Загрузка...</p>
      </div>
    </div>
  );
};

class AjaxLoadingManager {
  private activeRequests = new Set<string>();
  private listeners: Array<(loading: boolean) => void> = [];

  startLoading(requestId: string) {
    this.activeRequests.add(requestId);
    this.notifyListeners();
  }

  stopLoading(requestId: string) {
    this.activeRequests.delete(requestId);
    this.notifyListeners();
  }

  isLoading(): boolean {
    return this.activeRequests.size > 0;
  }

  subscribe(listener: (loading: boolean) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notifyListeners() {
    const isLoading = this.isLoading();
    this.listeners.forEach((listener) => listener(isLoading));
  }
}

export const ajaxLoadingManager = new AjaxLoadingManager();

export const useAjaxLoading = () => {
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = ajaxLoadingManager.subscribe(setLoading);
    return unsubscribe;
  }, []);

  return loading;
};

// Утилита для показа глобального индикатора загрузки
export const withAjaxLoading = <T extends any[]>(
  fn: (...args: T) => Promise<any>,
  requestId?: string,
) => {
  return async (...args: T) => {
    const id = requestId || `request-${Date.now()}`;

    try {
      ajaxLoadingManager.startLoading(id);
      const result = await fn(...args);
      return result;
    } finally {
      ajaxLoadingManager.stopLoading(id);
    }
  };
};
