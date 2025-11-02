import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileDown, Scissors, FileText, Lock, Unlock, 
  RotateCw, Image, FileEdit, FileCheck, FileCog 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface RelatedTool {
  name: string;
  description: string;
  path: string;
  icon?: string;
}

interface PDFRelatedToolsProps {
  currentTool: string;
  tools?: RelatedTool[];
}

const PDFRelatedTools: React.FC<PDFRelatedToolsProps> = ({ currentTool, tools }) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    compress: <FileDown className="h-6 w-6 text-primary" />,
    split: <Scissors className="h-6 w-6 text-primary" />,
    merge: <FileText className="h-6 w-6 text-primary" />,
    protect: <Lock className="h-6 w-6 text-primary" />,
    unlock: <Unlock className="h-6 w-6 text-primary" />,
    rotate: <RotateCw className="h-6 w-6 text-primary" />,
    convert: <Image className="h-6 w-6 text-primary" />,
    edit: <FileEdit className="h-6 w-6 text-primary" />,
    sign: <FileCheck className="h-6 w-6 text-primary" />,
    organize: <FileCog className="h-6 w-6 text-primary" />,
  };

  // Default related tools if none provided
  const defaultTools: RelatedTool[] = [
    {
      name: "Compress PDF",
      description: "Reduce PDF file size while maintaining quality",
      path: "/compress-pdf",
      icon: "compress"
    },
    {
      name: "Merge PDF",
      description: "Combine multiple PDFs into one document",
      path: "/merge-pdf",
      icon: "merge"
    },
    {
      name: "Split PDF",
      description: "Divide PDF into multiple files",
      path: "/split-pdf",
      icon: "split"
    },
    {
      name: "PDF to Word",
      description: "Convert PDF files to editable Word documents",
      path: "/pdf-to-word",
      icon: "convert"
    },
    {
      name: "Word to PDF",
      description: "Convert Word documents to PDF format",
      path: "/word-to-pdf",
      icon: "convert"
    },
    {
      name: "Protect PDF",
      description: "Add password protection to your PDFs",
      path: "/protect-pdf",
      icon: "protect"
    }
  ];

  const relatedTools = tools || defaultTools.filter(tool => 
    !tool.path.includes(currentTool.toLowerCase().replace(/\s+/g, '-'))
  ).slice(0, 6);

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Related PDF Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedTools.map((tool, index) => (
          <Link key={index} to={tool.path}>
            <Card className="h-full hover:shadow-lg transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {tool.icon && iconMap[tool.icon] ? iconMap[tool.icon] : <FileText className="h-6 w-6 text-primary" />}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{tool.name}</h3>
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PDFRelatedTools;
