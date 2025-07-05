
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import SEOHead from './SEOHead';
import CookieConsent from './CookieConsent';
import WhatsAppShare from './WhatsAppShare';
import { usePerformanceOptimization } from '@/hooks/usePerformanceOptimization';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title, description }) => {
  usePerformanceOptimization();

  return (
    <div className="flex flex-col min-h-screen">
      <SEOHead title={title} description={description} />
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <CookieConsent />
      <WhatsAppShare />
    </div>
  );
};

export default Layout;
