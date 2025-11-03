import React from 'react';
import { useLocation } from 'react-router-dom';
import ToolBreadcrumb from './ToolBreadcrumb';
import PopularToolsSidebar from './PopularToolsSidebar';
import PDFToolIntro from './PDFToolIntro';
import PDFToolHowToUse from './PDFToolHowToUse';
import PDFToolUseCases from './PDFToolUseCases';
import PDFToolFAQ from './PDFToolFAQ';
import PDFRelatedTools from './PDFRelatedTools';
import PDFToolSEOContent from './PDFToolSEOContent';
import ReverseToolLink from './ReverseToolLink';
import YouMightAlsoNeed from './YouMightAlsoNeed';
import WhatsNextTools from './WhatsNextTools';
import { getPDFToolContent } from '@/data/pdfToolsContent';

interface PDFToolTemplateProps {
  toolKey: string;
  toolName: string;
  category?: string;
  categoryPath?: string;
  children: React.ReactNode;
  reverseTool?: {
    name: string;
    path: string;
    description: string;
  };
  contextualTools?: Array<{
    name: string;
    reason: string;
    path: string;
  }>;
  whatsNextTools?: Array<{
    name: string;
    description: string;
    path: string;
    icon: string;
  }>;
}

const PDFToolTemplate: React.FC<PDFToolTemplateProps> = ({
  toolKey,
  toolName,
  category = 'PDF Tools',
  categoryPath = '/tools',
  children,
  reverseTool,
  contextualTools,
  whatsNextTools,
}) => {
  const location = useLocation();
  const content = getPDFToolContent(toolKey);

  if (!content) {
    return <div>{children}</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-9">
            <ToolBreadcrumb 
              category={category}
              categoryPath={categoryPath}
              toolName={toolName}
            />

            <PDFToolIntro 
              title={toolName}
              description={content.intro.description}
              benefits={content.intro.benefits}
              whyUse={content.intro.whyUse}
            />

            {reverseTool && (
              <div className="mb-8">
                <ReverseToolLink reverseTool={reverseTool} />
              </div>
            )}

            {/* Main Tool Interface */}
            <div className="my-8">
              {children}
            </div>

            {contextualTools && contextualTools.length > 0 && (
              <YouMightAlsoNeed tools={contextualTools} />
            )}

            <PDFToolHowToUse 
              steps={content.howToUse.steps}
              estimatedTime={content.howToUse.estimatedTime}
              tips={content.howToUse.tips}
            />

            <PDFToolUseCases useCases={content.useCases} />

            <PDFToolFAQ faqs={content.faqs} />

            <PDFToolSEOContent 
              toolName={content.seoContent.toolName}
              whatIsIt={content.seoContent.whatIsIt}
              benefits={content.seoContent.benefits}
              features={content.seoContent.features}
              formats={content.seoContent.formats}
              security={content.seoContent.security}
            />

            <WhatsNextTools tools={whatsNextTools} />

            <PDFRelatedTools currentTool={toolName} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-3">
            <PopularToolsSidebar currentPath={location.pathname} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFToolTemplate;
