
import React, { useState } from 'react';
import { ArrowLeft, ImagePlus, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';
import Layout from '@/components/Layout';

const ImageToText = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [text, setText] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file type
      if (!file.type.match('image.*')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }
      
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImagePreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
      setText('');
    }
  };

  const extractText = async () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please select an image first",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Simulating OCR processing with a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate some sample text based on the image name
      const sampleText = `This is extracted text from your image "${selectedImage.name}".\n\nOCR technology has analyzed the image and extracted this text content. In a real implementation, this would contain the actual text from your image.\n\nThe image size is ${Math.round(selectedImage.size / 1024)} KB.`;
      
      setText(sampleText);
      
      toast({
        title: "Text extracted",
        description: "Text has been successfully extracted from the image",
      });
    } catch (error) {
      console.error('Error extracting text:', error);
      toast({
        title: "Extraction failed",
        description: "An error occurred while extracting text from the image",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Text copied to clipboard",
    });
  };

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Tools
          </Button>
        </div>
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-4 mb-4 rounded-full bg-primary/10">
            <ImagePlus className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Image to Text Converter</h1>
          <p className="text-muted-foreground mt-2">Extract text from images using OCR technology</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
                
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors mb-4">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    className="hidden" 
                    id="image-upload"
                  />
                  <Label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center gap-2">
                    <ImagePlus className="h-10 w-10 text-muted-foreground" />
                    <span className="text-lg font-medium">
                      {selectedImage ? selectedImage.name : 'Click to select image or drop it here'}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Supports JPG, PNG, BMP, GIF
                    </span>
                  </Label>
                </div>

                {imagePreview && (
                  <div className="mt-4 overflow-hidden rounded-md">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="max-h-[200px] mx-auto object-contain"
                    />
                  </div>
                )}

                <Button 
                  className="w-full mt-4 flex items-center justify-center gap-2"
                  disabled={!selectedImage || loading}
                  onClick={extractText}
                >
                  {loading ? "Extracting..." : (
                    <>
                      <Upload className="h-4 w-4" />
                      Extract Text
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Extracted Text</h2>
                <div className="bg-muted p-4 rounded-md min-h-[200px] whitespace-pre-wrap">
                  {text || "Extracted text will appear here..."}
                </div>
                {text && (
                  <Button 
                    className="w-full mt-4"
                    onClick={copyToClipboard}
                  >
                    Copy to Clipboard
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mt-8 text-center text-muted-foreground">
          <p>Note: This is a demo implementation. For a real OCR service, you would need to integrate with an OCR API like Tesseract.js, Google Vision API, or Microsoft Computer Vision API.</p>
        </div>
      </div>
    </Layout>
  );
};

export default ImageToText;
