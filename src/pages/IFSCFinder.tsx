
import { useState } from "react";
import { ArrowLeft, Search, Building, Download, MapPin, Phone, Copy, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { banksList, statesList, searchIFSC, BankBranch } from "@/data/ifscData";
import ToolSEO from "@/components/ToolSEO";
import Layout from "@/components/Layout";

const IFSCFinder = () => {
  const [bank, setBank] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [branch, setBranch] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [results, setResults] = useState<BankBranch[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();

  const faqData = [
    {
      question: "What is an IFSC code?",
      answer: "IFSC (Indian Financial System Code) is an 11-character alphanumeric code used to identify bank branches in India for electronic fund transfers. The first four characters represent the bank, the fifth is 0 (zero), and the last six characters identify the specific branch."
    },
    {
      question: "How do I find my bank's IFSC code?",
      answer: "You can find your IFSC code on your bank cheque book, bank passbook, or by searching on our tool using your bank name, branch, city, and state. You can also verify an IFSC code by entering it directly."
    },
    {
      question: "What is a MICR code?",
      answer: "MICR (Magnetic Ink Character Recognition) is a 9-digit code used to identify the bank and branch for clearing cheques electronically. The first three digits represent the city, next three represent the bank, and last three represent the branch."
    },
    {
      question: "Can I use IFSC for international transfers?",
      answer: "No, IFSC codes are only for domestic transfers within India (NEFT, RTGS, IMPS). For international transfers, you'll need SWIFT codes along with other banking details."
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSearchPerformed(true);
    
    const searchQuery = {
      bank: bank || undefined,
      state: state || undefined,
      district: district || undefined,
      city: city || undefined,
      branch: branch || undefined,
      ifsc: ifscCode || undefined,
    };
    
    setTimeout(() => {
      const filtered = searchIFSC(searchQuery);
      setResults(filtered);
      setLoading(false);
      
      toast({
        title: "Search Complete",
        description: `Found ${filtered.length} matching branches`,
      });
    }, 500);
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard`,
    });
  };

  const exportResults = () => {
    const csv = [
      "IFSC,Bank,Branch,Address,City,District,State,MICR,Contact",
      ...results.map(r => `${r.ifsc},${r.bank},${r.branch},"${r.address}",${r.city},${r.district},${r.state},${r.micr || ''},${r.contact}`)
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ifsc_results.csv';
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Export Complete",
      description: "Results exported to CSV file",
    });
  };

  return (
    <>
      <ToolSEO
        title="IFSC Code Finder - Search Bank IFSC & MICR Codes Online"
        description="Find IFSC codes for all Indian banks instantly. Search by bank name, branch, city, state or verify IFSC codes. Get MICR codes, branch addresses, and contact details."
        keywords="ifsc code finder, ifsc code search, bank ifsc code, micr code, rtgs code, neft code, indian bank codes, branch locator"
        toolName="IFSC Code Finder"
        toolType="Tool"
        category="Financial Tools"
        features={[
          "Search IFSC by bank and location",
          "Verify IFSC codes instantly",
          "Get MICR codes and branch details",
          "Search across all Indian banks",
          "Export results to CSV",
          "Free and unlimited searches"
        ]}
        faqs={faqData}
      />
      <Layout>
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
            <h1 className="text-3xl font-bold">Advanced IFSC Code Finder</h1>
            <p className="text-muted-foreground mt-2">Find IFSC codes for all Indian banks with comprehensive search</p>
          </div>

      <Tabs defaultValue="search" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="search">Search IFSC</TabsTrigger>
          <TabsTrigger value="verify">Verify IFSC</TabsTrigger>
        </TabsList>

        <TabsContent value="search">
          <Card>
            <CardHeader>
              <CardTitle>Search IFSC Codes</CardTitle>
              <CardDescription>Find IFSC codes using bank details</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="bank" className="block text-sm font-medium mb-2">
                      Bank Name
                    </label>
                    <Select value={bank} onValueChange={setBank}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select bank" />
                      </SelectTrigger>
                      <SelectContent>
                        {banksList.map((bankName) => (
                          <SelectItem key={bankName} value={bankName}>
                            {bankName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium mb-2">
                      State
                    </label>
                    <Select value={state} onValueChange={setState}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {statesList.map((stateName) => (
                          <SelectItem key={stateName} value={stateName}>
                            {stateName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm font-medium mb-2">
                      City
                    </label>
                    <Input 
                      id="city"
                      placeholder="Enter city name"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="district" className="block text-sm font-medium mb-2">
                      District
                    </label>
                    <Input 
                      id="district"
                      placeholder="Enter district name"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="branch" className="block text-sm font-medium mb-2">
                      Branch
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
                  <Button type="submit" className="flex items-center gap-2" disabled={loading}>
                    <Search className="h-4 w-4" />
                    {loading ? "Searching..." : "Find IFSC Code"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verify">
          <Card>
            <CardHeader>
              <CardTitle>Verify IFSC Code</CardTitle>
              <CardDescription>Enter IFSC code to get bank details</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-4">
                <div>
                  <label htmlFor="ifsc" className="block text-sm font-medium mb-2">
                    IFSC Code
                  </label>
                  <Input 
                    id="ifsc"
                    placeholder="Enter IFSC code (e.g., SBIN0000001)"
                    value={ifscCode}
                    onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                    className="font-mono"
                  />
                </div>
                <Button type="submit" className="flex items-center gap-2" disabled={loading}>
                  <Search className="h-4 w-4" />
                  {loading ? "Verifying..." : "Verify IFSC"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {searchPerformed && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Search Results ({results.length} found)
            </h2>
            {results.length > 0 && (
              <Button onClick={exportResults} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            )}
          </div>
          
          {results.length > 0 ? (
            <div className="space-y-4">
              {results.map((result, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-bold text-lg text-primary">{result.bank}</h3>
                          <p className="text-muted-foreground font-medium">{result.branch}</p>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                          <p className="text-sm">{result.address}</p>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm">{result.contact}</p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">{result.city}</Badge>
                          <Badge variant="secondary">{result.district}</Badge>
                          <Badge variant="outline">{result.state}</Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="p-4 bg-muted rounded-lg">
                          <div className="space-y-3">
                            <div>
                              <span className="text-xs text-muted-foreground">IFSC Code</span>
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold text-lg">{result.ifsc}</span>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleCopy(result.ifsc, "IFSC code")}
                                  className="h-8 w-8 p-0"
                                >
                                  {copiedId === result.ifsc ? (
                                    <Check className="h-4 w-4 text-green-600" />
                                  ) : (
                                    <Copy className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </div>
                            
                            {result.micr && (
                              <div>
                                <span className="text-xs text-muted-foreground">MICR Code</span>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono">{result.micr}</span>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleCopy(result.micr!, "MICR code")}
                                    className="h-8 w-8 p-0"
                                  >
                                    {copiedId === result.micr ? (
                                      <Check className="h-4 w-4 text-green-600" />
                                    ) : (
                                      <Copy className="h-4 w-4" />
                                    )}
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
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
                <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium">No results found</p>
                <p className="text-muted-foreground mt-2">Try broadening your search criteria or check your spelling.</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* SEO Content & FAQs */}
      <section className="mt-12 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>About IFSC Codes</CardTitle>
            <CardDescription>Everything you need to know about Indian bank codes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              IFSC (Indian Financial System Code) is essential for all electronic fund transfers in India including NEFT, RTGS, and IMPS. Our comprehensive IFSC finder helps you locate codes for any bank branch across India instantly.
            </p>
            
            <h3 className="text-lg font-bold text-foreground mt-6">Why Use Our IFSC Finder?</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Complete Database:</strong> Access IFSC codes for all major Indian banks and their branches</li>
              <li><strong>Multiple Search Options:</strong> Find codes by bank name, branch, location, or verify existing codes</li>
              <li><strong>Detailed Information:</strong> Get MICR codes, branch addresses, contact numbers, and more</li>
              <li><strong>Export Capability:</strong> Download search results in CSV format for record-keeping</li>
            </ul>

            <div className="mt-8 bg-secondary/30 rounded-lg p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <div key={index} className="border-b border-border/30 pb-4 last:border-b-0">
                    <h4 className="font-semibold text-foreground mb-2">{faq.question}</h4>
                    <p className="text-sm">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 p-4 bg-primary/10 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">💡 Pro Tip</h4>
              <p>
                Always verify your IFSC code before initiating a transfer. Even a single incorrect character can cause transaction failures or delays. Use our verification tool to double-check codes.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
      </Layout>
    </>
  );
};

export default IFSCFinder;
