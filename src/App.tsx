
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Import Tool Pages
import PasswordGenerator from "./pages/PasswordGenerator";
import IFSCFinder from "./pages/IFSCFinder";
import PINLocator from "./pages/PINLocator";
import CreditCardGenerator from "./pages/CreditCardGenerator";
import TempEmail from "./pages/TempEmail";
import BarcodeGenerator from "./pages/BarcodeGenerator";
import FakeIdentity from "./pages/FakeIdentity";
import LoremIpsum from "./pages/LoremIpsum";
import DateGenerator from "./pages/DateGenerator";
import NumberPlate from "./pages/NumberPlate";

// Import Text Tools
import TextCaseConverter from "./pages/TextCaseConverter";

// Import PDF & Document Tools
import PdfToWord from "./pages/PdfToWord";
import WordToPdf from "./pages/WordToPdf";
import PdfSplitMerge from "./pages/PdfSplitMerge";

// Import Image Tools
import ImageCompressor from "./pages/ImageCompressor";
import ImageConverter from "./pages/ImageConverter";

// Configure the query client with proper settings for faster performance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 30000,
      gcTime: 60000, // Garbage collection time
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Original Tool Routes */}
          <Route path="/password-generator" element={<PasswordGenerator />} />
          <Route path="/ifsc-finder" element={<IFSCFinder />} />
          <Route path="/pin-locator" element={<PINLocator />} />
          <Route path="/credit-card-generator" element={<CreditCardGenerator />} />
          <Route path="/temp-email" element={<TempEmail />} />
          <Route path="/barcode-generator" element={<BarcodeGenerator />} />
          <Route path="/fake-identity" element={<FakeIdentity />} />
          <Route path="/lorem-ipsum" element={<LoremIpsum />} />
          <Route path="/date-generator" element={<DateGenerator />} />
          <Route path="/number-plate" element={<NumberPlate />} />
          
          {/* Text Tool Routes */}
          <Route path="/text-case-converter" element={<TextCaseConverter />} />
          
          {/* PDF & Document Tool Routes */}
          <Route path="/pdf-to-word" element={<PdfToWord />} />
          <Route path="/word-to-pdf" element={<WordToPdf />} />
          <Route path="/pdf-split-merge" element={<PdfSplitMerge />} />
          
          {/* Image Tool Routes */}
          <Route path="/image-compressor" element={<ImageCompressor />} />
          <Route path="/image-converter" element={<ImageConverter />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
