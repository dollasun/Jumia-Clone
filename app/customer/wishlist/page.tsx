'use client';

import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import { RootState } from '../../../redux/store';
import { toggleWishlist } from '../../../redux/slices/wishlist-slice';
import { addToCart } from '../../../redux/slices/cart-slice';
import { Button } from '../../../components/ui/Button';
import { ProductCard } from '../../../components/product/ProductCard';

export default function WishlistPage() {
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const dispatch = useDispatch();

  if (wishlistItems.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center space-y-6">
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-300">
           <Heart size={48} />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Your wishlist is empty!</h2>
        <p className="text-gray-500">Save items you love here to find them easily later.</p>
        <Link href="/customer">
          <Button variant="primary" size="lg">CONTINUE SHOPPING</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">My Wishlist ({wishlistItems.length})</h1>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {wishlistItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
