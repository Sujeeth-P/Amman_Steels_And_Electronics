import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, Eye } from 'lucide-react';
import { products, categories } from '../data/products';
import { useCart } from '../context/CartContext';
import { formatCurrency, cn } from '../lib/utils';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();
  const [search, setSearch] = useState('');
  
  const activeCategory = searchParams.get('cat') || 'all';

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const handleCategoryChange = (catId) => {
    setSearchParams(catId === 'all' ? {} : { cat: catId });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-2 md:px-4 lg:px-6">
      <div className="container mx-auto px-2 md:px-4 lg:px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Our Product Catalogue</h1>
          <p className="text-slate-600 max-w-2xl">
            Browse our extensive range of construction materials and electronics. 
            Select items to add to your enquiry list for a bulk quote.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 shrink-0 space-y-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-slate-900 font-bold">
                <Filter size={20} /> Categories
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => handleCategoryChange('all')}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                    activeCategory === 'all' ? "bg-blue-50 text-blue-700 font-medium" : "text-slate-600 hover:bg-slate-50"
                  )}
                >
                  All Products
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                      activeCategory === cat.id ? "bg-blue-50 text-blue-700 font-medium" : "text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search for TMT bars, cement, switches..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group">
                    <Link to={`/products/${product.id}`} className="relative h-56 bg-slate-100 block overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="bg-white/90 backdrop-blur text-slate-900 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                          <Eye size={16} /> View Details
                        </span>
                      </div>
                    </Link>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="mb-4">
                        <Link to={`/products/${product.id}`} className="hover:text-blue-600 transition-colors">
                          <h3 className="font-bold text-lg text-slate-900 mb-1">{product.name}</h3>
                        </Link>
                        <p className="text-slate-500 text-sm line-clamp-2">{product.description}</p>
                      </div>
                      <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <div className="text-lg font-bold text-slate-900">{formatCurrency(product.price)}</div>
                          <div className="text-xs text-slate-500">per {product.unit}</div>
                        </div>
                        <button 
                          onClick={() => addToCart(product)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="inline-block p-4 rounded-full bg-slate-100 mb-4">
                  <Search size={32} className="text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">No products found</h3>
                <p className="text-slate-500">Try adjusting your search or category filter.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
