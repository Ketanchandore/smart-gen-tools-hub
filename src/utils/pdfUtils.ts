
import { PDFDocument, rgb, StandardFonts, PageSizes, degrees } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface PDFProcessingOptions {
  quality?: number;
  compression?: boolean;
  password?: string;
  watermarkText?: string;
  watermarkOpacity?: number;
  pageNumbers?: boolean;
  orientation?: 'portrait' | 'landscape';
}

export class PDFProcessor {
  static async mergePDFs(pdfFiles: File[]): Promise<Uint8Array> {
    const mergedPdf = await PDFDocument.create();
    
    for (const file of pdfFiles) {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }
    
    return await mergedPdf.save();
  }

  static async splitPDF(pdfFile: File, pageRanges: { start: number; end: number }[]): Promise<Uint8Array[]> {
    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const results: Uint8Array[] = [];
    
    for (const range of pageRanges) {
      const newPdf = await PDFDocument.create();
      const pages = await newPdf.copyPages(pdf, Array.from(
        { length: range.end - range.start + 1 }, 
        (_, i) => range.start + i - 1
      ));
      pages.forEach(page => newPdf.addPage(page));
      results.push(await newPdf.save());
    }
    
    return results;
  }

  static async compressPDF(pdfFile: File, quality: number = 0.7): Promise<Uint8Array> {
    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    
    // Basic compression by re-saving with reduced quality
    return await pdf.save({
      useObjectStreams: true,
      addDefaultPage: false,
    });
  }

  static async addWatermark(
    pdfFile: File, 
    watermarkText: string, 
    opacity: number = 0.3
  ): Promise<Uint8Array> {
    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const pages = pdf.getPages();
    
    const font = await pdf.embedFont(StandardFonts.Helvetica);
    
    pages.forEach(page => {
      const { width, height } = page.getSize();
      page.drawText(watermarkText, {
        x: width / 2 - (watermarkText.length * 10),
        y: height / 2,
        size: 50,
        font,
        color: rgb(0.5, 0.5, 0.5),
        opacity,
        rotate: degrees(45),
      });
    });
    
    return await pdf.save();
  }

  static async rotatePDF(pdfFile: File, rotation: number): Promise<Uint8Array> {
    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const pages = pdf.getPages();
    
    pages.forEach(page => {
      page.setRotation(degrees(rotation));
    });
    
    return await pdf.save();
  }

  static async addPageNumbers(pdfFile: File): Promise<Uint8Array> {
    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const pages = pdf.getPages();
    const font = await pdf.embedFont(StandardFonts.Helvetica);
    
    pages.forEach((page, index) => {
      const { width, height } = page.getSize();
      page.drawText(`${index + 1}`, {
        x: width - 50,
        y: 20,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });
    });
    
    return await pdf.save();
  }

  static async protectPDF(pdfFile: File, password: string): Promise<Uint8Array> {
    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    
    // Note: PDF-lib doesn't support encryption directly
    // This would require a different library or server-side processing
    console.warn('PDF protection requires server-side processing for security');
    return await pdf.save();
  }

  static async convertImageToPDF(imageFile: File): Promise<Uint8Array> {
    const pdf = new jsPDF();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    return new Promise((resolve, reject) => {
      img.onload = async () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (img.height * imgWidth) / img.width;
        
        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
        const pdfBytes = pdf.output('arraybuffer');
        resolve(new Uint8Array(pdfBytes));
      };
      
      img.onerror = reject;
      img.src = URL.createObjectURL(imageFile);
    });
  }

  static async convertHTMLToPDF(htmlContent: string): Promise<Uint8Array> {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    tempDiv.style.width = '210mm';
    tempDiv.style.padding = '20px';
    document.body.appendChild(tempDiv);
    
    try {
      const canvas = await html2canvas(tempDiv);
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF();
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      const pdfBytes = pdf.output('arraybuffer');
      return new Uint8Array(pdfBytes);
    } finally {
      document.body.removeChild(tempDiv);
    }
  }

  static downloadPDF(pdfBytes: Uint8Array, filename: string): void {
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  static async pdfToImages(pdfFile: File): Promise<string[]> {
    // This would require pdf.js or similar library for proper implementation
    // For now, return a placeholder
    console.warn('PDF to images conversion requires pdf.js library');
    return [];
  }
}
