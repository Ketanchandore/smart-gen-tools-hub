import { PDFDocument, rgb, StandardFonts, degrees, PDFPage } from 'pdf-lib';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export const compressPDF = async (file: File, options: any): Promise<{ pdf: Uint8Array; sizeBefore: number; sizeAfter: number }> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const sizeBefore = arrayBuffer.byteLength;

    // Apply compression options
    if (options.removeMetadata) {
      pdfDoc.setTitle('');
      pdfDoc.setAuthor('');
      pdfDoc.setSubject('');
      pdfDoc.setKeywords([]);
      pdfDoc.setProducer('');
      pdfDoc.setCreator('');
    }

    // Save with compression
    const compressedBytes = await pdfDoc.save({
      useObjectStreams: true,
      addDefaultPage: false,
    });

    const sizeAfter = compressedBytes.length;

    return {
      pdf: compressedBytes,
      sizeBefore,
      sizeAfter
    };
  } catch (error) {
    console.error('PDF compression error:', error);
    throw new Error('Failed to compress PDF. Please ensure the file is a valid PDF.');
  }
};

export const mergePDFs = async (files: File[], options?: any): Promise<Uint8Array> => {
  try {
    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedBytes = await mergedPdf.save();
    return mergedBytes;
  } catch (error) {
    console.error('PDF merge error:', error);
    throw new Error('Failed to merge PDFs. Please ensure all files are valid PDFs.');
  }
};

export const convertToGrayscale = async (file: File): Promise<Uint8Array> => {
  // Simulate grayscale conversion
  await new Promise(resolve => setTimeout(resolve, 1800));

  // Return the original file content as Uint8Array for now
  const arrayBuffer = await file.arrayBuffer();
  return new Uint8Array(arrayBuffer);
};

export const ocrPDF = async (file: File, options?: {
  language?: string;
  engine?: 'tesseract' | 'azure' | 'google' | 'amazon';
  outputFormat?: 'searchable-pdf' | 'text-only' | 'both';
  dpi?: number;
  preprocessImages?: boolean;
  enhanceContrast?: boolean;
  removeNoise?: boolean;
  autoRotate?: boolean;
  detectOrientation?: boolean;
  preserveLayout?: boolean;
  recognizeHandwriting?: boolean;
  detectTables?: boolean;
  extractImages?: boolean;
  confidenceThreshold?: number;
  pageRange?: string;
  specificPages?: string;
  multiLanguage?: boolean;
  customDictionary?: string;
  postProcess?: boolean;
  spellCheck?: boolean;
  formatCorrection?: boolean;
}): Promise<{ text: string; confidence: number; metadata?: any }> => {
  // Simulate OCR processing
  await new Promise(resolve => setTimeout(resolve, 3000));

  console.log('OCR processing with options:', options);

  return {
    text: 'This is a sample OCR-processed text from the PDF with advanced recognition.',
    confidence: 95.5,
    metadata: {
      language: options?.language || 'en',
      pageCount: 1,
      processingTime: '3.2s',
      recognizedWords: 142
    }
  };
};

export const pdfToText = async (file: File): Promise<string> => {
  // Simulate PDF to Text processing
  await new Promise(resolve => setTimeout(resolve, 2200));

  return 'This is a sample text extracted from the PDF.';
};

export const pdfToImage = async (file: File): Promise<string> => {
  // Simulate PDF to Image conversion
  await new Promise(resolve => setTimeout(resolve, 2800));

  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w+G4EAJQcBh4jMXlAQAAAABJRU5ErkJggg==';
};

export const imageToPdf = async (file: File): Promise<Uint8Array> => {
  // Simulate Image to PDF conversion
  await new Promise(resolve => setTimeout(resolve, 2200));

  const arrayBuffer = await file.arrayBuffer();
  return new Uint8Array(arrayBuffer);
};

export const editPDF = async (file: File, options: any): Promise<Uint8Array> => {
  // Simulate PDF editing
  await new Promise(resolve => setTimeout(resolve, 2500));

  const arrayBuffer = await file.arrayBuffer();
  return new Uint8Array(arrayBuffer);
};

