
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ErrorBoundary from './components/ErrorBoundary.tsx'
import { HelmetProvider } from 'react-helmet-async'

// Google Analytics 4 Configuration
declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
    dataLayer: any[];
  }
}

// Initialize Google Analytics
window.dataLayer = window.dataLayer || [];
window.gtag = function() { window.dataLayer.push(arguments); };
window.gtag('js', new Date());
window.gtag('config', 'G-XXXXXXXXXX', { // Replace with your actual GA4 ID
  page_title: document.title,
  page_location: window.location.href
});

// Load Google Analytics script
const gaScript = document.createElement('script');
gaScript.async = true;
gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX'; // Replace with your actual GA4 ID
document.head.appendChild(gaScript);

// Advanced Performance Analytics
const performanceObserver = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    if (entry.entryType === 'navigation') {
      const navEntry = entry as PerformanceNavigationTiming;
      window.gtag('event', 'page_performance', {
        page_load_time: Math.round(navEntry.loadEventEnd - navEntry.fetchStart),
        dom_content_loaded: Math.round(navEntry.domContentLoadedEventEnd - navEntry.fetchStart),
        first_byte: Math.round(navEntry.responseStart - navEntry.fetchStart)
      });
    }
  });
});
performanceObserver.observe({ entryTypes: ['navigation'] });

// Performance optimization
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Service worker registration failed - silent fail
    });
  });
}

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </ErrorBoundary>
);
