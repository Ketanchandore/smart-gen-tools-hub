
import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { rotatePDF } from '@/utils/pdfUtils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const RotatePdf = () => {
  const [rotation, setRotation] = useState(90);

  const handleRotate = async (files: File[]): Promise<Uint8Array> => {
    return await rotatePDF(files[0], rotation);
  };

  return (
    <PDFToolTemplate
      title="Rotate PDF"
      description="Rotate pages within a PDF document individually or entirely"
      icon={<RotateCcw className="h-8 w-8 text-primary" />}
      acceptFiles=".pdf"
      multiple={false}
      processFunction={handleRotate}
      outputFilename="rotated.pdf"
    >
      <div>
        <Label htmlFor="rotation">Rotation Angle</Label>
        <Select onValueChange={(value) => setRotation(parseInt(value))}>
          <SelectTrigger>
            <SelectValue placeholder="Select rotation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="90">90° Clockwise</SelectItem>
            <SelectItem value="180">180°</SelectItem>
            <SelectItem value="270">270° Clockwise</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </PDFToolTemplate>
  );
};

export default RotatePdf;