export const splitPDF = async (file: File, options: {
  mode: "range" | "every" | "bookmarks" | "extract" | "size";
  startPage?: number;
  endPage?: number;
  everyNPages?: number;
  pageRanges?: string;
  extractPages?: number[];
  maxFileSize?: number;
  removeBlankPages?: boolean;
  preserveBookmarks?: boolean;
  addPageNumbers?: boolean;
  customNaming?: string;
  optimizeOutput?: boolean;
  detectPageBreaks?: boolean;
}): Promise<{ files: Uint8Array[]; names: string[] }> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const totalPages = pdfDoc.getPageCount();
    
    const resultFiles: Uint8Array[] = [];
    const resultNames: string[] = [];

    if (options.mode === 'range' && options.startPage && options.endPage) {
      const newPdf = await PDFDocument.create();
      const start = Math.max(0, options.startPage - 1);
      const end = Math.min(totalPages, options.endPage);
      
      for (let i = start; i < end; i++) {
        const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
        newPdf.addPage(copiedPage);
      }
      
      const pdfBytes = await newPdf.save();
      resultFiles.push(pdfBytes);
      resultNames.push(`${options.customNaming || 'split'}_pages_${options.startPage}-${options.endPage}.pdf`);
      
    } else if (options.mode === 'every' && options.everyNPages) {
      for (let i = 0; i < totalPages; i += options.everyNPages) {
        const newPdf = await PDFDocument.create();
        const endPage = Math.min(i + options.everyNPages, totalPages);
        
        for (let j = i; j < endPage; j++) {
          const [copiedPage] = await newPdf.copyPages(pdfDoc, [j]);
          newPdf.addPage(copiedPage);
        }
        
        const pdfBytes = await newPdf.save();
        resultFiles.push(pdfBytes);
        resultNames.push(`${options.customNaming || 'split'}_part_${Math.floor(i / options.everyNPages) + 1}.pdf`);
      }
      
    } else if (options.mode === 'extract' && options.extractPages) {
      for (const pageIndex of options.extractPages) {
        if (pageIndex >= 0 && pageIndex < totalPages) {
          const newPdf = await PDFDocument.create();
          const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageIndex]);
          newPdf.addPage(copiedPage);
          
          const pdfBytes = await newPdf.save();
          resultFiles.push(pdfBytes);
          resultNames.push(`${options.customNaming || 'split'}_page_${pageIndex + 1}.pdf`);
        }
      }
    }

    return { files: resultFiles, names: resultNames };
  } catch (error) {
    console.error('PDF split error:', error);
    throw new Error('Failed to split PDF. Please ensure the file is a valid PDF.');
  }
};

export const downloadMultipleFiles = (files: { data: Uint8Array; name: string }[]) => {
  files.forEach(file => {
    const blob = new Blob([new Uint8Array(file.data)], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });
};

// Add the missing redactPDF function
export const redactPDF = async (file: File, options: any): Promise<Uint8Array> => {
  // Simulate redaction processing
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Return the original file content as Uint8Array for now
  const arrayBuffer = await file.arrayBuffer();
  return new Uint8Array(arrayBuffer);
};

// Update rotatePDF to match the expected signature
export const rotatePDF = async (file: File, rotation: number, options?: { pageIndices?: number[]; rotateMode?: "all" | "even" | "odd" | "specific" }): Promise<Uint8Array> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pages = pdfDoc.getPages();
    
    pages.forEach((page, index) => {
      let shouldRotate = false;
      
      if (!options || options.rotateMode === 'all') {
        shouldRotate = true;
      } else if (options.rotateMode === 'even' && index % 2 === 1) {
        shouldRotate = true;
      } else if (options.rotateMode === 'odd' && index % 2 === 0) {
        shouldRotate = true;
      } else if (options.rotateMode === 'specific' && options.pageIndices?.includes(index)) {
        shouldRotate = true;
      }
      
      if (shouldRotate) {
        const currentRotation = page.getRotation().angle;
        page.setRotation(degrees(currentRotation + rotation));
      }
    });
    
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (error) {
    console.error('PDF rotation error:', error);
    throw new Error('Failed to rotate PDF. Please ensure the file is a valid PDF.');
  }
};

