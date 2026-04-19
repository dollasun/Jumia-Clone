'use client';

import * as React from 'react';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Product } from '../../services/products/product-type';
import { addToCart } from '../../redux/slices/cart-slice';
import { toggleWishlist } from '../../redux/slices/wishlist-slice';
import { RootState } from '../../redux/store';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { formatCurrency, cn } from '../../lib/utils';

export function ProductCard({ product }: { product: Product }) {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const isInWishlist = wishlistItems.some(item => item.id === product.id);

  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-md h-full"
    >
      <Link href={`/customer/product/${product.id}`} className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        {product.discountPercentage > 10 && (
          <Badge className="absolute left-2 top-2">
            -{Math.round(product.discountPercentage)}%
          </Badge>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-3">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{product.brand}</span>
          <button 
            onClick={() => dispatch(toggleWishlist(product))}
            className={cn(
              "p-1 hover:text-red-500 transition-colors",
              isInWishlist ? "text-red-500" : "text-gray-300"
            )}
          >
            <Heart size={18} fill={isInWishlist ? "currentColor" : "none"} />
          </button>
        </div>

        <Link href={`/customer/product/${product.id}`} className="mb-2 line-clamp-2 text-sm text-gray-800 hover:text-[#f68b1e]">
          {product.title}
        </Link>

        <div className="mt-auto space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">{formatCurrency(discountedPrice * 1000)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 line-through">{formatCurrency(product.price * 1000)}</span>
          </div>
        </div>

        <div className="mt-3">
          <Button 
            variant="primary" 
            size="sm" 
            className="w-full text-xs"
            onClick={(e) => {
              e.preventDefault();
              dispatch(addToCart(product));
            }}
          >
            ADD TO CART
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
