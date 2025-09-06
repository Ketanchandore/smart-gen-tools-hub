import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

// Extend global object to include gtag
declare global {
  function gtag(...args: any[]): void;
}

interface SEOConfig {
  enableAnalytics?: boolean;
  enableHeatmap?: boolean;
  enableCoreWebVitals?: boolean;
  enableInternalLinking?: boolean;
}

export const useAdvancedSEO = (config: SEOConfig = {}) => {
  const location = useLocation();
  
  const {
    enableAnalytics = true,
    enableHeatmap = false,
    enableCoreWebVitals = true,
    enableInternalLinking = true
  } = config;

  // Core Web Vitals tracking
  const trackCoreWebVitals = useCallback(() => {
    if (!enableCoreWebVitals) return;

    // Track Largest Contentful Paint (LCP)
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      
      // Track LCP
      if (lastEntry && ('renderTime' in lastEntry || 'loadTime' in lastEntry)) {
        const lcp = lastEntry.renderTime || lastEntry.loadTime || 0;
        console.log('LCP:', lcp);
        
        // Send to analytics if available
        if (typeof gtag !== 'undefined') {
          gtag('event', 'web_vitals', {
            name: 'LCP',
            value: Math.round(lcp as number),
            event_category: 'Performance'
          });
        }
      }
    });

    observer.observe({ type: 'largest-contentful-paint', buffered: true });

    // Track First Input Delay (FID)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if ('processingStart' in entry) {
          const fid = (entry.processingStart as number) - entry.startTime;
          console.log('FID:', fid);
          
          if (typeof gtag !== 'undefined') {
            gtag('event', 'web_vitals', {
              name: 'FID',
              value: Math.round(fid),
              event_category: 'Performance'
            });
          }
        }
      });
    });

    fidObserver.observe({ type: 'first-input', buffered: true });

    // Track Cumulative Layout Shift (CLS)
    let clsValue = 0;
    let clsEntries: PerformanceEntry[] = [];

    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if ('value' in entry && !entry.hadRecentInput) {
          clsValue += (entry.value as number) || 0;
          clsEntries.push(entry);
        }
      });
    });

    clsObserver.observe({ type: 'layout-shift', buffered: true });

    // Report CLS when page visibility changes
    const reportCLS = () => {
      console.log('CLS:', clsValue);
      
      if (typeof gtag !== 'undefined') {
        gtag('event', 'web_vitals', {
          name: 'CLS',
          value: Math.round(clsValue * 1000),
          event_category: 'Performance'
        });
      }
    };

    document.addEventListener('visibilitychange', reportCLS, { once: true });

    return () => {
      observer.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
      document.removeEventListener('visibilitychange', reportCLS);
    };
  }, [enableCoreWebVitals]);

  // Advanced page tracking
  const trackPageView = useCallback((url: string, title: string) => {
    if (!enableAnalytics) return;

    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('config', 'G-MEASUREMENT-ID', {
        page_path: url,
        page_title: title,
        page_location: window.location.href
      });
      
      // Custom event for tool usage
      if (url.includes('/')) {
        const toolName = url.split('/')[1];
        gtag('event', 'tool_view', {
          tool_name: toolName,
          page_path: url,
          event_category: 'Tools'
        });
      }
    }

    // Track user engagement
    const startTime = Date.now();
    let scrollDepth = 0;
    let maxScrollDepth = 0;

    const trackScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollDepth = Math.round((scrollTop / docHeight) * 100);
      maxScrollDepth = Math.max(maxScrollDepth, scrollDepth);
    };

    const trackEngagement = () => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000);
      
      if (typeof gtag !== 'undefined') {
        gtag('event', 'user_engagement', {
          engagement_time_msec: timeOnPage * 1000,
          page_path: url,
          scroll_depth: maxScrollDepth,
          event_category: 'Engagement'
        });
      }
    };

    window.addEventListener('scroll', trackScroll, { passive: true });
    window.addEventListener('beforeunload', trackEngagement);

    return () => {
      window.removeEventListener('scroll', trackScroll);
      window.removeEventListener('beforeunload', trackEngagement);
    };
  }, [enableAnalytics]);

  // Internal linking optimization
  const optimizeInternalLinks = useCallback(() => {
    if (!enableInternalLinking) return;

    // Add rel="noopener" to external links
    const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="pinetoolshub.com"])');
    externalLinks.forEach(link => {
      link.setAttribute('rel', 'noopener noreferrer');
      link.setAttribute('target', '_blank');
    });

    // Add title attributes to internal links for better UX
    const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="#"]');
    internalLinks.forEach(link => {
      const href = link.getAttribute('href');
      const text = link.textContent?.trim();
      
      if (href && text && !link.getAttribute('title')) {
        link.setAttribute('title', `Visit ${text} - Pine Tools Hub`);
      }
    });

    // Track internal link clicks
    const trackLinkClick = (event: Event) => {
      const target = event.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.href) {
        const isInternal = target.href.includes('pinetoolshub.com') || target.href.startsWith('/');
        
        if (typeof gtag !== 'undefined') {
          gtag('event', 'click', {
            event_category: isInternal ? 'Internal Link' : 'External Link',
            event_label: target.href,
            value: 1
          });
        }
      }
    };

    document.addEventListener('click', trackLinkClick);

    return () => {
      document.removeEventListener('click', trackLinkClick);
    };
  }, [enableInternalLinking]);

  // Preload critical resources
  const preloadCriticalResources = useCallback(() => {
    const criticalResources = [
      '/placeholder.svg',
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      link.as = resource.includes('.css') ? 'style' : 'image';
      if (resource.includes('font')) {
        link.crossOrigin = 'anonymous';
      }
      document.head.appendChild(link);
    });
  }, []);

  // Generate breadcrumbs from URL
  const generateBreadcrumbs = useCallback((pathname: string) => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ name: 'Home', url: '/' }];

    let currentPath = '';
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const name = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      breadcrumbs.push({
        name,
        url: currentPath
      });
    });

    return breadcrumbs;
  }, []);

  // Initialize SEO optimizations
  useEffect(() => {
    const cleanupFunctions: Array<(() => void) | undefined> = [];

    // Track page view
    const title = document.title;
    const cleanup1 = trackPageView(location.pathname, title);
    if (cleanup1) cleanupFunctions.push(cleanup1);

    // Track core web vitals
    const cleanup2 = trackCoreWebVitals();
    if (cleanup2) cleanupFunctions.push(cleanup2);

    // Optimize internal links
    const cleanup3 = optimizeInternalLinks();
    if (cleanup3) cleanupFunctions.push(cleanup3);

    // Preload critical resources (only once)
    if (location.pathname === '/') {
      preloadCriticalResources();
    }

    return () => {
      cleanupFunctions.forEach(cleanup => cleanup?.());
    };
  }, [location.pathname, trackPageView, trackCoreWebVitals, optimizeInternalLinks, preloadCriticalResources]);

  return {
    generateBreadcrumbs,
    trackPageView,
    trackCoreWebVitals,
    optimizeInternalLinks
  };
};