
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import ToolCard from '@/components/ToolCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Lock, Code, CreditCard, Mail, Barcode, User, FileText, Calendar, Car, 
  FileImage, FileText as FileTextIcon, Image, Pencil, FilePlus, PenLine } from 'lucide-react';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  
  // Load recently used tools from localStorage
  const [recentTools, setRecentTools] = useState<number[]>([]);
  
  useEffect(() => {
    const savedRecent = localStorage.getItem('recentTools');
    if (savedRecent) {
      try {
        setRecentTools(JSON.parse(savedRecent));
      } catch (e) {
        console.error("Error parsing recent tools from localStorage", e);
      }
    }
  }, []);
  
  // Tool categories configuration
  const categories = [
    { id: 'all', name: 'All Tools' },
    { id: 'documents', name: 'PDF & Documents' },
    { id: 'images', name: 'Images & Media' },
    { id: 'text', name: 'Text & Content' },
    { id: 'developer', name: 'Developer Tools' },
    { id: 'utilities', name: 'Utilities' }
  ];
  
  // Define all tools with categories
  const tools = [
    // Original tools
    {
      id: 1,
      title: 'Password Generator',
      description: 'Generate secure passwords with customizable options',
      icon: <Lock className="h-6 w-6" />,
      route: '/password-generator',
      tags: ['password', 'security', 'generate'],
      category: 'utilities'
    },
    {
      id: 2,
      title: 'IFSC Code Finder',
      description: 'Find Indian bank IFSC codes by bank name or branch',
      icon: <Code className="h-6 w-6" />,
      route: '/ifsc-finder',
      tags: ['ifsc', 'bank', 'india', 'code'],
      category: 'utilities'
    },
    {
      id: 3,
      title: 'PIN Code Locator',
      description: 'Lookup postal PIN codes for any city or district in India',
      icon: <Search className="h-6 w-6" />,
      route: '/pin-locator',
      tags: ['pin', 'postal', 'india', 'code'],
      category: 'utilities'
    },
    {
      id: 4,
      title: 'Fake Credit Card',
      description: 'Generate test credit card numbers with valid formats',
      icon: <CreditCard className="h-6 w-6" />,
      route: '/credit-card-generator',
      tags: ['card', 'credit', 'test'],
      category: 'developer'
    },
    {
      id: 5,
      title: 'Temporary Email',
      description: 'Create disposable email addresses for temporary use',
      icon: <Mail className="h-6 w-6" />,
      route: '/temp-email',
      tags: ['email', 'temporary', 'disposable'],
      category: 'developer'
    },
    {
      id: 6,
      title: 'Barcode & QR Generator',
      description: 'Generate QR codes and barcodes from any text or URL',
      icon: <Barcode className="h-6 w-6" />,
      route: '/barcode-generator',
      tags: ['qr', 'barcode', 'code', 'scan'],
      category: 'developer'
    },
    {
      id: 7,
      title: 'Fake Identity',
      description: 'Generate random identities with names, addresses and more',
      icon: <User className="h-6 w-6" />,
      route: '/fake-identity',
      tags: ['identity', 'fake', 'random', 'person'],
      category: 'developer'
    },
    {
      id: 8,
      title: 'Lorem Ipsum Generator',
      description: 'Generate placeholder text for your designs and mock-ups',
      icon: <FileText className="h-6 w-6" />,
      route: '/lorem-ipsum',
      tags: ['lorem', 'text', 'placeholder', 'dummy'],
      category: 'text'
    },
    {
      id: 9,
      title: 'Random Date/Time',
      description: 'Generate random dates and times in various formats',
      icon: <Calendar className="h-6 w-6" />,
      route: '/date-generator',
      tags: ['date', 'time', 'random', 'generator'],
      category: 'utilities'
    },
    {
      id: 10,
      title: 'Vehicle Number Plate',
      description: 'Generate vehicle license plates for different countries',
      icon: <Car className="h-6 w-6" />,
      route: '/number-plate',
      tags: ['vehicle', 'license', 'plate', 'car'],
      category: 'utilities'
    },
    
    // New PDF & Document Tools
    {
      id: 11,
      title: 'PDF to Word',
      description: 'Convert PDF documents to editable Word files',
      icon: <FileTextIcon className="h-6 w-6" />,
      route: '/pdf-to-word',
      tags: ['pdf', 'word', 'convert', 'document'],
      category: 'documents'
    },
    {
      id: 12,
      title: 'Word to PDF',
      description: 'Convert Word documents to PDF format',
      icon: <FilePlus className="h-6 w-6" />,
      route: '/word-to-pdf',
      tags: ['word', 'pdf', 'convert', 'document'],
      category: 'documents'
    },
    {
      id: 13,
      title: 'PDF Split & Merge',
      description: 'Split PDF into multiple files or merge PDFs together',
      icon: <FileText className="h-6 w-6" />,
      route: '/pdf-split-merge',
      tags: ['pdf', 'split', 'merge', 'document'],
      category: 'documents'
    },
    
    // New Image Tools
    {
      id: 14,
      title: 'Image Compressor',
      description: 'Compress JPG, PNG and WebP images with minimal quality loss',
      icon: <Image className="h-6 w-6" />,
      route: '/image-compressor',
      tags: ['image', 'compress', 'optimize', 'photo'],
      category: 'images'
    },
    {
      id: 15,
      title: 'Image Converter',
      description: 'Convert between image formats (PNG, JPG, WebP, AVIF)',
      icon: <Image className="h-6 w-6" />,
      route: '/image-converter',
      tags: ['image', 'convert', 'format', 'photo'],
      category: 'images'
    },
    
    // New Text Tool
    {
      id: 16,
      title: 'Text Case Converter',
      description: 'Convert text between different cases (UPPER, lower, Title Case)',
      icon: <PenLine className="h-6 w-6" />,
      route: '/text-case-converter',
      tags: ['text', 'case', 'convert', 'format'],
      category: 'text'
    }
  ];

  // Filter tools based on search term and selected category
  const filteredTools = tools.filter(tool => {
    // Handle search filtering
    const matchesSearch = searchTerm === '' || 
      tool.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      tool.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
      tool.tags.some(tag => tag.includes(searchTerm.toLowerCase()));
    
    // Handle category filtering  
    const matchesCategory = selectedTab === 'all' || tool.category === selectedTab;
    
    return matchesSearch && matchesCategory;
  });
  
  // Get recently used tools
  const recentlyUsedTools = recentTools
    .map(id => tools.find(tool => tool.id === id))
    .filter(Boolean);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-secondary/30 py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Smart Generator Tools Hub
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
            A powerful collection of tools for developers, businesses, and everyday users
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all animate-bounce"
            onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Tools
          </Button>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center">Tools Collection</h2>
          <p className="text-muted-foreground text-center mb-8">Find the perfect tool for your needs</p>
          
          <div className="max-w-lg mx-auto mb-10">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for tools..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* Recently Used Tools */}
          {recentlyUsedTools.length > 0 && (
            <div className="mb-10">
              <h3 className="text-xl font-semibold mb-4">Recently Used Tools</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentlyUsedTools.slice(0, 3).map((tool) => (
                  tool && <ToolCard
                    key={`recent-${tool.id}`}
                    title={tool.title}
                    description={tool.description}
                    icon={tool.icon}
                    route={tool.route}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Category Tabs */}
          <Tabs 
            defaultValue="all" 
            value={selectedTab} 
            onValueChange={setSelectedTab}
            className="mb-8"
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-6 mb-6">
              {categories.map(category => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {/* All Tools */}
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map((tool) => (
                  <ToolCard
                    key={tool.id}
                    title={tool.title}
                    description={tool.description}
                    icon={tool.icon}
                    route={tool.route}
                  />
                ))}
              </div>
            </TabsContent>
            
            {/* Category-specific Tabs */}
            {categories.slice(1).map(category => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTools.map((tool) => (
                    <ToolCard
                      key={tool.id}
                      title={tool.title}
                      description={tool.description}
                      icon={tool.icon}
                      route={tool.route}
                    />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          
          {filteredTools.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No tools found. Try a different search term.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Index;
