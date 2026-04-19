'use client';

import * as React from 'react';
import { useSelector } from 'react-redux';
import { User, Package, Heart, MessageSquare, Settings, LogOut, ChevronRight, MapPin, CreditCard } from 'lucide-react';
import { RootState } from '../../../redux/store';
import { Button } from '../../../components/ui/Button';
import Link from 'next/link';

const MENU_ITEMS = [
  { icon: Package, label: 'Orders', href: '/customer/orders' },
  { icon: MessageSquare, label: 'Inbox', href: '/customer/inbox' },
  { icon: Heart, label: 'Saved Items', href: '/customer/wishlist' },
  { icon: Settings, label: 'Account Management', href: '/customer/settings' },
  { icon: MapPin, label: 'Address Book', href: '/customer/address' },
  { icon: CreditCard, label: 'Vouchers', href: '/customer/vouchers' },
];

export default function AccountPage() {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Menu */}
        <div className="md:col-span-1 space-y-2">
           <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
              <div className="p-4 flex items-center gap-3">
                 <div className="w-10 h-10 bg-[#f68b1e] rounded-full flex items-center justify-center text-white font-bold">
                    {user?.name?.charAt(0) || 'U'}
                 </div>
                 <div className="min-w-0">
                    <p className="text-sm font-bold truncate">Hi, {user?.name || 'Guest User'}</p>
                    <p className="text-[10px] text-gray-400 truncate">{user?.email || 'Sign in to see details'}</p>
                 </div>
              </div>
           </div>

           <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-100 overflow-hidden">
              {MENU_ITEMS.map((item) => (
                <Link key={item.label} href={item.href} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                   <div className="flex items-center gap-3">
                      <item.icon size={20} className="text-gray-500" />
                      <span className="text-sm">{item.label}</span>
                   </div>
                   <ChevronRight size={16} className="text-gray-400" />
                </Link>
              ))}
              <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors text-red-500">
                <LogOut size={20} />
                <span className="text-sm">Logout</span>
              </button>
           </div>
        </div>

        {/* Content */}
        <div className="md:col-span-3 space-y-6">
           <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h1 className="text-xl font-bold mb-6">Account Overview</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div className="p-4 border border-gray-100 rounded-lg space-y-2 relative">
                    <h3 className="text-xs font-bold uppercase text-gray-400">Account Details</h3>
                    <p className="text-sm font-bold">{user?.name || 'Guest User'}</p>
                    <p className="text-xs text-gray-500">{user?.email || 'Login to manage your account'}</p>
                    <button className="absolute top-4 right-4 text-[#f68b1e]"><Settings size={16} /></button>
                 </div>
                 <div className="p-4 border border-gray-100 rounded-lg space-y-2 relative">
                    <h3 className="text-xs font-bold uppercase text-gray-400">Address Book</h3>
                    <p className="text-sm">Your primary shipping address:</p>
                    <p className="text-xs text-gray-500">123 E-commerce Ave, Lagos State, Nigeria</p>
                    <button className="absolute top-4 right-4 text-[#f68b1e]"><Settings size={16} /></button>
                 </div>
              </div>
           </div>

           <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-lg font-bold">Recent Orders</h2>
                 <Link href="/customer/orders" className="text-sm font-bold text-[#f68b1e] hover:underline">SEE ALL</Link>
              </div>
              <div className="text-center py-10 text-gray-400 space-y-3">
                 <Package size={40} className="mx-auto" />
                 <p className="text-sm">You have no recent orders</p>
                 <Link href="/customer">
                    <Button variant="outline" size="sm">START SHOPPING</Button>
                 </Link>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
