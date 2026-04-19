import * as React from 'react';
import { Mail, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export function Footer() {
  return (
    <footer className="bg-[#282828] text-white pt-10 pb-6 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-gray-700">
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold italic tracking-tighter mb-4">JUMIA LUXE</h2>
            <p className="text-sm text-gray-400 mb-4 text-xs font-medium">New to Jumia Luxe? Subscribe to our newsletter to get updates on our latest offers!</p>
            <div className="flex gap-2">
              <Input placeholder="Enter Email" className="bg-white text-black border-none text-xs" />
              <Button size="sm">MALE</Button>
              <Button size="sm">FEMALE</Button>
            </div>
          </div>
          <div className="hidden lg:block">
            <h3 className="text-sm font-bold uppercase mb-4 text-xs tracking-wider">LET US HELP YOU</h3>
            <ul className="text-[10px] space-y-2 text-gray-400">
              <li>Help Center</li>
              <li>Delivery options and timelines</li>
              <li>Corporate and bulk purchases</li>
              <li>Contact us</li>
            </ul>
          </div>
          <div className="hidden lg:block">
            <h3 className="text-sm font-bold uppercase mb-4 text-xs tracking-wider">ABOUT JUMIA LUXE</h3>
            <ul className="text-[10px] space-y-2 text-gray-400">
              <li>About us</li>
              <li>Jumia Luxe careers</li>
              <li>Terms and Conditions</li>
              <li>Privacy and Cookie Notice</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase mb-4 text-xs tracking-wider">JOIN US ON</h3>
            <div className="flex gap-4 mb-6">
              <Facebook size={20} className="cursor-pointer hover:text-[#f68b1e]" />
              <Twitter size={20} className="cursor-pointer hover:text-[#f68b1e]" />
              <Instagram size={20} className="cursor-pointer hover:text-[#f68b1e]" />
              <Youtube size={20} className="cursor-pointer hover:text-[#f68b1e]" />
            </div>
          </div>
        </div>
        <div className="pt-6 text-center text-[10px] text-gray-500">
          <p>© {new Date().getFullYear()} Jumia Luxe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
