import React from 'react';
import EnhancedNavbar from './EnhancedNavbar';
import Footer from './Footer';
import SEOHead from './SEOHead';
import CookieConsent from './CookieConsent';
import { usePerformanceOptimization } from '@/hooks/usePerformanceOptimization';
import { useWebVitals } from '@/hooks/useWebVitals';

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
      <main className="flex-grow">{children}</main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Layout;
