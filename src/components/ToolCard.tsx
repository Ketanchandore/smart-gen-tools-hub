
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
      className="tool-card p-2 md:p-3 flex flex-col h-full rounded-lg shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden bg-card"
      style={{
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'hsl(var(--border))',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      }}
    >
      {isNew && (
        <div className="absolute top-0 right-0">
          <div className="bg-accent text-accent-foreground text-xs font-semibold px-1.5 py-0.5 rounded-bl-lg">NEW</div>
        </div>
      )}
      
      {category && (
        <div className="text-xs text-muted-foreground mb-1">
          {category}
        </div>
      )}
      
      <div className="flex items-center justify-center h-8 w-8 md:h-10 md:w-10 rounded-md bg-primary/20 text-primary mb-2 mx-auto">
        {React.cloneElement(icon as React.ReactElement, { size: 16 })}
      </div>
      
      <h3 className="text-sm md:text-base font-bold text-center mb-1 line-clamp-2">{title}</h3>
      
      <p className="text-muted-foreground text-center text-xs mb-2 flex-grow line-clamp-2">{description}</p>
      
      <div className="mt-auto">
        <Link to={route} className="w-full" onClick={handleToolClick}>
          <Button 
            className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-xs py-1"
          >
            Launch
          </Button>
        </Link>
      </div>
      
      <div 
        className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      />
    </div>
  );
};

export default ToolCard;
