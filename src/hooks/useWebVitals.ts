import { useEffect } from 'react';

interface WebVitalsMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

export const useWebVitals = (reportCallback?: (metric: WebVitalsMetric) => void) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
      const handleMetric = (metric: any) => {
        // Send to analytics
        if (window.gtag) {
          window.gtag('event', metric.name, {
            value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
            metric_id: metric.id,
            metric_value: metric.value,
            metric_delta: metric.delta,
            metric_rating: metric.rating,
            event_category: 'Web Vitals',
            event_label: metric.id,
            non_interaction: true
          });
        }

        // Call custom callback
        if (reportCallback) {
          reportCallback(metric);
        }

        // Console log in development
        if (process.env.NODE_ENV === 'development') {
          console.log(`[Web Vitals] ${metric.name}:`, {
            value: metric.value,
            rating: metric.rating,
            delta: metric.delta
          });
        }
      };

      // Track all Core Web Vitals (INP replaces FID)
      onCLS(handleMetric);
      onFCP(handleMetric);
      onLCP(handleMetric);
      onTTFB(handleMetric);
      onINP(handleMetric);
    }).catch((error) => {
      console.warn('Web Vitals could not be loaded:', error);
    });
  }, [reportCallback]);
};

export default useWebVitals;