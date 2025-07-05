
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
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('author', 'Pine Tools Hub');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');

    // Open Graph meta tags
    updateMetaTag('', title, 'og:title');
    updateMetaTag('', description, 'og:description');
    updateMetaTag('', image, 'og:image');
    updateMetaTag('', url, 'og:url');
    updateMetaTag('', 'website', 'og:type');
    updateMetaTag('', 'Pine Tools Hub', 'og:site_name');

    // Twitter meta tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Additional SEO tags
    updateMetaTag('theme-color', '#0f172a');
    updateMetaTag('msapplication-TileColor', '#0f172a');
  }, [title, description, keywords, image, url]);

  return null;
};

export default SEOHead;
