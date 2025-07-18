// Utility functions for API layer
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";

export const useApiErrorHandler = () => {
  const { toast } = useToast();

  const handleUnauthorizedError = (error: any) => {
    if (isUnauthorizedError(error)) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return true;
    }
    return false;
  };

  const handleGenericError = (error: any, message: string) => {
    if (handleUnauthorizedError(error)) {
      return;
    }
    
    toast({
      title: "Error",
      description: message,
      variant: "destructive",
    });
  };

  return {
    handleUnauthorizedError,
    handleGenericError,
  };
};

export const useApiSuccess = () => {
  const { toast } = useToast();

  const showSuccess = (title: string, description: string) => {
    toast({
      title,
      description,
    });
  };

  return { showSuccess };
};

// Debounce utility for API calls
export const useDebounce = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number
) => {
  const [timeout, setTimeout] = useState<NodeJS.Timeout | null>(null);

  const debouncedCallback = ((...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    
    const newTimeout = globalThis.setTimeout(() => {
      callback(...args);
    }, delay);
    
    setTimeout(newTimeout);
  }) as T;

  return debouncedCallback;
};

// Import React for useState
import { useState } from "react";