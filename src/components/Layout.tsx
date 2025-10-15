import React, { Suspense } from 'react';
import EnhancedNavbar from './EnhancedNavbar';
import Footer from './Footer';
import SEOHead from './SEOHead';
import CookieConsent from './CookieConsent';
import { usePerformanceOptimization } from '@/hooks/usePerformanceOptimization';
import { useWebVitals } from '@/hooks/useWebVitals';
import SkeletonLoader from './SkeletonLoader';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title, description }) => {
  usePerformanceOptimization();
  useWebVitals();

  return (
    <div className="flex flex-col min-h-screen">
      <SEOHead title={title} description={description} />
      <EnhancedNavbar />
      <main className="flex-grow">
        <Suspense fallback={<SkeletonLoader variant="grid" count={1} className="container mx-auto py-8" />}>
          {children}
        </Suspense>
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Layout;
