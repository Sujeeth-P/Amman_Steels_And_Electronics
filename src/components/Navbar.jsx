import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Phone, Mail } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';
import UserAvatar from './UserAvatar';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { cart, setIsCartOpen } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  // Get user initials for mobile menu
  const getInitials = (name) => {
    if (!name) return 'U';
    const words = name.trim().split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[words.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  // Generate avatar color
  const getAvatarColor = (name) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-purple-500 to-purple-600',
      'from-pink-500 to-pink-600',
      'from-indigo-500 to-indigo-600',
      'from-cyan-500 to-cyan-600',
    ];
    let hash = 0;
    for (let i = 0; i < name?.length || 0; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

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
        <div className="flex items-center justify-between px-2 md:px-4 lg:px-6">

          {/* Logo */}
          <Link to="/" className="flex flex-col">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">SRI AMMAN</span>
            <span className="text-xs text-blue-600 font-semibold tracking-widest uppercase">Steels & Hardwares</span>
          </Link>

          {/* Desktop Nav */}
          <div className="flex items-center justify-end gap-8">
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
              {/* User Avatar / Sign In - Desktop */}
              <div className="hidden sm:block">
                <UserAvatar />
              </div>

              {/* Cart */}
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

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden p-2 text-slate-700"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-lg z-50">
          <div className="flex flex-col p-4 gap-2">
            {/* Mobile User Info */}
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl mb-2">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getAvatarColor(user.name)} flex items-center justify-center text-white font-semibold text-sm`}>
                  {getInitials(user.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 truncate text-sm">{user.name}</p>
                  <p className="text-xs text-slate-500 truncate">{user.email}</p>
                </div>
              </div>
            ) : null}

            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-slate-600 py-3 px-2 border-b border-slate-50 hover:bg-slate-50 rounded-lg transition-colors"
              >
                {link.name}
              </Link>
            ))}

            {/* Auth Links for Mobile */}
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium text-slate-600 py-3 px-2 border-b border-slate-50 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  My Profile
                </Link>
                <Link
                  to="/orders"
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium text-slate-600 py-3 px-2 border-b border-slate-50 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  My Enquiries
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="text-sm font-medium text-red-600 py-3 px-2 text-left hover:bg-red-50 rounded-lg transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/signin"
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-blue-600 py-3 px-2 hover:bg-blue-50 rounded-lg transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
