
import React from 'react';
import { ShoppingBag } from 'lucide-react';
import PlaceholderTool from './PlaceholderTool';

const ProductDescription = () => {
  return (
    <PlaceholderTool
      title="Product Description Generator"
      description="Create compelling product descriptions for e-commerce"
      icon={<ShoppingBag className="h-8 w-8 text-primary" />}
    />
  );
};

export default ProductDescription;
