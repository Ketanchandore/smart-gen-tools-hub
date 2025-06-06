
// Analytics and performance tracking utilities
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  // In production, integrate with Google Analytics, Mixpanel, etc.
  if (process.env.NODE_ENV === 'development') {
    console.log('Event tracked:', eventName, properties);
  }
  
  // Example Google Analytics tracking
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, properties);
  }
};

export const trackPageView = (path: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', 'GA_TRACKING_ID', {
      page_path: path,
    });
  }
};

export const trackToolUsage = (toolName: string, action: string) => {
  trackEvent('tool_usage', {
    tool_name: toolName,
    action: action,
    timestamp: new Date().toISOString()
  });
};

export const trackPerformance = (metricName: string, value: number) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'timing_complete', {
      name: metricName,
      value: Math.round(value)
    });
  }
};
