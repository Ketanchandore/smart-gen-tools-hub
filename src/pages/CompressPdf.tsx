
import React, { useState } from 'react';
import { Minimize } from 'lucide-react';
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { compressPDF } from '@/utils/pdfUtils';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const CompressPdf = () => {
  const [compressionLevel, setCompressionLevel] = useState<'low' | 'medium' | 'high'>('medium');

  const handleCompress = async (files: File[]): Promise<Uint8Array> => {
    return await compressPDF(files[0], compressionLevel);
  };

  const compressionInfo = {
    low: {
      title: 'Low Compression',
      description: 'Minimal size reduction, maximum quality',
      reduction: '10-20%'
    },
    medium: {
      title: 'Medium Compression',
      description: 'Balanced size reduction and quality',
      reduction: '30-50%'
    },
    high: {
      title: 'High Compression',
      description: 'Maximum size reduction, good quality',
      reduction: '50-70%'
    }
  };

  return (
    <PDFToolTemplate
      title="Compress PDF"
      description="Reduce PDF file size with customizable compression levels while maintaining quality"
      icon={<Minimize className="h-8 w-8 text-primary" />}
      acceptFiles=".pdf"
      multiple={false}
      processFunction={handleCompress}
      outputFilename="compressed.pdf"
    >
      <Card>
        <CardHeader>
          <CardTitle>Compression Settings</CardTitle>
          <CardDescription>Choose the compression level for your PDF</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="compression-level">Compression Level</Label>
            <Select value={compressionLevel} onValueChange={(value: any) => setCompressionLevel(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select compression level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low Compression</SelectItem>
                <SelectItem value="medium">Medium Compression</SelectItem>
                <SelectItem value="high">High Compression</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="p-4 bg-secondary/30 rounded-lg">
            <h4 className="font-medium mb-2">{compressionInfo[compressionLevel].title}</h4>
            <p className="text-sm text-muted-foreground mb-1">
              {compressionInfo[compressionLevel].description}
            </p>
            <p className="text-sm font-medium">
              Expected size reduction: {compressionInfo[compressionLevel].reduction}
            </p>
          </div>

          <div className="text-xs text-muted-foreground">
            <p>• Compression removes metadata and optimizes internal structure</p>
            <p>• Higher compression may slightly reduce image quality</p>
            <p>• Text quality is preserved at all compression levels</p>
          </div>
        </CardContent>
      </Card>
    </PDFToolTemplate>
  );
};

export default CompressPdf;
