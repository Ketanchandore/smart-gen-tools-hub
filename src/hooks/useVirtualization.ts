import { useMemo, useState, useEffect } from 'react';

interface UseVirtualizationProps {
  itemCount: number;
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
}

export const useVirtualization = ({
  itemCount,
  itemHeight,
  containerHeight,
  overscan = 5
}: UseVirtualizationProps) => {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleItems = useMemo(() => {
    const visibleStart = Math.floor(scrollTop / itemHeight);
    const visibleEnd = Math.min(
      itemCount - 1,
      Math.floor((scrollTop + containerHeight) / itemHeight)
    );

    const start = Math.max(0, visibleStart - overscan);
    const end = Math.min(itemCount - 1, visibleEnd + overscan);

    return { start, end, visibleStart, visibleEnd };
  }, [scrollTop, itemHeight, containerHeight, itemCount, overscan]);

  const totalHeight = itemCount * itemHeight;

  return {
    visibleItems,
    totalHeight,
    setScrollTop
  };
};