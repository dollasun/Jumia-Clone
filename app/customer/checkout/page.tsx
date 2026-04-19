'use client';

import * as React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { CreditCard, Truck, ShieldCheck, ChevronRight, ArrowLeft } from 'lucide-react';
import { RootState } from '../../../redux/store';
import { clearCart } from '../../../redux/slices/cart-slice';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { formatCurrency } from '../../../lib/utils';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector((state: RootState) => state.cart);
  const [step, setStep] = useState(1);

  if (items.length === 0) {
    if (typeof window !== 'undefined') router.push('/customer/cart');
    return null;
  }

  const handlePlaceOrder = () => {
    // Simulate order placement
    dispatch(clearCart());
    alert('Order placed successfully! Thank you for shopping with Jumia Luxe.');
    router.push('/customer');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center gap-2 mb-6 text-sm">
        <Link href="/customer/cart" className="text-gray-500 hover:text-[#f68b1e] flex items-center gap-1">
          <ArrowLeft size={16} /> Back to Cart
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Address */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
             <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                <h2 className="font-bold flex items-center gap-2"><Truck size={20} className="text-[#f68b1e]" /> 1. CUSTOMER ADDRESS</h2>
                {step > 1 && <button onClick={() => setStep(1)} className="text-[#f68b1e] text-xs font-bold">CHANGE</button>}
             </div>
             {step === 1 ? (
               <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="First Name" />
                    <Input placeholder="Last Name" />
                  </div>
                  <Input placeholder="Mobile Phone Number" />
                  <Input placeholder="Delivery Address" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="City" />
                    <Input placeholder="Region" />
                  </div>
                  <Button className="w-full sm:w-auto px-8" onClick={() => setStep(2)}>SAVE AND CONTINUE</Button>
               </div>
             ) : (
               <div className="p-4 text-sm text-gray-600">
                 John Doe | +234 812 345 6789 | 123 E-commerce Ave, Tech City
               </div>
             )}
          </div>

          {/* Step 2: Payment */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
             <div className="p-4 bg-gray-50 border-b">
                <h2 className="font-bold flex items-center gap-2"><CreditCard size={20} className="text-[#f68b1e]" /> 2. PAYMENT METHOD</h2>
             </div>
             {step === 2 && (
               <div className="p-6 space-y-6">
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:border-[#f68b1e] transition-all">
                       <input type="radio" name="payment" defaultChecked className="accent-[#f68b1e]" />
                       <div>
                          <p className="font-bold text-sm">Pay with Cards, Bank Transfer or USSD</p>
                          <p className="text-xs text-gray-500">Secure payment via Paystack</p>
                       </div>
                    </label>
                    <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:border-[#f68b1e] transition-all opacity-50">
                       <input type="radio" name="payment" disabled className="accent-[#f68b1e]" />
                       <div>
                          <p className="font-bold text-sm">Cash on Delivery</p>
                          <p className="text-xs text-gray-500">Currently unavailable for your location</p>
                       </div>
                    </label>
                  </div>
                  <Button className="w-full" size="lg" onClick={handlePlaceOrder}>CONFIRM ORDER</Button>
               </div>
             )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
             <h3 className="text-sm font-bold uppercase mb-4 border-b pb-2">Order Summary</h3>
             <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                   <span className="text-gray-600">Items subtotal ({items.length})</span>
                   <span className="font-medium">{formatCurrency(totalAmount * 1000)}</span>
                </div>
                <div className="flex justify-between text-sm">
                   <span className="text-gray-600">Delivery fees</span>
                   <span className="font-medium">{formatCurrency(2500)}</span>
                </div>
             </div>
             <div className="flex justify-between items-center pt-4 border-t border-dashed">
                <span className="font-bold">Total</span>
                <span className="text-xl font-bold text-[#f68b1e]">{formatCurrency(totalAmount * 1000 + 2500)}</span>
             </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 divide-y divide-gray-100">
             <div className="pb-2 mb-2"><h4 className="text-xs font-bold uppercase text-gray-400">Your Order</h4></div>
             {items.map(item => (
                <div key={item.id} className="py-2 flex gap-3">
                   <img src={item.thumbnail} alt="" className="h-12 w-12 object-cover rounded" referrerPolicy="no-referrer" />
                   <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{item.title}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                   </div>
                   <span className="text-xs font-bold">{formatCurrency(item.price * item.quantity * 1000)}</span>
                </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
