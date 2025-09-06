import React from 'react';
import { Helmet } from 'react-helmet-async';

interface AdvancedSEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'tool' | 'guide';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  category?: string;
  tags?: string[];
  breadcrumbs?: Array<{name: string; url: string}>;
  faqSchema?: Array<{question: string; answer: string}>;
  toolSchema?: {
    name: string;
    description: string;
    category: string;
    features: string[];
    price: string;
  };
}

const AdvancedSEO: React.FC<AdvancedSEOProps> = ({
  title = "Pine Tools Hub - 150+ Free AI Tools & PDF Converters | Professional Online Toolkit",
  description = "Access 150+ professional AI tools including resume builder, PDF converters, content generators, and productivity utilities. All free, no signup required. Compete with iLovePDF, SmallPDF.",
  keywords = "free resume builder, PDF converter, AI tools, online tools, PDF to Word, Word to PDF, document converter, productivity tools, free AI generator, professional tools",
  image = "/placeholder.svg",
  url = "https://pinetoolshub.com",
  type = 'website',
  publishedTime,
  modifiedTime = new Date().toISOString(),
  author = "Pine Tools Hub Team",
  category,
  tags = [],
  breadcrumbs = [],
  faqSchema = [],
  toolSchema
}) => {
  
  // Generate comprehensive structured data
  const generateStructuredData = () => {
    const baseData: any = {
      "@context": "https://schema.org",
      "@graph": [
        // Website/Organization
        {
          "@type": "Organization",
          "@id": "https://pinetoolshub.com/#organization",
          "name": "Pine Tools Hub",
          "url": "https://pinetoolshub.com",
          "logo": {
            "@type": "ImageObject",
            "url": "https://pinetoolshub.com/placeholder.svg",
            "width": 512,
            "height": 512
          },
          "description": "Professional online tools for productivity and business efficiency",
          "founder": {
            "@type": "Person",
            "name": "Pine Tools Hub Team"
          },
          "sameAs": [
            "https://twitter.com/pinetoolshub",
            "https://linkedin.com/company/pinetoolshub",
            "https://github.com/pinetoolshub"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Customer Service",
            "url": "https://pinetoolshub.com/contact"
          }
        },
        
        // Website
        {
          "@type": "WebSite",
          "@id": "https://pinetoolshub.com/#website", 
          "url": "https://pinetoolshub.com",
          "name": "Pine Tools Hub",
          "description": description,
          "publisher": {
            "@id": "https://pinetoolshub.com/#organization"
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://pinetoolshub.com/?search={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        },
        
        // Current Page
        {
          "@type": type === 'tool' ? "SoftwareApplication" : type === 'article' ? "Article" : "WebPage",
          "@id": url,
          "url": url,
          "name": title,
          "description": description,
          "isPartOf": {
            "@id": "https://pinetoolshub.com/#website"
          },
          "datePublished": publishedTime,
          "dateModified": modifiedTime,
          "author": {
            "@type": "Organization",
            "@id": "https://pinetoolshub.com/#organization"
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": url
          },
          "image": {
            "@type": "ImageObject",
            "url": image,
            "width": 1200,
            "height": 630
          }
        }
      ]
    };

    // Add Tool Schema if provided
    if (toolSchema && type === 'tool') {
      baseData["@graph"][2] = {
        "@type": "SoftwareApplication",
        "@id": url,
        "name": toolSchema.name,
        "description": toolSchema.description,
        "url": url,
        "applicationCategory": toolSchema.category,
        "operatingSystem": ["Web Browser"],
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        "featureList": toolSchema.features,
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "150",
          "bestRating": "5",
          "worstRating": "1"
        }
      };
    }

    // Add FAQ Schema if provided
    if (faqSchema.length > 0) {
      const faqPage: any = {
        "@type": "FAQPage",
        "mainEntity": faqSchema.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      };
      baseData["@graph"].push(faqPage);
    }

    // Add Breadcrumb Schema if provided
    if (breadcrumbs.length > 0) {
      const breadcrumbList: any = {
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": crumb.name,
          "item": crumb.url
        }))
      };
      baseData["@graph"].push(breadcrumbList);
    }

    return baseData;
  };

  // Generate advanced keywords
  const generateAdvancedKeywords = () => {
    const baseKeywords = keywords.split(', ');
    const toolVariations = [
      'online', 'free', 'professional', 'best', 'converter', 'generator', 
      'editor', 'maker', 'builder', 'creator', 'tool', 'software', 'app'
    ];
    
    const actionWords = [
      'convert', 'generate', 'create', 'build', 'make', 'edit', 'optimize',
      'enhance', 'transform', 'process', 'analyze', 'extract', 'merge'
    ];

    const qualifiers = [
      'fast', 'instant', 'quick', 'easy', 'simple', 'advanced', 'professional',
      'high quality', 'accurate', 'reliable', 'secure', 'unlimited'
    ];

    return [...baseKeywords, ...toolVariations, ...actionWords, ...qualifiers, ...tags]
      .filter(Boolean)
      .slice(0, 50)
      .join(', ');
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={generateAdvancedKeywords()} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* Advanced SEO Meta Tags */}
      <meta name="theme-color" content="#8b5cf6" />
      <meta name="msapplication-TileColor" content="#8b5cf6" />
      <meta name="application-name" content="Pine Tools Hub" />
      <meta name="apple-mobile-web-app-title" content="Pine Tools Hub" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* Content Classification */}
      {category && <meta name="article:section" content={category} />}
      {tags.length > 0 && tags.map(tag => (
        <meta key={tag} name="article:tag" content={tag} />
      ))}
      {publishedTime && <meta name="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta name="article:modified_time" content={modifiedTime} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type === 'article' ? 'article' : 'website'} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Pine Tools Hub" />
      <meta property="og:locale" content="en_US" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@pinetoolshub" />
      <meta name="twitter:site" content="@pinetoolshub" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Preconnects for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(generateStructuredData())}
      </script>
    </Helmet>
  );
};

export default AdvancedSEO;