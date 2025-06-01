
import { PDFDocument, degrees, rgb, StandardFonts } from 'pdf-lib';
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
  
  // Simple compression by removing metadata and optimizing
  pdf.setTitle('');
  pdf.setAuthor('');
  pdf.setSubject('');
  pdf.setKeywords([]);
  pdf.setProducer('');
  pdf.setCreator('');
  
  return await pdf.save();
};

export const addWatermark = async (pdfFile: File, watermarkText: string): Promise<Uint8Array> => {
  const arrayBuffer = await pdfFile.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  
  const pages = pdf.getPages();
  
  pages.forEach((page) => {
    const { width, height } = page.getSize();
    page.drawText(watermarkText, {
      x: width / 2 - 50,
      y: height / 2,
      size: 50,
      font,
      color: rgb(0.5, 0.5, 0.5),
      opacity: 0.3,
      rotate: degrees(45),
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

export const addPageNumbers = async (pdfFile: File): Promise<Uint8Array> => {
  const arrayBuffer = await pdfFile.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  
  const pages = pdf.getPages();
  
  pages.forEach((page, index) => {
    const { width, height } = page.getSize();
    page.drawText(`${index + 1}`, {
      x: width / 2,
      y: 30,
      size: 12,
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
    
    if (imageFile.type === 'image/jpeg' || imageFile.type === 'image/jpg') {
      image = await pdf.embedJpg(arrayBuffer);
    } else if (imageFile.type === 'image/png') {
      image = await pdf.embedPng(arrayBuffer);
    } else {
      continue; // Skip unsupported formats
    }
    
    const page = pdf.addPage();
    const { width, height } = page.getSize();
    const imageDims = image.scale(Math.min(width / image.width, height / image.height));
    
    page.drawImage(image, {
      x: (width - imageDims.width) / 2,
      y: (height - imageDims.height) / 2,
      width: imageDims.width,
      height: imageDims.height,
    });
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
