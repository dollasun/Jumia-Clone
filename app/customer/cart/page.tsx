'use client';

import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { RootState } from '../../../redux/store';
import { removeFromCart, updateQuantity } from '../../../redux/slices/cart-slice';
import { Button } from '../../../components/ui/Button';
import { formatCurrency } from '../../../lib/utils';

export default function CartPage() {
  const dispatch = useDispatch();
  const { items, totalAmount, totalQuantity } = useSelector((state: RootState) => state.cart);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center space-y-6">
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-300">
           <ShoppingBag size={48} />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Your cart is empty!</h2>
        <Link href="/customer">
          <Button variant="primary" size="lg">START SHOPPING</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
             <div className="p-4 border-b"><h1 className="text-xl font-bold">Cart ({totalQuantity})</h1></div>
             <div className="divide-y divide-gray-100">
                {items.map((item) => (
                  <div key={item.id} className="p-4 flex gap-4">
                    <div className="h-20 w-20 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                       <img src={item.thumbnail} alt={item.title} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 space-y-1">
                       <div className="flex justify-between items-start">
                          <Link href={`/customer/product/${item.id}`} className="text-sm font-medium text-gray-800 hover:text-[#f68b1e] line-clamp-2">{item.title}</Link>
                          <span className="font-bold text-lg">{formatCurrency(item.price * item.quantity * 1000)}</span>
                       </div>
                       <div className="flex justify-between items-center mt-3">
                          <button onClick={() => dispatch(removeFromCart(item.id))} className="flex items-center gap-1 text-[#f68b1e] text-xs font-bold p-1 rounded hover:bg-[#fff5e9]">
                            <Trash2 size={16} /> REMOVE
                          </button>
                          <div className="flex items-center border rounded">
                             <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))} className="px-2 py-1 hover:bg-gray-100 disabled:opacity-30" disabled={item.quantity <= 1}><Minus size={14} /></button>
                             <span className="px-3 text-sm font-bold">{item.quantity}</span>
                             <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))} className="px-2 py-1 hover:bg-gray-100"><Plus size={14} /></button>
                          </div>
                       </div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 h-fit sticky top-24">
           <h3 className="text-sm font-bold uppercase mb-4 text-gray-500">Cart Summary</h3>
           <div className="flex justify-between items-center mb-4">
              <span className="text-sm">Subtotal</span>
              <span className="text-lg font-bold">{formatCurrency(totalAmount * 1000)}</span>
           </div>
           <Button className="w-full">CHECKOUT</Button>
        </div>
      </div>
    </div>
  );
}
