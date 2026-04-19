'use client';

import * as React from 'react';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Star, Heart, ShoppingCart, Truck, RefreshCw, Facebook, Twitter, Share2 } from 'lucide-react';
import { useGetProductByIdQuery, useGetProductsQuery } from '../../../../services/products/product.service';
import { addToCart } from '../../../../redux/slices/cart-slice';
import { toggleWishlist } from '../../../../redux/slices/wishlist-slice';
import { RootState } from '../../../../redux/store';
import { Button } from '../../../../components/ui/Button';
import { Badge } from '../../../../components/ui/Badge';
import { ProductGrid } from '../../../../components/product/ProductGrid';
import { formatCurrency, cn } from '../../../../lib/utils';

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useDispatch();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading, error } = useGetProductByIdQuery(Number(productId));
  const { data: similarProducts } = useGetProductsQuery({ category: product?.category, limit: 6 });
  
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const isInWishlist = wishlistItems.some(item => item.id === Number(productId));

  if (isLoading) return <div className="p-10 text-center">Loading product...</div>;
  if (error || !product) return <div className="p-10 text-center text-red-500">Product not found.</div>;

  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow-sm">
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 border border-gray-100">
            <img 
              src={product.images[activeImage] || product.thumbnail} 
              alt={product.title} 
              className="h-full w-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={cn(
                  "h-16 w-16 flex-shrink-0 rounded border-2 transition-all",
                  activeImage === idx ? "border-[#f68b1e]" : "border-gray-200"
                )}
              >
                <img src={img} alt="" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="mb-2">
            <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
            <p className="text-sm text-gray-500">Brand: <span className="text-blue-500 hover:underline cursor-pointer">{product.brand}</span></p>
          </div>

          <hr className="my-4 border-gray-100" />

          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-gray-900">{formatCurrency(discountedPrice * 1000)}</span>
              {product.discountPercentage > 0 && (
                <Badge variant="warning">-{Math.round(product.discountPercentage)}%</Badge>
              )}
            </div>
            <p className="text-sm text-gray-400 line-through">{formatCurrency(product.price * 1000)}</p>
          </div>

          <div className="my-4 flex items-center gap-1 text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center border rounded-md">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-2 hover:bg-gray-100">-</button>
              <span className="px-4 py-2 font-medium">{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-2 hover:bg-gray-100">+</button>
            </div>
            <Button 
                variant="primary" 
                size="lg" 
                className="flex-1"
                onClick={() => { for(let i=0; i<quantity; i++) dispatch(addToCart(product)); }}
            >
                ADD TO CART
            </Button>
            <button onClick={() => dispatch(toggleWishlist(product))} className={cn("p-3 rounded-md border", isInWishlist ? "text-red-500 bg-red-50" : "")}>
                <Heart size={24} fill={isInWishlist ? "currentColor" : "none"} />
            </button>
          </div>

          <hr className="my-6 border-gray-100" />

          <div className="p-4 border border-gray-100 rounded-lg space-y-4">
            <div className="flex items-start gap-3">
              <Truck size={20} className="text-gray-400 mt-1" />
              <div><h4 className="text-sm font-bold">Door Delivery</h4><p className="text-xs text-gray-500">Delivery within 3-5 days</p></div>
            </div>
          </div>
        </div>
      </div>

      {similarProducts && (
        <ProductGrid products={similarProducts.products} title="You May Also Like" />
      )}
    </div>
  );
}
