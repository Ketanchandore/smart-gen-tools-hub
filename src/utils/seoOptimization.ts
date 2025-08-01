
export const generateStructuredData = (pageType: string, title: string, description: string, url: string) => {
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": url,
    "isPartOf": {
      "@type": "WebSite",
      "name": "Pine Tools Hub",
      "url": "https://pinetoolshub.com"
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
    }
  };

  // Add tool-specific structured data
  if (pageType === 'tool') {
    return {
      ...baseStructuredData,
      "@type": "SoftwareApplication",
      "applicationCategory": "ProductivityApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    };
  }

  return baseStructuredData;
};

export const updatePageSEO = (title: string, description: string, keywords: string, canonicalUrl: string) => {
  // Update title
  document.title = title;

  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', description);
  }

  // Update meta keywords
  const metaKeywords = document.querySelector('meta[name="keywords"]');
  if (metaKeywords) {
    metaKeywords.setAttribute('content', keywords);
  }

  // Update canonical URL
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', canonicalUrl);
};
