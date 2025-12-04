import React from 'react';
import { MapPin, Phone, Mail, Clock, HelpCircle } from 'lucide-react';
import FadeIn from '../components/ui/FadeIn';
import Accordion from '../components/ui/Accordion';

export default function Contact() {
  const faqItems = [
    {
      title: "What kind of tools and equipment can I purchase at this hardware shop?",
      content: "You can buy hand-held tools, power tools, electric tools, keys, hinges, locks, chains, plumbing supplies, household and industrial cleaners, paints, basic tool kits, advanced tool kits, drillers, industrial vacuums and blowers, fasteners, stoppers, fittings, ropes, springs, and several other items for household and commercial use."
    },
    {
      title: "Can Sri Amman Electricals&Hardwares in Perundurai West arrange for a civic worker, plumber, or mason for me?",
      content: "Sri Amman Electricals&Hardwares only sells hardware items. However, some of them also employ plumbers or electricians. You may request them to suggest a good handyman to carry out those jobs for you."
    },
    {
      title: "Will Sri Amman Electricals&Hardwares in Perundurai be able to service my old tools?",
      content: "Sri Amman Electricals&Hardwares sells tools. You can check with Sri Amman Electricals&Hardwares to get more information on this."
    },
    {
      title: "What are the shop timings to visit Sri Amman Electricals&Hardwares?",
      content: "You can come here during Monday:- 9:00 am - 9:00 pm, Tuesday:- 9:00 am - 9:00 pm, Wednesday:- 9:00 am - 9:00 pm, Thursday:- 9:00 am - 9:00 pm, Friday:- 9:00 am - 9:00 pm, Saturday:- 9:00 am - 9:00 pm, Sunday:- 9:00 am - 9:00 pm."
    },
    {
      title: "Can I return tools purchased from Sri Amman Electricals&Hardwares that are no longer being used by me?",
      content: "Used articles cannot be returned. But, please check with the shop representative if they are willing to exchange it for a better one."
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
                          551, Kunnathur Road, Perundurai West,<br />
                          Perundurai-638052,<br />
                          Tamil Nadu
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
                        <p className="text-sm text-slate-600 mt-1">Mon - Sun: 9:00 AM - 9:00 PM</p>
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
                        <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" placeholder="Ravi" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                        <input type="tel" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" placeholder="+91 98765 43210" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                      <input type="email" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" placeholder="Ravi@example.com" />
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
