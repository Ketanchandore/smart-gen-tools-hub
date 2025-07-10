// Performance utilities for optimal loading
export const preloadRoute = (route: string) => {
  if (typeof window !== 'undefined') {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = route;
    document.head.appendChild(link);
  }
};

export const preloadImage = (src: string) => {
  if (typeof window !== 'undefined') {
    const img = new Image();
    img.src = src;
  }
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Critical resource preloading
export const preloadCriticalResources = () => {
  const criticalRoutes = ['/pdf-tools', '/ai-tools', '/calculators'];
  criticalRoutes.forEach(preloadRoute);
};