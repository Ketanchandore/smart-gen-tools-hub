import { useEffect, useCallback } from 'react';

export const usePerformanceOptimization = () => {
  // Preload critical resources
  const preloadResource = useCallback((href: string, as: string, crossOrigin?: string) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (crossOrigin) link.crossOrigin = crossOrigin;
    document.head.appendChild(link);
  }, []);

  // DNS Prefetch for external resources
  const dnsPrefetch = useCallback((href: string) => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = href;
    document.head.appendChild(link);
  }, []);

  // Preconnect to critical domains
  const preconnect = useCallback((href: string, crossOrigin?: boolean) => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = href;
    if (crossOrigin) link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  }, []);

  // Lazy load images with IntersectionObserver
  const setupLazyLoading = useCallback(() => {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
              }
            }
          });
        },
        {
          rootMargin: '50px',
          threshold: 0.01,
        }
      );

      document.querySelectorAll('img[data-src]').forEach((img) => {
        imageObserver.observe(img);
      });

      return () => imageObserver.disconnect();
    }
  }, []);

  // Prefetch next likely routes
  const prefetchRoute = useCallback((route: string) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = route;
    link.as = 'document';
    document.head.appendChild(link);
  }, []);

  // Defer non-critical scripts
  const deferScript = useCallback((src: string, async = true) => {
    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    if (async) script.async = true;
    document.body.appendChild(script);
  }, []);

  // Optimize fonts loading
  const optimizeFonts = useCallback(() => {
    if ('fonts' in document) {
      // Use font-display: swap for custom fonts
      document.fonts.ready.then(() => {
        document.documentElement.classList.add('fonts-loaded');
      });
    }
  }, []);

  // Performance optimization on mount
  useEffect(() => {
    // DNS prefetch for external resources
    dnsPrefetch('https://fonts.googleapis.com');
    dnsPrefetch('https://www.googletagmanager.com');
    
    // Preconnect to critical domains
    preconnect('https://fonts.googleapis.com', true);
    preconnect('https://fonts.gstatic.com', true);
    
    // Setup lazy loading
    const cleanup = setupLazyLoading();

    // Optimize fonts
    optimizeFonts();

    // Prefetch likely next routes
    const prefetchRoutes = ['/pricing', '/blog', '/about', '/contact'];
    const timeoutId = setTimeout(() => {
      prefetchRoutes.forEach((route) => prefetchRoute(route));
    }, 2000);

    // Reduce layout shift by reserving space for images
    document.querySelectorAll('img:not([width]):not([height])').forEach((img) => {
      const htmlImg = img as HTMLImageElement;
      if (!htmlImg.style.aspectRatio && htmlImg.naturalWidth && htmlImg.naturalHeight) {
        htmlImg.style.aspectRatio = `${htmlImg.naturalWidth} / ${htmlImg.naturalHeight}`;
      }
    });

    return () => {
      clearTimeout(timeoutId);
      if (cleanup) cleanup();
    };
  }, [dnsPrefetch, preconnect, setupLazyLoading, optimizeFonts, prefetchRoute]);

  return {
    preloadResource,
    dnsPrefetch,
    preconnect,
    setupLazyLoading,
    prefetchRoute,
    deferScript,
    optimizeFonts,
  };
};
