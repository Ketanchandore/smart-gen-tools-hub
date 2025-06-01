
import React, { useState } from 'react';
import { RotateCw, FileText } from 'lucide-react';
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { PDFProcessor } from '@/utils/pdfUtils';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const RotatePdf = () => {
  const [rotation, setRotation] = useState(90);

  const handleRotate = async (files: File[]): Promise<Uint8Array> => {
    if (files.length !== 1) {
      throw new Error('Please select exactly one PDF file to rotate');
    }
    return await PDFProcessor.rotatePDF(files[0], rotation);
  };

  const additionalControls = (
    <div className="space-y-4">
      <Label className="text-base font-medium">Rotation Angle</Label>
      <div className="grid grid-cols-2 gap-2">
        {[90, 180, 270].map((angle) => (
          <Button
            key={angle}
            variant={rotation === angle ? "default" : "outline"}
            onClick={() => setRotation(angle)}
            className="flex items-center gap-2"
          >
            <RotateCw className="h-4 w-4" />
            {angle}°
          </Button>
        ))}
      </div>
    </div>
  );

  return (
    <PDFToolTemplate
      title="Rotate PDF"
      description="Rotate all pages in a PDF document by 90°, 180°, or 270°"
      icon={<RotateCw className="h-8 w-8 text-primary" />}
      onProcess={handleRotate}
      acceptMultiple={false}
      outputFilename="rotated-document.pdf"
      additionalControls={additionalControls}
    />
  );
};

export default RotatePdf;
