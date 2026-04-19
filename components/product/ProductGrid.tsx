import * as React from 'react';
import { Product } from '../../services/products/product-type';
import { ProductCard } from './ProductCard';

export function ProductGrid({ products, title }: { products: Product[]; title?: string }) {
  return (
    <div className="space-y-4">
      {title && (
        <div className="flex items-center justify-between border-b pb-2">
          <h2 className="text-xl font-bold text-gray-800 uppercase tracking-tight">{title}</h2>
          <button className="text-sm font-bold text-[#f68b1e] hover:underline">SEE ALL</button>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
