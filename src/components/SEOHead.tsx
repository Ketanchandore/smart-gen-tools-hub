
import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Smart Gen Tools Hub - Free AI Resume Builder & PDF Tools",
  description = "Create professional resumes, convert PDFs, use smart calculators, color pickers and 100+ AI-powered productivity tools. Free, fast, and no login required.",
  keywords = "free resume builder, AI tools, PDF converter, smart calculator, color picker, productivity tools, online generators, resume creator, AI utilities, web tools, no login tools, mobile tools",
  image = "/og-preview.png",
  url = "https://smart-gen-tools-hub.lovable.app"
}) => {
  useEffect(() => {
    // Update document title with SEO-optimized format
    document.title = title;

    // Update meta tags with SEO focus
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

    // SEO-optimized meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large');
    updateMetaTag('author', 'Pineapple Technologies - Smart Gen Tools Hub');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');

    // Enhanced Open Graph meta tags
    updateMetaTag('', title, 'og:title');
    updateMetaTag('', description, 'og:description');
    updateMetaTag('', image, 'og:image');
    updateMetaTag('', url, 'og:url');
    updateMetaTag('', 'website', 'og:type');
    updateMetaTag('', 'Smart Gen Tools Hub', 'og:site_name');
    updateMetaTag('', '1200', 'og:image:width');
    updateMetaTag('', '630', 'og:image:height');

    // Enhanced Twitter meta tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    updateMetaTag('twitter:creator', '@smartgentoolshub');
    updateMetaTag('twitter:site', '@smartgentoolshub');

    // Additional SEO tags
    updateMetaTag('theme-color', '#0f172a');
    updateMetaTag('msapplication-TileColor', '#0f172a');
    updateMetaTag('application-name', 'Smart Gen Tools Hub');
    updateMetaTag('apple-mobile-web-app-title', 'Smart Gen Tools Hub');
    
    // Add canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = url;

  }, [title, description, keywords, image, url]);

  return null;
};

export default SEOHead;
