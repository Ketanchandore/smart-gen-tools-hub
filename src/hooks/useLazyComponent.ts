import { lazy, ComponentType, LazyExoticComponent } from 'react';

interface LazyLoadOptions {
  preload?: boolean;
  delay?: number;
}

// Create a map to store preloaded components
const preloadedComponents = new Map<string, Promise<any>>();

export const useLazyComponent = <T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  componentId: string,
  options: LazyLoadOptions = {}
): LazyExoticComponent<T> => {
  const { preload = false, delay = 0 } = options;

  // If preload is enabled, start loading immediately
  if (preload && !preloadedComponents.has(componentId)) {
    const loadPromise = delay > 0
      ? new Promise((resolve) => {
          setTimeout(() => {
            importFunc().then(resolve);
          }, delay);
        })
      : importFunc();

    preloadedComponents.set(componentId, loadPromise);
  }

  // Return the lazy component
  return lazy(() => {
    if (preloadedComponents.has(componentId)) {
      return preloadedComponents.get(componentId)!;
    }
    return importFunc();
  }) as LazyExoticComponent<T>;
};

// Helper function to preload a component manually
export const preloadComponent = (
  importFunc: () => Promise<{ default: ComponentType<any> }>,
  componentId: string
) => {
  if (!preloadedComponents.has(componentId)) {
    preloadedComponents.set(componentId, importFunc());
  }
};
