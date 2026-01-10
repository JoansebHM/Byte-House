import { useEffect, useState } from "react";
import { usePreloaderContext } from "../context/PreloaderContext";

export const usePreloader = (duration: number = 2000) => {
  const { hasSeenPreloader, setHasSeenPreloader } = usePreloaderContext();
  const [loading, setLoading] = useState(!hasSeenPreloader);

  useEffect(() => {
    if (hasSeenPreloader) {
      // Already handled by initial state, but ensuring consistency
      return;
    }

    const timer = setTimeout(() => {
      setLoading(false);
      setHasSeenPreloader(true);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, hasSeenPreloader, setHasSeenPreloader]);

  return loading;
};
