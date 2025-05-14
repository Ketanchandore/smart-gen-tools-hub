
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import ToolCard from '@/components/ToolCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Lock, Code, CreditCard, Mail, Barcode, User, FileText, Calendar, Car } from 'lucide-react';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const tools = [
    {
      id: 1,
      title: 'Password Generator',
      description: 'Generate secure passwords with customizable options',
      icon: <Lock className="h-6 w-6" />,
      route: '/password-generator',
      tags: ['password', 'security', 'generate']
    },
    {
      id: 2,
      title: 'IFSC Code Finder',
      description: 'Find Indian bank IFSC codes by bank name or branch',
      icon: <Code className="h-6 w-6" />,
      route: '/ifsc-finder',
      tags: ['ifsc', 'bank', 'india', 'code']
    },
    {
      id: 3,
      title: 'PIN Code Locator',
      description: 'Lookup postal PIN codes for any city or district in India',
      icon: <Search className="h-6 w-6" />,
      route: '/pin-locator',
      tags: ['pin', 'postal', 'india', 'code']
    },
    {
      id: 4,
      title: 'Fake Credit Card',
      description: 'Generate test credit card numbers with valid formats',
      icon: <CreditCard className="h-6 w-6" />,
      route: '/credit-card-generator',
      tags: ['card', 'credit', 'test']
    },
    {
      id: 5,
      title: 'Temporary Email',
      description: 'Create disposable email addresses for temporary use',
      icon: <Mail className="h-6 w-6" />,
      route: '/temp-email',
      tags: ['email', 'temporary', 'disposable']
    },
    {
      id: 6,
      title: 'Barcode & QR Generator',
      description: 'Generate QR codes and barcodes from any text or URL',
      icon: <Barcode className="h-6 w-6" />,
      route: '/barcode-generator',
      tags: ['qr', 'barcode', 'code', 'scan']
    },
    {
      id: 7,
      title: 'Fake Identity',
      description: 'Generate random identities with names, addresses and more',
      icon: <User className="h-6 w-6" />,
      route: '/fake-identity',
      tags: ['identity', 'fake', 'random', 'person']
    },
    {
      id: 8,
      title: 'Lorem Ipsum Generator',
      description: 'Generate placeholder text for your designs and mock-ups',
      icon: <FileText className="h-6 w-6" />,
      route: '/lorem-ipsum',
      tags: ['lorem', 'text', 'placeholder', 'dummy']
    },
    {
      id: 9,
      title: 'Random Date/Time',
      description: 'Generate random dates and times in various formats',
      icon: <Calendar className="h-6 w-6" />,
      route: '/date-generator',
      tags: ['date', 'time', 'random', 'generator']
    },
    {
      id: 10,
      title: 'Vehicle Number Plate',
      description: 'Generate vehicle license plates for different countries',
      icon: <Car className="h-6 w-6" />,
      route: '/number-plate',
      tags: ['vehicle', 'license', 'plate', 'car']
    }
  ];

  const filteredTools = searchTerm 
    ? tools.filter(tool => 
        tool.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
        tool.tags.some(tag => tag.includes(searchTerm.toLowerCase()))
      )
    : tools;

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
            A collection of powerful tools for developers, businesses, and everyday users
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
