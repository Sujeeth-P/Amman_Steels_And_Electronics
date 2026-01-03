import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, Package, Eye, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories } from '../data/products';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../lib/utils';
import FadeIn from '../components/ui/FadeIn';
import { HERO_IMAGES } from '../constants/images';

const heroSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=2000",
    title: "Building Dreams with Strength & Quality",
    subtitle: "Your one-stop destination for premium steel, cement, and electrical supplies. We cater to bulk orders with competitive pricing.",
    cta: "View Catalogue"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&q=80&w=2000",
    title: "The Foundation of Every Great Structure",
    subtitle: "Authorized dealers of UltraTech, Dalmia, and top cement brands. Fresh stock guaranteed for maximum durability.",
    cta: "Order Cement"
  },
  {
    id: 3,
    image: HERO_IMAGES.construction,
    title: "Powering Your World Safely",
    subtitle: "From industrial wiring to modular switches, get ISI marked electrical components for complete peace of mind.",
    cta: "Explore Electronics"
  }
];

export default function Home() {
  const { addToCart } = useCart();
  const { products, loading, error } = useProducts();
  const featuredProducts = products.slice(0, 4);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    <div className="min-h-screen">
      {/* Hero Carousel Section */}
      <section className="relative h-[600px] min-h-screen bg-slate-900 overflow-hidden group">
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 z-0"
          >
            <img
              src={heroSlides[currentSlide].image}
              alt="Hero Background"
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/70 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="container mx-auto px-4 relative z-10 h-full flex items-center">
          <div className="max-w-3xl lg:min-h-[55vh] text-white pl-6 md:px-4 lg:pl-12 ml-1 md:ml-6 lg:ml-12">
            <AnimatePresence mode='wait'>
              <motion.div
                key={currentSlide}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                  {heroSlides[currentSlide].title.split(' ').map((word, i) => (
                    <span key={i} className={i % 3 === 1 ? "text-blue-500" : "text-white"}> {word}</span>
                  ))}
                </h1>
                <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-xl">
                  {heroSlides[currentSlide].subtitle}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/products"
                    className="mt-4 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all flex items-center gap-2"
                  >
                    {heroSlides[currentSlide].cta} <ArrowRight size={20} />
                  </Link>
                  <Link
                    to="/contact"
                    className="mt-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all"
                  >
                    Bulk Enquiry
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="absolute bottom-8 right-8 flex gap-2 z-20">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === idx ? "w-8 bg-blue-500" : "w-2 bg-white/30 hover:bg-white/50"
                }`}
            />
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 text-white/50 hover:bg-black/40 hover:text-white transition-all opacity-0 group-hover:opacity-100 z-20"
        >
          <ChevronLeft size={32} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 text-white/50 hover:bg-black/40 hover:text-white transition-all opacity-0 group-hover:opacity-100 z-20"
        >
          <ChevronRight size={32} />
        </button>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-items-center">
            {[
              { icon: ShieldCheck, title: 'Quality Assured', desc: '100% authentic products from top brands like Tata, UltraTech, and more.' },
              // { icon: Truck, title: 'Fast Delivery', desc: 'Efficient logistics network ensuring timely delivery to your construction site.' },
              { icon: Package, title: 'Bulk Availability', desc: 'Large inventory stocks ready for immediate dispatch for big projects.' }
            ].map((feature, idx) => (
              <FadeIn key={idx} delay={idx * 0.2} direction="up">
                <div className="p-6 rounded-xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600">{feature.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-slate-50 px-2 md:px-4 lg:px-6">
        <div className="container mx-auto px-2 md:px-4 lg:px-6">
          <FadeIn direction="up">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Our Categories</h2>
                <p className="text-slate-600">Explore our wide range of construction materials</p>
              </div>
              <Link to="/products" className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-1">
                View All <ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <FadeIn key={cat.id} delay={idx * 0.1} direction="up">
                <Link
                  to={`/products?cat=${cat.id}`}
                  className="group relative h-64 rounded-xl overflow-hidden cursor-pointer block shadow-md hover:shadow-xl transition-shadow"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <h3 className="text-xl font-bold text-white mb-1 translate-y-2 group-hover:translate-y-0 transition-transform">{cat.name}</h3>
                    <span className="text-sm text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      Explore Collection <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white px-2 md:px-4 lg:px-6">
        <div className="container mx-auto px-2 md:px-4 lg:px-6">
          <FadeIn>
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Featured Products</h2>
          </FadeIn>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="animate-spin text-blue-600" size={48} />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product, idx) => (
                <FadeIn key={product.id} delay={idx * 0.1} direction="up">
                  <div className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
                    <Link to={`/products/${product.id}`} className="relative h-48 overflow-hidden bg-slate-100 block">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-slate-900 shadow-sm z-10">
                        {product.category.toUpperCase()}
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="bg-white/90 backdrop-blur text-slate-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                          <Eye size={14} /> View
                        </span>
                      </div>
                    </Link>
                    <div className="p-5 flex-1 flex flex-col">
                      <Link to={`/products/${product.id}`} className="hover:text-blue-600 transition-colors">
                        <h3 className="font-bold text-lg text-slate-900 mb-1 line-clamp-1">{product.name}</h3>
                      </Link>
                      <p className="text-slate-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <div>
                          <span className="text-lg font-bold text-blue-600">{formatCurrency(product.price)}</span>
                          <span className="text-xs text-slate-500"> / {product.unit}</span>
                        </div>
                        <button
                          onClick={() => addToCart(product)}
                          className="bg-slate-900 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          <ArrowRight size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
