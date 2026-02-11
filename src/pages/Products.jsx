import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, Eye, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency, cn } from '../lib/utils';
import axios from 'axios';

// Category definitions with display names
const categories = [
  { id: 'steel', name: 'Steel & TMT' },
  { id: 'cement', name: 'Cement' },
  { id: 'electronics', name: 'Electronics & Electricals' },
  { id: 'paints', name: 'Paints & Finishes' },
  { id: 'pipes', name: 'Pipes & Plumbing' }
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const activeCategory = searchParams.get('cat') || 'all';

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Build query params
        const params = new URLSearchParams();
        if (activeCategory !== 'all') {
          params.append('category', activeCategory);
        }

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products?${params.toString()}`);

        if (response.data.success) {
          setProducts(response.data.data);
        } else {
          setError('Failed to load products');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory]);

  // Filter products by search (client-side for quick response)
  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description?.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

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

            {/* Loading State */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 size={48} className="text-blue-600 animate-spin mb-4" />
                <p className="text-slate-600">Loading products...</p>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="text-center py-20">
                <div className="inline-block p-4 rounded-full bg-red-100 mb-4">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{error}</h3>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Products Grid */}
            {!loading && !error && filteredProducts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id || product._id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group">
                    <Link to={`/products/${product.id}`} className="relative h-56 bg-slate-100 block overflow-hidden">
                      <img
                        src={product.image || 'https://via.placeholder.com/300'}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/300'; }}
                      />
                      {/* Stock Badge */}
                      <div className={cn(
                        "absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium",
                        product.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      )}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </div>
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
                          disabled={!product.inStock}
                          className={cn(
                            "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                            product.inStock
                              ? "bg-blue-600 text-white hover:bg-blue-700"
                              : "bg-slate-200 text-slate-400 cursor-not-allowed"
                          )}
                        >
                          {product.inStock ? 'Add' : 'Unavailable'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Products Found */}
            {!loading && !error && filteredProducts.length === 0 && (
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
