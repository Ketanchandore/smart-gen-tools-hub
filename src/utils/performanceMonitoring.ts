// Performance monitoring utilities

export const logPerformanceMetrics = () => {
  if (typeof window === 'undefined') return;

  // Log navigation timing
  if (window.performance && window.performance.getEntriesByType) {
    const perfData = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (perfData) {
      const metrics = {
        dns: perfData.domainLookupEnd - perfData.domainLookupStart,
        tcp: perfData.connectEnd - perfData.connectStart,
        ttfb: perfData.responseStart - perfData.requestStart,
        download: perfData.responseEnd - perfData.responseStart,
        domInteractive: perfData.domInteractive - perfData.fetchStart,
        domComplete: perfData.domComplete - perfData.fetchStart,
        loadComplete: perfData.loadEventEnd - perfData.fetchStart,
      };

      console.log('Performance Metrics:', metrics);
      
      // Send to analytics if available
      if (window.gtag) {
        window.gtag('event', 'performance_metrics', {
          event_category: 'Performance',
          dns_time: Math.round(metrics.dns),
          ttfb: Math.round(metrics.ttfb),
          load_time: Math.round(metrics.loadComplete),
          non_interaction: true,
        });
      }
    }
  }
};

export const measureComponentRender = (componentName: string) => {
  if (typeof window === 'undefined') return () => {};

  const startMark = `${componentName}-start`;
  const endMark = `${componentName}-end`;
  const measureName = `${componentName}-render`;

  performance.mark(startMark);

  return () => {
    performance.mark(endMark);
    performance.measure(measureName, startMark, endMark);
    
    const measure = performance.getEntriesByName(measureName)[0];
    if (measure) {
      console.log(`${componentName} render time:`, measure.duration.toFixed(2), 'ms');
    }
    
    // Clean up marks
    performance.clearMarks(startMark);
    performance.clearMarks(endMark);
    performance.clearMeasures(measureName);
  };
};

export const reportLongTasks = () => {
  if (!('PerformanceObserver' in window)) return;

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.warn('Long Task detected:', entry);
        
        if (window.gtag) {
          window.gtag('event', 'long_task', {
            event_category: 'Performance',
            duration: Math.round(entry.duration),
            non_interaction: true,
          });
        }
      }
    });

    observer.observe({ entryTypes: ['longtask'] });
  } catch (e) {
    // Long task API not supported
  }
};

// Resource timing analysis
export const analyzeResourceTiming = () => {
  if (typeof window === 'undefined') return;

  const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
  
  const resourcesByType = resources.reduce((acc, resource) => {
    const type = resource.initiatorType;
    if (!acc[type]) {
      acc[type] = { count: 0, totalSize: 0, totalDuration: 0 };
    }
    acc[type].count++;
    acc[type].totalDuration += resource.duration;
    
    // @ts-ignore - transferSize may not be available in all browsers
    if (resource.transferSize) {
      // @ts-ignore
      acc[type].totalSize += resource.transferSize;
    }
    
    return acc;
  }, {} as Record<string, { count: number; totalSize: number; totalDuration: number }>);

  console.log('Resource Timing Summary:', resourcesByType);
  
  return resourcesByType;
};

// Check if browser supports modern features
export const checkBrowserCapabilities = () => {
  const capabilities = {
    serviceWorker: 'serviceWorker' in navigator,
    webp: false,
    avif: false,
    intersectionObserver: 'IntersectionObserver' in window,
    performanceObserver: 'PerformanceObserver' in window,
    requestIdleCallback: 'requestIdleCallback' in window,
    webWorker: typeof Worker !== 'undefined',
  };

  // Check image format support
  const checkImageFormat = (format: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL(`image/${format}`).indexOf(`data:image/${format}`) === 0;
  };

  capabilities.webp = checkImageFormat('webp');
  
  return capabilities;
};
