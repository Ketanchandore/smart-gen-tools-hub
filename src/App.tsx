import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from './context/AuthContext';
import { Toaster } from "@/components/ui/toaster"
import CookieConsent from './components/CookieConsent';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Logout from './pages/Logout';
import PdfToWord from './pages/PdfToWord';
import BarcodeGenerator from './pages/BarcodeGenerator';
import PlaceholderTool from './pages/PlaceholderTool';
import { Rocket, Palette, Calculator, FileText, Image as ImageIcon } from 'lucide-react';
import AdvancedSEO from '@/components/AdvancedSEO';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <div className="min-h-screen bg-background text-foreground">
            <Router>
              <AdvancedSEO />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/logout" element={<Logout />} />
                
                {/* PDF Tools */}
                <Route path="/pdf-to-word" element={<PdfToWord />} />
                
                {/* AI Generator Tools */}
                <Route path="/barcode-generator" element={<BarcodeGenerator />} />

                {/* Placeholder Pages */}
                <Route 
                  path="/ai-generators" 
                  element={<PlaceholderTool title="AI Generators" description="Explore our suite of AI-powered tools to boost your creativity and productivity." icon={<Rocket />} />} 
                />
                <Route 
                  path="/color-picker" 
                  element={<PlaceholderTool title="Color Picker" description="Discover and generate color palettes for your next design project." icon={<Palette />} />} 
                />
                <Route 
                  path="/calculator" 
                  element={<PlaceholderTool title="Calculator" description="Smart online calculators for everyday needs." icon={<Calculator />} />} 
                />
                <Route 
                  path="/pdf-tools" 
                  element={<PlaceholderTool title="PDF Tools" description="Convert, merge, split, and compress PDFs with ease." icon={<FileText />} />} 
                />
                <Route 
                  path="/image-generator" 
                  element={<PlaceholderTool title="Image Generator" description="Create unique images with our AI-powered generator." icon={<ImageIcon />} />} 
                />
              </Routes>
            </Router>
            <Toaster />
            <CookieConsent />
          </div>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
