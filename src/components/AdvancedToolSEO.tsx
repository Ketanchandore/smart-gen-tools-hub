import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAdvancedSEO } from '@/hooks/useAdvancedSEO';
import { useLocation } from 'react-router-dom';

interface AdvancedToolSEOProps {
  toolName: string;
  description: string;
  keywords: string[];
  category: string;
  features: string[];
  useCases: string[];
  faqs?: { question: string; answer: string }[];
  relatedTools?: string[];
  canonicalUrl?: string;
  structuredData?: any;
}

const AdvancedToolSEO: React.FC<AdvancedToolSEOProps> = ({
  toolName,
  description,
  keywords,
  category,
  features,
  useCases,
  faqs = [],
  relatedTools = [],
  canonicalUrl,
  structuredData
}) => {
  const location = useLocation();
  const { generateBreadcrumbs, trackPageView, optimizeInternalLinks } = useAdvancedSEO({
    enableAnalytics: true,
    enableCoreWebVitals: true,  
    enableInternalLinking: true
  });

  const currentUrl = canonicalUrl || `https://www.pinetoolshub.com${location.pathname}`;
  const breadcrumbs = generateBreadcrumbs(location.pathname);

  // Enhanced keywords with semantic variations
  const enhancedKeywords = [
    ...keywords,
    `free ${toolName.toLowerCase()}`,
    `online ${toolName.toLowerCase()}`,
    `${toolName.toLowerCase()} tool`,
    `${category.toLowerCase()} tools`,
    'no registration required',
    'instant results',
    `professional ${toolName.toLowerCase()}`,
    `best ${toolName.toLowerCase()} online`,
    `${toolName.toLowerCase()} generator`,
    ...useCases.map(use => `${toolName.toLowerCase()} for ${use.toLowerCase()}`),
    ...features.map(feature => `${feature.toLowerCase()} tool`)
  ].slice(0, 25); // Limit to 25 keywords

  // Generate comprehensive structured data
  const generateToolSchema = () => {
    const baseSchema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebApplication",
          "@id": `${currentUrl}#webapp`,
          "name": toolName,
          "description": description,
          "url": currentUrl,
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "Any",
          "permissions": "browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          },
          "featureList": features,
          "browserRequirements": "Any modern web browser",
          "author": {
            "@type": "Organization",
            "name": "Pine Tools Hub",
            "url": "https://www.pinetoolshub.com"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Pine Tools Hub",
            "url": "https://www.pinetoolshub.com",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.pinetoolshub.com/logo.png"
            }
          }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": breadcrumbs.map((crumb, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": crumb.name,
            "item": crumb.url
          }))
        },
        {
          "@type": "WebPage",
          "@id": `${currentUrl}#webpage`,
          "url": currentUrl,
          "name": `${toolName} - Free Online Tool | Pine Tools Hub`,
          "description": description,
          "isPartOf": {
            "@type": "WebSite",
            "name": "Pine Tools Hub",
            "url": "https://www.pinetoolshub.com"
          },
          "about": {
            "@type": "Thing",
            "name": toolName,
            "description": description
          },
          "mainEntity": {
            "@id": `${currentUrl}#webapp`
          }
        }
      ]
    };

    // Add FAQ schema if FAQs are provided
    if (faqs.length > 0) {
      (baseSchema["@graph"] as any).push({
        "@type": "FAQPage",
        "@id": `${currentUrl}#faq`,
        "mainEntity": faqs.map((faq, index) => ({
          "@type": "Question",
          "@id": `${currentUrl}#faq-${index}`, 
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      });
    }

    // Add HowTo schema for tools with clear steps
    if (useCases.length > 0) {
      (baseSchema["@graph"] as any).push({
        "@type": "HowTo",
        "@id": `${currentUrl}#howto`,
        "name": `How to use ${toolName}`,
        "description": `Step-by-step guide to using ${toolName}`,
        "step": useCases.slice(0, 5).map((useCase, index) => ({
          "@type": "HowToStep",
          "position": index + 1,
          "name": `Step ${index + 1}`,
          "text": useCase
        }))
      });
    }

    return structuredData || baseSchema;
  };

  // Track tool usage
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'tool_view', {
        tool_name: toolName,
        category: category,
        page_title: `${toolName} - Pine Tools Hub`,
        page_location: currentUrl
      });
    }
  }, [toolName, category, currentUrl]);

  return (
    <Helmet>
      {/* Title and Meta Description */}
      <title>{`${toolName} - Free Online Tool | Pine Tools Hub`}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={enhancedKeywords.join(', ')} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={`${toolName} - Free Online Tool`} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Pine Tools Hub" />
      <meta property="og:image" content="https://www.pinetoolshub.com/og-image.png" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${toolName} - Free Online Tool`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://www.pinetoolshub.com/twitter-image.png" />
      
      {/* Tool-specific meta */}
      <meta name="tool:category" content={category} />
      <meta name="tool:features" content={features.join(', ')} />
      <meta name="tool:free" content="true" />
      <meta name="tool:registration" content="false" />
      
      {/* Article/Tool meta */}
      <meta property="article:section" content={category} />
      <meta property="article:tag" content={keywords.slice(0, 5).join(', ')} />
      <meta property="article:published_time" content={new Date().toISOString()} />
      
      {/* Additional SEO meta */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="author" content="Pine Tools Hub" />
      <meta name="generator" content="Pine Tools Hub" />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(generateToolSchema())}
      </script>
      
      {/* Additional performance hints */}
      <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossOrigin="" />
    </Helmet>
  );
};

export default AdvancedToolSEO;