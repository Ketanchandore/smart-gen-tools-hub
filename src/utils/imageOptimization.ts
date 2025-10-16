// Image optimization utilities

export const generateSrcSet = (baseUrl: string, widths: number[]): string => {
  return widths.map(width => `${baseUrl}?w=${width} ${width}w`).join(', ');
};

export const generateSizes = (
  breakpoints: { maxWidth: string; size: string }[]
): string => {
  return breakpoints
    .map(bp => `(max-width: ${bp.maxWidth}) ${bp.size}`)
    .join(', ');
};

// Convert image to WebP if supported
export const getOptimizedImageUrl = (
  url: string,
  width?: number,
  format: 'webp' | 'avif' | 'auto' = 'auto'
): string => {
  // If it's already an optimized format or SVG, return as is
  if (url.endsWith('.svg') || url.endsWith('.webp') || url.endsWith('.avif')) {
    return url;
  }

  // Add width parameter if specified
  const params = new URLSearchParams();
  if (width) params.set('w', width.toString());
  if (format !== 'auto') params.set('format', format);

  const separator = url.includes('?') ? '&' : '?';
  return params.toString() ? `${url}${separator}${params.toString()}` : url;
};

// Preload critical images
export const preloadImage = (url: string, fetchPriority: 'high' | 'low' = 'high') => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = url;
  link.fetchPriority = fetchPriority;
  document.head.appendChild(link);
};

// Lazy load background images
export const lazyLoadBackgroundImage = (element: HTMLElement, imageUrl: string) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          element.style.backgroundImage = `url(${imageUrl})`;
          observer.unobserve(element);
        }
      });
    },
    {
      rootMargin: '50px',
    }
  );

  observer.observe(element);
};

// Calculate aspect ratio from dimensions
export const getAspectRatio = (width: number, height: number): string => {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(width, height);
  return `${width / divisor}/${height / divisor}`;
};

// Responsive image breakpoints
export const RESPONSIVE_BREAKPOINTS = {
  mobile: 320,
  mobileLarge: 480,
  tablet: 768,
  desktop: 1024,
  desktopLarge: 1440,
  desktopXL: 1920,
};

export const generateResponsiveWidths = (
  maxWidth: number = RESPONSIVE_BREAKPOINTS.desktopXL
): number[] => {
  return Object.values(RESPONSIVE_BREAKPOINTS).filter(width => width <= maxWidth);
};
