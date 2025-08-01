
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { 
  FileText, 
  Image as ImageIcon, 
  Calculator, 
  Palette, 
  Rocket,
  BarChart3,
  Code,
  Users
} from 'lucide-react';

const Home = () => {
  const toolCategories = [
    {
      title: "PDF Tools",
      description: "Convert, merge, split, and compress PDFs with ease",
      icon: <FileText className="h-8 w-8" />,
      link: "/pdf-tools",
      tools: ["PDF to Word", "PDF Merger", "PDF Splitter", "PDF Compressor"]
    },
    {
      title: "AI Generators", 
      description: "AI-powered tools to boost your creativity and productivity",
      icon: <Rocket className="h-8 w-8" />,
      link: "/ai-generators",
      tools: ["Content Writer", "Code Generator", "Image Generator", "Barcode Generator"]
    },
    {
      title: "Image Tools",
      description: "Edit, convert, and optimize your images",
      icon: <ImageIcon className="h-8 w-8" />,
      link: "/image-generator",
      tools: ["Image Converter", "Image Compressor", "Background Remover", "Image Enhancer"]
    },
    {
      title: "Calculators",
      description: "Smart online calculators for everyday needs",
      icon: <Calculator className="h-8 w-8" />,
      link: "/calculator", 
      tools: ["Basic Calculator", "Scientific Calculator", "Unit Converter", "Percentage Calculator"]
    },
    {
      title: "Color Tools",
      description: "Discover and generate color palettes for your projects",
      icon: <Palette className="h-8 w-8" />,
      link: "/color-picker",
      tools: ["Color Picker", "Palette Generator", "Gradient Creator", "Color Converter"]
    },
    {
      title: "Analytics",
      description: "Track and analyze your website performance",
      icon: <BarChart3 className="h-8 w-8" />,
      link: "/analytics",
      tools: ["Website Analyzer", "SEO Checker", "Speed Test", "Traffic Monitor"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to <span className="text-primary">Pine Tools Hub</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Your all-in-one AI-powered toolkit for creators, professionals, and learners
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/signup">Get Started Free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Tools Categories */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Explore Our Tool Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {toolCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-primary">
                      {category.icon}
                    </div>
                    <CardTitle>{category.title}</CardTitle>
                  </div>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {category.tools.map((tool, toolIndex) => (
                      <div key={toolIndex} className="text-sm text-muted-foreground">
                        • {tool}
                      </div>
                    ))}
                  </div>
                  <Button asChild className="w-full">
                    <Link to={category.link}>Explore Tools</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Pine Tools Hub?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
              <p className="text-muted-foreground">
                Leverage cutting-edge AI technology for smarter, faster results
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">User-Friendly</h3>
              <p className="text-muted-foreground">
                Intuitive interface designed for users of all skill levels
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Always Updated</h3>
              <p className="text-muted-foreground">
                Regular updates with new features and improved performance
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
