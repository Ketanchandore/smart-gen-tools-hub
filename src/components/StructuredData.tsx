import React from 'react';
import { Helmet } from 'react-helmet-async';

interface ToolStructuredDataProps {
  name: string;
  description: string;
  url: string;
  category: string;
  features?: string[];
  datePublished?: string;
  dateModified?: string;
}

export const ToolStructuredData: React.FC<ToolStructuredDataProps> = ({
  name,
  description,
  url,
  category,
  features = [],
  datePublished = new Date().toISOString().split('T')[0],
  dateModified = new Date().toISOString().split('T')[0]
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": name,
    "description": description,
    "url": url,
    "applicationCategory": category,
    "operatingSystem": "Web Browser",
    "browserRequirements": "HTML5, JavaScript",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "@id": url,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Pine Tools Hub",
      "logo": {
        "@type": "ImageObject",
        "url": "https://pinetoolshub.com/placeholder.svg"
      }
    },
    "datePublished": datePublished,
    "dateModified": dateModified,
    "isAccessibleForFree": true,
    "featureList": features,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "150",
      "bestRating": "5"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

interface ArticleStructuredDataProps {
  headline: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified: string;
  url: string;
  image?: string;
}

export const ArticleStructuredData: React.FC<ArticleStructuredDataProps> = ({
  headline,
  description,
  author,
  datePublished,
  dateModified,
  url,
  image = "/placeholder.svg"
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": headline,
    "description": description,
    "author": {
      "@type": "Person",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Pine Tools Hub",
      "logo": {
        "@type": "ImageObject",
        "url": "https://pinetoolshub.com/placeholder.svg"
      }
    },
    "datePublished": datePublished,
    "dateModified": dateModified,
    "url": url,
    "image": image,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

interface FAQStructuredDataProps {
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

export const FAQStructuredData: React.FC<FAQStructuredDataProps> = ({ questions }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map((item, index) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

interface BreadcrumbStructuredDataProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export const BreadcrumbStructuredData: React.FC<BreadcrumbStructuredDataProps> = ({ items }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};