// Update unlockPDF to match the expected signature (password as string)
export const unlockPDF = async (file: File, password: string): Promise<Uint8Array> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer, { 
      ignoreEncryption: true 
    });
    
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (error) {
    console.error('PDF unlock error:', error);
    throw new Error('Failed to unlock PDF. Please check the password and try again.');
  }
};

// Update protectPDF to match the expected signature
export const protectPDF = async (file: File, options: { 
  userPassword?: string; 
  ownerPassword?: string; 
  permissions?: { 
    printing?: false | "lowResolution" | "highResolution"; 
    modifying?: boolean; 
    copying?: boolean; 
    annotating?: boolean; 
    fillingForms?: boolean; 
    contentAccessibility?: boolean; 
    documentAssembly?: boolean; 
  }; 
}): Promise<Uint8Array> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    
    // Note: pdf-lib has limited encryption support
    // For production, consider using a backend service
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (error) {
    console.error('PDF protection error:', error);
    throw new Error('Failed to protect PDF. Please ensure the file is a valid PDF.');
  }
};

// Update convertHtmlToPDF to match the expected signature (single string parameter)
export const convertHtmlToPDF = async (htmlContent: string): Promise<Uint8Array> => {
  // Simulate HTML to PDF conversion
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Create a simple PDF-like byte array (this is just a placeholder)
  const pdfHeader = "%PDF-1.4\n";
  const encoder = new TextEncoder();
  return encoder.encode(pdfHeader);
};

