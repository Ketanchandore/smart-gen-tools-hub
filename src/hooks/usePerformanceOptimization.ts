import { useEffect, useCallback } from 'react';

export const usePerformanceOptimization = () => {
  // Preload critical resources with priority
  const preloadResource = useCallback((href: string, as: string, priority: 'high' | 'low' = 'high') => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (priority === 'high') {
      link.setAttribute('fetchpriority', 'high');
    }
    document.head.appendChild(link);
  }, []);

  // DNS prefetch for external resources
  const dnsPrefetch = useCallback((domains: string[]) => {
    domains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    });
  }, []);

  // Preconnect to critical origins
  const preconnect = useCallback((origins: string[]) => {
    origins.forEach(origin => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = origin;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }, []);

  // Enhanced lazy loading with IntersectionObserver
  const setupLazyLoading = useCallback(() => {
    if (!('IntersectionObserver' in window)) return;

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
        threshold: 0.01
      }
    );

    document.querySelectorAll('img[data-src]').forEach((img) => {
      imageObserver.observe(img);
    });

    return () => imageObserver.disconnect();
  }, []);

  // Optimize font loading
  const optimizeFontLoading = useCallback(() => {
    if ('fonts' in document) {
      // Force font loading for critical text
      (document as any).fonts.load('1em Inter').catch(() => {});
    }
  }, []);

  // Defer non-critical scripts
  const deferScripts = useCallback(() => {
    document.querySelectorAll('script[data-defer]').forEach((script) => {
      const newScript = document.createElement('script');
      newScript.src = script.getAttribute('src') || '';
      newScript.defer = true;
      script.parentNode?.replaceChild(newScript, script);
    });
  }, []);

  // Reduce layout shift by reserving space
  const preventLayoutShift = useCallback(() => {
    document.querySelectorAll('img:not([width]):not([height])').forEach((img) => {
      const aspectRatio = (img as HTMLImageElement).naturalWidth / (img as HTMLImageElement).naturalHeight;
      if (aspectRatio) {
        img.setAttribute('style', `aspect-ratio: ${aspectRatio}`);
      }
    });
  }, []);

  // Optimize bundle loading and setup
  useEffect(() => {
    // DNS prefetch for external resources
    dnsPrefetch([
      'https://fonts.googleapis.com',
      'https://www.googletagmanager.com'
    ]);

    // Preconnect to critical origins
    preconnect([
      'https://fonts.gstatic.com',
      'https://www.google-analytics.com'
    ]);

    // Setup lazy loading
    const cleanup = setupLazyLoading();

    // Optimize fonts
    optimizeFontLoading();

    // Defer non-critical scripts
    if (typeof requestIdleCallback === 'function') {
      requestIdleCallback(() => {
        deferScripts();
      });
    } else {
      setTimeout(deferScripts, 100);
    }

    // Prefetch likely next routes
    const prefetchRoutes = ['/pricing', '/blog', '/tools'];
    if (typeof requestIdleCallback === 'function') {
      requestIdleCallback(() => {
        prefetchRoutes.forEach(route => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = route;
          document.head.appendChild(link);
        });
      });
    } else {
      setTimeout(() => {
        prefetchRoutes.forEach(route => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = route;
          document.head.appendChild(link);
        });
      }, 300);
    }

    // Prevent layout shift
    if (document.readyState === 'complete') {
      preventLayoutShift();
    } else {
      window.addEventListener('load', preventLayoutShift);
    }

    return () => {
      cleanup?.();
      window.removeEventListener('load', preventLayoutShift);
    };
  }, [dnsPrefetch, preconnect, setupLazyLoading, optimizeFontLoading, deferScripts, preventLayoutShift]);

  return {
    preloadResource,
    dnsPrefetch,
    preconnect,
    setupLazyLoading,
    optimizeFontLoading
  };
};
