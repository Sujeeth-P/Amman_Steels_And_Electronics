import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Send, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleRequestQuote = async () => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      setIsCartOpen(false);
      navigate('/signin', { state: { from: '/', message: 'Please sign in to request a quote' } });
      return;
    }

    // Check if cart has items
    if (cart.length === 0) {
      return;
    }

    setSubmitting(true);

    try {
      // Prepare enquiry data
      const enquiryData = {
        customer: {
          name: user?.name || user?.email || 'Customer',
          email: user?.email || '',
          phone: user?.phone || ''
        },
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          unit: item.unit,
          image: item.image
        })),
        source: 'cart'
      };

      // Get token from localStorage
      const token = localStorage.getItem('token');

      // Submit enquiry to backend
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/enquiries`, enquiryData, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });

      if (response.data.success) {
        // Clear cart after successful submission
        clearCart();
        setIsCartOpen(false);
        navigate('/enquiry-success');
      }
    } catch (error) {
      console.error('Failed to submit enquiry:', error);
      alert('Failed to submit enquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-lg font-bold text-slate-900">Enquiry List ({cart.length})</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                    <Send size={32} />
                  </div>
                  <p>Your enquiry list is empty</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 bg-slate-100 rounded-lg overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-900 line-clamp-1">{item.name}</h3>
                      <p className="text-sm text-slate-500 mb-2">{item.unit}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-slate-200 rounded-md">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="px-3 py-1 hover:bg-slate-50 text-slate-600"
                          >
                            -
                          </button>
                          <span className="px-2 text-sm font-medium w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 hover:bg-slate-50 text-slate-600"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-600 p-1"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-slate-100 bg-slate-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-slate-600">Estimated Total</span>
                  <span className="text-xl font-bold text-slate-900">{formatCurrency(total)}</span>
                </div>
                <p className="text-xs text-slate-500 mb-4">
                  *Final pricing may vary based on bulk quantity and location.
                </p>
                <button
                  onClick={handleRequestQuote}
                  disabled={submitting}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${submitting
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                    } text-white`}
                >
                  {submitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      Request Quote <Send size={18} />
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
