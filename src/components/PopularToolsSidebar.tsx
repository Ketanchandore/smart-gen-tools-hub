import React from 'react';
import { Link } from 'react-router-dom';
import { FileDown, Scissors, FileText, Lock, RotateCw, Image, FileEdit, FileCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const popularTools = [
  { name: 'Compress PDF', path: '/compress-pdf', icon: FileDown, tag: 'Most Used' },
  { name: 'Merge PDF', path: '/merge-pdf', icon: FileText, tag: 'Popular' },
  { name: 'Split PDF', path: '/split-pdf', icon: Scissors },
  { name: 'PDF to Word', path: '/pdf-to-word', icon: FileEdit },
  { name: 'Word to PDF', path: '/word-to-pdf', icon: FileCheck },
  { name: 'PDF to JPG', path: '/pdf-to-jpg', icon: Image },
  { name: 'Protect PDF', path: '/protect-pdf', icon: Lock },
  { name: 'Rotate PDF', path: '/rotate-pdf', icon: RotateCw },
];

const PopularToolsSidebar: React.FC<{ currentPath?: string }> = ({ currentPath }) => {
  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="text-lg">Popular PDF Tools</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {popularTools.map((tool) => {
          const isActive = currentPath === tool.path;
          return (
            <Link
              key={tool.path}
              to={tool.path}
              className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'hover:bg-muted'
              }`}
            >
              <tool.icon className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm flex-1">{tool.name}</span>
              {tool.tag && (
                <Badge variant="secondary" className="text-xs">
                  {tool.tag}
                </Badge>
              )}
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default PopularToolsSidebar;
