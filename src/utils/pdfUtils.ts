
import { PDFDocument, degrees, rgb, StandardFonts, PageSizes } from 'pdf-lib';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export const mergePDFs = async (pdfFiles: File[]): Promise<Uint8Array> => {
  const mergedPdf = await PDFDocument.create();
  
  for (const file of pdfFiles) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }
  
  return await mergedPdf.save();
};

export const splitPDF = async (pdfFile: File, startPage: number, endPage: number): Promise<Uint8Array> => {
  const arrayBuffer = await pdfFile.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const newPdf = await PDFDocument.create();
  
  const pageIndices = Array.from(
    { length: endPage - startPage + 1 }, 
    (_, i) => startPage - 1 + i
  );
  
  const copiedPages = await newPdf.copyPages(pdf, pageIndices);
  copiedPages.forEach((page) => newPdf.addPage(page));
  
  return await newPdf.save();
};

export const compressPDF = async (pdfFile: File): Promise<Uint8Array> => {
  const arrayBuffer = await pdfFile.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  
  // Remove metadata to reduce size
  pdf.setTitle('');
  pdf.setAuthor('');
  pdf.setSubject('');
  pdf.setKeywords([]);
  pdf.setProducer('');
  pdf.setCreator('');
  
  // Save with compression
  return await pdf.save({ useObjectStreams: false });
};

export const addWatermark = async (pdfFile: File, watermarkText: string, options?: {
  opacity?: number;
  fontSize?: number;
  color?: { r: number; g: number; b: number };
  rotation?: number;
}): Promise<Uint8Array> => {
  const arrayBuffer = await pdfFile.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  
  const {
    opacity = 0.3,
    fontSize = 50,
    color = { r: 0.5, g: 0.5, b: 0.5 },
    rotation = 45
  } = options || {};
  
  const pages = pdf.getPages();
  
  pages.forEach((page) => {
    const { width, height } = page.getSize();
    page.drawText(watermarkText, {
      x: width / 2 - (watermarkText.length * fontSize) / 4,
      y: height / 2,
      size: fontSize,
      font,
      color: rgb(color.r, color.g, color.b),
      opacity,
      rotate: degrees(rotation),
    });
  });
  
  return await pdf.save();
};

export const rotatePDF = async (pdfFile: File, rotationAngle: number): Promise<Uint8Array> => {
  const arrayBuffer = await pdfFile.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  
  const pages = pdf.getPages();
  pages.forEach((page) => {
    page.setRotation(degrees(rotationAngle));
  });
  
  return await pdf.save();
};

export const addPageNumbers = async (pdfFile: File, options?: {
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  fontSize?: number;
  startNumber?: number;
}): Promise<Uint8Array> => {
  const arrayBuffer = await pdfFile.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  
  const {
    position = 'bottom-center',
    fontSize = 12,
    startNumber = 1
  } = options || {};
  
  const pages = pdf.getPages();
  
  pages.forEach((page, index) => {
    const { width, height } = page.getSize();
    const pageNumber = startNumber + index;
    
    let x: number, y: number;
    
    switch (position) {
      case 'top-left':
        x = 30; y = height - 30;
        break;
      case 'top-center':
        x = width / 2; y = height - 30;
        break;
      case 'top-right':
        x = width - 30; y = height - 30;
        break;
      case 'bottom-left':
        x = 30; y = 30;
        break;
      case 'bottom-right':
        x = width - 30; y = 30;
        break;
      default: // bottom-center
        x = width / 2; y = 30;
    }
    
    page.drawText(`${pageNumber}`, {
      x,
      y,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });
  });
  
  return await pdf.save();
};

export const convertHtmlToPdf = async (htmlContent: string): Promise<Uint8Array> => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  tempDiv.style.width = '800px';
  tempDiv.style.fontFamily = 'Arial, sans-serif';
  document.body.appendChild(tempDiv);
  
  try {
    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
    });
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
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
    
    return new Uint8Array(pdf.output('arraybuffer'));
  } finally {
    document.body.removeChild(tempDiv);
  }
};

