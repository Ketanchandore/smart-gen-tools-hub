import React from 'react';

interface KeywordOptimizerProps {
  primaryKeyword: string;
  secondaryKeywords?: string[];
  toolName?: string;
  category?: string;
}

const KeywordOptimizer: React.FC<KeywordOptimizerProps> = ({
  primaryKeyword,
  secondaryKeywords = [],
  toolName,
  category
}) => {
  
  // Generate comprehensive keyword variations for maximum SEO coverage
  const generateKeywordVariations = () => {
    const baseKeywords = [primaryKeyword, ...secondaryKeywords];
    
    // Action words for tools
    const actionWords = [
      'free', 'online', 'convert', 'generate', 'create', 'build', 'make', 'edit',
      'professional', 'best', 'top', 'instant', 'quick', 'easy', 'simple',
      'converter', 'generator', 'builder', 'creator', 'editor', 'maker', 'tool'
    ];

    // Quality modifiers
    const qualityModifiers = [
      'high quality', 'fast', 'secure', 'reliable', 'accurate', 'unlimited',
      'no watermark', 'no signup', 'browser based', 'web based'
    ];

    // Problem-solving phrases
    const problemSolvers = [
      'how to', 'how do i', 'convert', 'change', 'transform', 'export',
      'import', 'optimize', 'compress', 'enhance', 'improve'
    ];

    // Competitor alternatives
    const competitorTerms = [
      'ilovepdf alternative', 'smallpdf alternative', 'adobe alternative',
      'better than ilovepdf', 'free smallpdf', 'no subscription pdf tool'
    ];

    // Location-based (for local SEO)
    const locationTerms = [
      'usa', 'uk', 'india', 'australia', 'canada', 'worldwide', 'global'
    ];

    // Combine all variations
    const allVariations = [
      ...baseKeywords,
      ...actionWords.map(action => `${action} ${primaryKeyword}`),
      ...qualityModifiers.map(modifier => `${modifier} ${primaryKeyword}`),
      ...problemSolvers.map(problem => `${problem} ${primaryKeyword}`),
      ...competitorTerms,
      ...locationTerms.map(location => `${primaryKeyword} ${location}`)
    ];

    // Add tool-specific variations
    if (toolName) {
      allVariations.push(
        toolName,
        `${toolName} free`,
        `${toolName} online`,
        `${toolName} no signup`,
        `best ${toolName}`,
        `free ${toolName} tool`
      );
    }

    // Add category-specific variations
    if (category) {
      allVariations.push(
        `${category} tools`,
        `free ${category} tools`,
        `best ${category} software`,
        `online ${category} tools`
      );
    }

    return [...new Set(allVariations)].slice(0, 100); // Remove duplicates, limit to 100
  };

  // Generate long-tail keyword phrases for high conversion
  const generateLongTailKeywords = () => {
    const longTailPatterns = [
      `how to ${primaryKeyword} for free`,
      `best free ${primaryKeyword} tool 2024`,
      `${primaryKeyword} without watermark`,
      `${primaryKeyword} no email required`,
      `${primaryKeyword} vs paid alternatives`,
      `free ${primaryKeyword} alternative to adobe`,
      `${primaryKeyword} online browser`,
      `${primaryKeyword} unlimited use`,
      `professional ${primaryKeyword} free`,
      `${primaryKeyword} small business`,
      `${primaryKeyword} student free`,
      `${primaryKeyword} commercial use allowed`,
      `bulk ${primaryKeyword} free`,
      `batch ${primaryKeyword} online`,
      `${primaryKeyword} api alternative`
    ];

    return longTailPatterns;
  };

  // Generate schema markup for better search understanding
  const generateKeywordSchema = () => {
    const keywords = generateKeywordVariations();
    const longTail = generateLongTailKeywords();
    
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "keywords": [...keywords, ...longTail].join(', '),
      "about": [
        {
          "@type": "Thing",
          "name": primaryKeyword,
          "description": `Professional ${primaryKeyword} tool - free, online, no signup required`
        },
        ...secondaryKeywords.map(keyword => ({
          "@type": "Thing", 
          "name": keyword,
          "description": `${keyword} functionality included in our comprehensive toolkit`
        }))
      ]
    };
  };

  // This component doesn't render anything visible, it's for SEO metadata
  return (
    <>
      {/* Hidden keyword-rich content for search engines */}
      <div className="sr-only" aria-hidden="true">
        <h2>Keywords and Search Terms</h2>
        <p>
          {generateKeywordVariations().join(', ')}
        </p>
        <h3>Common Questions</h3>
        <div>
          {generateLongTailKeywords().map((phrase, index) => (
            <span key={index}>{phrase}. </span>
          ))}
        </div>
      </div>

      {/* Structured data for keywords */}
      <script type="application/ld+json">
        {JSON.stringify(generateKeywordSchema())}
      </script>
    </>
  );
};

export default KeywordOptimizer;