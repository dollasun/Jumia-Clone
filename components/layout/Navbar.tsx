'use client';

import * as React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { Search, ShoppingCart, User, Heart, Menu, X, ChevronDown } from 'lucide-react';
import { RootState } from '../../redux/store';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { cn } from '../../lib/utils';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const cartQuantity = useSelector((state: RootState) => state.cart.totalQuantity);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/customer/search?q=${searchQuery}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="bg-[#f1f1f2] py-1 text-center text-xs font-medium text-gray-600 hidden md:block border-b">
        Sell on Jumia | Support | Contact Us
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="mr-2 p-2 md:hidden text-gray-600">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link href="/customer" className="flex items-center gap-1">
              <span className="text-2xl font-black italic text-[#f68b1e] tracking-tighter">JUMIA</span>
              <span className="hidden sm:inline-block font-bold text-2xl text-black">LUXE</span>
            </Link>
          </div>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl items-center relative gap-2">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search products, brands and categories"
                className="pl-10 h-10 border-gray-300 focus:border-[#f68b1e]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit" className="px-6 h-10">SEARCH</Button>
          </form>

          <div className="flex items-center gap-1 sm:gap-4">
            <div className="relative group hidden sm:block">
              <Link href="/customer/account">
                <Button variant="ghost" className="flex items-center gap-2 group-hover:text-[#f68b1e]">
                  <User size={22} />
                  <span className="hidden lg:inline">Account</span>
                  <ChevronDown size={16} />
                </Button>
              </Link>
            </div>

            <Link href="/customer/wishlist" className="hidden sm:block">
               <Button variant="ghost" className="relative p-2 flex items-center gap-2 group-hover:text-[#f68b1e]">
                  <Heart size={22} />
                  <span className="hidden lg:inline">Saved</span>
               </Button>
            </Link>

            <Link href="/customer/cart">
              <Button variant="ghost" className="relative p-2 flex items-center gap-2 group-hover:text-[#f68b1e]">
                <div className="relative">
                  <ShoppingCart size={22} />
                  {cartQuantity > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#f68b1e] text-[10px] font-bold text-white border-2 border-white">
                      {cartQuantity}
                    </span>
                  )}
                </div>
                <span className="hidden lg:inline font-bold">Cart</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
