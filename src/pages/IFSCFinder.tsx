
import { useState } from "react";
import { ArrowLeft, Search, Building } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Sample banks for the dropdown
const banks = [
  "State Bank of India",
  "HDFC Bank",
  "ICICI Bank",
  "Axis Bank",
  "Punjab National Bank",
  "Bank of Baroda",
  "Canara Bank",
  "Union Bank of India",
  "Bank of India",
  "Indian Bank"
];

const IFSCFinder = () => {
  const [bank, setBank] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [branch, setBranch] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchPerformed(true);
    
    // In a real application, you would search an API for IFSC codes
    // This is just a demo with mock data
    const mockResults = [
      {
        bank: "State Bank of India",
        branch: "Main Branch",
        address: "123 Main St, Central District, Mumbai, Maharashtra",
        ifsc: "SBIN0000123",
        micr: "400002123",
        contact: "+91 22 1234 5678"
      },
      {
        bank: "HDFC Bank",
        branch: "City Center",
        address: "456 Market Road, West District, Mumbai, Maharashtra",
        ifsc: "HDFC0000456",
        micr: "400059456",
        contact: "+91 22 9876 5432"
      }
    ];
    
    // Filter based on entered info
    const filtered = mockResults.filter(item => {
      if (bank && !item.bank.toLowerCase().includes(bank.toLowerCase())) return false;
      if (branch && !item.branch.toLowerCase().includes(branch.toLowerCase())) return false;
      return true;
    });
    
    setResults(filtered);
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/">
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Tools
          </Button>
        </Link>
      </div>

      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-4 mb-4 rounded-full bg-primary/10">
          <Building className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">IFSC Code Finder</h1>
        <p className="text-muted-foreground mt-2">Find IFSC codes for banks across India</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search IFSC Codes</CardTitle>
          <CardDescription>Enter bank details to find the IFSC code</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="bank" className="block text-sm font-medium mb-1">
                  Bank Name
                </label>
                <Input 
                  id="bank"
                  list="banks"
                  placeholder="Select or type bank name"
                  value={bank}
                  onChange={(e) => setBank(e.target.value)}
                />
                <datalist id="banks">
                  {banks.map((bank, index) => (
                    <option key={index} value={bank} />
                  ))}
                </datalist>
              </div>
              
              <div>
                <label htmlFor="state" className="block text-sm font-medium mb-1">
                  State (Optional)
                </label>
                <Input 
                  id="state"
                  placeholder="Enter state name"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="district" className="block text-sm font-medium mb-1">
                  District (Optional)
                </label>
                <Input 
                  id="district"
                  placeholder="Enter district name"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="branch" className="block text-sm font-medium mb-1">
                  Branch (Optional)
                </label>
                <Input 
                  id="branch"
                  placeholder="Enter branch name"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <Button type="submit" className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Find IFSC Code
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {searchPerformed && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Search Results</h2>
          {results.length > 0 ? (
            <div className="space-y-4">
              {results.map((result, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-bold text-lg">{result.bank}</h3>
                        <p className="text-muted-foreground">{result.branch}</p>
                        <p className="mt-2 text-sm">{result.address}</p>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm text-muted-foreground">IFSC Code:</span>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold">{result.ifsc}</span>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                navigator.clipboard.writeText(result.ifsc);
                                alert("IFSC code copied to clipboard!");
                              }}
                            >
                              Copy
                            </Button>
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">MICR Code:</span>
                          <p className="font-mono">{result.micr}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Contact:</span>
                          <p>{result.contact}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p>No results found for your search criteria.</p>
                <p className="text-muted-foreground mt-2">Try broadening your search.</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default IFSCFinder;
