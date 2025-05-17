
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Search, Building } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface BankDetails {
  BANK: string;
  IFSC: string;
  BRANCH: string;
  ADDRESS: string;
  CITY: string;
  DISTRICT: string;
  STATE: string;
  CONTACT?: string;
}

const IFSCFinder = () => {
  const { toast } = useToast();
  const [ifscCode, setIfscCode] = useState('');
  const [bankName, setBankName] = useState('');
  const [branch, setBranch] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [bankDetails, setBankDetails] = useState<BankDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchMode, setSearchMode] = useState<'ifsc' | 'bank'>('ifsc');

  // Function to handle IFSC search
  const handleIFSCSearch = async () => {
    if (!ifscCode.trim()) {
      setError('Please enter an IFSC code');
      return;
    }

    setLoading(true);
    setError(null);
    setBankDetails(null);

    try {
      const response = await fetch(`https://ifsc.razorpay.com/${ifscCode.trim()}`);
      if (!response.ok) {
        throw new Error('Invalid IFSC code or server error');
      }

      const data = await response.json();
      setBankDetails(data);
      toast({
        title: 'Success',
        description: 'Bank details found successfully!',
      });
    } catch (err) {
      console.error('Error fetching bank details:', err);
      setError('No bank found with this IFSC code');
      toast({
        title: 'Error',
        description: 'No bank found with this IFSC code',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Function to handle bank details search
  const handleBankSearch = async () => {
    if (!bankName.trim()) {
      setError('Please enter a bank name');
      return;
    }

    setLoading(true);
    setError(null);
    setBankDetails(null);

    // This is a simulated bank search since there's no direct API
    // In a real app, this would call a backend API
    setTimeout(() => {
      // Demo data for HDFC Bank - Andheri East
      if (bankName.toLowerCase().includes('hdfc') || bankName.toLowerCase().includes('sbi')) {
        // Generate sample IFSC based on inputs
        const bankPrefix = bankName.toLowerCase().includes('hdfc') ? 'HDFC' : 'SBIN';
        const branchCode = branch ? branch.slice(0, 4).toUpperCase() : 'ANDH';
        const cityCode = city ? city.slice(0, 2).toUpperCase() : 'MU';
        
        // Create a mock IFSC code
        const generatedIFSC = `${bankPrefix}0${branchCode}${cityCode}`;
        
        const mockData: BankDetails = {
          BANK: bankName.toUpperCase(),
          IFSC: generatedIFSC,
          BRANCH: branch || 'Andheri East',
          ADDRESS: `${bankName} Bank, ${branch || 'Andheri East'}, ${city || 'Mumbai'}`,
          CITY: city || 'Mumbai',
          DISTRICT: 'Mumbai',
          STATE: 'Maharashtra',
          CONTACT: '18001234567'
        };
        
        setBankDetails(mockData);
        toast({
          title: 'Success',
          description: 'Bank details found successfully!',
        });
      } else {
        setError('No bank found with this name. Try HDFC or SBI for demo.');
        toast({
          title: 'Bank not found',
          description: 'Try searching for HDFC or SBI for this demo',
          variant: 'destructive',
        });
      }
      setLoading(false);
    }, 1500);
  };

  // Function to copy IFSC code to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: 'IFSC code copied to clipboard.',
    });
  };

  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">IFSC Code Finder</h1>
          <p className="text-muted-foreground mb-8">Find IFSC codes by bank name, branch, or directly search by IFSC</p>
          
          <Tabs value={searchMode} onValueChange={(value) => setSearchMode(value as 'ifsc' | 'bank')}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="ifsc">Search by IFSC Code</TabsTrigger>
              <TabsTrigger value="bank">Search by Bank Details</TabsTrigger>
            </TabsList>

            <TabsContent value="ifsc">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Search by IFSC Code</CardTitle>
                  <CardDescription>Enter an IFSC code to get bank details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="ifsc">IFSC Code</Label>
                      <div className="relative">
                        <Input
                          id="ifsc"
                          placeholder="e.g. SBIN0000001"
                          value={ifscCode}
                          onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                          className="pr-10"
                        />
                        <Button
                          className="absolute right-0 top-0 h-full rounded-l-none"
                          onClick={handleIFSCSearch}
                          disabled={loading}
                        >
                          <Search className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {error && searchMode === 'ifsc' && (
                      <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">
                        {error}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bank">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Search by Bank Details</CardTitle>
                  <CardDescription>Enter bank name, branch and city to find IFSC code</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="bank-name">Bank Name</Label>
                      <Input
                        id="bank-name"
                        placeholder="e.g. HDFC Bank, SBI"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="branch">Branch Name</Label>
                      <Input
                        id="branch"
                        placeholder="e.g. Andheri East"
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        placeholder="e.g. Mumbai"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>

                    <Button
                      className="w-full"
                      onClick={handleBankSearch}
                      disabled={loading}
                    >
                      {loading ? 'Searching...' : 'Find IFSC Code'}
                    </Button>
                    
                    {error && searchMode === 'bank' && (
                      <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">
                        {error}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {bankDetails && (
            <Card>
              <CardHeader>
                <CardTitle>Bank Details</CardTitle>
                <CardDescription>Information for IFSC: {bankDetails.IFSC}</CardDescription>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-1 gap-4 text-sm">
                  <div className="flex justify-between py-2 border-b">
                    <dt className="font-medium">IFSC Code</dt>
                    <dd className="flex items-center">
                      {bankDetails.IFSC}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-2"
                        onClick={() => copyToClipboard(bankDetails.IFSC)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </dd>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <dt className="font-medium">Bank Name</dt>
                    <dd>{bankDetails.BANK}</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <dt className="font-medium">Branch</dt>
                    <dd>{bankDetails.BRANCH}</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <dt className="font-medium">Address</dt>
                    <dd className="text-right">{bankDetails.ADDRESS}</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <dt className="font-medium">City</dt>
                    <dd>{bankDetails.CITY}</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <dt className="font-medium">District</dt>
                    <dd>{bankDetails.DISTRICT}</dd>
                  </div>
                  <div className="flex justify-between py-2">
                    <dt className="font-medium">State</dt>
                    <dd>{bankDetails.STATE}</dd>
                  </div>
                  {bankDetails.CONTACT && (
                    <div className="flex justify-between py-2 border-t">
                      <dt className="font-medium">Contact</dt>
                      <dd>{bankDetails.CONTACT}</dd>
                    </div>
                  )}
                </dl>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default IFSCFinder;
