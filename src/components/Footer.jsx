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
            <h3 className="text-2xl font-bold text-white mb-4">SRI AMMAN</h3>
            <p className="text-sm leading-relaxed mb-6 text-slate-400">
              One of the leading businesses in Hardware Shops, Pipe Dealers, Drill Dealers, Torque Wrench Dealers, and Stainless Steel Screw Dealers. Providing top-quality hardware and electrical supplies to customers across Perundurai.
            </p>
            <div className="flex gap-4">
              {/* <a href="#" className="hover:text-blue-400 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-blue-400 transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-blue-400 transition-colors"><Twitter size={20} /></a> */}
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
            <h4 className="text-white font-semibold mb-6">Services</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/products?cat=hardware" className="hover:text-blue-400 transition-colors">Hardware Shops</Link></li>
              <li><Link to="/products?cat=pipes" className="hover:text-blue-400 transition-colors">Pipe Dealers</Link></li>
              <li><Link to="/products?cat=drills" className="hover:text-blue-400 transition-colors">Drill Dealers</Link></li>
              <li><Link to="/products?cat=electronics" className="hover:text-blue-400 transition-colors">Electronics</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-500 shrink-0 mt-0.5" />
                <span>551, Kunnathur Road, Perundurai West, Perundurai-638052,<br />Tamil Nadu</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-blue-500 shrink-0" />
                <span>+91 98653 32690</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-blue-500 shrink-0" />
                <span>sales@sriammasteels.com</span>
              </li>
              <li className="text-xs text-slate-400 mt-2">
                Hours: Mon-Sat 9:00 AM - 9:00 PM
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
