
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface PostOffice {
  Name: string;
  Description: string;
  BranchType: string;
  DeliveryStatus: string;
  Circle: string;
  District: string;
  Division: string;
  Region: string;
  State: string;
  Country: string;
}

interface PinCodeResponse {
  Message: string;
  Status: string;
  PostOffice: PostOffice[];
}

const PINLocator = () => {
  const { toast } = useToast();
  const [pinCode, setPinCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState<PostOffice[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handlePINSearch = async () => {
    if (!pinCode.trim() || pinCode.length !== 6 || !/^\d+$/.test(pinCode)) {
      setError('Please enter a valid 6-digit PIN code');
      return;
    }

    setLoading(true);
    setError(null);
    setLocations([]);

    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pinCode.trim()}`);
      if (!response.ok) {
        throw new Error('Error fetching PIN code data');
      }

      const data = await response.json() as PinCodeResponse[];
      if (data && data[0] && data[0].Status === "Success") {
        setLocations(data[0].PostOffice || []);
        toast({
          title: 'Success',
          description: `Found ${data[0].PostOffice.length} locations with PIN code ${pinCode}`,
        });
      } else {
        setError('No locations found with this PIN code');
        toast({
          title: 'No results',
          description: 'No locations found with this PIN code',
          variant: 'destructive',
        });
      }
    } catch (err) {
      console.error('Error fetching PIN code data:', err);
      setError('Failed to fetch data. Please try again.');
      toast({
        title: 'Error',
        description: 'Failed to fetch data. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">PIN Code Locator</h1>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Search by PIN Code</CardTitle>
              <CardDescription>Enter a PIN code to find locations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="pincode">PIN Code</Label>
                  <div className="relative">
                    <Input
                      id="pincode"
                      placeholder="e.g. 110001"
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                      className="pr-10"
                      maxLength={6}
                    />
                    <Button
                      className="absolute right-0 top-0 h-full rounded-l-none"
                      onClick={handlePINSearch}
                      disabled={loading}
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {error && (
                  <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">
                    {error}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {locations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Locations Found</CardTitle>
                <CardDescription>Post offices and areas with PIN code: {pinCode}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {locations.map((office, index) => (
                    <div key={index} className="p-4 bg-secondary/30 rounded-md">
                      <h3 className="font-semibold text-lg">{office.Name}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Branch Type:</span> {office.BranchType}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Delivery Status:</span> {office.DeliveryStatus}
                        </div>
                        <div>
                          <span className="text-muted-foreground">District:</span> {office.District}
                        </div>
                        <div>
                          <span className="text-muted-foreground">State:</span> {office.State}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PINLocator;
