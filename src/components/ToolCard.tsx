
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  route: string;
  category?: string;
  isNew?: boolean;
}

const ToolCard: React.FC<ToolCardProps> = ({ title, description, icon, route, category, isNew = false }) => {
  const { darkMode } = useTheme();

  // Track tool usage in localStorage when clicked
  const handleToolClick = () => {
    try {
      // Get current recent tools
      const recentToolsStr = localStorage.getItem('recentTools') || '[]';
      let recentTools: string[] = JSON.parse(recentToolsStr);
      
      // Add current tool to the beginning and remove duplicates
      recentTools = [route, ...recentTools.filter(item => item !== route)].slice(0, 5);
      localStorage.setItem('recentTools', JSON.stringify(recentTools));
    } catch (e) {
      console.error("Error updating recent tools", e);
    }
  };

  return (
    <div 
      className="tool-card p-4 md:p-6 flex flex-col h-full rounded-lg transition-all duration-200 hover:-translate-y-1 relative overflow-hidden bg-card"
    >
      {isNew && (
        <div className="absolute top-2 right-2">
          <div className="bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded">NEW</div>
        </div>
      )}
      
      <div className="flex items-center justify-center h-12 w-12 md:h-14 md:w-14 rounded-lg bg-primary/10 text-primary mb-4">
        {React.cloneElement(icon as React.ReactElement, { size: 24 })}
      </div>
      
      <h3 className="text-base md:text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
      
      <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-2">{description}</p>
      
      <div className="mt-auto">
        <Link to={route} className="w-full" onClick={handleToolClick}>
          <Button 
            variant="ghost"
            className="w-full text-primary hover:text-primary hover:bg-primary/10 text-sm py-2 font-medium"
          >
            Select
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ToolCard;
