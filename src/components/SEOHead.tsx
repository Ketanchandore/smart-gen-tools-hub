
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Pine Tools Hub - Professional PDF Tools & AI Generators",
  description = "Comprehensive collection of AI-powered tools including PDF converters, generators, and professional utilities. Free online tools for productivity and efficiency.",
  keywords = "free resume builder, AI tools hub, smart online calculators, PDF tools, productivity tools, color picker, online generators",
  image = "/placeholder.svg",
  url = "https://pinetoolshub.com"
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": url,
    "isPartOf": {
      "@type": "WebSite",
      "name": "Pine Tools Hub",
      "url": "https://pinetoolshub.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://pinetoolshub.com/?search={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://pinetoolshub.com"
        }
      ]
    },
    "about": {
      "@type": "Organization",
      "name": "Pine Tools Hub",
      "description": "Professional online tools for productivity and business efficiency",
      "url": "https://pinetoolshub.com",
      "logo": "https://pinetoolshub.com/placeholder.svg",
      "sameAs": [
        "https://twitter.com/pinetoolshub",
        "https://linkedin.com/company/pinetoolshub"
      ]
    }
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="author" content="Pine Tools Hub Team" />
      <meta name="theme-color" content="#8b5cf6" />
      <meta name="msapplication-TileColor" content="#8b5cf6" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Pine Tools Hub" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@pinetoolshub" />
      
      {/* Additional SEO Tags */}
      <meta name="application-name" content="Pine Tools Hub" />
      <meta name="apple-mobile-web-app-title" content="Pine Tools Hub" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEOHead;
