import React, { useEffect, useState } from 'react';

interface PrerenderedContentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  prerenderedHtml?: string;
}

const PrerenderedContent: React.FC<PrerenderedContentProps> = ({ 
  children, 
  fallback = null,
  prerenderedHtml 
}) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // During SSR or before hydration, show prerendered content
  if (!isHydrated && prerenderedHtml) {
    return <div dangerouslySetInnerHTML={{ __html: prerenderedHtml }} />;
  }

  // Show fallback during hydration if needed
  if (!isHydrated && fallback) {
    return <>{fallback}</>;
  }

  // After hydration, show interactive content
  return <>{children}</>;
};

export default PrerenderedContent;