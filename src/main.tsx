import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ErrorBoundary from './components/ErrorBoundary.tsx'
import { HelmetProvider } from 'react-helmet-async'
import { logPerformanceMetrics, reportLongTasks } from './utils/performanceMonitoring'

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
window.gtag('config', 'G-MZ61E1T4YH', {
  page_title: document.title,
  page_location: window.location.href,
  send_page_view: true,
});

// Load Google Analytics script asynchronously
const gaScript = document.createElement('script');
gaScript.async = true;
gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-MZ61E1T4YH';
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

// Service Worker registration with update handling
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then((registration) => {
        console.log('ServiceWorker registered:', registration);

        // Check for updates every hour
        setInterval(() => {
          registration.update();
        }, 60 * 60 * 1000);

        // Handle updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New service worker available, prompt user to refresh
                console.log('New version available! Refresh to update.');
              }
            });
          }
        });
      })
      .catch((error) => {
        console.log('ServiceWorker registration failed:', error);
      });
  });
}

// Log performance metrics after page load
window.addEventListener('load', () => {
  // Wait for all resources to load
  setTimeout(() => {
    logPerformanceMetrics();
    reportLongTasks();
  }, 0);
});

// Render app
createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </ErrorBoundary>
);
