import { useState, useCallback } from "react";

export const useAsyncAction = <T>(action: () => Promise<T>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      await action();
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [action]);

  return { isLoading, error, execute };
};
