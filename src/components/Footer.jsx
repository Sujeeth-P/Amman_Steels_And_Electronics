import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-2 md:px-4 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">SRI AMMA</h3>
            <p className="text-sm leading-relaxed mb-6 text-slate-400">
              Your trusted partner for high-quality construction materials and electrical solutions. 
              Serving builders and homeowners since 1995.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-400 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-blue-400 transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-blue-400 transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/products" className="hover:text-blue-400 transition-colors">Our Products</Link></li>
              <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact Support</Link></li>
              <li><Link to="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold mb-6">Categories</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/products?cat=steel" className="hover:text-blue-400 transition-colors">Steel & TMT</Link></li>
              <li><Link to="/products?cat=cement" className="hover:text-blue-400 transition-colors">Cement</Link></li>
              <li><Link to="/products?cat=electronics" className="hover:text-blue-400 transition-colors">Electronics</Link></li>
              <li><Link to="/products?cat=paints" className="hover:text-blue-400 transition-colors">Paints</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-500 shrink-0 mt-0.5" />
                <span>123 Industrial Estate, Main Road,<br />Chennai, Tamil Nadu 600001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-blue-500 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-blue-500 shrink-0" />
                <span>sales@sriammasteels.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Sri Amma Steels & Electronics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
