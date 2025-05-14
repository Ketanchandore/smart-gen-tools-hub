
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { RefreshCw, Copy } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const DateGenerator = () => {
  const { toast } = useToast();
  const [dateType, setDateType] = useState<'past' | 'future' | 'random'>('random');
  const [format, setFormat] = useState('YYYY-MM-DD');
  const [includeTime, setIncludeTime] = useState(false);
  const [generatedDate, setGeneratedDate] = useState('');
  const [yearRange, setYearRange] = useState(10);

  const formatList = [
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
    { value: 'MMMM D, YYYY', label: 'Month Day, Year' },
    { value: 'D MMMM YYYY', label: 'Day Month Year' },
  ];

  // Generate a random date
  const generateDate = () => {
    const now = new Date();
    let targetDate: Date;
    
    // Determine the date range based on the selected type
    switch (dateType) {
      case 'past':
        targetDate = new Date(
          now.getFullYear() - Math.floor(Math.random() * yearRange),
          Math.floor(Math.random() * 12),
          Math.floor(Math.random() * 28) + 1
        );
        break;
      case 'future':
        targetDate = new Date(
          now.getFullYear() + Math.floor(Math.random() * yearRange),
          Math.floor(Math.random() * 12),
          Math.floor(Math.random() * 28) + 1
        );
        break;
      case 'random':
        const isPast = Math.random() > 0.5;
        targetDate = new Date(
          now.getFullYear() + (isPast ? -1 : 1) * Math.floor(Math.random() * yearRange),
          Math.floor(Math.random() * 12),
          Math.floor(Math.random() * 28) + 1
        );
        break;
    }
    
    // Add random time if needed
    if (includeTime) {
      targetDate.setHours(Math.floor(Math.random() * 24));
      targetDate.setMinutes(Math.floor(Math.random() * 60));
      targetDate.setSeconds(Math.floor(Math.random() * 60));
    }
    
    // Format the date
    let formattedDate = formatDate(targetDate, format);
    
    if (includeTime) {
      const hours = targetDate.getHours().toString().padStart(2, '0');
      const minutes = targetDate.getMinutes().toString().padStart(2, '0');
      const seconds = targetDate.getSeconds().toString().padStart(2, '0');
      formattedDate += ` ${hours}:${minutes}:${seconds}`;
    }
    
    setGeneratedDate(formattedDate);
    
    toast({
      title: 'Date Generated',
      description: `Generated a ${dateType} date.`,
    });
  };

  // Format date according to the selected format
  const formatDate = (date: Date, format: string): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    switch (format) {
      case 'YYYY-MM-DD':
        return `${year}-${month}-${day}`;
      case 'MM/DD/YYYY':
        return `${month}/${day}/${year}`;
      case 'DD/MM/YYYY':
        return `${day}/${month}/${year}`;
      case 'MMMM D, YYYY':
        return `${monthNames[date.getMonth()]} ${date.getDate()}, ${year}`;
      case 'D MMMM YYYY':
        return `${date.getDate()} ${monthNames[date.getMonth()]} ${year}`;
      default:
        return `${year}-${month}-${day}`;
    }
  };

  // Copy the generated date to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedDate);
    toast({
      title: 'Date Copied!',
      description: 'The date has been copied to your clipboard.',
    });
  };

  // Generate a date on component mount
  useEffect(() => {
    generateDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Random Date & Time Generator</h1>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Generated Date</CardTitle>
              <CardDescription>Your random date and time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-primary/30 to-accent/30 p-6 rounded-lg shadow-inner flex justify-between items-center">
                <div className="text-xl font-mono">{generatedDate}</div>
                <Button variant="outline" size="icon" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Date Options</CardTitle>
              <CardDescription>Customize your random date</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Date Type</Label>
                <RadioGroup 
                  defaultValue="random" 
                  value={dateType}
                  onValueChange={(value) => setDateType(value as 'past' | 'future' | 'random')}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="past" id="past" />
                    <Label htmlFor="past">Past Date</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="future" id="future" />
                    <Label htmlFor="future">Future Date</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="random" id="random" />
                    <Label htmlFor="random">Random Date</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="year-range">Year Range (±{yearRange} years)</Label>
                <Input
                  id="year-range"
                  type="number"
                  min="1"
                  max="100"
                  value={yearRange}
                  onChange={(e) => setYearRange(parseInt(e.target.value) || 10)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="format">Date Format</Label>
                <Select value={format} onValueChange={setFormat}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    {formatList.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="include-time">Include Time</Label>
                <Switch
                  id="include-time"
                  checked={includeTime}
                  onCheckedChange={setIncludeTime}
                />
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-primary to-accent flex items-center justify-center gap-2"
                onClick={generateDate}
              >
                <RefreshCw className="h-4 w-4" />
                Generate New Date
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DateGenerator;
