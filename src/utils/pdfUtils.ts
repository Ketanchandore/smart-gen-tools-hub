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

export const splitPDF = async (pdfFile: File, options: {
  mode: 'range' | 'every' | 'bookmarks';
  startPage?: number;
  endPage?: number;
  everyNPages?: number;
  pageRanges?: string;
}): Promise<Uint8Array[]> => {
  const arrayBuffer = await pdfFile.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const totalPages = pdf.getPageCount();
  const results: Uint8Array[] = [];
  
  if (options.mode === 'range' && options.startPage && options.endPage) {
    const newPdf = await PDFDocument.create();
    const pageIndices = Array.from(
      { length: options.endPage - options.startPage + 1 }, 
      (_, i) => options.startPage! - 1 + i
    );
    const copiedPages = await newPdf.copyPages(pdf, pageIndices);
    copiedPages.forEach((page) => newPdf.addPage(page));
    results.push(await newPdf.save());
  } else if (options.mode === 'every' && options.everyNPages) {
    for (let i = 0; i < totalPages; i += options.everyNPages) {
      const newPdf = await PDFDocument.create();
      const endIdx = Math.min(i + options.everyNPages, totalPages);
      const pageIndices = Array.from({ length: endIdx - i }, (_, idx) => i + idx);
      const copiedPages = await newPdf.copyPages(pdf, pageIndices);
      copiedPages.forEach((page) => newPdf.addPage(page));
      results.push(await newPdf.save());
    }
  }
  
  return results;
};

export const splitPDFSimple = async (pdfFile: File, startPage: number, endPage: number): Promise<Uint8Array> => {
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

export const compressPDF = async (pdfFile: File, level: 'low' | 'medium' | 'high' = 'medium'): Promise<Uint8Array> => {
  const arrayBuffer = await pdfFile.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  
  // Remove metadata and optimize based on compression level
  pdf.setTitle('');
  pdf.setAuthor('');
  pdf.setSubject('');
  pdf.setKeywords([]);
  pdf.setProducer('');
  pdf.setCreator('');
  
  // Different compression strategies
  const compressionOptions = {
    low: { useObjectStreams: true, addDefaultPage: false },
    medium: { useObjectStreams: false, addDefaultPage: false },
    high: { useObjectStreams: false, addDefaultPage: false }
  };
  
  return await pdf.save(compressionOptions[level]);
};

export const addWatermark = async (pdfFile: File, watermarkText: string, options?: {
  opacity?: number;
  fontSize?: number;
  color?: { r: number; g: number; b: number };
  rotation?: number;
  position?: 'center' | 'diagonal' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}): Promise<Uint8Array> => {
  const arrayBuffer = await pdfFile.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  
  const {
    opacity = 0.3,
    fontSize = 50,
    color = { r: 0.5, g: 0.5, b: 0.5 },
    rotation = 45,
    position = 'center'
  } = options || {};
  
  const pages = pdf.getPages();
  
  pages.forEach((page) => {
    const { width, height } = page.getSize();
    let x: number, y: number;
    
    switch (position) {
      case 'top-left':
        x = 50; y = height - 50;
        break;
      case 'top-right':
        x = width - 200; y = height - 50;
        break;
      case 'bottom-left':
        x = 50; y = 50;
        break;
      case 'bottom-right':
        x = width - 200; y = 50;
        break;
      case 'diagonal':
        x = width / 2 - (watermarkText.length * fontSize) / 4;
        y = height / 2;
        break;
      default: // center
        x = width / 2 - (watermarkText.length * fontSize) / 4;
        y = height / 2;
    }
    
    page.drawText(watermarkText, {
      x,
      y,
      size: fontSize,
      font,
      color: rgb(color.r, color.g, color.b),
      opacity,
      rotate: degrees(rotation),
    });
  });
  
  return await pdf.save();
};

export const rotatePDF = async (pdfFile: File, rotation: number, pageIndices?: number[]): Promise<Uint8Array> => {
  const arrayBuffer = await pdfFile.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const pages = pdf.getPages();
  
  const targetPages = pageIndices || Array.from({ length: pages.length }, (_, i) => i);
  
  targetPages.forEach((pageIndex) => {
    if (pageIndex >= 0 && pageIndex < pages.length) {
      pages[pageIndex].setRotation(degrees(rotation));
    }
  });
  
  return await pdf.save();
};

export const addPageNumbers = async (pdfFile: File, options?: {
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  fontSize?: number;
  startNumber?: number;
  color?: { r: number; g: number; b: number };
  font?: string;
}): Promise<Uint8Array> => {
  const arrayBuffer = await pdfFile.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  
  const {
    position = 'bottom-center',
    fontSize = 12,
    startNumber = 1,
    color = { r: 0, g: 0, b: 0 }
  } = options || {};
  
  const pages = pdf.getPages();
  
  pages.forEach((page, index) => {
    const { width, height } = page.getSize();
    const pageNumber = startNumber + index;
    const text = `${pageNumber}`;
    
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
    
    page.drawText(text, {
      x,
      y,
      size: fontSize,
      font,
      color: rgb(color.r, color.g, color.b),
    });
  });
  
  return await pdf.save();
};

export const convertHtmlToPdf = async (htmlContent: string, options?: {
  pageSize?: 'A4' | 'Letter' | 'Legal';
  orientation?: 'portrait' | 'landscape';
  margins?: { top: number; bottom: number; left: number; right: number };
}): Promise<Uint8Array> => {
  const { pageSize = 'A4', orientation = 'portrait', margins = { top: 20, bottom: 20, left: 20, right: 20 } } = options || {};
  
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  tempDiv.style.width = '800px';
  tempDiv.style.fontFamily = 'Arial, sans-serif';
  tempDiv.style.padding = '20px';
  document.body.appendChild(tempDiv);
  
  try {
    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF({
      orientation,
      unit: 'mm',
      format: pageSize.toLowerCase() as any
    });
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdfWidth - margins.left - margins.right;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    let heightLeft = imgHeight;
    let position = margins.top;
    
    pdf.addImage(imgData, 'PNG', margins.left, position, imgWidth, imgHeight);
    heightLeft -= (pdfHeight - margins.top - margins.bottom);
    
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight + margins.top;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', margins.left, position, imgWidth, imgHeight);
      heightLeft -= (pdfHeight - margins.top - margins.bottom);
    }
    
    return new Uint8Array(pdf.output('arraybuffer'));
  } finally {
    document.body.removeChild(tempDiv);
  }
};

