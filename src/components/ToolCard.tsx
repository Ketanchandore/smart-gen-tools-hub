
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  route: string;
  category?: string;
  isNew?: boolean;
}

const ToolCard: React.FC<ToolCardProps> = ({ title, description, icon, route, category, isNew = false }) => {
  // Track tool usage in localStorage when clicked
  const handleToolClick = () => {
    try {
      // Get current recent tools
      const recentToolsStr = localStorage.getItem('recentTools') || '[]';
      let recentTools: number[] = JSON.parse(recentToolsStr);
      
      // Extract tool ID from route (e.g., '/pdf-to-word' -> extract numeric ID if available)
      const toolId = parseInt(route.split('-').pop() || '0');
      
      // Add current tool to the beginning and remove duplicates
      if (toolId) {
        recentTools = [toolId, ...recentTools.filter(id => id !== toolId)].slice(0, 5);
        localStorage.setItem('recentTools', JSON.stringify(recentTools));
      }
    } catch (e) {
      console.error("Error updating recent tools", e);
    }
  };

  // Function to check if the tool page exists
  const toolExists = () => {
    // Check if the route is redirecting to NotFound page
    return !['/word-to-pdf-wip', '/pdf-split-merge-wip', '/image-converter-wip'].includes(route);
  };

  return (
    <div 
      className="tool-card p-3 md:p-4 flex flex-col h-full rounded-lg shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden bg-card"
      style={{
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'hsl(var(--border))',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      }}
    >
      {isNew && (
        <div className="absolute top-0 right-0">
          <div className="bg-accent text-accent-foreground text-xs font-semibold px-2 py-1 rounded-bl-lg">NEW</div>
        </div>
      )}
      
      {category && (
        <div className="text-xs text-muted-foreground mb-1">
          {category}
        </div>
      )}
      
      <div className="flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-md bg-primary/20 text-primary mb-2 md:mb-3 mx-auto">
        {icon}
      </div>
      
      <h3 className="text-sm md:text-lg font-semibold text-center mb-1 md:mb-2 line-clamp-2">{title}</h3>
      
      <p className="text-muted-foreground text-center text-xs md:text-sm mb-3 md:mb-4 flex-grow line-clamp-3">{description}</p>
      
      <div className="mt-auto">
        <Link to={route} className="w-full" onClick={handleToolClick}>
          <Button 
            className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-xs md:text-sm py-1 md:py-2"
            disabled={!toolExists()}
          >
            {toolExists() ? 'Launch Tool' : 'Coming Soon'}
          </Button>
        </Link>
      </div>
      
      <div 
        className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 transition-opacity duration-300 pointer-events-none hover:opacity-100"
        style={{
          opacity: 0,
          transition: 'opacity 0.3s ease',
        }}
      />
    </div>
  );
};

export default ToolCard;
