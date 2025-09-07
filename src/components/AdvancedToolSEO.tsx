import React from 'react';
import { Helmet } from 'react-helmet-async';
import AdvancedSEO from './AdvancedSEO';
import ContentAuthority from './ContentAuthority';
import KeywordOptimizer from './KeywordOptimizer';
import { useAdvancedSEO } from '@/hooks/useAdvancedSEO';

interface AdvancedToolSEOProps {
  toolName: string;
  category: string;
  description: string;
  features: string[];
  useCases: string[];
  keywords: string[];
  faqs?: Array<{ question: string; answer: string }>;
  tutorials?: Array<{ title: string; description: string; steps: string[] }>;
  comparisons?: Array<{ title: string; description: string; items: string[] }>;
  relatedTools?: Array<{ name: string; link: string; description: string }>;
}

export const AdvancedToolSEO: React.FC<AdvancedToolSEOProps> = ({
  toolName,
  category,
  description,
  features,
  useCases,
  keywords,
  faqs = [],
  tutorials = [],
  comparisons = [],
  relatedTools = []
}) => {
  const { generateBreadcrumbs } = useAdvancedSEO();

  const breadcrumbs = generateBreadcrumbs(window.location.pathname);
  
  const defaultFAQs = [
    {
      question: `What is ${toolName}?`,
      answer: `${toolName} is ${description}. It helps users ${useCases.join(', ')}.`
    },
    {
      question: `How do I use ${toolName}?`,
      answer: `Using ${toolName} is simple. Just upload your content, configure the settings, and let our AI-powered tool handle the rest.`
    },
    {
      question: `Is ${toolName} free to use?`,
      answer: `Yes, ${toolName} offers free usage with optional premium features for advanced functionality.`
    },
    {
      question: `What file formats does ${toolName} support?`,
      answer: `${toolName} supports all major file formats including PDF, DOC, TXT, and more for maximum compatibility.`
    }
  ];

  const defaultTutorials = [
    {
      title: `Getting Started with ${toolName}`,
      duration: '5 minutes',
      difficulty: 'Beginner' as const,
      steps: [
        'Navigate to the tool page',
        'Upload or input your content',
        'Configure tool settings',
        'Process and download results'
      ]
    }
  ];

  const defaultComparisons = [
    {
      competitor: 'Other Tools',
      ourAdvantage: `${toolName} offers superior performance`,
      theirLimitation: 'Limited features and slower processing'
    }
  ];

  const combinedFAQs = [...defaultFAQs, ...faqs];
  const combinedTutorials = [...defaultTutorials, ...tutorials];
  const combinedComparisons = [...defaultComparisons, ...comparisons];

  return (
    <>
      <AdvancedSEO
        title={`${toolName} - Free Online ${category} Tool | Pine Tools Hub`}
        description={`${description}. ${features.join(', ')}. Free, fast, and secure ${category.toLowerCase()} tool.`}
        keywords={keywords.join(', ')}
        image="/og-image.jpg"
        url={window.location.href}
        type="tool"
        faqSchema={combinedFAQs}
        toolSchema={{
          name: toolName,
          description,
          category,
          features,
          price: 'Free'
        }}
        breadcrumbs={breadcrumbs}
      />
      
      <KeywordOptimizer
        primaryKeyword={toolName.toLowerCase()}
        secondaryKeywords={keywords}
        toolName={toolName}
        category={category}
      />
      
      <ContentAuthority
        toolName={toolName}
        category={category}
        description={description}
        features={features}
        useCases={useCases}
        faqs={combinedFAQs}
        tutorials={combinedTutorials.filter(t => 'duration' in t)}
        comparisons={combinedComparisons.filter(c => 'competitor' in c)}
        relatedTools={relatedTools.map(tool => ({ ...tool, route: tool.link }))}
      />
    </>
  );
};