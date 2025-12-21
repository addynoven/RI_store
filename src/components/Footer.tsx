import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand & About */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex gap-[2px]">
                <div className="h-6 w-1.5 bg-white -skew-x-12"></div>
                <div className="h-6 w-1.5 bg-white -skew-x-12"></div>
                <div className="h-6 w-1.5 bg-white -skew-x-12"></div>
              </div>
              <span className="text-2xl font-serif font-bold tracking-wide">{siteConfig.name}</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Discover timeless elegance with our handcrafted jewelry collection. 
              Each piece tells a story of artistry and passion.
            </p>
            <div className="flex gap-4 pt-2">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/shop" className="text-sm text-gray-400 hover:text-white transition-colors">Shop</Link></li>
              <li><Link href="/shop" className="text-sm text-gray-400 hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link href="/shop" className="text-sm text-gray-400 hover:text-white transition-colors">Best Sellers</Link></li>
              <li><Link href="/shop" className="text-sm text-gray-400 hover:text-white transition-colors">Sale</Link></li>
              <li><Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Customer Service</h4>
            <ul className="space-y-3">
              <li><Link href="/account" className="text-sm text-gray-400 hover:text-white transition-colors">My Account</Link></li>
              <li><Link href="/account/orders" className="text-sm text-gray-400 hover:text-white transition-colors">Order History</Link></li>
              <li><Link href="/account/wishlist" className="text-sm text-gray-400 hover:text-white transition-colors">Wishlist</Link></li>
              <li><Link href="/faq" className="text-sm text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/shipping-returns" className="text-sm text-gray-400 hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-400">
                  {siteConfig.contact.address.street}<br />
                  {siteConfig.contact.address.city}, {siteConfig.contact.address.state} {siteConfig.contact.address.zip}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-400">{siteConfig.contact.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-400">{siteConfig.contact.email}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className="h-6 opacity-60" />
            <img src="https://img.icons8.com/color/48/mastercard.png" alt="Mastercard" className="h-6 opacity-60" />
            <img src="https://img.icons8.com/color/48/amex.png" alt="Amex" className="h-6 opacity-60" />
            <img src="https://img.icons8.com/color/48/paypal.png" alt="PayPal" className="h-6 opacity-60" />
          </div>
        </div>
      </div>
    </footer>
  );
}
