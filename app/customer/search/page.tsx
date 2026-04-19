'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { useSearchProductsQuery, useGetProductsQuery } from '../../../services/products/product.service';
import { ProductCard } from '../../../components/product/ProductCard';
import { Button } from '../../../components/ui/Button';

import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { cn } from '../../../lib/utils';

const CATEGORIES = [
  { label: 'Smartphones', slug: 'smartphones' },
  { label: 'Laptops', slug: 'laptops' },
  { label: 'Fragrances', slug: 'fragrances' },
  { label: 'Skincare', slug: 'skincare' },
  { label: 'Groceries', slug: 'groceries' },
  { label: 'Home Decoration', slug: 'home-decoration' },
];

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';

  const { data: searchResults, isLoading: isSearchLoading } = useSearchProductsQuery(query, { skip: !query });
  const { data: categoryResults, isLoading: isCategoryLoading } = useGetProductsQuery({ category }, { skip: !category });

  const results = query ? searchResults : categoryResults;
  const isLoading = query ? isSearchLoading : isCategoryLoading;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="hidden md:block w-64 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
             <h3 className="text-xs font-black tracking-widest uppercase mb-4 text-gray-400">Category</h3>
             <ul className="space-y-2 text-xs text-gray-600 font-medium">
               {CATEGORIES.map(c => (
                 <li 
                   key={c.slug} 
                   onClick={() => router.push(`/customer/search?category=${c.slug}`)}
                   className={cn(
                     "hover:text-[#f68b1e] cursor-pointer transition-colors p-2 rounded-md hover:bg-[#fff5e9] truncate",
                     category === c.slug ? "text-[#f68b1e] bg-[#fff5e9]" : ""
                   )}
                 >
                   {c.label}
                 </li>
               ))}
             </ul>
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="bg-white rounded-lg shadow-sm p-4 flex justify-between items-center border border-gray-100">
            <h1 className="text-lg font-bold">
              {isLoading ? (
                <span className="text-gray-400">Searching...</span>
              ) : (
                <>
                  <span className="text-[#f68b1e]">{results?.total || 0}</span> results for "{query || category || 'All Products'}"
                </>
              )}
            </h1>
            <Button variant="ghost" size="sm" className="text-xs font-bold">
              Sort by Popularity <ChevronDown size={14} className="ml-1" />
            </Button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse bg-white rounded-lg h-80 border border-gray-100"></div>
              ))}
            </div>
          ) : results?.products.length === 0 ? (
             <div className="bg-white rounded-lg shadow-sm p-12 text-center space-y-4 border border-gray-100">
                <div className="text-gray-200 flex justify-center"><Search size={64} /></div>
                <h2 className="text-xl font-bold">No results found!</h2>
                <p className="text-gray-500 text-sm">Try using different keywords or categories.</p>
                <Button variant="primary" onClick={() => router.push('/customer')}>GO TO HOME</Button>
             </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {results?.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
