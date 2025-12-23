import React from 'react';
import { Award, Users, Building2, TrendingUp } from 'lucide-react';
import FadeIn from '../components/ui/FadeIn';
import CountUp from '../components/ui/CountUp';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000" 
            alt="Warehouse" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <FadeIn direction="up">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Building Trust Since 1995</h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Sri Amma Steels & Electronics has been the backbone of countless construction projects across Tamil Nadu, delivering quality materials with unmatched reliability.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: 25, suffix: '+', label: 'Years of Experience' },
              { value: 5000, suffix: '+', label: 'Happy Customers' },
              { value: 100, suffix: '+', label: 'Product Categories' },
              { value: 24, suffix: 'h', label: 'Customer Support' }
            ].map((stat, idx) => (
              <FadeIn key={idx} delay={idx * 0.1} direction="up">
                <div>
                  <div className="text-4xl font-bold mb-2">
                    <CountUp to={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-blue-100 text-sm uppercase tracking-wider">{stat.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center px-2 md:px-4 lg:px-6">
            <div className="md:w-1/2">
              <FadeIn direction="right">
                <img 
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800" 
                  alt="Construction Site" 
                  className="rounded-xl shadow-2xl hover:scale-105 transition-transform duration-500"
                />
              </FadeIn>
            </div>
            <div className="md:w-1/2">
              <FadeIn direction="left">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Story</h2>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    Founded by Mr. K. Muthusamy in 1995, Sri Amma Steels began as a modest retail outlet in Chennai. With a vision to provide transparent pricing and high-quality materials to small builders and homeowners, we quickly gained a reputation for integrity.
                  </p>
                  <p>
                    Over the decades, we expanded our portfolio to include electricals, paints, and plumbing solutions, becoming a comprehensive "One-Stop Construction Shop". Today, we serve major infrastructure companies alongside individual home builders.
                  </p>
                  <p>
                    Our commitment remains unchanged: <strong>To build a stronger tomorrow with materials you can trust.</strong>
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-2 md:px-4 lg:px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose Us?</h2>
              <p className="text-slate-600">Our core values define how we do business.</p>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-2 md:px-4 lg:px-6">
            {[
              { icon: Award, title: 'Premium Quality', desc: 'We source directly from manufacturers like Tata Steel, UltraTech, and Havells to ensure 100% authenticity.' },
              { icon: TrendingUp, title: 'Wholesale Pricing', desc: 'Benefit from our bulk purchasing power. We pass the savings directly to you, ensuring the best market rates.' },
              { icon: Users, title: 'Expert Guidance', desc: 'Not sure what you need? Our experienced team provides technical advice to help you choose the right materials.' }
            ].map((item, idx) => (
              <FadeIn key={idx} delay={idx * 0.2} direction="up">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 text-center hover:-translate-y-2 transition-transform duration-300 hover:shadow-lg">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <item.icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
