
import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    // Add a more robust autosize functionality
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
    const [textareaHeight, setTextareaHeight] = React.useState<number | undefined>(undefined);

    // Combine the refs
    const handleRef = (element: HTMLTextAreaElement | null) => {
      textareaRef.current = element;
      if (typeof ref === 'function') {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
    };

    // Function to resize textarea based on content
    const adjustHeight = React.useCallback(() => {
      const element = textareaRef.current;
      if (!element) return;
      
      // Reset height to content
      element.style.height = 'auto';
      
      // Get the computed styles
      const computedStyle = window.getComputedStyle(element);
      
      // Calculate the height
      const height = 
        element.scrollHeight + 
        parseInt(computedStyle.borderTopWidth, 10) + 
        parseInt(computedStyle.borderBottomWidth, 10);
      
      // Set the height using style directly for immediacy
      element.style.height = `${height}px`;
      
      // Update state
      setTextareaHeight(height);
    }, []);

    // Adjust height on initial render and text change
    React.useEffect(() => {
      adjustHeight();
    }, [props.value, adjustHeight]);

    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 resize-y disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={handleRef}
        onChange={(e) => {
          adjustHeight();
          props.onChange?.(e);
        }}
        style={{
          // Only set height from state if defined, otherwise fall back to CSS
          height: textareaHeight ? `${textareaHeight}px` : undefined,
          ...props.style,
        }}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
