
import React, { useState } from 'react';
import { 
  Banknote, FileText, FilePlus, CreditCard, 
  Calendar, User, Image, BarChart2, 
  Search, TrendingUp, Hash, UserRound, 
  Mic, FileVideo, Instagram, Twitter, 
  Mail, FileUp, Briefcase, MessageSquare, 
  Book, Zap, Lightbulb, Binary
} from 'lucide-react';
import ToolCard from '@/components/ToolCard';
import { Button } from '@/components/ui/button';
import { TabsList, TabsTrigger, Tabs, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode !== null ? JSON.parse(savedMode) : true;
  });

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
    document.documentElement.classList.toggle('dark', newMode);
  };

  // Tool categories
  const categories = [
    { id: 'all', label: 'All Tools' },
    { id: 'documents', label: 'Document Tools' },
    { id: 'content', label: 'Content Creation' },
    { id: 'career', label: 'Career Tools' },
    { id: 'learning', label: 'Learning Tools' },
    { id: 'utilities', label: 'Utilities' },
  ];
  
  // All tools with their categories
  const allTools = [
    // Document Tools
    { 
      id: 'pdf-to-word', 
      title: 'PDF to DOCX', 
      description: 'Convert PDF documents to editable Word files', 
      icon: <FileText />, 
      route: '/pdf-to-word',
      category: 'documents',
      isNew: false
    },
    { 
      id: 'word-to-pdf', 
      title: 'Word to PDF', 
      description: 'Convert Word documents to PDF format', 
      icon: <FileUp />, 
      route: '/word-to-pdf',
      category: 'documents',
      isNew: false
    },
    { 
      id: 'pdf-split-merge', 
      title: 'PDF Split & Merge', 
      description: 'Split or merge PDF files easily', 
      icon: <FilePlus />, 
      route: '/pdf-split-merge',
      category: 'documents',
      isNew: false
    },
    { 
      id: 'image-to-text', 
      title: 'Image to Text', 
      description: 'Extract text from images using OCR', 
      icon: <Image />, 
      route: '/image-to-text',
      category: 'documents',
      isNew: true
    },
    { 
      id: 'document-summarizer', 
      title: 'Document Summarizer', 
      description: 'Generate concise summaries from documents', 
      icon: <FileText />, 
      route: '/document-summarizer',
      category: 'documents',
      isNew: true
    },
    { 
      id: 'voice-to-notes', 
      title: 'Voice to Notes', 
      description: 'Convert speech to text and organized notes', 
      icon: <Mic />, 
      route: '/voice-to-notes',
      category: 'documents',
      isNew: true
    },
    
    // Content Creation
    { 
      id: 'blog-generator', 
      title: 'Blog Generator', 
      description: 'Generate full blog posts on any topic', 
      icon: <FileText />, 
      route: '/blog-generator',
      category: 'content',
      isNew: true
    },
    { 
      id: 'youtube-script', 
      title: 'YouTube Script', 
      description: 'Create engaging scripts for videos', 
      icon: <FileVideo />, 
      route: '/youtube-script',
      category: 'content',
      isNew: true
    },
    { 
      id: 'instagram-caption', 
      title: 'Instagram Caption', 
      description: 'Generate eye-catching captions', 
      icon: <Instagram />, 
      route: '/instagram-caption',
      category: 'content',
      isNew: true
    },
    { 
      id: 'tweet-generator', 
      title: 'Tweet Generator', 
      description: 'Create engaging tweets in seconds', 
      icon: <Twitter />, 
      route: '/tweet-generator',
      category: 'content',
      isNew: true
    },
    { 
      id: 'email-writer', 
      title: 'Email Writer', 
      description: 'Draft professional emails quickly', 
      icon: <Mail />, 
      route: '/email-writer',
      category: 'content',
      isNew: true
    },
    { 
      id: 'lorem-ipsum', 
      title: 'Lorem Ipsum', 
      description: 'Generate placeholder text for your designs', 
      icon: <FileText />, 
      route: '/lorem-ipsum',
      category: 'content',
      isNew: false
    },
    { 
      id: 'text-case-converter', 
      title: 'Text Case Converter', 
      description: 'Convert text between different cases', 
      icon: <FileText />, 
      route: '/text-case-converter',
      category: 'content',
      isNew: false
    },
    
    // Career Tools
    { 
      id: 'resume-builder', 
      title: 'Resume Builder', 
      description: 'Create professional resumes in minutes', 
      icon: <Briefcase />, 
      route: '/resume-builder',
      category: 'career',
      isNew: true
    },
    { 
      id: 'cover-letter', 
      title: 'Cover Letter', 
      description: 'Generate tailored cover letters', 
      icon: <FileText />, 
      route: '/cover-letter',
      category: 'career',
      isNew: true
    },
    { 
      id: 'linkedin-bio', 
      title: 'LinkedIn Bio', 
      description: 'Optimize your LinkedIn profile', 
      icon: <UserRound />, 
      route: '/linkedin-bio',
      category: 'career',
      isNew: true
    },
    { 
      id: 'interview-qa', 
      title: 'Interview Q&A', 
      description: 'Prepare for job interviews', 
      icon: <MessageSquare />, 
      route: '/interview-qa',
      category: 'career',
      isNew: true
    },
    
    // Learning Tools
    { 
      id: 'flashcards', 
      title: 'Text to Flashcards', 
      description: 'Convert study material to flashcards', 
      icon: <Book />, 
      route: '/flashcards',
      category: 'learning',
      isNew: true
    },
    { 
      id: 'mcq-generator', 
      title: 'MCQ Generator', 
      description: 'Create multiple choice questions', 
      icon: <Zap />, 
      route: '/mcq-generator',
      category: 'learning',
      isNew: true
    },
    { 
      id: 'concept-explainer', 
      title: 'Concept Explainer', 
      description: 'Simplify complex topics with AI', 
      icon: <Lightbulb />, 
      route: '/concept-explainer',
      category: 'learning',
      isNew: true
    },
    { 
      id: 'learn-with-image', 
      title: 'Learn With Image', 
      description: 'Upload diagrams for AI explanation', 
      icon: <Image />, 
      route: '/learn-with-image',
      category: 'learning',
      isNew: true
    },
    
    // Utilities
    { 
      id: 'barcode-generator', 
      title: 'Barcode Generator', 
      description: 'Generate barcodes for various products', 
      icon: <BarChart2 />, 
      route: '/barcode-generator',
      category: 'utilities',
      isNew: false
    },
    { 
      id: 'credit-card-generator', 
      title: 'Credit Card Generator', 
      description: 'Generate test credit card numbers', 
      icon: <CreditCard />, 
      route: '/credit-card-generator',
      category: 'utilities',
      isNew: false
    },
    { 
      id: 'date-generator', 
      title: 'Date Generator', 
      description: 'Generate random dates for testing', 
      icon: <Calendar />, 
      route: '/date-generator',
      category: 'utilities',
      isNew: false
    },
    { 
      id: 'fake-identity', 
      title: 'Fake Identity', 
      description: 'Generate realistic fake identities', 
      icon: <User />, 
      route: '/fake-identity',
      category: 'utilities',
      isNew: false
    },
    { 
      id: 'ifsc-finder', 
      title: 'IFSC Finder', 
      description: 'Find IFSC codes for Indian banks', 
      icon: <Banknote />, 
      route: '/ifsc-finder',
      category: 'utilities',
      isNew: false
    },
    { 
      id: 'image-compressor', 
      title: 'Image Compressor', 
      description: 'Compress your images without quality loss', 
      icon: <Image />, 
      route: '/image-compressor',
      category: 'utilities',
      isNew: false
    },
    { 
      id: 'image-converter', 
      title: 'Image Converter', 
      description: 'Convert images between different formats', 
      icon: <Image />, 
      route: '/image-converter',
      category: 'utilities',
      isNew: false
    },
    { 
      id: 'number-plate', 
      title: 'Number Plate', 
      description: 'Generate random vehicle number plates', 
      icon: <Hash />, 
      route: '/number-plate',
      category: 'utilities',
      isNew: false
    },
    { 
      id: 'password-generator', 
      title: 'Password Generator', 
      description: 'Generate secure passwords', 
      icon: <Binary />, 
      route: '/password-generator',
      category: 'utilities',
      isNew: false
    },
    { 
      id: 'pin-locator', 
      title: 'PIN Locator', 
      description: 'Find PIN codes for locations in India', 
      icon: <Search />, 
      route: '/pin-locator',
      category: 'utilities',
      isNew: false
    },
    { 
      id: 'temp-email', 
      title: 'Temp Email', 
      description: 'Generate temporary email addresses', 
      icon: <Mail />, 
      route: '/temp-email',
      category: 'utilities',
      isNew: false
    }
  ];

  // Filter tools based on search query and selected category
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const filteredTools = allTools.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">AI SmartHub</h1>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">
            {darkMode ? 'Dark Mode' : 'Light Mode'}
          </span>
          <Switch
            checked={darkMode}
            onCheckedChange={toggleDarkMode}
          />
        </div>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            className="pl-10 w-full"
            placeholder="Search for tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="overflow-x-auto pb-2">
          <TabsList className="mb-6 flex w-auto min-w-fit">
            {categories.map(category => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className="min-w-[100px] whitespace-nowrap"
              >
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {categories.map(category => (
          <TabsContent key={category.id} value={category.id}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTools.filter(tool => 
                category.id === 'all' || tool.category === category.id
              ).map(tool => (
                <ToolCard
                  key={tool.id}
                  title={tool.title}
                  description={tool.description}
                  icon={tool.icon}
                  route={tool.route}
                  category={tool.category === 'documents' ? 'Document Tools' : 
                            tool.category === 'content' ? 'Content Creation' : 
                            tool.category === 'career' ? 'Career Tools' :
                            tool.category === 'learning' ? 'Learning Tools' : 'Utilities'}
                  isNew={tool.isNew}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="fixed bottom-6 right-6 z-10">
        <Button className="rounded-full h-14 w-14 bg-primary hover:bg-primary/90 shadow-lg">
          <MessageSquare className="h-6 w-6" />
          <span className="sr-only">Get AI Help</span>
        </Button>
      </div>
    </div>
  );
};

export default Index;
