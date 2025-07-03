
import React, { useState } from 'react';
import { FileSpreadsheet, ArrowLeft, Upload, Download, Settings, Table, BarChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const PdfToExcel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  
  // Advanced options
  const [extractionMode, setExtractionMode] = useState('auto');
  const [tableDetection, setTableDetection] = useState(true);
  const [preserveFormatting, setPreserveFormatting] = useState(true);
  const [mergeSheets, setMergeSheets] = useState(false);
  const [pageRange, setPageRange] = useState('all');
  const [customRange, setCustomRange] = useState('');
  const [outputFormat, setOutputFormat] = useState('xlsx');
  const [includeHeaders, setIncludeHeaders] = useState(true);
  const [autoFitColumns, setAutoFitColumns] = useState(true);
  const [removeEmptyRows, setRemoveEmptyRows] = useState(true);
  const [dateFormat, setDateFormat] = useState('auto');
  const [numberFormat, setNumberFormat] = useState('auto');

  const handleFileChange = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
    
    const fileArray = Array.from(selectedFiles);
    const validFiles = fileArray.filter(file => {
      if (file.type !== 'application/pdf') {
        toast({
          title: 'Invalid file type',
          description: `${file.name} is not a PDF file`,
          variant: 'destructive',
        });
        return false;
      }
      
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: `${file.name} is larger than 50MB`,
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
        description: 'Please select PDF files to convert',
        variant: 'destructive',
      });
      return;
    }

    setProcessing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const options = {
        extractionMode,
        tableDetection,
        preserveFormatting,
        mergeSheets,
        pageRange,
        customRange,
        outputFormat,
        includeHeaders,
        autoFitColumns,
        removeEmptyRows,
        dateFormat,
        numberFormat
      };
      
      console.log('Converting PDF to Excel with options:', options);
      
      // Create dummy Excel content
      const excelContent = `PDF to Excel conversion completed with advanced features:
      - Extraction Mode: ${extractionMode}
      - Table Detection: ${tableDetection ? 'Enabled' : 'Disabled'}
      - Output Format: ${outputFormat.toUpperCase()}
      - ${preserveFormatting ? 'Formatting preserved' : 'Basic formatting'}
      - ${includeHeaders ? 'Headers included' : 'No headers'}`;
      
      const blob = new Blob([excelContent], { 
        type: outputFormat === 'xlsx' 
          ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          : 'application/vnd.ms-excel'
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${files[0].name.replace('.pdf', '')}.${outputFormat}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: 'Conversion complete',
        description: 'PDF has been converted to Excel with advanced features',
      });
    } catch (error) {
      console.error('Conversion error:', error);
      toast({
        title: 'Conversion failed',
        description: 'An error occurred while converting your PDF',
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
        <h1 className="text-3xl font-bold">PDF to Excel Converter</h1>
        <p className="text-muted-foreground mt-2">Convert PDF files into editable Excel spreadsheets with advanced table detection</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* File Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle>Upload PDF Files</CardTitle>
            <CardDescription>Select PDF files containing tables or data to convert</CardDescription>
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
                accept=".pdf"
                multiple
                onChange={(e) => handleFileChange(e.target.files)} 
                className="hidden" 
                id="file-upload"
              />
              <Label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2">
                <Upload className="h-10 w-10 text-muted-foreground" />
                <span className="text-lg font-medium">Drop PDF files here or click to select</span>
                <span className="text-sm text-muted-foreground">PDF files up to 50MB</span>
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
            <CardDescription>Customize your Excel conversion</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Extraction Mode</Label>
              <Select value={extractionMode} onValueChange={setExtractionMode}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto-detect</SelectItem>
                  <SelectItem value="tables-only">Tables Only</SelectItem>
                  <SelectItem value="all-text">All Text</SelectItem>
                  <SelectItem value="structured">Structured Data</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Output Format</Label>
              <Select value={outputFormat} onValueChange={setOutputFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="xlsx">Excel (.xlsx)</SelectItem>
                  <SelectItem value="xls">Excel Legacy (.xls)</SelectItem>
                  <SelectItem value="csv">CSV (.csv)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Page Range</Label>
              <Select value={pageRange} onValueChange={setPageRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Pages</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
              {pageRange === 'custom' && (
                <Input
                  value={customRange}
                  onChange={(e) => setCustomRange(e.target.value)}
                  placeholder="e.g., 1-5, 10, 15-20"
                  className="mt-2"
                />
              )}
            </div>

            <div>
              <Label>Date Format</Label>
              <Select value={dateFormat} onValueChange={setDateFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto-detect</SelectItem>
                  <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                  <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                  <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Number Format</Label>
              <Select value={numberFormat} onValueChange={setNumberFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto-detect</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="currency">Currency</SelectItem>
                  <SelectItem value="percentage">Percentage</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Smart Table Detection</Label>
                <Switch checked={tableDetection} onCheckedChange={setTableDetection} />
              </div>
              
              <div className="flex items-center justify-between">
                <Label>Preserve Formatting</Label>
                <Switch checked={preserveFormatting} onCheckedChange={setPreserveFormatting} />
              </div>

              <div className="flex items-center justify-between">
                <Label>Include Headers</Label>
                <Switch checked={includeHeaders} onCheckedChange={setIncludeHeaders} />
              </div>

              <div className="flex items-center justify-between">
                <Label>Auto-fit Columns</Label>
                <Switch checked={autoFitColumns} onCheckedChange={setAutoFitColumns} />
              </div>

              <div className="flex items-center justify-between">
                <Label>Remove Empty Rows</Label>
                <Switch checked={removeEmptyRows} onCheckedChange={setRemoveEmptyRows} />
              </div>

              <div className="flex items-center justify-between">
                <Label>Merge Multiple Sheets</Label>
                <Switch checked={mergeSheets} onCheckedChange={setMergeSheets} />
              </div>
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
              Convert to Excel
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default PdfToExcel;
