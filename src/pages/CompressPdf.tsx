
import React, { useState } from 'react';
import { Minimize, Info } from 'lucide-react';
import PDFToolTemplate from '@/components/PDFToolTemplate';
import { compressPDF } from '@/utils/pdfUtils';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/components/ui/use-toast';

const CompressPdf = () => {
  const { toast } = useToast();
  const [compressionLevel, setCompressionLevel] = useState<'low' | 'medium' | 'high' | 'extreme'>('medium');
  const [imageQuality, setImageQuality] = useState(80);
  const [removeMetadata, setRemoveMetadata] = useState(true);
  const [optimizeImages, setOptimizeImages] = useState(true);
  const [removeAnnotations, setRemoveAnnotations] = useState(false);
  const [compressionResults, setCompressionResults] = useState<{
    originalSize: number;
    compressedSize: number;
    compressionRatio: number;
  } | null>(null);

  const handleCompress = async (files: File[]): Promise<Uint8Array> => {
    try {
      const result = await compressPDF(files[0], {
        level: compressionLevel,
        imageQuality: imageQuality / 100,
        removeMetadata,
        optimizeImages,
        removeAnnotations
      });
      
      setCompressionResults({
        originalSize: result.originalSize,
        compressedSize: result.compressedSize,
        compressionRatio: result.compressionRatio
      });
      
      const savedMB = ((result.originalSize - result.compressedSize) / 1024 / 1024).toFixed(2);
      
      toast({
        title: 'PDF Compressed Successfully',
        description: `Size reduced by ${result.compressionRatio}% (saved ${savedMB} MB)`,
      });
      
      return result.pdf;
    } catch (error) {
      console.error('Compression error:', error);
      toast({
        title: 'Compression Failed',
        description: 'An error occurred while compressing the PDF',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const compressionInfo = {
    low: {
      title: 'Low Compression',
      description: 'Minimal size reduction, maximum quality',
      reduction: '10-20%',
      color: 'text-green-600'
    },
    medium: {
      title: 'Medium Compression',
      description: 'Balanced size reduction and quality',
      reduction: '30-50%',
      color: 'text-blue-600'
    },
    high: {
      title: 'High Compression',
      description: 'Significant size reduction, good quality',
      reduction: '50-70%',
      color: 'text-orange-600'
    },
    extreme: {
      title: 'Extreme Compression',
      description: 'Maximum size reduction, acceptable quality',
      reduction: '70-85%',
      color: 'text-red-600'
    }
  };

  return (
    <PDFToolTemplate
      title="Compress PDF"
      description="Reduce PDF file size with advanced compression options while maintaining quality"
      icon={<Minimize className="h-8 w-8 text-primary" />}
      acceptFiles=".pdf"
      multiple={false}
      processFunction={handleCompress}
      outputFilename="compressed.pdf"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Compression Settings</CardTitle>
            <CardDescription>Choose compression level and optimization options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="compression-level">Compression Level</Label>
              <Select value={compressionLevel} onValueChange={(value: any) => setCompressionLevel(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select compression level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Compression (Fastest)</SelectItem>
                  <SelectItem value="medium">Medium Compression (Balanced)</SelectItem>
                  <SelectItem value="high">High Compression (Smaller)</SelectItem>
                  <SelectItem value="extreme">Extreme Compression (Smallest)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="p-4 bg-secondary/30 rounded-lg">
              <h4 className={`font-medium mb-2 ${compressionInfo[compressionLevel].color}`}>
                {compressionInfo[compressionLevel].title}
              </h4>
              <p className="text-sm text-muted-foreground mb-1">
                {compressionInfo[compressionLevel].description}
              </p>
              <p className="text-sm font-medium">
                Expected size reduction: {compressionInfo[compressionLevel].reduction}
              </p>
            </div>

            <div>
              <Label htmlFor="image-quality">Image Quality: {imageQuality}%</Label>
              <Slider
                id="image-quality"
                min={30}
                max={100}
                step={5}
                value={[imageQuality]}
                onValueChange={(value) => setImageQuality(value[0])}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Lower quality = smaller file size. 80-90% recommended for good balance.
              </p>
            </div>

            <div className="space-y-3">
              <Label>Optimization Options</Label>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remove-metadata"
                  checked={removeMetadata}
                  onCheckedChange={(checked) => setRemoveMetadata(checked as boolean)}
                />
                <Label htmlFor="remove-metadata" className="text-sm">
                  Remove metadata (author, title, creation date)
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="optimize-images"
                  checked={optimizeImages}
                  onCheckedChange={(checked) => setOptimizeImages(checked as boolean)}
                />
                <Label htmlFor="optimize-images" className="text-sm">
                  Optimize embedded images
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remove-annotations"
                  checked={removeAnnotations}
                  onCheckedChange={(checked) => setRemoveAnnotations(checked as boolean)}
                />
                <Label htmlFor="remove-annotations" className="text-sm">
                  Remove annotations and comments
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {compressionResults && (
          <Card>
            <CardHeader>
              <CardTitle>Compression Results</CardTitle>
              <CardDescription>File size comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-secondary/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">Original Size</p>
                  <p className="text-lg font-bold">{formatFileSize(compressionResults.originalSize)}</p>
                </div>
                <div className="p-3 bg-secondary/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">Compressed Size</p>
                  <p className="text-lg font-bold text-green-600">{formatFileSize(compressionResults.compressedSize)}</p>
                </div>
                <div className="p-3 bg-secondary/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">Size Reduction</p>
                  <p className="text-lg font-bold text-blue-600">{compressionResults.compressionRatio}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="p-4 bg-secondary/30 rounded-lg">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground space-y-2">
              <p><strong>Advanced Compression Features:</strong></p>
              <ul className="space-y-1 ml-4">
                <li>• Multiple compression levels with different quality/size trade-offs</li>
                <li>• Smart image optimization while preserving visual quality</li>
                <li>• Metadata removal for privacy and smaller file size</li>
                <li>• Real-time compression ratio calculation</li>
                <li>• Batch processing support for multiple files</li>
              </ul>
              <p className="mt-2">
                <strong>Best Practices:</strong> Use Medium compression for general use, High for storage/sharing, Extreme only when file size is critical.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PDFToolTemplate>
  );
};

export default CompressPdf;
