
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  route: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ title, description, icon, route }) => {
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

  return (
    <div className="tool-card p-4 md:p-6 flex flex-col h-full rounded-lg shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary/20 text-primary mb-4 mx-auto">
        {icon}
      </div>
      <h3 className="text-lg md:text-xl font-semibold text-center mb-2">{title}</h3>
      <p className="text-muted-foreground text-center text-sm md:text-base mb-4 md:mb-6 flex-grow">{description}</p>
      <div className="mt-auto">
        <Link to={route} className="w-full" onClick={handleToolClick}>
          <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
            Launch Tool
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ToolCard;
