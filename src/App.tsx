
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import BarcodeGenerator from "./pages/BarcodeGenerator";
import CreditCardGenerator from "./pages/CreditCardGenerator";
import DateGenerator from "./pages/DateGenerator";
import FakeIdentity from "./pages/FakeIdentity";
import IFSCFinder from "./pages/IFSCFinder";
import ImageCompressor from "./pages/ImageCompressor";
import ImageConverter from "./pages/ImageConverter";
import LoremIpsum from "./pages/LoremIpsum";
import NotFound from "./pages/NotFound";
import NumberPlate from "./pages/NumberPlate";
import PasswordGenerator from "./pages/PasswordGenerator";
import PINLocator from "./pages/PINLocator";
import TextCaseConverter from "./pages/TextCaseConverter";
import TempEmail from "./pages/TempEmail";
import WordToPdf from "./pages/WordToPdf";
import PdfToWord from "./pages/PdfToWord";
import PdfSplitMerge from "./pages/PdfSplitMerge";
import { Toaster } from "./components/ui/toaster";

// Create a client
const queryClient = new QueryClient();

function App() {
  // Handle dark mode 
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode !== null ? JSON.parse(savedMode) : true;
  });

  // Set body class for dark/light mode
  document.documentElement.classList.toggle("dark", darkMode);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout><Outlet /></Layout>}>
            <Route index element={<Index />} />
            <Route path="/barcode-generator" element={<BarcodeGenerator />} />
            <Route path="/credit-card-generator" element={<CreditCardGenerator />} />
            <Route path="/date-generator" element={<DateGenerator />} />
            <Route path="/fake-identity" element={<FakeIdentity />} />
            <Route path="/ifsc-finder" element={<IFSCFinder />} />
            <Route path="/image-compressor" element={<ImageCompressor />} />
            <Route path="/image-converter" element={<ImageConverter />} />
            <Route path="/lorem-ipsum" element={<LoremIpsum />} />
            <Route path="/number-plate" element={<NumberPlate />} />
            <Route path="/password-generator" element={<PasswordGenerator />} />
            <Route path="/pin-locator" element={<PINLocator />} />
            <Route path="/text-case-converter" element={<TextCaseConverter />} />
            <Route path="/temp-email" element={<TempEmail />} />
            <Route path="/word-to-pdf" element={<WordToPdf />} />
            <Route path="/pdf-to-word" element={<PdfToWord />} />
            <Route path="/pdf-split-merge" element={<PdfSplitMerge />} />
            
            {/* Redirect all other routes to 404 */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
