import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Home, ArrowRight } from 'lucide-react';

export default function EnquirySuccess() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl text-center border border-slate-100">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} />
        </div>
        
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Enquiry Submitted!</h1>
        <p className="text-slate-600 mb-8 leading-relaxed">
          Thank you for your interest. Our sales team has received your bulk enquiry and will contact you within 24 hours with the best pricing.
        </p>

        <div className="space-y-3">
          <Link 
            to="/" 
            className="block w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
          >
            <Home size={18} /> Return to Home
          </Link>
          <Link 
            to="/products" 
            className="block w-full bg-white text-slate-700 border border-slate-200 py-3 rounded-lg font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
          >
            Continue Browsing <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
