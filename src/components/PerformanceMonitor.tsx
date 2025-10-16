import { useEffect } from 'react';
import { analyzeResourceTiming, checkBrowserCapabilities } from '@/utils/performanceMonitoring';

export const PerformanceMonitor: React.FC = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Log browser capabilities
      const capabilities = checkBrowserCapabilities();
      console.log('Browser Capabilities:', capabilities);

      // Analyze resource timing after page load
      const timeoutId = setTimeout(() => {
        analyzeResourceTiming();
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, []);

  return null;
};