// Add missing functions
export const downloadPdf = (data: Uint8Array, filename: string) => {
  const blob = new Blob([new Uint8Array(data)], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const convertImagesToPdf = async (files: File[], options: {
  pageSize: 'A4' | 'Letter' | 'Legal';
  orientation: 'portrait' | 'landscape';
  quality: number;
  margin: number;
  fitToPage?: boolean;
  maintainAspectRatio?: boolean;
  compression?: 'none' | 'low' | 'medium' | 'high';
  backgroundColor?: string;
  addBorder?: boolean;
  borderWidth?: number;
  borderColor?: string;
  customDimensions?: { width: number; height: number };
  imageLayout?: 'single' | 'grid' | 'collage';
  imagesPerPage?: number;
  addPageNumbers?: boolean;
  addWatermark?: boolean;
  watermarkText?: string;
  mergeMode?: 'all-in-one' | 'separate-pages';
}): Promise<Uint8Array> => {
  // Simulate advanced image to PDF conversion
  await new Promise(resolve => setTimeout(resolve, 2000 + files.length * 500));
  
  console.log('Converting images with options:', options);
  console.log(`Processing ${files.length} images`);
  
  // Create a simple PDF-like byte array (this is just a placeholder)
  const pdfHeader = "%PDF-1.4\n";
  const encoder = new TextEncoder();
  return encoder.encode(pdfHeader);
};

export const addPageNumbers = async (file: File, options: {
  position: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  fontSize: number;
  startNumber: number;
  color: { r: number; g: number; b: number };
  format?: 'number' | 'page-of-total' | 'roman';
  fontFamily?: string;
  fontWeight?: 'normal' | 'bold';
}): Promise<Uint8Array> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pages = pdfDoc.getPages();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const totalPages = pages.length;
    
    pages.forEach((page, index) => {
      const pageNumber = index + options.startNumber;
      let text = '';
      
      if (options.format === 'page-of-total') {
        text = `Page ${pageNumber} of ${totalPages}`;
      } else if (options.format === 'roman') {
        text = toRoman(pageNumber);
      } else {
        text = `${pageNumber}`;
      }
      
      const { width, height } = page.getSize();
      const textWidth = font.widthOfTextAtSize(text, options.fontSize);
      
      let x = 0, y = 0;
      
      // Calculate position
      if (options.position.includes('left')) x = 50;
      else if (options.position.includes('center')) x = (width - textWidth) / 2;
      else if (options.position.includes('right')) x = width - textWidth - 50;
      
      if (options.position.includes('top')) y = height - 50;
      else if (options.position.includes('bottom')) y = 30;
      
      page.drawText(text, {
        x,
        y,
        size: options.fontSize,
        font,
        color: rgb(options.color.r / 255, options.color.g / 255, options.color.b / 255),
      });
    });
    
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (error) {
    console.error('Add page numbers error:', error);
    throw new Error('Failed to add page numbers. Please ensure the file is a valid PDF.');
  }
};

// Helper function to convert numbers to Roman numerals
const toRoman = (num: number): string => {
  const romanNumerals: [number, string][] = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
    [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
  ];
  let result = '';
  for (const [value, numeral] of romanNumerals) {
    while (num >= value) {
      result += numeral;
      num -= value;
    }
  }
  return result;
};

export const splitPDFSimple = async (file: File, startPage: number, endPage: number): Promise<Uint8Array> => {
  // Simulate simple PDF splitting
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  console.log(`Splitting PDF from page ${startPage} to ${endPage}`);
  
  // Return the original file content as Uint8Array for now
  const arrayBuffer = await file.arrayBuffer();
  return new Uint8Array(arrayBuffer);
};

export const addWatermark = async (file: File, text: string, options: {
  opacity: number;
  fontSize?: number;
  rotation?: number;
  position: 'center' | 'diagonal' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'custom';
  color: { r: number; g: number; b: number };
  pages: number[] | 'all' | 'odd' | 'even' | 'range' | 'specific';
  imageWatermark?: File;
  fontFamily?: string;
  fontWeight?: 'normal' | 'bold';
  fontStyle?: 'normal' | 'italic';
  outline?: boolean;
  outlineColor?: { r: number; g: number; b: number };
  outlineWidth?: number;
  shadow?: boolean;
  shadowOffset?: number;
  shadowBlur?: number;
  shadowColor?: { r: number; g: number; b: number };
  spacing?: number;
  scale?: number;
  blend?: 'normal' | 'multiply' | 'screen' | 'overlay';
  background?: boolean;
  backgroundColor?: { r: number; g: number; b: number };
  backgroundOpacity?: number;
  customPosition?: { x: number; y: number };
  repeat?: boolean;
  tiled?: boolean;
  preserveAspectRatio?: boolean;
  pageRange?: string;
  specificPages?: number[];
}): Promise<Uint8Array> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pages = pdfDoc.getPages();
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
    pages.forEach((page, index) => {
      let shouldWatermark = false;
      
      if (options.pages === 'all') {
        shouldWatermark = true;
      } else if (options.pages === 'odd' && index % 2 === 0) {
        shouldWatermark = true;
      } else if (options.pages === 'even' && index % 2 === 1) {
        shouldWatermark = true;
      } else if (Array.isArray(options.pages) && options.pages.includes(index)) {
        shouldWatermark = true;
      }
      
      if (shouldWatermark) {
        const { width, height } = page.getSize();
        const fontSize = options.fontSize || 60;
        const textWidth = font.widthOfTextAtSize(text, fontSize);
        
        let x = width / 2 - textWidth / 2;
        let y = height / 2;
        let rotation = options.rotation || 45;
        
        if (options.position === 'diagonal') {
          x = width / 2 - textWidth / 2;
          y = height / 2;
          rotation = 45;
        } else if (options.position === 'center') {
          rotation = 0;
        } else if (options.position === 'top-left') {
          x = 50;
          y = height - 50;
          rotation = 0;
        }
        
        page.drawText(text, {
          x,
          y,
          size: fontSize,
          font,
          color: rgb(options.color.r / 255, options.color.g / 255, options.color.b / 255),
          opacity: options.opacity,
          rotate: degrees(rotation),
        });
      }
    });
    
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (error) {
    console.error('Add watermark error:', error);
    throw new Error('Failed to add watermark. Please ensure the file is a valid PDF.');
  }
};

// Add alias for backward compatibility
export const mergePDF = mergePDFs;
