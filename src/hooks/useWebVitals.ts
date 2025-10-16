import { useEffect } from 'react';

export const useWebVitals = () => {
  useEffect(() => {
    if ('web-vitals' in window || typeof window === 'undefined') return;

    import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
      // Track Core Web Vitals
      onCLS((metric) => {
        console.log('CLS:', metric.value);
        if (window.gtag) {
          window.gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'CLS',
            value: Math.round(metric.value * 1000),
            non_interaction: true,
          });
        }
      });

      onFCP((metric) => {
        console.log('FCP:', metric.value);
        if (window.gtag) {
          window.gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'FCP',
            value: Math.round(metric.value),
            non_interaction: true,
          });
        }
      });

      onLCP((metric) => {
        console.log('LCP:', metric.value);
        if (window.gtag) {
          window.gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'LCP',
            value: Math.round(metric.value),
            non_interaction: true,
          });
        }
      });

      onTTFB((metric) => {
        console.log('TTFB:', metric.value);
        if (window.gtag) {
          window.gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'TTFB',
            value: Math.round(metric.value),
            non_interaction: true,
          });
        }
      });

      onINP((metric) => {
        console.log('INP:', metric.value);
        if (window.gtag) {
          window.gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'INP',
            value: Math.round(metric.value),
            non_interaction: true,
          });
        }
      });
    }).catch(() => {
      // Web Vitals library failed to load
    });
  }, []);
};