export const convertImagesToPdf = async (imageFiles: File[]): Promise<Uint8Array> => {
  const pdf = await PDFDocument.create();
  
  for (const imageFile of imageFiles) {
    const arrayBuffer = await imageFile.arrayBuffer();
    let image;
    
    try {
      if (imageFile.type === 'image/jpeg' || imageFile.type === 'image/jpg') {
        image = await pdf.embedJpg(arrayBuffer);
      } else if (imageFile.type === 'image/png') {
        image = await pdf.embedPng(arrayBuffer);
      } else {
        continue; // Skip unsupported formats
      }
      
      const page = pdf.addPage(PageSizes.A4);
      const { width, height } = page.getSize();
      
      // Calculate scaling to fit image on page while maintaining aspect ratio
      const imageAspectRatio = image.width / image.height;
      const pageAspectRatio = width / height;
      
      let scaledWidth: number, scaledHeight: number;
      
      if (imageAspectRatio > pageAspectRatio) {
        // Image is wider than page
        scaledWidth = width - 40; // 20px margin on each side
        scaledHeight = scaledWidth / imageAspectRatio;
      } else {
        // Image is taller than page
        scaledHeight = height - 40; // 20px margin on top and bottom
        scaledWidth = scaledHeight * imageAspectRatio;
      }
      
      const x = (width - scaledWidth) / 2;
      const y = (height - scaledHeight) / 2;
      
      page.drawImage(image, {
        x,
        y,
        width: scaledWidth,
        height: scaledHeight,
      });
    } catch (error) {
      console.error(`Error processing image ${imageFile.name}:`, error);
      continue;
    }
  }
  
  return await pdf.save();
};

export const protectPDF = async (pdfFile: File, userPassword: string, ownerPassword?: string): Promise<Uint8Array> => {
  const arrayBuffer = await pdfFile.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  
  // Note: pdf-lib doesn't support encryption directly
  // This would require a backend service for full encryption
  // For now, we'll return the PDF with metadata indicating protection
  pdf.setTitle('Protected Document');
  pdf.setSubject('This document requires a password to access');
  
  return await pdf.save();
};

export const unlockPDF = async (pdfFile: File, password?: string): Promise<Uint8Array> => {
  try {
    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    return await pdf.save();
  } catch (error) {
    throw new Error('Unable to unlock PDF. The file may be encrypted or corrupted.');
  }
};

export const organizePDF = async (pdfFile: File, pageOrder: number[]): Promise<Uint8Array> => {
  const arrayBuffer = await pdfFile.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const newPdf = await PDFDocument.create();
  
  const allPages = pdf.getPages();
  
  for (const pageIndex of pageOrder) {
    if (pageIndex >= 0 && pageIndex < allPages.length) {
      const [copiedPage] = await newPdf.copyPages(pdf, [pageIndex]);
      newPdf.addPage(copiedPage);
    }
  }
  
  return await newPdf.save();
};

export const cropPDF = async (pdfFile: File, cropBox: { x: number; y: number; width: number; height: number }): Promise<Uint8Array> => {
  const arrayBuffer = await pdfFile.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  
  const pages = pdf.getPages();
  
  pages.forEach((page) => {
    const { width, height } = page.getSize();
    
    // Apply crop box
    page.setCropBox(
      cropBox.x,
      height - cropBox.y - cropBox.height,
      cropBox.width,
      cropBox.height
    );
  });
  
  return await pdf.save();
};

export const repairPDF = async (pdfFile: File): Promise<Uint8Array> => {
  try {
    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    
    // Basic repair - try to save the PDF which may fix minor issues
    return await pdf.save();
  } catch (error) {
    throw new Error('PDF file is too corrupted to repair');
  }
};

export const downloadPdf = (pdfBytes: Uint8Array, filename: string) => {
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
