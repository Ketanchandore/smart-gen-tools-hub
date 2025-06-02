
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Toaster } from '@/components/ui/toaster';
import Home from '@/pages/Home';
import MergePdf from '@/pages/MergePdf';
import CompressPdf from '@/pages/CompressPdf';
import SplitPdf from '@/pages/SplitPdf';
import WatermarkPdf from '@/pages/WatermarkPdf';
import PageNumbersPdf from '@/pages/PageNumbersPdf';
import JpgToPdf from '@/pages/JpgToPdf';
import PdfToJpg from '@/pages/PdfToJpg';
import ExcelToPdf from '@/pages/ExcelToPdf';
import PdfToExcel from '@/pages/PdfToExcel';
import PowerpointToPdf from '@/pages/PowerpointToPdf';
import PdfToPowerpoint from '@/pages/PdfToPowerpoint';
import EditPdf from '@/pages/EditPdf';
import CropPdf from '@/pages/CropPdf';
import ComparePdf from '@/pages/ComparePdf';
import OcrPdf from '@/pages/OcrPdf';
import PdfToPdfa from '@/pages/PdfToPdfa';
import OrganizePdf from '@/pages/OrganizePdf';
import HtmlToPdf from '@/pages/HtmlToPdf';
import ProtectPdf from '@/pages/ProtectPdf';
import UnlockPdf from '@/pages/UnlockPdf';
import RotatePdf from '@/pages/RotatePdf';
import PdfSplitMerge from '@/pages/PdfSplitMerge';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/merge-pdf" element={<MergePdf />} />
            <Route path="/compress-pdf" element={<CompressPdf />} />
            <Route path="/split-pdf" element={<SplitPdf />} />
            <Route path="/watermark-pdf" element={<WatermarkPdf />} />
            <Route path="/page-numbers-pdf" element={<PageNumbersPdf />} />
            <Route path="/jpg-to-pdf" element={<JpgToPdf />} />
            <Route path="/pdf-to-jpg" element={<PdfToJpg />} />
            <Route path="/excel-to-pdf" element={<ExcelToPdf />} />
            <Route path="/pdf-to-excel" element={<PdfToExcel />} />
            <Route path="/powerpoint-to-pdf" element={<PowerpointToPdf />} />
            <Route path="/pdf-to-powerpoint" element={<PdfToPowerpoint />} />
            <Route path="/edit-pdf" element={<EditPdf />} />
            <Route path="/crop-pdf" element={<CropPdf />} />
            <Route path="/compare-pdf" element={<ComparePdf />} />
            <Route path="/ocr-pdf" element={<OcrPdf />} />
            <Route path="/pdf-to-pdfa" element={<PdfToPdfa />} />
            <Route path="/organize-pdf" element={<OrganizePdf />} />
            <Route path="/html-to-pdf" element={<HtmlToPdf />} />
            <Route path="/protect-pdf" element={<ProtectPdf />} />
            <Route path="/unlock-pdf" element={<UnlockPdf />} />
            <Route path="/rotate-pdf" element={<RotatePdf />} />
            <Route path="/pdf-split-merge" element={<PdfSplitMerge />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
