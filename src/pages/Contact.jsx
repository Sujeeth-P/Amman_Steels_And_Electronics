import React from 'react';
import { MapPin, Phone, Mail, Clock, HelpCircle } from 'lucide-react';
import FadeIn from '../components/ui/FadeIn';
import Accordion from '../components/ui/Accordion';

export default function Contact() {
  const faqItems = [
    {
      title: "Do you provide delivery for small orders?",
      content: "Yes, we provide delivery for all orders. However, free delivery is applicable only for bulk orders above ₹50,000 within a 20km radius. For smaller orders, nominal transport charges apply."
    },
    {
      title: "What brands of cement do you stock?",
      content: "We are authorized dealers for UltraTech, Dalmia, Ramco, and Chettinad Cement. We ensure fresh stock is always available."
    },
    {
      title: "Can I get a GST invoice for my purchase?",
      content: "Absolutely. All our sales are billed with GST invoices. If you are a business, please provide your GSTIN at the time of billing for input credit."
    },
    {
      title: "Do you accept returns?",
      content: "We accept returns for unused, undamaged non-perishable items (like electricals and steel) within 7 days. Cement bags once sold cannot be returned due to quality sensitivity."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <FadeIn direction="up">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-slate-900 mb-4">Get in Touch</h1>
              <p className="text-slate-600">Have a bulk requirement or a specific query? We're here to help.</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Contact Info */}
            <div className="md:col-span-1 space-y-6">
              <FadeIn direction="right" delay={0.2}>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-full">
                  <h3 className="font-bold text-slate-900 mb-6 text-lg">Contact Information</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">Visit Us</h4>
                        <p className="text-sm text-slate-600 mt-1">
                          123 Industrial Estate,<br />
                          Main Road, Chennai,<br />
                          Tamil Nadu 600001
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                        <Phone size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">Call Us</h4>
                        <p className="text-sm text-slate-600 mt-1">+91 98765 43210</p>
                        <p className="text-sm text-slate-600">+91 44 1234 5678</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                        <Mail size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">Email Us</h4>
                        <p className="text-sm text-slate-600 mt-1">sales@sriammasteels.com</p>
                        <p className="text-sm text-slate-600 mt-1">support@sriammasteels.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                        <Clock size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">Working Hours</h4>
                        <p className="text-sm text-slate-600 mt-1">Mon - Sat: 9:00 AM - 8:00 PM</p>
                        <p className="text-sm text-slate-600">Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Form */}
            <div className="md:col-span-2">
              <FadeIn direction="left" delay={0.4}>
                <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 h-full">
                  <h3 className="font-bold text-slate-900 mb-6 text-lg">Send us a Message</h3>
                  <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                        <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" placeholder="John Doe" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                        <input type="tel" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" placeholder="+91 98765 43210" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                      <input type="email" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" placeholder="john@example.com" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Message / Requirement</label>
                      <textarea rows="4" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" placeholder="Please describe your requirement..."></textarea>
                    </div>

                    <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors w-full md:w-auto">
                      Send Message
                    </button>
                  </form>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* FAQ Section */}
          <FadeIn direction="up" delay={0.6}>
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-8">
                <HelpCircle className="text-blue-600" size={24} />
                <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
              </div>
              <Accordion items={faqItems} />
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
