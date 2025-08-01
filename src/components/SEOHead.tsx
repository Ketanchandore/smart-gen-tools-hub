
import { useEffect } from 'react';

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
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, property?: string) => {
      const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', property);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    updateMetaTag('author', 'Pine Tools Hub');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    updateMetaTag('language', 'English');
    updateMetaTag('revisit-after', '7 days');
    updateMetaTag('distribution', 'global');
    updateMetaTag('rating', 'general');

    // Open Graph meta tags
    updateMetaTag('', title, 'og:title');
    updateMetaTag('', description, 'og:description');
    updateMetaTag('', image, 'og:image');
    updateMetaTag('', url, 'og:url');
    updateMetaTag('', 'website', 'og:type');
    updateMetaTag('', 'Pine Tools Hub', 'og:site_name');
    updateMetaTag('', 'en_US', 'og:locale');
    updateMetaTag('', '1200', 'og:image:width');
    updateMetaTag('', '630', 'og:image:height');

    // Twitter meta tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    updateMetaTag('twitter:creator', '@pinepl_techai');
    updateMetaTag('twitter:site', '@pinepl_techai');

    // Additional SEO tags
    updateMetaTag('theme-color', '#0f172a');
    updateMetaTag('msapplication-TileColor', '#0f172a');
    updateMetaTag('googlebot', 'index, follow');
    updateMetaTag('bingbot', 'index, follow');

    // Add canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    // Add JSON-LD structured data for page-specific content
    const existingScript = document.querySelector('#page-structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.id = 'page-structured-data';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
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
      },
      "publisher": {
        "@type": "Organization",
        "name": "Pine Tools Hub",
        "logo": {
          "@type": "ImageObject",
          "url": "https://pinetoolshub.com/placeholder.svg"
        }
      }
    });
    document.head.appendChild(script);
  }, [title, description, keywords, image, url]);

  return null;
};

export default SEOHead;
