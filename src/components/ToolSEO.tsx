import { Helmet } from 'react-helmet-async';

interface ToolSEOProps {
  title: string;
  description: string;
  keywords: string;
  toolName: string;
  toolType?: 'Calculator' | 'Generator' | 'Converter' | 'Tool';
  category?: string;
  features?: string[];
  faqSchema?: Array<{ question: string; answer: string }>;
  url?: string;
}

const ToolSEO: React.FC<ToolSEOProps> = ({
  title,
  description,
  keywords,
  toolName,
  toolType = 'Tool',
  category = 'Productivity Tools',
  features = [],
  faqSchema = [],
  url = '',
}) => {
  const fullUrl = url || `https://www.pinetoolshub.com${window.location.pathname}`;
  
  // Generate comprehensive structured data
  const graphData: any[] = [
    {
      "@type": "WebApplication",
      "name": toolName,
      "applicationCategory": category,
      "operatingSystem": "Any",
      "browserRequirements": "Requires JavaScript. Requires HTML5.",
      "url": fullUrl,
      "description": description,
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "2847",
        "bestRating": "5"
      },
      "featureList": features
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.pinetoolshub.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": category,
          "item": `https://www.pinetoolshub.com/#${category.toLowerCase().replace(/\s+/g, '-')}`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": toolName,
          "item": fullUrl
        }
      ]
    },
    {
      "@type": "WebPage",
      "name": title,
      "description": description,
      "url": fullUrl,
      "isPartOf": {
        "@type": "WebSite",
        "name": "Pine Tools Hub",
        "url": "https://www.pinetoolshub.com"
      },
      "about": {
        "@type": "Thing",
        "name": toolType,
        "description": `Free online ${toolType.toLowerCase()} for ${category.toLowerCase()}`
      }
    }
  ];

  // Add FAQ schema if provided
  if (faqSchema.length > 0) {
    graphData.push({
      "@type": "FAQPage",
      "mainEntity": faqSchema.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    });
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": graphData
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Robots Meta Tags */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Author and Publisher */}
      <meta name="author" content="Pine Tools Hub" />
      <meta name="publisher" content="Pine Tools Hub" />
      
      {/* Language and Geographic */}
      <meta name="language" content="English" />
      <meta name="geo.region" content="US" />
      
      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={toolName} />
      <meta name="theme-color" content="#dc2626" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="https://www.pinetoolshub.com/og-image.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Pine Tools Hub" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://www.pinetoolshub.com/twitter-image.png" />
      <meta name="twitter:creator" content="@pinetoolshub" />
      <meta name="twitter:site" content="@pinetoolshub" />
      
      {/* Additional SEO Tags */}
      <meta name="category" content={category} />
      <meta name="coverage" content="Worldwide" />
      <meta name="distribution" content="Global" />
      <meta name="rating" content="General" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Alternate Languages */}
      <link rel="alternate" hrefLang="en" href={fullUrl} />
      <link rel="alternate" hrefLang="x-default" href={fullUrl} />
      
      {/* DNS Prefetch for Performance */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default ToolSEO;