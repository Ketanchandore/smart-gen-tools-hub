import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import ResumeBuilder from './pages/ResumeBuilder';
import PdfToWord from './pages/PdfToWord';
import WordToPdf from './pages/WordToPdf';
import PdfSplitMerge from './pages/PdfSplitMerge';
import QrCode from './pages/QrCode';
import PasswordGenerator from './pages/PasswordGenerator';
import TextCaseConverter from './pages/TextCaseConverter';
import BarcodeGenerator from './pages/BarcodeGenerator';
import CreditCardGenerator from './pages/CreditCardGenerator';
import DateGenerator from './pages/DateGenerator';
import FakeIdentity from './pages/FakeIdentity';
import IFSCFinder from './pages/IFSCFinder';
import NumberPlate from './pages/NumberPlate';
import PINLocator from './pages/PINLocator';
import TempEmail from './pages/TempEmail';
import { ThemeProvider } from './contexts/ThemeContext';
import { Toaster } from "@/components/ui/toaster"
import { QueryClient } from 'react-query';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import FAQ from './pages/FAQ';
import Blog from './pages/Blog';
import SocialCaptions from './pages/SocialCaptions';
import BlogWriter from './pages/BlogWriter';
import PdfToExcel from './pages/PdfToExcel';
import PdfToPowerpoint from './pages/PdfToPowerpoint';
import PowerpointToPdf from './pages/PowerpointToPdf';
import ExcelToPdf from './pages/ExcelToPdf';
import PdfToJpg from './pages/PdfToJpg';
import SignPdf from './pages/SignPdf';

function App() {
  return (
    <QueryClient>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-background text-foreground">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/resume-builder" element={<ResumeBuilder />} />
              <Route path="/pdf-to-word" element={<PdfToWord />} />
              <Route path="/word-to-pdf" element={<WordToPdf />} />
              <Route path="/pdf-split-merge" element={<PdfSplitMerge />} />
              <Route path="/qr-code" element={<QrCode />} />
              <Route path="/password-generator" element={<PasswordGenerator />} />
              <Route path="/text-case-converter" element={<TextCaseConverter />} />
              <Route path="/barcode-generator" element={<BarcodeGenerator />} />
              <Route path="/credit-card-generator" element={<CreditCardGenerator />} />
              <Route path="/date-generator" element={<DateGenerator />} />
              <Route path="/fake-identity" element={<FakeIdentity />} />
              <Route path="/ifsc-finder" element={<IFSCFinder />} />
              <Route path="/number-plate" element={<NumberPlate />} />
              <Route path="/pin-locator" element={<PINLocator />} />
              <Route path="/temp-email" element={<TempEmail />} />
              <Route path="/social-captions" element={<SocialCaptions />} />
              <Route path="/blog-writer" element={<BlogWriter />} />
              <Route path="/pdf-to-excel" element={<PdfToExcel />} />
              <Route path="/pdf-to-powerpoint" element={<PdfToPowerpoint />} />
              <Route path="/powerpoint-to-pdf" element={<PowerpointToPdf />} />
              <Route path="/excel-to-pdf" element={<ExcelToPdf />} />
              <Route path="/pdf-to-jpg" element={<PdfToJpg />} />
              <Route path="/sign-pdf" element={<SignPdf />} />
              
              {/* New SEO and Legal Pages */}
              <Route path="/about" element={<Layout><About /></Layout>} />
              <Route path="/contact" element={<Layout><Contact /></Layout>} />
              <Route path="/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />
              <Route path="/terms" element={<Layout><Terms /></Layout>} />
              <Route path="/faq" element={<Layout><FAQ /></Layout>} />
              <Route path="/blog" element={<Layout><Blog /></Layout>} />
              
              {/* 404 Route */}
              <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </ThemeProvider>
    </QueryClient>
  );
}

export default App;

import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SEOHead from './components/SEOHead';
import CookieConsent from './components/CookieConsent';
import WhatsAppShare from './components/WhatsAppShare';
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
