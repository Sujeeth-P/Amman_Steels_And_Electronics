import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Phone, Mail, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { cart, setIsCartOpen } = useCart();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 hidden md:block">
        <div className="container mx-auto flex justify-between items-center px-2 md:px-4 lg:px-6">
          <p>Premium Industrial Supplies & Electronics Partner</p>
          <div className="flex items-center gap-6">
            <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone size={14} /> +91 98765 43210
            </a>
            <a href="mailto:sales@sriammasteels.com" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail size={14} /> sales@sriammasteels.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center px-2 md:px-4 lg:px-6">
          {/* Logo */}
          <Link to="/" className="flex flex-col">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">SRI AMMAN</span>
            <span className="text-xs text-blue-600 font-semibold tracking-widest uppercase">Steels & Electronics</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => ( 
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-blue-600",
                  location.pathname === link.path ? "text-blue-600" : "text-slate-600"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-700"
            >
              <ShoppingCart size={22} />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
            <button 
              className="md:hidden p-2 text-slate-700"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-lg">
          <div className="flex flex-col p-4 gap-4 ">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-slate-600 py-2 border-b border-slate-50"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