export const convertImagesToPdf = async (imageFiles: File[], options?: {
  pageSize?: 'A4' | 'Letter' | 'Legal';
  orientation?: 'portrait' | 'landscape';
  quality?: number;
  margin?: number;
}): Promise<Uint8Array> => {
  const { pageSize: pageSizeOption = 'A4', orientation = 'portrait', quality = 0.8, margin = 20 } = options || {};
  const pdf = await PDFDocument.create();
  
  const pageSizes = {
    A4: PageSizes.A4,
    Letter: PageSizes.Letter,
    Legal: PageSizes.Legal
  };
  
  for (const imageFile of imageFiles) {
    const arrayBuffer = await imageFile.arrayBuffer();
    let image;
    
    try {
      if (imageFile.type === 'image/jpeg' || imageFile.type === 'image/jpg') {
        image = await pdf.embedJpg(arrayBuffer);
      } else if (imageFile.type === 'image/png') {
        image = await pdf.embedPng(arrayBuffer);
      } else {
        continue;
      }
      
      const selectedPageSize = pageSizes[pageSizeOption];
      const page = pdf.addPage(selectedPageSize);
      const { width, height } = page.getSize();
      
      const imageAspectRatio = image.width / image.height;
      const pageAspectRatio = (width - 2 * margin) / (height - 2 * margin);
      
      let scaledWidth: number, scaledHeight: number;
      
      if (imageAspectRatio > pageAspectRatio) {
        scaledWidth = width - 2 * margin;
        scaledHeight = scaledWidth / imageAspectRatio;
      } else {
        scaledHeight = height - 2 * margin;
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

export const protectPDF = async (pdfFile: File, options: {
  userPassword?: string;
  ownerPassword?: string;
  permissions?: {
    printing?: 'lowResolution' | 'highResolution' | false;
    modifying?: boolean;
    copying?: boolean;
    annotating?: boolean;
    fillingForms?: boolean;
    contentAccessibility?: boolean;
    documentAssembly?: boolean;
  };
}): Promise<Uint8Array> => {
  const arrayBuffer = await pdfFile.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  
  const { userPassword, ownerPassword, permissions = {} } = options;
  
  // Note: pdf-lib has limited encryption support in browser environment
  // This is a basic implementation - for full encryption, server-side processing would be needed
  if (userPassword || ownerPassword) {
    console.warn('PDF encryption requires server-side processing for full security');
  }
  
  return await pdf.save();
};

export const unlockPDF = async (pdfFile: File, password?: string): Promise<Uint8Array> => {
  try {
    const arrayBuffer = await pdfFile.arrayBuffer();
    // Note: pdf-lib doesn't support password-protected PDFs in browser
    // This would require server-side processing
    const pdf = await PDFDocument.load(arrayBuffer);
    return await pdf.save();
  } catch (error) {
    throw new Error('Unable to unlock PDF. Password-protected PDFs require server-side processing.');
  }
};

export const organizePDF = async (pdfFile: File, operations: Array<{
  type: 'reorder' | 'delete' | 'duplicate';
  pageIndex: number;
  newIndex?: number;
}>): Promise<Uint8Array> => {
  const arrayBuffer = await pdfFile.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const newPdf = await PDFDocument.create();
  
  const originalPages = pdf.getPages();
  const pageOrder: number[] = [];
  
  // Initialize with original order
  for (let i = 0; i < originalPages.length; i++) {
    pageOrder.push(i);
  }
  
  // Apply operations
  operations.forEach(op => {
    switch (op.type) {
      case 'reorder':
        if (op.newIndex !== undefined) {
          const [removed] = pageOrder.splice(op.pageIndex, 1);
          pageOrder.splice(op.newIndex, 0, removed);
        }
        break;
      case 'delete':
        pageOrder.splice(pageOrder.indexOf(op.pageIndex), 1);
        break;
      case 'duplicate':
        pageOrder.splice(op.pageIndex + 1, 0, op.pageIndex);
        break;
    }
  });
  
  // Copy pages in new order
  for (const pageIndex of pageOrder) {
    if (pageIndex >= 0 && pageIndex < originalPages.length) {
      const [copiedPage] = await newPdf.copyPages(pdf, [pageIndex]);
      newPdf.addPage(copiedPage);
    }
  }
  
  return await newPdf.save();
};

export const cropPDF = async (pdfFile: File, cropBox: { 
  x: number; 
  y: number; 
  width: number; 
  height: number;
  pageIndices?: number[];
}): Promise<Uint8Array> => {
  const arrayBuffer = await pdfFile.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const pages = pdf.getPages();
  
  const targetPages = cropBox.pageIndices || Array.from({ length: pages.length }, (_, i) => i);
  
  targetPages.forEach((pageIndex) => {
    if (pageIndex >= 0 && pageIndex < pages.length) {
      const page = pages[pageIndex];
      const { height } = page.getSize();
      
      page.setCropBox(
        cropBox.x,
        height - cropBox.y - cropBox.height,
        cropBox.width,
        cropBox.height
      );
    }
  });
  
  return await pdf.save();
};

export const repairPDF = async (pdfFile: File): Promise<Uint8Array> => {
  try {
    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer, { 
      ignoreEncryption: true,
      capNumbers: false,
      throwOnInvalidObject: false
    });
    
    // Basic repair - recreate the PDF structure
    const repairedPdf = await PDFDocument.create();
    const pages = pdf.getPages();
    
    for (let i = 0; i < pages.length; i++) {
      try {
        const [copiedPage] = await repairedPdf.copyPages(pdf, [i]);
        repairedPdf.addPage(copiedPage);
      } catch (error) {
        console.warn(`Could not repair page ${i + 1}:`, error);
      }
    }
    
    return await repairedPdf.save();
  } catch (error) {
    throw new Error('PDF file is too corrupted to repair automatically.');
  }
};

export const extractText = async (pdfFile: File): Promise<string> => {
  try {
    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const pages = pdf.getPages();
    
    let extractedText = '';
    // Note: pdf-lib doesn't have built-in text extraction
    // This would require additional libraries like PDF.js
    console.log('Text extraction requires additional implementation');
    
    return extractedText;
  } catch (error) {
    throw new Error('Failed to extract text from PDF');
  }
};

export const convertPdfToImages = async (pdfFile: File, options?: {
  format?: 'png' | 'jpg';
  dpi?: number;
  quality?: number;
}): Promise<Blob[]> => {
  const { format = 'png', dpi = 150, quality = 0.8 } = options || {};
  
  // This would require PDF.js or similar for client-side conversion
  // For now, return empty array as placeholder
  console.log('PDF to images conversion requires additional implementation');
  return [];
};

export const flattenPDF = async (pdfFile: File): Promise<Uint8Array> => {
  const arrayBuffer = await pdfFile.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  
  // Flatten forms and annotations
  const form = pdf.getForm();
  try {
    form.flatten();
  } catch (error) {
    console.warn('No forms to flatten:', error);
  }
  
  return await pdf.save();
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

export const downloadFile = (data: Uint8Array | Blob, filename: string, mimeType: string) => {
  const blob = data instanceof Blob ? data : new Blob([data], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
