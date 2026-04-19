'use client';

import * as React from 'react';
import { Smartphone, Laptop, Sparkles, Home as HomeIcon, ShoppingBag, Zap, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import { useGetProductsQuery } from '../../services/products/product.service';
import { ProductGrid } from '../../components/product/ProductGrid';
import { Button } from '../../components/ui/Button';
import { motion } from 'motion/react';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { ChevronLeft, ChevronRight } from 'lucide-react';

const CATEGORIES = [
  { icon: Smartphone, label: 'Phones', slug: 'smartphones' },
  { icon: Laptop, label: 'Laptops', slug: 'laptops' },
  { icon: HomeIcon, label: 'Home Decoration', slug: 'home-decoration' },
  { icon: Sparkles, label: 'Beauty', slug: 'fragrances' },
  { icon: ShoppingBag, label: 'Fashion', slug: 'mens-shirts' },
  { icon: Zap, label: 'Electronics', slug: 'lighting' },
];

export default function CustomerHomePage() {
  const router = useRouter();
  const { data: flashSaleProducts, isLoading: isFlashLoading } = useGetProductsQuery({ limit: 10 });
  const { data: recommendations, isLoading: isRecLoading } = useGetProductsQuery({ limit: 12, skip: 18 });

  const [scrollIndex, setScrollIndex] = React.useState(0);
  const carouselRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.8;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-10">
      {/* Hero Section Redesign */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="hidden lg:block bg-white rounded-lg shadow-sm overflow-hidden p-3 border border-gray-100 h-full">
          <ul className="space-y-1">
            {CATEGORIES.map((cat) => (
              <li key={cat.label}>
                <button 
                  onClick={() => router.push(`/customer/search?category=${cat.slug}`)}
                  className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-xs font-medium text-gray-700 hover:bg-[#fff5e9] hover:text-[#f68b1e] transition-colors"
                >
                  <cat.icon size={16} />
                  <span>{cat.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3 h-[400px] sm:h-[450px] rounded-2xl overflow-hidden relative shadow-xl">
           {/* Main Banner Background */}
           <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-br from-[#f68b1e] via-[#ff4e00] to-orange-600"
          >
            {/* Visual Accents */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full -ml-48 -mb-48 blur-3xl" />

            <div className="relative h-full flex flex-col lg:flex-row items-center">
              {/* Content Left */}
              <div className="w-full lg:w-1/2 p-8 lg:p-12 text-white z-10 flex flex-col justify-center">
                <motion.div
                   initial={{ x: -20, opacity: 0 }}
                   animate={{ x: 0, opacity: 1 }}
                >
                  <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full backdrop-blur-md text-[10px] font-bold uppercase tracking-widest mb-4">
                    <Zap size={12} className="fill-yellow-400 text-yellow-400" />
                    Limited Time Offer
                  </div>
                  <h1 className="text-4xl sm:text-6xl font-black italic tracking-tighter mb-4 leading-none">
                    FLASH <br /> SALES
                  </h1>
                  <p className="text-lg sm:text-xl font-medium mb-8 text-white/90">
                    Up to 70% OFF on Top Brands
                  </p>
                  <Button 
                    size="lg" 
                    className="w-fit bg-white text-[#f68b1e] font-black tracking-wide hover:bg-gray-100 shadow-lg border-none scale-100 hover:scale-105 transition-transform"
                    onClick={() => router.push('/customer/search?category=smartphones')}
                  >
                    SHOP NOW
                  </Button>
                </motion.div>
              </div>

              {/* Carousel Right */}
              <div className="hidden lg:flex w-full lg:w-1/2 h-full items-center pr-12 relative">
                <div className="w-full bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl overflow-hidden relative group">
                  <div className="flex items-center justify-between mb-4">
                     <span className="text-white font-bold text-sm tracking-wide">TOP DEALS</span>
                     <div className="flex gap-2">
                        <button 
                          onClick={() => scroll('left')}
                          className="p-1.5 bg-white/10 hover:bg-white/30 rounded-full text-white transition-colors"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <button 
                          onClick={() => scroll('right')}
                          className="p-1.5 bg-white/10 hover:bg-white/30 rounded-full text-white transition-colors"
                        >
                          <ChevronRight size={16} />
                        </button>
                     </div>
                  </div>

                  <div 
                    ref={carouselRef}
                    className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {!isFlashLoading && flashSaleProducts?.products.map((product) => (
                      <motion.div 
                        key={product.id}
                        whileHover={{ y: -5 }}
                        className="flex-shrink-0 w-40 bg-white rounded-xl overflow-hidden shadow-lg snap-start"
                      >
                         <div className="relative aspect-square">
                            <img 
                              src={product.thumbnail} 
                              alt={product.title}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute top-2 left-2 bg-red-600 text-[8px] font-bold text-white px-2 py-0.5 rounded">
                               -{Math.round(product.discountPercentage)}%
                            </div>
                         </div>
                         <div className="p-3 space-y-1">
                            <p className="text-[10px] font-bold text-gray-800 truncate">{product.title}</p>
                            <div className="flex items-center gap-1.5">
                               <span className="text-xs font-black text-gray-900">${product.price}</span>
                               <span className="text-[8px] text-gray-400 line-through">${(product.price / (1 - product.discountPercentage / 100)).toFixed(0)}</span>
                            </div>
                         </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-4 px-6 bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center gap-3">
          <Truck className="text-[#f68b1e]" />
          <div><h4 className="text-sm font-bold">Fast Delivery</h4></div>
        </div>
        <div className="flex items-center gap-3">
          <ShieldCheck className="text-[#f68b1e]" />
          <div><h4 className="text-sm font-bold">Secure Payment</h4></div>
        </div>
        <div className="flex items-center gap-3 border-l md:pl-4 border-gray-100">
          <RefreshCw className="text-[#f68b1e]" />
          <div><h4 className="text-sm font-bold">Easy Return</h4></div>
        </div>
        <div className="flex items-center gap-3 border-l md:pl-4 border-gray-100">
          <Zap className="text-[#f68b1e]" />
          <div><h4 className="text-sm font-bold">24/7 Support</h4></div>
        </div>
      </div>

      <section className="bg-[#f68b1e] rounded-lg p-4">
        {!isFlashLoading && flashSaleProducts && (
          <ProductGrid products={flashSaleProducts.products} title="Flash Sales" />
        )}
      </section>

      <section className="bg-white p-4 rounded-lg shadow-sm">
        {!isRecLoading && recommendations && (
          <ProductGrid products={recommendations.products} title="Recommended for You" />
        )}
      </section>
    </div>
  );
}
