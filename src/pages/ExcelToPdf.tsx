
import React, { useState } from 'react';
import { FileSpreadsheet, ArrowLeft, Upload, Download, Settings, Table } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const ExcelToPdf = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  
  // Advanced options
  const [worksheetSelection, setWorksheetSelection] = useState('all');
  const [customWorksheets, setCustomWorksheets] = useState('');
  const [pageOrientation, setPageOrientation] = useState('auto');
  const [pageSize, setPageSize] = useState('A4');
  const [margins, setMargins] = useState([20]);
  const [scaling, setScaling] = useState([100]);
  const [fitToPage, setFitToPage] = useState(false);
  const [includeGridlines, setIncludeGridlines] = useState(true);
  const [includeHeaders, setIncludeHeaders] = useState(true);
  const [includeRowNumbers, setIncludeRowNumbers] = useState(false);
  const [headerFooter, setHeaderFooter] = useState(false);
  const [customHeader, setCustomHeader] = useState('');
  const [customFooter, setCustomFooter] = useState('');
  const [quality, setQuality] = useState([95]);
  const [compression, setCompression] = useState('balanced');

  const handleFileChange = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
    
    const fileArray = Array.from(selectedFiles);
    const validFiles = fileArray.filter(file => {
      const validTypes = [
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ];
      
      if (!validTypes.includes(file.type)) {
        toast({
          title: 'Invalid file type',
          description: `${file.name} is not an Excel file`,
          variant: 'destructive',
        });
        return false;
      }
      
      if (file.size > 100 * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: `${file.name} is larger than 100MB`,
          variant: 'destructive',
        });
        return false;
      }
      
      return true;
    });
    
    if (validFiles.length > 0) {
      setFiles(validFiles);
    }
  };

  const handleProcess = async () => {
    if (files.length === 0) {
      toast({
        title: 'No files selected',
        description: 'Please select Excel files to convert',
        variant: 'destructive',
      });
      return;
    }

    setProcessing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const options = {
        worksheetSelection,
        customWorksheets,
        pageOrientation,
        pageSize,
        margins: margins[0],
        scaling: scaling[0],
        fitToPage,
        includeGridlines,
        includeHeaders,
        includeRowNumbers,
        headerFooter,
        customHeader,
        customFooter,
        quality: quality[0],
        compression
      };
      
      console.log('Converting Excel to PDF with options:', options);
      
      // Create dummy PDF content
      const pdfContent = `Excel to PDF conversion completed with advanced features:
      - Worksheets: ${worksheetSelection}
      - Page Size: ${pageSize}
      - Orientation: ${pageOrientation}
      - Scaling: ${scaling[0]}%
      - ${includeGridlines ? 'Gridlines included' : 'No gridlines'}
      - ${fitToPage ? 'Fit to page enabled' : 'Original size'}`;
      
      const blob = new Blob([pdfContent], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${files[0].name.replace(/\.(xls|xlsx)$/i, '')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: 'Conversion complete',
        description: 'Excel has been converted to PDF with advanced features',
      });
    } catch (error) {
      console.error('Conversion error:', error);
      toast({
        title: 'Conversion failed',
        description: 'An error occurred while converting your Excel file',
        variant: 'destructive',
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
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
          <FileSpreadsheet className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">Excel to PDF Converter</h1>
        <p className="text-muted-foreground mt-2">Convert Excel spreadsheets into professional PDF documents with advanced formatting</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* File Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Excel Files</CardTitle>
            <CardDescription>Select XLS or XLSX files to convert to PDF</CardDescription>
          </CardHeader>
          <CardContent>
            <div 
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                dragOver 
                  ? 'border-primary bg-primary/5' 
                  : 'border-muted-foreground/25 hover:border-muted-foreground/50'
              }`}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFileChange(e.dataTransfer.files); }}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={(e) => { e.preventDefault(); setDragOver(false); }}
            >
              <input 
                type="file" 
                accept=".xls,.xlsx"
                multiple
                onChange={(e) => handleFileChange(e.target.files)} 
                className="hidden" 
                id="file-upload"
              />
              <Label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2">
                <Upload className="h-10 w-10 text-muted-foreground" />
                <span className="text-lg font-medium">Drop Excel files here or click to select</span>
                <span className="text-sm text-muted-foreground">XLS, XLSX files up to 100MB</span>
              </Label>
            </div>

            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                <Label>Selected Files ({files.length})</Label>
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-secondary/30 rounded-md">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{file.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setFiles(files.filter((_, i) => i !== index))}
                      className="text-destructive hover:text-destructive"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Advanced Options */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Advanced Options
            </CardTitle>
            <CardDescription>Customize your PDF conversion</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Worksheet Selection</Label>
              <Select value={worksheetSelection} onValueChange={setWorksheetSelection}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Worksheets</SelectItem>
                  <SelectItem value="active">Active Sheet</SelectItem>
                  <SelectItem value="custom">Custom Selection</SelectItem>
                </SelectContent>
              </Select>
              {worksheetSelection === 'custom' && (
                <Input
                  value={customWorksheets}
                  onChange={(e) => setCustomWorksheets(e.target.value)}
                  placeholder="e.g., Sheet1, Sheet3, Data"
                  className="mt-2"
                />
              )}
            </div>

            <div>
              <Label>Page Size</Label>
              <Select value={pageSize} onValueChange={setPageSize}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A4">A4</SelectItem>
                  <SelectItem value="A3">A3</SelectItem>
                  <SelectItem value="Letter">Letter</SelectItem>
                  <SelectItem value="Legal">Legal</SelectItem>
                  <SelectItem value="Tabloid">Tabloid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Page Orientation</Label>
              <Select value={pageOrientation} onValueChange={setPageOrientation}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto</SelectItem>
                  <SelectItem value="portrait">Portrait</SelectItem>
                  <SelectItem value="landscape">Landscape</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Compression</Label>
              <Select value={compression} onValueChange={setCompression}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No compression</SelectItem>
                  <SelectItem value="balanced">Balanced</SelectItem>
                  <SelectItem value="high">High compression</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Scaling: {scaling[0]}%</Label>
              <Slider
                value={scaling}
                onValueChange={setScaling}
                max={200}
                min={25}
                step={25}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Margins: {margins[0]}mm</Label>
              <Slider
                value={margins}
                onValueChange={setMargins}
                max={50}
                min={5}
                step={5}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Quality: {quality[0]}%</Label>
              <Slider
                value={quality}
                onValueChange={setQuality}
                max={100}
                min={50}
                step={5}
                className="mt-2"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Fit to Page</Label>
                <Switch checked={fitToPage} onCheckedChange={setFitToPage} />
              </div>
              
              <div className="flex items-center justify-between">
                <Label>Include Gridlines</Label>
                <Switch checked={includeGridlines} onCheckedChange={setIncludeGridlines} />
              </div>

              <div className="flex items-center justify-between">
                <Label>Include Headers</Label>
                <Switch checked={includeHeaders} onCheckedChange={setIncludeHeaders} />
              </div>

              <div className="flex items-center justify-between">
                <Label>Include Row Numbers</Label>
                <Switch checked={includeRowNumbers} onCheckedChange={setIncludeRowNumbers} />
              </div>

              <div className="flex items-center justify-between">
                <Label>Custom Header/Footer</Label>
                <Switch checked={headerFooter} onCheckedChange={setHeaderFooter} />
              </div>

              {headerFooter && (
                <div className="space-y-2">
                  <Input
                    value={customHeader}
                    onChange={(e) => setCustomHeader(e.target.value)}
                    placeholder="Custom header text"
                  />
                  <Input
                    value={customFooter}
                    onChange={(e) => setCustomFooter(e.target.value)}
                    placeholder="Custom footer text"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 text-center">
        <Button 
          onClick={handleProcess} 
          disabled={files.length === 0 || processing} 
          className="bg-primary flex items-center gap-2 min-w-[200px]"
          size="lg"
        >
          {processing ? (
            <>Processing...</>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Convert to PDF
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ExcelToPdf;
